
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { useCart, Product } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to detail page
    addItem(product, 1);
    toast({
      title: "Produk ditambahkan",
      description: `${product.name} telah ditambahkan ke keranjang.`,
    });
  };
  
  // Format price to IDR
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price);
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <Link to={`/store/product/${product.id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
              Stok Terbatas
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <p className="text-white font-bold text-lg">Stok Habis</p>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-herb-primary font-bold text-lg">{formattedPrice}</p>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
        </CardContent>
        
        <CardFooter className="px-4 pb-4 pt-0 flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1"
            asChild
          >
            <div>
              <Eye className="mr-1 h-4 w-4" />
              Detail
            </div>
          </Button>
          
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            size="sm"
            className="flex-1 bg-herb-primary hover:bg-herb-primary/90"
          >
            <ShoppingCart className="mr-1 h-4 w-4" />
            Keranjang
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
