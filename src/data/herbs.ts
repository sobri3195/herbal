
// Definisi tipe herbal
export interface Herb {
  id: string;
  name: string;
  latinName: string;
  description: string;
  benefits: string[];
  dosage: {
    adult: string;
    child?: string;
    elderly?: string;
    pregnant?: string;
  };
  preparation: string[];
  sideEffects: string[];
  warnings: string[];
  interactions: string[];
  image: string;
  categories: string[];
}

// Data sampel herbal
export const herbs: Herb[] = [
  {
    id: "turmeric",
    name: "Kunyit",
    latinName: "Curcuma longa",
    description: "Rempah kuning cerah yang umum digunakan dalam kari dan masakan Asia Selatan lainnya. Senyawa aktifnya kurkumin memiliki efek anti-inflamasi yang kuat dan merupakan antioksidan yang kuat.",
    benefits: [
      "Efek anti-inflamasi yang kuat",
      "Meningkatkan kapasitas antioksidan tubuh",
      "Dapat meningkatkan fungsi otak",
      "Dapat menurunkan risiko penyakit jantung",
      "Dapat membantu mencegah kanker",
      "Dapat membantu dengan artritis"
    ],
    dosage: {
      adult: "500-2000 mg kunyit per hari, atau 1-3 gram bubuk akar kering",
      child: "Tidak direkomendasikan untuk anak di bawah 12 tahun tanpa pengawasan medis",
      elderly: "Mulai dengan dosis rendah 500mg dan tingkatkan secara bertahap",
      pregnant: "Tidak direkomendasikan selama kehamilan tanpa pengawasan medis"
    },
    preparation: [
      "Teh: Seduh 1-2 sendok teh dalam air panas selama 10 menit",
      "Susu Kunyit: Campurkan dengan susu hangat dan madu",
      "Bubuk: Tambahkan ke makanan dan minuman",
      "Kapsul: Minum sesuai petunjuk"
    ],
    sideEffects: [
      "Dapat menyebabkan masalah pencernaan dalam dosis tinggi",
      "Dapat meningkatkan risiko pendarahan"
    ],
    warnings: [
      "Hindari jika Anda memiliki masalah kantung empedu",
      "Hentikan konsumsi kunyit setidaknya 2 minggu sebelum operasi terjadwal"
    ],
    interactions: [
      "Pengencer darah (peningkatan risiko pendarahan)",
      "Obat diabetes (dapat memperkuat efek)",
      "Pengurang asam lambung (dapat mengganggu kerja)"
    ],
    image: "/placeholder.svg",
    categories: ["Anti-inflamasi", "Antioksidan", "Bantuan Pencernaan"]
  },
  {
    id: "ginger",
    name: "Jahe",
    latinName: "Zingiber officinale",
    description: "Tanaman berbunga yang rimpangnya, akar jahe atau jahe, banyak digunakan sebagai rempah dan obat tradisional. Memiliki rasa hangat, pedas dan aroma yang harum.",
    benefits: [
      "Membantu dengan mual dan morning sickness",
      "Efek anti-inflamasi",
      "Dapat mengurangi nyeri otot",
      "Dapat membantu dengan osteoartritis",
      "Dapat menurunkan kadar gula darah",
      "Dapat membantu dengan gangguan pencernaan kronis"
    ],
    dosage: {
      adult: "1-4 gram jahe segar per hari, atau 250-500mg bubuk jahe kering",
      child: "Jumlah kecil dalam makanan aman; dosis obat harus diawasi",
      elderly: "Dosis dewasa standar, tapi mulai dengan jumlah lebih rendah",
      pregnant: "Hingga 1 gram per hari aman untuk morning sickness"
    },
    preparation: [
      "Teh: Seduh jahe segar yang diiris dalam air panas selama 5-10 menit",
      "Segar: Tambahkan jahe parut atau iris ke makanan",
      "Kapsul: Minum sesuai petunjuk",
      "Tingtur: 15-30 tetes dalam air, 2-3 kali sehari"
    ],
    sideEffects: [
      "Mulas atau ketidaknyamanan pencernaan pada individu sensitif",
      "Dapat menyebabkan iritasi mulut",
      "Dapat meningkatkan produksi empedu"
    ],
    warnings: [
      "Dapat memperlambat pembekuan darah",
      "Dosis tinggi dapat mempengaruhi ritme jantung pada individu sensitif"
    ],
    interactions: [
      "Pengencer darah (peningkatan risiko pendarahan)",
      "Obat diabetes (dapat memperkuat efek)",
      "Obat tekanan darah (dapat mengganggu)"
    ],
    image: "/placeholder.svg",
    categories: ["Bantuan Pencernaan", "Anti-mual", "Anti-inflamasi"]
  },
  {
    id: "peppermint",
    name: "Peppermint",
    latinName: "Mentha piperita",
    description: "Mint hibrida, persilangan antara watermint dan spearmint. Berasal dari Eropa dan Timur Tengah, tanaman ini sekarang tersebar luas dan dibudidayakan di banyak wilayah dunia.",
    benefits: [
      "Meredakan gejala pencernaan",
      "Dapat mengurangi sakit kepala",
      "Dapat membantu membersihkan hidung tersumbat",
      "Meredakan nyeri otot",
      "Mengurangi gejala IBS",
      "Dapat meningkatkan energi dan kewaspadaan"
    ],
    dosage: {
      adult: "1-2 sendok teh daun kering untuk teh, 3 kali sehari; atau 0,2-0,4 ml minyak",
      child: "Teh encer umumnya aman untuk anak di atas 5 tahun",
      elderly: "Dosis dewasa standar",
      pregnant: "Teh ringan sesekali umumnya aman, hindari minyak"
    },
    preparation: [
      "Teh: Seduh 1-2 sendok teh daun kering dalam air panas selama 10 menit",
      "Minyak: Diencerkan dalam minyak pembawa untuk penggunaan topikal",
      "Kapsul: Minum sesuai petunjuk",
      "Daun segar: Tambahkan ke makanan atau minuman"
    ],
    sideEffects: [
      "Mulas pada beberapa individu",
      "Reaksi alergi pada individu sensitif",
      "Dapat memperburuk gejala GERD"
    ],
    warnings: [
      "Hindari minyak peppermint secara internal untuk anak di bawah 12 tahun",
      "Penggunaan berlebihan dapat menyebabkan masalah jantung",
      "Hindari pada hernia hiatal atau GERD parah"
    ],
    interactions: [
      "Obat-obatan yang dimetabolisme oleh enzim hati",
      "Antasida (dapat melarutkan lapisan terlalu cepat)",
      "Cyclosporine (dapat meningkatkan penyerapan)"
    ],
    image: "/placeholder.svg",
    categories: ["Bantuan Pencernaan", "Pereda Nyeri", "Dukungan Pernapasan"]
  },
  {
    id: "chamomile",
    name: "Chamomile",
    latinName: "Matricaria chamomilla",
    description: "Herba yang berasal dari bunga seperti daisy dari keluarga tanaman Asteraceae. Telah dikonsumsi selama berabad-abad sebagai obat alami untuk beberapa kondisi kesehatan.",
    benefits: [
      "Mempromosikan relaksasi dan tidur",
      "Mengurangi kecemasan dan stres",
      "Menenangkan masalah pencernaan",
      "Sifat anti-inflamasi",
      "Dapat mengurangi nyeri menstruasi",
      "Mendukung kesehatan imun"
    ],
    dosage: {
      adult: "1-4 cangkir teh sehari, atau 300-500mg ekstrak",
      child: "Teh ringan umumnya aman untuk anak-anak",
      elderly: "Dosis dewasa standar",
      pregnant: "Penggunaan sesekali dengan sedang umumnya dianggap aman"
    },
    preparation: [
      "Teh: Seduh 1-2 sendok teh bunga kering dalam air panas selama 5 menit",
      "Tingtur: 15 tetes dalam air, hingga 3 kali sehari",
      "Kapsul: Minum sesuai petunjuk",
      "Topikal: Oleskan krim atau salep ke area yang terkena"
    ],
    sideEffects: [
      "Reaksi alergi pada individu yang sensitif terhadap tanaman terkait",
      "Kantuk ringan",
      "Dermatitis kontak (jika dioleskan secara topikal)"
    ],
    warnings: [
      "Hindari jika alergi terhadap tanaman dalam keluarga daisy",
      "Dapat meningkatkan efek obat penenang",
      "Tidak direkomendasikan dalam jumlah besar selama kehamilan"
    ],
    interactions: [
      "Pengencer darah (interaksi teoritis)",
      "Sedatif (dapat meningkatkan efek)",
      "Obat hormon (dapat mengganggu)"
    ],
    image: "/placeholder.svg",
    categories: ["Bantuan Tidur", "Relaksasi", "Bantuan Pencernaan", "Anti-inflamasi"]
  },
  {
    id: "valerian",
    name: "Valerian",
    latinName: "Valeriana officinalis",
    description: "Tanaman berbunga tahunan yang berasal dari Eropa dan Asia. Akarnya telah digunakan selama berabad-abad untuk mengobati gangguan tidur, kecemasan, dan stres psikologis.",
    benefits: [
      "Meningkatkan kualitas tidur",
      "Mengurangi kecemasan",
      "Dapat mengurangi kram menstruasi",
      "Dapat membantu dengan sakit kepala",
      "Mendukung relaksasi",
      "Dapat mengurangi hiperaktivitas dan meningkatkan fokus"
    ],
    dosage: {
      adult: "300-600mg akar valerian kering, atau 2-3g sebagai teh sebelum tidur",
      child: "Tidak direkomendasikan untuk anak-anak tanpa pengawasan medis",
      elderly: "Mulai dengan dosis rendah",
      pregnant: "Tidak direkomendasikan selama kehamilan"
    },
    preparation: [
      "Teh: Seduh 1-2 sendok teh akar kering dalam air panas selama 10-15 menit",
      "Tingtur: 1-2ml, hingga tiga kali sehari",
      "Kapsul: Minum sesuai petunjuk",
      "Ekstrak: Ikuti petunjuk paket"
    ],
    sideEffects: [
      "Kantuk di pagi hari",
      "Sakit kepala",
      "Pusing",
      "Gangguan pencernaan"
    ],
    warnings: [
      "Jangan gunakan sebelum mengemudi atau mengoperasikan mesin",
      "Tidak direkomendasikan untuk penggunaan jangka panjang tanpa jeda",
      "Dapat memperburuk gejala pada beberapa kasus depresi"
    ],
    interactions: [
      "Alkohol (meningkatkan efek sedatif)",
      "Obat penenang dan obat tidur (meningkatkan efek)",
      "Antidepresan (interaksi potensial)"
    ],
    image: "/placeholder.svg",
    categories: ["Bantuan Tidur", "Bantuan Kecemasan", "Relaksasi"]
  }
];

