/**
 * Image to Text (OCR) — client-side via Tesseract.js
 */
export interface OcrResult {
  text: string;
  confidence: number;
}

export async function imageToText(
  file: File,
  onProgress?: (pct: number) => void
): Promise<OcrResult> {
  const { createWorker } = await import("tesseract.js");

  const worker = await createWorker("eng", 1, {
    logger: (m) => {
      if (m.status === "recognizing text" && onProgress) {
        onProgress(Math.round(m.progress * 100));
      }
    },
  });

  const url = URL.createObjectURL(file);
  const { data } = await worker.recognize(url);
  URL.revokeObjectURL(url);
  await worker.terminate();

  return { text: data.text.trim(), confidence: Math.round(data.confidence) };
}
