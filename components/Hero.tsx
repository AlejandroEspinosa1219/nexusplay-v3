
import React from 'react';
import Button from './Button';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background Video/Particles */}
      <div className="absolute inset-0 bg-dark-bg">
         {/* Simple CSS Particles */}
        <div className="absolute w-full h-full opacity-30">
           {[...Array(20)].map((_, i) => (
             <div key={i} className="absolute bg-white rounded-full animate-pulse" 
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    animationDelay: `${Math.random() * 5}s`
                  }}></div>
           ))}
        </div>
        
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-neon-purple/20 rounded-full blur-[150px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-blue/10 rounded-full blur-[150px] animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-neon-green text-xs font-bold uppercase tracking-widest mb-8 hover:bg-white/10 transition-all cursor-default shadow-[0_0_20px_rgba(10,255,10,0.2)]">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-ping"></span>
            DISPONIBLE 24/7
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black text-white leading-none mb-6 tracking-tighter drop-shadow-2xl">
            NEXUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">PLAY</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            Tu portal de entretenimiento definitivo. <br/>
            <strong className="text-white">Netflix, Disney+, HBO y más</strong> al mejor precio de Colombia.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="text-lg px-12 py-6 shadow-[0_0_30px_rgba(0,243,255,0.4)]" onClick={() => handleScroll('catalog')}>
              <i className="fa-solid fa-fire-flame-curved mr-2 text-orange-500"></i> VER CATÁLOGO 2026
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-12 py-6" onClick={() => handleScroll('features')}>
              <i className="fa-brands fa-whatsapp mr-2"></i> CONTACTAR
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <i className="fa-brands fa-cc-visa text-4xl"></i>
             <i className="fa-brands fa-cc-mastercard text-4xl"></i>
             <div className="text-2xl font-bold border-2 border-current px-2 rounded">NEQUI</div>
             <div className="text-2xl font-bold border-2 border-current px-2 rounded">DAVIPLATA</div>
          </div>
      </div>
    </section>
  );
};

export default Hero;
