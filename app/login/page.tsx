import { ShieldCheck, LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-900/10 via-background to-background -z-10" />

            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 font-outfit text-xl font-bold hover:opacity-80 transition-opacity">
                <ShieldCheck className="h-6 w-6 text-brand-500" />
                <span>SecureTech</span>
            </Link>

            <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-brand-500/10 p-4 rounded-full mb-4">
                        <LockKeyhole className="h-8 w-8 text-brand-500" />
                    </div>
                    <h1 className="font-outfit text-2xl font-bold">Client Login</h1>
                    <p className="text-muted-foreground text-sm mt-2 text-center">Secure access to your enterprise dashboard</p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Administrator Email</label>
                        <input
                            type="email"
                            placeholder="admin@yourcompany.com"
                            className="w-full bg-muted/50 border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">Password</label>
                            <Link href="#" className="text-xs text-brand-500 hover:text-brand-400">Forgot password?</Link>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-muted/50 border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                        />
                    </div>

                    <div className="pt-4">
                        <button type="button" className="w-full bg-brand-600 text-white rounded-md py-2.5 font-medium hover:bg-brand-500 transition-colors flex justify-center items-center gap-2">
                            <LockKeyhole className="h-4 w-4" />
                            Secure Login
                        </button>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-border text-center">
                    <p className="text-sm text-muted-foreground">
                        Don't have a corporate system yet? <br />
                        <Link href="/register" className="text-brand-500 font-medium hover:text-brand-400 mt-1 inline-block">
                            Request a system consultation
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
