import GlucoseHomeClient from "@/components/glucose-home-client";
import { fetchCapillary } from "@/fetch/glucose";

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

export default async function Page() {
  const { dateInitial, dateFinal } = initialValueDate();
  let data = null;
  try {
    data = await fetchCapillary({ dateInitial, dateFinal });
  } catch (err) {
    console.error(err);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-7xl">
        <GlucoseHomeClient initialData={data} />
      </div>
    </main>
  );
}
