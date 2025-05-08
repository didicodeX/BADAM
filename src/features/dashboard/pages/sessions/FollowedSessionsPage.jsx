import { useState } from "react";
import { Loader, Search } from "lucide-react";
import { Link } from "react-router-dom";
import useRegistration from "../../hooks/useRegistration";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";
import RegistrationCard from "../../components/RegistrationCard";
import Button from "@/shared/components/Button";

export default function FollowedSessionsPage() {
  const [isFocused, setIsFocused] = useState(false);
  const { followedSessions, isLoadingFollowedSession, unfollowSession } =
    useRegistration();

  if (isLoadingFollowedSession) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="animate-spin w-6 h-6 text-text-500" />
      </div>
    );
  }

  console.log(followedSessions);

  // Grouper les sessions par formation
  const grouped = followedSessions.reduce((acc, reg) => {
    const trainingId = reg.session.training?._id;
    if (!acc[trainingId]) {
      acc[trainingId] = {
        training: reg.session.training,
        sessions: [],
      };
    }
    acc[trainingId].sessions.push(reg.session);
    return acc;
  }, {});

  return (
    <Content>
      <h2>Mes sessions suivies</h2>

      <Section last>
        {/* Barre de recherche */}
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

        {/* Liste des formations avec leurs sessions suivies */}
        {Object.values(grouped).map(({ training, sessions }) => (
          <Section key={training._id}>
            <div>
              <h4 className="border-b border-b-background-100 w-fit pb-2">{training.title}</h4>
            </div>
            <div className="flex flex-wrap gap-6">
              {sessions.map((session) => (
                <RegistrationCard
                  key={session._id}
                  id={session._id}
                  trainingTitle={training.title}
                  trainingImage={session.coverImage || training.images?.[0]}
                  session={session}
                  onUnfollow={() => unfollowSession(session._id)}
                />
              ))}
            </div>
          </Section>
        ))}

        {Object.keys(grouped).length === 0 && (
          <div className="flex flex-col items-center gap-6">
            <p className="text-center text-text-500 mt-8">
              Aucune session suivie pour le moment.
            </p>
            <Button to={"/"}>rechercher une session</Button>
          </div>
        )}
      </Section>
    </Content>
  );
}
