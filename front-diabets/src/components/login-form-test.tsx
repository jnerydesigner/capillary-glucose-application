import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { fetchLogin } from "@/api";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { toast } from "sonner";
import { AxiosResponseError } from "@/types/axios-response-error";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string(),
});

export function LoginTestForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (login: z.infer<typeof formSchema>) => {
      return fetchLogin(login.username, login.password);
    },
    onSuccess: async (data) => {
      if (!data?.access_token) {
        return;
      }
      login(data.access_token);
      navigate("/glucose-measurement");
    },
    onError: (error: AxiosResponseError) => {
      const message = `Message: ${error.response.data.message} - Status: ${error.response.data.statusCode}`;
      toast(message);
    },
  });
  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Seja Bem vindo de Volta</h1>
                <p className="text-muted-foreground text-balance">
                  Medição de Glicose diária
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  {...register("username")}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Input id="password" {...register("password")} required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="w-full h-[50px] flex justify-center items-center mt-2">
              <Link
                to={`${import.meta.env.VITE_BACKEND_URL}/auth/google/login`}
              >
                <img
                  src="/google-icon.svg"
                  alt="Logo Google"
                  className="w-[30px] h-[30px]"
                />
              </Link>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/diabetes.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
