import { ShieldCheck, LayoutDashboard, Package, Users, Settings, LogOut, ChartNoAxesColumn } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-background">
            {/* Sidebar */}
            <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-card flex flex-col pt-6 z-10">
                <div className="px-6 pb-6 flex items-center gap-2 font-outfit text-xl font-bold border-b border-border">
                    <ShieldCheck className="h-6 w-6 text-brand-500" />
                    <span>SecureTech OS™</span>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md bg-brand-500/10 text-brand-500 font-medium">
                        <LayoutDashboard className="h-5 w-5" />
                        Overview
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors font-medium">
                        <Package className="h-5 w-5" />
                        Product Control
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors font-medium">
                        <ChartNoAxesColumn className="h-5 w-5" />
                        Reports & Analytics
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors font-medium">
                        <Users className="h-5 w-5" />
                        User Management
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors font-medium">
                        <Settings className="h-5 w-5" />
                        System Rules
                    </Link>
                </nav>
                <div className="p-4 border-t border-border">
                    <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors font-medium">
                        <LogOut className="h-5 w-5" />
                        Exit Dashboard Mode
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 border-b border-border bg-card flex items-center px-8 justify-between shrink-0">
                    <h1 className="font-outfit font-semibold text-xl">Overview</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-medium">Admin User</span>
                            <span className="text-xs text-muted-foreground">admin@securetech.com</span>
                        </div>
                        <div className="h-10 w-10 bg-brand-500/20 text-brand-500 font-bold flex items-center justify-center rounded-full border border-brand-500/30">
                            AD
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-auto bg-black p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
