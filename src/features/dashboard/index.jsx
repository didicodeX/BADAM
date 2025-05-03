import { Routes, Route, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingScreen from "@/shared/components/LoadingScreen";

// Lazy-loaded pages
const DashboardHomePage = lazy(() => import("./pages/home/DashboardHomePage"));

// Trainings
const CreateTrainingPage = lazy(() =>
  import("./pages/trainings/CreateTrainingPage")
);
const EditTrainingPage = lazy(() =>
  import("./pages/trainings/EditTrainingPage")
);
const TrainingDetailPage = lazy(() =>
  import("./pages/trainings/TrainingDetailPage")
);
const CreatedTrainingsPage = lazy(() =>
  import("./pages/trainings/CreatedTrainingsPage")
);

// Sessions
const CreateSessionPage = lazy(() =>
  import("./pages/sessions/CreateSessionPage")
);
const EditSessionPage = lazy(() => import("./pages/sessions/EditSessionPage"));
const SessionDetailPage = lazy(() =>
  import("./pages/sessions/SessionDetailPage")
);
const CreatedSessionsPage = lazy(() =>
  import("./pages/sessions/CreatedSessionsPage")
);
const FollowedSessionsPage = lazy(() =>
  import("./pages/sessions/FollowedSessionsPage")
);
const FavoritesPage = lazy(() => import("./pages/sessions/FavoritesPage"));
const SessionParticipantsPage = lazy(() =>
  import("./pages/sessions/SessionParticipantsPage")
);
const SessionFeedbackPage = lazy(() =>
  import("./pages/sessions/SessionFeedbackPage")
);

export default function DashboardRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="home" element={<DashboardHomePage />} />

        {/* Trainings */}
        <Route path="trainings">
          {/* <Route index element={<TrainingsListPage />} /> */}
          <Route path="create" element={<CreateTrainingPage />} />
          <Route path="created" element={<CreatedTrainingsPage />} />
          <Route path=":trainingId" element={<TrainingDetailPage />} />
          <Route path=":trainingId/edit" element={<EditTrainingPage />} />
        </Route>

        {/* Sessions */}
        <Route path="sessions">
          {/* <Route index element={<SessionsListPage />} /> */}
          <Route path="create" element={<CreateSessionPage />} />
          <Route path="created" element={<CreatedSessionsPage />} />
          <Route path="followed" element={<FollowedSessionsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>

        <Route path=":sessionId">
          <Route index element={<SessionDetailPage />} />
          <Route path="edit" element={<EditSessionPage />} />
          <Route path="participants" element={<SessionParticipantsPage />} />
          <Route path="feedbacks" element={<SessionFeedbackPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
