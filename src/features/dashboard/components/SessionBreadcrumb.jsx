import Breadcrumbs from "@/shared/components/Breadcrumbs";

export default function SessionBreadcrumb({ session }) {
  const customLabels = session
    ? { [session._id]: session.training?.title || "Session" }
    : {};

  return <Breadcrumbs customLabels={customLabels} />;
}
