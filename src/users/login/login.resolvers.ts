import bcrypt from 'bcrypt';
import client from '../../client';
import jwt from 'jsonwebtoken';

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
    },
    login: async (_,{username, password}) => {
      // find user with args.username
      const user = await client.user.findFirst({ where: { username } });
      if(!user) {
        return {
          ok: false,
          error: 'User not found.'
        }
      };
      // check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: 'Incorrect password'
        }
      }
      // issue a token and send it to the user
      const token = await jwt.sign({ id: user.id }, process.env.PRIVATE_KEY);
      return {
        ok: true,
        token
      }
    }
  }
}