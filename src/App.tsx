
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import RequireAuth from "@/components/auth/RequireAuth";

// Pages
import Index from "./pages/Index";
import Encyclopedia from "./pages/Encyclopedia";
import HerbDetail from "./pages/HerbDetail";
import HerbalMixer from "./pages/HerbalMixer";
import Remedies from "./pages/Remedies";
import Preparation from "./pages/Preparation";
import ScientificReferences from "./pages/ScientificReferences";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Store from "./pages/Store"; 
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import UserDashboard from "./pages/UserDashboard";
import UserRegister from "./pages/UserRegister";

// Admin Pages
import AdminHome from "./pages/AdminHome";
import AdminSettings from "./pages/AdminSettings";
import AdminInputData from "./pages/AdminInputData";
import AdminHerbalMap from "./pages/AdminHerbalMap";
import AdminProducts from "./pages/AdminProducts";
import AdminNewsletter from "./pages/AdminNewsletter";

// Create tanstack query client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/encyclopedia" element={<Encyclopedia />} />
                <Route path="/encyclopedia/:id" element={<HerbDetail />} />
                <Route path="/mixer" element={<HerbalMixer />} />
                <Route path="/remedies" element={<Remedies />} />
                <Route path="/preparation" element={<Preparation />} />
                <Route path="/scientific-references" element={<ScientificReferences />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<UserRegister />} />
                
                {/* Store routes */}
                <Route path="/store" element={<Store />} />
                <Route path="/store/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<RequireAuth requireUser><Checkout /></RequireAuth>} />
                <Route path="/dashboard" element={<RequireAuth requireUser><UserDashboard /></RequireAuth>} />
                
                {/* Protected routes */}
                <Route path="/admin" element={<RequireAuth><AdminHome /></RequireAuth>} />
                <Route path="/admin/settings" element={<RequireAuth><AdminSettings /></RequireAuth>} />
                <Route path="/admin/input-data" element={<RequireAuth><AdminInputData /></RequireAuth>} />
                <Route path="/admin/maps" element={<RequireAuth><AdminHerbalMap /></RequireAuth>} />
                <Route path="/admin/products" element={<RequireAuth><AdminProducts /></RequireAuth>} />
                <Route path="/admin/newsletter" element={<RequireAuth><AdminNewsletter /></RequireAuth>} />
                
                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
