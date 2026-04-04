# Custom Authentication & Login Implementation

This document contains the implementation details for the custom, cookie-based authentication flow with a custom Next.js App Router login page. 

## 1. Login Page UI (`src/app/login/page.tsx`)
This is the client component that renders the dark-themed "HQ" login screen.

```tsx
"use client";

import { useState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      }
    } catch (err) {
      // redirect() throws an error in Next.js which should be caught or ignored
      // If it throws NEXT_REDIRECT, it will redirect successfully
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] flex flex-col gap-8">
        <div className="flex flex-col items-center text-center gap-2">
          <h1 className="text-white text-3xl font-semibold tracking-tight">HQ</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-[15px]">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@company.com"
              className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all text-[15px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-[15px]">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all text-[15px]"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00e572] hover:bg-[#00c964] text-black font-semibold tracking-wide rounded-lg py-3 mt-2 transition-colors disabled:opacity-50 text-[15px]"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

## 2. Server Action (`src/app/login/actions.ts`)
This server action verifies the password and sets an `httpOnly` secure auth cookie.

```ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const password = formData.get("password");
  
  // Replace this logic with actual database validation logic
  if (password === "testing123!") {
    const cookieStore = await cookies();
    cookieStore.set("auth-token", "testing123!", { 
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
  } else {
    return { error: "Invalid password" };
  }
  
  // Redirect to dashboard/home after successful login
  redirect("/");
}
```

## 3. Middleware Updates (`src/middleware.ts`)
Set up the `middleware.ts` to intercept protected routes and redirect users to the custom `/login` page if the `auth-token` cookie is absent or invalid.

```ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
  // Exclude auth routes, static assets, images, etc.
  matcher: ["/((?!api/sign-out|login|api|_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;

  // Validate the token
  if (token === "testing123!") {
    return NextResponse.next();
  }

  // Redirect to login if unauthenticated
  return NextResponse.redirect(new URL("/login", req.url));
}
```

## 4. Sign Out Endpoint (`src/app/api/sign-out/route.ts`)
To sign users out, delete the cookie and redirect them back to the login page.

```ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
  
  const url = new URL("/login", req.url);
  return NextResponse.redirect(url);
}
```

## 5. Global Layout Updates (`src/app/layout.tsx`)
If needed, use `next/headers` to hide global UI components (like navigation or sign-out buttons) when users are unauthenticated.

```ts
import { cookies } from "next/headers";
// ... (imports)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isSignedIn = cookieStore.get("auth-token")?.value === "testing123!";

  return (
    <html lang="en">
      <body>
        {isSignedIn && <Nav />}
        <main>
          {children}
        </main>
        {isSignedIn && <SignOutButton />}
      </body>
    </html>
  );
}
```
