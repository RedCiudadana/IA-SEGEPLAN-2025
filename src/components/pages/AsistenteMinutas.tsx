import React, { useState } from 'react';
import FormularioDocumento from '../ui/FormularioDocumento';
import EditorResultado from '../ui/EditorResultado';
import PanelRecursos from '../ui/PanelRecursos';
import FileUpload from '../ui/FileUpload';

interface AsistenteMinutasProps {
  usuario: { nombre: string; cargo: string };
}

const AsistenteMinutas: React.FC<AsistenteMinutasProps> = ({ usuario }) => {
  const [documento, setDocumento] = useState('');
  const [cargando, setCargando] = useState(false);
  const [archivosSubidos, setArchivosSubidos] = useState<any[]>([]);

  const camposFormulario = [
    { nombre: 'titulo_reunion', etiqueta: 'Título de la Reunión', tipo: 'text', requerido: true },
    { nombre: 'fecha_reunion', etiqueta: 'Fecha de la Reunión', tipo: 'date', requerido: true },
    { nombre: 'hora_inicio', etiqueta: 'Hora de Inicio', tipo: 'time', requerido: true },
    { nombre: 'hora_fin', etiqueta: 'Hora de Finalización', tipo: 'time' },
    { nombre: 'lugar', etiqueta: 'Lugar', tipo: 'text', requerido: true },
    { nombre: 'moderador', etiqueta: 'Moderador', tipo: 'text', requerido: true },
    { 
      nombre: 'tipo_documento', 
      etiqueta: 'Tipo de Documento', 
      tipo: 'select', 
      opciones: ['Minuta', 'Acta', 'Memoria de Reunión'],
      requerido: true
    },
    { nombre: 'participantes', etiqueta: 'Participantes (separados por coma)', tipo: 'textarea', requerido: true }
  ];

  const manejarGeneracion = async (datos: any) => {
    setCargando(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const participantesLista = datos.participantes.split(',').map((p: string) => p.trim());
    
    // Incluir información de archivos subidos
    const infoArchivos = archivosSubidos.length > 0 
      ? `\n\nDOCUMENTOS DE REFERENCIA:\n${archivosSubidos.map(archivo => `• ${archivo.nombre}`).join('\n')}\n`
      : '';
    
    const minuta = `
${datos.tipo_documento.toUpperCase()} DE REUNIÓN

Título: ${datos.titulo_reunion}
Fecha: ${new Date(datos.fecha_reunion).toLocaleDateString('es-GT')}
Hora: ${datos.hora_inicio} - ${datos.hora_fin || 'Por definir'}
Lugar: ${datos.lugar}
Moderador: ${datos.moderador}

PARTICIPANTES:
${participantesLista.map((p: string) => `• ${p}`).join('\n')}
${infoArchivos}

AGENDA:
${datos.contenido_libre || 'Puntos de agenda desarrollados en la reunión...'}

${archivosSubidos.length > 0 && archivosSubidos[0].contenido ? 
  `DOCUMENTOS REVISADOS:\nSe revisaron los siguientes documentos durante la reunión:\n${archivosSubidos.map(archivo => `• ${archivo.nombre}`).join('\n')}\n` : ''}

ACUERDOS Y COMPROMISOS:
1. [Acuerdo 1]
2. [Acuerdo 2]
3. [Acuerdo 3]

PRÓXIMOS PASOS:
• [Acción 1] - Responsable: [Nombre] - Fecha límite: [Fecha]
• [Acción 2] - Responsable: [Nombre] - Fecha límite: [Fecha]

OBSERVACIONES:
[Observaciones adicionales]

Elaborado por: ${usuario.nombre}
Cargo: ${usuario.cargo}
SEGEPLAN

Fecha de elaboración: ${new Date().toLocaleDateString('es-GT')}
`;

    setDocumento(minuta);
    setCargando(false);
  };

  const recursosEspecificos = [
    {
      categoria: 'Estructura de Documentos',
      items: [
        'Diferencias entre minuta y acta',
        'Elementos obligatorios',
        'Formato de compromisos',
        'Seguimiento de acuerdos'
      ]
    },
    {
      categoria: 'Mejores Prácticas',
      items: [
        'Registro de participantes',
        'Claridad en los acuerdos',
        'Asignación de responsables',
        'Fechas límite específicas'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Asistente para Minutas y Actas
        </h2>
        <p className="text-gray-600">
          Elabora minutas y actas de reuniones institucionales con formato estándar
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Subida de documentos de la reunión */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Documentos de la Reunión
            </h3>
            <p className="text-gray-600 mb-4">
              Sube documentos relacionados con la reunión (agenda, presentaciones, etc.)
            </p>
            <FileUpload
              onArchivosSubidos={setArchivosSubidos}
              tiposPermitidos={['.pdf', '.doc', '.docx', '.txt', '.ppt', '.pptx']}
              tamaño_maximo={25}
              multiple={true}
            />
          </div>

          <FormularioDocumento
            campos={camposFormulario}
            onGenerar={manejarGeneracion}
            cargando={cargando}
            tipoDocumento="minuta"
          />

          {documento && (
            <EditorResultado
              contenido={documento}
              onGuardar={(contenido) => console.log('Guardado:', contenido)}
              tipoDocumento="minuta"
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

export default AsistenteMinutas;