'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export async function loginAction(formData: FormData) {
  const identifier = formData.get('identifier')?.toString().trim();
  const password = formData.get('password')?.toString();

  if (!identifier || !password) {
    const url = encodeURI('/login?error=ایمیل/نام‌کاربری و رمز عبور الزامی است.');
    redirect(url);
  }

  let res;
  try {
    res = await fetch(`${process.env.API_URL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: identifier,
        password,
      }),
    });
  } catch (e) {
    const url = encodeURI('/login?error=خطا در ارتباط با سرور. دوباره تلاش کنید.');
    redirect(url);
  }

  let data: any = {};
  try {
    data = await res.json();
  } catch {
    // پاسخ خالی بود
  }

  if (!res.ok) {
    const msg = data?.message || `خطا ${res.status}`;
    const url = encodeURI(`/signin?error=${msg}`);
    redirect(url);
  }

  // console.log(data);
  // با await cookies() کوکی‌استور را بگیرید
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'token',
    value: data.token,
    path: '/dashboard',
  });

  // console.log(cookieStore);
  redirect('/dashboard');
}
