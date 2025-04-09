
import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface NewsletterFormProps {
  className?: string;
  variant?: "default" | "card";
}

const NewsletterForm = ({ className, variant = "default" }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email diperlukan",
        description: "Mohon masukkan alamat email untuk berlangganan.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Berlangganan berhasil!",
        description: "Terima kasih telah berlangganan newsletter HerbalAlchemy.",
      });
      
      // Reset form
      setEmail("");
      setName("");
    } catch (error) {
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal berlangganan newsletter. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (variant === "card") {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="flex items-center mb-4">
          <div className="bg-herb-primary/20 rounded-full p-2 mr-3">
            <Mail className="h-5 w-5 text-herb-primary" />
          </div>
          <h3 className="text-lg font-semibold">Newsletter Herbal</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Berlangganan untuk mendapatkan tips herbal, resep ramuan, dan penawaran eksklusif langsung ke inbox Anda.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Nama Anda (opsional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex space-x-2">
            <Input
              type="email"
              placeholder="Email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="bg-herb-primary hover:bg-herb-primary/90 whitespace-nowrap"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Mendaftar..." : "Berlangganan"}
            </Button>
          </div>
        </form>
      </div>
    );
  }
  
  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <Mail className="h-5 w-5 text-herb-primary mr-2" />
        Dapatkan Update Herbal
      </h3>
      <p className="text-sm text-gray-600 mb-3">
        Berlangganan untuk mendapatkan tips herbal terbaru dan penawaran eksklusif.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Email Anda"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="max-w-[250px]"
          required
        />
        <Button 
          type="submit" 
          size="sm"
          className="bg-herb-primary hover:bg-herb-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "..." : "Langganan"}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterForm;
