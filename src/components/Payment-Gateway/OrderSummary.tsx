import { CARGO_SERVICIO, EVENTO } from './ticketsData';
import type { SummaryData } from './types';
import { pesos } from './validators';

export default function OrderSummary({ data }: { data: SummaryData }) {
  return (
    <aside className="payment-resume">
      <p className="payment-etiqueta">Tu pedido</p>
      <h3>{EVENTO.nombre}</h3>
      <p className="payment-gris">{EVENTO.detalle}</p>

      <div className="payment-fila">
        <span>
          {data.quantity} {data.quantity === 1 ? 'entrada' : 'entradas'} {data.ticketName}
        </span>
        <span>{pesos(data.subtotal)}</span>
      </div>
      <div className="payment-fila">
        <span>Cargo por servicio ({Math.round(CARGO_SERVICIO * 100)}%)</span>
        <span>{pesos(data.cargo)}</span>
      </div>
      <div className="payment-fila payment-total">
        <span>Total</span>
        <strong>{pesos(data.total)}</strong>
      </div>

      <p className="payment-seguro">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 018 0v3" />
        </svg>
        Pago protegido. Recibís la entrada por email.
      </p>
    </aside>
  );
}
