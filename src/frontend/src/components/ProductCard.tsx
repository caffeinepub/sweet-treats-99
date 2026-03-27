import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import type { Product } from "../types";

const CATEGORY_GRADIENTS: Record<string, string> = {
  Birthday: "from-dusty-rose/40 to-peach/40",
  Wedding: "from-lavender/40 to-pale-mint/40",
  Custom: "from-mint/40 to-lavender/40",
  Cupcakes: "from-peach/40 to-cream/60",
  Default: "from-cream/60 to-mint/40",
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const gradient =
    CATEGORY_GRADIENTS[product.category] || CATEGORY_GRADIENTS.Default;

  return (
    <div className="group bg-card rounded-lg shadow-card overflow-hidden hover:shadow-float transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}
          >
            <span className="text-5xl">🎂</span>
          </div>
        )}
        {product.featured && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-teal text-white text-xs">Featured</Badge>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="text-xs font-sans">
            {product.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif font-semibold text-espresso text-lg mb-1 leading-tight">
          {product.name}
        </h3>
        <p className="font-sans text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-serif font-bold text-teal text-lg">
            ₹{product.price.toLocaleString()}
          </span>
          <Link to="/order">
            <Button
              size="sm"
              className="rounded-pill bg-teal text-white hover:bg-teal/90 font-sans"
              data-ocid="product.order_button"
            >
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
