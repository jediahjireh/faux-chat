"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function generateChatResponse(
  message: string,
  contactName: string,
  contactPersonality: string
) {
  try {
    // create a system prompt that instructs the ai to respond like a friend
    const systemPrompt = `
      You are ${contactName || "Alex"}, a friend of the user. 
      Personality: ${
        contactPersonality || "friendly, casual, and sometimes witty"
      }
      
      Important guidelines:
      - Respond as if you're texting a friend in a casual conversation
      - Keep responses relatively short like in text messages (1-3 sentences usually)
      - Use casual language, occasional abbreviations, and emojis where appropriate
      - Never identify yourself as an AI or assistant
      - Never use formal language or signatures
      - Match the user's tone and energy level
      - Occasionally ask follow-up questions to keep the conversation going
      - If the user mentions plans or activities, show interest
      - Respond to the user's most recent message only
      - Do not use emojis, other than red hearts
      - Type in lowercase
    `;

    // create the prompt for the ai
    const prompt = `${systemPrompt}\n\nUser: ${message}\n\n${
      contactName || "Alex"
    }:`;

    // use the ai sdk to generate a response
    const response = await generateText({
      // google("gemini-pro"),
      model: google("gemini-2.0-flash-001"),
      prompt,
      temperature: 0.7,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating chat response:", error);
    return "Sorry, I can't respond right now. Network issues 😕";
  }
}
