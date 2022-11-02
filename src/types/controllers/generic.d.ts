export interface FillableObject {
  [key: string]: any;
}
// eslint-disable-next-line no-unused-vars
export type Constructor<T> = new (...args: any[]) => T;
export interface SortObject {
  [key: string]: 1 | -1;
}

export interface SendResponseInput {
  type?: "json" | "generic";
  success?: boolean;
  status?: number;
  message?: string;
  error?: object | null;
  body?: any;
}
