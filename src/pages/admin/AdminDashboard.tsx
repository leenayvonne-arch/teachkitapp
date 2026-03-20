import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminRole } from "@/hooks/useAdminRole";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Package, CreditCard, MessageSquare, BarChart3, Sparkles } from "lucide-react";
import AdminProductsTab from "./tabs/AdminProductsTab";
import AdminOrdersTab from "./tabs/AdminOrdersTab";
import AdminFeedbackTab from "./tabs/AdminFeedbackTab";
import AdminAnalyticsTab from "./tabs/AdminAnalyticsTab";

const AdminDashboard = () => {
  const { isAdmin, loading } = useAdminRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">TeachKit Admin</h1>
              <p className="text-sm text-muted-foreground">Manage products, orders, and feedback</p>
            </div>
          </div>
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products" className="gap-1.5">
              <Package className="h-4 w-4" /> Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-1.5">
              <CreditCard className="h-4 w-4" /> Orders
            </TabsTrigger>
            <TabsTrigger value="feedback" className="gap-1.5">
              <MessageSquare className="h-4 w-4" /> Feedback
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-1.5">
              <BarChart3 className="h-4 w-4" /> Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products"><AdminProductsTab /></TabsContent>
          <TabsContent value="orders"><AdminOrdersTab /></TabsContent>
          <TabsContent value="feedback"><AdminFeedbackTab /></TabsContent>
          <TabsContent value="analytics"><AdminAnalyticsTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
