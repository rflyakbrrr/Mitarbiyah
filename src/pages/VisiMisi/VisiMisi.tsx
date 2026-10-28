import { Check, Compass } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Notice, PageIntro, Reveal, SectionHeading } from '../../components/common/UI';
import { siteConfig, values } from '../../data/siteConfig';
import CTA from '../../sections/CTA/CTA';

export default function VisiMisi() {
  return (
    <>
      <SEO
        title="Visi & misi"
        description="Rancangan visi, misi, nilai utama, dan tujuan pendidikan MITARBIYAH ISLAMIYAH."
        noIndex
      />
      <PageIntro
        eyebrow="Visi & misi"
        title="Arah yang jelas untuk tumbuh bersama."
        description="Mengenal nilai yang menjadi dasar rancangan pendidikan dan pendampingan anak."
      />
      <section className="section">
        <div className="container">
          <Notice>
            Seluruh rumusan pada halaman ini adalah draf, bukan pernyataan resmi visi dan misi
            sekolah.
          </Notice>
          <Reveal className="vision-statement">
            <Compass size={37} strokeWidth={1.2} />
            <span className="eyebrow">VISI PENDIDIKAN</span>
            <h2>{siteConfig.vision}</h2>
          </Reveal>
          <SectionHeading eyebrow="MISI PENDIDIKAN" title="Langkah yang ingin diupayakan." />
          <div className="mission-list">
            {siteConfig.mission.map((mission, index) => (
              <Reveal className="mission-row" key={mission}>
                <span>0{index + 1}</span>
                <h3>{mission}</h3>
                <Check size={22} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section soft-section">
        <div className="container">
          <SectionHeading eyebrow="NILAI-NILAI UTAMA" title="Berakar pada kebaikan." />
          <div className="values-grid">
            {values.map((value) => (
              <div className="value-card" key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
          <div className="education-goal">
            <span className="eyebrow">
              <span />
              TUJUAN PENDIDIKAN
            </span>
            <h2>
              Ilmu menjadi bekal,
              <br />
              akhlak hadir dalam tindakan.
            </h2>
            <p>
              Rancangan tujuan pendidikan ini menempatkan pemahaman ilmu, kebiasaan baik, dan
              kemampuan hidup bersama sebagai bekal tumbuh anak. Target serta indikator pencapaian
              akan ditetapkan oleh pihak sekolah.
            </p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
