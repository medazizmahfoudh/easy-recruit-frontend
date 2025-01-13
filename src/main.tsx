import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "@/router/app-router";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/clients/query-client";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
