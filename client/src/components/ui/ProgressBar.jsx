const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress =
    ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">

      <div className="flex justify-between items-center mb-2">
        <span className="text-xs uppercase tracking-wider text-zinc-500">
          Progress
        </span>

        <span className="text-xs text-zinc-400">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>

      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">

        <div
          className="
            h-full
            bg-gradient-to-r
            from-violet-500
            via-purple-500
            to-fuchsia-500
            transition-all
            duration-500
          "
          style={{
            width: `${progress}%`
          }}
        />

      </div>

    </div>
  );
};

export default ProgressBar;