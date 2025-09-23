/**
 * Utility functions for text formatting
 */

/**
 * Converts markdown-style italic formatting (*text*) to HTML
 * @param text - The text to format
 * @returns HTML string with italic formatting
 */
export function formatItalicText(text: string): string {
  if (!text) return '';
  
  // Replace *text* with <em>text</em>
  return text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

/**
 * Converts markdown-style bold formatting (**text**) to HTML
 * @param text - The text to format
 * @returns HTML string with bold formatting
 */
export function formatBoldText(text: string): string {
  if (!text) return '';
  
  // Replace **text** with <strong>text</strong>
  return text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

/**
 * Converts markdown-style formatting to HTML
 * Supports both italic (*text*) and bold (**text**)
 * @param text - The text to format
 * @returns HTML string with formatting
 */
export function formatText(text: string): string {
  if (!text) return '';
  
  // First apply bold formatting, then italic
  return formatItalicText(formatBoldText(text));
}

/**
 * Sanitizes HTML to prevent XSS attacks
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  
  // Basic HTML sanitization - only allow safe tags
  const allowedTags = ['em', 'strong', 'i', 'b'];
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^<>]*>/g;
  
  return html.replace(tagRegex, (match, tagName) => {
    if (allowedTags.includes(tagName.toLowerCase())) {
      return match;
    }
    return '';
  });
}

/**
 * Formats text with markdown-style formatting and sanitizes the result
 * @param text - The text to format
 * @returns Safe HTML string with formatting
 */
export function formatAndSanitizeText(text: string): string {
  return sanitizeHtml(formatText(text));
}
