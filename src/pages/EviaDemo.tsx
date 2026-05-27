import AccountCard, { Account, calculateScore, classifyScore } from "@/components/AccountCard";

const accounts: Account[] = [
  {
    id: "1",
    company: "Northwind Biologics",
    signal: "Новый VP Sales и пересборка GTM",
    source: "LinkedIn + earnings call",
    risk: "Low",
    firstQuestion: "Кто владелец маршрута SQL→Revenue?",
    nextStep: "Согласовать 30-мин discovery с VP Sales и RevOps.",
    scoring: { fit: 18, trigger: 16, budgetPath: 13, access: 12, timing: 8, evidenceStrength: 8, routeClarity: 9, riskPenalty: -4 },
  },
  {
    id: "2",
    company: "BluePeak Logistics",
    signal: "Падение win-rate в enterprise сегменте",
    source: "Внутренний referral",
    risk: "Medium",
    firstQuestion: "Где ломается handoff SDR→AE?",
    nextStep: "Запросить воронку по стадиям за 2 квартала.",
    scoring: { fit: 15, trigger: 17, budgetPath: 11, access: 9, timing: 7, evidenceStrength: 8, routeClarity: 7, riskPenalty: -8 },
  },
  {
    id: "3",
    company: "Altair Security Cloud",
    signal: "Смена ICP и запуск PLG motion",
    source: "Product update + podcast",
    risk: "Medium",
    firstQuestion: "Какие сигналы PQL реально коррелируют с оплатой?",
    nextStep: "Провести workshop с growth и data.",
    scoring: { fit: 14, trigger: 14, budgetPath: 10, access: 8, timing: 6, evidenceStrength: 6, routeClarity: 6, riskPenalty: -10 },
  },
  {
    id: "4",
    company: "Meridian Retail Group",
    signal: "Заморозка маркетинговых spend",
    source: "Новость + комментарий CFO",
    risk: "High",
    firstQuestion: "Есть ли sponsor вне marketing budget?",
    nextStep: "Проверить вариант пилота на cost-neutral KPI.",
    scoring: { fit: 12, trigger: 11, budgetPath: 7, access: 6, timing: 5, evidenceStrength: 5, routeClarity: 6, riskPenalty: -12 },
  },
  {
    id: "5",
    company: "Vortex Health Systems",
    signal: "Рост inbound и очереди у SDR",
    source: "Partner channel",
    risk: "Low",
    firstQuestion: "Какая SLA по первому касанию лида?",
    nextStep: "Собрать baseline и предложить pilot sprint на 4 недели.",
    scoring: { fit: 19, trigger: 18, budgetPath: 14, access: 13, timing: 9, evidenceStrength: 9, routeClarity: 9, riskPenalty: -2 },
  },
  {
    id: "6",
    company: "Orion Fintech",
    signal: "Фокус на APAC до конца года",
    source: "Board memo leak",
    risk: "High",
    firstQuestion: "Есть ли локальный champion в APAC?",
    nextStep: "Поставить hold до валидации регионального владельца.",
    scoring: { fit: 10, trigger: 12, budgetPath: 6, access: 4, timing: 5, evidenceStrength: 4, routeClarity: 4, riskPenalty: -15 },
  },
];

const toCsv = (rows: Account[]) => {
  const headers = ["Company", "Signal", "Source", "Risk", "Score", "Class", "First question", "Next step"];
  const content = rows.map((a) => {
    const score = calculateScore(a.scoring);
    const cls = classifyScore(score).routeClass;
    return [a.company, a.signal, a.source, a.risk, score, cls, a.firstQuestion, a.nextStep]
      .map((v) => `"${String(v).replaceAll('"', '""')}"`)
      .join(",");
  });

  return [headers.join(","), ...content].join("\n");
};

export default function EviaDemo() {
  const exportCsv = () => {
    const blob = new Blob([toCsv(accounts)], { type: "text/csv;charset=utf-8;" });
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
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">EVIA Account Cards</h1>
            <p className="mt-1 text-sm text-slate-600">Демо-экран проверки GTM-маршрута на mock data.</p>
          </div>
          <button onClick={exportCsv} className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">
            Export CSV
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </section>
      </div>
    </main>
  );
}
