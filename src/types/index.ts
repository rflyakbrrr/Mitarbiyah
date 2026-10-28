export interface SchoolImage {
  id: string;
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  category: 'Kebersamaan' | 'Keislaman' | 'Lingkungan sekolah';
  caption: string;
}

export interface Program {
  slug: string;
  title: string;
  description: string;
  icon: 'book' | 'heart' | 'graduation' | 'moon' | 'sparkles' | 'computer';
  objectives: string[];
  imageId: string;
  proposed: boolean;
}

export interface NewsArticle {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  imageId: string;
  date: string | null;
  demo: boolean;
  paragraphs: string[];
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageId?: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  imageId: string;
}
