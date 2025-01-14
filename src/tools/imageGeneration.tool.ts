import {z} from 'zod';
import type { ToolFn} from '../../types';
import fetch from 'node-fetch';
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const imageGeneratorDefinition = {
    name: 'image_generator',
    parameters: z.object({
        prompt: z.string().describe(`
            prompt for the image. Be sure to consider the user's original message to generate prompt. If you're not sure then ask the user for details.`)
    }),
    description: 'Generate an image',
}

type Args = z.infer<typeof imageGeneratorDefinition.parameters>;

export const imageGenerator: ToolFn<Args, string> = async ({ toolArgs }) => {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: toolArgs.prompt }),
      }
    );
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    // Get the array buffer directly
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  
    // Define the directory to save images
    // Get the directory name of the current module
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const imageDir = path.resolve(__dirname, "../../generated_images");
  
    // Ensure the directory exists
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }
  
    // Generate a unique file name
    const timestamp = Date.now();
    const fileName = `image_${timestamp}.png`;
    const filePath = path.join(imageDir, fileName);
  
    // Save the image buffer to the file
    fs.writeFileSync(filePath, buffer);
  
    // Return the relative file path (or adjust for public serving if necessary)
    return filePath;
  };
  

// async function query(data) {
// 	const response = await fetch(
// 		"https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
// 		{
// 			headers: {
// 				Authorization: "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
// 				"Content-Type": "application/json",
// 			},
// 			method: "POST",
// 			body: JSON.stringify(data),
// 		}
// 	);
// 	const result = await response.blob();
// 	return result;
// }
// query({"inputs": "Astronaut riding a horse"}).then((response) => {
// 	// Use image
// });