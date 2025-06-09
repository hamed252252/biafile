'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RiContactsBookFill } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';
import { CiLocationOn } from 'react-icons/ci';
import spark from '@/public/spark.svg';
import chatBubble from '@/public/chatBuble.svg';
import ContactForm from '@/app/componetns/contactus';

const CONTACT_METHODS = [
  {
    Icon: RiContactsBookFill,
    label: 'تماس تلفنی',
    value: '+98 912 020 9248',
    href: 'tel:+989120209248',
  },
  {
    Icon: HiOutlineMail,
    label: 'ایمیل',
    value: '13koromid75@gmail.com',
    href: 'mailto:13koromid75@gmail.com',
  },
  {
    Icon: CiLocationOn,
    label: 'آدرس',
    value: 'تهران، خیابان مثال، پلاک ۱۲۳',
  },
];

export default function ContactPage() {
  return (
    <main
      dir="rtl"
      className="font-sans text-gray-800 dark:text-gray-200 bg-gradient-to-br from-blue-50 to-blue-100"
    >
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
        <motion.div
          className="absolute top-12 right-12 opacity-20"
          initial={{ scale: 0.8, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: 'linear',
          }}
        >
          <Image src={spark} alt="" width={100} height={100} />
        </motion.div>
        <motion.div
          className="absolute bottom-12 left-12 opacity-20"
          initial={{ scale: 1.2, rotate: 15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            repeat: Infinity,
            duration: 22,
            ease: 'linear',
          }}
        >
          <Image src={chatBubble} alt="" width={120} height={120} />
        </motion.div>
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          تماس با ما
        </motion.h1>
        <motion.p
          className="mt-4 max-w-xl text-center text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
          }}
        >
          تیم بیا فایل همیشه آمادهٔ پاسخگویی به سوالات و نیازهای شماست.
        </motion.p>
      </section>

      {/* Divider */}
      <svg viewBox="0 0 1440 80" className="-mt-1 w-full">
        <path fill="currentColor" d="M0,32 C480,128 960,0 1440,64 L1440,80 L0,80 Z" />
      </svg>

      {/* Contact Methods */}
      {/* Contact Methods */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {CONTACT_METHODS.map(({ Icon, label, value, href }, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 text-white shadow-lg cursor-pointer"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: idx * 0.2,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
              }}
            >
              <div className="p-3 bg-white/30 rounded-full">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">{label}</h3>
                {href ? (
                  <Link href={href} className="mt-1 inline-block hover:underline">
                    {/* اینجا dir="ltr" برای نمایش صحیح اعداد */}
                    <span dir="ltr">{value}</span>
                  </Link>
                ) : (
                  <p className="mt-1" dir="ltr">
                    {value}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Divider Flipped */}
      <svg viewBox="0 0 1440 80" className="rotate-180 w-full">
        <path fill="currentColor" d="M0,32 C480,128 960,0 1440,64 L1440,80 L0,80 Z" />
      </svg>

      {/* Contact Form */}

      <div className="container mx-auto px-4 max-w-xl">
        <motion.div
          className="bg-white dark:bg-gray-700 rounded-3xl shadow-2xl p-8"
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ContactForm />
        </motion.div>
      </div>

      {/* Map */}
      <section className="h-64 md:h-96">
        <motion.iframe
          src="https://maps.google.com/maps?q=تهران&amp;z=13&amp;output=embed"
          className="w-full h-full border-0 rounded-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          loading="lazy"
        />
      </section>
    </main>
  );
}
