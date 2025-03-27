import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Logs token usage information for AI operations with an optional prefix
 * @param usage - Token usage information containing prompt, completion, and total tokens
 * @param prefix - Optional prefix to identify different types of AI operations
 */
export const logTokenUsage = (usage: TokenUsage, prefix: string = ""): void => {
  const title = prefix ? `${prefix} Token Usage:` : "Token Usage:";
  console.log(title);
  console.table({
    "Input Tokens": usage.promptTokens,
    "Output Tokens": usage.completionTokens,
    "Total Tokens": usage.totalTokens,
  });
};
