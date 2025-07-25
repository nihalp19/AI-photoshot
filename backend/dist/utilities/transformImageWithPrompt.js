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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformImageWithPrompt = void 0;
const axios_1 = __importDefault(require("axios"));
const transformImageWithPrompt = (imageUrl, prompt) => __awaiter(void 0, void 0, void 0, function* () {
    const replicateApiToken = process.env.REPLICATE_API_TOKEN;
    const response = yield axios_1.default.post("https://api.replicate.com/v1/predictions", {
        version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4", // replace with actual version ID
        input: {
            image: imageUrl, // direct URL from Cloudinary
            prompt: prompt,
            strength: 0.7,
            guidance_scale: 7.5,
            num_outputs: 1
        }
    }, {
        headers: {
            Authorization: `Token ${replicateApiToken}`,
            "Content-Type": "application/json"
        }
    });
    const prediction = response.data;
    // Wait for prediction to complete
    let status = prediction.status;
    let output = null;
    while (status !== "succeeded" && status !== "failed") {
        const pollResponse = yield axios_1.default.get(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
            headers: {
                Authorization: `Token ${replicateApiToken}`
            }
        });
        status = pollResponse.data.status;
        output = pollResponse.data.output;
        // Wait before polling again
        yield new Promise(resolve => setTimeout(resolve, 2000));
    }
    if (status === "succeeded") {
        return output[0]; // styled image URL
    }
    else {
        throw new Error("Replicate transformation failed");
    }
});
exports.transformImageWithPrompt = transformImageWithPrompt;
