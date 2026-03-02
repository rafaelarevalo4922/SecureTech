import { ShieldCheck, Building2, Rocket } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col lg:flex-row">
            {/* Visual Section */}
            <div className="hidden lg:flex w-1/2 bg-card border-r border-border p-12 flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-900/20 via-transparent to-transparent pointer-events-none" />

                <Link href="/" className="flex items-center gap-2 font-outfit text-xl font-bold z-10 w-fit">
                    <ShieldCheck className="h-6 w-6 text-brand-500" />
                    <span>SecureTech</span>
                </Link>

                <div className="z-10 max-w-lg">
                    <div className="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-500 mb-6">
                        <Rocket className="mr-2 h-4 w-4" />
                        Digital Transformation
                    </div>
                    <h1 className="font-outfit text-4xl font-bold mb-6">Elevate your business operations with secure, scalable software.</h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        Tell us about your company and your system requirements. Whether you need a simple reporting tool or a fully custom enterprise architecture, we build it explicitly for you.
                    </p>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="mt-1 bg-brand-500/20 p-2 rounded-lg text-brand-500 shrink-0 h-fit">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Tailored Security Measures</h3>
                                <p className="text-sm text-muted-foreground mt-1">Role-based access controls and encrypted data pipelines as standard.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="mt-1 bg-brand-500/20 p-2 rounded-lg text-brand-500 shrink-0 h-fit">
                                <Building2 className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Independent Infrastructure</h3>
                                <p className="text-sm text-muted-foreground mt-1">Host on our global cloud network or deploy straight to your own enterprise hardware.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-24 relative">
                <div className="lg:hidden absolute top-8 left-8">
                    <Link href="/" className="flex items-center gap-2 font-outfit text-xl font-bold">
                        <ShieldCheck className="h-6 w-6 text-brand-500" />
                        <span>SecureTech</span>
                    </Link>
                </div>

                <div className="max-w-md w-full mx-auto mt-16 lg:mt-0">
                    <h2 className="font-outfit text-3xl font-bold mb-2">Request Consultation</h2>
                    <p className="text-muted-foreground text-sm mb-8">Enter your details below to schedule an initial requirement analysis.</p>

                    <form className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">First Name</label>
                                <input type="text" className="w-full bg-muted/50 border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Last Name</label>
                                <input type="text" className="w-full bg-muted/50 border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Work Email</label>
                            <input type="email" placeholder="you@company.com" className="w-full bg-muted/50 border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Company Name</label>
                            <input type="text" className="w-full bg-muted/50 border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">System Interest</label>
                            <select className="w-full bg-muted/50 border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all appearance-none">
                                <option value="">Select an option...</option>
                                <option value="saas">Managed Cloud Subscription</option>
                                <option value="custom">Custom Software Ownership</option>
                                <option value="other">Other / Not Sure</option>
                            </select>
                        </div>

                        <button type="button" className="w-full bg-foreground text-background rounded-md py-3 font-medium hover:bg-foreground/90 transition-colors mt-4">
                            Submit Request
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        Already a client? <Link href="/login" className="text-brand-500 font-medium hover:text-brand-400">Sign in to dashboard</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
