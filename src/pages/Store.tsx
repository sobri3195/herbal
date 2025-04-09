
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { Store as StoreIcon, Filter, Search } from "lucide-react";
import ProductCard from "@/components/store/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

// Mock data for products
const mockProducts = [
  {
    id: "1",
    name: "Jahe Merah Bubuk Premium",
    price: 35000,
    description: "Bubuk jahe merah organik dengan kualitas premium. Cocok untuk minuman dan masakan.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 50,
    category: "bubuk",
  },
  {
    id: "2",
    name: "Teh Herbal Temulawak",
    price: 28000,
    description: "Teh herbal temulawak untuk kesehatan pencernaan dan meningkatkan imunitas tubuh.",
    image: "https://images.unsplash.com/photo-1563911892437-1feda0077a6b?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 30,
    category: "teh",
  },
  {
    id: "3",
    name: "Minyak Esensial Serai",
    price: 85000,
    description: "Minyak esensial serai murni untuk aromaterapi dan pengobatan tradisional.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 15,
    category: "minyak",
  },
  {
    id: "4",
    name: "Ramuan Jamu Kunyit Asam",
    price: 25000,
    description: "Ramuan tradisional kunyit asam untuk penyegaran dan kesehatan tubuh.",
    image: "https://images.unsplash.com/photo-1597690560324-8cdcb6df35f1?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 40,
    category: "ramuan",
  },
  {
    id: "5",
    name: "Kapsul Ekstrak Daun Sirsak",
    price: 120000,
    description: "Kapsul herbal ekstrak daun sirsak untuk meningkatkan sistem kekebalan tubuh.",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 25,
    category: "kapsul",
  },
  {
    id: "6",
    name: "Bubuk Kayu Manis Organik",
    price: 32000,
    description: "Bubuk kayu manis organik untuk tambahan pada masakan dan minuman.",
    image: "https://images.unsplash.com/photo-1588391758749-a4e9d824cebc?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 35,
    category: "bubuk",
  },
];

const categories = [
  { value: "all", label: "Semua Kategori" },
  { value: "bubuk", label: "Bubuk Herbal" },
  { value: "teh", label: "Teh Herbal" },
  { value: "minyak", label: "Minyak Esensial" },
  { value: "ramuan", label: "Ramuan Jamu" },
  { value: "kapsul", label: "Kapsul Herbal" },
];

const Store = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();
  
  // Fetch products (using mock data for now)
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockProducts;
    },
  });
  
  // Filter products based on search query and category
  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <StoreIcon className="h-8 w-8 text-herb-primary mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Toko Herbal</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Error loading products. Please try again later.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </div>
        ) : filteredProducts?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada produk yang sesuai dengan pencarian Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Store;
