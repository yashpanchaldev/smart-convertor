import { jsPDF } from "jspdf";

export async function textToPdf(text: string, fileName = "converted"): Promise<Blob> {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;
  const maxWidth = pageWidth - margin * 2;
  const lineHeight = 16;
  const fontSize = 11;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(fontSize);

  const lines = doc.splitTextToSize(text, maxWidth) as string[];
  let y = margin;

  for (const line of lines) {
    if (y + lineHeight > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += lineHeight;
  }

  return doc.output("blob");
}
