export const BackgroundGrid = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <div
      className="absolute inset-0 opacity-70"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(246,77,6,0.2), transparent 55%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.06), transparent 60%)",
      }}
    />
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    />
  </div>
);

