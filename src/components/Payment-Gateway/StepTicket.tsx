import { useState } from 'react';
import { ENTRADAS } from './ticketsData';
import type { Ticket } from './types';
import { pesos } from './validators';

interface Props {
  ticket: Ticket;
  setTicket: (ticket: Ticket) => void;
  onNext: () => void;
}

export default function StepTicket({ ticket, setTicket, onNext }: Props) {
  // Texto del campo: permite borrarlo mientras se escribe sin que salte a 1
  const [qtyText, setQtyText] = useState(String(ticket.quantity));

  const setQuantity = (n: number) => {
    setTicket({ ...ticket, quantity: n });
    setQtyText(String(n));
  };

  const handleQtyChange = (raw: string) => {
    const digits = raw.replace(/\D/g, ''); // solo números
    setQtyText(digits);
    const n = Number(digits);
    if (digits !== '' && n >= 1) setTicket({ ...ticket, quantity: n });
  };

  // Si lo deja vacío o en 0, vuelve a 1
  const handleQtyBlur = () => {
    if (qtyText === '' || Number(qtyText) < 1) setQuantity(1);
  };

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
            onClick={() => setQuantity(Math.max(1, ticket.quantity - 1))}
          >
            −
          </button>
          <input
            className="payment-cantidad-input"
            type="text"
            inputMode="numeric"
            aria-label="Cantidad de entradas"
            value={qtyText}
            onChange={(e) => handleQtyChange(e.target.value)}
            onBlur={handleQtyBlur}
          />
          <button
            type="button"
            aria-label="Agregar una entrada"
            onClick={() => setQuantity(ticket.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        className="payment-continuar"
        onClick={onNext}
        disabled={qtyText === '' || ticket.quantity < 1}
      >
        Continuar
      </button>
      <p className="payment-nota">
        Pasarela de pago de ejemplo: no se procesan pagos ni se guardan datos.
      </p>
    </div>
  );
}
