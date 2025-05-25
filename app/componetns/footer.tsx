"use client";

import Image from "next/image";
import Link from "next/link";
import {
    FaInstagramSquare,
    FaTelegramPlane,
    FaWhatsappSquare,
    FaTwitterSquare,
    FaFacebookSquare,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import samane from "@/public/footer/enamad/samane.svg";
import neshan from "@/public/footer/enamad/neshan.svg";

import type { ReactNode, ElementType } from "react";

interface SocialIconProps {
    Icon: ElementType;
    label: string;
    href: string;
}

interface QuickLinkProps {
    href: string;
    label: string;
}

interface FooterSectionProps {
    title: string;
    href?: string;
    children?: ReactNode;
}

const socialIcons: SocialIconProps[] = [
    {
        Icon: FaInstagramSquare,
        label: "Instagram",
        href: "#",
    },
    { Icon: FaTelegramPlane, label: "Telegram", href: "#" },
    {
        Icon: FaWhatsappSquare,
        label: "WhatsApp",
        href: "#",
    },
    { Icon: FaTwitterSquare, label: "Twitter", href: "#" },
    {
        Icon: FaFacebookSquare,
        label: "Facebook",
        href: "#",
    },
];

const quickLinks: QuickLinkProps[] = [
    { href: "/", label: "خانه" },
    { href: "/aboutus", label: "درباره ما" },
    { href: "/blog", label: "وبلاگ" },
    { href: "/contactus", label: "تماس با ما" },
];

export default function Footer() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <footer
            dir="rtl"
            className="relative bg-gradient-to-t from-gray-100 dark:from-gray-900 to-white dark:to-gray-800 text-gray-800 dark:text-gray-100 pt-16 pb-8 overflow-hidden"
        >
            {/* بکلایت پترن */}
            <div className="absolute inset-0">
                {mounted ? (
                    <motion.div
                        className="absolute inset-0 bg-[url('/pattern-light.svg')] dark:bg-[url('/pattern-dark.svg')] opacity-10 animate-fade-in"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-[url('/pattern-light.svg')] dark:bg-[url('/pattern-dark.svg')] opacity-0" />
                )}
            </div>

            <div className="relative container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* تماس با ما */}
                <FooterSection
                    title="تماس با ما"
                    href="/contactus"
                >
                    <motion.div
                        className="space-y-3 text-sm"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="tel:+989120209248"
                            className="flex items-center hover:text-blue-500 transition-colors"
                        >
                            <span className="w-2 h-2 bg-blue-500 rounded-full ml-2" />
                            تماس تلفنی
                        </Link>
                        <Link
                            href="mailto:info@example.com"
                            className="flex items-center hover:text-blue-500 transition-colors"
                        >
                            <span className="w-2 h-2 bg-blue-500 rounded-full ml-2" />
                            ایمیل: info@example.com
                        </Link>
                    </motion.div>
                </FooterSection>

                {/* درباره ما */}
                <FooterSection
                    title="درباره ما"
                    href="/aboutus"
                >
                    <motion.p
                        className="text-sm leading-relaxed"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        در [نام شرکت]، با ارتقای مداوم کیفیت
                        خدمات و تمرکز بر نیازهای شما،
                        تجربه‌ای بی‌نظیر را فراهم می‌کنیم.
                    </motion.p>
                </FooterSection>

                {/* دسترسی سریع */}
                <FooterSection title="دسترسی سریع">
                    <motion.ul
                        className="space-y-2 text-sm"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {quickLinks.map((link, idx) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="flex items-center hover:text-blue-500 transition-colors"
                                >
                                    <span className="w-2 h-2 bg-blue-500 rounded-full ml-2" />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </motion.ul>
                </FooterSection>

                {/* شبکه‌های اجتماعی و نمادها */}
                <motion.div
                    className="space-y-6"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <h3 className="text-xl font-semibold">
                        ما را دنبال کنید
                    </h3>
                    <div className="flex gap-4">
                        {socialIcons.map(
                            ({ Icon, label, href }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    whileHover={{
                                        scale: 1.2,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                    className="text-2xl text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
                                >
                                    <Icon />
                                </motion.a>
                            )
                        )}
                    </div>
                    <div className="flex gap-4 mt-4">
                        {[samane, neshan].map(
                            (src, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{
                                        scale: 1.1,
                                    }}
                                    className="filter grayscale hover:grayscale-0 transition-all"
                                >
                                    <Image
                                        src={src}
                                        width={60}
                                        height={60}
                                        alt="اعتماد"
                                        priority={true}
                                    />
                                </motion.div>
                            )
                        )}
                    </div>
                </motion.div>
            </div>

            {mounted ? (
                <motion.div
                    className="mt-16 border-t border-gray-300 dark:border-gray-700 pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} [نام
                        شرکت]. تمامی حقوق محفوظ است.
                    </p>
                </motion.div>
            ) : (
                <div className="mt-16 border-t border-gray-300 dark:border-gray-700 pt-6 opacity-0">
                    <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} [نام
                        شرکت]. تمامی حقوق محفوظ است.
                    </p>
                </div>
            )}
        </footer>
    );
}

const FooterSection: React.FC<FooterSectionProps> = ({
    title,
    href,
    children,
}) => (
    <div className="space-y-4">
        <motion.h3
            className="text-2xl font-bold"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {href ? (
                <Link href={href}>{title}</Link>
            ) : (
                title
            )}
        </motion.h3>
        {children}
    </div>
);
