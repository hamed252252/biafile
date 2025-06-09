'use client';

import { Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getFileExtensionIcon } from '@/utils/getFileIcon';

interface FileItem {
  Title: string;
  PathFileName: string;
  Price?: string;
}

interface FileDownloadProps {
  files: FileItem[];
  baseUrl: string;
}

export const FileDownloadList = ({ files, baseUrl }: FileDownloadProps) => {
  if (files.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        هیچ فایلی برای دانلود در دسترس نیست.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {files.map((file, index) => (
        <Card key={index} className="flex flex-col justify-between h-full">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {getFileExtensionIcon(file.PathFileName)}
              </span>
              <h3 className="font-semibold text-base truncate">{file.Title}</h3>
            </div>

            <p className="text-sm text-muted-foreground">
              قیمت: {file.Price ? `${file.Price} تومان` : 'رایگان'}
            </p>

            <a
              href={`${baseUrl}${file.PathFileName}`}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="w-full mt-2">
                <Download className="ml-2 w-4 h-4" />
                دانلود فایل
              </Button>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
