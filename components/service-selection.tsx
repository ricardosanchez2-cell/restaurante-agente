'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ShoppingBag, Clock, Users, MapPin, ArrowRight, ChevronLeft } from 'lucide-react'
import { ServiceMode, RESTAURANT_INFO } from '@/lib/store'

interface ServiceSelectionProps {
  customerName: string
  onSelect: (mode: ServiceMode, tableNumber?: string, guestCount?: number) => void
  onBack: () => void
}

export function ServiceSelection({ customerName, onSelect, onBack }: ServiceSelectionProps) {
  const [selectedMode, setSelectedMode] = useState<ServiceMode | null>(null)
  const [tableNumber, setTableNumber] = useState('')
  const [guestCount, setGuestCount] = useState('')

  useEffect(() => {
    const guests = parseInt(guestCount)
    if (!Number.isNaN(guests) && guests > 0) {
      const assignedTable = ((guests - 1) % 20) + 1
      setTableNumber(String(assignedTable))
    } else {
      setTableNumber('')
    }
  }, [guestCount])

  const handleContinue = () => {
    if (selectedMode === 'dine-in' || selectedMode === 'preorder') {
      if (guestCount) {
        onSelect(selectedMode, tableNumber, parseInt(guestCount))
      }
    } else if (selectedMode) {
      onSelect(selectedMode)
    }
  }

  const services = [
    {
      mode: 'pickup' as ServiceMode,
      icon: ShoppingBag,
      title: 'Pickup',
      description: `${RESTAURANT_INFO.address}`,
      badge: RESTAURANT_INFO.prepTime,
    },
    {
      mode: 'preorder' as ServiceMode,
      icon: Clock,
      title: 'Pre-order & Dine-in',
      description: 'Order now, ready on arrival',
      badge: 'Ready on arrival',
    },
    {
      mode: 'dine-in' as ServiceMode,
      icon: Users,
      title: 'At the Table',
      description: 'Order from your table',
      badge: 'Dine-in',
    },
  ]

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-lg mx-auto space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Nice to meet you, <span className="text-primary">{customerName}</span>!
          </h1>
          <p className="text-muted-foreground text-lg">
            Select your service:
          </p>
        </div>

        <div className="space-y-4">
          {services.map((service) => {
            const Icon = service.icon
            const isSelected = selectedMode === service.mode
            return (
              <Card
                key={service.mode}
                onClick={() => setSelectedMode(service.mode)}
                className={`p-5 cursor-pointer transition-all duration-200 border-2 ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-border hover:border-primary/50 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-primary' : 'bg-secondary'
                  }`}>
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg text-foreground">{service.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {service.badge}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1">
                      {service.mode === 'pickup' && <MapPin className="w-4 h-4" />}
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {(selectedMode === 'dine-in' || selectedMode === 'preorder') && (
          <div className="space-y-4 p-5 bg-card border border-border rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
            <h3 className="font-semibold text-foreground">Table Details</h3>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Number of Guests</label>
              <Input
                type="number"
                placeholder="e.g., 2"
                min="1"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="h-12 bg-background"
              />
            </div>
            {tableNumber && (
              <div className="rounded-xl border border-border p-4 bg-secondary/50">
                <p className="text-sm text-muted-foreground">Assigned table</p>
                <p className="text-lg font-semibold">Table {tableNumber}</p>
              </div>
            )}
          </div>
        )}

        <Button
          onClick={handleContinue}
          disabled={
            !selectedMode ||
            ((selectedMode === 'dine-in' || selectedMode === 'preorder') && !guestCount)
          }
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50"
        >
          Continue to Menu
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
