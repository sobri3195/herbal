
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteDialog from "@/components/herbal-mixer/DeleteDialog";
import HerbalBlendForm from "@/components/herbal-mixer/HerbalBlendForm";
import AIRecommendation from "@/components/herbal-mixer/AIRecommendation";
import HerbalBlendShare from "@/components/herbal-mixer/HerbalBlendShare";
import HerbalBlendHistory from "@/components/herbal-mixer/HerbalBlendHistory";
import IngredientSelector from "@/components/herbal-mixer/IngredientSelector";
import { FlaskConical, Star, Edit, Share } from "lucide-react";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus minimal 2 karakter.",
  }),
  description: z.string().min(10, {
    message: "Deskripsi harus minimal 10 karakter.",
  }),
  category: z.string({
    required_error: "Silakan pilih kategori.",
  }),
});

export default function HerbalMixer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default ke true untuk sementara
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [herbalBlend, setHerbalBlend] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<string>("editor");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    // Periksa status autentikasi
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    async function fetchHerbalBlend() {
      if (id) {
        try {
          // Simulasikan panggilan API
          setIsLoading(true);
          setTimeout(() => {
            const mockData = {
              id: id,
              name: "Contoh Campuran Herbal",
              description: "Ini adalah contoh campuran herbal untuk demonstrasi.",
              category: "Tea",
              imageUrl: "",
              isFavorite: Math.random() > 0.5,
            };
            
            setHerbalBlend(mockData);
            setImageUrl(mockData.imageUrl);
            setIsFavorite(mockData.isFavorite);

            setFormValues({
              name: mockData.name,
              description: mockData.description,
              category: mockData.category,
            });
            
            setIsLoading(false);
          }, 1000);
        } catch (error) {
          console.error("Error fetching herbal blend:", error);
          toast({
            variant: "destructive",
            title: "Oh tidak! Ada kesalahan.",
            description: "Gagal memuat campuran herbal.",
          });
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }

    fetchHerbalBlend();
  }, [id, toast]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsEditing(true);
    try {
      // Simulasikan panggilan API
      setTimeout(() => {
        toast({
          title: "Berhasil!",
          description: "Campuran herbal berhasil diperbarui.",
        });
        setIsEditing(false);
        setHerbalBlend({
          ...herbalBlend,
          ...values,
          imageUrl,
        });
      }, 1500);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Oh tidak! Ada kesalahan.",
        description: error.message || "Gagal memperbarui",
      });
      setIsEditing(false);
    }
  };

  const deleteHerbalBlend = async () => {
    setIsDeleting(true);
    try {
      // Simulasikan panggilan API
      setTimeout(() => {
        toast({
          title: "Berhasil!",
          description: "Campuran herbal berhasil dihapus.",
        });
        navigate("/herbal-blends");
        setIsDeleting(false);
        setOpen(false);
      }, 1500);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Oh tidak! Ada kesalahan.",
        description: error.message || "Gagal menghapus",
      });
      setIsDeleting(false);
      setOpen(false);
    }
  };

  const handleRecommendationSelect = (name: string, description: string, category: string) => {
    setFormValues({
      name,
      description,
      category,
    });
    
    toast({
      title: "Rekomendasi diterapkan",
      description: "Detail campuran herbal telah diperbarui sesuai rekomendasi AI",
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Dihapus dari favorit" : "Ditambahkan ke favorit",
      description: isFavorite 
        ? "Campuran herbal telah dihapus dari favorit Anda"
        : "Campuran herbal telah ditambahkan ke favorit Anda",
    });
  };

  const handleSelectFromHistory = (blend: any) => {
    setFormValues({
      name: blend.name,
      description: blend.description,
      category: blend.category,
    });
    
    if (blend.imageUrl) {
      setImageUrl(blend.imageUrl);
    }
    
    setCurrentTab("editor");
    
    toast({
      title: "Campuran dipilih",
      description: `${blend.name} telah dimuat ke editor`,
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto mt-10">
          <Skeleton className="h-[200px] w-full rounded-md" />
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-5xl mx-auto mt-10">
        <DeleteDialog 
          open={open}
          setOpen={setOpen}
          isDeleting={isDeleting}
          onDelete={deleteHerbalBlend}
        />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FlaskConical className="h-6 w-6 text-herb-primary mr-2" />
            <div>
              <h1 className="text-2xl font-bold">
                {herbalBlend?.name || "Buat Campuran Herbal"}
              </h1>
              {herbalBlend && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Badge variant="outline" className="mr-2">
                    {herbalBlend.category === "Tea" ? "Teh" : 
                     herbalBlend.category === "Tincture" ? "Tingtur" : 
                     herbalBlend.category === "Capsule" ? "Kapsul" : 
                     herbalBlend.category === "Topical" ? "Topikal" : "Lainnya"}
                  </Badge>
                  ID: {herbalBlend.id}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {herbalBlend && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFavorite}
                  className={isFavorite ? "text-yellow-500" : ""}
                >
                  <Star className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
                </Button>
                
                <HerbalBlendShare
                  name={herbalBlend.name}
                  description={herbalBlend.description}
                  category={herbalBlend.category}
                />
                
                <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
                  Hapus
                </Button>
              </>
            )}
          </div>
        </div>

        <Separator className="my-4" />

        <Tabs defaultValue="editor" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="editor" className="flex gap-2">
              <Edit className="h-4 w-4" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="ingredients" className="flex gap-2">
              <FlaskConical className="h-4 w-4" />
              Bahan
            </TabsTrigger>
            <TabsTrigger value="history" className="flex gap-2">
              <Share className="h-4 w-4" />
              Riwayat
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <HerbalBlendForm
                defaultValues={formValues}
                isEditing={isEditing}
                onSubmit={handleSubmit}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                isEdit={!!herbalBlend}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <AIRecommendation onSelectRecommendation={handleRecommendationSelect} />
            </div>
          </TabsContent>
          
          <TabsContent value="ingredients" className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <IngredientSelector />
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <HerbalBlendHistory
                onSelectBlend={handleSelectFromHistory}
                onDeleteBlend={(id) => {
                  toast({
                    title: "Campuran dihapus",
                    description: `Campuran ID ${id} berhasil dihapus`,
                  });
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
