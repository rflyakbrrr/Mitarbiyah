import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { PageIntro, SectionHeading } from '../../components/common/UI';
import { siteConfig } from '../../data/siteConfig';

export default function Kontak() {
  const { contact } = siteConfig;
  return (
    <>
      <SEO
        title="Kontak sekolah"
        description="Alamat sekolah, nomor telepon, dan informasi kontak resmi MITARBIYAH ISLAMIYAH."
      />
      <PageIntro
        eyebrow="Hubungi kami"
        title="Percakapan baik dimulai dari sini."
        description="Punya pertanyaan tentang sekolah atau penerimaan siswa? Temukan saluran komunikasi yang tersedia di halaman ini."
      />
      <section className="section">
        <div className="container">
          <div className="contact-cards">
            <div className="contact-card">
              <MapPin />
              <h2>Alamat sekolah</h2>
              <p>{contact.address || 'Alamat lengkap menunggu konfirmasi pihak sekolah.'}</p>
            </div>
            <div className="contact-card">
              <Phone />
              <h2>Telepon</h2>
              {contact.phone ? (
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phone}</a>
              ) : (
                <p>Nomor telepon resmi belum tersedia.</p>
              )}
            </div>
            <div className="contact-card">
              <Mail />
              <h2>Email</h2>
              {contact.email ? (
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              ) : (
                <p>Email resmi sekolah belum tersedia.</p>
              )}
            </div>
          </div>
          <div className="information-layout">
            <div>
              <SectionHeading
                eyebrow="MARI TERHUBUNG"
                title="Kami ingin mendengar pertanyaan Anda."
              />
              <p className="muted">
                {contact.phone
                  ? 'Silakan hubungi nomor telepon resmi sekolah untuk pertanyaan tentang sekolah atau penerimaan siswa.'
                  : 'Saluran komunikasi akan diaktifkan setelah kontak resmi diberikan oleh sekolah.'}
              </p>
              {contact.whatsapp && (
                <a
                  className="button button-primary"
                  href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={20} />
                  Hubungi via WhatsApp
                  <ArrowUpRight size={18} />
                </a>
              )}
            </div>
            <div className="map-placeholder">
              <div className="map-grid" />
              <span className="map-pin">
                <MapPin size={28} />
              </span>
              <h3>{contact.address ? 'Lokasi sekolah' : 'Lokasi akan ditampilkan di sini'}</h3>
              <p>{contact.address || 'Peta menunggu alamat resmi yang telah dikonfirmasi.'}</p>
              {contact.mapUrl && (
                <a className="text-link" href={contact.mapUrl} target="_blank" rel="noreferrer">
                  Buka peta
                  <ArrowUpRight size={17} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
