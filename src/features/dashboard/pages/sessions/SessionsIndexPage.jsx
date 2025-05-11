import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loader, Search } from "lucide-react";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";
import useFavorites from "../../hooks/useFavorites";
import useRegistration from "../../hooks/useRegistration";
import { useFavoriteStore } from "../../store/favorite.store";
import { useSession } from "../../hooks/useSessions";
import SessionCard from "../../components/SessionCard";
import RegistrationCard from "../../components/RegistrationCard";
import FavoriteCard from "@/features/home/components/FavoriteCard";

export default function SessionsIndexPage() {
  const location = useLocation();
  const tabFromState = location.state?.tab;
  console.log("tabFromState", tabFromState);
  
  const [isFocused, setIsFocused] = useState(false);
  const [activeTab, setActiveTab] = useState(tabFromState || "all");
  useEffect(() => {
    if (tabFromState) {
      setActiveTab(tabFromState);
    }
  }, [tabFromState]);
  const { mySessions, isLoadingSessions } = useSession();
  const { followedSessions, isLoadingFollowedSession, unfollowSession } =
    useRegistration();
  const { handleToggleFavorite } = useFavorites();
  const favorites = useFavoriteStore((state) => state.favorites);

  const loading = isLoadingSessions || isLoadingFollowedSession;

  const groupByTraining = (sessions, from = "session") => {
    return sessions.reduce((acc, item) => {
      const training =
        from === "session" ? item.training : item.session.training;
      const session = from === "session" ? item : item.session;
      const trainingId = training?._id;
      if (!acc[trainingId]) {
        acc[trainingId] = {
          training,
          sessions: [],
        };
      }
      acc[trainingId].sessions.push(session);
      return acc;
    }, {});
  };

  const groupedCreated = groupByTraining(mySessions);
  const groupedFollowed = groupByTraining(followedSessions, "registration");

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="w-6 h-6 animate-spin text-text-500" />
      </div>
    );
  }

  return (
    <Content>
      <h2 className="mb-4">Mes sessions</h2>

      {/* Tabs navigation */}
      <div className="flex gap-4 border-b mb-6">
        {[
          { key: "all", label: "Toutes" },
          { key: "followed", label: "Suivies" },
          { key: "created", label: "Créées" },
          { key: "favorites", label: "Favoris" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 font-medium border-b-2 ${
              activeTab === key
                ? "border-cta-500 text-cta-500"
                : "border-transparent text-text-500 hover:text-cta-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="py-4 flex justify-center">
        <div
          className={`flex items-center justify-between border rounded-full px-6 py-3 w-full max-w-[500px] ${
            isFocused ? "border-cta-500" : "border-text-200"
          }`}
        >
          <input
            type="search"
            placeholder="Rechercher une session..."
            className="w-full text-sm focus:outline-none"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Search className="w-5 h-5" />
        </div>
      </div>

      {/* Onglets conditionnels */}
      <Section last>
        {activeTab === "all" && (
          <>
            {/* Suivies */}
            <Section last>
              <h4 className="mb-2">Mes sessions suivies</h4>
              {Object.values(groupedFollowed).map(({ training, sessions }) => (
                <Section key={training._id}>
                  <h5 className="text-sm font-medium mb-1">{training.title}</h5>
                  <div className="flex flex-wrap gap-6">
                    {sessions.map((session) => (
                      <RegistrationCard
                        key={session._id}
                        id={session._id}
                        trainingTitle={training.title}
                        trainingImage={session.coverImage || training.images[0]}
                        session={session}
                        onUnfollow={() => unfollowSession(session._id)}
                      />
                    ))}
                  </div>
                </Section>
              ))}
            </Section>

            {/* Créées */}
            <Section last>
              <h4 className="mb-2">Mes sessions créées</h4>
              {Object.values(groupedCreated).map(({ training, sessions }) => (
                <Section key={training._id}>
                  <h5 className="text-sm font-medium mb-1">{training.title}</h5>
                  <div className="flex flex-wrap gap-6">
                    {sessions.map((session) => (
                      <SessionCard
                        key={session._id}
                        id={session._id}
                        trainingTitle={training.title}
                        trainingImage={session.coverImage || training.images[0]}
                        session={session}
                      />
                    ))}
                  </div>
                </Section>
              ))}
            </Section>

            {/* Favoris */}
            <Section last>
              <h4 className="mb-2">Mes sessions favorites</h4>
              <div className="flex flex-wrap gap-6">
                {favorites.map((session) => (
                  <FavoriteCard
                    key={session._id}
                    id={session._id}
                    trainingTitle={session.training?.title || ""}
                    trainingImage={
                      session.coverImage || session.training.images[0]
                    }
                    session={session}
                    isFavorite={favorites.some((s) => s._id === session._id)}
                    onToggleFavorite={() => handleToggleFavorite(session)}
                  />
                ))}
              </div>
            </Section>
          </>
        )}

        {activeTab === "followed" && (
          <Section>
            {Object.values(groupedFollowed).map(({ training, sessions }) => (
              <Section key={training._id}>
                <h5 className="text-sm font-medium mb-1">{training.title}</h5>
                <div className="flex flex-wrap gap-6">
                  {sessions.map((session) => (
                    <RegistrationCard
                      key={session._id}
                      id={session._id}
                      trainingTitle={training.title}
                      trainingImage={session.coverImage || training.images[0]}
                      session={session}
                      onUnfollow={() => unfollowSession(session._id)}
                    />
                  ))}
                </div>
              </Section>
            ))}
            {followedSessions.length === 0 && (
              <p className="text-text-500">Aucune session suivie.</p>
            )}
          </Section>
        )}

        {activeTab === "created" && (
          <Section>
            {Object.values(groupedCreated).map(({ training, sessions }) => (
              <Section key={training._id}>
                <h5 className="text-sm font-medium mb-1">{training.title}</h5>
                <div className="flex flex-wrap gap-6">
                  {sessions.map((session) => (
                    <SessionCard
                      key={session._id}
                      id={session._id}
                      trainingTitle={training.title}
                      trainingImage={session.coverImage || training.images[0]}
                      session={session}
                    />
                  ))}
                </div>
              </Section>
            ))}
            {mySessions.length === 0 && (
              <p className="text-text-500">Aucune session créée.</p>
            )}
          </Section>
        )}

        {activeTab === "favorites" && (
          <Section>
            <div className="flex flex-wrap gap-6">
              {favorites.map((session) => (
                <FavoriteCard
                  key={session._id}
                  id={session._id}
                  trainingTitle={session.training?.title || ""}
                  trainingImage={
                    session.coverImage || session.training.images[0]
                  }
                  session={session}
                  isFavorite={favorites.some((s) => s._id === session._id)}
                  onToggleFavorite={() => handleToggleFavorite(session)}
                />
              ))}
            </div>
            {favorites.length === 0 && (
              <p className="text-text-500">Aucune session favorite.</p>
            )}
          </Section>
        )}
      </Section>
    </Content>
  );
}
