import { Sparkles, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      {/* Contact Section */}
      <div id="contact" className="border-b py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-lg">
            <Mail className="mx-auto mb-4 h-8 w-8 text-primary" />
            <h3 className="mb-2 text-2xl font-bold text-foreground">Get in Touch</h3>
            <p className="text-muted-foreground">
              Have questions or feedback? Reach out at{" "}
              <a href="mailto:support@teachkit.app" className="font-medium text-primary hover:underline">
                support@teachkit.app
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Terms & Privacy */}
      <div className="border-b py-10">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2">
          <div id="terms">
            <h4 className="mb-2 text-lg font-bold text-foreground">Terms of Service</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              By using TeachKit, you agree to our terms of service. All generated content is yours to use in your classroom. We reserve the right to update these terms with notice. For full details, contact us.
            </p>
          </div>
          <div id="privacy">
            <h4 className="mb-2 text-lg font-bold text-foreground">Privacy Policy</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We take your privacy seriously. TeachKit collects only the data needed to provide our service. We never sell your personal information. Your generated resources remain private and secure.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold font-display text-foreground">TeachKit</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {[
              { label: "About", href: "#about" },
              { label: "Pricing", href: "#pricing" },
              { label: "Contact", href: "#contact" },
              { label: "Terms", href: "#terms" },
              { label: "Privacy", href: "#privacy" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
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
