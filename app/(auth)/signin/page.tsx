import { MobileLoginForm } from '@/app/components/mobilelogin';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
        <MobileLoginForm />
      </div>
    </div>
  );
}
