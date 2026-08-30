import jsPDF from 'jspdf';
import { AIDetectionResult } from '../types';

export const exportPdfService = {
  generateReportPdf(report: AIDetectionResult) {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryColor = [22, 101, 52]; // forest green
    const darkGray = [30, 41, 59];
    const lightBg = [240, 253, 244];

    // Header Banner
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 28, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('CropGuard AI – Plant Pathology Diagnostic Report', 14, 14);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Report ID: ${report.id}  |  Generated: ${new Date(report.timestamp).toLocaleString()}`, 14, 22);

    // Section 1: Summary Box
    doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
    doc.roundedRect(14, 34, 182, 38, 3, 3, 'F');
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.roundedRect(14, 34, 182, 38, 3, 3, 'S');

    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`Identified Disease: ${report.disease.name}`, 18, 42);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(`Scientific Name: ${report.disease.scientificName} (${report.disease.pathogenType})`, 18, 48);

    doc.setFont('helvetica', 'normal');
    doc.text(`Crop: ${report.crop.name} (${report.crop.botanicalName})`, 18, 55);
    doc.text(`AI Confidence: ${report.confidence}%`, 18, 62);

    doc.setFont('helvetica', 'bold');
    let severityColor: [number, number, number] = [22, 163, 74];
    if (report.severity === 'Severe') severityColor = [220, 38, 38];
    else if (report.severity === 'Moderate') severityColor = [217, 119, 6];
    else if (report.severity === 'Mild') severityColor = [202, 138, 4];

    doc.setTextColor(severityColor[0], severityColor[1], severityColor[2]);
    doc.text(`Severity Status: ${report.severity.toUpperCase()}`, 120, 62);

    let yPos = 80;

    // Section 2: Visual Symptoms
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Visual Symptoms Detected on Leaf', 14, yPos);
    yPos += 6;

    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    report.visualSymptomsDetected.forEach((symptom) => {
      doc.text(`• ${symptom}`, 18, yPos);
      yPos += 5.5;
    });

    yPos += 4;

    // Section 3: Immediate Actions
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Immediate Action Steps for Farmer', 14, yPos);
    yPos += 6;

    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    report.immediateActions.forEach((action, idx) => {
      doc.text(`${idx + 1}. ${action}`, 18, yPos);
      yPos += 5.5;
    });

    yPos += 4;

    // Section 4: Organic Treatment
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Organic & Biological Remedies', 14, yPos);
    yPos += 6;

    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    report.organicTreatment.forEach((treatment) => {
      doc.text(`• ${treatment}`, 18, yPos);
      yPos += 5.5;
    });

    yPos += 4;

    // Section 5: Chemical Recommendations (if applicable)
    if (report.chemicalTreatment.length > 0) {
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Recommended Chemical Fungicides / Dosages', 14, yPos);
      yPos += 6;

      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      report.chemicalTreatment.forEach((chem) => {
        doc.setFont('helvetica', 'bold');
        doc.text(`• ${chem.name} (Dosage: ${chem.dosage})`, 18, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        doc.text(`  Instructions: ${chem.instructions}`, 22, yPos);
        yPos += 5;
        doc.setTextColor(180, 83, 9);
        doc.text(`  Safety: ${chem.safetyPrecautions}`, 22, yPos);
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        yPos += 6;
      });
    }

    yPos += 4;

    // Section 6: When to Contact Expert
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Expert Escalation Advisory', 14, yPos);
    yPos += 6;

    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text(report.whenToContactExpert, 18, yPos, { maxWidth: 175 });
    yPos += 14;

    // Disclaimer Box
    doc.setFillColor(254, 242, 242);
    doc.roundedRect(14, 260, 182, 22, 2, 2, 'F');
    doc.setDrawColor(239, 68, 68);
    doc.roundedRect(14, 260, 182, 22, 2, 2, 'S');

    doc.setTextColor(185, 28, 28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('Official Disclaimer:', 18, 266);
    doc.setFont('helvetica', 'normal');
    doc.text(report.disclaimer, 18, 272, { maxWidth: 174 });

    // Save and download
    doc.save(`CropGuard_${report.crop.name}_${report.disease.name.replace(/\s+/g, '_')}_Report.pdf`);
  }
};
