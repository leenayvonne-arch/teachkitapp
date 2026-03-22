import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GenerationLimitDialog = ({ open, onOpenChange }: Props) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-md">
      <div className="text-center p-4">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-bold mb-2">
          You've used your 5 free generations
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upgrade to Essential or Pro to keep creating unlimited lesson materials.
        </p>
        <Button asChild>
          <Link to="/pricing">View Upgrade Options</Link>
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

export default GenerationLimitDialog;
