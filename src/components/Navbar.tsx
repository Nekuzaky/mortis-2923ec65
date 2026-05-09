import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inviteUrl } from "@/lib/api";
import logo from "@/assets/red-eye.png";

const INVITE = inviteUrl();

const links = [
  { to: "/", label: "Home" },
  { to: "/commands", label: "Commandes" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/soutenir", label: "Soutenir" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Mortis red eye"
            width={40}
            height={40}
            className="h-10 w-10 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_12px_hsl(var(--primary)/0.7)]"
          />
          <span className="font-display text-2xl tracking-widest text-gold-gradient">
            MORTIS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 font-display text-sm tracking-widest uppercase transition-colors relative ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px w-8 bg-primary shadow-candle" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild className="font-display tracking-widest text-xs uppercase shadow-candle">
            <a href={INVITE} target="_blank" rel="noopener noreferrer">Invoquer Mortis</a>
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur">
          <div className="container py-4 flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`py-2 font-display tracking-widest uppercase text-sm ${
                  pathname === l.to ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <a href={INVITE} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Invoquer Mortis</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
