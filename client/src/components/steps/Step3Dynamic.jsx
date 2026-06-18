import { categories } from "../../config/categoryFields";
import ToggleBtn from "../ui/ToggleBtn";

const Step3Dynamic = ({
  formData,
  selectedCategory,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const categoryConfig = categories.find((c) => c.key === selectedCategory);

  if (!categoryConfig) {
    return (
      <div className="text-sm text-red-500">
        Category not found. Please go back and select again.
      </div>
    );
  }

  const handle = (key, value) => {
    updateFormData({ [key]: value });
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type="text"
              placeholder={field.placeholder || ""}
              value={formData[field.key] || ""}
              onChange={(e) => handle(field.key, e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        );

      case "number":
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type="number"
              placeholder={field.placeholder || ""}
              value={formData[field.key] || ""}
              onChange={(e) => handle(field.key, e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        );

      case "select":
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <select
              value={formData[field.key] || ""}
              onChange={(e) => handle(field.key, e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {field.options.map((opt) => (
                <option key={opt} value={opt === "Select" ? "" : opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );

      case "toggle":
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <ToggleBtn
              options={field.options}
              selected={formData[field.key]}
              onChange={(val) => handle(field.key, val)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {categoryConfig.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          A few more details specific to your selected category
        </p>
      </div>

      {/* Dynamic Fields */}
      <div className="space-y-4">
        {categoryConfig.fields.map((field) => renderField(field))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="px-5 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-all"
        >
          Review & Submit
        </button>
      </div>
    </div>
  );
};

export default Step3Dynamic;