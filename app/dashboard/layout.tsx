import DashboardSidebar from "@/components/layout/DashboardSidebar";
import Link from "next/link";
import { Bell } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-950 flex selection:bg-blue-500/30">
            <DashboardSidebar />

            {/* Main Content Area */}
            <div className="flex-1 md:ml-64 relative min-w-0">
                {/* Top Navbar Header */}
                <header className="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 sm:px-8">
                    <div className="text-slate-400 text-sm font-medium hidden sm:block">
                        Enterprise Workspace <span className="text-slate-600 mx-2">/</span> Global View
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-slate-900"></span>
                        </button>
                        <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-slate-700 cursor-pointer">
                            <img src="https://i.pravatar.cc/150?u=admin" className="w-full h-full object-cover" alt="Admin user" />
                        </div>
                    </div>
                </header>

                {children}
            </div>
        </div>
    );
}
