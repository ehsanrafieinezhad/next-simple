// src/app/storage/page.tsx
'use client';

import { useEffect, useState } from 'react';

type StoredFile = {
  Key: string;
};

export default function FileManager() {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchFiles = async () => {
    const res = await fetch('/api/storage/list-files');
    const data = await res.json();
    setFiles((data.files as StoredFile[]) || []);
  };

  const uploadFile = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/storage/upload', {
      method: 'POST',
      body: formData,
    });
    setLoading(false);
    if (res.ok) {
      setMessage({ type: 'success', text: 'Upload Successful' });
      fetchFiles();
    } else {
      setMessage({ type: 'error', text: 'Error uploading file' });
    }
  };

  const deleteFile = async (key: string) => {
    const res = await fetch('/api/storage/delete', {
      method: 'DELETE',
      body: JSON.stringify({ key }),
    });
    if (res.ok) {
      setMessage({ type: 'success', text: 'File deleted successfully' });
      fetchFiles();
    } else {
      setMessage({ type: 'error', text: 'Error deleting file' });
    }
  };

  const downloadFile = async (key: string) => {
    const res = await fetch('/api/storage/presigned', {
      method: 'POST',
      body: JSON.stringify({ key }),
    });
    const data = await res.json();
    window.open(data.url, '_blank');
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Managing Files</h1>

      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <input
          type="file"
          className="border rounded px-2 py-1 w-full"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          onClick={uploadFile}
          disabled={loading || !file}
          className={`px-4 py-2 rounded text-white ${
            loading || !file ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Uploading...' : 'Upload File'}
        </button>
      </div>

      <div className="grid gap-2">
        {files.map((file) => (
          <div
            key={file.Key}
            className="flex items-center justify-between border rounded p-2 shadow-sm"
          >
            <span className="flex-1 break-words">{file.Key}</span>

            <div className="flex gap-2">
              <button
                onClick={() => downloadFile(file.Key)}
                className="px-3 py-1 rounded border hover:bg-gray-100"
              >
                Download
              </button>
              <button
                onClick={() => deleteFile(file.Key)}
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
