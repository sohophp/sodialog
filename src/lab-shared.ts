export type LabPageKey = 'hub' | 'modal' | 'offcanvas' | 'toast' | 'workflow' | 'api'

const LINKS: Array<{ key: LabPageKey; href: string; label: string }> = [
  { key: 'hub', href: './examples.html', label: 'Examples Hub' },
  { key: 'modal', href: './modal.html', label: 'Modal Lab' },
  { key: 'offcanvas', href: './offcanvas.html', label: 'Offcanvas Lab' },
  { key: 'toast', href: './toast.html', label: 'Toast Lab' },
  { key: 'workflow', href: './workflow.html', label: '开发/发布流程' },
  { key: 'api', href: './api.html', label: 'API' },
]

export function renderLabHeader(page: LabPageKey, title: string, intro: string): string {
  const navLinks = LINKS.map((link) => {
    const active = link.key === page ? 'active' : ''
    return `<a class="${active}" href="${link.href}">${link.label}</a>`
  }).join('')

  return `
<header class="hero">
  <div class="hero-top">
    <div class="brand-block">
      <img class="brand-logo" src="./logo.ico" alt="SoDialog Logo" width="34" height="34" />
      <div class="brand-copy">
        <strong class="brand-name">SoDialog</strong>
        <span class="tag">${title}</span>
      </div>
    </div>
  </div>
  <h1>${title}</h1>
  <p>${intro}</p>
  <nav class="nav">
    ${navLinks}
    <a href="./index.html">文档首页</a>
    <a href="./demo.html">原版 Demo</a>
  </nav>
</header>
`
}

export function wireCodeCopyButtons(): void {
  const copyButtons = document.querySelectorAll<HTMLButtonElement>('.code-copy-btn')
  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const targetId = button.dataset.copyTarget
      if (!targetId) {
        return
      }
      const target = document.querySelector<HTMLElement>(`#${targetId}`)
      if (!target) {
        return
      }

      try {
        await navigator.clipboard.writeText(target.textContent ?? '')
        button.textContent = '已复制'
      } catch {
        button.textContent = '复制失败'
      }

      window.setTimeout(() => {
        button.textContent = '复制代码'
      }, 1100)
    })
  })
}
