import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { useAuthStore } from '../store/authStore'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Label } from '../components/ui/label'

export default function Profile() {
  const { user } = useAuthStore()
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <Card>
        <CardContent className="pt-6 flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-2xl">{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">{user?.firstName} {user?.lastName}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
          <CardHeader><CardTitle>Account Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label className="text-muted-foreground">First Name</Label>
                    <p className="font-medium">{user?.firstName}</p>
                </div>
                <div className="space-y-1">
                    <Label className="text-muted-foreground">Last Name</Label>
                    <p className="font-medium">{user?.lastName}</p>
                </div>
                <div className="space-y-1 col-span-2">
                    <Label className="text-muted-foreground">Email Address</Label>
                    <p className="font-medium">{user?.email}</p>
                </div>
            </div>
          </CardContent>
      </Card>
    </div>
  )
}
