import { useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import GeometricPattern from './GeometricPattern';
import type { SchoolImage } from '../../types';
import { schoolLogo } from '../../data/images';

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className={`brand ${light ? 'brand-light' : ''}`}
      aria-label="MITARBIYAH ISLAMIYAH, Beranda"
    >
      <span className="brand-mark">
        <img
          src={schoolLogo.src}
          width={schoolLogo.width}
          height={schoolLogo.height}
          alt={schoolLogo.alt}
        />
      </span>
      <span className="brand-name">
        MITARBIYAH<span>ISLAMIYAH</span>
        <small>Madrasah Ibtidaiyah</small>
      </span>
    </Link>
  );
}

export function Button({
  children,
  to,
  variant = 'primary',
  arrow = true,
  className = '',
}: {
  children: ReactNode;
  to: string;
  variant?: 'primary' | 'light' | 'outline' | 'text';
  arrow?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  return (
    <Link
      ref={ref}
      to={to}
      className={`button button-${variant} ${className}`}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== 'mouse') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.transform = `translate(${(event.clientX - bounds.left - bounds.width / 2) * 0.045}px, ${(event.clientY - bounds.top - bounds.height / 2) * 0.08}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = '';
      }}
    >
      {children}
      {arrow && <ArrowUpRight size={17} />}
    </Link>
  );
}

export function Photo({
  image,
  className = '',
  eager = false,
  sizes = '(max-width: 700px) 100vw, 50vw',
}: {
  image: SchoolImage;
  className?: string;
  eager?: boolean;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className={`image-fallback ${className}`} role="img" aria-label={image.alt}>
        <BookOpen size={38} />
        <span>Dokumentasi sekolah</span>
      </div>
    );
  return (
    <img
      className={className}
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0.01, y: 20 }}
      animate={reduced ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  link,
  light = false,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  link?: { to: string; text: string };
  light?: boolean;
}) {
  return (
    <Reveal className={`section-heading ${light ? 'heading-light' : ''}`}>
      <div>
        <span className="eyebrow">
          <span />
          {eyebrow}
        </span>
        <h2>{title}</h2>
        {children && <p>{children}</p>}
      </div>
      {link && (
        <Button to={link.to} variant={light ? 'light' : 'text'}>
          {link.text}
        </Button>
      )}
    </Reveal>
  );
}

export function Notice({
  children = 'Draf konten. Informasi ini masih menunggu konfirmasi pihak sekolah.',
}: {
  children?: ReactNode;
}) {
  return (
    <div className="notice">
      <span className="status-dot" />
      <p>{children}</p>
    </div>
  );
}

export function EmptyState({
  title,
  children,
  icon,
}: {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon">{icon ?? <BookOpen size={27} />}</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export function PageIntro({
  title,
  eyebrow,
  description,
}: {
  title: string;
  eyebrow: string;
  description: string;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Beranda</Link>
          <span>/</span>
          <span aria-current="page">{eyebrow}</span>
        </nav>
        <div className="page-intro-content">
          <Reveal>
            <span className="eyebrow">
              <span />
              {eyebrow}
            </span>
            <h1>{title}</h1>
            <p>{description}</p>
          </Reveal>
          <GeometricPattern className="intro-flower" size={180} />
        </div>
      </div>
    </section>
  );
}

export function LoadingPage() {
  return (
    <div className="container loading-page" role="status" aria-label="Memuat halaman">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-block" />
      <span className="sr-only">Memuat halaman…</span>
    </div>
  );
}
