'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, RefreshCw, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Alert, AlertDescription } from '@/components/ui/alert';

const API_SEND = 'https://api.biafile.ir/Api/SmsOtpCodes/SendCode/Public';
const API_VERIFY = 'https://api.biafile.ir/Api/SmsOtpCodes/Verify/Public';

const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^09[0-9]{9}$/;
  return phoneRegex.test(phone);
};

export function MobileLoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const startTimer = () => {
    setTimer(120); // Increased to 2 minutes for better UX
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    setPhoneError('');
    setError('');
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError('شماره موبایل باید با 09 شروع شده و 11 رقمی باشد');
      return;
    }

    setIsLoading(true);
    setError('');
    setPhoneError('');

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
        setError(data.message || 'خطا در ارسال کد تایید');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید');
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
        setError(data.message || 'کد تایید اشتباه است. دوباره تلاش کنید');
        return;
      }

      if (data.token) Cookie.set('token', data.token, { expires: 7 });
      router.push('/dashboard');
    } catch (err) {
      setError('خطا در تایید کد. لطفاً دوباره تلاش کنید');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp('');
    setError('');
    setPhoneError('');
    setTimer(0);
  };

  useEffect(() => {
    if (otp.length === 6 && step === 'otp' && !isLoading) {
      handleVerifyOtp({ preventDefault: () => {} } as React.FormEvent);
    }
  }, [otp, step, isLoading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background/50 to-background p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-xl transition-all duration-300 hover:shadow-3xl">
        <CardHeader className="text-center space-y-6 pb-8 pt-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-3">
            <CardTitle className="text-2xl font-bold text-primary transition-all duration-300">
              {step === 'phone' ? 'ورود به حساب کاربری' : 'تایید شماره موبایل'}
            </CardTitle>
            <CardDescription className="text-primary/70 text-base leading-relaxed" dir="rtl">
              {step === 'phone'
                ? 'شماره موبایل خود را وارد کنید'
                : `کد تایید به شماره ${phoneNumber} ارسال شد`}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-6 pb-8">
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-3">
                <Label
                  htmlFor="phone"
                  className="text-right block text-primary/80 font-medium"
                  dir="rtl"
                >
                  شماره موبایل
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="09123456789"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className="h-14 text-right text-lg border-2 border-primary/20 focus:border-primary rounded-xl transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  dir="rtl"
                  required
                  disabled={isLoading}
                  maxLength={11}
                />
                {phoneError && (
                  <Alert variant="destructive" className="text-right" dir="rtl">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{phoneError}</AlertDescription>
                  </Alert>
                )}
              </div>

              {error && (
                <Alert variant="destructive" className="text-right" dir="rtl">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-14 text-lg font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading || !phoneNumber.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin ml-2" />
                    در حال ارسال...
                  </>
                ) : (
                  'دریافت کد تایید'
                )}
              </Button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="text-center space-y-4">
                <Label className="text-primary/80 font-medium block">
                  کد تایید ۶ رقمی را وارد کنید
                </Label>
                <div className="flex justify-center">
                  <InputOTP
                    value={otp}
                    onChange={(value) => {
                      setOtp(value);
                      setError('');
                    }}
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    disabled={isLoading}
                  >
                    <InputOTPGroup dir="ltr" className="gap-2">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="w-12 h-12 text-lg border-2 border-primary/20 focus:border-primary rounded-lg transition-all duration-200"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="text-right" dir="rtl">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-14 text-lg font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading || otp.length < 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin ml-2" />
                    در حال تایید...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 ml-2" />
                    تایید و ورود
                  </>
                )}
              </Button>

              <div className="flex flex-col gap-3 items-center pt-4 border-t border-primary/10">
                {timer > 0 ? (
                  <div className="text-center space-y-2">
                    <div className="text-primary/60 text-sm">
                      ارسال مجدد کد تا {Math.floor(timer / 60)}:
                      {(timer % 60).toString().padStart(2, '0')} دقیقه دیگر
                    </div>
                    <div className="w-full bg-primary/10 rounded-full h-1">
                      <div
                        className="bg-primary h-1 rounded-full transition-all duration-1000"
                        style={{ width: `${((120 - timer) / 120) * 100}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleSendOtp}
                    className="text-primary hover:bg-primary/10 transition-all duration-200"
                    disabled={isLoading}
                  >
                    <RefreshCw className="w-4 h-4 ml-2" />
                    ارسال مجدد کد
                  </Button>
                )}

                <Button
                  variant="ghost"
                  onClick={handleBackToPhone}
                  className="text-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                  disabled={isLoading}
                >
                  <ArrowRight className="w-4 h-4 ml-2" />
                  تغییر شماره موبایل
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
