
import React, { useState, useEffect } from 'react';
import './Newsletter.css';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  nombre: string;
  email: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Cerrar modal al presionar Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validateField = (
    name: keyof FormData,
    value: string
  ): string | undefined => {
    if (name === 'nombre') {
      const nombre = value.trim();

      if (!nombre) return 'El nombre es obligatorio.';
      if (nombre.length < 2) {
        return 'El nombre debe tener al menos 2 caracteres.';
      }
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        return 'El nombre solo debe contener letras.';
      }
    }

    if (name === 'email') {
      const email = value.trim();

      if (!email) return 'El correo electrónico es obligatorio.';

      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(email)) {
        return 'Por favor, ingresá un correo válido.';
      }
    }

    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      const errorMsg = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name as keyof FormData, value);

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nombreError = validateField('nombre', formData.nombre);
    const emailError = validateField('email', formData.email);

    if (nombreError || emailError) {
      setErrors({
        nombre: nombreError,
        email: emailError,
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ nombre: '', email: '' });
      setErrors({});
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div
      className="rc-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="rc-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="rc-modal-close"
          onClick={onClose}
          aria-label="Cerrar ventana"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="rc-newsletter-card">
          <div className="rc-newsletter-content">
            <div className="rc-newsletter-tag">
              <span className="rc-tag-line"></span>
              <span className="rc-tag-text">NEWSLETTER</span>
            </div>

            <h2 className="rc-newsletter-title">
              No te pierdas <br /> ninguna novedad
            </h2>

            <p className="rc-newsletter-description">
              Suscribite y recibí en tu correo las próximas fechas,
              charlas, talleres y todo lo nuevo de Rolling Code School.
            </p>

            {isSubmitted ? (
              <div className="rc-newsletter-success" role="alert">
                <svg
                  className="rc-success-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p>
                  ¡Gracias por suscribirte! Tu solicitud fue recibida.
                </p>

                <button
                  type="button"
                  className="rc-reset-btn"
                  onClick={() => setIsSubmitted(false)}
                >
                  Suscribir otro correo
                </button>
              </div>
            ) : (
              <form
                className="rc-newsletter-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="rc-input-group-row">
                  {/* Campo Nombre */}
                  <div className="rc-input-wrapper">
                    <div
                      className={`rc-input-container ${
                        errors.nombre ? 'has-error' : ''
                      }`}
                    >
                      <svg
                        className="rc-input-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>

                      <input
                        type="text"
                        name="nombre"
                        placeholder="Tu nombre completo"
                        value={formData.nombre}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="rc-newsletter-input"
                        aria-label="Tu nombre completo"
                        aria-invalid={!!errors.nombre}
                      />
                    </div>

                    {errors.nombre && (
                      <span className="rc-error-message">
                        {errors.nombre}
                      </span>
                    )}
                  </div>

                  {/* Campo Email */}
                  <div className="rc-input-wrapper">
                    <div
                      className={`rc-input-container ${
                        errors.email ? 'has-error' : ''
                      }`}
                    >
                      <svg
                        className="rc-input-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>

                      <input
                        type="email"
                        name="email"
                        placeholder="Tu correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="rc-newsletter-input"
                        aria-label="Tu correo electrónico"
                        aria-invalid={!!errors.email}
                      />
                    </div>

                    {errors.email && (
                      <span className="rc-error-message">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Botón Submit */}
                  <button
                    type="submit"
                    className="rc-newsletter-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="rc-spinner"></span>
                    ) : (
                      <>
                        <span>Suscribirme</span>
                        <svg
                          className="rc-btn-arrow"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="rc-newsletter-footer">
              <svg
                className="rc-lock-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  ry="2"
                />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>

              <p>
                No compartimos tu información. Podés darte de baja cuando
                quieras.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
