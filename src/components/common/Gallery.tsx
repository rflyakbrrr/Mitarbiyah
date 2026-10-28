import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { galleryImages } from '../../data/images';
import { Photo } from './UI';
import { useDialog } from '../../hooks/useDialog';
import type { SchoolImage } from '../../types';

export function Lightbox({
  images,
  index,
  onClose,
  onChange,
}: {
  images: SchoolImage[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useDialog(true, ref, onClose);
  const previous = useCallback(
    () => onChange((index - 1 + images.length) % images.length),
    [index, images.length, onChange],
  );
  const next = useCallback(
    () => onChange((index + 1) % images.length),
    [index, images.length, onChange],
  );
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previous();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [previous, next]);
  const image = images[index];
  return createPortal(
    <div
      className="lightbox-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="lightbox"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Pratinjau foto"
        data-lenis-prevent
      >
        <div className="lightbox-top">
          <span>Dokumentasi sekolah</span>
          <button className="icon-button" onClick={onClose} aria-label="Tutup pratinjau">
            <X />
          </button>
        </div>
        <motion.div
          key={image.id}
          className="lightbox-image"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Photo image={image} eager sizes="90vw" />
        </motion.div>
        <div className="lightbox-bottom">
          <div aria-live="polite">
            <p>{image.caption}</p>
            <small>
              {index + 1} / {images.length}
            </small>
          </div>
          <div>
            <button className="icon-button" onClick={previous} aria-label="Foto sebelumnya">
              <ArrowLeft />
            </button>
            <button className="icon-button" onClick={next} aria-label="Foto berikutnya">
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function Gallery({ compact = false }: { compact?: boolean }) {
  const [category, setCategory] = useState('Semua');
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const reduced = useReducedMotion();
  const source = compact
    ? [galleryImages[0], galleryImages[3], galleryImages[4], galleryImages[5]]
    : galleryImages;
  const filtered = source.filter((image) => category === 'Semua' || image.category === category);
  return (
    <>
      {!compact && (
        <div className="filter-row" role="group" aria-label="Kategori foto">
          {['Semua', 'Kebersamaan', 'Keislaman', 'Lingkungan sekolah'].map((label) => (
            <button
              key={label}
              className={`filter-chip ${category === label ? 'selected' : ''}`}
              aria-pressed={category === label}
              onClick={() => setCategory(label)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      <div className={`gallery-grid ${compact ? 'gallery-compact' : ''}`}>
        <AnimatePresence mode="popLayout">
          {filtered.map((image, position) => (
            <motion.button
              layout={!reduced}
              key={image.id}
              initial={reduced ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="gallery-item"
              onClick={() => setIndex(position)}
              aria-label={`Lihat foto: ${image.caption}`}
            >
              <Photo
                image={image}
                sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw"
              />
              <span className="gallery-caption">
                <span>
                  <small>{image.category}</small>
                  {image.caption}
                </span>
                <span className="gallery-arrow">
                  <ArrowUpRight size={19} />
                </span>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
      {index !== null && (
        <Lightbox images={filtered} index={index} onClose={close} onChange={setIndex} />
      )}
    </>
  );
}
