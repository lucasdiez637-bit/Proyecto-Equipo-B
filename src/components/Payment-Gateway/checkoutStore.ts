import { useSyncExternalStore } from 'react';
import { CUPOS_RESTANTES_BASE, EARLY_BIRD_ID, ENTRADAS } from './ticketsData';

/*
  Estado compartido entre las secciones Tickets, Timer y la pasarela (Payment).
  Las tres son "hermanas" en App.tsx y no se pasan props, así que se
  comunican a través de este pequeño almacén.

  - request:  la entrada que el usuario tocó en la sección Tickets
              ("Comprar entrada"). Payment la lee y la deja seleccionada.
  - reserved: la entrada y la cantidad que el usuario está eligiendo en la
              pasarela. Sirve para mostrar cuántos cupos quedarían.
  - vendidas: entradas Early Bird ya compradas. Se acumulan entre compras y se
              guardan en el navegador (localStorage).
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
  vendidas: number;
}

/* ---------- Persistencia de lo vendido ---------- */

const VENDIDAS_KEY = 'workshop-early-vendidas';

const readVendidas = (): number => {
  try {
    const n = Number(localStorage.getItem(VENDIDAS_KEY));
    return Number.isFinite(n) && n > 0 ? Math.min(Math.floor(n), CUPOS_RESTANTES_BASE) : 0;
  } catch {
    return 0;
  }
};

const writeVendidas = (n: number) => {
  try {
    if (n > 0) localStorage.setItem(VENDIDAS_KEY, String(n));
    else localStorage.removeItem(VENDIDAS_KEY);
  } catch {
    // Si el navegador bloquea el almacenamiento, el contador vale solo para esta visita
  }
};

/* ---------- Estado ---------- */

let state: CheckoutState = {
  request: { id: '', nonce: 0 },
  reserved: null,
  vendidas: readVendidas(),
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

// Si hay otra pestaña abierta y ahí cambian los cupos, esta se entera
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === VENDIDAS_KEY || event.key === null) {
      update({ vendidas: readVendidas() });
    }
  });
}

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

/* ---------- Cupos Early Bird ---------- */

// Cupos que se pueden comprar ahora (sin contar lo que alguien está eligiendo)
export const getCuposDisponibles = () => Math.max(0, CUPOS_RESTANTES_BASE - state.vendidas);

// Cupos que quedarían según lo que se está eligiendo en la pasarela (nunca baja de 0)
const getCuposRestantes = () => {
  const { reserved } = state;
  const reservadas = reserved && reserved.id === EARLY_BIRD_ID ? reserved.quantity : 0;
  return Math.max(0, getCuposDisponibles() - reservadas);
};

// La usa la pasarela al confirmar un pago de Early Bird: los cupos se descuentan para siempre
export const registrarVenta = (quantity: number) => {
  if (quantity < 1) return;
  const vendidas = Math.min(CUPOS_RESTANTES_BASE, state.vendidas + Math.floor(quantity));
  writeVendidas(vendidas);
  update({ vendidas });
};

// Vuelve los cupos a su valor inicial (para repetir la demo)
export const reiniciarCupos = () => {
  writeVendidas(0);
  update({ vendidas: 0 });
};

declare global {
  interface Window {
    reiniciarCupos?: () => void;
  }
}

// Se puede llamar desde la consola del navegador: reiniciarCupos()
if (typeof window !== 'undefined') {
  window.reiniciarCupos = reiniciarCupos;
}

/* ---------- Acciones ---------- */

// La usa la sección Tickets al tocar "Comprar entrada"
export const selectEntrada = (id: string, name?: string) => {
  const resolved = resolveEntradaId(id, name);
  if (!resolved) return;
  // Early Bird agotada: no se puede elegir
  if (resolved === EARLY_BIRD_ID && getCuposDisponibles() <= 0) return;
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

export const useCuposDisponibles = () =>
  useSyncExternalStore(subscribe, getCuposDisponibles, getCuposDisponibles);

export const useCuposRestantes = () =>
  useSyncExternalStore(subscribe, getCuposRestantes, getCuposRestantes);
