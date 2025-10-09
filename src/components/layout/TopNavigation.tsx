import React, { useState } from 'react';
import { Home, FileText, File as FileEdit, Mail, ClipboardList, BookOpen, FolderOpen, History, BarChart3, ChevronDown, Menu, X, User, Book } from 'lucide-react';

interface TopNavigationProps {
  seccionActiva: string;
  onCambiarSeccion: (seccion: string) => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  seccionActiva,
  onCambiarSeccion
}) => {
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const [submenuAbierto, setSubmenuAbierto] = useState(false);

  const secciones = [
    { id: 'inicio', titulo: 'Inicio', icono: Home },
    { id: 'perfil', titulo: 'Mi Perfil', icono: User },
    { id: 'tutoriales', titulo: 'Tutoriales', icono: BookOpen },
    { id: 'historial', titulo: 'Historial', icono: History },
    { id: 'estadisticas', titulo: 'Estadísticas', icono: BarChart3 }
  ];

  const agentes = [
    { id: 'redactor-oficios', titulo: 'Oficios', icono: FileText },
    { id: 'generador-memos', titulo: 'Memos', icono: FileEdit },
    { id: 'redactor-cartas', titulo: 'Cartas', icono: Mail },
    { id: 'asistente-minutas', titulo: 'Minutas', icono: ClipboardList },
    { id: 'resumen-expedientes', titulo: 'Resúmenes', icono: BookOpen },
    { id: 'analisis-inversion', titulo: 'Análisis', icono: FolderOpen }
  ];

  const manejarClick = (seccion: string) => {
    onCambiarSeccion(seccion);
    setMenuMovilAbierto(false);
    setSubmenuAbierto(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-[96px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Navegación principal - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {secciones.map((seccion) => {
              const IconoComponente = seccion.icono;
              const esActivo = seccionActiva === seccion.id;
              
              return (
                <button
                  key={seccion.id}
                  onClick={() => manejarClick(seccion.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${esActivo 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <IconoComponente size={18} />
                  <span>{seccion.titulo}</span>
                </button>
              );
            })}

            {/* Dropdown de Agentes */}
            <div className="relative">
              <button
                onClick={() => setSubmenuAbierto(!submenuAbierto)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
              >
                <FileText size={18} />
                <span>Agentes</span>
                <ChevronDown size={16} className={`transform transition-transform ${submenuAbierto ? 'rotate-180' : ''}`} />
              </button>

              {submenuAbierto && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                  {agentes.map((agente) => {
                    const IconoComponente = agente.icono;
                    const esActivo = seccionActiva === agente.id;
                    
                    return (
                      <button
                        key={agente.id}
                        onClick={() => manejarClick(agente.id)}
                        className={`
                          w-full flex items-center space-x-3 px-4 py-3 text-left text-sm transition-all duration-200
                          ${esActivo 
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-r-4 border-blue-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                          }
                        `}
                      >
                        <IconoComponente size={18} />
                        <span>{agente.titulo}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {menuMovilAbierto ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {menuMovilAbierto && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {secciones.map((seccion) => {
                const IconoComponente = seccion.icono;
                const esActivo = seccionActiva === seccion.id;
                
                return (
                  <button
                    key={seccion.id}
                    onClick={() => manejarClick(seccion.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                      ${esActivo 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <IconoComponente size={20} />
                    <span>{seccion.titulo}</span>
                  </button>
                );
              })}

              <div className="pt-2 border-t border-gray-200 mt-4">
                <p className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Agentes
                </p>
                {agentes.map((agente) => {
                  const IconoComponente = agente.icono;
                  const esActivo = seccionActiva === agente.id;
                  
                  return (
                    <button
                      key={agente.id}
                      onClick={() => manejarClick(agente.id)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                        ${esActivo 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <IconoComponente size={20} />
                      <span>{agente.titulo}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavigation;