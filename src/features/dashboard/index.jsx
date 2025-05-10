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
const TrainingReviewsPage = lazy(() =>
  import("./pages/trainings/TrainingReviewsPage")
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
const SessionReviewsPage = lazy(() =>
  import("./pages/sessions/SessionReviewsPage")
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

          {/* Trainings :id */}
          <Route path=":id">
            <Route index element={<TrainingDetailPage />} />
            <Route path="edit" element={<EditTrainingPage />} />
            <Route path="edit" element={<EditTrainingPage />} />
            <Route path="reviews" element={<TrainingReviewsPage />} />
            <Route path="sessions/create" element={<CreateSessionPage />} />
          </Route>
          {/*   */}
        </Route>

        {/* Sessions */}
        <Route path="sessions">
          {/* <Route index element={<SessionsListPage />} /> */}
          <Route path="created" element={<CreatedSessionsPage />} />
          <Route path="followed" element={<FollowedSessionsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />

          {/* Sessions :id */}
          <Route path=":id">
            <Route index element={<SessionDetailPage />} />
            <Route path="edit" element={<EditSessionPage />} />
            <Route path="participants" element={<SessionParticipantsPage />} />
            <Route path="reviews" element={<SessionReviewsPage />} />
          </Route>
          {/*  */}
        </Route>
        {/*  */}
      </Routes>
    </Suspense>
  );
}
