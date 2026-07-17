import { useEffect, useState } from 'react';
import {
  Globe,
  Target,
  ShoppingCart,
  ShieldCheck,
  CheckCircle2,
  Accessibility,
  Lock,
  Cloud,
  Smartphone,
  Zap,
  ArrowRight,
  MessageCircle,
  Code2,
  Layers,
  Cpu,
  ChevronRight,
  ChevronLeft,
  Star,
  ExternalLink,
  Menu,
  X,
  Workflow,
  Activity,
  Bot,
  Database,
  AlertCircle,
} from 'lucide-react';

const SHEET_URL = "https://script.google.com/macros/s/AKfycbyuAmWUHUGZWMq-H4-aeb7RLcwdpL1hcCzhEMuprHZUV94YDp-KgMI5TiC7HS8lg3HW/exec";

function CyberLogo({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ctwGrad" x1="4" y1="6" x2="44" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="38%" stopColor="#a855f7" />
          <stop offset="70%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="ctwGrad2" x1="44" y1="6" x2="4" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <filter id="ctwGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M24 3.5 41.7 13.75v20.5L24 44.5 6.3 34.25v-20.5z"
        stroke="url(#ctwGrad)"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="rgba(139,92,246,0.06)"
        filter="url(#ctwGlow)"
      />
      <g filter="url(#ctwGlow)" stroke="url(#ctwGrad)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M19.5 18 14 24l5.5 6" />
        <path d="M28.5 18 34 24l-5.5 6" />
      </g>
      <path d="M26.5 16.5 21.5 31.5" stroke="url(#ctwGrad2)" strokeWidth="2.4" strokeLinecap="round" filter="url(#ctwGlow)" />
    </svg>
  );
}

