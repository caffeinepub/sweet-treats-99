export interface Product {
  id: bigint;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  featured: boolean;
}

export interface Order {
  id: bigint;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  cakeType: string;
  size: string;
  flavor: string;
  quantity: bigint;
  deliveryDate: string;
  specialNotes: string;
  status: string;
  createdAt: bigint;
  owner: unknown;
}

export interface BusinessSettings {
  businessName: string;
  location: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  openingHours: string;
}
