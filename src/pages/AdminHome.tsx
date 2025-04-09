
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Plus, Edit, Trash, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock article data
interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  status: "published" | "draft";
}

const AdminHome = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState<Article[]>([
    {
      id: "1",
      title: "Manfaat Jahe untuk Kesehatan",
      excerpt: "Jahe memiliki sifat anti-inflamasi dan antioksidan yang dapat membantu meredakan mual dan nyeri.",
      category: "Rempah",
      date: "2025-04-01",
      status: "published",
    },
    {
      id: "2",
      title: "Kunyit: Rempah Ajaib untuk Sistem Imun",
      excerpt: "Kurkumin dalam kunyit dapat meningkatkan sistem kekebalan tubuh dan mengurangi peradangan.",
      category: "Rempah",
      date: "2025-03-28",
      status: "published",
    },
    {
      id: "3",
      title: "Khasiat Temulawak untuk Pencernaan",
      excerpt: "Temulawak telah digunakan selama berabad-abad untuk mengatasi masalah pencernaan dan liver.",
      category: "Herbal",
      date: "2025-03-25",
      status: "draft",
    },
  ]);
  
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  
  // Filter articles based on search term
  const filteredArticles = articles.filter(
    article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter(article => article.id !== id));
    toast({
      title: "Artikel dihapus",
      description: "Artikel telah berhasil dihapus.",
    });
  };
  
  const handleSaveArticle = (article: Article) => {
    if (editingArticle) {
      // Update existing article
      setArticles(articles.map(a => (a.id === article.id ? article : a)));
      toast({
        title: "Artikel diperbarui",
        description: "Artikel telah berhasil diperbarui.",
      });
    } else {
      // Add new article
      const newArticle = {
        ...article,
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
      };
      setArticles([newArticle, ...articles]);
      toast({
        title: "Artikel ditambahkan",
        description: "Artikel baru telah berhasil ditambahkan.",
      });
    }
    setEditingArticle(null);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
              <FileText className="h-8 w-8" />
              Kelola Artikel
            </h1>
            <p className="text-muted-foreground">
              Tambah, edit, dan hapus artikel tentang tanaman herbal.
            </p>
          </div>
          
          <Dialog onOpenChange={(open) => !open && setEditingArticle(null)}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-herb-primary hover:bg-herb-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Artikel Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingArticle ? "Edit Artikel" : "Tambah Artikel Baru"}</DialogTitle>
                <DialogDescription>
                  {editingArticle ? "Edit detail artikel yang ada." : "Buat artikel baru tentang tanaman herbal."}
                </DialogDescription>
              </DialogHeader>
              <ArticleForm 
                article={editingArticle || undefined} 
                onSave={handleSaveArticle} 
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Artikel</CardTitle>
            <CardDescription>Kelola seluruh artikel tentang tanaman herbal.</CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead className="hidden md:table-cell">Kategori</TableHead>
                  <TableHead className="hidden md:table-cell">Tanggal</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Tidak ada artikel yang ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">
                        <div>
                          <p className="font-medium">{article.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1 md:hidden">
                            {article.category} · {article.date}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{article.category}</TableCell>
                      <TableCell className="hidden md:table-cell">{article.date}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={article.status === "published" ? "default" : "outline"}>
                          {article.status === "published" ? "Publikasi" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog onOpenChange={(open) => !open && setEditingArticle(null)}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setEditingArticle(article)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>Edit Artikel</DialogTitle>
                                <DialogDescription>
                                  Edit detail artikel yang ada.
                                </DialogDescription>
                              </DialogHeader>
                              <ArticleForm 
                                article={editingArticle || undefined} 
                                onSave={handleSaveArticle} 
                              />
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteArticle(article.id)}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Hapus</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

interface ArticleFormProps {
  article?: Article;
  onSave: (article: Article) => void;
}

const ArticleForm = ({ article, onSave }: ArticleFormProps) => {
  const [title, setTitle] = useState(article?.title || "");
  const [excerpt, setExcerpt] = useState(article?.excerpt || "");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(article?.category || "");
  const [status, setStatus] = useState<"published" | "draft">(article?.status || "draft");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: article?.id || "",
      title,
      excerpt,
      category,
      date: article?.date || new Date().toISOString().split("T")[0],
      status,
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="title">Judul</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul artikel"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Kategori</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Contoh: Rempah, Herbal, Tanaman Hias"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="excerpt">Ringkasan</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Ringkasan singkat artikel"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Konten</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Isi konten artikel lengkap"
            rows={6}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                checked={status === "published"}
                onChange={() => setStatus("published")}
                className="rounded-full text-herb-primary"
              />
              <span>Publikasi</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                checked={status === "draft"}
                onChange={() => setStatus("draft")}
                className="rounded-full text-herb-primary"
              />
              <span>Draft</span>
            </label>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="bg-herb-primary hover:bg-herb-primary/90">
          {article ? "Simpan Perubahan" : "Tambah Artikel"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default AdminHome;
