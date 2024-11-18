"use client";

import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
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
import { Popover } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";

interface PersonalInfoData {
    firstName: string;
    lastName: string;
    nationalId: string;
    birthDate: Date | null;
    role: string;
    email: string;
    phone: string;
}

export default function PersonalInfo() {
    const [isEditing, setIsEditing] = useState(false);

    // داده‌های نمونه
    const mockData: PersonalInfoData = {
        firstName: "علی",
        lastName: "محمدی",
        nationalId: "0123456789",
        birthDate: new Date("1991-08-06"),
        role: "student",
        email: "ali.mohammadi@example.com",
        phone: "09123456789",
    };

    const [personalInfo, setPersonalInfo] =
        useState<PersonalInfoData>(mockData);
    const [errors, setErrors] = useState<
        Partial<PersonalInfoData>
    >({});

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { id, value } = e.target;
        setPersonalInfo((prev) => ({
            ...prev,
            [id]: value,
        }));
        setErrors((prev) => ({ ...prev, [id]: "" }));
    };

    const handleSelectChange = (value: string) => {
        setPersonalInfo((prev) => ({
            ...prev,
            role: value,
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<PersonalInfoData> = {};
        if (!personalInfo.firstName.trim())
            newErrors.firstName = "نام اجباری است";
        if (!personalInfo.lastName.trim())
            newErrors.lastName = "نام خانوادگی اجباری است";
        if (
            personalInfo.email &&
            !/\S+@\S+\.\S+/.test(personalInfo.email)
        )
            newErrors.email = "ایمیل نامعتبر است";
        if (
            personalInfo.phone &&
            !/^09\d{9}$/.test(personalInfo.phone)
        )
            newErrors.phone = "شماره تلفن نامعتبر است";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsEditing(false);
            console.log("Updated info:", personalInfo);
        }
    };

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-background flex items-center justify-center p-4"
        >
            <Card className="w-full text-cente max-w-2xl">
                <CardHeader className="flex flex-row text-center items-center justify-between">
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
                        {/* نام */}
                        <div className="space-y-2">
                            <Label htmlFor="firstName">
                                نام
                            </Label>
                            <Input
                                id="firstName"
                                value={
                                    personalInfo.firstName
                                }
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm">
                                    {errors.firstName}
                                </p>
                            )}
                        </div>
                        {/* نام خانوادگی */}
                        <div className="space-y-2">
                            <Label htmlFor="lastName">
                                نام خانوادگی
                            </Label>
                            <Input
                                id="lastName"
                                value={
                                    personalInfo.lastName
                                }
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm">
                                    {errors.lastName}
                                </p>
                            )}
                        </div>
                        {/* کد ملی */}
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
                                disabled={!isEditing}
                            />
                        </div>
                        {/* تاریخ تولد */}
                        <div className="space-y-2">
                            <Label htmlFor="birthDate">
                                تاریخ تولد (اختیاری)
                            </Label>
                            <div className="relative">
                                <DatePicker
                                    value={
                                        personalInfo.birthDate
                                    }
                                    onChange={(
                                        date: any
                                    ) => {
                                        setPersonalInfo(
                                            (prev) => ({
                                                ...prev,
                                                birthDate:
                                                    date?.toDate() ||
                                                    null,
                                            })
                                        );
                                    }}
                                    calendar={persian}
                                    locale={persian_fa}
                                    calendarPosition="bottom-right"
                                    disabled={!isEditing}
                                    inputClass={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        !personalInfo.birthDate &&
                                        "text-gray-500"
                                    } ${
                                        !isEditing &&
                                        "bg-gray-100 cursor-not-allowed"
                                    }`}
                                    containerClassName="w-full"
                                    placeholder="انتخاب تاریخ"
                                    render={(
                                        value,
                                        openCalendar
                                    ) => (
                                        <button
                                            type="button"
                                            onClick={
                                                openCalendar
                                            }
                                            disabled={
                                                !isEditing
                                            }
                                            className="w-full text-right flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        >
                                            <span
                                                className={`${
                                                    !personalInfo.birthDate
                                                        ? "text-gray-500"
                                                        : ""
                                                }`}
                                            >
                                                {personalInfo.birthDate
                                                    ? personalInfo.birthDate.toLocaleDateString(
                                                          "fa-IR"
                                                      )
                                                    : "انتخاب تاریخ"}
                                            </span>
                                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                                        </button>
                                    )}
                                />
                            </div>
                        </div>
                        {/* نقش */}
                        <div className="space-y-2">
                            <Label htmlFor="role">
                                نقش
                            </Label>
                            <Select
                                dir="rtl"
                                onValueChange={
                                    handleSelectChange
                                }
                                value={personalInfo.role}
                                disabled={!isEditing}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="انتخاب نقش" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">
                                        دانشجو
                                    </SelectItem>
                                    <SelectItem value="teacher">
                                        استاد
                                    </SelectItem>
                                    <SelectItem value="admin">
                                        مدیر
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* ایمیل */}
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                ایمیل (اختیاری)
                            </Label>
                            <Input
                                id="email"
                                value={personalInfo.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        {/* شماره تلفن */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">
                                شماره تلفن (اختیاری)
                            </Label>
                            <Input
                                id="phone"
                                value={personalInfo.phone}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm">
                                    {errors.phone}
                                </p>
                            )}
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
