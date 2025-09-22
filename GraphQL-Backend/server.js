// server.js
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import bodyParser from 'body-parser';
import gql from 'graphql-tag';

// Mock Data
const USERS = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "John Doe", email: "john@example.com" },
  { id: 4, name: "Jane Smith", email: "jane@example.com" },
  { id: 5, name: "John Doe", email: "john@example.com" },
  { id: 6, name: "Jane Smith", email: "jane@example.com" }
];

const POSTS = [
  {
    id: 1,
    title: "Learning GraphQL",
    content: "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.",
    authorId: 1,
    published: "2025-08-25"
  },
  {
    id: 2,
    title: "Learning JavaScript",
    content: "Today we are learning JS",
    authorId: 3,
    published: "2025-08-22"
  }
];

// Schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    published: String!
  }

  type Query {
    users: [User!]!
    getUser(id: ID!): User  
    posts: [Post!]!
    getPost(id: ID!): Post
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users: () => USERS,
    getUser: (_, { id }) => USERS.find(user => user.id === parseInt(id)),
    posts: () => POSTS,
    getPost: (_, { id }) => POSTS.find(post => post.id === parseInt(id)),
  },
  Mutation: {
    createUser: (_, { input }) => {
      const newUser = { id: USERS.length + 1, ...input };
      USERS.push(newUser);
      return newUser;
    },
    createPost: (_, { input }) => {
      const newPost = { id: POSTS.length + 1, ...input };
      POSTS.push(newPost);
      return newPost;
    }
  },
  User: {
    posts: (parent) => POSTS.filter(post => post.authorId === parent.id)
  },
  Post: {
    author: (parent) => USERS.find(user => user.id === parent.authorId)
  }
};

// Apollo Server Setup
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();

  app.use(
    '/graphql',
    bodyParser.json(),
    expressMiddleware(server)
  );

  app.listen(4000, () => {
    console.log('Server ready at http://localhost:4000/graphql');
  });
}

startServer();
