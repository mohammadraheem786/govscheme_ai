const ToggleBtn = ({
  options,
  selected,
  onChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">

      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`
            py-3
            rounded-xl
            text-sm
            font-medium
            border
            transition-all
            duration-200

            ${
              selected === option
                ? `
                  bg-gradient-to-r
                  from-violet-600
                  to-purple-600
                  text-white
                  border-purple-500
                  shadow-lg
                  shadow-purple-900/30
                `
                : `
                  bg-zinc-900
                  text-zinc-300
                  border-zinc-800
                  hover:border-zinc-700
                  hover:bg-zinc-800
                `
            }
          `}
        >
          {option}
        </button>
      ))}

    </div>
  );
};

export default ToggleBtn;