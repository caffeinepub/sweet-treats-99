import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BusinessSettings, Order, Product } from "../types";
import { useActor } from "./useActor";

export function useProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getFeaturedProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return (actor as any).getProducts();
      return (actor as any).getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<Order[]>({
    queryKey: ["orders", "mine"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getMyOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<Order[]>({
    queryKey: ["orders", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSettings() {
  const { actor, isFetching } = useActor();
  return useQuery<BusinessSettings>({
    queryKey: ["settings"],
    queryFn: async () => {
      if (!actor) {
        return {
          businessName: "Sweet Treats 99",
          location: "Mumbai, Maharashtra",
          address: "123 Baker Street, Bandra West, Mumbai - 400050",
          phone: "+91 98765 43210",
          whatsappNumber: "919876543210",
          email: "hello@sweettreats99.com",
          openingHours: "Mon–Sat: 9am–8pm, Sun: 10am–6pm",
        };
      }
      return (actor as any).getSettings();
    },
    enabled: !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return (actor as any).isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      customerName: string;
      customerPhone: string;
      customerEmail: string;
      cakeType: string;
      size: string;
      flavor: string;
      quantity: number;
      deliveryDate: string;
      specialNotes: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).placeOrder(
        data.customerName,
        data.customerPhone,
        data.customerEmail,
        data.cakeType,
        data.size,
        data.flavor,
        BigInt(data.quantity),
        data.deliveryDate,
        data.specialNotes,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      price: number;
      category: string;
      imageUrl: string;
      featured: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).addProduct(
        data.name,
        data.description,
        data.price,
        data.category,
        data.imageUrl,
        data.featured,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name: string;
      description: string;
      price: number;
      category: string;
      imageUrl: string;
      featured: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).updateProduct(
        data.id,
        data.name,
        data.description,
        data.price,
        data.category,
        data.imageUrl,
        data.featured,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: string }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).updateOrderStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useUpdateSettings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: BusinessSettings) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).updateSettings(
        data.businessName,
        data.location,
        data.address,
        data.phone,
        data.whatsappNumber,
        data.email,
        data.openingHours,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
}
