export type ImageFormat = "jpeg" | "png" | "webp" | "svg";

export interface ConvertResult {
  blob: Blob;
  url: string;
  format: ImageFormat;
}

/** Rasterize any image (including SVG) to jpeg/png/webp via canvas */
export async function convertImageFormat(
  file: File,
  targetFormat: ImageFormat,
  quality = 0.92
): Promise<ConvertResult> {
  // SVG output — wrap raster image as inline SVG
  if (targetFormat === "svg") {
    return rasterToSvg(file);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const srcUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;

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

    img.onerror = () => { URL.revokeObjectURL(srcUrl); reject(new Error("Failed to load image")); };
    img.src = srcUrl;
  });
}

/** Wrap a raster image as an SVG <image> element */
async function rasterToSvg(file: File): Promise<ConvertResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const srcUrl = URL.createObjectURL(file);

    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;

      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <image href="${dataUrl}" width="${w}" height="${h}" />
</svg>`;
        const blob = new Blob([svg], { type: "image/svg+xml" });
        URL.revokeObjectURL(srcUrl);
        resolve({ blob, url: URL.createObjectURL(blob), format: "svg" });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    };

    img.onerror = () => { URL.revokeObjectURL(srcUrl); reject(new Error("Failed to load image")); };
    img.src = srcUrl;
  });
}
