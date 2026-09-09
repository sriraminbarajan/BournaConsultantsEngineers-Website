import { useEffect, useRef, useState } from 'react'
import { CountUp } from './components/CountUp'
import { ProjectCard, type ProjectItem } from './components/ProjectCard'
import { ProjectLightbox } from './components/ProjectLightbox'
import { Wordmark } from './components/Wordmark'
import {
  architectClients,
  builderClients,
  featuredClients,
  featuredProjects,
  firm,
  heroImages,
  nav,
  principal,
  services,
  timeline,
  workFilters,
} from './data/content'
import './index.css'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [clientsOpen, setClientsOpen] = useState(false)
  const [workFilter, setWorkFilter] = useState<(typeof workFilters)[number]>('All')
  const [lightbox, setLightbox] = useState<ProjectItem | null>(null)
  const [heroIndex, setHeroIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || heroImages.length < 2) return
    const id = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length)
    }, 5500)
    return () => window.clearInterval(id)
  }, [])

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(firm.mapsQuery)}`
  const whatsappUrl = firm.whatsapp
    ? `https://wa.me/${firm.whatsapp}?text=${encodeURIComponent('Hello Bourna Consultants — enquiry from the website.')}`
    : null

  const filteredProjects =
    workFilter === 'All'
      ? featuredProjects
      : featuredProjects.filter((p) => p.type === workFilter)

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <header
        ref={headerRef}
        className={[
          'site-header',
          'is-hero-light',
          scrolled ? 'is-scrolled' : '',
          menuOpen ? 'is-menu-open' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="header-inner">
          <a
            className={['logo-link', scrolled ? 'is-visible' : 'is-hidden'].join(' ')}
            href="#top"
            aria-label={firm.name}
            aria-hidden={!scrolled}
            tabIndex={scrolled ? 0 : -1}
          >
            <Wordmark variant="dark" className="logo-mark" />
          </a>
          <button
            className={['menu-toggle', menuOpen ? 'is-open' : ''].join(' ')}
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
          </button>
          <nav className={menuOpen ? 'nav is-open' : 'nav'} aria-label="Primary">
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
              Get in touch
            </a>
          </nav>
        </div>
      </header>

      {menuOpen && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main id="top">
        <section className="hero" aria-label="Introduction">
          <div className="hero-slides" aria-hidden="true">
            {heroImages.map((src, i) => (
              <div
                key={src}
                className={['hero-slide', i === heroIndex ? 'is-active' : ''].join(' ')}
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
          </div>
          <div className="hero-bg" aria-hidden="true" />
          <div className="hero-beam" aria-hidden="true" />
          <div className="hero-content">
            <div
              className={['hero-brand-wrap', scrolled ? 'is-exiting' : ''].join(' ')}
              aria-hidden={scrolled}
            >
              <Wordmark variant="light" className="hero-brand" />
            </div>
            <h1>{firm.tagline}</h1>
            <p className="hero-support">{firm.support}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#work">
                View work
              </a>
              <a className="btn btn-ghost" href="#contact">
                Contact
              </a>
            </div>
          </div>
        </section>

        <section className="stats" aria-label="Practice highlights">
          <div className="wrap stats-grid">
            <div className="stat">
              <strong>
                <CountUp value={firm.years} suffix="+" />
              </strong>
              <span className="stat-label">Years in practice</span>
            </div>
            <div className="stat">
              <strong>
                <CountUp
                  value={firm.projects}
                  suffix="+"
                  format={(n) => Math.round(n).toLocaleString('en-IN')}
                />
              </strong>
              <span className="stat-label">Projects completed</span>
              <span className="stat-note">{firm.projectsNote}</span>
            </div>
            <div className="stat">
              <strong>Chennai</strong>
              <span className="stat-label">Based · work across India</span>
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="wrap">
            <p className="section-label">About</p>
            <h2 className="section-title">A practice built on structural judgement.</h2>
            <p className="section-lead">
              From West Mambalam, Bourna has supported architects and builders with independent
              structural design for nearly four decades.
            </p>

            <div className="about-grid">
              <div className="about-photo">
                <img
                  src={principal.photo}
                  alt={`${principal.name}, ${principal.title}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="about-copy">
                <p className="about-role">{principal.title}</p>
                <h3>{principal.name}</h3>
                <p className="about-cred">{principal.credentials}</p>
                {principal.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                <p className="signature-callout">{principal.signatureLine}</p>
                <ul className="specialty-list">
                  {principal.specialties.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section practice" id="practice">
          <div className="wrap">
            <p className="section-label">Practice</p>
            <h2 className="section-title">Nearly four decades of continuous work.</h2>
            <p className="section-lead">
              Longevity is the trust argument in structural engineering. This is how Bourna got here.
            </p>
            <ol className="timeline">
              {timeline.map((item) => (
                <li key={item.year} className="timeline-item">
                  <span className="timeline-year">{item.year}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="wrap">
            <div className="services-head">
              <p className="section-label">Services</p>
              <h2 className="section-title">Design that holds the building together.</h2>
              <p className="section-lead">
                End-to-end structural consultancy for promoters, architects, and institutions —
                with drawings certified by the Chief Consultant.
              </p>
            </div>
            <div className="services-list">
              {services.map((service) => (
                <article className="service-item" key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section work" id="work">
          <div className="wrap">
            <div className="work-head">
              <div>
                <p className="section-label">Selected work</p>
                <h2 className="section-title">Projects across typologies and scales.</h2>
              </div>
              <p className="work-note">
                Cinema, residential, IT, and institutional commissions — click any project for a
                larger view.
              </p>
            </div>

            <div className="work-filters" role="group" aria-label="Filter projects by type">
              {workFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={['filter-chip', workFilter === filter ? 'is-active' : ''].join(' ')}
                  aria-pressed={workFilter === filter}
                  onClick={() => setWorkFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="work-grid">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={setLightbox}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section clients" id="clients">
          <div className="wrap">
            <p className="section-label">Clients</p>
            <h2 className="section-title">Trusted by architects and builders.</h2>
            <p className="section-lead">
              A curated set of long-standing relationships. Full lists available on request.
            </p>

            <div className="clients-block" style={{ marginTop: '2.5rem' }}>
              <h3>Featured</h3>
              <ul className="client-cloud client-cloud-featured">
                {featuredClients.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="clients-toggle"
              aria-expanded={clientsOpen}
              onClick={() => setClientsOpen((v) => !v)}
            >
              {clientsOpen ? 'Hide full lists' : 'See all architects & builders'}
            </button>

            {clientsOpen && (
              <>
                <div className="clients-block">
                  <h3>Architects</h3>
                  <ul className="client-cloud">
                    {architectClients.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </div>
                <div className="clients-block">
                  <h3>Builders &amp; promoters</h3>
                  <ul className="client-cloud">
                    {builderClients.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="wrap">
            <p className="section-label">Contact</p>
            <h2 className="section-title">Discuss your next structure.</h2>
            <p className="section-lead">
              Reach the office in West Mambalam for structural design enquiries and collaboration.
            </p>

            <div className="contact-grid">
              <dl className="contact-details">
                <div className="contact-item">
                  <dt>Phone</dt>
                  <dd>
                    <a href={firm.phoneHref}>{firm.phone}</a>
                  </dd>
                </div>
                <div className="contact-item">
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${firm.email}`}>{firm.email}</a>
                  </dd>
                </div>
                <div className="contact-item">
                  <dt>Office hours</dt>
                  <dd>{firm.officeHours}</dd>
                </div>
                <div className="contact-item">
                  <dt>Office</dt>
                  <dd>
                    <a href={mapsUrl} target="_blank" rel="noreferrer">
                      {firm.address}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="contact-panel">
                <p>
                  Prefer a call, email
                  {whatsappUrl ? ', or WhatsApp' : ''}? We respond during office hours.
                </p>
                <div className="contact-actions">
                  <a className="btn btn-primary" href={firm.phoneHref}>
                    Call office
                  </a>
                  {whatsappUrl ? (
                    <a className="btn btn-ghost" href={whatsappUrl} target="_blank" rel="noreferrer">
                      WhatsApp
                    </a>
                  ) : (
                    <a className="btn btn-ghost" href={`mailto:${firm.email}`}>
                      Email us
                    </a>
                  )}
                  <a className="btn btn-ghost" href={firm.profilePdf} download>
                    Download profile (PDF)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <span>
            <strong>{firm.name}</strong>
          </span>
          <span>© {new Date().getFullYear()} · Structural consultancy, Chennai</span>
        </div>
      </footer>

      {lightbox && (
        <ProjectLightbox project={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}

export default App
