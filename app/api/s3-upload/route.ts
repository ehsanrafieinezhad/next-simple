// app/api/s3-upload/route.js
import { POST as APIRoute } from "next-s3-upload/route";

console.log("S3_UPLOAD_BUCKET:", process.env.S3_UPLOAD_BUCKET);

export const POST = APIRoute.configure({
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
  bucket: process.env.S3_UPLOAD_BUCKET,
  region: process.env.S3_UPLOAD_REGION,
  endpoint: process.env.S3_UPLOAD_ENDPOINT
});