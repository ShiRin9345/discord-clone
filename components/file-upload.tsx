"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
  type: string;
  onType: (type: string) => void;
}

const FileUpload = ({
  onChange,
  value,
  endpoint,
  type,
  onType,
}: FileUploadProps) => {
  if (value && type !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 rounded-full bg-rose-500 p-1 text-white shadow-sm hover:cursor-pointer"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && type === "pdf") {
    return (
      <div className="bg-background/10 relative mt-2 flex items-center rounded-md p-2">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm break-all text-indigo-500 hover:underline dark:text-indigo-400"
        >
          {value}
        </a>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
        const fileType = res?.[0].name.split(".").pop() as string;
        onType(fileType);
      }}
      onUploadError={(e: Error) => {
        console.error(e);
      }}
    />
  );
};
export default FileUpload;
