import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Purchase {
  id: string;
  user_id: string;
  product_name: string;
  product_slug: string;
  price_paid: number;
  currency: string;
  customer_email: string | null;
  customer_name: string | null;
  created_at: string;
}

const AdminOrdersTab = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("purchases")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setPurchases(data as Purchase[]);
      setLoading(false);
    };
    fetch();
  }, []);

  const formatPrice = (amount: number, currency: string) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);

  if (loading) return <p className="text-muted-foreground">Loading orders…</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{purchases.length} Orders</h2>

      {purchases.length === 0 ? (
        <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">No purchases yet.</div>
      ) : (
        <div className="rounded-xl border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.customer_name || <span className="text-muted-foreground italic">—</span>}</TableCell>
                  <TableCell>{p.customer_email || <span className="text-muted-foreground italic">—</span>}</TableCell>
                  <TableCell><Badge variant="secondary">{p.product_name}</Badge></TableCell>
                  <TableCell>{formatPrice(p.price_paid, p.currency)}</TableCell>
                  <TableCell><Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Paid</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{format(new Date(p.created_at), "MMM d, yyyy")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersTab;
