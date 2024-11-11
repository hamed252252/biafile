import ContactForm from "@/app/componetns/contactus";
import React from "react";
import spark from "@/public/spark.svg";
import Image from "next/image";
import chatBubble from "@/public/chatBuble.svg";
import { RiContactsBookFill } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import Link from "next/link";
function page() {
    return (
        <div>
            <div className="flex justify-center items-center relative bg-gradient-to-r from-[#3064C0] to-[#172F5A] w-full h-[30vh]">
                <Image
                    alt="spark"
                    className="absolute  hidden  md:block md:right-0"
                    src={spark}
                />
                <Image
                    alt="spark"
                    className="absolute hidden md:block  left-0"
                    src={spark}
                />
                <Image
                    alt="chat"
                    className="absolute top-2 md:top-10"
                    src={chatBubble}
                />
                <div className="absolute md:top-30">
                    <div className="flex flex-col justify-center items-center text-white md:text-2xl">
                        <h1>تماس با ما</h1>
                        <p className="justify-right">
                            ارتباط پیوسته با بیا فایلُ در
                            سریع ترین زمان پاسخگوی شما هستیم
                            .
                        </p>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-2xl mx-auto w-11/12 max-w-4xl p-6 md:p-8 absolute top-48">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
                        <div className="flex items-center gap-4 w-full md:w-1/2">
                            <RiContactsBookFill className="w-12 h-12 text-[#1B71F2]" />
                            <div>
                                <h2 className="font-semibold text-lg">
                                    مکالمه ی تلفنی
                                </h2>
                                <p className="text-gray-600">
                                    <Link href="tel:+98 912 020 9248">
                                        تماس
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-1/2">
                            <HiOutlineMail className="w-12 h-12 text-[#1B71F2]" />
                            <div>
                                <h2 className="font-semibold text-lg">
                                    مکاتبه ی ایمیلی
                                </h2>
                                <Link
                                    href="mailto:13koromid75@gmail.com"
                                    className="text-blue-600 hover:underline"
                                >
                                    13koromid75@gmail.com
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <>
                <ContactForm />
            </>
        </div>
    );
}

export default page;
