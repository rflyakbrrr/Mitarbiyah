import type { SchoolImage } from '../types';

export const schoolLogo = {
  src: '/images/GG.png',
  width: 158,
  height: 157,
  alt: 'Logo MI Tarbiyah Islamiyah',
};

function photo(
  id: string,
  width: number,
  height: number,
  alt: string,
  category: SchoolImage['category'],
  caption: string,
): SchoolImage {
  const widths = [480, 960, 1280].filter((size) => size <= width);
  return {
    id,
    width,
    height,
    alt,
    category,
    caption,
    src: `/images/${id}-${widths.at(-1)}.webp`,
    srcSet: widths.map((size) => `/images/${id}-${size}.webp ${size}w`).join(', '),
  };
}

export const images = {
  together: photo(
    '1',
    960,
    1280,
    'Siswa berseragam pramuka duduk bersama membawa bekal di halaman sekolah',
    'Kebersamaan',
    'Cerita kecil dari kebersamaan',
  ),
  hero: photo(
    '2',
    1280,
    960,
    'Siswa dan pendamping mengangkat botol minum dan kotak bekal di halaman sekolah',
    'Kebersamaan',
    'Belajar bersama, tumbuh bersama',
  ),
  courtyard: photo(
    '3',
    1280,
    720,
    'Siswa berseragam hijau dan putih berkumpul di halaman dengan bangunan sekolah di belakang',
    'Lingkungan sekolah',
    'Suasana di halaman sekolah',
  ),
  manasik: photo(
    '4',
    1156,
    651,
    'Anak-anak mengenakan pakaian ihram di depan replika Ka’bah dalam kegiatan manasik',
    'Keislaman',
    'Mengenal ibadah melalui pengalaman',
  ),
  santri: photo(
    '5',
    1280,
    720,
    'Siswa berfoto bersama sambil membawa spanduk Hari Santri di depan sekolah',
    'Keislaman',
    'Kebersamaan dalam semangat santri',
  ),
  prayer: photo(
    '6',
    960,
    1280,
    'Siswa duduk di atas sajadah yang terbentang di selasar sekolah',
    'Keislaman',
    'Membiasakan nilai baik sejak dini',
  ),
  school: photo(
    'poto',
    1280,
    960,
    'Siswa berseragam pramuka berkumpul di halaman sekolah dengan pepohonan dan bangunan hijau',
    'Lingkungan sekolah',
    'Ruang untuk belajar dan bertumbuh',
  ),
} satisfies Record<string, SchoolImage>;

export const galleryImages = Object.values(images);
export const getImage = (id: string): SchoolImage =>
  galleryImages.find((image) => image.id === id) ?? images.school;
