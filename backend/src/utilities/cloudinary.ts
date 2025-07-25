import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export const uploadToCloudinary = async (fileBuffer: Buffer, publicId: string) => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        public_id: publicId,
        folder: "your_folder",
        transformation: [
          { effect: "background_removal" } 
        ]
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result!);
      }
    );
    console.log("hi")

    uploadStream.end(fileBuffer);
  });
};
