import Image from "next/image";
import Link from "next/link";
import Heroimage from "@/public/Hero Iamge.svg";
import { Button } from "@/components/ui/button";
import { MdCastForEducation } from "react-icons/md";
export default function HeroSection() {
    return (
        <section className="bg-gradient-to-b from-secondary to-white py-12 md:py-24">
            <div className="container mx-auto px-4 flex flex-col md:flex-row-reverse items-center justify-between">
                <div className="md:w-1/2 text-right mb-8 md:mb-0 md:pr-8 text-primary">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4  w-full">
                        بیافایل؛ دقیق، قابل اتکا و مقرون به
                        صرفه
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
                        فایل های کمک آموزشی ، همیشه و هرجا
                        در دسترس شماست
                    </p>
                </div>
                <div className="md:w-1/2">
                    <Image
                        src={Heroimage}
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
