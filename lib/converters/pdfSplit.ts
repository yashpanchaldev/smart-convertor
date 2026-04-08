import { PDFDocument } from "pdf-lib";
import { uint8ToBlob } from "@/lib/utils";

export interface SplitResult {
  blob: Blob;
  name: string;
  pages: number;
}

export async function splitPdf(
  file: File,
  ranges: Array<{ from: number; to: number }>
): Promise<SplitResult[]> {
  const bytes = await file.arrayBuffer();
  const src = await PDFDocument.load(bytes);
  const results: SplitResult[] = [];

  for (let i = 0; i < ranges.length; i++) {
    const { from, to } = ranges[i];
    const doc = await PDFDocument.create();
    const indices = Array.from(
      { length: to - from + 1 },
      (_, k) => from - 1 + k
    ).filter((idx) => idx >= 0 && idx < src.getPageCount());

    const copied = await doc.copyPages(src, indices);
    copied.forEach((p) => doc.addPage(p));

    const outBytes = await doc.save();
    results.push({
      blob: uint8ToBlob(outBytes, "application/pdf"),
      name: `split-part-${i + 1}.pdf`,
      pages: copied.length,
    });
  }

  return results;
}

export async function getPdfPageCount(file: File): Promise<number> {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  return doc.getPageCount();
}
