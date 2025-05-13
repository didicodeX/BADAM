import { useParams } from "react-router-dom";
import useParticipants from "@/features/dashboard/hooks/useParticipants";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";
import ParticipantManageCard from "../../components/ParticipantManageCard";
import LoadingScreen from "@/shared/components/LoadingScreen";

export default function SessionParticipantsPage() {
  const { id } = useParams();
  const { participants, isLoading, removeParticipant } = useParticipants(id);

  if (isLoading) return <LoadingScreen/>

  return (
    <Content>
      <h2 className="text-xl font-bold mb-4">Participants</h2>
      <Section>
        {participants.map((r) => (
          <ParticipantManageCard
            key={r._id}
            participant={r.participant}
            onRemove={() =>
              removeParticipant({ sessionId: id, userId: r.participant._id })
            }
          />
        ))}
      </Section>
    </Content>
  );
}
