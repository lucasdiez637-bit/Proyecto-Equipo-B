import type { Order } from './types';
import { pesos } from './validators';

interface Props {
  order: Order;
  onNewPurchase: () => void;
}

export default function Receipt({ order, onNewPurchase }: Props) {
  return (
    <div className="payment-h3">
      <div className="payment-exito" aria-hidden="true">
        ✓
      </div>
      <h3 className="payment-centrado">¡Compra confirmada!</h3>
      <p className="payment-nota payment-centrado">
        Guardá tu comprobante: lo vas a necesitar el día del evento.
      </p>

      <div className="payment-comprobante">
        <h4>Comprobante de compra</h4>

        <dl>
          <div>
            <dt>N° de comprobante</dt>
            <dd>{order.id}</dd>
          </div>
          <div>
            <dt>Fecha</dt>
            <dd>{order.date}</dd>
          </div>
          <div>
            <dt>Comprador</dt>
            <dd>
              {order.buyer.name} ({order.buyer.email})
            </dd>
          </div>
          <div>
            <dt>Entrada</dt>
            <dd>
              {order.quantity} x {order.ticketName} ({pesos(order.unitPrice)} c/u)
            </dd>
          </div>
          <div>
            <dt>Subtotal</dt>
            <dd>{pesos(order.subtotal)}</dd>
          </div>
          <div>
            <dt>Cargo por servicio</dt>
            <dd>{pesos(order.cargo)}</dd>
          </div>
          <div>
            <dt>Medio de pago</dt>
            <dd>{order.paymentMethod}</dd>
          </div>
        </dl>

        <p className="payment-comprobante-total">
          <span>Total pagado</span>
          <strong>{pesos(order.total)}</strong>
        </p>
      </div>

      <div className="payment-acciones">
        <button type="button" className="payment-volver" onClick={() => window.print()}>
          Descargar / imprimir
        </button>
        <button type="button" className="payment-continuar" onClick={onNewPurchase}>
          Nueva compra
        </button>
      </div>
    </div>
  );
}
