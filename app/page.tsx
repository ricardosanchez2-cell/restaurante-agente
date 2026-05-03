'use client'

import { useState, useEffect } from 'react'
import { WelcomeScreen } from '@/components/welcome-screen'
import { ServiceSelection } from '@/components/service-selection'
import { MenuView } from '@/components/menu-view'
import { CheckoutView } from '@/components/checkout-view'
import { FeedbackView } from '@/components/feedback-view'
import { ConfirmationView } from '@/components/confirmation-view'
import { MenuItem, CartItem, ServiceMode, Feedback } from '@/lib/store'

type AppStep = 'welcome' | 'service' | 'menu' | 'checkout' | 'feedback' | 'confirmation'

export default function RestaurantApp() {
  const [step, setStep] = useState<AppStep>('welcome')
  const [customerName, setCustomerName] = useState('')
  const [serviceMode, setServiceMode] = useState<ServiceMode | null>(null)
  const [tableNumber, setTableNumber] = useState<string | undefined>()
  const [guestCount, setGuestCount] = useState<number | undefined>()
  const [cart, setCart] = useState<CartItem[]>([])
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

  // Load saved customer name from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('customerName')
    if (savedName) {
      setCustomerName(savedName)
    }
    
    const savedFeedbacks = localStorage.getItem('feedbackHistory')
    if (savedFeedbacks) {
      setFeedbacks(JSON.parse(savedFeedbacks))
    }
  }, [])

  // Save customer name to localStorage
  const handleNameSubmit = (name: string) => {
    setCustomerName(name)
    localStorage.setItem('customerName', name)
    setStep('service')
  }

  // Handle service selection
  const handleServiceSelect = (mode: ServiceMode, table?: string, guests?: number) => {
    setServiceMode(mode)
    setTableNumber(table)
    setGuestCount(guests)
    setStep('menu')
  }

  // Add item to cart
  const handleAddToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item.id)
      if (existingItem) {
        return prevCart.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  // Remove item from cart
  const handleRemoveFromCart = (itemId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(i =>
          i.id === itemId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      }
      return prevCart.filter(i => i.id !== itemId)
    })
  }

  // Handle feedback submission
  const handleFeedbackSubmit = (feedback: Omit<Feedback, 'id' | 'timestamp'>) => {
    const newFeedback: Feedback = {
      ...feedback,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    
    const updatedFeedbacks = [...feedbacks, newFeedback]
    setFeedbacks(updatedFeedbacks)
    localStorage.setItem('feedbackHistory', JSON.stringify(updatedFeedbacks))
    
    // In a real app, this would be sent to an admin dashboard
    console.log('[v0] Feedback submitted:', newFeedback)
  }

  // Handle order confirmation
  const handleConfirmOrder = () => {
    // In a real app, this would send the order to a backend
    console.log('[v0] Order confirmed:', {
      customerName,
      serviceMode,
      tableNumber,
      guestCount,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.1,
      timestamp: new Date(),
    })
    setStep('confirmation')
  }

  // Start new order
  const handleNewOrder = () => {
    setCart([])
    setServiceMode(null)
    setTableNumber(undefined)
    setGuestCount(undefined)
    setStep('service')
  }

  // Render current step
  switch (step) {
    case 'welcome':
      return <WelcomeScreen onSubmit={handleNameSubmit} />
    
    case 'service':
      return (
        <ServiceSelection
          customerName={customerName}
          onSelect={handleServiceSelect}
          onBack={() => setStep('welcome')}
        />
      )
    
    case 'menu':
      return (
        <MenuView
          customerName={customerName}
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onCheckout={() => setStep('checkout')}
          onFeedback={() => setStep('feedback')}
        />
      )
    
    case 'checkout':
      return (
        <CheckoutView
          customerName={customerName}
          cart={cart}
          serviceMode={serviceMode!}
          tableNumber={tableNumber}
          guestCount={guestCount}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onBack={() => setStep('menu')}
          onConfirm={handleConfirmOrder}
        />
      )
    
    case 'feedback':
      return (
        <FeedbackView
          customerName={customerName}
          onSubmit={handleFeedbackSubmit}
          onBack={() => setStep('menu')}
        />
      )
    
    case 'confirmation':
      return (
        <ConfirmationView
          customerName={customerName}
          cart={cart}
          serviceMode={serviceMode!}
          tableNumber={tableNumber}
          onNewOrder={handleNewOrder}
        />
      )
    
    default:
      return <WelcomeScreen onSubmit={handleNameSubmit} />
  }
}
