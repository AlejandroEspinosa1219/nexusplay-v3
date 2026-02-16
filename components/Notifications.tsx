
import React, { useState, useEffect } from 'react';

const names = ['Juan', 'María', 'Carlos', 'Sofía', 'Andrés', 'Valentina', 'Sebastián', 'Camila', 'Alejandro', 'Isabella'];
const cities = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga'];
const products = ['Netflix Premium', 'Disney+ Combo', 'Spotify Duo', 'HBO Max', 'Amazon Prime', 'YouTube Premium'];

const Notifications: React.FC = () => {
  const [notification, setNotification] = useState<{name: string, city: string, product: string, time: string} | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start loop
    const loop = setInterval(() => {
        // Create random notification
        const name = names[Math.floor(Math.random() * names.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const product = products[Math.floor(Math.random() * products.length)];
        const time = Math.floor(Math.random() * 5) + 1; // 1-5 mins ago
        
        setNotification({ name, city, product, time: `${time} min` });
        setVisible(true);

        // Hide after 5 seconds
        setTimeout(() => {
            setVisible(false);
        }, 5000);

    }, 15000 + Math.random() * 10000); // Random interval between 15s and 25s

    return () => clearInterval(loop);
  }, []);

  if (!notification) return null;

  return (
    <div className={`fixed bottom-4 left-4 z-[55] max-w-xs transform transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="bg-[#121218]/90 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center gap-3 shadow-2xl">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
           {notification.name.charAt(0)}
        </div>
        <div>
          <p className="text-xs text-gray-400">
            <span className="font-bold text-white">{notification.name}</span> de {notification.city} compró:
          </p>
          <p className="text-sm font-bold text-neon-blue">{notification.product}</p>
          <p className="text-[10px] text-gray-500 mt-1">Hace {notification.time}</p>
        </div>
        <button onClick={() => setVisible(false)} className="absolute top-1 right-2 text-gray-600 hover:text-white">×</button>
      </div>
    </div>
  );
};

export default Notifications;
