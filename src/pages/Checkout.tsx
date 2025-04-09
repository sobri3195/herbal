
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { CreditCard, Truck, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const Checkout = () => {
  const { user } = useAuth();
  const { items, totalAmount, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [shippingMethod, setShippingMethod] = useState("regular");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });
  
  // Shipping costs
  const shippingCosts = {
    regular: 15000,
    express: 30000,
  };
  
  // Calculate final amount
  const shippingCost = shippingCosts[shippingMethod as keyof typeof shippingCosts];
  const finalAmount = totalAmount + shippingCost;
  
  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'postalCode'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon lengkapi semua data pengiriman.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate order processing
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart after successful checkout
      clearCart();
      
      toast({
        title: "Pesanan berhasil!",
        description: "Terima kasih telah berbelanja di HerbalAlchemy.",
      });
      
      // Redirect to success page or dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal memproses pesanan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <CreditCard className="h-8 w-8 text-herb-primary mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main checkout form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Informasi Pengiriman</CardTitle>
                  <CardDescription>
                    Masukkan alamat pengiriman yang valid.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nama Lengkap</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="08xxxxxxxxxx"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Masukkan alamat lengkap"
                      rows={2}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Kota</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Kode Pos</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Catatan (Opsional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Informasi tambahan untuk pengirim"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Metode Pengiriman</CardTitle>
                  <CardDescription>
                    Pilih metode pengiriman yang Anda inginkan.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={shippingMethod}
                    onValueChange={setShippingMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="regular" id="regular" />
                      <Label htmlFor="regular" className="flex flex-1 justify-between items-center cursor-pointer">
                        <div>
                          <p className="font-medium">Pengiriman Reguler</p>
                          <p className="text-sm text-gray-600">Estimasi 3-5 hari kerja</p>
                        </div>
                        <p className="font-medium">{formatPrice(shippingCosts.regular)}</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex flex-1 justify-between items-center cursor-pointer">
                        <div>
                          <p className="font-medium">Pengiriman Express</p>
                          <p className="text-sm text-gray-600">Estimasi 1-2 hari kerja</p>
                        </div>
                        <p className="font-medium">{formatPrice(shippingCosts.express)}</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Metode Pembayaran</CardTitle>
                  <CardDescription>
                    Pilih metode pembayaran yang Anda inginkan.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Label htmlFor="transfer" className="flex flex-1 justify-between items-center cursor-pointer">
                        <div>
                          <p className="font-medium">Transfer Bank</p>
                          <p className="text-sm text-gray-600">BCA, Mandiri, BNI, BRI</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="ewallet" id="ewallet" />
                      <Label htmlFor="ewallet" className="flex flex-1 justify-between items-center cursor-pointer">
                        <div>
                          <p className="font-medium">E-Wallet</p>
                          <p className="text-sm text-gray-600">GoPay, OVO, DANA, LinkAja</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex flex-1 justify-between items-center cursor-pointer">
                        <div>
                          <p className="font-medium">Bayar di Tempat (COD)</p>
                          <p className="text-sm text-gray-600">Bayar saat barang diterima</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-gray-500 flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-1 text-herb-primary" />
                    Semua transaksi aman dan terenkripsi
                  </p>
                </CardFooter>
              </Card>
            </form>
          </div>
          
          {/* Order summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
                <CardDescription>
                  {items.length} produk dalam keranjang
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start">
                        <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 mr-3">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-gray-600">{item.quantity} x {formatPrice(item.price)}</p>
                            <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(totalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pengiriman</span>
                      <span className="font-medium">{formatPrice(shippingCost)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-herb-primary">{formatPrice(finalAmount)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="button"
                  className="w-full bg-herb-primary hover:bg-herb-primary/90"
                  onClick={handleSubmit}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white mr-2"></span>
                      Memproses Pesanan...
                    </>
                  ) : (
                    <>
                      Selesaikan Pesanan <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <h3 className="flex items-center text-sm font-medium mb-2">
                <Truck className="h-4 w-4 mr-2 text-herb-primary" />
                Informasi Pengiriman
              </h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-1 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Pengiriman ke seluruh Indonesia</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-1 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Gratis pengiriman untuk pembelian di atas Rp 300.000</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-1 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Dikemas dengan aman untuk menjaga kualitas produk herbal</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
