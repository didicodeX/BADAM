import { solidStyle, outlineStyle, baseStyle } from "../styles/buttonStyle";

export default function Button({
  children,
  onClick,
  disabled,
  type = "button",
  variant = "solid", // "solid" | "outline"
}) {
  const variants = {
    solid: solidStyle,
    outline: outlineStyle,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
