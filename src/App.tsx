import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import LessonPlanGenerator from "./pages/dashboard/LessonPlanGenerator";
import WorksheetGenerator from "./pages/dashboard/WorksheetGenerator";
import QuizGenerator from "./pages/dashboard/QuizGenerator";
import ExitTicketGenerator from "./pages/dashboard/ExitTicketGenerator";
import LessonLibrary from "./pages/dashboard/LessonLibrary";
import PlaceholderPage from "./pages/dashboard/PlaceholderPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import ResourceShop from "./pages/dashboard/ResourceShop";
import ProductDetail from "./pages/dashboard/ProductDetail";
import AdminFeedback from "./pages/dashboard/AdminFeedback";
import AdminContactSubmissions from "./pages/dashboard/AdminContactSubmissions";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="lessons" element={<LessonPlanGenerator />} />
            <Route path="worksheets" element={<WorksheetGenerator />} />
            <Route path="quizzes" element={<QuizGenerator />} />
            <Route path="exit-tickets" element={<ExitTicketGenerator />} />
            <Route path="library" element={<LessonLibrary />} />
            <Route path="account" element={<ProfilePage />} />
            <Route path="shop" element={<ResourceShop />} />
            <Route path="shop/:slug" element={<ProductDetail />} />
            <Route path="admin/feedback" element={<AdminFeedback />} />
            <Route path="admin/contact" element={<AdminContactSubmissions />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
