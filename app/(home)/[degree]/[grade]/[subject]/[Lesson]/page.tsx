import Image from "next/image";
import {
    Star,
    Download,
    Share2,
    BookOpen,
    Users,
    Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbClient } from "@/app/componetns/breadcrumClinet";
import DetailsSectionClient from "@/app/componetns/DetailsSectionClient";

type WorksheetDetailProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function WorksheetDetail({
    params,
}: WorksheetDetailProps) {
    const previewImage =
        "/placeholder.svg?height=600&width=400";
    const res = await params;
    const { id } = res;

    return (
        <div
            className="min-h-screen bg-background"
            dir="rtl"
        >
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <BreadcrumbClient />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Preview Section */}
                    <div className="space-y-4">
                        <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="relative aspect-[3/4] w-full">
                                    <Image
                                        src={previewImage}
                                        alt="پیش‌نمایش کاربرگ"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <p className="text-sm text-muted-foreground text-center">
                            پیش‌نمایش صفحه اول فایل • تعداد
                            صفحات: ۴
                        </p>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">
                        <DetailsSectionClient />
                    </div>
                </div>
            </div>
        </div>
    );
}
