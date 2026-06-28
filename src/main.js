import './style.css'

/* Sticky header: transparent over the hero, solid dark once you scroll. */
const header = document.querySelector('[data-header]')
const onScroll = () => {
  if (!header) return
  header.classList.toggle('is-scrolled', window.scrollY > 24)
}
window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

/* Footer year */
const yearEl = document.querySelector('[data-year]')
if (yearEl) yearEl.textContent = new Date().getFullYear()
