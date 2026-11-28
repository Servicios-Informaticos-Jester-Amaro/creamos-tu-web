import { useEffect, useState } from 'react';
import LandingPage from './components/LandingPage';
import FormularioDiagnostico from './components/FormularioDiagnostico';

function App() {
  // Enrutado mínimo: Vercel reescribe /diagnostico a index.html
  const [ruta, setRuta] = useState('');

  useEffect(() => {
    setRuta(window.location.pathname);
    const alCambiar = () => setRuta(window.location.pathname);
    window.addEventListener('popstate', alCambiar);
    return () => window.removeEventListener('popstate', alCambiar);
  }, []);

  if (ruta.replace(/\/$/, '') === '/diagnostico') {
    return <FormularioDiagnostico />;
  }

  return <LandingPage />;
}

export default App;
