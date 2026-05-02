'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ChevronLeft, Lightbulb, AlertTriangle, Send, Check, Flag } from 'lucide-react'
import { Feedback } from '@/lib/store'

interface FeedbackViewProps {
  customerName: string
  onSubmit: (feedback: Omit<Feedback, 'id' | 'timestamp'>) => void
  onBack: () => void
}

export function FeedbackView({ customerName, onSubmit, onBack }: FeedbackViewProps) {
  const [type, setType] = useState<'suggestion' | 'complaint' | null>(null)
  const [message, setMessage] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    if (type && message.trim()) {
      onSubmit({
        customerName,
        type,
        message: message.trim(),
        priority: type === 'complaint' ? priority : undefined,
      })
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-success rounded-full flex items-center justify-center animate-in zoom-in duration-300">
            <Check className="w-10 h-10 text-success-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Thank You!</h2>
            <p className="text-muted-foreground">
              Your {type === 'suggestion' ? 'suggestion' : 'feedback'} has been submitted. We appreciate your input!
            </p>
          </div>
          <Button
            onClick={onBack}
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
          >
            Back to Menu
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-lg mx-auto space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Menu</span>
        </button>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Feedback & Suggestions</h1>
          <p className="text-muted-foreground">
            We value your input, <span className="text-primary font-medium">{customerName}</span>!
          </p>
        </div>

        {/* Feedback Type Selection */}
        <div className="grid grid-cols-2 gap-4">
          <Card
            onClick={() => setType('suggestion')}
            className={`p-5 cursor-pointer transition-all duration-200 border-2 text-center ${
              type === 'suggestion'
                ? 'border-success bg-success/5 shadow-lg'
                : 'border-border hover:border-success/50 hover:shadow-md'
            }`}
          >
            <div className={`mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
              type === 'suggestion' ? 'bg-success' : 'bg-secondary'
            }`}>
              <Lightbulb className={`w-6 h-6 ${type === 'suggestion' ? 'text-success-foreground' : 'text-foreground'}`} />
            </div>
            <h3 className="font-semibold text-foreground">Suggestion</h3>
            <p className="text-xs text-muted-foreground mt-1">Ideas & recommendations</p>
          </Card>

          <Card
            onClick={() => setType('complaint')}
            className={`p-5 cursor-pointer transition-all duration-200 border-2 text-center ${
              type === 'complaint'
                ? 'border-destructive bg-destructive/5 shadow-lg'
                : 'border-border hover:border-destructive/50 hover:shadow-md'
            }`}
          >
            <div className={`mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
              type === 'complaint' ? 'bg-destructive' : 'bg-secondary'
            }`}>
              <AlertTriangle className={`w-6 h-6 ${type === 'complaint' ? 'text-destructive-foreground' : 'text-foreground'}`} />
            </div>
            <h3 className="font-semibold text-foreground">Report Issue</h3>
            <p className="text-xs text-muted-foreground mt-1">Problems & complaints</p>
          </Card>
        </div>

        {type && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Priority Selection for Complaints */}
            {type === 'complaint' && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  Priority Level
                </label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium capitalize transition-all ${
                        priority === p
                          ? p === 'high'
                            ? 'bg-destructive text-destructive-foreground'
                            : p === 'medium'
                            ? 'bg-warning text-warning-foreground'
                            : 'bg-secondary text-secondary-foreground'
                          : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                {type === 'suggestion' ? 'Share your idea' : 'Describe the issue'}
              </label>
              <Textarea
                placeholder={
                  type === 'suggestion'
                    ? 'e.g., It would be great if you could add vegan options...'
                    : 'e.g., My food arrived cold, or a specific item was missing...'
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[150px] bg-card resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!message.trim()}
              className={`w-full h-14 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 ${
                type === 'suggestion'
                  ? 'bg-success hover:bg-success/90 text-success-foreground'
                  : 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
              }`}
            >
              <Send className="w-5 h-5 mr-2" />
              Submit {type === 'suggestion' ? 'Suggestion' : 'Report'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
