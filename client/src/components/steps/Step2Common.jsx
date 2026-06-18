import ToggleBtn from "../ui/ToggleBtn";

const DISTRICTS = [
  "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon",
  "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar",
  "Khammam", "Kumuram Bheem Asifabad", "Mahabubabad", "Mahabubnagar",
  "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool",
  "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli",
  "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet",
  "Vikarabad", "Wanaparthy", "Warangal", "Hanamkonda", "Yadadri Bhuvanagiri"
];

const Step2Common = ({ formData, updateFormData, nextStep, prevStep }) => {

  const handle = (key, value) => {
    updateFormData({ [key]: value });
  };

  const isValid =
    formData.fullName &&
    formData.age &&
    formData.gender &&
    formData.casteCategory &&
    formData.district &&
    formData.areaType &&
    formData.annualIncome;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Personal details</h2>
        <p className="text-sm text-gray-500 mt-1">
          These details apply to all scheme categories
        </p>
      </div>

      <div className="space-y-4">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName || ""}
            onChange={(e) => handle("fullName", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Age + Gender */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              placeholder="e.g. 24"
              value={formData.age || ""}
              onChange={(e) => handle("age", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              value={formData.gender || ""}
              onChange={(e) => handle("gender", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Transgender</option>
            </select>
          </div>
        </div>

        {/* Caste + Religion */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Caste category
            </label>
            <select
              value={formData.casteCategory || ""}
              onChange={(e) => handle("casteCategory", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select</option>
              <option>General</option>
              <option>OBC</option>
              <option>BC-A</option>
              <option>BC-B</option>
              <option>BC-C</option>
              <option>BC-D</option>
              <option>SC</option>
              <option>ST</option>
              <option>EWS</option>
              <option>Minority</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Religion
            </label>
            <select
              value={formData.religion || ""}
              onChange={(e) => handle("religion", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select</option>
              <option>Hindu</option>
              <option>Muslim</option>
              <option>Christian</option>
              <option>Sikh</option>
              <option>Buddhist</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            District
          </label>
          <select
            value={formData.district || ""}
            onChange={(e) => handle("district", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select district</option>
            {DISTRICTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Area Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area type
          </label>
          <ToggleBtn
            options={["Urban", "Rural"]}
            selected={formData.areaType}
            onChange={(val) => handle("areaType", val)}
          />
        </div>

        {/* Annual Income */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual family income (₹)
          </label>
          <input
            type="number"
            placeholder="e.g. 80000"
            value={formData.annualIncome || ""}
            onChange={(e) => handle("annualIncome", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Ration Card */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ration card type
          </label>
          <select
            value={formData.rationCard || ""}
            onChange={(e) => handle("rationCard", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select</option>
            <option>None</option>
            <option>White card</option>
            <option>Pink card (AAY)</option>
            <option>Priority household</option>
          </select>
        </div>

        {/* BPL Card */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            BPL card holder?
          </label>
          <ToggleBtn
            options={["Yes", "No"]}
            selected={formData.bplCard}
            onChange={(val) => handle("bplCard", val)}
          />
        </div>

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
          disabled={!isValid}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            isValid
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Step2Common; 