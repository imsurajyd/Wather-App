const WeatherSkeleton = () => {
  return (
    <div
      className="h-dvh w-dvw flex flex-col lg:flex-row animate-pulse"
      style={{
        background: "linear-gradient(to bottom right, #60a5fa, #2563eb)",
      }}
    >
      {/* LEFT CARD */}
      <div className="w-full lg:w-1/3 flex justify-center p-6">
        <div
          className="w-full max-w-sm
          bg-white/20 rounded-2xl p-6
          flex flex-col items-center gap-6"
        >
          <div className="h-8 w-40 bg-white/40 rounded"></div>
          <div className="h-5 w-28 bg-white/30 rounded"></div>

          <div className="flex items-center gap-4">
            <div className="h-20 w-20 bg-white/40 rounded-full"></div>
            <div className="h-16 w-24 bg-white/40 rounded"></div>
          </div>

          <div className="h-5 w-32 bg-white/30 rounded"></div>
        </div>
      </div>

      {/* CENTER */}
      <div className="w-full lg:w-1/3 flex flex-col items-center justify-center gap-4">
        <div className="h-32 w-32 bg-white/40 rounded-full"></div>
        <div className="h-6 w-36 bg-white/30 rounded"></div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/3 px-6 lg:px-20 mt-6 lg:mt-0 flex flex-col gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-6 w-full bg-white/30 rounded"></div>
        ))}
      </div>
    </div>
  );
};

export default WeatherSkeleton;
