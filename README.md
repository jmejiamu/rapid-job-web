This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Waitlist (Resend)

This project includes a simple waitlist form on the landing page that POSTs to `/api/waitlist` and uses [Resend](https://resend.com) to send a confirmation email to the user and (optionally) a notification to your team.

Steps to enable:

1. Add environment variables to `.env.local` (copy from `.env.example`).

   - `RESEND_API_KEY` — your Resend API key.
   - `FROM_EMAIL` — sender email (must be a valid/verified sender).
   - `OWNER_EMAIL` — optional, will receive a notification for each signup.

2. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn
```

3. Run the app locally:

```bash
npm run dev
```

4. The waitlist form is on the home page — submit an email to test. Check your Resend dashboard or the `OWNER_EMAIL` inbox for notifications.

Notes:

- The server route is at `app/api/waitlist/route.ts` and validates email addresses before sending emails.
- For production, ensure `FROM_EMAIL` is properly configured and verified with Resend if required.
