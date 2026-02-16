import React, { useState, useEffect } from 'react';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setFadeOut(true), 300);
                    setTimeout(() => onFinish(), 800);
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 120);
        return () => clearInterval(interval);
    }, [onFinish]);

    return (
        <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050508] transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            {/* Background effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-neon-purple/15 rounded-full blur-[180px] animate-blob"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-neon-blue/10 rounded-full blur-[180px] animate-blob" style={{ animationDelay: '2s' }}></div>

            {/* Grain overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

            {/* Logo */}
            <div className="relative z-10 text-center">
                {/* Animated icon */}
                <div className="mb-8 relative">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center shadow-[0_0_60px_rgba(0,243,255,0.4)] animate-pulse">
                        <svg viewBox="0 0 64 64" className="w-14 h-14">
                            <polygon points="24,16 24,48 48,32" fill="white" />
                        </svg>
                    </div>
                    {/* Glow ring */}
                    <div className="absolute inset-0 w-24 h-24 mx-auto rounded-2xl border-2 border-neon-blue/30 animate-ping" style={{ animationDuration: '2s' }}></div>
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2">
                    NEXUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">PLAY</span>
                </h1>
                <p className="text-gray-500 text-sm tracking-[0.3em] uppercase font-light">Premium Subscriptions</p>
            </div>

            {/* Progress bar */}
            <div className="relative z-10 mt-12 w-64">
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all duration-300 ease-out shadow-[0_0_15px_rgba(0,243,255,0.6)]"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                </div>
                <p className="text-center text-gray-600 text-[10px] mt-3 tracking-widest uppercase">
                    {progress < 30 ? 'Cargando catálogo...' : progress < 70 ? 'Preparando servicios...' : progress < 100 ? 'Casi listo...' : '¡Listo!'}
                </p>
            </div>
        </div>
    );
};

export default SplashScreen;
