import type {NextAuthOptions} from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

export const options: NextAuthOptions = { 
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "type username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "password"
                }
            },
            async authorize(credentials) {
                
                const user = { id: "1", name: "user@example.com", password: "1Password" }

                //validation for username and password dont forget to display error
                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
}