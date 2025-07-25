import React, { useState } from 'react';
import { Search, Calendar, FileText, Edit, Trash2 } from 'lucide-react';

interface HistorialProps {
  usuario: { nombre: string; cargo: string };
}

const Historial: React.FC<HistorialProps> = ({ usuario }) => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroFecha, setFiltroFecha] = useState('');

  // Datos de ejemplo para el historial
  const documentos = [
    {
      id: 1,
      titulo: 'Oficio de Solicitud de Información',
      tipo: 'oficio',
      fecha: '2025-01-15',
      destinatario: 'Lic. María González',
      estado: 'completado'
    },
    {
      id: 2,
      titulo: 'Memorando sobre Presupuesto 2025',
      tipo: 'memorando',
      fecha: '2025-01-14',
      destinatario: 'Departamento de Finanzas',
      estado: 'borrador'
    },
    {
      id: 3,
      titulo: 'Carta de Invitación a Evento',
      tipo: 'carta',
      fecha: '2025-01-13',
      destinatario: 'Ing. Roberto Pérez',
      estado: 'completado'
    },
    {
      id: 4,
      titulo: 'Minuta de Reunión de Coordinación',
      tipo: 'minuta',
      fecha: '2025-01-12',
      destinatario: 'Equipo de Proyecto',
      estado: 'completado'
    },
    {
      id: 5,
      titulo: 'Resumen de Expediente 001-2025',
      tipo: 'resumen',
      fecha: '2025-01-11',
      destinatario: 'Dirección General',
      estado: 'completado'
    }
  ];

  const tiposDocumento = [
    { valor: 'todos', etiqueta: 'Todos los tipos' },
    { valor: 'oficio', etiqueta: 'Oficios' },
    { valor: 'memorando', etiqueta: 'Memorandos' },
    { valor: 'carta', etiqueta: 'Cartas' },
    { valor: 'minuta', etiqueta: 'Minutas' },
    { valor: 'resumen', etiqueta: 'Resúmenes' },
    { valor: 'analisis', etiqueta: 'Análisis' }
  ];

  const documentosFiltrados = documentos.filter(doc => {
    const coincideBusqueda = doc.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                           doc.destinatario.toLowerCase().includes(busqueda.toLowerCase());
    const coincideTipo = filtroTipo === 'todos' || doc.tipo === filtroTipo;
    const coincideFecha = !filtroFecha || doc.fecha.includes(filtroFecha);
    
    return coincideBusqueda && coincideTipo && coincideFecha;
  });

  const obtenerColorTipo = (tipo: string) => {
    const colores = {
      oficio: 'bg-blue-100 text-blue-800',
      memorando: 'bg-green-100 text-green-800',
      carta: 'bg-purple-100 text-purple-800',
      minuta: 'bg-orange-100 text-orange-800',
      resumen: 'bg-teal-100 text-teal-800',
      analisis: 'bg-red-100 text-red-800'
    };
    return colores[tipo as keyof typeof colores] || 'bg-gray-100 text-gray-800';
  };

  const obtenerColorEstado = (estado: string) => {
    return estado === 'completado' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Historial de Documentos
        </h2>
        <p className="text-gray-600">
          Gestiona y consulta todos los documentos generados con el sistema
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar documento
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar por título o destinatario..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de documento
            </label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {tiposDocumento.map(tipo => (
                <option key={tipo.valor} value={tipo.valor}>
                  {tipo.etiqueta}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="date"
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de documentos */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            Documentos encontrados: {documentosFiltrados.length}
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {documentosFiltrados.map(documento => (
            <div key={documento.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-800">
                      {documento.titulo}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${obtenerColorTipo(documento.tipo)}`}>
                      {documento.tipo}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${obtenerColorEstado(documento.estado)}`}>
                      {documento.estado}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Destinatario:</strong> {documento.destinatario}</p>
                    <p><strong>Fecha:</strong> {new Date(documento.fecha).toLocaleDateString('es-GT')}</p>
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <button
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Ver documento"
                  >
                    <FileText size={16} />
                  </button>
                  <button
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {documentosFiltrados.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No se encontraron documentos
            </h3>
            <p className="text-gray-600">
              Intenta ajustar los filtros de búsqueda o genera un nuevo documento
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Historial;