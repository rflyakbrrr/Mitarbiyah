import { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { LoadingPage } from '../common/UI';
import { useScrollExperience } from '../../hooks/useScrollExperience';

export default function Layout() {
  useScrollExperience();
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Lewati ke konten
      </a>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: reduced ? scrollYProgress : scaleX }}
      />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <motion.div
          key={pathname}
          initial={reduced ? false : { opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <Suspense fallback={<LoadingPage />}>
            <Outlet />
          </Suspense>
        </motion.div>
      </main>
      <Footer />
      {showTop && (
        <button
          className="back-top icon-button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })}
          aria-label="Kembali ke atas"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
}
