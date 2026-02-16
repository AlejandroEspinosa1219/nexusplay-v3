import React, { useState } from 'react';
import { useServices } from '../contexts/ServiceContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCOP } from '../utils/currency';

interface OrderHistoryProps {
    isOpen: boolean;
    onClose: () => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ isOpen, onClose }) => {
    const { orders } = useServices();
    const { user } = useAuth();
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'active' | 'expired'>('all');

    const userOrders = orders
        .filter(o => !user || o.userId === user.id)
        .filter(o => filterStatus === 'all' || o.status === filterStatus)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const statusColors: Record<string, string> = {
        pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        active: 'bg-green-500/20 text-green-400 border-green-500/30',
        expired: 'bg-red-500/20 text-red-400 border-red-500/30'
    };

    const statusLabel: Record<string, string> = {
        pending: 'Pendiente',
        active: 'Activo',
        expired: 'Expirado'
    };

    return (
        <div className={`fixed inset-y-0 right-0 z-[70] w-full md:w-[420px] bg-[#121218] border-l border-white/10 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-full flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-white/5">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-black text-white italic">
                            MIS <span className="text-neon-blue">PEDIDOS</span>
                        </h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <i className="fa-solid fa-xmark text-xl"></i>
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2">
                        {(['all', 'pending', 'active', 'expired'] as const).map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${filterStatus === status
                                        ? 'bg-neon-blue text-black'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                {status === 'all' ? 'Todos' : statusLabel[status]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                    {userOrders.length === 0 ? (
                        <div className="text-center text-gray-500 mt-20">
                            <i className="fa-solid fa-receipt text-4xl mb-4 opacity-50"></i>
                            <p className="font-bold">Sin pedidos aún</p>
                            <p className="text-xs mt-2">Tus compras aparecerán aquí.</p>
                        </div>
                    ) : (
                        userOrders.map(order => (
                            <div key={order.id} className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all">
                                <div className="flex items-start gap-3">
                                    <img src={order.serviceLogoUrl} alt="" className="w-10 h-10 object-contain rounded-lg bg-black/50 p-1.5" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-sm text-white truncate">{order.serviceName}</h4>
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${statusColors[order.status]}`}>
                                                {statusLabel[order.status]}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400">{order.planName}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-white font-black text-sm">{formatCOP(order.price)}</span>
                                            <span className="text-[10px] text-gray-500">{order.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-gray-400">
                                                <i className="fa-solid fa-credit-card mr-1"></i>{order.paymentMethod}
                                            </span>
                                            {order.referralCode && (
                                                <span className="text-[9px] bg-purple-500/10 px-2 py-0.5 rounded text-purple-400">
                                                    <i className="fa-solid fa-gift mr-1"></i>{order.referralCode}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Summary */}
                <div className="p-6 border-t border-white/5">
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Total pedidos: {userOrders.length}</span>
                        <span>Activos: {userOrders.filter(o => o.status === 'active').length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
