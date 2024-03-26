import connectDB from "@/config/db";
import User from "@/models/userModel";
import Property from "@/models/propertyModel";
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

    // lets check if the logged in user is bookmarking their own property

    const property = await Property.findOne({ _id: propertyId });

    if (property.owner.toString() === userId) {
      return new Response("You cannot bookmark your own property", {
        status: 400,
      });
    }
    // check if property is bookmarked or not
    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;

    // if the property is already bookmarked, remove it
    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = "Property removed from bookmarks.";
      isBookmarked = false;
    }

    // if the property is not bookmarked, add it
    else {
      user.bookmarks.push(propertyId);
      message = "Property bookmarked.";
      isBookmarked = true;
    }

    await user.save();
    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// get: /api/bookmarks

export const GET = async () => {
  try {
    await connectDB();
    const userSession = await getSessionUser();

    if (!userSession || !userSession.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { userId } = userSession;

    // Find user in database

    const user = await User.findOne({ _id: userId });

    // Get user bookmarks
    const userBookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(userBookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong.");
  }
};
