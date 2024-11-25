import { Subject } from "../type/edcation";

export interface Post {
    id: number;
    slug: string;
    title: string;
    author: string;
    date: string;
    excerpt: string;
    content: string;
    coverImage: string;
    readingTime: number;
    tags: string[];
}

export interface LinkItem {
    href: string;
    label: string;
}
export const courseLinks: {
    [key: string]: { [key: string]: LinkItem[] };
} = {
    دبستان: {
        اول: [
            {
                href: "/elementary/first/math",
                label: "ریاضیات",
            },
            {
                href: "/elementary/first/science",
                label: "علوم",
            },
            {
                href: "/elementary/first/history",
                label: "تاریخ",
            },
            {
                href: "/elementary/first/language",
                label: "زبان‌ها",
            },
        ],
        دوم: [
            {
                href: "/elementary/second/math",
                label: "ریاضیات",
            },
            {
                href: "/elementary/second/science",
                label: "علوم",
            },
            {
                href: "/elementary/second/history",
                label: "تاریخ",
            },
            {
                href: "/elementary/second/language",
                label: "زبان‌ها",
            },
        ],
        سوم: [
            {
                href: "/elementary/third/math",
                label: "ریاضیات",
            },
            {
                href: "/elementary/third/science",
                label: "علوم",
            },
            {
                href: "/elementary/third/history",
                label: "تاریخ",
            },
            {
                href: "/elementary/third/language",
                label: "زبان‌ها",
            },
        ],
        چهارم: [
            {
                href: "/elementary/fourth/math",
                label: "ریاضیات",
            },
            {
                href: "/elementary/fourth/science",
                label: "علوم",
            },
            {
                href: "/elementary/fourth/history",
                label: "تاریخ",
            },
            {
                href: "/elementary/fourth/language",
                label: "زبان‌ها",
            },
        ],
        پنجم: [
            {
                href: "/elementary/fifth/math",
                label: "ریاضیات",
            },
            {
                href: "/elementary/fifth/science",
                label: "علوم",
            },
            {
                href: "/elementary/fifth/history",
                label: "تاریخ",
            },
            {
                href: "/elementary/fifth/language",
                label: "زبان‌ها",
            },
        ],
        ششم: [
            {
                href: "/elementary/sixth/math",
                label: "ریاضیات",
            },
            {
                href: "/elementary/sixth/science",
                label: "علوم",
            },
            {
                href: "/elementary/sixth/history",
                label: "تاریخ",
            },
            {
                href: "/elementary/sixth/language",
                label: "زبان‌ها",
            },
        ],
    },
};
export const posts: Post[] = [
    {
        id: 1,
        slug: "getting-started-with-nextjs",
        title: "شروع کار با Next.js",
        author: "جان دو",
        date: "2023-06-01",
        excerpt:
            "یاد بگیرید چگونه با Next.js برنامه‌های وب مدرن بسازید.",
        content: `
            <h2>چرا Next.js؟</h2>
            <p>Next.js چندین مزیت نسبت به برنامه‌های سنتی React ارائه می‌دهد:</p>
            <ul>
                <li><strong>رندر سمت سرور (SSR)</strong>: بهبود زمان بارگذاری اولیه و SEO.</li>
                <li><strong>تولید سایت استاتیک (SSG)</strong>: صفحات استاتیک برای بارگذاری سریع‌تر تولید می‌کند.</li>
                <li><strong>مسیریابی بر اساس فایل</strong>: ساده‌سازی ایجاد مسیرها در برنامه شما.</li>
                <li><strong>مسیرهای API</strong>: به‌راحتی نقاط پایانی API را در بخشی از برنامه Next.js خود ایجاد کنید.</li>
            </ul>
            <h2>ایجاد اولین پروژه Next.js شما</h2>
            <p>برای ایجاد یک پروژه جدید Next.js، دستور زیر را اجرا کنید:</p>
            <pre><code>npx create-next-app my-next-app</code></pre>
            <h3>ساختار پروژه</h3>
            <p>Next.js به‌طور خودکار ساختار پایه پروژه را تنظیم می‌کند:</p>
            <ul>
                <li><code>pages/</code> - پوشه‌ای برای کامپوننت‌های صفحه.</li>
                <li><code>public/</code> - دارایی‌های استاتیک مانند تصاویر و آیکون‌ها.</li>
                <li><code>styles/</code> - فایل‌های CSS و استایل‌ها.</li>
            </ul>
            <h2>نتیجه‌گیری</h2>
            <p>Next.js یک چارچوب قوی برای ساخت برنامه‌های وب مدرن فراهم می‌کند. ویژگی‌هایی مانند SSR، SSG و مسیریابی بر اساس فایل آن را به انتخابی عالی برای برنامه‌های سریع و مناسب SEO تبدیل می‌کند.</p>
        `,
        coverImage:
            "https://tse2.mm.bing.net/th?id=OIP.mV_iCcEdN8qgDdINNOhNYQHaEK&pid=Api",
        readingTime: 5,
        tags: ["Next.js", "React", "توسعه وب"],
    },
    {
        id: 2,
        slug: "mastering-react-hooks",
        title: "تسلط بر هوک‌های React",
        author: "جین اسمیت",
        date: "2023-06-15",
        excerpt:
            "به عمیق‌ترین ویژگی‌های هوک‌های React بپردازید و یاد بگیرید چگونه کامپوننت‌های بهینه‌تر بنویسید.",
        content: `
            <h2>معرفی هوک‌ها</h2>
            <p>هوک‌های React به شما امکان می‌دهند بدون نوشتن کلاس، از ویژگی‌های React مانند حالت در کامپوننت‌های تابعی استفاده کنید.</p>
            <h2>هوک‌های رایج</h2>
            <h3>استفاده از useState</h3>
            <p>هوک <code>useState</code> به شما امکان می‌دهد حالت به کامپوننت‌های تابعی اضافه کنید:</p>
            <pre><code>const [count, setCount] = useState(0);</code></pre>
            <h3>استفاده از useEffect</h3>
            <p>هوک <code>useEffect</code> به شما امکان می‌دهد اثرات جانبی در کامپوننت‌های تابعی انجام دهید.</p>
            <pre><code>useEffect(() => { document.title = \`شما \${count} بار کلیک کردید\`; }, [count]);</code></pre>
            <h2>نتیجه‌گیری</h2>
            <p>تسلط بر هوک‌های React می‌تواند تجربه توسعه شما را بهبود بخشد و به کد پاک‌تر و مؤثرتری منجر شود.</p>
        `,
        coverImage:
            "https://media.licdn.com/dms/image/D4D12AQFJWfUQaQ1qPg/article-cover_image-shrink_600_2000/0/1675674296261?e=2147483647&v=beta&t=zcfSqc5__VRvgFu6e6Ll8vL4xNP_PYnbQYG4YpL9ysE",
        readingTime: 7,
        tags: ["React", "هوک‌ها", "JavaScript"],
    },
    {
        id: 3,
        slug: "introduction-to-graphql",
        title: "مقدمه‌ای بر GraphQL",
        author: "الکس جانسون",
        date: "2023-07-01",
        excerpt:
            "با GraphQL، زبان کوئری برای API‌های خود آشنا شوید.",
        content: `
            <h2>GraphQL چیست؟</h2>
            <p>GraphQL یک زبان کوئری برای API‌ها و یک زمان اجرا برای اجرای آن کوئری‌ها است.</p>
            <h2>مفاهیم کلیدی</h2>
            <h3>Schema</h3>
            <p>Schema ساختار داده‌های شما و عملیات‌هایی که می‌توان انجام داد را تعریف می‌کند.</p>
            <h3>کوئری‌ها</h3>
            <p>کوئری‌ها به مشتریان امکان درخواست داده‌های خاص را می‌دهند.</p>
            <h3>تغییرات (Mutations)</h3>
            <p>تغییرات به مشتریان امکان تغییر داده‌ها را می‌دهند.</p>
            <h2>نتیجه‌گیری</h2>
            <p>GraphQL یک جایگزین انعطاف‌پذیر و کارآمد برای API‌های REST است که برای برنامه‌های مدرن مناسب است.</p>
        `,
        coverImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToyxGpecilojAhBulAhaWwPnX9cGDon-qbGg&s",
        readingTime: 6,
        tags: ["GraphQL", "API", "توسعه وب"],
    },
    {
        id: 4,
        slug: "css-grid-layout-explained",
        title: "توضیح ساختار CSS Grid",
        author: "امیلی براون",
        date: "2023-07-15",
        excerpt:
            "یاد بگیرید چگونه با CSS Grid ساختارهای پیچیده‌ای ایجاد کنید.",
        content: `
            <h2>CSS Grid چیست؟</h2>
            <p>CSS Grid یک سیستم ساختار دو بعدی قدرتمند برای وب است.</p>
            <h2>مفاهیم پایه</h2>
            <h3>ظرف شبکه (Grid Container)</h3>
            <p>عنصری که <code>display: grid</code> روی آن اعمال می‌شود.</p>
            <h3>اقلام شبکه (Grid Items)</h3>
            <p>فرزندان ظرف شبکه.</p>
            <h2>ایجاد یک شبکه</h2>
            <pre><code>.container { display: grid; grid-template-columns: repeat(3, 1fr); grid-gap: 20px; }</code></pre>
            <h2>نتیجه‌گیری</h2>
            <p>CSS Grid به شما ابزار قدرتمندی برای ایجاد ساختارهای پیچیده با CSS تمیز می‌دهد و در مرورگرهای مدرن پشتیبانی می‌شود.</p>
        `,
        coverImage:
            "https://tse2.mm.bing.net/th?id=OIP.mV_iCcEdN8qgDdINNOhNYQHaEK&pid=Api",
        readingTime: 8,
        tags: ["CSS", "طراحی وب", "Layout"],
    },
    {
        id: 5,
        slug: "typescript-best-practices",
        title: "بهترین شیوه‌ها در TypeScript",
        author: "مایکل لی",
        date: "2023-08-01",
        excerpt:
            "بهترین شیوه‌ها برای نوشتن کدهای تمیز TypeScript را کشف کنید.",
        content: `
            <h2>استفاده از حالت سختگیرانه</h2>
            <p>حالت سختگیرانه را در <code>tsconfig.json</code> فعال کنید تا خطاهای بیشتری را شناسایی کنید.</p>
            <h2>ترجیح دادن اینترفیس‌ها به جای نوع‌ها</h2>
            <p>اینترفیس‌ها اغلب انعطاف‌پذیرتر هستند و می‌توان آن‌ها را گسترش داد.</p>
            <h2>استفاده از انواع ترکیبی</h2>
            <p>انواع ترکیبی به شما اجازه می‌دهند که یک مقدار یکی از چند نوع باشد.</p>
            <h2>اجتناب از <code>any</code></h2>
            <p>به جای <code>any</code> از <code>unknown</code> استفاده کنید وقتی نوع ناشناخته است.</p>
            <h2>نتیجه‌گیری</h2>
            <p>با پیروی از این بهترین شیوه‌ها، می‌توانید کدهای TypeScript قوی‌تر و قابل نگهداری‌تری بنویسید.</p>
        `,
        coverImage:
            "https://tse2.mm.bing.net/th?id=OIP.mV_iCcEdN8qgDdINNOhNYQHaEK&pid=Api",
        readingTime: 7,
        tags: [
            "TypeScript",
            "JavaScript",
            "بهترین شیوه‌ها",
        ],
    },
];
export function getPosts() {
    return posts;
}

