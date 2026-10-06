import { useState, useEffect, useCallback } from 'react'
import logo from './assets/logo.jpg'
import p1 from './images/WhatsApp Image 2026-09-19 at 11.27.10 PM (1).jpeg'
import p2 from './images/WhatsApp Image 2026-09-19 at 11.27.11 PM.jpeg'
import p3 from './images/WhatsApp Image 2026-09-20 at 4.08.19 PM.jpeg'
import p4 from './images/WhatsApp Image 2026-09-19 at 11.27.11 PM (2).jpeg'
import p5 from './images/WhatsApp Image 2026-09-19 at 11.27.11 PM (3).jpeg'
import p6 from './images/WhatsApp Image 2026-09-19 at 11.27.12 PM (2).jpeg'
import p7 from './images/WhatsApp Image 2026-09-19 at 11.27.12 PM (3).jpeg'
import p8 from './images/WhatsApp Image 2026-09-20 at 4.19.33 PM.jpeg'

const UNSPLASH = {
  hero: 'https://images.unsplash.com/photo-1532191568455-f90e2806b900?w=1800&h=1100&fit=crop&auto=format',
  about: p8,
  p1: p1,
  p2: p2,
  p3: p3,
  p4: p4,
  p5: p5,
  p6: p6,
  p7: p7,
}

const SERVICES = [
  { n: '01', name: 'Portrait Photography', desc: 'Intimate, expressive portraits that capture the soul behind the face.' },
  { n: '02', name: 'Wedding Photography', desc: 'Timeless storytelling of your most cherished day.' },
  { n: '03', name: 'Event Photography', desc: 'From corporate galas to private celebrations, every moment documented.' },
  { n: '04', name: 'Fashion & Lifestyle', desc: 'Editorial imagery that elevates brands, creatives, and individuals.' },
  { n: '05', name: 'Videography', desc: 'Cinematic video production that moves, inspires, and endures.' },
]

