import { Request, Response } from "express";
import { uploadToCloudinary } from "../utilities/cloudinary";
import { transformImageWithPrompt } from "../utilities/transformImageWithPrompt";


interface AuthenticatedRequest extends Request {
  userId: string;
}

export const handleUploadImages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const prompt = req.body.prompt as string;

    if (!files || files.length < 3 || files.length > 6) {
      return res.status(400).json({ error: "Please upload between 3 and 6 images" });
    }

    // Step 1: Upload and remove background
    const uploadedImages = await Promise.all(
      files.map((file, index) =>
        uploadToCloudinary(file.buffer, `${req.userId}-${Date.now()}-${index}`)
      )
    );

    const bgRemovedUrls = uploadedImages.map(img => img.secure_url);

    // Step 2: Apply style transformation via free model (e.g., Hugging Face or Replicate)
    const styledImageUrls = await Promise.all(
      bgRemovedUrls.map(url => transformImageWithPrompt(url, prompt))
    );

    res.status(200).json({ imageUrls: styledImageUrls });
  } catch (error) {
    res.status(500).json({ error: "Image transformation failed", details: error });
  }
};




