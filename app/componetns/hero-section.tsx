import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/public/Hero Iamge.svg"; // Corrected file name
import { Button } from "@/components/ui/button";
import { MdCastForEducation } from "react-icons/md";

export default function HeroSection() {
    return (
        <section className="  py-12 md:py-24">
            <div className="container mx-auto px-4 flex flex-col md:flex-row-reverse items-center justify-between">
                <div className="md:w-1/2 text-right mb-8 md:mb-0 md:pr-8 text-primary">
                    <p className="text-4xl md:text-5xl leading-[3.5rem] md:leading-[4rem] font-extrabold text-gray-800 dark:text-slate-100 mb-4 w-full">
                        بیافایل؛ دقیق، قابل اتکا و مقرون به
                        صرفه
                    </p>
                    <p className="text-lg md:text-xl leading-[2rem] md:leading-[2.5rem] text-gray-600 dark:text-slate-100 mb-6">
                        فایل های کمک آموزشی، همیشه و هرجا در
                        دسترس شماست
                    </p>
                </div>
                <div className="md:w-1/2">
                    <Image
                        src={HeroImage}
                        alt="افرادی در حال آزمون دادن"
                        width={700}
                        height={467}
                        className="rounded-lg shadow-lg object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
            </div>
        </section>
    );
}
