
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, Beaker, Droplet, Lightbulb, Wand } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AIRecommendationProps {
  onSelectRecommendation: (name: string, description: string, category: string) => void;
}

// Types for herb properties
interface HerbProperty {
  name: string;
  description: string;
  strength: number; // 0-100
}

// Types for herbs and recommendations
interface Herb {
  name: string;
  properties: HerbProperty[];
  dosage?: string;
  contraindications?: string[];
}

interface HerbalRecommendation {
  name: string;
  description: string;
  category: string;
  tags?: string[];
  rating?: number;
  complexity?: "Mudah" | "Sedang" | "Kompleks";
  herbs?: Herb[];
  benefits?: string[];
  preparation?: string;
}

// Mock herbs data
const HERBS_DATABASE: Herb[] = [
  {
    name: "Jahe",
    properties: [
      { name: "Anti-inflamasi", description: "Mengurangi peradangan dalam tubuh", strength: 75 },
      { name: "Antioksidan", description: "Menetralisir radikal bebas", strength: 60 },
      { name: "Pencernaan", description: "Membantu pencernaan", strength: 80 }
    ],
    dosage: "2-4 gram per hari dalam bentuk kering atau segar",
    contraindications: ["Gangguan pembekuan darah", "Batu empedu"]
  },
  {
    name: "Kunyit",
    properties: [
      { name: "Anti-inflamasi", description: "Mengurangi peradangan dalam tubuh", strength: 90 },
      { name: "Antioksidan", description: "Menetralisir radikal bebas", strength: 85 },
      { name: "Detoksifikasi", description: "Membantu membersihkan hati", strength: 70 }
    ],
    dosage: "1-3 gram per hari dalam bentuk kering atau segar",
    contraindications: ["Gangguan empedu", "Pengencer darah"]
  },
  {
    name: "Temulawak",
    properties: [
      { name: "Hepatoprotektor", description: "Melindungi hati", strength: 85 },
      { name: "Pencernaan", description: "Membantu pencernaan", strength: 75 },
      { name: "Antibakteri", description: "Melawan infeksi bakteri", strength: 60 }
    ],
    dosage: "2-4 gram per hari dalam bentuk kering",
    contraindications: ["Gangguan empedu"]
  },
  {
    name: "Kencur",
    properties: [
      { name: "Anti-inflamasi", description: "Mengurangi peradangan", strength: 65 },
      { name: "Ekspektoran", description: "Membantu batuk berdahak", strength: 80 },
      { name: "Antiseptik", description: "Mencegah infeksi bakteri", strength: 70 }
    ],
    dosage: "1-3 gram per hari",
    contraindications: ["Ibu hamil", "Tekanan darah rendah"]
  },
  {
    name: "Sereh",
    properties: [
      { name: "Antiseptik", description: "Membunuh bakteri", strength: 75 },
      { name: "Relaksasi", description: "Menenangkan saraf", strength: 85 },
      { name: "Anti-inflamasi", description: "Mengurangi peradangan", strength: 60 }
    ],
    dosage: "2-3 batang segar atau 1-2 gram kering",
    contraindications: ["Reaksi alergi kulit"]
  },
];

