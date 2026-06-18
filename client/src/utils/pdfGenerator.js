import jsPDF from "jspdf";

export const generatePDF = (
  userProfile,
  schemes,
  summary
) => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(18);
  doc.text("GovScheme AI Eligibility Report", 20, y);

  y += 15;

  doc.setFontSize(12);

  doc.text(
    `Name: ${userProfile.fullName || "N/A"}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `District: ${userProfile.district || "N/A"}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Annual Income: ₹${userProfile.annualIncome || 0}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Category: ${userProfile.category || "N/A"}`,
    20,
    y
  );

  y += 15;

  doc.setFontSize(14);
  doc.text("Eligibility Summary", 20, y);

  y += 10;

  doc.setFontSize(11);

  doc.text(
    `Strong Matches: ${summary.eligible}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Possible Matches: ${summary.likelyEligible}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Not Recommended: ${summary.notRecommended}`,
    20,
    y
  );

  y += 15;

  schemes.forEach((scheme) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(13);

    doc.text(
      `${scheme.schemeName}`,
      20,
      y
    );

    y += 8;

    doc.setFontSize(10);

    doc.text(
      `Status: ${scheme.status}`,
      20,
      y
    );

    y += 6;

    doc.text(
      `Match Score: ${scheme.matchScore}%`,
      20,
      y
    );

    y += 6;

    if (scheme.benefits?.length) {
      doc.text(
        `Benefits: ${scheme.benefits.join(", ")}`,
        20,
        y
      );

      y += 6;
    }

    y += 5;
  });

  doc.save("GovSchemeAI_Report.pdf");
};