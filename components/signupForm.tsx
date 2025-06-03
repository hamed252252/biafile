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
    const [errors, setErrors] = useState<Partial<FormData>>({});
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        if (name === "password") setStrength(calcStrength(value));
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
            e.password = "رمز عبور باید حداقل ۸ کاراکتر باشد";
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
            const res = await fetch("https://api.biafile.ir/Api/Accounts/User", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json-patch+json",
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setGeneralError(data.message || "خطای ثبت‌نام");
                return;
            }
            // ثبت نام موفق — هدایت به صفحه ورود
            router.push("/signin");
        } catch {
            setGeneralError("خطا در ارتباط با سرور");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 dark:bg-gradient-to-r dark:from-purple-800 dark:via-indigo-700 dark:to-blue-800">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
            >
                <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">
                    ثبت‌نام
                </h1>

                {[{ label: "نام کاربری", name: "userName", type: "text" }, { label: "ایمیل", name: "email", type: "email" }].map((field) => (
                    <div key={field.name} className="mb-5">
                        <Label htmlFor={field.name} className="block text-gray-700 dark:text-gray-300 font-medium">
                            {field.label}
                        </Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            value={form[field.name as keyof FormData]}
                            onChange={handleChange}
                            className={cn("w-full p-3 border rounded-lg mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white", errors[field.name as keyof FormData] && "border-red-500")}
                        />
                        {errors[field.name as keyof FormData] && (
                            <p className="text-red-500 text-sm mt-1">{errors[field.name as keyof FormData]}</p>
                        )}
                    </div>
                ))}

                <div className="mb-5 relative">
                    <Label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-medium">
                        رمز عبور
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        type={show ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="absolute inset-y-0 left-3 flex items-center text-gray-600 dark:text-gray-400"
                    >
                        {show ? <EyeOff /> : <Eye />}
                    </button>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    <Progress value={strength} className="mt-2" />
                </div>

                <div className="mb-5">
                    <Label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-300 font-medium">
                        تأیید رمز عبور
                    </Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                {generalError && <p className="text-red-500 mb-4 text-center">{generalError}</p>}

                <Button type="submit" className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 transition duration-300">
                    ثبت‌نام
                </Button>

                <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
                    قبلا ثبت‌نام کرده‌اید؟{" "}
                    <button
                        type="button"
                        onClick={() => router.push("/signin")}
                        className="text-purple-600 dark:text-purple-400 hover:underline"
                    >
                        ورود
                    </button>
                </p>
            </form>
        </div>
    );
}
