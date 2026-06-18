import React, { useMemo } from "react";
import SchemeCard from "./ui/SchemeCard";
import { generatePDF } from "../utils/pdfGenerator";

const ResultsPage = ({
  schemes = [],
  userProfile,
  onReset,
}) => {

  const strongMatches = useMemo(
    () =>
      schemes.filter(
        (s) => s.status === "ELIGIBLE"
      ),
    [schemes]
  );

  const possibleMatches = useMemo(
    () =>
      schemes.filter(
        (s) => s.status === "LIKELY_ELIGIBLE"
      ),
    [schemes]
  );

  const notRecommended = useMemo(
    () =>
      schemes.filter(
        (s) => s.status === "NOT_RECOMMENDED"
      ),
    [schemes]
  );

  const summary = {
    eligible: strongMatches.length,
    likelyEligible: possibleMatches.length,
    notRecommended: notRecommended.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-slate-950 to-black px-4 py-10">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 mb-5">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>

            <span className="text-xs text-zinc-400">
              AI Powered Eligibility Analysis
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Your Scheme Results
          </h1>

          <p className="text-zinc-400 max-w-2xl mx-auto">
            We analyzed your profile and matched it against Telangana Government welfare schemes.
          </p>

        </div>

        {/* Profile Summary */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-6">

          <h2 className="text-lg font-semibold text-white mb-4">
            Profile Summary
          </h2>

          <div className="grid md:grid-cols-3 gap-4 text-sm">

            <div>
              <p className="text-zinc-500">
                Category
              </p>

              <p className="text-white">
                {userProfile?.category || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500">
                District
              </p>

              <p className="text-white">
                {userProfile?.district || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500">
                Annual Income
              </p>

              <p className="text-white">
                ₹{userProfile?.annualIncome || 0}
              </p>
            </div>

          </div>

        </div>

        {/* Summary Banner */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-8">

          <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-center">

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Eligibility Summary
              </h2>

              <p className="text-zinc-400">
                Based on your profile we found{" "}
                <span className="text-green-400 font-semibold">
                  {strongMatches.length}
                </span>{" "}
                strong matches and{" "}
                <span className="text-yellow-400 font-semibold">
                  {possibleMatches.length}
                </span>{" "}
                possible matches.
              </p>
            </div>

            <button
              onClick={() =>
                generatePDF(
                  userProfile,
                  schemes,
                  summary
                )
              }
              className="
                px-5
                py-3
                rounded-xl
                bg-purple-600
                hover:bg-purple-700
                text-white
                font-medium
                transition-all
              "
            >
              📄 Download Report
            </button>

          </div>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">

          <div className="bg-zinc-900 border border-green-500/20 rounded-3xl p-5">

            <p className="text-4xl font-bold text-green-400">
              {strongMatches.length}
            </p>

            <p className="text-zinc-400 mt-2">
              Strong Matches
            </p>

          </div>

          <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-5">

            <p className="text-4xl font-bold text-yellow-400">
              {possibleMatches.length}
            </p>

            <p className="text-zinc-400 mt-2">
              Possible Matches
            </p>

          </div>

          <div className="bg-zinc-900 border border-red-500/20 rounded-3xl p-5">

            <p className="text-4xl font-bold text-red-400">
              {notRecommended.length}
            </p>

            <p className="text-zinc-400 mt-2">
              Not Recommended
            </p>

          </div>

        </div>

        {/* Strong Matches */}
        {strongMatches.length > 0 && (
          <section className="mb-10">

            <h2 className="text-green-400 font-semibold text-lg mb-4">
              🟢 Strong Matches
            </h2>

            <div className="space-y-5">
              {strongMatches.map((scheme, index) => (
                <SchemeCard
                  key={index}
                  scheme={scheme}
                />
              ))}
            </div>

          </section>
        )}

        {/* Possible Matches */}
        {possibleMatches.length > 0 && (
          <section className="mb-10">

            <h2 className="text-yellow-400 font-semibold text-lg mb-4">
              🟡 Possible Matches
            </h2>

            <div className="space-y-5">
              {possibleMatches.map((scheme, index) => (
                <SchemeCard
                  key={index}
                  scheme={scheme}
                />
              ))}
            </div>

          </section>
        )}

        {/* Not Recommended */}
        {notRecommended.length > 0 && (
          <section className="mb-10">

            <h2 className="text-red-400 font-semibold text-lg mb-4">
              🔴 Not Recommended
            </h2>

            <div className="space-y-5">
              {notRecommended.map((scheme, index) => (
                <SchemeCard
                  key={index}
                  scheme={scheme}
                />
              ))}
            </div>

          </section>
        )}

        {/* Empty State */}
        {schemes.length === 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center">

            <div className="text-6xl mb-4">
              📭
            </div>

            <h3 className="text-white text-xl mb-2">
              No Matching Schemes Found
            </h3>

            <p className="text-zinc-500">
              Try another category or update profile details.
            </p>

          </div>
        )}

        {/* Reset */}
        <button
          onClick={onReset}
          className="
            w-full
            mt-10
            py-4
            rounded-2xl
            text-white
            font-medium
            bg-gradient-to-r
            from-violet-600
            to-purple-600
            hover:from-violet-500
            hover:to-purple-500
            transition-all
          "
        >
          ← Check Another Category
        </button>

      </div>

    </div>
  );
};

export default ResultsPage;