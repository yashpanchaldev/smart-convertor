export type ImageFormat = "jpeg" | "png" | "webp";

export interface ConvertResult {
  blob: Blob;
  url: string;
  format: ImageFormat;
}

export async function convertImageFormat(
  file: File,
  targetFormat: ImageFormat,
  quality = 0.92
): Promise<ConvertResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const srcUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;

      // Fill white background for JPEG (no transparency)
      if (targetFormat === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(srcUrl);

      const mimeType = `image/${targetFormat}`;
      canvas.toBlob(
        (blob) => {
          if (!blob) { reject(new Error("Conversion failed")); return; }
          resolve({ blob, url: URL.createObjectURL(blob), format: targetFormat });
        },
        mimeType,
        quality
      );
    };

    img.onerror = reject;
    img.src = srcUrl;
  });
}
