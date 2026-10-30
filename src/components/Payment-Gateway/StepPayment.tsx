import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { CardData } from './types';
import { detectBrand } from './cards';
import { digitsOnly, formatCardNumber, formatExpiry, pesos, validateCard } from './validators';
import type { FieldErrors } from './validators';

interface Props {
  total: number;
  processing: boolean;
  onPay: (last4: string, brandName: string) => void;
  onBack: () => void;
}

const EMPTY_CARD: CardData = { number: '', holder: '', expiry: '', cvv: '' };

export default function StepPayment({ total, processing, onPay, onBack }: Props) {
  // Los datos de la tarjeta viven solo acá: no se suben al padre ni se guardan
  const [card, setCard] = useState<CardData>(EMPTY_CARD);
  const [errors, setErrors] = useState<FieldErrors<CardData>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Marca de la tarjeta según los primeros dígitos (Visa, Mastercard, etc.)
  const brand = detectBrand(digitsOnly(card.number));

  const handleChange = (field: keyof CardData, raw: string) => {
    let value = raw;
    if (field === 'number') value = formatCardNumber(raw);
    if (field === 'expiry') value = formatExpiry(raw);
    if (field === 'cvv') value = digitsOnly(raw).slice(0, brand.cvvLength);

    setCard({ ...card, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const handleBlur = (field: keyof CardData) => {
    const message = validateCard(card)[field];
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (processing) return;

    const found = validateCard(card);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }
    onPay(digitsOnly(card.number).slice(-4), brand.name);
  };

  return (
    <form className="payment-h3" ref={formRef} onSubmit={handleSubmit} noValidate>
      <h3>Pago</h3>

      <p className="payment-nota">
        Pago simulado: no se realiza ningún cobro real y los datos de la tarjeta no se guardan.
      </p>

      <div className="payment-campo">
        <div className="payment-campo-cabecera">
          <label htmlFor="payment-card-number">Número de tarjeta</label>
          {brand.id !== 'unknown' && (
            <span className="payment-marca" aria-live="polite">
              {brand.name}
            </span>
          )}
        </div>
        <input
          id="payment-card-number"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="0000 0000 0000 0000"
          value={card.number}
          onChange={(e) => handleChange('number', e.target.value)}
          onBlur={() => handleBlur('number')}
          disabled={processing}
          aria-invalid={errors.number ? true : undefined}
          aria-describedby={errors.number ? 'payment-card-number-error' : undefined}
        />
        {errors.number && (
          <small id="payment-card-number-error" className="error" role="alert">
            {errors.number}
          </small>
        )}
      </div>

      <div className="payment-campo">
        <label htmlFor="payment-card-holder">Titular de la tarjeta</label>
        <input
          id="payment-card-holder"
          autoComplete="cc-name"
          value={card.holder}
          onChange={(e) => handleChange('holder', e.target.value)}
          onBlur={() => handleBlur('holder')}
          disabled={processing}
          aria-invalid={errors.holder ? true : undefined}
          aria-describedby={errors.holder ? 'payment-card-holder-error' : undefined}
        />
        {errors.holder && (
          <small id="payment-card-holder-error" className="error" role="alert">
            {errors.holder}
          </small>
        )}
      </div>

      <div className="payment-doble">
        <div className="payment-campo">
          <label htmlFor="payment-card-expiry">Vencimiento</label>
          <input
            id="payment-card-expiry"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/AA"
            value={card.expiry}
            onChange={(e) => handleChange('expiry', e.target.value)}
            onBlur={() => handleBlur('expiry')}
            disabled={processing}
            aria-invalid={errors.expiry ? true : undefined}
            aria-describedby={errors.expiry ? 'payment-card-expiry-error' : undefined}
          />
          {errors.expiry && (
            <small id="payment-card-expiry-error" className="error" role="alert">
              {errors.expiry}
            </small>
          )}
        </div>

        <div className="payment-campo">
          <label htmlFor="payment-card-cvv">CVV</label>
          <input
            id="payment-card-cvv"
            type="password"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder={`${brand.cvvLength} dígitos`}
            value={card.cvv}
            onChange={(e) => handleChange('cvv', e.target.value)}
            onBlur={() => handleBlur('cvv')}
            disabled={processing}
            aria-invalid={errors.cvv ? true : undefined}
            aria-describedby={errors.cvv ? 'payment-card-cvv-error' : undefined}
          />
          {errors.cvv && (
            <small id="payment-card-cvv-error" className="error" role="alert">
              {errors.cvv}
            </small>
          )}
        </div>
      </div>

      <div className="payment-acciones">
        <button type="button" className="payment-volver" onClick={onBack} disabled={processing}>
          Volver
        </button>
        <button type="submit" className="payment-continuar" disabled={processing}>
          {processing ? 'Procesando...' : `Pagar ${pesos(total)}`}
        </button>
      </div>
    </form>
  );
}
