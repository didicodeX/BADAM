export default function Button({
  children,
  onClick,
  type = "button",
  variant = "solid", // "solid" | "outline"
}) {
  const baseStyle = "px-4 py-2 w-fit rounded-md font-medium transition-all duration-200 border";
  const variants = {
    solid: "bg-cta-700 text-white border-cta-700 hover:bg-transparent hover:border-cta-500 hover:text-cta-500",
    outline: "bg-transparent text-cta-500 border-cta-500 hover:bg-cta-700 hover:border-cta-700 hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
