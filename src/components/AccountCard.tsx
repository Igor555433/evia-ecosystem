import { useMemo, useState } from "react";

export type ScoreBreakdown = {
  fit: number;
  trigger: number;
  budgetPath: number;
  access: number;
  timing: number;
  evidenceStrength: number;
  routeClarity: number;
  riskPenalty: number;
};

export type Evidence = {
  source: string;
  sourceDate: string;
  signalType: "Behavioral" | "Org" | "Market" | "Product";
  evidenceStrength: number;
  falsePositiveRisk: "Low" | "Medium" | "High";
  humanValidationStatus: "Validated" | "Pending" | "Needs review";
};

export type Account = {
  id: string;
  company: string;
  signal: string;
  source: string;
  risk: "Low" | "Medium" | "High";
  firstQuestion: string;
  nextStep: string;
  scoring: ScoreBreakdown;
  evidence: Evidence;
};

export type ScoredAccount = Account & {
  score: number;
  routeClass: "A" | "B" | "C" | "Reject";
  routeLabel: string;
};

const clampScore = (value: number) => Math.max(0, Math.min(100, value));

export const calculateScore = (scoring: ScoreBreakdown) => {
  const total =
    scoring.fit +
    scoring.trigger +
    scoring.budgetPath +
    scoring.access +
    scoring.timing +
    scoring.evidenceStrength +
    scoring.routeClarity +
    scoring.riskPenalty;

  return clampScore(total);
};

export const classifyScore = (score: number): Pick<ScoredAccount, "routeClass" | "routeLabel"> => {
  if (score >= 80) return { routeClass: "A", routeLabel: "первая волна" };
  if (score >= 65) return { routeClass: "B", routeLabel: "после подтверждения" };
  if (score >= 50) return { routeClass: "C", routeLabel: "резерв" };
  return { routeClass: "Reject", routeLabel: "не трогать" };
};

const classStyles: Record<ScoredAccount["routeClass"], string> = {
  A: "bg-emerald-100 text-emerald-800",
  B: "bg-blue-100 text-blue-800",
  C: "bg-amber-100 text-amber-800",
  Reject: "bg-rose-100 text-rose-800",
};

const cardStyles: Record<ScoredAccount["routeClass"], string> = {
  A: "border-emerald-200",
  B: "border-blue-200",
  C: "border-amber-200",
  Reject: "border-rose-200",
};

export default function AccountCard({ account }: { account: Account }) {
  const [expanded, setExpanded] = useState(false);
  const scored = useMemo(() => {
    const score = calculateScore(account.scoring);
    return { ...account, score, ...classifyScore(score) };
  }, [account]);

  return (
    <article className={`rounded-xl border bg-white p-5 shadow-sm ${cardStyles[scored.routeClass]}`}>
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{scored.company}</h3>
          <p className="text-sm text-slate-600">Сигнал: {scored.signal}</p>
          <p className="text-sm text-slate-600">Источник: {scored.source}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-slate-900">{scored.score}</p>
          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${classStyles[scored.routeClass]}`}>
            {scored.routeClass} · {scored.routeLabel}
          </span>
        </div>
      </div>

      <div className="mb-3 grid gap-2 text-sm md:grid-cols-2">
        <p><span className="font-medium text-slate-900">Риск:</span> {scored.risk}</p>
        <p><span className="font-medium text-slate-900">Первый вопрос:</span> {scored.firstQuestion}</p>
        <p className="md:col-span-2"><span className="font-medium text-slate-900">Следующий шаг:</span> {scored.nextStep}</p>
      </div>

      <section className="mb-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
        <h4 className="mb-2 font-medium text-slate-900">Evidence</h4>
        <div className="grid gap-1 md:grid-cols-2">
          <p><span className="font-medium">source:</span> {scored.evidence.source}</p>
          <p><span className="font-medium">source date:</span> {scored.evidence.sourceDate}</p>
          <p><span className="font-medium">signal type:</span> {scored.evidence.signalType}</p>
          <p><span className="font-medium">evidence strength:</span> {scored.evidence.evidenceStrength}/10</p>
          <p><span className="font-medium">false-positive risk:</span> {scored.evidence.falsePositiveRisk}</p>
          <p><span className="font-medium">human validation status:</span> {scored.evidence.humanValidationStatus}</p>
        </div>
      </section>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mb-3 text-sm font-medium text-slate-700 underline"
      >
        Почему такой score
      </button>

      {expanded && (
        <div className="mb-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
          <ul className="grid gap-1 md:grid-cols-2">
            <li>Fit: {scored.scoring.fit}/20</li>
            <li>Trigger: {scored.scoring.trigger}/20</li>
            <li>Budget Path: {scored.scoring.budgetPath}/15</li>
            <li>Access: {scored.scoring.access}/15</li>
            <li>Timing: {scored.scoring.timing}/10</li>
            <li>Evidence Strength: {scored.scoring.evidenceStrength}/10</li>
            <li>Route Clarity: {scored.scoring.routeClarity}/10</li>
            <li>Risk Penalty: {scored.scoring.riskPenalty}</li>
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white">Approve</button>
        <button className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white">Reject</button>
        <button className="rounded-md bg-amber-500 px-3 py-2 text-sm font-medium text-white">Needs more evidence</button>
      </div>
    </article>
  );
}
