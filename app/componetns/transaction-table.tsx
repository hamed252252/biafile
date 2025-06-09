'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download } from 'lucide-react';

// Mock transaction data
const transactions = [
  {
    id: 1,
    date: '1402/08/01',
    amount: 1000000,
    description: 'واریز حقوق',
  },
  {
    id: 2,
    date: '1402/08/03',
    amount: -50000,
    description: 'خرید از فروشگاه',
  },
  {
    id: 3,
    date: '1402/08/05',
    amount: -200000,
    description: 'پرداخت قبض برق',
  },
  {
    id: 4,
    date: '1402/08/10',
    amount: 500000,
    description: 'دریافت از مشتری',
  },
  {
    id: 5,
    date: '1402/08/15',
    amount: -100000,
    description: 'شارژ تلفن همراه',
  },
];

export default function TransactionsHistory() {
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const handleDownload = async (id: number) => {
    setDownloadingId(id);

    // Simulate API call and file generation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate file download
    const transaction = transactions.find((t) => t.id === id);
    const blob = new Blob(
      [`تراکنش شماره ${id}: ${transaction?.description} - مبلغ: ${transaction?.amount} ریال`],
      { type: 'text/plain' },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transaction-${id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadingId(null);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">جدول تراکنش‌ها</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">شماره</TableHead>
              <TableHead className="text-right">تاریخ</TableHead>
              <TableHead className="text-right">مبلغ (ریال)</TableHead>
              <TableHead className="text-right">توضیحات</TableHead>
              <TableHead className="text-right">دانلود</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                  {transaction.amount.toLocaleString()}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(transaction.id)}
                    disabled={downloadingId === transaction.id}
                  >
                    {downloadingId === transaction.id ? (
                      <Download className="h-4 w-4 animate-pulse" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
