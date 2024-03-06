import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        // this allows users to select their account when signing in with Google instead of being automatically signed in with the account that's currently signed in
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    // the first function to be called on successfull sign in with Google provider (or any other provider)
    async signIn({ profile }) {
      // Connect to database
      // Check if user exists in database
      // If user does not exist, then add the user to the database
      // if user exists, then return true to allow sign in
    },

    // second function to be called is session object is created after sign in with Google provider (or any other provider)

    async session({ session }){
      // get user from database
      // assign the user id to the session object
      // return the session object
    }
  },
};
