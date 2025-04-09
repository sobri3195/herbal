
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HerbalBlend {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: string;
  lastModified: string;
  imageUrl?: string;
}

interface HerbalBlendHistoryProps {
  onSelectBlend: (blend: HerbalBlend) => void;
  onDeleteBlend: (id: string) => void;
}

const HerbalBlendHistory = ({ onSelectBlend, onDeleteBlend }: HerbalBlendHistoryProps) => {
  // Dalam implementasi nyata, data ini akan diambil dari database/API
  const [blends] = useState<HerbalBlend[]>([
    {
      id: "1",
      name: "Campuran Untuk Tidur",
      description: "Campuran chamomile, valerian, dan lavender untuk tidur nyenyak.",
      category: "Tea",
      createdAt: "2025-04-05T14:30:00",
      lastModified: "2025-04-07T10:15:00",
      imageUrl: "",
    },
    {
      id: "2",
      name: "Tingtur Energi",
      description: "Campuran tingtur ginseng, jahe, dan lemon untuk energi.",
      category: "Tincture",
      createdAt: "2025-04-03T09:45:00",
      lastModified: "2025-04-03T09:45:00",
    },
    {
      id: "3",
      name: "Kapsul Imunitas",
      description: "Kapsul echinacea, elderberry, dan vitamin C untuk imunitas.",
      category: "Capsule",
      createdAt: "2025-03-28T16:20:00",
      lastModified: "2025-04-01T11:30:00",
    },
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "Tea": return "Teh";
      case "Tincture": return "Tingtur";
      case "Capsule": return "Kapsul";
      case "Topical": return "Topikal";
      default: return "Lainnya";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Calendar className="h-5 w-5" />
        Riwayat Campuran
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {blends.map((blend) => (
          <Card key={blend.id} className="hover:shadow-sm transition-shadow">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <div>
                <CardTitle className="text-base">{blend.name}</CardTitle>
                <CardDescription className="text-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Diubah: {formatDate(blend.lastModified)}
                </CardDescription>
              </div>
              <Badge variant="outline">{getCategoryLabel(blend.category)}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4 line-clamp-2">{blend.description}</p>
              <div className="flex justify-between gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onSelectBlend(blend)}
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onDeleteBlend(blend.id)}
                >
                  <Trash className="mr-1 h-3 w-3" />
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HerbalBlendHistory;
