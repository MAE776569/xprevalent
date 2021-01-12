export interface FillableObject {
  [key: string]: any;
}

// eslint-disable-next-line no-unused-vars
export type Constructor<T> = new (...args: any[]) => T;

export interface SortObject {
  [key: string]: 1 | -1;
}
