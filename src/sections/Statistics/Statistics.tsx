import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import { Award, BookOpen, GraduationCap, Users } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

function Counter({ value, suffix }: { value: number | null; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [number, setNumber] = useState(0);
  useEffect(() => {
    if (!visible || value === null) return;
    if (reduced) {
      setNumber(value);
      return;
    }
    const control = animate(0, value, {
      duration: 1.4,
      onUpdate: (latest) => setNumber(Math.round(latest)),
    });
    return () => control.stop();
  }, [value, visible, reduced]);
  return (
    <span ref={ref} className="stat-number">
      {value === null ? (
        <span className="stat-unset" aria-label="Data belum tersedia">
          ···
        </span>
      ) : (
        `${new Intl.NumberFormat('id-ID').format(number)}${suffix}`
      )}
    </span>
  );
}

export default function Statistics() {
  const icons = [Users, GraduationCap, BookOpen, Award];
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.2 });
  return (
    <section className="stats-section" aria-label="Sekolah dalam angka">
      <div className="container">
        <div className="stats-grid" ref={ref}>
          {siteConfig.highlights.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                className="stat-item"
                key={item.label}
                initial={reduced ? false : { opacity: 0, y: 15 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Icon size={24} strokeWidth={1.5} />
                <div>
                  <Counter value={item.value} suffix={item.suffix} />
                  <h2>{item.label}</h2>
                </div>
              </motion.div>
            );
          })}
        </div>
        {siteConfig.highlights.some((item) => item.value === null) && (
          <p className="stats-note">
            Data statistik akan ditampilkan setelah dikonfirmasi pihak sekolah.
          </p>
        )}
      </div>
    </section>
  );
}
