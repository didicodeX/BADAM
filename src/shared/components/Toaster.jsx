import { Toaster as SonnerToaster } from "sonner";

export default function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      theme="light"
      unstyled
      toastOptions={{
        className: "rounded-lg border p-4 shadow-md font-medium",
      }}
    />
  );
}
