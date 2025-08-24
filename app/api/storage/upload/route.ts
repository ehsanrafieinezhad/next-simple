// src/app/api/storage/upload/route.ts or /app/api/storage/upload/route.ts
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const myfile = 'test/'+file.name;

  const command = new PutObjectCommand({
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: myfile,
    Body: buffer,
    ContentType: file.type,
  });

  await s3.send(command);

  return Response.json({ message: "File uploaded" });
}
