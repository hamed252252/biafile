import {
    FaUser,
    FaWallet,
    FaHistory,
    FaCog,
    FaGift,
    FaSignOutAlt,
    FaDownload,
    FaList,
} from "react-icons/fa";
import { IconType } from "react-icons";

interface MenuItem {
    title: string;
    url: string;
    icon: IconType;
    items?: MenuItem[];
}

export const dataOfDashboardMenu: {
    personalProfile: MenuItem[];
} = {
    personalProfile: [
        {
            title: "مشخصات فردی",
            url: "/dashboard/personalinfo",
            icon: FaUser,
            items: [
                {
                    title: "مشخصات فردی",
                    url: "/dashboard/personalinfo",
                    icon: FaUser,
                },
            ],
        },
        {
            title: "کیف پول",
            url: "/dashboard/wallet/credit",
            icon: FaWallet,
            items: [
                {
                    title: "اعتبار اصلی",
                    url: "/dashboard/wallet/credit",
                    icon: FaWallet,
                },
                {
                    title: "اعتبار هدیه",
                    url: "/dashboard/wallet/special",
                    icon: FaGift,
                },
                {
                    title: "تاریخچه ی شارژ",
                    url: "/dashboard/wallet/charge-history",
                    icon: FaHistory,
                },
            ],
        },
        {
            title: "لیست دانلود ها",
            url: "/dashboard/downloadList",
            icon: FaList,
            items: [
                {
                    title: "لیست دانلود ها",
                    url: "/dashboard/downloadList",
                    icon: FaList,
                },
            ],
        },
        {
            title: "تاریخچه ی تراکنش ها",
            url: "/dashboard/transactions/download",
            icon: FaHistory,
            items: [
                {
                    title: "دانلود تراکنش ها",
                    url: "/dashboard/transactions/download",
                    icon: FaDownload,
                },
                {
                    title: "تاریخ پرداخت",
                    url: "/dashboard/transactions/payment-history",
                    icon: FaHistory,
                },
            ],
        },
        {
            title: "حساب کاربری",
            url: "/dashboard/account/settings",
            icon: FaCog,
            items: [
                {
                    title: "تنظیمات",
                    url: "/dashboard/account/settings",
                    icon: FaCog,
                },
                {
                    title: "خروج",
                    url: "/logout",
                    icon: FaSignOutAlt,
                },
            ],
        },
    ],
};
