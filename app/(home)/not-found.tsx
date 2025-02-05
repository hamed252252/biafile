import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function NotFoundPage() {
    return (
        <div
            dir="rtl"
            className="min-h-screen flex items-center justify-center bg-background"
        >
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                        ۴۰۴ - صفحه پیدا نشد
                        <AlertTriangle className="w-10 h-10 text-destructive" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground">
                        اوه! به نظر می‌رسد صفحه‌ای که به
                        دنبال آن هستید گم شده است.
                    </p>
                    <div className="flex justify-center gap-x-4">
                        <Button
                            asChild
                            variant="outline"
                        >
                            <Link href="/">
                                بازگشت به صفحه اصلی
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="/contact">
                                تماس با پشتیبانی
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
