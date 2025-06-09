'use client';

import * as React from 'react';
import { List, Search, Download, MoreHorizontal, Filter, ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Sample data for downloads
const downloads = [
  {
    id: '1',
    name: 'گزارش فروش ماهانه',
    type: 'PDF',
    size: '2.4 MB',
    date: '1402/12/15',
    status: 'completed',
  },
  {
    id: '2',
    name: 'داده‌های مشتریان',
    type: 'XLSX',
    size: '4.8 MB',
    date: '1402/12/10',
    status: 'completed',
  },
  {
    id: '3',
    name: 'تصاویر محصولات',
    type: 'ZIP',
    size: '15.2 MB',
    date: '1402/12/05',
    status: 'completed',
  },
  {
    id: '4',
    name: 'فایل پشتیبان سیستم',
    type: 'ZIP',
    size: '120 MB',
    date: '1402/11/28',
    status: 'failed',
  },
  {
    id: '5',
    name: 'ویدیو آموزشی',
    type: 'MP4',
    size: '45.6 MB',
    date: '1402/11/20',
    status: 'in-progress',
  },
];

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');

  const filteredDownloads = downloads.filter((download) => {
    const matchesSearch = download.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || download.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8" dir="rtl">
      <div className="flex items-center">
        <List className="ml-2 h-6 w-6" />
        <h1 className="text-2xl font-bold">لیست دانلود ها</h1>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>دانلود ها</CardTitle>
          <CardDescription>مدیریت فایل‌های دانلود شده و در حال دانلود</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full items-center gap-2 md:w-auto">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="جستجو..."
                className="w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="فیلتر وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  <SelectItem value="completed">تکمیل شده</SelectItem>
                  <SelectItem value="in-progress">در حال دانلود</SelectItem>
                  <SelectItem value="failed">ناموفق</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">
                    <div className="flex items-center">
                      نام فایل
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>نوع</TableHead>
                  <TableHead>حجم</TableHead>
                  <TableHead>تاریخ</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead className="text-left">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDownloads.length > 0 ? (
                  filteredDownloads.map((download) => (
                    <TableRow key={download.id}>
                      <TableCell className="font-medium">{download.name}</TableCell>
                      <TableCell>{download.type}</TableCell>
                      <TableCell>{download.size}</TableCell>
                      <TableCell>{download.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            download.status === 'completed'
                              ? 'secondary'
                              : download.status === 'in-progress'
                                ? 'default'
                                : 'destructive'
                          }
                          className={
                            download.status === 'completed'
                              ? 'bg-emerald-500 hover:bg-emerald-500/80 text-white'
                              : ''
                          }
                        >
                          {download.status === 'completed'
                            ? 'تکمیل شده'
                            : download.status === 'in-progress'
                              ? 'در حال دانلود'
                              : 'ناموفق'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>گزینه ها</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>دانلود مجدد</DropdownMenuItem>
                              <DropdownMenuItem>اشتراک گذاری</DropdownMenuItem>
                              <DropdownMenuItem>مشاهده جزئیات</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">حذف</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      هیچ نتیجه‌ای یافت نشد.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
