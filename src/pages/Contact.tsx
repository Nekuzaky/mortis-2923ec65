import { Mail, MessageCircle, Github, Globe, Send } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const channels = [
  { icon: MessageCircle, title: "Discord", body: "Rejoignez le serveur de support pour parler aux mainteneurs.", action: "Ouvrir Discord", href: "https://discord.gg/" },
  { icon: Mail, title: "Courrier", body: "Écrivez-nous pour partenariats, presse ou demandes privées.", action: "contact@mortis.bot", href: "mailto:contact@mortis.bot" },
  { icon: Github, title: "GitHub", body: "Bugs, suggestions et contributions publiques.", action: "Voir le repo", href: "https://github.com/" },
  { icon: Globe, title: "Statut", body: "Vérifiez la santé de l'API et des shards en direct.", action: "mortisia.nekuzaky.com", href: "https://mortisia.nekuzaky.com/api/health" },
];

const Contact = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Missive scellée — Mortis a reçu votre message.");
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Parler au Corbeau"
        subtitle="Une question, un partenariat, un bug à signaler ? Choisissez votre voie."
      />

      <section className="container py-20 grid lg:grid-cols-[1fr_1.2fr] gap-10 max-w-6xl mx-auto">
        {/* Channels */}
        <div className="space-y-4">
          {channels.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block parchment border border-border/60 hover:border-primary/60 p-6 transition-all hover:shadow-candle"
            >
              <div className="flex items-start gap-4">
                <c.icon className="h-8 w-8 text-primary shrink-0 mt-1" strokeWidth={1.2} />
                <div className="flex-1">
                  <h3 className="font-display text-xl text-foreground tracking-wide">{c.title}</h3>
                  <p className="font-serif text-muted-foreground mt-1">{c.body}</p>
                  <p className="font-mono text-xs text-primary/80 mt-3 group-hover:text-primary transition-colors">
                    {c.action} →
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="parchment border border-primary/30 p-8 md:p-10 shadow-candle"
        >
          <p className="font-display tracking-[0.4em] text-xs text-primary/80 uppercase">✦ Missive ✦</p>
          <h2 className="font-display text-3xl text-gold-gradient mt-2">Adresser une supplique</h2>
          <p className="font-serif italic text-muted-foreground mt-2">
            Le formulaire est purement décoratif — pour une vraie réponse, utilisez Discord ou e-mail.
          </p>

          <div className="gothic-divider my-8"><span className="text-primary">✦</span></div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-display tracking-widest text-xs uppercase">Nom</Label>
              <Input id="name" name="name" required placeholder="Nom de votre maison" className="bg-input/60 border-border/60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-display tracking-widest text-xs uppercase">E-mail</Label>
              <Input id="email" name="email" type="email" required placeholder="vous@exemple.com" className="bg-input/60 border-border/60" />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Label htmlFor="subject" className="font-display tracking-widest text-xs uppercase">Sujet</Label>
            <Input id="subject" name="subject" required placeholder="Pacte, bug, partenariat…" className="bg-input/60 border-border/60" />
          </div>

          <div className="space-y-2 mt-4">
            <Label htmlFor="message" className="font-display tracking-widest text-xs uppercase">Message</Label>
            <Textarea id="message" name="message" required rows={6} placeholder="Décrivez votre requête en quelques lignes…" className="bg-input/60 border-border/60 resize-none" />
          </div>

          <Button type="submit" size="lg" className="w-full mt-8 font-display tracking-widest uppercase text-xs h-14 shadow-candle">
            Sceller et envoyer <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </section>
    </SiteLayout>
  );
};

export default Contact;
