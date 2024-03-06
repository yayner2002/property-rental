import connectDB from "@/config/db";
import User from "@/models/userModel";
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
      await connectDB();
      // Check if user exists in database
      const userExists = await User.findOne({ email: profile.email });
      // If user does not exist, then add the user to the database
      if (!userExists) {
        const username = profile.name.slice(0, 11);
        const userToSave = {
          email: profile.email,
          username: username,
          image: profile.image,
        };

        await User.create(userToSave);
      }
      // if user exists, then return true to allow sign in
      return true;
    },

    // second function to be called is session which will assign the user id to the session object

    async session({ session }) {
      // get user from database
      const user = await User.findOne({ email: session.user.email });
      // assign the user id to the session object
      session.user.id = user._id.toString();
      // return the session object with the user id assigned to it
      return session;
    },
  },
};
