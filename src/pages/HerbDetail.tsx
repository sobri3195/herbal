
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, AlertTriangle, Leaf, Users, FlaskConical, Shield } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { herbs, Herb, drugHerbInteractions } from "@/data/herbs";

const HerbDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [herb, setHerb] = useState<Herb | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const foundHerb = herbs.find(h => h.id === id);
      setHerb(foundHerb || null);
      setLoading(false);
    }
  }, [id]);

  // Temukan interaksi obat untuk herbal ini
  const herbDrugInteractions = drugHerbInteractions.filter(
    interaction => interaction.herb === id
  );

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <p>Memuat informasi herbal...</p>
        </div>
      </Layout>
    );
  }

  if (!herb) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-herb-primary mb-4">Herbal Tidak Ditemukan</h2>
          <p className="mb-6">Herbal yang Anda cari tidak ada dalam database kami.</p>
          <Button 
            variant="default" 
            className="bg-herb-primary"
            onClick={() => navigate("/encyclopedia")}
          >
            Kembali ke Ensiklopedia
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigasi */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="text-herb-primary hover:text-herb-primary/80"
            onClick={() => navigate("/encyclopedia")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Ensiklopedia
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Konten utama - 2/3 lebar pada desktop */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-herb-primary mb-2">{herb.name}</h1>
              <p className="text-gray-500 italic mb-4">{herb.latinName}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {herb.categories.map((category, index) => (
                  <Badge key={index} variant="secondary" className="bg-herb-light text-herb-primary">
                    {category}
                  </Badge>
                ))}
              </div>
              
              <p className="text-gray-700">{herb.description}</p>
            </div>
            
            {/* Tabs konten utama */}
            <Tabs defaultValue="benefits" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="benefits" className="flex items-center gap-1">
                  <Leaf className="h-4 w-4" />
                  <span className="hidden sm:inline">Manfaat</span>
                </TabsTrigger>
                <TabsTrigger value="dosage" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Dosis</span>
                </TabsTrigger>
                <TabsTrigger value="preparation" className="flex items-center gap-1">
                  <FlaskConical className="h-4 w-4" />
                  <span className="hidden sm:inline">Persiapan</span>
                </TabsTrigger>
                <TabsTrigger value="safety" className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Keamanan</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="benefits" className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-bold text-herb-primary mb-4">Manfaat Kesehatan</h2>
                <ul className="space-y-2">
                  {herb.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block bg-herb-light rounded-full p-1 mr-3 mt-1">
                        <Leaf className="h-3 w-3 text-herb-primary" />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="dosage" className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-bold text-herb-primary mb-4">Dosis yang Direkomendasikan</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-herb-dark mb-2">Dewasa</h3>
                    <p>{herb.dosage.adult}</p>
                  </div>
                  
                  {herb.dosage.child && (
                    <div>
                      <h3 className="font-semibold text-herb-dark mb-2">Anak-anak</h3>
                      <p>{herb.dosage.child}</p>
                    </div>
                  )}
                  
                  {herb.dosage.elderly && (
                    <div>
                      <h3 className="font-semibold text-herb-dark mb-2">Lansia</h3>
                      <p>{herb.dosage.elderly}</p>
                    </div>
                  )}
                  
                  {herb.dosage.pregnant && (
                    <div>
                      <h3 className="font-semibold text-herb-dark mb-2">Kehamilan</h3>
                      <p>{herb.dosage.pregnant}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 bg-yellow-50 border border-yellow-100 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Dosis ini merupakan panduan umum. Selalu konsultasikan dengan profesional kesehatan sebelum
                      memulai suplemen herbal apa pun, terutama jika Anda memiliki kondisi kesehatan yang ada atau sedang
                      mengonsumsi obat.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="preparation" className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-bold text-herb-primary mb-4">Metode Persiapan</h2>
                
                <ul className="space-y-4">
                  {herb.preparation.map((method, index) => (
                    <li key={index} className="bg-herb-light/30 p-4 rounded-lg">
                      <p>{method}</p>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6">
                  <Button asChild className="bg-herb-primary hover:bg-herb-primary/90">
                    <Link to="/preparation">
                      <FlaskConical className="mr-2 h-4 w-4" />
                      Lihat Panduan Persiapan Terperinci
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="safety" className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-bold text-herb-primary mb-4">Informasi Keamanan</h2>
                
                <div className="space-y-6">
                  {herb.sideEffects.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-herb-dark mb-2">Efek Samping Potensial</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {herb.sideEffects.map((effect, index) => (
                          <li key={index}>{effect}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {herb.warnings.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-herb-dark mb-2">Peringatan</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {herb.warnings.map((warning, index) => (
                          <li key={index}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {herb.interactions.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-herb-dark mb-2">Interaksi Herbal yang Diketahui</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {herb.interactions.map((interaction, index) => (
                          <li key={index}>{interaction}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {herbDrugInteractions.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-herb-dark mb-2">Interaksi dengan Obat</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {herbDrugInteractions.map((interaction, index) => (
                          <li key={index} className={`
                            ${interaction.effect === "major" ? "text-red-700" : 
                              interaction.effect === "moderate" ? "text-amber-700" : "text-blue-700"}
                          `}>
                            <span className="font-medium">{interaction.drug}</span>: {interaction.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 bg-red-50 border border-red-100 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Informasi ini hanya untuk tujuan pendidikan dan tidak dimaksudkan untuk menggantikan
                      saran medis profesional. Selalu konsultasikan dengan profesional kesehatan sebelum
                      menggunakan obat herbal, terutama jika Anda memiliki kondisi kesehatan yang ada, sedang
                      hamil atau menyusui, atau sedang mengonsumsi obat.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar - 1/3 lebar pada desktop */}
          <div className="lg:col-span-1">
            {/* Gambar Herbal */}
            <div className="bg-white rounded-lg border p-4 mb-6">
              <div className="bg-herb-light/50 rounded-lg h-48 overflow-hidden">
                <img 
                  src={herb.image} 
                  alt={herb.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            
            {/* Tindakan Cepat */}
            <div className="bg-white rounded-lg border p-4 mb-6">
              <h3 className="text-lg font-semibold text-herb-primary mb-3">Tindakan Cepat</h3>
              <div className="space-y-3">
                <Button asChild className="w-full justify-start bg-herb-primary hover:bg-herb-primary/90">
                  <Link to={`/mixer?add=${herb.id}`}>
                    <FlaskConical className="mr-2 h-4 w-4" />
                    Tambahkan ke Peracik Herbal
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    // Fungsi ekspor PDF akan ditambahkan di sini
                    alert("Fungsi ekspor akan diimplementasikan pada pembaruan mendatang");
                  }}>
                    <FileText className="mr-2 h-4 w-4" />
                    Ekspor Informasi (PDF)
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Herbal Terkait - akan diimplementasikan dalam aplikasi nyata */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="text-lg font-semibold text-herb-primary mb-3">Herbal Terkait</h3>
              <p className="text-gray-600 text-sm">
                Herbal dengan sifat dan manfaat serupa akan ditampilkan di sini pada aplikasi lengkap.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HerbDetail;
