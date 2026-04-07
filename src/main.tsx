import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/globals.css";
import { Routes } from "./Routes";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DefaultProps, DefaultPropsProvider } from "@suspensive/react";

const queryClient = new QueryClient();

const defaultProps = new DefaultProps({
  Delay: {
    ms: 1200,
  },
  Suspense: {
    fallback: "loading...",
    clientOnly: false,
  },
});

async function bootstrap() {
  if (import.meta.env.DEV) {
    const { startMocks } = await import("./mocks");
    await startMocks();
  }

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <DefaultPropsProvider defaultProps={defaultProps}>
          <Routes />
          <Toaster />
        </DefaultPropsProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}

bootstrap();
