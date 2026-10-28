import GeometricPattern from '../../components/common/GeometricPattern';
import { Button, Photo, Reveal } from '../../components/common/UI';
import { images } from '../../data/images';

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <Reveal className="cta-card">
          <Photo image={images.school} className="cta-photo" />
          <div className="cta-overlay" />
          <GeometricPattern size={250} className="cta-flower" />
          <div className="cta-copy">
            <span className="eyebrow">
              <span />
              LANGKAH KECIL, MASA DEPAN BERARTI
            </span>
            <h2>
              Bersama MITARBIYAH ISLAMIYAH,
              <br />
              Wujudkan Masa Depan Generasi Islami
            </h2>
            <p>Mari mengenal lingkungan belajar untuk perjalanan tumbuh putra-putri Anda.</p>
            <div className="button-row">
              <Button to="/ppdb" variant="light">
                Informasi Pendaftaran
              </Button>
              <Button to="/kontak" variant="outline">
                Hubungi Kami
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
