import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import SmartHomeRedirect from "./SmartHomeRedirect";

// Page de test
import TestPage from "../test/TestPage";
import SearchPage from "@/features/search/pages/SearchPage";
import DashboardRoutes from "@/features/dashboard";

// Lazy-loaded pages
const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));
const DashboardHome = lazy(() =>
  import("@/features/dashboard/pages/home/DashboardHome")
);
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const ForgotPasswordPage = lazy(() =>
  import("@/features/auth/pages/ForgotPasswordPage")
);
const RegisterPage = lazy(() => import("@/features/auth/pages/SignupPage"));
const HomePage = lazy(() => import("@/features/home/pages/HomePage"));
const NotFoundPage = lazy(() => import("@/shared/pages/NotFoundPage"));

// Dashboard sidebar pages
const CreateTraining = lazy(() =>
  import("@/features/dashboard/pages/create-training/CreateTraining")
);
const FollowedSessions = lazy(() =>
  import("@/features/dashboard/pages/followed-sessions/FollowedSessions")
);
const CreatedTrainings = lazy(() =>
  import("@/features/dashboard/pages/created-trainings/CreatedTrainings")
);
const CreatedSessions = lazy(() =>
  import("@/features/dashboard/pages/created-sessions/CreatedSessions")
);
const Favorites = lazy(() =>
  import("@/features/dashboard/pages/favorites/Favorites")
);

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <SmartHomeRedirect /> },
      { path: "/landing", element: <LandingPage /> },
      { path: "/test", element: <TestPage /> },
    ],
  },

  {
    element: <AppLayout />,
    children: [{ path: "/search", element: <SearchPage /> }],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/home", element: <HomePage /> },
          { path: "/profile", element: <HomePage /> },
          { path: "/settings", element: <HomePage /> },
        ],
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,

        children: [{ path: "*", element: <DashboardRoutes /> }],
      },
    ],
  },

  { path: "*", element: <NotFoundPage /> },
]);
