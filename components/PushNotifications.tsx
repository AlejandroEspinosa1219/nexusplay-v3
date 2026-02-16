import React, { useState, useRef, useEffect } from 'react';
import { useServices } from '../contexts/ServiceContext';

const PushNotifications: React.FC = () => {
    const { notifications, markNotificationRead, markAllNotificationsRead } = useServices();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const iconMap: Record<string, string> = {
        offer: 'fa-solid fa-fire text-orange-400',
        price_drop: 'fa-solid fa-arrow-trend-down text-green-400',
        info: 'fa-solid fa-circle-info text-blue-400',
        referral: 'fa-solid fa-gift text-purple-400'
    };

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
                <i className="fa-solid fa-bell text-gray-400 hover:text-white transition-colors"></i>
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[#151520] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                    {/* Header */}
                    <div className="p-4 border-b border-white/5 flex justify-between items-center">
                        <h3 className="font-bold text-white text-sm">Notificaciones</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllNotificationsRead}
                                className="text-[10px] text-neon-blue hover:underline font-bold"
                            >
                                Marcar todas leídas
                            </button>
                        )}
                    </div>

                    {/* List */}
                    <div className="max-h-72 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <i className="fa-solid fa-bell-slash text-2xl mb-2 opacity-50"></i>
                                <p className="text-xs">Sin notificaciones</p>
                            </div>
                        ) : (
                            notifications.slice(0, 15).map(notif => (
                                <div
                                    key={notif.id}
                                    onClick={() => markNotificationRead(notif.id)}
                                    className={`p-3 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors flex gap-3 ${!notif.read ? 'bg-neon-blue/5' : ''}`}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                        <i className={iconMap[notif.type] || iconMap.info}></i>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-bold ${!notif.read ? 'text-white' : 'text-gray-400'}`}>
                                            {notif.title}
                                        </p>
                                        <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">{notif.message}</p>
                                        <p className="text-[9px] text-gray-600 mt-1">{notif.date}</p>
                                    </div>
                                    {!notif.read && (
                                        <div className="w-2 h-2 rounded-full bg-neon-blue flex-shrink-0 mt-1"></div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PushNotifications;
