export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface StrapiArticle {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  publishedAt: string;
  featured: boolean;
  cover?: StrapiImage;
}

export interface StrapiBrand {
  id: number;
  name: string;
  slug: string;
  origin: string | null;
  description: string | null;
  logo: StrapiImage;
  cover_image?: StrapiImage;
  products?: StrapiProduct[];
}

export interface StrapiProduct {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  image?: StrapiImage;
  brand?: StrapiBrand;
}
