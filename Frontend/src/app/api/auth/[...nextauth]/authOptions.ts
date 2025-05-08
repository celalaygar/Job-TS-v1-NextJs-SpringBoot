import { AuthOptions, User as NextAuthUser,DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { ProjectUser } from "@/data/project";

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken: string;
    }
}

interface User extends NextAuthUser {
    token: string;
    user: ProjectUser;
}


const URL = process.env.BASE_URL || "";



export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials:  {
                email: { label: "Email", type: "email", placeholder: "admin@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("Credentials are missing");
                }
                try {
                    const response = await axios.post(URL + "auth/login", {
                        email: credentials?.email,
                        password: credentials?.password
                    });

                    if (response.status === 200) {
                        const { token, user } = response.data;

                        // ✅ NextAuth'un beklediği tipte bir `User` nesnesi döndürülüyor
                        const nextAuthUser: User = {
                            id: user.id.toString(), // ❗ `id` zorunlu
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            token: token,
                            user: user as ProjectUser
                        };

                        return nextAuthUser;
                    }
                } catch (error) {
                    throw new Error("Invalid credentials " + error);
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user && 'token' in user) {
                token.accessToken = user.token;
                token.user = (user as User).user;
            }
            return token;
        },
        async session({ session , token }) {
            session.user = token.user as ProjectUser;
            session.accessToken = token.accessToken as string;
            return session;
        }
    },
    secret: process.env.SECRET_KEY,
    pages: {
        signIn: "/auth/login",
    }
};
