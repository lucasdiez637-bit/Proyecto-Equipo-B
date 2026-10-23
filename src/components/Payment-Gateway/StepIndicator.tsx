import type { StepNumber } from './types';

const LABELS = ['Entrada', 'Datos', 'Pago', 'Listo'];

export default function StepIndicator({ current }: { current: StepNumber }) {
  return (
    <ol className="payment-pasos" aria-label="Pasos de la compra">
      {LABELS.map((label, index) => {
        const number = index + 1;
        const state = number === current ? ' actual' : number < current ? ' hecho' : '';
        return (
          <li
            key={label}
            className={`payment-paso${state}`}
            aria-current={number === current ? 'step' : undefined}
          >
            {number} {label}
          </li>
        );
      })}
    </ol>
  );
}
