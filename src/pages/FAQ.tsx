
import React from "react";
import Layout from "@/components/layout/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, HelpCircle, Book, Leaf, BeakerIcon, Heart } from "lucide-react";

const FAQ = () => {
  const categories = [
    { id: "general", name: "Umum", icon: <HelpCircle className="w-5 h-5" /> },
    { id: "encyclopedia", name: "Ensiklopedia", icon: <Book className="w-5 h-5" /> },
    { id: "mixer", name: "Peracik Herbal", icon: <BeakerIcon className="w-5 h-5" /> },
    { id: "remedies", name: "Ramuan", icon: <Heart className="w-5 h-5" /> },
    { id: "herbs", name: "Tanaman Herbal", icon: <Leaf className="w-5 h-5" /> },
  ];
  
  return (
    <Layout className="min-h-screen bg-herb-light/30 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-herb-primary mb-6 text-center">
            Pertanyaan yang Sering Diajukan
          </h1>
          
          <div className="mb-10 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-herb-primary mb-4">
              Tidak menemukan jawaban yang Anda cari?
            </h2>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex-grow relative">
                <input
                  type="text"
                  placeholder="Cari pertanyaan..."
                  className="herb-input w-full"
                />
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-herb-primary hover:bg-herb-primary/90">
                    Ajukan Pertanyaan
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajukan Pertanyaan</DialogTitle>
                    <DialogDescription>
                      Kirimkan pertanyaan Anda dan tim kami akan segera menjawabnya.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Nama Anda
                      </label>
                      <input
                        type="text"
                        className="herb-input w-full"
                        placeholder="Masukkan nama Anda"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="herb-input w-full"
                        placeholder="email@contoh.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Pertanyaan Anda
                      </label>
                      <textarea
                        className="herb-input w-full min-h-[100px]"
                        placeholder="Masukkan pertanyaan Anda di sini..."
                      ></textarea>
                    </div>
                    <Button className="w-full bg-herb-primary hover:bg-herb-primary/90">
                      Kirim Pertanyaan
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="flex items-center justify-center gap-2 bg-white p-4 rounded-lg shadow-sm hover:bg-herb-light/50 transition-colors text-center"
              >
                {category.icon}
                <span className="font-medium">{category.name}</span>
              </a>
            ))}
          </div>
          
          <section id="general" className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-6 w-6 text-herb-primary" />
              <h2 className="text-2xl font-semibold text-herb-primary">Umum</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Apa itu Herbal Alchemy?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Herbal Alchemy adalah platform interaktif yang menggabungkan pengetahuan tradisional tentang obat herbal dengan pendekatan modern. Platform ini memungkinkan pengguna untuk menjelajahi ensiklopedia herbal, merancang campuran herbal kustom, menemukan ramuan untuk kondisi kesehatan tertentu, dan belajar tentang berbagai metode persiapan herbal.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Siapa yang dapat menggunakan platform ini?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Platform ini dirancang untuk semua orang yang tertarik dengan pengobatan herbal, mulai dari pemula yang ingin belajar dasar-dasar herbal hingga praktisi berpengalaman yang ingin memperdalam pengetahuan mereka. Platform ini juga berguna bagi peneliti, mahasiswa, dan profesional kesehatan yang ingin mengakses informasi berbasis bukti tentang herbal.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Apakah semua informasi di situs ini didukung oleh bukti ilmiah?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Ya, kami berupaya menyajikan informasi yang didukung oleh penelitian ilmiah dan literatur medis. Namun, beberapa informasi juga berasal dari pengetahuan tradisional yang telah diwariskan selama berabad-abad. Kami selalu berusaha membedakan antara klaim yang didukung oleh penelitian ilmiah dan yang berasal dari pengetahuan tradisional. Referensi untuk klaim-klaim utama selalu disediakan.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Bagaimana saya bisa berkontribusi pada platform ini?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Kami menyambut kontribusi dari komunitas. Anda dapat berkontribusi dengan berbagai cara: berbagi pengalaman penggunaan herbal, memberikan umpan balik tentang ramuan yang ada di platform, mengirimkan resep herbal tradisional dari keluarga atau komunitas Anda, atau bahkan berkolaborasi dengan kami dalam penelitian jika Anda adalah seorang peneliti atau praktisi kesehatan.
                  </p>
                  <p className="text-gray-700 mt-2">
                    Untuk informasi lebih lanjut tentang cara berkontribusi, silakan hubungi kami melalui formulir kontak atau email di muhammadsobrimaulana31@gmail.com.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          
          <section id="encyclopedia" className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Book className="h-6 w-6 text-herb-primary" />
              <h2 className="text-2xl font-semibold text-herb-primary">Ensiklopedia</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Bagaimana cara menemukan herbal tertentu di ensiklopedia?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Anda dapat mencari herbal tertentu dengan menggunakan kotak pencarian di bagian atas halaman Ensiklopedia. Anda juga dapat memfilter herbal berdasarkan kategori, manfaat kesehatan, atau asal geografisnya. Selain itu, Anda dapat menjelajahi herbal secara alfabetis.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Apakah semua tanaman di ensiklopedia tersedia di Indonesia?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Sebagian besar tanaman yang ada di ensiklopedia kami berfokus pada tanaman yang tersedia atau tumbuh di Indonesia. Namun, kami juga menyertakan beberapa tanaman populer dari seluruh dunia yang mungkin tersedia di pasar lokal atau dapat diimpor. Kami selalu menunjukkan asal geografis setiap tanaman dan ketersediaannya di Indonesia.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Apa arti dari simbol-simbol di halaman detail herbal?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Simbol-simbol yang digunakan di halaman detail herbal membantu mengidentifikasi karakteristik kunci tanaman:
                  </p>
                  <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
                    <li>🌱 - Tanaman mudah ditanam di iklim Indonesia</li>
                    <li>⚠️ - Perhatian khusus diperlukan (seperti interaksi atau kontraindikasi)</li>
                    <li>🔬 - Bukti ilmiah kuat mendukung penggunaan</li>
                    <li>🏛️ - Penggunaan tradisional yang telah ada selama berabad-abad</li>
                    <li>♨️ - Dapat digunakan secara eksternal (topikal)</li>
                    <li>☕ - Dapat digunakan untuk membuat teh herbal</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          
          <section id="mixer" className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <BeakerIcon className="h-6 w-6 text-herb-primary" />
              <h2 className="text-2xl font-semibold text-herb-primary">Peracik Herbal</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Bagaimana cara menggunakan fitur Peracik Herbal?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Untuk menggunakan fitur Peracik Herbal, ikuti langkah-langkah berikut:
                  </p>
                  <ol className="list-decimal ml-6 mt-2 space-y-2 text-gray-700">
                    <li>Buka halaman Peracik Herbal dari menu navigasi</li>
                    <li>Pilih tanaman herbal dari daftar dropdown atau pencarian</li>
                    <li>Tambahkan tanaman ke campuran Anda dengan mengklik tombol "Tambahkan"</li>
                    <li>Atur proporsi atau jumlah setiap tanaman jika diinginkan</li>
                    <li>Klik tombol "Analisis Campuran" untuk melihat interaksi dan manfaat potensial dari kombinasi tersebut</li>
                    <li>Anda dapat menyimpan campuran untuk digunakan nanti jika Anda sudah login</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Apakah fitur AI pada Peracik Herbal akurat?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Fitur AI pada Peracik Herbal memberikan analisis berdasarkan data ilmiah yang tersedia dan pengetahuan tradisional. Meskipun kami berusaha memberikan informasi yang akurat, rekomendasi AI harus digunakan sebagai titik awal untuk eksplorasi lebih lanjut, bukan sebagai pengganti saran medis profesional.
                  </p>
                  <p className="text-gray-700 mt-2">
                    AI kami terus belajar dan meningkatkan kemampuannya seiring bertambahnya data dan umpan balik pengguna. Kami selalu menyarankan untuk mengkonsultasikan campuran herbal dengan profesional kesehatan sebelum digunakan untuk tujuan terapi.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Bagaimana AI menentukan interaksi antar tanaman?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    AI kami menentukan interaksi antar tanaman dengan menganalisis berbagai sumber data:
                  </p>
                  <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
                    <li>Studi ilmiah tentang interaksi herbal</li>
                    <li>Komposisi kimia tanaman dan bagaimana senyawa aktif berinteraksi</li>
                    <li>Data dari praktek pengobatan tradisional</li>
                    <li>Laporan kasus dan literatur medis</li>
                    <li>Umpan balik dari pengguna dan praktisi herbal</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    Perlu dicatat bahwa medan interaksi herbal masih merupakan area penelitian yang berkembang, dan tidak semua interaksi sepenuhnya dipahami oleh ilmu pengetahuan modern.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          
          <section id="remedies" className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-herb-primary" />
              <h2 className="text-2xl font-semibold text-herb-primary">Ramuan</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Apakah ramuan-ramuan ini telah teruji secara klinis?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Tingkat pengujian klinis berbeda untuk setiap ramuan. Beberapa ramuan telah melalui uji klinis ketat, sementara yang lain didasarkan pada penggunaan tradisional dan bukti anekdotal. Pada halaman detail setiap ramuan, kami menunjukkan tingkat bukti ilmiah yang mendukungnya dengan sistem peringkat yang jelas.
                  </p>
                  <p className="text-gray-700 mt-2">
                    Kami terus memperbarui database kami saat penelitian baru muncul dan selalu berusaha untuk memberi tahu pengguna tentang kekuatan bukti di balik setiap klaim.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Bagaimana saya bisa menyimpan ramuan favorit?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Untuk menyimpan ramuan favorit, Anda perlu membuat akun dan login. Setelah login, Anda dapat menyimpan ramuan dengan mengklik tombol "Simpan" atau ikon hati di halaman detail ramuan. Ramuan yang disimpan akan muncul di dasbor akun Anda untuk akses cepat di masa mendatang.
                  </p>
                  <p className="text-gray-700 mt-2">
                    Anda juga dapat mengatur ramuan favorit Anda ke dalam koleksi atau kategori untuk organisasi yang lebih baik.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Apakah aman menggunakan beberapa ramuan berbeda secara bersamaan?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Penggunaan beberapa ramuan secara bersamaan harus dilakukan dengan hati-hati. Tanaman herbal mengandung senyawa aktif yang dapat berinteraksi satu sama lain atau dengan obat-obatan. Beberapa kombinasi mungkin aman dan bahkan sinergis, sementara yang lain berpotensi menimbulkan masalah.
                  </p>
                  <p className="text-gray-700 mt-2">
                    Kami menyarankan untuk:
                  </p>
                  <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
                    <li>Konsultasikan dengan profesional kesehatan sebelum menggabungkan ramuan</li>
                    <li>Gunakan fitur Peracik Herbal kami untuk memeriksa interaksi potensial</li>
                    <li>Perkenalkan ramuan secara bertahap untuk memantau efek</li>
                    <li>Perhatikan dengan cermat setiap perubahan dalam kesehatan Anda</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          
          <section id="herbs" className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-herb-primary" />
              <h2 className="text-2xl font-semibold text-herb-primary">Tanaman Herbal</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Bagaimana cara menanam herbal sendiri di rumah?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Banyak tanaman herbal dapat ditanam dengan mudah di rumah, baik di kebun, pot, atau bahkan di ambang jendela. Untuk memulai:
                  </p>
                  <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
                    <li>Pilih tanaman yang sesuai dengan iklim dan ruang yang Anda miliki</li>
                    <li>Gunakan tanah dan pot berkualitas baik dengan drainase yang tepat</li>
                    <li>Perhatikan kebutuhan cahaya matahari setiap tanaman</li>
                    <li>Siram secukupnya - kebanyakan herbal lebih suka tanah yang agak kering daripada terlalu basah</li>
                    <li>Panen secara teratur untuk mendorong pertumbuhan baru</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    Detail spesifik untuk menanam setiap herbal tersedia di halaman detail tanaman di ensiklopedia kami. Beberapa tanaman yang mudah untuk pemula termasuk kemangi, pegagan, lidah buaya, dan jahe.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Berapa lama tanaman herbal segar dapat disimpan?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Masa simpan tanaman herbal segar bervariasi tergantung pada jenis tanaman dan metode penyimpanan:
                  </p>
                  <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
                    <li><strong>Di kulkas:</strong> Kebanyakan herbal berdaun seperti kemangi atau ketumbar bertahan 1-2 minggu jika dibungkus dengan lembut dalam handuk kertas lembab dan disimpan dalam kantong plastik berlubang</li>
                    <li><strong>Dalam air:</strong> Beberapa herbal seperti seledri atau peterseli dapat disimpan dalam gelas air di kulkas hingga 2 minggu</li>
                    <li><strong>Beku:</strong> Banyak herbal dapat dibekukan hingga 6 bulan, baik utuh, cincang, atau dalam bentuk es batu herbal</li>
                    <li><strong>Rempah umbi (jahe, kunyit):</strong> Dapat disimpan di tempat sejuk dan gelap hingga beberapa minggu</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    Untuk masa simpan terbaik, kami sarankan mengeringkan atau membekukan herbal jika Anda tidak berencana menggunakannya dalam waktu dekat.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Apakah bisa membeli produk herbal langsung dari platform ini?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Ya, kami menyediakan toko online yang menawarkan berbagai produk herbal berkualitas tinggi, termasuk teh herbal, ekstrak, tincture, dan produk perawatan kulit herbal. Semua produk yang kami jual telah melalui proses seleksi ketat untuk memastikan kualitas dan keasliannya.
                  </p>
                  <p className="text-gray-700 mt-2">
                    Untuk mengakses toko, klik pada tab "Toko" di menu navigasi. Anda dapat mencari produk berdasarkan kategori, manfaat kesehatan, atau tanaman spesifik. Pengiriman tersedia ke seluruh Indonesia.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <h2 className="text-xl font-semibold text-herb-primary mb-2">Masih punya pertanyaan?</h2>
            <p className="text-gray-700 mb-4">
              Hubungi kami langsung melalui email atau media sosial kami
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="mailto:muhammadsobrimaulana31@gmail.com" 
                className="text-herb-primary hover:text-herb-secondary transition-colors"
              >
                Email
              </a>
              <a 
                href="https://github.com/sobri3195" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-herb-primary hover:text-herb-secondary transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://lynk.id/muhsobrimaulana" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-herb-primary hover:text-herb-secondary transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
