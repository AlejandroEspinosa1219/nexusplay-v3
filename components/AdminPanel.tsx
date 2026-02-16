
import React, { useState } from 'react';
import { useServices } from '../contexts/ServiceContext';
import { useAuth } from '../contexts/AuthContext'; // Import Auth
import { Client } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { clients, addClient, resellerMode, toggleResellerMode, globalConfig, updateGlobalConfig } = useServices();
  const { allUsers } = useAuth(); // Get registered users
  const [activeTab, setActiveTab] = useState<'crm' | 'users' | 'settings'>('crm');
  
  // New Client Form State
  const [newClient, setNewClient] = useState({ name: '', phone: '', service: '' });

  if (!isOpen) return null;

  const handleAddClient = () => {
    const client: Client = {
      id: Date.now().toString(),
      ...newClient,
      purchaseDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      active: true
    };
    addClient(client);
    setNewClient({ name: '', phone: '', service: '' });
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-[#1a1a24] w-full max-w-4xl h-[80vh] rounded-3xl border border-white/10 flex flex-col relative z-10 overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="bg-black/50 p-6 flex justify-between items-center border-b border-white/5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-user-secret text-red-500"></i> NexusPlay Admin Pro
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><i className="fa-solid fa-xmark text-xl"></i></button>
        </div>

        {/* Sidebar + Content */}
        <div className="flex flex-1 overflow-hidden">
           <div className="w-48 bg-black/30 p-4 space-y-2 border-r border-white/5">
             <button 
               onClick={() => setActiveTab('crm')} 
               className={`w-full text-left p-3 rounded-xl text-sm font-bold ${activeTab === 'crm' ? 'bg-neon-blue text-black' : 'text-gray-400 hover:bg-white/5'}`}
             >
               <i className="fa-solid fa-users mr-2"></i> CRM Ventas
             </button>
             <button 
               onClick={() => setActiveTab('users')} 
               className={`w-full text-left p-3 rounded-xl text-sm font-bold ${activeTab === 'users' ? 'bg-neon-blue text-black' : 'text-gray-400 hover:bg-white/5'}`}
             >
               <i className="fa-solid fa-address-book mr-2"></i> Registros Web
             </button>
             <button 
               onClick={() => setActiveTab('settings')} 
               className={`w-full text-left p-3 rounded-xl text-sm font-bold ${activeTab === 'settings' ? 'bg-neon-blue text-black' : 'text-gray-400 hover:bg-white/5'}`}
             >
               <i className="fa-solid fa-gears mr-2"></i> Configuración
             </button>
           </div>

           <div className="flex-1 p-6 overflow-y-auto">
             {activeTab === 'crm' && (
               <div>
                  <h3 className="text-white font-bold mb-4">Gestión de Clientes (Manual)</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <input className="bg-black/50 p-2 rounded text-white border border-white/10" placeholder="Nombre" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} />
                    <input className="bg-black/50 p-2 rounded text-white border border-white/10" placeholder="Servicio" value={newClient.service} onChange={e => setNewClient({...newClient, service: e.target.value})} />
                    <button onClick={handleAddClient} className="bg-green-600 text-white rounded font-bold hover:bg-green-500">Agregar</button>
                  </div>

                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-gray-500 text-xs uppercase border-b border-white/10">
                        <th className="p-3">Cliente</th>
                        <th className="p-3">Servicio</th>
                        <th className="p-3">Vence</th>
                        <th className="p-3">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map(client => (
                        <tr key={client.id} className="border-b border-white/5 hover:bg-white/5 text-sm text-gray-300">
                          <td className="p-3">{client.name}</td>
                          <td className="p-3">{client.service}</td>
                          <td className="p-3 text-orange-400">{client.expiryDate}</td>
                          <td className="p-3"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Activo</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {clients.length === 0 && <p className="text-center text-gray-500 mt-10">No hay clientes manuales registrados.</p>}
               </div>
             )}

             {activeTab === 'users' && (
               <div>
                 <h3 className="text-white font-bold mb-4">Usuarios Registrados en la Web</h3>
                 <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-black/40 text-gray-400 text-xs uppercase">
                          <th className="p-4">Nombre</th>
                          <th className="p-4">Email</th>
                          <th className="p-4">Contraseña</th>
                          <th className="p-4">Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUsers.map((u, idx) => (
                          <tr key={idx} className="border-b border-white/5 hover:bg-white/5 text-sm text-gray-300">
                            <td className="p-4 font-bold text-white">{u.name}</td>
                            <td className="p-4">{u.email}</td>
                            <td className="p-4 font-mono text-neon-blue">{u.password}</td>
                            <td className="p-4 text-xs text-gray-500">{u.date || 'Reciente'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {allUsers.length === 0 && (
                      <div className="p-8 text-center text-gray-500">
                        <i className="fa-regular fa-folder-open text-4xl mb-2 opacity-50"></i>
                        <p>Aún no hay usuarios registrados.</p>
                      </div>
                    )}
                 </div>
               </div>
             )}

             {activeTab === 'settings' && (
               <div className="space-y-6">
                 {/* Feature 16: Reseller Mode Toggle */}
                 <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
                   <div>
                     <h4 className="text-white font-bold">Modo Revendedor</h4>
                     <p className="text-gray-400 text-xs">Mostrar precios mayoristas en las tarjetas.</p>
                   </div>
                   <button 
                     onClick={toggleResellerMode}
                     className={`w-12 h-6 rounded-full transition-colors relative ${resellerMode ? 'bg-green-500' : 'bg-gray-600'}`}
                   >
                     <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${resellerMode ? 'translate-x-6' : ''}`}></div>
                   </button>
                 </div>

                 {/* GLOBAL CONFIG */}
                 <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
                    <h4 className="text-white font-bold flex items-center gap-2">
                       <i className="fa-solid fa-bullhorn text-neon-blue"></i> Configuración del Banner
                    </h4>
                    
                    <div className="flex items-center gap-4">
                       <label className="text-gray-400 text-xs w-24">Activar Banner</label>
                       <input 
                        type="checkbox" 
                        checked={globalConfig.showBanner}
                        onChange={e => updateGlobalConfig('showBanner', e.target.checked)}
                        className="w-5 h-5 accent-neon-blue"
                       />
                    </div>

                    <div>
                      <label className="text-gray-400 text-xs block mb-1">Texto Principal</label>
                      <input 
                        className="w-full bg-black/50 text-white p-2 rounded border border-white/10"
                        value={globalConfig.promoText}
                        onChange={e => updateGlobalConfig('promoText', e.target.value)}
                        placeholder="Ej: OFERTA DE LANZAMIENTO"
                      />
                    </div>

                    <div>
                      <label className="text-gray-400 text-xs block mb-1">Código Promocional</label>
                      <input 
                        className="w-full bg-black/50 text-white p-2 rounded border border-white/10"
                        value={globalConfig.promoCode}
                        onChange={e => updateGlobalConfig('promoCode', e.target.value)}
                        placeholder="Ej: NEXUS2025"
                      />
                    </div>

                    <div>
                      <label className="text-gray-400 text-xs block mb-1">Texto Final (Detalles)</label>
                      <input 
                        className="w-full bg-black/50 text-white p-2 rounded border border-white/10"
                        value={globalConfig.promoDetail}
                        onChange={e => updateGlobalConfig('promoDetail', e.target.value)}
                        placeholder="Ej: PARA 10% OFF EXTRA"
                      />
                    </div>
                 </div>
                 
                 {/* Feature 17: Instagram Generator Placeholder */}
                 <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl text-center">
                   <i className="fa-brands fa-instagram text-4xl text-white mb-2"></i>
                   <h4 className="text-white font-bold">Generador de Posts</h4>
                   <p className="text-white/80 text-sm mb-4">Crea imágenes promocionales para tus historias.</p>
                   <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold text-sm">Próximamente</button>
                 </div>
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
