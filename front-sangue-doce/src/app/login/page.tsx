import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default async function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg shadow-md overflow-hidden max-w-5xl w-full">
        {/* Imagem à esquerda */}
        <div className="flex items-center justify-center p-4 bg-white">
          <Image
            src="/diabetes.png"
            alt="imagem de fundo do formulário de login"
            className="rounded-md object-cover"
            width={500}
            height={500}
            priority
          />
        </div>

        {/* Formulário à direita */}
        <div className="flex flex-col justify-center items-center w-full p-8">
          <div className="mb-4">
            <Image
              src="/sangue-doce-logo.png"
              alt="Logo do Sanguinho Doce"
              width={80}
              height={80}
              className="rounded-md"
              priority
            />
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Entrar na conta
          </h2>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
