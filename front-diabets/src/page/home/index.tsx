"use client";

import { fetchCapillary } from "@/api";
import { AppointmentGlucose } from "@/components/appointment-glucose";
import { GlucoseChart } from "@/components/chart-medition";
import { DatePickerForm } from "@/components/date-picker-form";
import { ModalGenerateReport } from "@/components/modal-generate-report";
import { TableCapillary } from "@/components/table-capillary";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type ValueWithClass = {
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

const initialValueDate = () => {
  const today = new Date();

  const dateInitial = new Date(today);
  dateInitial.setDate(today.getDate() - 30);
  dateInitial.setUTCHours(0, 0, 0, 0);
  const dateInitialISO = dateInitial.toISOString();

  const dateFinal = new Date(today);
  dateFinal.setUTCHours(23, 59, 59, 999);
  const dateFinalISO = dateFinal.toISOString();

  return {
    dateInitial: dateInitialISO,
    dateFinal: dateFinalISO,
  };
};

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifiedToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }

      return;
    };
    verifiedToken();
  }, [navigate]);

  const [formData, setFormData] = useState<{
    dateInitial: string;
    dateFinal: string;
  } | null>(initialValueDate);
  const [queryEnabled, setQueryEnabled] = useState(true);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["capillary", formData?.dateInitial, formData?.dateFinal],
    queryFn: () => {
      const today = new Date();
      const response = fetchCapillary({
        dateInitial: formData?.dateInitial
          ? formData?.dateInitial
          : new Date(new Date().setDate(today.getDate() - 15)).toISOString(),
        dateFinal: formData?.dateFinal
          ? formData?.dateFinal
          : new Date().toDateString(),
      });

      return response;
    },
    enabled: !!formData && queryEnabled,
  });

  if (isError) {
    console.log(error);
  }

  const transformedData: GlucoseRead[] = data
    ? transformGlucoseData(data.capillaryBloodGlucose)
    : [];

  const handleFormSubmit = (data: { dateInitial: Date; dateFinal: Date }) => {
    const dateInitial = new Date(data.dateInitial);
    const dateFinal = new Date(data.dateFinal);

    dateInitial.setUTCHours(0, 0, 0, 0);
    const dateInitialISO = dateInitial.toISOString();

    dateFinal.setUTCHours(23, 59, 59, 999);
    const dateFinalISO = dateFinal.toISOString();

    setFormData({
      dateInitial: dateInitialISO,
      dateFinal: dateFinalISO,
    });
    setQueryEnabled(true);

    console.log("dateInitialISO:", dateInitialISO);
    console.log("dateFinalISO:", dateFinalISO);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Leituras de Glicose
          </h1>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </main>
    );
  }

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
