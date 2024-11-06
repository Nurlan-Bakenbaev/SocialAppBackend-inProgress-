"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProviderWrapper({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
