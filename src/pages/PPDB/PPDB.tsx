import { CalendarDays, ClipboardList, FileCheck2, Route } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Button, Notice, PageIntro, Photo, SectionHeading } from '../../components/common/UI';
import { siteConfig } from '../../data/siteConfig';
import { images } from '../../data/images';

export default function PPDB() {
  const { admissions } = siteConfig;
  return (
    <>
      <SEO
        title="Informasi PPDB"
        description="Informasi penerimaan peserta didik baru MITARBIYAH ISLAMIYAH, persyaratan, alur, dan jadwal pendaftaran."
      />
      <PageIntro
        eyebrow="Penerimaan peserta didik baru"
        title="Awali perjalanan belajar yang berarti."
        description="Temukan informasi penerimaan siswa dan kenali langkah pendaftaran untuk putra-putri Anda."
      />
      <section className="section">
        <div className="container">
          <div className="admissions-banner">
            <div>
              <span className="eyebrow">
                <span />
                INFORMASI PENDAFTARAN {admissions.year}
              </span>
              <h2>
                Mari mengenal sekolah
                <br />
                lebih dekat.
              </h2>
              <p>{admissions.status}. Jadwal, biaya, dan kuota resmi belum dipublikasikan.</p>
              <Button to="/kontak" variant="light">
                Informasi kontak
              </Button>
            </div>
            <Photo image={images.manasik} eager />
          </div>
          <div className="admissions-info">
            <div className="content-panel">
              <CalendarDays size={26} />
              <h2>Jadwal penerimaan</h2>
              {admissions.schedule.length ? (
                <dl>
                  {admissions.schedule.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.date}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p>
                  Tanggal pembukaan, penutupan, dan pengumuman penerimaan menunggu informasi resmi
                  dari sekolah.
                </p>
              )}
            </div>
            <div className="content-panel">
              <FileCheck2 size={26} />
              <h2>Persyaratan</h2>
              {admissions.requirements.length ? (
                <ul>
                  {admissions.requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  Ketentuan usia, dokumen, dan persyaratan lain belum dikonfirmasi. Gunakan daftar
                  resmi sekolah saat pendaftaran dibuka.
                </p>
              )}
            </div>
            <div className="content-panel">
              <Route size={26} />
              <h2>Alur pendaftaran</h2>
              {admissions.steps.length ? (
                <ol>
                  {admissions.steps.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p>
                  Prosedur pengisian data, verifikasi, dan daftar ulang akan ditampilkan setelah
                  ditetapkan pihak sekolah.
                </p>
              )}
            </div>
          </div>
          <Notice>
            Belum ada layanan pendaftaran daring aktif. Silakan hubungi sekolah untuk informasi
            pendaftaran.
          </Notice>
        </div>
      </section>
      <section className="section soft-section">
        <div className="container information-layout">
          <div>
            <SectionHeading eyebrow="SEBELUM MENDAFTAR" title="Kenali kebutuhan belajar anak." />
            <p className="muted">
              Sambil menunggu pengumuman, Anda dapat menyiapkan pertanyaan untuk pihak sekolah.
            </p>
            <Button to="/kontak">Hubungi sekolah</Button>
          </div>
          <div className="question-list">
            <ClipboardList size={26} />
            <h3>Hal yang dapat ditanyakan</h3>
            <ul>
              <li>Bagaimana kegiatan belajar sehari-hari?</li>
              <li>Apa saja persyaratan pendaftaran?</li>
              <li>Bagaimana rincian biaya pendidikan?</li>
              <li>Bagaimana komunikasi antara orang tua dan pendidik?</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
