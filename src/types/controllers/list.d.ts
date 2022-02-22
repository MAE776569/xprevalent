export interface PaginationSettings {
  pageParam?: string;
  limitParam?: string;
  defaultLimit?: number;
}
export interface PaginationObject {
  page: number;
  limit: number;
}
export interface PaginationMeta {
  count: number;
  totalPages: number;
  page: number;
  limit: number;
  nextPage: number | null;
  previousPage: number | null;
}
