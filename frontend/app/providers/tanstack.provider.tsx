"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import createTanStackQueryClient from "@/shared/api/ts-query/tsrq-client";

const TanStackProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => createTanStackQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* Rest of the app */}
      {children}

      {/* DEv tools */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default TanStackProvider;
