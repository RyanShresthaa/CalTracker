import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeSlash, Envelope, Lock } from 'phosphor-react';
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
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex bg-bg">
      <div className="hidden lg:flex lg:w-1/2 border-r border-border flex-col justify-center p-12">
        <div className="max-w-sm">
          <div className="w-10 h-10 bg-accent flex items-center justify-center mb-8">
            <span className="font-mono text-sm font-bold text-on-accent">CT</span>
          </div>
          <h1 className="font-mono text-3xl font-light tracking-wider text-text-primary uppercase mb-4">
            CalTracker
          </h1>
          <p className="text-muted text-sm leading-relaxed mb-8">
            Track calories, macros, water, and activity. No noise.
          </p>
          <ul className="space-y-3">
            {['Calorie & macro tracking', 'Food log with USDA search', 'Activity & weight logs', 'Weekly progress charts'].map(f => (
              <li key={f} className="flex items-center gap-3 text-sm text-muted">
                <span className="w-1 h-1 bg-accent shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-accent flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-on-accent">CT</span>
            </div>
            <span className="font-mono text-sm tracking-wider uppercase">CalTracker</span>
          </div>

          <h2 className="font-mono text-2xl font-light tracking-wider text-text-primary uppercase mb-2">Sign in</h2>
          <p className="text-muted text-sm mb-8">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Envelope size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input {...register('email')} type="email" placeholder="you@example.com"
                  className="input pl-10" />
              </div>
              {errors.email && <p className="text-coral text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="label mb-0">Password</label>
                <Link to="/forgot-password" className="text-xs text-accent hover:brightness-110">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input {...register('password')} type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••" className="input pl-10 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-text-primary">
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-coral text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-on-accent/30 border-t-on-accent rounded-full animate-spin" />
              ) : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            No account?{' '}
            <Link to="/register" className="text-accent hover:brightness-110">
              Register
            </Link>
          </p>

          <div className="mt-6 p-4 border border-border bg-surface">
            <p className="label-caps mb-2">Demo credentials</p>
            <p className="text-xs text-muted font-mono">demo@calorietracker.com</p>
            <p className="text-xs text-muted font-mono">demo123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}
