
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { preparationMethods, PreparationMethod } from "@/data/herbs";
import { Search, FlaskConical, CheckCircle } from "lucide-react";

const Preparation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMethod, setActiveMethod] = useState<PreparationMethod | null>(null);

  // Filter metode berdasarkan kata kunci pencarian
  const filteredMethods = preparationMethods.filter(method =>
    method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    method.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-herb-primary mb-2">Metode Persiapan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pelajari cara menyiapkan herbal dengan benar untuk memaksimalkan manfaat terapeutiknya. 
            Setiap metode cocok untuk herbal dan aplikasi kesehatan tertentu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Cari metode persiapan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                {filteredMethods.map((method) => (
                  <Button
                    key={method.id}
                    variant={activeMethod?.id === method.id ? "default" : "secondary"}
                    className={`w-full justify-start ${activeMethod?.id === method.id ? "bg-herb-primary" : ""}`}
                    onClick={() => setActiveMethod(method)}
                  >
                    <FlaskConical className="mr-2 h-4 w-4" />
                    {method.name}
                  </Button>
                ))}
                
                {filteredMethods.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-gray-500 mb-2">Tidak ada metode yang ditemukan.</p>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => setSearchTerm("")}
                    >
                      Hapus Pencarian
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Konten utama */}
          <div className="lg:col-span-2">
            {activeMethod ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-herb-primary">
                    <FlaskConical className="mr-2 h-5 w-5" />
                    {activeMethod.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-gray-700">{activeMethod.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-herb-secondary mb-3">Instruksi Langkah-demi-Langkah</h3>
                    <div className="space-y-3">
                      {activeMethod.steps.map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-herb-light rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            <span className="text-sm text-herb-primary font-medium">{index + 1}</span>
                          </div>
                          <p className="text-gray-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-herb-secondary mb-3">Tips Membantu</h3>
                    <div className="bg-herb-light/30 rounded-lg p-4">
                      <ul className="space-y-2">
                        {activeMethod.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-herb-primary mr-2 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-herb-secondary mb-3">Herbal yang Cocok</h3>
                    <div className="flex flex-wrap gap-2">
                      {activeMethod.suitableHerbs.map((herbId) => {
                        // Temukan nama herbal berdasarkan ID
                        // Ini akan lebih efisien dengan pencarian map
                        const herbName = herbId.charAt(0).toUpperCase() + herbId.slice(1);
                        return (
                          <Button 
                            key={herbId} 
                            variant="secondary"
                            size="sm"
                            className="bg-herb-light text-herb-primary"
                          >
                            {herbName}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-end">
                  <Button className="bg-herb-primary hover:bg-herb-primary/90">
                    Unduh Instruksi
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <FlaskConical className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-herb-primary mb-2">Pilih Metode Persiapan</h3>
                <p className="text-gray-600">
                  Pilih metode persiapan dari daftar untuk melihat instruksi 
                  detail dan tips untuk menyiapkan ramuan herbal Anda.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Preparation;
