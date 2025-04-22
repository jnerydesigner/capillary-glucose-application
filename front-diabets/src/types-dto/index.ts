export interface ResponseTypeArticles {
  data: ArticleType[];
  meta: Meta;
}

export interface ResponseTypeHealthy {
  data: HealthyType[];
  meta: Meta;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface HealthyType {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  content: Content[];
  stars: number;
  calories: number;
  author: Author;
  cover: Cover;
  category: CategoryHealthy;
}

export interface ArticleType {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  content: Content[];
  sub_title: string;
  likes: string;
  author: Author;
  category: Category;
  cover: Cover;
}

export interface CategoryHealthy {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  avatar_url: string;
  social_media: SocialMedia;
  specialty_title: string;
}
export interface SocialMedia {
  social: Social[];
}

export interface Social {
  name: string;
  url: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Cover {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Formats {
  small: Small;
  medium: Medium;
  thumbnail: Thumbnail;
}

export interface Small {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Medium {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Thumbnail {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Content {
  type: "text" | "heading" | "paragraph" | "list" | "list-item";
  text?: string;
  bold?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  format?: "ordered" | "unordered";
  children?: Children[];
}

export interface Children {
  type: "text" | "heading" | "paragraph" | "list" | "list-item";
  text?: string;
  bold?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  format?: "ordered" | "unordered";
  children?: Children[];
}

export interface Children2 {
  text: string;
  type: string;
}
