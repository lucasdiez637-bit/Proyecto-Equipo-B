import "./Footer.css";
import logo from "../../Logo/logo-rolling-blanco.png";
import instagramIcon from "../../Icons/instagram.svg";
import facebookIcon from "../../Icons/facebook.svg";
import linkedinIcon from "../../Icons/linkedin.svg";
import youtubeIcon from "../../Icons/youtube.svg";
import xIcon from "../../Icons/x.svg";
import githubIcon from "../../Icons/github.svg";
const socialLinks = [
  {
    id: "instagram",
    name: "Instagram",
    icon: instagramIcon,
    url: "https://www.instagram.com/rollingcodeschool/?hl=es",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: facebookIcon,
    url: "https://www.facebook.com/RollingCodeSchool/?locale=es_LA",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: linkedinIcon,
    url: "https://www.linkedin.com/school/rollingcodeschool/home/",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: youtubeIcon,
    url: "https://www.youtube.com/@rollingcode7175",
  },
  { id: "x", name: "X", icon: xIcon, url: "" },
  { id: "github", name: "GitHub", icon: githubIcon, url: "" },
];
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <a className="footer__brand" href="/" aria-label="Ir al inicio">
          <img className="footer__logo" src={logo} alt="Rolling Code School" />
        </a>

        <nav className="footer__social" aria-label="Redes sociales">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              className="footer__social-link"
              href={social.url || `#${social.id}`}
              target={social.url ? "_blank" : undefined}
              rel={social.url ? "noopener noreferrer" : undefined}
              aria-label={social.name}
            >
              <img src={social.icon} alt="" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
export default Footer;
