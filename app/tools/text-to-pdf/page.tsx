"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import PreviewPanel from "@/components/PreviewPanel";
import ProgressBar from "@/components/ProgressBar";
import { downloadBlob, countWords } from "@/lib/utils";

type State = "idle" | "processing" | "done";

export default function TextToPdfPage() {
  const [state, setState] = useState<State>("idle");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [wordCount, setWordCount] = useState<number>(0);
  const [fileSize, setFileSize] = useState<number>(0);

  const convert = async (text: string) => {
    setState("processing");
    try {
      const { textToPdf } = await import("@/lib/converters/textToPdf");
      const blob = await textToPdf(text);
      const url = URL.createObjectURL(blob);
      setWordCount(countWords(text));
      setFileSize(blob.size);
      setPdfBlob(blob);
      setPdfUrl(url);
      setState("done");
    } catch {
      setState("idle");
      alert("Conversion failed. Please try again.");
    }
  };

  const handleFile = async (file: File) => {
    const text = await file.text();
    await convert(text);
  };

  const reset = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    setPdfBlob(null);
    setState("idle");
  };

  return (
    <ToolLayout
      title="Text to PDF"
      description="Paste your text or upload a .txt file and get a clean PDF instantly."
    >
      {state === "idle" && (
        <UploadBox
          accept=".txt,text/plain"
          acceptLabel=".txt files"
          onFile={handleFile}
          onText={convert}
          showPaste
        />
      )}
      {state === "processing" && <ProgressBar label="Converting text to PDF..." />}
      {state === "done" && pdfUrl && (
        <PreviewPanel
          type="pdf"
          url={pdfUrl}
          fileName="converted.pdf"
          fileSize={fileSize}
          wordCount={wordCount}
          onDownload={() => pdfBlob && downloadBlob(pdfBlob, "converted.pdf")}
          onReset={reset}
          suggestions={["Compress file?", "Apply template?"]}
        />
      )}
    </ToolLayout>
  );
}
