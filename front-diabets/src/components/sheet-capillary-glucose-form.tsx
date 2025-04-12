import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { CapillaryGlucoseFormSheet } from "./capillary-glucose-form-sheet";
import { useState } from "react";

export const SheetCapillaryGlucoseForm = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="cursor-pointer">Cria Apontamento da Glicose</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <div className="my-6">
            <CapillaryGlucoseFormSheet onClose={() => setOpen(false)} />
          </div>
          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
