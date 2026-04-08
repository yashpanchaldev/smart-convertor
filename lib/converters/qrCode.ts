/**
 * QR Code Generator — client-side via qrcode
 */
export interface QrOptions {
  text: string;
  size?: number;       // px, default 300
  darkColor?: string;  // default #000000
  lightColor?: string; // default #ffffff
}

export async function generateQrCode(opts: QrOptions): Promise<Blob> {
  const QRCode = (await import("qrcode")).default;

  const canvas = document.createElement("canvas");
  await QRCode.toCanvas(canvas, opts.text, {
    width: opts.size ?? 300,
    color: {
      dark: opts.darkColor ?? "#000000",
      light: opts.lightColor ?? "#ffffff",
    },
    errorCorrectionLevel: "H",
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("QR generation failed"));
    }, "image/png");
  });
}
