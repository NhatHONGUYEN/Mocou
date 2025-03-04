// components/Providers.tsx
"use client"; // Mark this as a Client Component

import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/lib/QueryProvider";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>
        {children}
        <Toaster />
      </QueryProvider>
    </SessionProvider>
  );
}
