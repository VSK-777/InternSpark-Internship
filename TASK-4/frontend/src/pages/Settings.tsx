import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { LogOut, AlertTriangle, Monitor, Globe } from 'lucide-react'

export default function Settings() {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your app preferences and manage your account.</p>
      </div>

      <Card className="bg-card/60 backdrop-blur-xl border-border/50 shadow-sm">
        <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
                <Monitor size={20} className="text-primary" />
                Appearance
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
                <Label className="text-base font-medium">Theme</Label>
                <p className="text-sm text-muted-foreground">Customize the UI theme.</p>
            </div>
            <div className="px-4 py-2 bg-background/50 rounded-xl border border-border/50 text-sm font-medium">
                Premium Dark (Enforced)
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border/50 pt-6">
            <div className="space-y-1 flex items-center gap-2">
                <div>
                    <Label className="text-base font-medium flex items-center gap-2">
                        Language
                    </Label>
                    <p className="text-sm text-muted-foreground">Select your preferred language.</p>
                </div>
            </div>
            <div className="px-4 py-2 bg-background/50 rounded-xl border border-border/50 text-sm font-medium flex items-center gap-2">
                <Globe size={16} />
                English (US)
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/30 bg-destructive/5 backdrop-blur-xl shadow-sm">
        <CardHeader className="border-b border-destructive/20 pb-4">
            <CardTitle className="text-xl text-destructive flex items-center gap-2">
                <AlertTriangle size={20} />
                Danger Zone
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div className="space-y-1">
                <Label className="text-base font-medium">Sign Out</Label>
                <p className="text-sm text-muted-foreground">Sign out of your account on this device.</p>
             </div>
             <Button variant="outline" className="border-border/50 hover:bg-accent h-10 px-6 rounded-xl transition-colors w-full sm:w-auto flex items-center gap-2" onClick={handleLogout}>
                 <LogOut size={16} />
                 Logout
             </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-destructive/20 pt-6 gap-4">
             <div className="space-y-1">
                <Label className="text-base font-medium text-destructive">Delete Account</Label>
                <p className="text-sm text-muted-foreground">Permanently delete your data and account.</p>
             </div>
             <Button variant="destructive" className="h-10 px-6 rounded-xl transition-all shadow-md shadow-destructive/20 hover:shadow-lg w-full sm:w-auto">
                 Delete Account
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
