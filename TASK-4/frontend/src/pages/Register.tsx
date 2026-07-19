import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { Bot, Loader2 } from 'lucide-react'

export default function Register() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }
    setIsLoading(true)
    try {
      await api.post('/api/auth/register', formData)
      setSuccess('Account created successfully! Redirecting...')
      setTimeout(() => navigate('/login'), 2000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background relative overflow-hidden p-4">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
      
      <div className="w-full max-w-md z-10 animate-fade-in my-8">
        <div className="flex justify-center mb-8">
          <div className="bg-card border border-border/50 p-3 rounded-2xl shadow-xl shadow-primary/10 flex items-center justify-center">
             <Bot size={40} className="text-primary" />
          </div>
        </div>
        
        <Card className="w-full bg-card/60 backdrop-blur-xl border-border/50 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="space-y-3 pb-6 pt-8 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-foreground">Create an account</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Enter your details to get started with Spark AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-muted-foreground font-medium text-xs uppercase tracking-wider">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={formData.firstName} 
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                    required 
                    className="bg-background/50 border-border/50 h-12 rounded-xl focus-visible:ring-primary/50"
                    disabled={isLoading || !!success}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-muted-foreground font-medium text-xs uppercase tracking-wider">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={formData.lastName} 
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                    required 
                    className="bg-background/50 border-border/50 h-12 rounded-xl focus-visible:ring-primary/50"
                    disabled={isLoading || !!success}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-muted-foreground font-medium text-xs uppercase tracking-wider">Email address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  required 
                  className="bg-background/50 border-border/50 h-12 rounded-xl focus-visible:ring-primary/50"
                  disabled={isLoading || !!success}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-muted-foreground font-medium text-xs uppercase tracking-wider">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  required 
                  minLength={6}
                  className="bg-background/50 border-border/50 h-12 rounded-xl focus-visible:ring-primary/50"
                  disabled={isLoading || !!success}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-muted-foreground font-medium text-xs uppercase tracking-wider">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="••••••••"
                  value={formData.confirmPassword} 
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                  required 
                  minLength={6}
                  className="bg-background/50 border-border/50 h-12 rounded-xl focus-visible:ring-primary/50"
                  disabled={isLoading || !!success}
                />
              </div>
              
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
                  <p className="text-xs font-medium text-destructive text-center">{error}</p>
                </div>
              )}
              {success && (
                <div className="p-3 bg-success/10 border border-success/20 rounded-xl">
                  <p className="text-xs font-medium text-success text-center">{success}</p>
                </div>
              )}
              
              <Button className="w-full h-12 rounded-xl text-base font-semibold shadow-md shadow-primary/20 hover:shadow-lg transition-all active:scale-[0.98]" type="submit" disabled={isLoading || !!success}>
                {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center text-sm pb-8 border-t border-border/50 pt-6 mt-2 bg-background/30">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline transition-all">Sign in</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
