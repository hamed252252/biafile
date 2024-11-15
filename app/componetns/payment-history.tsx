"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const paymentData = [
    { date: "۱۴۰۲/۰۱/۰۱", amount: 1500000, status: "موفق" },
    { date: "۱۴۰۲/۰۲/۰۱", amount: 2000000, status: "موفق" },
    { date: "۱۴۰۲/۰۳/۰۱", amount: 1800000, status: "موفق" },
    { date: "۱۴۰۲/۰۴/۰۱", amount: 2200000, status: "موفق" },
    { date: "۱۴۰۲/۰۵/۰۱", amount: 1900000, status: "موفق" },
];

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "نمودار تاریخچه پرداخت",
        },
    },
};

const chartData = {
    labels: paymentData.map((item) => item.date),
    datasets: [
        {
            label: "مبلغ پرداخت (تومان)",
            data: paymentData.map((item) => item.amount),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

export default function PaymentHistory() {
    return (
        <div
            className="container mx-auto p-4 font-sans"
            dir="rtl"
        >
            <h1 className="text-2xl font-bold mb-4 text-right">
                تاریخچه پرداخت
            </h1>

            <Card>
                <CardHeader>
                    <CardTitle>جدول پرداخت‌ها</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">
                                    تاریخ
                                </TableHead>
                                <TableHead className="text-right">
                                    مبلغ (تومان)
                                </TableHead>
                                <TableHead className="text-right">
                                    وضعیت
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paymentData.map(
                                (payment, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-right">
                                            {payment.date}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {payment.amount.toLocaleString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">
                                                {
                                                    payment.status
                                                }
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>نمودار پرداخت‌ها</CardTitle>
                </CardHeader>
                <CardContent>
                    <Bar
                        options={chartOptions}
                        data={chartData}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
