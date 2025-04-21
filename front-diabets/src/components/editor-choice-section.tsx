export const EditorsChoiceSection = () => {
  const posts = [
    {
      category: "MOBILE",
      title: "Using Automated Test Results To Improve",
      date: "27 AUGUST, 2024",
      image: "https://picsum.photos/id/20/100/100",
    },
    {
      category: "GADGET",
      title: "How To Search For A Developer Job Abroad",
      date: "27 AUGUST, 2024",
      image: "https://picsum.photos/id/30/100/100",
    },
    {
      category: "TECHNOLOGY",
      title: "New Smashing Front-End & UX Workshops",
      date: "27 AUGUST, 2024",
      image: "https://picsum.photos/id/40/100/100",
    },
  ];

  return (
    <section className="container mx-auto mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-100 relative inline-block">
          Editors Choice
          <span className="block h-0.5 w-10 bg-red-500 mt-1" />
        </h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded hover:bg-red-500 hover:text-white transition">
            ←
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded hover:bg-red-500 hover:text-white transition">
            →
          </button>
        </div>
      </div>

      {/* Card List */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {posts.map((post, idx) => (
          <div
            key={idx}
            className="flex gap-4 items-center min-w-[300px] bg-soft-pink rounded-lg p-2 hover:bg-gray-900 transition cursor-pointer"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div>
              <span className="text-xs border border-gray-400 bg-black text-white px-2 py-0.5 rounded mb-1 inline-block">
                {post.category}
              </span>
              <h3 className="text-blue-300 text-sm font-semibold">
                {post.title}
              </h3>
              <div className="text-xs text-gray-400 mt-1">📅 {post.date}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
