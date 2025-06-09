import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


type CapillaryGlucoseFormProps = React.ComponentProps<"div"> & {
  onClose?: () => void;
};

const GlucoseSchema = z.object({
  value: z.coerce.number(),
});

type glucoseType = z.infer<typeof GlucoseSchema>;

export function CapillaryGlucoseFormSheet({
  className,
  onClose,
  ...props
}: CapillaryGlucoseFormProps) {
  const { register, handleSubmit, watch } = useForm<glucoseType>({
    resolver: zodResolver(GlucoseSchema),
  });

  const onSubmit: SubmitHandler<glucoseType> = (data) => {
    console.log(data);
    if (onClose) onClose();
  };

  console.log(watch("value"));
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Criação de Medição de Glicose</CardTitle>
          <CardDescription>Crie sua Medição de Glicose</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="value">Valor</Label>
                </div>
                <Input
                  id="value"
                  type="number"
                  required
                  {...register("value")}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer">
                  Inserir Valor
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
