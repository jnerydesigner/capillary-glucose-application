"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router";
import { useState } from "react";
import { SheetCapillaryGlucoseForm } from "./sheet-capillary-glucose-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { CapillaryGlucoseForm } from "./capillary-glucose-form";
import { DialogTitle } from "@radix-ui/react-dialog";

const FormSchema = z.object({
  dateInitial: z.date({
    required_error: "Use a Data Inicial",
  }),
  dateFinal: z.date({
    required_error: "Use a Data Final",
  }),
});

type DateProps = z.infer<typeof FormSchema>;

interface DatePickerFormProps {
  onSubmit: (data: DateProps) => void;
}

export function DatePickerForm({ onSubmit }: DatePickerFormProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit(data);
    toast("Intervalo de datas selecionado", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 flex justify-center items-center w-full gap-2"
        >
          <FormField
            control={form.control}
            name="dateInitial"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2.5">
                <FormLabel>Data Inicial</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Escolha a Data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateFinal"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2.5">
                <FormLabel>Data Final</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Escolha a Data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-[150px] h-full flex justify-center items-center">
            <Button type="submit" className="cursor-pointer">
              Filtrar Data
            </Button>
          </div>
        </form>
        <Toaster />
      </Form>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger>
          <Button className="cursor-pointer">Inserir Glicose</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <DialogTitle>Formulário</DialogTitle>
            <CapillaryGlucoseForm onClose={() => setIsSheetOpen(false)} />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
