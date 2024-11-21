import React from "react";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{
        degree: string;
    }>;
}

async function DegreeLayout({
    children,
    params,
}: LayoutProps) {
    const resolvedParams = await params; // Await the params

    return (
        <div
            className="min-h-screen bg-gray-100"
            dir="rtl"
        >
            <nav className="border-b">
                <div className="container mx-auto px-4 py-3">
                    <h2 className="text-lg font-semibold">
                        رشته: {resolvedParams.degree}
                    </h2>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
}

export default DegreeLayout;
