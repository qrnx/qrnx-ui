export type GetParams = {
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  fields?: string;
  populate?: string;
  filters?: unknown;
  locale?: string;
};

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  start: number;
  limit: number;
  total: number;
};

export type Response<T> = {
  data: T;
  meta?: {
    pagination: Pagination;
  };
};

export type Model<T> = T & {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  localizations: string[];
};

export type Array<T> = {
  id: number;
  value: T;
}[];

export type Media = {
  attributes: {
    alternativeText: string | null;
    caption: string | null;
    createdAt: string | null;
    ext: string | null;
    formats: string | null;
    hash: string | null;
    height: number | null;
    mime: string | null;
    name: string | null;
    previewUrl: string | null;
    provider: string | null;
    provider_metadata: string | null;
    size: number | null;
    updatedAt: string;
    url: string | null;
    width: number | null;
    blurhash: string | null;
  };
  id: number;
};
