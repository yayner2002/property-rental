import connectDB from "@/config/db";
import Property from "@/models/propertyModel.js";

// GET /api/properties

export const GET = async (request) => {
  try {
    await connectDB();
    const properties = await Property.find({});

    if (!properties) {
      return new Response("No properties found", { status: 404 });
    }

    console.log(`properties from server ${properties}`);

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
