import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Heart,
  Monitor,
  MoonStar,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImage } from '../../data/images';
import { Photo } from '../common/UI';
import type { NewsArticle, Program } from '../../types';

const icons = {
  book: BookOpen,
  heart: Heart,
  graduation: GraduationCap,
  moon: MoonStar,
  sparkles: Sparkles,
  computer: Monitor,
};

export function ProgramCard({ program, index }: { program: Program; index: number }) {
  const Icon = icons[program.icon];
  return (
    <Link to={`/program/${program.slug}`} className="program-card">
      <div className="program-card-top">
        <span className="program-icon">
          <Icon size={25} strokeWidth={1.5} />
        </span>
        <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3>{program.title}</h3>
      <p>{program.description}</p>
      <span className="card-bottom">
        <span>{program.proposed ? 'Rancangan program' : 'Lihat program'}</span>
        <ArrowUpRight size={20} />
      </span>
    </Link>
  );
}

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="news-card">
      <Link
        to={`/berita/${article.slug}`}
        className="news-image-link"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Photo image={getImage(article.imageId)} sizes="(max-width: 650px) 100vw, 33vw" />
        <span className="image-tag">{article.category}</span>
      </Link>
      <div className="news-card-body">
        <div className="article-meta">
          <span>{article.demo ? 'Artikel contoh' : article.category}</span>
          <span>
            {article.date
              ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(
                  new Date(article.date),
                )
              : 'Tanggal belum ditetapkan'}
          </span>
        </div>
        <h3>
          <Link to={`/berita/${article.slug}`}>
            {article.title}
            <ArrowUpRight size={19} />
          </Link>
        </h3>
        <p>{article.excerpt}</p>
      </div>
    </article>
  );
}
