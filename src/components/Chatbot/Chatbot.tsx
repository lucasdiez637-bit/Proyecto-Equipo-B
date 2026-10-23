import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import "./Chatbot.css";
import { EVENT_DATE_LABEL, talks, tickets } from "../../data/eventData";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [hasReply, setHasReply] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const resetChat = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setUserMessage("");
    setSentMessage(null);
    setIsTyping(false);
    setHasReply(false);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    resetChat();
  }, [resetChat]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeChat();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeChat]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;

    if (hasReply && replyRef.current) {
      container.scrollTo({ top: replyRef.current.offsetTop, behavior: "smooth" });
      return;
    }

    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [isTyping, hasReply, sentMessage]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = userMessage.trim();
    if (!text || sentMessage !== null) return;

    setSentMessage(text);
    setUserMessage("");
    setIsTyping(true);

    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      setIsTyping(false);
      setHasReply(true);
    }, 700);
  };

  const isFinished = sentMessage !== null;

  return (
    <div className="chatbot">
      {isOpen && (
        <section
          id="chatbot-panel"
          className="chatbot-panel"
          role="dialog"
          aria-labelledby="chatbot-title"
        >
          <header className="chatbot-header">
            <div>
              <p className="chatbot-eyebrow">Rolling Code</p>
              <h2 id="chatbot-title" className="chatbot-title">
                Asistente virtual
              </h2>
            </div>

            <button
              type="button"
              className="chatbot-close"
              onClick={closeChat}
              aria-label="Cerrar chat"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div
            ref={messagesRef}
            className="chatbot-messages"
            aria-live="polite"
          >
            <div className="chatbot-bubble chatbot-bubble--bot">
              <p>
                ¡Hola! Soy el asistente de Rolling Code. Escribime lo que
                necesites y te muestro los planes disponibles y la agenda del
                evento.
              </p>
            </div>

            {sentMessage && (
              <div className="chatbot-bubble chatbot-bubble--user">
                <p>{sentMessage}</p>
              </div>
            )}

            {isTyping && (
              <div
                className="chatbot-bubble chatbot-bubble--bot chatbot-typing"
                aria-label="Escribiendo respuesta"
              >
                <span />
                <span />
                <span />
              </div>
            )}

            {hasReply && (
              <div
                ref={replyRef}
                className="chatbot-bubble chatbot-bubble--bot chatbot-reply"
              >
                <p className="chatbot-reply-intro">
                  Estos son los planes disponibles y la agenda del evento:
                </p>

                <p className="chatbot-reply-title">Planes</p>

                <ul className="chatbot-plans">
                  {tickets.map((ticket) => (
                    <li key={ticket.id} className="chatbot-plan">
                      <div className="chatbot-plan-head">
                        <span className="chatbot-plan-name">
                          {ticket.name}
                        </span>
                        <span className="chatbot-plan-price">
                          {ticket.price}
                        </span>
                      </div>

                      <p className="chatbot-plan-meta">
                        {ticket.badge} · {ticket.description}
                      </p>

                      <ul className="chatbot-plan-benefits">
                        {ticket.benefits.slice(0, 2).map((benefit) => (
                          <li key={benefit}>{benefit}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>

                <a href="#entradas" className="chatbot-link" onClick={closeChat}>
                  Ver entradas
                </a>

                <p className="chatbot-reply-title">
                  Agenda · {EVENT_DATE_LABEL}
                </p>

                <ol className="chatbot-agenda">
                  {talks.map((talk) => (
                    <li key={talk.time}>
                      <span className="chatbot-agenda-time">{talk.time}</span>
                      <span className="chatbot-agenda-topic">
                        {talk.topic}
                        {talk.speaker && <small>{talk.speaker}</small>}
                      </span>
                    </li>
                  ))}
                </ol>

                <a href="#agenda" className="chatbot-link" onClick={closeChat}>
                  Ver agenda completa
                </a>
              </div>
            )}
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              className="chatbot-input"
              type="text"
              value={userMessage}
              onChange={(event) => setUserMessage(event.target.value)}
              placeholder={
                isFinished ? "Demo finalizada" : "Escribí tu consulta..."
              }
              aria-label="Mensaje para el asistente"
              disabled={isFinished}
            />

            <button
              type="submit"
              className="chatbot-send"
              aria-label="Enviar mensaje"
              disabled={isFinished || !userMessage.trim()}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </form>

          {isFinished && (
            <p className="chatbot-note">
              Maqueta interactiva: esta conversación tiene un único intercambio.
            </p>
          )}
        </section>
      )}

      <button
        type="button"
        className="chatbot-launcher"
        onClick={() => (isOpen ? closeChat() : setIsOpen(true))}
        aria-expanded={isOpen}
        aria-controls="chatbot-panel"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default Chatbot;
