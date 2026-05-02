'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Minus, ShoppingCart, MessageSquare, AlertTriangle } from 'lucide-react'
import { MenuItem, CartItem, MENU_ITEMS, CATEGORIES } from '@/lib/store'

interface MenuViewProps {
  customerName: string
  cart: CartItem[]
  onAddToCart: (item: MenuItem) => void
  onRemoveFromCart: (itemId: string) => void
  onCheckout: () => void
  onFeedback: () => void
}

export function MenuView({
  customerName,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onCheckout,
  onFeedback,
}: MenuViewProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredItems = activeCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === activeCategory)

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find(item => item.id === itemId)
    return cartItem?.quantity || 0
  }

  return (
    <div className="min-h-screen pb-32">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Ordering for</p>
              <h2 className="text-xl font-bold text-primary">{customerName}</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onFeedback}
              className="gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Feedback
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 py-6 space-y-4">
        {filteredItems.map((item) => {
          const quantity = getItemQuantity(item.id)
          const isSoldOut = item.stockStatus === 'sold-out'
          
          return (
            <Card
              key={item.id}
              className={`overflow-hidden transition-all duration-200 ${
                isSoldOut ? 'opacity-60' : 'hover:shadow-lg'
              }`}
            >
              <div className="flex">
                <div className="relative w-28 h-28 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className={`object-cover ${isSoldOut ? 'grayscale' : ''}`}
                  />
                  {item.stockStatus === 'limited' && (
                    <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Low Stock
                    </Badge>
                  )}
                  {isSoldOut && (
                    <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                      <span className="bg-foreground text-background px-3 py-1 rounded-full text-sm font-medium">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
                    
                    {!isSoldOut && (
                      <div className="flex items-center gap-2">
                        {quantity > 0 && (
                          <>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 rounded-full"
                              onClick={() => onRemoveFromCart(item.id)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-6 text-center font-semibold">{quantity}</span>
                          </>
                        )}
                        <Button
                          size="icon"
                          className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-transform active:scale-95"
                          onClick={() => onAddToCart(item)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Cart Footer */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg animate-in slide-in-from-bottom duration-300">
          <div className="max-w-lg mx-auto">
            <Button
              onClick={onCheckout}
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              View Cart ({cartCount}) - ${cartTotal.toFixed(2)}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
