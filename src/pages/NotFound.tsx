import { Compass } from 'lucide-react';
import { Button } from '../components/common/UI';
import { SEO } from '../components/common/SEO';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Halaman tidak ditemukan"
        description="Halaman yang Anda cari tidak ditemukan."
        noIndex
      />
      <section className="not-found container">
        <Compass size={54} strokeWidth={1} />
        <span className="eyebrow">HALAMAN 404</span>
        <h1>
          Sepertinya kita
          <br />
          salah jalan.
        </h1>
        <p>Halaman yang Anda cari tidak tersedia. Mari kembali menjelajahi sekolah.</p>
        <Button to="/">Kembali ke beranda</Button>
      </section>
    </>
  );
}
