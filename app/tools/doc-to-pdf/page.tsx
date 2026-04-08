"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import UploadBox from "@/components/UploadBox";
import PreviewPanel from "@/components/PreviewPanel";
import ProgressBar from "@/components/ProgressBar";
import { downloadBlob, getFileNameWithoutExt } from "@/lib/utils";

type State = "idle" | "processing" | "done";

export default function DocToPdfPage() {
  const [state, setState] = useState<State>("idle");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [fileSize, setFileSize] = useState<number>(0);
  const [fileName, setFileName] = useState<string>("");

  const handleFile = async (file: File) => {
    setState("processing");
    setFileName(file.name);
    try {
      const { docToPdf } = await import("@/lib/converters/docToPdf");
      const blob = await docToPdf(file);
      const url = URL.createObjectURL(blob);
      setFileSize(blob.size);
      setPdfBlob(blob);
      setPdfUrl(url);
      setState("done");
    } catch {
      setState("idle");
      alert("Conversion failed. Make sure the file is a valid .docx document.");
    }
  };

  const reset = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    setPdfBlob(null);
    setState("idle");
  };

  return (
    <ToolLayout
      title="DOC to PDF"
      description="Upload a Word document (.docx) and convert it to a PDF instantly."
    >
      {state === "idle" && (
        <UploadBox
          accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          acceptLabel=".docx files"
          onFile={handleFile}
        />
      )}
      {state === "processing" && <ProgressBar label="Converting document to PDF..." />}
      {state === "done" && pdfUrl && (
        <PreviewPanel
          type="pdf"
          url={pdfUrl}
          fileName={`${getFileNameWithoutExt(fileName)}.pdf`}
          fileSize={fileSize}
          onDownload={() => pdfBlob && downloadBlob(pdfBlob, `${getFileNameWithoutExt(fileName)}.pdf`)}
          onReset={reset}
          suggestions={["Compress file?", "Apply template?"]}
        />
      )}
    </ToolLayout>
  );
}
