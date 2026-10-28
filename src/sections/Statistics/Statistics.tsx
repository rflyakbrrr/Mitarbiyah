import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
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
  return (
    <section className="stats-section" aria-label="Sekolah dalam angka">
      <div className="container">
        <div className="stats-grid">
          {siteConfig.highlights.map((item, index) => {
            const Icon = icons[index];
            return (
              <div className="stat-item" key={item.label}>
                <Icon size={24} strokeWidth={1.5} />
                <div>
                  <Counter value={item.value} suffix={item.suffix} />
                  <h2>{item.label}</h2>
                </div>
              </div>
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
