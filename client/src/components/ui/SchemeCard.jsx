const badgeStyles = {
ELIGIBLE: "bg-green-500/20 text-green-400 border border-green-500/30",
LIKELY_ELIGIBLE:
"bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
NOT_RECOMMENDED:
"bg-red-500/20 text-red-400 border border-red-500/30"
};

const statusLabels = {
ELIGIBLE: "🟢 Strong Match",
LIKELY_ELIGIBLE: "🟡 Possible Match",
NOT_RECOMMENDED: "🔴 Not Recommended"
};

const SchemeCard = ({ scheme }) => {
return ( <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-5 shadow-lg hover:border-zinc-700 transition-all">

```
  {/* Header */}
  <div className="flex justify-between items-start gap-4 mb-4">

    <div>
      <h3 className="text-xl font-semibold text-white">
        {scheme.schemeName}
      </h3>

      {scheme.department && (
        <p className="text-sm text-zinc-400 mt-1">
          {scheme.department}
        </p>
      )}
    </div>

    <div className="text-right">
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
          badgeStyles[scheme.status]
        }`}
      >
        {statusLabels[scheme.status]}
      </span>

      <p className="text-lg font-bold text-white mt-2">
        {scheme.matchScore}%
      </p>

      <p className="text-xs text-zinc-500">
        Match Score
      </p>
    </div>

  </div>

  {/* Why Matched */}
  {scheme.whyMatched?.length > 0 && (
    <div className="mb-4">

      <h4 className="text-green-400 text-xs uppercase tracking-wider mb-2">
        Why This Matches You
      </h4>

      <ul className="space-y-1">
        {scheme.whyMatched.map((reason, index) => (
          <li
            key={index}
            className="text-sm text-zinc-300"
          >
            ✓ {reason}
          </li>
        ))}
      </ul>

    </div>
  )}

  {/* Missing Information */}
  {scheme.missingInformation?.length > 0 && (
    <div className="mb-4">

      <h4 className="text-yellow-400 text-xs uppercase tracking-wider mb-2">
        Information Needed
      </h4>

      <ul className="space-y-1">
        {scheme.missingInformation.map((item, index) => (
          <li
            key={index}
            className="text-sm text-yellow-300"
          >
            ⚠ {item}
          </li>
        ))}
      </ul>

    </div>
  )}

  {/* Why Not Recommended */}
  {scheme.whyNotRecommended?.length > 0 && (
    <div className="mb-4">

      <h4 className="text-red-400 text-xs uppercase tracking-wider mb-2">
        Why Not Recommended
      </h4>

      <ul className="space-y-1">
        {scheme.whyNotRecommended.map((item, index) => (
          <li
            key={index}
            className="text-sm text-red-300"
          >
            ✕ {item}
          </li>
        ))}
      </ul>

    </div>
  )}

  {/* Benefits */}
  {scheme.benefits?.length > 0 && (
    <div className="mb-4">

      <h4 className="text-zinc-400 text-xs uppercase tracking-wider mb-2">
        Benefits
      </h4>

      <ul className="space-y-1">
        {scheme.benefits.map((benefit, index) => (
          <li
            key={index}
            className="text-sm text-zinc-200"
          >
            🎁 {benefit}
          </li>
        ))}
      </ul>

    </div>
  )}

  {/* Documents */}
  {scheme.documentsNeeded?.length > 0 && (
    <div className="mb-4">

      <h4 className="text-zinc-400 text-xs uppercase tracking-wider mb-2">
        Documents Needed
      </h4>

      <ul className="space-y-1">
        {scheme.documentsNeeded.map((doc, index) => (
          <li
            key={index}
            className="text-sm text-zinc-200"
          >
            📄 {doc}
          </li>
        ))}
      </ul>

    </div>
  )}
{/* Eligibility Criteria */}
{scheme.eligibilityCriteria?.length > 0 && (
  <div className="mb-4">

    <h4 className="text-purple-400 text-xs uppercase tracking-wider mb-2">
      Eligibility Criteria
    </h4>

    <ul className="space-y-1">
      {scheme.eligibilityCriteria.map(
        (item, index) => (
          <li
            key={index}
            className="text-sm text-zinc-300"
          >
            • {item}
          </li>
        )
      )}
    </ul>

  </div>
)}

{/* How To Apply */}
{scheme.howToApply && (
  <div className="mb-4">

    <h4 className="text-cyan-400 text-xs uppercase tracking-wider mb-2">
      How To Apply
    </h4>

    <p className="text-sm text-zinc-300">
      {scheme.howToApply}
    </p>

  </div>
)}

  {/* Next Step */}
  {scheme.nextStep && (
    <div className="bg-zinc-800 rounded-xl p-4 mb-4">

      <h4 className="text-xs uppercase tracking-wider text-zinc-500 mb-1">
        Next Step
      </h4>

      <p className="text-sm text-zinc-200">
        👉 {scheme.nextStep}
      </p>

    </div>
  )}

  {/* Official Link */}
  {scheme.officialLink && (
    <a
      href={scheme.officialLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
    >
      Official Website ↗
    </a>
  )}

</div>


);
};

export default SchemeCard;
