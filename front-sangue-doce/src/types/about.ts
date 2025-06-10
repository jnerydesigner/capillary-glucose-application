export interface AboutType {
  data: AboutDetails;
  meta: Meta;
}

export interface AboutDetails {
  id: number;
  documentId: string;
  about: string;
  content: string;
  content_md: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  author: Author;
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  email: string;
  social_media: SocialMedia;
  especialty: string;
  specialty_title: string;
  avatar_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SocialMedia {
  social: Social[];
}

export interface Social {
  url: string;
  name: string;
  slug: string;
}

export interface Meta {
  name: string;
}
