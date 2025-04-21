export const dateFormatBlogType = (dateIso: string) => {
  const date = new Date(dateIso);
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

  const formatCustom = formatted.replace(/ de /g, " ").replace(" ", ", ");

  return formatCustom;
};
