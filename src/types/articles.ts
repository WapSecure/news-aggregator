export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  source: { name: string };
  publishedAt?: string;
}
