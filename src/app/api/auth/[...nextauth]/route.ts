import NextAuth from "next-auth";
import { authOptions } from "../../lib/nextAuth";



// Para Next.js App Router, exporte os métodos HTTP
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };