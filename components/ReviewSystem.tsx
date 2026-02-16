import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useServices } from '../contexts/ServiceContext';

interface ReviewSystemProps {
    serviceId: string;
    serviceName: string;
}

const StarRating: React.FC<{ rating: number; onRate?: (n: number) => void; size?: string }> = ({ rating, onRate, size = 'text-sm' }) => (
    <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
            <button
                key={star}
                type="button"
                onClick={() => onRate?.(star)}
                className={`${size} transition-all ${star <= rating ? 'text-yellow-400' : 'text-gray-600'} ${onRate ? 'cursor-pointer hover:scale-125' : 'cursor-default'}`}
            >
                <i className="fa-solid fa-star"></i>
            </button>
        ))}
    </div>
);

const ReviewSystem: React.FC<ReviewSystemProps> = ({ serviceId, serviceName }) => {
    const { user, isAuthenticated } = useAuth();
    const { reviews, addReview } = useServices();
    const [showForm, setShowForm] = useState(false);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState('');

    const serviceReviews = reviews.filter(r => r.serviceId === serviceId);
    const avgRating = serviceReviews.length > 0
        ? serviceReviews.reduce((sum, r) => sum + r.rating, 0) / serviceReviews.length
        : 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !newComment.trim()) return;

        addReview({
            id: Date.now().toString(),
            userId: user.id,
            userName: user.name,
            serviceId,
            rating: newRating,
            comment: newComment.trim(),
            date: new Date().toLocaleDateString('es-CO')
        });

        setNewComment('');
        setNewRating(5);
        setShowForm(false);
    };

    return (
        <div className="mt-4 pt-4 border-t border-white/5">
            {/* Summary */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <StarRating rating={Math.round(avgRating)} />
                    <span className="text-gray-400 text-[10px]">
                        ({serviceReviews.length} {serviceReviews.length === 1 ? 'reseña' : 'reseñas'})
                    </span>
                </div>
                {isAuthenticated && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="text-[10px] text-neon-blue hover:underline font-bold"
                    >
                        <i className="fa-solid fa-pen mr-1"></i>Opinar
                    </button>
                )}
            </div>

            {/* Add Review Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-black/40 rounded-xl p-3 mb-3 border border-white/5 space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 uppercase font-bold">Tu calificación:</span>
                        <StarRating rating={newRating} onRate={setNewRating} />
                    </div>
                    <textarea
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder={`¿Qué opinas de ${serviceName}?`}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white text-xs focus:border-neon-blue outline-none resize-none h-16"
                        required
                    />
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="flex-1 bg-neon-blue text-black text-[10px] font-bold py-1.5 rounded-lg hover:brightness-110 transition-all"
                        >
                            Publicar
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="flex-1 bg-white/5 text-gray-400 text-[10px] font-bold py-1.5 rounded-lg hover:bg-white/10 transition-all"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            {/* Reviews List */}
            {serviceReviews.length > 0 && (
                <div className="space-y-2 max-h-32 overflow-y-auto no-scrollbar">
                    {serviceReviews.slice(0, 3).map(review => (
                        <div key={review.id} className="bg-black/20 rounded-lg p-2 border border-white/5">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-[8px] text-white font-bold">
                                        {review.userName.charAt(0)}
                                    </div>
                                    <span className="text-[10px] font-bold text-white">{review.userName}</span>
                                </div>
                                <StarRating rating={review.rating} size="text-[8px]" />
                            </div>
                            <p className="text-[10px] text-gray-400 leading-relaxed">{review.comment}</p>
                            <p className="text-[8px] text-gray-600 mt-1">{review.date}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewSystem;
