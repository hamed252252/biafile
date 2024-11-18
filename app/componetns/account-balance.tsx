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

// Sample data for the charts and table
const balanceData = [
    { date: "فروردین", balance: 5000 },
    { date: "اردیبهشت", balance: 5500 },
    { date: "خرداد", balance: 4800 },
    { date: "تیر", balance: 6200 },
    { date: "مرداد", balance: 5900 },
    { date: "شهریور", balance: 6500 },
];

const transactionData = [
    {
        id: 1,
        date: "۱۴۰۲/۰۳/۲۵",
        description: "واریز حقوق",
        amount: 3000,
    },
    {
        id: 2,
        date: "۱۴۰۲/۰۳/۲۴",
        description: "خرید مواد غذایی",
        amount: -150,
    },
    {
        id: 3,
        date: "۱۴۰۲/۰۳/۲۳",
        description: "قبض آب و برق",
        amount: -200,
    },
    {
        id: 4,
        date: "۱۴۰۲/۰۳/۲۲",
        description: "خرید آنلاین",
        amount: -75,
    },
    {
        id: 5,
        date: "۱۴۰۲/۰۳/۲۱",
        description: "رستوران",
        amount: -60,
    },
];

const incomeVsExpenseData = [
    { month: "فروردین", income: 4000, expense: 3500 },
    { month: "اردیبهشت", income: 4200, expense: 3700 },
    { month: "خرداد", income: 3800, expense: 4000 },
    { month: "تیر", income: 4500, expense: 3800 },
    { month: "مرداد", income: 4300, expense: 4100 },
    { month: "شهریور", income: 5000, expense: 4500 },
];

export default function AccountBalance() {
    const [activeTab, setActiveTab] = useState("balance");

    return (
        <div
            dir="rtl"
            className="container mx-auto p-4 space-y-6 font-sans"
        >
            <h1 className="text-3xl font-bold text-center mb-6">
                اعتبار اصلی شما
            </h1>

            <Card>
                <CardHeader>
                    <CardTitle>موجودی حساب</CardTitle>
                    <CardDescription>
                        روند موجودی حساب در شش ماه گذشته
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
                            <LineChart data={balanceData}>
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
                    <CardTitle>آخرین تراکنش‌ها</CardTitle>
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
                                    مبلغ
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
                        درآمد در مقابل هزینه
                    </CardTitle>
                    <CardDescription>
                        مقایسه درآمد و هزینه در شش ماه گذشته
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            income: {
                                label: "درآمد",
                                color: "hsl(var(--chart-1))",
                            },
                            expense: {
                                label: "هزینه",
                                color: "hsl(var(--chart-2))",
                            },
                        }}
                        className="h-[300px]"
                    >
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <BarChart
                                data={incomeVsExpenseData}
                            >
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
                                    dataKey="income"
                                    fill="var(--color-income)"
                                    name="درآمد"
                                />
                                <Bar
                                    dataKey="expense"
                                    fill="var(--color-expense)"
                                    name="هزینه"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
