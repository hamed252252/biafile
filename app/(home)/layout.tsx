import type { Metadata } from 'next';
import localFont from 'next/font/local';
import NavigationMenuComponents from '../componetns/navigation-menu';
import '../globals.css';
import Footer from '../componetns/footer';
import Advertisement from '../componetns/advertisment';
import { Analytics } from '@vercel/analytics/next';
const myFont = localFont({
  src: [
    // { , path: "./fonts/IRANSansXV.woff2" },
    {
      weight: '100',
      style: 'normal',
      path: '../fonts/woff2/IRANSansX-Thin.woff2',
    },
    {
      weight: '200',
      style: 'normal',
      path: '../fonts/woff2/IRANSansX-UltraLight.woff2',
    },
    {
      weight: '300',
      style: 'normal',
      path: '../fonts/woff2/IRANSansX-Light.woff2',
    },
    {
      weight: '500',
      style: 'normal',
      path: '../fonts/woff2/IRANSansX-Medium.woff2',
    },
    {
      weight: '600',
      style: 'normal',
      path: '../fonts/woff2/IRANSansX-DemiBold.woff2',
    },
    {
      weight: '800',
      style: 'normal',
      path: '../fonts/woff2/IRANSansX-ExtraBold.woff2',
    },
    {
      weight: '900',
      style: 'normal',
      path: '../fonts/woff2/IRANSansX-Black.woff2',
    },
    {
      weight: '950',
      style: 'normal',
      path: '../fonts/woff2/IRANSansX-ExtraBlack.woff2',
    },
    {
      weight: '1000',
      style: 'normal',
      path: '../fonts/woff2/IRANSansX-Heavy.woff2',
    },
    {
      weight: 'bold',
      style: 'normal',
      path: '../fonts/woff2/IRANSansX-Bold.woff2',
    },
    {
      weight: 'normal',
      style: 'normal',
      path: '../fonts/woff2/IRANSansX-Regular.woff2',
    },
  ],
  display: 'block',
  variable: '--font-Iransans--per',
});

export const metadata: Metadata = {
  title: 'بیا فایل',
  description: 'بیافایل؛ دقیق، قابل اتکا و مقرون به صرفه',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={` ${myFont.className}  antialiased`}>
      <Advertisement />
      <NavigationMenuComponents />

      {children}
      <Footer />
    </main>
  );
}
