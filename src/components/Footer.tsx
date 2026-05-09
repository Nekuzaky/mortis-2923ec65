import { Link } from "react-router-dom";
import { inviteUrl } from "@/lib/api";
import logo from "@/assets/red-eye.png";

const Footer = () => (
  <footer className="relative border-t border-border/60 mt-32">
    <div className="absolute inset-0 bg-ember opacity-50 pointer-events-none" />
    <div className="container relative py-16 grid gap-12 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="flex items-center gap-3 mb-4">
          <img src={logo} alt="" width={36} height={36} className="h-9 w-9 drop-shadow-[0_0_10px_hsl(var(--primary)/0.6)]" loading="lazy" />
          <span className="font-display text-xl tracking-widest text-gold-gradient">
            MORTIS
          </span>
        </div>
        <p className="font-serif italic text-muted-foreground max-w-md">
          The keeper of memory, order, and the dead-quiet of a well-run realm. Bound in MySQL on Infomaniak's Swiss datacenter.
        </p>
      </div>

      <div>
        <h4 className="font-display text-sm tracking-widest text-primary mb-4 uppercase">L'Ordre</h4>
        <ul className="space-y-2 text-muted-foreground">
          <li><Link to="/commands" className="hover:text-primary transition-colors">Commandes</Link></li>
          <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
          <li><Link to="/soutenir" className="hover:text-primary transition-colors">Soutenir</Link></li>
          <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display text-sm tracking-widest text-primary mb-4 uppercase">Sanctum</h4>
        <ul className="space-y-2 text-muted-foreground">
          <li><a href={inviteUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Invite to Discord</a></li>
          <li><a href="https://mortisa.nekuzaky.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Open Dashboard</a></li>
          <li><a href="https://mortisia.nekuzaky.com/api/health" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Health Check</a></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-border/40">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="font-serif text-sm text-muted-foreground italic">
          © {new Date().getFullYear()} Mortis. All souls accounted for.
        </p>
        <p className="font-display text-xs tracking-widest text-muted-foreground/70 uppercase">
          Memento Mori · Memento Vivere
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
