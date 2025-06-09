export const fetchCapillary = async ({
  dateInitial,
  dateFinal,
}: {
  dateInitial: string;
  dateFinal: string;
}) => {
  const response = await fetch(
    `http://localhost:3444/capillary/1/capillary?dateInitial=${encodeURIComponent(dateInitial)}&dateFinal=${encodeURIComponent(dateFinal)}`
  );

  if (!response.ok) {
    throw new Error(`Error: Status -> ${response.status} Message -> ${response.statusText}`);
  }

  return response.json();
};