// Definisikan interaksi antara herbal
export interface HerbInteraction {
  herbs: [string, string];
  effect: "positive" | "negative" | "neutral";
  description: string;
}

export const herbInteractions: HerbInteraction[] = [
  {
    herbs: ["turmeric", "ginger"],
    effect: "positive",
    description: "Efek anti-inflamasi yang ditingkatkan. Herbal ini saling melengkapi untuk kesehatan pencernaan dan sendi."
  },
  {
    herbs: ["turmeric", "valerian"],
    effect: "neutral",
    description: "Tidak ada interaksi signifikan yang diketahui, tetapi penelitian tentang kombinasi ini terbatas."
  },
  {
    herbs: ["ginger", "peppermint"],
    effect: "positive",
    description: "Manfaat pencernaan yang ditingkatkan. Kombinasi yang baik untuk mual dan gangguan pencernaan."
  },
  {
    herbs: ["peppermint", "chamomile"],
    effect: "positive",
    description: "Kombinasi sempurna untuk masalah pencernaan dan relaksasi."
  },
  {
    herbs: ["chamomile", "valerian"],
    effect: "positive",
    description: "Peningkatan relaksasi dan manfaat tidur. Efek menenangkan yang sinergis kuat."
  },
  {
    herbs: ["valerian", "ginger"],
    effect: "negative",
    description: "Dapat menyebabkan kantuk yang meningkat. Perlu hati-hati saat menggabungkan herbal ini."
  }
];

