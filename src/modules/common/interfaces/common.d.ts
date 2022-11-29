export interface IImage {
  default: string;
  medium: string;
  small: string;
  base64: string;
  description: string;
  alt: string;
}

export interface IPagination {
  page: number;
  size: number;
}
