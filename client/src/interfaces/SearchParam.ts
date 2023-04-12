interface ISearchParams {
  priceRange?: [number, number];
  category?: number;
  brand?: number;
  size?: number;
  search?: string;
  gender?: number;
  maxPrice?: number;
  minPrice?: number;
}

export default ISearchParams;
