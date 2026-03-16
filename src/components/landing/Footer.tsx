import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold font-display text-foreground">TeachKit</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {["About", "Pricing", "Contact", "Terms", "Privacy"].map((item) => (
              <Link
                key={item}
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TeachKit
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
