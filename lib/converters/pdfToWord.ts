/**
 * PDF to Word (DOCX) — client-side
 * Extracts text from PDF pages via pdf.js and builds a plain .docx using docx.js
 */
export async function pdfToWord(file: File): Promise<Blob> {
  const [{ getDocument, GlobalWorkerOptions }, docx] =
    await Promise.all([
      import("pdfjs-dist"),
      import("docx"),
    ]);

  const { Document, Packer, Paragraph, TextRun, HeadingLevel } = docx;

  GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paragraphs: InstanceType<typeof Paragraph>[] = [
    new Paragraph({
      text: file.name.replace(/\.pdf$/i, ""),
      heading: HeadingLevel.HEADING_1,
    }),
  ];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .trim();

    if (pageText) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: `Page ${i}`, bold: true, size: 20 })],
        }),
        new Paragraph({ text: pageText })
      );
    }
  }

  const doc = new Document({ sections: [{ children: paragraphs }] });
  return Packer.toBlob(doc);
}
