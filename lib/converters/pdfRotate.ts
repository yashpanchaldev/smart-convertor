/**
 * PDF Rotate — client-side via pdf-lib
 */
export type RotateAngle = 90 | 180 | 270;

export async function rotatePdf(
  file: File,
  angle: RotateAngle,
  pageIndices?: number[] // undefined = all pages
): Promise<Blob> {
  const { PDFDocument, degrees } = await import("pdf-lib");

  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();

  const targets = pageIndices ?? pages.map((_, i) => i);
  for (const idx of targets) {
    if (idx >= 0 && idx < pages.length) {
      const page = pages[idx];
      const current = page.getRotation().angle;
      page.setRotation(degrees((current + angle) % 360));
    }
  }

  const bytes = await pdfDoc.save();
  return new Blob([bytes], { type: "application/pdf" });
}
