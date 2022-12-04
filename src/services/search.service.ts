import { isSearchResult } from '../models/searchResult.model';
import { isSearchError } from '../models/searchError.model';

class SearchService {
  public outputSearch(result: any): { output: string; isLastMessage: boolean } {
    if (isSearchResult(result)) {
      // Print the search result in the specified format
      return {
        output: `(${result.page}/${result.resultCount}) ${result.name} - [${result.films}]`,
        isLastMessage: result.page === result.resultCount,
      };
    }
    if (isSearchError(result)) {
      if (typeof result.error === 'string') {
        return {
          output: `Error: ${result.error}`,
          isLastMessage: true,
        };
      }
      return { output: `Error: ${result.error.message}`, isLastMessage: true };
    }
    return { output: `Error: Unknown error`, isLastMessage: true };
  }
}

export default SearchService;
