import { ChevronDown, Moon, Search, ShieldCheck, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
    ChangePill,
    DomainPanel,
    Indicator,
    SparkBars,
    StockIcon,
    formatPrice,
} from "./components";
import { domainPanels, filters, indicators, stocks } from "./data";

import type { Category } from "./types";

export default function HomePage() {
    const [activeFilter, setActiveFilter] = useState<Category>("all");
    const [isDark, setIsDark] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);

    const topPerformers = useMemo(
        () =>
            stocks
                .filter((stock) => stock.d7 > 0)
                .sort((a, b) => b.d7 - a.d7)
                .slice(0, 4),
        [],
    );

    const visibleStocks = useMemo(
        () => {
            const query = searchQuery.trim().toLowerCase();

            return stocks.filter((stock) => {
                const matchesFilter =
                    activeFilter === "all" || stock.cat === activeFilter;
                const matchesSearch =
                    !query ||
                    stock.sym.toLowerCase().includes(query) ||
                    stock.name.toLowerCase().includes(query);

                return matchesFilter && matchesSearch;
            });
        },
        [activeFilter, searchQuery],
    );

    return (
        <main className="relative z-10 mx-auto min-h-screen w-full max-w-[1440px] px-4 pb-14 text-slate-950 sm:px-6 lg:px-8 dark:text-white">
            <nav
                aria-label="Primary"
                className="flex flex-wrap items-center gap-3 border-b border-slate-200 py-4 dark:border-white/10"
            >
                <a
                    className="mr-auto flex items-center gap-3 text-slate-950 no-underline dark:text-white"
                    href="/"
                >
                    <span className="grid size-9 place-items-center rounded-xl border border-emerald-600/20 bg-emerald-600/10 shadow-[0_0_30px_rgba(16,185,129,0.12)] dark:border-emerald-300/25 dark:bg-emerald-300/10 dark:shadow-[0_0_30px_rgba(16,185,129,0.16)]">
                        <ShieldCheck className="size-4 text-emerald-700 dark:text-emerald-300" />
                    </span>
                    <span className="text-[15px] font-black tracking-[0.22em] text-emerald-700 uppercase dark:text-emerald-200">
                        DLM.Trading
                    </span>
                </a>

                <div className="order-3 flex w-full items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-sm sm:order-none sm:w-auto dark:border-white/8 dark:bg-white/[0.03]">
                    {["Watchlist", "Portfolio", "Screener", "News"].map(
                        (item) => (
                            <a
                                className={
                                    item === "Watchlist"
                                        ? "shrink-0 rounded-xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-950 no-underline dark:bg-white/10 dark:text-white"
                                        : "shrink-0 rounded-xl px-4 py-2 text-xs font-semibold text-slate-500 no-underline transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
                                }
                                href={item === "Watchlist" ? "/" : "#"}
                                key={item}
                            >
                                {item}
                            </a>
                        ),
                    )}
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <label className="relative hidden sm:block">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                        <input
                            className="h-10 w-[220px] rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600/40 focus:ring-4 focus:ring-emerald-600/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-300/40 dark:focus:bg-white/[0.07] dark:focus:ring-emerald-300/10"
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                            placeholder="Search ticker..."
                            type="search"
                            value={searchQuery}
                        />
                    </label>
                    <button
                        aria-label={
                            isDark
                                ? "Switch to light theme"
                                : "Switch to dark theme"
                        }
                        className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-white"
                        onClick={() => setIsDark((value) => !value)}
                        type="button"
                    >
                        {isDark ? (
                            <Sun className="size-4" />
                        ) : (
                            <Moon className="size-4" />
                        )}
                        <span className="hidden sm:inline">
                            {isDark ? "Light" : "Dark"}
                        </span>
                    </button>
                    <button
                        className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                        type="button"
                    >
                        <span className="grid size-6 place-items-center rounded-lg bg-gradient-to-br from-blue-400 to-emerald-300 text-[10px] font-black text-slate-950">
                            JD
                        </span>
                        <ChevronDown className="size-3.5 text-slate-400" />
                    </button>
                </div>
            </nav>

            <section
                aria-label="Market domains"
                className="grid gap-4 py-6 lg:grid-cols-3"
            >
                {domainPanels.map((panel) => (
                    <DomainPanel key={panel.title} panel={panel} />
                ))}
            </section>

            <section
                aria-label="Market indicators"
                className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
            >
                {indicators.map((indicator) => (
                    <Indicator key={indicator.label} {...indicator} compact />
                ))}
            </section>

            <section
                aria-label="Top performers"
                className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
            >
                {topPerformers.map((stock) => (
                    <article
                        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-600/25 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-xl dark:shadow-black/15 dark:hover:border-emerald-300/25 dark:hover:bg-white/[0.065]"
                        key={stock.sym}
                    >
                        <div className="mb-4 flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                                <StockIcon stock={stock} size="lg" />
                                <div className="min-w-0">
                                    <h2 className="truncate text-base font-black text-slate-950 dark:text-white">
                                        {stock.sym}
                                    </h2>
                                    <p className="truncate text-xs text-slate-500">
                                        {stock.name}
                                    </p>
                                </div>
                            </div>
                            <ChangePill value={stock.d7} />
                        </div>
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="mb-1 text-xs font-semibold text-slate-500">
                                    Last price
                                </p>
                                <p className="font-mono text-xl font-bold text-slate-950 dark:text-white">
                                    {formatPrice(stock.price)}
                                </p>
                            </div>
                            <SparkBars
                                data={stock.spark}
                                isUp={stock.d7 >= 0}
                            />
                        </div>
                    </article>
                ))}
            </section>

            <section
                aria-label="Watchlist"
                className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm backdrop-blur dark:border-white/10 dark:bg-[rgba(14,18,30,0.84)] dark:shadow-2xl dark:shadow-black/25"
            >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-4 py-4 sm:px-5 dark:border-white/10">
                    <div>
                        <h2 className="text-lg font-black text-slate-950 dark:text-white">
                            Watchlist
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            {visibleStocks.length} instruments tracked
                        </p>
                    </div>
                    <div
                        aria-label="Watchlist filters"
                        className="flex max-w-full gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-1 dark:border-white/8 dark:bg-black/20"
                    >
                        {filters.map((filter) => (
                            <button
                                className={
                                    activeFilter === filter.value
                                        ? "shrink-0 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white shadow-lg shadow-emerald-950/10 dark:bg-emerald-300 dark:text-slate-950 dark:shadow-emerald-950/30"
                                        : "shrink-0 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-white hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/[0.07] dark:hover:text-white"
                                }
                                key={filter.value}
                                onClick={() => setActiveFilter(filter.value)}
                                type="button"
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[860px] table-fixed border-collapse">
                        <colgroup>
                            <col className="w-[230px]" />
                            <col className="w-[120px]" />
                            <col className="w-[90px]" />
                            <col className="w-[90px]" />
                            <col className="w-[90px]" />
                            <col className="w-[110px]" />
                            <col className="w-[100px]" />
                            <col className="w-[110px]" />
                        </colgroup>
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.035]">
                                {[
                                    "Company",
                                    "Price",
                                    "7D",
                                    "1M",
                                    "1Y",
                                    "From ATH",
                                    "Mkt Cap",
                                    "Trend",
                                ].map((heading, index) => (
                                    <th
                                        className={
                                            index === 0
                                                ? "px-4 py-3 text-left text-[11px] font-black tracking-[0.12em] text-slate-500 uppercase"
                                                : "px-4 py-3 text-right text-[11px] font-black tracking-[0.12em] text-slate-500 uppercase"
                                        }
                                        key={heading}
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {visibleStocks.map((stock) => (
                                <tr
                                    className="border-b border-slate-200 transition last:border-0 hover:bg-slate-50 dark:border-white/[0.07] dark:hover:bg-white/[0.04]"
                                    key={stock.sym}
                                >
                                    <td className="px-4 py-3.5">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <StockIcon stock={stock} />
                                            <div className="min-w-0">
                                                <div className="font-mono text-sm font-bold text-slate-950 dark:text-white">
                                                    {stock.sym}
                                                </div>
                                                <div className="truncate text-xs text-slate-500">
                                                    {stock.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5 text-right font-mono text-sm font-bold text-slate-950 dark:text-white">
                                        {formatPrice(stock.price)}
                                    </td>
                                    <td className="px-4 py-3.5 text-right">
                                        <ChangePill value={stock.d7} />
                                    </td>
                                    <td className="px-4 py-3.5 text-right">
                                        <ChangePill value={stock.m1} />
                                    </td>
                                    <td className="px-4 py-3.5 text-right">
                                        <ChangePill value={stock.y1} />
                                    </td>
                                    <td className="px-4 py-3.5 text-right">
                                        <ChangePill value={stock.ath} />
                                    </td>
                                    <td className="px-4 py-3.5 text-right font-mono text-xs font-semibold text-slate-400">
                                        {stock.cap}
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <SparkBars
                                            data={stock.spark}
                                            isUp={stock.d7 >= 0}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
