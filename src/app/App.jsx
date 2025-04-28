import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import LoadingScreen  from "@/shared/components/LoadingScreen";
import Toaster from "@/shared/components/Toaster";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingScreen />}>
        <Toaster/>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
}
