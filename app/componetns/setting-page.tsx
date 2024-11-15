"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Pencil,
    User,
    Bell,
    Lock,
    Moon,
    Camera,
} from "lucide-react";

export default function SettingPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(
        null
    );

    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div
            className="container mx-auto p-6"
            dir="rtl"
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    تنظیمات
                </h1>
            </div>

            <Card
                dir="rtl"
                className="w-full max-w-2xl mx-auto"
            >
                <CardContent
                    dir="rtl"
                    className="p-6"
                >
                    <Tabs defaultValue="account">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="account">
                                حساب کاربری
                            </TabsTrigger>
                            <TabsTrigger value="settings">
                                تنظیمات
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent
                            dir="rtl"
                            value="account"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold">
                                    مشخصات حساب کاربری
                                </h2>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setIsEditing(
                                            !isEditing
                                        )
                                    }
                                >
                                    <Pencil className="h-4 w-4 ml-2" />
                                    {isEditing
                                        ? "ذخیره"
                                        : "ویرایش"}
                                </Button>
                            </div>
                            <div className="space-y-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">
                                        نام
                                    </Label>
                                    <Input
                                        id="name"
                                        value="نام کاربر"
                                        readOnly={
                                            !isEditing
                                        }
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">
                                        ایمیل
                                    </Label>
                                    <Input
                                        id="email"
                                        value="user@example.com"
                                        readOnly={
                                            !isEditing
                                        }
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="phone">
                                        شماره تلفن
                                    </Label>
                                    <Input
                                        id="phone"
                                        value="۰۹۱۲۳۴۵۶۷۸۹"
                                        readOnly={
                                            !isEditing
                                        }
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">
                                        رمز عبور
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value="********"
                                        readOnly={
                                            !isEditing
                                        }
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent
                            dir="rtl"
                            value="settings"
                        >
                            <Card className="w-full max-w-md mx-auto">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-6">
                                        عکس پروفایل
                                    </h2>
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="relative w-32 h-32">
                                            {imageUrl ? (
                                                <img
                                                    src={
                                                        imageUrl
                                                    }
                                                    alt="تصویر پروفایل"
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                                    <User className="h-16 w-16 text-gray-400" />
                                                </div>
                                            )}
                                            <Label
                                                htmlFor="picture"
                                                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer"
                                            >
                                                <Camera className="h-5 w-5" />
                                            </Label>
                                            <input
                                                id="picture"
                                                type="file"
                                                accept="image/*"
                                                onChange={
                                                    handleImageUpload
                                                }
                                                className="sr-only"
                                            />
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            برای آپلود یا
                                            تغییر عکس
                                            پروفایل، روی
                                            آیکون دوربین
                                            کلیک کنید
                                        </p>
                                        {imageUrl && (
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setImageUrl(
                                                        null
                                                    )
                                                }
                                            >
                                                حذف عکس
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
