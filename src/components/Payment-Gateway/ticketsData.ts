export interface Entrada {
  id: string;
  nombre: string;
  detalle: string;
  precio: number;
}

export const ENTRADAS: Entrada[] = [
  {
    id: 'early',
    nombre: 'Early Bird',
    detalle: 'Presencial · hasta el 31/10',
    precio: 25000,
  },
  {
    id: 'general',
    nombre: 'General',
    detalle: 'Presencial · desde el 1/11',
    precio: 35000,
  },
  {
    id: 'virtual',
    nombre: 'Virtual',
    detalle: 'Transmisión en vivo y grabación',
    precio: 15000,
  },
];

export const EVENTO = {
  nombre: 'Workshop Rolling Code School',
  detalle: 'Jueves 19/11 · 18:00 hs · Gral. Paz 576',
};

export const CARGO_SERVICIO = 0.05; // 5%
export const MAX_POR_COMPRA = 10;

// Calcula entrada, subtotal, cargo y total a partir de la selección
export const calcularPedido = (entradaId: string, cantidad: number) => {
  const entrada = ENTRADAS.find((e) => e.id === entradaId) ?? ENTRADAS[0];
  const subtotal = entrada.precio * cantidad;
  const cargo = Math.round(subtotal * CARGO_SERVICIO);
  const total = subtotal + cargo;
  return { entrada, subtotal, cargo, total };
};