// Definisikan interaksi obat-herbal
export interface DrugHerbInteraction {
  herb: string;
  drug: string;
  effect: "major" | "moderate" | "minor";
  description: string;
}

export const drugHerbInteractions: DrugHerbInteraction[] = [
  {
    herb: "turmeric",
    drug: "Warfarin",
    effect: "major",
    description: "Dapat meningkatkan risiko pendarahan. Hindari kombinasi ini."
  },
  {
    herb: "ginger",
    drug: "Aspirin",
    effect: "moderate",
    description: "Dapat meningkatkan risiko pendarahan. Gunakan dengan hati-hati."
  },
  {
    herb: "valerian",
    drug: "Alprazolam",
    effect: "major",
    description: "Dapat menyebabkan sedasi berlebihan dan gangguan fungsi motorik. Hindari kombinasi."
  },
  {
    herb: "chamomile",
    drug: "Cyclosporine",
    effect: "moderate",
    description: "Dapat menurunkan efektivitas cyclosporine. Pantau kadar obat jika digunakan bersama."
  },
  {
    herb: "peppermint",
    drug: "Felodipine",
    effect: "moderate",
    description: "Dapat meningkatkan konsentrasi obat dalam darah. Gunakan dengan hati-hati."
  }
];

// Definisikan metode persiapan
export interface PreparationMethod {
  id: string;
  name: string;
  description: string;
  steps: string[];
  tips: string[];
  suitableHerbs: string[];
  imageUrl?: string;
}

