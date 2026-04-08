import { PDFDocument } from "pdf-lib";
import { uint8ToBlob } from "@/lib/utils";

export async function imagesToPdf(files: File[]): Promise<Blob> {
  const doc = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const mime = file.type;

    let img;
    if (mime === "image/jpeg" || mime === "image/jpg") {
      img = await doc.embedJpg(bytes);
    } else if (mime === "image/png") {
      img = await doc.embedPng(bytes);
    } else {
      const blob = await convertToBlob(file, "image/png");
      const pngBytes = await blob.arrayBuffer();
      img = await doc.embedPng(pngBytes);
    }

    const page = doc.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
  }

  const bytes = await doc.save();
  return uint8ToBlob(bytes, "application/pdf");
}

function convertToBlob(file: File, mimeType: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      canvas.toBlob((b) => {
        URL.revokeObjectURL(url);
        b ? resolve(b) : reject(new Error("Canvas toBlob failed"));
      }, mimeType);
    };
    img.onerror = reject;
    img.src = url;
  });
}
