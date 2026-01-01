/**
 * Prediction Market Page
 * 
 * Main market page displaying:
 * 1. Market header with countdown timer
 * 2. Pool visualization with real-time updates
 * 3. Bet form for placing bets
 * 4. User's betting history
 * 5. Responsive layout
 * 
 * Route: /prediction/[id]
 * 
 * Usage:
 * /prediction/btc-100k
 */

"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useAccount } from "wagmi";

import { usePredictionMarket } from "@/lib/hooks/usePredictionMarket";
import MarketHeader from "@/app/components/MarketHeader";
import PoolDisplay from "@/app/components/PoolDisplay";
import BetForm from "@/app/components/BetForm";
import UserBetsList from "@/app/components/UserBetsList";

// ============================================================================
// LOGGER
// ============================================================================

function logInfo(message: string, context?: any) {
	const timestamp = new Date().toISOString();
	console.log(`[${timestamp}] [PredictionPage] ${message}`, context || "");
}

function logError(message: string, context?: any) {
	const timestamp = new Date().toISOString();
	console.error(`[${timestamp}] [PredictionPage] ❌ ${message}`, context || "");
}

// ============================================================================
// SKELETON LOADERS
// ============================================================================

function HeaderSkeleton() {
	return (
		<div className="rounded-lg border border-gray-200 bg-white overflow-hidden animate-pulse">
			<div className="bg-gradient-to-r from-gray-200 to-gray-100 h-48" />
			<div className="p-6 space-y-4">
				<div className="h-4 bg-gray-200 rounded w-32" />
				<div className="h-16 bg-gray-200 rounded" />
			</div>
		</div>
	);
}

function PoolSkeleton() {
	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4 animate-pulse">
			<div className="h-6 bg-gray-200 rounded w-32" />
			<div className="h-12 bg-gray-200 rounded" />
			<div className="grid grid-cols-2 gap-4">
				<div className="h-24 bg-gray-200 rounded" />
				<div className="h-24 bg-gray-200 rounded" />
			</div>
		</div>
	);
}

function FormSkeleton() {
	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4 animate-pulse">
			<div className="h-6 bg-gray-200 rounded w-32" />
			<div className="grid grid-cols-2 gap-3">
				<div className="h-20 bg-gray-200 rounded" />
				<div className="h-20 bg-gray-200 rounded" />
			</div>
			<div className="h-10 bg-gray-200 rounded" />
			<div className="h-10 bg-gray-200 rounded" />
		</div>
	);
}

function BetsSkeleton() {
	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4 animate-pulse">
			<div className="h-6 bg-gray-200 rounded w-32" />
			{Array(5)
				.fill(0)
				.map((_, i) => (
					<div key={i} className="h-12 bg-gray-200 rounded" />
				))}
		</div>
	);
}

// ============================================================================
// ERROR BOUNDARY
// ============================================================================

interface ErrorBoundaryState {
	hasError: boolean;
	error: string | null;
}

class ErrorBoundary extends React.Component<
	{ children: React.ReactNode },
	ErrorBoundaryState
