import { Routes, Route, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingScreen from "@/shared/components/LoadingScreen";

// Pages lazy-loaded
const DashboardHome = lazy(() => import("./pages/home/DashboardHome"));
const CreateTraining = lazy(() => import("./pages/create-training/CreateTraining"));
const Favorites = lazy(() => import("./pages/favorites/Favorites"));
const FollowedSessions = lazy(() => import("./pages/followed-sessions/FollowedSessions"));

const CreatedTrainings = lazy(() => import("./pages/created-trainings/CreatedTrainings"));
const TrainingDetail = lazy(() => import("./pages/created-trainings/TrainingDetail"));
const TrainingEdit = lazy(() => import("./pages/created-trainings/TrainingEdit"));

const CreatedSessions = lazy(() => import("./pages/created-sessions/CreatedSessions"));
const SessionDetail = lazy(() => import("./pages/created-sessions/SessionDetail"));
const SessionEdit = lazy(() => import("./pages/created-sessions/SessionEdit"));

export default function DashboardRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="home" element={<DashboardHome />} />
        <Route path="create" element={<CreateTraining />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="followed-sessions" element={<FollowedSessions />} />

        {/* Trainings nested routes */}
        <Route path="created-trainings" element={<Outlet />}>
          <Route index element={<CreatedTrainings />} />
          <Route path=":trainingId" element={<TrainingDetail />} />
          <Route path=":trainingId/edit" element={<TrainingEdit />} />
        </Route>

        {/* Sessions nested routes */}
        <Route path="created-sessions" element={<Outlet />}>
          <Route index element={<CreatedSessions />} />
          <Route path=":sessionId" element={<SessionDetail />} />
          <Route path=":sessionId/edit" element={<SessionEdit />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
