import { GoogleGenAI, Type } from "@google/genai";
import { PlasticAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzePollutionImage(base64Image: string): Promise<PlasticAnalysis> {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            text: "Analyze this image for aquatic plastic and debris pollution. Identify specific categories of materials found, such as plastic bottles, cloth/textiles, plastic covers/wraps, fishing nets, or other debris. Count the visible items, and determine the pollution intensity (Low, Medium, or High). Return the result in JSON format.",
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(",")[1],
            },
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          types: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Types of plastic materials found (e.g., bottles, bags, nets)",
          },
          count: {
            type: Type.NUMBER,
            description: "Approximate number of plastic items visible",
          },
          intensity: {
            type: Type.STRING,
            enum: ["Low", "Medium", "High"],
            description: "Pollution intensity level",
          },
          description: {
            type: Type.STRING,
            description: "A brief summary of the findings",
          },
        },
        required: ["types", "count", "intensity", "description"],
      },
    },
  });

  const response = await model;
  return JSON.parse(response.text || "{}") as PlasticAnalysis;
}
