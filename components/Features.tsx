import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Features: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: 'fa-solid fa-layer-group',
      title: t('features.oneStop.title'),
      description: t('features.oneStop.desc'),
      color: 'text-neon-blue'
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: t('features.secure.title'),
      description: t('features.secure.desc'),
      color: 'text-neon-purple'
    },
    {
      icon: 'fa-solid fa-bolt',
      title: t('features.instant.title'),
      description: t('features.instant.desc'),
      color: 'text-neon-green'
    },
    {
      icon: 'fa-regular fa-circle-xmark',
      title: t('features.cancel.title'),
      description: t('features.cancel.desc'),
      color: 'text-pink-500'
    }
  ];

  return (
    <section id="features" className="py-24 bg-dark-card relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('sections.features.title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('sections.features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-center group"
            >
              <div className={`w-14 h-14 mx-auto rounded-full bg-dark-bg flex items-center justify-center text-2xl mb-4 ${feature.color} group-hover:scale-110 transition-transform`}>
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;