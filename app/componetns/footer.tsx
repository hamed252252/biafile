"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
    FaSquareInstagram,
    FaSquarePinterest,
    FaTelegram,
    FaWhatsapp,
    FaSquareTwitter,
    FaFacebook,
} from "react-icons/fa6";

import samane from "@/public/footer/enamad/samane.svg";
import neshan from "@/public/footer/enamad/neshan.svg";

interface SocialIconProps {
    Icon: React.ElementType;
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
    children?: React.ReactNode;
}

const socialIcons: SocialIconProps[] = [
    {
        Icon: FaSquareInstagram,
        label: "Instagram",
        href: "#",
    },
    { Icon: FaTelegram, label: "Telegram", href: "#" },
    { Icon: FaWhatsapp, label: "WhatsApp", href: "#" },
    {
        Icon: FaSquarePinterest,
        label: "Pinterest",
        href: "#",
    },
    { Icon: FaSquareTwitter, label: "Twitter", href: "#" },
    { Icon: FaFacebook, label: "Facebook", href: "#" },
];

const quickLinks: QuickLinkProps[] = [
    { href: "/", label: "خانه" },
    { href: "/aboutus", label: "درباره ما" },
    { href: "/blog", label: "وبلاگ" },
    { href: "/faq", label: "سوالات متداول" },
    {
        href: "/privacy-policy",
        label: "سیاست حفظ حریم خصوصی",
    },
    { href: "/terms", label: "شرایط و ضوابط" },
];

export default function Footer() {
    const { theme } = useTheme();

    return (
        <footer
            className={`${
                theme === "light" ? "bg-gray-200" : "" // Add a class for the light theme
            } ${
                theme === "dark"
                    ? "dark:bg-muted text-muted-foreground"
                    : ""
            } text-primary-foreground`}
        >
            {/* Desktop Footer */}
            <div className="hidden md:flex justify-center p-10 dark:text-muted-foreground">
                <div className="flex gap-x-8 w-full max-w-7xl">
                    <FooterSection
                        title="تماس با ما"
                        href="/contactus"
                    >
                        <ContactInfo />
                    </FooterSection>

                    <FooterSection
                        title="درباره ی ما"
                        href="/aboutus"
                    />

                    <FooterSection title="دسترسی سریع">
                        <QuickLinks links={quickLinks} />
                    </FooterSection>

                    <div className="flex flex-col items-center w-full">
                        <SocialIcons icons={socialIcons} />
                        <TrustLogos />
                    </div>
                </div>
            </div>

            {/* Mobile Footer */}
            <div className="md:hidden p-10">
                <div className="space-y-8">
                    <SocialIcons icons={socialIcons} />
                    <TrustLogos />

                    <FooterSection title="تماس با ما">
                        <ContactInfo />
                    </FooterSection>

                    <FooterSection title="دسترسی سریع">
                        <QuickLinks links={quickLinks} />
                    </FooterSection>
                </div>
            </div>
        </footer>
    );
}

const FooterSection: React.FC<FooterSectionProps> = ({
    title,
    href,
    children,
}) => (
    <div className="flex flex-col items-center md:items-start space-y-6 w-full">
        <h2 className="text-2xl font-bold">
            {href ? (
                <Link href={href}>{title}</Link>
            ) : (
                title
            )}
        </h2>
        {children}
    </div>
);

const ContactInfo: React.FC = () => (
    <div className="flex flex-col items-center gap-y-4">
        <ContactItem
            href="tel:+989120209248"
            label="تماس تلفنی"
        />
        <ContactItem
            href="mailto:info@example.com"
            label="ایمیل: info@example.com"
        />
    </div>
);

const ContactItem: React.FC<{
    href: string;
    label: string;
}> = ({ href, label }) => (
    <div className="flex items-center gap-x-4">
        <div
            className="w-3 h-3 rounded-full bg-primary-foreground"
            aria-hidden="true"
        />
        <Link
            href={href}
            className="hover:underline"
        >
            {label}
        </Link>
    </div>
);

const QuickLinks: React.FC<{ links: QuickLinkProps[] }> = ({
    links,
}) => (
    <>
        {links.map((link) => (
            <div
                key={link.href}
                className="flex items-center gap-x-4"
            >
                <div
                    className="w-3 h-3 rounded-full bg-primary-foreground"
                    aria-hidden="true"
                />
                <Link
                    href={link.href}
                    className="hover:underline"
                >
                    {link.label}
                </Link>
            </div>
        ))}
    </>
);

const SocialIcons: React.FC<{
    icons: SocialIconProps[];
}> = ({ icons }) => (
    <div className="flex justify-center gap-x-4">
        {icons.map(({ Icon, label, href }) => (
            <Link
                key={label}
                href={href}
                aria-label={label}
            >
                <Icon className="size-10" />
            </Link>
        ))}
    </div>
);

const TrustLogos: React.FC = () => (
    <div className="flex justify-center gap-x-4 mt-6">
        <Image
            src={samane}
            width={80}
            height={96}
            alt="Samane logo"
        />
        <Image
            src={neshan}
            width={80}
            height={96}
            alt="Neshan logo"
        />
    </div>
);
