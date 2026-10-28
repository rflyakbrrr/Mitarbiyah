import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { GraduationCap, Search, Users, X } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { EmptyState, PageIntro, Photo } from '../../components/common/UI';
import { teachers } from '../../data/siteConfig';
import { getImage, images } from '../../data/images';
import { useDialog } from '../../hooks/useDialog';
import type { Teacher } from '../../types';
import CTA from '../../sections/CTA/CTA';

function TeacherDetail({ teacher, close }: { teacher: Teacher; close: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(true, ref, close);
  return createPortal(
    <div className="lightbox-backdrop">
      <div
        className="teacher-dialog"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacher-name"
        data-lenis-prevent
      >
        <button className="icon-button dialog-close" onClick={close} aria-label="Tutup profil">
          <X />
        </button>
        {teacher.imageId ? (
          <Photo image={getImage(teacher.imageId)} className="teacher-avatar" />
        ) : (
          <GraduationCap size={50} />
        )}
        <h2 id="teacher-name">{teacher.name}</h2>
        <span className="eyebrow">{teacher.role}</span>
        <p>{teacher.bio}</p>
      </div>
    </div>,
    document.body,
  );
}

export default function Guru() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Teacher | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const filtered = teachers.filter((teacher) =>
    `${teacher.name} ${teacher.role}`
      .toLocaleLowerCase('id')
      .includes(search.toLocaleLowerCase('id')),
  );
  return (
    <>
      <SEO
        title="Guru & tenaga pendidik"
        description="Direktori guru dan tenaga pendidik MITARBIYAH ISLAMIYAH."
      />
      <PageIntro
        eyebrow="Guru & tenaga pendidik"
        title="Mendampingi setiap langkah belajar."
        description="Mengenal orang-orang yang mendampingi anak dalam perjalanan pendidikan mereka."
      />
      <section className="section">
        <div className="container">
          <div className="directory-banner">
            <Photo image={images.hero} eager />
            <div>
              <GraduationCap size={32} />
              <h2>
                Belajar tumbuh
                <br />
                melalui pendampingan.
              </h2>
              <p>
                Data nama, jabatan, dan profil pendidik akan ditampilkan setelah disetujui pihak
                sekolah.
              </p>
            </div>
          </div>
          <label className="search-field">
            <Search size={20} />
            <input
              aria-label="Cari nama atau bidang pendidik"
              placeholder="Cari nama atau bidang pendidik…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          {filtered.length ? (
            <div className="teacher-grid">
              {filtered.map((teacher) => (
                <button
                  className="teacher-card"
                  key={teacher.id}
                  onClick={() => setSelected(teacher)}
                >
                  {teacher.imageId ? (
                    <Photo image={getImage(teacher.imageId)} />
                  ) : (
                    <span className="teacher-placeholder">
                      <GraduationCap size={40} />
                    </span>
                  )}
                  <h3>{teacher.name}</h3>
                  <p>{teacher.role}</p>
                  <span className="text-link">Lihat profil</span>
                </button>
              ))}
            </div>
          ) : (
            <EmptyState
              title={
                teachers.length ? 'Pendidik tidak ditemukan' : 'Direktori pendidik sedang disiapkan'
              }
              icon={<Users size={28} />}
            >
              {teachers.length
                ? 'Coba nama atau bidang lain untuk mencari pendidik.'
                : 'Foto dan identitas pendidik belum diberikan. Informasi akan ditampilkan setelah mendapat konfirmasi, sehingga Anda dapat mengenal tim sekolah dengan tepat.'}
            </EmptyState>
          )}
        </div>
      </section>
      {selected && <TeacherDetail teacher={selected} close={close} />}
      <CTA />
    </>
  );
}
