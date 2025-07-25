import axios from "axios";

export const transformImageWithPrompt = async (imageUrl: string, prompt: string) => {
  const replicateApiToken = process.env.REPLICATE_API_TOKEN;

  const response = await axios.post(
    "https://api.replicate.com/v1/predictions",
    {
      version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4", // replace with actual version ID
      input: {
        image: imageUrl, // direct URL from Cloudinary
        prompt: prompt,
        strength: 0.7,
        guidance_scale: 7.5,
        num_outputs: 1
      }
    },
    {
      headers: {
        Authorization: `Token ${replicateApiToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  const prediction = response.data;

  // Wait for prediction to complete
  let status = prediction.status;
  let output = null;

  while (status !== "succeeded" && status !== "failed") {
    const pollResponse = await axios.get(
      `https://api.replicate.com/v1/predictions/${prediction.id}`,
      {
        headers: {
          Authorization: `Token ${replicateApiToken}`
        }
      }
    );

    status = pollResponse.data.status;
    output = pollResponse.data.output;

    // Wait before polling again
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  if (status === "succeeded") {
    return output[0]; // styled image URL
  } else {
    throw new Error("Replicate transformation failed");
  }
};
