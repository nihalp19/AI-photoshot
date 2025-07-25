"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUploadImages = void 0;
const cloudinary_1 = require("../utilities/cloudinary");
const transformImageWithPrompt_1 = require("../utilities/transformImageWithPrompt");
const handleUploadImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        const prompt = req.body.prompt;
        if (!files || files.length < 3 || files.length > 6) {
            return res.status(400).json({ error: "Please upload between 3 and 6 images" });
        }
        // Step 1: Upload and remove background
        const uploadedImages = yield Promise.all(files.map((file, index) => (0, cloudinary_1.uploadToCloudinary)(file.buffer, `${req.userId}-${Date.now()}-${index}`)));
        const bgRemovedUrls = uploadedImages.map(img => img.secure_url);
        // Step 2: Apply style transformation via free model (e.g., Hugging Face or Replicate)
        const styledImageUrls = yield Promise.all(bgRemovedUrls.map(url => (0, transformImageWithPrompt_1.transformImageWithPrompt)(url, prompt)));
        res.status(200).json({ imageUrls: styledImageUrls });
    }
    catch (error) {
        res.status(500).json({ error: "Image transformation failed", details: error });
    }
});
exports.handleUploadImages = handleUploadImages;
