import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useMyOrders } from "../hooks/useQueries";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-peach/60 text-espresso",
  confirmed: "bg-mint/60 text-espresso",
  baking: "bg-lavender/60 text-espresso",
  ready: "bg-teal/20 text-teal",
  delivered: "bg-secondary text-secondary-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

export function MyOrdersPage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { data: orders, isLoading } = useMyOrders();

  if (!identity) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-card rounded-2xl shadow-card p-10 max-w-sm text-center">
          <ShoppingBag className="h-12 w-12 text-teal mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-espresso mb-2">
            Sign In to View Orders
          </h2>
          <p className="font-sans text-espresso/70 mb-6">
            Please sign in to access your order history.
          </p>
          <Button
            onClick={() => login()}
            disabled={isLoggingIn}
            className="rounded-pill bg-teal text-white hover:bg-teal/90"
            data-ocid="my_orders.login_button"
          >
            {isLoggingIn ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl text-espresso mb-2"
        >
          My Orders
        </motion.h1>
        <p className="font-sans text-espresso/70 mb-8">
          Track your sweet deliveries
        </p>

        {isLoading ? (
          <div className="space-y-4" data-ocid="my_orders.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        ) : !orders || orders.length === 0 ? (
          <div
            className="bg-card rounded-2xl shadow-card p-12 text-center"
            data-ocid="my_orders.empty_state"
          >
            <span className="text-5xl">🎂</span>
            <p className="font-sans text-espresso/70 mt-4">
              No orders yet. Time to order your first cake!
            </p>
            <Button
              className="mt-4 rounded-pill bg-teal text-white"
              data-ocid="my_orders.order_now_button"
            >
              Order Now
            </Button>
          </div>
        ) : (
          <div className="space-y-4" data-ocid="my_orders.list">
            {orders.map((order, i) => (
              <motion.div
                key={order.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl shadow-card p-6"
                data-ocid={`my_orders.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-semibold text-espresso text-lg">
                      {order.cakeType} Cake — {order.flavor}
                    </h3>
                    <p className="font-sans text-sm text-espresso/70 mt-1">
                      Size: {order.size} · Qty: {order.quantity.toString()} ·
                      Delivery: {order.deliveryDate}
                    </p>
                    {order.specialNotes && (
                      <p className="font-sans text-sm text-espresso/60 mt-1 italic">
                        {order.specialNotes}
                      </p>
                    )}
                    <p className="font-sans text-xs text-espresso/40 mt-2">
                      Order #{order.id.toString()}
                    </p>
                  </div>
                  <Badge
                    className={`${STATUS_COLORS[order.status] || STATUS_COLORS.pending} capitalize font-sans text-xs`}
                  >
                    {order.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
