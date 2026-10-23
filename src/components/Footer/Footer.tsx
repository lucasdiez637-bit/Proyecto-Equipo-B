import "./Footer.css";
import logo from "../../Logo/logo-rolling-blanco.png";
import instagramIcon from "../../Icons/instagram.svg";
import facebookIcon from "../../icons/facebook.svg";
import linkedinIcon from "../../icons/linkedin.svg";
import youtubeIcon from "../../icons/youtube.svg";
import xIcon from "../../icons/x.svg";
import githubIcon from "../../icons/github.svg";
const socialLinks = [
  { id: "instagram", name: "Instagram", icon: instagramIcon },
  { id: "facebook", name: "Facebook", icon: facebookIcon },
  { id: "linkedin", name: "LinkedIn", icon: linkedinIcon },
  { id: "youtube", name: "YouTube", icon: youtubeIcon },
  { id: "x", name: "X", icon: xIcon },
  { id: "github", name: "GitHub", icon: githubIcon },
];
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <a
          className="footer__brand"
          href="/"
          aria-label="Ir al inicio"
        >
          <img
            className="footer__logo"
            src={logo}
            alt="Rolling Code School"
          />
        </a>

        <nav className="footer__social" aria-label="Redes sociales">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              className="footer__social-link"
              href={`#${social.id}`}
              aria-label={social.name}
            >
              <img
                src={social.icon}
                alt=""
                aria-hidden="true"
              />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
export default Footer;