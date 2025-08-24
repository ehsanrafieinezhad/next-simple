'use client'

import { useState } from "react";
import { usePresignedUpload } from "next-s3-upload";
import Image from "next/image";

export default function UploadComponent() {
  const [imageUrl, setImageUrl] = useState();
  const { FileInput, openFileDialog, uploadToS3 , files} = usePresignedUpload();

  const handleFileChange = async file => {
    const { url } = await uploadToS3(file);
    setImageUrl(url);
  };

  return (
    <div>
      <FileInput onChange={handleFileChange} />
      {files.map((file, index) =>(
        <div key={index}>
            File #{index} progress: {file.progress}%
        </div>
      ))}

      <button onClick={openFileDialog}>Upload file</button>

      {imageUrl && <Image width={200} height={200} src={imageUrl} alt="test"/>}
    </div>
  );
}