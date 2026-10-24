export type Ticket = {
  id: string;
  name: string;
  badge: string;
  price: string;
  previousPrice?: string;
  description: string;
  benefits: string[];
};

export type Talk = {
  time: string;
  topic: string;
  speaker?: string;
};

export const EVENT_DATE_LABEL = "Jueves 19 de noviembre";
export const EVENT_DATE_ISO = "2026-11-19";

export const tickets: Ticket[] = [
  {
    id: "early",
    name: "Early Bird",
    badge: "Quedan 38",
    price: "$25,000",
    previousPrice: "$35,000",
    description: "Presencial · precio especial hasta el 31/10",
    benefits: [
      "Acceso a las 10 charlas",
      "Kit de stickers Rolling Code",
      "Certificado de asistencia",
      "Coffee break y networking con los speakers",
      "Grabación de todas las charlas",
    ],
  },
  {
    id: "general",
    name: "General",
    badge: "Desde 11/1",
    price: "$35,000",
    description: "Presencial · precio regular",
    benefits: [
      "Acceso a las 10 charlas",
      "Certificado de asistencia",
      "Coffee break y networking con los speakers",
      "Grabación de todas las charlas",
    ],
  },
  {
    id: "virtual",
    name: "Virtual",
    badge: "Desde donde estés",
    price: "$15,000",
    description: "Transmisión en vivo",
    benefits: [
      "Transmisión en vivo de las 10 charlas",
      "Chat para hacer preguntas a los speakers",
      "Certificado de asistencia",
      "Grabación disponible por 30 días",
    ],
  },
];

export const talks: Talk[] = [
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
