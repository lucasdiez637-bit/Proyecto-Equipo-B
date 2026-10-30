import { useState } from 'react';
import { EARLY_BIRD_ID, ENTRADAS } from './ticketsData';
import { useCuposDisponibles } from './checkoutStore';
import type { Ticket } from './types';
import { pesos } from './validators';

interface Props {
  ticket: Ticket;
  setTicket: (ticket: Ticket) => void;
  onNext: () => void;
  notice?: string; // aviso que manda la pasarela (por ejemplo, si cambió la disponibilidad)
}

export default function StepTicket({ ticket, setTicket, onNext, notice }: Props) {
  // Texto del campo: permite borrarlo mientras se escribe sin que salte a 1
  const [qtyText, setQtyText] = useState(String(ticket.quantity));
  const disponibles = useCuposDisponibles();

  const isEarly = ticket.id === EARLY_BIRD_ID;
  const excede = isEarly && ticket.quantity > disponibles;

  const capWarning = excede
    ? disponibles === 1
      ? 'Solo queda 1 entrada Early Bird. Reducí la cantidad para continuar.'
      : `Solo quedan ${disponibles} entradas Early Bird. Reducí la cantidad para continuar.`
    : '';
  const warning = capWarning || notice || '';

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

      {ENTRADAS.map((e) => {
        const agotada = e.id === EARLY_BIRD_ID && disponibles <= 0;
        const className = agotada
          ? 'payment-opcion agotada'
          : e.id === ticket.id
            ? 'payment-opcion negrita'
            : 'payment-opcion';

        return (
          <label key={e.id} className={className}>
            <input
              type="radio"
              name="entrada"
              checked={e.id === ticket.id}
              disabled={agotada}
              onChange={() => setTicket({ ...ticket, id: e.id })}
            />
            <span className="payment-opcion-text">
              <strong>{e.nombre}</strong>
              <small>{agotada ? 'Agotada' : e.detalle}</small>
            </span>
            <strong>{pesos(e.precio)}</strong>
          </label>
        );
      })}

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
            disabled={isEarly && ticket.quantity >= disponibles}
            onClick={() => setQuantity(ticket.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      {isEarly && !excede && disponibles > 0 && (
        <p className="payment-nota">
          {disponibles === 1
            ? 'Queda 1 entrada Early Bird disponible.'
            : `Quedan ${disponibles} entradas Early Bird disponibles.`}
        </p>
      )}

      {warning && (
        <p className="payment-aviso" role="alert">
          {warning}
        </p>
      )}

      <button
        type="button"
        className="payment-continuar"
        onClick={onNext}
        disabled={qtyText === '' || ticket.quantity < 1 || excede}
      >
        Continuar
      </button>
      <p className="payment-nota">
        Pasarela de pago de ejemplo: no se procesan pagos ni se guardan datos.
      </p>
    </div>
  );
}
