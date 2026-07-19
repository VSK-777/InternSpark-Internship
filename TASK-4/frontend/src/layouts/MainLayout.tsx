import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { MessageSquare, Settings, User as UserIcon, LogOut, Plus, PanelLeft, Bot } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { useState } from 'react'

export default function MainLayout() {
  const { token, logout, user } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setSidebarOpen] = useState(false)

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
    <div className="flex h-[100dvh] bg-background text-foreground overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-card border-r border-border/50 flex flex-col transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-5 font-semibold text-lg flex items-center justify-between border-b border-border/50">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Bot className="text-primary" size={24} />
            </div>
            <span className="tracking-tight text-foreground font-bold">Spark AI</span>
          </Link>
          <button className="md:hidden text-muted-foreground" onClick={() => setSidebarOpen(false)}>
            <PanelLeft size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <Link to="/">
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3 px-4 font-medium flex justify-between items-center transition-all shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/40 active:scale-[0.98]">
              <span>New Chat</span>
              <Plus size={18} />
            </button>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto px-3 space-y-1 scrollbar-hide py-2">
           <div className="px-3 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent</div>
           {conversations?.map((conv: any) => {
             const isActive = location.pathname === `/chat/${conv.id}`
             return (
               <Link 
                  key={conv.id} 
                  to={`/chat/${conv.id}`} 
                  onClick={() => setSidebarOpen(false)}
                  className={`block p-3 rounded-xl text-sm truncate transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'}`}
               >
                 <div className="flex items-center gap-3">
                   <MessageSquare size={16} className={isActive ? 'text-primary' : 'text-muted-foreground'} />
                   <span className="truncate">{conv.title || 'New Conversation'}</span>
                 </div>
               </Link>
             )
           })}
        </div>
        
        <div className="p-4 border-t border-border/50 bg-card/50 space-y-1">
          <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-accent rounded-xl cursor-pointer text-sm font-medium transition-colors">
            <div className="bg-muted p-1.5 rounded-full"><UserIcon size={16} /></div>
            <span className="truncate flex-1">{user?.firstName} {user?.lastName}</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 p-3 hover:bg-accent rounded-xl cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Settings size={18}/>
            Settings
          </Link>
          <div onClick={handleLogout} className="flex items-center gap-3 p-3 hover:bg-destructive/10 hover:text-destructive rounded-xl cursor-pointer text-sm text-muted-foreground transition-colors">
            <LogOut size={18}/>
            Logout
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative bg-background flex flex-col min-w-0">
        <header className="md:hidden h-14 border-b border-border/50 flex items-center px-4 bg-background/80 backdrop-blur-md sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="text-muted-foreground hover:text-foreground">
            <PanelLeft size={24} />
          </button>
          <span className="ml-4 font-bold tracking-tight">Spark AI</span>
        </header>
        <div className="flex-1 relative overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
