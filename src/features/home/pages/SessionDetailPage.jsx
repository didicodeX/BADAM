import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Loader, Heart, HeartPlus, Share, MessageCircle } from "lucide-react";
import { enUS } from "date-fns/locale";
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

export default function SessionDetailPage() {
  const { id } = useParams();
  const { sessionDetail, isLoadingsessionDetail, handleToggleFavorite } =
    useHome(id);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { registerToSession, followedSessions } = useRegistration();
  const { myFavorites, isLoadinMyFavorites } = useFavorites();

  const [isReviewOpen, setIsReviewOpen] = useState(false);

  if (isLoadingsessionDetail || isLoadinMyFavorites) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="animate-spin w-6 h-6 text-text-500" />
      </div>
    );
  }
  if (!sessionDetail) {
    return <p className="text-error-700">Session introuvable.</p>;
  }

  console.log(sessionDetail);

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
  }
  return (
    <Content>
      <h2>{training.title}</h2>
      <Section>
        <h3>Informations sur la session</h3>
        <div className="flex w-[400px] sm:w-[500px] md:w-[650px] lg:w-[900px xl:w-[1204px] overflow-hidden">
          {media.length > 0 && <MediaSlider slides={media} />}
        </div>
        <div className="flex flex-col gap-2">
          <p>{training.description}</p>
          <p className="font-bold">{session.address}</p>
          <small className="font-bold">
            {format(new Date(session.startDateTime), "MMMM d", {
              locale: enUS,
            })}{" "}
            to{" "}
            {format(new Date(session.endDateTime), "MMMM d", {
              locale: enUS,
            })}
            , {format(new Date(session.startDateTime), "p", { locale: enUS })}{" "}
            to {format(new Date(session.endDateTime), "p", { locale: enUS })}{" "}
            ADT
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
        />
      </Section>
      <div className="flex justify-center">
        {!isRegistered ? (
          <Button onClick={() => handleRegisterClick()}>S'inscrire</Button>
        ) : isPast ? (
          <Button onClick={() => setIsReviewOpen(true)}>Laisser un avis</Button>
        ) : (
          <Button onClick={() => console.log("openChatPage")}>
            Accéder au chat
          </Button>
        )}
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
