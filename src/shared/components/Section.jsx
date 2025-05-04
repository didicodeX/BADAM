export default function Section({ children, last = false }) {
  return (
    <section
      className={`${
        !last
          ? "flex flex-col gap-6 py-6 border-b border-b-background-100"
          : "flex flex-col gap-6 py-6"
      }`}
    >
      {children}
    </section>
  );
}
