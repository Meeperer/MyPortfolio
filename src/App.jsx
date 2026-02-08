import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClickSpark from './components/ClickSpark.jsx';
import Dither from './components/Dither.jsx';
import DecayCard from './components/DecayCard.jsx';
import { DefaultDock } from './components/Dock.jsx';
import TrueFocus from './components/TrueFocus.jsx';

function App() {
  useEffect(() => {
    const hero = document.querySelector('.hero');
    if (hero) {
      const toReveal = hero.querySelectorAll('.reveal-fade, .reveal-text');
      const timer = setTimeout(() => toReveal.forEach((el) => el.classList.add('revealed')), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal-fade, .reveal-image, .reveal-project');
    const ob = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => ob.observe(el));
    return () => els.forEach((el) => ob.unobserve(el));
  }, []);

  return (
    <>
      <div className="grain-overlay" />
      <div className="page-transition" />

      <div className="site-dither-wrapper" aria-hidden="true">
        <Dither
          waveColor={[0.8, 0.7, 0.5]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.1}
          colorNum={40}
          waveAmplitude={0.32}
          waveFrequency={1.9}
          waveSpeed={0.05}
        />
      </div>

      <div className="site-content">
        <button
          type="button"
          className="why-lagging-hint"
          onClick={() => window.dispatchEvent(new CustomEvent('show-hardware-accel-modal'))}
          aria-label="Why is it lagging? Open tips"
        >
          Why is it lagging?
        </button>
        <ClickSpark
          sparkColor="#b85a30"
          sparkSize={16}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <section className="hero">
            <div className="floating-elements">
              <div className="floating-ring floating-ring-1" />
              <div className="floating-ring floating-ring-2" />
              <div className="floating-ring floating-ring-3" />
              <div className="floating-circle floating-circle-1" />
              <div className="floating-circle floating-circle-2" />
              <div className="floating-dot floating-dot-1" />
              <div className="floating-dot floating-dot-2" />
              <div className="floating-dot floating-dot-3" />
              <div className="floating-line floating-line-1" />
              <div className="floating-line floating-line-2" />
            </div>

            <div className="hero-content">
              <div className="hero-greeting reveal-fade">
                <p className="greeting-text">Hi, I’m</p>
              </div>

              <div className="hero-text-wrapper">
                <h1 className="hero-title reveal-text">
                  <TrueFocus
                    sentence="Lord Esguerra"
                    manualMode
                    blurAmount={5}
                    borderColor="#D4732B"
                    animationDuration={0.5}
                    pauseBetweenAnimations={1}
                    className="hero-title-focus"
                  />
                </h1>
              </div>

              <div className="hero-subtitle reveal-fade delay-1">
                <p className="subtitle-text">Welcome to my portfolio</p>
              </div>

              <div className="hero-tagline reveal-fade delay-2">
                <p>
                  IT Support · QA &amp; Testing · Web Development
                  <span className="alias-subtle">@Meeperer</span>
                </p>
              </div>
            </div>

            <div className="hero-scroll-indicator">
              <span className="scroll-text">Scroll to explore</span>
              <div className="scroll-line" />
            </div>

            <div className="hero-decoration">
              <div className="deco-circle" />
              <div className="deco-line" />
            </div>
          </section>

        {/* Education */}
        <section className="education" id="education">
          <div className="section-header">
            <span className="section-number">01</span>
            <h2 className="section-title reveal-text">Education</h2>
          </div>
          <div className="education-grid">
            <article className="education-card reveal-fade">
              <div className="education-top">
                <h3 className="education-title">Bachelor of Science in Information Technology</h3>
                <span className="education-badge">Consistent Dean&rsquo;s Lister</span>
              </div>
              <p className="education-body">
                <strong>De La Salle University–Dasmariñas</strong> · Philippines
                <span className="education-sep">·</span>
                <span className="education-years">2022–Present</span>
              </p>
              <ul className="education-list">
                <li>Current BSIT student focused on building clean, well-designed digital experiences.</li>
                <li>Coursework across web development, software testing, and core computer science.</li>
                <li>Consistent Dean&rsquo;s Lister for strong academic performance.</li>
                <li>Team projects designing and developing web apps for class and personal initiatives.</li>
              </ul>
            </article>
            <article className="education-card reveal-fade delay-1">
              <div className="education-top">
                <h3 className="education-title">Science, Technology, Engineering and Mathematics (STEM)</h3>
                <span className="education-badge">Consistent Dean&rsquo;s Lister</span>
              </div>
              <p className="education-body">
                <strong>De La Salle University–Dasmariñas</strong> · Philippines
                <span className="education-sep">·</span>
                <span className="education-years">2020–2022</span>
              </p>
              <ul className="education-list">
                <li><strong>Senior Highschool</strong></li>
                <li>Built a strong foundation in teamwork, communication, and structured problem-solving.</li>
                <li>Completed projects and activities that strengthened my interest in tech and software.</li>
              </ul>
            </article>
          </div>
        </section>

        {/* About */}
        <section className="about" id="about">
          <div className="about-floating-elements">
            <div className="floating-square floating-square-1" />
            <div className="floating-square floating-square-2" />
            <div className="floating-triangle floating-triangle-1" />
            <div className="floating-diamond floating-diamond-1" />
            <div className="floating-grid floating-grid-1" />
          </div>
          <div className="section-header">
            <span className="section-number">02</span>
            <h2 className="section-title reveal-text">About</h2>
          </div>
          <div className="about-grid">
            <div className="about-profile-card-wrapper reveal-image">
              <DecayCard width={400} height={520} image="/images/profile.jpg" hoverImage="/images/profile-hover.jpg" />
            </div>
            <div className="about-content">
              <div className="about-intro reveal-fade">
                <p className="large-text">I'm <em>Lord Mandell Esguerra</em> <span className="alias">(Meeperer)</span>, a 23-year-old developer and designer based in the Philippines.</p>
              </div>
              <div className="about-details reveal-fade delay-1">
                <p>"Driven by curiosity and persistence. I grew up repairing broken computers from our old computer shop by learning online and figuring things out through trial and error. Today, I apply that same mindset to building clean, functional websites with a strong focus on testing, troubleshooting, and thoughtful design."</p>
              </div>
              <div className="about-philosophy reveal-fade delay-2">
                <blockquote>
                  <span className="quote-mark">"</span>
                  Problems bother me until they're solved.
                  <span className="quote-mark">"</span>
                </blockquote>
              </div>
              <div className="about-actions reveal-fade delay-3">
                <a href="/LordResume1.pdf" className="btn-cv magnetic-btn" download>
                  <span className="btn-cv-label">My Resume</span>
                  <span className="btn-cv-icon">↓</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="skills">
          <div className="skills-marquee">
            <div className="marquee-track">
              <span className="marquee-item">MERN Stack</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">Python</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">Java</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">C++</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">Figma</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">Canva</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">Video Editing</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">MERN Stack</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">Python</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">Java</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">C++</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">Figma</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">Canva</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">Video Editing</span>
              <span className="marquee-divider">◆</span>
            </div>
          </div>
        </section>

        {/* Work */}
          <section className="work" id="work">
          <div className="work-floating-elements">
            <div className="floating-hexagon floating-hexagon-1" />
            <div className="floating-hexagon floating-hexagon-2" />
            <div className="floating-pattern floating-pattern-1" />
            <div className="floating-arc floating-arc-1" />
            <div className="floating-arc floating-arc-2" />
          </div>
          <div className="section-header work-section-header">
            <div className="section-header-left">
              <span className="section-number">03</span>
              <h2 className="section-title reveal-text">My Projects</h2>
            </div>
            <Link to="/projects" className="btn-view-all magnetic-btn">
              <span className="btn-view-all-label">View all</span>
              <span className="btn-view-all-icon">→</span>
            </Link>
          </div>
          <div className="work-grid" id="projects-grid">
            <ProjectCard
              large
              href="https://batinosgarden.shop"
              screenshots={['/images/batinosgarden-screenshot-1.jpg', '/images/batinosgarden-screenshot-2.jpg']}
              placeholderStyle={{ background: 'linear-gradient(135deg, #556B2F 0%, #6B8E23 50%, #8FBC8F 100%)' }}
              placeholderText="Batino's Garden"
              icon="🌿"
              category="E-Commerce"
              year="2025"
              title="Batino's Garden"
              description="A digital sanctuary for plant enthusiasts. E-commerce platform featuring curated botanicals and garden essentials."
              tags={['React', 'Node.js', 'MongoDB']}
            />
            <ProjectCard
              href="https://www.vapershive.store"
              screenshots={['/images/vapers-hive-screenshot1.png', '/images/vapers-hive-screenshot2.png']}
              placeholderStyle={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #333 50%, #4a4a4a 100%)' }}
              placeholderText="Vapers' Hive"
              icon="💨"
              category="Promotional"
              year="2025"
              title="Vapers' Hive"
              description="Bold promotional website with modern aesthetics and engaging user experience."
              tags={['Web Design', 'Branding']}
            />
            <ProjectCard
              href="https://ambag.online"
              screenshots={['/images/ambag-screenshot-1.jpg', '/images/ambag-screenshot-2.jpg', '/images/ambag-screenshot-3.jpg']}
              placeholderStyle={{ background: 'linear-gradient(135deg, #D35400 0%, #E67E22 50%, #F39C12 100%)' }}
              placeholderText="AMBAG"
              icon="✈️"
              category="Web App"
              year="2025"
              title="AMBAG"
              description="Budget tracker for travelers. Create or join budget plans with friends and track expenses mindfully."
              tags={['React', 'Node.js', 'MongoDB']}
            />
          </div>
        </section>

        {/* Interlude */}
        <section className="interlude">
          <div className="floating-elements">
            <div className="floating-ring floating-ring-4" />
            <div className="floating-circle floating-circle-3" />
            <div className="floating-dot floating-dot-4" />
          </div>
          <div className="interlude-content">
            <p className="interlude-text reveal-text">
              <span className="line">
                <span className="word">Less</span>
                <span className="word">noise,</span>
              </span>
              <span className="line">
                <span className="word">more</span>
                <span className="word accent">intention.</span>
              </span>
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="contact" id="contact">
          <div className="contact-floating-elements">
            <div className="floating-blob floating-blob-1" />
            <div className="floating-blob floating-blob-2" />
            <div className="floating-wave floating-wave-1" />
            <div className="floating-wave floating-wave-2" />
            <div className="floating-orb floating-orb-1" />
            <div className="floating-orb floating-orb-2" />
          </div>
          <div className="section-header">
            <span className="section-number">04</span>
            <h2 className="section-title reveal-text">Let's Connect</h2>
          </div>
          <div className="contact-content">
            <div className="contact-intro reveal-fade">
              <p className="large-text">Have a project in mind? Looking for a collaborator? Or just want to say hello?</p>
            </div>
            <div className="contact-cta reveal-fade delay-1">
              <a href="mailto:strike.sgera@gmail.com" className="contact-email magnetic-btn">
                <span className="email-text">strike.sgera@gmail.com</span>
              </a>
            </div>
            <div className="contact-social reveal-fade delay-2">
              <div className="social-links">
                <a href="https://www.linkedin.com/in/strike-esguerra" target="_blank" rel="noopener noreferrer" className="social-box magnetic-btn" data-platform="linkedin">
                  <div className="social-box-content">
                    <div className="social-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></div>
                    <div className="social-box-text"><span className="social-name">LinkedIn</span><span className="social-handle">/strike-esguerra</span></div>
                    <span className="social-arrow">↗</span>
                  </div>
                </a>
                <a href="https://github.com/Meeperer" target="_blank" rel="noopener noreferrer" className="social-box magnetic-btn" data-platform="github">
                  <div className="social-box-content">
                    <div className="social-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></div>
                    <div className="social-box-text"><span className="social-name">GitHub</span><span className="social-handle">@Meeperer</span></div>
                    <span className="social-arrow">↗</span>
                  </div>
                </a>
                <a href="https://www.facebook.com/strike.sgera" target="_blank" rel="noopener noreferrer" className="social-box magnetic-btn" data-platform="facebook">
                  <div className="social-box-content">
                    <div className="social-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>
                    <div className="social-box-text"><span className="social-name">Facebook</span><span className="social-handle">@strike.sgera</span></div>
                    <span className="social-arrow">↗</span>
                  </div>
                </a>
                <a href="https://www.instagram.com/lrdesg_" target="_blank" rel="noopener noreferrer" className="social-box magnetic-btn" data-platform="instagram">
                  <div className="social-box-content">
                    <div className="social-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></div>
                    <div className="social-box-text"><span className="social-name">Instagram</span><span className="social-handle">@lrdesg_</span></div>
                    <span className="social-arrow">↗</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-left">
              <span className="footer-name">Lord Mandell Esguerra <span className="alias-footer">(Meeperer)</span></span>
              <span className="footer-title">Developer & Designer</span>
            </div>
            <div className="footer-right">
              <span className="footer-location">📍 Philippines</span>
              <span className="footer-year">© {new Date().getFullYear()}</span>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-tagline">Built with intention and care.</p>
          </div>
        </footer>

        <DefaultDock />
        </ClickSpark>
      </div>
    </>
  );
}

function ProjectCard({ large, href, screenshots, placeholderStyle, placeholderText, icon, category, year, title, description, tags }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const n = screenshots.length;
  const go = (dir) => setActiveIndex((i) => (i + dir + n) % n);
  return (
    <article className={`project-card reveal-project ${large ? 'project-card-large' : ''}`}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="project-link">
        <div className="project-image">
          <div className="project-image-inner">
            <div className="project-screenshots">
              {screenshots.map((src, i) => (
                <img key={src} src={src} alt={`${title} screenshot ${i + 1}`} className={`project-screenshot ${i === activeIndex ? 'active' : ''}`} />
              ))}
            </div>
            <button type="button" className="carousel-arrow carousel-arrow-prev" aria-label="Previous image" onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(-1); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" className="carousel-arrow carousel-arrow-next" aria-label="Next image" onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(1); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
            <div className="project-carousel-dots">
              {screenshots.map((_, i) => (
                <button key={i} type="button" className={`carousel-dot ${i === activeIndex ? 'active' : ''}`} aria-label={`Image ${i + 1}`} data-index={i} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveIndex(i); }} />
              ))}
            </div>
            <div className="project-placeholder" style={placeholderStyle}>
              <span className="project-icon">{icon}</span>
              <span className="project-placeholder-text">{placeholderText}</span>
            </div>
          </div>
          <div className="project-overlay">
            <span className="visit-site-text">Visit site</span>
          </div>
        </div>
        <div className="project-info">
          <div className="project-meta">
            <span className="project-category">{category}</span>
            <span className="project-year">{year}</span>
          </div>
          <h3 className="project-title">{title}</h3>
          <p className="project-description">{description}</p>
          <div className="project-tags">
            {tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
          </div>
        </div>
        <div className="project-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
        </div>
      </a>
    </article>
  );
}

export default App;

