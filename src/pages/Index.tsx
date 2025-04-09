
import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, BookOpen, BeakerIcon, Heart, Coffee, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { herbs, conditions } from "@/data/herbs";

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("popular");
  
  const featuredHerbs = herbs.slice(0, 3);
  const popularConditions = conditions.slice(0, 4);

  return (
    <Layout>
      {/* Bagian Hero */}
      <section className="bg-gradient-to-br from-herb-primary to-herb-secondary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Temukan Kekuatan Obat Herbal
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Racik herbal, jelajahi manfaatnya, dan temukan pengobatan alami untuk kebutuhan kesehatan Anda
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-herb-primary hover:bg-herb-light">
                <Link to="/mixer">
                  <BeakerIcon className="mr-2 h-5 w-5" />
                  Coba Peracik Herbal
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/encyclopedia">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Jelajahi Ensiklopedia
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian Fitur */}
      <section className="py-16 bg-herb-light/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-herb-primary mb-4">Panduan Kesehatan Herbal Anda</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Temukan pengetahuan herbal tradisional yang dikombinasikan dengan penelitian modern untuk perjalanan kesehatan dan kesejahteraan Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="herb-card text-center group hover:border-herb-secondary transition-all">
              <div className="bg-herb-light/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-herb-secondary/20 transition-colors">
                <BeakerIcon className="h-8 w-8 text-herb-primary" />
              </div>
              <h3 className="text-xl font-bold text-herb-primary mb-2">Peracik Herbal</h3>
              <p className="text-gray-600 mb-4">
                Buat campuran herbal kustom dan temukan manfaat gabungan serta kemungkinan interaksinya.
              </p>
              <Button asChild variant="link" className="text-herb-primary hover:text-herb-secondary">
                <Link to="/mixer" className="inline-flex items-center">
                  Coba Peracik <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            
            <div className="herb-card text-center group hover:border-herb-secondary transition-all">
              <div className="bg-herb-light/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-herb-secondary/20 transition-colors">
                <BookOpen className="h-8 w-8 text-herb-primary" />
              </div>
              <h3 className="text-xl font-bold text-herb-primary mb-2">Ensiklopedia Herbal</h3>
              <p className="text-gray-600 mb-4">
                Database komprehensif tentang herbal dengan informasi terperinci tentang manfaat, dosis, dan metode persiapan.
              </p>
              <Button asChild variant="link" className="text-herb-primary hover:text-herb-secondary">
                <Link to="/encyclopedia" className="inline-flex items-center">
                  Jelajahi Herbal <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            
            <div className="herb-card text-center group hover:border-herb-secondary transition-all">
              <div className="bg-herb-light/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-herb-secondary/20 transition-colors">
                <Heart className="h-8 w-8 text-herb-primary" />
              </div>
              <h3 className="text-xl font-bold text-herb-primary mb-2">Pencari Ramuan</h3>
              <p className="text-gray-600 mb-4">
                Temukan ramuan herbal alami berdasarkan masalah dan kondisi kesehatan spesifik Anda.
              </p>
              <Button asChild variant="link" className="text-herb-primary hover:text-herb-secondary">
                <Link to="/remedies" className="inline-flex items-center">
                  Temukan Ramuan <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian Konten Unggulan */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-herb-primary">Temukan Pengetahuan Herbal</h2>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Button
                variant={activeTab === "popular" ? "default" : "outline"}
                size="sm"
                className={activeTab === "popular" ? "bg-herb-primary" : ""}
                onClick={() => setActiveTab("popular")}
              >
                Ramuan Populer
              </Button>
              <Button
                variant={activeTab === "featured" ? "default" : "outline"}
                size="sm"
                className={activeTab === "featured" ? "bg-herb-primary" : ""}
                onClick={() => setActiveTab("featured")}
              >
                Herbal Unggulan
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTab === "popular" ? (
              popularConditions.map((condition) => (
                <Link 
                  to={`/remedies/${condition.id}`} 
                  key={condition.id}
                  className="herb-card group hover:border-herb-secondary hover:-translate-y-1"
                >
                  <h3 className="text-xl font-bold text-herb-primary mb-2 group-hover:text-herb-secondary">
                    {condition.name}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{condition.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {condition.remedies.slice(0, 1).map(remedy => (
                      <div key={remedy.id} className="text-sm text-herb-primary bg-herb-light/70 rounded-full px-3 py-1">
                        {remedy.name}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-herb-secondary flex items-center">
                    Lihat ramuan <ChevronRight className="h-3 w-3 ml-1" />
                  </span>
                </Link>
              ))
            ) : (
              featuredHerbs.map((herb) => (
                <Link 
                  to={`/encyclopedia/${herb.id}`} 
                  key={herb.id}
                  className="herb-card group hover:border-herb-secondary hover:-translate-y-1"
                >
                  <div className="bg-herb-light/50 rounded-lg h-40 mb-4 overflow-hidden">
                    <img 
                      src={herb.image} 
                      alt={herb.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <h3 className="text-xl font-bold text-herb-primary mb-1 group-hover:text-herb-secondary">
                    {herb.name}
                  </h3>
                  <p className="text-sm text-gray-500 italic mb-3">{herb.latinName}</p>
                  <p className="text-gray-600 mb-3 line-clamp-2">{herb.description}</p>
                  <span className="text-sm text-herb-secondary flex items-center">
                    Pelajari lebih lanjut <ChevronRight className="h-3 w-3 ml-1" />
                  </span>
                </Link>
              ))
            )}
          </div>
          
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg" className="border-herb-primary text-herb-primary hover:bg-herb-primary/10">
              <Link to={activeTab === "popular" ? "/remedies" : "/encyclopedia"}>
                Lihat Semua {activeTab === "popular" ? "Ramuan" : "Herbal"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bagian Ajakan */}
      <section className="py-16 bg-herb-accent/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-herb-dark mb-4">Mulai Perjalanan Kesehatan Herbal Anda</h2>
            <p className="text-lg text-gray-600 mb-8">
              Temukan kombinasi herbal sempurna untuk kebutuhan kesehatan Anda dengan alat interaktif kami dan panduan ahli
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-herb-primary hover:bg-herb-primary/90">
                <Link to="/mixer">
                  <BeakerIcon className="mr-2 h-5 w-5" />
                  Racik Herbal Anda
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-herb-primary text-herb-primary hover:bg-herb-primary/10">
                <Link to="/preparation">
                  <Coffee className="mr-2 h-5 w-5" />
                  Metode Persiapan
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian Penulis */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-herb-light rounded-full p-2 mb-4">
              <Leaf className="h-6 w-6 text-herb-primary" />
            </div>
            <h2 className="text-xl font-bold text-herb-primary mb-3">Tentang Penulis</h2>
            <p className="text-gray-600 mb-4">
              Platform herbal interaktif ini dikembangkan oleh Muhammad Sobri Maulana, 
              seorang pendukung kesehatan alami dan pengobatan herbal.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <a 
                href="https://github.com/sobri3195" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-herb-primary hover:text-herb-secondary transition-colors"
              >
                GitHub
              </a>
              <a 
                href="mailto:muhammadsobrimaulana31@gmail.com" 
                className="text-herb-primary hover:text-herb-secondary transition-colors"
              >
                Email
              </a>
              <a 
                href="https://lynk.id/muhsobrimaulana" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-herb-primary hover:text-herb-secondary transition-colors"
              >
                Dukungan
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
