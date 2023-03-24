## Overview

Demolytics is an example web application to demonstrate how to integrate with HubSpot.


## Built with

### NextAuth.js

NextAuth.js is an easy to implement, full-stack (client/server) open source authentication library originally designed for [Next.js](https://nextjs.org) and [Serverless](https://vercel.com). Our goal is to [support even more frameworks](https://github.com/nextauthjs/next-auth/issues/2294) in the future.

Go to [next-auth.js.org](https://next-auth.js.org) for more information and documentation.

### Vercel

### Next.js

### Bulma

### React

## Getting Started

### 1. Clone the repository and install dependencies

```
git clone https://github.com/elliott30/demolytics-app.git
cd demolytics-app
npm install
```

### 2. Configure your local environment

Create a .env.local file in this directory (which will be ignored by Git).

Add details for one or more providers (e.g. HubSpot), NextAuth URL (where your app is hosted), NextAuth Secret.

### 4. Start the application

To run your site locally, use:

```
npm run dev
```

To run it in production mode, use:

```
npm run build
npm run start
```

Note: Not all functions may run locally. For example logging in.

### 5. Preparing for Production

Follow the [Deployment documentation](https://next-auth.js.org/deployment)
# portal-app
