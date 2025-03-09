import { List, Search, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Loading() {
    return (
        <div
            className="flex flex-col gap-4 p-4 md:p-8"
            dir="rtl"
        >
            <div className="flex items-center">
                <List className="ml-2 h-6 w-6" />
                <h1 className="text-2xl font-bold">
                    لیست دانلود ها
                </h1>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>دانلود ها</CardTitle>
                    <CardDescription>
                        مدیریت فایل‌های دانلود شده و در حال
                        دانلود
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex w-full items-center gap-2 md:w-auto">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="جستجو..."
                                className="w-full md:w-[250px]"
                                disabled
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Select disabled>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="فیلتر وضعیت" />
                                </SelectTrigger>
                            </Select>
                            <Button
                                variant="outline"
                                size="icon"
                                disabled
                            >
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="mt-4 rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[300px]">
                                        نام فایل
                                    </TableHead>
                                    <TableHead>
                                        نوع
                                    </TableHead>
                                    <TableHead>
                                        حجم
                                    </TableHead>
                                    <TableHead>
                                        تاریخ
                                    </TableHead>
                                    <TableHead>
                                        وضعیت
                                    </TableHead>
                                    <TableHead className="text-left">
                                        عملیات
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array(5)
                                    .fill(0)
                                    .map((_, index) => (
                                        <TableRow
                                            key={index}
                                        >
                                            <TableCell>
                                                <Skeleton className="h-5 w-[250px]" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-5 w-12" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-5 w-16" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-5 w-24" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-6 w-24 rounded-full" />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Skeleton className="h-8 w-8 rounded-md" />
                                                    <Skeleton className="h-8 w-8 rounded-md" />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
