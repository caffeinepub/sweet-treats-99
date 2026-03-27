import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Lock, Pencil, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddProduct,
  useAllOrders,
  useDeleteProduct,
  useIsAdmin,
  useProducts,
  useSettings,
  useUpdateOrderStatus,
  useUpdateProduct,
  useUpdateSettings,
} from "../hooks/useQueries";
import type { BusinessSettings, Product } from "../types";

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "baking",
  "ready",
  "delivered",
  "cancelled",
];
const STATUS_COLORS: Record<string, string> = {
  pending: "bg-peach/60 text-espresso",
  confirmed: "bg-mint/60 text-espresso",
  baking: "bg-lavender/60 text-espresso",
  ready: "bg-teal/20 text-teal",
  delivered: "bg-secondary text-secondary-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

const EMPTY_PRODUCT = {
  name: "",
  description: "",
  price: 0,
  category: "Birthday",
  imageUrl: "",
  featured: false,
};

function ProductForm({
  initial,
  onSubmit,
  isPending,
}: {
  initial: typeof EMPTY_PRODUCT;
  onSubmit: (data: typeof EMPTY_PRODUCT) => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState(initial);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1 col-span-2">
          <Label className="font-sans text-sm">Product Name</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="e.g. Strawberry Dream Cake"
            data-ocid="admin.product_name_input"
          />
        </div>
        <div className="space-y-1">
          <Label className="font-sans text-sm">Price (₹)</Label>
          <Input
            type="number"
            min={0}
            value={form.price}
            onChange={(e) =>
              setForm((p) => ({ ...p, price: Number(e.target.value) }))
            }
            data-ocid="admin.product_price_input"
          />
        </div>
        <div className="space-y-1">
          <Label className="font-sans text-sm">Category</Label>
          <Select
            value={form.category}
            onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
          >
            <SelectTrigger data-ocid="admin.product_category_select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Birthday", "Wedding", "Custom", "Cupcakes"].map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1">
        <Label className="font-sans text-sm">Description</Label>
        <Textarea
          rows={3}
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
          placeholder="Describe this delicious cake..."
          data-ocid="admin.product_description_textarea"
        />
      </div>
      <div className="space-y-1">
        <Label className="font-sans text-sm">Image URL</Label>
        <Input
          value={form.imageUrl}
          onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
          placeholder="https://..."
          data-ocid="admin.product_image_input"
        />
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Preview"
            className="mt-2 h-24 w-full object-cover rounded-lg"
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={form.featured}
          onCheckedChange={(v) => setForm((p) => ({ ...p, featured: v }))}
          data-ocid="admin.product_featured_switch"
        />
        <Label className="font-sans text-sm">Featured product</Label>
      </div>
      <Button
        onClick={() => onSubmit(form)}
        disabled={isPending || !form.name}
        className="w-full rounded-pill bg-teal text-white hover:bg-teal/90"
        data-ocid="admin.product_save_button"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {isPending ? "Saving..." : "Save Product"}
      </Button>
    </div>
  );
}

