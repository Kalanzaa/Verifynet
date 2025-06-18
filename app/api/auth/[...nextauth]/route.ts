import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { verifyTOTP } from "@/lib/otp";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  providers: [
    Credentials({
      name: "Press Credentials",
      credentials: {
        pressId: { label: "Press ID", type: "text" },
        otp: { label: "Verification Code", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.pressId || !credentials?.otp) return null;

        const user = await prisma.user.findUnique({
          where: { pressId: credentials.pressId.toString() }
        });
        if (!user) return null;

        const isValid = verifyTOTP(credentials.otp.toString(), user.encryptedOTP);
        if (!isValid) return null;

        await prisma.user.update({
          where: { id: user.id },
          data: { lastVerification: new Date() }
        });

        return {
          id: user.id,
          pressId: user.pressId,
          name: user.name,
          role: user.verificationLevel
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.pressId = user.pressId;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.pressId = token.pressId;
      session.user.role = token.role;
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login/error"
  }
}); 