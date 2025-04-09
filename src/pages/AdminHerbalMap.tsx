
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Map, 
  Plus, 
  Search,
  MapPin,
  X,
  Save,
  Info
} from "lucide-react";
import IndonesiaMap from "@/components/maps/IndonesiaMap";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Mock herb distribution data
const herbDistributionData = [
  { id: 1, name: "Jahe", locations: ["Jawa", "Sumatra", "Kalimantan", "Sulawesi"], description: "Jahe (Zingiber officinale) adalah rimpang yang sering digunakan sebagai bumbu masak dan bahan pengobatan tradisional." },
  { id: 2, name: "Kunyit", locations: ["Jawa", "Bali", "Sumatra", "Sulawesi", "Papua"], description: "Kunyit (Curcuma longa) mengandung kurkumin yang memiliki sifat anti-inflamasi dan antioksidan." },
  { id: 3, name: "Temulawak", locations: ["Jawa", "Sumatra"], description: "Temulawak (Curcuma xanthorrhiza) sering digunakan untuk meningkatkan nafsu makan dan menjaga kesehatan hati." },
  { id: 4, name: "Kencur", locations: ["Jawa", "Bali", "Sumatra"], description: "Kencur (Kaempferia galanga) memiliki aroma khas dan digunakan untuk mengatasi batuk dan masalah pernapasan." },
  { id: 5, name: "Kapulaga", locations: ["Jawa"], description: "Kapulaga (Elettaria cardamomum) adalah rempah aromatik yang digunakan sebagai bumbu dan obat tradisional." },
  { id: 6, name: "Serai", locations: ["Jawa", "Sumatra", "Sulawesi", "Kalimantan", "Papua"], description: "Serai (Cymbopogon citratus) memiliki aroma sitrus yang kuat dan digunakan sebagai bumbu dapur dan minyak esensial." },
  { id: 7, name: "Daun Salam", locations: ["Jawa", "Sumatra", "Kalimantan"], description: "Daun Salam (Syzygium polyanthum) sering digunakan untuk menurunkan kolesterol dan tekanan darah tinggi." },
  { id: 8, name: "Buah Merah", locations: ["Papua"], description: "Buah Merah (Pandanus conoideus) kaya akan antioksidan dan digunakan untuk meningkatkan daya tahan tubuh." },
];

// Define region data interface
interface RegionData {
  name: string;
  herbs: string[];
  description?: string;
}

