import React, { useState } from 'react';
import { 
  Play, 
  FileText, 
  FileEdit, 
  Mail, 
  ClipboardList, 
  BookOpen, 
  FolderOpen,
  ChevronRight,
  Clock,
  Users,
  CheckCircle,
  Lightbulb,
  Video,
  Download
} from 'lucide-react';

interface TutorialesProps {
  usuario: { nombre: string; cargo: string };
}

const Tutoriales: React.FC<TutorialesProps> = ({ usuario }) => {
  const [tutorialActivo, setTutorialActivo] = useState<string | null>(null);

  const tutoriales = [
    {
      id: 'redactor-oficios',
      titulo: 'Redactor de Oficios',
      descripcion: 'Aprende a generar oficios formales institucionales',
      icono: FileText,
      color: 'from-blue-500 to-blue-600',
      duracion: '5 min',
      nivel: 'Básico',
      pasos: [
        {
          titulo: 'Acceder al Redactor de Oficios',
          descripcion: 'Desde el dashboard, haz clic en "Redactor de Oficios" o selecciónalo desde el menú Agentes.',
          imagen: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Completar Información Básica',
          descripcion: 'Llena los campos requeridos: destinatario, cargo, institución y asunto del oficio.',
          imagen: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Seleccionar Tipo de Lenguaje',
          descripcion: 'Elige entre Formal, Muy Formal o Protocolar según el contexto del documento.',
          imagen: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Agregar Contenido Adicional',
          descripcion: 'En el campo de contenido libre, proporciona detalles específicos o instrucciones adicionales.',
          imagen: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Generar y Editar',
          descripcion: 'Haz clic en "Generar Documento", revisa el resultado y edita si es necesario.',
          imagen: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
      ]
    },
    {
      id: 'generador-memos',
      titulo: 'Generador de Memos',
      descripcion: 'Crea memorandos internos eficientemente',
      icono: FileEdit,
      color: 'from-emerald-500 to-emerald-600',
      duracion: '4 min',
      nivel: 'Básico',
      pasos: [
        {
          titulo: 'Seleccionar Generador de Memos',
          descripcion: 'Accede al generador desde el dashboard o menú de agentes.',
          imagen: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Información del Destinatario',
          descripcion: 'Completa los datos del destinatario: nombre, cargo y departamento.',
          imagen: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Definir Prioridad y Tipo',
          descripcion: 'Selecciona la prioridad (Normal, Alta, Urgente) y tipo de memo (Informativo, Solicitud, etc.).',
          imagen: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Generar Memorando',
          descripcion: 'Completa el contenido y genera el memorando con formato institucional.',
          imagen: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
      ]
    },
    {
      id: 'redactor-cartas',
      titulo: 'Redactor de Cartas',
      descripcion: 'Redacta cartas oficiales con protocolo apropiado',
      icono: Mail,
      color: 'from-purple-500 to-purple-600',
      duracion: '6 min',
      nivel: 'Intermedio',
      pasos: [
        {
          titulo: 'Acceder al Redactor de Cartas',
          descripcion: 'Selecciona el redactor de cartas desde el menú principal.',
          imagen: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Información del Destinatario',
          descripcion: 'Completa datos del destinatario, cargo, institución y ciudad.',
          imagen: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Seleccionar Protocolo',
          descripcion: 'Elige el nivel de protocolo: Estándar, Diplomático o Ceremonial.',
          imagen: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Tipo de Carta',
          descripcion: 'Selecciona entre Invitación, Agradecimiento, Felicitación, Condolencia o Presentación.',
          imagen: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
      ]
    },
    {
      id: 'asistente-minutas',
      titulo: 'Asistente de Minutas',
      descripcion: 'Elabora minutas y actas de reuniones',
      icono: ClipboardList,
      color: 'from-orange-500 to-orange-600',
      duracion: '7 min',
      nivel: 'Intermedio',
      pasos: [
        {
          titulo: 'Configurar Reunión',
          descripcion: 'Ingresa título, fecha, hora y lugar de la reunión.',
          imagen: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Lista de Participantes',
          descripcion: 'Agrega todos los participantes separados por comas.',
          imagen: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Tipo de Documento',
          descripcion: 'Selecciona entre Minuta, Acta o Memoria de Reunión.',
          imagen: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Contenido y Acuerdos',
          descripcion: 'Describe la agenda y los acuerdos alcanzados en la reunión.',
          imagen: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
      ]
    },
    {
      id: 'resumen-expedientes',
      titulo: 'Resumen de Expedientes',
      descripción: 'Genera resúmenes ejecutivos de expedientes',
      icono: BookOpen,
      color: 'from-teal-500 to-teal-600',
      duracion: '8 min',
      nivel: 'Avanzado',
      pasos: [
        {
          titulo: 'Información del Expediente',
          descripcion: 'Ingresa número, título y datos básicos del expediente.',
          imagen: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Tipo de Resumen',
          descripcion: 'Selecciona entre Ejecutivo, Técnico, Administrativo o Legal.',
          imagen: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Análisis de Contenido',
          descripcion: 'Proporciona información sobre antecedentes y desarrollo del expediente.',
          imagen: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
      ]
    },
    {
      id: 'analisis-inversion',
      titulo: 'Análisis de Inversión',
      descripcion: 'Evalúa proyectos de inversión pública',
      icono: FolderOpen,
      color: 'from-red-500 to-red-600',
      duracion: '10 min',
      nivel: 'Avanzado',
      pasos: [
        {
          titulo: 'Datos del Proyecto',
          descripcion: 'Ingresa código, nombre, institución ejecutora y monto del proyecto.',
          imagen: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Categoría y Análisis',
          descripcion: 'Selecciona categoría de inversión y tipo de análisis requerido.',
          imagen: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          titulo: 'Evaluación Integral',
          descripcion: 'El sistema genera análisis técnico, financiero, social y ambiental.',
          imagen: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
      ]
    }
  ];

  const consejos = [
    {
      titulo: 'Información Completa',
      descripcion: 'Proporciona toda la información requerida para obtener mejores resultados',
      icono: CheckCircle
    },
    {
      titulo: 'Contenido Específico',
      descripcion: 'Usa el campo de contenido adicional para instrucciones detalladas',
      icono: Lightbulb
    },
    {
      titulo: 'Revisión Final',
      descripcion: 'Siempre revisa y edita el documento generado antes de usarlo',
      icono: FileText
    },
    {
      titulo: 'Guarda tu Trabajo',
      descripcion: 'Utiliza el historial para gestionar tus documentos generados',
      icono: BookOpen
    }
  ];

  const obtenerColorNivel = (nivel: string) => {
    switch (nivel) {
      case 'Básico':
        return 'bg-green-100 text-green-800';
      case 'Intermedio':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Tutoriales del Sistema
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Aprende a usar cada agente de IA para generar documentos oficiales de manera eficiente. 
            Sigue nuestras guías paso a paso para dominar todas las funcionalidades.
          </p>
        </div>
      </div>

      {/* Tutorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {tutoriales.map((tutorial) => {
          const IconoComponente = tutorial.icono;
          const esActivo = tutorialActivo === tutorial.id;
          
          return (
            <div
              key={tutorial.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${tutorial.color}`}></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${tutorial.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <IconoComponente size={24} className="text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-500">{tutorial.duracion}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${obtenerColorNivel(tutorial.nivel)}`}>
                      {tutorial.nivel}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {tutorial.titulo}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {tutorial.descripcion}
                </p>

                <button
                  onClick={() => setTutorialActivo(esActivo ? null : tutorial.id)}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 font-semibold ${
                    esActivo
                      ? 'bg-gray-100 text-gray-700'
                      : `bg-gradient-to-r ${tutorial.color} text-white hover:shadow-lg transform hover:scale-105`
                  }`}
                >
                  <Play size={16} />
                  <span>{esActivo ? 'Ocultar Tutorial' : 'Ver Tutorial'}</span>
                </button>

                {/* Tutorial Steps */}
                {esActivo && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-4">Pasos del Tutorial:</h4>
                    <div className="space-y-4">
                      {tutorial.pasos.map((paso, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className={`w-8 h-8 bg-gradient-to-br ${tutorial.color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-800 mb-1">
                              {paso.titulo}
                            </h5>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {paso.descripcion}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Consejos para Mejores Resultados
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {consejos.map((consejo, index) => {
            const IconoComponente = consejo.icono;
            
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconoComponente size={24} className="text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">
                  {consejo.titulo}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {consejo.descripcion}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Resources */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Video size={32} className="text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Recursos Adicionales
          </h3>
          
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Próximamente estarán disponibles videos tutoriales y guías descargables 
            para complementar tu aprendizaje del sistema AIGP-SEGEPLAN.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold">
              <Video size={16} />
              <span>Videos Tutoriales</span>
            </button>
            
            <button className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold">
              <Download size={16} />
              <span>Guías PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Support Contact */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            ¿Necesitas Ayuda Adicional?
          </h3>
          
          <p className="text-gray-600 mb-6">
            Si tienes dudas específicas sobre el uso de algún agente, no dudes en contactar 
            al equipo de soporte técnico de SEGEPLAN.
          </p>
          
          <div className="flex items-center justify-center space-x-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span>soporte@segeplan.gob.gt</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={16} />
              <span>Mesa de Ayuda: Ext. 1234</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutoriales;