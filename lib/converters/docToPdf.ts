import { jsPDF } from "jspdf";

export async function docToPdf(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();

  // Dynamically import mammoth to avoid SSR issues
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ arrayBuffer });
  const text = result.value;

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;
  const maxWidth = pageWidth - margin * 2;
  const lineHeight = 16;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

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
