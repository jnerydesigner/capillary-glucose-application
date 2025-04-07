import { ApiAxios } from "./api-config";

export const fetchCapillary = async ({
  dateInitial,
  dateFinal,
}: {
  dateInitial: string;
  dateFinal: string;
}) => {
  console.log(dateInitial, dateFinal);
  const response = await fetch(
    `http://localhost:3444/capillary/1/capillary?dateInitial=${encodeURIComponent(
      dateInitial
    )}&dateFinal=${encodeURIComponent(dateFinal)}`
  );
  if (!response.ok) {
    throw new Error("Erro ao buscar as marcações");
  }
  return response.json();
};

export const fetchCreateGlucose = async (value: number) => {
  const create: InputGlucose = {
    dateTime: new Date("2025-04-06T06:47:03.009Z").toISOString(),
    userId: 1,
    period: "06:00",
    value,
  };

  console.log(create);
  try {
    await ApiAxios.post<OutputGlucose>("/capillary", create);
  } catch (er) {
    console.log(er);
  }
};

export type InputGlucose = {
  dateTime: string;
  value: number;
  userId: number;
  period: string;
};

export type OutputGlucose = {
  id: number;
  value: number;
  date_time_collect: string;
  period: string;
  user_id: number;
};
