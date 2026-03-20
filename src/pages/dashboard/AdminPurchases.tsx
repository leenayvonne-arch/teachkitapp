import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminRole } from "@/hooks/useAdminRole";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Purchase {
  id: string;
  user_id: string;
  product_name: string;
  product_slug: string;
  product_description: string | null;
  price_paid: number;
  currency: string;
  customer_email: string | null;
  customer_name: string | null;
  created_at: string;
  stripe_session_id: string | null;
}

const AdminPurchases = () => {
  const { isAdmin, loading: roleLoading } = useAdminRole();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roleLoading && !isAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, roleLoading, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchPurchases = async () => {
      const { data, error } = await supabase
        .from("purchases")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setPurchases(data as Purchase[]);
      setLoading(false);
    };
    fetchPurchases();
  }, [isAdmin]);

  if (roleLoading || loading) {
    return <div className="p-6 text-muted-foreground">Loading…</div>;
  }

  if (!isAdmin) return null;

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Customer Purchases</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {purchases.length} total purchase{purchases.length !== 1 ? "s" : ""}
        </p>
      </div>

      {purchases.length === 0 ? (
        <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
          No purchases yet.
        </div>
      ) : (
        <div className="rounded-xl border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">
                    {p.customer_name || <span className="text-muted-foreground italic">—</span>}
                  </TableCell>
                  <TableCell>
                    {p.customer_email || <span className="text-muted-foreground italic">—</span>}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{p.product_name}</Badge>
                  </TableCell>
                  <TableCell>{formatPrice(p.price_paid, p.currency)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(p.created_at), "MMM d, yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminPurchases;
