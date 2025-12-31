"use client"

import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

// Mock data - replace with TanStack Query later
const esportsGames = [
    { icon: '🔫', name: 'CS2', count: 67 },
    { icon: '⚔️', name: 'League of Legends', count: 45 },
    { icon: '🐉', name: 'Dota 2', count: 32 },
    { icon: '🎯', name: 'Valorant', count: 28 },
    { icon: '🚀', name: 'Rocket League', count: 19 },
]

const esportsMatches = [
    {
        id: 1,
        league: 'BLAST Premier',
        homeTeam: 'NaVi',
        awayTeam: 'FaZe Clan',
        homeScore: 14,
        awayScore: 12,
        time: 'Map 2',
        odds: { home: 1.35, draw: null, away: 3.10 },
        overUnder: { over: 1.90, under: 1.90 }
    },
    {
        id: 2,
        league: 'LCS Winter',
        homeTeam: 'Cloud9',
        awayTeam: 'Team Liquid',
        homeScore: 1,
        awayScore: 0,
        time: '23:45',
        odds: { home: 2.25, draw: null, away: 1.65 },
        overUnder: { over: 1.85, under: 1.95 }
    },
    {
        id: 3,
        league: 'DPC SA',
        homeTeam: 'Evil Geniuses',
        awayTeam: 'Team Spirit',
        homeScore: 28,
        awayScore: 25,
        time: '38:12',
        odds: { home: 1.80, draw: null, away: 2.00 },
        overUnder: { over: 1.75, under: 2.05 }
    },
    {
        id: 4,
        league: 'VCT Americas',
        homeTeam: 'Sentinels',
        awayTeam: '100 Thieves',
        homeScore: 8,
        awayScore: 6,
        time: 'Round 12',
        odds: { home: 1.95, draw: null, away: 1.85 },
        overUnder: { over: 1.88, under: 1.92 }
    },
    {
        id: 5,
        league: 'RLCS Major',
        homeTeam: 'G2 Esports',
        awayTeam: 'Team BDS',
        homeScore: 3,
        awayScore: 2,
        time: 'Game 5',
        odds: { home: 1.72, draw: null, away: 2.15 },
        overUnder: { over: 1.80, under: 2.00 }
    }
]

const navItems = [
    { name: 'Live', path: '/' },
    { name: 'Sports', path: '/sports' },
    { name: 'Esports', path: '/esports' },
    { name: 'Casino', path: '/casino' }
]

