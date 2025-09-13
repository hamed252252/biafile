'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { toast } from '@/hooks/use-toast';
function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token'); // اسم کوکی رو با پروژه خودت هماهنگ کن
    if (!token) {
      router.replace('/signin');
      return;
    }

    try {
      const decoded = jwt.decode(token) as JwtPayload | null;
      if (!decoded?.exp) {
        router.replace('/signin');
        return;
      }

      const now = Date.now() / 1000; // زمان فعلی بر حسب ثانیه
      if (decoded.exp < now) {
        router.replace('/signin'); // اگر expired شده بود
      } else {
        console.log('✅ Token still valid until:', new Date(decoded.exp * 1000));
        toast({ title: 'ورود موفق', description: 'خوش آمدید', type: 'foreground' }); // اینجا داخل useEffect درست هست
      }
    } catch (err) {
      console.log('❌ Error decoding token', err);
      router.replace('/signin');
    }
  }, [router]);

  return <div></div>;
}

export default Page;
