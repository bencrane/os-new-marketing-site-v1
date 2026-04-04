import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("Signed out", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
