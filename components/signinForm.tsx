"use client";

import {
    useState,
    useEffect,
    ChangeEvent,
    FormEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Eye,
    EyeOff,
    Mail,
    Phone,
    Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
type Errors = {
    email?: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
};

export default function MultiOptionAuthForm() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [authMethod, setAuthMethod] = useState("email");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Errors>({});

    const [passwordStrength, setPasswordStrength] =
        useState(0);

    useEffect(() => {
        if (isSignUp && authMethod === "email") {
            setPasswordStrength(
                calculatePasswordStrength(password)
            );
        }
        if (isSignUp) {
            router.push("/signup"); // Redirect to the signup page when `isSignUp` is true
        }
    }, [password, isSignUp, authMethod]);
    const router = useRouter();

    const calculatePasswordStrength = (
        password: string
    ): number => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password)
        )
            strength += 25;
        if (/\d/.test(password)) strength += 25;
        if (/[^a-zA-Z\d]/.test(password)) strength += 25;
        return strength;
    };

    const validateForm = (): boolean => {
        const newErrors: Errors = {};
        let isValid = true;

        if (
            authMethod === "email" &&
            !/\S+@\S+\.\S+/.test(email)
        ) {
            newErrors.email = "ایمیل نامعتبر است";
            isValid = false;
        } else if (
            authMethod === "phone" &&
            !/^\+?[1-9]\d{1,14}$/.test(phoneNumber)
        ) {
            newErrors.phoneNumber =
                "شماره تلفن نامعتبر است";
            isValid = false;
        }

        if (authMethod !== "gmail" && password.length < 8) {
            newErrors.password =
                "رمز عبور باید حداقل ۸ کاراکتر باشد";
            isValid = false;
        }

        if (isSignUp && password !== confirmPassword) {
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
            // منطق احراز هویت اینجا اجرا می‌شود
            console.log("فرم ارسال شد:", {
                authMethod,
                email,
                phoneNumber,
                password,
                isSignUp,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
            >
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        {isSignUp
                            ? "ساخت حساب کاربری"
                            : "ورود به حساب کاربری"}
                    </h2>
                </div>
                <Tabs
                    value={authMethod}
                    onValueChange={setAuthMethod}
                    className="w-full"
                >
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="email">
                            ایمیل
                        </TabsTrigger>
                        <TabsTrigger value="gmail">
                            جیمیل
                        </TabsTrigger>
                        <TabsTrigger value="phone">
                            شماره تلفن
                        </TabsTrigger>
                    </TabsList>
                    <form
                        className="gap-y-6"
                        onSubmit={handleSubmit}
                    >
                        {authMethod === "email" && (
                            <div className="gap-y-2 flex flex-col my-2">
                                <InputField
                                    id="email-address"
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    placeholder="آدرس ایمیل"
                                    error={errors.email}
                                />
                                <PasswordField
                                    showPassword={
                                        showPassword
                                    }
                                    setShowPassword={
                                        setShowPassword
                                    }
                                    password={password}
                                    setPassword={
                                        setPassword
                                    }
                                    error={errors.password}
                                />
                                {isSignUp && (
                                    <ConfirmPasswordField
                                        confirmPassword={
                                            confirmPassword
                                        }
                                        setConfirmPassword={
                                            setConfirmPassword
                                        }
                                        error={
                                            errors.confirmPassword
                                        }
                                    />
                                )}
                                {isSignUp && (
                                    <PasswordStrengthIndicator
                                        passwordStrength={
                                            passwordStrength
                                        }
                                    />
                                )}
                            </div>
                        )}
                        {authMethod === "gmail" && (
                            <Button
                                type="button"
                                className="group w-full flex justify-center my-2 py-2 px-4 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            >
                                <Mail className="w-5 h-5 mr-2" />
                                ادامه با جیمیل
                            </Button>
                        )}
                        {authMethod === "phone" && (
                            <div className="my-2 space-y-2">
                                <InputField
                                    id="phone-number"
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(
                                            e.target.value
                                        )
                                    }
                                    placeholder="شماره تلفن"
                                    error={
                                        errors.phoneNumber
                                    }
                                />
                                {!isSignUp && (
                                    <PasswordField
                                        showPassword={
                                            showPassword
                                        }
                                        setShowPassword={
                                            setShowPassword
                                        }
                                        password={password}
                                        setPassword={
                                            setPassword
                                        }
                                        error={
                                            errors.password
                                        }
                                    />
                                )}
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                        >
                            <Lock className="w-5 h-5 mr-2" />
                            {isSignUp ? "ثبت نام" : "ورود"}
                        </Button>
                        <p className="text-sm text-gray-600 text-right my-2">
                            <button
                                onClick={() =>
                                    setIsSignUp(!isSignUp)
                                }
                                className="font-medium text-primary hover:text-primary-dark transition-colors"
                            >
                                {isSignUp
                                    ? "ورود به حساب کاربری"
                                    : "ساخت حساب جدید"}
                            </button>
                        </p>
                    </form>
                </Tabs>
            </motion.div>
        </div>
    );
}

interface InputFieldProps {
    id: string;
    type: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    type,
    value,
    onChange,
    placeholder,
    error,
}) => (
    <div className="gap-y-2">
        <Label
            htmlFor={id}
            className="sr-only"
        >
            {placeholder}
        </Label>
        <Input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={cn(
                "w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:ring-primary focus:border-primary",
                error && "border-red-500"
            )}
        />
        {error && (
            <p className="text-red-500 text-xs mt-1">
                {error}
            </p>
        )}
    </div>
);

interface PasswordFieldProps {
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    password: string;
    setPassword: (password: string) => void;
    error?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
    showPassword,
    setShowPassword,
    password,
    setPassword,
    error,
}) => (
    <div className="relative">
        <Label
            htmlFor="password"
            className="sr-only"
        >
            رمز عبور
        </Label>
        <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
            className={cn(
                "w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:ring-primary focus:border-primary",
                error && "border-red-500"
            )}
        />
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
            {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
            ) : (
                <Eye className="h-5 w-5 text-gray-500" />
            )}
        </button>
        {error && (
            <p className="text-red-500 text-xs mt-1">
                {error}
            </p>
        )}
    </div>
);

interface ConfirmPasswordFieldProps {
    confirmPassword: string;
    setConfirmPassword: (confirmPassword: string) => void;
    error?: string;
}

const ConfirmPasswordField: React.FC<
    ConfirmPasswordFieldProps
> = ({ confirmPassword, setConfirmPassword, error }) => (
    <div>
        <Label
            htmlFor="confirm-password"
            className="sr-only"
        >
            تأیید رمز عبور
        </Label>
        <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) =>
                setConfirmPassword(e.target.value)
            }
            placeholder="تأیید رمز عبور"
            className={cn(
                "w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:ring-primary focus:border-primary",
                error && "border-red-500"
            )}
        />
        {error && (
            <p className="text-red-500 text-xs mt-1">
                {error}
            </p>
        )}
    </div>
);

interface PasswordStrengthIndicatorProps {
    passwordStrength: number;
}

const PasswordStrengthIndicator: React.FC<
    PasswordStrengthIndicatorProps
> = ({ passwordStrength }) => (
    <div className="mt-4">
        <Label
            htmlFor="password-strength"
            className="text-sm font-medium text-gray-700"
        >
            قدرت رمز عبور
        </Label>
        <Progress
            value={passwordStrength}
            className="mt-2"
        />
        <p className="text-xs text-gray-500 mt-1">
            {passwordStrength < 50
                ? "ضعیف"
                : passwordStrength < 75
                ? "متوسط"
                : "قوی"}
        </p>
    </div>
);
