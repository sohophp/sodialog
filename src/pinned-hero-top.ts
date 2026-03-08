interface SetupPinnedHeroTopOptions {
  heroSelector?: string
  topRowSelector?: string
  thresholdBase?: number
  adjustSidebarOffset?: boolean
  offsetVarName?: string
}

export function setupPinnedHeroTop(options: SetupPinnedHeroTopOptions = {}): void {
  const heroSelector = options.heroSelector ?? '.hero'
  const topRowSelector = options.topRowSelector ?? '.hero-top'
  const thresholdBase = options.thresholdBase ?? 56
  const adjustSidebarOffset = options.adjustSidebarOffset ?? false
  const offsetVarName = options.offsetVarName ?? '--sod-sticky-offset'

  const hero = document.querySelector<HTMLElement>(heroSelector)
  const heroTop = document.querySelector<HTMLElement>(topRowSelector)
  if (!hero || !heroTop) {
    return
  }

  const rootStyle = document.documentElement.style
  let ticking = false

  const update = () => {
    ticking = false
    const threshold = Math.max(thresholdBase, hero.offsetTop + 20)
    const isPinned = window.scrollY > threshold
    heroTop.classList.toggle('is-pinned', isPinned)

    if (!adjustSidebarOffset) {
      return
    }

    if (!isPinned) {
      rootStyle.removeProperty(offsetVarName)
      return
    }

    const pinnedTop = Number.parseFloat(window.getComputedStyle(heroTop).top) || 0
    const nextOffset = Math.ceil(heroTop.offsetHeight + pinnedTop + 14)
    rootStyle.setProperty(offsetVarName, `${nextOffset}px`)
  }

  const onScroll = () => {
    if (ticking) {
      return
    }
    ticking = true
    window.requestAnimationFrame(update)
  }

  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', update)
}
