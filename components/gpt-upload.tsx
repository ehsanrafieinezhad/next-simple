import React, { useState, useRef } from 'react';

// Props interface
interface GptUploaderProps {
  acceptedTypes?: string; // e.g., '.png,.jpg,.gif' or 'image/*'
  maxSizeInMB?: number;  // e.g., 10 for 10MB
  onError?: (error: string) => void;
}

const GptUploader: React.FC<GptUploaderProps> = ({
  acceptedTypes = 'image/*',
  maxSizeInMB = 10,
  onError,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  // Validate file type
  const isValidFileType = (file: File): boolean => {
    if (!acceptedTypes) return true;

    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    const mimeType = file.type.toLowerCase();
    const allowedTypes = acceptedTypes.split(',').map(type => type.trim().toLowerCase());

    return allowedTypes.some(type => {
      if (type === 'image/*') return mimeType.startsWith('image/');
      if (type === 'video/*') return mimeType.startsWith('video/');
      if (type.startsWith('.')) {
        return fileExtension === type.toLowerCase();
      }
      return mimeType === type;
    });
  };

  // Handle file (used by both input change and drag/drop)
  const handleFile = (file: File | null) => {
    if (!file) return;

    setError(null);

    // Validate file type
    if (!isValidFileType(file)) {
      const errorMsg = `Invalid file type. Accepted: ${acceptedTypes}`;
      setError(errorMsg);
      onError?.(errorMsg);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Validate file size
    if (file.size > maxSizeInBytes) {
      const errorMsg = `File is too large. Maximum size: ${maxSizeInMB}MB`;
      setError(errorMsg);
      onError?.(errorMsg);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // All good
    setSelectedFile(file);
  };

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFile(file);
  };

  // Handle drag over
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0] || null;
    handleFile(file); // Reuse validation logic
  };

  // Click to open file dialog
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 
        ${isDragging ? 'border-blue-500 bg-blue-50' : error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}
        cursor-pointer`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={acceptedTypes}
      />

      {/* Show selected file or upload prompt */}
      {selectedFile ? (
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium text-gray-800 mb-1 truncate max-w-full">
            {selectedFile.name}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            {(selectedFile.size / 1024).toFixed(2)} KB
          </p>
          <button
            onClick={handleRemoveFile}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none text-sm"
            type="button"
          >
            Remove File
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center md:justify-center md:space-x-4 md:text-left">
          {/* Upload Icon */}
          <div className="md:flex-shrink-0 mb-4 md:mb-0">
            <svg
              className="mx-auto md:mx-0 h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L40 32"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Text Content */}
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">
                Upload a file
              </span>{' '}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {acceptedTypes.split(',').map(t => t.trim()).join(', ')} up to {maxSizeInMB}MB
            </p>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default GptUploader;