export const preparationMethods: PreparationMethod[] = [
  {
    id: "infusion",
    name: "Infusi Herbal",
    description: "Merendam herbal dalam air panas untuk mengekstrak senyawa bermanfaatnya. Terbaik untuk daun, bunga, dan bagian aerial tanaman.",
    steps: [
      "Rebus air dan biarkan sedikit dingin (sekitar 90-95°C)",
      "Taruh 1-2 sendok teh herbal kering (atau 1 sendok makan segar) per cangkir dalam teko atau mug",
      "Tuangkan air panas di atas herbal",
      "Tutup dan rendam selama 5-15 menit, tergantung pada herbal dan kekuatan yang diinginkan",
      "Saring herbal dan nikmati teh Anda"
    ],
    tips: [
      "Gunakan wadah kaca, keramik atau porselen untuk merendam",
      "Tutup selama perendaman untuk mencegah minyak volatile menguap",
      "Untuk efek obat yang lebih kuat, gunakan lebih banyak herbal dan rendam lebih lama",
      "Minum 3-4 cangkir sepanjang hari untuk efek terapi"
    ],
    suitableHerbs: ["peppermint", "chamomile", "valerian"]
  },
  {
    id: "decoction",
    name: "Dekoktasi",
    description: "Merebus bahan tanaman yang lebih keras seperti akar, kulit kayu, dan biji untuk mengekstrak senyawa obatnya.",
    steps: [
      "Taruh 1-2 sendok makan herbal kering (atau 2-3 sendok makan segar) per cangkir dalam panci kecil",
      "Tambahkan air dingin (sekitar 2 cangkir untuk setiap sendok makan herbal)",
      "Perlahan didihkan, lalu kurangi panas dan rebus dengan api kecil dan tertutup selama 10-20 menit",
      "Saring campuran dan biarkan sedikit dingin sebelum diminum"
    ],
    tips: [
      "Gunakan peralatan masak stainless steel atau kaca",
      "Jaga tutup tetap terpasang untuk mempertahankan senyawa volatile",
      "Untuk kekuatan maksimal, biarkan dekoktasi didiamkan selama 10 menit tambahan setelah merebus",
      "Dapat disimpan dalam lemari es hingga 48 jam"
    ],
    suitableHerbs: ["turmeric", "ginger", "valerian"]
  },
  {
    id: "tincture",
    name: "Tingtur",
    description: "Herbal yang diawetkan dalam alkohol atau gliserin untuk masa simpan lebih lama dan penyerapan cepat.",
    steps: [
      "Potong herbal kecil-kecil dan taruh dalam stoples kaca bersih (isi stoples sekitar setengahnya dengan herbal)",
      "Tuangkan alkohol kadar tinggi (seperti vodka, 40-60% ABV) di atas herbal sampai tertutup sepenuhnya",
      "Tutup stoples dengan rapat dan simpan di tempat dingin, gelap selama 4-6 minggu, kocok setiap hari",
      "Saring melalui kain keju atau filter kopi dan simpan dalam botol kaca gelap dengan pipet"
    ],
    tips: [
      "Gunakan alkohol food-grade seperti vodka atau brendi",
      "Untuk versi bebas alkohol, gunakan gliserin nabati atau cuka sari apel sebagai gantinya",
      "Beri label dengan nama herbal dan tanggal persiapan",
      "Sebagian besar tingtur bertahan 1-5 tahun jika disimpan dengan baik"
    ],
    suitableHerbs: ["turmeric", "ginger", "valerian", "chamomile"]
  },
  {
    id: "compress",
    name: "Kompres Herbal",
    description: "Mengoleskan kain yang direndam herbal langsung ke kulit untuk menangani kondisi lokal.",
    steps: [
      "Siapkan infusi atau dekoktasi kuat dari herbal pilihan",
      "Rendam kain bersih dalam cairan hangat",
      "Peras kelebihan cairan dan terapkan ke area yang terkena",
      "Tutup dengan kain kering atau bungkus plastik untuk menahan panas jika diinginkan",
      "Biarkan selama 15-30 menit, mengoleskan kembali larutan hangat sesuai kebutuhan"
    ],
    tips: [
      "Gunakan kain katun untuk penyerapan terbaik",
      "Dapat diterapkan panas atau dingin tergantung pada kondisi",
      "Kompres panas bagus untuk nyeri otot dan luka dingin",
      "Kompres dingin bekerja baik untuk sakit kepala dan peradangan"
    ],
    suitableHerbs: ["chamomile", "ginger", "peppermint"]
  },
  {
    id: "powder",
    name: "Bubuk Herbal",
    description: "Herbal kering dan dihaluskan yang dapat digunakan dalam kapsul, ditambahkan ke makanan, atau dicampur ke dalam minuman.",
    steps: [
      "Keringkan herbal secara menyeluruh (dalam pengering atau di tempat teduh)",
      "Giling menjadi bubuk halus menggunakan penggiling kopi atau mortar dan pestle",
      "Ayak melalui saringan halus untuk menghilangkan potongan yang lebih besar",
      "Simpan dalam wadah kedap udara jauh dari cahaya dan kelembaban"
    ],
    tips: [
      "Bersihkan penggiling Anda secara menyeluruh di antara herbal yang berbeda",
      "Untuk kapsul, beli kapsul kosong gelatin atau sayuran dan isi secara manual",
      "Mulai dengan jumlah kecil (1/4-1/2 sendok teh) saat menambahkan ke makanan",
      "Dapat dicampur dengan madu untuk membuat pasta herbal"
    ],
    suitableHerbs: ["turmeric", "ginger"]
  }
];

