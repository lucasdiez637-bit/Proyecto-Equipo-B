import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { Buyer } from './types';
import { validateBuyer } from './validators';
import type { FieldErrors } from './validators';

interface Props {
  buyer: Buyer;
  setBuyer: (buyer: Buyer) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepBuyer({ buyer, setBuyer, onNext, onBack }: Props) {
  const [form, setForm] = useState<Buyer>(buyer);
  const [errors, setErrors] = useState<FieldErrors<Buyer>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (field: keyof Buyer, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  // Valida un campo al salir de él
  const handleBlur = (field: keyof Buyer) => {
    const message = validateBuyer(form)[field];
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateBuyer(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Lleva el foco al primer campo con error
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }
    setBuyer({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    });
    onNext();
  };

  // Al volver conserva lo que ya escribió
  const handleBack = () => {
    setBuyer(form);
    onBack();
  };

  return (
    <form className="payment-h3" ref={formRef} onSubmit={handleSubmit} noValidate>
      <h3>Tus datos</h3>

      <div className="payment-campo">
        <label htmlFor="payment-name">Nombre completo</label>
        <input
          id="payment-name"
          autoComplete="name"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'payment-name-error' : undefined}
        />
        {errors.name && (
          <small id="payment-name-error" className="error" role="alert">
            {errors.name}
          </small>
        )}
      </div>

      <div className="payment-campo">
        <label htmlFor="payment-email">Email</label>
        <input
          id="payment-email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'payment-email-error' : undefined}
        />
        {errors.email && (
          <small id="payment-email-error" className="error" role="alert">
            {errors.email}
          </small>
        )}
      </div>

      <div className="payment-campo">
        <label htmlFor="payment-phone">Teléfono</label>
        <input
          id="payment-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          onBlur={() => handleBlur('phone')}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? 'payment-phone-error' : undefined}
        />
        {errors.phone && (
          <small id="payment-phone-error" className="error" role="alert">
            {errors.phone}
          </small>
        )}
      </div>

      <div className="payment-acciones">
        <button type="button" className="payment-volver" onClick={handleBack}>
          Volver
        </button>
        <button type="submit" className="payment-continuar">
          Continuar
        </button>
      </div>
    </form>
  );
}
