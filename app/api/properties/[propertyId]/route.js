import connectDB from "@/config/db";
import Property from "@/models/propertyModel.js";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/properties/[propertyId]

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.propertyId);

    if (!property) return new Response("Property Not Found", { status: 404 });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.propertyId;

    const sessionUser = await getSessionUser();

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property) return new Response("Property Not Found", { status: 404 });

    // Verify ownership
    if (property.owner.toString() !== userId) {
      return new Response("You Are Unauthorized.", { status: 401 });
    }

    await property.deleteOne();

    return new Response("Property Deleted", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};

// PUT /api/properties/:id

export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        "User ID is Required or Error in Getting user session",
        { status: 401 }
      );
    }

    const { userId } = sessionUser;

    // Get property id from params

    const { propertyId } = params;

    const formData = await request.formData();
    // access all value from amenities and images
    const amenities = formData.getAll("amenities");

    // Get property from database with property id

    const existingProperty = await Property.findById(propertyId);

    if (!existingProperty) {
      return new Response("Property Does not exist", { status: 404 });
    }
    // check if the logged in user is the owner of the property

    if (existingProperty.owner.toString() !== userId) {
      return new Response("Access Denied.", {
        status: 401,
      });
    }
    // create property data object
    const formPropertyData = {
      owner: userId,
      name: formData.get("name"),
      type: formData.get("type"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      squareFeet: formData.get("squareFeet"),
      amenities,
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      // images,
    };

    if (!formPropertyData) {
      return new Response("Error in updating property", { status: 400 });
    }
    // update property in database
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      formPropertyData
    );

    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (error) {
    return new Response("Failed to add property.", { status: 500 });
  }
};
