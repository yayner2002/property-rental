import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
// This file is similar to the db.js file in the config folder. It imports the cloudinary package and configures it with the environment variables. It then exports the cloudinary object. We can use this object to upload images to Cloudinary.
