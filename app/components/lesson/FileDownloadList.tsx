'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

interface File {
  id?: number;
  FileName: string;
  PathFileName: string;
}

interface FileDownloadListProps {
  files: File[];
}

export function FileDownloadList({ files }: FileDownloadListProps) {
  if (!files || files.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {files.map((file, index) => {
        // تمیز کردن مسیر تا mismatch نگیریم
        const cleanPath = file.PathFileName.replace(/^\/?Uploadfiles\/Files\//, '/files/');
        // key یکتا (اولویت با id اگر نبود index و path)
        const uniqueKey = `${file.id ?? index}-${cleanPath}`;

        return (
          <motion.div
            key={uniqueKey}
            whileHover={{ scale: 1.2, transition: { duration: 1.2, ease: 'easeInOut' } }}
            className="flex flex-col items-start justify-between p-4 rounded-xl shadow-sm border   "
          >
            <p className="font-medium">{file.FileName}</p>
            <Link
              href={file.PathFileName} // مسیر کامل سرور
              download
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2"
            >
              دانلود فایل
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
