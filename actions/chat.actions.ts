"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import type { Message } from "@/types/types";
import { logTokenUsage } from "@/lib/utils";

export async function generateChatResponse(
  message: string,
  messages: Message[],
  contactName: string,
  contactPersonality: string
) {
  try {
    // create a system prompt that instructs the ai to respond like a friend
    const systemPrompt = `
      You are ${contactName || "Hazel"}, a friend of the user. 
      Personality: ${
        contactPersonality || "friendly, casual, and sometimes witty"
      }
      
      Important guidelines:
      - Respond as if you're texting a friend in a casual conversation
      - Keep responses relatively short like in text messages (1-3 sentences usually)
      - Use casual language
      - Use occasional abbreviations (e.g. "haha", "lol", "idk") where appropriate
      - Use occasional emoticons (e.g. ":)", ":O", ":P", "<3") where appropriate
      - Never identify yourself as an AI or assistant
      - Never use formal language or signatures
      - Never use emojis, other than red hearts (but also, do not overuse hearts), if the user does not use emojis
      - Casually use alternative emojis to the ones the user makes use of, if the user does use emojis
      - Match the user's vibe, tone and energy level
      - Occasionally ask follow-up questions to keep the conversation going
      - If the user mentions plans or activities, show interest
      - Type in lowercase casually
      - Type in uppercase when very excited
      - Do not assume or claim that anything has been said repetitively, without checking the conversation history for confirmation
      
      - IMPORTANT: Maintain context from the conversation history
      - IMPORTANT: Your response should be contextually relevant to the entire conversation
    `;

    // format conversation history for the prompt
    const conversationHistory = messages
      // use last 20 messages for context (adjust as needed)
      .slice(-20)
      .map(
        (msg) => `${msg.role === "user" ? "User" : contactName}: ${msg.content}`
      )
      .join("\n");

    // create the prompt for the ai with conversation history
    const prompt = `${systemPrompt}

CONVERSATION HISTORY:
${conversationHistory}

User: ${message}

${contactName}:`;

    // use the ai sdk to generate a response
    const response = await generateText({
      model: google("gemini-2.0-flash-001"),
      // google("gemini-pro"),
      prompt,
      temperature: 0.7,
    });

    logTokenUsage(response.usage, "Response Generated");

    return response.text;
  } catch (error) {
    console.error("Error generating chat response:", error);
    return "Sorry, I can't respond right now. Network issues 😕";
  }
}
