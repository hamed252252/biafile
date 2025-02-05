import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/public/Hero Iamge.svg";
import { Button } from "@/components/ui/button";
import { MdCastForEducation } from "react-icons/md";

export default function HeroSection() {
    return (
        <section className="relative  w-full overflow-hidden">
            {/* Curved Background */}
            <div className="absolute inset-0 z-0">
                <svg
                    viewBox="0 0 1440 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 0H1440V600C1440 600 1082.5 800 720 800C357.5 800 0 600 0 600V0Z"
                        fill="#F3F0FF"
                    />
                </svg>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 py-12 md:py-24">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                    {/* Text Content */}
                    <div className="md:w-1/2 text-right mb-8 md:mb-0 md:pr-8 text-primary">
                        <h1 className="text-4xl md:text-5xl leading-[3.5rem] md:leading-[4rem] font-extrabold text-gray-800 dark:text-slate-100 mb-4 w-full">
                            بیافایل؛ دقیق، قابل اتکا و مقرون
                            به صرفه
                        </h1>
                        <p className="text-lg md:text-xl leading-[2rem] md:leading-[2.5rem] text-gray-600 dark:text-slate-100 mb-6">
                            فایل های کمک آموزشی، همیشه و
                            هرجا در دسترس شماست
                        </p>
                    </div>

                    {/* Image */}
                    <div className="md:w-1/2">
                        <Image
                            src={
                                HeroImage ||
                                "/placeholder.svg"
                            }
                            alt="افرادی در حال آزمون دادن"
                            width={700}
                            height={467}
                            className="rounded-[15%] shadow-lg object-cover transition-transform duration-300 hover:scale-105"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
