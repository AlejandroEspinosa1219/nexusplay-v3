import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useServices } from '../contexts/ServiceContext';

interface ReferralSystemProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const { paymentConfig } = useServices();
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const referralCode = user?.referralCode || 'NEXUS000';
    const referralBalance = user?.referralBalance || 0;
    const referralCount = user?.referralCount || 0;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleShareWhatsApp = () => {
        const text = `🎮 ¡Únete a NexusPlay! Usa mi código *${referralCode}* y obtén 10% de descuento en tu primera compra.\n\n👉 Las mejores suscripciones de streaming al mejor precio.`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-[#121218] w-full max-w-md rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(188,19,254,0.2)] overflow-hidden">
                {/* Header */}
                <div className="relative h-40 bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="relative text-center z-10">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-3 border border-white/20">
                            <i className="fa-solid fa-gift text-3xl text-neon-purple"></i>
                        </div>
                        <h2 className="text-2xl font-black text-white">REFERIDOS</h2>
                        <p className="text-purple-300 text-xs">Invita amigos, gana descuentos</p>
                    </div>
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white">
                        <i className="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                <div className="p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-center">
                            <p className="text-3xl font-black text-neon-blue">{referralCount}</p>
                            <p className="text-[10px] text-gray-400 uppercase font-bold mt-1">Referidos</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-center">
                            <p className="text-3xl font-black text-neon-green">${(referralBalance / 1000).toFixed(0)}K</p>
                            <p className="text-[10px] text-gray-400 uppercase font-bold mt-1">Descuento Acum.</p>
                        </div>
                    </div>

                    {/* Referral Code */}
                    <div className="bg-black/50 rounded-xl p-4 border border-dashed border-neon-purple/30 mb-4">
                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-2 text-center">Tu código de referido</p>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-black/50 rounded-lg px-4 py-3 text-center">
                                <span className="text-xl font-black text-white tracking-[0.2em]">{referralCode}</span>
                            </div>
                            <button
                                onClick={handleCopy}
                                className={`px-4 py-3 rounded-lg font-bold text-xs transition-all ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-neon-purple text-white hover:brightness-110'
                                    }`}
                            >
                                <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'} mr-1`}></i>
                                {copied ? '¡Copiado!' : 'Copiar'}
                            </button>
                        </div>
                    </div>

                    {/* How it works */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-4">
                        <p className="text-xs font-bold text-white mb-3">¿Cómo funciona?</p>
                        <div className="space-y-3">
                            {[
                                { icon: 'fa-share-nodes', text: 'Comparte tu código con amigos', color: 'text-blue-400' },
                                { icon: 'fa-user-plus', text: 'Tu amigo se registra con tu código', color: 'text-purple-400' },
                                { icon: 'fa-percent', text: 'Ambos reciben 10% de descuento', color: 'text-green-400' }
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${step.color}`}>
                                        <i className={`fa-solid ${step.icon} text-sm`}></i>
                                    </div>
                                    <span className="text-xs text-gray-300">{step.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Share Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={handleShareWhatsApp}
                            className="py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
                            style={{ background: 'linear-gradient(to right, #25D366, #128C7E)' }}
                        >
                            <i className="fa-brands fa-whatsapp text-lg"></i> WhatsApp
                        </button>
                        <button
                            onClick={handleCopy}
                            className="py-3 rounded-xl font-bold text-sm bg-white/10 text-white flex items-center justify-center gap-2 hover:bg-white/20 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            <i className="fa-solid fa-link text-lg"></i> Copiar Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralSystem;
