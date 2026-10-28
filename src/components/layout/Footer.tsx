import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Brand } from '../common/UI';
import { siteConfig } from '../../data/siteConfig';

export default function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand light />
            <p>Tempat belajar, menumbuhkan akhlak, dan menemukan potensi diri.</p>
            <span className="footer-arabic" lang="ar" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
          </div>
          <div>
            <h3>Jelajahi sekolah</h3>
            <Link to="/profil">Tentang kami</Link>
            <Link to="/visi-misi">Visi & misi</Link>
            <Link to="/program">Program pendidikan</Link>
            <Link to="/guru">Guru & tenaga pendidik</Link>
            <Link to="/fasilitas">Fasilitas</Link>
          </div>
          <div>
            <h3>Informasi</h3>
            <Link to="/berita">Berita & kegiatan</Link>
            <Link to="/galeri">Galeri sekolah</Link>
            <Link to="/ppdb">
              Penerimaan siswa baru <ArrowUpRight size={13} />
            </Link>
            <Link to="/kontak">Hubungi kami</Link>
            {siteConfig.socials.map((social) => (
              <a key={social.url} href={social.url} target="_blank" rel="noreferrer">
                {social.label}
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
          <div className="footer-contact">
            <h3>Mari terhubung</h3>
            <p>
              <MapPin size={17} />
              {contact.address || 'Alamat resmi akan dilengkapi.'}
            </p>
            <p>
              <Phone size={17} />
              {contact.phone || 'Nomor kontak belum tersedia.'}
            </p>
            <p>
              <Mail size={17} />
              {contact.email || 'Email resmi belum tersedia.'}
            </p>
            <Link className="footer-contact-link" to="/kontak">
              Lihat informasi kontak <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Seluruh hak cipta dilindungi.
          </p>
          <span>Dibangun dengan kepedulian untuk pendidikan.</span>
        </div>
      </div>
    </footer>
  );
}
