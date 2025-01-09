# seminal-auth0-next-auth

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000?seminaltype=seminalid&test=seminaltestparam](http://localhost:3000?seminaltype=seminalid&test=seminaltestparam) with your browser to see the result.

## How to 
Clicking on login button redirects to the auth0 universal page. Scroll down to the page to see the custom parameters printed in the bottom of the page with the wheatish background.

## Issue 
Passing the custom params from the search param in "src\app\page.tsx" which is not working.

Passing from the src\auth.config.ts works. i want to pass the dynamic params.