> {
	constructor(props: { children: React.ReactNode }) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: any): ErrorBoundaryState {
		return { hasError: true, error: error.message };
	}

	componentDidCatch(error: any, info: any) {
		logError("Error boundary caught error", {
			error: error.message,
			componentStack: info.componentStack,
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
					<p className="text-red-700 font-semibold mb-2">
						Something went wrong
					</p>
					<p className="text-red-600 text-sm mb-4">
						{this.state.error}
					</p>
					<button
						onClick={() => window.location.reload()}
						className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
					>
						Reload Page
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

interface PredictionPageParams {
	id: string;
	[key: string]: string | string[];
}

export default function PredictionPage() {
	const params = useParams<PredictionPageParams>();
	const { address: walletAddress } = useAccount();

	const marketId = params?.id || "";

	// Fetch market data
	const {
		market,
		isLoading: marketLoading,
		error: marketError,
		refetch: refetchMarket,
		isFetching: marketFetching,
	} = usePredictionMarket(marketId, {
		includeStats: true,
		refetchInterval: 30000,
		autoConnect: true,
	});

	// Page state
	const [betsFetched, setBetsFetched] = useState(false);

	// ====== Effects ======

	useEffect(() => {
		if (!marketId) {
			logError("No market ID provided", {});
		} else {
			logInfo("Market page loaded", { marketId });
		}
	}, [marketId]);

	// ====== Handlers ======

	const handleBetSuccess = useCallback(
		(betId: string) => {
			logInfo("Bet placed successfully", { betId });
			toast.success(`Bet #${betId} confirmed! 🎉`);

			// Trigger refetch of bets list
			setBetsFetched(!betsFetched);

			// Refetch market to update pool
			refetchMarket();
		},
		[refetchMarket, betsFetched]
	);

	const handleBetError = useCallback(
		(error: string) => {
			logError("Bet failed", { error });
			toast.error(`Bet failed: ${error}`);
		},
		[]
	);

	// ====== Show error if no market ID ======
	if (!marketId) {
		return (
			<ErrorBoundary>
				<div className="max-w-7xl mx-auto px-4 py-8">
					<div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
						<p className="text-2xl mb-2">❌</p>
						<p className="text-red-700 font-semibold mb-2">
							Market Not Found
						</p>
						<p className="text-red-600 text-sm mb-4">
							Please provide a valid market ID in the URL
						</p>
						<a
							href="/"
							className="inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
						>
							← Back to Markets
						</a>
					</div>
				</div>
			</ErrorBoundary>
		);
	}

	// ====== Show market error ======
	if (marketError && !marketLoading) {
		return (
			<ErrorBoundary>
				<div className="max-w-7xl mx-auto px-4 py-8">
					<div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
						<p className="text-2xl mb-2">⚠️</p>
						<p className="text-red-700 font-semibold mb-2">
							Failed to Load Market
						</p>
						<p className="text-red-600 text-sm mb-4">
							{marketError}
						</p>
						<button
							onClick={() => refetchMarket()}
							className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
						>
							Try Again
						</button>
					</div>
				</div>
			</ErrorBoundary>
		);
	}

	return (
		<ErrorBoundary>
			<div className="min-h-screen bg-gray-50">
				{/* Header Bar */}
				<div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
					<div className="max-w-7xl mx-auto px-4 py-4">
						<div className="flex justify-between items-center">
							<a href="/" className="text-gray-600 hover:text-gray-900">
								← Markets
							</a>
							{walletAddress ? (
								<div className="text-sm text-gray-600">
									Connected:{" "}
									<span className="font-mono font-semibold text-gray-900">
										{walletAddress.slice(0, 6)}...
										{walletAddress.slice(-4)}
									</span>
								</div>
							) : (
								<div className="text-sm text-yellow-700 bg-yellow-50 px-3 py-1 rounded-lg">
									Connect wallet to place bets
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="max-w-7xl mx-auto px-4 py-8">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Left Column: Market Info + Pool */}
						<div className="lg:col-span-2 space-y-6">
							{/* Market Header */}
							{marketLoading ? (
								<HeaderSkeleton />
							) : market ? (
								<MarketHeader
									market={market}
									showTimeline={true}
								/>
							) : null}

							{/* Pool Display */}
							{marketLoading ? (
								<PoolSkeleton />
							) : market ? (
								<PoolDisplay
									market={market}
									includeStats={true}
									showOdds={true}
									showSnapshots={true}
								/>
							) : null}

							{/* Bets List */}
							{marketLoading ? (
								<BetsSkeleton />
							) : (
								<UserBetsList
									marketId={marketId}
									walletAddress={walletAddress}
									pageSize={10}
									showFilters={true}
									className="mt-6"
								/>
							)}
						</div>

						{/* Right Column: Bet Form + Quick Stats */}
						<div className="space-y-6">
							{/* Bet Form */}
							{!walletAddress ? (
								<div className="rounded-lg border border-blue-200 bg-blue-50 p-6 text-center">
									<p className="text-blue-900 font-semibold mb-2">
										💼 Connect Wallet
									</p>
									<p className="text-blue-800 text-sm mb-4">
										You need to connect your wallet to place
										bets on this market.
									</p>
									{/* Replace with actual wallet connect component */}
									<button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
										Connect Wallet
									</button>
								</div>
							) : marketLoading ? (
								<FormSkeleton />
							) : market ? (
								<BetForm
									marketId={marketId}
									onSuccess={handleBetSuccess}
									onError={handleBetError}
									disabled={
										market.status !==
										"ACTIVE"
									}
								/>
							) : null}

							{/* Quick Stats */}
							{!marketLoading && market && (
								<div className="rounded-lg border border-gray-200 bg-white p-6">
									<h3 className="font-semibold text-gray-900 mb-4">
										Market Stats
									</h3>

									<div className="space-y-3">
										{/* Status */}
										<div className="flex justify-between items-center pb-3 border-b border-gray-200">
											<span className="text-sm text-gray-600">
												Status
											</span>
											<span
												className={`text-sm font-semibold px-3 py-1 rounded-full ${
													market.status === "ACTIVE"
														? "bg-green-100 text-green-700"
														: market.status === "CLOSED"
														? "bg-yellow-100 text-yellow-700"
														: "bg-blue-100 text-blue-700"
												}`}
											>
												{market.status}
											</span>
										</div>

										{/* Total Pool */}
										<div className="flex justify-between items-center pb-3 border-b border-gray-200">
											<span className="text-sm text-gray-600">
												Total Pool
											</span>
											<span className="text-sm font-semibold text-gray-900">
												${parseFloat(
													market.totalPool
												).toLocaleString(
													"en-US",
													{
														maximumFractionDigits: 0,
													}
												)}
											</span>
										</div>

										{/* Total Bets */}
										<div className="flex justify-between items-center pb-3 border-b border-gray-200">
											<span className="text-sm text-gray-600">
												Total Bets
											</span>
											<span className="text-sm font-semibold text-gray-900">
												{market.totalBets.toLocaleString()}
											</span>
										</div>

										{/* Pool Split */}
										<div className="flex justify-between items-center pb-3 border-b border-gray-200">
											<span className="text-sm text-gray-600">
												Pool Split
											</span>
											<span className="text-sm font-semibold text-gray-900">
												{market.yesPercent.toFixed(1)}% /
												{market.noPercent.toFixed(1)}%
											</span>
										</div>

										{/* Days Remaining */}
										{!market.hasEnded && (
											<div className="flex justify-between items-center">
												<span className="text-sm text-gray-600">
													Days
													Remaining
												</span>
												<span className="text-sm font-semibold text-gray-900">
													{market.daysRemaining}d
													{market.hoursRemaining}
													h
												</span>
											</div>
										)}

										{/* Winner */}
										{market.status === "RESOLVED" &&
											market.winner && (
											<div className="flex justify-between items-center pt-3 border-t border-gray-200">
												<span className="text-sm text-gray-600">
													Winner
												</span>
												<span
													className={`text-sm font-semibold px-3 py-1 rounded-full ${
														market.winner ===
														"YES"
															? "bg-green-100 text-green-700"
															: "bg-red-100 text-red-700"
													}`}
												>
													{market.winner}
												</span>
											</div>
										)}
									</div>
								</div>
							)}

							{/* Refetch Info */}
							{market && (
								<div className="text-xs text-gray-600 text-center p-3 rounded-lg bg-gray-50">
									{marketFetching
										? "Updating market data..."
										: "Market updates every 30s"}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</ErrorBoundary>
	);
}
