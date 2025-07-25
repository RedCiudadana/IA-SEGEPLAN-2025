import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <div className="flex items-center space-x-4">
              <img
                src="https://datos.segeplan.gob.gt/uploads/admin/2024-06-04-213946.470432PAGINA-DATOS-ABIERTOS-13.png"
                alt="SEGEPLAN"
                className="h-8 w-auto object-contain filter brightness-0 invert"
              />
              <span className="font-bold text-sm">SEGEPLAN</span>
            </div>
            <span className="text-gray-400 text-xl">+</span>
            <div className="flex items-center space-x-4">
              <img
                src="https://datos.segeplan.gob.gt/img/redciudadana-logo.png"
                alt="Red Ciudadana"
                className="h-6 w-auto object-contain filter brightness-0 invert"
              />
              <span className="font-bold text-sm">Red Ciudadana</span>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-base font-medium">
              Un proyecto de <span className="font-semibold">SEGEPLAN</span> y <span className="font-semibold">Red Ciudadana</span>
            </p>
            <p className="text-gray-400 text-sm font-medium">Proyecto piloto 2025 • Gobierno de Guatemala</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;