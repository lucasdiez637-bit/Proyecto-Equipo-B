import { useEffect, useRef, useState } from 'react';
import './payment.css';
import StepIndicator from './StepIndicator';
import StepTicket from './StepTicket';
import StepBuyer from './StepBuyer';
import StepPayment from './StepPayment';
import Receipt from './Receipt';
import OrderSummary from './OrderSummary';
import { ENTRADAS, calcularPedido } from './ticketsData';
import { setReserved, useEntradaRequest } from './checkoutStore';
import type { Buyer, Order, StepNumber, SummaryData, Ticket } from './types';

const STORAGE_KEY = 'payment-last-order';
const EMPTY_TICKET: Ticket = { id: ENTRADAS[0]?.id ?? '', quantity: 1 };
const EMPTY_BUYER: Buyer = { name: '', email: '', phone: '' };

// Recupera el último comprobante si el usuario refresca la página en el paso 4
const loadOrder = (): Order | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
};

const saveOrder = (order: Order | null) => {
  try {
    if (order) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Si el navegador bloquea el almacenamiento, la compra sigue funcionando
  }
};

const summaryFromTicket = (ticket: Ticket): SummaryData => {
  const { entrada, subtotal, cargo, total } = calcularPedido(ticket.id, ticket.quantity);
  return { ticketName: entrada.nombre, quantity: ticket.quantity, subtotal, cargo, total };
};

function Payment() {
  const [order, setOrder] = useState<Order | null>(loadOrder);
  const [step, setStep] = useState<StepNumber>(() => (order ? 4 : 1));
  const [ticket, setTicket] = useState<Ticket>(EMPTY_TICKET);
  const [buyer, setBuyer] = useState<Buyer>(EMPTY_BUYER);
  const [processing, setProcessing] = useState(false);
  // true cuando el usuario ya empezó a elegir (así el Timer no cambia al cargar la página)
  const [engaged, setEngaged] = useState(false);

  const request = useEntradaRequest();

  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const firstRender = useRef(true);

  // Al cambiar de paso vuelve al inicio de la pasarela (no en la primera carga)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  // Limpia el temporizador si el componente se desmonta durante el pago
  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  // El usuario tocó "Comprar entrada" en la sección Tickets:
  // se deja esa entrada elegida y se vuelve al paso 1
  useEffect(() => {
    if (request.nonce === 0) return;
    window.clearTimeout(timerRef.current);
    saveOrder(null);
    setOrder(null);
    setProcessing(false);
    setTicket((t) => ({ ...t, id: request.id }));
    setEngaged(true);
    setStep(1);
  }, [request]);

  // Le avisa al Timer qué se está comprando (null = no hay compra en curso)
  useEffect(() => {
    setReserved(
      engaged && step < 4 && ticket.id
        ? { id: ticket.id, quantity: ticket.quantity }
        : null,
    );
  }, [engaged, step, ticket.id, ticket.quantity]);

  useEffect(() => () => setReserved(null), []);

  const updateTicket = (next: Ticket) => {
    setTicket(next);
    setEngaged(true);
  };

  const next = () => setStep((s) => (s < 4 ? ((s + 1) as StepNumber) : s));
  const back = () => setStep((s) => (s > 1 ? ((s - 1) as StepNumber) : s));

  // Deja la compra lista para empezar de nuevo (y el Timer vuelve a su valor inicial)
  const clearPurchase = () => {
    setTicket(EMPTY_TICKET);
    setBuyer(EMPTY_BUYER);
    setEngaged(false);
  };

  const confirmPayment = (last4: string) => {
    setProcessing(true);

    // Simula el procesamiento del pago
    timerRef.current = window.setTimeout(() => {
      const { entrada, subtotal, cargo, total } = calcularPedido(ticket.id, ticket.quantity);
      const newOrder: Order = {
        id: `WS-${Date.now().toString(36).toUpperCase()}`,
        date: new Date().toLocaleString('es-AR'),
        ticketName: entrada.nombre,
        quantity: ticket.quantity,
        unitPrice: entrada.precio,
        subtotal,
        cargo,
        total,
        buyer: { name: buyer.name, email: buyer.email },
        paymentMethod: `Tarjeta •••• ${last4}`,
      };
      saveOrder(newOrder);
      setOrder(newOrder);
      setProcessing(false);
      setStep(4);
      clearPurchase();
    }, 1500);
  };

  const resetPurchase = () => {
    saveOrder(null);
    setOrder(null);
    clearPurchase();
    setStep(1);
  };

  // En el paso 4 el resumen sale del pedido guardado (sirve también tras refrescar)
  const summary: SummaryData =
    step === 4 && order ? order : summaryFromTicket(ticket);

  return (
    <section id="checkout" className="payment-container" ref={sectionRef}>
      <div className="payment-block">
        <header className="payment-header">
          <div>
            <p className="payment-subtitle">Compra segura</p>
            <h2 className="payment-title">Finalizá tu compra</h2>
          </div>

          <StepIndicator current={step} />
        </header>

        <div className="row g-4 align-items-start">
          <div className="col-lg-7">
            {step === 1 && (
              <StepTicket ticket={ticket} setTicket={updateTicket} onNext={next} />
            )}

            {step === 2 && (
              <StepBuyer buyer={buyer} setBuyer={setBuyer} onNext={next} onBack={back} />
            )}

            {step === 3 && (
              <StepPayment
                total={summary.total}
                processing={processing}
                onPay={confirmPayment}
                onBack={back}
              />
            )}

            {step === 4 && order && <Receipt order={order} onNewPurchase={resetPurchase} />}
          </div>

          <div className="col-lg-5">
            <OrderSummary data={summary} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Payment;
