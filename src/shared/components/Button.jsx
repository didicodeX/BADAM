export default function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-6 py-3 bg-cta-700 text-white w-fit rounded-lg"
    >
      {children}
    </button>
  );
}