function ProductsTab() {
  const { data: products, isLoading } = useProducts();
  const { mutateAsync: addProduct, isPending: isAdding } = useAddProduct();
  const { mutateAsync: updateProduct, isPending: isUpdating } =
    useUpdateProduct();
  const { mutateAsync: deleteProduct, isPending: isDeleting } =
    useDeleteProduct();
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const handleAdd = async (data: typeof EMPTY_PRODUCT) => {
    try {
      await addProduct(data);
      toast.success("Product added!");
      setAddOpen(false);
    } catch {
      toast.error("Failed to add product");
    }
  };

  const handleUpdate = async (data: typeof EMPTY_PRODUCT) => {
    if (!editProduct) return;
    try {
      await updateProduct({ id: editProduct.id, ...data });
      toast.success("Product updated!");
      setEditProduct(null);
    } catch {
      toast.error("Failed to update product");
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted!");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-xl text-espresso">Products</h2>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="rounded-pill bg-teal text-white"
              data-ocid="admin.add_product_button"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="admin.add_product_dialog">
            <DialogHeader>
              <DialogTitle className="font-serif">Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm
              initial={EMPTY_PRODUCT}
              onSubmit={handleAdd}
              isPending={isAdding}
            />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-2" data-ocid="admin.products_loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      ) : (
        <div
          className="overflow-x-auto rounded-xl border border-border"
          data-ocid="admin.products_table"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-cream">
                <TableHead className="font-serif">Product</TableHead>
                <TableHead className="font-serif">Category</TableHead>
                <TableHead className="font-serif">Price</TableHead>
                <TableHead className="font-serif">Featured</TableHead>
                <TableHead className="font-serif">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!products || products.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-espresso/50 font-sans"
                    data-ocid="admin.products_empty_state"
                  >
                    No products yet. Add your first cake!
                  </TableCell>
                </TableRow>
              ) : (
                products.map((p, i) => (
                  <TableRow
                    key={p.id.toString()}
                    data-ocid={`admin.products.row.${i + 1}`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {p.imageUrl && (
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-8 h-8 rounded object-cover"
                          />
                        )}
                        <span className="font-sans text-sm font-medium">
                          {p.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-sans text-xs">
                        {p.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-sans text-sm">
                      ₹{p.price.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          p.featured
                            ? "bg-teal/20 text-teal"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {p.featured ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog
                          open={editProduct?.id === p.id}
                          onOpenChange={(o) => !o && setEditProduct(null)}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditProduct(p)}
                              data-ocid={`admin.products.edit_button.${i + 1}`}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent data-ocid="admin.edit_product_dialog">
                            <DialogHeader>
                              <DialogTitle className="font-serif">
                                Edit Product
                              </DialogTitle>
                            </DialogHeader>
                            <ProductForm
                              initial={{
                                name: p.name,
                                description: p.description,
                                price: p.price,
                                category: p.category,
                                imageUrl: p.imageUrl,
                                featured: p.featured,
                              }}
                              onSubmit={handleUpdate}
                              isPending={isUpdating}
                            />
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(p.id)}
                          disabled={isDeleting}
                          className="text-destructive hover:text-destructive"
                          data-ocid={`admin.products.delete_button.${i + 1}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function OrdersTab() {
  const { data: orders, isLoading } = useAllOrders();
  const { mutateAsync: updateStatus, isPending } = useUpdateOrderStatus();

  const handleStatusChange = async (id: bigint, status: string) => {
    try {
      await updateStatus({ id, status });
      toast.success("Status updated!");
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-xl text-espresso">All Orders</h2>
      {isLoading ? (
        <div className="space-y-2" data-ocid="admin.orders_loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      ) : !orders || orders.length === 0 ? (
        <div
          className="text-center py-12 text-espresso/50 font-sans"
          data-ocid="admin.orders_empty_state"
        >
          No orders yet.
        </div>
      ) : (
        <div className="space-y-3" data-ocid="admin.orders_list">
          {orders.map((order, i) => (
            <div
              key={order.id.toString()}
              className="bg-card rounded-xl border border-border p-4"
              data-ocid={`admin.orders.item.${i + 1}`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-serif font-semibold text-espresso">
                    #{order.id.toString()} — {order.customerName}
                  </h3>
                  <p className="font-sans text-sm text-espresso/70 mt-1">
                    {order.cakeType} · {order.flavor} · {order.size} · Qty:{" "}
                    {order.quantity.toString()}
                  </p>
                  <p className="font-sans text-sm text-espresso/60">
                    📞 {order.customerPhone} · 📅 {order.deliveryDate}
                  </p>
                  {order.specialNotes && (
                    <p className="font-sans text-xs text-espresso/50 italic mt-1">
                      {order.specialNotes}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${STATUS_COLORS[order.status] || ""} capitalize font-sans text-xs`}
                  >
                    {order.status}
                  </Badge>
                  <Select
                    value={order.status}
                    onValueChange={(v) => handleStatusChange(order.id, v)}
                    disabled={isPending}
                  >
                    <SelectTrigger
                      className="w-36 text-xs"
                      data-ocid={`admin.orders.status_select.${i + 1}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ORDER_STATUSES.map((s) => (
                        <SelectItem key={s} value={s} className="capitalize">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SettingsTab() {
  const { data: settings, isLoading } = useSettings();
  const { mutateAsync: updateSettings, isPending } = useUpdateSettings();
  const [form, setForm] = useState<BusinessSettings | null>(null);

  const currentForm: BusinessSettings = form ||
    settings || {
      businessName: "Sweet Treats 99",
      location: "",
      address: "",
      phone: "",
      whatsappNumber: "",
      email: "",
      openingHours: "",
    };

  const handleSave = async () => {
    try {
      await updateSettings(currentForm);
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-12" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-lg">
      <h2 className="font-serif text-xl text-espresso">Business Settings</h2>
      {(
        [
          {
            key: "businessName",
            label: "Business Name",
            placeholder: "Sweet Treats 99",
          },
          {
            key: "location",
            label: "City / Region",
            placeholder: "Mumbai, Maharashtra",
          },
          {
            key: "address",
            label: "Full Address",
            placeholder: "123 Baker Street, Bandra West...",
          },
          {
            key: "phone",
            label: "Phone Number",
            placeholder: "+91 98765 43210",
          },
          {
            key: "whatsappNumber",
            label: "WhatsApp Number (digits only)",
            placeholder: "919876543210",
          },
          {
            key: "email",
            label: "Email Address",
            placeholder: "hello@sweettreats99.com",
          },
          {
            key: "openingHours",
            label: "Opening Hours",
            placeholder: "Mon–Sat: 9am–8pm, Sun: 10am–6pm",
          },
        ] as {
          key: keyof BusinessSettings;
          label: string;
          placeholder: string;
        }[]
      ).map(({ key, label, placeholder }) => (
        <div key={key} className="space-y-1">
          <Label className="font-sans text-sm">{label}</Label>
          <Input
            value={currentForm[key]}
            onChange={(e) =>
              setForm((prev) => ({
                ...(prev || currentForm),
                [key]: e.target.value,
              }))
            }
            placeholder={placeholder}
            className="font-sans"
            data-ocid={`admin.settings_${key}_input`}
          />
        </div>
      ))}
      <Button
        onClick={handleSave}
        disabled={isPending}
        className="rounded-pill bg-teal text-white hover:bg-teal/90 w-full"
        data-ocid="admin.settings_save_button"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {isPending ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  );
}

export function AdminPage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();

  if (!identity) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl shadow-float p-10 max-w-sm text-center"
        >
          <Lock className="h-12 w-12 text-teal mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-espresso mb-2">
            Admin Access
          </h2>
          <p className="font-sans text-espresso/70 mb-6">
            Sign in to access the admin panel.
          </p>
          <Button
            onClick={() => login()}
            disabled={isLoggingIn}
            className="rounded-pill bg-teal text-white hover:bg-teal/90 w-full"
            data-ocid="admin.login_button"
          >
            {isLoggingIn ? "Signing in..." : "Sign In"}
          </Button>
        </motion.div>
      </div>
    );
  }

  if (checkingAdmin) {
    return (
      <div
        className="min-h-screen bg-cream flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="h-8 w-8 animate-spin text-teal" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div
          className="bg-card rounded-2xl shadow-card p-10 max-w-sm text-center"
          data-ocid="admin.error_state"
        >
          <span className="text-5xl">🚫</span>
          <h2 className="font-serif text-2xl text-espresso mt-4 mb-2">
            Access Denied
          </h2>
          <p className="font-sans text-espresso/70">
            You don't have admin privileges.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl text-espresso">Admin Panel</h1>
          <p className="font-sans text-espresso/70">
            Manage your bakery — products, orders, and settings
          </p>
        </motion.div>

        <Tabs defaultValue="products" data-ocid="admin.panel">
          <TabsList className="mb-6 bg-card border border-border">
            <TabsTrigger
              value="products"
              className="font-sans"
              data-ocid="admin.products_tab"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="font-sans"
              data-ocid="admin.orders_tab"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="font-sans"
              data-ocid="admin.settings_tab"
            >
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="products"
            className="bg-card rounded-xl shadow-card p-6"
          >
            <ProductsTab />
          </TabsContent>
          <TabsContent
            value="orders"
            className="bg-card rounded-xl shadow-card p-6"
          >
            <OrdersTab />
          </TabsContent>
          <TabsContent
            value="settings"
            className="bg-card rounded-xl shadow-card p-6"
          >
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
