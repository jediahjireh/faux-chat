"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Settings, Send, Phone, Mic, Paperclip, ImageIcon } from "lucide-react";

import { generateChatResponse } from "./actions/chat.actions";
import ProfileSettings from "./_components/ProfileSettings";
import ChatMessage from "./_components/ChatMessage";

// initial messages to make the chat look populated
const initialMessages = [
  {
    id: "1",
    role: "assistant",
    content: "hey!",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    role: "user",
    content: "hi! just finished that project I was telling you about",
    timestamp: "10:31 AM",
  },
  {
    id: "3",
    role: "assistant",
    content: "YAY",
    timestamp: "10:32 AM",
  },
  {
    id: "4",
    role: "user",
    content: "so relieved!",
    timestamp: "10:33 AM",
  },
  {
    id: "5",
    role: "assistant",
    content: "that's good to hear! let's ",
    timestamp: "10:34 AM",
  },
];

export default function ChatPage() {
  const [contactName, setContactName] = useState("Alex");
  const [contactImage, setContactImage] = useState("");
  const [contactPersonality, setContactPersonality] = useState(
    "friendly, casual, and sometimes witty"
  );
  const [isOnline, setIsOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // show typing indicator
    setIsTyping(true);

    try {
      // generate ai response
      const aiResponse = await generateChatResponse(
        input,
        contactName,
        contactPersonality
      );

      // calculate typing time based on response length (min 1s, max 4s)
      const typingTime = Math.min(Math.max(aiResponse.length * 30, 1000), 4000);

      // simulate typing delay
      setTimeout(() => {
        setIsTyping(false);

        // add ai response
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: aiResponse,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      }, typingTime);
    } catch (error) {
      console.error("Error:", error);
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b p-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={contactImage} alt={contactName} />
            <AvatarFallback>{contactName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold">{contactName}</h1>
            <p
              className={`text-xs ${
                isOnline ? "text-green-500" : "text-gray-500"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Phone className="h-5 w-5" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <ProfileSettings
                contactName={contactName}
                setContactName={setContactName}
                contactImage={contactImage}
                setContactImage={setContactImage}
                contactPersonality={contactPersonality}
                setContactPersonality={setContactPersonality}
                isOnline={isOnline}
                setIsOnline={setIsOnline}
              />
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {/* chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.content}
            isUser={message.role === "user"}
            timestamp={message.timestamp}
          />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="flex gap-1">
              <span className="animate-bounce delay-0 h-2 w-2 bg-gray-400 rounded-full"></span>
              <span className="animate-bounce delay-150 h-2 w-2 bg-gray-400 rounded-full"></span>
              <span className="animate-bounce delay-300 h-2 w-2 bg-gray-400 rounded-full"></span>
            </div>
            <span>{contactName} is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* input area */}
      <div className="bg-white border-t p-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Message"
            className="flex-1 rounded-full bg-gray-100 border-0"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="rounded-full text-blue-500"
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
