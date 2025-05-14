export interface INewsCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  children: INewsCategory[];
  __v: number;
}