const PROJECTS = [
  { img: UNSPLASH.p1, name: 'African Elegance', cat: 'Portrait', wide: false },
  { img: UNSPLASH.p2, name: '', cat: '', wide: true },
  { img: UNSPLASH.p3, name: '', cat: '', wide: false },
  { img: UNSPLASH.p4, name: '', cat: '', wide: true },
  { img: UNSPLASH.p5, name: '', cat: '', wide: false },
  { img: UNSPLASH.p6, name: '', cat: '', wide: false },
  { img: UNSPLASH.p7, name: '', cat: '', wide: true },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevImage = useCallback(() => setLightbox(i => i !== null ? (i - 1 + PROJECTS.length) % PROJECTS.length : null), [])
  const nextImage = useCallback(() => setLightbox(i => i !== null ? (i + 1) % PROJECTS.length : null), [])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox, prevImage, nextImage])

  const navLink = (href: string, label: string) => (
    <a
      href={href}
      onClick={() => setMenuOpen(false)}
      style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.15em' }}
      className="text-xs text-platinum/70 hover:text-[#DD9C3E] transition-colors duration-300"
    >
      {label}
    </a>
  )

  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)' }}>

      {/* ── NAV ── */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? 'rgba(1,1,1,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(221,156,62,0.15)' : 'none',
          transition: 'all 0.4s ease',
          padding: '0 2.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '72px',
        }}
      >
        <a href="#hero">
          <img src={logo} alt="Lolu Star Media" style={{ height: '44px', width: '44px', objectFit: 'cover', borderRadius: '50%' }} />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLink('#about', 'ABOUT')}
          {navLink('#services', 'SERVICES')}
          {navLink('#projects', 'PROJECTS')}
          {navLink('#contact', 'CONTACT')}
          <a
            href="#contact"
            style={{
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.12em',
              fontSize: '0.7rem',
              border: '1px solid #DD9C3E',
              color: '#DD9C3E',
              padding: '8px 22px',
              transition: 'all 0.3s ease',
            }}
            className="hover:bg-[#DD9C3E] hover:text-black"
          >
            BOOK
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span style={{ display: 'block', width: '24px', height: '1px', background: menuOpen ? '#DD9C3E' : '#E9E8E6', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
          <span style={{ display: 'block', width: '24px', height: '1px', background: menuOpen ? 'transparent' : '#E9E8E6', transition: 'all 0.3s' }} />
          <span style={{ display: 'block', width: '24px', height: '1px', background: menuOpen ? '#DD9C3E' : '#E9E8E6', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            position: 'fixed', top: '72px', left: 0, right: 0,
            background: 'rgba(1,1,1,0.97)',
            borderBottom: '1px solid rgba(221,156,62,0.2)',
            padding: '2rem 2.5rem',
            display: 'flex', flexDirection: 'column', gap: '1.5rem',
          }}>
            {navLink('#about', 'ABOUT')}
            {navLink('#services', 'SERVICES')}
            {navLink('#projects', 'PROJECTS')}
            {navLink('#contact', 'CONTACT')}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.12em', fontSize: '0.7rem', border: '1px solid #DD9C3E', color: '#DD9C3E', padding: '12px 22px', textAlign: 'center' }}
            >
              BOOK / CONTACT
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: '640px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={UNSPLASH.hero}
          alt="Cinematic photography backdrop"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(1,1,1,0.55) 0%, rgba(1,1,1,0.72) 100%)' }} />

        <div style={{ position: 'relative', textAlign: 'center', padding: '0 1.5rem' }}>
          <img
            src={logo}
            alt="Lolu Star Media Logo"
            style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', margin: '0 auto 2rem', border: '2px solid rgba(221,156,62,0.6)' }}
          />
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 7vw, 5.5rem)',
            fontWeight: 500,
            letterSpacing: '0.04em',
            color: '#FFFFFF',
            margin: '0 0 1rem',
            lineHeight: 1.1,
          }}>
            CAPTURING LIFE'S<br />
            <em style={{ color: '#DD9C3E', fontStyle: 'italic' }}>BEST MOMENTS</em>
          </h1>

          {/* gold line */}
          <div style={{ width: '60px', height: '1px', background: '#DD9C3E', margin: '1.5rem auto' }} />

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            color: 'rgba(233,232,230,0.7)',
            margin: '0 0 2.5rem',
          }}>
            Photography&nbsp;&nbsp;•&nbsp;&nbsp;Videography&nbsp;&nbsp;•&nbsp;&nbsp;Visual Storytelling
          </p>

          <a
            href="#projects"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              color: '#010101',
              background: '#DD9C3E',
              padding: '14px 40px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = '#F1C56A' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = '#DD9C3E' }}
          >
            VIEW MY WORK
          </a>
        </div>

        {/* scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(221,156,62,0.8), transparent)', margin: '0 auto' }} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        style={{ padding: 'clamp(5rem,12vw,9rem) clamp(1.5rem,8vw,7rem)' }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center' }}>

          <div style={{ position: 'relative' }}>
            <img
              src={UNSPLASH.about}
              alt="Photographer at work"
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: '-16px', right: '-16px', width: '60%', height: '60%', border: '1px solid rgba(221,156,62,0.3)', pointerEvents: 'none' }} />
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em', color: '#DD9C3E', marginBottom: '1rem' }}>ABOUT</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 500,
              lineHeight: 1.15,
              margin: '0 0 1.5rem',
              color: '#E9E8E6',
            }}>
              Lolu Star<br /><em>Media</em>
            </h2>
            <div style={{ width: '40px', height: '1px', background: '#DD9C3E', marginBottom: '1.75rem' }} />
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              lineHeight: 1.85,
              color: 'rgba(233,232,230,0.72)',
              marginBottom: '1.5rem',
            }}>
              LOLU STAR MEDIA is a photography and visual storytelling brand focused on capturing authentic moments, people and experiences through striking imagery. Every frame is an intentional act, a meeting of light, emotion, and craft that turns the fleeting into the permanent.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              lineHeight: 1.85,
              color: 'rgba(233,232,230,0.72)',
            }}>
              Based in Abeokuta, Nigeria. Shooting the world.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        style={{ padding: 'clamp(5rem,12vw,9rem) clamp(1.5rem,8vw,7rem)', background: '#171313' }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em', color: '#DD9C3E', marginBottom: '1rem' }}>WHAT I OFFER</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 500,
            margin: '0 0 3.5rem',
            color: '#E9E8E6',
          }}>
            Services
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {SERVICES.map((s, i) => (
              <div
                key={s.n}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '3.5rem 1fr',
                  gap: '1.5rem',
                  alignItems: 'start',
                  padding: '2rem 0',
                  borderTop: i === 0 ? '1px solid rgba(221,156,62,0.2)' : 'none',
                  borderBottom: '1px solid rgba(221,156,62,0.2)',
                  transition: 'background 0.2s',
                }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#DD9C3E', letterSpacing: '0.1em', paddingTop: '4px' }}>{s.n}</span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 500, color: '#E9E8E6', margin: '0 0 0.5rem', letterSpacing: '0.02em' }}>{s.name}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(233,232,230,0.55)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        style={{ padding: 'clamp(5rem,12vw,9rem) clamp(1.5rem,8vw,5rem)' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em', color: '#DD9C3E', marginBottom: '1rem' }}>PORTFOLIO</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 500,
            margin: '0 0 3.5rem',
            color: '#E9E8E6',
          }}>
            Selected Projects
          </h2>

          {/* Editorial masonry-style grid */}
          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: '80px', gap: '12px' }}>

            {/* p1 — tall portrait left */}
            <div style={{ gridColumn: '1 / 5', gridRow: '1 / 9' }}>
              <ProjectCard img={PROJECTS[0].img} name={PROJECTS[0].name} cat={PROJECTS[0].cat} onOpen={() => setLightbox(0)} />
            </div>

            {/* p2 — wide landscape top-right */}
            <div style={{ gridColumn: '5 / 13', gridRow: '1 / 5' }}>
              <ProjectCard img={PROJECTS[1].img} name={PROJECTS[1].name} cat={PROJECTS[1].cat} onOpen={() => setLightbox(1)} />
            </div>

            {/* p3 — medium portrait mid-right */}
            <div style={{ gridColumn: '5 / 9', gridRow: '5 / 9' }}>
              <ProjectCard img={PROJECTS[2].img} name={PROJECTS[2].name} cat={PROJECTS[2].cat} onOpen={() => setLightbox(2)} />
            </div>

            {/* p5 — medium portrait mid-right */}
            <div style={{ gridColumn: '9 / 13', gridRow: '5 / 9' }}>
              <ProjectCard img={PROJECTS[4].img} name={PROJECTS[4].name} cat={PROJECTS[4].cat} onOpen={() => setLightbox(4)} />
            </div>

            {/* p4 — full-width landscape */}
            <div style={{ gridColumn: '1 / 13', gridRow: '9 / 13' }}>
              <ProjectCard img={PROJECTS[3].img} name={PROJECTS[3].name} cat={PROJECTS[3].cat} onOpen={() => setLightbox(3)} />
            </div>

            {/* p6 — portrait */}
            <div style={{ gridColumn: '1 / 5', gridRow: '13 / 19' }}>
              <ProjectCard img={PROJECTS[5].img} name={PROJECTS[5].name} cat={PROJECTS[5].cat} onOpen={() => setLightbox(5)} />
            </div>

            {/* p7 — wide landscape */}
            <div style={{ gridColumn: '5 / 13', gridRow: '13 / 19' }}>
              <ProjectCard img={PROJECTS[6].img} name={PROJECTS[6].name} cat={PROJECTS[6].cat} onOpen={() => setLightbox(6)} />
            </div>
          </div>

        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        style={{ padding: 'clamp(5rem,12vw,9rem) clamp(1.5rem,8vw,7rem)', background: '#171313' }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em', color: '#DD9C3E', marginBottom: '1rem' }}>GET IN TOUCH</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
            fontWeight: 500,
            lineHeight: 1.1,
            margin: '0 0 1.5rem',
            color: '#E9E8E6',
          }}>
            Let's Work<br /><em style={{ color: '#DD9C3E' }}>Together.</em>
          </h2>
          <div style={{ width: '40px', height: '1px', background: '#DD9C3E', marginBottom: '1.75rem' }} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(233,232,230,0.65)', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '500px' }}>
            Have a project, event or moment you want captured? Get in touch.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '3.5rem' }}>
            <ContactItem label="EMAIL" value="danielodeyale@gmail.com" href="mailto:danielodeyale@gmail.com" />
            <ContactItem label="PHONE" value="+234 813 254 4230" href="tel:+2348132544230" />
            <ContactItem label="WHATSAPP" value="Chat on WhatsApp" href="https://wa.me/2348132544230" />
          </div>

          <div style={{ borderTop: '1px solid rgba(221,156,62,0.15)', paddingTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
            <SocialLink href="https://tiktok.com/@lolustar_studio" label="TikTok" handle="@lolustarmedia" />
            <a
              href="https://wa.me/2348132544230"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                color: '#010101',
                background: '#DD9C3E',
                padding: '11px 28px',
                textDecoration: 'none',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = '#F1C56A' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = '#DD9C3E' }}
            >
              WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(1,1,1,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* image */}
          <img
            src={PROJECTS[lightbox].img.replace(/w=\d+&h=\d+/, 'w=1600&h=1100')}
            alt={PROJECTS[lightbox].name}
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', display: 'block', boxShadow: '0 0 80px rgba(0,0,0,0.8)' }}
          />

          {/* caption */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none' }}
          >
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#E9E8E6', margin: '0 0 0.25rem' }}>{PROJECTS[lightbox].name}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.22em', color: '#DD9C3E', margin: 0 }}>{PROJECTS[lightbox].cat.toUpperCase()}</p>
          </div>

          {/* close */}
          <button
            onClick={closeLightbox}
            style={{ position: 'absolute', top: '1.5rem', right: '1.75rem', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(233,232,230,0.5)', fontSize: '1.5rem', lineHeight: 1, padding: '4px', transition: 'color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget).style.color = '#DD9C3E' }}
            onMouseLeave={e => { (e.currentTarget).style.color = 'rgba(233,232,230,0.5)' }}
            aria-label="Close"
          >
            ✕
          </button>

          {/* prev */}
          <button
            onClick={e => { e.stopPropagation(); prevImage() }}
            style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: '1px solid rgba(221,156,62,0.3)', cursor: 'pointer', color: 'rgba(233,232,230,0.6)', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#DD9C3E'; e.currentTarget.style.color = '#DD9C3E' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(221,156,62,0.3)'; e.currentTarget.style.color = 'rgba(233,232,230,0.6)' }}
            aria-label="Previous"
          >
            ←
          </button>

          {/* next */}
          <button
            onClick={e => { e.stopPropagation(); nextImage() }}
            style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: '1px solid rgba(221,156,62,0.3)', cursor: 'pointer', color: 'rgba(233,232,230,0.6)', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#DD9C3E'; e.currentTarget.style.color = '#DD9C3E' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(221,156,62,0.3)'; e.currentTarget.style.color = 'rgba(233,232,230,0.6)' }}
            aria-label="Next"
          >
            →
          </button>

          {/* counter */}
          <p style={{ position: 'absolute', top: '1.75rem', left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(233,232,230,0.35)', margin: 0 }}>
            {lightbox + 1} / {PROJECTS.length}
          </p>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ background: '#010101', borderTop: '1px solid rgba(221,156,62,0.12)', padding: '4rem clamp(1.5rem,8vw,7rem) 2.5rem', textAlign: 'center' }}>
        <img
          src={logo}
          alt="Lolu Star Media"
          style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '50%', margin: '0 auto 1.25rem', border: '1px solid rgba(221,156,62,0.4)' }}
        />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em', color: '#DD9C3E', margin: '0 0 0.75rem' }}>
          CAPTURING LIFE'S BEST MOMENTS
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(233,232,230,0.35)', margin: '0 0 2.5rem', letterSpacing: '0.1em' }}>
          © 2026 LOLU STAR MEDIA
        </p>

        <div style={{ width: '40px', height: '1px', background: 'rgba(221,156,62,0.25)', margin: '0 auto 2.5rem' }} />

        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.25em', color: 'rgba(233,232,230,0.3)', margin: 0 }}>
            MADE BY
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontStyle: 'italic', color: 'rgba(221,156,62,0.65)', margin: 0, letterSpacing: '0.05em' }}>
            Alli Baba
          </p>
          <a
            href="https://instagram.com/__allibaba__"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              color: 'rgba(221,156,62,0.5)',
              textDecoration: 'none',
              transition: 'color 0.25s',
              marginTop: '2px',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = '#DD9C3E' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(221,156,62,0.5)' }}
          >
            @ALLIBABA
          </a>
        </div>
      </footer>
    </div>
  )
}

