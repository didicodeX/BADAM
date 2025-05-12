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
import SearchPage from "@/features/search/pages/SearchPage";
import DashboardRoutes from "@/features/dashboard";

// Lazy-loaded pages
const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const ForgotPasswordPage = lazy(() =>
  import("@/features/auth/pages/ForgotPasswordPage")
);
const RegisterPage = lazy(() => import("@/features/auth/pages/SignupPage"));
const HomePage = lazy(() => import("@/features/home/pages/HomePage"));
const ProfilePage = lazy(() => import("@/features/profile/pages/ProfilePage"));
const NotificationsPage = lazy(() => import("@/features/notifications/pages/NotificationsPage"))

const NotFoundPage = lazy(() => import("@/shared/pages/NotFoundPage"));

const SessionDetailPage = lazy(() => import("@/features/home/pages/SessionDetailPage"))

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <SmartHomeRedirect /> },
      { path: "/landing", element: <LandingPage /> },
      { path: "/sessions/:id", element: <SessionDetailPage /> },
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
          { path: "/profile", element: <ProfilePage /> },
          { path: "/notifications", element: <NotificationsPage /> },
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
