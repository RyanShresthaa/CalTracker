import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeSlash, FirstAid, Envelope, Lock, User } from 'phosphor-react';
import { authAPI } from '../lib/api';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await authAPI.register({ name: data.name, email: data.email, password: data.password });
      setToken(res.data.token);
      setUser(res.data.user);
      toast.success('Account created! Let\'s set up your profile.');
      navigate('/complete-profile');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-500 via-teal-500 to-indigo-600 flex-col justify-center items-center p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white"
              style={{ width: Math.random()*150+50, height: Math.random()*150+50,
                top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, opacity: 0.1 }} />
          ))}
        </div>
        <div className="relative z-10 text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-6">
            <FirstAid size={40} weight="bold" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Start Your Journey</h1>
          <p className="text-xl text-white/80 mb-8">Join thousands tracking their health goals</p>
          <div className="space-y-3">
            {[
              { icon: '🎯', text: 'Set personalized calorie & macro goals' },
              { icon: '📊', text: 'Beautiful charts to visualize progress' },
              { icon: '🍎', text: 'Database with 200+ foods including Nepali cuisine' },
              { icon: '💪', text: 'Track workouts and calories burned' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3 bg-white/10 rounded-xl p-3 text-left">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-900">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <FirstAid size={18} weight="bold" className="text-white" />
            </div>
            <span className="font-bold text-xl gradient-text">CalorieTracker</span>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create account</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">It's free and takes less than a minute</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...register('name')} type="text" placeholder="John Doe" className="input pl-10" />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Envelope size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...register('email')} type="email" placeholder="you@example.com" className="input pl-10" />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...register('password')} type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters" className="input pl-10 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="label">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...register('confirmPassword')} type={showPassword ? 'text' : 'password'}
                  placeholder="Repeat password" className="input pl-10" />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-2">
              {isLoading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
