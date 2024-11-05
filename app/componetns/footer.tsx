import Image from "next/image";
import React from "react";
import telgeramimage from "@/public/footer/telegram.svg";
import whatsappimage from "@/public/footer/whatsapp.svg";
import pinterestimage from "@/public/footer/pinterest.svg";
import instagramimage from "@/public/footer/instagram.svg";
import samane from "@/public/footer/enamad/samane.svg";
import namdionoimage from "@/public/namdino.svg";
import {
    FaSquareInstagram,
    FaSquarePinterest,
    FaTelegram,
    FaWhatsapp,
} from "react-icons/fa6";
import neshan from "@/public/footer/enamad/neshan.svg";
const Footer = () => {
    return (
        <>
            {/* Desktop Section
             */}
            <div className="hidden md:flex mx-auto mt-20 gap-x-2 p-10 px-5   w-full text-primary-foreground  bg-gradient-to-r via-primary/80 from-primary to-primary/95   h-full justify-center items-center ">
                <div className="justify-center items-center flex-col space-y-6  w-full h-full gap-x-4 ">
                    <h1 className="text-2xl mt-4 font-bold">
                        تماس با ما
                    </h1>
                    <div className="flex gap-x-4">
                        <div className="w-3 h-3 rounded-full bg-primary-foreground"></div>
                        <span
                            dir="ltr"
                            className=""
                        >
                            {/* +98 911 378 3360 */}
                        </span>
                    </div>
                    <div className="flex gap-x-4">
                        <div className="w-3 h-3 rounded-full bg-primary-foreground"></div>
                        <span
                            dir="ltr"
                            className=""
                        >
                            {/* +98 912 020 9248 */}
                        </span>
                    </div>
                </div>
                <div className="justify-center items-center flex-col  space-y-5 w-full h-full ">
                    <h1 className="text-2xl mt-4 font-bold">
                        نشانی
                    </h1>
                    <div className="flex gap-x-3 text-lg">
                        <div className="w-3 h-3 rounded-full bg-primary-foreground"></div>
                        <span
                            dir="ltr"
                            className=""
                        >
                            استان گلستان
                        </span>
                    </div>
                </div>
                <div className="justify-center items-center flex-col  w-full h-full ">
                    <div className="justify-center items-center flex-col space-y-6  w-full h-full gap-x-4 ">
                        <h1 className="text-2xl mt-4 font-bold">
                            دسترسی سریع
                        </h1>
                        <div className="flex gap-x-4">
                            <div className="w-3 h-3 rounded-full bg-primary-foreground"></div>
                            <span
                                dir="ltr"
                                className=""
                            >
                                خدمات
                            </span>
                        </div>
                        <div className="flex gap-x-4">
                            <div className="w-3 h-3 rounded-full bg-primary-foreground"></div>
                            <span
                                dir="ltr"
                                className=""
                            >
                                درباره ما
                            </span>
                        </div>
                    </div>
                </div>
                <div className="justify-center items-center flex-col  w-full h-full ">
                    <div className="items-center flex justify-evenly">
                        <FaSquareInstagram className="size-10" />
                        <FaTelegram className="size-10" />
                        <FaWhatsapp className="size-10" />
                        <FaSquarePinterest className="size-10" />
                    </div>
                    <div className="w-1/2 mt-10 flex justify-center mr-6 items-center">
                        <Image
                            src={samane}
                            width={100}
                            height={120}
                            alt="samane image"
                        ></Image>
                        <Image
                            src={neshan}
                            alt="neshan iamge"
                            width={100}
                            height={120}
                        ></Image>
                    </div>
                </div>
            </div>
            {/* footer  powed by namdino */}

            <div className=" block md:hidden">
                {/* Mobile Section
                 */}
                <div className="mx-auto mt-20 gap-x-2 p-10 px-5  text-primary-foreground  w-full bg-gradient-to-r from-primary to-primary/80   h-full justify-center items-center ">
                    <div className="w-full h-full flex-col  space-y-2">
                        <div className="flex justify-center items-center w-full gap-x-2 ">
                            <FaWhatsapp className="size-10" />

                            <FaSquarePinterest className="size-10" />
                        </div>
                        <div className="flex justify-center items-center gap-x-2 w-full ">
                            <FaSquareInstagram className="size-10" />
                            <FaTelegram className="size-10" />
                        </div>
                        <div className="flex justify-center items-center mx-auto w-full mt-2 h-fit">
                            <Image
                                src={samane}
                                width={50}
                                height={80}
                                alt="samane"
                            ></Image>
                            <Image
                                src={neshan}
                                width={50}
                                height={80}
                                alt="neshan"
                            ></Image>
                        </div>
                        <div className="flex flex-col space-y-1 justify-center items-center">
                            <h1 className="text-2xl flex justify-center items-center font-bold text-primary-foreground">
                                تماس با ما
                            </h1>
                            <div className="flex gap-x-4 justify-center items-center font-semibold">
                                <div className="w-3 h-3 rounded-full bg-primary-foreground"></div>
                                <span
                                    dir="ltr"
                                    className=""
                                >
                                    +98 911 378 3360
                                </span>
                            </div>
                            <div className="flex gap-x-4 justify-center items-center font-semibold">
                                <div className="w-3 h-3 rounded-full bg-primary-foreground"></div>
                                <span
                                    dir="ltr"
                                    className=""
                                >
                                    +98 912 020 9248
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 justify-center items-center">
                            <h1 className="text-2xl flex justify-center items-center font-bold text-primary-foreground">
                                دسترسی سریع
                            </h1>
                            <div className="flex gap-x-4 justify-center items-center font-semibold">
                                <div className="w-3 h-3 rounded-full bg-primary-foreground"></div>
                                <span
                                    dir="ltr"
                                    className=""
                                >
                                    خدمات
                                </span>
                            </div>
                            <div className="flex gap-x-4 justify-center items-center font-semibold">
                                <div className="w-3 h-3 rounded-full bg-primary-foreground"></div>
                                <span
                                    dir="ltr"
                                    className=""
                                >
                                    درباره ما
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
