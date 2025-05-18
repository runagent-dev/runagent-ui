import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withClerkMiddleware((req: NextRequest) => {
  if (req.nextUrl.pathname === '/') {
    return NextResponse.next();
  }
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 