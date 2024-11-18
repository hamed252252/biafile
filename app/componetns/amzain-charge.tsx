"use client";

import { useState, useEffect } from "react";
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

const initialTransactionData = [
    {
        id: 1,
        date: "۱۴۰۲/۰۳/۲۵",
        description: "شارژ مستقیم",
        amount: 20000,
        expiryDate: new Date(
            new Date().getTime() + 30 * 24 * 60 * 60 * 1000
        ),
    },
    {
        id: 2,
        date: "۱۴۰۲/۰۳/۲۰",
        description: "بسته اینترنت",
        amount: -50000,
        expiryDate: null,
    },
    {
        id: 3,
        date: "۱۴۰۲/۰۳/۱۵",
        description: "شارژ شگفت انگیز",
        amount: 30000,
        expiryDate: new Date(
            new Date().getTime() + 25 * 24 * 60 * 60 * 1000
        ),
    },
    {
        id: 4,
        date: "۱۴۰۲/۰۳/۱۰",
        description: "بسته مکالمه",
        amount: -15000,
        expiryDate: null,
    },
    {
        id: 5,
        date: "۱۴۰۲/۰۳/۰۵",
        description: "شارژ مستقیم",
        amount: 10000,
        expiryDate: new Date(
            new Date().getTime() + 20 * 24 * 60 * 60 * 1000
        ),
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

function Countdown({ expiryDate }: any) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference =
                expiryDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(
                        difference / (1000 * 60 * 60 * 24)
                    ),
                    hours: Math.floor(
                        (difference / (1000 * 60 * 60)) % 24
                    ),
                    minutes: Math.floor(
                        (difference / 1000 / 60) % 60
                    ),
                    seconds: Math.floor(
                        (difference / 1000) % 60
                    ),
                });
            } else {
                clearInterval(timer);
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [expiryDate]);

    return (
        <div className="grid grid-cols-4 gap-1 text-center">
            <div className="bg-primary text-primary-foreground rounded p-1">
                <div className="text-lg font-bold">
                    {timeLeft.days}
                </div>
                <div className="text-xs">روز</div>
            </div>
            <div className="bg-primary text-primary-foreground rounded p-1">
                <div className="text-lg font-bold">
                    {timeLeft.hours}
                </div>
                <div className="text-xs">ساعت</div>
            </div>
            <div className="bg-primary text-primary-foreground rounded p-1">
                <div className="text-lg font-bold">
                    {timeLeft.minutes}
                </div>
                <div className="text-xs">دقیقه</div>
            </div>
            <div className="bg-primary text-primary-foreground rounded p-1">
                <div className="text-lg font-bold">
                    {timeLeft.seconds}
                </div>
                <div className="text-xs">ثانیه</div>
            </div>
        </div>
    );
}

export default function Component() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionData, setTransactionData] = useState(
        initialTransactionData
    );

    const handleRecharge = () => {
        const newTransaction = {
            id: transactionData.length + 1,
            date: new Date().toLocaleDateString("fa-IR"),
            description: "شارژ جدید",
            amount: parseInt(amount),
            expiryDate: new Date(
                new Date().getTime() +
                    30 * 24 * 60 * 60 * 1000
            ),
        };
        setTransactionData([
            newTransaction,
            ...transactionData.slice(0, 4),
        ]);
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
                                <TableHead className="text-center">
                                    شمارش معکوس
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
                                        <TableCell className="text-center">
                                            {transaction.expiryDate ? (
                                                <Countdown
                                                    expiryDate={
                                                        transaction.expiryDate
                                                    }
                                                />
                                            ) : (
                                                "-"
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

            <Card>
                <CardHeader>
                    <CardTitle>شارژ جدید</CardTitle>
                    <CardDescription>
                        شماره تلفن و مبلغ شارژ را وارد کنید
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="phone">
                                شماره تلفن
                            </Label>
                            <Input
                                id="phone"
                                value={phoneNumber}
                                onChange={(e) =>
                                    setPhoneNumber(
                                        e.target.value
                                    )
                                }
                                placeholder="شماره تلفن را وارد کنید"
                            />
                        </div>
                        <div>
                            <Label htmlFor="amount">
                                مبلغ شارژ (تومان)
                            </Label>
                            <Input
                                id="amount"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(
                                        e.target.value
                                    )
                                }
                                placeholder="مبلغ شارژ را وارد کنید"
                            />
                        </div>
                        <Button onClick={handleRecharge}>
                            شارژ کن
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
