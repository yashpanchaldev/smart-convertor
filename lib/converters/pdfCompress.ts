import { PDFDocument } from "pdf-lib";

export async function compressPdf(file: File): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  // pdf-lib re-serializes the PDF which removes redundant objects and compresses streams
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const compressed = await doc.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });
  return new Blob([compressed], { type: "application/pdf" });
}
