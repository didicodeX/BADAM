import Breadcrumbs from "@/shared/components/Breadcrumbs";

export default function TrainingBreadcrumb({ training }) {
  const customLabels = training
    ? { [training._id]: training.title }
    : {};

  return <Breadcrumbs customLabels={customLabels} />;
}
