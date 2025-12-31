'use client'

import Link from 'next/link'
import { use } from 'react'

export default function SportDashboard({ params }: { params: Promise<{ sport: string }> }) {
    const { sport } = use(params)

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm">
                <Link
                    href="/"
                    className="font-medium transition-colors"
                    style={{ color: '#957DAD' }}
                >
                    Home
                </Link>
                <span style={{ color: '#C9A0DC' }}>›</span>
                <Link
                    href="/live"
                    className="font-medium transition-colors"
                    style={{ color: '#957DAD' }}
                >
                    Live
                </Link>
                <span style={{ color: '#C9A0DC' }}>›</span>
                <span className="font-bold" style={{ color: '#6B4C7A' }}>
                    {sport.toUpperCase()}
                </span>
            </div>

            {/* Page Title - Window Style */}
            <div
                className="rounded-lg overflow-hidden mb-6"
                style={{ border: '2px solid #7EC8E3' }}
            >
                <div
                    className="flex items-center justify-between px-3 py-1.5"
                    style={{ background: 'linear-gradient(180deg, #7EC8E3 0%, #5BA4C9 100%)' }}
                >
                    <span className="text-xs font-bold text-white/90 tracking-wide">
                        ✦ {sport.toUpperCase()}_LIVE.EXE
                    </span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                        <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                        <div className="w-3 h-3 rounded-sm bg-pink-300"></div>
                    </div>
                </div>
                <div
                    className="p-6"
                    style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1
                                className="text-3xl font-black mb-2"
                                style={{ color: '#6B4C7A' }}
                            >
                                {sport.toUpperCase()} Live
                            </h1>
                            <p style={{ color: '#957DAD' }}>
                                Real-time micro-betting with sub-second settlement
                            </p>
                        </div>
                        <div
                            className="flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{ background: 'rgba(255, 107, 157, 0.15)' }}
                        >
                            <span
                                className="w-2 h-2 rounded-full animate-pulse"
                                style={{ background: '#FF6B9D' }}
                            />
                            <span
                                className="text-sm font-bold"
                                style={{ color: '#C44569' }}
                            >
                                LIVE
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Active Markets Card */}
                <div
                    className="rounded-lg overflow-hidden"
                    style={{ border: '2px solid #E0BBE4' }}
                >
                    <div
                        className="flex items-center justify-between px-3 py-1.5"
                        style={{ background: 'linear-gradient(180deg, #E0BBE4 0%, #C9A0DC 100%)' }}
                    >
                        <span className="text-xs font-bold text-white/90 tracking-wide">
                            ACTIVE_MARKETS.DAT
                        </span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                            <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                            <div className="w-3 h-3 rounded-sm bg-pink-300"></div>
                        </div>
                    </div>
                    <div
                        className="p-6"
                        style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}
                    >
                        <h2
                            className="text-xl font-bold mb-4"
                            style={{ color: '#6B4C7A' }}
                        >
                            Active Markets
                        </h2>
                        <div className="space-y-3">
                            {/* Market Item */}
                            <div
                                className="p-4 rounded-xl transition-all hover:scale-[1.02] cursor-pointer"
                                style={{ background: '#F8E8F8', border: '2px solid #E0BBE4' }}
                            >
                                <p
                                    className="text-sm font-medium mb-2"
                                    style={{ color: '#957DAD' }}
                                >
                                    Next Goal: Team A
                                </p>
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-2xl font-black"
                                        style={{ color: '#7EC8E3' }}
                                    >
                                        1.85
                                    </span>
                                    <span
                                        className="px-3 py-1 rounded-full text-sm font-semibold"
                                        style={{ background: '#E8F4F8', color: '#5BA4C9' }}
                                    >
                                        $0.01
                                    </span>
                                </div>
                            </div>

                            {/* Market Item 2 */}
                            <div
                                className="p-4 rounded-xl transition-all hover:scale-[1.02] cursor-pointer"
                                style={{ background: '#F8E8F8', border: '2px solid #E0BBE4' }}
                            >
                                <p
                                    className="text-sm font-medium mb-2"
                                    style={{ color: '#957DAD' }}
                                >
                                    Next Goal: Team B
                                </p>
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-2xl font-black"
                                        style={{ color: '#FF6B9D' }}
                                    >
                                        2.10
                                    </span>
                                    <span
                                        className="px-3 py-1 rounded-full text-sm font-semibold"
                                        style={{ background: '#FFE8EE', color: '#C44569' }}
                                    >
                                        $0.01
                                    </span>
                                </div>
                            </div>

                            {/* Market Item 3 */}
                            <div
                                className="p-4 rounded-xl transition-all hover:scale-[1.02] cursor-pointer"
                                style={{ background: '#F8E8F8', border: '2px solid #E0BBE4' }}
                            >
                                <p
                                    className="text-sm font-medium mb-2"
                                    style={{ color: '#957DAD' }}
                                >
                                    Next Corner
                                </p>
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-2xl font-black"
                                        style={{ color: '#957DAD' }}
                                    >
                                        1.92
                                    </span>
                                    <span
                                        className="px-3 py-1 rounded-full text-sm font-semibold"
                                        style={{ background: '#F0E8F4', color: '#6B4C7A' }}
                                    >
                                        $0.01
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* View All Link */}
                        <Link
                            href={`/${sport}/markets`}
                            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors"
                            style={{ color: '#C44569' }}
                        >
                            View All Markets →
                        </Link>
                    </div>
                </div>

                {/* Scoreboard Card */}
                <div
                    className="rounded-lg overflow-hidden"
                    style={{ border: '2px solid #FF6B9D' }}
                >
                    <div
                        className="flex items-center justify-between px-3 py-1.5"
                        style={{ background: 'linear-gradient(180deg, #FF6B9D 0%, #C44569 100%)' }}
                    >
                        <span className="text-xs font-bold text-white/90 tracking-wide">
                            SCOREBOARD.EXE
                        </span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                            <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                            <div className="w-3 h-3 rounded-sm bg-pink-200"></div>
                        </div>
                    </div>
                    <div
                        className="p-6"
                        style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}
                    >
                        <h2
                            className="text-xl font-bold mb-6"
                            style={{ color: '#6B4C7A' }}
                        >
                            Scoreboard
                        </h2>
                        <div className="text-center py-6">
                            {/* Score Display */}
                            <div className="flex items-center justify-center gap-6 mb-4">
                                <div className="text-center">
                                    <div
                                        className="text-5xl font-black"
                                        style={{ color: '#7EC8E3' }}
                                    >
                                        1
                                    </div>
                                    <p
                                        className="text-sm font-semibold mt-1"
                                        style={{ color: '#957DAD' }}
                                    >
                                        Team A
                                    </p>
                                </div>
                                <div
                                    className="text-3xl font-black"
                                    style={{ color: '#C9A0DC' }}
                                >
                                    -
                                </div>
                                <div className="text-center">
                                    <div
                                        className="text-5xl font-black"
                                        style={{ color: '#FF6B9D' }}
                                    >
                                        0
                                    </div>
                                    <p
                                        className="text-sm font-semibold mt-1"
                                        style={{ color: '#957DAD' }}
                                    >
                                        Team B
                                    </p>
                                </div>
                            </div>

                            {/* Match Time */}
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mt-4"
                                style={{ background: '#E8F4F8' }}
                            >
                                <span
                                    className="w-2 h-2 rounded-full animate-pulse"
                                    style={{ background: '#7EC8E3' }}
                                />
                                <span
                                    className="text-lg font-bold"
                                    style={{ color: '#5BA4C9' }}
                                >
                                    45:23
                                </span>
                            </div>
                        </div>

                        {/* Match Stats */}
                        <div
                            className="mt-6 p-4 rounded-xl"
                            style={{ background: '#F8E8F8' }}
                        >
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div
                                        className="text-lg font-bold"
                                        style={{ color: '#7EC8E3' }}
                                    >
                                        5
                                    </div>
                                    <div
                                        className="text-xs"
                                        style={{ color: '#957DAD' }}
                                    >
                                        Shots
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className="text-lg font-bold"
                                        style={{ color: '#957DAD' }}
                                    >
                                        55%
                                    </div>
                                    <div
                                        className="text-xs"
                                        style={{ color: '#957DAD' }}
                                    >
                                        Possession
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className="text-lg font-bold"
                                        style={{ color: '#FF6B9D' }}
                                    >
                                        3
                                    </div>
                                    <div
                                        className="text-xs"
                                        style={{ color: '#957DAD' }}
                                    >
                                        Shots
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}