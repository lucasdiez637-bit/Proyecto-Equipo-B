import type { Buyer, CardData } from './types';
import { detectBrand } from './cards';

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

/* ---------- Formateo ---------- */

export const digitsOnly = (value: string) => value.replace(/\D/g, '');

// Agrupa los dígitos según la marca: Visa/Mastercard 4-4-4-4, American Express 4-6-5
export const formatCardNumber = (value: string) => {
  const all = digitsOnly(value);
  const brand = detectBrand(all);
  const digits = all.slice(0, brand.length);

  let out = '';
  for (let i = 0; i < digits.length; i++) {
    if (brand.gaps.includes(i)) out += ' ';
    out += digits[i];
  }
  return out;
};

export const formatExpiry = (value: string) => {
  const d = digitsOnly(value).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

// Mismo formato que la pasarela original: $25.000
export const pesos = (n: number) =>
  '$' +
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/* ---------- Validaciones ---------- */

// Algoritmo de Luhn: detecta números de tarjeta mal tipeados
const passesLuhn = (num: string) => {
  let sum = 0;
  let double = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let d = Number(num[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
};

const isExpired = (expiry: string) => {
  const parts = expiry.split('/');
  const mm = Number(parts[0]);
  const yy = Number(parts[1]);
  if (!Number.isInteger(mm) || !Number.isInteger(yy) || mm < 1 || mm > 12) return true;

  const now = new Date();
  const currentYY = now.getFullYear() % 100;
  const currentMM = now.getMonth() + 1;
  return yy < currentYY || (yy === currentYY && mm < currentMM);
};

export const validateBuyer = (buyer: Buyer): FieldErrors<Buyer> => {
  const errors: FieldErrors<Buyer> = {};

  if (!/\p{L}{2,}/u.test(buyer.name.trim()) || buyer.name.trim().length < 3) {
    errors.name = 'Ingresá tu nombre completo';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(buyer.email.trim())) {
    errors.email = 'Ingresá un email válido (ej: nombre@correo.com)';
  }
  const phoneDigits = digitsOnly(buyer.phone);
  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    errors.phone = 'Ingresá un teléfono válido (entre 8 y 15 dígitos)';
  }
  return errors;
};

export const validateCard = (card: CardData): FieldErrors<CardData> => {
  const errors: FieldErrors<CardData> = {};
  const number = digitsOnly(card.number);
  const brand = detectBrand(number);

  if (number.length !== brand.length) {
    errors.number =
      brand.id === 'unknown'
        ? 'La tarjeta debe tener 16 dígitos'
        : `La tarjeta ${brand.name} debe tener ${brand.length} dígitos`;
  } else if (!passesLuhn(number)) {
    errors.number = 'El número de tarjeta no es válido';
  }
  if (card.holder.trim().length < 3) {
    errors.holder = 'Ingresá el nombre que figura en la tarjeta';
  }
  if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
    errors.expiry = 'Usá el formato MM/AA';
  } else if (isExpired(card.expiry)) {
    errors.expiry = 'La tarjeta está vencida o la fecha no es válida';
  }
  if (!new RegExp(`^\\d{${brand.cvvLength}}$`).test(card.cvv)) {
    errors.cvv = `El código debe tener ${brand.cvvLength} dígitos`;
  }
  return errors;
};
