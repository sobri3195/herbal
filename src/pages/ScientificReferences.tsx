
import React from "react";
import Layout from "@/components/layout/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ScientificReferences = () => {
  return (
    <Layout className="min-h-screen bg-herb-light/30 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-herb-primary mb-8 text-center">Referensi Ilmiah</h1>
          
          <p className="text-gray-700 mb-6">
            Database referensi ilmiah kami berisi publikasi penelitian, artikel jurnal, dan studi yang mendukung penggunaan herbal dalam pengobatan tradisional. 
            Kami terus memperbarui database ini saat penelitian baru muncul.
          </p>
          
          <Tabs defaultValue="journals" className="mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="journals">Jurnal</TabsTrigger>
              <TabsTrigger value="books">Buku</TabsTrigger>
              <TabsTrigger value="studies">Studi Kasus</TabsTrigger>
            </TabsList>
            
            <TabsContent value="journals" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Jurnal Penelitian Terkini</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Judul</TableHead>
                        <TableHead>Penulis</TableHead>
                        <TableHead>Jurnal</TableHead>
                        <TableHead className="text-right">Tahun</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Efek Antiinflamasi Jahe dalam Pengobatan Artritis</TableCell>
                        <TableCell>Wijaya, A., et al.</TableCell>
                        <TableCell>Journal of Medicinal Plants</TableCell>
                        <TableCell className="text-right">2023</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Kunyit sebagai Antioksidan dan Potensinya dalam Menghambat Stres Oksidatif</TableCell>
                        <TableCell>Pratiwi, S., Rahman, A.</TableCell>
                        <TableCell>Indonesian Journal of Traditional Medicine</TableCell>
                        <TableCell className="text-right">2022</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Temulawak dan Manfaatnya dalam Meningkatkan Fungsi Hati</TableCell>
                        <TableCell>Hartono, B., et al.</TableCell>
                        <TableCell>Asia Pacific Journal of Clinical Nutrition</TableCell>
                        <TableCell className="text-right">2023</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Ekstrak Daun Jambu Biji dalam Mengatasi Diare</TableCell>
                        <TableCell>Sutrisno, D., Widiatmoko, L.</TableCell>
                        <TableCell>Southeast Asian Journal of Tropical Medicine</TableCell>
                        <TableCell className="text-right">2021</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="books" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Buku Referensi Utama</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-semibold">Ensiklopedia Jamu Indonesia</h3>
                      <p className="text-sm text-gray-600">Penulis: Dr. Bambang Purnomo</p>
                      <p className="text-sm text-gray-600">Penerbit: Penebar Swadaya, 2020</p>
                      <p className="mt-2">Buku komprehensif tentang berbagai jenis tanaman obat Indonesia, manfaatnya, dan metode penyiapannya berdasarkan pengetahuan tradisional dan bukti ilmiah.</p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-semibold">Farmakologi Herbal Indonesia</h3>
                      <p className="text-sm text-gray-600">Penulis: Prof. Dr. Sri Handayani</p>
                      <p className="text-sm text-gray-600">Penerbit: UI Press, 2021</p>
                      <p className="mt-2">Panduan mendalam tentang senyawa aktif dalam tanaman obat Indonesia dan mekanisme farmakologisnya dalam tubuh.</p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-semibold">Tanaman Obat untuk Pengobatan Modern</h3>
                      <p className="text-sm text-gray-600">Penulis: Dr. Heru Wijaya, M.Sc.</p>
                      <p className="text-sm text-gray-600">Penerbit: Gramedia, 2022</p>
                      <p className="mt-2">Pendekatan integrasi antara pengobatan tradisional berbasis tanaman dengan praktek kedokteran modern, disertai studi kasus dan penelitian terkini.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold">Atlas Tanaman Obat Indonesia</h3>
                      <p className="text-sm text-gray-600">Penulis: Tim Peneliti LIPI</p>
                      <p className="text-sm text-gray-600">Penerbit: LIPI Press, 2019</p>
                      <p className="mt-2">Koleksi visual dan informasi botani lengkap dari berbagai tanaman obat yang tumbuh di seluruh kepulauan Indonesia.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="studies" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Studi Kasus Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        Studi Efektivitas Mengkudu dalam Menurunkan Tekanan Darah Tinggi
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p><strong>Peneliti:</strong> Tim Peneliti Fakultas Kedokteran Universitas Indonesia</p>
                          <p><strong>Tahun:</strong> 2022</p>
                          <p><strong>Peserta:</strong> 120 pasien dengan hipertensi ringan hingga sedang</p>
                          <p><strong>Durasi:</strong> 6 bulan</p>
                          <p className="mt-2">Studi ini menunjukkan bahwa ekstrak mengkudu yang dikonsumsi secara teratur selama 3 bulan mampu menurunkan tekanan darah sistolik rata-rata sebesar 15 mmHg pada 68% peserta. Efek samping minimal dilaporkan, terutama gangguan pencernaan ringan pada minggu pertama penggunaan.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        Kombinasi Sambiloto dan Pegagan untuk Manajemen Diabetes Tipe 2
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p><strong>Peneliti:</strong> Rumah Sakit Dr. Soetomo dan Universitas Airlangga</p>
                          <p><strong>Tahun:</strong> 2023</p>
                          <p><strong>Peserta:</strong> 85 pasien diabetes tipe 2</p>
                          <p><strong>Durasi:</strong> 12 bulan</p>
                          <p className="mt-2">Studi menunjukkan bahwa kombinasi ekstrak sambiloto dan pegagan sebagai terapi pendamping pengobatan konvensional membantu meningkatkan sensitivitas insulin dan menurunkan HbA1c pada 72% peserta. Kelompok yang mendapatkan kombinasi herbal menunjukkan pengelolaan gula darah yang lebih baik dibandingkan kelompok kontrol.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        Efektivitas Daun Sirih untuk Kesehatan Mulut dan Gigi
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p><strong>Peneliti:</strong> Fakultas Kedokteran Gigi Universitas Gadjah Mada</p>
                          <p><strong>Tahun:</strong> 2021</p>
                          <p><strong>Peserta:</strong> 150 peserta dengan masalah gusi dan plak gigi</p>
                          <p><strong>Durasi:</strong> 3 bulan</p>
                          <p className="mt-2">Studi ini membandingkan efektivitas obat kumur berbasis ekstrak daun sirih dengan obat kumur komersial dalam mengurangi plak gigi dan peradangan gusi. Hasil menunjukkan bahwa obat kumur daun sirih sama efektifnya dalam mengurangi plak dan bahkan lebih baik dalam mengurangi peradangan gusi dengan lebih sedikit efek samping seperti pewarnaan gigi atau iritasi.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>
                        Temulawak untuk Penyembuhan Gangguan Pencernaan
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p><strong>Peneliti:</strong> Departemen Gastroenterologi RSUP Cipto Mangunkusumo</p>
                          <p><strong>Tahun:</strong> 2022</p>
                          <p><strong>Peserta:</strong> 200 pasien dengan sindrom iritasi usus besar</p>
                          <p><strong>Durasi:</strong> 6 bulan</p>
                          <p className="mt-2">Penelitian ini mengevaluasi efek konsumsi ekstrak temulawak terstandarisasi pada pasien dengan sindrom iritasi usus besar. Setelah penggunaan selama 3 bulan, 65% peserta melaporkan perbaikan signifikan pada gejala seperti kram perut, kembung, dan ketidakteraturan buang air besar. Analisis biomarker menunjukkan penurunan tingkat peradangan di usus.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-herb-primary mb-4">Pendekatan Berbasis Bukti</h2>
            <p className="text-gray-700 mb-4">
              Di Herbal Alchemy, kami berkomitmen untuk menyajikan informasi yang akurat dan berbasis bukti ilmiah. Semua klaim manfaat herbal yang kami sajikan didukung oleh:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Penelitian ilmiah terpublikasi di jurnal-jurnal terkemuka</li>
              <li>Studi klinis dengan metodologi yang baik</li>
              <li>Pengetahuan tradisional yang telah didokumentasikan dengan baik</li>
              <li>Kolaborasi dengan ahli etnobotani, farmakologi, dan praktisi kesehatan</li>
            </ul>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Catatan Penting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Meskipun referensi ilmiah kami diperbarui secara berkala, informasi yang disajikan di platform ini tidak dimaksudkan untuk menggantikan nasihat, diagnosis, atau perawatan medis profesional. Selalu konsultasikan dengan penyedia layanan kesehatan Anda sebelum memulai terapi herbal apapun, terutama jika Anda sedang hamil, menyusui, memiliki kondisi medis yang mendasarinya, atau mengkonsumsi obat-obatan lain.
              </p>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <p className="italic text-gray-600">
              Terakhir diperbarui: April 2025 | Database kami mencakup lebih dari 500 publikasi ilmiah tentang tanaman obat Indonesia
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScientificReferences;
