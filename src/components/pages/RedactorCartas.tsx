import React, { useState } from 'react';
import FormularioDocumento from '../ui/FormularioDocumento';
import EditorResultado from '../ui/EditorResultado';
import PanelRecursos from '../ui/PanelRecursos';

interface RedactorCartasProps {
  usuario: { nombre: string; cargo: string };
}

const RedactorCartas: React.FC<RedactorCartasProps> = ({ usuario }) => {
  const [documento, setDocumento] = useState('');
  const [cargando, setCargando] = useState(false);

  const camposFormulario = [
    { nombre: 'destinatario', etiqueta: 'Destinatario', tipo: 'text', requerido: true },
    { nombre: 'cargo_destinatario', etiqueta: 'Cargo', tipo: 'text', requerido: true },
    { nombre: 'institucion', etiqueta: 'Institución', tipo: 'text', requerido: true },
    { nombre: 'ciudad', etiqueta: 'Ciudad', tipo: 'text', requerido: true },
    { nombre: 'asunto', etiqueta: 'Asunto', tipo: 'text', requerido: true },
    { 
      nombre: 'protocolo', 
      etiqueta: 'Nivel de Protocolo', 
      tipo: 'select', 
      opciones: ['Estándar', 'Diplomático', 'Ceremonial'],
      requerido: true
    },
    { 
      nombre: 'tipo_carta', 
      etiqueta: 'Tipo de Carta', 
      tipo: 'select', 
      opciones: ['Invitación', 'Agradecimiento', 'Felicitación', 'Condolencia', 'Presentación'],
      requerido: true
    }
  ];

  const manejarGeneracion = async (datos: any) => {
    setCargando(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const carta = `
${datos.ciudad}, ${new Date().toLocaleDateString('es-GT')}

${datos.destinatario}
${datos.cargo_destinatario}
${datos.institucion}
${datos.ciudad}

Distinguido/a ${datos.destinatario}:

Es un honor dirigirme a usted con el propósito de ${datos.asunto.toLowerCase()}.

${datos.contenido_libre || `Contenido de la carta ${datos.tipo_carta.toLowerCase()} con protocolo ${datos.protocolo.toLowerCase()}...`}

Aprovecho la oportunidad para expresarle mi más distinguida consideración y estima.

Cordialmente,

${usuario.nombre}
${usuario.cargo}
Secretaría de Planificación y Programación de la Presidencia
SEGEPLAN

Adjunto: Según corresponda
`;

    setDocumento(carta);
    setCargando(false);
  };

  const recursosEspecificos = [
    {
      categoria: 'Protocolo Diplomático',
      items: [
        'Tratamientos oficiales',
        'Fórmulas de cortesía',
        'Estructura protocolaria',
        'Ceremonial institucional'
      ]
    },
    {
      categoria: 'Tipos de Cartas',
      items: [
        'Cartas de invitación oficial',
        'Cartas de agradecimiento',
        'Cartas de felicitación',
        'Cartas de presentación'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Redactor de Cartas Oficiales
        </h2>
        <p className="text-gray-600">
          Redacta cartas oficiales con protocolo diplomático y ceremonial apropiado
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FormularioDocumento
            campos={camposFormulario}
            onGenerar={manejarGeneracion}
            cargando={cargando}
            tipoDocumento="carta"
          />

          {documento && (
            <EditorResultado
              contenido={documento}
              onGuardar={(contenido) => console.log('Guardado:', contenido)}
              tipoDocumento="carta"
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

export default RedactorCartas;