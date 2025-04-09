
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Leaf, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Pengguna mencoba mengakses rute yang tidak ada:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout className="bg-herb-light/30">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-herb-light rounded-full p-6 mb-6">
          <Leaf className="h-16 w-16 text-herb-primary" />
        </div>
        
        <h1 className="text-5xl font-bold text-herb-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-herb-dark mb-6">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Ramuan herbal yang Anda cari sepertinya tidak ada. Mari kembali ke jalur yang ada.
        </p>
        
        <Button asChild className="bg-herb-primary hover:bg-herb-primary/90">
          <Link to="/" className="flex items-center">
            <Home className="mr-2 h-5 w-5" />
            Kembali ke Beranda
          </Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
