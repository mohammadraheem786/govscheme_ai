import { categories } from "../../config/categoryFields";

const Step1Category = ({
  selectedCategory,
  setSelectedCategory,
  updateFormData,
  nextStep,
}) => {
  const handleSelect = (categoryKey) => {
    setSelectedCategory(categoryKey);
    updateFormData({ category: categoryKey });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          What kind of scheme are you looking for?
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Select a category to see relevant schemes
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => handleSelect(cat.key)}
            className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-150 ${
              selectedCategory === cat.key
                ? "border-purple-600 bg-purple-50"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span className="text-2xl mb-2">{cat.icon}</span>
            <span
              className={`text-sm font-medium ${
                selectedCategory === cat.key
                  ? "text-purple-700"
                  : "text-gray-800"
              }`}
            >
              {cat.title}
            </span>
            <span className="text-xs text-gray-400 mt-0.5 leading-tight">
              {cat.description}
            </span>
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <button
        type="button"
        onClick={nextStep}
        disabled={!selectedCategory}
        className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
          selectedCategory
            ? "bg-purple-600 text-white hover:bg-purple-700"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
};

export default Step1Category;