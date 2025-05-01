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

// Lazy-loaded pages
const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));
const DashboardHome = lazy(() => import("@/features/dashboard/pages/DashboardHome"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("@/features/auth/pages/ForgotPasswordPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/SignupPage"));
const HomePage = lazy(() => import("@/features/home/pages/HomePage"));
const NotFoundPage = lazy(() => import("@/shared/pages/NotFoundPage"));

// Dashboard sidebar pages
const CreateTraining = lazy(() => import("@/features/dashboard/pages/CreateTraining"));
const FollowedSessions = lazy(() => import("@/features/dashboard/pages/FollowedSessions"));
const CreatedTrainings = lazy(() => import("@/features/dashboard/pages/CreatedTrainings"));
const CreatedSessions = lazy(() => import("@/features/dashboard/pages/CreatedSessions"));
const Favorites = lazy(() => import("@/features/dashboard/pages/Favorites"));

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
    children: [
      { path: "/search", element: <SearchPage /> },
    ],
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
        ],
      },
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <DashboardHome /> },
          { path: "/dashboard/create", element: <CreateTraining /> },
          { path: "/dashboard/followed-sessions", element: <FollowedSessions /> },
          { path: "/dashboard/created-trainings", element: <CreatedTrainings /> },
          { path: "/dashboard/created-sessions", element: <CreatedSessions /> },
          { path: "/dashboard/favorites", element: <Favorites /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFoundPage /> },
]);
