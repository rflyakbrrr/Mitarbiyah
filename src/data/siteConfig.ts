import type { Facility, Teacher } from '../types';

// Isi hanya dengan informasi yang telah disetujui pihak sekolah.
export const siteConfig = {
  name: 'MITARBIYAH ISLAMIYAH',
  shortName: 'MI Tarbiyah Islamiyah',
  tagline: 'Berilmu. Berakhlak. Berprestasi.',
  description:
    'MITARBIYAH ISLAMIYAH berkomitmen menghadirkan pendidikan berkualitas dengan memadukan ilmu pengetahuan, nilai-nilai Islam, dan pembentukan karakter untuk masa depan yang gemilang.',
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? '',
  contact: {
    address:
      'Jl. Adi Sucipto RT. 02/08, Kelurahan Belendung, Kecamatan Benda, Kota Tangerang, Provinsi Banten 15123',
    email: '',
    phone: '085813136184',
    whatsapp: '',
    mapUrl: '',
  },
  socials: [] as { label: string; url: string }[],
  profile: {
    introduction:
      'Setiap anak membawa rasa ingin tahu dan potensi yang berbeda. MITARBIYAH ISLAMIYAH ingin menjadi tempat mereka belajar, mengenal nilai Islam, dan membangun kebiasaan baik bersama.',
    draft: true,
    history: '',
    principalName: '',
    principalMessage: '',
    identity: [
      { label: 'NPSN', value: '69727523' },
      { label: 'NSM', value: '111236710052' },
    ],
  },
  vision: 'Tumbuhnya generasi berilmu, berakhlak mulia, dan mampu memberi manfaat bagi sesama.',
  mission: [
    'Mendampingi anak mengenal Al-Qur’an dan menerapkan nilai Islam dalam keseharian.',
    'Membangun pembelajaran yang mendorong rasa ingin tahu dan pemahaman.',
    'Menumbuhkan sikap jujur, mandiri, serta kepedulian kepada sesama.',
    'Memberi ruang bagi anak untuk mengenali dan mengembangkan potensinya.',
  ],
  highlights: [
    { label: 'Siswa', value: null as number | null, suffix: '', icon: 'users' },
    { label: 'Tenaga pendidik', value: null as number | null, suffix: '', icon: 'teacher' },
    { label: 'Program pendidikan', value: null as number | null, suffix: '', icon: 'book' },
    { label: 'Prestasi sekolah', value: null as number | null, suffix: '', icon: 'award' },
  ],
  admissions: {
    status: 'Informasi penerimaan sedang disiapkan',
    year: '',
    schedule: [] as { label: string; date: string }[],
    requirements: [] as string[],
    steps: [] as { title: string; description: string }[],
  },
};

export const teachers: Teacher[] = [];
export const facilities: Facility[] = [];
export const values = [
  {
    title: 'Iman & akhlak',
    description: 'Mengenal nilai Islam melalui kebiasaan baik yang dekat dengan kehidupan anak.',
  },
  {
    title: 'Ilmu & rasa ingin tahu',
    description: 'Mengajak anak bertanya, mencoba, dan memahami apa yang mereka pelajari.',
  },
  {
    title: 'Peduli & mandiri',
    description: 'Belajar bertanggung jawab atas diri sendiri sekaligus memperhatikan orang lain.',
  },
  {
    title: 'Potensi & keberanian',
    description: 'Memberi anak kesempatan menemukan minat dan berani mengembangkan kemampuannya.',
  },
];
