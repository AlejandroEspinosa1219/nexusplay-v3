
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'login' }) => {
  const [view, setView] = useState<'login' | 'register' | 'forgot' | 'otp' | 'newpass'>(initialView);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', referralCode: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [displayedOTP, setDisplayedOTP] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { login, register, requestPasswordReset, verifyOTP, resetPassword } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (view === 'login') {
      const success = login(formData.email, formData.password);
      if (success) {
        onClose();
      } else {
        setError('Credenciales inválidas. Intenta de nuevo.');
      }
    } else if (view === 'register') {
      if (!formData.name) {
        setError('El nombre es requerido.');
        return;
      }
      const success = register(formData.name, formData.email, formData.password, formData.referralCode || undefined);
      if (success) {
        onClose();
      } else {
        setError('El correo ya está registrado.');
      }
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = requestPasswordReset(resetEmail);
    if (result.success && result.otp) {
      setDisplayedOTP(result.otp);
      setView('otp');
    } else {
      setError('No se encontró una cuenta con ese correo.');
    }
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (verifyOTP(resetEmail, otpCode)) {
      setView('newpass');
    } else {
      setError('Código incorrecto. Revisa e intenta de nuevo.');
    }
  };

  const handleNewPassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    if (resetPassword(resetEmail, otpCode, newPassword)) {
      setSuccess('¡Contraseña actualizada! Ahora puedes iniciar sesión.');
      setTimeout(() => {
        setView('login');
        setSuccess('');
        setDisplayedOTP('');
        setOtpCode('');
        setNewPassword('');
        setResetEmail('');
      }, 2000);
    } else {
      setError('Error al actualizar la contraseña.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-[#121218] w-full max-w-sm rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(188,19,254,0.2)] overflow-hidden flex flex-col p-8 animate-blob">

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-purple/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-black text-white italic tracking-tighter">
            NEXUS<span className="text-neon-blue">ID</span>
          </h2>
          <p className="text-gray-400 text-xs mt-2">
            {view === 'forgot' ? 'Recuperar contraseña' :
              view === 'otp' ? 'Verificación de código' :
                view === 'newpass' ? 'Nueva contraseña' :
                  'Accede a tus suscripciones'}
          </p>
        </div>

        {/* Tabs - only show for login/register */}
        {(view === 'login' || view === 'register') && (
          <div className="flex bg-black/50 rounded-xl p-1 mb-6 relative z-10">
            <button
              onClick={() => { setView('login'); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${view === 'login' ? 'bg-white/10 text-white shadow' : 'text-gray-500'}`}
            >
              ENTRAR
            </button>
            <button
              onClick={() => { setView('register'); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${view === 'register' ? 'bg-neon-purple text-white shadow-[0_0_10px_rgba(188,19,254,0.4)]' : 'text-gray-500'}`}
            >
              REGISTRO
            </button>
          </div>
        )}

        {/* Login / Register Form */}
        {(view === 'login' || view === 'register') && (
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {view === 'register' && (
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 ml-2">Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-neon-purple outline-none"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-2">Email</label>
              <input
                type="email"
                placeholder="usuario@ejemplo.com"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-neon-blue outline-none"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-2">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-neon-blue outline-none"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {/* Referral Code for Registration */}
            {view === 'register' && (
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 ml-2">
                  <i className="fa-solid fa-gift text-purple-400 mr-1"></i>Código de Referido (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: JUAN1234"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-neon-purple outline-none uppercase"
                  value={formData.referralCode}
                  onChange={e => setFormData({ ...formData, referralCode: e.target.value.toUpperCase() })}
                />
              </div>
            )}

            {error && <p className="text-red-500 text-xs text-center font-bold animate-pulse">{error}</p>}

            <Button type="submit" className="w-full mt-4">
              {view === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Button>

            {view === 'login' && (
              <button
                type="button"
                onClick={() => { setView('forgot'); setError(''); }}
                className="w-full text-center text-xs text-gray-500 hover:text-neon-blue transition-colors mt-2"
              >
                ¿Olvidaste tu contraseña?
              </button>
            )}
          </form>
        )}

        {/* Forgot Password - Step 1: Email */}
        {view === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="space-y-4 relative z-10">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-center">
              <i className="fa-solid fa-envelope text-yellow-400 text-xl mb-2"></i>
              <p className="text-xs text-yellow-200">Ingresa tu correo y te enviaremos un código de verificación.</p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-2">Tu Email</label>
              <input
                type="email"
                required
                placeholder="usuario@ejemplo.com"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-neon-blue outline-none"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-xs text-center font-bold animate-pulse">{error}</p>}
            <Button type="submit" className="w-full">Enviar Código</Button>
            <button type="button" onClick={() => setView('login')} className="w-full text-xs text-gray-500 hover:text-white text-center">← Volver al login</button>
          </form>
        )}

        {/* Forgot Password - Step 2: OTP */}
        {view === 'otp' && (
          <form onSubmit={handleOTPSubmit} className="space-y-4 relative z-10">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
              <i className="fa-solid fa-shield-halved text-green-400 text-2xl mb-2"></i>
              <p className="text-xs text-green-200 mb-2">Código de verificación enviado</p>
              <p className="text-[10px] text-gray-400">(Simulación — tu código es:)</p>
              <p className="text-3xl font-black text-white tracking-[0.3em] mt-2 font-mono">{displayedOTP}</p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-2">Ingresa el código</label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="000000"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-center text-xl font-mono tracking-[0.3em] focus:border-neon-green outline-none"
                value={otpCode}
                onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            {error && <p className="text-red-500 text-xs text-center font-bold animate-pulse">{error}</p>}
            <Button type="submit" className="w-full">Verificar</Button>
          </form>
        )}

        {/* Forgot Password - Step 3: New Password */}
        {view === 'newpass' && (
          <form onSubmit={handleNewPassSubmit} className="space-y-4 relative z-10">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
              <i className="fa-solid fa-lock-open text-blue-400 text-xl mb-2"></i>
              <p className="text-xs text-blue-200">¡Código verificado! Ingresa tu nueva contraseña.</p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-2">Nueva Contraseña</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-neon-blue outline-none"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-xs text-center font-bold animate-pulse">{error}</p>}
            {success && <p className="text-green-400 text-xs text-center font-bold">{success}</p>}
            <Button type="submit" className="w-full">Cambiar Contraseña</Button>
          </form>
        )}

        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
