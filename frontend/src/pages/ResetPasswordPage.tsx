import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeSlash, CheckCircle } from 'phosphor-react';
import { authAPI } from '../lib/api';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { toast.error("Passwords don't match"); return; }
    if (password.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    setLoading(true);
    try {
      await authAPI.resetPassword({ token, password });
      setDone(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="card">
          {done ? (
            <div className="text-center py-4">
              <CheckCircle size={48} weight="fill" className="text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Password Reset!</h2>
              <p className="text-slate-500">Redirecting to login...</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Set new password</h2>
              <p className="text-slate-500 mb-6">Choose a strong password for your account.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">New Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type={showPw ? 'text' : 'password'} value={password}
                      onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters"
                      className="input pl-10 pr-10" required />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPw ? <EyeSlash size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="label">Confirm Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type={showPw ? 'text' : 'password'} value={confirm}
                      onChange={e => setConfirm(e.target.value)} placeholder="Repeat password"
                      className="input pl-10" required />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                  {loading ? <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Reset Password'}
                </button>
              </form>
              <p className="mt-4 text-center">
                <Link to="/login" className="text-indigo-600 text-sm hover:underline">Back to login</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
