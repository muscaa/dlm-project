import { TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

import type {
    DomainPanel as DomainPanelType,
    DomainPanelMetric,
    IndicatorTone,
    Stock,
} from "./types";

const metricToneClass: Record<IndicatorTone, string> = {
    amber: "text-amber-600 dark:text-amber-300",
    emerald: "text-emerald-700 dark:text-emerald-300",
    neutral: "text-slate-700 dark:text-slate-300",
    rose: "text-rose-600 dark:text-rose-300",
};

const domainAccentClass: Record<DomainPanelType["accent"], string> = {
    amber: "text-amber-600 dark:text-amber-300",
    blue: "text-blue-700 dark:text-blue-300",
    emerald: "text-emerald-700 dark:text-emerald-300",
};

export const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export function Indicator({
    compact = false,
    label,
    sub,
    tone,
    value,
}: {
    compact?: boolean;
    label: string;
    sub: string;
    tone: IndicatorTone;
    value: string;
}) {
    return (
        <article
            className={
                compact
                    ? "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
                    : "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.045] dark:shadow-xl dark:shadow-black/10"
            }
        >
            <p className="mb-2 text-[11px] font-black tracking-[0.14em] text-slate-500 uppercase dark:text-slate-500">
                {label}
            </p>
            <p
                className={`font-mono text-2xl font-black ${metricToneClass[tone]}`}
            >
                {value}
            </p>
            <p className={`mt-1 text-xs font-bold ${metricToneClass[tone]}`}>
                {sub}
            </p>
        </article>
    );
}

export function DomainPanel({ panel }: { panel: DomainPanelType }) {
    return (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.045] dark:shadow-xl dark:shadow-black/15">
            <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-white/10">
                <h2
                    className={`text-xs font-black tracking-[0.16em] uppercase ${domainAccentClass[panel.accent]}`}
                >
                    {panel.title}
                </h2>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-slate-500 uppercase dark:bg-white/[0.06] dark:text-slate-500">
                    {panel.badge}
                </span>
            </header>
            <div className="grid grid-cols-2">
                {panel.metrics.map((metric, index) => (
                    <DomainMetric
                        index={index}
                        key={metric.label}
                        metric={metric}
                        total={panel.metrics.length}
                    />
                ))}
            </div>
        </article>
    );
}

function DomainMetric({
    index,
    metric,
    total,
}: {
    index: number;
    metric: DomainPanelMetric;
    total: number;
}) {
    const isRightColumn = index % 2 === 1;
    const isLastRow = index >= total - 2;

    return (
        <div
            className={`min-h-27 border-slate-200 p-4 dark:border-white/10 ${isRightColumn ? "" : "border-r"} ${isLastRow ? "" : "border-b"}`}
        >
            <p className="mb-2 text-[10px] font-black tracking-[0.13em] text-slate-500 uppercase">
                {metric.label}
            </p>
            {metric.kind === "rsi" ? (
                <>
                    <p className="font-mono text-xl font-black text-slate-950 dark:text-white">
                        {metric.value}
                    </p>
                    <RsiBar value={metric.rsi} />
                </>
            ) : metric.kind === "gauge" ? (
                <>
                    <div className="flex items-center gap-3">
                        <FearGauge score={metric.score} />
                        <p
                            className={`font-mono text-xl font-black ${metricToneClass[metric.tone]}`}
                        >
                            {metric.value}
                        </p>
                    </div>
                    <p
                        className={`mt-1 text-xs font-bold ${metricToneClass[metric.tone]}`}
                    >
                        {metric.sub}
                    </p>
                </>
            ) : (
                <>
                    <p
                        className={`font-mono text-xl font-black ${metricToneClass[metric.tone]}`}
                    >
                        {metric.value}
                    </p>
                    <p
                        className={`mt-1 text-xs font-bold ${metricToneClass[metric.tone]}`}
                    >
                        {metric.sub}
                    </p>
                </>
            )}
        </div>
    );
}

