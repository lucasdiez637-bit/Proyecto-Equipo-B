import type { CSSProperties, ReactNode } from "react";
import {
  BRONZE_SPONSORS,
  GOLD_SPONSORS,
  MAIN_PARTNERS,
  type AreaIcon,
} from "./sponsorsData";
import "./sponsors.css";

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const TIER_ICONS = {
  crown: <path d="M3 7l4.5 4L12 5l4.5 6L21 7l-2 11H5L3 7z" />,
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14L7 22l5-3 5 3-1.5-8" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
};

const AREA_ICONS: Record<AreaIcon, ReactNode> = {
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
    </>
  ),
  card: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </>
  ),
};

type TierHeaderProps = {
  id: string;
  icon: keyof typeof TIER_ICONS;
  title: string;
  badge: string;
  description: string;
};

function TierHeader({ id, icon, title, badge, description }: TierHeaderProps) {
  return (
    <header className="sponsors-tier-header">
      <span className="sponsors-tier-icon">
        <svg width="20" height="20" {...svgProps}>
          {TIER_ICONS[icon]}
        </svg>
      </span>
      <div>
        <h3 id={id} className="sponsors-tier-title">
          {title}
          <span className="sponsors-tier-badge">{badge}</span>
        </h3>
        <p className="sponsors-tier-description">{description}</p>
      </div>
    </header>
  );
}

function Sponsors() {
  return (
    <section id="sponsors" className="sponsors">
      <div className="sponsors-container">
        <h2 className="visually-hidden">Sponsors</h2>
        <section className="sponsors-tier sponsors-tier--diamond" aria-labelledby="tier-diamond">
          <TierHeader
            id="tier-diamond"
            icon="crown"
            title="Main Partners"
            badge="Tier Diamante"
            description="Presencia estelar en conferencias, stands experienciales y becas formativas"
          />
          <ul className="sponsors-list row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {MAIN_PARTNERS.map((p) => (
              <li key={p.name}>
                <article
                  className={p.featured ? "sponsors-main destacado" : "sponsors-main"}
                  style={{ "--accent": p.accent } as CSSProperties}
                >
                  <div className="sponsors-main-top">
                    <span className="sponsors-category">{p.category}</span>
                    <a
                      className="sponsors-link"
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visitar el sitio de ${p.name} (se abre en una pestaña nueva)`}
                    >
                      <svg width="16" height="16" {...svgProps}>
                        <path d="M7 17L17 7M8 7h9v9" />
                      </svg>
                    </a>
                  </div>
                  <span className="sponsors-logo sponsors-logo--lg">
                    <img src={p.logo} alt="" />
                  </span>
                  <h4 className="sponsors-main-name">{p.name}</h4>
                  <p className="sponsors-main-description">{p.description}</p>
                  <div className="sponsors-main-footer">
                    <span className="sponsors-area">
                      <svg width="18" height="18" {...svgProps}>
                        {AREA_ICONS[p.areaIcon]}
                      </svg>
                      {p.area}
                    </span>
                    <span className="sponsors-highlight">{p.highlight}</span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section className="sponsors-tier sponsors-tier--gold" aria-labelledby="tier-gold">
          <TierHeader
            id="tier-gold"
            icon="award"
            title="Gold Tier"
            badge="Nivel Oro"
            description="Líderes de producto, frameworks y transformación digital global"
          />
          <ul className="sponsors-list row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5 g-3">
            {GOLD_SPONSORS.map((s) => (
              <li key={s.name}>
                <article
                  className="sponsors-card sponsors-card--md"
                  style={s.accent ? ({ "--accent": s.accent } as CSSProperties) : undefined}
                >
                  <span className="sponsors-logo">
                    <img src={s.logo} alt="" />
                  </span>
                  <h4 className="sponsors-name">{s.name}</h4>
                  <p className="sponsors-specialty">{s.specialty}</p>
                  <span className="sponsors-tag">{s.tag}</span>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section className="sponsors-tier sponsors-tier--bronze" aria-labelledby="tier-bronze">
          <TierHeader
            id="tier-bronze"
            icon="layers"
            title="Bronze Tier"
            badge="Nivel Bronce"
            description="Herramientas y plataformas predilectas de la comunidad de desarrolladores"
          />
          <ul className="sponsors-list sponsors-bronze-grid">
            {BRONZE_SPONSORS.map((s) => (
              <li key={s.name}>
                <article className="sponsors-card sponsors-card--sm">
                  <span className="sponsors-logo sponsors-logo--sm">
                    <img src={s.logo} alt="" />
                  </span>
                  <h4 className="sponsors-name">{s.name}</h4>
                  <p className="sponsors-specialty">{s.specialty}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
export default Sponsors;
