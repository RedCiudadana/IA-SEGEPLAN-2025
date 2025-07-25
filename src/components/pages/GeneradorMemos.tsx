import React, { useState } from 'react';
import FormularioDocumento from '../ui/FormularioDocumento';
import EditorResultado from '../ui/EditorResultado';
import PanelRecursos from '../ui/PanelRecursos';

interface GeneradorMemosProps {
  usuario: { nombre: string; cargo: string };
}

const GeneradorMemos: React.FC<GeneradorMemosProps> = ({ usuario }) => {
  const [documento, setDocumento] = useState('');
  const [cargando, setCargando] = useState(false);

  const camposFormulario = [
    { nombre: 'destinatario', etiqueta: 'Para', tipo: 'text', requerido: true },
    { nombre: 'cargo_destinatario', etiqueta: 'Cargo', tipo: 'text', requerido: true },
    { nombre: 'departamento', etiqueta: 'Departamento', tipo: 'text', requerido: true },
    { nombre: 'asunto', etiqueta: 'Asunto', tipo: 'text', requerido: true },
    { 
      nombre: 'prioridad', 
      etiqueta: 'Prioridad', 
      tipo: 'select', 
      opciones: ['Normal', 'Alta', 'Urgente'],
      requerido: true
    },
    { 
      nombre: 'tipo_memo', 
      etiqueta: 'Tipo de Memo', 
      tipo: 'select', 
      opciones: ['Informativo', 'Solicitud', 'Instrucciones', 'Recordatorio'],
      requerido: true
    }
  ];

  const manejarGeneracion = async (datos: any) => {
    setCargando(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const memo = `
MEMORANDO INTERNO

MEMO No. ${Math.floor(Math.random() * 1000)}-2025-SEGEPLAN

PARA: ${datos.destinatario}
CARGO: ${datos.cargo_destinatario}
DEPARTAMENTO: ${datos.departamento}

DE: ${usuario.nombre}
CARGO: ${usuario.cargo}

FECHA: ${new Date().toLocaleDateString('es-GT')}
ASUNTO: ${datos.asunto}
PRIORIDAD: ${datos.prioridad}

${datos.contenido_libre || `Contenido del memorando ${datos.tipo_memo.toLowerCase()} relacionado con: ${datos.asunto}`}

Favor acusar recibo de este memorando.

Atentamente,

${usuario.nombre}
${usuario.cargo}
SEGEPLAN
`;

    setDocumento(memo);
    setCargando(false);
  };

  const recursosEspecificos = [
    {
      categoria: 'Tipos de Memorandos',
      items: [
        'Memorando informativo',
        'Memorando de solicitud',
        'Memorando de instrucciones',
        'Memorando de recordatorio'
      ]
    },
    {
      categoria: 'Mejores Prácticas',
      items: [
        'Claridad en el asunto',
        'Brevedad y precisión',
        'Estructura lógica',
        'Seguimiento adecuado'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Generador de Memos Internos
        </h2>
        <p className="text-gray-600">
          Crea memorandos internos con formato estandarizado para comunicación interna
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FormularioDocumento
            campos={camposFormulario}
            onGenerar={manejarGeneracion}
            cargando={cargando}
            tipoDocumento="memorando"
          />

          {documento && (
            <EditorResultado
              contenido={documento}
              onGuardar={(contenido) => console.log('Guardado:', contenido)}
              tipoDocumento="memorando"
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

export default GeneradorMemos;