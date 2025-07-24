import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      department: string
      role: string
    }
  }

  interface User {
    department: string
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    department: string
    role: string
  }
}
