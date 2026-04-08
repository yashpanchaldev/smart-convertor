"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import PreviewPanel from "@/components/PreviewPanel";
import ProgressBar from "@/components/ProgressBar";
import { downloadBlob, countWords } from "@/lib/utils";

type State = "idle" | "processing" | "done";

export default function PdfToTextPage() {
  const [state, setState] = useState<State>("idle");
  const [extractedText, setExtractedText] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(0);
  const [fileSize, setFileSize] = useState<number>(0);
  const [fileName, setFileName] = useState<string>("");

  const handleFile = async (file: File) => {
    setState("processing");
    setFileName(file.name);
    setFileSize(file.size);
    try {
      const { pdfToText, getPageCount } = await import("@/lib/converters/pdfToText");
      const text = await pdfToText(file);
      setExtractedText(text);
      setPageCount(getPageCount(text));
      setState("done");
    } catch {
      setState("idle");
      alert("Could not extract text. Make sure the PDF contains selectable text.");
    }
  };

  const reset = () => {
    setExtractedText("");
    setState("idle");
  };

  const download = () => {
    const blob = new Blob([extractedText], { type: "text/plain" });
    downloadBlob(blob, fileName.replace(".pdf", ".txt") || "extracted.txt");
  };

  return (
    <ToolLayout
      title="PDF to Text"
      description="Extract all text from a PDF file. Supports multi-page documents."
    >
      {state === "idle" && (
        <UploadBox
          accept=".pdf,application/pdf"
          acceptLabel=".pdf files"
          onFile={handleFile}
        />
      )}
      {state === "processing" && <ProgressBar label="Extracting text from PDF..." />}
      {state === "done" && (
        <PreviewPanel
          type="text"
          text={extractedText}
          fileName={fileName}
          fileSize={fileSize}
          pageCount={pageCount}
          wordCount={countWords(extractedText)}
          onDownload={download}
          onReset={reset}
          suggestions={["Summarize text?", "Convert to bullet points?"]}
        />
      )}
    </ToolLayout>
  );
}
