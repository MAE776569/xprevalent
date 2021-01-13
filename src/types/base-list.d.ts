export interface PaginationSettings {
  pageParam: string;
  limitParam: string;
  defaultLimit: number;
}

export interface PaginationObject {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
  hasNext: boolean;
  nextPage: number | null;
  hasPrevious: boolean;
  previousPage: number | null;
}
