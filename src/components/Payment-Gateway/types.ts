export type StepNumber = 1 | 2 | 3 | 4;

// Lo que el usuario elige en el paso 1
export interface Ticket {
  id: string; // id de la entrada (ver ENTRADAS en ticketsData.ts)
  quantity: number;
}

export interface Buyer {
  name: string;
  email: string;
  phone: string;
}

export interface CardData {
  number: string;
  holder: string;
  expiry: string; // MM/AA
  cvv: string;
}

// Datos que muestra el resumen negro de la derecha
export interface SummaryData {
  ticketName: string;
  quantity: number;
  subtotal: number;
  cargo: number;
  total: number;
}

export interface Order extends SummaryData {
  id: string;
  date: string;
  unitPrice: number;
  buyer: { name: string; email: string };
  paymentMethod: string; // "Tarjeta •••• 4242", nunca el número completo
}
