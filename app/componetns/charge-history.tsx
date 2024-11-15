"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import {
    CartesianGrid,
    Bar,
    BarChart,
    Line,
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";

// Charge history data
const chargeHistory = [
    { date: "15 خرداد", amount: 500000, status: "موفق" },
    { date: "10 خرداد", amount: 1000000, status: "موفق" },
    { date: "5 خرداد", amount: 250000, status: "ناموفق" },
    { date: "28 اردیبهشت", amount: 750000, status: "موفق" },
    { date: "20 اردیبهشت", amount: 300000, status: "موفق" },
];

// Chart configuration
const chartConfig = {
    amount: {
        label: "مبلغ شارژ (تومان)",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

// Summary calculations
const totalCharges = chargeHistory.reduce(
    (acc, item) => acc + item.amount,
    0
);
const successfulCharges = chargeHistory
    .filter((item) => item.status === "موفق")
    .reduce((acc, item) => acc + item.amount, 0);

export default function ChargeHistoryChart() {
    return (
        <div
            dir="rtl"
            className="flex flex-col lg:flex-row mt-10 p-4 gap-6"
        >
            {/* Line Chart */}
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        نمودار خطی شارژ
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        نمایش وضعیت مبالغ شارژ بر اساس تاریخ
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <LineChart
                                data={chargeHistory}
                                margin={{
                                    top: 16,
                                    right: 16,
                                    left: 16,
                                    bottom: 16,
                                }}
                            >
                                <CartesianGrid
                                    vertical={false}
                                    strokeDasharray="3 3"
                                />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(
                                        value
                                    ) =>
                                        Intl.NumberFormat(
                                            "fa-IR"
                                        ).format(value)
                                    }
                                />
                                <Tooltip
                                    content={({
                                        active,
                                        payload,
                                    }) => {
                                        if (
                                            active &&
                                            payload &&
                                            payload.length
                                        ) {
                                            const {
                                                date,
                                                amount,
                                                status,
                                            } =
                                                payload[0]
                                                    .payload;
                                            return (
                                                <div className="rounded-md bg-white p-2 shadow-lg">
                                                    <p className="text-sm font-medium">{`تاریخ: ${date}`}</p>
                                                    <p className="text-sm text-muted-foreground">{`مبلغ: ${Intl.NumberFormat(
                                                        "fa-IR"
                                                    ).format(
                                                        amount
                                                    )} تومان`}</p>
                                                    <p
                                                        className={`text-sm ${
                                                            status ===
                                                            "موفق"
                                                                ? "text-green-600"
                                                                : "text-red-600"
                                                        }`}
                                                    >
                                                        {status ===
                                                        "موفق"
                                                            ? "وضعیت: موفق"
                                                            : "وضعیت: ناموفق"}
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Line
                                    dataKey="amount"
                                    type="monotone"
                                    stroke="var(--color-amount)"
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        نمودار میله‌ای شارژ
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        مقایسه مبالغ شارژ بر اساس تاریخ
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <BarChart
                                data={chargeHistory}
                                margin={{
                                    top: 16,
                                    right: 16,
                                    left: 16,
                                    bottom: 16,
                                }}
                            >
                                <CartesianGrid
                                    vertical={false}
                                    strokeDasharray="3 3"
                                />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(
                                        value
                                    ) =>
                                        Intl.NumberFormat(
                                            "fa-IR"
                                        ).format(value)
                                    }
                                />
                                <Tooltip
                                    content={({
                                        active,
                                        payload,
                                    }) => {
                                        if (
                                            active &&
                                            payload &&
                                            payload.length
                                        ) {
                                            const {
                                                date,
                                                amount,
                                            } =
                                                payload[0]
                                                    .payload;
                                            return (
                                                <div className="rounded-md bg-white p-2 shadow-lg">
                                                    <p className="text-sm font-medium">{`تاریخ: ${date}`}</p>
                                                    <p className="text-sm text-muted-foreground">{`مبلغ: ${Intl.NumberFormat(
                                                        "fa-IR"
                                                    ).format(
                                                        amount
                                                    )} تومان`}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar
                                    dataKey="amount"
                                    fill="var(--color-amount)"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* List of Transactions */}
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        لیست تراکنش‌ها
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        مشاهده تمامی جزئیات تراکنش‌ها
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[300px]">
                        <ul className="space-y-4">
                            {chargeHistory.map(
                                (charge, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center p-3 bg-muted rounded-lg shadow-sm"
                                    >
                                        <div className="text-sm font-medium">
                                            {charge.date}
                                        </div>
                                        <div className="text-sm">
                                            {Intl.NumberFormat(
                                                "fa-IR"
                                            ).format(
                                                charge.amount
                                            )}{" "}
                                            تومان
                                        </div>
                                        <div
                                            className={`text-sm ${
                                                charge.status ===
                                                "موفق"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {charge.status}
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                    نمایش جزئیات تمامی تراکنش‌ها
                </CardFooter>
            </Card>
        </div>
    );
}
