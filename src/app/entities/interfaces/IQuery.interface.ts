export interface IQuery {
  path: string;
  doc?: string;
  limit?: number;
  sort?: ISort;
  compare?: ICompare;
  payload?: any;
}

interface ICompare {
  field: string;
  operator: any; // ts error, it should be a string
  value: number | string;
}

interface ISort {
  field: string;
  direction: any; // ts error, it should be a string
}
