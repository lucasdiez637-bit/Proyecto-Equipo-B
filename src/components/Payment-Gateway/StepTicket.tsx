import { ENTRADAS, MAX_POR_COMPRA } from './ticketsData';
import type { Ticket } from './types';
import { pesos } from './validators';

interface Props {
  ticket: Ticket;
  setTicket: (ticket: Ticket) => void;
  onNext: () => void;
}

export default function StepTicket({ ticket, setTicket, onNext }: Props) {
  return (
    <div className="payment-h3">
      <h3>Elegí tu entrada</h3>

      {ENTRADAS.map((e) => (
        <label
          key={e.id}
          className={e.id === ticket.id ? 'payment-opcion negrita' : 'payment-opcion'}
        >
          <input
            type="radio"
            name="entrada"
            checked={e.id === ticket.id}
            onChange={() => setTicket({ ...ticket, id: e.id })}
          />
          <span className="payment-opcion-text">
            <strong>{e.nombre}</strong>
            <small>{e.detalle}</small>
          </span>
          <strong>{pesos(e.precio)}</strong>
        </label>
      ))}

      <div className="payment-cantidad">
        <span>Cantidad</span>
        <div>
          <button
            type="button"
            aria-label="Quitar una entrada"
            onClick={() => setTicket({ ...ticket, quantity: Math.max(1, ticket.quantity - 1) })}
          >
            −
          </button>
          <span>{ticket.quantity}</span>
          <button
            type="button"
            aria-label="Agregar una entrada"
            onClick={() =>
              setTicket({ ...ticket, quantity: Math.min(MAX_POR_COMPRA, ticket.quantity + 1) })
            }
          >
            +
          </button>
        </div>
      </div>

      <button type="button" className="payment-continuar" onClick={onNext}>
        Continuar
      </button>
      <p className="payment-nota">
        Pasarela de pago de ejemplo: no se procesan pagos ni se guardan datos.
      </p>
    </div>
  );
}
