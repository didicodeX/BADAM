export default function Content({ children }) {
  return (
    <div className="padd-x padd-y flex flex-col gap-6 md:gap-10">
      {children}
    </div>
  );
}
