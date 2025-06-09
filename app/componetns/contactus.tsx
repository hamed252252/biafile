'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: ارسال به سرور
      await new Promise((r) => setTimeout(r, 1000));
      toast({
        title: 'پیام ارسال شد',
        description: 'به‌زودی با شما تماس می‌گیریم.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch {
      toast({
        title: 'خطا در ارسال',
        description: 'لطفاً دوباره تلاش کنید.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="bg-white dark:bg-gray-800 shadow-xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="text-right">
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              تماس با ما
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              لطفاً فرم زیر را پر کنید تا در سریع‌ترین زمان با شما تماس بگیریم.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                نام و نام خانوادگی
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="مثلاً: علی رضایی"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                ایمیل
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@mail.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                شماره همراه
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="0912xxx1234"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                موضوع
              </label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="موضوع پیام"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                پیام شما
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="پیام خود را اینجا بنویسید..."
                required
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full"
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
