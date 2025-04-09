
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  FileText, 
  Settings, 
  LogOut, 
  FileInput, 
  Map,
  Store,
  Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout berhasil",
      description: "Anda telah keluar dari akun admin.",
    });
    navigate("/");
  };

  if (!user) {
    navigate("/login", { state: { from: location } });
    return null;
  }

  const navigationItems = [
    { name: "Kelola Artikel", path: "/admin", icon: <FileText className="mr-2 h-5 w-5" /> },
    { name: "Input Data", path: "/admin/input-data", icon: <FileInput className="mr-2 h-5 w-5" /> },
    { name: "Peta Herbal", path: "/admin/maps", icon: <Map className="mr-2 h-5 w-5" /> },
    { name: "Produk", path: "/admin/products", icon: <Store className="mr-2 h-5 w-5" /> },
    { name: "Newsletter", path: "/admin/newsletter", icon: <Mail className="mr-2 h-5 w-5" /> },
    { name: "Pengaturan", path: "/admin/settings", icon: <Settings className="mr-2 h-5 w-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-border">
        <div className="p-4">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-herb-primary" />
            <span className="text-xl font-nunito font-bold text-herb-primary">
              <span>Herbal</span>
              <span className="text-herb-secondary">Alchemy</span>
            </span>
          </Link>
        </div>
        <Separator />
        <div className="flex-1 py-6 px-4 space-y-1">
          {navigationItems.map((item) => (
            <Link to={item.path} key={item.path}>
              <Button 
                variant={location.pathname === item.path ? "secondary" : "ghost"} 
                className={cn(
                  "w-full justify-start",
                  location.pathname === item.path && "bg-herb-light text-herb-primary hover:bg-herb-light/80"
                )}
              >
                {item.icon}
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <div className="mb-2">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex flex-col flex-1">
        <header className="md:hidden sticky top-0 z-30 bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-herb-primary" />
              <span className="text-xl font-nunito font-bold text-herb-primary">
                <span>Herbal</span>
                <span className="text-herb-secondary">Alchemy</span>
              </span>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Mobile navigation */}
          <div className="flex overflow-x-auto py-2 gap-2 mt-2">
            {navigationItems.map((item) => (
              <Link to={item.path} key={item.path}>
                <Button 
                  size="sm" 
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  className={cn(
                    "whitespace-nowrap",
                    location.pathname === item.path && "bg-herb-light text-herb-primary hover:bg-herb-light/80"
                  )}
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
