import { jwtDecode } from 'jwt-decode';
import type { NextAuthConfig } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';



export const authConfig = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
      token: {
        params: {
          audience: encodeURI(process.env.AUTH0_AUDIENCE as string),
        },
      },
      authorization: {
        params: {
          audience: encodeURI(process.env.AUTH0_AUDIENCE as string),
          scope: process.env.AUTH0_SCOPE,
          prompt: 'login',
          // "ext-seminaltype": "defaultSeminalType",
          // "ext-test": "defaultTest",
        },
      },
    }),
  ],

  pages: {
    // DON'T CHANGE /auth/login, it affects aws gateway healthchecks. Otherwise update here and aws gateway health check url
    signIn: '/auth/login',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token, user }) {
      if (token?.accessToken) {
        // @ts-ignore
        const decoded: any = jwtDecode(token?.accessToken ?? '');
        // @ts-ignore
        session.user.appUserId =
          decoded?.['https://seminal.one/claims/user_guid'];
        // @ts-ignore
        session.user.auth0Id = decoded?.sub; // example: auth0|65c07d04b47d668be741f37b
        // @ts-ignore
        session.user.userMetaData =
          decoded?.['https://seminal.one/user_metadata'];
      }
      // @ts-ignore
      session.user.accessToken = token?.accessToken;
      return session;
    },

    async authorized({ auth, request: { nextUrl, cookies } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAuthPage = nextUrl.pathname.startsWith('/');
      const redirectUrl = `${process.env.AUTH_URL}/signin?callbackUrl=${encodeURIComponent(nextUrl.toString())}`;
      if (isOnAuthPage) {
        if (isLoggedIn) return true;
        return Response.redirect(redirectUrl);
      } else if (isLoggedIn) {
        Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },

 
} satisfies NextAuthConfig;
