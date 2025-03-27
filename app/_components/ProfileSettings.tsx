"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileSettingsProps {
  contactName: string;
  setContactName: (name: string) => void;
  contactImage: string;
  setContactImage: (image: string) => void;
  contactPersonality: string;
  setContactPersonality: (personality: string) => void;
  isOnline: boolean;
  setIsOnline: (isOnline: boolean) => void;
}

export default function ProfileSettings({
  contactName,
  setContactName,
  contactImage,
  setContactImage,
  contactPersonality,
  setContactPersonality,
  isOnline,
  setIsOnline,
}: ProfileSettingsProps) {
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setContactImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      setContactImage(imageUrl);
      setImageUrl("");
    }
  };

  return (
    <div className="space-y-4 p-1">
      <h3 className="font-medium text-lg">Contact Settings</h3>

      <div className="space-y-2">
        <Label htmlFor="contact-name">Contact Name</Label>
        <Input
          id="contact-name"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          placeholder="Enter contact name"
        />
      </div>

      <div className="space-y-2">
        <Label>Profile Picture</Label>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={contactImage} alt={contactName} />
            <AvatarFallback>{contactName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            <div className="flex gap-2">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Or enter image URL"
                className="flex-1"
              />
              <Button onClick={handleImageUrlSubmit} type="button" size="sm">
                Set
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="personality">Personality</Label>
        <Textarea
          id="personality"
          value={contactPersonality}
          onChange={(e) => setContactPersonality(e.target.value)}
          placeholder="Describe the personality"
          className="min-h-[80px]"
        />
        <p className="text-xs text-gray-500">
          Describe how this contact should respond (e.g., &quot;friendly and
          casual&quot;, &quot;professional&quot;, &quot;sarcastic&quot;)
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="online-status">Online Status</Label>
        <Switch
          id="online-status"
          checked={isOnline}
          onCheckedChange={setIsOnline}
        />
      </div>
    </div>
  );
}
