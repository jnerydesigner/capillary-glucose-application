export const calculateReadingTime = (
  text: string,
  wordsPerMinute = 200
): string => {
  const wordCount = text.trim().split(/\s+/).length;
  const readingTimeInMinutes = Math.ceil(wordCount / wordsPerMinute);
  if (readingTimeInMinutes > 1) {
    return `${readingTimeInMinutes} minutos`;
  }

  return `${readingTimeInMinutes} min de leitura`;
};
