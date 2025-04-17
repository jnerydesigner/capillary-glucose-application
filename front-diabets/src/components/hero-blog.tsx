export const HeroBlog = () => {
  return (
    <section className="grid grid-cols-3 gap-4 px-4 my-4">
      <div className="col-span-1 relative rounded-lg overflow-hidden shadow-md">
        <img
          src="https://picsum.photos/seed/picsum/800/500"
          alt="Notícia Principal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 text-white flex flex-col justify-end">
          <span className="bg-red-500 text-white px-3 py-1 rounded text-xs w-fit mb-2">
            TECHNOLOGY
          </span>
          <h2 className="text-xl font-bold">
            Game Changing Virtual Reality Console Technololows Profit To Serve
            The Community
          </h2>
          <div className="flex gap-4 text-sm mt-2 text-gray-300">
            <span>👤 Admin</span>
            <span>📅 27 August, 2024</span>
            <span>⏱ 20 mins</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-4">
        {[1, 2, 3, 4].map((_, idx) => (
          <div
            key={idx}
            className="relative rounded-lg overflow-hidden shadow-sm"
          >
            <img
              src={`https://picsum.photos/id/${idx * 10}/800/500`}
              alt={`Notícia ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 text-white flex flex-col justify-end">
              <span className="bg-pink-500 text-white px-2 py-0.5 rounded text-xs w-fit mb-1">
                {["MOBILE", "GADGET", "NEWS", "HEALTH"][idx]}
              </span>
              <p className="text-sm font-semibold leading-tight">
                {
                  [
                    "New Modern Iphone 14pro Max Extrea Revolutionary Features",
                    "A Guide To Image Optimization On Jamstack Sites",
                    "Using Automated Test Results To Improve Accessibility",
                    "Novo Estudo Relaciona Sono e Controle de Glicose",
                  ][idx]
                }
              </p>
              <span className="text-xs text-gray-300 mt-1">
                📅 27 August, 2024
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