const AIRecommendation = ({ onSelectRecommendation }: AIRecommendationProps) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<HerbalRecommendation[]>([]);
  const { toast } = useToast();
  const [aiModel, setAiModel] = useState<"standard" | "advanced">("standard");
  const [purpose, setPurpose] = useState<string>("general");
  const [favRecommendations, setFavRecommendations] = useState<HerbalRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [showDetailIndex, setShowDetailIndex] = useState<number | null>(null);

  // Generate better recommendations with herb composition and benefits
  const generateRecommendations = async () => {
    if (!prompt.trim()) {
      toast({
        variant: "destructive",
        title: "Input diperlukan",
        description: "Mohon masukkan deskripsi untuk mendapatkan rekomendasi",
      });
      return;
    }

    setIsLoading(true);
    setIsAnalyzing(true);
    setAnalyzeProgress(0);
    
    try {
      // Simulate AI analysis with progress updates
      const interval = setInterval(() => {
        setAnalyzeProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 300);

      // Simulate API call delay
      setTimeout(() => {
        clearInterval(interval);
        setAnalyzeProgress(100);
        
        setTimeout(() => {
          let mockRecommendations = [];
          
          // Analyze the prompt for keywords to give more relevant recommendations
          const promptLower = prompt.toLowerCase();
          const hasRelaxationKeywords = promptLower.includes('rileks') || promptLower.includes('tenang') || promptLower.includes('stres') || promptLower.includes('tidur');
          const hasEnergyKeywords = promptLower.includes('energi') || promptLower.includes('lelah') || promptLower.includes('stamina');
          const hasDigestionKeywords = promptLower.includes('pencernaan') || promptLower.includes('perut') || promptLower.includes('lambung');
          const hasImmuneKeywords = promptLower.includes('imun') || promptLower.includes('sakit') || promptLower.includes('flu');
          
          if (aiModel === "standard") {
            mockRecommendations = [
              generateRecommendationForKeywords("Ramuan Penenang", "Tea", hasRelaxationKeywords, hasEnergyKeywords, hasDigestionKeywords, hasImmuneKeywords),
              generateRecommendationForKeywords("Energi Alami", "Tincture", hasEnergyKeywords, hasRelaxationKeywords, hasImmuneKeywords, hasDigestionKeywords),
              generateRecommendationForKeywords("Detoks Herbal", "Capsule", hasDigestionKeywords, hasRelaxationKeywords, hasEnergyKeywords, hasImmuneKeywords),
            ];
          } else {
            // AI model "advanced" gives more specific recommendations
            mockRecommendations = [
              generateRecommendationForKeywords("Ramuan Penenang Premium", "Tea", hasRelaxationKeywords, hasEnergyKeywords, hasDigestionKeywords, hasImmuneKeywords),
              generateRecommendationForKeywords("Energi Alami Plus", "Tincture", hasEnergyKeywords, hasRelaxationKeywords, hasImmuneKeywords, hasDigestionKeywords),
              generateRecommendationForKeywords("Detoks Herbal Total", "Capsule", hasDigestionKeywords, hasRelaxationKeywords, hasEnergyKeywords, hasImmuneKeywords),
              generateRecommendationForKeywords("Imunitas Tangguh", "Tea", hasImmuneKeywords, hasRelaxationKeywords, hasEnergyKeywords, hasDigestionKeywords),
              generateRecommendationForKeywords("Fokus Kognitif", "Tincture", true, hasRelaxationKeywords, hasEnergyKeywords, hasDigestionKeywords),
            ];
          }

          // Filter recommendations based on purpose if selected
          if (purpose !== "general") {
            const purposeMap: Record<string, string[]> = {
              "relaksasi": ["Relaksasi", "Tidur", "Anti-stres"],
              "energi": ["Energi", "Vitalitas", "Fokus"],
              "detoks": ["Detoksifikasi", "Pencernaan", "Pembersihan"],
              "imunitas": ["Imunitas", "Antioksidan", "Kesehatan"],
              "fokus": ["Kognitif", "Fokus", "Memori", "Mental"],
            };
            
            const relevantTags = purposeMap[purpose] || [];
            mockRecommendations = mockRecommendations.filter(rec => 
              rec.tags?.some(tag => relevantTags.some(rt => tag.includes(rt)))
            );
          }
          
          setRecommendations(mockRecommendations);
          setIsLoading(false);
          setIsAnalyzing(false);
          
          toast({
            title: "Rekomendasi siap",
            description: "AI telah menghasilkan beberapa rekomendasi untuk Anda",
          });
        }, 500);
      }, 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Terjadi kesalahan",
        description: "Gagal mendapatkan rekomendasi. Silakan coba lagi nanti.",
      });
      setIsLoading(false);
      setIsAnalyzing(false);
    }
  };

  // Generate a recommendation based on the keywords in the prompt
  const generateRecommendationForKeywords = (
    baseName: string, 
    category: string,
    isPrimary: boolean,
    hasEnergy: boolean,
    hasDigestion: boolean,
    hasImmune: boolean
  ): HerbalRecommendation => {
    // Select herbs based on the detected keywords
    const selectedHerbs: Herb[] = [];
    
    // Always include at least 2 herbs
    if (isPrimary) {
      if (baseName.includes("Penenang")) {
        selectedHerbs.push(HERBS_DATABASE.find(h => h.name === "Sereh")!);
      } else if (baseName.includes("Energi")) {
        selectedHerbs.push(HERBS_DATABASE.find(h => h.name === "Jahe")!);
      } else if (baseName.includes("Detoks")) {
        selectedHerbs.push(HERBS_DATABASE.find(h => h.name === "Temulawak")!);
      } else if (baseName.includes("Imunitas")) {
        selectedHerbs.push(HERBS_DATABASE.find(h => h.name === "Kunyit")!);
      } else {
        selectedHerbs.push(HERBS_DATABASE.find(h => h.name === "Kencur")!);
      }
    }
    
    // Add secondary herbs based on keywords
    if (hasEnergy && !selectedHerbs.some(h => h.name === "Jahe")) {
      selectedHerbs.push(HERBS_DATABASE.find(h => h.name === "Jahe")!);
    }
    
    if (hasDigestion && !selectedHerbs.some(h => h.name === "Temulawak")) {
      selectedHerbs.push(HERBS_DATABASE.find(h => h.name === "Temulawak")!);
    }
    
    if (hasImmune && !selectedHerbs.some(h => h.name === "Kunyit")) {
      selectedHerbs.push(HERBS_DATABASE.find(h => h.name === "Kunyit")!);
    }
    
    // Ensure we have at least 2 herbs
    while (selectedHerbs.length < 2) {
      const remainingHerbs = HERBS_DATABASE.filter(
        h => !selectedHerbs.some(selected => selected.name === h.name)
      );
      selectedHerbs.push(remainingHerbs[Math.floor(Math.random() * remainingHerbs.length)]);
    }
    
    // Generate description based on the selected herbs
    let description = `Campuran ${selectedHerbs.map(h => h.name).join(", ")} `;
    
    if (baseName.includes("Penenang")) {
      description += "untuk membantu relaksasi dan tidur yang lebih nyenyak.";
    } else if (baseName.includes("Energi")) {
      description += "untuk meningkatkan energi dan vitalitas secara alami.";
    } else if (baseName.includes("Detoks")) {
      description += "untuk membantu detoksifikasi dan membersihkan sistem pencernaan.";
    } else if (baseName.includes("Imunitas")) {
      description += "untuk memperkuat sistem kekebalan tubuh dan kesehatan secara umum.";
    } else {
      description += "untuk meningkatkan fokus mental dan fungsi kognitif.";
    }
    
    // Generate tags based on the herbs' properties
    const allProperties = selectedHerbs.flatMap(h => h.properties);
    const uniquePropertyNames = Array.from(new Set(allProperties.map(p => p.name)));
    const tags = uniquePropertyNames.slice(0, 4); // Take up to 4 unique property names
    
    // Generate benefits based on the herbs' properties
    const benefits = uniquePropertyNames.map(name => {
      const relevantProps = allProperties.filter(p => p.name === name);
      const avgStrength = relevantProps.reduce((sum, p) => sum + p.strength, 0) / relevantProps.length;
      let benefitText = `${name}: `;
      
      if (avgStrength > 80) {
        benefitText += "Sangat efektif ";
      } else if (avgStrength > 60) {
        benefitText += "Efektif ";
      } else {
        benefitText += "Cukup membantu ";
      }
      
      benefitText += relevantProps[0].description.toLowerCase();
      return benefitText;
    });
    
    // Generate preparation instructions based on category
    let preparation = "";
    if (category === "Tea") {
      preparation = `Seduh 1-2 sendok teh campuran kering dengan 200ml air panas. Biarkan selama 5-10 menit sebelum disaring. Minum 1-2 kali sehari.`;
    } else if (category === "Tincture") {
      preparation = `Teteskan 10-15 tetes ke dalam air atau di bawah lidah, 2-3 kali sehari.`;
    } else {
      preparation = `Konsumsi 1 kapsul, 1-2 kali sehari setelah makan.`;
    }
    
    // Calculate complexity based on the number of herbs and preparation
    const complexity = selectedHerbs.length > 3 
      ? "Kompleks" 
      : selectedHerbs.length > 2 
      ? "Sedang" 
      : "Mudah";
    
    // Calculate rating based on how well it matches the user's query
    const matchScore = isPrimary ? 0.9 : (hasEnergy || hasDigestion || hasImmune ? 0.8 : 0.75);
    const rating = 4 + matchScore;
    
    return {
      name: baseName,
      description: description,
      category: category,
      tags: tags.map(p => p),
      rating: parseFloat(rating.toFixed(1)),
      complexity: complexity as "Mudah" | "Sedang" | "Kompleks",
      herbs: selectedHerbs,
      benefits: benefits,
      preparation: preparation
    };
  };

  const addToFavorites = (recommendation: HerbalRecommendation) => {
    setFavRecommendations(prev => {
      // Periksa apakah rekomendasi sudah ada di favorit
      if (prev.some(item => item.name === recommendation.name)) {
        toast({
          title: "Sudah ada di favorit",
          description: `${recommendation.name} sudah tersimpan di favorit Anda`,
        });
        return prev;
      }

      toast({
        title: "Ditambahkan ke favorit",
        description: `${recommendation.name} berhasil ditambahkan ke favorit`,
      });
      return [...prev, recommendation];
    });
  };

  const removeFromFavorites = (name: string) => {
    setFavRecommendations(prev => prev.filter(item => item.name !== name));
    toast({
      title: "Dihapus dari favorit",
      description: `${name} berhasil dihapus dari favorit`,
    });
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Mudah": return "bg-green-100 text-green-800";
      case "Sedang": return "bg-yellow-100 text-yellow-800";
      case "Kompleks": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const toggleHerbDetail = (index: number) => {
    if (showDetailIndex === index) {
      setShowDetailIndex(null);
    } else {
      setShowDetailIndex(index);
    }
  };

  const renderRecommendationCard = (rec: HerbalRecommendation, index: number, isFavorite = false) => (
    <Card key={index} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          {index % 3 === 0 ? (
            <FlaskConical className="h-4 w-4" />
          ) : index % 3 === 1 ? (
            <Beaker className="h-4 w-4" />
          ) : (
            <Droplet className="h-4 w-4" />
          )}
          {rec.name}
        </CardTitle>
        <CardDescription className="text-xs flex items-center justify-between">
          <span>
            Kategori: {rec.category === "Tea" ? "Teh" : rec.category === "Tincture" ? "Tingtur" : "Kapsul"}
          </span>
          {rec.rating && (
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-yellow-500 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              {rec.rating}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm mb-3">{rec.description}</p>
        
        {rec.complexity && (
          <div className="mb-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getComplexityColor(rec.complexity)}`}>
              {rec.complexity}
            </span>
          </div>
        )}
        
        {rec.tags && rec.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {rec.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Herb composition section */}
        {rec.herbs && rec.herbs.length > 0 && (
          <div className="mb-3">
            <button 
              className="text-xs flex items-center gap-1 text-herb-primary hover:underline"
              onClick={() => toggleHerbDetail(index)}
            >
              {showDetailIndex === index ? "Sembunyikan detail" : "Lihat komposisi herbal"}
            </button>
            
            {showDetailIndex === index && (
              <div className="mt-2 border rounded-md p-2 bg-slate-50 text-xs">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Herbal</TableHead>
                      <TableHead>Properti</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rec.herbs.map((herb, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{herb.name}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {herb.properties.slice(0, 2).map((prop, j) => (
                              <HoverCard key={j}>
                                <HoverCardTrigger asChild>
                                  <div className="flex items-center gap-1 cursor-help">
                                    <span>{prop.name}</span>
                                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-herb-primary rounded-full" 
                                        style={{ width: `${prop.strength}%` }}
                                      />
                                    </div>
                                  </div>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-64 p-3">
                                  <div className="space-y-1">
                                    <h4 className="font-medium">{prop.name}</h4>
                                    <p className="text-xs">{prop.description}</p>
                                    <p className="text-xs text-muted-foreground">
                                      Kekuatan: {prop.strength}/100
                                    </p>
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {rec.preparation && (
                  <div className="mt-2 p-2 bg-herb-primary/5 rounded-md">
                    <p className="text-xs font-medium">Cara penyajian:</p>
                    <p className="text-xs">{rec.preparation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex-1"
            onClick={() => onSelectRecommendation(rec.name, rec.description, rec.category)}
          >
            Gunakan
          </Button>
          
          {isFavorite ? (
            <Button 
              variant="destructive" 
              size="sm"
              className="text-xs"
              onClick={() => removeFromFavorites(rec.name)}
            >
              Hapus
            </Button>
          ) : (
            <Button 
              variant="secondary" 
              size="sm"
              className="text-xs"
              onClick={() => addToFavorites(rec)}
            >
              Favorit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 mt-6">
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Wand className="h-5 w-5" />
          Rekomendasi AI
        </h3>
        <p className="text-sm text-muted-foreground">
          Dapatkan campuran herbal yang dipersonalisasi berdasarkan kebutuhan Anda.
        </p>
      </div>
      
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="generate">Generate Campuran</TabsTrigger>
          <TabsTrigger value="favorites">Favorit Saya</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Model AI</Label>
              <Select
                value={aiModel}
                onValueChange={(value: "standard" | "advanced") => setAiModel(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih model AI" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standar (3 rekomendasi)</SelectItem>
                  <SelectItem value="advanced">Lanjutan (5+ rekomendasi)</SelectItem>
                </SelectContent>
              </Select>
              
              <p className="text-xs text-muted-foreground">
                Model lanjutan memberikan rekomendasi yang lebih bervariasi dan detail.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Tujuan Utama</Label>
              <Select
                value={purpose}
                onValueChange={setPurpose}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tujuan utama" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Umum (Semua kategori)</SelectItem>
                  <SelectItem value="relaksasi">Relaksasi & Tidur</SelectItem>
                  <SelectItem value="energi">Energi & Vitalitas</SelectItem>
                  <SelectItem value="detoks">Detoksifikasi & Pembersihan</SelectItem>
                  <SelectItem value="imunitas">Kekebalan & Kesehatan</SelectItem>
                  <SelectItem value="fokus">Fokus & Kognitif</SelectItem>
                </SelectContent>
              </Select>
              
              <p className="text-xs text-muted-foreground">
                Memilih tujuan akan membantu AI fokus pada rekomendasi yang tepat.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <p className="text-xs text-muted-foreground italic">
                Tip: Berikan detail spesifik tentang kebutuhan, kondisi, atau tujuan penggunaan herbal Anda untuk hasil terbaik.
              </p>
            </div>
            <Textarea
              placeholder="Contoh: Saya mencari campuran herbal untuk membantu saya tidur lebih nyenyak di malam hari dan mengurangi kecemasan..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="resize-none"
            />
            
            <Button 
              onClick={generateRecommendations}
              disabled={isLoading || !prompt.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  Menghasilkan rekomendasi...{" "}
                  <svg className="animate-spin h-4 w-4 ml-2" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                </>
              ) : (
                "Dapatkan Rekomendasi"
              )}
            </Button>
          </div>

          {isAnalyzing && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Menganalisis kebutuhan...</span>
                <span>{Math.round(analyzeProgress)}%</span>
              </div>
              <Progress value={analyzeProgress} />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                <div className={`p-2 rounded-md ${analyzeProgress > 30 ? 'bg-herb-primary/10' : 'bg-slate-100'}`}>
                  Mengidentifikasi herbal yang cocok...
                </div>
                <div className={`p-2 rounded-md ${analyzeProgress > 60 ? 'bg-herb-primary/10' : 'bg-slate-100'}`}>
                  Menghitung proporsi campuran...
                </div>
                <div className={`p-2 rounded-md ${analyzeProgress > 90 ? 'bg-herb-primary/10' : 'bg-slate-100'}`}>
                  Menyusun rekomendasi final...
                </div>
              </div>
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-3">Rekomendasi untuk Anda:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map((rec, index) => 
                  renderRecommendationCard(rec, index)
                )}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="favorites" className="pt-4">
          {favRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {favRecommendations.map((rec, index) => 
                renderRecommendationCard(rec, index, true)
              )}
            </div>
          ) : (
            <div className="text-center py-10 border border-dashed rounded-md">
              <Lightbulb className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Anda belum memiliki rekomendasi favorit</p>
              <p className="text-xs text-muted-foreground mt-1">
                Generate rekomendasi baru dan simpan yang Anda sukai
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIRecommendation;
