import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-lg p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Cookie className="h-5 w-5 shrink-0 text-primary mt-0.5 sm:mt-0" />
            <p className="text-sm text-muted-foreground flex-1">
              We use cookies to keep you logged in and improve your experience.{" "}
              <Link to="/privacy" className="text-primary underline underline-offset-2 hover:text-primary/80">
                Privacy Policy
              </Link>
            </p>
            <div className="flex gap-2 shrink-0">
              <Button variant="ghost" size="sm" onClick={decline}>
                Decline
              </Button>
              <Button variant="gradient" size="sm" className="rounded-xl" onClick={accept}>
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
