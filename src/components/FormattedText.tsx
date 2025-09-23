"use client";

import { formatAndSanitizeText } from "@/utils/textFormatter";

interface FormattedTextProps {
  text: string;
  className?: string;
}

/**
 * Component that renders text with markdown-style formatting
 * Supports *text* for italic and **text** for bold
 */
export default function FormattedText({ text, className = "" }: FormattedTextProps) {
  if (!text) return null;

  const formattedHtml = formatAndSanitizeText(text);

  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  );
}
