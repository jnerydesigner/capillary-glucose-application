"use client";

import { useState } from "react";
import { fetchCapillary } from "@/fetch/glucose";
import { AppointmentGlucose } from "@/components/appointment-glucose";
import { GlucoseChart } from "@/components/chart-medition";
import { DatePickerForm } from "@/components/date-picker-form";
import { ModalGenerateReport } from "@/components/modal-generate-report";
import { TableCapillary } from "@/components/table-capillary";

export type ValueWithClass = {
  value: number | null;
  className: string;
};

export type GlucoseRead = {
  data: string;
  "06:00": ValueWithClass;
  "08:00": ValueWithClass;
  "11:00": ValueWithClass;
  "13:00": ValueWithClass;
  "18:00": ValueWithClass;
  "22:00": ValueWithClass;
};

interface ReturnedDataGlucose {
  id: number;
  userId: number;
  dateTimeCollect: string;
  period: string;
  value: number;
}

const transformGlucoseData = (
  capillaryData: ReturnedDataGlucose[]
): GlucoseRead[] => {
  const groupedByDate = capillaryData.reduce<Record<string, GlucoseRead>>(
    (acc, reading) => {
      const date = new Date(reading.dateTimeCollect).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      );

      const period = reading.period as keyof Omit<GlucoseRead, "data">;
      const value = reading.value;

      if (!acc[date]) {
        acc[date] = {
          data: date,
          "06:00": { value: null, className: "" },
          "08:00": { value: null, className: "" },
          "11:00": { value: null, className: "" },
          "13:00": { value: null, className: "" },
          "18:00": { value: null, className: "" },
          "22:00": { value: null, className: "" },
        };
      }

      acc[date][period] = {
        value,
        className: value >= 180 ? "text-red-500 font-bold" : "text-blue-500",
      };
      return acc;
    },
    {}
  );

  return Object.values(groupedByDate);
};

interface Props {
  initialData: { capillaryBloodGlucose: ReturnedDataGlucose[] } | null;
}

export default function HomeDashBoard({ initialData }: Props) {
  const [data, setData] = useState<ReturnedDataGlucose[]>(
    initialData?.capillaryBloodGlucose || []
  );

  const handleFormSubmit = async (dataForm: {
    dateInitial: Date;
    dateFinal: Date;
  }) => {
    const dateInitial = new Date(dataForm.dateInitial);
    const dateFinal = new Date(dataForm.dateFinal);

    dateInitial.setUTCHours(0, 0, 0, 0);
    const dateInitialISO = dateInitial.toISOString();

    dateFinal.setUTCHours(23, 59, 59, 999);
    const dateFinalISO = dateFinal.toISOString();

    const response = await fetchCapillary({
      dateInitial: dateInitialISO,
      dateFinal: dateFinalISO,
    });
    setData(response.capillaryBloodGlucose);
  };

  const transformedData: GlucoseRead[] = data ? transformGlucoseData(data) : [];

  return (
    <>
      <div className="mb-4 flex justify-between items-center flex-row gap-2.5">
        <AppointmentGlucose />
        <ModalGenerateReport />
        <DatePickerForm onSubmit={handleFormSubmit} />
      </div>
      <div className="w-full mb-4 flex justify-center items-center flex-col gap-2.5">
        <GlucoseChart chartData={transformedData} />
        <TableCapillary dataTable={transformedData} />
      </div>
    </>
  );
}
