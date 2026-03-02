"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, PackageSearch, Activity, Database, AlertCircle } from "lucide-react";

export default function Dashboard() {
    const stats = [
        { title: "Total Revenue", value: "$45,231.89", trend: "+20.1%", isPositive: true },
        { title: "Active Inventory", value: "2,350", trend: "+12.5%", isPositive: true },
        { title: "System Intrusions Blocked", value: "1,429", trend: "0.0%", isPositive: true },
        { title: "Low Stock Items", value: "12", trend: "-2.4%", isPositive: false },
    ];

    const recentProducts = [
        { id: "PROD-1029", name: "Enterprise Server Rack", stock: 45, status: "Healthy", price: "$1,200.00" },
        { id: "PROD-1030", name: "Security Gateway v4", stock: 12, status: "Warning", price: "$450.00" },
        { id: "PROD-1031", name: "Biometric Scanner", stock: 89, status: "Healthy", price: "$299.00" },
        { id: "PROD-1032", name: "Backup Power Unit", stock: 2, status: "Critical", price: "$850.00" },
        { id: "PROD-1033", name: "Network Switch 48-port", stock: 34, status: "Healthy", price: "$620.00" },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Info banner */}
            <div className="bg-brand-500/10 border border-brand-500/30 rounded-lg p-4 flex gap-3 text-brand-500">
                <Activity className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                    <h3 className="font-semibold">Live System Demonstration</h3>
                    <p className="text-sm opacity-80 mt-1">This is a showcase of the internal dashboard interface that your software customers will experience. Built for clarity, speed, and real-time data monitoring.</p>
                </div>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card border border-border rounded-xl p-6 shadow-sm"
                    >
                        <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                        <div className="mt-2 flex items-baseline justify-between">
                            <span className="text-2xl font-outfit font-bold">{stat.value}</span>
                            <span className={`text-xs font-semibold flex items-center ${stat.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                                {stat.isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                {stat.trend}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Chart Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-card border border-border rounded-xl p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-outfit font-semibold text-lg flex items-center gap-2">
                            <Database className="h-5 w-5 text-brand-500" />
                            Sales & Inventory Trajectory
                        </h3>
                        <select className="bg-muted border border-border rounded-md text-sm px-3 py-1 text-foreground">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>Year to Date</option>
                        </select>
                    </div>

                    <div className="h-[250px] w-full flex items-end justify-between gap-2 px-2 pb-6 pt-10 border-b border-l border-border relative">
                        {/* Chart Grid Lines */}
                        <div className="absolute top-0 w-full border-b border-border/30"></div>
                        <div className="absolute top-1/2 w-full border-b border-border/30"></div>

                        {/* Animated Bars */}
                        {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
                            <div key={i} className="w-full flex justify-center group relative h-full items-end">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                    className="w-full max-w-[40px] bg-brand-500/80 rounded-t-sm group-hover:bg-brand-500 transition-colors"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between px-2 mt-4 text-xs text-muted-foreground">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </motion.div>

                {/* Action Panel / Alerts */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-card border border-border rounded-xl p-6"
                >
                    <h3 className="font-outfit font-semibold text-lg flex items-center gap-2 mb-6">
                        <AlertCircle className="h-5 w-5 text-brand-500" />
                        System Alerts
                    </h3>
                    <div className="space-y-4">
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                            <div className="font-medium text-red-500 text-sm">Critical Inventory Load</div>
                            <div className="text-xs text-muted-foreground mt-1">Backup Power Unit dropping below threshold of 5 units. Recommended action: Restock immediately.</div>
                        </div>
                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
                            <div className="font-medium text-yellow-500 text-sm">Update Required</div>
                            <div className="text-xs text-muted-foreground mt-1">Server architecture node v1.4 requires a scheduled reboot tonight at 03:00 AM UTC.</div>
                        </div>
                        <div className="p-3 bg-brand-500/10 border border-brand-500/20 rounded-md">
                            <div className="font-medium text-brand-500 text-sm">Backup Successful</div>
                            <div className="text-xs text-muted-foreground mt-1">Annual cloud off-site backup completed with 0 errors. SHA-256 hash verified.</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Product Control Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-card border border-border rounded-xl overflow-hidden"
            >
                <div className="p-6 border-b border-border flex justify-between items-center bg-muted/30">
                    <h3 className="font-outfit font-semibold text-lg flex items-center gap-2">
                        <PackageSearch className="h-5 w-5 text-brand-500" />
                        Product Control Interface
                    </h3>
                    <button className="text-sm bg-foreground text-background px-4 py-2 rounded-md hover:bg-foreground/90 transition-colors font-medium">
                        + New Item
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                            <tr>
                                <th className="px-6 py-4">Product ID</th>
                                <th className="px-6 py-4">Item Name</th>
                                <th className="px-6 py-4">Available Stock</th>
                                <th className="px-6 py-4">Security Status</th>
                                <th className="px-6 py-4">Unit Price</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentProducts.map((p, i) => (
                                <tr key={i} className="border-b border-border hover:bg-muted/20 transition-colors">
                                    <td className="px-6 py-4 font-mono text-muted-foreground">{p.id}</td>
                                    <td className="px-6 py-4 font-medium">{p.name}</td>
                                    <td className="px-6 py-4 font-mono">{p.stock}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${p.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' :
                                                p.status === 'Warning' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' :
                                                    'bg-red-500/10 text-red-500 border-red-500/30'
                                            }`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono">{p.price}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-brand-500 hover:text-brand-400 font-medium">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
