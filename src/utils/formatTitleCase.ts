/**
 * Formats the string to be title case
 * @param str String to format
 * @returns Formatted string
 */
function formatTitleCase(str: string): string {
  return str
    .split(/(?=[A-Z])|(?=[0-9])/g) // Split before uppercase letters or digits
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join with spaces
}

export default formatTitleCase;
// This function will convert strings to camel case format, e.g. "hello World" to "Hello World".