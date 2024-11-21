import { Vazirmatn } from "next/font/google";

const vazirmatn = Vazirmatn({ subsets: ["arabic"] });

interface DegreeLayoutProps {
    children: React.ReactNode;
    params: {
        degree: string;
    };
}

export default function DegreeLayout({
    children,
    params,
}: DegreeLayoutProps) {
    return (
        <div
            className={`min-h-screen bg-background ${vazirmatn.className}`}
            dir="rtl"
        >
            <nav className="border-b">
                <div className="container mx-auto px-4 py-3">
                    <h2 className="text-lg font-semibold">
                        رشته: {params.degree}
                    </h2>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
}
