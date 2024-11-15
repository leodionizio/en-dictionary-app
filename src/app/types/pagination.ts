export type Paginated<T> = {
  results: T[];
  totalDocs: number;
  previous: string;
  next: string;
  hasNext: boolean;
  hasPrev: boolean;
};
