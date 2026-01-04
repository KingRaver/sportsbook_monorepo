"use client"

import type { Route } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Casino games data
const casinoGames = [
    { icon: '🎰', name: 'Slots', count: 245 },
    { icon: '🃏', name: 'Blackjack', count: 89 },
    { icon: '♠️', name: 'Poker', count: 67 },
    { icon: '🎲', name: 'Roulette', count: 54 },
    { icon: '🚀', name: 'Crash', count: 112 },
    { icon: '🎯', name: 'Dice', count: 38 },
]

const liveTables = [
    {
        id: 1,
        game: 'Lightning Roulette',
        table: 'Table 7',
        dealer: 'Elena K.',
        players: 847,
        minBet: '$0.50',
        status: 'SPINNING',
        odds: { red: 1.95, black: 1.95, green: 35.0 },
        lastNumbers: [7, 32, 15, 19, 4]
    },
    {
        id: 2,
        game: 'Infinite Blackjack',
        table: 'Table 3',
        dealer: 'Mike R.',
        players: 1243,
        minBet: '$1.00',
        status: 'DEALING',
        odds: { hit: 1.92, stand: 1.05, double: 2.0 },
        lastNumbers: []
    },
    {
        id: 3,
        game: 'Speed Baccarat',
        table: 'Table 12',
        dealer: 'Sophia L.',
        players: 562,
        minBet: '$5.00',
        status: 'BETTING',
        odds: { player: 1.98, banker: 0.95, tie: 8.0 },
        lastNumbers: []
    },
    {
        id: 4,
        game: 'Rocket Crash',
        table: 'Crash Arena',
        dealer: 'Auto',
        players: 2891,
        minBet: '$0.10',
        status: 'FLYING',
        odds: { cashout: null, banker: null, tie: null },
        multiplier: 3.47
    },
    {
        id: 5,
        game: 'Dream Catcher',
        table: 'Wheel 1',
        dealer: 'Luna M.',
        players: 423,
        minBet: '$0.25',
        status: 'SPINNING',
        odds: { x1: 1.0, x2: 2.0, x5: 5.0 },
        lastNumbers: [2, 1, 5, 2, 1]
    }
]

const navItems: { name: string; path: Route }[] = [
    { name: 'Live', path: '/' as Route },
    { name: 'Sports', path: '/sports' as Route },
    { name: 'Esports', path: '/esports' as Route },
    { name: 'Casino', path: '/casino' as Route },
    { name: 'Prediction', path: '/prediction' as Route }
]

