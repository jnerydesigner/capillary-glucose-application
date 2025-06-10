import { Header } from "@/components/header-dashboard";
import HomeDashboard from "@/components/home-dashboard";
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

export default async function Dashboard() {
  const { dateInitial, dateFinal } = initialValueDate();
  let data = null;
  try {
    data = await fetchCapillary({ dateInitial, dateFinal });
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <Header />
      <HomeDashboard initialData={data} />
    </div>
  );
}
