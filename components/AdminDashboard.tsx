import React, { useState } from 'react';
import { useServices } from '../contexts/ServiceContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCOP } from '../utils/currency';

interface AdminDashboardProps {
    isOpen: boolean;
    onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
    const { services, orders, clients, reviews, cart } = useServices();
    const { allUsers } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'sales' | 'clients'>('overview');

    // Metrics
    const totalRevenue = orders.reduce((sum, o) => sum + o.price, 0);
    const activeOrders = orders.filter(o => o.status === 'active').length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const totalClients = clients.length + allUsers.length;
    const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0';

    // Service popularity (by order count)
    const servicePopularity = services.map(s => ({
        name: s.name,
        count: orders.filter(o => o.serviceName === s.name).length,
        color: s.brandColor,
        revenue: orders.filter(o => o.serviceName === s.name).reduce((sum, o) => sum + o.price, 0)
    })).sort((a, b) => b.count - a.count).slice(0, 6);

    const maxCount = Math.max(...servicePopularity.map(s => s.count), 1);

    // Monthly data (simulated from orders)
    const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    const monthlyData = monthLabels.map((_, i) => {
        const monthOrders = orders.filter(o => {
            const d = new Date(o.date);
            return d.getMonth() === i;
        });
        return monthOrders.reduce((sum, o) => sum + o.price, 0);
    });
    const maxMonthly = Math.max(...monthlyData, 1);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-[#0d0d14] w-full max-w-4xl max-h-[90vh] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-blue-900/30 to-purple-900/30">
                    <div>
                        <h2 className="text-2xl font-black text-white flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <i className="fa-solid fa-chart-pie text-white"></i>
                            </div>
                            Dashboard Admin
                        </h2>
                        <p className="text-gray-400 text-xs mt-1">Métricas y estadísticas de NexusPlay</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <i className="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>

                {/* Tabs */}
                <div className="px-6 pt-4 flex gap-2">
                    {[
                        { id: 'overview' as const, label: 'General', icon: 'fa-gauge-high' },
                        { id: 'sales' as const, label: 'Ventas', icon: 'fa-chart-line' },
                        { id: 'clients' as const, label: 'Clientes', icon: 'fa-users' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${activeTab === tab.id
                                    ? 'bg-neon-blue text-black'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <i className={`fa-solid ${tab.icon}`}></i>{tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* KPI Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: 'Ingresos', value: formatCOP(totalRevenue), icon: 'fa-dollar-sign', color: 'from-green-500 to-emerald-700', change: '+12%' },
                                    { label: 'Pedidos Activos', value: activeOrders.toString(), icon: 'fa-check-circle', color: 'from-blue-500 to-cyan-700', change: `${pendingOrders} pendientes` },
                                    { label: 'Clientes', value: totalClients.toString(), icon: 'fa-users', color: 'from-purple-500 to-indigo-700', change: '+5 hoy' },
                                    { label: 'Rating Promedio', value: `${avgRating}⭐`, icon: 'fa-star', color: 'from-yellow-500 to-orange-600', change: `${reviews.length} reseñas` }
                                ].map((kpi, i) => (
                                    <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
                                        <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-3xl bg-gradient-to-br ${kpi.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center mb-3`}>
                                            <i className={`fa-solid ${kpi.icon} text-white text-sm`}></i>
                                        </div>
                                        <p className="text-2xl font-black text-white">{kpi.value}</p>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold mt-1">{kpi.label}</p>
                                        <p className="text-[10px] text-green-400 mt-2">{kpi.change}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Charts Row */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Bar Chart - Service Popularity */}
                                <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                        <i className="fa-solid fa-chart-bar text-neon-blue"></i>Servicios Más Vendidos
                                    </h3>
                                    <div className="space-y-3">
                                        {servicePopularity.map((svc, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <span className="text-[10px] text-gray-400 w-20 truncate font-bold">{svc.name}</span>
                                                <div className="flex-1 h-6 bg-black/30 rounded-lg overflow-hidden relative">
                                                    <div
                                                        className="h-full rounded-lg flex items-center pl-2 transition-all duration-1000 ease-out"
                                                        style={{
                                                            width: `${Math.max((svc.count / maxCount) * 100, 8)}%`,
                                                            background: `linear-gradient(to right, ${svc.color}cc, ${svc.color}40)`
                                                        }}
                                                    >
                                                        <span className="text-[9px] font-black text-white drop-shadow">{svc.count}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {servicePopularity.length === 0 && (
                                            <p className="text-xs text-gray-500 text-center py-4">Sin datos de ventas aún</p>
                                        )}
                                    </div>
                                </div>

                                {/* Donut Chart - Order Status */}
                                <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                        <i className="fa-solid fa-chart-pie text-neon-purple"></i>Estado de Pedidos
                                    </h3>
                                    <div className="flex items-center justify-center">
                                        <div className="relative w-36 h-36">
                                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                                {/* Background circle */}
                                                <circle cx="18" cy="18" r="14" fill="none" stroke="#ffffff08" strokeWidth="4" />
                                                {/* Active */}
                                                <circle cx="18" cy="18" r="14" fill="none" stroke="#22c55e" strokeWidth="4"
                                                    strokeDasharray={`${orders.length > 0 ? (activeOrders / orders.length) * 88 : 0} 88`}
                                                    strokeLinecap="round" />
                                                {/* Pending */}
                                                <circle cx="18" cy="18" r="14" fill="none" stroke="#eab308" strokeWidth="4"
                                                    strokeDasharray={`${orders.length > 0 ? (pendingOrders / orders.length) * 88 : 0} 88`}
                                                    strokeDashoffset={`-${orders.length > 0 ? (activeOrders / orders.length) * 88 : 0}`}
                                                    strokeLinecap="round" />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-2xl font-black text-white">{orders.length}</span>
                                                <span className="text-[9px] text-gray-400 uppercase">Total</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 mt-4">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                            <span className="text-[10px] text-gray-400">Activos ({activeOrders})</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                            <span className="text-[10px] text-gray-400">Pendientes ({pendingOrders})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Monthly Revenue Bar Chart */}
                            <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                    <i className="fa-solid fa-chart-line text-neon-green"></i>Ingresos Mensuales
                                </h3>
                                <div className="flex items-end gap-3 h-32">
                                    {monthLabels.map((label, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                            <span className="text-[9px] text-gray-400 font-bold">
                                                {monthlyData[i] > 0 ? `${(monthlyData[i] / 1000).toFixed(0)}K` : '-'}
                                            </span>
                                            <div className="w-full rounded-t-lg relative overflow-hidden transition-all duration-1000"
                                                style={{
                                                    height: `${Math.max((monthlyData[i] / maxMonthly) * 100, 4)}%`,
                                                    background: `linear-gradient(to top, #00f3ff40, #00f3ff)`
                                                }}>
                                            </div>
                                            <span className="text-[9px] text-gray-500">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'sales' && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-white">Últimos Pedidos</h3>
                            {orders.length === 0 ? (
                                <div className="text-center text-gray-500 py-12">
                                    <i className="fa-solid fa-receipt text-3xl mb-3 opacity-50"></i>
                                    <p className="text-sm">Sin pedidos registrados</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {orders.slice().reverse().slice(0, 20).map(order => (
                                        <div key={order.id} className="bg-white/5 p-3 rounded-xl flex items-center justify-between border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <img src={order.serviceLogoUrl} alt="" className="w-8 h-8 object-contain rounded bg-black/50 p-1" />
                                                <div>
                                                    <p className="text-xs font-bold text-white">{order.serviceName} - {order.planName}</p>
                                                    <p className="text-[10px] text-gray-500">{order.userName} · {order.date}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-black text-white">{formatCOP(order.price)}</p>
                                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${order.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                            'bg-red-500/20 text-red-400'
                                                    }`}>{order.status === 'active' ? 'Activo' : order.status === 'pending' ? 'Pendiente' : 'Expirado'}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'clients' && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-white">Clientes Registrados ({allUsers.length})</h3>
                            {allUsers.length === 0 ? (
                                <div className="text-center text-gray-500 py-12">
                                    <i className="fa-solid fa-users text-3xl mb-3 opacity-50"></i>
                                    <p className="text-sm">Sin clientes registrados</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {allUsers.map((u: any, i: number) => (
                                        <div key={i} className="bg-white/5 p-3 rounded-xl flex items-center justify-between border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-xs font-bold text-white">
                                                    {u.name?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-white">{u.name}</p>
                                                    <p className="text-[10px] text-gray-500">{u.email}</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-gray-400">{u.date || 'Reciente'}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {clients.length > 0 && (
                                <>
                                    <h3 className="text-sm font-bold text-white mt-6">Clientes CRM ({clients.length})</h3>
                                    <div className="space-y-2">
                                        {clients.map(client => (
                                            <div key={client.id} className="bg-white/5 p-3 rounded-xl flex items-center justify-between border border-white/5">
                                                <div>
                                                    <p className="text-xs font-bold text-white">{client.name}</p>
                                                    <p className="text-[10px] text-gray-500">{client.service} · {client.phone}</p>
                                                </div>
                                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${client.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                    {client.active ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
