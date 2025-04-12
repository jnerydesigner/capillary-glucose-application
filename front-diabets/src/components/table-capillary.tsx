import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GlucoseRead } from "@/page/home";
import React from "react";

type TableProps = {
  dataTable: GlucoseRead[];
};

export const TableCapillary: React.FC<TableProps> = ({ dataTable }) => {
  console.log("Componente table", dataTable);
  return (
    <Table>
      <TableCaption>Lista de Medições.</TableCaption>
      <TableHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <TableRow className="border-b border-indigo-400 ">
          <TableHead className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wide text-white">
            Data
          </TableHead>
          <TableHead className="px-4 py-3 text-center font-semibold text-sm uppercase tracking-wide hover:bg-indigo-700 transition-colors cursor-pointer text-white">
            06:00
          </TableHead>
          <TableHead className="px-4 py-3 text-center font-semibold text-sm uppercase tracking-wide hover:bg-indigo-700 transition-colors cursor-pointer text-white">
            08:00
          </TableHead>
          <TableHead className="px-4 py-3 text-center font-semibold text-sm uppercase tracking-wide hover:bg-indigo-700 transition-colors cursor-pointer text-white">
            11:00
          </TableHead>
          <TableHead className="px-4 py-3 text-center font-semibold text-sm uppercase tracking-wide hover:bg-indigo-700 transition-colors cursor-pointer text-white">
            13:00
          </TableHead>
          <TableHead className="px-4 py-3 text-center font-semibold text-sm uppercase tracking-wide hover:bg-indigo-700 transition-colors cursor-pointer text-white">
            18:00
          </TableHead>
          <TableHead className="px-4 py-3 text-center font-semibold text-sm uppercase tracking-wide hover:bg-indigo-700 transition-colors cursor-pointer text-white">
            22:00
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataTable &&
          dataTable.map((capillary) => (
            <TableRow key={capillary.data}>
              <TableCell className="font-medium text-center">
                {capillary.data}
              </TableCell>
              <TableCell
                className={`font-medium text-center ${
                  capillary?.["06:00"]?.value != null &&
                  capillary["06:00"].value >= 180
                    ? "text-red-500 font-bold"
                    : "text-blue-500"
                }`}
              >
                {capillary["06:00"].value ?? "-"}
              </TableCell>
              <TableCell
                className={`font-medium text-center ${
                  capillary?.["08:00"]?.value != null &&
                  capillary["08:00"].value >= 180
                    ? "text-red-500 font-bold"
                    : "text-blue-500"
                }`}
              >
                {capillary["08:00"].value ?? "-"}
              </TableCell>
              <TableCell
                className={`font-medium text-center ${
                  capillary?.["11:00"]?.value != null &&
                  capillary["11:00"].value >= 180
                    ? "text-red-500 font-bold"
                    : "text-blue-500"
                }`}
              >
                {capillary["11:00"].value ?? "-"}
              </TableCell>
              <TableCell
                className={`font-medium text-center ${
                  capillary?.["13:00"]?.value != null &&
                  capillary["13:00"].value >= 180
                    ? "text-red-500 font-bold"
                    : "text-blue-500"
                }`}
              >
                {capillary["13:00"].value ?? "-"}
              </TableCell>
              <TableCell
                className={`font-medium text-center ${
                  capillary?.["18:00"]?.value != null &&
                  capillary["18:00"].value >= 180
                    ? "text-red-500 font-bold"
                    : "text-blue-500"
                }`}
              >
                {capillary["18:00"].value ?? "-"}
              </TableCell>
              <TableCell
                className={`font-medium text-center ${
                  capillary?.["22:00"]?.value != null &&
                  capillary["22:00"].value >= 180
                    ? "text-red-500 font-bold"
                    : "text-blue-500"
                }`}
              >
                {capillary["22:00"].value ?? "-"}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
