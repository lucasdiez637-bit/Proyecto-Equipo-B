import { z } from "zod";

export const SPONSOR_LEVELS = ["Diamante", "Oro", "Bronce"] as const;

export const LOGO_TYPES = ["image/png", "image/svg+xml", "image/jpeg", "image/webp"];
export const LOGO_MAX_SIZE = 5 * 1024 * 1024;

const NAME_PATTERN = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;
const COMPANY_PATTERN = /^[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ&.,'\- ]+$/;
const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

const personName = (field: string) =>
  z
    .string()
    .trim()
    .min(1, `El ${field} es obligatorio`)
    .min(2, `El ${field} debe tener al menos 2 caracteres`)
    .max(40, `El ${field} no puede superar los 40 caracteres`)
    .regex(NAME_PATTERN, `El ${field} solo puede contener letras`);

export const sponsorSchema = z.object({
  firstName: personName("nombre"),
  lastName: personName("apellido"),
  company: z
    .string()
    .trim()
    .min(1, "La empresa es obligatoria")
    .min(2, "La empresa debe tener al menos 2 caracteres")
    .max(60, "La empresa no puede superar los 60 caracteres")
    .regex(COMPANY_PATTERN, "La empresa contiene caracteres no permitidos")
    .regex(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/, "La empresa debe contener al menos una letra"),
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio")
    .max(100, "El email no puede superar los 100 caracteres")
    .regex(EMAIL_PATTERN, "Ingresá un email válido (ej. martin@acme.com)"),
  sponsorType: z.enum(SPONSOR_LEVELS, { error: "Seleccioná un nivel de sponsoreo" }),
  logo: z
    .instanceof(File)
    .refine((f) => LOGO_TYPES.includes(f.type), "El logo debe ser PNG, SVG, JPG o WEBP")
    .refine((f) => f.size <= LOGO_MAX_SIZE, "El logo no puede superar los 5MB")
    .optional(),
  message: z
    .string()
    .trim()
    .max(500, "El mensaje no puede superar los 500 caracteres")
    .optional(),
});

export type SponsorFormInput = z.input<typeof sponsorSchema>;
export type SponsorFormData = z.output<typeof sponsorSchema>;
