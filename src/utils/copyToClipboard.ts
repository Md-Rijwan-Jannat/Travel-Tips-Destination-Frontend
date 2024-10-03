// utils/copyToClipboard.js

import { toast } from "sonner";

export const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Link copied to clipboard!");
    })
    .catch(() => {
      toast.error("Failed to copy link");
    });
};
