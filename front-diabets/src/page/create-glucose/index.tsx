import { CapillaryGlucoseForm } from "@/components/capillary-glucose-form";

export default function CreateGlucose() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <CapillaryGlucoseForm />
      </div>
    </div>
  );
}
