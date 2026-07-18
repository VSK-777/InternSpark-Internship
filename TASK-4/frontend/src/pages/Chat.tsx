import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Send, User as UserIcon, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from 'framer-motion'

export default function Chat() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const queryClient = useQueryClient()
  const endOfMessagesRef = useRef<HTMLDivElement>(null)

  const { data: messages = [] } = useQuery({
    queryKey: ['messages', id],
    queryFn: async () => {
      if (!id) return []
      const res = await api.get(`/api/messages/${id}`)
      return res.data
    },
    enabled: !!id
  })

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await api.post('/api/messages', { content, conversationId: id ? parseInt(id) : null })
      return res.data
    },
    onSuccess: (data) => {
      if (!id) {
        queryClient.invalidateQueries({ queryKey: ['conversations'] })
        navigate(`/chat/${data.conversationId}`)
      } else {
        queryClient.invalidateQueries({ queryKey: ['messages', id] })
      }
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || mutation.isPending) return
    mutation.mutate(input)
    setInput('')
  }

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.length === 0 && !mutation.isPending && (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                <Bot size={48} className="text-muted-foreground/50"/>
                <p className="text-lg">How can I help you today?</p>
            </div>
        )}
        <AnimatePresence>
          {messages.map((msg: any) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex gap-4 max-w-3xl mx-auto ${msg.role === 'USER' ? 'flex-row-reverse' : ''}`}
            >
              <div className="flex-shrink-0">
                {msg.role === 'USER' ? 
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground"><UserIcon size={16}/></div> : 
                  <div className="w-8 h-8 bg-secondary border rounded-full flex items-center justify-center text-secondary-foreground"><Bot size={16}/></div>}
              </div>
              <div className={`p-4 rounded-2xl ${msg.role === 'USER' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-card border rounded-tl-none'} shadow-sm`}>
                <div className="prose dark:prose-invert max-w-none text-sm break-words">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
          {mutation.isPending && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 max-w-3xl mx-auto">
               <div className="flex-shrink-0">
                 <div className="w-8 h-8 bg-secondary border rounded-full flex items-center justify-center text-secondary-foreground"><Bot size={16}/></div>
               </div>
               <div className="p-4 bg-card border rounded-2xl rounded-tl-none flex items-center gap-2">
                 <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                 <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
               </div>
             </motion.div>
          )}
        </AnimatePresence>
        <div ref={endOfMessagesRef} />
      </div>
      
      <div className="p-4 border-t bg-background/80 backdrop-blur-sm sticky bottom-0">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative flex items-center">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..." 
            className="w-full pr-12 py-6 rounded-full bg-card shadow-sm border-muted"
            disabled={mutation.isPending}
            autoFocus
          />
          <Button 
            type="submit" 
            size="icon" 
            className="absolute right-2 rounded-full" 
            disabled={!input.trim() || mutation.isPending}
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  )
}
