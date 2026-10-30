import { useState } from "react";
import logo from "../../Logo/logo-rolling-blanco.png";
import { NewsletterModal} from "../Newsletter/Newsletter";
import "./Navbar.css";
const navigationLinks = [
  { href: "#speakers", label: "Speakers" },
  { href: "#agenda", label: "Agenda" },
  { href: "#contact", label: "Cómo llegar" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleOpenNewsletter() {
    closeMenu();
    setIsNewsletterOpen(true);
  }

  function handleCloseNewsletter() {
    setIsNewsletterOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <nav
          className="site-navbar navbar navbar-expand-lg"
          aria-label="Navegación principal"
          onKeyDown={(event) => {
            if (event.key === "Escape" && !isNewsletterOpen) {
              closeMenu();
            }
          }}
        >
          <div className="site-navbar__container">
            <a
              className="site-navbar__brand"
              href="#"
              aria-label="Rolling Code School — Ir al inicio"
              onClick={closeMenu}
            >
              <img
                className="site-navbar__logo"
                src={logo}
                alt="Rolling Code School"
              />
            </a>
            <button
              className="site-navbar__toggle"
              type="button"
              aria-controls="main-navigation"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setIsMenuOpen((previous) => !previous)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <div
              id="main-navigation"
              className={`site-navbar__menu${
                isMenuOpen ? " site-navbar__menu--open" : ""
              }`}
            >
              <ul className="site-navbar__links">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      className="site-navbar__link"
                      href={link.href}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    className="site-navbar__newsletter-btn"
                    onClick={handleOpenNewsletter}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>Novedades</span>
                  </button>
                </li>
              </ul>
              <a
                className="site-navbar__button"
                href="#checkout"
                onClick={closeMenu}
              >
                Comprar entrada
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Modal del Newsletter */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={handleCloseNewsletter}
      />
    </>
  );
}
export default Navbar