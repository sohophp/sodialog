export interface SoTagsInputOptions {
  separators?: string[]
  serializeWith?: string
  maxTags?: number
  allowDuplicates?: boolean
  caseSensitive?: boolean
  addOnBlur?: boolean
  addOnPaste?: boolean
  placeholder?: string
  inputAriaLabel?: string
  removeButtonLabel?: (value: string) => string
  validate?: (value: string, values: string[]) => string | boolean | void
  onChange?: (values: string[], handle: SoTagsInputHandle) => void
}

export interface SoTagsInputHandle {
  element: HTMLElement
  source: HTMLInputElement | HTMLTextAreaElement
  input: HTMLInputElement
  values: () => string[]
  setValues: (values: string[]) => void
  add: (value: string) => boolean
  remove: (value: string) => boolean
  focus: () => void
  destroy: () => void
}

const DEFAULT_SEPARATORS = [',', ';', '，', '；', '\n']
let tagsInputIdSeed = 0

function splitTags(value: string, separators: string[]): string[] {
  const usable = separators.filter(Boolean)
  if (usable.length === 0) return [value]
  const escaped = usable.map((separator) => separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  return value.split(new RegExp(escaped.join('|'), 'u'))
}

function normalizedTag(value: string): string {
  return value.trim().replace(/\s+/g, ' ')
}

export function createTagsInput(
  source: HTMLInputElement | HTMLTextAreaElement,
  options: SoTagsInputOptions = {},
): SoTagsInputHandle {
  if (!(source instanceof HTMLInputElement || source instanceof HTMLTextAreaElement)) {
    throw new TypeError('createTagsInput requires an input or textarea element')
  }
  if (source.dataset.sodTagsInputMounted === '1') {
    throw new Error('This input already has a SoDialog tags input')
  }

  const separators = options.separators?.length ? options.separators : DEFAULT_SEPARATORS
  const serializeWith = options.serializeWith ?? ','
  const maxTags = Math.max(0, Math.floor(options.maxTags ?? Number.POSITIVE_INFINITY))
  const allowDuplicates = options.allowDuplicates ?? false
  const caseSensitive = options.caseSensitive ?? false
  const root = document.createElement('div')
  const list = document.createElement('div')
  const input = document.createElement('input')
  const status = document.createElement('span')
  let tags: string[] = []
  let syncingSource = false
  let destroyed = false
  const previousAriaHidden = source.getAttribute('aria-hidden')
  const previousTabIndex = source.getAttribute('tabindex')
  const labels = Array.from(source.labels ?? [])

  root.className = 'sod-tags-input'
  root.setAttribute('role', 'group')
  list.className = 'sod-tags-input-list'
  input.type = 'text'
  input.className = 'sod-tags-input-editor'
  input.placeholder = options.placeholder ?? source.placeholder
  input.setAttribute('aria-label', options.inputAriaLabel ?? source.getAttribute('aria-label') ?? 'Add tag')
  input.autocomplete = 'off'
  input.disabled = source.disabled
  input.readOnly = source.readOnly
  status.className = 'sod-tags-input-status'
  status.setAttribute('aria-live', 'polite')
  status.setAttribute('aria-atomic', 'true')
  source.before(root)
  root.append(list, input, status)
  source.classList.add('sod-tags-input-source')
  source.dataset.sodTagsInputMounted = '1'
  source.setAttribute('aria-hidden', 'true')
  source.tabIndex = -1
  if (labels.length > 0) {
    const labelIds = labels.map((label) => {
      if (!label.id) {
        tagsInputIdSeed += 1
        label.id = `sod-tags-input-label-${tagsInputIdSeed}`
      }
      return label.id
    })
    root.setAttribute('aria-labelledby', labelIds.join(' '))
  }

  const identity = (value: string) => (caseSensitive ? value : value.toLocaleLowerCase())
  const announce = (message: string) => {
    status.textContent = ''
    window.setTimeout(() => {
      if (!destroyed) status.textContent = message
    }, 0)
  }
  const render = () => {
    list.replaceChildren()
    tags.forEach((value) => {
      const item = document.createElement('span')
      const text = document.createElement('span')
      const remove = document.createElement('button')
      item.className = 'sod-tags-input-item'
      item.dataset.value = value
      text.className = 'sod-tags-input-item-text'
      text.textContent = value
      remove.type = 'button'
      remove.className = 'sod-tags-input-remove'
      remove.setAttribute('aria-label', options.removeButtonLabel?.(value) ?? `Remove ${value}`)
      remove.textContent = '×'
      remove.disabled = source.disabled || source.readOnly
      remove.addEventListener('click', () => {
        removeTag(value)
        input.focus()
      })
      item.append(text, remove)
      list.append(item)
    })
    root.classList.toggle('sod-tags-input-empty', tags.length === 0)
    root.classList.toggle('sod-tags-input-limit', tags.length >= maxTags)
  }
  const emitChange = () => {
    syncingSource = true
    source.value = tags.join(serializeWith)
    source.dispatchEvent(new Event('input', { bubbles: true }))
    source.dispatchEvent(new Event('change', { bubbles: true }))
    source.dispatchEvent(new CustomEvent('sod:tags-change', { bubbles: true, detail: { values: [...tags] } }))
    syncingSource = false
    options.onChange?.([...tags], handle)
  }
  const replaceTags = (values: string[], emit = true) => {
    const next: string[] = []
    values.forEach((rawValue) => {
      const value = normalizedTag(rawValue)
      if (!value || next.length >= maxTags) return
      if (!allowDuplicates && next.some((candidate) => identity(candidate) === identity(value))) return
      next.push(value)
    })
    tags = next
    render()
    if (emit) emitChange()
  }
  const addTag = (rawValue: string): boolean => {
    const value = normalizedTag(rawValue)
    if (!value) return false
    if (tags.length >= maxTags) {
      announce(`Maximum ${maxTags} tags`)
      return false
    }
    if (!allowDuplicates && tags.some((candidate) => identity(candidate) === identity(value))) {
      announce(`${value} is already added`)
      return false
    }
    const validation = options.validate?.(value, [...tags])
    if (validation === false || typeof validation === 'string') {
      announce(typeof validation === 'string' ? validation : `${value} is not valid`)
      return false
    }
    tags.push(value)
    render()
    emitChange()
    announce(`${value} added`)
    return true
  }
  const removeTag = (value: string): boolean => {
    const index = tags.findIndex((candidate) => identity(candidate) === identity(value))
    if (index < 0) return false
    const [removed] = tags.splice(index, 1)
    render()
    emitChange()
    announce(`${removed} removed`)
    return true
  }
  const commitInput = (): boolean => {
    const candidates = splitTags(input.value, separators)
    let added = false
    candidates.forEach((candidate) => {
      if (addTag(candidate)) added = true
    })
    if (added) input.value = ''
    return added
  }
  const onSourceInput = () => {
    if (!syncingSource) replaceTags(splitTags(source.value, separators), false)
  }
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || separators.includes(event.key)) {
      event.preventDefault()
      commitInput()
      return
    }
    if (event.key === 'Backspace' && input.value === '' && tags.length > 0) {
      event.preventDefault()
      removeTag(tags[tags.length - 1])
    }
  }
  const onPaste = (event: ClipboardEvent) => {
    if (options.addOnPaste === false) return
    const pasted = event.clipboardData?.getData('text') ?? ''
    if (!separators.some((separator) => pasted.includes(separator))) return
    event.preventDefault()
    splitTags(pasted, separators).forEach((value) => addTag(value))
    input.value = ''
  }
  const onBlur = () => {
    if (options.addOnBlur !== false) commitInput()
  }
  const onReset = () => window.setTimeout(onSourceInput, 0)
  const onLabelClick = (event: Event) => {
    event.preventDefault()
    input.focus()
  }

  const handle: SoTagsInputHandle = {
    element: root,
    source,
    input,
    values: () => [...tags],
    setValues: (values) => replaceTags(values),
    add: addTag,
    remove: removeTag,
    focus: () => input.focus(),
    destroy: () => {
      if (destroyed) return
      destroyed = true
      source.removeEventListener('input', onSourceInput)
      source.form?.removeEventListener('reset', onReset)
      input.removeEventListener('keydown', onKeyDown)
      input.removeEventListener('paste', onPaste)
      input.removeEventListener('blur', onBlur)
      labels.forEach((label) => label.removeEventListener('click', onLabelClick))
      root.remove()
      source.classList.remove('sod-tags-input-source')
      delete source.dataset.sodTagsInputMounted
      if (previousAriaHidden === null) source.removeAttribute('aria-hidden')
      else source.setAttribute('aria-hidden', previousAriaHidden)
      if (previousTabIndex === null) source.removeAttribute('tabindex')
      else source.setAttribute('tabindex', previousTabIndex)
    },
  }

  input.addEventListener('keydown', onKeyDown)
  input.addEventListener('paste', onPaste)
  input.addEventListener('blur', onBlur)
  source.addEventListener('input', onSourceInput)
  source.form?.addEventListener('reset', onReset)
  labels.forEach((label) => label.addEventListener('click', onLabelClick))
  root.addEventListener('click', (event) => {
    if (event.target === root || event.target === list) input.focus()
  })
  replaceTags(splitTags(source.value, separators), false)
  return handle
}
