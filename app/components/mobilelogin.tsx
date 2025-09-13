'use client';
import React, { useState, useRef, useEffect } from 'react';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

const API_SEND = 'https://api.biafile.ir/Api/SmsOtpCodes/SendCode/Public';
const API_VERIFY = 'https://api.biafile.ir/Api/SmsOtpCodes/Verify/Public';
const API_LOGIN = 'https://api.biafile.ir/Api/auth/Login';

export function MobileLoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp' | 'password'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(API_SEND, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await res.json();

      if (data.statusCode === -200) {
        setStep('password');
        setIsLoading(false);
        return;
      }

      setStep('otp');
      setIsLoading(false);
    } catch (err) {
      setError('خطا در ارسال کد. دوباره تلاش کنید');
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('Text').trim().slice(0, 6);
    if (!/^\d{1,6}$/.test(pasteData)) return;
    const digits = pasteData.split('');
    const newOtp = Array(6)
      .fill('')
      .map((_, i) => digits[i] || '');
    setOtp(newOtp);
    const nextFocus = digits.length >= 6 ? 5 : digits.length;
    inputRefs.current[nextFocus]?.focus();
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(API_VERIFY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, code: otp.join('') }),
      });
      const data = await res.json();

      if (data.statusCode !== 200) {
        setError(data.message || 'کد تایید اشتباه است');
        setIsLoading(false);
        return;
      }

      // ذخیره توکن و هدایت
      if (data.token) Cookie.set('token', data.token, { expires: 7 });
      router.push('/dashboard');
      setIsLoading(false);
    } catch (err) {
      setError('خطا در تایید کد. دوباره تلاش کنید');
      setIsLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(API_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: phoneNumber, password }),
      });
      const data = await res.json();

      if (data.statusCode !== 200) {
        setError(data.message || 'رمز عبور اشتباه است');
        setIsLoading(false);
        return;
      }

      if (data.token) Cookie.set('token', data.token, { expires: 7 });
      router.push('/dashboard');
      setIsLoading(false);
    } catch (err) {
      setError('خطا در ورود. دوباره تلاش کنید');
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp(Array(6).fill(''));
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center h-screen bg-gradient-to-tr from-primary/1000 via-background/50 to-background/100">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-xl md:max-w-lg">
        <CardHeader className="text-center space-y-6 pb-8 md:pb-10 md:pt-10">
          <div className="mx-auto w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary/30 to-primary/20 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105">
            <Shield className="w-10 h-10 md:w-12 md:h-12 text-primary" />
          </div>
          <div className="space-y-3 md:space-y-4">
            <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
              {step === 'phone'
                ? 'ورود به حساب کاربری'
                : step === 'otp'
                  ? 'تایید شماره موبایل'
                  : 'ورود با رمز عبور'}
            </CardTitle>
            <CardDescription
              className="text-primary/70 text-base md:text-lg leading-relaxed"
              dir="rtl"
            >
              {step === 'phone'
                ? 'شماره موبایل خود را وارد کنید'
                : step === 'otp'
                  ? `کد تایید به شماره ${phoneNumber} ارسال شد`
                  : 'شماره موبایل قبلا ثبت شده، رمز عبور خود را وارد کنید'}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 md:space-y-10 px-6 md:px-8 pb-8 md:pb-10">
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <Label
                  htmlFor="phone"
                  className="text-sm md:text-base font-semibold text-right block text-primary/80"
                  dir="rtl"
                >
                  شماره موبایل
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="09123456789"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-14 md:h-16 text-right text-lg md:text-xl border-2 border-primary/50 focus:border-primary rounded-xl transition-colors"
                  dir="rtl"
                  required
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm md:text-base bg-red-50 border border-red-200 p-4 md:p-5 rounded-xl">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-colors"
              >
                {isLoading ? 'در حال ارسال...' : 'ادامه'}
              </Button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-6 md:space-y-8">
              <Label className="text-sm md:text-base font-semibold text-center text-primary/80">
                کد تایید ۶ رقمی را وارد کنید
              </Label>
              <div className="flex justify-center gap-2 md:gap-3">
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {error && (
                <div className="text-red-600 text-sm md:text-base bg-red-50 border border-red-200 p-4 md:p-5 rounded-xl">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-colors"
              >
                {isLoading ? (
                  'در حال تایید...'
                ) : (
                  <>
                    <CheckCircle className="inline w-5 h-5 mr-2" /> تایید و ورود
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                onClick={handleBackToPhone}
                className="w-full text-primary/80 hover:text-primary mt-2"
              >
                تغییر شماره
              </Button>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={handlePasswordLogin} className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <Label
                  htmlFor="password"
                  className="text-sm md:text-base font-semibold text-right block text-primary/80"
                  dir="rtl"
                >
                  رمز عبور
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="رمز عبور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 md:h-16 text-right text-lg md:text-xl border-2 border-primary/50 focus:border-primary rounded-xl transition-colors"
                  dir="rtl"
                  required
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm md:text-base bg-red-50 border border-red-200 p-4 md:p-5 rounded-xl">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-colors"
              >
                {isLoading ? 'در حال ورود...' : 'ورود'}
              </Button>
              <Button
                variant="ghost"
                onClick={handleBackToPhone}
                className="w-full text-primary/80 hover:text-primary mt-2"
              >
                تغییر شماره
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
