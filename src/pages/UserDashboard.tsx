
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  User,
  LayoutDashboard,
  ShoppingBag,
  Settings,
  LogOut,
  Bookmark,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import NewsletterForm from "@/components/newsletter/NewsletterForm";

// Mock order history
const mockOrders = [
  {
    id: "ORD-001",
    date: "2023-10-15",
    status: "delivered",
    total: 125000,
    items: [
      { name: "Jahe Merah Bubuk Premium", quantity: 2, price: 35000 },
      { name: "Teh Herbal Temulawak", quantity: 2, price: 28000 },
    ],
  },
  {
    id: "ORD-002",
    date: "2023-09-22",
    status: "processing",
    total: 85000,
    items: [{ name: "Minyak Esensial Serai", quantity: 1, price: 85000 }],
  },
];

// Mock saved recipes
const mockSavedRecipes = [
  {
    id: "RCP-001",
    name: "Jahe Madu Hangat",
    ingredients: ["Jahe", "Madu", "Air panas"],
    dateAdded: "2023-10-10",
  },
  {
    id: "RCP-002",
    name: "Jamu Kunyit Asam",
    ingredients: ["Kunyit", "Asam Jawa", "Gula Merah", "Air"],
    dateAdded: "2023-09-30",
  },
  {
    id: "RCP-003",
    name: "Teh Temulawak Sereh",
    ingredients: ["Temulawak", "Sereh", "Jahe", "Madu"],
    dateAdded: "2023-09-15",
  },
];

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Profile form state
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });
  
  // Fetch orders
  const { data: orders, isLoading: loadingOrders } = useQuery({
    queryKey: ["user-orders"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 700));
      return mockOrders;
    },
  });
  
  // Fetch saved recipes
  const { data: savedRecipes, isLoading: loadingRecipes } = useQuery({
    queryKey: ["saved-recipes"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockSavedRecipes;
    },
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the profile via API
    toast({
      title: "Profil diperbarui",
      description: "Detail profil Anda telah berhasil diperbarui.",
    });
  };
  
  const handleLogout = () => {
    logout();
    clearCart(); // Clear cart on logout
    toast({
      title: "Logout berhasil",
      description: "Anda telah keluar dari akun Anda.",
    });
  };
  
  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-herb-primary/20 rounded-full p-3 mr-4">
                    <User className="h-6 w-6 text-herb-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{user?.name}</h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <Button
                    variant={activeTab === "overview" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("overview")}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Ringkasan
                  </Button>
                  <Button
                    variant={activeTab === "orders" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("orders")}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Pesanan Saya
                  </Button>
                  <Button
                    variant={activeTab === "recipes" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("recipes")}
                  >
                    <Bookmark className="mr-2 h-4 w-4" />
                    Resep Tersimpan
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Pengaturan
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </nav>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <NewsletterForm variant="card" />
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">Akun Saya</h1>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Selamat Datang, {user?.name}!</CardTitle>
                    <CardDescription>
                      Ini adalah dasbor akun Anda di HerbalAlchemy.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-herb-light/50 p-4 rounded-md">
                        <h3 className="font-medium mb-2">Pesanan</h3>
                        <p className="text-2xl font-bold">{orders?.length || 0}</p>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-herb-primary"
                          onClick={() => setActiveTab("orders")}
                        >
                          Lihat semua pesanan
                        </Button>
                      </div>
                      <div className="bg-herb-light/50 p-4 rounded-md">
                        <h3 className="font-medium mb-2">Resep Tersimpan</h3>
                        <p className="text-2xl font-bold">{savedRecipes?.length || 0}</p>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-herb-primary"
                          onClick={() => setActiveTab("recipes")}
                        >
                          Lihat semua resep
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium mb-3">Pesanan Terbaru</h3>
                      {loadingOrders ? (
                        <div className="text-center py-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-4 border-herb-primary border-t-transparent mx-auto"></div>
                        </div>
                      ) : orders && orders.length > 0 ? (
                        <div className="space-y-3">
                          {orders.slice(0, 2).map((order) => (
                            <div key={order.id} className="border rounded-md p-3">
                              <div className="flex justify-between items-center mb-2">
                                <p className="font-medium">Order #{order.id}</p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  order.status === "delivered" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                                }`}>
                                  {order.status === "delivered" ? "Dikirim" : "Diproses"}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">Tanggal: {order.date}</p>
                              <p className="text-sm font-medium mt-1">Total: {formatPrice(order.total)}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">Belum ada pesanan.</p>
                      )}
                      
                      <div className="mt-4">
                        <Link to="/store">
                          <Button variant="outline">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Lanjut Belanja
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Rekomendasi Untukmu</CardTitle>
                    <CardDescription>
                      Berdasarkan minat dan pembelian sebelumnya.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {/* This would be personalized in a real app */}
                      <div className="border rounded-md p-3">
                        <h4 className="font-medium">Jahe dan Madu</h4>
                        <p className="text-sm text-gray-600">Perpaduan sempurna untuk imunitas</p>
                        <Button variant="link" className="p-0 h-auto text-herb-primary text-sm mt-1">
                          Lihat resep
                        </Button>
                      </div>
                      <div className="border rounded-md p-3">
                        <h4 className="font-medium">Racikan Herbal Tidur</h4>
                        <p className="text-sm text-gray-600">Campuran untuk tidur berkualitas</p>
                        <Button variant="link" className="p-0 h-auto text-herb-primary text-sm mt-1">
                          Lihat resep
                        </Button>
                      </div>
                      <div className="border rounded-md p-3">
                        <h4 className="font-medium">Teh Serai Lemon</h4>
                        <p className="text-sm text-gray-600">Menyegarkan dan menenangkan</p>
                        <Button variant="link" className="p-0 h-auto text-herb-primary text-sm mt-1">
                          Lihat resep
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Riwayat Pesanan</CardTitle>
                    <CardDescription>
                      Daftar semua pesanan Anda di HerbalAlchemy.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loadingOrders ? (
                      <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-herb-primary border-t-transparent mx-auto"></div>
                        <p className="mt-4 text-herb-primary font-medium">Loading...</p>
                      </div>
                    ) : orders && orders.length > 0 ? (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <div key={order.id} className="border rounded-md overflow-hidden">
                            <div className="bg-gray-50 p-4 flex justify-between items-center">
                              <div>
                                <p className="font-medium">Order #{order.id}</p>
                                <p className="text-sm text-gray-600">Tanggal: {order.date}</p>
                              </div>
                              <span className={`text-sm px-3 py-1 rounded-full ${
                                order.status === "delivered" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                              }`}>
                                {order.status === "delivered" ? "Dikirim" : "Diproses"}
                              </span>
                            </div>
                            <div className="p-4">
                              <h4 className="text-sm font-medium mb-2">Item</h4>
                              <div className="space-y-2 mb-4">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex justify-between items-center">
                                    <p className="text-sm">
                                      {item.quantity}x {item.name}
                                    </p>
                                    <p className="text-sm font-medium">
                                      {formatPrice(item.price * item.quantity)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="border-t pt-2 flex justify-between items-center">
                                <p className="font-medium">Total</p>
                                <p className="font-bold text-herb-primary">
                                  {formatPrice(order.total)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">Anda belum memiliki pesanan.</p>
                        <Link to="/store">
                          <Button className="bg-herb-primary hover:bg-herb-primary/90">
                            Mulai Belanja
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recipes">
                <Card>
                  <CardHeader>
                    <CardTitle>Resep Tersimpan</CardTitle>
                    <CardDescription>
                      Kumpulan resep herbal favorit Anda.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loadingRecipes ? (
                      <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-herb-primary border-t-transparent mx-auto"></div>
                        <p className="mt-4 text-herb-primary font-medium">Loading...</p>
                      </div>
                    ) : savedRecipes && savedRecipes.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {savedRecipes.map((recipe) => (
                          <div key={recipe.id} className="border rounded-md p-4">
                            <h3 className="font-medium mb-2">{recipe.name}</h3>
                            <div className="mb-3">
                              <p className="text-sm text-gray-600 mb-1">Bahan:</p>
                              <div className="flex flex-wrap gap-1">
                                {recipe.ingredients.map((ingredient, idx) => (
                                  <span key={idx} className="text-xs bg-herb-light text-herb-primary px-2 py-1 rounded-full">
                                    {ingredient}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">Disimpan pada: {recipe.dateAdded}</p>
                            <div className="mt-2 flex justify-end">
                              <Button variant="outline" size="sm">
                                Lihat Detail
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">Anda belum menyimpan resep apapun.</p>
                        <Link to="/mixer">
                          <Button className="bg-herb-primary hover:bg-herb-primary/90">
                            Jelajahi Peracik Herbal
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan Profil</CardTitle>
                    <CardDescription>
                      Perbarui informasi personal Anda.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            disabled
                          />
                          <p className="text-xs text-gray-500">Email tidak dapat diubah.</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Nomor Telepon</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            placeholder="08xxxxxxxxxx"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Alamat</Label>
                        <Textarea
                          id="address"
                          value={profile.address}
                          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                          placeholder="Masukkan alamat lengkap Anda"
                          rows={3}
                        />
                      </div>
                      
                      <Button type="submit" className="bg-herb-primary hover:bg-herb-primary/90">
                        Simpan Perubahan
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Preferensi Newsletter</CardTitle>
                    <CardDescription>
                      Kelola langganan newsletter Anda.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Newsletter Mingguan</p>
                          <p className="text-sm text-gray-600">Dapatkan tips herbal mingguan</p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promosi dan Diskon</p>
                          <p className="text-sm text-gray-600">Info penawaran spesial</p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Resep Baru</p>
                          <p className="text-sm text-gray-600">Notifikasi resep herbal terbaru</p>
                        </div>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </div>
                      
                      <Button 
                        className="mt-2"
                        onClick={() => {
                          toast({
                            title: "Preferensi diperbarui",
                            description: "Pengaturan newsletter Anda telah disimpan.",
                          });
                        }}
                      >
                        Simpan Preferensi
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
