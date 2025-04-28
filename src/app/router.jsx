import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// Layouts
import PublicLayout from "./PublicLayout";
import AuthLayout from "./AuthLayout"; 
import DashboardLayout from "./DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import SmartHomeRedirect from "./SmartHomeRedirect";

// Page de test
import TestPage from "./TestPage";

// Pages (lazy loadées)
const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));
const DashboardHome = lazy(() =>
  import("@/features/dashboard/pages/DashboardHome")
);
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("@/features/auth/pages/ForgotPasswordPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/SignupPage"));
const HomePage = lazy(() => import("@/features/home/pages/HomePage"));
const NotFoundPage = lazy(() => import("@/shared/pages/NotFoundPage"));

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
    element: <AuthLayout />, 
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
    ],
  },
  // {
  //   element: <ProtectedRoute />,
  //   children: [
  //   ],
  // },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/home", element: <HomePage /> },
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <DashboardHome /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> }
]);
