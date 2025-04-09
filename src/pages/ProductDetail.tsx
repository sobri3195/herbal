
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { Separator } from "@/components/ui/separator";

// Same mock products data as in Store.tsx
const mockProducts = [
  // ... copy the products from Store.tsx
  {
    id: "1",
    name: "Jahe Merah Bubuk Premium",
    price: 35000,
    description: "Bubuk jahe merah organik dengan kualitas premium. Cocok untuk minuman dan masakan. Jahe merah memiliki kandungan antioksidan dan anti-inflamasi yang lebih tinggi dibandingkan jahe biasa. Dikemas dalam kemasan kedap udara untuk menjaga kualitas dan kesegaran.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 50,
    category: "bubuk",
  },
  {
    id: "2",
    name: "Teh Herbal Temulawak",
    price: 28000,
    description: "Teh herbal temulawak untuk kesehatan pencernaan dan meningkatkan imunitas tubuh. Terbuat dari rimpang temulawak pilihan yang dikeringkan dengan proses alami untuk menjaga kandungan kurkuminoid. Dapat membantu menjaga kesehatan hati dan meningkatkan nafsu makan.",
    image: "https://images.unsplash.com/photo-1563911892437-1feda0077a6b?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 30,
    category: "teh",
  },
  {
    id: "3",
    name: "Minyak Esensial Serai",
    price: 85000,
    description: "Minyak esensial serai murni untuk aromaterapi dan pengobatan tradisional. Diekstrak dengan metode distilasi uap untuk menjaga kemurnian dan aroma khasnya. Memiliki sifat antiseptik, antibakteri, dan dapat membantu meredakan nyeri otot.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 15,
    category: "minyak",
  },
  {
    id: "4",
    name: "Ramuan Jamu Kunyit Asam",
    price: 25000,
    description: "Ramuan tradisional kunyit asam untuk penyegaran dan kesehatan tubuh. Kombinasi kunyit yang kaya kurkumin dengan asam jawa yang kaya vitamin C, menciptakan minuman yang menyegarkan dan menyehatkan. Cocok untuk diminum setiap hari sebagai upaya preventif menjaga kesehatan.",
    image: "https://images.unsplash.com/photo-1597690560324-8cdcb6df35f1?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 40,
    category: "ramuan",
  },
  {
    id: "5",
    name: "Kapsul Ekstrak Daun Sirsak",
    price: 120000,
    description: "Kapsul herbal ekstrak daun sirsak untuk meningkatkan sistem kekebalan tubuh. Mengandung senyawa acetogenin yang bermanfaat untuk kesehatan. Proses ekstraksi menggunakan teknologi modern untuk menghasilkan produk berkualitas tinggi.",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 25,
    category: "kapsul",
  },
  {
    id: "6",
    name: "Bubuk Kayu Manis Organik",
    price: 32000,
    description: "Bubuk kayu manis organik untuk tambahan pada masakan dan minuman. Dipanen dari pohon kayu manis berkualitas dan diproses secara higienis. Memiliki aroma yang kuat dan rasa yang khas, dapat membantu menstabilkan gula darah.",
    image: "https://images.unsplash.com/photo-1588391758749-a4e9d824cebc?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 35,
    category: "bubuk",
  },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Fetch product details
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      const foundProduct = mockProducts.find(p => p.id === id);
      if (!foundProduct) throw new Error("Product not found");
      return foundProduct;
    },
  });
  
  const handleQuantityChange = (amount: number) => {
    if (!product) return;
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addItem(product, quantity);
    toast({
      title: "Produk ditambahkan",
      description: `${quantity}x ${product.name} telah ditambahkan ke keranjang.`,
    });
  };
  
  // Format price to IDR
  const formattedPrice = product ? new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price) : "";
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-herb-primary mb-6 hover:underline"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Kembali
        </button>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <div className="flex items-center gap-4 mt-6">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Produk tidak ditemukan atau terjadi kesalahan.</p>
            <Button 
              onClick={() => navigate("/store")}
              variant="outline"
            >
              Kembali ke Toko
            </Button>
          </div>
        ) : product ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full aspect-square object-cover"
              />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-herb-primary mb-4">{formattedPrice}</p>
              
              <Separator className="my-4" />
              
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Kategori: <span className="capitalize">{product.category}</span></p>
                <p className="text-sm text-gray-500">Stok: {product.stock} tersedia</p>
              </div>
              
              {product.stock > 0 ? (
                <>
                  <div className="flex items-center mb-6">
                    <span className="mr-4 font-medium">Jumlah:</span>
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 text-center w-12">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stock}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full bg-herb-primary hover:bg-herb-primary/90"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Tambahkan ke Keranjang
                  </Button>
                </>
              ) : (
                <Button disabled className="w-full">
                  Stok Habis
                </Button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default ProductDetail;
