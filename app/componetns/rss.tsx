"use client";

import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
} from "react";
import { toJalaali } from "jalaali-js";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Mail,
    Send,
    CheckCircle,
    AlertCircle,
    Loader2,
    Bell,
    Shield,
    Sparkles,
    Star,
    TrendingUp,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    motion,
    AnimatePresence,
    useAnimation,
    useInView,
    TargetAndTransition,
} from "framer-motion";
import type {
    NewsletterResponse,
    NewsletterEntity,
    NewsletterPayload,
} from "@/types/newsletter";
import confetti from "canvas-confetti";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24,
        },
    },
};
// Pulse animation (typed correctly)
const pulseAnimation: TargetAndTransition = {
    scale: [1, 1.02, 1],
    transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
    },
};
const shimmerAnimation = {
    x: ["0%", "100%"],
    transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
    },
};

// Confetti helper
const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
    };
    const rand = (min: number, max: number) =>
        Math.random() * (max - min) + min;
    const interval = setInterval(() => {
        const timeLeft = end - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const count = 50 * (timeLeft / duration);
        confetti({
            ...defaults,
            particleCount: count,
            origin: {
                x: rand(0.1, 0.3),
                y: Math.random() - 0.2,
            },
        });
        confetti({
            ...defaults,
            particleCount: count,
            origin: {
                x: rand(0.7, 0.9),
                y: Math.random() - 0.2,
            },
        });
    }, 250);
};

// Feature block
const FeatureItem = ({
    icon: Icon,
    title,
    description,
}: {
    icon: any;
    title: string;
    description: string;
}) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, {
        once: true,
        margin: "-100px",
    });
    useEffect(() => {
        if (inView) controls.start("visible");
    }, [controls, inView]);
    return (
        <motion.div
            ref={ref}
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            className="flex items-start space-x-4 space-x-reverse"
        >
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                    {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

// Animated counter
const AnimatedCounter = ({
    value,
    label,
}: {
    value: number;
    label: string;
}) => {
    const [count, setCount] = useState(0);
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 2000;
        const step = Math.ceil(value / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start > value) {
                setCount(value);
                clearInterval(timer);
            } else setCount(start);
        }, 16);
        controls.start("visible");
        return () => clearInterval(timer);
    }, [inView, value, controls]);
    return (
        <motion.div
            ref={ref}
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            className="text-center"
        >
            <motion.div
                className="text-2xl font-bold text-blue-600 dark:text-blue-400"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                {count.toLocaleString()}+
            </motion.div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
                {label}
            </div>
        </motion.div>
    );
};

