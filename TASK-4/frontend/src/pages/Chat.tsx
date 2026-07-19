import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Send, User as UserIcon, Bot, Copy, CheckCircle2, RotateCcw } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from 'framer-motion'

export default function Chat() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const queryClient = useQueryClient()
  const endOfMessagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: messages = [], isLoading } = useQuery({
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

  useEffect(() => {
    if (!id) {
        inputRef.current?.focus()
    }
  }, [id])

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

  const handleCopy = (text: string, msgId: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(msgId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scrollbar-hide pb-32">
        {messages.length === 0 && !mutation.isPending && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-6 animate-fade-in">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shadow-lg shadow-primary/20">
                    <Bot size={40} />
                </div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">How can I help you today?</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mt-8">
                    {['Explain quantum computing', 'Write a React hook for local storage', 'Plan a 3-day trip to Tokyo', 'Debug this Python script'].map((prompt, i) => (
                        <div key={i} onClick={() => { setInput(prompt); inputRef.current?.focus(); }} className="p-4 border border-border/50 bg-card/30 hover:bg-card rounded-xl cursor-pointer transition-colors text-sm text-center shadow-sm">
                            {prompt}
                        </div>
                    ))}
                </div>
            </div>
        )}
        
        <AnimatePresence initial={false}>
          {messages.map((msg: any) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex gap-4 max-w-4xl mx-auto w-full group ${msg.role === 'USER' ? 'flex-row-reverse' : ''}`}
            >
              <div className="flex-shrink-0 mt-1">
                {msg.role === 'USER' ? 
                  <div className="w-9 h-9 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center text-primary shadow-sm"><UserIcon size={18}/></div> : 
                  <div className="w-9 h-9 bg-card border border-border/50 rounded-full flex items-center justify-center text-primary shadow-sm"><Bot size={18}/></div>}
              </div>
              
              <div className={`relative p-5 rounded-2xl max-w-[85%] ${msg.role === 'USER' ? 'bg-primary text-primary-foreground rounded-tr-sm shadow-md shadow-primary/10' : 'bg-card border border-border/50 rounded-tl-sm shadow-sm'}`}>
                <div className={`prose max-w-none text-sm break-words leading-relaxed ${msg.role === 'USER' ? 'prose-invert text-white' : 'dark:prose-invert prose-p:leading-relaxed prose-pre:bg-background/80 prose-pre:border prose-pre:border-border/50 prose-pre:rounded-xl'}`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                
                {msg.role === 'ASSISTANT' && (
                  <div className="absolute -bottom-10 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 pt-2">
                      <button onClick={() => handleCopy(msg.content, msg.id)} className="p-1.5 hover:bg-accent rounded-md text-muted-foreground transition-colors flex items-center gap-1.5 text-xs font-medium">
                          {copiedId === msg.id ? <CheckCircle2 size={14} className="text-success" /> : <Copy size={14} />}
                          {copiedId === msg.id ? 'Copied!' : 'Copy'}
                      </button>
                      <button className="p-1.5 hover:bg-accent rounded-md text-muted-foreground transition-colors flex items-center gap-1.5 text-xs font-medium">
                          <RotateCcw size={14} />
                          Regenerate
                      </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {mutation.isPending && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 max-w-4xl mx-auto w-full">
               <div className="flex-shrink-0 mt-1">
                 <div className="w-9 h-9 bg-card border border-border/50 rounded-full flex items-center justify-center text-primary shadow-sm animate-pulse"><Bot size={18}/></div>
               </div>
               <div className="p-5 bg-card border border-border/50 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2 h-14">
                 <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                 <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
               </div>
             </motion.div>
          )}
        </AnimatePresence>
        <div ref={endOfMessagesRef} className="h-20" />
      </div>
      
      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent pb-6 pt-10">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-center">
          <Input 
            ref={inputRef}
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Spark AI..." 
            className="w-full pl-6 pr-14 py-7 rounded-2xl bg-card border-border/50 shadow-lg focus-visible:ring-primary/50 text-base"
            disabled={mutation.isPending}
            autoFocus
          />
          <Button 
            type="submit" 
            size="icon" 
            className={`absolute right-3 rounded-xl h-10 w-10 transition-all ${input.trim() ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90' : 'bg-muted text-muted-foreground'}`}
            disabled={!input.trim() || mutation.isPending}
          >
            <Send size={18} className={input.trim() ? '' : 'opacity-50'} />
          </Button>
        </form>
        <p className="text-center text-xs text-muted-foreground mt-3">Spark AI can make mistakes. Check important info.</p>
      </div>
    </div>
  )
}
