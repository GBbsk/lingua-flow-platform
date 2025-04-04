
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";

// Pages
import ModulesPage from "./pages/ModulesPage";
import ModuleDetailPage from "./pages/ModuleDetailPage";
import LessonPage from "./pages/LessonPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UploadsPage from "./pages/admin/UploadsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/modules" replace />} />
          <Route path="/modules" element={<MainLayout><ModulesPage /></MainLayout>} />
          <Route path="/modules/:moduleId" element={<MainLayout><ModuleDetailPage /></MainLayout>} />
          <Route path="/modules/:moduleId/lessons/:lessonId" element={<MainLayout><LessonPage /></MainLayout>} />
          <Route path="/admin" element={<MainLayout><AdminDashboard /></MainLayout>} />
          <Route path="/uploads" element={<MainLayout><UploadsPage /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
