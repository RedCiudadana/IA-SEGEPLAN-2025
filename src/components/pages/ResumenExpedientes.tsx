import React, { useState } from 'react';
import FormularioDocumento from '../ui/FormularioDocumento';
import EditorResultado from '../ui/EditorResultado';
import PanelRecursos from '../ui/PanelRecursos';
import FileUpload from '../ui/FileUpload';

interface ResumenExpedientesProps {
  usuario: { nombre: string; cargo: string };
}

const ResumenExpedientes: React.FC<ResumenExpedientesProps> = ({ usuario }) => {
  const [documento, setDocumento] = useState('');
  const [cargando, setCargando] = useState(false);
  const [archivosSubidos, setArchivosSubidos] = useState<any[]>([]);

  const camposFormulario = [
    { nombre: 'numero_expediente', etiqueta: 'Número de Expediente', tipo: 'text', requerido: true },
    { nombre: 'titulo_expediente', etiqueta: 'Título del Expediente', tipo: 'text', requerido: true },
    { nombre: 'fecha_inicio', etiqueta: 'Fecha de Inicio', tipo: 'date', requerido: true },
    { nombre: 'responsable', etiqueta: 'Responsable', tipo: 'text', requerido: true },
    { nombre: 'departamento', etiqueta: 'Departamento', tipo: 'text', requerido: true },
    { 
      nombre: 'estado_expediente', 
      etiqueta: 'Estado del Expediente', 
      tipo: 'select', 
      opciones: ['En Proceso', 'Completado', 'Suspendido', 'Archivado'],
      requerido: true
    },
    { 
      nombre: 'tipo_resumen', 
      etiqueta: 'Tipo de Resumen', 
      tipo: 'select', 
      opciones: ['Ejecutivo', 'Técnico', 'Administrativo', 'Legal'],
      requerido: true
    },
    { nombre: 'paginas_totales', etiqueta: 'Número Total de Páginas', tipo: 'number' }
  ];

  const manejarGeneracion = async (datos: any) => {
    setCargando(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Incluir información de archivos subidos
    const infoArchivos = archivosSubidos.length > 0 
      ? `\n\nDOCUMENTOS ANALIZADOS:\n${archivosSubidos.map(archivo => `• ${archivo.nombre} (${(archivo.tamaño / 1024).toFixed(1)} KB)`).join('\n')}\n`
      : '';
    
    const resumen = `
RESUMEN ${datos.tipo_resumen.toUpperCase()} DE EXPEDIENTE

Expediente No.: ${datos.numero_expediente}
Título: ${datos.titulo_expediente}
Fecha de Inicio: ${new Date(datos.fecha_inicio).toLocaleDateString('es-GT')}
Responsable: ${datos.responsable}
Departamento: ${datos.departamento}
Estado: ${datos.estado_expediente}
Páginas Totales: ${datos.paginas_totales || 'N/A'}
${infoArchivos}

ANTECEDENTES:
${datos.contenido_libre || 'Resumen de antecedentes y contexto del expediente basado en los documentos analizados...'}

${archivosSubidos.length > 0 && archivosSubidos[0].contenido ? 
  `ANÁLISIS DE CONTENIDO:\n${archivosSubidos[0].contenido.substring(0, 500)}...\n` : ''}

DESARROLLO:
[Descripción del desarrollo del expediente]

SITUACIÓN ACTUAL:
[Estado actual del expediente y avances]

CONCLUSIONES:
[Conclusiones principales del análisis]

RECOMENDACIONES:
1. [Recomendación 1]
2. [Recomendación 2]
3. [Recomendación 3]

DOCUMENTOS ANEXOS:
• [Documento 1]
• [Documento 2]
• [Documento 3]

OBSERVACIONES:
[Observaciones adicionales relevantes]

Elaborado por: ${usuario.nombre}
Cargo: ${usuario.cargo}
SEGEPLAN

Fecha de elaboración: ${new Date().toLocaleDateString('es-GT')}
`;

    setDocumento(resumen);
    setCargando(false);
  };

  const recursosEspecificos = [
    {
      categoria: 'Tipos de Resumen',
      items: [
        'Resumen ejecutivo',
        'Resumen técnico',
        'Resumen administrativo',
        'Resumen legal'
      ]
    },
    {
      categoria: 'Metodología',
      items: [
        'Análisis de contenido',
        'Identificación de elementos clave',
        'Síntesis de información',
        'Estructura lógica'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Resumen de Expedientes
        </h2>
        <p className="text-gray-600">
          Genera resúmenes ejecutivos de expedientes complejos con análisis estructurado
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Subida de archivos */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Documentos del Expediente
            </h3>
            <FileUpload
              onArchivosSubidos={setArchivosSubidos}
              tiposPermitidos={['.pdf', '.doc', '.docx', '.txt']}
              tamaño_maximo={15}
              multiple={true}
            />
          </div>

          <FormularioDocumento
            campos={camposFormulario}
            onGenerar={manejarGeneracion}
            cargando={cargando}
            tipoDocumento="resumen"
          />

          {documento && (
            <EditorResultado
              contenido={documento}
              onGuardar={(contenido) => console.log('Guardado:', contenido)}
              tipoDocumento="resumen"
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

export default ResumenExpedientes;