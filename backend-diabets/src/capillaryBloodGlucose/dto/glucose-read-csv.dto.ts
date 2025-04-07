export type GlucoseRead = {
  Data: string;
  '06:00:00': string;
  '08:00:00': string;
  '11:00:00': string;
  '13:00:00': string;
  '18:00:00': string;
  '22:00:00': string;
};

export type UploadCSVDTO = {
  data: GlucoseRead[];
};
