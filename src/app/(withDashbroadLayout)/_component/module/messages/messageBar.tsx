"use client";

import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { PaperclipIcon, SendIcon, SmileIcon } from "lucide-react";
import dynamic from "next/dynamic";
import type { EmojiClickData } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { Theme as EmojiPickerTheme } from "emoji-picker-react";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface MessageBarProps {
  onSendMessage: (event: KeyboardEvent<HTMLInputElement>) => void;
  onTyping: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function MessageBar({
  onSendMessage,
  onTyping,
}: MessageBarProps) {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
  const { theme } = useTheme();

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputMessage((prev) => prev + emojiData.emoji);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    onTyping(e); // Pass typing event to ChatContainer
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSendMessage(e);
      setInputMessage("");
    }
  };

  return (
    <div className="p-4 bg-background border-t">
      <div className="flex items-center gap-2">
        <Button size="sm" isIconOnly radius="full" aria-label="Attach document">
          <PaperclipIcon className="h-5 w-5" />
        </Button>
        <Popover
          isOpen={isEmojiPickerOpen}
          onOpenChange={setIsEmojiPickerOpen}
          placement="right"
        >
          <PopoverTrigger>
            <Button
              size="sm"
              isIconOnly
              radius="full"
              aria-label="Select emoji"
            >
              <SmileIcon className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <EmojiPicker
              theme={(theme === "dark" ? "dark" : "light") as EmojiPickerTheme}
              onEmojiClick={handleEmojiClick}
            />
          </PopoverContent>
        </Popover>
        <Input
          className="flex-grow"
          placeholder="Type a message..."
          size="md"
          radius="full"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <Button size="sm" radius="full" aria-label="Send message">
          <SendIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
