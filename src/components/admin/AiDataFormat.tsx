
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AiDataFormat = () => {
  const handleDownloadTemplate = () => {
    // In a real app, this would download a real Excel template
    // For now, just show what the file structure would be
    
    // CSV content for the template
    const csvContent = `Nama Herbal,Nama Latin,Kategori,Sifat,Khasiat,Kandungan,Daerah Asal,Cara Penggunaan
Jahe,Zingiber officinale,Rimpang,Hangat,Meredakan mual dan batuk,Gingerol dan shogaol,Jawa Timur,Diseduh atau digunakan dalam masakan
Temulawak,Curcuma zanthorrhiza,Rimpang,Hangat,Meningkatkan nafsu makan,Kurkumin dan xanthorrhizol,Jawa Barat,Direbus atau dijadikan jamu
Kunyit,Curcuma longa,Rimpang,Netral,Anti-inflamasi,Kurkumin dan minyak atsiri,Jawa Tengah,Dihaluskan atau dijadikan minuman
,,,,,,,,`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'template_data_ai_herbal.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Format Data AI</CardTitle>
        <CardDescription>
          Panduan format data untuk pelatihan model AI HerbalAlchemy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            Untuk melatih model AI kami agar memberikan rekomendasi yang akurat, 
            data herbal perlu diformat dalam struktur yang konsisten. Berikut adalah 
            struktur data yang diperlukan:
          </p>
          
          <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Kolom</th>
                  <th className="text-left py-2 px-3">Tipe Data</th>
                  <th className="text-left py-2 px-3">Deskripsi</th>
                  <th className="text-left py-2 px-3">Contoh</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3 font-medium">Nama Herbal</td>
                  <td className="py-2 px-3">Teks</td>
                  <td className="py-2 px-3">Nama umum tanaman herbal</td>
                  <td className="py-2 px-3">Jahe</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-medium">Nama Latin</td>
                  <td className="py-2 px-3">Teks</td>
                  <td className="py-2 px-3">Nama ilmiah tanaman</td>
                  <td className="py-2 px-3">Zingiber officinale</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-medium">Kategori</td>
                  <td className="py-2 px-3">Teks</td>
                  <td className="py-2 px-3">Kategori bagian tanaman</td>
                  <td className="py-2 px-3">Daun/Akar/Buah/Rimpang</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-medium">Sifat</td>
                  <td className="py-2 px-3">Teks</td>
                  <td className="py-2 px-3">Karakteristik tanaman</td>
                  <td className="py-2 px-3">Hangat/Dingin/Netral</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-medium">Khasiat</td>
                  <td className="py-2 px-3">Teks</td>
                  <td className="py-2 px-3">Manfaat kesehatan</td>
                  <td className="py-2 px-3">Meredakan batuk, anti-inflamasi</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-medium">Kandungan</td>
                  <td className="py-2 px-3">Teks</td>
                  <td className="py-2 px-3">Senyawa aktif</td>
                  <td className="py-2 px-3">Gingerol, kurkumin</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-medium">Daerah Asal</td>
                  <td className="py-2 px-3">Teks</td>
                  <td className="py-2 px-3">Asal geografis tanaman</td>
                  <td className="py-2 px-3">Jawa, Sumatra, Kalimantan</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">Cara Penggunaan</td>
                  <td className="py-2 px-3">Teks</td>
                  <td className="py-2 px-3">Metode pemakaian</td>
                  <td className="py-2 px-3">Direbus, dihaluskan, diseduh</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="pt-4">
            <p className="mb-4">
              Unduh template CSV berikut untuk memudahkan penginputan data herbal yang 
              akan digunakan untuk pelatihan model AI:
            </p>
            <Button onClick={handleDownloadTemplate}>
              <Download className="mr-2 h-4 w-4" />
              Unduh Template CSV
            </Button>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mt-6">
            <h4 className="font-medium text-amber-800 mb-2">Catatan Penting:</h4>
            <ul className="list-disc pl-5 space-y-1 text-amber-700 text-sm">
              <li>Pastikan tidak ada kolom yang kosong.</li>
              <li>Untuk data dengan beberapa nilai, pisahkan dengan koma.</li>
              <li>Simpan file dalam format CSV atau Excel (.xlsx).</li>
              <li>Minimal 20 entri data diperlukan untuk hasil AI yang baik.</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiDataFormat;
