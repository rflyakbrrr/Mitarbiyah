# MITARBIYAH ISLAMIYAH

Situs sekolah berbahasa Indonesia dengan React, TypeScript, Vite, dan Tailwind CSS. Seluruh foto dan font dilayani dari aset lokal.

## Menjalankan proyek

Gunakan Node.js 22.12 atau lebih baru.

```sh
npm install
npm run assets
npm run dev
```

```sh
npm run build
npm run preview
```

Build memeriksa TypeScript, membuat varian foto WebP, menghasilkan berkas SEO, lalu menghasilkan situs di `dist/`. Foto JPEG sumber di akar proyek tetap dipertahankan.

## Mengubah konten

| Berkas                          | Isi                                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------------------- |
| `src/data/siteConfig.ts`        | Identitas, profil, visi, misi, statistik, guru, fasilitas, kontak, media sosial, dan PPDB |
| `src/data/content.ts`           | Rancangan program, artikel demo, dan slot testimoni                                       |
| `src/data/images.ts`            | Registri foto, alt text, kategori, dan responsive srcset                                  |
| `src/data/image-inventory.json` | Ukuran asli serta varian foto hasil skrip                                                 |
| `src/data/navigation.ts`        | Navigasi situs                                                                            |
| `src/styles/index.css`          | Desain, tata letak responsif, dan aturan reduced motion                                   |

Statistik bernilai `null` sampai data resmi tersedia. Jangan mengisinya dengan perkiraan. Direktori guru dan daftar fasilitas awalnya kosong; komponen sudah mendukung data terstruktur, pencarian guru, detail profil, dan pratinjau foto fasilitas.

Program, visi, misi, filosofi, serta artikel ditandai sebagai draf atau contoh. Halaman detail konten demo menggunakan `noindex`. Setelah konten disetujui, ubah status `proposed`, `demo`, atau `profile.draft` yang sesuai dan sesuaikan penanda draf pada halaman visi/misi. Identitas kepala sekolah, riwayat, kontak, jadwal, biaya, serta persyaratan PPDB belum diberikan. Situs tidak menganggap objek yang terlihat dalam foto sebagai fasilitas resmi.

Halaman kontak dan PPDB tidak menyediakan formulir daring. Pertanyaan serta informasi pendaftaran diarahkan ke kontak resmi sekolah.

Nomor `contact.whatsapp` harus memakai kode negara. Tautan WhatsApp, email, telepon, peta, dan media sosial hanya muncul ketika data terkait diisi. Gunakan URL HTTPS untuk tautan eksternal.

## Pemetaan foto

| Sumber      | Ukuran     | Penggunaan                              |
| ----------- | ---------- | --------------------------------------- |
| `1.jpeg`    | 960 × 1280 | Kebersamaan siswa dengan bekal          |
| `2.jpeg`    | 1280 × 960 | Hero dan kebersamaan siswa              |
| `3.jpeg`    | 1280 × 720 | Dokumentasi halaman sekolah             |
| `4.jpeg`    | 1156 × 651 | Dokumentasi praktik manasik             |
| `5.jpeg`    | 1280 × 720 | Foto bersama dengan spanduk Hari Santri |
| `6.jpeg`    | 960 × 1280 | Siswa di selasar dengan sajadah         |
| `poto.jpeg` | 1280 × 960 | Suasana lingkungan sekolah              |

`scripts/prepare-assets.mjs` membuat WebP ukuran 480, 960, dan 1280 bila ukuran asli mencukupi, tanpa memperbesar sumber. Browser memilih varian melalui `srcset` dan `sizes`. Foto di bawah hero menggunakan lazy loading.

## Halaman dan interaksi

Beranda, profil, visi/misi, program dan detail, direktori guru, fasilitas, berita dan detail, galeri, PPDB, kontak, serta halaman 404. Filter berita, pencarian, dan nomor halaman tersimpan pada URL. Lightbox mendukung tombol panah, Escape, perangkap fokus, serta pengembalian fokus. Menu seluler juga mengunci fokus selama terbuka.

React Router memuat halaman melalui dynamic import. Motion menangani transisi dan reveal, GSAP ScrollTrigger menangani parallax hero, Lenis menangani scroll roda mouse, dan Swiper menangani carousel. Scroll sentuh tetap native. Preferensi reduced motion menonaktifkan parallax, smooth scrolling, dan gerakan dekoratif. Tidak ada splash screen yang menahan konten.

## SEO dan deployment

Atur domain asli sebelum build:

```powershell
$env:VITE_SITE_URL="https://domain-sekolah-anda.id"
npm run build
```

`VITE_SITE_URL` harus berupa origin tanpa path. Tanpa domain, canonical dan URL Open Graph tidak diterbitkan, sitemap berupa urlset kosong, dan robots.txt tidak menunjuk sitemap. Nama lembaga adalah satu-satunya informasi pada structured data sampai domain dikonfigurasi. Sitemap memuat halaman utama; halaman detail demo tidak disertakan.

Deploy folder `dist/`. `public/_redirects` memberi fallback SPA untuk Netlify/Cloudflare Pages. `vercel.json` memberi fallback untuk Vercel. Situs diasumsikan berada pada akar domain.

Nginx:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

Apache, tambahkan `.htaccess` pada folder deploy:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

## Pengujian

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

Tes browser desktop dan seluler mencakup routing langsung, galeri, gambar lokal, pencarian dan pagination berita, ketiadaan formulir di halaman kontak dan PPDB, navigasi keyboard, reduced motion, overflow horizontal, serta audit axe WCAG A/AA. Tangkapan layar hero disimpan di `test-results/`. Audit otomatis tidak menggantikan peninjauan aksesibilitas manual dan tidak menyatakan skor Lighthouse tertentu.

Jika drive cache npm penuh, tentukan cache pada drive yang memiliki ruang:

```powershell
$env:npm_config_cache="D:\webmitar\.npm-cache"
$env:PLAYWRIGHT_BROWSERS_PATH="D:\webmitar\.browser-cache"
$env:TEMP="D:\webmitar\.browser-cache"
$env:TMP=$env:TEMP
```
