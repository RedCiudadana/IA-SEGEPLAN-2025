import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, LogIn, Sparkles, Shield, Info } from 'lucide-react';

interface LoginProps {
  onLogin: (usuario: { nombre: string; cargo: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Credenciales de prueba
  const credencialesValidas = {
    usuario: 'julio.garcia',
    password: 'segeplan2025'
  };

  const manejarCambio = (campo: string, valor: string) => {
    setFormData(prev => ({
      ...prev,
      [campo]: valor
    }));
    if (error) setError('');
  };

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (formData.usuario === credencialesValidas.usuario && 
        formData.password === credencialesValidas.password) {
      onLogin({
        nombre: 'Julio García',
        cargo: 'Analista SEGEPLAN'
      });
    } else {
      setError('Usuario o contraseña incorrectos');
    }

    setCargando(false);
  };

  const llenarCredenciales = () => {
    setFormData({
      usuario: credencialesValidas.usuario,
      password: credencialesValidas.password
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header con logos */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-6 mb-6">
            <img
              src="https://datos.segeplan.gob.gt/uploads/admin/2024-06-04-213946.470432PAGINA-DATOS-ABIERTOS-13.png"
              alt="SEGEPLAN"
              className="h-16 w-auto object-contain"
            />
            <div className="h-12 w-px bg-white/30"></div>
            <img
              src="https://datos.segeplan.gob.gt/img/redciudadana-logo.png"
              alt="Red Ciudadana"
              className="h-12 w-auto object-contain"
            />
          </div>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="text-blue-400" size={24} />
            <h1 className="text-3xl font-bold text-white">
              AIGP-SEGEPLAN
            </h1>
          </div>
          
          <p className="text-blue-200 text-lg">
            Asistente Inteligente de Gestión Pública
          </p>
        </div>

        {/* Formulario de login */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Iniciar Sesión
            </h2>
            <p className="text-blue-200">
              Accede al sistema con tus credenciales institucionales
            </p>
          </div>

          {/* Credenciales de prueba */}
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-2xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Info size={20} className="text-blue-300 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-blue-200 font-semibold mb-2">Credenciales de Prueba:</h3>
                <div className="space-y-1 text-sm">
                  <p className="text-blue-100">
                    <strong>Usuario:</strong> {credencialesValidas.usuario}
                  </p>
                  <p className="text-blue-100">
                    <strong>Contraseña:</strong> {credencialesValidas.password}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={llenarCredenciales}
                  className="mt-3 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors"
                >
                  Llenar automáticamente
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={manejarSubmit} className="space-y-6">
            {/* Campo Usuario */}
            <div>
              <label className="block text-white font-medium mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.usuario}
                  onChange={(e) => manejarCambio('usuario', e.target.value)}
                  placeholder="Ingresa tu usuario"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="block text-white font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={mostrarPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => manejarCambio('password', e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {mostrarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-3">
                <p className="text-red-200 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Botón de login */}
            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
            >
              {cargando ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Iniciar Sesión</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-blue-200 text-sm">
              Sistema seguro protegido por SEGEPLAN
            </p>
            <p className="text-blue-300 text-xs mt-2">
              Proyecto piloto 2025 • Gobierno de Guatemala
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-6 text-center">
          <p className="text-blue-200 text-sm">
            ¿Problemas para acceder? Contacta al soporte técnico
          </p>
          <p className="text-blue-300 text-xs mt-1">
            Email: soporte@segeplan.gob.gt • Tel: (502) 2230-0000
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;