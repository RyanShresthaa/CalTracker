import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeSlash, FirstAid, Envelope, Lock } from 'phosphor-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex-col justify-center items-center p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white"
              style={{ width: Math.random()*200+50, height: Math.random()*200+50,
                top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, opacity: 0.1 }} />
          ))}
        </div>
        <div className="relative z-10 text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-6">
            <FirstAid size={40} weight="bold" />
          </div>
          <h1 className="text-4xl font-bold mb-4">CalorieTracker</h1>
          <p className="text-xl text-white/80 mb-8">Your personal health & fitness companion</p>
          <div className="grid grid-cols-2 gap-4 text-left">
            {['Track calories & macros', 'Log workouts & activities', 'Monitor water intake', 'Visual progress charts'].map(f => (
              <div key={f} className="bg-white/10 rounded-xl p-3 text-sm">{f}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-900">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <FirstAid size={18} weight="bold" className="text-white" />
            </div>
            <span className="font-bold text-xl gradient-text">CalorieTracker</span>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome back</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Sign in to continue your journey</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Envelope size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...register('email')} type="email" placeholder="you@example.com"
                  className="input pl-10" />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="label mb-0">Password</label>
                <Link to="/forgot-password" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...register('password')} type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••" className="input pl-10 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Sign up free
            </Link>
          </p>

          <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
            <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-1">Demo Credentials</p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400">Email: demo@calorietracker.com</p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400">Password: demo123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}
