import React, { useState } from 'react';
import FormularioDocumento from '../ui/FormularioDocumento';
import EditorResultado from '../ui/EditorResultado';
import PanelRecursos from '../ui/PanelRecursos';
import FileUpload from '../ui/FileUpload';

interface AnalisisInversionProps {
  usuario: { nombre: string; cargo: string };
}

const AnalisisInversion: React.FC<AnalisisInversionProps> = ({ usuario }) => {
  const [documento, setDocumento] = useState('');
  const [cargando, setCargando] = useState(false);
  const [archivosSubidos, setArchivosSubidos] = useState<any[]>([]);

  const camposFormulario = [
    { nombre: 'codigo_proyecto', etiqueta: 'Código del Proyecto', tipo: 'text', requerido: true },
    { nombre: 'nombre_proyecto', etiqueta: 'Nombre del Proyecto', tipo: 'text', requerido: true },
    { nombre: 'institucion_ejecutora', etiqueta: 'Institución Ejecutora', tipo: 'text', requerido: true },
    { nombre: 'monto_total', etiqueta: 'Monto Total (GTQ)', tipo: 'number', requerido: true },
    { nombre: 'fecha_inicio', etiqueta: 'Fecha de Inicio', tipo: 'date', requerido: true },
    { nombre: 'fecha_fin', etiqueta: 'Fecha de Finalización', tipo: 'date', requerido: true },
    { 
      nombre: 'categoria_inversion', 
      etiqueta: 'Categoría de Inversión', 
      tipo: 'select', 
      opciones: ['Infraestructura', 'Educación', 'Salud', 'Desarrollo Social', 'Medio Ambiente'],
      requerido: true
    },
    { 
      nombre: 'tipo_analisis', 
      etiqueta: 'Tipo de Análisis', 
      tipo: 'select', 
      opciones: ['Viabilidad', 'Factibilidad', 'Seguimiento', 'Evaluación'],
      requerido: true
    },
    { nombre: 'region', etiqueta: 'Región', tipo: 'text', requerido: true }
  ];

  const manejarGeneracion = async (datos: any) => {
    setCargando(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Incluir información de archivos subidos
    const infoArchivos = archivosSubidos.length > 0 
      ? `\n\nDOCUMENTOS DEL EXPEDIENTE:\n${archivosSubidos.map(archivo => `• ${archivo.nombre} - ${(archivo.tamaño / 1024).toFixed(1)} KB`).join('\n')}\n`
      : '';
    
    const analisis = `
ANÁLISIS DE EXPEDIENTE DE INVERSIÓN PÚBLICA

INFORMACIÓN GENERAL DEL PROYECTO

Código del Proyecto: ${datos.codigo_proyecto}
Nombre del Proyecto: ${datos.nombre_proyecto}
Institución Ejecutora: ${datos.institucion_ejecutora}
Monto Total: Q. ${Number(datos.monto_total).toLocaleString('es-GT')}
Período de Ejecución: ${new Date(datos.fecha_inicio).toLocaleDateString('es-GT')} - ${new Date(datos.fecha_fin).toLocaleDateString('es-GT')}
Categoría: ${datos.categoria_inversion}
Región: ${datos.region}
Tipo de Análisis: ${datos.tipo_analisis}
${infoArchivos}

RESUMEN EJECUTIVO:
${datos.contenido_libre || 'Análisis del proyecto de inversión pública basado en la documentación proporcionada...'}

${archivosSubidos.length > 0 && archivosSubidos[0].contenido ? 
  `ANÁLISIS DOCUMENTAL:\nBasado en el análisis de los documentos subidos, se identifican los siguientes elementos clave:\n${archivosSubidos[0].contenido.substring(0, 400)}...\n` : ''}

ANÁLISIS TÉCNICO:
• Viabilidad técnica del proyecto
• Recursos necesarios
• Cronograma de ejecución
• Riesgos identificados

ANÁLISIS FINANCIERO:
• Estructura de financiamiento
• Fuentes de recursos
• Flujo de caja proyectado
• Análisis costo-beneficio

ANÁLISIS SOCIAL:
• Población beneficiaria
• Impacto social esperado
• Indicadores de desarrollo
• Sostenibilidad del proyecto

ANÁLISIS AMBIENTAL:
• Evaluación de impacto ambiental
• Medidas de mitigación
• Cumplimiento normativo
• Sostenibilidad ambiental

RECOMENDACIONES:
1. [Recomendación técnica]
2. [Recomendación financiera]
3. [Recomendación de implementación]

DICTAMEN:
[Dictamen técnico sobre la viabilidad del proyecto]

Elaborado por: ${usuario.nombre}
Cargo: ${usuario.cargo}
SEGEPLAN

Fecha de elaboración: ${new Date().toLocaleDateString('es-GT')}
`;

    setDocumento(analisis);
    setCargando(false);
  };

  const recursosEspecificos = [
    {
      categoria: 'Marco Normativo',
      items: [
        'Ley de Inversión Pública',
        'Reglamento SNIP',
        'Guías metodológicas',
        'Criterios de evaluación'
      ]
    },
    {
      categoria: 'Herramientas de Análisis',
      items: [
        'Análisis costo-beneficio',
        'Evaluación de riesgos',
        'Indicadores de impacto',
        'Matrices de evaluación'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Análisis de Expediente de Inversión
        </h2>
        <p className="text-gray-600">
          Analiza y evalúa expedientes de proyectos de inversión pública bajo normativa SNIP
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Subida de documentos del proyecto */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Documentos del Proyecto
            </h3>
            <p className="text-gray-600 mb-4">
              Sube los documentos del expediente de inversión para un análisis más preciso
            </p>
            <FileUpload
              onArchivosSubidos={setArchivosSubidos}
              tiposPermitidos={['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx']}
              tamaño_maximo={20}
              multiple={true}
            />
          </div>

          <FormularioDocumento
            campos={camposFormulario}
            onGenerar={manejarGeneracion}
            cargando={cargando}
            tipoDocumento="analisis"
          />

          {documento && (
            <EditorResultado
              contenido={documento}
              onGuardar={(contenido) => console.log('Guardado:', contenido)}
              tipoDocumento="analisis"
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

export default AnalisisInversion;