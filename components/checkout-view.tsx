'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Minus, Trash2, ChevronLeft, ShoppingBag, Clock, Users, Check } from 'lucide-react'
import { CartItem, ServiceMode, RESTAURANT_INFO } from '@/lib/store'

interface CheckoutViewProps {
  customerName: string
  cart: CartItem[]
  serviceMode: ServiceMode
  tableNumber?: string
  guestCount?: number
  onAddToCart: (item: CartItem) => void
  onRemoveFromCart: (itemId: string) => void
  onBack: () => void
  onConfirm: () => void
}

export function CheckoutView({
  customerName,
  cart,
  serviceMode,
  tableNumber,
  guestCount,
  onAddToCart,
  onRemoveFromCart,
  onBack,
  onConfirm,
}: CheckoutViewProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const getServiceInfo = () => {
    switch (serviceMode) {
      case 'pickup':
        return {
          icon: ShoppingBag,
          title: 'Pickup',
          detail: RESTAURANT_INFO.address,
        }
      case 'preorder':
        return {
          icon: Clock,
          title: 'Pre-order & Dine-in',
          detail: 'Ready on arrival',
        }
      case 'dine-in':
        return {
          icon: Users,
          title: `Table ${tableNumber}`,
          detail: `${guestCount} guests`,
        }
    }
  }

  const serviceInfo = getServiceInfo()
  const ServiceIcon = serviceInfo.icon

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Your Order</h1>
            <p className="text-sm text-muted-foreground">Review and confirm</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Service Mode Card */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <ServiceIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{serviceInfo.title}</h3>
              <p className="text-sm text-muted-foreground">{serviceInfo.detail}</p>
            </div>
          </div>
        </Card>

        {/* Order Items */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Items ({cart.length})</h3>
          {cart.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      {item.quantity === 1 ? (
                        <Trash2 className="w-4 h-4 text-destructive" />
                      ) : (
                        <Minus className="w-4 h-4" />
                      )}
                    </Button>
                    <span className="w-6 text-center font-semibold">{item.quantity}</span>
                    <Button
                      size="icon"
                      className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => onAddToCart(item)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="w-20 text-right font-semibold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <Card className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (10%)</span>
              <span className="text-foreground">${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between text-lg font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
        <div className="max-w-lg mx-auto">
          <Button
            onClick={onConfirm}
            className="w-full h-14 text-lg font-semibold bg-success hover:bg-success/90 text-success-foreground rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            <Check className="w-5 h-5 mr-2" />
            Confirm Order - ${total.toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  )
}
