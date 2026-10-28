import type { NewsArticle, Program } from '../types';

export const programs: Program[] = [
  {
    slug: 'pendidikan-al-quran',
    title: 'Pendidikan Al-Qur’an',
    description: 'Mengenal huruf, memperbaiki bacaan, dan menumbuhkan kedekatan dengan Al-Qur’an.',
    icon: 'book',
    imageId: '6',
    proposed: true,
    objectives: [
      'Pengenalan huruf hijaiyah sesuai tahap belajar anak.',
      'Latihan membaca dengan pendampingan.',
      'Mengenal makna nilai baik dalam kehidupan sehari-hari.',
    ],
  },
  {
    slug: 'pembinaan-akhlak',
    title: 'Pembinaan Akhlak',
    description:
      'Belajar bersikap jujur, menghargai sesama, dan bertanggung jawab dalam keseharian.',
    icon: 'heart',
    imageId: '1',
    proposed: true,
    objectives: [
      'Pembiasaan adab dalam belajar dan bergaul.',
      'Latihan tanggung jawab melalui tugas sehari-hari.',
      'Kegiatan bersama yang mengajarkan kepedulian.',
    ],
  },
  {
    slug: 'pengembangan-akademik',
    title: 'Pengembangan Akademik',
    description: 'Membangun dasar pengetahuan melalui pembelajaran yang dekat dengan dunia anak.',
    icon: 'graduation',
    imageId: '3',
    proposed: true,
    objectives: [
      'Penguatan kemampuan membaca, menulis, dan berhitung.',
      'Eksplorasi melalui pertanyaan dan percobaan sederhana.',
      'Pendampingan sesuai kebutuhan belajar.',
    ],
  },
  {
    slug: 'kegiatan-keislaman',
    title: 'Kegiatan Keislaman',
    description: 'Memahami nilai ibadah melalui pengalaman belajar dan kebersamaan.',
    icon: 'moon',
    imageId: '4',
    proposed: true,
    objectives: [
      'Pengenalan tata cara ibadah.',
      'Pembelajaran melalui praktik yang sesuai usia.',
      'Mengenal kisah dan tradisi Islam.',
    ],
  },
  {
    slug: 'bakat-dan-minat',
    title: 'Bakat & Minat',
    description: 'Ruang berekspresi dan mencoba hal baru untuk mengenali potensi diri.',
    icon: 'sparkles',
    imageId: '2',
    proposed: true,
    objectives: [
      'Eksplorasi kegiatan kreatif.',
      'Kesempatan berlatih bekerja sama.',
      'Pendampingan untuk mengenali minat anak.',
    ],
  },
  {
    slug: 'pembelajaran-teknologi',
    title: 'Pembelajaran & Teknologi',
    description: 'Mengenal teknologi sebagai sarana belajar dengan pendampingan yang tepat.',
    icon: 'computer',
    imageId: 'poto',
    proposed: true,
    objectives: [
      'Pengenalan literasi digital dasar.',
      'Pemanfaatan media belajar sesuai usia.',
      'Pembiasaan penggunaan teknologi secara bertanggung jawab.',
    ],
  },
];

export const news: NewsArticle[] = [
  {
    slug: 'belajar-peduli-lingkungan',
    title: 'Dari bekal sendiri, belajar peduli lingkungan',
    category: 'Kehidupan Sekolah',
    imageId: '2',
    excerpt: 'Kebiasaan sederhana dapat menjadi awal percakapan tentang merawat lingkungan.',
    date: null,
    demo: true,
    paragraphs: [
      'Artikel ini merupakan contoh editorial untuk memperlihatkan tampilan berita sekolah. Foto berasal dari dokumentasi lokal yang tersedia; tanggal, nama kegiatan, dan laporan resminya belum diberikan.',
      'Membawa botol minum dan wadah bekal dapat menjadi bahan belajar tentang penggunaan kembali barang. Anak dapat diajak mengamati kebiasaan sehari-hari dan berbagi gagasan tentang menjaga kebersihan.',
      'Naskah ini perlu diganti atau disetujui pengelola sekolah sebelum dipublikasikan sebagai laporan kegiatan.',
    ],
  },
  {
    slug: 'mengenal-ibadah-manasik',
    title: 'Mengenal ibadah melalui pengalaman langsung',
    category: 'Keislaman',
    imageId: '4',
    excerpt: 'Pengalaman praktik membantu anak mengenal ibadah dengan cara yang lebih dekat.',
    date: null,
    demo: true,
    paragraphs: [
      'Ini adalah contoh artikel, bukan laporan kegiatan resmi. Dokumentasi menampilkan anak-anak berpakaian ihram di depan replika Ka’bah.',
      'Praktik manasik dapat digunakan untuk mengenalkan urutan ibadah dan maknanya dengan bahasa yang mudah dipahami anak. Pendamping dapat mengajak mereka bertanya tentang apa yang dilihat dan dilakukan.',
      'Lokasi, tanggal, peserta, dan keterangan kegiatan akan dilengkapi setelah dikonfirmasi oleh sekolah.',
    ],
  },
  {
    slug: 'semangat-kebersamaan-santri',
    title: 'Merawat kebersamaan dalam semangat santri',
    category: 'Keislaman',
    imageId: '5',
    excerpt: 'Mengenal nilai santri melalui kepedulian, semangat belajar, dan kebersamaan.',
    date: null,
    demo: true,
    paragraphs: [
      'Artikel contoh ini menggunakan dokumentasi siswa dengan spanduk Hari Santri. Tidak ada tanggal publikasi atau kutipan narasumber yang ditetapkan.',
      'Semangat belajar dan kepedulian kepada sesama dapat dikenalkan lewat percakapan sederhana. Anak diajak memahami bagaimana nilai tersebut hadir di rumah maupun di sekolah.',
      'Pengelola dapat mengganti naskah ini dengan cerita kegiatan yang telah diverifikasi.',
    ],
  },
  {
    slug: 'ruang-belajar-bersama',
    title: 'Ruang belajar juga hadir di luar kelas',
    category: 'Kehidupan Sekolah',
    imageId: '3',
    excerpt: 'Lingkungan sekitar memberi banyak kesempatan untuk bertanya dan mengamati.',
    date: null,
    demo: true,
    paragraphs: [
      'Ini merupakan contoh konten untuk halaman berita. Foto memperlihatkan siswa berkumpul di halaman sekolah.',
      'Belajar di luar kelas dapat mengajak anak mengamati lingkungan dan berinteraksi dengan teman. Bentuk kegiatan perlu disesuaikan dengan usia serta kebutuhan belajar mereka.',
      'Rincian kegiatan resmi belum tersedia.',
    ],
  },
];

export const testimonialSlots = [
  {
    role: 'Orang tua siswa',
    text: 'Cerita tentang mendampingi anak belajar akan ditampilkan setelah mendapat persetujuan orang tua.',
  },
  {
    role: 'Alumni',
    text: 'Pengalaman alumni akan hadir di sini setelah narasumber dan isi ceritanya dikonfirmasi.',
  },
  {
    role: 'Wali murid',
    text: 'Ruang untuk berbagi pengalaman berkomunikasi dan tumbuh bersama sekolah.',
  },
];
