import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CakeAnimation3D } from "../components/CakeAnimation3D";
import { ProductCard } from "../components/ProductCard";
import { useFeaturedProducts } from "../hooks/useQueries";

const SAMPLE_PRODUCTS = [
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
];

const RECENT_CREATIONS = [
  {
    id: 1,
    name: "Ombre Sunset Cake",
    img: "/assets/generated/cake-custom.dim_400x320.jpg",
  },
  {
    id: 2,
    name: "Garden Party Tier",
    img: "/assets/generated/cake-wedding.dim_400x320.jpg",
  },
  {
    id: 3,
    name: "Choco Berry Blast",
    img: "/assets/generated/cake-chocolate.dim_400x320.jpg",
  },
];

const STATS = [
  { icon: "🎂", label: "500+", desc: "Cakes baked" },
  { icon: "⭐", label: "4.9", desc: "Star rating" },
  { icon: "❤️", label: "300+", desc: "Happy clients" },
];

export function HomePage() {
  const { data: featured, isLoading } = useFeaturedProducts();
  const products = featured && featured.length > 0 ? featured : SAMPLE_PRODUCTS;

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "520px" }}
      >
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1" style={{ backgroundColor: "#C7A0A0" }} />
          <div className="flex-1" style={{ backgroundColor: "#CDE0D9" }} />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center pt-16 pb-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/80 backdrop-blur-sm px-8 py-3 rounded-pill shadow-card mb-6 border border-white/60"
          >
            <h1 className="font-serif text-2xl md:text-4xl text-espresso text-center tracking-tight">
              Indulge in sweetness
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-sans text-espresso/80 text-center mb-8 max-w-md"
          >
            Freshly Baked Happiness Delivered — every cake a masterpiece
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="animate-float-up"
          >
            <img
              src="/assets/generated/hero-cake.dim_600x500.jpg"
              alt="Beautiful bakery cake"
              className="w-72 md:w-96 rounded-2xl shadow-float object-cover"
              style={{ maxHeight: "320px" }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex gap-4"
          >
            <Link to="/order">
              <Button
                className="rounded-pill bg-teal text-white hover:bg-teal/90 px-8 font-sans"
                data-ocid="hero.order_button"
              >
                Order Now
              </Button>
            </Link>
            <Link to="/catalog">
              <Button
                variant="outline"
                className="rounded-pill border-espresso text-espresso hover:bg-espresso hover:text-white px-8 font-sans"
                data-ocid="hero.catalog_button"
              >
                View Catalog
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Content — Two Columns */}
      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-serif text-3xl text-espresso mb-8"
              >
                Cake Catalog
              </motion.h2>
              {isLoading ? (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  data-ocid="products.loading_state"
                >
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="bg-card rounded-lg shadow-card overflow-hidden"
                    >
                      <Skeleton className="h-52 w-full" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  data-ocid="products.list"
                >
                  {products.slice(0, 6).map((product, i) => (
                    <motion.div
                      key={product.id.toString()}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      data-ocid={`products.item.${i + 1}`}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              )}
              <div className="mt-8 text-center">
                <Link to="/catalog">
                  <Button
                    variant="outline"
                    className="rounded-pill border-teal text-teal hover:bg-teal hover:text-white"
                    data-ocid="products.view_all_button"
                  >
                    View Full Catalog
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:w-80 space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-espresso mb-4">
                  Recent Creations
                </h2>
                <div className="space-y-3">
                  {RECENT_CREATIONS.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-card rounded-lg p-3 shadow-xs"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-14 h-14 rounded-md object-cover flex-shrink-0"
                      />
                      <span className="font-sans text-sm text-espresso">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <CakeAnimation3D />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16" style={{ backgroundColor: "#E7B3AA" }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-espresso mb-4"
          >
            Order Your Dream Cake
          </motion.h2>
          <p className="font-sans text-espresso/80 mb-8 max-w-md mx-auto">
            Every celebration deserves a cake as special as the moment. Let us
            bake your happiness.
          </p>
          <Link to="/order">
            <Button
              className="rounded-pill bg-espresso text-cream hover:bg-espresso/90 px-10 py-3 text-base font-sans"
              data-ocid="cta.order_form_button"
            >
              Order Form
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-mint py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-3xl text-espresso mb-6"
          >
            About Sweet Treats 99
          </motion.h2>
          <p className="font-sans text-espresso/80 text-lg leading-relaxed">
            Born from a love of baking and a passion for making people smile,
            Sweet Treats 99 has been crafting artisanal cakes since 2019. Every
            creation is made with the finest ingredients, hand-decorated with
            care, and delivered fresh to your doorstep.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-8 max-w-sm mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="font-serif font-bold text-espresso text-xl">
                  {stat.label}
                </div>
                <div className="font-sans text-xs text-espresso/70">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-cream py-4 flex justify-end pr-8">
        <Link to="/admin">
          <Button
            variant="outline"
            size="sm"
            className="rounded-pill border-lavender-dark text-espresso/70 hover:text-espresso text-xs"
            data-ocid="admin.login_button"
          >
            🔐 Admin Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
