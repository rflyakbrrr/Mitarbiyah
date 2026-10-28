import { SEO } from '../../components/common/SEO';
import { PageIntro } from '../../components/common/UI';
import Gallery from '../../components/common/Gallery';

export default function Galeri() {
  return (
    <>
      <SEO
        title="Galeri sekolah"
        description="Tujuh dokumentasi lokal kebersamaan, kegiatan keislaman, dan lingkungan MITARBIYAH ISLAMIYAH."
      />
      <PageIntro
        eyebrow="Galeri sekolah"
        title="Cerita yang tersimpan dalam gambar."
        description="Kebersamaan, pengalaman belajar, dan potret lingkungan sekolah. Pilih kategori dan buka foto untuk melihat lebih dekat."
      />
      <section className="section">
        <div className="container">
          <Gallery />
          <p className="gallery-note">
            Dokumentasi dari arsip lokal yang tersedia. Kategori mendeskripsikan isi foto; tanggal
            dan rincian kegiatan belum dikonfirmasi.
          </p>
        </div>
      </section>
    </>
  );
}
