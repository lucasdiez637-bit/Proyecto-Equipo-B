import { useSyncExternalStore } from 'react';
import { CUPOS_RESTANTES_BASE, EARLY_BIRD_ID, ENTRADAS } from './ticketsData';

/*
  Estado compartido entre las secciones Tickets, Timer y la pasarela (Payment).
  Las tres son "hermanas" en App.tsx y no se pasan props, así que se
  comunican a través de este pequeño almacén.

  - request:  la entrada que el usuario tocó en la sección Tickets
              ("Comprar entrada"). Payment la lee y la deja seleccionada.
  - reserved: la entrada y la cantidad que el usuario está eligiendo en la
              pasarela. El Timer la usa para mover la barra de cupos.
*/

export interface EntradaRequest {
  id: string;
  nonce: number; // sube en 1 con cada toque, aunque sea la misma entrada
}

export interface Reserved {
  id: string;
  quantity: number;
}

interface CheckoutState {
  request: EntradaRequest;
  reserved: Reserved | null;
}

let state: CheckoutState = {
  request: { id: '', nonce: 0 },
  reserved: null,
};

const listeners = new Set<() => void>();

const update = (patch: Partial<CheckoutState>) => {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

// "Early Bird" -> "earlybird" (sin tildes, espacios ni mayúsculas)
const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '');

// Busca la entrada de la pasarela por id y, si no coincide, por nombre
const resolveEntradaId = (id: string, name?: string): string | null => {
  const byId = ENTRADAS.find((e) => e.id === id);
  if (byId) return byId.id;

  const wanted = [id, name]
    .filter((value): value is string => Boolean(value))
    .map(normalize);
  const byName = ENTRADAS.find(
    (e) => wanted.includes(normalize(e.nombre)) || wanted.includes(normalize(e.id)),
  );
  return byName ? byName.id : null;
};

/* ---------- Acciones ---------- */

// La usa la sección Tickets al tocar "Comprar entrada"
export const selectEntrada = (id: string, name?: string) => {
  const resolved = resolveEntradaId(id, name);
  if (!resolved) return;
  update({ request: { id: resolved, nonce: state.request.nonce + 1 } });
};

// La usa la pasarela para avisar qué se está comprando (o null si no hay compra en curso)
export const setReserved = (reserved: Reserved | null) => {
  const current = state.reserved;
  if (current === reserved) return;
  if (
    current &&
    reserved &&
    current.id === reserved.id &&
    current.quantity === reserved.quantity
  ) {
    return;
  }
  update({ reserved });
};

/* ---------- Hooks ---------- */

export const useEntradaRequest = () =>
  useSyncExternalStore(
    subscribe,
    () => state.request,
    () => state.request,
  );

export const useReserved = () =>
  useSyncExternalStore(
    subscribe,
    () => state.reserved,
    () => state.reserved,
  );

// Cupos Early Bird que quedan: los iniciales menos lo que se está eligiendo en la pasarela.
// Lo usan el Timer y el chip de la tarjeta Early Bird para mostrar siempre el mismo número.
const getCuposRestantes = () => {
  const { reserved } = state;
  const reservadas = reserved && reserved.id === EARLY_BIRD_ID ? reserved.quantity : 0;
  return Math.max(0, CUPOS_RESTANTES_BASE - reservadas);
};

export const useCuposRestantes = () =>
  useSyncExternalStore(subscribe, getCuposRestantes, getCuposRestantes);
