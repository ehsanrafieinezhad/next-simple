"use client";

import UploadComponent from "@/components/upload";
import UploadImages from "@/components/upload-images";

export default function Upload() {
  return (
    <div className="p-8 grid gap-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        upload file in simple way with presigned
        <UploadComponent />
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        upload miltiple UploadImages
        <UploadImages />
      </div>
    </div>
  );
}
