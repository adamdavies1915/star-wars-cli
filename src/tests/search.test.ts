import SearchService from '../services/search.service';
import { expect } from '@jest/globals';

describe('Testing SearchResult Processing', () => {
  describe('CLI', () => {
    it('should parse successful search result', async () => {
      const searchService = new SearchService();
      const socketData = {
        page: 1,
        resultCount: 1,
        name: 'Luke Skywalker',
        films: 'A New Hope, The Empire Strikes Back, Return of the Jedi, Revenge of the Sith',
      };
      const expected = {
        output: '(1/1) Luke Skywalker - [A New Hope, The Empire Strikes Back, Return of the Jedi, Revenge of the Sith]',
        isLastMessage: true,
      };
      const actual = searchService.outputSearch(socketData);
      expect(actual).toEqual(expected);
    });
    it('should have isLastMessage false when not at the last message', async () => {
      const searchService = new SearchService();
      const socketData = {
        page: 1,
        resultCount: 2,
        name: 'Luke Skywalker',
        films: 'A New Hope, The Empire Strikes Back, Return of the Jedi, Revenge of the Sith',
      };
      const expected = {
        output: '(1/2) Luke Skywalker - [A New Hope, The Empire Strikes Back, Return of the Jedi, Revenge of the Sith]',
        isLastMessage: false,
      };
      const actual = searchService.outputSearch(socketData);
      expect(actual).toEqual(expected);
    });
    it('should handle an error', async () => {
      const searchService = new SearchService();
      const socketData = {
        page: -1,
        resultCount: -1,
        error: 'Server Error: Unknown - Fatal',
      };
      const expected = {
        output: 'Error: Server Error: Unknown - Fatal',
        isLastMessage: true,
      };
      const actual = searchService.outputSearch(socketData);
      expect(actual).toEqual(expected);
    });
  });
});
