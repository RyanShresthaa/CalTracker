import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle } from 'lucide-react'
import { authAPI } from '../lib/api'
import AuthLayout from '../components/layout/AuthLayout'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authAPI.forgotPassword(email)
      setSent(true)
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title={sent ? 'Check your email' : 'Forgot password?'}
      subtitle={sent ? undefined : 'Enter your email and we\'ll send a reset link.'}
      backTo={{ label: 'Back to login', href: '/login' }}
      heroTitle="CalTracker"
    >
      {sent ? (
        <div className="text-center py-4">
          <CheckCircle className="h-10 w-10 text-accent mx-auto mb-4" />
          <p className="text-muted text-sm mb-6">
            We sent a reset link to <span className="text-foreground font-medium">{email}</span>
          </p>
          <Button asChild>
            <Link to="/login">Back to login</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="pl-10"
                required
              />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full py-3">
            {loading ? <span className="inline-block w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : 'Send Reset Link'}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
