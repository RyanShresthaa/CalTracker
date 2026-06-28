import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Envelope, ArrowLeft, CheckCircle } from 'phosphor-react';
import { authAPI } from '../lib/api';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setSent(true);
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-8 transition-colors">
          <ArrowLeft size={18} /> Back to login
        </Link>

        <div className="card">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} weight="fill" className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Check your email</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                We sent a reset link to <strong>{email}</strong>
              </p>
              <Link to="/login" className="btn-primary inline-block">Back to login</Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Forgot password?</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">Email</label>
                  <div className="relative">
                    <Envelope size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com" className="input pl-10" required />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                  {loading ? <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
