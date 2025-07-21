
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, {DefaultSession} from "next-auth";

declare module 'next-auth'{
  interface Session {
    user : {
      id: string;
      name: string;
      email: string;
      emailVerifed? : boolean;
      role: 'ADMIN' | 'USER';
      image?: string | null;
    } & DefaultSession["user"];
  }
}