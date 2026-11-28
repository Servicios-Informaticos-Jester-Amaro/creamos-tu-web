/**
 * Creamos Tu Web — Formulario universal
 * Un endpoint, dos hojas: Contactos / Diagnosticos
 * Servicios Informaticos Jester Amaro, F.P. — RIF V-14899001-4
 */

const AGENCIA = 'creamostuwebve@gmail.com';
const HOJA_CONTACTOS = 'Contactos';
const HOJA_DIAGNOSTICOS = 'Diagnosticos';

const ENCABEZADOS = {
  [HOJA_CONTACTOS]: ['Nombre', 'Telefono', 'Correo', 'Mensaje', 'Fecha', 'Origen'],
  [HOJA_DIAGNOSTICOS]: ['Fecha', 'Lead ID', 'Nombre', 'Telefono', 'Dolor', 'Intentos', 'Impacto', 'Inversion', 'Horario', 'Origen']
};

/** Devuelve la hoja por nombre; la crea con encabezados si no existe. */
function getHoja(nombre) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = ss.getSheetByName(nombre);
  if (!hoja) {
    hoja = ss.insertSheet(nombre);
  }
  if (hoja.getLastRow() === 0) {
    hoja.appendRow(ENCABEZADOS[nombre]);
    hoja.getRange(1, 1, 1, ENCABEZADOS[nombre].length).setFontWeight('bold');
    hoja.setFrozenRows(1);
  }
  return hoja;
}

/** Limpia texto: quita etiquetas, recorta y limita largo. */
function limpiar(v, max) {
  if (v === undefined || v === null) return '';
  return String(v)
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, max || 500);
}

/** Escapa HTML para el correo de aviso. */
function esc(v) {
  return String(v === undefined || v === null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Healthcheck: abrir la URL en el navegador debe devolver {"ok":true} */
function doGet(e) {
  return json({ ok: true, servicio: 'creamostuweb-formulario', hora: new Date().toISOString() });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    if (!e || !e.postData || !e.postData.contents) {
      return json({ result: 'error', error: 'sin datos' });
    }

    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      return json({ result: 'error', error: 'json invalido' });
    }

    // Honeypot: campo oculto que un humano nunca llena
    if (data.website && String(data.website).trim() !== '') {
      return json({ result: 'success' }); // se ignora en silencio
    }

    const tipo = limpiar(data.tipo, 20) || 'contacto';
    const nombre = limpiar(data.nombre, 120);
    const telefono = limpiar(data.telefono, 40);

    if (nombre.length < 2 || telefono.length < 6) {
      return json({ result: 'error', error: 'faltan datos obligatorios' });
    }

    let hoja, fila, asunto, detalle;

    if (tipo === 'diagnostico') {
      const leadId = limpiar(data.lead_id, 40) || '(sin lead_id)';
      const dolor = limpiar(data.dolor, 1000);
      const intentos = limpiar(data.intentos, 1000);
      const impacto = limpiar(data.impacto, 1000);
      const inversion = limpiar(data.inversion, 100);
      const horario = limpiar(data.horario, 100);

      hoja = getHoja(HOJA_DIAGNOSTICOS);
      fila = [new Date(), leadId, nombre, telefono, dolor, intentos, impacto, inversion, horario, 'diagnostico'];
      asunto = 'Diagnostico completado — ' + nombre;
      detalle =
        '<p><strong>Lead ID:</strong> ' + esc(leadId) + '</p>' +
        '<p><strong>Nombre:</strong> ' + esc(nombre) + '</p>' +
        '<p><strong>Telefono:</strong> ' + esc(telefono) + '</p>' +
        '<p><strong>1. Cuello de botella:</strong><br>' + esc(dolor) + '</p>' +
        '<p><strong>2. Intentos previos:</strong><br>' + esc(intentos) + '</p>' +
        '<p><strong>3. Impacto en 3 meses:</strong><br>' + esc(impacto) + '</p>' +
        '<p><strong>4. Inversion:</strong> ' + esc(inversion) + '</p>' +
        '<p><strong>5. Horario:</strong> ' + esc(horario) + '</p>';
    } else {
      const correo = limpiar(data.correo, 160);
      const mensaje = limpiar(data.mensaje, 2000);

      if (correo && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) {
        return json({ result: 'error', error: 'correo invalido' });
      }

      hoja = getHoja(HOJA_CONTACTOS);
      fila = [nombre, telefono, correo, mensaje, new Date(), 'landing'];
      asunto = 'Nuevo contacto — ' + nombre;
      detalle =
        '<p><strong>Nombre:</strong> ' + esc(nombre) + '</p>' +
        '<p><strong>Telefono:</strong> ' + esc(telefono) + '</p>' +
        '<p><strong>Correo:</strong> ' + esc(correo) + '</p>' +
        '<p><strong>Mensaje:</strong><br>' + esc(mensaje) + '</p>';
    }

    hoja.appendRow(fila);

    // Aviso SOLO a la agencia. Nunca al correo que escribio el cliente.
    MailApp.sendEmail({
      to: AGENCIA,
      subject: asunto,
      htmlBody: '<div style="font-family:sans-serif;color:#333;">' +
        '<h2 style="color:#4F46E5;">' + esc(asunto) + '</h2>' +
        detalle +
        '<hr style="border:none;border-top:1px solid #eee;">' +
        '<p style="font-size:12px;color:#777;">Fila guardada en la hoja "' + esc(hoja.getName()) + '".</p>' +
        '</div>'
    });

    return json({ result: 'success', hoja: hoja.getName() });

  } catch (error) {
    return json({ result: 'error', error: error.toString() });
  } finally {
    try { lock.releaseLock(); } catch (err) {}
  }
}
