import "./Tickets.css";
import { tickets } from "../../data/eventData";
import {
  selectEntrada,
  useCuposDisponibles,
  useCuposRestantes,
} from "../Payment-Gateway/checkoutStore";
import { EARLY_BIRD_ID } from "../Payment-Gateway/ticketsData";

function Tickets() {
  const cuposRestantes = useCuposRestantes();
  const cuposDisponibles = useCuposDisponibles();

  const agotada = (id: string) => id === EARLY_BIRD_ID && cuposDisponibles <= 0;

  // En Early Bird, el número que sigue a "Quedan" en el chip (por ejemplo "Quedan 38")
  // se reemplaza por los cupos actuales, así cambia al comprar. Si no queda ninguno, dice "Agotada".
  // Las demás entradas, y cualquier otro número del texto, quedan tal cual.
  const badgeText = (id: string, badge: string) => {
    if (id !== EARLY_BIRD_ID) return badge;
    if (agotada(id)) return "Agotada";
    return badge.replace(/(quedan\D*)\d+/i, `$1${cuposRestantes}`);
  };

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
                className={`ticket-card ticket-card--${ticket.id}${
                  agotada(ticket.id) ? " ticket-card--agotada" : ""
                }`}
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

                {agotada(ticket.id) ? (
                  <span
                    className="ticket-button ticket-button--agotada"
                    aria-disabled="true"
                  >
                    Agotada
                  </span>
                ) : (
                  // El href lleva a la pasarela y selectEntrada deja esta entrada elegida
                  <a
                    href="#checkout"
                    className="ticket-button"
                    onClick={() => selectEntrada(ticket.id, ticket.name)}
                  >
                    Comprar entrada
                  </a>
                )}
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tickets;