// Data kondisi dan ramuan
export interface Condition {
  id: string;
  name: string;
  description: string;
  remedies: Remedy[];
}

export interface Remedy {
  id: string;
  name: string;
  herbs: string[];
  preparation: string;
  dosage: string;
  duration: string;
  notes: string;
}

export const conditions: Condition[] = [
  {
    id: "indigestion",
    name: "Gangguan Pencernaan",
    description: "Ketidaknyamanan atau nyeri di perut bagian atas, sering disertai kembung, gas, atau mual setelah makan.",
    remedies: [
      {
        id: "ginger-mint-tea",
        name: "Teh Digestif Jahe Mint",
        herbs: ["ginger", "peppermint"],
        preparation: "Seduh bagian yang sama jahe kering dan peppermint dalam air panas selama 10 menit. Saring dan sajikan.",
        dosage: "1 cangkir setelah makan atau saat mengalami ketidaknyamanan",
        duration: "Gunakan sesuai kebutuhan",
        notes: "Menambahkan irisan lemon dapat meningkatkan rasa dan manfaat pencernaan"
      },
      {
        id: "turmeric-milk",
        name: "Susu Kunyit",
        herbs: ["turmeric", "ginger"],
        preparation: "Campurkan 1 sendok teh bubuk kunyit dan 1/4 sendok teh bubuk jahe dalam susu hangat dengan sedikit lada hitam.",
        dosage: "1 cangkir sebelum tidur",
        duration: "Setiap hari selama 1-2 minggu",
        notes: "Lada hitam meningkatkan penyerapan kunyit. Tambahkan madu sesuai selera jika diinginkan."
      }
    ]
  },
  {
    id: "insomnia",
    name: "Insomnia",
    description: "Kesulitan tidur atau tetap tidur, menghasilkan tidur yang tidak memulihkan dan kelelahan di siang hari.",
    remedies: [
      {
        id: "sleep-blend",
        name: "Campuran Tidur Mudah",
        herbs: ["valerian", "chamomile"],
        preparation: "Seduh 1 sendok teh akar valerian dan 1 sendok teh bunga chamomile dalam air panas selama 15 menit. Saring sebelum diminum.",
        dosage: "1 cangkir 30-60 menit sebelum tidur",
        duration: "Setiap hari selama hingga 2 minggu, kemudian istirahat selama 1 minggu",
        notes: "Rasanya bisa kuat; tambahkan satu sendok teh madu untuk memperbaiki rasa"
      },
      {
        id: "chamomile-lavender",
        name: "Teh Chamomile Menenangkan",
        herbs: ["chamomile"],
        preparation: "Seduh 1-2 sendok teh bunga chamomile kering dalam air panas selama 5-10 menit. Saring sebelum diminum.",
        dosage: "1 cangkir di malam hari",
        duration: "Dapat digunakan jangka panjang",
        notes: "Aman untuk sebagian besar orang, termasuk anak-anak dan ibu hamil dalam jumlah moderat"
      }
    ]
  },
  {
    id: "headache",
    name: "Sakit Kepala",
    description: "Nyeri atau ketidaknyamanan di kepala, kulit kepala, atau leher, yang dapat berkisar dari ringan hingga parah.",
    remedies: [
      {
        id: "peppermint-compress",
        name: "Peppermint Pereda Kepala",
        herbs: ["peppermint"],
        preparation: "Buat infusi peppermint kuat dan rendam kain bersih di dalamnya. Oleskan ke dahi dan pelipis.",
        dosage: "Terapkan selama 15-20 menit",
        duration: "Gunakan sesuai kebutuhan saat sakit kepala terjadi",
        notes: "Dapat juga mengoleskan minyak esensial peppermint yang diencerkan ke pelipis (encerkan dengan minyak pembawa terlebih dahulu)"
      },
      {
        id: "ginger-turmeric-tea",
        name: "Teh Sakit Kepala Anti-inflamasi",
        herbs: ["ginger", "turmeric"],
        preparation: "Rebus 1 sendok teh masing-masing jahe parut segar dan kunyit dalam 2 cangkir air selama 10 menit. Saring sebelum diminum.",
        dosage: "1 cangkir saat sakit kepala mulai",
        duration: "Hingga 3 cangkir sehari sesuai kebutuhan",
        notes: "Tambahkan madu dan lemon sesuai selera. Sertakan lada hitam untuk meningkatkan penyerapan kunyit."
      }
    ]
  },
  {
    id: "anxiety",
    name: "Kecemasan",
    description: "Perasaan khawatir, gelisah, atau tidak nyaman tentang sesuatu dengan hasil yang tidak pasti, sering disertai gejala fisik.",
    remedies: [
      {
        id: "calming-tea",
        name: "Campuran Herbal Penenang",
        herbs: ["chamomile", "valerian"],
        preparation: "Seduh 1 sendok teh bunga chamomile dan 1/2 sendok teh akar valerian dalam air panas selama 10 menit. Saring sebelum diminum.",
        dosage: "1 cangkir hingga 3 kali sehari",
        duration: "Gunakan sesuai kebutuhan selama periode kecemasan",
        notes: "Terbaik diminum di antara waktu makan. Tidak direkomendasikan saat mengemudi atau mengoperasikan mesin."
      },
      {
        id: "chamomile-tincture",
        name: "Pereda Cepat Chamomile",
        herbs: ["chamomile"],
        preparation: "Gunakan tingtur chamomile yang sudah disiapkan.",
        dosage: "20-30 tetes dalam air sesuai kebutuhan",
        duration: "Hingga 3 kali sehari",
        notes: "Pilihan yang bekerja lebih cepat daripada teh selama episode kecemasan akut"
      }
    ]
  },
  {
    id: "joint-pain",
    name: "Nyeri Sendi",
    description: "Ketidaknyamanan, nyeri, dan sakit pada sendi, sering karena peradangan atau cedera.",
    remedies: [
      {
        id: "turmeric-paste",
        name: "Pasta Kunyit",
        herbs: ["turmeric", "ginger"],
        preparation: "Campur 1/4 cangkir bubuk kunyit, 1/2 sendok teh lada bubuk, 1/2 sendok teh jahe bubuk dengan 1/2 cangkir air dalam panci. Rebus dengan api kecil sampai pasta terbentuk. Simpan di lemari es.",
        dosage: "1/2-1 sendok teh dua kali sehari dengan makanan",
        duration: "Setiap hari selama setidaknya 2-4 minggu untuk melihat efek",
        notes: "Dapat dicampur dengan madu atau ditambahkan ke susu hangat. Tambahkan sedikit minyak sehat untuk meningkatkan penyerapan."
      },
      {
        id: "ginger-compress",
        name: "Kompres Jahe Penghangat",
        herbs: ["ginger"],
        preparation: "Rebus 2 sendok makan jahe segar parut dalam 2 cangkir air selama 10 menit. Rendam kain bersih dalam cairan dan terapkan ke sendi yang nyeri.",
        dosage: "Terapkan selama 15-20 menit",
        duration: "2-3 kali sehari sesuai kebutuhan",
        notes: "Pastikan kompres hangat tetapi tidak terlalu panas untuk membakar kulit."
      }
    ]
  }
];
