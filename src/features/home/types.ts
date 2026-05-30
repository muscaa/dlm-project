export type Category = "all" | "stocks" | "crypto" | "commodities";

export type Stock = {
    sym: string;
    name: string;
    cat: Exclude<Category, "all">;
    price: number;
    d7: number;
    m1: number;
    y1: number;
    ath: number;
    cap: string;
    spark: number[];
    logoUrl?: string;
    logoFallback?: string;
};

export type IndicatorTone = "emerald" | "rose" | "amber" | "neutral";

export type IndicatorMetric = {
    label: string;
    value: string;
    sub: string;
    tone: IndicatorTone;
};

export type DomainPanelMetric =
    | {
          kind?: "value";
          label: string;
          value: string;
          sub: string;
          tone: IndicatorTone;
      }
    | {
          kind: "rsi";
          label: string;
          value: string;
          rsi: number;
          tone: IndicatorTone;
      }
    | {
          kind: "gauge";
          label: string;
          value: string;
          sub: string;
          score: number;
          tone: IndicatorTone;
      };

export type DomainPanel = {
    title: string;
    badge: string;
    accent: "blue" | "amber" | "emerald";
    metrics: DomainPanelMetric[];
};
