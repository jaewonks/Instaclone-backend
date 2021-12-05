import jwt from 'jsonwebtoken';
import client from '../client';
import { Resolver } from '../types';

export const getUser = async (token) => {
  try {
    if(!token) {
      return null
    }
    const verifedToken = await jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await client.user.findUnique({ where: { id:verifedToken['id'] } });
    if(user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

/* 
export const protectResolver = (user) => {
  if(!user) {
    return {
      ok: false,
      error: 'You need to login.'
    }
  }
} 
*/

export const protectResolver = (ourResolver: Resolver) => (
  root,
  args,
  context,
  info
) => {
  if(!context.loggedInUser) {
    return {
      ok: false,
      error: "Please log in to perform this action."
    }
  } 
  return ourResolver(root, args, context, info);
}