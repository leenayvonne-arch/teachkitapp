import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold font-display text-foreground">TeachKit</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="font-medium">
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild size="sm" className="rounded-xl font-medium shadow-md shadow-primary/20">
            <Link to="/signup">Start Free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
