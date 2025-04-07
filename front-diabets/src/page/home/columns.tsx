import { ColumnDef } from "@tanstack/react-table";

export type GlucoseRead = {
  date: string;
  sixHour: string;
  eightHour: string;
  elevenHour: string;
  thirteenHour: string;
  eighteenHour: string;
  twentyTwoHour: string;
};

export const columns: ColumnDef<GlucoseRead>[] = [
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "sixHour",
    header: "06:00",
  },
  {
    accessorKey: "eightHour",
    header: "08:00",
  },
  {
    accessorKey: "elevenHour",
    header: "11:00",
  },
  {
    accessorKey: "thirteenHour",
    header: "13:00",
  },
  {
    accessorKey: "eighteenHour",
    header: "18:00",
  },
  {
    accessorKey: "twentyTwoHour",
    header: "22:00",
  },
];
