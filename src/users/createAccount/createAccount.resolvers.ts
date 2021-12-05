import bcrypt from 'bcrypt';
import client from '../../client';

export default {
  Mutation: {
    createAccount: async (_,{ 
      firstName,   
      lastName,
      username,
      email,
      password
    }) => {
      try {
          // check if username or email are already on DB
        const exitstingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              }
            ]
          }
        });
        if (exitstingUser) {
          throw new Error('Username already taken');
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await client.user.create({ 
          data: {
            username,
            email,
            firstName,
            lastName,
            password: hashedPassword,
          } 
        });
        return user;
        // save and return the user
      } catch(err) {
        return err;
      }
    }
  }
}