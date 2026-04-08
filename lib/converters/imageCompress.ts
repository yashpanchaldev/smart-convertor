import imageCompression from "browser-image-compression";

export interface CompressResult {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  url: string;
}

export async function compressImage(
  file: File,
  maxSizeMB = 1,
  maxWidthOrHeight = 1920
): Promise<CompressResult> {
  const compressed = await imageCompression(file, {
    maxSizeMB,
    maxWidthOrHeight,
    useWebWorker: true,
    fileType: file.type as "image/jpeg" | "image/png" | "image/webp",
  });

  const url = URL.createObjectURL(compressed);
  return {
    blob: compressed,
    originalSize: file.size,
    compressedSize: compressed.size,
    url,
  };
}