const WHATSAPP_NUMBER = '584160200724';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20Creamos%20Tu%20Web,%20quiero%20iniciar%20mi%20proyecto%20web.`;

function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50">
      <div className="aurora-bg aurora-violet w-[500px] h-[500px] top-[50%] left-[20%]" />
      <div className="aurora-bg aurora-cyan w-[400px] h-[400px] bottom-[20%] right-[20%]" />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Servicios', id: 'servicios' },
    { label: 'Ventajas', id: 'ventajas' },
    { label: 'Portafolio', id: 'portafolio' },
    { label: 'Precios', id: 'precios' },
    { label: 'Contacto', id: 'contacto' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || menuOpen ? 'backdrop-blur-md bg-[#050609]/90 border-b border-white/5' : 'bg-[#050609]'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 group">
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <CyberLogo className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>
            <span className="font-bold text-lg sm:text-xl text-white tracking-tight">
              Creamos Tu Web
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm text-slate-300 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg glass-card text-white hover:neon-border transition-all duration-300"
          >
            <span className="relative w-5 h-5">
              <Menu
                className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                  }`}
              />
              <X
                className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                  }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 sm:px-6 pb-6 pt-2 flex flex-col gap-1 border-t border-white/5">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
              className={`group flex items-center justify-between px-4 py-3 rounded-xl text-left text-slate-200 hover:text-white glass-card-hover transition-all duration-300 ${menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
            >
              <span className="text-base font-medium">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-neon-cyan opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4 sm:mb-6 lg:mb-8 fade-in-up">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs sm:text-sm text-slate-300">Agencia Web Premium</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-4 sm:mb-6 fade-in-up fade-in-up-delay-1">
              <span className="gradient-text">Llevamos tu negocio</span>
              <br />
              <span className="text-white">al mundo digital</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-6 sm:mb-8 max-w-xl fade-in-up fade-in-up-delay-2">
              Diseñamos páginas web de alto impacto, sistemas a medida y automatizaciones que
              eliminan lo repetitivo en tu negocio. Todo optimizado para móvil y construido para
              crecer contigo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 fade-in-up fade-in-up-delay-3">
              <button
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass-card text-white font-medium text-base hover:bg-white/5 transition-all"
              >
                Ver Servicios
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 mt-6 sm:mt-10 fade-in-up fade-in-up-delay-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-dark-900 bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center"
                  >
                    <Star className="w-4 h-4 text-yellow-400" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-1">+50 proyectos exitosos</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-3xl" />

              <div className="relative floating">
                <div className="glass-card rounded-2xl p-4 neon-border transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="ml-auto text-xs text-slate-400">creamostuweb.com</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-3/4 rounded bg-white/10" />
                    <div className="h-3 w-1/2 rounded bg-white/10" />
                    <div className="h-20 rounded-lg bg-gradient-to-r from-violet-500/20 to-cyan-500/20 flex items-center justify-center">
                      <Globe className="w-8 h-8 text-violet-400 icon-glow-violet" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-12 rounded bg-white/5" />
                      <div className="h-12 rounded bg-white/5" />
                      <div className="h-12 rounded bg-white/5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 floating-delayed">
                <div className="glass-card rounded-xl p-3 neon-border-cyan">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Sitio en vivo</div>
                      <div className="text-[10px] text-slate-400">99.9% uptime</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 floating-delayed">
                <div className="glass-card rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">Ultra rápido</div>
                      <div className="text-[10px] text-slate-400">&lt; 1s carga</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      icon: Globe,
      title: 'Páginas Web Corporativas',
      description:
        'Sitios de alta velocidad, elegantes y profesionales que representan la identidad de tu marca con diseño moderno y experiencia de usuario excepcional.',
      color: 'violet',
      glowClass: 'icon-glow-violet',
    },
    {
      icon: Target,
      title: 'Landing Pages de Alta Conversión',
      description:
        'Diseñadas estratégicamente para convertir visitantes en clientes pagadores. Cada elemento está optimizado para maximizar tus resultados de venta.',
      color: 'cyan',
      glowClass: 'icon-glow-cyan',
    },
    {
      icon: Cpu,
      title: 'Sistemas a Medida para tu Negocio',
      description:
        'Software personalizado que se adapta a cómo trabaja tu empresa. Paneles administrativos, gestión interna, control de inventario, CRM propio — construido desde cero para resolver tus operaciones únicas.',
      color: 'violet',
      glowClass: 'icon-glow-violet',
    },
    {
      icon: ShoppingCart,
      title: 'Catálogos E-commerce',
      description:
        'Tiendas en línea completamente optimizadas para navegación móvil y ventas fluidas. Integración de pagos, carrito inteligente y gestión de inventario.',
      color: 'pink',
      glowClass: 'icon-glow-pink',
    },
    {
      icon: Workflow,
      title: 'Automatización de Procesos',
      description:
        'Conectamos tus herramientas y eliminamos las tareas repetitivas. Flujos de WhatsApp, email, hojas de cálculo, formularios y más — todo trabajando solo mientras tú te enfocas en crecer.',
      color: 'cyan',
      glowClass: 'icon-glow-cyan',
    },
    {
      icon: ShieldCheck,
      title: 'Optimización y Soporte',
      description:
        'Máxima seguridad, estabilidad en la nube y respaldos garantizados. Mantenemos tu sitio siempre actualizado, protegido y funcionando al 100%.',
      color: 'violet',
      glowClass: 'icon-glow-violet',
    },
  ];

  const colorMap: Record<string, string> = {
    violet: 'text-violet-400',
    cyan: 'text-cyan-400',
    pink: 'text-pink-400',
  };

  return (
    <section id="servicios" className="relative py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Layers className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-slate-300">Nuestros Servicios</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-alt">Soluciones digitales</span>
            <br />
            <span className="text-white">que impulsan tu negocio</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Cada proyecto es único. Diseñamos experiencias web a medida que combinan estética
            premium con rendimiento excepcional.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 group"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${service.color === 'violet' ? 'neon-border' : service.color === 'cyan' ? 'neon-border-cyan' : ''
                  }`}
              >
                <service.icon className={`w-7 h-7 ${colorMap[service.color]} ${service.glowClass}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola! Me interesa el servicio de ${service.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-cyan-400 cursor-pointer"
              >
                <span>Saber más</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuePropositionSection() {
  const features = [
    {
      icon: Accessibility,
      title: 'Accesibilidad Total',
      description: 'Diseños inclusivos que cumplen con estándares WCAG para todos los usuarios.',
    },
    {
      icon: Lock,
      title: 'Seguridad Premium',
      description: 'Certificados SSL, protección contra ataques y encriptación de datos sensibles.',
    },
    {
      icon: Cloud,
      title: 'Estabilidad en la Nube',
      description: 'Infraestructura cloud de alto rendimiento con escalabilidad automática.',
    },
    {
      icon: Smartphone,
      title: '100% Optimizado para Móviles',
      description: 'Experiencia perfecta en cualquier dispositivo, desde smartphones hasta desktops.',
    },
    {
      icon: Zap,
      title: 'Tiempos de Entrega Rápidos',
      description: 'Procesos ágiles que garantizan resultados en tiempo récord sin sacrificar calidad.',
    },
    {
      icon: Activity,
      title: 'Monitoreo Transparente 24/7',
      description: 'Vigilamos en segundo plano tus bases de datos y saldos de APIs de IA con alertas proactivas. Tú usas la tecnología sin miedo, nosotros nos encargamos de que todo funcione.',
    },
  ];

  return (
    <section id="ventajas" className="relative py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-300">¿Por qué elegirnos?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-white">Tecnología de punta,</span>
                <br />
                <span className="gradient-text">resultados garantizados</span>
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Combinamos las últimas tecnologías web con metodologías probadas para entregar
                productos digitales que superan expectativas. Tu éxito es nuestra prioridad.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 neon-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-slate-400">Clientes satisfechos</div>
                </div>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-5 flex items-start gap-4 group hover:bg-white/5 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 check-glow" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          width={640}
          height={360}
          loading="lazy"
          className="w-full aspect-video object-contain bg-[#050609] rounded-xl transition-opacity duration-500"
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black/80"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black/80"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function PortfolioSection() {
  const projects = [
    {
      title: 'Portal Corporativo',
      category: 'Web Corporativa',
      description: 'Sitio web elegante y profesional para empresas de servicios, optimizado para presencia institucional.',
      images: ['/portafolio/empresa-global.webp', '/portafolio/turismo.webp', '/portafolio/transporte.webp'],
      tags: ['React', 'Vite', 'SEO'],
      borderColor: 'border-violet-500/30',
    },
    {
      title: 'Landing Page',
      category: 'Landing Page',
      description: 'Landing page promocional de alta conversión diseñada para campañas específicas y captura de clientes.',
      images: ['/portafolio/reposteria.webp', '/portafolio/delivery.webp', '/portafolio/limpieza.webp'],
      tags: ['React', 'Tailwind', 'Conversión'],
      borderColor: 'border-pink-500/30',
    },
    {
      title: 'Catálogo Digital Express',
      category: 'E-commerce',
      description: 'Tienda en línea optimizada para mostrar productos con sistema de pedidos directos a WhatsApp.',
      images: ['/portafolio/catalogo-deportes.webp', '/portafolio/catalogo-tech.webp', '/portafolio/catalogo-hogar.webp'],
      tags: ['React', 'WhatsApp', 'Cloud'],
      borderColor: 'border-cyan-500/30',
    },
  ];

  return (
    <section id="portafolio" className="relative py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Code2 className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-slate-300">Portafolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Proyectos que hablan</span>
            <br />
            <span className="text-white">por sí solos</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Cada proyecto es una historia de éxito. Explora algunos de nuestros trabajos más
            destacados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden group"
            >
              <div className="relative p-3">
                <PortfolioCarousel images={project.images} />
              </div>
              <div className="p-6">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${project.borderColor} border backdrop-blur-sm text-white`}>
                  {project.category}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-slate-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Ver detalles</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      title: 'Landing Page Express',
      price: 60,
      maintenance: 10,
      description: 'Diseño y Montaje',
      features: [
        'Diseño de una sola página enfocado en ventas',
        'Formulario inteligente que guarda datos automáticamente en línea',
        'Sistema de respuesta inmediata (envío automático de correo de bienvenida al cliente)',
        'Botón de WhatsApp',
        'Diseño 100% móvil y PC',
        'Hasta 2 rondas de modificaciones',
      ],
      color: 'violet',
    },
    {
      title: 'Página Web Corporativa',
      price: 120,
      maintenance: 15,
      description: 'Diseño y Montaje',
      features: [
        'Estructura institucional con secciones (Inicio, Quiénes Somos, Servicios, Galería, Testimonios y Contacto)',
        'Mapa interactivo',
        'Correos corporativos profesionales',
        'Diseño premium adaptable',
        'Hasta 3 rondas de modificaciones',
      ],
      color: 'cyan',
    },
    {
      title: 'Catálogo Digital Express',
      price: 180,
      maintenance: 20,
      description: 'Diseño y Montaje',
      features: [
        'Tienda en línea con carrito de compras',
        'Pedidos estructurados directos al WhatsApp del negocio',
        'Carga inicial de hasta 15 productos con fotos y precios',
        'Buscador interno',
        'Categorías',
        'Hasta 3 rondas de modificaciones',
      ],
      color: 'pink',
    },
  ];

  const colorClasses = {
    violet: {
      border: 'border-violet-500/30',
      glow: 'neon-border',
      button: 'from-violet-600 to-purple-600',
      icon: 'text-violet-400',
    },
    cyan: {
      border: 'border-cyan-500/30',
      glow: 'neon-border-cyan',
      button: 'from-cyan-600 to-blue-600',
      icon: 'text-cyan-400',
    },
    pink: {
      border: 'border-pink-500/30',
      glow: 'neon-border-pink',
      button: 'from-pink-600 to-rose-600',
      icon: 'text-pink-400',
    },
  };

  const getWhatsAppLink = (planTitle: string) => {
    const message = encodeURIComponent(`Hola! Estoy interesado en el plan ${planTitle}`);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  return (
    <section id="precios" className="relative py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-slate-300">Precios y Planes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Inversión transparente,</span>
            <br />
            <span className="gradient-text">resultados extraordinarios</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tu negocio. Todos incluyen soporte técnico y mantenimiento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, i) => {
            const colors = colorClasses[plan.color as keyof typeof colorClasses];
            const whatsappLink = getWhatsAppLink(plan.title);
            return (
              <div
                key={i}
                className="glass-card rounded-2xl p-6 sm:p-8 relative flex flex-col justify-between h-full"
              >
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
                    <p className="text-sm text-slate-400">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-white">${plan.price}</span>
                      <span className="text-sm text-slate-400">USD</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-400">Soporte y Mantenimiento:</span>
                      <span className="text-white font-semibold">${plan.maintenance}/mes</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 ${colors.icon} flex-shrink-0 mt-0.5`} />
                        <span className="text-sm text-slate-300 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-xl bg-gradient-to-r ${colors.button} text-white font-semibold text-center block btn-glow mt-auto`}
                >
                  Solicitar
                </a>
              </div>
            );
          })}
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8 mb-12 neon-border group hover:scale-[1.02] transition-all duration-300">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30 mb-4">
                <Bot className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-semibold text-violet-300">SOLUCIONES AVANZADAS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Sistemas a Medida, Automatizaciones e IA
              </h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                ¿Necesitas algo más complejo? Desarrollamos soluciones personalizadas con APIs de IA,
                bases de datos en Supabase, automatizaciones avanzadas y más.
                <span className="text-cyan-400 font-semibold"> Infraestructura a nombre del cliente</span>
                para total transparencia en costos.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span>Bases de datos propias</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Bot className="w-4 h-4 text-violet-400" />
                  <span>Integración con IA</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Activity className="w-4 h-4 text-pink-400" />
                  <span>Automatizaciones</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-xl p-6 border border-violet-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-cyan-400" />
                  <span className="text-lg font-bold text-white">Bajo Cotización</span>
                </div>
                <p className="text-sm text-slate-300 mb-4">
                  Cada proyecto es único. Analizamos tus necesidades y te presentamos un presupuesto
                  detallado con costos de infraestructura separados.
                </p>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Mantenimiento y Monitoreo Activo:</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">Desde $20</span>
                    <span className="text-sm text-slate-400">USD/mes</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Incluye soporte técnico, monitoreo de APIs, alertas proactivas y actualizaciones
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Me interesa cotizar un proyecto de Sistemas a Medida, Automatizaciones o IA. ¿Podemos hablar?')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 text-white font-semibold text-center block btn-glow hover:scale-105 transition-transform"
              >
                Cotizar mi Proyecto
              </a>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Cargos Adicionales</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">$10</div>
              <div className="text-sm text-slate-400">Ronda de cambios extra</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">$2</div>
              <div className="text-sm text-slate-400">Producto adicional en catálogo</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">$15</div>
              <div className="text-sm text-slate-400">Sección adicional en el sitio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          telefono: formData.telefono,
          correo: formData.correo,
          mensaje: formData.mensaje
        }),
      });

      setSubmitted(true);
      setFormData({ nombre: '', telefono: '', correo: '', mensaje: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error al enviar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="relative py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm text-slate-300">Contacto</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">¿Listo para transformar</span>
            <br />
            <span className="gradient-text">tu presencia digital?</span>
          </h2>
          <p className="text-slate-400">
            Cuéntanos sobre tu proyecto y te contactaremos en menos de 24 horas.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="glass-card rounded-2xl p-6 sm:p-8 neon-border">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">¡Mensaje enviado!</h3>
                <p className="text-slate-400">Te contactaremos muy pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                    placeholder="+58 412 345 6789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Correo electrónico</label>
                  <input
                    type="email"
                    required
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Mensaje</label>
                  <textarea
                    required
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all resize-none"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-semibold btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enviando...' : 'Enviar solicitud'}
                </button>
              </form>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm mb-4">O contáctanos directamente</p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg btn-glow-cyan"
            >
              <MessageCircle className="w-6 h-6" />
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">Creamos Tu Web</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Creamos Tu Web. Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-600">
            Desarrollado por Servicios Informáticos JA
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-dark-900">
      <AuroraBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <div className="line-glow max-w-4xl mx-auto" />
        <ServicesSection />
        <div className="line-glow max-w-4xl mx-auto" />
        <ValuePropositionSection />
        <div className="line-glow max-w-4xl mx-auto" />
        <PortfolioSection />
        <div className="line-glow max-w-4xl mx-auto" />
        <PricingSection />
        <div className="line-glow max-w-4xl mx-auto" />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}