"use client";

import { useState } from "react";
import { usePresignedUpload } from "next-s3-upload";

export default function UploadImages() {
  const [urls, setUrls] = useState([]);
  const { uploadToS3, files } = usePresignedUpload();

  const handleFilesChange = async ({ target }) => {
  const files = Array.from(target.files);

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    try {
      const { url } = await uploadToS3(file);
      setUrls((current) => [...current, url]);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  }
};


  return (
    <div>
      <input
        type="file"
        name="file"
        multiple={true}
        onChange={handleFilesChange}
      />

      <div>
        {files.map((file, index) => (
          <div key={index}>
            File #{index} progress: {file.progress}%
          </div>
        ))}
        {urls.map((url, index) => (
          <div key={url}>
            File {index}: ${url}
          </div>
        ))}
      </div>
    </div>
  );
}
