import { PDFDocument } from "pdf-lib";
import { uint8ToBlob } from "@/lib/utils";

export async function compressPdf(file: File): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const compressed = await doc.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });
  return uint8ToBlob(compressed, "application/pdf");
}
