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

/* Reviews carousel: arrows + autoplay, driven by CSS scroll-snap. */
document.querySelectorAll('[data-carousel]').forEach((root) => {
  const track = root.querySelector('[data-track]')
  const prev = root.querySelector('[data-prev]')
  const next = root.querySelector('[data-next]')
  if (!track) return

  const step = () => {
    const card = track.querySelector('.review-card')
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    return card ? card.offsetWidth + gap : track.clientWidth
  }

  const atStart = () => track.scrollLeft <= 2
  const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 2
  const hasOverflow = () => track.scrollWidth - track.clientWidth > 4

  const sync = () => {
    if (prev) prev.disabled = atStart()
    if (next) next.disabled = atEnd()
    const show = hasOverflow()
    ;[prev, next].forEach((b) => b && (b.style.display = show ? '' : 'none'))
  }

  prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }))
  next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }))
  track.addEventListener('scroll', () => window.requestAnimationFrame(sync), { passive: true })
  window.addEventListener('resize', sync)
  sync()

  /* Autoplay — pauses on hover, loops back at the end. */
  let timer = null
  const tick = () => {
    if (!hasOverflow()) return
    if (atEnd()) track.scrollTo({ left: 0, behavior: 'smooth' })
    else track.scrollBy({ left: step(), behavior: 'smooth' })
  }
  const start = () => (timer = window.setInterval(tick, 5000))
  const stop = () => timer && window.clearInterval(timer)
  root.addEventListener('mouseenter', stop)
  root.addEventListener('mouseleave', start)
  start()
})
