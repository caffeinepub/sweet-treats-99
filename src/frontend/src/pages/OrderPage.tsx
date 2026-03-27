import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { usePlaceOrder } from "../hooks/useQueries";

export function OrderPage() {
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    cakeType: "",
    size: "",
    flavor: "",
    quantity: 1,
    deliveryDate: "",
    specialNotes: "",
  });
  const [orderId, setOrderId] = useState<string | null>(null);
  const { mutateAsync: placeOrder, isPending } = usePlaceOrder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const id = await placeOrder(form);
      setOrderId(id.toString());
      toast.success("Order placed successfully!");
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (orderId) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl shadow-float p-10 max-w-md text-center"
          data-ocid="order.success_state"
        >
          <CheckCircle className="h-16 w-16 text-teal mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-espresso mb-2">
            Order Confirmed! 🎉
          </h2>
          <p className="font-sans text-espresso/70 mb-4">
            Your order has been placed successfully.
          </p>
          <div className="bg-mint/50 rounded-lg p-4 mb-6">
            <p className="font-sans text-sm text-espresso">
              Order ID: <span className="font-bold">#{orderId}</span>
            </p>
          </div>
          <p className="font-sans text-sm text-espresso/60 mb-6">
            We'll contact you on WhatsApp to confirm the details and arrange
            delivery.
          </p>
          <Button
            onClick={() => setOrderId(null)}
            className="rounded-pill bg-teal text-white hover:bg-teal/90"
            data-ocid="order.new_order_button"
          >
            Place Another Order
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-4xl text-espresso mb-2 text-center">
            Order Your Cake
          </h1>
          <p className="font-sans text-espresso/70 text-center mb-8">
            Fill in the details and we'll bake your dream cake!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl shadow-card p-8 space-y-6"
          data-ocid="order.form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="font-sans text-sm">Full Name *</Label>
              <Input
                required
                value={form.customerName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, customerName: e.target.value }))
                }
                placeholder="Your full name"
                className="font-sans"
                data-ocid="order.name_input"
              />
            </div>
            <div className="space-y-1">
              <Label className="font-sans text-sm">Phone Number *</Label>
              <Input
                required
                value={form.customerPhone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, customerPhone: e.target.value }))
                }
                placeholder="+91 98765 43210"
                className="font-sans"
                data-ocid="order.phone_input"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="font-sans text-sm">Email Address</Label>
            <Input
              type="email"
              value={form.customerEmail}
              onChange={(e) =>
                setForm((p) => ({ ...p, customerEmail: e.target.value }))
              }
              placeholder="your@email.com"
              className="font-sans"
              data-ocid="order.email_input"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label className="font-sans text-sm">Cake Type *</Label>
              <Select
                required
                onValueChange={(v) => setForm((p) => ({ ...p, cakeType: v }))}
              >
                <SelectTrigger
                  className="font-sans"
                  data-ocid="order.cake_type_select"
                >
                  <SelectValue placeholder="Choose type" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Birthday",
                    "Wedding",
                    "Custom",
                    "Cupcakes",
                    "Anniversary",
                    "Baby Shower",
                  ].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="font-sans text-sm">Size *</Label>
              <Select
                required
                onValueChange={(v) => setForm((p) => ({ ...p, size: v }))}
              >
                <SelectTrigger
                  className="font-sans"
                  data-ocid="order.size_select"
                >
                  <SelectValue placeholder="Pick size" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Small (500g)",
                    "Medium (1kg)",
                    "Large (2kg)",
                    "Extra Large (3kg)",
                    "Custom",
                  ].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="font-sans text-sm">Flavor *</Label>
              <Select
                required
                onValueChange={(v) => setForm((p) => ({ ...p, flavor: v }))}
              >
                <SelectTrigger
                  className="font-sans"
                  data-ocid="order.flavor_select"
                >
                  <SelectValue placeholder="Flavor" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Vanilla",
                    "Chocolate",
                    "Strawberry",
                    "Red Velvet",
                    "Lemon",
                    "Butterscotch",
                    "Black Forest",
                  ].map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="font-sans text-sm">Quantity *</Label>
              <Input
                type="number"
                min={1}
                max={100}
                required
                value={form.quantity}
                onChange={(e) =>
                  setForm((p) => ({ ...p, quantity: Number(e.target.value) }))
                }
                className="font-sans"
                data-ocid="order.quantity_input"
              />
            </div>
            <div className="space-y-1">
              <Label className="font-sans text-sm">Delivery Date *</Label>
              <Input
                type="date"
                required
                value={form.deliveryDate}
                onChange={(e) =>
                  setForm((p) => ({ ...p, deliveryDate: e.target.value }))
                }
                className="font-sans"
                data-ocid="order.delivery_date_input"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="font-sans text-sm">
              Special Notes / Customization
            </Label>
            <Textarea
              rows={4}
              value={form.specialNotes}
              onChange={(e) =>
                setForm((p) => ({ ...p, specialNotes: e.target.value }))
              }
              placeholder="Write any special message, design preferences, allergies or customization requests..."
              className="font-sans"
              data-ocid="order.notes_textarea"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full rounded-pill bg-teal text-white hover:bg-teal/90 py-3 font-sans text-base"
            data-ocid="order.submit_button"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Placing
                Order...
              </>
            ) : (
              "Place My Order 🎂"
            )}
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
