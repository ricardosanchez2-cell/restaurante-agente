'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, ChefHat, Clock, PartyPopper } from 'lucide-react'
import { CartItem, ServiceMode } from '@/lib/store'
import confetti from 'canvas-confetti'

interface ConfirmationViewProps {
  customerName: string
  cart: CartItem[]
  serviceMode: ServiceMode
  tableNumber?: string
  onNewOrder: () => void
}

export function ConfirmationView({
  customerName,
  cart,
  serviceMode,
  tableNumber,
  onNewOrder,
}: ConfirmationViewProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.1

  useEffect(() => {
    setShowConfetti(true)
    
    // Fire confetti
    const duration = 2000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F97316', '#22C55E', '#F59E0B'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F97316', '#22C55E', '#F59E0B'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    
    frame()
  }, [])

  const getMessage = () => {
    switch (serviceMode) {
      case 'pickup':
        return "We'll notify you when it's ready for pickup!"
      case 'preorder':
        return "Your order will be ready when you arrive!"
      case 'dine-in':
        return `Your order is being prepared for Table ${tableNumber}!`
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Success Animation */}
        <div className="relative">
          <div className="mx-auto w-24 h-24 bg-success rounded-full flex items-center justify-center animate-in zoom-in duration-500">
            <Check className="w-12 h-12 text-success-foreground" />
          </div>
          <div className="absolute -top-2 -right-2 animate-bounce">
            <PartyPopper className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground">
            Thank you, <span className="text-primary">{customerName}</span>!
          </h1>
          <p className="text-lg text-muted-foreground">
            {"We're preparing your order."}
          </p>
        </div>

        {/* Order Status Card */}
        <Card className="p-6 space-y-4 text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center animate-pulse">
              <ChefHat className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Order Confirmed</h3>
              <p className="text-sm text-muted-foreground">{getMessage()}</p>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Estimated time: 15-25 minutes</span>
            </div>
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <h4 className="text-sm font-medium text-foreground">Order Summary</h4>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold pt-2 border-t border-border">
              <span className="text-foreground">Total (incl. tax)</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <Button
          onClick={onNewOrder}
          variant="outline"
          className="w-full h-14 text-lg font-semibold rounded-xl border-2 hover:bg-secondary"
        >
          Start New Order
        </Button>
      </div>
    </div>
  )
}
