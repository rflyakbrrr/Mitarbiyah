import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { testimonialSlots } from '../../data/content';
import { SectionHeading } from '../../components/common/UI';
import 'swiper/css';

export default function Testimonials() {
  const swiper = useRef<SwiperInstance | null>(null);
  return (
    <section className="section testimonials-section">
      <div className="container testimonial-layout">
        <div>
          <SectionHeading eyebrow="CERITA KELUARGA SEKOLAH" title="Tumbuh bersama, berbagi cerita.">
            Pengalaman orang tua dan alumni membantu kita mengenal sekolah dari dekat.
          </SectionHeading>
          <div className="carousel-controls">
            <button
              className="icon-button"
              aria-label="Cerita sebelumnya"
              onClick={() => swiper.current?.slidePrev()}
            >
              <ArrowLeft size={20} />
            </button>
            <button
              className="icon-button"
              aria-label="Cerita berikutnya"
              onClick={() => swiper.current?.slideNext()}
            >
              <ArrowRight size={20} />
            </button>
            <span>Geser untuk menjelajah</span>
          </div>
        </div>
        <Swiper
          modules={[A11y, Keyboard]}
          keyboard={{ enabled: true, onlyInViewport: true }}
          loop
          spaceBetween={24}
          slidesPerView={1}
          onSwiper={(instance) => {
            swiper.current = instance;
          }}
          a11y={{ prevSlideMessage: 'Cerita sebelumnya', nextSlideMessage: 'Cerita berikutnya' }}
        >
          {testimonialSlots.map((slot) => (
            <SwiperSlide key={slot.role}>
              <div className="testimonial-card">
                <Quote size={38} strokeWidth={1.2} />
                <span className="demo-label">Ruang testimoni · belum tersedia</span>
                <p>{slot.text}</p>
                <div className="testimonial-person">
                  <span>{slot.role.charAt(0)}</span>
                  <div>
                    <strong>{slot.role}</strong>
                    <small>Menunggu testimoni yang disetujui</small>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
