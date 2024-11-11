import Image from "next/image";
import Link from "next/link";
import {
    FaSquareInstagram,
    FaSquarePinterest,
    FaTelegram,
    FaWhatsapp,
} from "react-icons/fa6";

import samane from "@/public/footer/enamad/samane.svg";
import neshan from "@/public/footer/enamad/neshan.svg";

interface SocialIconProps {
    Icon: React.ElementType;
    label: string;
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

interface SocialIconsProps {
    icons: SocialIconProps[];
}

interface QuickLinksProps {
    links: QuickLinkProps[];
}

const Footer: React.FC = () => {
    const socialIcons: SocialIconProps[] = [
        { Icon: FaSquareInstagram, label: "Instagram" },
        { Icon: FaTelegram, label: "Telegram" },
        { Icon: FaWhatsapp, label: "WhatsApp" },
        { Icon: FaSquarePinterest, label: "Pinterest" },
    ];

    const quickLinks: QuickLinkProps[] = [
        { href: "/services", label: "خدمات" },
        { href: "/aboutus", label: "درباره ما" },
    ];

    return (
        <footer className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            {/* Desktop Footer */}
            <div className="hidden md:flex justify-center p-10">
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
};

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
    <div className="flex items-center gap-x-4">
        <div
            className="w-3 h-3 rounded-full bg-primary-foreground"
            aria-hidden="true"
        />
        <Link
            href="tel:+989120209248"
            className="hover:underline"
        >
            تماس
        </Link>
    </div>
);

const QuickLinks: React.FC<QuickLinksProps> = ({
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

const SocialIcons: React.FC<SocialIconsProps> = ({
    icons,
}) => (
    <div className="flex justify-center gap-x-4">
        {icons.map(({ Icon, label }) => (
            <Link
                key={label}
                href="#"
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

export default Footer;
