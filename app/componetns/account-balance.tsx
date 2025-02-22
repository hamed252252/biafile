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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Sample data (unchanged from the original)
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

export default function Component() {
    const [timeRange, setTimeRange] = useState("6m");

    return (
        <div
            dir="rtl"
            className="container mx-auto p-4 space-y-6"
        >
            <h1 className="text-3xl font-bold text-center mb-6">
                اعتبار اصلی شما
            </h1>

            <div className="flex justify-end">
                <Select
                    dir="rtl"
                    defaultValue={timeRange}
                    onValueChange={setTimeRange}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="انتخاب بازه زمانی" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1m">
                            ۱ ماه گذشته
                        </SelectItem>
                        <SelectItem value="3m">
                            ۳ ماه گذشته
                        </SelectItem>
                        <SelectItem value="6m">
                            ۶ ماه گذشته
                        </SelectItem>
                        <SelectItem value="1y">
                            ۱ سال گذشته
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>موجودی حساب</CardTitle>
                        <CardDescription>
                            روند موجودی حساب در بازه زمانی
                            انتخاب شده
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <LineChart data={balanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="balance"
                                    stroke="#8884d8"
                                    name="موجودی"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            درآمد در مقابل هزینه
                        </CardTitle>
                        <CardDescription>
                            مقایسه درآمد و هزینه در بازه
                            زمانی انتخاب شده
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <BarChart
                                data={incomeVsExpenseData}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="income"
                                    fill="#8884d8"
                                    name="درآمد"
                                />
                                <Bar
                                    dataKey="expense"
                                    fill="#82ca9d"
                                    name="هزینه"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

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

            <Card dir="rtl">
                <CardHeader>
                    <CardTitle>تحلیل مالی</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs
                        dir="rtl"
                        defaultValue="income"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="income">
                                درآمد
                            </TabsTrigger>
                            <TabsTrigger value="expense">
                                هزینه
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="income">
                            <p className="text-sm text-muted-foreground mt-4">
                                بیشترین منبع درآمد شما در
                                ماه گذشته: واریز حقوق (۶۰٪
                                کل درآمد)
                            </p>
                        </TabsContent>
                        <TabsContent value="expense">
                            <p className="text-sm text-muted-foreground mt-4">
                                بیشترین هزینه شما در ماه
                                گذشته: خرید مواد غذایی (۳۰٪
                                کل هزینه‌ها)
                            </p>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
