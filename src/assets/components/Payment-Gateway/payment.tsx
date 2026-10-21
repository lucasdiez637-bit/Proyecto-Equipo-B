import "./payment.css";
function payment() {
  return (
    <section id="payment" className="payment-container">
      <div className="payment-block">
        <h2 className="payment-title">Finalizá tu compra</h2>
        <div className="row g-4 align-items-start">
          <div className="col-lg-7">
            <div className="payment-h3">
              <h3>Elegí tu entrada</h3>

              <label className="payment-opcion negrita">
                <input type="radio" name="entrada" defaultChecked />
                <span className="payment-opcion-text">
                  <strong>Early Bird</strong>
                  <small>Presencial · hasta el 31/10</small>
                </span>
                <strong>$25.000</strong>
              </label>

              <label className="payment-opcion">
                <input type="radio" name="entrada" />
                <span className="payment-opcion-text">
                  <strong>General</strong>
                  <small>Presencial · desde el 1/11</small>
                </span>
                <strong>$35.000</strong>
              </label>

              <label className="payment-opcion">
                <input type="radio" name="entrada" />
                <span className="payment-opcion-text">
                  <strong>Virtual</strong>
                  <small>Transmisión en vivo y grabación</small>
                </span>
                <strong>$15.000</strong>
              </label>
              <div className="payment-cantidad">
                <span>Cantidad</span>
                <div>
                  <button type="button" aria-label="Quitar una entrada">
                    −
                  </button>
                  <span>1</span>
                  <button type="button" aria-label="Agregar una entrada">
                    +
                  </button>
                </div>
              </div>
              <button type="button" className="payment-continuar">
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default payment;
