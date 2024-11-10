import ContactForm from "@/app/componetns/contactus";
import React from "react";
import spark from "@/public/spark.svg";
import Image from "next/image";
import chatBubble from "@/public/chatBuble.svg";
import { RiContactsBookFill } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
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
                <div className="bg-white border drop-shadow-md w-[70vw] h-[40vh] md:h-48 absolute top-48 rounded-2xl flex justify-center items-center flex-col md:flex-row text-black gap-y-10">
                    <div className="flex justify-right mr-4 gap-x-2 items-center w-full">
                        <RiContactsBookFill className="size-10 fill-[#1B71F2]" />
                        <div>
                            <h4>تماس بگیرید</h4>
                            <p></p>
                        </div>
                    </div>
                    <div className="flex justify-right mr-4 gap-x-2 items-center w-full">
                        <CiLocationOn className="size-10 fill-[#1B71F2]" />
                        <div>
                            <h4>نشانی</h4>
                            <p></p>
                        </div>
                    </div>

                    <div className="flex justify-right mr-4 gap-x-2 items-center w-full">
                        <HiOutlineMail className="size-10 stroke-[#1B71F2]" />
                        <div>
                            <h4>مکاتبه ی ایمیلی</h4>
                            <p></p>
                        </div>
                    </div>
                    <div className="flex justify-right mr-4 gap-x-2 items-center w-full">
                        <HiOutlineMail className="size-10 stroke-[#1B71F2]" />
                        <div>
                            <h4>مکاتبه ی ایمیلی</h4>
                            <p></p>
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
