import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/app/PublicLayout"; 
import LandingPage from "@/features/landing/pages/LandingPage";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
    ],
  },
]);
