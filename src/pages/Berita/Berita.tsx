import { useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import {
  Button,
  EmptyState,
  Notice,
  PageIntro,
  Photo,
  SectionHeading,
} from '../../components/common/UI';
import { NewsCard } from '../../components/cards/Cards';
import { news } from '../../data/content';
import { getImage } from '../../data/images';
import NotFound from '../NotFound';

export default function Berita() {
  const { slug } = useParams();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = params.get('kategori') ?? 'Semua';
  const article = news.find((item) => item.slug === slug);
  const filtered = news.filter(
    (item) =>
      (category === 'Semua' || item.category === category) &&
      `${item.title} ${item.excerpt}`
        .toLocaleLowerCase('id')
        .includes(query.toLocaleLowerCase('id')),
  );
  const totalPages = Math.ceil(filtered.length / 3);
  const page = Math.max(1, Math.min(Number(params.get('halaman')) || 1, totalPages || 1));
  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete('halaman');
    setParams(next, { replace: true, preventScrollReset: true });
  };
  const changePage = (value: number) => {
    const next = new URLSearchParams(params);
    next.set('halaman', String(value));
    setParams(next, { preventScrollReset: true });
    document
      .getElementById('news-results')
      ?.scrollIntoView({ behavior: 'instant', block: 'start' });
  };
  if (slug && !article) return <NotFound />;
  if (article)
    return (
      <>
        <SEO
          title={article.title}
          description={article.excerpt}
          noIndex={article.demo}
          image={getImage(article.imageId).src}
        />
        <PageIntro
          eyebrow="Berita & kegiatan"
          title={article.title}
          description={article.excerpt}
        />
        <section className="section">
          <article className="container article-container">
            <Button to="/berita" variant="text">
              Kembali ke berita
            </Button>
            {article.demo && (
              <Notice>
                Artikel contoh. Isi ini bukan laporan kegiatan resmi dan belum memiliki tanggal
                publikasi.
              </Notice>
            )}
            <div className="article-meta">
              <span>{article.category}</span>
              <span>{article.date ?? 'Tanggal belum ditetapkan'}</span>
            </div>
            <Photo
              image={getImage(article.imageId)}
              eager
              className="article-cover rounded"
              sizes="(max-width: 900px) 100vw, 850px"
            />
            <div className="article-prose">
              {article.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="article-end">
              MITARBIYAH ISLAMIYAH · {article.demo ? 'Konten demo' : 'Berita sekolah'}
            </div>
          </article>
        </section>
        <section className="section soft-section">
          <div className="container">
            <SectionHeading eyebrow="BACA JUGA" title="Cerita lainnya." />
            <div className="news-grid">
              {news
                .filter((item) => item.slug !== article.slug)
                .slice(0, 3)
                .map((item) => (
                  <NewsCard key={item.slug} article={item} />
                ))}
            </div>
          </div>
        </section>
      </>
    );
  return (
    <>
      <SEO
        title="Berita & kegiatan"
        description="Kumpulan berita dan cerita kegiatan MITARBIYAH ISLAMIYAH. Konten contoh ditandai dengan jelas."
      />
      <PageIntro
        eyebrow="Berita & kegiatan"
        title="Kabar kecil, cerita yang berarti."
        description="Ruang untuk mengikuti kegiatan dan mengenal kehidupan sekolah dari dekat."
      />
      <section className="section">
        <div className="container">
          <Notice>
            Semua artikel yang tersedia saat ini adalah konten demo. Belum ada laporan resmi atau
            tanggal publikasi dari sekolah.
          </Notice>
          <div className="news-toolbar">
            <div className="filter-row" role="group" aria-label="Kategori berita">
              {['Semua', ...new Set(news.map((item) => item.category))].map((label) => (
                <button
                  className={`filter-chip ${category === label ? 'selected' : ''}`}
                  key={label}
                  aria-pressed={category === label}
                  onClick={() => updateFilter('kategori', label)}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="search-field">
              <Search size={19} />
              <input
                aria-label="Cari berita"
                placeholder="Cari cerita atau kegiatan…"
                value={query}
                onChange={(event) => updateFilter('q', event.target.value)}
              />
            </label>
          </div>
          <p className="result-count" aria-live="polite">
            {filtered.length} artikel ditemukan
          </p>
          <div id="news-results">
            {filtered.length ? (
              <div className="news-grid">
                {filtered.slice((page - 1) * 3, page * 3).map((item) => (
                  <NewsCard key={item.slug} article={item} />
                ))}
              </div>
            ) : (
              <EmptyState title="Belum ada cerita yang cocok" icon={<Search />}>
                Coba kata kunci lain atau pilih semua kategori.
              </EmptyState>
            )}
          </div>
          {totalPages > 1 && (
            <nav className="pagination" aria-label="Halaman berita">
              <button
                className="icon-button"
                disabled={page === 1}
                aria-label="Halaman sebelumnya"
                onClick={() => changePage(page - 1)}
              >
                <ArrowLeft size={18} />
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={page === index + 1 ? 'current' : ''}
                  aria-current={page === index + 1 ? 'page' : undefined}
                  aria-label={`Halaman ${index + 1}`}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="icon-button"
                disabled={page === totalPages}
                aria-label="Halaman berikutnya"
                onClick={() => changePage(page + 1)}
              >
                <ArrowRight size={18} />
              </button>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
