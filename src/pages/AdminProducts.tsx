
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock products data (same as in Store.tsx)
const mockProducts = [
  {
    id: "1",
    name: "Jahe Merah Bubuk Premium",
    price: 35000,
    description: "Bubuk jahe merah organik dengan kualitas premium.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 50,
    category: "bubuk",
  },
  {
    id: "2",
    name: "Teh Herbal Temulawak",
    price: 28000,
    description: "Teh herbal temulawak untuk kesehatan pencernaan.",
    image: "https://images.unsplash.com/photo-1563911892437-1feda0077a6b?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 30,
    category: "teh",
  },
  {
    id: "3",
    name: "Minyak Esensial Serai",
    price: 85000,
    description: "Minyak esensial serai murni untuk aromaterapi.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 15,
    category: "minyak",
  },
  {
    id: "4",
    name: "Ramuan Jamu Kunyit Asam",
    price: 25000,
    description: "Ramuan tradisional kunyit asam untuk penyegaran.",
    image: "https://images.unsplash.com/photo-1597690560324-8cdcb6df35f1?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 40,
    category: "ramuan",
  },
  {
    id: "5",
    name: "Kapsul Ekstrak Daun Sirsak",
    price: 120000,
    description: "Kapsul herbal ekstrak daun sirsak untuk imunitas.",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 25,
    category: "kapsul",
  },
  {
    id: "6",
    name: "Bubuk Kayu Manis Organik",
    price: 32000,
    description: "Bubuk kayu manis organik untuk masakan dan minuman.",
    image: "https://images.unsplash.com/photo-1588391758749-a4e9d824cebc?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 35,
    category: "bubuk",
  },
];

const categories = [
  { value: "bubuk", label: "Bubuk Herbal" },
  { value: "teh", label: "Teh Herbal" },
  { value: "minyak", label: "Minyak Esensial" },
  { value: "ramuan", label: "Ramuan Jamu" },
  { value: "kapsul", label: "Kapsul Herbal" },
];

interface ProductFormData {
  id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  category: string;
}

const AdminProducts = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductFormData | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    description: "",
    image: "",
    stock: 0,
    category: "",
  });

  // Fetch products
  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockProducts;
    },
  });

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setFormData({
      name: "",
      price: 0,
      description: "",
      image: "",
      stock: 0,
      category: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: typeof mockProducts[0]) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      stock: product.stock,
      category: product.category,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setProductToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In a real app, you would make an API call to delete the product
    if (productToDelete) {
      toast({
        title: "Produk dihapus",
        description: "Produk berhasil dihapus dari katalog.",
      });
    }
    setIsDeleteDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.description || !formData.image) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon lengkapi semua data produk.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would make an API call to create or update the product
    if (currentProduct) {
      // Update existing product
      toast({
        title: "Produk diperbarui",
        description: `Produk "${formData.name}" berhasil diperbarui.`,
      });
    } else {
      // Create new product
      toast({
        title: "Produk ditambahkan",
        description: `Produk "${formData.name}" berhasil ditambahkan.`,
      });
    }
    
    setIsDialogOpen(false);
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
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Store className="h-8 w-8 text-herb-primary mr-3" />
          <h1 className="text-3xl font-bold">Manajemen Produk</h1>
        </div>
        <Button onClick={handleAddProduct} className="bg-herb-primary hover:bg-herb-primary/90">
          <Plus className="h-5 w-5 mr-1" /> Tambah Produk
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Kelola Produk Herbal</CardTitle>
          <CardDescription>
            Tambah, edit, dan hapus produk dari katalog toko.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="products">Produk</TabsTrigger>
              <TabsTrigger value="categories">Kategori</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-herb-primary border-t-transparent mx-auto"></div>
                  <p className="mt-4 text-herb-primary font-medium">Loading...</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Gambar</TableHead>
                        <TableHead>Nama Produk</TableHead>
                        <TableHead>Harga</TableHead>
                        <TableHead>Stok</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products?.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="w-10 h-10 rounded overflow-hidden">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{formatPrice(product.price)}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell className="capitalize">{product.category}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="categories">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Kategori</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Jumlah Produk</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.value}>
                        <TableCell className="font-medium">{category.label}</TableCell>
                        <TableCell>{category.value}</TableCell>
                        <TableCell>
                          {products?.filter(p => p.category === category.value).length || 0}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Fitur dalam pengembangan",
                                description: "Pengelolaan kategori akan segera tersedia.",
                              });
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentProduct ? "Edit Produk" : "Tambah Produk Baru"}
            </DialogTitle>
            <DialogDescription>
              {currentProduct
                ? "Perbarui informasi produk di katalog toko."
                : "Tambahkan produk baru ke katalog toko."}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Produk</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Pilih kategori" />
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Harga (Rp)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stok</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">URL Gambar</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                required
              />
              {formData.image && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                  <img
                    src={formData.image}
                    alt="Product preview"
                    className="h-20 w-20 object-cover rounded"
                    onError={() => {
                      toast({
                        title: "Error gambar",
                        description: "URL gambar tidak valid atau tidak dapat diakses.",
                        variant: "destructive",
                      });
                    }}
                  />
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" className="bg-herb-primary hover:bg-herb-primary/90">
                {currentProduct ? "Perbarui" : "Tambahkan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button 
              onClick={confirmDelete} 
              variant="destructive"
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProducts;
