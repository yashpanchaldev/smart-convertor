export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getFileNameWithoutExt(name: string): string {
  return name.replace(/\.[^/.]+$/, "");
}

/** Safely wraps a Uint8Array from pdf-lib into a Blob, avoiding SharedArrayBuffer TS errors */
export function uint8ToBlob(bytes: Uint8Array, type: string): Blob {
  const ab = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  return new Blob([ab], { type });
}
