import { PrismaClient, User } from "@prisma/client"; // DB에서 User타입을 받아온다

type Context = {
  loggedInUser: User;
  client: PrismaClient;
} // 로그인한 유저와 DB에 있는 유저 타입이 같은 지 확인한다.

export type Resolver = (root: any, arg: any, context: Context, info: any) => any;
export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver
  }
}

