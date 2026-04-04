import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/sign-out|api|_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(req: NextRequest) {
  return NextResponse.next();
}
