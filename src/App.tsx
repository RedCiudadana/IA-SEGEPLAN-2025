import React, { useState } from 'react';
import Login from './components/pages/Login';
import Header from './components/layout/Header';
import TopNavigation from './components/layout/TopNavigation';
import Footer from './components/layout/Footer';
import Dashboard from './components/pages/Dashboard';
import RedactorOficios from './components/pages/RedactorOficios';
import GeneradorMemos from './components/pages/GeneradorMemos';
import RedactorCartas from './components/pages/RedactorCartas';
import AsistenteMinutas from './components/pages/AsistenteMinutas';
import ResumenExpedientes from './components/pages/ResumenExpedientes';
import AnalisisInversion from './components/pages/AnalisisInversion';
import Historial from './components/pages/Historial';
import Tutoriales from './components/pages/Tutoriales';
import CursoIA from './components/pages/CursoIA';
import NotFound from './components/pages/NotFound';
import Perfil from './components/pages/Perfil';
import Estadisticas from './components/pages/Estadisticas';

function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const [usuario] = useState({ nombre: 'Julio', cargo: 'Analista SEGEPLAN' });

  const manejarLogin = (datosUsuario: { nombre: string; cargo: string }) => {
    setUsuarioAutenticado(true);
    // Aquí podrías actualizar los datos del usuario si es necesario
  };

  const manejarCerrarSesion = () => {
    setUsuarioAutenticado(false);
    setSeccionActiva('inicio');
  };

  // Si no está autenticado, mostrar login
  if (!usuarioAutenticado) {
    return <Login onLogin={manejarLogin} />;
  }

  const renderSeccionActiva = () => {
    switch (seccionActiva) {
      case 'inicio':
        return <Dashboard usuario={usuario} onSeleccionarAgente={setSeccionActiva} />;
      case 'tutoriales':
        return <Tutoriales usuario={usuario} />;
      case 'curso-ia':
        return <CursoIA />;
      case 'redactor-oficios':
        return <RedactorOficios usuario={usuario} />;
      case 'generador-memos':
        return <GeneradorMemos usuario={usuario} />;
      case 'redactor-cartas':
        return <RedactorCartas usuario={usuario} />;
      case 'asistente-minutas':
        return <AsistenteMinutas usuario={usuario} />;
      case 'resumen-expedientes':
        return <ResumenExpedientes usuario={usuario} />;
      case 'analisis-inversion':
        return <AnalisisInversion usuario={usuario} />;
      case 'historial':
        return <Historial usuario={usuario} />;
      case 'perfil':
        return <Perfil usuario={usuario} onCerrarSesion={manejarCerrarSesion} />;
      case 'estadisticas':
        return <Estadisticas usuario={usuario} />;
      case '404':
        return <NotFound onGoHome={() => setSeccionActiva('inicio')} />;
      default:
        return <NotFound onGoHome={() => setSeccionActiva('inicio')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header usuario={usuario} onCambiarSeccion={setSeccionActiva} />
      <TopNavigation 
        seccionActiva={seccionActiva}
        onCambiarSeccion={setSeccionActiva}
      />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderSeccionActiva()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;