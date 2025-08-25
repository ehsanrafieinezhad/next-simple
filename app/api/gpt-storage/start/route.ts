// app/api/storage/multipart/start/route.ts
import { NextResponse } from "next/server";
import { CreateMultipartUploadCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";

export async function POST(req: Request) {
  const { key, contentType } = await req.json();

  const command = new CreateMultipartUploadCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: key,
    ContentType: contentType,
  });

  const { UploadId } = await s3.send(command);

  return NextResponse.json({ uploadId: UploadId });
}
