import "./Contact.css";

function Contact() {
  const address =
    "Rolling Code School, General Paz 576, San Miguel de Tucumán";

  const encodedAddress = encodeURIComponent(address);

  const mapLink =
     `https://www.bing.com/maps?q=${encodedAddress}`;

  const mapEmbed =
    `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <section
      id="contact"
      className="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-container">
        <div className="row g-4 align-items-center">
         
          <div className="col-12 col-lg-5">
            <div className="contact-info">
              <p className="contact-eyebrow">CÓMO LLEGAR</p>

              <h2 id="contact-title" className="contact-title">
                Te esperamos en Rolling Code School
              </h2>

              <div className="contact-address">
                <svg
                  className="contact-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>

                <address className="contact-address-text">
                  <strong>Calle Gral. Paz 576, Entrepiso</strong>
                  <span>
                    4000 San Miguel de Tucumán, Tucumán
                  </span>
                </address>
              </div>

              <ul className="contact-details">
                <li>Jueves 19/11</li>
                <li>18.00 hs</li>
                <li>Entrepiso</li>
              </ul>

              <div className="contact-actions">
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-button contact-button--map"
                >
                  Abrir en Bing Maps
                </a>

                <a
                  href="#checkout"
                  className="contact-button contact-button--tickets"
                >
                  Comprar entrada
                </a>
              </div>
            </div>
          </div>

          
          <div className="col-12 col-lg-7">
            <div className="contact-map">
              <iframe
                className="contact-map-frame"
                title="Ubicación de Rolling Code School"
                src={mapEmbed}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;