export default function EsportsPage() {
    const pathname = usePathname()
    const [selectedEsport, setSelectedEsport] = useState('CS2')
    const [betSlip, setBetSlip] = useState<{ match: string; selection: string; odds: number }[]>([])

    const addToBetSlip = (match: string, selection: string, odds: number) => {
        setBetSlip(prev => [...prev, { match, selection, odds }])
    }

    const removeBet = (index: number) => {
        setBetSlip(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="min-h-screen overflow-hidden relative">
            {/* Epic Cyberpunk Background */}
            <div className="fixed inset-0">
                {/* Main gradient - deep purple to neon */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, #0D0221 0%, #1A0533 20%, #2D1B4E 40%, #1E1E3F 60%, #0F0F23 100%)'
                    }}
                />

                {/* Animated gradient orbs */}
                <div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl animate-pulse"
                    style={{ background: 'radial-gradient(circle, #9D4EDD 0%, transparent 70%)' }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-25 blur-3xl animate-pulse"
                    style={{ background: 'radial-gradient(circle, #00F5FF 0%, transparent 70%)', animationDelay: '1s' }}
                />
                <div
                    className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-20 blur-3xl animate-pulse"
                    style={{ background: 'radial-gradient(circle, #FF6B9D 0%, transparent 70%)', animationDelay: '2s' }}
                />

                {/* Cyber grid overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(157, 78, 221, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(157, 78, 221, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />

                {/* Scanline effect */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-5"
                    style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
                    }}
                />

                {/* Floating neon particles */}
                <div className="absolute top-20 left-[10%] text-3xl opacity-60 animate-bounce" style={{ animationDuration: '3s' }}>⚡</div>
                <div className="absolute top-40 right-[15%] text-2xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}>💎</div>
                <div className="absolute top-[30%] left-[5%] text-4xl opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }}>🎮</div>
                <div className="absolute bottom-[35%] right-[8%] text-3xl opacity-50 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4s' }}>🏆</div>
                <div className="absolute bottom-[20%] left-[20%] text-2xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}>✨</div>
                <div className="absolute top-[60%] right-[25%] text-xl opacity-30 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '3.5s' }}>🌟</div>
            </div>

            {/* Header - Cyberpunk Window Style */}
            <header className="relative z-10 mx-4 mt-4">
                <div
                    className="rounded-t-xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(180deg, rgba(157, 78, 221, 0.3) 0%, rgba(45, 27, 78, 0.5) 100%)',
                        border: '2px solid rgba(157, 78, 221, 0.5)',
                        boxShadow: '0 0 30px rgba(157, 78, 221, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}
                >
                    {/* Window title bar */}
                    <div
                        className="flex items-center justify-between px-4 py-2"
                        style={{
                            background: 'linear-gradient(90deg, rgba(157, 78, 221, 0.8) 0%, rgba(0, 245, 255, 0.4) 50%, rgba(255, 107, 157, 0.6) 100%)',
                            borderBottom: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-white tracking-widest">ESPORTS://ARENA.EXE</span>
                            <span
                                className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold"
                                style={{
                                    background: 'linear-gradient(135deg, #00F5FF, #FF6B9D)',
                                    color: '#0D0221'
                                }}
                            >
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                                LIVE
                            </span>
                        </div>
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-yellow-400/80 hover:bg-yellow-400 transition-colors cursor-pointer" />
                            <div className="w-3 h-3 rounded-full bg-green-400/80 hover:bg-green-400 transition-colors cursor-pointer" />
                            <div className="w-3 h-3 rounded-full bg-red-400/80 hover:bg-red-400 transition-colors cursor-pointer" />
                        </div>
                    </div>

                    {/* Main header content */}
                    <div
                        className="flex items-center justify-between px-4 py-3"
                        style={{
                            background: 'rgba(13, 2, 33, 0.8)',
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                        <div className="flex items-center gap-8">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-3 group">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black text-white transition-all group-hover:scale-110"
                                    style={{
                                        background: 'linear-gradient(135deg, #C77DFF 0%, #9D4EDD 50%, #00F5FF 100%)',
                                        boxShadow: '0 4px 20px rgba(157, 78, 221, 0.5), 0 0 40px rgba(0, 245, 255, 0.2)'
                                    }}
                                >
                                    μ
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-black tracking-tight leading-none">
                                        <span style={{ color: '#C77DFF' }}>MICRO</span>
                                        <span style={{ color: '#00F5FF' }}>BETS</span>
                                    </span>
                                    <span className="text-[10px] font-bold tracking-widest" style={{ color: '#FF6B9D' }}>
                                        ESPORTS ARENA
                                    </span>
                                </div>
                            </Link>

                            {/* Navigation */}
                            <nav className="hidden md:flex items-center gap-1">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.path
                                    const isEsports = item.name === 'Esports'

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.path as Route}
                                            className={`
                                                px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300
                                                ${isEsports
                                                    ? 'text-white scale-105'
                                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                                }
                                            `}
                                            style={isEsports ? {
                                                background: 'linear-gradient(135deg, #9D4EDD 0%, #00F5FF 100%)',
                                                boxShadow: '0 4px 20px rgba(157, 78, 221, 0.4), 0 0 30px rgba(0, 245, 255, 0.2)'
                                            } : {}}
                                        >
                                            {isEsports && (
                                                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                                            )}
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </nav>
                        </div>

                        {/* Right side actions */}
                        <div className="flex items-center gap-3">
                            <button
                                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#D1D5DB',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <span>🔍</span>
                                <span>Search</span>
                            </button>
                            <button
                                className="px-5 py-2.5 rounded-lg text-sm font-black text-white transition-all hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, #00F5FF 0%, #9D4EDD 100%)',
                                    boxShadow: '0 4px 20px rgba(0, 245, 255, 0.4)'
                                }}
                            >
                                Connect Wallet
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="relative z-10 flex px-4 pb-4">
                {/* Esports Games Sidebar */}
                <aside className="hidden lg:block w-20 mr-4 mt-4">
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{
                            background: 'rgba(13, 2, 33, 0.8)',
                            border: '2px solid rgba(157, 78, 221, 0.3)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                        }}
                    >
                        <div
                            className="px-2 py-2 text-[10px] font-black text-center tracking-widest"
                            style={{
                                background: 'linear-gradient(135deg, #9D4EDD, #C77DFF)',
                                color: 'white'
                            }}
                        >
                            GAMES
                        </div>
                        <div className="flex flex-col items-center py-3 gap-2">
                            {esportsGames.map(game => (
                                <button
                                    key={game.name}
                                    onClick={() => setSelectedEsport(game.name)}
                                    className={`
                                        group relative w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-300
                                        ${selectedEsport === game.name
                                            ? 'scale-110'
                                            : 'hover:scale-105 hover:bg-white/5'
                                        }
                                    `}
                                    style={selectedEsport === game.name ? {
                                        background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.4), rgba(0, 245, 255, 0.2))',
                                        border: '2px solid rgba(0, 245, 255, 0.5)',
                                        boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)'
                                    } : {}}
                                >
                                    <span className="text-2xl">{game.icon}</span>
                                    <span
                                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center"
                                        style={{
                                            background: 'linear-gradient(135deg, #FF6B9D, #C77DFF)',
                                            color: 'white',
                                            boxShadow: '0 2px 10px rgba(255, 107, 157, 0.5)'
                                        }}
                                    >
                                        {game.count > 99 ? '99+' : game.count}
                                    </span>

                                    {/* Tooltip */}
                                    <div
                                        className="absolute left-full ml-3 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50"
                                        style={{
                                            background: 'linear-gradient(135deg, #9D4EDD, #00F5FF)',
                                            color: 'white',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        {game.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 mt-4 space-y-4">
                    {/* Live Matches Window */}
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{
                            border: '2px solid rgba(157, 78, 221, 0.4)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 60px rgba(157, 78, 221, 0.1)'
                        }}
                    >
                        {/* Window title bar */}
                        <div
                            className="flex items-center justify-between px-4 py-2"
                            style={{
                                background: 'linear-gradient(90deg, rgba(157, 78, 221, 0.8) 0%, rgba(0, 245, 255, 0.3) 100%)'
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-black text-white tracking-widest">LIVE_MATCHES.DAT</span>
                                <span
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black"
                                    style={{
                                        background: 'linear-gradient(135deg, #FF6B9D, #C77DFF)',
                                        color: 'white'
                                    }}
                                >
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                                    {esportsMatches.length} LIVE
                                </span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-white/30" />
                                <div className="w-3 h-3 rounded-full bg-white/30" />
                                <div className="w-3 h-3 rounded-full bg-purple-400" />
                            </div>
                        </div>

                        {/* Matches content */}
                        <div
                            style={{
                                background: 'rgba(13, 2, 33, 0.9)',
                                backdropFilter: 'blur(20px)'
                            }}
                        >
                            {/* Table header */}
                            <div
                                className="grid grid-cols-12 gap-4 px-4 py-3 text-[10px] font-black uppercase tracking-widest"
                                style={{
                                    background: 'rgba(157, 78, 221, 0.2)',
                                    color: '#C77DFF',
                                    borderBottom: '1px solid rgba(157, 78, 221, 0.3)'
                                }}
                            >
                                <div className="col-span-5">Match</div>
                                <div className="col-span-3 text-center">Winner</div>
                                <div className="col-span-2 text-center">O/U</div>
                                <div className="col-span-2 text-center">Status</div>
                            </div>

                            {/* Match rows */}
                            {esportsMatches.map((match, index) => (
                                <div
                                    key={match.id}
                                    className={`
                                        grid grid-cols-12 gap-4 px-4 py-4 items-center transition-all duration-300
                                        hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-cyan-500/5
                                        ${index !== esportsMatches.length - 1 ? 'border-b border-purple-500/20' : ''}
                                    `}
                                >
                                    {/* Match info */}
                                    <div className="col-span-5">
                                        <div
                                            className="text-[10px] font-black uppercase tracking-wider mb-2 flex items-center gap-2"
                                            style={{ color: '#C77DFF' }}
                                        >
                                            <span
                                                className="w-1.5 h-1.5 rounded-full animate-pulse"
                                                style={{ background: '#00F5FF' }}
                                            />
                                            {match.league}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-white">{match.homeTeam}</span>
                                                <span
                                                    className="text-xl font-black"
                                                    style={{
                                                        color: '#00F5FF',
                                                        textShadow: '0 0 20px rgba(0, 245, 255, 0.5)'
                                                    }}
                                                >
                                                    {match.homeScore}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-slate-400">{match.awayTeam}</span>
                                                <span
                                                    className="text-xl font-black"
                                                    style={{
                                                        color: '#FF6B9D',
                                                        textShadow: '0 0 20px rgba(255, 107, 157, 0.5)'
                                                    }}
                                                >
                                                    {match.awayScore}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Winner Odds */}
                                    <div className="col-span-3 flex justify-center gap-2">
                                        {[
                                            { label: '1', value: match.odds.home, team: match.homeTeam },
                                            { label: '2', value: match.odds.away, team: match.awayTeam }
                                        ].map(odd => (
                                            <button
                                                key={odd.label}
                                                onClick={() => addToBetSlip(
                                                    `${match.homeTeam} vs ${match.awayTeam}`,
                                                    odd.team,
                                                    odd.value!
                                                )}
                                                className="group px-3 py-2 rounded-lg transition-all duration-300 hover:scale-110 min-w-[56px]"
                                                style={{
                                                    background: 'rgba(255,255,255,0.05)',
                                                    border: '2px solid rgba(157, 78, 221, 0.3)'
                                                }}
                                            >
                                                <div className="text-[9px] font-bold text-slate-500 group-hover:text-slate-300">
                                                    {odd.label}
                                                </div>
                                                <div
                                                    className="text-sm font-black group-hover:scale-110 transition-transform"
                                                    style={{ color: '#C77DFF' }}
                                                >
                                                    {odd.value!.toFixed(2)}
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Over/Under */}
                                    <div className="col-span-2 flex justify-center gap-2">
                                        <button
                                            onClick={() => addToBetSlip(`${match.homeTeam} vs ${match.awayTeam}`, 'Over', match.overUnder.over)}
                                            className="px-2 py-2 rounded-lg transition-all duration-300 hover:scale-110"
                                            style={{
                                                background: 'rgba(0, 245, 255, 0.1)',
                                                border: '2px solid rgba(0, 245, 255, 0.4)'
                                            }}
                                        >
                                            <div className="text-[9px] font-bold" style={{ color: '#00F5FF' }}>O</div>
                                            <div className="text-sm font-black" style={{ color: '#00F5FF' }}>
                                                {match.overUnder.over.toFixed(2)}
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => addToBetSlip(`${match.homeTeam} vs ${match.awayTeam}`, 'Under', match.overUnder.under)}
                                            className="px-2 py-2 rounded-lg transition-all duration-300 hover:scale-110"
                                            style={{
                                                background: 'rgba(255, 107, 157, 0.1)',
                                                border: '2px solid rgba(255, 107, 157, 0.4)'
                                            }}
                                        >
                                            <div className="text-[9px] font-bold" style={{ color: '#FF6B9D' }}>U</div>
                                            <div className="text-sm font-black" style={{ color: '#FF6B9D' }}>
                                                {match.overUnder.under.toFixed(2)}
                                            </div>
                                        </button>
                                    </div>

                                    {/* Time/Status */}
                                    <div className="col-span-2 text-center">
                                        <div
                                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(157, 78, 221, 0.2))',
                                                border: '1px solid rgba(0, 245, 255, 0.3)'
                                            }}
                                        >
                                            <span
                                                className="w-2 h-2 rounded-full animate-pulse"
                                                style={{ background: 'linear-gradient(135deg, #00F5FF, #FF6B9D)' }}
                                            />
                                            <span
                                                className="text-xs font-black"
                                                style={{ color: '#00F5FF' }}
                                            >
                                                {match.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Tournament Prize', value: '$1.2M', change: '+28%', color: '#C77DFF', icon: '🏆' },
                            { label: 'Live Viewers', value: '247K', change: '+15%', color: '#00F5FF', icon: '👁️' },
                            { label: 'Avg Bet Size', value: '$42', change: '+8%', color: '#9D4EDD', icon: '💰' },
                            { label: 'Settlement', value: '0.3s', change: '-22%', color: '#FF6B9D', icon: '⚡' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="p-5 rounded-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
                                style={{
                                    background: 'rgba(13, 2, 33, 0.8)',
                                    border: `2px solid ${stat.color}30`,
                                    boxShadow: `0 8px 32px rgba(0,0,0,0.2), 0 0 30px ${stat.color}10`,
                                    backdropFilter: 'blur(20px)'
                                }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        {stat.label}
                                    </span>
                                    <span className="text-xl">{stat.icon}</span>
                                </div>
                                <div
                                    className="text-3xl font-black mb-1"
                                    style={{
                                        color: stat.color,
                                        textShadow: `0 0 30px ${stat.color}50`
                                    }}
                                >
                                    {stat.value}
                                </div>
                                <div
                                    className="text-xs font-bold"
                                    style={{ color: stat.change.startsWith('+') ? '#00F5FF' : '#FF6B9D' }}
                                >
                                    {stat.change} today
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Bet Slip Sidebar */}
                <aside className="hidden xl:block w-80 ml-4 mt-4">
                    <div
                        className="rounded-xl overflow-hidden sticky top-4"
                        style={{
                            border: '2px solid rgba(0, 245, 255, 0.4)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 60px rgba(0, 245, 255, 0.1)'
                        }}
                    >
                        {/* Window title bar */}
                        <div
                            className="flex items-center justify-between px-4 py-2"
                            style={{
                                background: 'linear-gradient(90deg, #00F5FF 0%, #9D4EDD 100%)'
                            }}
                        >
                            <span className="text-xs font-black text-white tracking-widest">BETSLIP.EXE</span>
                            <span
                                className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center"
                                style={{
                                    background: 'white',
                                    color: '#0D0221'
                                }}
                            >
                                {betSlip.length}
                            </span>
                        </div>

                        {/* Bet slip content */}
                        <div
                            style={{
                                background: 'rgba(13, 2, 33, 0.95)',
                                backdropFilter: 'blur(20px)'
                            }}
                        >
                            {betSlip.length === 0 ? (
                                <div className="text-center py-12 px-4">
                                    <div
                                        className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.2), rgba(0, 245, 255, 0.1))',
                                            border: '2px solid rgba(157, 78, 221, 0.3)'
                                        }}
                                    >
                                        🎮
                                    </div>
                                    <div className="text-sm font-bold text-slate-400 mb-2">No bets placed yet</div>
                                    <div className="text-xs text-slate-500">Click on odds to add bets</div>
                                </div>
                            ) : (
                                <>
                                    <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                                        {betSlip.map((bet, index) => (
                                            <div
                                                key={index}
                                                className="p-3 rounded-lg transition-all hover:scale-[1.02]"
                                                style={{
                                                    background: 'rgba(255,255,255,0.05)',
                                                    border: '1px solid rgba(157, 78, 221, 0.3)'
                                                }}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-[10px] text-slate-400 truncate mb-1">{bet.match}</div>
                                                        <div className="font-bold text-white">{bet.selection}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => removeBet(index)}
                                                        className="text-slate-500 hover:text-red-400 transition-colors text-lg hover:scale-125"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                                <div
                                                    className="mt-2 text-xl font-black"
                                                    style={{
                                                        color: '#00F5FF',
                                                        textShadow: '0 0 20px rgba(0, 245, 255, 0.5)'
                                                    }}
                                                >
                                                    {bet.odds.toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div
                                        className="p-4 border-t"
                                        style={{ borderColor: 'rgba(157, 78, 221, 0.3)' }}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-slate-400">Total Odds</span>
                                            <span
                                                className="text-xl font-black"
                                                style={{
                                                    color: '#C77DFF',
                                                    textShadow: '0 0 20px rgba(199, 125, 255, 0.5)'
                                                }}
                                            >
                                                {betSlip.reduce((acc, bet) => acc * bet.odds, 1).toFixed(2)}
                                            </span>
                                        </div>

                                        <input
                                            type="number"
                                            placeholder="Stake (CRO)"
                                            className="w-full px-4 py-3 rounded-lg text-sm font-bold outline-none transition-all focus:scale-[1.02]"
                                            style={{
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '2px solid rgba(157, 78, 221, 0.3)',
                                                color: 'white'
                                            }}
                                            defaultValue="0.01"
                                            step="0.01"
                                            min="0.01"
                                        />

                                        <button
                                            className="w-full mt-3 py-4 rounded-lg font-black text-white transition-all hover:scale-[1.02] text-sm tracking-wide"
                                            style={{
                                                background: 'linear-gradient(135deg, #00F5FF 0%, #9D4EDD 50%, #FF6B9D 100%)',
                                                boxShadow: '0 8px 30px rgba(0, 245, 255, 0.4)'
                                            }}
                                        >
                                            ⚡ PLACE BET
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}