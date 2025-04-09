
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalItems, totalAmount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Login diperlukan",
        description: "Silakan login untuk melanjutkan ke pembayaran.",
        variant: "destructive",
      });
      navigate("/login", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Keranjang Belanja Kosong</h2>
            <p className="text-gray-500 mb-6">Belum ada produk yang ditambahkan ke keranjang.</p>
            <Button 
              onClick={() => navigate("/store")}
              className="bg-herb-primary hover:bg-herb-primary/90"
            >
              Mulai Belanja
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <ShoppingCart className="h-8 w-8 text-herb-primary mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Keranjang Belanja</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="p-6">
                {items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <Link to={`/store/product/${item.id}`} className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      
                      <div className="flex-grow">
                        <Link to={`/store/product/${item.id}`} className="font-medium hover:text-herb-primary">
                          {item.name}
                        </Link>
                        <p className="text-herb-primary font-medium mt-1">
                          {formatPrice(item.price)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Subtotal: {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex items-center border rounded-md overflow-hidden mr-4">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 py-1 text-center w-8 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    {index < items.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Card>
          </div>
          
          <div>
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Ringkasan Belanja</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Item:</span>
                    <span>{totalItems} item</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span>Total:</span>
                  <span className="text-herb-primary">{formatPrice(totalAmount)}</span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-herb-primary hover:bg-herb-primary/90"
                >
                  Lanjut ke Pembayaran <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
            
            <div className="mt-4 text-sm text-gray-500 text-center">
              <p>Butuh bantuan? <Link to="/contact" className="text-herb-primary hover:underline">Hubungi Kami</Link></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
