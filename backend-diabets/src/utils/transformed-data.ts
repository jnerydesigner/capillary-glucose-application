export type GlucoseRead = {
  data: string;
  '06:00': any;
  '08:00': any;
  '11:00': any;
  '13:00': any;
  '18:00': any;
  '22:00': any;
};

export const transformedGlucose = (capillaryBloodGlucose) => {
  const horariosFixos = ['06:00', '08:00', '11:00', '13:00', '18:00', '22:00'];
  const agrupado = {};

  for (const item of capillaryBloodGlucose) {
    const data = item.dateTimeCollect.split(' ')[0];

    if (!agrupado[data]) {
      agrupado[data] = {};

      // Inicializa todos os horários com null
      horariosFixos.forEach((h) => {
        agrupado[data][h] = null;
      });
    }

    agrupado[data][item.period] = item.value;
  }

  // Retorna em ordem decrescente por data
  return Object.entries(agrupado)
    .map(([data, values]) => ({ data, ...(values as object) }))
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
};

export const transformGlucoseAscending = (capillaryBloodGlucose) => {
  const fixedTimes = ['06:00', '08:00', '11:00', '13:00', '18:00', '22:00'];
  const groupedData = {};

  for (const record of capillaryBloodGlucose) {
    const date = record.dateTimeCollect.split(' ')[0];

    if (!groupedData[date]) {
      groupedData[date] = {};
      fixedTimes.forEach((time) => {
        groupedData[date][time] = null;
      });
    }

    groupedData[date][record.period] = record.value;
  }

  return Object.entries(groupedData)
    .map(([date, values]) => ({ date, ...(values as object) }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
