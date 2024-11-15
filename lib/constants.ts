export const dataOfDashboardMenu = {
    personalProfile: [
        {
            title: "مشخصات فردی",
            url: "/dashboard/personalinfo",
            items: [
                {
                    title: "مشخصات فردی",
                    url: "/dashboard/personalinfo",
                },
            ],
        },
        {
            title: "کیف پول",
            url: "/dashboard/wallet",
            items: [
                {
                    title: "اعتبار اصلی",
                    url: "/dashboard/wallet/credit",
                },
                {
                    title: "شگفت انگیز",
                    url: "/dashboard/wallet/special",
                },
                {
                    title: "تاریخچه ی شارژ",
                    url: "/dashboard/wallet/charge-history",
                },
            ],
        },
        {
            title: "تاریخچه ی تراکنش ها",
            url: "/dashboard/transactions",
            items: [
                {
                    title: "دانلود تراکنش ها",
                    url: "/dashboard/transactions/download",
                },
                {
                    title: "تاریخ پرداخت",
                    url: "/dashboard/transactions/payment-history",
                },
            ],
        },
        {
            title: "حساب کاربری",
            url: "/dashboard/account",
            items: [
                {
                    title: "مشخصات حساب کاربری",
                    url: "/dashboard/account/profile",
                },
                {
                    title: "تنظیمات",
                    url: "/dashboard/account/settings",
                },
                {
                    title: "خروج",
                    url: "/logout",
                },
            ],
        },
    ],
};