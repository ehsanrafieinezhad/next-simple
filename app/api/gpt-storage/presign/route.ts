// app/api/storage/multipart/presign/route.ts
import { NextResponse } from "next/server";
import { UploadPartCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/lib/s3";

export async function POST(req: Request) {
  const { key, uploadId, partNumbers } = await req.json(); 
  // partNumbers = [1,2,3,...]

  const urls: { partNumber: number; url: string }[] = [];

  for (const partNumber of partNumbers) {
    const command = new UploadPartCommand({
      Bucket: process.env.LIARA_BUCKET_NAME!,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNumber,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 * 15 });
    urls.push({ partNumber, url });
  }

  return NextResponse.json({ urls });
}