const AdminHerbalMap = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHerb, setSelectedHerb] = useState<typeof herbDistributionData[0] | null>(null);
  const [newLocation, setNewLocation] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isAddHerbDialogOpen, setIsAddHerbDialogOpen] = useState(false);
  const [newHerb, setNewHerb] = useState({ name: "", description: "", locations: [] as string[] });
  
  // Filter herbs based on search term
  const filteredHerbs = herbDistributionData.filter(
    herb => herb.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Generate region data for the map
  const generateRegionData = () => {
    const regions: Record<string, RegionData> = {
      "Sumatra": { name: "Sumatra", herbs: [], description: "Pulau dengan keanekaragaman herbal yang tinggi" },
      "Jawa": { name: "Jawa", herbs: [], description: "Pusat budidaya tanaman herbal tradisional di Indonesia" },
      "Kalimantan": { name: "Kalimantan", herbs: [], description: "Hutan hujan dengan banyak tanaman obat endemik" },
      "Sulawesi": { name: "Sulawesi", herbs: [], description: "Memiliki berbagai tanaman herbal unik" },
      "Papua": { name: "Papua", herbs: [], description: "Kaya akan tanaman herbal endemik dengan khasiat khusus" },
      "Bali": { name: "Bali", herbs: [], description: "Pulau dengan tradisi pengobatan herbal yang kuat" },
    };

    // Populate with herb data
    herbDistributionData.forEach(herb => {
      herb.locations.forEach(location => {
        if (regions[location]) {
          regions[location].herbs.push(herb.name);
        }
      });
    });

    return regions;
  };
  
  const handleSelectHerb = (herb: typeof herbDistributionData[0]) => {
    setSelectedHerb(herb);
  };
  
  const handleAddLocation = () => {
    if (!selectedHerb) return;
    if (!newLocation || selectedHerb.locations.includes(newLocation)) {
      toast({
        title: "Tidak dapat menambahkan lokasi",
        description: newLocation 
          ? "Lokasi ini sudah ada dalam daftar"
          : "Silakan pilih lokasi terlebih dahulu",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would update the backend here
    const updatedHerb = {
      ...selectedHerb,
      locations: [...selectedHerb.locations, newLocation]
    };
    
    // Update the local state (simulating database update)
    const updatedData = herbDistributionData.map(herb => 
      herb.id === selectedHerb.id ? updatedHerb : herb
    );
    
    // For demo purposes, we'll directly update the herbDistributionData
    herbDistributionData.splice(0, herbDistributionData.length, ...updatedData);
    
    setSelectedHerb(updatedHerb);
    setNewLocation("");
    
    toast({
      title: "Lokasi ditambahkan",
      description: `${newLocation} telah ditambahkan ke daftar lokasi untuk ${selectedHerb.name}.`,
    });
  };
  
  const handleRemoveLocation = (location: string) => {
    if (!selectedHerb) return;
    
    // In a real app, we would update the backend here
    const updatedHerb = {
      ...selectedHerb,
      locations: selectedHerb.locations.filter(loc => loc !== location)
    };
    
    // Update the local state (simulating database update)
    const updatedData = herbDistributionData.map(herb => 
      herb.id === selectedHerb.id ? updatedHerb : herb
    );
    
    // For demo purposes, we'll directly update the herbDistributionData
    herbDistributionData.splice(0, herbDistributionData.length, ...updatedData);
    
    setSelectedHerb(updatedHerb);
    
    toast({
      title: "Lokasi dihapus",
      description: `${location} telah dihapus dari daftar lokasi untuk ${selectedHerb.name}.`,
    });
  };
  
  const handleAddNewHerb = () => {
    if (!newHerb.name || !newHerb.description) {
      toast({
        title: "Data tidak lengkap",
        description: "Silakan isi nama dan deskripsi tanaman",
        variant: "destructive"
      });
      return;
    }
    
    const newId = Math.max(...herbDistributionData.map(h => h.id)) + 1;
    const herbToAdd = {
      ...newHerb,
      id: newId
    };
    
    // Add to the data (in a real app, this would be a backend call)
    herbDistributionData.push(herbToAdd);
    
    setNewHerb({ name: "", description: "", locations: [] });
    setIsAddHerbDialogOpen(false);
    
    toast({
      title: "Tanaman ditambahkan",
      description: `${herbToAdd.name} telah berhasil ditambahkan.`,
    });
  };
  
  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
    
    if (selectedHerb && !selectedHerb.locations.includes(region)) {
      setNewLocation(region);
    }
    
    toast({
      title: `Region ${region} dipilih`,
      description: "Klik 'Tambah' untuk menambahkan region ini ke tanaman yang dipilih.",
    });
  };
  
  const toggleRegionInNewHerb = (region: string) => {
    if (newHerb.locations.includes(region)) {
      setNewHerb(prev => ({
        ...prev,
        locations: prev.locations.filter(r => r !== region)
      }));
    } else {
      setNewHerb(prev => ({
        ...prev,
        locations: [...prev.locations, region]
      }));
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
            <Map className="h-8 w-8" />
            Peta Herbal Indonesia
          </h1>
          <p className="text-muted-foreground">
            Kelola dan visualisasikan distribusi tanaman herbal di Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Daftar Tanaman</CardTitle>
                <CardDescription>
                  Pilih tanaman untuk melihat distribusinya di peta.
                </CardDescription>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari tanaman herbal..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] overflow-y-auto pr-2">
                  <div className="space-y-2">
                    {filteredHerbs.map((herb) => (
                      <div 
                        key={herb.id}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedHerb?.id === herb.id 
                          ? 'bg-herb-primary/10 border-herb-primary' 
                          : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => handleSelectHerb(herb)}
                      >
                        <h3 className="font-medium">{herb.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {herb.locations.length} lokasi
                        </p>
                      </div>
                    ))}
                    
                    {filteredHerbs.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        Tidak ada tanaman yang ditemukan.
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="map" className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <TabsList>
                  <TabsTrigger value="map">Peta</TabsTrigger>
                  <TabsTrigger value="edit">Edit Lokasi</TabsTrigger>
                </TabsList>
                
                <Dialog open={isAddHerbDialogOpen} onOpenChange={setIsAddHerbDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      className="bg-herb-primary hover:bg-herb-primary/90"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah Tanaman
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Tambah Tanaman Herbal Baru</DialogTitle>
                      <DialogDescription>
                        Masukkan informasi tentang tanaman herbal yang ingin ditambahkan.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="herb-name">Nama Tanaman</Label>
                        <Input 
                          id="herb-name" 
                          placeholder="Contoh: Jahe Merah"
                          value={newHerb.name}
                          onChange={e => setNewHerb({...newHerb, name: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="herb-desc">Deskripsi</Label>
                        <Textarea 
                          id="herb-desc" 
                          placeholder="Jelaskan tentang tanaman dan manfaatnya"
                          value={newHerb.description}
                          onChange={e => setNewHerb({...newHerb, description: e.target.value})}
                          rows={4}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Lokasi</Label>
                        <div className="flex flex-wrap gap-2">
                          {["Sumatra", "Jawa", "Bali", "Kalimantan", "Sulawesi", "Papua"].map(region => (
                            <Button
                              key={region}
                              type="button"
                              variant={newHerb.locations.includes(region) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleRegionInNewHerb(region)}
                            >
                              {region}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsAddHerbDialogOpen(false)}
                      >
                        Batal
                      </Button>
                      <Button onClick={handleAddNewHerb}>
                        <Save className="mr-2 h-4 w-4" />
                        Simpan
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <TabsContent value="map" className="flex-grow">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="aspect-[4/3] w-full bg-slate-50 rounded-md overflow-hidden">
                      <IndonesiaMap 
                        selectedRegions={selectedHerb?.locations || []} 
                        title={selectedHerb 
                          ? `Distribusi ${selectedHerb.name} di Indonesia` 
                          : "Pilih tanaman untuk melihat distribusinya"}
                        regionData={generateRegionData()}
                        onRegionClick={handleRegionClick}
                      />
                    </div>
                    
                    {selectedHerb && (
                      <div className="mt-4 p-4 border rounded-md">
                        <h3 className="font-medium text-lg flex items-center gap-2">
                          <Info className="h-5 w-5 text-herb-primary" />
                          Informasi {selectedHerb.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {selectedHerb.description || "Tidak ada deskripsi tersedia."}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="edit">
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Lokasi Tanaman</CardTitle>
                    <CardDescription>
                      {selectedHerb 
                        ? `Tambah atau hapus lokasi untuk ${selectedHerb.name}` 
                        : "Pilih tanaman terlebih dahulu untuk mengedit lokasinya"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedHerb ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Lokasi Saat Ini</Label>
                          <div className="flex flex-wrap gap-2">
                            {selectedHerb.locations.map((location) => (
                              <div 
                                key={location} 
                                className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                              >
                                {location}
                                <button 
                                  className="ml-1 text-gray-500 hover:text-red-500"
                                  onClick={() => handleRemoveLocation(location)}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                            
                            {selectedHerb.locations.length === 0 && (
                              <p className="text-sm text-muted-foreground">
                                Tidak ada lokasi tersedia
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2 pt-4">
                          <Label htmlFor="new-location">Tambah Lokasi Baru</Label>
                          <div className="flex gap-2">
                            <select
                              id="new-location"
                              value={newLocation}
                              onChange={(e) => setNewLocation(e.target.value)}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="">Pilih lokasi...</option>
                              {["Sumatra", "Jawa", "Bali", "Kalimantan", "Sulawesi", "Papua"]
                                .filter(loc => !selectedHerb.locations.includes(loc))
                                .map(loc => (
                                  <option key={loc} value={loc}>{loc}</option>
                                ))
                              }
                            </select>
                            <Button 
                              onClick={handleAddLocation}
                              disabled={!newLocation}
                            >
                              Tambah
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Tip: Anda juga dapat mengklik area pada peta untuk memilih lokasi
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 text-center text-muted-foreground">
                        Pilih tanaman dari daftar untuk mengedit lokasinya.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminHerbalMap;
