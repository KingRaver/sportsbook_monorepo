"use client"

import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
    { name: 'Casino', path: '/casino' as Route }
]

export default function CasinoPage() {
    const pathname = usePathname()
    const [selectedGame, setSelectedGame] = useState('Slots')
    const [betSlip, setBetSlip] = useState<{ table: string; selection: string; odds: number }[]>([])
    const [currentTime, setCurrentTime] = useState('')
    const [crashMultiplier, setCrashMultiplier] = useState(1.00)

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            setCurrentTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
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
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.5)'
                    }}
                >
                    {/* Window Title Bar */}
                    <div
                        className="flex items-center justify-between px-4 py-2"
                        style={{
                            background: 'linear-gradient(180deg, #DDA0DD 0%, #BA55D3 100%)',
                            borderBottom: '2px solid #9932CC'
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-black text-white tracking-widest drop-shadow-md">
                                CASINO_ROYALE.EXE
                            </span>
                            <div
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
                                style={{
                                    background: 'linear-gradient(135deg, #98D8C8, #20B2AA)',
                                    color: 'white',
                                    boxShadow: '0 2px 8px rgba(32, 178, 170, 0.4)'
                                }}
                            >
                                <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                                JACKPOT ACTIVE
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-white/80">{currentTime}</span>
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
                            background: 'rgba(255,255,255,0.7)',
                            borderBottom: '1px solid rgba(186, 85, 211, 0.2)',
                            color: '#6B4C7A'
                        }}
                    >
                        <span className="hover:text-purple-600 cursor-pointer">File</span>
                        <span className="hover:text-purple-600 cursor-pointer">Edit</span>
                        <span className="hover:text-purple-600 cursor-pointer">View</span>
                        <span className="hover:text-purple-600 cursor-pointer">Games</span>
                        <span className="hover:text-purple-600 cursor-pointer">Wallet</span>
                        <span className="hover:text-purple-600 cursor-pointer">Help</span>
                    </div>

                    {/* Main Header Content */}
                    <div
                        className="flex items-center justify-between px-4 py-3"
                        style={{
                            background: 'rgba(255,255,255,0.85)',
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
                                    <span className="text-[10px] font-bold tracking-widest" style={{ color: '#98D8C8' }}>
                                        ✨ CASINO ROYALE ✨
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
                                                color: '#9370DB',
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
                                    background: 'linear-gradient(135deg, rgba(255,182,193,0.5), rgba(221,160,221,0.5))',
                                    border: '2px solid rgba(186, 85, 211, 0.3)',
                                    color: '#6B4C7A'
                                }}
                            >
                                <span>🔍</span>
                                <span>Search</span>
                            </button>
                            <button
                                className="px-5 py-2.5 rounded-full text-sm font-black text-white transition-all hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, #20B2AA 0%, #3CB371 100%)',
                                    boxShadow: '0 4px 15px rgba(32, 178, 170, 0.4)'
                                }}
                            >
                                💰 Connect Wallet
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
                            background: 'rgba(255,255,255,0.85)',
                            border: '3px solid #D8BFD8',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        {/* Sidebar title */}
                        <div
                            className="px-2 py-2 text-[10px] font-black text-center tracking-widest text-white"
                            style={{
                                background: 'linear-gradient(180deg, #DDA0DD, #BA55D3)'
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
                                            background: 'linear-gradient(135deg, #FF69B4, #BA55D3)',
                                            boxShadow: '0 2px 8px rgba(255, 105, 180, 0.4)'
                                        }}
                                    >
                                        {game.count > 99 ? '99+' : game.count}
                                    </span>

                                    {/* Tooltip */}
                                    <div
                                        className="absolute left-full ml-3 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50"
                                        style={{
                                            background: 'linear-gradient(135deg, #FF69B4, #BA55D3)',
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
                                background: 'linear-gradient(90deg, #DDA0DD 0%, #FF69B4 50%, #98D8C8 100%)'
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-black text-white tracking-widest drop-shadow-md">
                                    LIVE_TABLES.DAT
                                </span>
                                <span
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
                                    style={{
                                        background: 'linear-gradient(135deg, #20B2AA, #3CB371)',
                                        boxShadow: '0 2px 8px rgba(32, 178, 170, 0.4)'
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
                                background: 'rgba(255,255,255,0.9)',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            {/* Table header */}
                            <div
                                className="grid grid-cols-12 gap-4 px-4 py-3 text-[10px] font-black uppercase tracking-widest"
                                style={{
                                    background: 'linear-gradient(90deg, rgba(221,160,221,0.3), rgba(255,105,180,0.2), rgba(152,216,200,0.3))',
                                    color: '#6B4C7A',
                                    borderBottom: '2px solid rgba(186, 85, 211, 0.2)'
                                }}
                            >
                                <div className="col-span-4">Table</div>
                                <div className="col-span-2 text-center">Players</div>
                                <div className="col-span-3 text-center">Bet Options</div>
                                <div className="col-span-1 text-center">Min</div>
                                <div className="col-span-2 text-center">Status</div>
                            </div>

                            {/* Table rows */}
                            {liveTables.map((table, index) => (
                                <div
                                    key={table.id}
                                    className={`
                                        grid grid-cols-12 gap-4 px-4 py-4 items-center transition-all duration-300
                                        hover:bg-gradient-to-r hover:from-pink-50 hover:via-purple-50 hover:to-teal-50
                                        ${index !== liveTables.length - 1 ? 'border-b border-purple-100' : ''}
                                    `}
                                >
                                    {/* Table info */}
                                    <div className="col-span-4">
                                        <div
                                            className="text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-2"
                                            style={{ color: '#BA55D3' }}
                                        >
                                            <span
                                                className="w-2 h-2 rounded-full animate-pulse"
                                                style={{ background: '#20B2AA' }}
                                            />
                                            {table.table}
                                        </div>
                                        <div className="font-black text-base" style={{ color: '#6B4C7A' }}>
                                            {table.game}
                                        </div>
                                        <div className="text-xs mt-0.5" style={{ color: '#9370DB' }}>
                                            Dealer: {table.dealer}
                                        </div>
                                    </div>

                                    {/* Players */}
                                    <div className="col-span-2 text-center">
                                        <div
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255,105,180,0.15), rgba(186,85,211,0.15))',
                                                border: '1px solid rgba(255,105,180,0.3)'
                                            }}
                                        >
                                            <span className="text-sm">👥</span>
                                            <span className="text-sm font-bold" style={{ color: '#FF69B4' }}>
                                                {table.players.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bet Options */}
                                    <div className="col-span-3 flex justify-center gap-1.5 flex-wrap">
                                        {table.multiplier ? (
                                            <button
                                                onClick={() => addToBetSlip(table.game, 'Cashout', crashMultiplier)}
                                                className="px-3 py-2 rounded-lg transition-all hover:scale-110 animate-pulse"
                                                style={{
                                                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                                                    border: '2px solid #FFD700',
                                                    color: '#8B4513',
                                                    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)'
                                                }}
                                            >
                                                <div className="text-[9px] font-bold">CRASH</div>
                                                <div className="text-sm font-black">
                                                    x{crashMultiplier.toFixed(2)}
                                                </div>
                                            </button>
                                        ) : (
                                            <>
                                                {table.odds.red && (
                                                    <button
                                                        onClick={() => addToBetSlip(table.game, 'Red', table.odds.red!)}
                                                        className="px-2.5 py-1.5 rounded-lg transition-all hover:scale-110"
                                                        style={{
                                                            background: 'linear-gradient(135deg, rgba(255,105,180,0.2), rgba(255,105,180,0.1))',
                                                            border: '2px solid #FF69B4'
                                                        }}
                                                    >
                                                        <div className="text-[9px] font-bold" style={{ color: '#FF69B4' }}>
                                                            {table.odds.player ? 'P' : 'RED'}
                                                        </div>
                                                        <div className="text-sm font-black" style={{ color: '#FF69B4' }}>
                                                            {table.odds.red.toFixed(2)}
                                                        </div>
                                                    </button>
                                                )}
                                                {table.odds.black && (
                                                    <button
                                                        onClick={() => addToBetSlip(table.game, 'Black', table.odds.black!)}
                                                        className="px-2.5 py-1.5 rounded-lg transition-all hover:scale-110"
                                                        style={{
                                                            background: 'linear-gradient(135deg, rgba(107,76,122,0.2), rgba(107,76,122,0.1))',
                                                            border: '2px solid #6B4C7A'
                                                        }}
                                                    >
                                                        <div className="text-[9px] font-bold" style={{ color: '#6B4C7A' }}>
                                                            {table.odds.banker ? 'B' : 'BLK'}
                                                        </div>
                                                        <div className="text-sm font-black" style={{ color: '#6B4C7A' }}>
                                                            {table.odds.black.toFixed(2)}
                                                        </div>
                                                    </button>
                                                )}
                                                {table.odds.green && (
                                                    <button
                                                        onClick={() => addToBetSlip(table.game, 'Green', table.odds.green!)}
                                                        className="px-2.5 py-1.5 rounded-lg transition-all hover:scale-110"
                                                        style={{
                                                            background: 'linear-gradient(135deg, rgba(32,178,170,0.2), rgba(32,178,170,0.1))',
                                                            border: '2px solid #20B2AA'
                                                        }}
                                                    >
                                                        <div className="text-[9px] font-bold" style={{ color: '#20B2AA' }}>
                                                            {table.odds.tie ? 'TIE' : '0'}
                                                        </div>
                                                        <div className="text-sm font-black" style={{ color: '#20B2AA' }}>
                                                            {table.odds.green.toFixed(2)}
                                                        </div>
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {/* Min Bet */}
                                    <div className="col-span-1 text-center">
                                        <span
                                            className="text-sm font-bold"
                                            style={{ color: '#20B2AA' }}
                                        >
                                            {table.minBet}
                                        </span>
                                    </div>

                                    {/* Status */}
                                    <div className="col-span-2 text-center">
                                        <span
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                                            style={{
                                                background: table.status === 'FLYING'
                                                    ? 'linear-gradient(135deg, #FFD700, #FFA500)'
                                                    : 'linear-gradient(135deg, rgba(32,178,170,0.2), rgba(60,179,113,0.2))',
                                                color: table.status === 'FLYING' ? '#8B4513' : '#20B2AA',
                                                border: table.status === 'FLYING'
                                                    ? '2px solid #FFD700'
                                                    : '2px solid #20B2AA',
                                                boxShadow: table.status === 'FLYING'
                                                    ? '0 4px 15px rgba(255, 215, 0, 0.4)'
                                                    : 'none'
                                            }}
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full ${table.status === 'FLYING' ? 'animate-ping' : 'animate-pulse'}`}
                                                style={{ background: table.status === 'FLYING' ? '#8B4513' : '#20B2AA' }}
                                            />
                                            {table.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Jackpot', value: '$2.8M', change: '+14%', icon: '💎', gradient: 'linear-gradient(135deg, #FF69B4, #DA70D6)' },
                            { label: 'Live Players', value: '5,847', change: '+23%', icon: '👥', gradient: 'linear-gradient(135deg, #20B2AA, #3CB371)' },
                            { label: 'Biggest Win', value: '$47.2K', change: 'Today', icon: '🏆', gradient: 'linear-gradient(135deg, #FFD700, #FFA500)' },
                            { label: 'Your Balance', value: '0 CRO', change: 'Connect', icon: '💰', gradient: 'linear-gradient(135deg, #9370DB, #BA55D3)' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="p-5 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                                style={{
                                    background: 'rgba(255,255,255,0.85)',
                                    border: '3px solid #D8BFD8',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span
                                        className="text-xs font-bold uppercase tracking-wider"
                                        style={{ color: '#9370DB' }}
                                    >
                                        {stat.label}
                                    </span>
                                    <span
                                        className="text-2xl group-hover:scale-125 transition-transform"
                                    >
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
                                    style={{ color: '#20B2AA' }}
                                >
                                    {stat.change}
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
                                background: 'linear-gradient(90deg, #98D8C8 0%, #20B2AA 100%)'
                            }}
                        >
                            <span className="text-xs font-black text-white tracking-widest drop-shadow-md">
                                BET_SLIP.EXE
                            </span>
                            <span
                                className="w-7 h-7 rounded-full text-xs font-black flex items-center justify-center"
                                style={{
                                    background: 'white',
                                    color: '#20B2AA',
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
                                            background: 'linear-gradient(135deg, rgba(255,105,180,0.2), rgba(152,216,200,0.2))',
                                            border: '3px solid #D8BFD8'
                                        }}
                                    >
                                        🎰
                                    </div>
                                    <div className="text-sm font-bold mb-2" style={{ color: '#6B4C7A' }}>
                                        No bets placed yet
                                    </div>
                                    <div className="text-xs" style={{ color: '#9370DB' }}>
                                        Click on odds to add bets ✨
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
                                                    background: 'linear-gradient(135deg, rgba(255,182,193,0.3), rgba(221,160,221,0.3))',
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
                                                background: 'linear-gradient(135deg, rgba(255,182,193,0.3), rgba(221,160,221,0.3))',
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
                                            ✨ PLACE BET ✨
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Jackpot Ticker */}
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
            <div className="fixed right-8 top-32 z-5 hidden 2xl:flex flex-col gap-6">
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
                                background: 'rgba(255,255,255,0.7)',
                                border: '2px solid #D8BFD8',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                            }}
                        >
                            {item.icon}
                        </div>
                        <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded"
                            style={{
                                background: 'rgba(255,255,255,0.8)',
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