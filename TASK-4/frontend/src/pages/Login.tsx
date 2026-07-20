import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { api } from '../services/api'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { Bot, Loader2 } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const res = await api.post('/api/auth/login', { email, password })
      const { token, refreshToken, id, firstName, lastName } = res.data
      setAuth(token, refreshToken, { id, email, firstName, lastName })
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background relative overflow-hidden p-4">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
      
      <div className="w-full max-w-md z-10 animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="bg-card border border-border/50 p-3 rounded-2xl shadow-xl shadow-primary/10 flex items-center justify-center">
             <Bot size={40} className="text-primary" />
          </div>
        </div>
        
        <Card className="w-full bg-card/60 backdrop-blur-xl border-border/50 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="space-y-3 pb-6 pt-8 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-foreground">Welcome back</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Log in to your Spark AI account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-muted-foreground font-medium text-xs uppercase tracking-wider">Email address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  autoComplete="email"
                  placeholder="name@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="bg-background/50 border-border/50 h-12 rounded-xl focus-visible:ring-primary/50"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-muted-foreground font-medium text-xs uppercase tracking-wider">Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="bg-background/50 border-border/50 h-12 rounded-xl focus-visible:ring-primary/50"
                  disabled={isLoading}
                />
              </div>
              
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
                  <p className="text-xs font-medium text-destructive text-center">{error}</p>
                </div>
              )}
              
              <Button className="w-full h-12 rounded-xl text-base font-semibold shadow-md shadow-primary/20 hover:shadow-lg transition-all active:scale-[0.98]" type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center text-sm pb-8 border-t border-border/50 pt-6 mt-2 bg-background/30">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-medium hover:underline transition-all">Sign up</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
