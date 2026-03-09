import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Leaf, Menu, Monitor, Phone, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/computer", label: "Computer", icon: Monitor, color: "computer" },
  {
    to: "/agriculture",
    label: "Agriculture",
    icon: Leaf,
    color: "agriculture",
  },
  { to: "/contact", label: "Contact", icon: Phone, color: "neutral" },
  { to: "/admin", label: "Admin", icon: LayoutDashboard, color: "neutral" },
];

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-xs">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                <img
                  src="/assets/generated/pansare-logo-transparent.dim_200x200.png"
                  alt="Pansare Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-base text-foreground leading-tight block">
                  Pansare
                </span>
                <span className="text-xs text-muted-foreground leading-tight block tracking-wide uppercase">
                  Computer & Agriculture
                </span>
              </div>
              <div className="block sm:hidden">
                <span className="font-display font-bold text-sm text-foreground">
                  Pansare
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label, icon: Icon, color }) => {
                const isActive =
                  currentPath === to || currentPath.startsWith(`${to}/`);
                return (
                  <Link
                    key={to}
                    to={to}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                      isActive && color === "computer"
                        ? "bg-computer-light text-computer"
                        : isActive && color === "agriculture"
                          ? "bg-agriculture-light text-agriculture"
                          : isActive
                            ? "bg-secondary text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-card animate-fade-in">
            <nav className="container max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map(({ to, label, icon: Icon, color }) => {
                const isActive = currentPath === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      isActive && color === "computer"
                        ? "bg-computer-light text-computer"
                        : isActive && color === "agriculture"
                          ? "bg-agriculture-light text-agriculture"
                          : isActive
                            ? "bg-secondary text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground mt-auto">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-md overflow-hidden bg-white/10">
                  <img
                    src="/assets/generated/pansare-logo-transparent.dim_200x200.png"
                    alt="Pansare"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-display font-bold text-base text-white">
                  Pansare
                </span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                Your trusted partner for technology and farming solutions in the
                local community.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-white mb-3 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {[
                  { to: "/computer", label: "Computer Services" },
                  { to: "/agriculture", label: "Agriculture" },
                  { to: "/contact", label: "Contact Us" },
                  { to: "/admin", label: "Admin Panel" },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-display font-semibold text-white mb-3 text-sm uppercase tracking-wider">
                Contact
              </h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>📍 Main Market, Pune District</li>
                <li>📞 +91 98765 43210</li>
                <li>✉️ info@pansare.in</li>
                <li>🕐 Mon–Sat: 9:00 AM – 7:00 PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Pansare Computer & Agriculture. All
              rights reserved.
            </p>
            <p className="text-xs text-white/40">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
