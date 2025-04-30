export interface Author {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatarUrl: string;
}

export interface Article {
  authorId: any;
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  tags?: string[];
  author: Author;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  isDraft: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
}