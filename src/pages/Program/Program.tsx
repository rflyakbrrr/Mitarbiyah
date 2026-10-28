import { useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import {
  Button,
  Notice,
  PageIntro,
  Photo,
  Reveal,
  SectionHeading,
} from '../../components/common/UI';
import { ProgramCard } from '../../components/cards/Cards';
import { programs } from '../../data/content';
import { getImage, images } from '../../data/images';
import NotFound from '../NotFound';
import CTA from '../../sections/CTA/CTA';

export default function Program() {
  const { slug } = useParams();
  const program = programs.find((item) => item.slug === slug);
  if (slug && !program) return <NotFound />;
  if (program)
    return (
      <>
        <SEO title={program.title} description={program.description} noIndex={program.proposed} />
        <PageIntro
          eyebrow="Program pendidikan"
          title={program.title}
          description={program.description}
        />
        <section className="section">
          <div className="container">
            <Button to="/program" variant="text">
              Semua program
            </Button>
            {program.proposed && (
              <Notice>
                Rancangan program. Jadwal, pengajar, dan ketersediaan belum dikonfirmasi oleh
                sekolah.
              </Notice>
            )}
            <div className="editorial-grid program-detail">
              <Photo image={getImage(program.imageId)} className="rounded editorial-photo" eager />
              <div className="prose">
                <span className="eyebrow">
                  <span />
                  ARAH PEMBELAJARAN
                </span>
                <h2>Belajar selangkah demi selangkah.</h2>
                <p>{program.description}</p>
                <ul className="check-list">
                  {program.objectives.map((objective) => (
                    <li key={objective}>
                      <Check size={18} />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
                <div className="info-box">
                  <h3>Informasi pelaksanaan</h3>
                  <p>
                    Rincian kegiatan dan cara mengikuti program akan dipublikasikan setelah
                    informasi resmi tersedia.
                  </p>
                </div>
                <Button to="/kontak" variant="text">
                  Informasi kontak sekolah
                </Button>
              </div>
            </div>
          </div>
        </section>
        <CTA />
      </>
    );
  return (
    <>
      <SEO
        title="Program pendidikan"
        description="Kenali rancangan program Al-Qur’an, akhlak, akademik, keislaman, bakat, dan teknologi."
      />
      <PageIntro
        eyebrow="Program pendidikan"
        title="Bekal ilmu, ruang untuk bertumbuh."
        description="Jelajahi rancangan pembelajaran yang memberi perhatian pada pengetahuan, nilai Islam, dan potensi anak."
      />
      <section className="section">
        <div className="container">
          <Notice>
            Daftar ini merupakan usulan struktur program. Seluruh program menunggu konfirmasi
            sekolah.
          </Notice>
          <div className="program-grid">
            {programs.map((item, index) => (
              <Reveal key={item.slug}>
                <ProgramCard program={item} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section soft-section">
        <div className="container">
          <SectionHeading eyebrow="DOKUMENTASI SEKOLAH" title="Belajar melalui pengalaman.">
            Foto berikut merupakan dokumentasi yang tersedia, bukan bukti pelaksanaan seluruh
            rancangan program.
          </SectionHeading>
          <div className="program-gallery">
            {[images.manasik, images.prayer, images.together].map((image) => (
              <figure key={image.id}>
                <Photo image={image} />
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
