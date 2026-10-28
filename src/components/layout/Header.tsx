import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { Brand, Button } from '../common/UI';
import { navigation } from '../../data/navigation';
import { useDialog } from '../../hooks/useDialog';

export default function Header() {
  const [mobile, setMobile] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setMobile(false), []);
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  useDialog(mobile, panel, close);
  useEffect(() => {
    setMobile(false);
    setDropdown(false);
  }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!dropdown) return;
    const outside = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setDropdown(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [dropdown]);
  const schoolPaths = ['/profil', '/visi-misi', '/guru', '/fasilitas'];
  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Navigasi utama">
            <NavLink to="/" end>
              Beranda
            </NavLink>
            <div
              className="nav-dropdown"
              ref={dropdownRef}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setDropdown(false);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setDropdown(false);
                  triggerRef.current?.focus();
                }
              }}
            >
              <button
                ref={triggerRef}
                className={schoolPaths.includes(pathname) ? 'active' : ''}
                aria-expanded={dropdown}
                aria-controls="school-menu"
                onClick={() => setDropdown(!dropdown)}
              >
                Tentang Kami <ChevronDown size={13} className={dropdown ? 'rotated' : ''} />
              </button>
              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    className="dropdown-panel"
                    id="school-menu"
                    initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {navigation
                      .filter((item) => schoolPaths.includes(item.path))
                      .map((item) => (
                        <NavLink key={item.path} to={item.path}>
                          {item.label}
                          <ArrowUpRight size={14} />
                        </NavLink>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <NavLink to="/program">Program</NavLink>
            <NavLink to="/berita">Berita & Kegiatan</NavLink>
            <NavLink to="/galeri">Galeri</NavLink>
            <NavLink to="/kontak">Kontak</NavLink>
          </nav>
          <div className="header-actions">
            <Button to="/ppdb" className="header-cta">
              Informasi PPDB
            </Button>
            <button
              className="mobile-toggle icon-button"
              aria-label="Buka navigasi"
              aria-expanded={mobile}
              aria-controls="mobile-navigation"
              onClick={() => setMobile(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {mobile && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              ref={panel}
              className="mobile-panel"
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Navigasi situs"
              data-lenis-prevent
            >
              <div className="mobile-panel-top">
                <Brand />
                <button className="icon-button" onClick={close} aria-label="Tutup navigasi">
                  <X />
                </button>
              </div>
              <nav aria-label="Navigasi seluler">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={reduced ? false : { x: 15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.025 }}
                  >
                    <NavLink to={item.path} end={item.path === '/'} onClick={close}>
                      <span>
                        <small>{String(index + 1).padStart(2, '0')}</small>
                        {item.label}
                      </span>
                      <ArrowUpRight size={18} />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <Link className="button button-primary" to="/ppdb" onClick={close}>
                Informasi PPDB
                <ArrowUpRight size={18} />
              </Link>
              <p>Berilmu. Berakhlak. Berprestasi.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
