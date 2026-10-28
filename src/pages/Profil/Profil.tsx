import { BookOpen, History, MessageSquare, School } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import {
  EmptyState,
  Notice,
  PageIntro,
  Photo,
  Reveal,
  SectionHeading,
} from '../../components/common/UI';
import { siteConfig, values } from '../../data/siteConfig';
import { images } from '../../data/images';
import CTA from '../../sections/CTA/CTA';

export default function Profil() {
  const { profile } = siteConfig;
  return (
    <>
      <SEO
        title="Profil sekolah"
        description="Mengenal MITARBIYAH ISLAMIYAH, identitas lembaga, dan arah pendidikannya."
      />
      <PageIntro
        eyebrow="Profil sekolah"
        title="Mengenal sekolah, mengenal perjalanan."
        description="Pendidikan dimulai dari rasa ingin tahu, tumbuh melalui pendampingan, dan hadir dalam kebiasaan sehari-hari."
      />
      <section className="section">
        <div className="container">
          <div className="editorial-grid">
            <Reveal>
              <Photo image={images.school} className="rounded editorial-photo" eager />
              <p className="image-footnote">Dokumentasi kebersamaan siswa di lingkungan sekolah.</p>
            </Reveal>
            <Reveal className="prose">
              <span className="eyebrow">
                <span />
                TENTANG LEMBAGA
              </span>
              <h2>
                Belajar dengan ilmu.
                <br />
                Bertumbuh dengan akhlak.
              </h2>
              <p>{profile.introduction}</p>
              <p>{siteConfig.description}</p>
              {profile.draft && (
                <Notice>
                  Deskripsi profil dan filosofi pendidikan adalah draf yang perlu disetujui pihak
                  sekolah.
                </Notice>
              )}
            </Reveal>
          </div>
          <div className="profile-panels">
            <div className="content-panel">
              <span className="panel-icon">
                <History />
              </span>
              <h2>Sejarah sekolah</h2>
              {profile.history ? (
                <p>{profile.history}</p>
              ) : (
                <p>
                  Riwayat pendirian, tokoh pendiri, dan perjalanan sekolah belum diberikan. Bagian
                  ini akan memuat sejarah yang telah dikonfirmasi lembaga.
                </p>
              )}
            </div>
            <div className="content-panel">
              <span className="panel-icon">
                <MessageSquare />
              </span>
              <h2>Sambutan kepala sekolah</h2>
              {profile.principalMessage ? (
                <>
                  <p>{profile.principalMessage}</p>
                  <strong>{profile.principalName}</strong>
                </>
              ) : (
                <p>
                  Sambutan dan identitas kepala sekolah akan ditampilkan setelah naskah resmi
                  tersedia.
                </p>
              )}
            </div>
          </div>
          <SectionHeading eyebrow="IDENTITAS LEMBAGA" title="Informasi sekolah" />
          <div className="identity-table">
            <div>
              <span>Nama lembaga</span>
              <strong>{siteConfig.name}</strong>
            </div>
            {profile.identity.map((row) => (
              <div key={row.label}>
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            ))}
          </div>
          {!profile.identity.length && (
            <Notice>
              Nomor identitas lembaga, akreditasi, dan informasi administrasi lainnya belum
              dikonfirmasi.
            </Notice>
          )}
        </div>
      </section>
      <section className="section soft-section">
        <div className="container">
          <SectionHeading eyebrow="FILOSOFI PENDIDIKAN" title="Hal baik yang ingin ditumbuhkan." />
          <div className="values-grid">
            {values.map((value, index) => (
              <Reveal className="value-card" key={value.title} delay={index * 0.04}>
                <span className="card-number">0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </Reveal>
            ))}
          </div>
          <Notice>Rumusan filosofi di atas merupakan draf untuk ditinjau.</Notice>
        </div>
      </section>
      <section className="container section compact-section">
        <EmptyState title="Mengenal warga sekolah" icon={<School />}>
          Informasi guru dan tenaga pendidik akan dilengkapi berdasarkan data resmi lembaga.
        </EmptyState>
        <a className="text-link centered-link" href="/guru">
          Lihat direktori pendidik <BookOpen size={17} />
        </a>
      </section>
      <CTA />
    </>
  );
}
