import nexiosInstance from 'nexios-http';
import nextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from 'next/headers';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ profile, account }: any) {
      try {
        if (!profile || !account) {
          return false;
        }

        if (account?.provider === 'google') {
          const response: any = await nexiosInstance.post('/auth/register', {
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          });

          if (
            response.data.data.accessToken ||
            response.data.data.refreshToken
          ) {
            cookies().set('accessToken', response.data.data.accessToken);
            cookies().set('refreshToken', response.data.data.refreshToken);

            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);

        return false;
      }
    },
  },

  pages: {
    signIn: '/register',
  },

  secret: process.env.NEXTAUTH_SECRET as string,
};

export default nextAuth(authOptions);
