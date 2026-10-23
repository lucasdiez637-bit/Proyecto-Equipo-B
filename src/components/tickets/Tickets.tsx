import "./Tickets.css";
import { tickets } from "../../data/eventData";

function Tickets() {
  return (
    <section
      id="entradas"
      className="tickets"
      aria-labelledby="tickets-title"
    >
    
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
                    {ticket.badge}
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

                  <a href="#checkout" className="ticket-button">
                    Comprar entrada
                  </a>
              </article>
            </div>
          ))}
        </div>
    </section>
  );
}

export default Tickets;


