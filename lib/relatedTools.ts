export interface RelatedTool {
  title: string;
  href: string;
  description: string;
}

const relatedMap: Record<string, RelatedTool[]> = {
  "/tools/pdf-compress": [
    { title: "PDF Merge",    href: "/tools/pdf-merge",    description: "Combine multiple PDFs into one." },
    { title: "PDF Split",    href: "/tools/pdf-split",    description: "Split PDF into separate files." },
    { title: "PDF to Image", href: "/tools/pdf-to-image", description: "Export PDF pages as images." },
    { title: "PDF Rotate",   href: "/tools/pdf-rotate",   description: "Rotate PDF pages instantly." },
  ],
  "/tools/pdf-merge": [
    { title: "PDF Compress", href: "/tools/pdf-compress", description: "Reduce PDF file size." },
    { title: "PDF Split",    href: "/tools/pdf-split",    description: "Split PDF into parts." },
    { title: "PDF Rotate",   href: "/tools/pdf-rotate",   description: "Rotate PDF pages." },
    { title: "PDF to Image", href: "/tools/pdf-to-image", description: "Convert PDF pages to images." },
  ],
  "/tools/pdf-split": [
    { title: "PDF Merge",    href: "/tools/pdf-merge",    description: "Combine PDFs into one." },
    { title: "PDF Compress", href: "/tools/pdf-compress", description: "Reduce PDF file size." },
    { title: "PDF to Text",  href: "/tools/pdf-to-text",  description: "Extract text from PDF." },
    { title: "PDF Rotate",   href: "/tools/pdf-rotate",   description: "Rotate PDF pages." },
  ],
  "/tools/pdf-to-text": [
    { title: "PDF to Word",  href: "/tools/pdf-to-word",  description: "Convert PDF to editable Word." },
    { title: "Text to PDF",  href: "/tools/text-to-pdf",  description: "Convert text back to PDF." },
    { title: "PDF Compress", href: "/tools/pdf-compress", description: "Reduce PDF file size." },
    { title: "PDF to Image", href: "/tools/pdf-to-image", description: "Export PDF as images." },
  ],
  "/tools/pdf-to-word": [
    { title: "PDF to Text",  href: "/tools/pdf-to-text",  description: "Extract plain text from PDF." },
    { title: "DOC to PDF",   href: "/tools/doc-to-pdf",   description: "Convert Word back to PDF." },
    { title: "PDF Compress", href: "/tools/pdf-compress", description: "Reduce PDF file size." },
    { title: "Text to PDF",  href: "/tools/text-to-pdf",  description: "Convert text to PDF." },
  ],
  "/tools/text-to-pdf": [
    { title: "PDF to Text",  href: "/tools/pdf-to-text",  description: "Extract text from PDF." },
    { title: "DOC to PDF",   href: "/tools/doc-to-pdf",   description: "Convert Word to PDF." },
    { title: "HTML to PDF",  href: "/tools/html-to-pdf",  description: "Convert HTML to PDF." },
    { title: "PDF Compress", href: "/tools/pdf-compress", description: "Compress the result." },
  ],
  "/tools/doc-to-pdf": [
    { title: "PDF to Word",  href: "/tools/pdf-to-word",  description: "Convert PDF back to Word." },
    { title: "Text to PDF",  href: "/tools/text-to-pdf",  description: "Convert plain text to PDF." },
    { title: "HTML to PDF",  href: "/tools/html-to-pdf",  description: "Convert HTML to PDF." },
    { title: "PDF Compress", href: "/tools/pdf-compress", description: "Compress the result." },
  ],
  "/tools/html-to-pdf": [
    { title: "Text to PDF",  href: "/tools/text-to-pdf",  description: "Convert plain text to PDF." },
    { title: "DOC to PDF",   href: "/tools/doc-to-pdf",   description: "Convert Word to PDF." },
    { title: "PDF Compress", href: "/tools/pdf-compress", description: "Compress the result." },
    { title: "PDF Merge",    href: "/tools/pdf-merge",    description: "Merge multiple PDFs." },
  ],
  "/tools/pdf-to-image": [
    { title: "Image Compress",  href: "/tools/image-compress",  description: "Compress the exported images." },
    { title: "Image to PDF",    href: "/tools/image-to-pdf",    description: "Convert images back to PDF." },
    { title: "PDF Compress",    href: "/tools/pdf-compress",    description: "Compress PDF first." },
    { title: "Resize Image",    href: "/tools/image-resize",    description: "Resize exported images." },
  ],
  "/tools/pdf-rotate": [
    { title: "PDF Compress", href: "/tools/pdf-compress", description: "Reduce PDF file size." },
    { title: "PDF Merge",    href: "/tools/pdf-merge",    description: "Combine PDFs." },
    { title: "PDF Split",    href: "/tools/pdf-split",    description: "Split PDF pages." },
    { title: "PDF to Image", href: "/tools/pdf-to-image", description: "Export pages as images." },
  ],
  "/tools/image-compress": [
    { title: "Resize Image",  href: "/tools/image-resize",  description: "Resize to exact dimensions." },
    { title: "Image to PDF",  href: "/tools/image-to-pdf",  description: "Combine images into PDF." },
    { title: "JPG to PNG",    href: "/tools/jpg-to-png",    description: "Convert JPG to PNG." },
    { title: "PNG to WebP",   href: "/tools/png-to-webp",   description: "Convert to smaller WebP." },
  ],
  "/tools/image-resize": [
    { title: "Image Compress", href: "/tools/image-compress", description: "Compress after resizing." },
    { title: "Image to PDF",   href: "/tools/image-to-pdf",   description: "Convert to PDF." },
    { title: "JPG to PNG",     href: "/tools/jpg-to-png",     description: "Convert format." },
    { title: "Image Convert",  href: "/tools/image-convert",  description: "Convert between formats." },
  ],
  "/tools/image-to-pdf": [
    { title: "Image Compress", href: "/tools/image-compress", description: "Compress images first." },
    { title: "PDF Compress",   href: "/tools/pdf-compress",   description: "Compress the result." },
    { title: "PDF Merge",      href: "/tools/pdf-merge",      description: "Merge with other PDFs." },
    { title: "Resize Image",   href: "/tools/image-resize",   description: "Resize before converting." },
  ],
  "/tools/image-to-text": [
    { title: "PDF to Text",    href: "/tools/pdf-to-text",    description: "Extract text from PDF." },
    { title: "Image Compress", href: "/tools/image-compress", description: "Compress images." },
    { title: "Image to PDF",   href: "/tools/image-to-pdf",   description: "Convert image to PDF." },
    { title: "Text to PDF",    href: "/tools/text-to-pdf",    description: "Convert extracted text to PDF." },
  ],
  "/tools/image-convert": [
    { title: "Image Compress", href: "/tools/image-compress", description: "Compress after converting." },
    { title: "JPG to PNG",     href: "/tools/jpg-to-png",     description: "Quick JPG to PNG." },
    { title: "PNG to WebP",    href: "/tools/png-to-webp",    description: "Convert to WebP." },
    { title: "SVG to PNG",     href: "/tools/svg-to-png",     description: "Rasterize SVG." },
  ],
  "/tools/jpg-to-png": [
    { title: "PNG to JPG",     href: "/tools/png-to-jpg",     description: "Convert PNG back to JPG." },
    { title: "Image Compress", href: "/tools/image-compress", description: "Compress the result." },
    { title: "PNG to WebP",    href: "/tools/png-to-webp",    description: "Convert PNG to WebP." },
    { title: "Image Convert",  href: "/tools/image-convert",  description: "All format conversions." },
  ],
  "/tools/png-to-jpg": [
    { title: "JPG to PNG",     href: "/tools/jpg-to-png",     description: "Convert JPG back to PNG." },
    { title: "Image Compress", href: "/tools/image-compress", description: "Compress the result." },
    { title: "Image Convert",  href: "/tools/image-convert",  description: "All format conversions." },
    { title: "Image to PDF",   href: "/tools/image-to-pdf",   description: "Convert to PDF." },
  ],
  "/tools/png-to-webp": [
    { title: "Image Compress", href: "/tools/image-compress", description: "Compress images." },
    { title: "JPG to PNG",     href: "/tools/jpg-to-png",     description: "Convert JPG to PNG." },
    { title: "Image Convert",  href: "/tools/image-convert",  description: "All format conversions." },
    { title: "SVG to PNG",     href: "/tools/svg-to-png",     description: "Convert SVG to PNG." },
  ],
  "/tools/svg-to-png": [
    { title: "Image Compress", href: "/tools/image-compress", description: "Compress the result." },
    { title: "Image to SVG",   href: "/tools/image-to-svg",   description: "Convert image to SVG." },
    { title: "PNG to WebP",    href: "/tools/png-to-webp",    description: "Convert PNG to WebP." },
    { title: "Image Convert",  href: "/tools/image-convert",  description: "All format conversions." },
  ],
  "/tools/image-to-svg": [
    { title: "SVG to PNG",     href: "/tools/svg-to-png",     description: "Convert SVG back to PNG." },
    { title: "Image Compress", href: "/tools/image-compress", description: "Compress images." },
    { title: "Image Convert",  href: "/tools/image-convert",  description: "All format conversions." },
    { title: "Image to PDF",   href: "/tools/image-to-pdf",   description: "Convert to PDF." },
  ],
  "/tools/qr-code": [
    { title: "Image Compress", href: "/tools/image-compress", description: "Compress the QR image." },
    { title: "Image to PDF",   href: "/tools/image-to-pdf",   description: "Embed QR in a PDF." },
    { title: "PNG to WebP",    href: "/tools/png-to-webp",    description: "Convert QR to WebP." },
    { title: "Base64",         href: "/tools/base64",         description: "Encode data to Base64." },
  ],
  "/tools/json-formatter": [
    { title: "Base64 Encode/Decode", href: "/tools/base64",         description: "Encode/decode Base64." },
    { title: "Text to PDF",          href: "/tools/text-to-pdf",    description: "Convert text to PDF." },
    { title: "PDF to Text",          href: "/tools/pdf-to-text",    description: "Extract text from PDF." },
  ],
  "/tools/base64": [
    { title: "JSON Formatter",  href: "/tools/json-formatter", description: "Format and validate JSON." },
    { title: "Text to PDF",     href: "/tools/text-to-pdf",    description: "Convert text to PDF." },
    { title: "Image Compress",  href: "/tools/image-compress", description: "Compress images." },
  ],
};

export function getRelatedTools(currentPath: string): RelatedTool[] {
  return relatedMap[currentPath] ?? [];
}
