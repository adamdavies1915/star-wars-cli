interface SearchError {
  page: number;
  resultCount: number;
  error:
    | {
        message: string;
        name: string;
        stack: string;
        config: any; // We don't use any of the config data, so we can just use any here
      }
    | string; //Spec says it can be a string, but I found it to be an object when the API was down
}

export function isSearchError(obj: any): obj is SearchError {
  return (
    typeof obj === 'object' &&
    typeof obj.page === 'number' &&
    typeof obj.resultCount === 'number' &&
    (typeof obj.error === 'string' ||
      (typeof obj.error === 'object' &&
        typeof obj.error.message === 'string' &&
        typeof obj.error.name === 'string' &&
        typeof obj.error.stack === 'string'))
  );
}
