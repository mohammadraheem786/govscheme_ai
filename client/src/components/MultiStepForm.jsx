import { useState } from "react";
import Step1Category from "./steps/Step1Category";
import Step2Common from "./steps/Step2Common";
import Step3Dynamic from "./steps/Step3Dynamic";
import Step4Review from "./steps/Step4Review";
import ResultsPage from "./ResultsPage";
import ProgressBar from "./ui/ProgressBar";
import { checkEligibility } from "../utils/api";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const updateFormData = (newFields) => {
    setFormData((prev) => ({ ...prev, ...newFields }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await checkEligibility(formData, selectedCategory);
      setSchemes(result.schemes);

    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setFormData({});
    setSelectedCategory("");
    setSchemes([]);
    setError("");
  };

  if (schemes.length > 0) {
    return <ResultsPage
  schemes={schemes}
  userProfile={formData}
  onReset={handleReset}
/>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-2xl p-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">GovScheme AI</h1>
          <p className="text-sm text-gray-500 mt-1">
            Find Telangana government schemes you are eligible for
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={4} />

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Steps */}
        <div className="mt-6">
          {currentStep === 0 && (
            <Step1Category
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              updateFormData={updateFormData}
              nextStep={nextStep}
            />
          )}
          {currentStep === 1 && (
            <Step2Common
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {currentStep === 2 && (
            <Step3Dynamic
              formData={formData}
              selectedCategory={selectedCategory}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {currentStep === 3 && (
            <Step4Review
              formData={formData}
              selectedCategory={selectedCategory}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default MultiStepForm;