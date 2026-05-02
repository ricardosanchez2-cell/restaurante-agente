export type ServiceMode = 'pickup' | 'preorder' | 'dine-in'

export type StockStatus = 'available' | 'limited' | 'sold-out'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stockStatus: StockStatus
  stockCount?: number
  prepTime?: number
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface Order {
  customerName: string
  serviceMode: ServiceMode
  tableNumber?: string
  guestCount?: number
  items: CartItem[]
  total: number
  timestamp: Date
}

export interface Feedback {
  id: string
  customerName: string
  type: 'suggestion' | 'complaint'
  message: string
  priority?: 'low' | 'medium' | 'high'
  timestamp: Date
}

export const RESTAURANT_INFO = {
  name: "Gastro Kitchen",
  address: "123 Culinary Street, Food District",
  phone: "(555) 123-4567",
  prepTime: "15-25 min"
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Truffle Mushroom Risotto',
    description: 'Creamy arborio rice with wild mushrooms and truffle oil',
    price: 24.99,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
    stockStatus: 'available',
  },
  {
    id: '2',
    name: 'Grilled Atlantic Salmon',
    description: 'Fresh salmon with lemon herb butter and seasonal vegetables',
    price: 28.99,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    stockStatus: 'limited',
    stockCount: 3,
  },
  {
    id: '3',
    name: 'Classic Caesar Salad',
    description: 'Crisp romaine, parmesan, croutons, house-made dressing',
    price: 14.99,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop',
    stockStatus: 'available',
  },
  {
    id: '4',
    name: 'Wagyu Beef Burger',
    description: 'Premium wagyu patty with caramelized onions and truffle aioli',
    price: 32.99,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    stockStatus: 'sold-out',
  },
  {
    id: '5',
    name: 'Crispy Calamari',
    description: 'Tender squid rings with spicy marinara and lemon',
    price: 16.99,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    stockStatus: 'available',
  },
  {
    id: '6',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla gelato',
    price: 12.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
    stockStatus: 'limited',
    stockCount: 5,
  },
  {
    id: '7',
    name: 'Margherita Pizza',
    description: 'San Marzano tomatoes, fresh mozzarella, basil',
    price: 18.99,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    stockStatus: 'available',
  },
  {
    id: '8',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with espresso-soaked ladyfingers',
    price: 10.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    stockStatus: 'available',
  },
  {
    id: '9',
    name: 'Sparkling Water',
    description: 'San Pellegrino 500ml',
    price: 4.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop',
    stockStatus: 'available',
  },
  {
    id: '10',
    name: 'Fresh Lemonade',
    description: 'House-made with mint and honey',
    price: 5.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop',
    stockStatus: 'available',
  },
]

export const CATEGORIES = ['All', 'Starters', 'Mains', 'Desserts', 'Beverages']
