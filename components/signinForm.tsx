"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock, Mail, User, ArrowRight } from "lucide-react";
import { loginAction } from "@/app/login/actions";
import { ErrorMessage } from "./ErrorMessage";

export default function ModernSignInForm() {
  const refId = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    refId.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // مستقیماً از فرم یک شیء built-in FormData می‌سازیم
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      // چون loginAction تایپش به دنبال همان FormData داخلی است،
      // مستقیماً این formData را پاس می‌دهیم
      await loginAction(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-gradient-to-br dark:from-slate-800 dark:via-blue-800 dark:to-indigo-900">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800 dark:border-gray-600 dark:backdrop-blur-sm">
          <CardHeader className="space-y-4 pb-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:text-white">
                خوش آمدید
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">برای ادامه وارد حساب کاربری خود شوید</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <ErrorMessage />

              <div className="space-y-2">
                <Label
                  htmlFor="identifier"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  ایمیل یا نام‌کاربری
                </Label>
                <div className="relative">
                  <Input
                    id="identifier"
                    name="identifier"
                    ref={refId}
                    type="text"
                    placeholder="user@example.com یا username"
                    className="h-12 pl-12 pr-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    disabled={isLoading}
                  />
                  <User className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  رمز عبور
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={show ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 pl-12 pr-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((p) => !p)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 dark:text-gray-500 dark:hover:text-gray-400"
                    disabled={isLoading}
                  >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 dark:from-blue-700 dark:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    ورود
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400">یا</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                حساب ندارید؟{" "}
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                  disabled={isLoading}
                >
                  ثبت‌نام کنید
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            با ورود، شما با{" "}
            <a href="#" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
              شرایط استفاده
            </a>{" "}
            و{" "}
            <a href="#" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
              حریم خصوصی
            </a>{" "}
            ما موافقت می‌کنید
          </p>
        </div>
      </div>
    </div>
  );
}
