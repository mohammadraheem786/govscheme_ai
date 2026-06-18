import jsPDF from "jspdf";

export const generatePDF = (
  userProfile,
  schemes,
  summary
) => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text(
    "GovScheme AI Eligibility Report",
    20,
    y
  );

  y += 12;

  doc.setFontSize(10);

  doc.text(
    `Generated on: ${new Date().toLocaleDateString()}`,
    20,
    y
  );

  y += 15;

  // Profile
  doc.setFontSize(14);
  doc.text("Profile Summary", 20, y);

  y += 10;

  doc.setFontSize(11);

  const profileRows = [
    `Name: ${userProfile.fullName || "N/A"}`,
    `Age: ${userProfile.age || "N/A"}`,
    `Gender: ${userProfile.gender || "N/A"}`,
    `District: ${userProfile.district || "N/A"}`,
    `Category: ${userProfile.category || "N/A"}`,
    `Income: ₹${userProfile.annualIncome || 0}`
  ];

  profileRows.forEach((row) => {
    doc.text(row, 20, y);
    y += 7;
  });

  y += 8;

  // Summary
  doc.setFontSize(14);
  doc.text("Eligibility Summary", 20, y);

  y += 10;

  doc.setFontSize(11);

  doc.text(
    `Strong Matches: ${summary.eligible}`,
    20,
    y
  );

  y += 7;

  doc.text(
    `Possible Matches: ${summary.likelyEligible}`,
    20,
    y
  );

  y += 7;

  doc.text(
    `Not Recommended: ${summary.notRecommended}`,
    20,
    y
  );

  y += 15;

  // Schemes

  schemes.forEach((scheme) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);

    doc.text(
      scheme.schemeName || "Unknown Scheme",
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
      `Confidence Score: ${scheme.matchScore}%`,
      20,
      y
    );

    y += 8;

    if (scheme.whyMatched?.length) {
      doc.text("Why Matched:", 20, y);

      y += 6;

      scheme.whyMatched.forEach((item) => {
        doc.text(`• ${item}`, 25, y);
        y += 5;
      });
    }

    if (scheme.missingInformation?.length) {
      doc.text(
        "Information Needed:",
        20,
        y
      );

      y += 6;

      scheme.missingInformation.forEach(
        (item) => {
          doc.text(`• ${item}`, 25, y);
          y += 5;
        }
      );
    }

    if (scheme.benefits?.length) {
      doc.text("Benefits:", 20, y);

      y += 6;

      scheme.benefits.forEach((item) => {
        doc.text(`• ${item}`, 25, y);
        y += 5;
      });
    }

    if (scheme.documentsNeeded?.length) {
      doc.text(
        "Documents Needed:",
        20,
        y
      );

      y += 6;

      scheme.documentsNeeded.forEach(
        (item) => {
          doc.text(`• ${item}`, 25, y);
          y += 5;
        }
      );
    }

    if (scheme.nextStep) {
      doc.text(
        `Next Step: ${scheme.nextStep}`,
        20,
        y
      );

      y += 8;
    }

    y += 10;
  });

  doc.save("GovSchemeAI_Report.pdf");
};