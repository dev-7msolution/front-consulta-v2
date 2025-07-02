export { default } from "next-auth/middleware"

export const config = {
  
  matcher: ["/((?!api|login|planos|_next/static|_next/image|favicon.ico).*)"],
} 