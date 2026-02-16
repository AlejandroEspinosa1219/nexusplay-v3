import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useServices } from '../contexts/ServiceContext';

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  const { testimonials, isAdmin, updateTestimonial, deleteTestimonial, addTestimonial } = useServices();

  return (
    <section className="py-24 bg-dark-bg relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-neon-purple/5 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{t('sections.testimonials.title')}</h2>
            <p className="text-gray-400">{t('sections.testimonials.subtitle')}</p>
          </div>
          
          <div className="flex gap-4 mt-4 md:mt-0 items-center">
             {isAdmin && (
                <button 
                  onClick={addTestimonial}
                  className="bg-neon-blue text-black px-4 py-2 rounded-lg font-bold hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <i className="fa-solid fa-plus"></i> Nueva Reseña
                </button>
             )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-dark-surface p-8 rounded-2xl border border-white/5 hover:border-neon-blue/30 transition-all duration-300 relative group"
            >
              {isAdmin && (
                <button 
                  onClick={() => deleteTestimonial(testimonial.id)}
                  className="absolute top-2 right-2 bg-red-600/80 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-700 z-50"
                >
                  <i className="fa-solid fa-trash text-[10px]"></i>
                </button>
              )}

              <div className="absolute -top-4 -left-2 text-6xl text-gray-800 font-serif opacity-50">"</div>
              
              <div className="flex items-center gap-1 mb-6 text-yellow-500 text-sm cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i 
                    key={star} 
                    onClick={() => isAdmin && updateTestimonial(testimonial.id, 'rating', star)}
                    className={`fa-solid fa-star ${star <= testimonial.rating ? '' : 'text-gray-600'} ${isAdmin ? 'hover:scale-125 transition-transform' : ''}`}
                  ></i>
                ))}
              </div>

              {isAdmin ? (
                <textarea
                  value={testimonial.quote}
                  onChange={(e) => updateTestimonial(testimonial.id, 'quote', e.target.value)}
                  className="w-full bg-black/50 text-gray-300 text-sm p-2 rounded border border-white/10 mb-6 focus:border-neon-blue outline-none"
                  rows={3}
                />
              ) : (
                <p className="text-gray-300 mb-6 italic relative z-10 min-h-[4.5rem]">
                  {testimonial.quote}
                </p>
              )}

              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-neon-blue/20" 
                  />
                  {isAdmin && (
                     <div className="absolute -bottom-2 -right-2">
                       <button 
                        onClick={() => {
                          const url = prompt('URL de la foto (ej: https://...):', testimonial.avatar);
                          if(url) updateTestimonial(testimonial.id, 'avatar', url);
                        }}
                        className="bg-gray-700 text-white text-[10px] p-1 rounded-full"
                       >
                         <i className="fa-solid fa-pen"></i>
                       </button>
                     </div>
                  )}
                </div>
                
                <div className="flex-1">
                  {isAdmin ? (
                    <input 
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(testimonial.id, 'name', e.target.value)}
                      className="bg-transparent text-white font-bold text-sm w-full border-b border-gray-700 mb-1 focus:border-neon-blue outline-none"
                    />
                  ) : (
                    <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                  )}
                  
                  {isAdmin ? (
                     <input 
                      value={testimonial.role}
                      onChange={(e) => updateTestimonial(testimonial.id, 'role', e.target.value)}
                      className="bg-transparent text-gray-500 text-xs w-full border-b border-gray-700 focus:border-neon-blue outline-none"
                    />
                  ) : (
                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
