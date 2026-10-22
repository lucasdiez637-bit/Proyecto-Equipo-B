import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SPONSOR_LEVELS,
  sponsorSchema,
  type SponsorFormData,
  type SponsorFormInput,
} from "./sponsorSchema";
import "./sponsor.css";

const DEFAULT_VALUES: SponsorFormInput = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  sponsorType: "" as SponsorFormInput["sponsorType"],
  logo: undefined,
  message: "",
};

function Sponsor() {
  const [sent, setSent] = useState(false);
  const [dragging, setDragging] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SponsorFormInput, unknown, SponsorFormData>({
    resolver: zodResolver(sponsorSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
  });

  const onSubmit = () => {
    setSent(true);
    reset(DEFAULT_VALUES);
  };

  const fieldProps = (name: keyof SponsorFormInput) => ({
    id: `sponsor-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `sponsor-${name}-error` : undefined,
  });

  const errorText = (name: keyof SponsorFormInput) =>
    errors[name] && (
      <p id={`sponsor-${name}-error`} className="sponsor-error" role="alert">
        {errors[name]?.message}
      </p>
    );

  return (
    <section id="sponsors" className="sponsor">
      <div className="sponsor-container">
        <header className="sponsor-header">
          <h2 className="sponsor-title">Sumate como Sponsor</h2>
          <p className="sponsor-lead">
            Conectá tu marca con más de 120 talentos IT, programadores junior,
            semi-seniors y líderes tecnológicos del norte argentino. Completá el
            formulario y nos contactaremos en menos de 24 horas hábiles.
          </p>
        </header>

        <form
          className="sponsor-card"
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => setSent(false)}
          noValidate
        >
          <div className="row g-4">
            <div className="col-md-6">
              <label className="sponsor-label" htmlFor="sponsor-firstName">
                Nombre <span aria-hidden="true">*</span>
              </label>
              <input
                {...register("firstName")}
                {...fieldProps("firstName")}
                className="sponsor-field"
                type="text"
                placeholder="Ej. Martín"
                autoComplete="given-name"
                maxLength={40}
                required
              />
              {errorText("firstName")}
            </div>

            <div className="col-md-6">
              <label className="sponsor-label" htmlFor="sponsor-lastName">
                Apellido <span aria-hidden="true">*</span>
              </label>
              <input
                {...register("lastName")}
                {...fieldProps("lastName")}
                className="sponsor-field"
                type="text"
                placeholder="Ej. González"
                autoComplete="family-name"
                maxLength={40}
                required
              />
              {errorText("lastName")}
            </div>

            <div className="col-md-6">
              <label className="sponsor-label" htmlFor="sponsor-company">
                Empresa <span aria-hidden="true">*</span>
              </label>
              <input
                {...register("company")}
                {...fieldProps("company")}
                className="sponsor-field"
                type="text"
                placeholder="Ej. Acme Technologies"
                autoComplete="organization"
                maxLength={60}
                required
              />
              {errorText("company")}
            </div>

            <div className="col-md-6">
              <label className="sponsor-label" htmlFor="sponsor-email">
                Email corporativo <span aria-hidden="true">*</span>
              </label>
              <input
                {...register("email")}
                {...fieldProps("email")}
                className="sponsor-field"
                type="email"
                inputMode="email"
                placeholder="martin@acme.com"
                autoComplete="email"
                maxLength={100}
                required
              />
              {errorText("email")}
            </div>

            <div className="col-12">
              <label className="sponsor-label" htmlFor="sponsor-sponsorType">
                Tipo de sponsor <span aria-hidden="true">*</span>
              </label>
              <div className="sponsor-select">
                <select
                  {...register("sponsorType")}
                  {...fieldProps("sponsorType")}
                  className="sponsor-field"
                  required
                >
                  <option value="" disabled>
                    Seleccioná un nivel de sponsoreo
                  </option>
                  {SPONSOR_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
              {errorText("sponsorType")}
            </div>

            <div className="col-12">
              <span className="sponsor-label" id="sponsor-logo-label">
                Logo de la empresa
              </span>
              <Controller
                name="logo"
                control={control}
                render={({ field }) => (
                  <label
                    className={
                      dragging ? "sponsor-dropzone arrastrando" : "sponsor-dropzone"
                    }
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);
                      setSent(false);
                      field.onChange(e.dataTransfer.files[0]);
                    }}
                  >
                    <input
                      {...fieldProps("logo")}
                      type="file"
                      accept=".png,.svg,.jpg,.jpeg,.webp,image/png,image/svg+xml,image/jpeg,image/webp"
                      aria-labelledby="sponsor-logo-label"
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                    <span className="sponsor-dropzone-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M16 16l-4-4-4 4M12 12v9" />
                        <path d="M20.4 18.4A5 5 0 0018 9h-1.3A8 8 0 103 16.3" />
                      </svg>
                    </span>
                    <strong>
                      {field.value instanceof File
                        ? field.value.name
                        : "Hacé clic para adjuntar tu logo o arrastralo aquí"}
                    </strong>
                    <small>
                      Archivos aceptados: PNG, SVG, JPG o WEBP (Fondo transparente
                      recomendado, máx. 5MB)
                    </small>
                  </label>
                )}
              />
              {errorText("logo")}
            </div>

            <div className="col-12">
              <label className="sponsor-label" htmlFor="sponsor-message">
                Mensaje opcional
              </label>
              <textarea
                {...register("message")}
                {...fieldProps("message")}
                className="sponsor-field sponsor-textarea"
                placeholder="Contanos sobre tu empresa y porque buscas ser Sponsor del evento"
                rows={4}
                maxLength={500}
              />
              {errorText("message")}
            </div>

            <div className="col-12">
              <button type="submit" className="sponsor-submit" disabled={isSubmitting}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                Enviar postulación de Sponsor
              </button>
              {sent && (
                <p className="sponsor-success" role="status">
                  ¡Gracias! Recibimos tu postulación. Nos contactaremos en menos
                  de 24 horas hábiles.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
export default Sponsor;
