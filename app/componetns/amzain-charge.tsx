"use client";

import { useState } from "react";
import {
    Line,
    LineChart,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const rechargeData = [
    { date: "فروردین", balance: 50000 },
    { date: "اردیبهشت", balance: 70000 },
    { date: "خرداد", balance: 60000 },
    { date: "تیر", balance: 80000 },
    { date: "مرداد", balance: 65000 },
    { date: "شهریور", balance: 90000 },
];

const transactionData = [
    {
        id: 1,
        date: "۱۴۰۲/۰۳/۲۵",
        description: "شارژ مستقیم",
        amount: 20000,
    },
    {
        id: 2,
        date: "۱۴۰۲/۰۳/۲۰",
        description: "بسته اینترنت",
        amount: -50000,
    },
    {
        id: 3,
        date: "۱۴۰۲/۰۳/۱۵",
        description: "شارژ شگفت انگیز",
        amount: 30000,
    },
    {
        id: 4,
        date: "۱۴۰۲/۰۳/۱۰",
        description: "بسته مکالمه",
        amount: -15000,
    },
    {
        id: 5,
        date: "۱۴۰۲/۰۳/۰۵",
        description: "شارژ مستقیم",
        amount: 10000,
    },
];

const usageData = [
    { month: "فروردین", internet: 4, calls: 2 },
    { month: "اردیبهشت", internet: 5, calls: 3 },
    { month: "خرداد", internet: 3, calls: 4 },
    { month: "تیر", internet: 6, calls: 2 },
    { month: "مرداد", internet: 4, calls: 3 },
    { month: "شهریور", internet: 7, calls: 5 },
];

export default function AmazingRecharge() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState("");

    const handleRecharge = () => {
        console.log(
            `شارژ شماره ${phoneNumber} به مبلغ ${amount} تومان`
        );
        setPhoneNumber("");
        setAmount("");
    };

    return (
        <div
            dir="rtl"
            className="container mx-auto p-4 space-y-6 font-sans"
        >
            <h1 className="text-3xl font-bold text-center mb-6">
                شارژ شگفت انگیز
            </h1>

            <Card>
                <CardHeader>
                    <CardTitle>موجودی شارژ</CardTitle>
                    <CardDescription>
                        روند موجودی شارژ در شش ماه گذشته
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            balance: {
                                label: "موجودی",
                                color: "hsl(var(--chart-1))",
                            },
                        }}
                        className="h-[300px]"
                    >
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <LineChart data={rechargeData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent />
                                    }
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="balance"
                                    stroke="var(--color-balance)"
                                    name="موجودی"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>تراکنش‌های اخیر</CardTitle>
                    <CardDescription>
                        پنج تراکنش آخر حساب شما
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">
                                    تاریخ
                                </TableHead>
                                <TableHead className="text-right">
                                    شرح
                                </TableHead>
                                <TableHead className="text-left">
                                    مبلغ (تومان)
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactionData.map(
                                (transaction) => (
                                    <TableRow
                                        key={transaction.id}
                                    >
                                        <TableCell className="text-right">
                                            {
                                                transaction.date
                                            }
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {
                                                transaction.description
                                            }
                                        </TableCell>
                                        <TableCell
                                            className={`text-left ${
                                                transaction.amount >
                                                0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {transaction.amount.toLocaleString(
                                                "fa-IR"
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        مصرف اینترنت و تماس
                    </CardTitle>
                    <CardDescription>
                        مقایسه مصرف اینترنت و تماس در شش ماه
                        گذشته
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            internet: {
                                label: "اینترنت",
                                color: "hsl(var(--chart-1))",
                            },
                            calls: {
                                label: "تماس",
                                color: "hsl(var(--chart-2))",
                            },
                        }}
                        className="h-[300px]"
                    >
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <BarChart data={usageData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent />
                                    }
                                />
                                <Legend />
                                <Bar
                                    dataKey="internet"
                                    fill="var(--color-internet)"
                                    name="اینترنت"
                                />
                                <Bar
                                    dataKey="calls"
                                    fill="var(--color-calls)"
                                    name="تماس"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
