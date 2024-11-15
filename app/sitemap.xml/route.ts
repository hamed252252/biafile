import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://yourdomain.com";

    // Generate a dynamic sitemap if needed
    const sitemap = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

    return new NextResponse(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
