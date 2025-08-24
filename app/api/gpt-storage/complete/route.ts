// app/api/storage/multipart/complete/route.ts
import { NextResponse } from "next/server";
import { CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";

export async function POST(req: Request) {
  const { key, uploadId, parts } = await req.json();
  // parts = [{ PartNumber: 1, ETag: "etag-123" }, ...]

  const command = new CompleteMultipartUploadCommand({
    Bucket: process.env.LIARA_BUCKET_NAME!,
    Key: key,
    UploadId: uploadId,
    MultipartUpload: {
      Parts: parts,
    },
  });

  const response = await s3.send(command);

  return NextResponse.json({ success: true, location: response.Location });
}
