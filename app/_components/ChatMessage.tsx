import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export default function ChatMessage({
  message,
  isUser,
  timestamp,
}: ChatMessageProps) {
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2",
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-white text-black rounded-bl-none"
        )}
      >
        <p className="break-words">{message}</p>
        <div
          className={cn(
            "text-xs mt-1",
            isUser ? "text-blue-100" : "text-gray-500"
          )}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
}
