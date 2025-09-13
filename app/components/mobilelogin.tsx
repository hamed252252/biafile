'use client';

import React, { useState } from 'react';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, RefreshCw } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

const API_SEND = 'https://api.biafile.ir/Api/SmsOtpCodes/SendCode/Public';
const API_VERIFY = 'https://api.biafile.ir/Api/SmsOtpCodes/Verify/Public';

export function MobileLoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(API_SEND, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await res.json();

      if (data.statusCode === 200) {
        setStep('otp');
        startTimer();
      } else {
        setError(data.message || 'خطا در ارسال کد');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      setError('کد تایید باید ۶ رقمی باشد');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(API_VERIFY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, code: otp }),
      });
      const data = await res.json();

      if (data.statusCode !== 200) {
        setError(data.message || 'کد تایید اشتباه است');
        return;
      }

      if (data.token) Cookie.set('token', data.token, { expires: 7 });
      router.push('/dashboard');
    } catch (err) {
      setError('خطا در تایید کد. دوباره تلاش کنید');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp('');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center h-screen bg-gradient-to-tr from-primary/1000 via-background/50 to-background/100">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-xl md:max-w-lg">
        <CardHeader className="text-center space-y-6 pb-8 md:pb-10 md:pt-10">
          <div className="mx-auto w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary/30 to-primary/20 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-10 h-10 md:w-12 md:h-12 text-primary" />
          </div>
          <div className="space-y-3 md:space-y-4">
            <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
              {step === 'phone' ? 'ورود به حساب کاربری' : 'تایید شماره موبایل'}
            </CardTitle>
            <CardDescription
              className="text-primary/70 text-base md:text-lg leading-relaxed"
              dir="rtl"
            >
              {step === 'phone'
                ? 'شماره موبایل خود را وارد کنید'
                : `کد تایید به شماره ${phoneNumber} ارسال شد`}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 md:space-y-10 px-6 md:px-8 pb-8 md:pb-10">
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <Label htmlFor="phone" className="text-right block text-primary/80" dir="rtl">
                  شماره موبایل
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="09123456789"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-14 md:h-16 text-right text-lg border-2 border-primary/50 focus:border-primary rounded-xl"
                  dir="rtl"
                  required
                />
              </div>
              {error && <div className="text-red-600">{error}</div>}
              <Button type="submit" className="w-full h-14">
                {isLoading ? 'در حال ارسال...' : 'دریافت کد'}
              </Button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-6 md:space-y-8">
              <Label className="text-center text-primary/80">کد تایید ۶ رقمی را وارد کنید</Label>
              <div className="flex justify-center">
                <InputOTP
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                >
                  <InputOTPGroup dir="ltr">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {error && <div className="text-red-600">{error}</div>}

              <Button type="submit" className="w-full h-14">
                {isLoading ? (
                  'در حال تایید...'
                ) : (
                  <>
                    <CheckCircle className="inline w-5 h-5 mr-2" /> تایید و ورود
                  </>
                )}
              </Button>

              <div className="flex flex-col gap-2 items-center">
                {timer > 0 ? (
                  <span className="text-primary/60 text-sm">
                    ارسال مجدد کد تا {timer} ثانیه دیگر
                  </span>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleSendOtp}
                    className="text-primary flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" /> ارسال مجدد کد
                  </Button>
                )}

                <Button variant="ghost" onClick={handleBackToPhone} className="text-primary/60">
                  تغییر شماره
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
