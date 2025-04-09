
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Send, Users, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";

// Mock subscribers data
const mockSubscribers = [
  { id: "1", email: "user1@example.com", name: "John Doe", subscribed: true, joinedAt: "2023-01-15" },
  { id: "2", email: "user2@example.com", name: "Jane Smith", subscribed: true, joinedAt: "2023-02-22" },
  { id: "3", email: "user3@example.com", name: "Robert Johnson", subscribed: false, joinedAt: "2023-03-10" },
  { id: "4", email: "user4@example.com", name: "Emma Wilson", subscribed: true, joinedAt: "2023-04-05" },
  { id: "5", email: "user5@example.com", name: "Michael Brown", subscribed: true, joinedAt: "2023-05-17" },
  { id: "6", email: "user6@example.com", name: null, subscribed: true, joinedAt: "2023-06-20" },
  { id: "7", email: "user7@example.com", name: "Sarah Davis", subscribed: true, joinedAt: "2023-07-11" },
  { id: "8", email: "user8@example.com", name: "David Miller", subscribed: false, joinedAt: "2023-08-30" },
  { id: "9", email: "user9@example.com", name: null, subscribed: true, joinedAt: "2023-09-14" },
  { id: "10", email: "user10@example.com", name: "Lisa Taylor", subscribed: true, joinedAt: "2023-10-07" },
];

// Mock newsletters data
const mockNewsletters = [
  { 
    id: "1", 
    subject: "Tips Kesehatan Herbal Mingguan", 
    sentAt: "2023-10-01", 
    status: "sent",
    openRate: 68,
    recipients: 120 
  },
  { 
    id: "2", 
    subject: "5 Herbal untuk Meningkatkan Imunitas", 
    sentAt: "2023-09-15", 
    status: "sent", 
    openRate: 72,
    recipients: 115 
  },
  { 
    id: "3", 
    subject: "Diskon 20% untuk Semua Produk Herbal", 
    sentAt: "2023-09-01", 
    status: "sent", 
    openRate: 85,
    recipients: 110 
  },
  { 
    id: "4", 
    subject: "Produk Baru: Teh Herbal Premium", 
    sentAt: null, 
    status: "draft", 
    openRate: null,
    recipients: null 
  },
];

