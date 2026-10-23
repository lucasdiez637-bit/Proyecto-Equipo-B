import "./Hero.css";
function Hero() {
  return (
    <section id="home" className="hero-container">
      <div className="hero-block">
        <div className="hero-text">
          <p className="hero-tag">
            <em>Workshop</em> <strong>Entradas limitadas</strong>
          </p>

          <h1 className="hero-title">
            <span>¿Por dónde</span>
            <span>empiezo a</span>
            <span className="hero-dark">programar?</span>
          </h1>

          <p className="hero-description">
            Una tarde con diez speakers de Rolling Code School para ordenar tus
            primeros pasos: qué aprender, cómo practicar y cómo mostrar lo que sabés.
          </p>

          <div className="hero-buttons">
            <a href="#checkout" className="btn-hero btn-hero-dark">
              Comprar entrada
            </a>
            <a href="#agenda" className="btn-hero btn-hero-border">
              Ver agenda
            </a>
          </div>
        </div>

        <aside className="hero-card" aria-label="Event details">
          <div className="hero-data">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="5" width="16" height="15" rx="3" />
              <path d="M8 3v4M16 3v4M4 10h16" />
            </svg>
            <div>
              <strong>JUE 19/11</strong>
              <span className="hero-time">18.00 hs</span>
            </div>
          </div>

          <div className="hero-data">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z" />
            </svg>
            <div>
              <strong>Rolling Code School</strong>
              <span>Gral. Paz 576, Entrepiso</span>
            </div>
          </div>

          <div className="hero-data">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 7h16a1 1 0 011 1v2a2 2 0 000 4v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a2 2 0 000-4V8a1 1 0 011-1z" />
              <path d="M14 7v10" strokeDasharray="2 2" />
            </svg>
            <div>
              <strong>Entradas desde $15.000</strong>
              <span>Early Bird hasta el 31/10</span>
            </div>
          </div>

          <div className="hero-chips">
            <span className="hero-chip">Presencial</span>
            <span className="hero-chip">Virtual</span>
            <span className="hero-chip hero-chip-red">Cupos limitados</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
export default Hero