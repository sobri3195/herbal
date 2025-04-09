
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { conditions, Condition, Remedy } from "@/data/herbs";
import { Search, BookOpen, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Remedies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Filter kondisi berdasarkan kata kunci pencarian dan tab aktif
  const filteredConditions = conditions.filter(condition => {
    const matchesSearch = 
      condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      condition.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeTab === "all") return matchesSearch;
    
    // Untuk tab kategori, kita dapat memfilter berdasarkan kategori kondisi jika kita memiliki data tersebut
    return matchesSearch;
  });

  return (
    <Layout className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-herb-primary mb-2">Ramuan Herbal</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan ramuan herbal tradisional untuk kondisi kesehatan umum. Setiap ramuan menggabungkan 
            herbal yang saling melengkapi untuk manfaat dan penyembuhan optimal.
          </p>
        </div>

        {/* Pencarian dan filter */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 bg-white"
              placeholder="Cari kondisi atau ramuan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mt-4"
          >
            <TabsList className="grid grid-cols-4 sm:grid-cols-4">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="digestive">Pencernaan</TabsTrigger>
              <TabsTrigger value="stress">Stres/Tidur</TabsTrigger>
              <TabsTrigger value="pain">Pereda Nyeri</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Hasil */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConditions.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">Tidak ada kondisi yang cocok dengan pencarian Anda.</p>
              <Button 
                variant="secondary"
                onClick={() => {
                  setSearchTerm("");
                  setActiveTab("all");
                }}
              >
                Hapus Pencarian
              </Button>
            </div>
          ) : (
            filteredConditions.map((condition) => (
              <ConditionCard key={condition.id} condition={condition} />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

const ConditionCard = ({ condition }: { condition: Condition }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="bg-herb-light/30 pb-2">
        <CardTitle className="text-herb-primary text-xl">{condition.name}</CardTitle>
        <CardDescription className="text-sm">{condition.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {condition.remedies.map((remedy) => (
            <div key={remedy.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <h4 className="font-medium text-herb-secondary mb-1 flex items-center">
                <Heart className="h-4 w-4 mr-1 text-herb-primary" /> {remedy.name}
              </h4>
              <p className="text-sm text-gray-600 mb-2">Menggunakan: {remedy.herbs.length} herbal</p>
              <p className="text-sm text-gray-700">{remedy.preparation.substring(0, 100)}...</p>
              <div className="mt-2 flex justify-end">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="text-xs" 
                  asChild
                >
                  <Link to={`/mixer?remedy=${remedy.id}`}>
                    Lihat Detail
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Remedies;
