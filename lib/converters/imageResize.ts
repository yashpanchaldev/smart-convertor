export interface ResizeResult {
  blob: Blob;
  url: string;
  width: number;
  height: number;
}

export async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  maintainAspect = true
): Promise<ResizeResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const srcUrl = URL.createObjectURL(file);

    img.onload = () => {
      let w = targetWidth;
      let h = targetHeight;

      if (maintainAspect) {
        const ratio = img.naturalWidth / img.naturalHeight;
        if (targetWidth && !targetHeight) {
          h = Math.round(targetWidth / ratio);
        } else if (targetHeight && !targetWidth) {
          w = Math.round(targetHeight * ratio);
        } else {
          // fit within box
          const scaleW = targetWidth / img.naturalWidth;
          const scaleH = targetHeight / img.naturalHeight;
          const scale = Math.min(scaleW, scaleH);
          w = Math.round(img.naturalWidth * scale);
          h = Math.round(img.naturalHeight * scale);
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(srcUrl);

      canvas.toBlob(
        (blob) => {
          if (!blob) { reject(new Error("Resize failed")); return; }
          resolve({ blob, url: URL.createObjectURL(blob), width: w, height: h });
        },
        file.type || "image/jpeg",
        0.92
      );
    };

    img.onerror = reject;
    img.src = srcUrl;
  });
}

export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = url;
  });
}
