import connectDB from "@/config/db";
import Property from "@/models/propertyModel.js";

// GET: api/properties/search

export const GET = async (request) => {
  try {
    await connectDB();
    // get search query from request URL

    const params = new URL(request.url).searchParams;

    const keyword = params.get("keyword");
    const propertyType = params.get("propertyType");

    const keywordPattern = new RegExp(keyword, "i");

    let query = {
      $or: [
        {
          name: keywordPattern,
        },
        {
          description: keywordPattern,
        },
        {
          "location.state": keywordPattern,
        },
        {
          "location.street": keywordPattern,
        },
        {
          "location.zipcode": keywordPattern,
        },
        {
          "location.city": keywordPattern,
        },
      ],
    };

    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const searchedProperties = await Property.find(query);

    return new Response(JSON.stringify(searchedProperties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
