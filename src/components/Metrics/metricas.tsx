import "./metricas.css";
const METRICS = [
  { value: "120", description: "lugares presenciales" },
  { value: "10", description: "charlas de speakers" },
  { value: "3 h 40", description: "de 18.00 a 21.40 hs" },
  { value: "2", description: "modalidades: presencial y virtual" },
];
function Metrics() {
  return (
    <section className="metrics" aria-label="Métricas del workshop">
      <div className="metrics-container metrics-card">
        <ul className="metrics-list row g-4">
          {METRICS.map((m) => (
            <li key={m.description} className="col-6 col-lg-3">
              <strong className="metrics-value">{m.value}</strong>
              <p className="metrics-description">{m.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export default Metrics;
