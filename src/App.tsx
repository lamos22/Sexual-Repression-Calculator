import React, {useEffect} from "react";
import {Toaster} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import Index from "./pages/home";
import Assessment from "./pages/assessment";
import Results from "./pages/results";
import Guide from "./pages/guide";
import Science from "./pages/science";
import History from "./pages/history";
import NotFound from "./pages/404";
import BackToTopButton from "@/components/BackToTopButton"; 

const queryClient = new QueryClient();

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search]);

  return null;
};

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster richColors />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/results" element={<Results />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/science" element={<Science />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* ✅ 固定在右上角的返回顶部按钮 */}
        <BackToTopButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