/* ── sub-components ── */

function ProjectCard({ img, name, cat, onOpen }: { img: string; name: string; cat: string; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#171313', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      <img
        src={img}
        alt={name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition:'center top', display: 'block', transition: 'transform 0.6s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered ? 'rgba(1,1,1,0.55)' : 'rgba(1,1,1,0.2)',
        transition: 'background 0.4s ease',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '1.5rem 1.25rem 1.25rem',
        background: 'linear-gradient(to top, rgba(1,1,1,0.85) 0%, transparent 100%)',
        transform: hovered ? 'translateY(0)' : 'translateY(8px)',
        opacity: hovered ? 1 : 0.6,
        transition: 'all 0.4s ease',
      }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 500, color: '#E9E8E6', margin: '0 0 0.25rem' }}>{name}</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.2em', color: '#DD9C3E', margin: 0 }}>{cat.toUpperCase()}</p>
      </div>
    </div>
  )
}

function ContactItem({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.25em', color: '#DD9C3E', margin: '0 0 0.5rem' }}>{label}</p>
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(233,232,230,0.75)', textDecoration: 'none', transition: 'color 0.2s' }}
        onMouseEnter={e => { (e.target as HTMLElement).style.color = '#DD9C3E' }}
        onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(233,232,230,0.75)' }}
      >
        {value}
      </a>
    </div>
  )
}

function SocialLink({ href, label, handle }: { href: string; label: string; handle: string }) {
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.25em', color: '#DD9C3E', margin: '0 0 0.25rem' }}>{label.toUpperCase()}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(233,232,230,0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
        onMouseEnter={e => { (e.target as HTMLElement).style.color = '#DD9C3E' }}
        onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(233,232,230,0.65)' }}
      >
        {handle}
      </a>
      
    </div>
  )
}
