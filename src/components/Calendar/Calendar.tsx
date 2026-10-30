import "./Calendar.css";

const TALKS = [
  { time: "18:00", topic: "Acreditación y bienvenida" },
  { time: "18:20", topic: "Tu primer día como developer", speaker: "Daniela Cardozo", speakerId: "daniela-cardozo" },
  { time: "18:40", topic: "De cero a tu primer proyecto", speaker: "Franco Diaz", speakerId: "franco-diaz" },
  { time: "19:00", topic: "Armá tu portfolio con IA", speaker: "Gaston", speakerId: "gaston" },
  { time: "19:20", topic: "Git y GitHub sin miedo", speaker: "Mauro", speakerId: "mauro" },
  { time: "19:40", topic: "Tu primer backend con Node", speaker: "Jose Diaz", speakerId: "jose-diaz" },
  { time: "20:00", topic: "Preparate para tu primera entrevista", speaker: "Tomas Gomez", speakerId: "tomas-gomez" },
  { time: "20:20", topic: "Mi primer trabajo en IT", speaker: "Pablo Basso", speakerId: "pablo-basso" },
  { time: "20:40", topic: "Testing: cómo no romper todo", speaker: "Julian Martin", speakerId: "julian-martin" },
  { time: "21:00", topic: "Diseño para developers", speaker: "Tomas Escudero", speakerId: "tomas-escudero" },
  { time: "21:20", topic: "Tu primera base de datos", speaker: "Andres Perlo", speakerId: "andres-perlo" },
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
            {TALKS.map((talk) => (
              <li
                key={talk.time}
                id={talk.speakerId ? `agenda-${talk.speakerId}` : undefined}
                className="agenda-item"
              >
                <time className="agenda-time" dateTime={talk.time}>
                  {talk.time}
                </time>
                <div className="agenda-talk">
                  <h3>{talk.topic}</h3>
                  {talk.speaker && <p>{talk.speaker}</p>}
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
