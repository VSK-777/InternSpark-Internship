import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { useAuthStore } from '../store/authStore'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Label } from '../components/ui/label'
import { User as UserIcon } from 'lucide-react'

export default function Profile() {
  const { user } = useAuthStore()
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>
      
      <Card className="bg-card/60 backdrop-blur-xl border-border/50 shadow-sm overflow-hidden">
        <CardContent className="p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <Avatar className="h-28 w-28 border-4 border-background shadow-xl">
            <AvatarFallback className="text-3xl bg-primary text-primary-foreground font-semibold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2 text-center sm:text-left mt-2">
            <h2 className="text-3xl font-bold tracking-tight">{user?.firstName} {user?.lastName}</h2>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
              <UserIcon size={16} />
              <p>{user?.email}</p>
            </div>
            <div className="pt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
               <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold tracking-wide uppercase">Pro Member</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card/60 backdrop-blur-xl border-border/50 shadow-sm">
          <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="text-xl">Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">First Name</Label>
                    <p className="font-medium text-lg px-4 py-3 bg-background/50 rounded-xl border border-border/50">{user?.firstName}</p>
                </div>
                <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Last Name</Label>
                    <p className="font-medium text-lg px-4 py-3 bg-background/50 rounded-xl border border-border/50">{user?.lastName}</p>
                </div>
                <div className="space-y-2 col-span-1 sm:col-span-2">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Email Address</Label>
                    <p className="font-medium text-lg px-4 py-3 bg-background/50 rounded-xl border border-border/50">{user?.email}</p>
                </div>
            </div>
          </CardContent>
      </Card>
    </div>
  )
}
