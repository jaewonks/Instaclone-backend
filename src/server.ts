import * as dotenv from 'dotenv';
dotenv.config()
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import { getUser } from './users/users.utils';
import client from './client';

const PORT = process.env.PORT;
const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client, 
    }
  }
});

server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}/`));