
import React, { useEffect, useRef, useState } from "react";
import { MapPin, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RegionData {
  name: string;
  herbs: string[];
  description?: string;
}

interface IndonesiaMapProps {
  selectedRegions: string[];
  title?: string;
  regionData?: Record<string, RegionData>;
  onRegionClick?: (region: string) => void;
}

const defaultRegionData: Record<string, RegionData> = {
  "Sumatra": {
    name: "Sumatra",
    herbs: ["Andaliman", "Daun Salam", "Serai"],
    description: "Pulau dengan keanekaragaman herbal yang tinggi, khususnya rempah-rempah"
  },
  "Jawa": {
    name: "Jawa",
    herbs: ["Jahe", "Kunyit", "Temulawak", "Kencur"],
    description: "Pusat budidaya tanaman herbal tradisional di Indonesia"
  },
  "Kalimantan": {
    name: "Kalimantan",
    herbs: ["Sarang Semut", "Pasak Bumi", "Gambir"],
    description: "Hutan hujan dengan banyak tanaman obat endemic"
  },
  "Sulawesi": {
    name: "Sulawesi",
    herbs: ["Kumis Kucing", "Patah Tulang", "Mengkudu"],
    description: "Memiliki berbagai tanaman herbal unik karena topografi yang beragam"
  },
  "Papua": {
    name: "Papua",
    herbs: ["Buah Merah", "Mahkota Dewa", "Daun Masohi"],
    description: "Kaya akan tanaman herbal endemik dengan khasiat khusus"
  },
  "Bali": {
    name: "Bali",
    herbs: ["Kecombrang", "Daun Jinten", "Daun Sirih"],
    description: "Pulau dengan tradisi pengobatan herbal yang kuat"
  }
};

const IndonesiaMap = ({ 
  selectedRegions, 
  title,
  regionData = defaultRegionData,
  onRegionClick
}: IndonesiaMapProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    setMapLoaded(true);
    
    // Reset all regions to default color
    const allPaths = svgRef.current.querySelectorAll('path');
    allPaths.forEach(path => {
      path.setAttribute('fill', '#E2E8F0');
      path.setAttribute('stroke', '#94A3B8');
      path.style.transition = 'fill 0.3s ease, stroke 0.3s ease, transform 0.2s ease';
      path.style.cursor = 'pointer';
    });
    
    // Highlight selected regions
    selectedRegions.forEach(region => {
      const regionPaths = svgRef.current?.querySelectorAll(`[data-name="${region}"]`);
      if (regionPaths) {
        regionPaths.forEach(path => {
          path.setAttribute('fill', '#4ADE80');
          path.setAttribute('stroke', '#22C55E');
        });
      }
    });
  }, [selectedRegions]);

  const handleMouseEnter = (region: string) => {
    setHoveredRegion(region);
    
    if (!svgRef.current) return;
    
    const regionPaths = svgRef.current.querySelectorAll(`[data-name="${region}"]`);
    regionPaths.forEach(path => {
      if (!selectedRegions.includes(region)) {
        path.setAttribute('fill', '#CBD5E1');
      }
      path.setAttribute('stroke-width', '3');
      path.setAttribute('transform', 'scale(1.02)');
      path.setAttribute('transform-origin', 'center');
    });
  };

  const handleMouseLeave = (region: string) => {
    setHoveredRegion(null);
    
    if (!svgRef.current) return;
    
    const regionPaths = svgRef.current.querySelectorAll(`[data-name="${region}"]`);
    regionPaths.forEach(path => {
      if (!selectedRegions.includes(region)) {
        path.setAttribute('fill', '#E2E8F0');
      }
      path.setAttribute('stroke-width', '2');
      path.setAttribute('transform', 'scale(1)');
    });
  };

  const handleClick = (region: string) => {
    if (onRegionClick) {
      onRegionClick(region);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-center text-lg font-medium py-2">{title || "Peta Indonesia"}</h3>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 400"
          className="w-full h-full max-h-[500px]"
        >
          {/* Simplified SVG map of Indonesia */}
          <g>
            {/* Sumatra */}
            <path
              data-name="Sumatra"
              d="M180,150 L150,130 L120,180 L130,220 L160,250 L200,230 L210,190 L180,150Z"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="2"
              onMouseEnter={() => handleMouseEnter("Sumatra")}
              onMouseLeave={() => handleMouseLeave("Sumatra")}
              onClick={() => handleClick("Sumatra")}
            />
            {/* Jawa */}
            <path
              data-name="Jawa"
              d="M300,270 L250,260 L210,270 L280,290 L320,280 L300,270Z"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="2"
              onMouseEnter={() => handleMouseEnter("Jawa")}
              onMouseLeave={() => handleMouseLeave("Jawa")}
              onClick={() => handleClick("Jawa")}
            />
            {/* Kalimantan */}
            <path
              data-name="Kalimantan"
              d="M380,180 L320,150 L280,170 L260,210 L300,230 L340,240 L380,210 L380,180Z"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="2"
              onMouseEnter={() => handleMouseEnter("Kalimantan")}
              onMouseLeave={() => handleMouseLeave("Kalimantan")}
              onClick={() => handleClick("Kalimantan")}
            />
            {/* Sulawesi */}
            <path
              data-name="Sulawesi"
              d="M450,170 L430,140 L440,120 L470,130 L480,160 L460,190 L470,210 L450,230 L420,200 L430,180 L450,170Z"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="2"
              onMouseEnter={() => handleMouseEnter("Sulawesi")}
              onMouseLeave={() => handleMouseLeave("Sulawesi")}
              onClick={() => handleClick("Sulawesi")}
            />
            {/* Papua */}
            <path
              data-name="Papua"
              d="M600,180 L550,150 L530,160 L520,190 L540,220 L580,230 L620,210 L620,180 L600,180Z"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="2"
              onMouseEnter={() => handleMouseEnter("Papua")}
              onMouseLeave={() => handleMouseLeave("Papua")}
              onClick={() => handleClick("Papua")}
            />
            {/* Bali */}
            <path
              data-name="Bali"
              d="M340,290 L330,285 L325,290 L335,295 L340,290Z"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="2"
              onMouseEnter={() => handleMouseEnter("Bali")}
              onMouseLeave={() => handleMouseLeave("Bali")}
              onClick={() => handleClick("Bali")}
            />
          </g>
        </svg>
      </div>
      
      {/* Map legend */}
      <div className="mt-2 flex justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#E2E8F0] border border-[#94A3B8]"></div>
          <span>Tidak ada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#4ADE80] border border-[#22C55E]"></div>
          <span>Tersedia</span>
        </div>
      </div>
      
      {/* Region info section */}
      {mapLoaded && (
        <div className={`mt-4 p-4 border rounded-md transition-opacity duration-300 ${hoveredRegion ? 'opacity-100' : 'opacity-0'}`}>
          {hoveredRegion && regionData[hoveredRegion] && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-herb-primary" />
                <h4 className="font-medium text-lg">{regionData[hoveredRegion].name}</h4>
              </div>
              
              {regionData[hoveredRegion].description && (
                <p className="text-sm text-muted-foreground mb-2">
                  {regionData[hoveredRegion].description}
                </p>
              )}
              
              <div className="mt-1">
                <span className="text-sm font-medium">Tanaman herbal populer:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {regionData[hoveredRegion].herbs.map((herb, i) => (
                    <TooltipProvider key={i} delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="px-2 py-1 bg-herb-primary/10 text-herb-primary rounded-full text-xs flex items-center gap-1">
                            {herb}
                            <Info className="h-3 w-3" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Klik untuk melihat detail {herb}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IndonesiaMap;
