import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Brand } from '../common/UI';
import { siteConfig } from '../../data/siteConfig';

export default function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Brand light />
            <p>Tempat belajar, menumbuhkan akhlak, dan menemukan potensi diri.</p>
            <span className="footer-arabic" lang="ar" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3>Jelajahi sekolah</h3>
            <Link to="/profil">Tentang kami</Link>
            <Link to="/visi-misi">Visi &amp; misi</Link>
            <Link to="/program">Program pendidikan</Link>
            <Link to="/guru">Guru &amp; tenaga pendidik</Link>
            <Link to="/fasilitas">Fasilitas</Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Informasi</h3>
            <Link to="/berita">Berita &amp; kegiatan</Link>
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
          </motion.div>
          <motion.div
            className="footer-contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
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
          </motion.div>
        </div>
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Seluruh hak cipta dilindungi.
          </p>
          <span>Dibangun dengan kepedulian untuk pendidikan.</span>
        </motion.div>
      </div>
    </footer>
  );
}