export default function NewsletterForm() {
    // state
    const [email, setEmail] = useState("");
    const [existing, setExisting] = useState<string[]>([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [initLoading, setInitLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);
    const [successView, setSuccessView] = useState(false);

    // view + animation
    const formRef = useRef(null);
    const formControls = useAnimation();
    const inFormView = useInView(formRef, { once: true });
    useEffect(() => {
        if (inFormView) formControls.start("visible");
    }, [formControls, inFormView]);

    // email regex
    const isValid = (v: string) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(v.trim());

    // fetch existing
    const fetchExisting = useCallback(async () => {
        setInitLoading(true);
        try {
            const res = await fetch(
                "https://api.biafile.ir/Api/NewsLetters/AllForPublicPage"
            );
            if (!res.ok) throw new Error("Network error");
            const data =
                (await res.json()) as NewsletterResponse;
            if (
                data.status === "success" &&
                Array.isArray(data.entities)
            ) {
                setExisting(
                    data.entities.map((e) =>
                        e.email.toLowerCase()
                    )
                );
                setCount(data.countAllRecordTable);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setInitLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchExisting();
    }, [fetchExisting]);

    // submit handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (!isValid(email)) {
            setError("آدرس ایمیل معتبر نیست.");
            return;
        }
        setError(null);
        if (existing.includes(email.trim().toLowerCase())) {
            setMessage({
                type: "error",
                text: "شما قبلاً ثبت‌نام کرده‌اید.",
            });
            return;
        }
        setLoading(true);

        // jalali date + time
        const now = new Date();
        const { jy, jm, jd } = toJalaali(now);
        const jDate = `${jy}/${jm
            .toString()
            .padStart(2, "0")}/${jd
            .toString()
            .padStart(2, "0")}`;
        const hh = now
            .getHours()
            .toString()
            .padStart(2, "0");
        const mm = now
            .getMinutes()
            .toString()
            .padStart(2, "0");
        const ss = now
            .getSeconds()
            .toString()
            .padStart(2, "0");
        const time = `${hh}:${mm}:${ss}`;

        const payload: NewsletterPayload = {
            registerDate: jDate,
            editDate: jDate,
            uniqCode:
                (crypto as any).randomUUID?.() ||
                Math.random().toString(36).slice(2),
            registerTime: time,
            editTime: time,
            jsonLableTexts: "",
            resultJsonLables: [],
            visible: true,
            email,
        };

        try {
            const res = await fetch(
                "https://api.biafile.ir/Api/NewsLetters",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );
            const result = await res.json();
            if (!res.ok || result.status !== "success")
                throw new Error(
                    result.message || "خطای سرور"
                );
            setMessage({
                type: "success",
                text: "ایمیل با موفقیت ثبت شد!",
            });
            setEmail("");
            setSuccessView(true);
            triggerConfetti();
            await fetchExisting();
            setTimeout(() => setSuccessView(false), 5000);
        } catch (err: any) {
            console.error(err);
            setMessage({
                type: "error",
                text:
                    err.message || "ثبت ایمیل ناموفق بود.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            dir="rtl"
            className="relative overflow-hidden"
        >
            {/* background blobs */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.blue.100),theme(colors.indigo.50),white)] dark:bg-[radial-gradient(ellipse_at_top,theme(colors.gray.900),theme(colors.gray.800),theme(colors.gray.950))]"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="relative max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {/* header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="text-center mb-12"
                >
                    <motion.div
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.2,
                            duration: 0.5,
                        }}
                    >
                        <Sparkles className="h-4 w-4 mr-1" />
                        <span>
                            آخرین اخبار و بروزرسانی‌ها
                        </span>
                    </motion.div>
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold mb-4 relative"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.5,
                        }}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                            عضویت در خبرنامه
                        </span>
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 dark:from-blue-400/20 dark:via-indigo-400/20 dark:to-purple-400/20 blur-xl -z-10"
                            animate={pulseAnimation}
                        />
                    </motion.h1>
                    <motion.p
                        className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.4,
                            duration: 0.5,
                        }}
                    >
                        همیشه اولین نفری باشید که از آخرین
                        اخبار، محصولات و پیشنهادات ویژه ما
                        مطلع می‌شوید
                    </motion.p>
                </motion.div>

                {/* main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    {/* left: features */}
                    <motion.div
                        className="lg:col-span-2 space-y-6 hidden lg:block"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                                مزایای عضویت در خبرنامه
                            </h2>
                            <div className="space-y-5">
                                <FeatureItem
                                    icon={Bell}
                                    title="اطلاع از آخرین اخبار"
                                    description="اولین نفری باشید که از آخرین اخبار و رویدادها مطلع می‌شوید"
                                />
                                <FeatureItem
                                    icon={Zap}
                                    title="دسترسی به محتوای انحصاری"
                                    description="به محتوای ویژه و انحصاری ما دسترسی داشته باشید"
                                />
                                <FeatureItem
                                    icon={TrendingUp}
                                    title="آخرین بروزرسانی‌ها"
                                    description="از آخرین تغییرات و بروزرسانی‌های محصولات ما مطلع شوید"
                                />
                                <FeatureItem
                                    icon={Shield}
                                    title="حفظ حریم خصوصی"
                                    description="ما به حریم خصوصی شما احترام می‌گذاریم و اطلاعات شما را محرمانه نگه می‌داریم"
                                />
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4">
                                <AnimatedCounter
                                    value={count}
                                    label="مشترکین"
                                />
                                <AnimatedCounter
                                    value={24}
                                    label="خبرنامه در ماه"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* right: form */}
                    <motion.div
                        ref={formRef}
                        variants={containerVariants}
                        initial="hidden"
                        animate={formControls}
                        className="lg:col-span-3"
                    >
                        <AnimatePresence mode="wait">
                            {successView ? (
                                <motion.div
                                    key="success"
                                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-green-100 dark:border-green-900 text-center"
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                    }}
                                >
                                    <motion.div
                                        className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6"
                                        initial={{
                                            scale: 0,
                                        }}
                                        animate={{
                                            scale: 1,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20,
                                            delay: 0.2,
                                        }}
                                    >
                                        <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                                    </motion.div>
                                    <motion.h3
                                        className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay: 0.3,
                                        }}
                                    >
                                        ثبت‌نام با موفقیت
                                        انجام شد!
                                    </motion.h3>
                                    <motion.p
                                        className="text-gray-600 dark:text-gray-300 mb-8"
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay: 0.4,
                                        }}
                                    >
                                        از اینکه به جمع
                                        مشترکین ما پیوستید
                                        متشکریم. منتظر
                                        دریافت اخبار و
                                        بروزرسانی‌های ما
                                        باشید.
                                    </motion.p>
                                    <motion.button
                                        onClick={() =>
                                            setSuccessView(
                                                false
                                            )
                                        }
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-200"
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay: 0.5,
                                        }}
                                    >
                                        بازگشت به فرم
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                    }}
                                >
                                    {/* shimmer */}
                                    <motion.div
                                        className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 dark:via-blue-500/10 to-transparent skew-x-12 -translate-x-full z-0"
                                        animate={
                                            shimmerAnimation
                                        }
                                    />

                                    {initLoading ? (
                                        <div className="flex flex-col items-center justify-center py-12">
                                            <motion.div
                                                animate={{
                                                    rotate: 360,
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                            >
                                                <Loader2 className="h-12 w-12 text-blue-500" />
                                            </motion.div>
                                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                                                در حال
                                                بارگذاری
                                                اطلاعات...
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <motion.div
                                                variants={
                                                    itemVariants
                                                }
                                                className="relative z-10"
                                            >
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                                    به
                                                    خبرنامه
                                                    ما
                                                    بپیوندید
                                                </h2>
                                                <form
                                                    onSubmit={
                                                        handleSubmit
                                                    }
                                                    className="space-y-6"
                                                >
                                                    <motion.div
                                                        variants={
                                                            itemVariants
                                                        }
                                                        className="space-y-2"
                                                    >
                                                        <Label
                                                            htmlFor="email"
                                                            className="text-gray-700 dark:text-gray-200 text-sm font-medium flex items-center"
                                                        >
                                                            <Mail className="h-4 w-4 ml-2" />{" "}
                                                            آدرس
                                                            ایمیل
                                                        </Label>
                                                        <div className="relative">
                                                            <Input
                                                                id="email"
                                                                type="email"
                                                                dir="ltr"
                                                                value={
                                                                    email
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setEmail(
                                                                        e
                                                                            .target
                                                                            .value
                                                                    );
                                                                    setError(
                                                                        null
                                                                    );
                                                                    setMessage(
                                                                        null
                                                                    );
                                                                }}
                                                                placeholder="example@domain.com"
                                                                disabled={
                                                                    loading
                                                                }
                                                                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                                                    error
                                                                        ? "border-red-300 dark:border-red-500 focus:ring-red-500"
                                                                        : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                                                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 dark:focus:ring-blue-400 transition-all duration-200`}
                                                                aria-invalid={
                                                                    !!error
                                                                }
                                                                aria-describedby={
                                                                    error
                                                                        ? "email-error"
                                                                        : undefined
                                                                }
                                                            />
                                                            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                                        </div>
                                                        <AnimatePresence>
                                                            {error && (
                                                                <motion.p
                                                                    id="email-error"
                                                                    className="flex items-center text-sm text-red-600 dark:text-red-400 mt-1"
                                                                    initial={{
                                                                        opacity: 0,
                                                                        height: 0,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                        height: "auto",
                                                                    }}
                                                                    exit={{
                                                                        opacity: 0,
                                                                        height: 0,
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.2,
                                                                    }}
                                                                >
                                                                    <AlertCircle className="h-4 w-4 ml-1" />{" "}
                                                                    {
                                                                        error
                                                                    }
                                                                </motion.p>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.div>

                                                    <motion.div
                                                        variants={
                                                            itemVariants
                                                        }
                                                    >
                                                        <Button
                                                            type="submit"
                                                            disabled={
                                                                loading ||
                                                                !!error ||
                                                                !email
                                                            }
                                                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 space-x-reverse transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                                        >
                                                            {loading ? (
                                                                <>
                                                                    <Loader2 className="h-5 w-5 animate-spin ml-2" />
                                                                    <span>
                                                                        در
                                                                        حال
                                                                        ارسال...
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Send className="h-5 w-5 ml-2" />
                                                                    <span>
                                                                        عضویت
                                                                        در
                                                                        خبرنامه
                                                                    </span>
                                                                </>
                                                            )}
                                                        </Button>
                                                    </motion.div>
                                                </form>

                                                <AnimatePresence>
                                                    {message && (
                                                        <motion.div
                                                            className={`mt-6 p-4 rounded-lg flex items-center ${
                                                                message.type ===
                                                                "success"
                                                                    ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                                                                    : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                                                            }`}
                                                            initial={{
                                                                opacity: 0,
                                                                y: 10,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                y: -10,
                                                            }}
                                                            transition={{
                                                                duration: 0.3,
                                                            }}
                                                        >
                                                            {message.type ===
                                                            "success" ? (
                                                                <CheckCircle className="h-5 w-5 ml-3 flex-shrink-0" />
                                                            ) : (
                                                                <AlertCircle className="h-5 w-5 ml-3 flex-shrink-0" />
                                                            )}
                                                            <p>
                                                                {
                                                                    message.text
                                                                }
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>

                                            {/* mobile features */}
                                            <motion.div
                                                variants={
                                                    itemVariants
                                                }
                                                className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 lg:hidden"
                                            >
                                                <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                                                    <Star className="h-5 w-5 text-yellow-500 ml-2" />{" "}
                                                    مزایای
                                                    عضویت
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="flex items-center">
                                                        <Bell className="h-5 w-5 text-blue-500 ml-2" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            اطلاع
                                                            از
                                                            آخرین
                                                            اخبار
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Zap className="h-5 w-5 text-blue-500 ml-2" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            محتوای
                                                            انحصاری
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <TrendingUp className="h-5 w-5 text-blue-500 ml-2" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            آخرین
                                                            بروزرسانی‌ها
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Shield className="h-5 w-5 text-blue-500 ml-2" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            حفظ
                                                            حریم
                                                            خصوصی
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                variants={
                                                    itemVariants
                                                }
                                                className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
                                            >
                                                <p>
                                                    ما به
                                                    حریم
                                                    خصوصی
                                                    شما
                                                    احترام
                                                    می‌گذاریم.
                                                    شما
                                                    می‌توانید
                                                    هر زمان
                                                    که
                                                    بخواهید
                                                    از
                                                    خبرنامه
                                                    خارج
                                                    شوید.
                                                </p>
                                            </motion.div>
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* subscriber count */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
                        <motion.div
                            className="flex items-center"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 3,
                            }}
                        >
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                تعداد مشترکین:
                            </span>
                            <span
                                dir="ltr"
                                className="font-bold text-blue-600 dark:text-blue-400 mr-2"
                            >
                                {count.toLocaleString()}
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* global CSS for blob animation */}
            <style
                jsx
                global
            >{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px)
                            scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px)
                            scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px)
                            scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px)
                            scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}