export default function CasinoPage() {
    const [selectedGame, setSelectedGame] = useState('Slots')
    const [betSlip, setBetSlip] = useState<{ table: string; selection: string; odds: number }[]>([])
    const [currentTime, setCurrentTime] = useState('')
    const [currentDate, setCurrentDate] = useState('')
    const [crashMultiplier, setCrashMultiplier] = useState(1.00)

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            setCurrentTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }))
            setCurrentDate(now.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            }))
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const crashTimer = setInterval(() => {
            setCrashMultiplier(prev => {
                if (prev >= 10) return 1.00
                return prev + 0.03
            })
        }, 100)
        return () => clearInterval(crashTimer)
    }, [])

    const addToBetSlip = (table: string, selection: string, odds: number) => {
        setBetSlip(prev => [...prev, { table, selection, odds }])
    }

    const removeBet = (index: number) => {
        setBetSlip(prev => prev.filter((_, i) => i !== index))
    }

    const liveCount = liveTables.filter(t => t.status !== 'UPCOMING').length

    return (
        <div className="min-h-screen overflow-hidden relative">
            {/* Dreamy Vaporwave Background */}
            <div className="fixed inset-0">
                {/* Main gradient - soft pastels like the reference */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(180deg, #FFB6C1 0%, #DDA0DD 15%, #E6E6FA 30%, #B0E0E6 50%, #98D8C8 70%, #F0E68C 85%, #FFB6C1 100%)'
                    }}
                />

                {/* Secondary overlay for depth */}
                <div
                    className="absolute inset-0 opacity-50"
                    style={{
                        background: 'radial-gradient(ellipse at 30% 20%, rgba(255, 182, 193, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(176, 224, 230, 0.4) 0%, transparent 50%)'
                    }}
                />

                {/* Retro grid overlay */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Floating clouds */}
                <div className="absolute top-16 left-[8%] text-5xl opacity-70 animate-bounce" style={{ animationDuration: '6s' }}>☁️</div>
                <div className="absolute top-32 right-[12%] text-4xl opacity-60 animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }}>☁️</div>
                <div className="absolute top-48 left-[25%] text-3xl opacity-50 animate-bounce" style={{ animationDuration: '7s', animationDelay: '2s' }}>☁️</div>

                {/* Sparkles */}
                <div className="absolute top-24 right-[30%] text-2xl opacity-60 animate-pulse">✦</div>
                <div className="absolute top-40 left-[15%] text-xl opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}>✧</div>
                <div className="absolute bottom-32 right-[20%] text-2xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}>✦</div>
                <div className="absolute bottom-48 left-[35%] text-xl opacity-50 animate-pulse" style={{ animationDelay: '1.5s' }}>✧</div>
                <div className="absolute top-[60%] right-[8%] text-lg opacity-40 animate-pulse" style={{ animationDelay: '2s' }}>⭐</div>

                {/* Casino-themed floating elements */}
                <div className="absolute bottom-24 right-[15%] text-3xl opacity-40 animate-bounce" style={{ animationDuration: '5s' }}>🎰</div>
                <div className="absolute top-[45%] left-[5%] text-2xl opacity-30 animate-bounce" style={{ animationDuration: '6s', animationDelay: '1s' }}>🃏</div>
                <div className="absolute bottom-[40%] right-[5%] text-2xl opacity-35 animate-bounce" style={{ animationDuration: '7s', animationDelay: '2s' }}>💎</div>
            </div>

            {/* Main Desktop Window */}
            <div className="relative z-10 mx-4 mt-4">
                {/* Window Frame */}
                <div
                    className="rounded-xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(180deg, #E6E6FA 0%, #DDA0DD 100%)',
                        border: '3px solid #D8BFD8',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 2px 0 rgba(255,255,255,0.5)'
                    }}
                >
                    {/* Window Title Bar */}
                    <div
                        className="flex items-center justify-between px-4 py-2"
                        style={{
                            background: 'linear-gradient(90deg, #FF69B4 0%, #DA70D6 25%, #BA55D3 50%, #9370DB 75%, #8A2BE2 100%)',
                            borderBottom: '2px solid rgba(255,255,255,0.3)'
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-black text-white tracking-widest drop-shadow-md">
                                CASINO.EXE
                            </span>
                            <div
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
                                style={{
                                    background: 'linear-gradient(135deg, #FF69B4, #DA70D6)',
                                    color: 'white',
                                    boxShadow: '0 2px 8px rgba(255, 105, 180, 0.4)'
                                }}
                            >
                                <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                                {liveCount} LIVE NOW
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/90">
                                <span>{currentDate}</span>
                                <span className="text-white/60">|</span>
                                <span>{currentTime}</span>
                            </div>
                            <div className="flex gap-1.5">
                                <button className="w-4 h-4 rounded-sm bg-yellow-300 hover:bg-yellow-400 transition-colors flex items-center justify-center text-[10px] font-bold text-yellow-800">−</button>
                                <button className="w-4 h-4 rounded-sm bg-green-300 hover:bg-green-400 transition-colors flex items-center justify-center text-[10px] font-bold text-green-800">□</button>
                                <button className="w-4 h-4 rounded-sm bg-pink-300 hover:bg-pink-400 transition-colors flex items-center justify-center text-[10px] font-bold text-pink-800">×</button>
                            </div>
                        </div>
                    </div>

                    {/* Menu Bar */}
                    <div
                        className="flex items-center gap-6 px-4 py-1.5 text-xs font-medium"
                        style={{
                            background: 'rgba(255,255,255,0.85)',
                            borderBottom: '1px solid rgba(186, 85, 211, 0.2)',
                            color: '#6B4C7A'
                        }}
                    >
                        <span className="hover:text-pink-500 cursor-pointer transition-colors">File</span>
                        <span className="hover:text-pink-500 cursor-pointer transition-colors">Edit</span>
                        <span className="hover:text-pink-500 cursor-pointer transition-colors">View</span>
                        <span className="hover:text-pink-500 cursor-pointer transition-colors">Games</span>
                        <span className="hover:text-pink-500 cursor-pointer transition-colors">Wallet</span>
                        <span className="hover:text-pink-500 cursor-pointer transition-colors">Help</span>
                    </div>

                    {/* Main Header Content */}
                    <div
                        className="flex items-center justify-between px-4 py-3"
                        style={{
                            background: 'rgba(255,255,255,0.9)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <div className="flex items-center gap-8">
                            {/* Logo */}
                            <Link href={'/' as Route} className="flex items-center gap-3 group">
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-black text-white transition-all group-hover:scale-110 group-hover:rotate-3"
                                    style={{
                                        background: 'linear-gradient(135deg, #FF69B4 0%, #DA70D6 50%, #BA55D3 100%)',
                                        boxShadow: '0 4px 15px rgba(255, 105, 180, 0.4), inset 0 2px 0 rgba(255,255,255,0.3)'
                                    }}
                                >
                                    μ
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-black tracking-tight leading-none">
                                        <span style={{ color: '#FF69B4' }}>MICRO</span>
                                        <span style={{ color: '#BA55D3' }}>BETS</span>
                                    </span>
                                    <span className="text-[10px] font-bold tracking-widest" style={{ color: '#9370DB' }}>
                                        🎰 LIVE CASINO 🎰
                                    </span>
                                </div>
                            </Link>

                            {/* Navigation */}
                            <nav className="hidden md:flex items-center gap-1">
                                {navItems.map((item) => {
                                    const isCasino = item.name === 'Casino'

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.path}
                                            className={`
                                                px-4 py-2 rounded-full text-sm font-bold transition-all duration-300
                                                ${isCasino
                                                    ? 'text-white scale-105'
                                                    : 'hover:scale-105'
                                                }
                                            `}
                                            style={isCasino ? {
                                                background: 'linear-gradient(135deg, #FF69B4 0%, #DA70D6 50%, #BA55D3 100%)',
                                                boxShadow: '0 4px 15px rgba(255, 105, 180, 0.4)'
                                            } : {
                                                color: '#957DAD',
                                                background: 'transparent'
                                            }}
                                        >
                                            {isCasino && (
                                                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                                            )}
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </nav>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-3">
                            <button
                                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,105,180,0.2), rgba(186,85,211,0.2))',
                                    border: '2px solid rgba(186, 85, 211, 0.3)',
                                    color: '#BA55D3'
                                }}
                            >
                                <span>🔍</span>
                                <span>Search</span>
                            </button>
                            <button
                                className="px-5 py-2.5 rounded-full text-sm font-black text-white transition-all hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, #FF69B4 0%, #DA70D6 100%)',
                                    boxShadow: '0 4px 15px rgba(255, 105, 180, 0.4)'
                                }}
                            >
                                🎰 Connect Wallet
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex px-4 pb-4">
                {/* Games Sidebar */}
                <aside className="hidden lg:block w-24 mr-4 mt-4">
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{
                            background: 'rgba(255,255,255,0.9)',
                            border: '3px solid #D8BFD8',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        {/* Sidebar title */}
                        <div
                            className="px-2 py-2 text-[10px] font-black text-center tracking-widest text-white"
                            style={{
                                background: 'linear-gradient(90deg, #FF69B4, #DA70D6, #BA55D3)'
                            }}
                        >
                            🎰 GAMES
                        </div>
                        <div className="flex flex-col items-center py-3 gap-2">
                            {casinoGames.map(game => (
                                <button
                                    key={game.name}
                                    onClick={() => setSelectedGame(game.name)}
                                    className={`
                                        group relative w-16 h-16 rounded-xl flex flex-col items-center justify-center transition-all duration-300
                                        ${selectedGame === game.name
                                            ? 'scale-110'
                                            : 'hover:scale-105'
                                        }
                                    `}
                                    style={selectedGame === game.name ? {
                                        background: 'linear-gradient(135deg, rgba(255, 105, 180, 0.3), rgba(186, 85, 211, 0.3))',
                                        border: '2px solid #FF69B4',
                                        boxShadow: '0 4px 15px rgba(255, 105, 180, 0.3)'
                                    } : {
                                        background: 'rgba(255,255,255,0.5)',
                                        border: '2px solid transparent'
                                    }}
                                >
                                    <span className="text-2xl">{game.icon}</span>
                                    <span
                                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                                        style={{
                                            background: 'linear-gradient(135deg, #FF69B4, #DA70D6)',
                                            boxShadow: '0 2px 8px rgba(255, 105, 180, 0.4)'
                                        }}
                                    >
                                        {game.count > 99 ? '99+' : game.count}
                                    </span>

                                    {/* Tooltip */}
                                    <div
                                        className="absolute left-full ml-3 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50"
                                        style={{
                                            background: 'linear-gradient(135deg, #FF69B4, #DA70D6)',
                                            color: 'white',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
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
                    {/* Live Tables Window */}
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{
                            border: '3px solid #D8BFD8',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }}
                    >
                        {/* Window title bar */}
                        <div
                            className="flex items-center justify-between px-4 py-2"
                            style={{
                                background: 'linear-gradient(90deg, #FF69B4 0%, #DA70D6 50%, #BA55D3 100%)'
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-black text-white tracking-widest drop-shadow-md">
                                    TABLES.DAT
                                </span>
                                <span
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
                                    style={{
                                        background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                                        boxShadow: '0 2px 8px rgba(255, 215, 0, 0.4)'
                                    }}
                                >
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                                    {liveTables.length} TABLES
                                </span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-white/40" />
                                <div className="w-3 h-3 rounded-full bg-white/40" />
                                <div className="w-3 h-3 rounded-full bg-pink-200" />
                            </div>
                        </div>

                        {/* Tables content */}
                        <div
                            style={{
                                background: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            {/* Table rows */}
                            {liveTables.map((table, index) => (
                                <div
                                    key={table.id}
                                    className={`
                                        p-4 transition-all duration-300
                                        hover:bg-gradient-to-r hover:from-pink-50 hover:via-purple-50 hover:to-blue-50
                                        ${index !== liveTables.length - 1 ? 'border-b border-purple-100' : ''}
                                    `}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <div
                                                className="text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-2"
                                                style={{ color: '#9370DB' }}
                                            >
                                                <span
                                                    className="w-2 h-2 rounded-full animate-pulse"
                                                    style={{ background: '#FF69B4' }}
                                                />
                                                {table.game}
                                            </div>
                                            <div className="font-bold" style={{ color: '#6B4C7A' }}>
                                                {table.table} • Dealer: {table.dealer}
                                            </div>
                                            <div className="text-xs" style={{ color: '#957DAD' }}>
                                                {table.players.toLocaleString()} watching • Min: {table.minBet}
                                            </div>
                                        </div>
                                        <div
                                            className="px-3 py-1.5 rounded-full text-xs font-bold"
                                            style={{
                                                background: 'linear-gradient(135deg, #FF69B4, #DA70D6)',
                                                color: 'white',
                                                boxShadow: '0 2px 8px rgba(255, 105, 180, 0.3)'
                                            }}
                                        >
                                            {table.status}
                                        </div>
                                    </div>

                                    {/* Crash Game Special Display */}
                                    {table.game === 'Rocket Crash' && (
                                        <div
                                            className="p-4 rounded-xl mb-3 text-center"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255,99,71,0.1), rgba(255,69,0,0.1))',
                                                border: '2px solid rgba(255, 99, 71, 0.3)'
                                            }}
                                        >
                                            <div className="text-xs mb-1" style={{ color: '#FF6347' }}>CURRENT MULTIPLIER</div>
                                            <div
                                                className="text-4xl font-black animate-pulse"
                                                style={{
                                                    background: 'linear-gradient(135deg, #FF6347, #FF4500)',
                                                    backgroundClip: 'text',
                                                    WebkitBackgroundClip: 'text',
                                                    color: 'transparent'
                                                }}
                                            >
                                                {crashMultiplier.toFixed(2)}x
                                            </div>
                                            <button
                                                className="mt-3 px-6 py-2 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                                                style={{
                                                    background: 'linear-gradient(135deg, #FF6347 0%, #FF4500 100%)',
                                                    boxShadow: '0 4px 15px rgba(255, 99, 71, 0.4)'
                                                }}
                                            >
                                                🚀 CASH OUT
                                            </button>
                                        </div>
                                    )}

                                    {/* Betting Options */}
                                    {table.odds.red !== undefined && (
                                        <div className="flex gap-2">
                                            {[
                                                { label: 'Red', value: table.odds.red, color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
                                                { label: 'Green', value: table.odds.green, color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
                                                { label: 'Black', value: table.odds.black, color: '#374151', bg: 'rgba(55,65,81,0.15)' }
                                            ].map(odd => (
                                                <button
                                                    key={odd.label}
                                                    onClick={() => addToBetSlip(table.game, odd.label, odd.value!)}
                                                    className="flex-1 px-3 py-2 rounded-lg transition-all hover:scale-105"
                                                    style={{
                                                        background: odd.bg,
                                                        border: `2px solid ${odd.color}`
                                                    }}
                                                >
                                                    <div className="text-[9px] font-bold" style={{ color: odd.color }}>
                                                        {odd.label}
                                                    </div>
                                                    <div className="text-sm font-black" style={{ color: odd.color }}>
                                                        {odd.value!.toFixed(2)}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Blackjack Options */}
                                    {table.odds.hit !== undefined && (
                                        <div className="flex gap-2">
                                            {[
                                                { label: 'Hit', value: table.odds.hit, color: '#FF69B4', bg: 'rgba(255,105,180,0.15)' },
                                                { label: 'Stand', value: table.odds.stand, color: '#9370DB', bg: 'rgba(147,112,219,0.15)' },
                                                { label: 'Double', value: table.odds.double, color: '#DA70D6', bg: 'rgba(218,112,214,0.15)' }
                                            ].map(odd => (
                                                <button
                                                    key={odd.label}
                                                    onClick={() => addToBetSlip(table.game, odd.label, odd.value!)}
                                                    className="flex-1 px-3 py-2 rounded-lg transition-all hover:scale-105"
                                                    style={{
                                                        background: odd.bg,
                                                        border: `2px solid ${odd.color}`
                                                    }}
                                                >
                                                    <div className="text-[9px] font-bold" style={{ color: odd.color }}>
                                                        {odd.label}
                                                    </div>
                                                    <div className="text-sm font-black" style={{ color: odd.color }}>
                                                        {odd.value!.toFixed(2)}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Baccarat Options */}
                                    {table.odds.player !== undefined && (
                                        <div className="flex gap-2">
                                            {[
                                                { label: 'Player', value: table.odds.player, color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
                                                { label: 'Tie', value: table.odds.tie, color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
                                                { label: 'Banker', value: table.odds.banker, color: '#EF4444', bg: 'rgba(239,68,68,0.15)' }
                                            ].map(odd => (
                                                <button
                                                    key={odd.label}
                                                    onClick={() => addToBetSlip(table.game, odd.label, odd.value!)}
                                                    className="flex-1 px-3 py-2 rounded-lg transition-all hover:scale-105"
                                                    style={{
                                                        background: odd.bg,
                                                        border: `2px solid ${odd.color}`
                                                    }}
                                                >
                                                    <div className="text-[9px] font-bold" style={{ color: odd.color }}>
                                                        {odd.label}
                                                    </div>
                                                    <div className="text-sm font-black" style={{ color: odd.color }}>
                                                        {odd.value!.toFixed(2)}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Dream Catcher Options */}
                                    {table.odds.x1 !== undefined && (
                                        <div className="flex gap-2">
                                            {[
                                                { label: '1x', value: table.odds.x1, color: '#F59E0B', bg: 'rgba(251,191,36,0.15)' },
                                                { label: '2x', value: table.odds.x2, color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
                                                { label: '5x', value: table.odds.x5, color: '#A855F7', bg: 'rgba(168,85,247,0.15)' }
                                            ].map(odd => (
                                                <button
                                                    key={odd.label}
                                                    onClick={() => addToBetSlip(table.game, odd.label, odd.value!)}
                                                    className="flex-1 px-3 py-2 rounded-lg transition-all hover:scale-105"
                                                    style={{
                                                        background: odd.bg,
                                                        border: `2px solid ${odd.color}`
                                                    }}
                                                >
                                                    <div className="text-[9px] font-bold" style={{ color: odd.color }}>
                                                        {odd.label}
                                                    </div>
                                                    <div className="text-sm font-black" style={{ color: odd.color }}>
                                                        {odd.value!.toFixed(2)}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Last Numbers for Roulette/Wheel */}
                                    {table.lastNumbers && table.lastNumbers.length > 0 && (
                                        <div className="mt-3 flex items-center gap-2">
                                            <span className="text-xs" style={{ color: '#9370DB' }}>Last:</span>
                                            <div className="flex gap-1">
                                                {table.lastNumbers.map((num, i) => (
                                                    <span
                                                        key={i}
                                                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                                        style={{
                                                            background: num === 0 ? '#10B981' : num <= 18 ? '#EF4444' : '#374151'
                                                        }}
                                                    >
                                                        {num}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Jackpot', value: '$2.8M', change: '+8%', icon: '💰', gradient: 'linear-gradient(135deg, #FFD700, #FFA500)' },
                            { label: 'Active Players', value: '6,124', change: '+12%', icon: '🎮', gradient: 'linear-gradient(135deg, #FF69B4, #DA70D6)' },
                            { label: 'Avg Payout', value: '96.8%', change: '+0.3%', icon: '📊', gradient: 'linear-gradient(135deg, #9370DB, #BA55D3)' },
                            { label: 'Hot Streak', value: '18x', change: 'Current', icon: '🔥', gradient: 'linear-gradient(135deg, #FF6347, #FF4500)' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="p-5 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                                style={{
                                    background: 'rgba(255,255,255,0.9)',
                                    border: '3px solid #D8BFD8',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span
                                        className="text-xs font-bold uppercase tracking-wider"
                                        style={{ color: '#957DAD' }}
                                    >
                                        {stat.label}
                                    </span>
                                    <span className="text-2xl group-hover:scale-125 transition-transform">
                                        {stat.icon}
                                    </span>
                                </div>
                                <div
                                    className="text-3xl font-black mb-1 bg-clip-text text-transparent"
                                    style={{ backgroundImage: stat.gradient }}
                                >
                                    {stat.value}
                                </div>
                                <div
                                    className="text-xs font-bold"
                                    style={{ color: '#9370DB' }}
                                >
                                    {stat.change} this week
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
                            border: '3px solid #D8BFD8',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }}
                    >
                        {/* Window title bar */}
                        <div
                            className="flex items-center justify-between px-4 py-2"
                            style={{
                                background: 'linear-gradient(90deg, #FF69B4 0%, #DA70D6 100%)'
                            }}
                        >
                            <span className="text-xs font-black text-white tracking-widest drop-shadow-md">
                                BET_SLIP.EXE
                            </span>
                            <span
                                className="w-7 h-7 rounded-full text-xs font-black flex items-center justify-center"
                                style={{
                                    background: 'white',
                                    color: '#FF69B4',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}
                            >
                                {betSlip.length}
                            </span>
                        </div>

                        {/* Bet slip content */}
                        <div
                            style={{
                                background: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            {betSlip.length === 0 ? (
                                <div className="text-center py-12 px-4">
                                    <div
                                        className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(255,182,193,0.3), rgba(186,85,211,0.3))',
                                            border: '3px solid #D8BFD8'
                                        }}
                                    >
                                        🎯
                                    </div>
                                    <div className="text-sm font-bold mb-2" style={{ color: '#6B4C7A' }}>
                                        No bets placed yet
                                    </div>
                                    <div className="text-xs" style={{ color: '#9370DB' }}>
                                        Click on odds to add bets 🎰
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                                        {betSlip.map((bet, index) => (
                                            <div
                                                key={index}
                                                className="p-3 rounded-xl transition-all hover:scale-[1.02]"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(255,182,193,0.3), rgba(186,85,211,0.2))',
                                                    border: '2px solid rgba(186, 85, 211, 0.3)'
                                                }}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-[10px] truncate mb-1" style={{ color: '#9370DB' }}>
                                                            {bet.table}
                                                        </div>
                                                        <div className="font-bold" style={{ color: '#6B4C7A' }}>
                                                            {bet.selection}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => removeBet(index)}
                                                        className="text-pink-400 hover:text-pink-600 transition-colors text-lg hover:scale-125"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                                <div
                                                    className="mt-2 text-xl font-black"
                                                    style={{ color: '#FF69B4' }}
                                                >
                                                    {bet.odds.toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div
                                        className="p-4"
                                        style={{ borderTop: '2px solid rgba(186, 85, 211, 0.2)' }}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-bold" style={{ color: '#6B4C7A' }}>
                                                Total Odds
                                            </span>
                                            <span
                                                className="text-xl font-black"
                                                style={{ color: '#FF69B4' }}
                                            >
                                                {betSlip.reduce((acc, bet) => acc * bet.odds, 1).toFixed(2)}
                                            </span>
                                        </div>

                                        <input
                                            type="number"
                                            placeholder="Stake (CRO)"
                                            className="w-full px-4 py-3 rounded-xl text-sm font-bold outline-none transition-all focus:scale-[1.02]"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255,182,193,0.3), rgba(186,85,211,0.2))',
                                                border: '2px solid rgba(186, 85, 211, 0.3)',
                                                color: '#6B4C7A'
                                            }}
                                            defaultValue="0.01"
                                            step="0.01"
                                            min="0.01"
                                        />

                                        <button
                                            className="w-full mt-3 py-4 rounded-xl font-black text-white transition-all hover:scale-[1.02] text-sm tracking-wide"
                                            style={{
                                                background: 'linear-gradient(135deg, #FF69B4 0%, #DA70D6 50%, #BA55D3 100%)',
                                                boxShadow: '0 8px 30px rgba(255, 105, 180, 0.4)'
                                            }}
                                        >
                                            🎰 PLACE BET 🎰
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Jackpot Card */}
                    <div
                        className="mt-4 rounded-xl overflow-hidden"
                        style={{
                            border: '3px solid #FFD700',
                            boxShadow: '0 8px 32px rgba(255, 215, 0, 0.2)'
                        }}
                    >
                        <div
                            className="px-4 py-2 text-center"
                            style={{
                                background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)'
                            }}
                        >
                            <span className="text-xs font-black text-white tracking-widest drop-shadow-md">
                                🏆 MEGA JACKPOT 🏆
                            </span>
                        </div>
                        <div
                            className="p-4 text-center"
                            style={{
                                background: 'rgba(255,255,255,0.95)'
                            }}
                        >
                            <div
                                className="text-3xl font-black animate-pulse"
                                style={{
                                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent'
                                }}
                            >
                                $2,847,392
                            </div>
                            <div className="text-xs mt-2" style={{ color: '#9370DB' }}>
                                Growing every second! 🚀
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Desktop Icons (decorative) */}
            <div className="fixed right-8 top-36 z-5 hidden 2xl:flex flex-col gap-6">
                {[
                    { icon: '📁', label: 'My Bets' },
                    { icon: '📊', label: 'History' },
                    { icon: '⚙️', label: 'Settings' },
                ].map((item) => (
                    <div
                        key={item.label}
                        className="flex flex-col items-center gap-1 cursor-pointer group"
                    >
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all group-hover:scale-110"
                            style={{
                                background: 'rgba(255,255,255,0.8)',
                                border: '2px solid #D8BFD8',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                            }}
                        >
                            {item.icon}
                        </div>
                        <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded"
                            style={{
                                background: 'rgba(255,255,255,0.9)',
                                color: '#6B4C7A'
                            }}
                        >
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}