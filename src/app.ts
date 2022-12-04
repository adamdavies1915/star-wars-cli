import * as readline from 'readline';
import { io } from 'socket.io-client';
import SearchService from './services/search.service';

class App {
  searchService = new SearchService();

  public main() {
    // Bootstap search prompt by asking user input on socket connection
    const socket = io('http://starwarsAPI:3000');

    socket.on('connect', () => {
      console.log('Successfully connected to the server!');

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question('Enter a search query: ', query => {
        socket.emit('search', { query });
        rl.close();
      });
    });

    // Listen for the 'search' event from the server
    socket.on('search', (results: any) => {
      const output = this.searchService.outputSearch(results);
      console.log(output.output);
      // If this is the last message in the stream, ask for user for a new search
      if (output.isLastMessage) {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter a search query: ', query => {
          socket.emit('search', { query });
          rl.close();
        });
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server.');
    });
    socket.on('error', () => {
      console.log('An error occurred.');
    });
  }
}

export default App;
