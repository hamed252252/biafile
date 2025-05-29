"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { loginAction } from "@/app/login/actions";
import { ErrorMessage } from "./ErrorMessage";

export default function SignInForm() {
    const refId = useRef<HTMLInputElement>(null);
    const [show, setShow] = useState(false);
    const router = useRouter();

    useEffect(() => {
        refId.current?.focus();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
            <form
                action={loginAction}
                className="w-full max-w-md bg-white p-8 rounded-lg shadow"
                noValidate
            >
                <h1 className="text-2xl text-center mb-6">
                    ورود
                </h1>

                <ErrorMessage />

                <div className="mb-4">
                    <Label htmlFor="identifier">
                        ایمیل یا نام‌کاربری
                    </Label>
                    <Input
                        id="identifier"
                        name="identifier"
                        ref={refId}
                        type="text"
                        placeholder="user@example.com یا username"
                        className={cn(/* دلخواه */)}
                    />
                </div>

                <div className="mb-4 relative">
                    <Label htmlFor="password">
                        رمز عبور
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        type={show ? "text" : "password"}
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShow((p) => !p)}
                        className="absolute inset-y-0 left-0 top-6 px-3 flex items-center"
                    >
                        {show ? <EyeOff /> : <Eye />}
                    </button>
                </div>

                <Button
                    type="submit"
                    className="w-full mb-4 flex items-center justify-center"
                >
                    <Lock className="w-5 h-5 ml-2" />
                    ورود
                </Button>

                <p className="text-center text-sm text-gray-600">
                    حساب ندارید؟{" "}
                    <button
                        type="button"
                        onClick={() =>
                            router.push("/signup")
                        }
                        className="text-primary hover:underline"
                    >
                        ثبت‌نام
                    </button>
                </p>
            </form>
        </div>
    );
}
