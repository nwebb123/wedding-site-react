export function SanitizeText(firstName, lastName) {
  const sanitize = (str) => {
    return str
      .trim()
      .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
      .replace(/[^\p{L}\s'-]/gu, ""); // Allow only letters, spaces, hyphens, and apostrophes
  };

  return {
    firstName: sanitize(firstName),
    lastName: sanitize(lastName),
  };
}