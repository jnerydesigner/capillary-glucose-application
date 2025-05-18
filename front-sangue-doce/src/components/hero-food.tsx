import Image from "next/image";

export const HeroFood = () => {
  return (
    <div className="w-full h-auto flex justify-between items-center p-4 gap-4">
      <div>
        <h2 className="text-4xl flex justify-center items-start flex-col mb-8">
          Sua Jornada diária de{" "}
          <span className="text-green-600 font-bold">Alimentação Saudável</span>
        </h2>
        <p className="text-xl w-250">
          Descubra o equilíbrio perfeito entre sabor e saúde com nossa jornada
          diária de alimentação saudável. Receba dicas práticas e receitas
          nutritivas para transformar sua rotina de forma leve e prazerosa.
          Aprenda a fazer escolhas inteligentes sem abrir mão do prazer de comer
          bem. Explore ingredientes naturais, funcionais e acessíveis para o seu
          dia a dia. Cuide do seu corpo e mente com uma alimentação consciente,
          simples e deliciosa.
        </p>
      </div>
      <div className="w-300">
        <Image
          src="/sanduiche.png"
          alt="Imagem de um sanduiche natural para ilustrar uma comida saudável"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
