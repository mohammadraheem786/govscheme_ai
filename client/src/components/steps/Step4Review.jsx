import { categories } from "../../config/categoryFields";

const LABELS = {
  fullName: "Full Name",
  age: "Age",
  gender: "Gender",
  casteCategory: "Caste Category",
  religion: "Religion",
  district: "District",
  areaType: "Area Type",
  annualIncome: "Annual Income",
  rationCard: "Ration Card",
  bplCard: "BPL Card",
};

const SKIP_KEYS = ["category"];

const Step4Review = ({
  formData,
  selectedCategory,
  prevStep,
  handleSubmit,
  loading,
}) => {
  const categoryConfig = categories.find((c) => c.key === selectedCategory);

  const commonEntries = Object.entries(LABELS)
    .map(([key, label]) => ({ key, label, value: formData[key] }))
    .filter((item) => item.value);

  const categoryKeys = categoryConfig?.fields.map((f) => f.key) || [];
  const categoryEntries = categoryKeys
    .map((key) => {
      const field = categoryConfig.fields.find((f) => f.key === key);
      return {
        key,
        label: field?.label || key,
        value: formData[key],
      };
    })
    .filter((item) => item.value && !SKIP_KEYS.includes(item.key));

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Review your details
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Make sure everything looks correct before submitting
        </p>
      </div>

      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
          {categoryConfig?.icon} {categoryConfig?.title}
        </span>
      </div>

      {/* Common Fields */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Personal details
        </p>
        <div className="space-y-2">
          {commonEntries.map(({ key, label, value }) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-gray-500">{label}</span>
              <span className="text-gray-900 font-medium">
                {key === "annualIncome"
                  ? `₹${Number(value).toLocaleString("en-IN")}`
                  : value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Specific Fields */}
      {categoryEntries.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            {categoryConfig?.title} details
          </p>
          <div className="space-y-2">
            {categoryEntries.map(({ key, label, value }) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-500">{label}</span>
                <span className="text-gray-900 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={prevStep}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Finding your schemes...
            </span>
          ) : (
            "Find My Schemes ↗"
          )}
        </button>
      </div>
    </div>
  );
};

export default Step4Review;