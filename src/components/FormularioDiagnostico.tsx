import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, ShieldCheck, Clock } from 'lucide-react';
import { enviarFormulario, telefonoValido, mensajeDeError } from '../lib/formulario';

const PREGUNTAS = [
  {
    key: 'dolor',
    titulo: '¿Qué te está frenando hoy en tu negocio?',
    ayuda: 'Contanos con tus palabras qué te molesta o qué no funciona.',
    placeholder: 'Ejemplo: pierdo clientes porque no tengo página web...',
  },
  {
    key: 'intentos',
    titulo: '¿Qué has intentado antes para resolverlo?',
    ayuda: 'Si ya probaste algo, cuéntanos qué pasó.',
    placeholder: 'Ejemplo: pagué una web pero nunca la terminaron...',
  },
  {
    key: 'impacto',
    titulo: '¿Qué pasa si no lo resolvés en los próximos 3 meses?',
    ayuda: 'Queremos entender qué tan urgente es para ti.',
    placeholder: 'Ejemplo: sigo perdiendo ventas cada mes...',
  },
] as const;

const INVERSIONES = [
  'Menos de $100',
  'Entre $100 y $300',
  'Entre $300 y $600',
  'Más de $600',
  'Todavía no lo sé',
];

const HORARIOS = [
  'Mañana (8:00 - 12:00)',
  'Tarde (12:00 - 18:00)',
  'Noche (18:00 - 21:00)',
  'Cualquier horario',
];

export default function FormularioDiagnostico() {
  const [leadId, setLeadId] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [respuestas, setRespuestas] = useState<Record<string, string>>({
    dolor: '',
    intentos: '',
    impacto: '',
  });
  const [inversion, setInversion] = useState('');
  const [horario, setHorario] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLeadId(params.get('lead') || '');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (nombre.trim().length < 2) {
      setError('Escribí tu nombre completo.');
      return;
    }
    if (!telefonoValido(telefono)) {
      setError('Revisá el teléfono: debe tener al menos 6 dígitos.');
      return;
    }
    if (!respuestas.dolor.trim()) {
      setError('La primera pregunta es obligatoria.');
      return;
    }

    setLoading(true);
    const resultado = await enviarFormulario({
      tipo: 'diagnostico',
      lead_id: leadId || '(sin lead_id)',
      nombre,
      telefono,
      dolor: respuestas.dolor,
      intentos: respuestas.intentos,
      impacto: respuestas.impacto,
      inversion,
      horario,
      website: honeypot,
    });
    setLoading(false);

    if (resultado.ok) {
      setEnviado(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError(mensajeDeError(resultado.motivo));
    }
  };

  if (enviado) {
    return (
      <main className="min-h-screen bg-dark-900 flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            ¡Diagnóstico recibido!
          </h1>
          <p className="text-slate-400 mb-6">
            Gracias, {nombre}. Ya lo revisamos. Te escribimos por WhatsApp en menos de 24 horas
            con una propuesta concreta para tu caso.
          </p>
          <div className="glass-card rounded-xl p-4 text-left">
            <p className="text-sm text-slate-400">
              <strong className="text-white">Mientras tanto:</strong> guardá nuestro número en tu
              teléfono para reconocernos cuando te escribamos.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-900 py-8 sm:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">2 minutos · 5 preguntas</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Diagnóstico <span className="gradient-text">inicial</span>
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Cinco preguntas para entender tu caso y preparar una propuesta que sirva de verdad.
          </p>
          {leadId && (
            <p className="text-xs text-slate-500 mt-3">
              Referencia: <span className="text-cyan-400">{leadId}</span>
            </p>
          )}
        </header>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 neon-border space-y-6">
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute opacity-0 pointer-events-none -z-10 h-0 w-0"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-slate-300 mb-2">
                Tu nombre *
              </label>
              <input
                id="nombre"
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-neon-violet focus:outline-none focus:ring-1 focus:ring-neon-violet transition"
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-slate-300 mb-2">
                WhatsApp *
              </label>
              <input
                id="telefono"
                type="tel"
                required
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-neon-violet focus:outline-none focus:ring-1 focus:ring-neon-violet transition"
                placeholder="0414 123 4567"
              />
            </div>
          </div>

          {PREGUNTAS.map((p, i) => (
            <div key={p.key}>
              <label htmlFor={p.key} className="block text-sm font-medium text-slate-300 mb-1">
                <span className="text-cyan-400 font-bold mr-2">{i + 1}.</span>
                {p.titulo} {i === 0 && '*'}
              </label>
              <p className="text-xs text-slate-500 mb-2">{p.ayuda}</p>
              <textarea
                id={p.key}
                rows={3}
                value={respuestas[p.key]}
                onChange={(e) => setRespuestas({ ...respuestas, [p.key]: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-neon-violet focus:outline-none focus:ring-1 focus:ring-neon-violet transition resize-none"
                placeholder={p.placeholder}
              />
            </div>
          ))}

          <div>
            <label htmlFor="inversion" className="block text-sm font-medium text-slate-300 mb-1">
              <span className="text-cyan-400 font-bold mr-2">4.</span>
              ¿Cuánto podés invertir en este proyecto?
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Nos ayuda a proponerte algo realista, sin hacerte perder tiempo.
            </p>
            <select
              id="inversion"
              value={inversion}
              onChange={(e) => setInversion(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-neon-violet focus:outline-none focus:ring-1 focus:ring-neon-violet transition"
            >
              <option value="" className="bg-dark-800">Elegí una opción</option>
              {INVERSIONES.map((op) => (
                <option key={op} value={op} className="bg-dark-800">{op}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="horario" className="block text-sm font-medium text-slate-300 mb-1">
              <span className="text-cyan-400 font-bold mr-2">5.</span>
              ¿Cuándo preferís que te contactemos?
            </label>
            <select
              id="horario"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-neon-violet focus:outline-none focus:ring-1 focus:ring-neon-violet transition"
            >
              <option value="" className="bg-dark-800">Elegí una opción</option>
              {HORARIOS.map((op) => (
                <option key={op} value={op} className="bg-dark-800">{op}</option>
              ))}
            </select>
          </div>

          {error && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-gradient-to-r from-neon-violet to-neon-cyan text-white font-semibold hover:shadow-lg hover:shadow-neon-violet/30 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando...' : 'Enviar diagnóstico'}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>

          <div className="flex items-start gap-2 pt-2">
            <ShieldCheck className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500">
              Tus datos se usan solo para preparar tu propuesta y contactarte. No se comparten con
              terceros ni se usan para publicidad.
            </p>
          </div>

          <p className="text-center">
            <a href="/" className="text-xs text-slate-500 hover:text-neon-violet transition">
              ← Volver a la página principal
            </a>
          </p>
        </form>

        <footer className="mt-8 text-center text-xs text-slate-600 space-y-1">
          <p>Servicios Informáticos Jester Amaro, F.P.</p>
          <p>RIF: V-14899001-4</p>
          <p>San Carlos, Cojedes, Venezuela</p>
        </footer>
      </div>
    </main>
  );
}
