import { Toaster as SonnerToaster } from "sonner";

export default function Toaster() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <SonnerToaster
        position="top-right"
        theme="light"
        unstyled
        toastOptions={{
          className: "rounded-lg border p-4 shadow-md font-medium",
        }}
      />
    </div>
  );
}
