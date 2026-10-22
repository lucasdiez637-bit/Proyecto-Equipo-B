import { useState, useEffect } from "react";
import "./Timer.css"
const LIMITE = new Date("2026-10-31T23:59:59");
const CUPOS_TOTALES = 60;
const CUPOS_RESTANTES = 38;
const VENDIDAS = 63;

function calcular() {
  const diff = Math.max(LIMITE.getTime() - Date.now(), 0);
  return {
    dias: Math.floor(diff / 86400000),
    horas: Math.floor((diff / 3600000) % 24),
    min: Math.floor((diff / 60000) % 60),
  };
}
const dos = (n: number) => String(n).padStart(2, "0");
export default function Timer() {
  const [t, setT] = useState(calcular);
  useEffect(() => {
    const id = setInterval(() => setT(calcular()), 1000);
    return () => clearInterval(id);
  }, []);
  const unidades = [
    { valor: t.dias, etiqueta: "DÍAS" },
    { valor: t.horas, etiqueta: "HORAS" },
    { valor: t.min, etiqueta: "MIN" },
  ]; 
  return (
    <section className="section">
      <p className="etiqueta">Entradas</p>
      <h2 className="title">Asegurá tu lugar antes de que suba el precio</h2>
      <div className="block">
        <div className="info">
          <span className="label">Early Bird</span>
          <h3>El precio especial termina el 31/10</h3>
          <p>Después la entrada pasa de $25.000 a $35.000.</p>
        </div>
        <div className="timer" role="timer">
          {unidades.map((u) => (
            <div key={u.etiqueta} className="timer-box">
              <strong>{dos(u.valor)}</strong>
              <span>{u.etiqueta}</span>
            </div>
          ))}
        </div>
        <div className="available">
          <div className="available-text">
            <strong>Quedan {CUPOS_RESTANTES} de {CUPOS_TOTALES} Early Bird</strong>
            <span>{VENDIDAS}% vendidas</span>
          </div>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${VENDIDAS}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}