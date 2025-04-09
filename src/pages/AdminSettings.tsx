
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Settings, User, Bell, Shield } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";

const AdminSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    toast({
      title: "Profil diperbarui",
      description: "Informasi profil Anda telah berhasil diperbarui.",
    });
  };
  
  const handleToggleNotifications = (checked: boolean) => {
    setNotificationsEnabled(checked);
    toast({
      title: checked ? "Notifikasi diaktifkan" : "Notifikasi dinonaktifkan",
      description: `Anda telah ${checked ? "mengaktifkan" : "menonaktifkan"} notifikasi.`,
    });
  };
  
  const handleToggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    // In a real app, this would toggle dark mode
    toast({
      title: checked ? "Mode gelap diaktifkan" : "Mode gelap dinonaktifkan",
      description: `Anda telah beralih ke mode ${checked ? "gelap" : "terang"}.`,
    });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 max-w-4xl px-4">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Settings className="h-8 w-8" />
          Pengaturan Admin
        </h1>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="account">
              <User className="w-4 h-4 mr-2" />
              Akun
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifikasi
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="w-4 h-4 mr-2" />
              Keamanan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Profil</CardTitle>
                <CardDescription>
                  Perbarui informasi profil dan pengaturan akun Anda.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="bg-herb-primary hover:bg-herb-primary/90">
                    Simpan Perubahan
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tampilan</CardTitle>
                <CardDescription>
                  Sesuaikan pengaturan tampilan aplikasi.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mode Gelap</p>
                    <p className="text-sm text-gray-500">
                      Aktifkan mode gelap untuk tampilan yang nyaman di malam hari.
                    </p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={handleToggleDarkMode}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Notifikasi</CardTitle>
                <CardDescription>
                  Kelola preferensi notifikasi Anda.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifikasi Email</p>
                    <p className="text-sm text-gray-500">
                      Terima notifikasi tentang pembaruan sistem dan aktivitas pengguna.
                    </p>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={handleToggleNotifications}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Keamanan Akun</CardTitle>
                <CardDescription>
                  Kelola pengaturan keamanan akun Anda.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Kata Sandi Saat Ini</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Kata Sandi Baru</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Kata Sandi Baru</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="bg-herb-primary hover:bg-herb-primary/90">
                  Ubah Kata Sandi
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
