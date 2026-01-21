import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Proflag Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                try {
                    const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/login?provider=email`,
                        {
                            email: credentials?.email,
                            password: credentials?.password,
                        }
                    );

                    const data = res.data.data;

                    if (!data?.token?.access_token) throw "No Token Provided";

                    return {
                        id: data.user.uuid,
                        email: data.user.email,
                        role: data.user.role,
                        isAdmin: ["admin", "super_admin"].includes(data.user.role),
                        accessToken: data.token.access_token,
                        refreshToken: data.token.refresh_token,
                        user: data.user,
                    };
                } catch (err) {
                    throw new Error("Invalid credentials");
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.user = user.user;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = token.user;
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.role = token.role;
            return session;
        },
    },

    pages: {
        signIn: "/auth/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
