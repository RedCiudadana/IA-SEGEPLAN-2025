import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  FileEdit, 
  Mail, 
  ClipboardList, 
  BookOpen, 
  FolderOpen,
  Zap,
  CheckCircle,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  Clock,
  Shield,
  Target
} from 'lucide-react';
import { Agent, run, tool, setDefaultOpenAIKey, setDefaultOpenAIClient } from "@openai/agents";
import { z } from "zod";
import OpenAI from "openai";

interface DashboardProps {
  usuario: { nombre: string; cargo: string };
  onSeleccionarAgente: (agente: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ usuario, onSeleccionarAgente }) => {
  const agentes = [
    {
      id: 'redactor-oficios',
      titulo: 'Redactor de Oficios',
      descripcion: 'Genera oficios formales siguiendo protocolos institucionales de SEGEPLAN',
      icono: FileText,
      color: 'from-blue-500 to-blue-600',
      categoria: 'Comunicación Externa',
      tiempo: '2-3 min'
    },
    {
      id: 'generador-memos',
      titulo: 'Generador de Memos',
      descripcion: 'Crea memorandos internos con formato estandarizado para comunicación interna',
      icono: FileEdit,
      color: 'from-emerald-500 to-emerald-600',
      categoria: 'Comunicación Interna',
      tiempo: '1-2 min'
    },
    {
      id: 'redactor-cartas',
      titulo: 'Redactor de Cartas',
      descripcion: 'Redacta cartas oficiales con protocolo diplomático y ceremonial apropiado',
      icono: Mail,
      color: 'from-purple-500 to-purple-600',
      categoria: 'Protocolo Oficial',
      tiempo: '3-4 min'
    },
    {
      id: 'asistente-minutas',
      titulo: 'Asistente de Minutas',
      descripcion: 'Elabora minutas y actas de reuniones institucionales con formato estándar',
      icono: ClipboardList,
      color: 'from-orange-500 to-orange-600',
      categoria: 'Gestión de Reuniones',
      tiempo: '4-5 min'
    },
    {
      id: 'resumen-expedientes',
      titulo: 'Resumen de Expedientes',
      descripcion: 'Genera resúmenes ejecutivos de expedientes complejos con análisis estructurado',
      icono: BookOpen,
      color: 'from-teal-500 to-teal-600',
      categoria: 'Análisis Documental',
      tiempo: '5-7 min'
    },
    {
      id: 'analisis-inversion',
      titulo: 'Análisis de Inversión',
      descripcion: 'Analiza y evalúa expedientes de proyectos de inversión pública bajo normativa SNIP',
      icono: FolderOpen,
      color: 'from-red-500 to-red-600',
      categoria: 'Inversión Pública',
      tiempo: '7-10 min'
    }
  ];

  const beneficios = [
    {
      icono: Clock,
      titulo: 'Ahorro de Tiempo',
      descripcion: 'Reduce el tiempo de redacción hasta en un 80%',
      color: 'text-blue-600'
    },
    {
      icono: Shield,
      titulo: 'Cumplimiento Normativo',
      descripcion: 'Garantiza el cumplimiento de protocolos institucionales',
      color: 'text-emerald-600'
    },
    {
      icono: Target,
      titulo: 'Precisión Profesional',
      descripcion: 'Documentos con formato y lenguaje institucional correcto',
      color: 'text-purple-600'
    },
    {
      icono: Sparkles,
      titulo: 'Inteligencia Artificial',
      descripcion: 'Tecnología avanzada adaptada a la administración pública',
      color: 'text-orange-600'
    }
  ];

  const [haiku, setHaiku] = useState<string>("");

  useEffect(() => {
    async function main() {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        console.error("No está definida la variable VITE_OPENAI_API_KEY");
        return;
      }

      const client = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true
      });
      setDefaultOpenAIClient(client); // conecta el cliente al agente

      const agent = new Agent({
        name: "HaikuBotMini",
        model: "gpt-4o-mini",
        instructions: "You are a poetic assistant. Write a haiku about recursion in programming.",
      });

      const result = await run(agent, "");
      setHaiku(result.finalOutput ?? "");
    }

    main().catch(console.error);
  }, []);

  return (
    <div className="space-y-12">
      {/* Welcome Section - Redesigned */}
      <section className="relative">
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="relative p-12">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Zap size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white mb-2">
                    Bienvenido, {usuario.nombre}
                  </h1>
                  <p className="text-blue-200 text-xl font-medium">
                    {usuario.cargo} • SEGEPLAN
                  </p>
                </div>
              </div>
              
              <p className="text-white/90 text-xl leading-relaxed mb-8 max-w-3xl">
                Optimiza tu trabajo con nuestros agentes de inteligencia artificial especializados 
                en documentos oficiales. Genera contenido profesional que cumple con todos los 
                estándares institucionales de SEGEPLAN.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {beneficios.map((beneficio, index) => {
                  const IconoComponente = beneficio.icono;
                  return (
                    <div key={index} className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconoComponente size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2">{beneficio.titulo}</h3>
                        <p className="text-white/80">{beneficio.descripcion}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Haiku generado por el agente */}
      {haiku && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Haiku generado por IA:</h2>
          <pre className="text-blue-900 whitespace-pre-wrap">{haiku}</pre>
        </div>
      )}

      {/* Agents Section - Enhanced */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Selecciona tu Agente Especializado
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cada agente está diseñado para un tipo específico de documento institucional, 
            garantizando resultados profesionales y conformes a la normativa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {agentes.map((agente) => {
            const IconoComponente = agente.icono;
            
            return (
              <div
                key={agente.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1 overflow-hidden"
              >
                {/* Header with gradient */}
                <div className={`h-3 bg-gradient-to-r ${agente.color}`}></div>
                
                <div className="p-8">
                  {/* Icon and Category */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${agente.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconoComponente size={28} className="text-white" />
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full mb-1">
                        {agente.categoria}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock size={14} className="mr-1" />
                        {agente.tiempo}
                      </div>
                    </div>
                  </div>
                  
                  {/* Title and Description */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {agente.titulo}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed text-base">
                    {agente.descripcion}
                  </p>
                  
                  {/* Action Button */}
                  <button
                    onClick={() => onSeleccionarAgente(agente.id)}
                    className={`w-full bg-gradient-to-r ${agente.color} hover:shadow-xl text-white px-6 py-4 rounded-2xl transition-all duration-300 font-semibold text-lg shadow-lg transform group-hover:scale-105 flex items-center justify-center space-x-2`}
                  >
                    <span>Comenzar</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section - New */}
      <section className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué usar AIGP-SEGEPLAN?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Una solución integral para la modernización de la gestión documental en el sector público
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Zap size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tecnología Avanzada</h3>
            <p className="text-gray-600 leading-relaxed">
              Inteligencia artificial especializada en documentos gubernamentales, 
              entrenada con protocolos institucionales de SEGEPLAN.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Users size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Colaboración Institucional</h3>
            <p className="text-gray-600 leading-relaxed">
              Proyecto conjunto entre SEGEPLAN y Red Ciudadana para fortalecer 
              la administración pública con herramientas digitales modernas.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Award size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Calidad Garantizada</h3>
            <p className="text-gray-600 leading-relaxed">
              Documentos que cumplen con estándares institucionales, 
              normativas vigentes y mejores prácticas de redacción oficial.
            </p>
          </div>
        </div>
      </section>

      {/* Getting Started Section - New */}
      <section className="bg-white rounded-3xl shadow-lg p-12 border border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Comienza en 3 Pasos Simples
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Selecciona un Agente</h3>
              <p className="text-gray-600">
                Elige el tipo de documento que necesitas generar de nuestra lista de agentes especializados.
              </p>
            </div>

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Completa la Información</h3>
              <p className="text-gray-600">
                Llena el formulario con los datos necesarios. El sistema te guiará paso a paso.
              </p>
            </div>

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Genera y Descarga</h3>
              <p className="text-gray-600">
                Obtén tu documento profesional listo para usar, editar o compartir según necesites.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;