// src/lib/s3.ts or /lib/s3.ts
import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_KEY!,
  },
  forcePathStyle: true,
});
