import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogOut, ShoppingBag, User } from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function Navbar() {
  const { login, clear, identity, isLoggingIn } = useInternetIdentity();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navLinks = [
    { to: "/catalog", label: "Cakes" },
    { to: "/catalog?occasion=true", label: "Occasions" },
    { to: "/#about", label: "About Us" },
    { to: "/order", label: "Order" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">🧁</span>
            <div className="flex flex-col leading-none">
              <span className="font-serif font-bold text-espresso text-lg">
                Sweet Treats 99
              </span>
              <span className="text-xs text-muted-foreground font-sans tracking-wide">
                Freshly Baked Happiness
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav
            className="hidden md:flex items-center gap-6"
            data-ocid="nav.section"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans text-sm font-medium transition-colors hover:text-teal ${
                  currentPath === link.to
                    ? "text-teal border-b-2 border-teal"
                    : "text-espresso"
                }`}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {identity ? (
              <>
                <Link to="/my-orders">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-espresso hover:text-teal"
                    data-ocid="nav.my_orders_button"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span className="hidden sm:inline">My Orders</span>
                  </Button>
                </Link>
                <div className="text-xs text-muted-foreground hidden lg:block max-w-[120px] truncate">
                  {identity.getPrincipal().toString().slice(0, 12)}...
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clear()}
                  className="gap-2 text-espresso hover:text-destructive"
                  data-ocid="nav.logout_button"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={() => login()}
                disabled={isLoggingIn}
                className="gap-2 bg-teal text-primary-foreground hover:bg-teal/90 rounded-pill"
                data-ocid="nav.login_button"
              >
                <User className="h-4 w-4" />
                {isLoggingIn ? "Signing in..." : "My Account"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