const AdminNewsletter = () => {
  const [activeTab, setActiveTab] = useState("compose");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sortField, setSortField] = useState("joinedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const { toast } = useToast();

  // Fetch subscribers
  const { data: subscribers, isLoading: loadingSubscribers } = useQuery({
    queryKey: ["newsletter-subscribers"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockSubscribers;
    },
  });

  // Fetch newsletters history
  const { data: newsletters, isLoading: loadingNewsletters } = useQuery({
    queryKey: ["newsletters-history"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockNewsletters;
    },
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers(subscribers?.filter(sub => sub.subscribed).map(sub => sub.id) || []);
    }
    setSelectAll(!selectAll);
  };

  const toggleSubscriberSelection = (id: string) => {
    if (selectedSubscribers.includes(id)) {
      setSelectedSubscribers(selectedSubscribers.filter(subId => subId !== id));
      setSelectAll(false);
    } else {
      setSelectedSubscribers([...selectedSubscribers, id]);
      // Check if all active subscribers are selected
      if (subscribers) {
        const activeSubscriberIds = subscribers.filter(sub => sub.subscribed).map(sub => sub.id);
        const allSelected = activeSubscriberIds.every(id => [...selectedSubscribers, id].includes(id));
        setSelectAll(allSelected);
      }
    }
  };

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !content) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon lengkapi subjek dan konten newsletter.",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedSubscribers.length === 0) {
      toast({
        title: "Tidak ada penerima",
        description: "Pilih minimal satu pelanggan untuk mengirim newsletter.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending newsletter
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Newsletter berhasil dikirim",
      description: `Newsletter telah dikirim ke ${selectedSubscribers.length} pelanggan.`,
    });
    
    // Reset form
    setSubject("");
    setContent("");
    setSelectedSubscribers([]);
    setSelectAll(false);
    setIsSending(false);
  };
  
  // Sort subscribers
  const sortedSubscribers = subscribers ? [...subscribers].sort((a, b) => {
    if (sortField === "joinedAt") {
      const dateA = new Date(a.joinedAt).getTime();
      const dateB = new Date(b.joinedAt).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }
    
    if (a[sortField as keyof typeof a] === null) return 1;
    if (b[sortField as keyof typeof b] === null) return -1;
    
    if (typeof a[sortField as keyof typeof a] === "string" && typeof b[sortField as keyof typeof b] === "string") {
      return sortDirection === "asc"
        ? (a[sortField as keyof typeof a] as string).localeCompare(b[sortField as keyof typeof b] as string)
        : (b[sortField as keyof typeof b] as string).localeCompare(a[sortField as keyof typeof a] as string);
    }
    
    return sortDirection === "asc"
      ? (a[sortField as keyof typeof a] as any) - (b[sortField as keyof typeof b] as any)
      : (b[sortField as keyof typeof b] as any) - (a[sortField as keyof typeof a] as any);
  }) : [];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Mail className="h-8 w-8 text-herb-primary mr-3" />
          <h1 className="text-3xl font-bold">Newsletter</h1>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Manajemen Newsletter</CardTitle>
          <CardDescription>
            Kirim newsletter ke pelanggan yang berlangganan informasi dari HerbalAlchemy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="compose">Buat Newsletter</TabsTrigger>
              <TabsTrigger value="history">Riwayat</TabsTrigger>
              <TabsTrigger value="subscribers">Pelanggan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="compose">
              <form onSubmit={handleSendNewsletter} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subjek Newsletter</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Masukkan subjek newsletter"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Konten Newsletter</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tulis konten newsletter di sini..."
                    rows={10}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Pilih Penerima ({selectedSubscribers.length} terpilih)</Label>
                  <div className="border rounded-md max-h-60 overflow-y-auto">
                    <Table>
                      <TableHeader className="sticky top-0 bg-white">
                        <TableRow>
                          <TableHead className="w-[50px]">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={toggleSelectAll}
                                className="rounded"
                              />
                            </div>
                          </TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Nama</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loadingSubscribers ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-10">
                              <div className="animate-spin rounded-full h-8 w-8 border-4 border-herb-primary border-t-transparent mx-auto"></div>
                              <p className="mt-2 text-herb-primary font-medium">Loading...</p>
                            </TableCell>
                          </TableRow>
                        ) : sortedSubscribers?.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-10">
                              <p>Tidak ada pelanggan yang ditemukan.</p>
                            </TableCell>
                          </TableRow>
                        ) : (
                          sortedSubscribers?.map((subscriber) => (
                            <TableRow key={subscriber.id}>
                              <TableCell>
                                <input
                                  type="checkbox"
                                  checked={selectedSubscribers.includes(subscriber.id)}
                                  onChange={() => toggleSubscriberSelection(subscriber.id)}
                                  disabled={!subscriber.subscribed}
                                  className="rounded"
                                />
                              </TableCell>
                              <TableCell>{subscriber.email}</TableCell>
                              <TableCell>{subscriber.name || "-"}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  subscriber.subscribed ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                                }`}>
                                  {subscriber.subscribed ? "Aktif" : "Berhenti"}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-herb-primary hover:bg-herb-primary/90"
                    disabled={isSending}
                  >
                    {isSending ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white mr-2"></span>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Kirim Newsletter
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subjek</TableHead>
                      <TableHead>Tanggal Kirim</TableHead>
                      <TableHead>Penerima</TableHead>
                      <TableHead>Open Rate</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingNewsletters ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10">
                          <div className="animate-spin rounded-full h-8 w-8 border-4 border-herb-primary border-t-transparent mx-auto"></div>
                          <p className="mt-2 text-herb-primary font-medium">Loading...</p>
                        </TableCell>
                      </TableRow>
                    ) : newsletters?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10">
                          <p>Belum ada riwayat newsletter.</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      newsletters?.map((newsletter) => (
                        <TableRow key={newsletter.id}>
                          <TableCell className="font-medium">{newsletter.subject}</TableCell>
                          <TableCell>{newsletter.sentAt || "-"}</TableCell>
                          <TableCell>{newsletter.recipients ?? "-"}</TableCell>
                          <TableCell>{newsletter.openRate ? `${newsletter.openRate}%` : "-"}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              newsletter.status === "sent" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                            }`}>
                              {newsletter.status === "sent" ? "Terkirim" : "Draft"}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="subscribers">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-herb-primary mr-2" />
                  <h3 className="text-lg font-medium">
                    Total Subscriber: {subscribers?.filter(sub => sub.subscribed).length || 0}
                  </h3>
                </div>
                
                <Button variant="outline" onClick={() => {
                  toast({
                    title: "Fitur dalam pengembangan",
                    description: "Import data subscriber akan segera tersedia.",
                  });
                }}>
                  Import Subscriber
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer" 
                        onClick={() => handleSort("email")}
                      >
                        <div className="flex items-center">
                          Email
                          {sortField === "email" && (
                            sortDirection === "asc" ? 
                            <ChevronUp className="h-4 w-4 ml-1" /> : 
                            <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer" 
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center">
                          Nama
                          {sortField === "name" && (
                            sortDirection === "asc" ? 
                            <ChevronUp className="h-4 w-4 ml-1" /> : 
                            <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer" 
                        onClick={() => handleSort("joinedAt")}
                      >
                        <div className="flex items-center">
                          Tanggal Gabung
                          {sortField === "joinedAt" && (
                            sortDirection === "asc" ? 
                            <ChevronUp className="h-4 w-4 ml-1" /> : 
                            <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingSubscribers ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-10">
                          <div className="animate-spin rounded-full h-8 w-8 border-4 border-herb-primary border-t-transparent mx-auto"></div>
                          <p className="mt-2 text-herb-primary font-medium">Loading...</p>
                        </TableCell>
                      </TableRow>
                    ) : sortedSubscribers?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-10">
                          <p>Tidak ada subscriber yang ditemukan.</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedSubscribers?.map((subscriber) => (
                        <TableRow key={subscriber.id}>
                          <TableCell className="font-medium">{subscriber.email}</TableCell>
                          <TableCell>{subscriber.name || "-"}</TableCell>
                          <TableCell>{subscriber.joinedAt}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Switch 
                                checked={subscriber.subscribed} 
                                // In a real app, this would update the status
                                onCheckedChange={() => {
                                  toast({
                                    title: "Status diperbarui",
                                    description: `Status ${subscriber.email} telah diperbarui.`,
                                  });
                                }}
                                className="mr-2"
                              />
                              <span className={subscriber.subscribed ? "text-green-600" : "text-red-600"}>
                                {subscriber.subscribed ? "Aktif" : "Berhenti"}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminNewsletter;
