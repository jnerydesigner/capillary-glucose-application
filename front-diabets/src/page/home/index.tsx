"use client";

import { fetchCapillary } from "@/api";
import { DatePickerForm } from "@/components/date-picker-form"; // Certifique-se de que o caminho está correto
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";

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

export const columns: ColumnDef<GlucoseRead>[] = [
  {
    accessorKey: "data",
    header: "Data",
    enableColumnFilter: true,
  },
  {
    accessorKey: "06:00",
    header: "06:00",
  },
  {
    accessorKey: "08:00",
    header: "08:00",
  },
  {
    accessorKey: "11:00",
    header: "11:00",
  },
  {
    accessorKey: "13:00",
    header: "13:00",
  },
  {
    accessorKey: "18:00",
    header: "18:00",
  },
  {
    accessorKey: "22:00",
    header: "22:00",
  },
];

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

  return {
    dateInitial: new Date(new Date().setDate(today.getDate() - 15)),
    dateFinal: new Date(),
  };
};

export default function Home() {
  const [formData, setFormData] = useState<{
    dateInitial: Date;
    dateFinal: Date;
  } | null>(initialValueDate); // Armazena as datas do formulário
  const [queryEnabled, setQueryEnabled] = useState(true); // Controla quando a query é habilitada

  const { data, isLoading } = useQuery({
    queryKey: ["capillary", formData],
    queryFn: () =>
      fetchCapillary({
        dateInitial: formData?.dateInitial.toISOString()
          ? formData?.dateInitial.toISOString()
          : new Date().toISOString(),
        dateFinal: formData?.dateFinal.toISOString()
          ? formData?.dateFinal.toISOString()
          : new Date().toISOString(),
      }),
    enabled: queryEnabled,
  });

  const transformedData: GlucoseRead[] = data
    ? transformGlucoseData(data.capillaryBloodGlucose)
    : [];

  const [filter, setFilter] = useState("");

  const table = useReactTable<GlucoseRead>({
    data: transformedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter,
    },
    onGlobalFilterChange: setFilter,
  });

  const handleFormSubmit = (data: { dateInitial: Date; dateFinal: Date }) => {
    setFormData(data);
    setQueryEnabled(true);
  };

  if (isLoading && queryEnabled) {
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
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Leituras de Glicose
        </h1>

        <div className="mb-4">
          <DatePickerForm onSubmit={handleFormSubmit} />
        </div>

        {transformedData.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-center text-[1rem] font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => {
                      const cellValue = cell.getValue() as
                        | { value: number | null; className: string }
                        | string;

                      const isCustomValue =
                        typeof cellValue === "object" &&
                        cellValue !== null &&
                        "value" in cellValue;

                      return (
                        <td
                          key={cell.id}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center"
                        >
                          {isCustomValue ? (
                            <span className={cellValue.className}>
                              {cellValue.value ?? "-"}
                            </span>
                          ) : (
                            <span>{cellValue ?? "-"}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Nenhuma leitura disponível. Selecione um intervalo de datas para
            buscar.
          </div>
        )}
      </div>
    </main>
  );
}
