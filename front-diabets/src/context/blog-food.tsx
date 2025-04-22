import { createContext, ReactNode, useContext, useState } from "react";

interface BlogFoodContextType {
  imageBgBlogFood: string | null;
  setImageBgBlogFood: (image: string | null) => void;
}

const BlogFoodContext = createContext<BlogFoodContextType | undefined>(
  undefined
);

interface BlogFoodProviderProps {
  children: ReactNode;
}

export function BlogFoodProvider({ children }: BlogFoodProviderProps) {
  const [imageBgBlogFood, setImageBgBlogFood] = useState<string | null>(null);

  const contextValue: BlogFoodContextType = {
    imageBgBlogFood,
    setImageBgBlogFood,
  };

  return (
    <BlogFoodContext.Provider value={contextValue}>
      {children}
    </BlogFoodContext.Provider>
  );
}

export function useBlogFood() {
  const context = useContext(BlogFoodContext);
  if (!context) {
    throw new Error("useBlogFood must be used within a BlogFoodProvider");
  }
  return context;
}
