"use client";

import * as React from "react";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFilesSelected?: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
  files?: File[];
}

export const FileUpload = ({
  onFilesSelected,
  maxFiles = 5,
  accept,
  maxSize = 5 * 1024 * 1024, // 5MB default
  className,
  files: _files,
  ...props
}: FileUploadProps) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (_files) {
      setFiles(_files);
    }
  }, [_files]);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    setError(null);

    const newFiles = Array.from(selectedFiles);

    // Check file size
    const oversizedFiles = newFiles.filter((file) => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      setError(
        `Some files exceed the maximum size of ${Math.round(maxSize / 1024 / 1024)}MB`,
      );
      return;
    }

    // Check max files
    if (files.length + newFiles.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} files`);
      return;
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);

    if (onFilesSelected) {
      onFilesSelected(updatedFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    handleFileChange(droppedFiles);
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);

    if (onFilesSelected) {
      onFilesSelected(updatedFiles);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const isImage = (file: File) => {
    return file.type.startsWith("image/");
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "relative flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50",
          "cursor-pointer",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
          accept={accept}
          {...props}
        />

        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <UploadCloud className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">
              <span className="font-bold text-primary">
                Click here to upload
              </span>{" "}
              or Drag & drop
            </p>
            <p className="text-xs text-muted-foreground">
              Images & Graphics Types: PDF or XML, or other document formats
            </p>
          </div>
        </div>
      </div>

      {error && <div className="text-sm text-destructive">{error}</div>}

      {files.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative flex flex-col items-center rounded-lg border p-2 shadow-sm"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-background shadow-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove file</span>
              </Button>

              {isImage(file) ? (
                <div className="relative h-24 w-full overflow-hidden rounded-md">
                  <div className="flex h-full w-full items-center justify-center bg-secondary/20">
                    <Image
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={file.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex h-24 w-full items-center justify-center rounded-md bg-secondary/20">
                  <p className="text-xs font-medium">
                    {file.type || "Unknown type"}
                  </p>
                </div>
              )}

              <div className="mt-2 w-full truncate text-center">
                <p className="truncate text-xs font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
