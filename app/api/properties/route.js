import connectDB from "@/config/db";
import Property from "@/models/propertyModel.js";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/properties

export const GET = async (request) => {
  try {
    await connectDB();
    const properties = await Property.find({});

    if (!properties) {
      return new Response("No properties found", { status: 404 });
    }

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};

export const POST = async (request) => {
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

    const formData = await request.formData();
    // access all value from amenities and images
    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images"); // this is an array of image file objects
    // create a new property object from the form data

    const formPropertyData = {
      owner: userId,
      name: formData.get("propertyName"),
      type: formData.get("propertyType"),
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
      return new Response("Error in creating property", { status: 400 });
    }

    // the process is
    // 1. select the image from the form upload input
    // 2. turn it into array buffer and we get the data from that
    // 3. upload it to cloudinary
    // 4. cloundinary gives us back a response with the url
    // 5  we put the url in the images array and then into the database i.e it could be multiple urls

    // upload image(s) to cloudinary

    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();

      const imageArray = Array.from(new Uint8Array(imageBuffer));

      const imageDataBase64 = Buffer.from(imageArray).toString("base64");

      // make request upoad to cloudinary

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageDataBase64}`,
        {
          folder: "yayshiyach",
        }
      );

      imageUploadPromises.push(result.secure_url);

      // wait for all images to upload to cloudinary

      const uploadedImages = await Promise.all(imageUploadPromises);

      // add uploaded images to the property object
      formPropertyData.images = uploadedImages;
    }
    const savedProperty = await Property.create(formPropertyData);
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${savedProperty._id}`
    );

    // return new Response(JSON.stringify({ messge: "success" }), { status: 200 });
  } catch (error) {
    return new Response("Failed to add property.", { status: 500 });
  }
};
