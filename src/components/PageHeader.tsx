interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

const PageHeader = ({ eyebrow, title, subtitle }: Props) => (
  <section className="relative overflow-hidden border-b border-border/40">
    <div className="absolute inset-0 bg-candle opacity-60 pointer-events-none" />
    <div className="absolute inset-0 bg-vignette pointer-events-none" />
    <div className="container relative py-24 md:py-32 text-center">
      {eyebrow && (
        <p className="font-display tracking-[0.4em] text-xs text-primary/80 uppercase mb-4 animate-fade-in">
          ✦ {eyebrow} ✦
        </p>
      )}
      <h1 className="font-display text-5xl md:text-7xl tracking-wide text-gold-gradient candle-glow animate-fade-up">
        {title}
      </h1>
      {subtitle && (
        <p className="font-serif italic text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          {subtitle}
        </p>
      )}
    </div>
  </section>
);

export default PageHeader;
