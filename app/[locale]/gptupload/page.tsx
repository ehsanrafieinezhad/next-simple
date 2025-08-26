"use client";

import { useState } from "react";
import { MultipartUploader } from "@/lib/GptMultipartUploader";
import CircleProgress from "@/components/circle-progress";
import GptUploader from "@/components/gpt-upload";

export default function GptUpload() {
  const [progress, setProgress] = useState(0);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploader = new MultipartUploader(file, 5); // 5 MB per part
    await uploader.upload((p) => setProgress(p));

    alert("Upload complete!");
  }

  return (
    <div className="grid gap-2 m-6 p-6 rounded-lg bg-gray-50 min-h-48">
      this is gpt suggested upload format
      <div className="bg-blue-50 p-2 rounded-lg">
        <input type="file" onChange={handleUpload} />
        <p>Progress: {progress}%</p>

        <CircleProgress progress={99} size={40}/>
      </div>
      <GptUploader
        acceptedTypes="image/*"
        maxSizeInMB={5}
        onError={(err) => console.warn("Upload error:", err)}
      />
    </div>
  );
}
