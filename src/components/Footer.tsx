import { Link } from "react-router-dom";
import sigil from "@/assets/raven-sigil.png";

const Footer = () => (
  <footer className="relative border-t border-border/60 mt-32">
    <div className="absolute inset-0 bg-ember opacity-50 pointer-events-none" />
    <div className="container relative py-16 grid gap-12 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="flex items-center gap-3 mb-4">
          <img src={sigil} alt="" width={36} height={36} className="h-9 w-9" loading="lazy" />
          <span className="font-display text-xl tracking-widest text-gold-gradient">
            RAVENCROFT
          </span>
        </div>
        <p className="font-serif italic text-muted-foreground max-w-md">
          A dark guardian for your Discord realm. Forged in shadow, bound by oath, sworn to keep your halls in solemn order.
        </p>
      </div>

      <div>
        <h4 className="font-display text-sm tracking-widest text-primary mb-4 uppercase">The Order</h4>
        <ul className="space-y-2 text-muted-foreground">
          <li><Link to="/commands" className="hover:text-primary transition-colors">Commands</Link></li>
          <li><Link to="/docs" className="hover:text-primary transition-colors">Grimoire</Link></li>
          <li><Link to="/pricing" className="hover:text-primary transition-colors">Patronage</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display text-sm tracking-widest text-primary mb-4 uppercase">Sanctum</h4>
        <ul className="space-y-2 text-muted-foreground">
          <li><Link to="/login" className="hover:text-primary transition-colors">Enter the Crypt</Link></li>
          <li><a href="#" className="hover:text-primary transition-colors">Discord Coven</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">Github Codex</a></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-border/40">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="font-serif text-sm text-muted-foreground italic">
          © {new Date().getFullYear()} Ravencroft Order. All souls accounted for.
        </p>
        <p className="font-display text-xs tracking-widest text-muted-foreground/70 uppercase">
          Memento Mori · Memento Vivere
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
