import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, BookOpen, Sparkles } from 'lucide-react';
import GeometricPattern from '../../components/common/GeometricPattern';
import { Button, Photo } from '../../components/common/UI';
import { images } from '../../data/images';
import { siteConfig } from '../../data/siteConfig';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        '.hero-photo',
        { yPercent: -2, scale: 1.05 },
        {
          yPercent: 8,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
        },
      );
    }, root);
    return () => context.revert();
  }, [reduced]);
  return (
    <section className="hero" ref={root}>
      <div className="hero-image">
        <Photo image={images.hero} eager className="hero-photo" sizes="100vw" />
      </div>
      <div className="hero-shade" />
      <GeometricPattern className="hero-geometry" size={380} />
      <div className="container hero-container">
        <motion.div
          className="hero-copy"
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="hero-eyebrow">
            <span />
            SELAMAT DATANG DI MITARBIYAH ISLAMIYAH
          </span>
          <h1 aria-label="Membentuk Generasi Berilmu, Berakhlak, dan Berprestasi">
            {['Membentuk Generasi', 'Berilmu, Berakhlak,', 'dan Berprestasi'].map((line, index) => (
              <span className="hero-line" key={line}>
                <motion.span
                  initial={reduced ? false : { y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.12 + index * 0.13,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <p>{siteConfig.description}</p>
          <div className="hero-buttons">
            <Button to="/profil" variant="light">
              Jelajahi Sekolah
            </Button>
            <Button to="/ppdb" variant="outline">
              Informasi PPDB
            </Button>
          </div>
          <div className="hero-note">
            <span className="hero-note-icon">
              <BookOpen size={19} />
            </span>
            <span>
              Berawal dari ilmu.
              <br />
              <strong>Tumbuh dengan akhlak.</strong>
            </span>
          </div>
        </motion.div>
        <motion.div
          className="hero-floating"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <span className="floating-icon">
            <Sparkles size={21} strokeWidth={1.5} />
          </span>
          <span>
            Setiap anak punya potensi.<strong>Mari tumbuh bersama.</strong>
          </span>
          <span className="floating-dot" />
        </motion.div>
        <div className="hero-bottom">
          <a href="#tentang" className="scroll-cue">
            <span>
              <ArrowDown size={16} />
            </span>
            Kenali sekolah kami
          </a>
          <span className="hero-photo-credit">
            01 / 07 <span>Sepenggal cerita dari sekolah</span>
          </span>
        </div>
      </div>
    </section>
  );
}
