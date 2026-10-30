import SpeakerCard from "./SpeakersCard";
import "./Speakers.css";
import speaker6 from "../../Speakers/Tomas.jpeg";
import speaker5 from "../../Speakers/Pablo.jpeg";
import speaker2 from "../.././Speakers/Franco.jpeg";
import speaker3 from "../../Speakers/Jose.jpeg";
import speaker1 from "../../Speakers/Daniela.jpeg";
import speaker0 from "../.././Speakers/Julian.jpeg";
import speaker7 from "../../Speakers/Tomas E.jpeg";
import speaker8 from "../../Speakers/Gaston.jpeg";
import speaker9 from "../../Speakers/Mauro.jpeg";
import speaker10 from "../../Speakers/Andres.jpeg";

const speakers = [
  {
    id: "tomas-escudero",
    name: "Tomas Escudero",
    image: speaker7,
    talkTitle: "Diseño para developers",
    description:
      "Qué mira un equipo de diseño antes de que escribas código y cómo leer un mockup para construirlo igual.",
  },
  {
    id: "franco-diaz",
    name: "Franco Diaz",
    image: speaker2,
    talkTitle: "De cero a tu primer proyecto",
    description:
      "Un recorrido para pasar de mirar tutoriales a terminar una app simple con HTML, JavaScript y React.",
  },
  {
    id: "gaston",
    name: "Gaston",
    image: speaker8,
    talkTitle: "Armá tu portfolio con IA",
    description:
      "Cómo usar asistentes de IA para construir y publicar un portfolio que muestre lo que sabés hacer.",
  },
  {
    id: "mauro",
    name: "Mauro",
    image: speaker9,
    talkTitle: "Git y GitHub sin miedo",
    description:
      "Los comandos que vas a usar todos los días y cómo trabajar en equipo sin pisar el código de otros.",
  },
  {
    id: "jose-diaz",
    name: "Jose Diaz",
    image: speaker3,
    talkTitle: "Tu primer backend con Node",
    description:
      "Cómo se arma una API, qué hace una base de datos y por dónde empezar para conectar todo.",
  },
  {
    id: "tomas-gomez",
    name: "Tomas Gomez",
    image: speaker6,
    talkTitle: "Preparate para tu primera entrevista",
    description:
      "Qué preguntan en una entrevista técnica, cómo practicar y cómo contar tus proyectos con claridad.",
  },
  {
    id: "pablo-basso",
    name: "Pablo Basso",
    image: speaker5,
    talkTitle: "Mi primer trabajo en IT",
    description:
      "Una charla en primera persona sobre cómo se consigue el primer puesto y qué se aprende en los primeros meses.",
  },
  {
    id: "julian-martin",
    name: "Julian Martin",
    image: speaker0,
    talkTitle: "Testing: cómo no romper todo",
    description:
      "Qué es testear, por qué importa y cómo escribir tus primeras pruebas sin complicarte.",
  },
  {
    id: "daniela-cardozo",
    name: "Daniela Cardozo",
    image: speaker1,
    talkTitle: "Tu primer día como developer",
    description:
      "Qué esperar de tu primera semana en un equipo, qué herramientas usar y cómo pedir ayuda sin miedo.",
  },
  {
    id: "andres-perlo",
    name: "Andres Perlo",
    image: speaker10,
    talkTitle: "Tu primera base de datos",
    description:
      "Qué es una base de datos, para qué sirve y cómo guardar y consultar tus primeros datos.",
  },
];

function Speakers() {
  return (
    <section
      id="speakers"
      className="speakers"
      aria-labelledby="speakers-title"
    >
      <div className="speakers__container">
        <header className="speakers__header">
          <p className="speakers__eyebrow">SPEAKERS</p>

          <h2 id="speakers-title" className="speakers__title">
            Diez charlas, un mismo objetivo
          </h2>
        </header>

        <div className="speakers__grid row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5 g-4">
          {speakers.map((speaker) => (
            <div className="col" key={speaker.id}>
              <a
  className="speaker-agenda-link"
  href={`#agenda-${speaker.id}`}
  aria-label={`Ver charla de ${speaker.name}`}
  onClick={(event) => {
    event.preventDefault();

    const target = document.getElementById(
      `agenda-${speaker.id}`
    );

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    target.getAnimations().forEach((animation) => {
      animation.cancel();
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target.style.outline = "2px solid #f0b429";
      target.style.outlineOffset = "4px";
      return;
    }

    target.animate(
      [
        {
          backgroundColor: "transparent",
          boxShadow: "0 0 0 0 transparent",
        },
        {
          backgroundColor: "rgba(240, 180, 41, 0.22)",
          boxShadow: "0 0 0 8px rgba(240, 180, 41, 0.12)",
          offset: 0.15,
        },
        {
          backgroundColor: "rgba(240, 180, 41, 0.22)",
          boxShadow: "0 0 0 8px rgba(240, 180, 41, 0.12)",
          offset: 0.65,
        },
        {
          backgroundColor: "transparent",
          boxShadow: "0 0 0 0 transparent",
        },
      ],
      {
        duration: 2200,
        easing: "ease",
      }
    );
  }}
>
  <SpeakerCard
    name={speaker.name}
    image={speaker.image}
    talkTitle={speaker.talkTitle}
    description={speaker.description}
  />
</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Speakers;
