import connectDB from "@/config/db";
import User from "@/models/userModel";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic"; // this will force the route to be dynamic so when pushing to vercel you will not get an error

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();
    const userSession = await getSessionUser();

    if (!userSession || !userSession.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { userId } = userSession;
    // find the user from the database

    const user = await User.findOne({ _id: userId });

    // check if property is bookmarked or not
    let isBookmarked = user.bookmarks.includes(propertyId);
      return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
