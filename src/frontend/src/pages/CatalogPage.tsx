import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useProductsByCategory } from "../hooks/useQueries";
import type { Product } from "../types";

const CATEGORIES = ["All", "Birthday", "Wedding", "Custom", "Cupcakes"];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: BigInt(1),
    name: "Strawberry Dream Cake",
    description:
      "Layers of vanilla sponge with fresh strawberry cream and glazed berries",
    price: 1299,
    category: "Birthday",
    imageUrl: "/assets/generated/cake-birthday.dim_400x320.jpg",
    featured: true,
  },
  {
    id: BigInt(2),
    name: "Royal Wedding Tier",
    description:
      "Elegant three-tier fondant cake with hand-crafted sugar roses",
    price: 4999,
    category: "Wedding",
    imageUrl: "/assets/generated/cake-wedding.dim_400x320.jpg",
    featured: true,
  },
  {
    id: BigInt(3),
    name: "Chocolate Indulgence",
    description:
      "Rich chocolate drip cake with ganache, berries, and edible gold leaf",
    price: 1799,
    category: "Custom",
    imageUrl: "/assets/generated/cake-chocolate.dim_400x320.jpg",
    featured: true,
  },
  {
    id: BigInt(4),
    name: "Pastel Cupcake Bouquet",
    description: "12 assorted cupcakes in seasonal flavors, beautifully boxed",
    price: 849,
    category: "Cupcakes",
    imageUrl: "/assets/generated/cake-cupcakes.dim_400x320.jpg",
    featured: false,
  },
  {
    id: BigInt(5),
    name: "Watercolor Floral Cake",
    description:
      "Bespoke fondant art cake with watercolor-painted florals and gold accents",
    price: 3499,
    category: "Custom",
    imageUrl: "/assets/generated/cake-custom.dim_400x320.jpg",
    featured: true,
  },
  {
    id: BigInt(6),
    name: "Classic Birthday Surprise",
    description:
      "Rainbow-layered surprise cake with buttercream swirls and sprinkles",
    price: 999,
    category: "Birthday",
    imageUrl: "/assets/generated/cake-birthday.dim_400x320.jpg",
    featured: true,
  },
  {
    id: BigInt(7),
    name: "Blush Rose Wedding Cake",
    description:
      "Two-tier blush pink cake with fresh roses and gold leaf details",
    price: 3999,
    category: "Wedding",
    imageUrl: "/assets/generated/cake-wedding.dim_400x320.jpg",
    featured: false,
  },
  {
    id: BigInt(8),
    name: "Mini Cupcake Tower",
    description:
      "24 mini cupcakes in pastel colors on a beautiful tiered stand",
    price: 1499,
    category: "Cupcakes",
    imageUrl: "/assets/generated/cake-cupcakes.dim_400x320.jpg",
    featured: false,
  },
];

export function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: products, isLoading } = useProductsByCategory(selectedCategory);

  const displayProducts =
    products && products.length > 0
      ? products
      : selectedCategory === "All"
        ? SAMPLE_PRODUCTS
        : SAMPLE_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-mint py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl text-espresso mb-2"
          >
            Our Cake Collection
          </motion.h1>
          <p className="font-sans text-espresso/70">
            Handcrafted with love, baked to perfection
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40 bg-cream/95 backdrop-blur-sm border-b border-border py-3">
        <div
          className="max-w-7xl mx-auto px-4 flex flex-wrap gap-2"
          data-ocid="catalog.filter.tab"
        >
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-pill font-sans ${
                selectedCategory === cat
                  ? "bg-teal text-white"
                  : "bg-card text-espresso border border-border hover:bg-teal/10"
              }`}
              data-ocid={`catalog.${cat.toLowerCase()}.tab`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-ocid="catalog.loading_state"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-card rounded-lg shadow-card overflow-hidden"
              >
                <Skeleton className="h-52" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="text-center py-20" data-ocid="catalog.empty_state">
            <span className="text-6xl">🎂</span>
            <p className="font-sans text-espresso/70 mt-4">
              No cakes found in this category.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-ocid="catalog.list"
          >
            {displayProducts.map((product, i) => (
              <motion.div
                key={product.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                data-ocid={`catalog.item.${i + 1}`}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
