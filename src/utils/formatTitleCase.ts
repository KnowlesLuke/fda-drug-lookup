/**
 * Formats the string to be title case
 * @param str String to format
 * @returns Formatted string
 */
function formatTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(/([-\s])/g) // Split by spaces or hyphens, keeping delimiters
    .map(word => word.match(/[-\s]/) ? word : word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize only words
    .join(""); // Join everything back
}

export default formatTitleCase;
// This function will convert strings to camel case format, e.g. "hello World" to "Hello World".