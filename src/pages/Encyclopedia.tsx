
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { herbs, Herb } from "@/data/herbs";

// Ekstrak semua kategori unik dari herbal
const extractCategories = () => {
  const categoriesSet = new Set<string>();
  
  herbs.forEach(herb => {
    herb.categories.forEach(category => {
      categoriesSet.add(category);
    });
  });
  
  return Array.from(categoriesSet).sort();
};

const Encyclopedia = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filteredHerbs, setFilteredHerbs] = useState<Herb[]>(herbs);
  const categories = extractCategories();

  // Filter dan urutkan herbal berdasarkan query pencarian, kategori, dan arah pengurutan
  useEffect(() => {
    let result = [...herbs];
    
    // Filter berdasarkan kata kunci
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        herb => 
          herb.name.toLowerCase().includes(query) || 
          herb.latinName.toLowerCase().includes(query) ||
          herb.description.toLowerCase().includes(query)
      );
    }
    
    // Filter berdasarkan kategori
    if (selectedCategory) {
      result = result.filter(herb => 
        herb.categories.includes(selectedCategory)
      );
    }
    
    // Urutkan secara alfabetis
    result = result.sort((a, b) => {
      return sortDirection === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    });
    
    setFilteredHerbs(result);
  }, [searchQuery, selectedCategory, sortDirection]);

  // Ubah arah pengurutan
  const toggleSortDirection = () => {
    setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
  };

  // Hapus semua filter
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSortDirection("asc");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-herb-primary mb-2">Ensiklopedia Herbal</h1>
          <p className="text-gray-600">
            Jelajahi database komprehensif herbal kami dan temukan manfaat, penggunaan, dan metode persiapannya.
          </p>
        </div>
        
        {/* Bagian Pencarian dan Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Pencarian */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari herbal berdasarkan nama atau sifat..."
                className="pl-10 herb-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filter kategori */}
            <div className="flex-shrink-0">
              <div className="relative">
                <select 
                  className="herb-input pr-10 appearance-none bg-white"
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  aria-label="Filter berdasarkan kategori"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            {/* Tombol pengurutan */}
            <Button 
              variant="outline" 
              onClick={toggleSortDirection}
              className="flex-shrink-0"
            >
              <ArrowUpDown className="mr-2 h-4 w-4" />
              {sortDirection === "asc" ? "A sampai Z" : "Z sampai A"}
            </Button>
            
            {/* Hapus filter */}
            <Button 
              variant="ghost" 
              onClick={clearFilters}
              className="flex-shrink-0"
            >
              Hapus
            </Button>
          </div>
          
          {/* Filter aktif */}
          {(searchQuery || selectedCategory) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="outline" className="bg-herb-light/50 text-herb-primary">
                  Pencarian: {searchQuery}
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="outline" className="bg-herb-light/50 text-herb-primary">
                  Kategori: {selectedCategory}
                </Badge>
              )}
            </div>
          )}
        </div>
        
        {/* Jumlah hasil */}
        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan {filteredHerbs.length} {filteredHerbs.length === 1 ? "herbal" : "herbal"}
          </p>
        </div>
        
        {/* Grid Herbal */}
        {filteredHerbs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHerbs.map((herb) => (
              <Link key={herb.id} to={`/encyclopedia/${herb.id}`}>
                <Card className="hover:border-herb-secondary hover:shadow-md transition-all duration-200 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-herb-primary">{herb.name}</CardTitle>
                    <CardDescription className="italic">{herb.latinName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-2">{herb.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {herb.categories.slice(0, 3).map((category, index) => (
                        <Badge key={index} variant="secondary" className="bg-herb-light text-herb-primary">
                          {category}
                        </Badge>
                      ))}
                      {herb.categories.length > 3 && (
                        <Badge variant="outline">+{herb.categories.length - 3}</Badge>
                      )}
                    </div>
                    <div className="mt-4 flex items-center text-sm text-herb-secondary">
                      Lihat detail
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Tidak ada herbal yang cocok dengan kriteria Anda.</p>
            <Button onClick={clearFilters} variant="link" className="text-herb-primary mt-2">
              Hapus semua filter
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Encyclopedia;
