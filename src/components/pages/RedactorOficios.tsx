import React, { useState } from 'react';
import FormularioDocumento from '../ui/FormularioDocumento';
import EditorResultado from '../ui/EditorResultado';
import PanelRecursos from '../ui/PanelRecursos';

interface RedactorOficiosProps {
  usuario: { nombre: string; cargo: string };
}

const RedactorOficios: React.FC<RedactorOficiosProps> = ({ usuario }) => {
  const [documento, setDocumento] = useState('');
  const [cargando, setCargando] = useState(false);

  const camposFormulario = [
    { nombre: 'destinatario', etiqueta: 'Destinatario', tipo: 'text', requerido: true },
    { nombre: 'cargo_destinatario', etiqueta: 'Cargo del Destinatario', tipo: 'text', requerido: true },
    { nombre: 'institucion', etiqueta: 'Institución', tipo: 'text', requerido: true },
    { nombre: 'asunto', etiqueta: 'Asunto', tipo: 'text', requerido: true },
    { 
      nombre: 'tipo_lenguaje', 
      etiqueta: 'Tipo de Lenguaje', 
      tipo: 'select', 
      opciones: ['Formal', 'Muy Formal', 'Protocolar'],
      requerido: true
    },
    { 
      nombre: 'urgencia', 
      etiqueta: 'Nivel de Urgencia', 
      tipo: 'select', 
      opciones: ['Normal', 'Urgente', 'Muy Urgente'],
      requerido: true
    }
  ];

  const manejarGeneracion = async (datos: any) => {
    setCargando(true);
    // Simulación de generación con IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const oficio = `
OFICIO No. ${Math.floor(Math.random() * 1000)}-2025-SEGEPLAN

${datos.institucion}
${datos.destinatario}
${datos.cargo_destinatario}

Asunto: ${datos.asunto}

Estimado/a ${datos.destinatario},

Por medio del presente oficio, me dirijo a usted de manera ${datos.tipo_lenguaje.toLowerCase()} para hacer de su conocimiento lo siguiente:

${datos.contenido_libre || 'Contenido del oficio basado en el asunto proporcionado...'}

Aprovecho la oportunidad para reiterarle las muestras de mi más alta consideración y estima.

Atentamente,

${usuario.nombre}
${usuario.cargo}
SEGEPLAN

c.c. Archivo
`;

    setDocumento(oficio);
    setCargando(false);
  };

  const recursosEspecificos = [
    {
      categoria: 'Plantillas de Oficios',
      items: [
        'Oficio de solicitud de información',
        'Oficio de convocatoria',
        'Oficio de respuesta institucional'
      ]
    },
    {
      categoria: 'Normativa',
      items: [
        'Manual de correspondencia oficial',
        'Protocolo de comunicaciones SEGEPLAN',
        'Guía de redacción institucional'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Redactor de Oficios
        </h2>
        <p className="text-gray-600">
          Genera oficios formales siguiendo los protocolos institucionales de SEGEPLAN
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FormularioDocumento
            campos={camposFormulario}
            onGenerar={manejarGeneracion}
            cargando={cargando}
            tipoDocumento="oficio"
          />

          {documento && (
            <EditorResultado
              contenido={documento}
              onGuardar={(contenido) => console.log('Guardado:', contenido)}
              tipoDocumento="oficio"
            />
          )}
        </div>

        <div>
          <PanelRecursos recursos={recursosEspecificos} />
        </div>
      </div>
    </div>
  );
};

export default RedactorOficios;