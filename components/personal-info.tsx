"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function PersonalInfo() {
    const [isEditing, setIsEditing] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        firstName: "علی",
        lastName: "محمدی",
        nationalId: "0123456789",
        birthDate: "1370-05-15",
        gender: "male",
        email: "ali.mohammadi@example.com",
        phone: "09123456789",
        address: "تهران، خیابان ولیعصر، پلاک 123",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPersonalInfo({
            ...personalInfo,
            [e.target.id]: e.target.value,
        });
    };

    const handleSelectChange = (value: string) => {
        setPersonalInfo({ ...personalInfo, gender: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
        // Here you would typically send the updated info to a server
        console.log("Updated info:", personalInfo);
    };

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-background flex items-center justify-center p-4"
        >
            <Card className="w-full max-w-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-bold">
                        اطلاعات شخصی
                    </CardTitle>
                    <Button
                        variant="outline"
                        onClick={() =>
                            setIsEditing(!isEditing)
                        }
                    >
                        {isEditing ? "لغو" : "ویرایش"}
                    </Button>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">
                                    نام
                                </Label>
                                <Input
                                    id="firstName"
                                    value={
                                        personalInfo.firstName
                                    }
                                    onChange={
                                        handleInputChange
                                    }
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">
                                    نام خانوادگی
                                </Label>
                                <Input
                                    id="lastName"
                                    value={
                                        personalInfo.lastName
                                    }
                                    onChange={
                                        handleInputChange
                                    }
                                    readOnly={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nationalId">
                                کد ملی
                            </Label>
                            <Input
                                id="nationalId"
                                value={
                                    personalInfo.nationalId
                                }
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="birthDate">
                                تاریخ تولد
                            </Label>
                            <Input
                                id="birthDate"
                                type="date"
                                value={
                                    personalInfo.birthDate
                                }
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">
                                جنسیت
                            </Label>
                            <Select
                                value={personalInfo.gender}
                                onValueChange={
                                    handleSelectChange
                                }
                                disabled={!isEditing}
                            >
                                <SelectTrigger id="gender">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">
                                        مرد
                                    </SelectItem>
                                    <SelectItem value="female">
                                        زن
                                    </SelectItem>
                                    <SelectItem value="other">
                                        سایر
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                ایمیل
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={personalInfo.email}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">
                                شماره تلفن
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={personalInfo.phone}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">
                                آدرس
                            </Label>
                            <Input
                                id="address"
                                value={personalInfo.address}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        {isEditing && (
                            <Button
                                type="submit"
                                className="w-full"
                            >
                                ذخیره تغییرات
                            </Button>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
