import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, BookOpen, Heart, Leaf, ShieldCheck } from 'lucide-react';
import Hero from '../../sections/Hero/Hero';
import Statistics from '../../sections/Statistics/Statistics';
import CTA from '../../sections/CTA/CTA';
import { Button, Notice, Photo, Reveal, SectionHeading } from '../../components/common/UI';
import { SEO } from '../../components/common/SEO';
import { ProgramCard, NewsCard } from '../../components/cards/Cards';
import Gallery from '../../components/common/Gallery';
import { images, getImage } from '../../data/images';
import { programs, news } from '../../data/content';
import { facilities, siteConfig } from '../../data/siteConfig';

const Testimonials = lazy(() => import('../../sections/Testimonials/Testimonials'));

export default function Home() {
  return (
    <>
      <SEO title="Beranda" description={siteConfig.description} />
      <Hero />
      <Statistics />
      <section className="section about-section" id="tentang">
        <div className="container about-grid">
          <Reveal className="about-images">
            <div className="about-main-image">
              <Photo image={images.manasik} />
              <span className="image-corner" />
            </div>
            <div className="about-small-image">
              <Photo image={images.prayer} sizes="(max-width: 650px) 40vw, 20vw" />
            </div>
            <div className="about-image-caption">
              <span className="small-star">✧</span>
              <p>
                Belajar dengan hati,
                <br />
                <strong>bertumbuh dalam kebaikan.</strong>
              </p>
            </div>
            <span className="about-outline" />
          </Reveal>
          <Reveal className="about-copy">
            <span className="eyebrow">
              <span />
              MENGENAL LEBIH DEKAT
            </span>
            <h2>
              Tempat ilmu bertemu
              <br />
              <em>akhlak mulia.</em>
            </h2>
            <p>{siteConfig.profile.introduction}</p>
            <p>
              Melalui pendidikan yang dekat dengan kehidupan, anak diajak memahami ilmu sekaligus
              belajar memberi manfaat bagi sesama.
            </p>
            <div className="about-values">
              <span>
                <ShieldCheck size={19} />
                Nilai Islam dalam keseharian
              </span>
              <span>
                <Heart size={19} />
                Ruang tumbuh bagi setiap anak
              </span>
            </div>
            <Button to="/profil" variant="text">
              Selengkapnya tentang kami
            </Button>
            <small className="editorial-note">
              Gambaran pendidikan ini merupakan draf untuk ditinjau sekolah.
            </small>
          </Reveal>
        </div>
      </section>
      <section className="vision-band">
        <div className="container vision-layout">
          <Reveal>
            <span className="eyebrow">
              <span />
              ARAH PENDIDIKAN KAMI
            </span>
            <h2>
              Ilmu yang bermanfaat.
              <br />
              Akhlak yang menguatkan.
            </h2>
            <span className="arabic-quote" lang="ar" dir="rtl">
              رَبِّ زِدْنِي عِلْمًا
            </span>
            <p>“Ya Tuhanku, tambahkanlah ilmu kepadaku.”</p>
            <small>QS. Taha: 114</small>
          </Reveal>
          <div className="vision-cards">
            <Reveal className="vision-card">
              <BookOpen size={25} />
              <div>
                <span>01 / VISI</span>
                <h3>Tumbuh dengan tujuan</h3>
                <p>{siteConfig.vision}</p>
              </div>
            </Reveal>
            <Reveal className="vision-card" delay={0.1}>
              <Leaf size={25} />
              <div>
                <span>02 / MISI</span>
                <h3>Belajar untuk kehidupan</h3>
                <p>
                  Mendampingi anak memahami ilmu, membangun kebiasaan baik, dan mengembangkan
                  potensi dirinya.
                </p>
              </div>
            </Reveal>
            <div className="vision-bottom">
              <span>Draf visi & misi</span>
              <Button to="/visi-misi" variant="text">
                Kenali arah kami
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="section programs-section">
        <div className="container">
          <SectionHeading
            eyebrow="PROGRAM PENDIDIKAN"
            title="Bekal untuk setiap langkah."
            link={{ to: '/program', text: 'Jelajahi program' }}
          >
            Ruang belajar yang mempertemukan pengetahuan, nilai Islam, dan potensi anak.
          </SectionHeading>
          <div className="program-grid">
            {programs.map((program, index) => (
              <Reveal key={program.slug} delay={(index % 3) * 0.06}>
                <ProgramCard program={program} index={index} />
              </Reveal>
            ))}
          </div>
          <Notice>
            Program di atas merupakan rancangan konten. Ketersediaan dan pelaksanaannya menunggu
            konfirmasi sekolah.
          </Notice>
        </div>
      </section>
      <section className="facilities-section">
        <div className="container facilities-layout">
          <Reveal className="facility-photo">
            <Photo image={facilities.length ? getImage(facilities[0].imageId) : images.courtyard} />
            <span className="photo-caption">
              Dokumentasi lingkungan sekolah
              <ArrowUpRight size={17} />
            </span>
          </Reveal>
          <Reveal className="facility-copy">
            <span className="eyebrow">
              <span />
              LINGKUNGAN BELAJAR
            </span>
            <h2>
              Ruang untuk bertemu,
              <br />
              belajar, dan bertumbuh.
            </h2>
            <p>
              Kenali suasana sekolah melalui dokumentasi yang tersedia. Informasi rinci tentang
              fasilitas akan dilengkapi setelah mendapat konfirmasi.
            </p>
            <motion.div
              className="facility-divider"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 0.8 }}
            />
            <span className="tiny-label">DARI HALAMAN SEKOLAH</span>
            <p className="facility-small">
              Ada banyak cerita di antara kegiatan belajar dan waktu bersama teman.
            </p>
            <Button to="/fasilitas" variant="text">
              Jelajahi lingkungan sekolah
            </Button>
          </Reveal>
        </div>
      </section>
      <section className="section gallery-section">
        <div className="container">
          <SectionHeading
            eyebrow="POTRET KESEHARIAN"
            title="Setiap momen, sebuah cerita."
            link={{ to: '/galeri', text: 'Lihat semua foto' }}
          >
            Sekilas kebersamaan dan pengalaman belajar melalui lensa sekolah.
          </SectionHeading>
          <Gallery compact />
        </div>
      </section>
      <section className="section news-section">
        <div className="container">
          <SectionHeading
            eyebrow="KABAR DARI SEKOLAH"
            title="Cerita & kegiatan terbaru."
            link={{ to: '/berita', text: 'Semua berita' }}
          />
          <div className="news-grid">
            {news.slice(0, 3).map((article) => (
              <Reveal key={article.slug}>
                <NewsCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Suspense
        fallback={<div className="section container skeleton" aria-label="Memuat cerita sekolah" />}
      >
        <Testimonials />
      </Suspense>
      <CTA />
    </>
  );
}
