interface SpeakerCardProps {
  name: string;
  image: string;
  talkTitle: string;
  description: string;
  featured?: boolean;
}

function SpeakerCard({
  name,
  image,
  talkTitle,
  description,
  featured = false,
}: SpeakerCardProps) {
  return (
    <article
      className={`speaker-card${featured ? " speaker-card--featured" : ""}`}
    >
      <img
        className="speaker-card__image"
        src={image}
        alt={`Foto de ${name}`}
        loading="lazy"
        width={300}
        height={300}
      />

      <h3 className="speaker-card__name">{name}</h3>

      <h4 className="speaker-card__talk">{talkTitle}</h4>

      <p className="speaker-card__description">{description}</p>
    </article>
  );
}

export default SpeakerCard;