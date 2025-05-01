import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// Layouts
import PublicLayout from "./PublicLayout";
import AuthLayout from "./AuthLayout";
import DashboardLayout from "./DashboardLayout";
import AppLayout from "./AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import SmartHomeRedirect from "./SmartHomeRedirect";

// Page de test
import TestPage from "./TestPage";
import SearchPage from "@/features/search/pages/SearchPage";

const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));
const DashboardHome = lazy(() => import("@/features/dashboard/pages/DashboardHome"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("@/features/auth/pages/ForgotPasswordPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/SignupPage"));
const HomePage = lazy(() => import("@/features/home/pages/HomePage"));
const NotFoundPage = lazy(() => import("@/shared/pages/NotFoundPage"));

export const router = createBrowserRouter([
  // ✅ Routes publiques
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <SmartHomeRedirect /> },
      { path: "/landing", element: <LandingPage /> },
      { path: "/test", element: <TestPage /> },
    ],
  },

  // ✅ /search est ici, avec AppLayout — public MAIS avec UI adaptative
  {
    element: <AppLayout />,
    children: [
      { path: "/search", element: <SearchPage /> },
    ],
  },

  // ✅ Auth pages
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
    ],
  },

  // ✅ Protected routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/home", element: <HomePage /> },
        ],
      },
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <DashboardHome /> },
        ],
      },
    ],
  },

  // 404
  { path: "*", element: <NotFoundPage /> },
]);
