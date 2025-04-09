
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileInput, Plus, Leaf } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const AdminInputData = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Data berhasil ditambahkan",
        description: "Informasi tanaman herbal baru telah disimpan.",
      });
      
      // Reset form - in a real app you'd use form state management
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1500);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
            <FileInput className="h-8 w-8" />
            Input Data Herbal
          </h1>
          <p className="text-muted-foreground">
            Tambahkan informasi lengkap tentang tanaman herbal baru.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Dasar</CardTitle>
                  <CardDescription>
                    Masukkan informasi dasar tentang tanaman herbal.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Tanaman</Label>
                      <Input 
                        id="name" 
                        placeholder="Contoh: Jahe, Kunyit"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scientific_name">Nama Ilmiah</Label>
                      <Input 
                        id="scientific_name" 
                        placeholder="Contoh: Zingiber officinale"
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="family">Famili</Label>
                    <Input 
                      id="family" 
                      placeholder="Contoh: Zingiberaceae" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Deskripsi lengkap tentang tanaman ini..."
                      rows={4}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Kategori</Label>
                    <RadioGroup defaultValue="herb">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="herb" id="herb" />
                          <Label htmlFor="herb">Herbal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="spice" id="spice" />
                          <Label htmlFor="spice">Rempah</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="tree" id="tree" />
                          <Label htmlFor="tree">Pohon</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="shrub" id="shrub" />
                          <Label htmlFor="shrub">Semak</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Lainnya</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label>Foto Tanaman</Label>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                        <div className="flex flex-col items-center justify-center py-4">
                          <Plus className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG atau WEBP (maks. 5MB)
                          </p>
                          <Input 
                            id="photo" 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="mt-4" 
                            onClick={() => document.getElementById('photo')?.click()}
                          >
                            Pilih File
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardHeader>
                  <CardTitle>Informasi Manfaat & Penggunaan</CardTitle>
                  <CardDescription>
                    Jelaskan manfaat dan cara penggunaan tanaman herbal ini.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="benefits">Manfaat Kesehatan</Label>
                    <Textarea 
                      id="benefits" 
                      placeholder="Jelaskan manfaat kesehatan dari tanaman ini..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="usages">Cara Penggunaan</Label>
                    <Textarea 
                      id="usages" 
                      placeholder="Jelaskan cara penggunaan tanaman ini..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="caution">Peringatan & Kontraindikasi</Label>
                    <Textarea 
                      id="caution" 
                      placeholder="Sebutkan peringatan atau kontraindikasi jika ada..."
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Sifat Tanaman</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="property-cooling" />
                        <Label htmlFor="property-cooling">Mendinginkan</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="property-warming" />
                        <Label htmlFor="property-warming">Menghangatkan</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="property-drying" />
                        <Label htmlFor="property-drying">Mengeringkan</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="property-moisturizing" />
                        <Label htmlFor="property-moisturizing">Melembabkan</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardHeader>
                  <CardTitle>Lokasi & Distribusi</CardTitle>
                  <CardDescription>
                    Informasi tentang asal dan distribusi tanaman.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="origin">Asal Tanaman</Label>
                      <Input 
                        id="origin" 
                        placeholder="Contoh: Asia Tenggara"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="distribution">Distribusi di Indonesia</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <span>Pilih provinsi...</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="grid gap-4">
                            <h4 className="font-medium leading-none">Provinsi</h4>
                            <div className="h-60 overflow-y-auto pr-4">
                              <div className="grid grid-cols-1 gap-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="jawa-barat" />
                                  <Label htmlFor="jawa-barat">Jawa Barat</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="jawa-tengah" />
                                  <Label htmlFor="jawa-tengah">Jawa Tengah</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="jawa-timur" />
                                  <Label htmlFor="jawa-timur">Jawa Timur</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="bali" />
                                  <Label htmlFor="bali">Bali</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="sumatra-utara" />
                                  <Label htmlFor="sumatra-utara">Sumatra Utara</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="sumatra-barat" />
                                  <Label htmlFor="sumatra-barat">Sumatra Barat</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="kalimantan-timur" />
                                  <Label htmlFor="kalimantan-timur">Kalimantan Timur</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="sulawesi-selatan" />
                                  <Label htmlFor="sulawesi-selatan">Sulawesi Selatan</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="papua" />
                                  <Label htmlFor="papua">Papua</Label>
                                </div>
                              </div>
                            </div>
                            <Button size="sm">Simpan</Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Simpan Draft</Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-herb-primary hover:bg-herb-primary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white mr-2"></span>
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Leaf className="mr-2 h-4 w-4" />
                        Simpan Data
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Panduan Input Data</CardTitle>
                <CardDescription>
                  Beberapa tips untuk input data yang baik.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium">Nama Tanaman</h3>
                  <p className="text-muted-foreground">
                    Gunakan nama lokal yang paling umum digunakan di Indonesia.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Nama Ilmiah</h3>
                  <p className="text-muted-foreground">
                    Gunakan format nama genus dan spesies dalam bahasa Latin dengan huruf miring.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Deskripsi</h3>
                  <p className="text-muted-foreground">
                    Jelaskan karakteristik fisik tanaman, tinggi, bentuk daun, bunga, dll.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Manfaat Kesehatan</h3>
                  <p className="text-muted-foreground">
                    Jelaskan manfaat yang didukung oleh penelitian ilmiah.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Foto</h3>
                  <p className="text-muted-foreground">
                    Upload foto berkualitas tinggi yang menampilkan tanaman secara jelas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInputData;
