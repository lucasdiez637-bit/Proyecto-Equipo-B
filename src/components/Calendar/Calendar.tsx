import "./Calendar.css";
const TALKS = [
  { time: "18:00", topic: "Acreditación y bienvenida" },
  { time: "18:20", topic: "Tu primer día como developer", speaker: "Daniela Cardozo" },
  { time: "18:40", topic: "De cero a tu primer proyecto", speaker: "Franco Diaz" },
  { time: "19:00", topic: "Armá tu portfolio con IA", speaker: "Gaston" },
  { time: "19:20", topic: "Git y GitHub sin miedo", speaker: "Mauro" },
  { time: "19:40", topic: "Tu primer backend con Node", speaker: "Jose Diaz" },
  { time: "20:00", topic: "Preparate para tu primera entrevista", speaker: "Tomas Gomez" },
  { time: "20:20", topic: "Mi primer trabajo en IT", speaker: "Pablo Basso" },
  { time: "20:40", topic: "Testing: cómo no romper todo", speaker: "Julian Martin" },
  { time: "21:00", topic: "Diseño para developers", speaker: "Tomas Escudero" },
  { time: "21:20", topic: "Tu primera base de datos", speaker: "Andres Perlo" },
  { time: "21:40", topic: "Preguntas y networking" },
];
function Calendar() {
  return (
    <section id="agenda" className="agenda">
      <div className="agenda-container row g-4">
        <div className="col-lg-4">
          <header className="agenda-header">
            <p className="agenda-label">Agenda</p>
            <h2 className="agenda-title">
              <time dateTime="2026-11-19">Jueves 19 de noviembre</time>
            </h2>
            <p className="agenda-description">
              Diez charlas cortas para salir con un plan claro. Al final queda
              tiempo para preguntas y networking.
            </p>
          </header>
        </div>
        <div className="col-lg-8">
          <ol className="agenda-list">
            {TALKS.map((t) => (
              <li key={t.time} className="agenda-item">
                <time className="agenda-time" dateTime={t.time}>
                  {t.time}
                </time>
                <div className="agenda-talk">
                  <h3>{t.topic}</h3>
                  {t.speaker && <p>{t.speaker}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
export default Calendar;
