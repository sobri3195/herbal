
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Check, Plus, Search, Trash, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Ingredient {
  id: string;
  name: string;
  latinName: string;
  properties: string[];
  usage: string;
  amount?: string;
  unit?: string;
}

const IngredientSelector = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [filterProperty, setFilterProperty] = useState<string>("all");
  
  // Simulasi database bahan herbal
  const availableIngredients: Ingredient[] = [
    {
      id: "1",
      name: "Jahe",
      latinName: "Zingiber officinale",
      properties: ["Anti-peradangan", "Anti-mual", "Melancarkan pencernaan"],
      usage: "Akar jahe dapat digunakan untuk meredakan mual, meningkatkan pencernaan, dan menyembuhkan pilek."
    },
    {
      id: "2",
      name: "Kunyit",
      latinName: "Curcuma longa",
      properties: ["Anti-peradangan", "Antioksidan", "Detoks"],
      usage: "Rimpang kunyit dapat membantu peradangan, meningkatkan fungsi hati, dan bertindak sebagai antioksidan."
    },
    {
      id: "3",
      name: "Kencur",
      latinName: "Kaempferia galanga",
      properties: ["Ekspektoran", "Anti-peradangan", "Penghangat"],
      usage: "Rimpang kencur dapat membantu mengatasi batuk, pilek, dan peradangan."
    },
    {
      id: "4",
      name: "Temulawak",
      latinName: "Curcuma xanthorrhiza",
      properties: ["Detoks", "Melancarkan pencernaan", "Kesehatan hati"],
      usage: "Akar temulawak dapat membantu meningkatkan fungsi hati, pencernaan, dan nafsu makan."
    },
    {
      id: "5",
      name: "Serai",
      latinName: "Cymbopogon citratus",
      properties: ["Relaksasi", "Antimikroba", "Melancarkan pencernaan"],
      usage: "Batang serai dapat membantu relaksasi, mencegah infeksi, dan menenangkan sistem pencernaan."
    },
    {
      id: "6",
      name: "Daun Mint",
      latinName: "Mentha × piperita",
      properties: ["Penyejuk", "Melancarkan pencernaan", "Anti-mual"],
      usage: "Daun mint dapat meredakan sakit perut, mual, dan memberikan rasa segar."
    },
    {
      id: "7",
      name: "Daun Pegagan",
      latinName: "Centella asiatica",
      properties: ["Memori", "Anti-kecemasan", "Penyembuhan"],
      usage: "Daun pegagan dapat meningkatkan fungsi kognitif, mengurangi kecemasan, dan membantu penyembuhan luka."
    },
    {
      id: "8",
      name: "Kayu Manis",
      latinName: "Cinnamomum verum",
      properties: ["Penyeimbang gula darah", "Antioksidan", "Penghangat"],
      usage: "Kulit kayu manis dapat membantu mengelola kadar gula darah dan bertindak sebagai antioksidan."
    },
    {
      id: "9",
      name: "Kapulaga",
      latinName: "Elettaria cardamomum",
      properties: ["Melancarkan pencernaan", "Menyegarkan nafas", "Stimulan"],
      usage: "Biji kapulaga dapat membantu pencernaan, menyegarkan nafas, dan meningkatkan sirkulasi."
    },
    {
      id: "10",
      name: "Daun Kemangi",
      latinName: "Ocimum basilicum",
      properties: ["Antioksidan", "Anti-stres", "Antibakteri"],
      usage: "Daun kemangi dapat membantu meredakan stres, melawan bakteri, dan meningkatkan sistem kekebalan tubuh."
    },
  ];

  // Filter bahan berdasarkan pencarian dan properti
  const filteredIngredients = availableIngredients.filter((ingredient) => {
    const matchesSearch = 
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ingredient.latinName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProperty = 
      filterProperty === "all" || 
      ingredient.properties.some(prop => 
        prop.toLowerCase().includes(filterProperty.toLowerCase())
      );
    
    return matchesSearch && matchesProperty;
  });

  // Daftar unik properti untuk filter
  const allProperties = Array.from(
    new Set(
      availableIngredients.flatMap(ingredient => ingredient.properties)
    )
  ).sort();

  const addIngredient = (ingredient: Ingredient) => {
    if (!selectedIngredients.some(item => item.id === ingredient.id)) {
      setSelectedIngredients([...selectedIngredients, {
        ...ingredient,
        amount: "1",
        unit: "sendok teh"
      }]);
    }
  };

  const removeIngredient = (id: string) => {
    setSelectedIngredients(selectedIngredients.filter(item => item.id !== id));
  };

  const updateIngredientAmount = (id: string, amount: string) => {
    setSelectedIngredients(
      selectedIngredients.map(item => 
        item.id === id ? { ...item, amount } : item
      )
    );
  };

  const updateIngredientUnit = (id: string, unit: string) => {
    setSelectedIngredients(
      selectedIngredients.map(item => 
        item.id === id ? { ...item, unit } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-medium">Bahan-bahan Herbal</Label>
        <p className="text-sm text-muted-foreground">
          Pilih bahan-bahan herbal untuk campuran Anda
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari bahan herbal..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select
            value={filterProperty}
            onValueChange={setFilterProperty}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter properti" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Properti</SelectItem>
              {allProperties.map((property, index) => (
                <SelectItem key={index} value={property.toLowerCase()}>
                  {property}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="border rounded-md">
          <ScrollArea className="h-40 rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Nama</TableHead>
                  <TableHead className="hidden sm:table-cell">Nama Latin</TableHead>
                  <TableHead className="hidden md:table-cell">Properti</TableHead>
                  <TableHead className="w-[100px]">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIngredients.map((ingredient) => (
                  <TableRow key={ingredient.id}>
                    <TableCell className="font-medium">{ingredient.name}</TableCell>
                    <TableCell className="hidden sm:table-cell italic text-xs">
                      {ingredient.latinName}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {ingredient.properties.map((property, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {property}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Info className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="w-80">
                              <p className="text-sm">{ingredient.usage}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => addIngredient(ingredient)}
                          disabled={selectedIngredients.some(item => item.id === ingredient.id)}
                        >
                          {selectedIngredients.some(item => item.id === ingredient.id) ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredIngredients.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Tidak ada bahan herbal yang sesuai dengan filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Bahan yang dipilih</Label>
        {selectedIngredients.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedIngredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0.25"
                      step="0.25"
                      value={ingredient.amount}
                      onChange={(e) => updateIngredientAmount(ingredient.id, e.target.value)}
                      className="w-20 h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={ingredient.unit}
                      onValueChange={(value) => updateIngredientUnit(ingredient.id, value)}
                    >
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sendok teh">sendok teh</SelectItem>
                        <SelectItem value="sendok makan">sendok makan</SelectItem>
                        <SelectItem value="gram">gram</SelectItem>
                        <SelectItem value="ml">ml</SelectItem>
                        <SelectItem value="lembar">lembar</SelectItem>
                        <SelectItem value="buah">buah</SelectItem>
                        <SelectItem value="potong">potong</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeIngredient(ingredient.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4 border border-dashed rounded-md">
            <p className="text-muted-foreground">
              Belum ada bahan yang dipilih
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientSelector;
