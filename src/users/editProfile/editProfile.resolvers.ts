import bcrypt from 'bcrypt';
import client from '../../client';
import { protectResolver } from '../users.utils';

export default {
  Mutation: {
    editProfile: protectResolver( async (_,{
      firstName,
      lastName,
      username,
      email,
      password: updatedPassword,
      bio
    },
    { loggedInUser } // token comes from request (context)
    ) => {
      // protectResolver(loggedInUser)
      // 이때 전달받은 password 는 unhashed password
      // hash password
      let hashedPassword = null;
      if(updatedPassword) {
        hashedPassword = await bcrypt.hash(updatedPassword, 10);
      }
      const updatedUser = await client.user.update({ 
        where: {  
          id: loggedInUser.id
        }, 
        data: { 
          firstName, 
          lastName, 
          username, 
          email, 
          ...(hashedPassword && { password: hashedPassword }) 
        } 
      });
      if(updatedUser.id) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: 'Could not update profile'
        }
      }
    }
  )},
}