import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { RouterApp } from "./routes";
import { AuthProvider } from "./context/auth-context";
import { BlogFoodProvider } from "./context/blog-food";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BlogFoodProvider>
        <BrowserRouter>
          <AuthProvider>
            <RouterApp />

            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </BrowserRouter>
      </BlogFoodProvider>
    </QueryClientProvider>
  </StrictMode>
);
