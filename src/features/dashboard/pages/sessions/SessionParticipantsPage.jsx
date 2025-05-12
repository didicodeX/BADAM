import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import useParticipants from "@/features/dashboard/hooks/useParticipants";
import ParticipantCard from "@/features/dashboard/components/ParticipantCard";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";
import ParticipantManageCard from "../../components/ParticipantManageCard";

export default function SessionParticipantsPage() {
  const { id } = useParams();
  const { participants, isLoading, removeParticipant } = useParticipants(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="w-6 h-6 animate-spin text-text-500" />
      </div>
    );
  }

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
