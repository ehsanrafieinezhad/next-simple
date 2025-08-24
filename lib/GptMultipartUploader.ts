// utils/MultipartUploader.ts

export type UploadPart = { PartNumber: number; ETag: string };

export class MultipartUploader {
  private file: File;
  private partSize: number;
  private uploadId: string | null = null;
  private uploadedParts: UploadPart[] = [];

  constructor(file: File, partSizeMB = 5) {
    this.file = file;
    this.partSize = partSizeMB * 1024 * 1024; // default 5MB
  }

  /** Step 1: Start upload session */
  private async startUpload() {
    const res = await fetch("/api/gpt-storage/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: this.file.name, contentType: this.file.type }),
    });
    const { uploadId } = await res.json();
    this.uploadId = uploadId;
  }

  /** Step 2: Request presigned URL for a specific part */
  private async getPresignedUrl(partNumber: number): Promise<string> {
    const res = await fetch("/api/gpt-storage/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: this.file.name,
        uploadId: this.uploadId,
        partNumbers: [partNumber],
      }),
    });
    const { urls } = await res.json();
    return urls[0].url;
  }

  /** Step 3: Upload a single chunk */
  private async uploadPart(partNumber: number, chunk: Blob) {
    const url = await this.getPresignedUrl(partNumber);

    const res = await fetch(url, { method: "PUT", body: chunk });
    if (!res.ok) throw new Error(`Upload failed at part ${partNumber}`);

    const eTag = res.headers.get("ETag")?.replace(/"/g, "");
    if (!eTag) throw new Error("Missing ETag in response");

    this.uploadedParts.push({ PartNumber: partNumber, ETag: eTag });
  }

  /** Step 4: Complete upload */
  private async completeUpload() {
    await fetch("/api/gpt-storage/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: this.file.name,
        uploadId: this.uploadId,
        parts: this.uploadedParts.sort((a, b) => a.PartNumber - b.PartNumber),
      }),
    });
  }

  /** Public: Upload whole file */
  async upload(onProgress?: (progress: number) => void) {
    await this.startUpload();

    let partNumber = 1;
    for (let i = 0; i < this.file.size; i += this.partSize) {
      const chunk = this.file.slice(i, i + this.partSize);
      await this.uploadPart(partNumber, chunk);

      // progress callback (0–100%)
      if (onProgress) {
        const percent = Math.round(((i + chunk.size) / this.file.size) * 100);
        onProgress(percent);
      }

      partNumber++;
    }

    await this.completeUpload();
  }
}
