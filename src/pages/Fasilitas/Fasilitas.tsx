import { useCallback, useState } from 'react';
import { ArrowUpRight, School } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { EmptyState, Notice, PageIntro, Photo, SectionHeading } from '../../components/common/UI';
import { Lightbox } from '../../components/common/Gallery';
import { facilities } from '../../data/siteConfig';
import { getImage, images } from '../../data/images';
import CTA from '../../sections/CTA/CTA';

export default function Fasilitas() {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const photos = facilities.length
    ? facilities.map((item) => getImage(item.imageId))
    : [images.courtyard, images.school, images.prayer];
  return (
    <>
      <SEO
        title="Fasilitas & lingkungan sekolah"
        description="Dokumentasi lingkungan MITARBIYAH ISLAMIYAH dan informasi fasilitas yang telah dikonfirmasi."
      />
      <PageIntro
        eyebrow="Fasilitas sekolah"
        title="Mengenal lingkungan belajar anak."
        description="Jelajahi dokumentasi sekolah dan lihat suasana tempat anak berkegiatan bersama."
      />
      <section className="section">
        <div className="container">
          {!facilities.length && (
            <Notice>
              Daftar fasilitas resmi belum tersedia. Foto di bawah hanya memperlihatkan lingkungan
              dalam dokumentasi, bukan konfirmasi fasilitas tertentu.
            </Notice>
          )}
          <SectionHeading
            eyebrow={facilities.length ? 'FASILITAS TERKONFIRMASI' : 'DOKUMENTASI LINGKUNGAN'}
            title="Lihat sekolah lebih dekat."
          />
          <div className="facility-gallery">
            {photos.map((image, position) => (
              <figure key={`${image.id}-${position}`}>
                <button
                  onClick={() => setIndex(position)}
                  aria-label={`Perbesar foto: ${image.caption}`}
                >
                  <Photo image={image} />
                  <span className="gallery-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </button>
                <figcaption>
                  <h3>{facilities[position]?.title ?? image.caption}</h3>
                  <p>
                    {facilities[position]?.description ??
                      'Dokumentasi lokal sekolah. Klik foto untuk melihat lebih dekat.'}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
          {!facilities.length && (
            <EmptyState title="Informasi fasilitas menunggu konfirmasi" icon={<School size={28} />}>
              Keterangan ruang belajar, sarana pendukung, serta penggunaannya akan dilengkapi
              berdasarkan data dari lembaga.
            </EmptyState>
          )}
        </div>
      </section>
      {index !== null && (
        <Lightbox images={photos} index={index} onChange={setIndex} onClose={close} />
      )}
      <CTA />
    </>
  );
}
