import { useMemo, useState } from "react";
import AccountCard, { Account, calculateScore, classifyScore } from "@/components/AccountCard";

type Filter = "All" | "A" | "B" | "C" | "Reject";

const accounts: Account[] = [
  {
    id: "1", company: "Northwind Biologics", signal: "Новый VP Sales и пересборка GTM", source: "LinkedIn + earnings call", risk: "Low",
    firstQuestion: "Кто владелец маршрута SQL→Revenue?", nextStep: "Согласовать 30-мин discovery с VP Sales и RevOps.",
    scoring: { fit: 18, trigger: 16, budgetPath: 13, access: 12, timing: 8, evidenceStrength: 8, routeClarity: 9, riskPenalty: -4 },
    evidence: { source: "LinkedIn + earnings call", sourceDate: "2026-04-12", signalType: "Org", evidenceStrength: 8, falsePositiveRisk: "Low", humanValidationStatus: "Validated" },
  },
  {
    id: "2", company: "BluePeak Logistics", signal: "Падение win-rate в enterprise сегменте", source: "Внутренний referral", risk: "Medium",
    firstQuestion: "Где ломается handoff SDR→AE?", nextStep: "Запросить воронку по стадиям за 2 квартала.",
    scoring: { fit: 15, trigger: 17, budgetPath: 11, access: 9, timing: 7, evidenceStrength: 8, routeClarity: 7, riskPenalty: -8 },
    evidence: { source: "Internal referral", sourceDate: "2026-05-03", signalType: "Behavioral", evidenceStrength: 8, falsePositiveRisk: "Medium", humanValidationStatus: "Pending" },
  },
  {
    id: "3", company: "Altair Security Cloud", signal: "Смена ICP и запуск PLG motion", source: "Product update + podcast", risk: "Medium",
    firstQuestion: "Какие сигналы PQL реально коррелируют с оплатой?", nextStep: "Провести workshop с growth и data.",
    scoring: { fit: 14, trigger: 14, budgetPath: 10, access: 8, timing: 6, evidenceStrength: 6, routeClarity: 6, riskPenalty: -10 },
    evidence: { source: "Product update + podcast", sourceDate: "2026-03-25", signalType: "Product", evidenceStrength: 6, falsePositiveRisk: "Medium", humanValidationStatus: "Needs review" },
  },
  {
    id: "4", company: "Meridian Retail Group", signal: "Заморозка маркетинговых spend", source: "Новость + комментарий CFO", risk: "High",
    firstQuestion: "Есть ли sponsor вне marketing budget?", nextStep: "Проверить вариант пилота на cost-neutral KPI.",
    scoring: { fit: 12, trigger: 11, budgetPath: 7, access: 6, timing: 5, evidenceStrength: 5, routeClarity: 6, riskPenalty: -12 },
    evidence: { source: "Press + CFO comment", sourceDate: "2026-05-10", signalType: "Market", evidenceStrength: 5, falsePositiveRisk: "High", humanValidationStatus: "Pending" },
  },
  {
    id: "5", company: "Vortex Health Systems", signal: "Рост inbound и очереди у SDR", source: "Partner channel", risk: "Low",
    firstQuestion: "Какая SLA по первому касанию лида?", nextStep: "Собрать baseline и предложить pilot sprint на 4 недели.",
    scoring: { fit: 19, trigger: 18, budgetPath: 14, access: 13, timing: 9, evidenceStrength: 9, routeClarity: 9, riskPenalty: -2 },
    evidence: { source: "Partner channel", sourceDate: "2026-05-18", signalType: "Behavioral", evidenceStrength: 9, falsePositiveRisk: "Low", humanValidationStatus: "Validated" },
  },
  {
    id: "6", company: "Orion Fintech", signal: "Фокус на APAC до конца года", source: "Board memo leak", risk: "High",
    firstQuestion: "Есть ли локальный champion в APAC?", nextStep: "Поставить hold до валидации регионального владельца.",
    scoring: { fit: 10, trigger: 12, budgetPath: 6, access: 4, timing: 5, evidenceStrength: 4, routeClarity: 4, riskPenalty: -15 },
    evidence: { source: "Board memo leak", sourceDate: "2026-02-19", signalType: "Org", evidenceStrength: 4, falsePositiveRisk: "High", humanValidationStatus: "Needs review" },
  },
];

const toCsv = (rows: Account[]) => {
  const headers = ["Company", "Signal", "Source", "Risk", "Score", "Class", "First question", "Next step"];
  const content = rows.map((a) => {
    const score = calculateScore(a.scoring);
    const cls = classifyScore(score).routeClass;
    return [a.company, a.signal, a.source, a.risk, score, cls, a.firstQuestion, a.nextStep].map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",");
  });
  return [headers.join(","), ...content].join("\n");
};

export default function EviaDemo() {
  const [filter, setFilter] = useState<Filter>("All");

  const scored = useMemo(
    () =>
      accounts.map((a) => {
        const score = calculateScore(a.scoring);
        return { ...a, score, ...classifyScore(score) };
      }),
    [],
  );

  const filtered = scored.filter((a) => filter === "All" || a.routeClass === filter);

  const board = useMemo(() => {
    const avg = Math.round(scored.reduce((acc, a) => acc + a.score, 0) / scored.length);
    return {
      total: scored.length,
      aClass: scored.filter((a) => a.routeClass === "A").length,
      bClass: scored.filter((a) => a.routeClass === "B").length,
      reject: scored.filter((a) => a.routeClass === "Reject").length,
      average: avg,
    };
  }, [scored]);

  const exportCsv = () => {
    const blob = new Blob([toCsv(filtered)], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "evia-account-cards.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">EVIA Account Cards</h1>
            <p className="mt-1 text-sm text-slate-600">Демо-экран проверки GTM-маршрута на mock data.</p>
          </div>
          <button onClick={exportCsv} className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">Export CSV</button>
        </header>

        <section className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[['Total accounts', board.total], ['A-class accounts', board.aClass], ['B-class accounts', board.bClass], ['Reject accounts', board.reject], ['Average score', board.average]].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <p className="text-xs text-slate-500">{k}</p>
              <p className="text-2xl font-semibold text-slate-900">{v}</p>
            </div>
          ))}
        </section>

        <section className="mb-4 flex flex-wrap gap-2">
          {(["All", "A", "B", "C", "Reject"] as Filter[]).map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-3 py-1 text-sm ${filter === item ? "bg-slate-900 text-white" : "bg-white text-slate-700 border border-slate-300"}`}>
              {item}
            </button>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {filtered.map((account) => <AccountCard key={account.id} account={account} />)}
        </section>

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Route Verdict</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li><span className="font-medium">scale:</span> 2 аккаунта A-класса готовы для первой волны с подтвержденными сигналами.</li>
            <li><span className="font-medium">rebuild:</span> 1 аккаунт B-класса требует дополнительного подтверждения у владельца маршрута.</li>
            <li><span className="font-medium">stop:</span> 2 аккаунта имеют высокий false-positive risk и класс Reject — не трогать.</li>
            <li><span className="font-medium">insufficient data:</span> часть сигналов в статусе Pending/Needs review, нужны дополнительные evidence-интервью.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
