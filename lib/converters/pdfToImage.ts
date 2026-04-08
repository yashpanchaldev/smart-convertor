export interface PageImage {
  dataUrl: string;
  page: number;
}

export async function pdfToImages(
  file: File,
  format: "jpeg" | "png" = "jpeg",
  scale = 2
): Promise<PageImage[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const results: PageImage[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    results.push({
      dataUrl: canvas.toDataURL(format === "jpeg" ? "image/jpeg" : "image/png", 0.92),
      page: i,
    });
  }

  return results;
}