export function getPostBySlug(slug: string) {
    return posts.find((post) => post.slug === slug);
}
export interface EducationalLevel {
    levelName: string;
    numberOfClasses: number;
    levelSlug: string;
}

export const educationalLevels: EducationalLevel[] = [
    {
        levelName: "ابتدایی",
        numberOfClasses: 6,
        levelSlug: "elementary",
    },
    {
        levelName: "متوسطه اول",
        numberOfClasses: 3,
        levelSlug: "middle",
    },
    {
        levelName: "متوسطه دوم",
        numberOfClasses: 3,
        levelSlug: "high",
    },
];

export async function getEducationalLevels(): Promise<
    EducationalLevel[]
> {
    // In a real application, this would fetch data from an API or database
    return [
        {
            levelName: "ابتدایی",
            numberOfClasses: 6,
            levelSlug: "elementary",
        },
        {
            levelName: "متوسطه اول",
            numberOfClasses: 3,
            levelSlug: "middle",
        },
        {
            levelName: "متوسطه دوم",
            numberOfClasses: 3,
            levelSlug: "high",
        },
    ];
}

export async function getSubjects(): Promise<Subject[]> {
    // In a real application, this would fetch data from an API or database
    return [
        { name: "ریاضی", icon: "🧮", color: "#FFD700" },
        { name: "علوم", icon: "🔬", color: "#4CAF50" },
        { name: "فارسی", icon: "📚", color: "#2196F3" },
        { name: "تاریخ", icon: "🏛️", color: "#FF5722" },
        { name: "جغرافیا", icon: "🌍", color: "#795548" },
        {
            name: "زبان انگلیسی",
            icon: "🌐",
            color: "#9C27B0",
        },
    ];
}
