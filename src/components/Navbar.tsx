import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import sigil from "@/assets/raven-sigil.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/commands", label: "Commands" },
  { to: "/docs", label: "Grimoire" },
  { to: "/pricing", label: "Patronage" },
  { to: "/dashboard", label: "Sanctum" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={sigil}
            alt="Ravencroft sigil"
            width={40}
            height={40}
            className="h-10 w-10 object-contain transition-transform duration-500 group-hover:rotate-3"
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
          <Button variant="ghost" asChild className="font-display tracking-widest text-xs uppercase">
            <a href="https://mortisa.nekuzaky.com/" target="_blank" rel="noopener noreferrer">Enter</a>
          </Button>
          <Button asChild className="font-display tracking-widest text-xs uppercase shadow-candle">
            <a href="https://mortis.nekuzaky.com/" target="_blank" rel="noopener noreferrer">Invoke Mortis</a>
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
            <div className="flex gap-2 pt-2">
              <Button variant="outline" asChild className="flex-1">
                <a href="https://mortisa.nekuzaky.com/" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Enter</a>
              </Button>
              <Button asChild className="flex-1">
                <a href="https://mortis.nekuzaky.com/" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Invoke Mortis</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
