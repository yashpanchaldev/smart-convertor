export async function pdfToText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  // Dynamically import pdfjs to avoid SSR issues
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const texts: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
    texts.push(`--- Page ${i} ---\n${pageText}`);
  }

  return texts.join("\n\n");
}

export function getPageCount(text: string): number {
  return (text.match(/--- Page \d+ ---/g) ?? []).length;
}
