
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Share, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HerbalBlendShareProps {
  name: string;
  description: string;
  category: string;
}

const HerbalBlendShare = ({ name, description, category }: HerbalBlendShareProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [shareUrl] = useState("https://jamu-app.id/share/blend-" + Math.random().toString(36).substring(2, 8));
  const [copied, setCopied] = useState(false);

  const handleShareByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Simulasi API call untuk berbagi melalui email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Berhasil dibagikan",
        description: `Campuran herbal telah dibagikan ke ${email}`,
      });
      
      setEmail("");
      setMessage("");
      setIsSending(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal membagikan",
        description: "Terjadi kesalahan saat membagikan campuran herbal",
      });
      setIsSending(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: "Disalin ke clipboard",
      description: "Link berbagi telah disalin ke clipboard Anda",
    });
    
    setTimeout(() => setCopied(false), 3000);
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Share className="h-4 w-4" />
          Bagikan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bagikan Campuran Herbal</DialogTitle>
          <DialogDescription>
            Bagikan campuran "{name}" ({getCategoryLabel(category)}) dengan teman atau komunitas Anda
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="share-link">Link berbagi</Label>
            <div className="flex items-center gap-2">
              <Input
                id="share-link"
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={copyToClipboard}
                className={copied ? "bg-green-100" : ""}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Disalin
                  </>
                ) : (
                  "Salin"
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-1">
            <Label className="text-sm">Bagikan melalui media sosial</Label>
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-blue-50 hover:bg-blue-100"
                onClick={() => {
                  toast({
                    title: "Dibagikan ke Facebook",
                    description: "Campuran herbal telah dibagikan ke Facebook",
                  });
                }}
              >
                <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
                  ></path>
                </svg>
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-sky-50 hover:bg-sky-100"
                onClick={() => {
                  toast({
                    title: "Dibagikan ke Twitter",
                    description: "Campuran herbal telah dibagikan ke Twitter",
                  });
                }}
              >
                <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                  ></path>
                </svg>
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-green-50 hover:bg-green-100"
                onClick={() => {
                  toast({
                    title: "Dibagikan ke WhatsApp",
                    description: "Campuran herbal telah dibagikan ke WhatsApp",
                  });
                }}
              >
                <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                  ></path>
                </svg>
                WhatsApp
              </Button>
            </div>
          </div>
          
          <form onSubmit={handleShareByEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Kirim via Email</Label>
              <Input
                id="email"
                placeholder="email@contoh.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Pesan (opsional)</Label>
              <Textarea
                id="message"
                placeholder="Hai, saya pikir kamu akan menyukai campuran herbal ini..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
            
            <Button type="submit" disabled={isSending || !email}>
              {isSending ? (
                <>
                  Mengirim...{" "}
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
                "Kirim Email"
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HerbalBlendShare;
