// app/api/s3-upload/route.js
import { POST as APIRoute } from "next-s3-upload/route";

console.log("S3_UPLOAD_BUCKET:", process.env.S3_UPLOAD_BUCKET);

export const POST = APIRoute.configure({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  bucket: process.env.BUCKET_NAME,
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT
});