function RsiBar({ value }: { value: number }) {
    const clamped = Math.max(0, Math.min(100, value));

    return (
        <div className="mt-4 h-1.5 rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500">
            <span
                className="block size-3 -translate-y-[3px] rounded-full border-2 border-white bg-slate-950 shadow-sm dark:border-slate-950 dark:bg-white"
                style={{ marginLeft: `calc(${clamped}% - 6px)` }}
            />
        </div>
    );
}

function FearGauge({ score }: { score: number }) {
    const rotation = (Math.max(0, Math.min(100, score)) - 50) * 1.8;

    return (
        <svg
            aria-hidden="true"
            className="h-8 w-14 shrink-0 overflow-visible"
            viewBox="0 0 52 30"
        >
            <defs>
                <linearGradient id={`fear-gauge-${score}`} x1="0%" x2="100%">
                    <stop offset="0%" stopColor="#e11d48" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
            </defs>
            <path
                d="M 4 28 A 22 22 0 0 1 48 28"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="5"
                className="text-slate-200 dark:text-white/10"
            />
            <path
                d="M 4 28 A 22 22 0 0 1 48 28"
                fill="none"
                stroke={`url(#fear-gauge-${score})`}
                strokeLinecap="round"
                strokeWidth="5"
            />
            <line
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                transform={`rotate(${rotation},26,28)`}
                x1="26"
                x2="26"
                y1="28"
                y2="9"
                className="text-slate-950 dark:text-white"
            />
            <circle
                className="fill-slate-950 dark:fill-white"
                cx="26"
                cy="28"
                r="3"
            />
        </svg>
    );
}

export function ChangePill({ value }: { value: number }) {
    const isPositive = value >= 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;

    return (
        <span
            className={
                isPositive
                    ? "inline-flex items-center justify-end gap-1 rounded-lg bg-emerald-600/10 px-2 py-1 font-mono text-[11px] font-bold text-emerald-700 dark:bg-emerald-300/10 dark:text-emerald-300"
                    : "inline-flex items-center justify-end gap-1 rounded-lg bg-rose-600/10 px-2 py-1 font-mono text-[11px] font-bold text-rose-600 dark:bg-rose-400/10 dark:text-rose-300"
            }
        >
            <Icon className="size-3" />
            {isPositive ? "+" : ""}
            {value.toFixed(2)}%
        </span>
    );
}

export function SparkBars({ data, isUp }: { data: number[]; isUp: boolean }) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    return (
        <div
            aria-hidden="true"
            className="flex h-9 items-end justify-end gap-[2px]"
        >
            {data.map((value, index) => {
                const height = Math.max(
                    5,
                    Math.round(((value - min) / range) * 30),
                );

                return (
                    <span
                        className={
                            isUp
                                ? "w-1 rounded-full bg-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.16)] dark:bg-emerald-300 dark:shadow-[0_0_12px_rgba(110,231,183,0.18)]"
                                : "w-1 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(225,29,72,0.14)] dark:bg-rose-300 dark:shadow-[0_0_12px_rgba(253,164,175,0.16)]"
                        }
                        key={`${value}-${index}`}
                        style={{ height }}
                    />
                );
            })}
        </div>
    );
}

export function StockIcon({
    size = "md",
    stock,
}: {
    size?: "md" | "lg";
    stock: Stock;
}) {
    const [failed, setFailed] = useState(false);
    const fallback =
        stock.logoFallback ??
        stock.sym.replace(/[^A-Z]/g, "").slice(0, 2) ??
        "ST";
    const sizeClass =
        size === "lg" ? "size-12 rounded-2xl" : "size-10 rounded-xl";

    return (
        <div
            className={`${sizeClass} grid shrink-0 place-items-center overflow-hidden border border-slate-200 bg-slate-50 text-xs font-black text-slate-600 shadow-inner shadow-white/60 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:shadow-white/5`}
        >
            {stock.logoUrl && !failed ? (
                <img
                    alt={`${stock.sym} logo`}
                    className="size-full object-contain p-1.5"
                    onError={() => setFailed(true)}
                    src={stock.logoUrl}
                />
            ) : (
                <span className="font-mono">{fallback}</span>
            )}
        </div>
    );
}

export function formatPrice(price: number) {
    return priceFormatter.format(price);
}
