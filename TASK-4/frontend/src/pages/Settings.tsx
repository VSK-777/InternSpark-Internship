import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Theme</Label>
            <div className="text-sm text-muted-foreground">Dark (System default)</div>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <Label>Language</Label>
            <div className="text-sm text-muted-foreground">English (US)</div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader><CardTitle className="text-destructive">Danger Zone</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
             <div className="space-y-1">
                <Label>Sign Out</Label>
                <p className="text-sm text-muted-foreground">Sign out of your account on this device.</p>
             </div>
             <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
             <div className="space-y-1">
                <Label className="text-destructive">Delete Account</Label>
                <p className="text-sm text-muted-foreground">Permanently delete your data.</p>
             </div>
             <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
