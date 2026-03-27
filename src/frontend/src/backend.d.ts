import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    id: bigint;
    customerName: string;
    status: string;
    cakeType: string;
    customerPhone: string;
    flavor: string;
    owner: Principal;
    createdAt: bigint;
    size: string;
    deliveryDate: string;
    quantity: bigint;
    customerEmail: string;
    specialNotes: string;
}
export interface Product {
    id: bigint;
    featured: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: number;
}
export interface BusinessSettings {
    businessName: string;
    email: string;
    whatsappNumber: string;
    address: string;
    openingHours: string;
    phone: string;
    location: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(name: string, description: string, price: number, category: string, imageUrl: string, featured: boolean): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(id: bigint): Promise<boolean>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getMyOrders(): Promise<Array<Order>>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getSettings(): Promise<BusinessSettings>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(customerName: string, customerPhone: string, customerEmail: string, cakeType: string, size: string, flavor: string, quantity: bigint, deliveryDate: string, specialNotes: string): Promise<bigint>;
    updateOrderStatus(id: bigint, status: string): Promise<boolean>;
    updateProduct(id: bigint, name: string, description: string, price: number, category: string, imageUrl: string, featured: boolean): Promise<boolean>;
    updateSettings(businessName: string, location: string, address: string, phone: string, whatsappNumber: string, email: string, openingHours: string): Promise<void>;
}
