import googleCloud from "../../../src/Sponsors/google-cloud.svg";
import aws from "../../../src/Sponsors/aws.svg";
import mercadoLibre from "../../../src/Sponsors/mercado-libre.svg";
import microsoftAzure from "../../../src/Sponsors/microsoft-azure.svg";
import github from "../../../src/Sponsors/github.svg";
import globant from "../../../src/Sponsors/globant.svg";
import auth0 from "../../../src/Sponsors/auth0.svg";
import vercel from "../../../src/Sponsors/vercel.svg";
import supabase from "../../../src/Sponsors/supabase.svg";
import digitalocean from "../../../src/Sponsors/digitalocean.svg";
import cloudflare from "../../../src/Sponsors/cloudflare.svg";
import mongodb from "../../../src/Sponsors/mongodb.svg";
import docker from "../../../src/Sponsors/docker.svg";
import stripe from "../../../src/Sponsors/stripe.svg";
import postman from "../../../src/Sponsors/postman.svg";

export type AreaIcon = "cpu" | "server" | "card";

export type MainPartner = {
  name: string;
  logo: string;
  category: string;
  description: string;
  area: string;
  areaIcon: AreaIcon;
  highlight: string;
  url: string;
  accent: string;
  featured?: boolean;
};

export type GoldSponsor = {
  name: string;
  logo: string;
  specialty: string;
  tag: string;
  accent?: string;
};

export type BronzeSponsor = {
  name: string;
  logo: string;
  specialty: string;
};

export const MAIN_PARTNERS: MainPartner[] = [
  {
    name: "Google Cloud",
    logo: googleCloud,
    category: "Lead Cloud Partner",
    description:
      "Infraestructura global ultra-escalable, Gemini AI APIs y programas de formación profesional para devs.",
    area: "Cloud & AI",
    areaIcon: "cpu",
    highlight: "100% Verified",
    url: "https://cloud.google.com",
    accent: "#e0202a",
  },
  {
    name: "Amazon Web Services",
    logo: aws,
    category: "Infrastructure Partner",
    description:
      "Servicios de nube, arquitecturas serverless y vouchers para certificaciones oficiales para la comunidad.",
    area: "Cloud Hosting",
    areaIcon: "server",
    highlight: "Global Leader",
    url: "https://aws.amazon.com",
    accent: "#ff9900",
  },
  {
    name: "Mercado Libre",
    logo: mercadoLibre,
    category: "Fintech & E-commerce",
    description:
      "El mayor ecosistema tech de Latinoamérica impulsando becas, hackathons y pasantías directas de empleo.",
    area: "Fintech Scale",
    areaIcon: "card",
    highlight: "Unicorn LATAM",
    url: "https://www.mercadolibre.com.ar",
    accent: "#ffe600",
    featured: true,
  },
];

export const GOLD_SPONSORS: GoldSponsor[] = [
  { name: "Microsoft", logo: microsoftAzure, specialty: "Azure & Dev Tools", tag: "Enterprise" },
  { name: "GitHub", logo: github, specialty: "Open Source & Copilot", tag: "Community" },
  { name: "Globant", logo: globant, specialty: "Tech Reinvention", tag: "Global Talent", accent: "#bfd732" },
  { name: "Auth0", logo: auth0, specialty: "Identity & Security", tag: "Security" },
  { name: "Vercel", logo: vercel, specialty: "Frontend Cloud & Next", tag: "Deployment" },
];

export const BRONZE_SPONSORS: BronzeSponsor[] = [
  { name: "Supabase", logo: supabase, specialty: "Open-source DB" },
  { name: "DigitalOcean", logo: digitalocean, specialty: "Cloud VPS" },
  { name: "Cloudflare", logo: cloudflare, specialty: "Edge & DNS" },
  { name: "MongoDB", logo: mongodb, specialty: "Document DB" },
  { name: "Docker", logo: docker, specialty: "Containers" },
  { name: "Stripe", logo: stripe, specialty: "Payments API" },
  { name: "Postman", logo: postman, specialty: "API Platform" },
];
