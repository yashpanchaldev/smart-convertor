"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import PreviewPanel from "@/components/PreviewPanel";
import ProgressBar from "@/components/ProgressBar";
import { downloadBlob } from "@/lib/utils";

type State = "idle" | "processing" | "done";

export default function HtmlToPdfPage() {
  const [state, setState] = useState<State>("idle");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [fileSize, setFileSize] = useState<number>(0);

  const convert = async (html: string) => {
    setState("processing");
    try {
      const { htmlToPdf } = await import("@/lib/converters/htmlToPdf");
      const blob = await htmlToPdf(html);
      const url = URL.createObjectURL(blob);
      setFileSize(blob.size);
      setPdfBlob(blob);
      setPdfUrl(url);
      setState("done");
    } catch {
      setState("idle");
      alert("Conversion failed. Please check your HTML and try again.");
    }
  };

  const handleFile = async (file: File) => {
    const html = await file.text();
    await convert(html);
  };

  const reset = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    setPdfBlob(null);
    setState("idle");
  };

  return (
    <ToolLayout
      title="HTML to PDF"
      description="Paste HTML markup or upload an .html file and render it as a PDF."
    >
      {state === "idle" && (
        <UploadBox
          accept=".html,.htm,text/html"
          acceptLabel=".html files"
          onFile={handleFile}
          onText={convert}
          showPaste
        />
      )}
      {state === "processing" && <ProgressBar label="Rendering HTML to PDF..." />}
      {state === "done" && pdfUrl && (
        <PreviewPanel
          type="pdf"
          url={pdfUrl}
          fileName="converted.pdf"
          fileSize={fileSize}
          onDownload={() => pdfBlob && downloadBlob(pdfBlob, "converted.pdf")}
          onReset={reset}
          suggestions={["Compress file?", "Apply template?"]}
        />
      )}
    </ToolLayout>
  );
}
