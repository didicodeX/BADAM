export default function CardListContainer({ children }) {
  return (
    <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
      {children}
    </div>
  );
}
