import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { MessageSquare, Settings, User as UserIcon, LogOut } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'

export default function MainLayout() {
  const { token, logout, user } = useAuthStore()
  const navigate = useNavigate()

  const { data: conversations } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const res = await api.get('/api/conversations')
      return res.data
    },
    enabled: !!token
  })

  if (!token) {
    return <Navigate to="/login" replace />
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <aside className="w-64 bg-card border-r flex flex-col hidden md:flex">
        <div className="p-4 font-bold text-xl flex items-center gap-2">
          <MessageSquare className="text-primary" />
          <span>AI Chatbot</span>
        </div>
        <div className="p-4">
          <Link to="/" className="w-full">
            <button className="w-full bg-primary text-primary-foreground rounded-md py-2 px-4 font-medium flex justify-center items-center gap-2 hover:bg-primary/90 transition">
              + New Chat
            </button>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
           {conversations?.map((conv: any) => (
             <Link key={conv.id} to={`/chat/${conv.id}`} className="block p-2 rounded-md hover:bg-accent text-sm truncate">
               {conv.title}
             </Link>
           ))}
        </div>
        <div className="p-4 border-t space-y-2">
          <Link to="/profile" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer text-sm">
            <UserIcon size={18}/>
            {user?.firstName} {user?.lastName}
          </Link>
          <Link to="/settings" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer text-sm">
            <Settings size={18}/>
            Settings
          </Link>
          <div onClick={handleLogout} className="flex items-center gap-2 p-2 hover:bg-destructive hover:text-destructive-foreground rounded-md cursor-pointer text-sm text-muted-foreground transition">
            <LogOut size={18}/>
            Logout
          </div>
        </div>
      </aside>
      <main className="flex-1 relative bg-background">
        <Outlet />
      </main>
    </div>
  )
}
