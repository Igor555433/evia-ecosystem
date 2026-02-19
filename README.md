# EVIA R&D Generator MVP

MVP веб-приложение (UI + API), которое запускает конвейер PROMPT `0→1→2→3→3.5→3.6→3.7→4→5→6` и возвращает архив артефактов `S0..S6`.

## Структура

- `prompts/` — launcher + PROMPT 0..6 (используются как source-of-truth во время выполнения)
- `schemas/` — intake schema
- `app/` — FastAPI backend и логика pipeline
- `tests/` — QA-гейты
- `runs/{run_id}/` — результаты без БД

## Локальный запуск

### 1) Backend

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

По умолчанию `DRY_RUN=true`, поэтому LLM-стадии выполняются без внешнего вызова (удобно для локальной проверки и CI).

Чтобы включить реальные LLM-вызовы:

```bash
export DRY_RUN=false
export OPENAI_API_KEY=sk-...
# optional
export OPENAI_MODEL=gpt-4o-mini
```

### 2) Frontend

```bash
npm install
npm run dev
```

UI доступен на `http://localhost:8080`, API — на `http://localhost:8000`.

## API

### `POST /generate`
`multipart/form-data`:
- `intake_json` — JSON строка intake
- `files` — один или несколько файлов

Пример запроса:

```bash
curl -X POST http://localhost:8000/generate \
  -F 'intake_json={"project_name":"EVIA Pilot","company_name":"ACME","goals":"Сделать MVP","problem_statement":"Нет автоматизации","manual_sources":[{"type":"url","value":"https://example.com"}]}' \
  -F "files=@./README.md" \
  --output evia_run.zip
```

Результат: `ZIP` c файлами `S0..S6` (`.md + .json`) и `S6.docx`.

## Протокольные гарантии

- Стоп на `PROMPT 0 = НЕ ГОТОВО`.
- Константа стоимости EVIA 45 дней = `150 000 ₽`.
- В `S5` формируется `(10) БЛОК ФИКСАЦИИ` с `run_id`.
- В `S6` фиксированные поля переносятся строгим копипастом из `S5`.
- Если данных нет — `MISSING/НЕ ПРЕДОСТАВЛЕНО`.
- Внешние веб-данные отключены; используются только ручные источники и загруженные файлы.

## Тесты

```bash
pytest -q
```

Покрыты обязательные гейты:
1. `fixation_gate`
2. `evia_cost_gate`
3. `missing_gate`
4. dry-run LLM output + финальный текст S6
