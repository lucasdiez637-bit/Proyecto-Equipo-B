import { useState } from "react";
import "./Payment.css";
const ENTRADAS = [
  {
    id: "early",
    nombre: "Early Bird",
    detalle: "Presencial · hasta el 31/10",
    precio: 25000,
  },
  {
    id: "general",
    nombre: "General",
    detalle: "Presencial · desde el 1/11",
    precio: 35000,
  },
  {
    id: "virtual",
    nombre: "Virtual",
    detalle: "Transmisión en vivo y grabación",
    precio: 15000,
  },
];
function pesos(n: number) {
  return (
    "$" +
    Math.round(n)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );
}
function Payment() {
  const [entradaId, setEntradaId] = useState("early");
  const [cantidad, setCantidad] = useState(1);
  const entrada = ENTRADAS.find((e) => e.id === entradaId) ?? ENTRADAS[0];
  const subtotal = entrada.precio * cantidad;
  const cargo = subtotal * 0.05;
  const total = subtotal + cargo;
  return (
    <section id="checkout" className="payment-container">
      <div className="payment-block">
        <header className="payment-header">
          <div>
            <p className="payment-subtitle">Compra segura</p>
            <h2 className="payment-title">Finalizá tu compra</h2>
          </div>

          <ol className="payment-pasos" aria-label="Pasos de la compra">
            <li className="payment-paso actual">1 Entrada</li>
            <li className="payment-paso">2 Datos</li>
            <li className="payment-paso">3 Pago</li>
            <li className="payment-paso">4 Listo</li>
          </ol>
        </header>
        <div className="row g-4 align-items-start">
          <div className="col-lg-7">
            <div className="payment-h3">
              <h3>Elegí tu entrada</h3>

              {ENTRADAS.map((e) => (
                <label
                  key={e.id}
                  className={
                    e.id === entradaId
                      ? "payment-opcion negrita"
                      : "payment-opcion"
                  }
                >
                  <input
                    type="radio"
                    name="entrada"
                    checked={e.id === entradaId}
                    onChange={() => setEntradaId(e.id)}
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
                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  >
                    −
                  </button>
                  <span>{cantidad}</span>
                  <button
                    type="button"
                    aria-label="Agregar una entrada"
                    onClick={() => setCantidad(Math.min(10, cantidad + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
              <button type="button" className="payment-continuar">
                Continuar
              </button>
              <p className="payment-nota">
                Pasarela de pago de ejemplo: no se procesan pagos ni se guardan
                datos.
              </p>
            </div>
          </div>
          <div className="col-lg-5">
            <aside className="payment-resume">
              <p className="payment-etiqueta">Tu pedido</p>
              <h3>Workshop Rolling Code School</h3>
              <p className="payment-gris">
                Jueves 19/11 · 18:00 hs · Gral. Paz 576
              </p>

              <div className="payment-fila">
                <span>
                  {cantidad} {cantidad === 1 ? "entrada" : "entradas"}{" "}
                  {entrada.nombre}
                </span>
                <span>{pesos(subtotal)}</span>
              </div>
              <div className="payment-fila">
                <span>Cargo por servicio (5%)</span>
                <span>{pesos(cargo)}</span>
              </div>
              <div className="payment-fila payment-total">
                <span>Total</span>
                <strong>{pesos(total)}</strong>
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
          </div>
        </div>
      </div>
    </section>
  );
}
export default Payment;
