export type BrandId = 'visa' | 'mastercard' | 'amex' | 'diners' | 'discover' | 'unknown';

export interface CardBrand {
  id: BrandId;
  name: string;
  length: number; // cantidad de dígitos del número
  cvvLength: number; // cantidad de dígitos del código de seguridad
  gaps: number[]; // posiciones donde se agrega un espacio al mostrar el número
}

const BRANDS: Record<BrandId, CardBrand> = {
  visa: { id: 'visa', name: 'Visa', length: 16, cvvLength: 3, gaps: [4, 8, 12] },
  mastercard: { id: 'mastercard', name: 'Mastercard', length: 16, cvvLength: 3, gaps: [4, 8, 12] },
  amex: { id: 'amex', name: 'American Express', length: 15, cvvLength: 4, gaps: [4, 10] },
  diners: { id: 'diners', name: 'Diners Club', length: 14, cvvLength: 3, gaps: [4, 10] },
  discover: { id: 'discover', name: 'Discover', length: 16, cvvLength: 3, gaps: [4, 8, 12] },
  unknown: { id: 'unknown', name: 'Tarjeta', length: 16, cvvLength: 3, gaps: [4, 8, 12] },
};

// Reconoce la marca por los primeros dígitos del número (solo números, sin espacios)
export const detectBrand = (digits: string): CardBrand => {
  if (/^4/.test(digits)) return BRANDS.visa;
  if (/^5[1-5]/.test(digits)) return BRANDS.mastercard;
  if (digits.length >= 4) {
    const firstFour = Number(digits.slice(0, 4));
    if (firstFour >= 2221 && firstFour <= 2720) return BRANDS.mastercard;
  }
  if (/^3[47]/.test(digits)) return BRANDS.amex;
  if (/^(36|38|39|30[0-5])/.test(digits)) return BRANDS.diners;
  if (/^(6011|65|64[4-9])/.test(digits)) return BRANDS.discover;
  return BRANDS.unknown;
};
