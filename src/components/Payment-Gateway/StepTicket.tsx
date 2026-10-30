import { useState } from 'react';
import { EARLY_BIRD_ID, ENTRADAS } from './ticketsData';
import { useCuposDisponibles } from './checkoutStore';
import type { Ticket } from './types';
import { pesos } from './validators';

interface Props {
  ticket: Ticket;
  setTicket: (ticket: Ticket) => void;
  onNext: () => void;
  notice?: string;
}

export default function StepTicket({
  ticket,
  setTicket,
  onNext,
  notice,
}: Props) {
  const [qtyText, setQtyText] = useState(String(ticket.quantity));
  const disponibles = useCuposDisponibles();

  const isEarly = ticket.id === EARLY_BIRD_ID;
  const excede = isEarly && ticket.quantity > disponibles;

  const capWarning = isEarly
    ? disponibles <= 0
      ? 'Las entradas Early Bird se agotaron. Elegí otra entrada para continuar.'
      : excede
        ? disponibles === 1
          ? 'Solo queda 1 entrada Early Bird. Reducí la cantidad para continuar.'
          : `Solo quedan ${disponibles} entradas Early Bird. Reducí la cantidad para continuar.`
        : ''
    : '';

  const warning = capWarning || notice || '';

  // Actualiza la cantidad respetando el límite únicamente para Early Bird
  const setQuantity = (n: number) => {
    const quantity = isEarly
      ? Math.min(Math.max(1, n), Math.max(1, disponibles))
      : Math.max(1, n);

    setTicket({ ...ticket, quantity });
    setQtyText(String(quantity));
  };

  // Cambia el tipo de entrada y ajusta la cantidad si corresponde
  const changeTicket = (id: string) => {
    const nextIsEarly = id === EARLY_BIRD_ID;

    const quantity = nextIsEarly
      ? Math.min(ticket.quantity, Math.max(1, disponibles))
      : ticket.quantity;

    setTicket({ ...ticket, id, quantity });
    setQtyText(String(quantity));
  };

  // Permite escribir números, pero limita Early Bird a los cupos disponibles
  const handleQtyChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '');
    setQtyText(digits);

    if (digits === '') return;

    const n = Number(digits);
    if (n < 1) return;

    const quantity = isEarly
      ? Math.min(n, Math.max(1, disponibles))
      : n;

    setTicket({ ...ticket, quantity });

    if (isEarly && n > disponibles && disponibles > 0) {
      setQtyText(String(disponibles));
    }
  };

  // Si deja el campo vacío o en cero, vuelve a 1
  const handleQtyBlur = () => {
    if (qtyText === '' || Number(qtyText) < 1) {
      setQuantity(1);
      return;
    }

    setQuantity(Number(qtyText));
  };

  return (
    <div className="payment-h3">
      <h3>Elegí tu entrada</h3>

      {ENTRADAS.map((e) => {
        const agotada =
          e.id === EARLY_BIRD_ID && disponibles <= 0;

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
              onChange={() => changeTicket(e.id)}
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
            onClick={() => setQuantity(ticket.quantity - 1)}
            disabled={ticket.quantity <= 1}
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
            disabled={
              isEarly &&
              (disponibles <= 0 || ticket.quantity >= disponibles)
            }
            onClick={() => setQuantity(ticket.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      {isEarly && disponibles > 0 && !excede && (
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
        disabled={
          qtyText === '' ||
          ticket.quantity < 1 ||
          (isEarly && (excede || disponibles <= 0))
        }
      >
        Continuar
      </button>

      <p className="payment-nota">
        Pasarela de pago de ejemplo: no se procesan pagos ni se guardan datos.
      </p>
    </div>
  );
}