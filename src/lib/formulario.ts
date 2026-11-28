/**
 * Utilidades compartidas por los dos formularios.
 * Servicios Informáticos Jester Amaro, F.P. — RIF V-14899001-4
 */

export const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbyuAmWUHUGZWMq-H4-aeb7RLcwdpL1hcCzhEMuprHZUV94YDp-KgMI5TiC7HS8lg3HW/exec';

const LIMITE_ENVIOS = 3;
const VENTANA_MS = 10 * 60 * 1000; // 10 minutos
const CLAVE_STORAGE = 'ctw_envios';

type Registro = { marca: number };

/** Lee los envíos recientes del navegador y limpia los vencidos. */
function enviosRecientes(): number[] {
  try {
    const crudo = localStorage.getItem(CLAVE_STORAGE);
    if (!crudo) return [];
    const lista: Registro[] = JSON.parse(crudo);
    const ahora = Date.now();
    return lista
      .map((r) => r.marca)
      .filter((m) => typeof m === 'number' && ahora - m < VENTANA_MS);
  } catch {
    return [];
  }
}

/** Registra un envío exitoso. */
function registrarEnvio(): void {
  try {
    const lista = enviosRecientes().map((marca) => ({ marca }));
    lista.push({ marca: Date.now() });
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista));
  } catch {
    /* almacenamiento bloqueado: no es motivo para romper el envío */
  }
}

export type ResultadoEnvio =
  | { ok: true }
  | { ok: false; motivo: 'limite' | 'red' | 'servidor' | 'validacion' };

/** Valida el teléfono: al menos 6 dígitos reales. */
export function telefonoValido(t: string): boolean {
  const digitos = t.replace(/\D/g, '');
  return digitos.length >= 6 && digitos.length <= 17;
}

/** Valida el correo si viene. */
export function correoValido(c: string): boolean {
  if (!c.trim()) return true;
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(c);
}

/**
 * Envía los datos y comprueba de verdad la respuesta.
 * No devuelve ok:true si el servidor no confirmó con result:"success".
 */
export async function enviarFormulario(datos: Record<string, unknown>): Promise<ResultadoEnvio> {
  if (enviosRecientes().length >= LIMITE_ENVIOS) {
    return { ok: false, motivo: 'limite' };
  }

  try {
    const respuesta = await fetch(SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(datos),
    });

    if (!respuesta.ok) {
      return { ok: false, motivo: 'servidor' };
    }

    const cuerpo = await respuesta.json();

    if (cuerpo && cuerpo.result === 'success') {
      registrarEnvio();
      return { ok: true };
    }

    return { ok: false, motivo: 'servidor' };
  } catch {
    return { ok: false, motivo: 'red' };
  }
}

/** Mensaje legible para cada fallo. */
export function mensajeDeError(motivo: string): string {
  switch (motivo) {
    case 'limite':
      return 'Has enviado varios mensajes seguidos. Esperá unos minutos y volvé a intentar.';
    case 'red':
      return 'No hay conexión. Revisá tu internet y volvé a intentar.';
    case 'validacion':
      return 'Revisá los datos: el teléfono debe tener al menos 6 dígitos.';
    default:
      return 'No pudimos enviar tu mensaje. Escribinos por WhatsApp mientras lo resolvemos.';
  }
}
