interface SearchResult {
  page: number;
  resultCount: number;
  name: string;
  films: string;
}

// Define a type guard for the SearchResult type
export function isSearchResult(value: any): value is SearchResult {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.page === 'number' &&
    typeof value.resultCount === 'number' &&
    typeof value.name === 'string' &&
    typeof value.films === 'string'
  );
}
