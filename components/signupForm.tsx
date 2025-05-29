// app/(auth)/signup/page.tsx
"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    roleName: string;
    customerID: number;
    mobile: string;
}

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState<FormData>({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        roleName: "کاربر",
        customerID: 0,
        mobile: "",
    });
    const [errors, setErrors] = useState<Partial<FormData>>(
        {}
    );
    const [strength, setStrength] = useState(0);
    const [show, setShow] = useState(false);
    const [generalError, setGeneralError] = useState("");

    const calcStrength = (pwd: string) => {
        let s = 0;
        if (pwd.length >= 8) s += 25;
        if (/[A-Z]/.test(pwd)) s += 25;
        if (/[a-z]/.test(pwd)) s += 25;
        if (/\d/.test(pwd)) s += 25;
        return s;
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        if (name === "password")
            setStrength(calcStrength(value));
    };

    const validate = () => {
        const e: Partial<FormData> = {};
        let ok = true;
        if (!form.userName.trim()) {
            e.userName = "نام کاربری الزامی است";
            ok = false;
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            e.email = "ایمیل نامعتبر است";
            ok = false;
        }
        if (form.password.length < 8) {
            e.password =
                "رمز عبور باید حداقل ۸ کاراکتر باشد";
            ok = false;
        }
        if (form.password !== form.confirmPassword) {
            e.confirmPassword = "رمزها مطابقت ندارند";
            ok = false;
        }
        setErrors(e);
        return ok;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setGeneralError("");
        if (!validate()) return;

        try {
            const res = await fetch(
                "https://api.biafile.ir/Api/Accounts/User",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json-patch+json",
                    },
                    body: JSON.stringify(form),
                }
            );
            const data = await res.json();
            if (!res.ok) {
                setGeneralError(
                    data.message || "خطای ثبت‌نام"
                );
                return;
            }
            // ثبت نام موفق — هدایت به صفحه ورود
            router.push("/login");
        } catch {
            setGeneralError("خطا در ارتباط با سرور");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-lg shadow"
            >
                <h1 className="text-2xl text-center mb-6">
                    ثبت‌نام
                </h1>

                {[
                    {
                        label: "نام کاربری",
                        name: "userName",
                        type: "text",
                    },
                    {
                        label: "ایمیل",
                        name: "email",
                        type: "email",
                    },
                ].map((f) => (
                    <div
                        key={f.name}
                        className="mb-4"
                    >
                        <Label htmlFor={f.name}>
                            {f.label}
                        </Label>
                        <Input
                            id={f.name}
                            name={f.name}
                            type={f.type}
                            value={
                                form[
                                    f.name as keyof FormData
                                ]
                            }
                            onChange={handleChange}
                            className={cn(
                                errors[
                                    f.name as keyof FormData
                                ] && "border-red-500"
                            )}
                        />
                        {errors[
                            f.name as keyof FormData
                        ] && (
                            <p className="text-red-500 text-sm mt-1">
                                {
                                    errors[
                                        f.name as keyof FormData
                                    ]
                                }
                            </p>
                        )}
                    </div>
                ))}

                <div className="mb-4 relative">
                    <Label htmlFor="password">
                        رمز عبور
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        type={show ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="absolute inset-y-0 left-0 pr-3 flex items-center"
                    >
                        {show ? <EyeOff /> : <Eye />}
                    </button>
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                        </p>
                    )}
                    <Progress
                        value={strength}
                        className="mt-2"
                    />
                </div>

                <div className="mb-4">
                    <Label htmlFor="confirmPassword">
                        تأیید رمز عبور
                    </Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                {generalError && (
                    <p className="text-red-500 mb-4">
                        {generalError}
                    </p>
                )}

                <Button
                    type="submit"
                    className="w-full"
                >
                    ثبت‌نام
                </Button>

                <p className="text-center mt-4">
                    قبلا ثبت‌نام کرده‌اید؟{" "}
                    <button
                        type="button"
                        onClick={() =>
                            router.push("/signin")
                        }
                        className="text-primary hover:underline"
                    >
                        ورود
                    </button>
                </p>
            </form>
        </div>
    );
}
