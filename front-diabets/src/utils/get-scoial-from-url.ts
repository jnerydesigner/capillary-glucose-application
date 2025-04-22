export const getSocialFromUrl = (url: string): string => {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("youtube")) return "youtube";
  if (lowerUrl.includes("instagram")) return "instagram";
  if (lowerUrl.includes("facebook")) return "facebook";
  if (lowerUrl.includes("twitter")) return "twitter";
  if (lowerUrl.includes("tiktok")) return "tiktok";
  return "default";
};
