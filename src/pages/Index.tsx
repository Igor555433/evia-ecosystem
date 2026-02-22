import { FormEvent, useState } from "react";

const DEFAULT_INTAKE = {
  project_name: "",
  company_name: "",
  contact_name: "",
  contact_email: "",
  goals: "",
  problem_statement: "",
  current_solution: "",
  target_audience: "",
  constraints: "",
  timeline: "",
  budget: "",
  manual_sources: [{ type: "note", value: "" }],
};

export default function Index() {
  const [intake, setIntake] = useState(DEFAULT_INTAKE);
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const setField = (field: keyof typeof DEFAULT_INTAKE, value: string) => {
    setIntake((prev) => ({ ...prev, [field]: value }));
  };

  const updateSource = (value: string) => {
    setIntake((prev) => ({
      ...prev,
      manual_sources: [{ type: "note", value }],
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("intake_json", JSON.stringify(intake));
    if (files) {
      Array.from(files).forEach((file) => formData.append("files", file));
    }

    try {
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "evia_run.zip";
      a.click();
      URL.revokeObjectURL(url);
      setMessage("Готово: ZIP скачан.");
    } catch (error) {
      setMessage(`Ошибка генерации: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-bold">EVIA R&D Generator MVP</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Intake по структуре INPUT ДЛЯ EVIA R&D. Внешние данные отключены, только
        ручные источники и файлы.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        {[
          "project_name",
          "company_name",
          "contact_name",
          "contact_email",
          "goals",
          "problem_statement",
          "current_solution",
          "target_audience",
          "constraints",
          "timeline",
          "budget",
        ].map((field) => (
          <div key={field}>
            <label className="mb-1 block text-sm font-medium">{field}</label>
            <input
              className="w-full rounded border p-2"
              value={intake[field as keyof typeof DEFAULT_INTAKE] as string}
              onChange={(e) =>
                setField(field as keyof typeof DEFAULT_INTAKE, e.target.value)
              }
            />
          </div>
        ))}

        <div>
          <label className="mb-1 block text-sm font-medium">manual source (note/url)</label>
          <textarea
            className="w-full rounded border p-2"
            value={intake.manual_sources[0]?.value || ""}
            onChange={(e) => updateSource(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">files</label>
          <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </main>
  );
}
