import { Resolvers } from '../../types';
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    seeProfile: protectResolver((_,{username},{client}) => 
      client.user.findUnique({
        where: {
          username
        }
      }
    ))
  },
}

export default resolvers;
