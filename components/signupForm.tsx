"use client";
import React, {
    useState,
    ChangeEvent,
    FormEvent,
} from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeOffIcon } from "lucide-react";

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignupForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Partial<FormData>>(
        {}
    );
    const [passwordStrength, setPasswordStrength] =
        useState(0);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === "password")
            setPasswordStrength(
                calculatePasswordStrength(value)
            );
    };

    const calculatePasswordStrength = (
        password: string
    ): number => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/\d/.test(password)) strength += 25;
        return strength;
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};
        let isValid = true;

        if (!formData.username.trim()) {
            newErrors.username = "نام کاربری الزامی است";
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = "ایمیل الزامی است";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "ایمیل نامعتبر است";
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = "رمز عبور الزامی است";
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password =
                "رمز عبور باید حداقل ۸ کاراکتر باشد";
            isValid = false;
        }
        if (
            formData.password !== formData.confirmPassword
        ) {
            newErrors.confirmPassword =
                "رمزهای عبور مطابقت ندارند";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("فرم ارسال شد", formData);
        }
    };

    return (
        <Card className="max-w-md mx-auto mt-10 p-6 shadow-xl rounded-lg border border-gray-200 bg-white">
            <CardHeader className="text-center mb-4">
                <CardTitle className="text-2xl font-semibold text-gray-800">
                    ایجاد حساب کاربری
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {[
                        {
                            label: "نام کاربری",
                            type: "text",
                            name: "username",
                        },
                        {
                            label: "ایمیل",
                            type: "email",
                            name: "email",
                        },
                        {
                            label: "رمز عبور",
                            type: showPassword
                                ? "text"
                                : "password",
                            name: "password",
                        },
                        {
                            label: "تأیید رمز عبور",
                            type: "password",
                            name: "confirmPassword",
                        },
                    ].map((field, index) => (
                        <div
                            className="mb-6 relative"
                            key={index}
                        >
                            <Label
                                htmlFor={field.name}
                                className="mb-2 block text-gray-600 font-medium"
                            >
                                {field.label}
                            </Label>
                            <Input
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                value={
                                    formData[
                                        field.name as keyof FormData
                                    ]
                                }
                                onChange={handleChange}
                                className={`w-full p-3 rounded-lg border relative ${
                                    errors[
                                        field.name as keyof FormData
                                    ]
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } focus:outline-none focus:ring-2 focus:ring-primary`}
                            />
                            {errors[
                                field.name as keyof FormData
                            ] && (
                                <p className="text-red-500 text-sm mt-1">
                                    {
                                        errors[
                                            field.name as keyof FormData
                                        ]
                                    }
                                </p>
                            )}
                            {field.name === "password" && (
                                <>
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        variant="ghost"
                                        className="absolute top-7 left-0"
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5 text-gray-500" />
                                        )}
                                    </Button>
                                    <Progress
                                        value={
                                            passwordStrength
                                        }
                                        max={100}
                                        className="mt-2"
                                    />
                                    <p className="text-sm mt-1">
                                        قدرت رمز عبور:{" "}
                                        {passwordStrength <
                                        50
                                            ? "ضعیف"
                                            : passwordStrength <
                                              75
                                            ? "متوسط"
                                            : "قوی"}
                                    </p>
                                </>
                            )}
                        </div>
                    ))}
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full py-3 mt-4 font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-all"
                        >
                            ثبت نام
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
};

export default SignupForm;
