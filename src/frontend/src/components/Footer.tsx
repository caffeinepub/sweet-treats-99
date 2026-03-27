import { Link } from "@tanstack/react-router";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";
import { useSettings } from "../hooks/useQueries";

export function Footer() {
  const { data: settings } = useSettings();
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-lavender-dark text-espresso">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 font-sans text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/catalog", label: "Our Cakes" },
                { to: "/order", label: "Place an Order" },
                { to: "/my-orders", label: "My Orders" },
                { to: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-teal transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">
              Customer Support
            </h3>
            <ul className="space-y-2 font-sans text-sm">
              <li>📞 {settings?.phone || "+91 98765 43210"}</li>
              <li>✉️ {settings?.email || "hello@sweettreats99.com"}</li>
              <li>📍 {settings?.address || "Mumbai, Maharashtra"}</li>
              <li>🕐 {settings?.openingHours || "Mon–Sat: 9am–8pm"}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">
              Stay Connected
            </h3>
            <p className="font-sans text-sm mb-4 text-espresso/70">
              Follow us for daily bakes, special offers, and behind-the-scenes
              sweetness.
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                className="p-2 bg-lavender rounded-full hover:bg-teal hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-2 bg-lavender rounded-full hover:bg-teal hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-2 bg-lavender rounded-full hover:bg-teal hover:text-white transition-colors"
                aria-label="X"
              >
                <SiX className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-lavender text-center">
          <p className="font-sans text-sm text-espresso/70">
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-teal"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
