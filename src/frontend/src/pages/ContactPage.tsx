import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useSettings } from "../hooks/useQueries";

export function ContactPage() {
  const { data: settings, isLoading } = useSettings();

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-lavender/60 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl text-espresso mb-2"
          >
            Get in Touch
          </motion.h1>
          <p className="font-sans text-espresso/70">
            We'd love to hear from you — and bake for you!
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-2xl text-espresso mb-6">
              Contact Information
            </h2>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    label: "Our Location",
                    value: settings?.location || "Mumbai, Maharashtra",
                  },
                  {
                    icon: MapPin,
                    label: "Address",
                    value:
                      settings?.address ||
                      "123 Baker Street, Bandra West, Mumbai - 400050",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: settings?.phone || "+91 98765 43210",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: settings?.email || "hello@sweettreats99.com",
                  },
                  {
                    icon: Clock,
                    label: "Opening Hours",
                    value:
                      settings?.openingHours ||
                      "Mon–Sat: 9am–8pm, Sun: 10am–6pm",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 bg-card rounded-xl p-4 shadow-xs"
                  >
                    <div className="p-2 bg-lavender rounded-lg flex-shrink-0">
                      <Icon className="h-5 w-5 text-teal" />
                    </div>
                    <div>
                      <p className="font-sans text-xs text-espresso/50 uppercase tracking-wide">
                        {label}
                      </p>
                      <p className="font-sans text-sm text-espresso font-medium mt-0.5">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-serif text-2xl text-espresso mb-6">Find Us</h2>
            <div
              className="w-full h-64 bg-gradient-to-br from-mint/50 to-lavender/50 rounded-2xl flex items-center justify-center shadow-card mb-6"
              data-ocid="contact.map_marker"
            >
              <div className="text-center">
                <MapPin className="h-10 w-10 text-teal mx-auto mb-2" />
                <p className="font-sans text-espresso/80 text-sm font-medium">
                  {settings?.address || "123 Baker Street, Mumbai"}
                </p>
                <a
                  href={`https://maps.google.com?q=${encodeURIComponent(settings?.address || "Sweet Treats 99 Mumbai")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-teal font-sans text-sm underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            <div className="bg-peach/40 rounded-xl p-6">
              <h3 className="font-serif font-semibold text-espresso mb-2">
                Send Us a Message
              </h3>
              <p className="font-sans text-sm text-espresso/70 mb-4">
                For quick orders and inquiries, reach us on WhatsApp — we
                respond within minutes!
              </p>
              <a
                href={`https://wa.me/${settings?.whatsappNumber || "919876543210"}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-pill text-white font-sans text-sm font-medium transition-transform hover:scale-105"
                style={{ backgroundColor: "#25D366" }}
                data-ocid="contact.whatsapp_button"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-4 h-4"
                  role="img"
                  aria-label="WhatsApp"
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
