import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Heart, HeartPlus, Share, MessageCircle } from "lucide-react";
import { frCA } from "date-fns/locale";
import useHome from "../hooks/useHome";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";
import MediaSlider from "@/features/dashboard/components/Slider";
import Status from "@/shared/components/Status";
import Button from "@/shared/components/Button";
import ReviewCard from "@/features/dashboard/components/ReviewCard";
import Formateur from "@/shared/components/Formateur";
import useRegistration from "@/features/dashboard/hooks/useRegistration";
import useFavorites from "@/features/dashboard/hooks/useFavorites";
import ReviewModal from "../components/ReviewModal";
import TrainingReviewSection from "../components/TrainingReviewSection";
import { useAuth } from "@/features/auth/hooks/useAuth";
import LoadingScreen from "@/shared/components/LoadingScreen";

export default function SessionDetailPage() {
  const { id } = useParams();
  const { sessionDetail, isLoadingsessionDetail, handleToggleFavorite } =
    useHome(id);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { registerToSession, followedSessions } = useRegistration();
  const { myFavorites, isLoadinMyFavorites } = useFavorites();

  const [isReviewOpen, setIsReviewOpen] = useState(false);

  if (isLoadingsessionDetail || isLoadinMyFavorites) return <LoadingScreen />;

  if (!sessionDetail) {
    return <p className="text-error-700">Session introuvable.</p>;
  }

  const session = sessionDetail.session;
  const training = session.training;
  const createdBy = session.createdBy;
  const media = training.images;

  const isFavorite = myFavorites.some((fav) => fav.session._id === session._id);
  const isRegistered = followedSessions.some(
    (reg) => reg.session._id === session._id
  );
  const isPast = new Date(session.endDateTime) < new Date();

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      navigate("/login"); // ou ouvrir une modale si tu préfères
      return;
    }
    registerToSession(id);
  };

  const handleToggleFavoriteClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    handleToggleFavorite(id);
  };
  return (
    <Content>
      <h2>{training.title}</h2>
      <Section>
        <h3>Informations sur la session</h3>
        <div className="flex w-[330px] sm:w-[500px] md:w-[650px] lg:w-[900px xl:w-[1204px] overflow-hidden">
          {media.length > 0 && <MediaSlider slides={media} />}
        </div>
        <div className="flex flex-col gap-2">
          <p>{training.description}</p>
          <p className="font-bold">{session.address}</p>
          <small className="font-bold">
            Du{" "}
            {format(new Date(session.startDateTime), "EEEE d MMMM yyyy 'à' p", {
              locale: frCA,
            })}{" "}
            au{" "}
            {format(new Date(session.endDateTime), "EEEE d MMMM yyyy 'à' p", {
              locale: frCA,
            })}
          </small>
        </div>
        <div className="flex justify-between">
          <Status
            taken={session.currentNbParticipants}
            total={session.maxParticipants}
            expired={new Date(session.endDateTime) < new Date()}
          />
          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavoriteClick();
              }}
              className="cursor-pointer transition-colors hover:text-cta-500 text-text-900"
            >
              {isFavorite ? (
                <Heart className="w-4 h-4 lg:w-5 lg:h-5 text-cta-500 fill-current" />
              ) : (
                <HeartPlus className="w-4 h-4 lg:w-5 lg:h-5" />
              )}
            </button>
            <button className="cursor-pointer transition-colors hover:text-cta-500 text-text-900">
              <Share className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            <button className="cursor-pointer transition-colors hover:text-cta-500 text-text-900">
              <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </Section>
      <Section>
        <Formateur
          name={createdBy.name}
          joinedDate={createdBy.createdAt}
          avatar={createdBy.avatar}
          bio={createdBy.bio}
          phone={createdBy.phone}
        />
      </Section>
      <div className="flex justify-center">
        {(() => {
          if (isPast) {
            if (isRegistered) {
              return (
                <Button onClick={() => setIsReviewOpen(true)}>
                  Laisser un avis
                </Button>
              );
            }

            return (
              <div className="flex flex-col items-center gap-2">
                {isFavorite ? (
                  <small className="text-text-500">Déjà ajouté aux favoris</small>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <small className="text-text-500 text-center text-sm">
                      Cette session est terminée. Ajoutez-la à vos favoris pour
                      être notifié lorsqu'une nouvelle session sera disponible.
                    </small>
                    <Button
                      onClick={() => {
                        handleToggleFavoriteClick();
                        navigate("/dashboard/sessions", {
                          state: { tab: "favorites" },
                        });
                      }}
                    >
                      Ajouter
                    </Button>
                  </div>
                )}
              </div>
            );
          }

          // Session active
          if (isRegistered) {
            return (
              <Button onClick={() => console.log("openChatPage")}>
                Accéder au chat
              </Button>
            );
          }

          // Session active mais non suivie
          return <Button onClick={handleRegisterClick}>S'inscrire</Button>;
        })()}
      </div>

      <TrainingReviewSection
        trainingId={training._id}
        sessionId={session._id}
        isReviewOpen={isReviewOpen}
        setIsReviewOpen={setIsReviewOpen}
      />
    </Content>
  );
}
