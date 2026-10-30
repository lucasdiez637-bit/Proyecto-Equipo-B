import "./Tickets.css";
import { tickets } from "../../data/eventData";
import { selectEntrada, useCuposRestantes } from "../Payment-Gateway/checkoutStore";
import { EARLY_BIRD_ID } from "../Payment-Gateway/ticketsData";

function Tickets() {
  const cuposRestantes = useCuposRestantes();

  // En Early Bird, el número que sigue a "Quedan" en el chip (por ejemplo "Quedan 38")
  // se reemplaza por los cupos actuales, así cambia al comprar.
  // Las demás entradas, y cualquier otro número del texto, quedan tal cual.
  const badgeText = (id: string, badge: string) =>
    id === EARLY_BIRD_ID
      ? badge.replace(/(quedan\D*)\d+/i, `$1${cuposRestantes}`)
      : badge;

  return (
    <section id="entradas" className="tickets" aria-label="Entradas">
      <div className="tickets-container">
        <div className="tickets-grid row g-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={
                ticket.id === "virtual"
                  ? "col-12"
                  : "col-12 col-md-6"
              }
            >
              <article
                className={`ticket-card ticket-card--${ticket.id}`}
              >
                <header className="ticket-card-header">
                  <h3 className="ticket-name">{ticket.name}</h3>

                  <span className="ticket-badge">
                    {badgeText(ticket.id, ticket.badge)}
                  </span>
                </header>

                <div className="ticket-prices">
                  <strong className="ticket-price">
                    {ticket.price}
                  </strong>

                  {ticket.previousPrice && (
                    <del className="ticket-previous-price">
                      {ticket.previousPrice}
                    </del>
                  )}
                </div>

                <p className="ticket-description">
                  {ticket.description}
                </p>

                <ul className="ticket-benefits">
                  {ticket.benefits.map((benefit) => (
                    <li key={benefit}>
                      <span className="checkmark" aria-hidden="true">
                        ✓
                      </span>

                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* El href lleva a la pasarela y selectEntrada deja esta entrada elegida */}
                <a
                  href="#checkout"
                  className="ticket-button"
                  onClick={() => selectEntrada(ticket.id, ticket.name)}
                >
                  Comprar entrada
                </a>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tickets;
