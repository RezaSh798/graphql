import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// DB
import DB from './_db.js';

// Types
import { typeDefs } from './schema.js';

// Resolvers
const resolvers = {
  Query: {
    games() {
      return DB.games;
    },
    game(_, args) {
      return DB.games.find(game => game.id === args.id);
    },
    authors() {
      return DB.authors;
    },
    author(_, args) {
      return DB.authors.find(author => author.id === args.id);
    },
    reviews() {
      return DB.reviews;
    },
    review(_, args) {
      return DB.reviews.find(review => review.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return DB.reviews.filter(review => review.game_id === parent.id);
    }
  },
  Author: {
    reviews(parent) {
      return DB.reviews.filter(review => review.author_id === parent.id);
    }
  },
  Review: {
    game(parent) {
      return DB.games.find(game => game.id === parent.game_id);
    },
    author(parent) {
      return DB.authors.find(author => author.id === parent.author_id);
    }
  }
};

// Start server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 }
});

console.log(`Server start at ${url}`);