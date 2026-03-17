import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
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
            <Route path="pricing" element={<PlaceholderPage title="Pricing" description="Manage your TeachKit subscription." />} />
            <Route path="account" element={<PlaceholderPage title="Account" description="Manage your account settings." />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
