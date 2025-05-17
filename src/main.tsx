import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "flatpickr/dist/flatpickr.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "swiper/swiper-bundle.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { AlertProvider } from "./context/AlertContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AlertProvider>
            <AppWrapper>
              <App />
            </AppWrapper>
          </AlertProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
