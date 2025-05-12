export default function ActionItem({ icon, text}) {
  return (
    <div className="flex items-center gap-y-2 text-sm text-text-900 cursor-pointer hover:bg-background-50 px-4 py-2 rounded">
      {icon}
      <span>{text}</span>
    </div>
  );
}