from __future__ import annotations

import json
from pathlib import Path

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import FileResponse

from app.pipeline import generate_run

app = FastAPI(title="EVIA R&D Generator MVP")
RUNS_ROOT = Path("runs")
RUNS_ROOT.mkdir(exist_ok=True)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/generate")
async def generate(intake_json: str = Form(...), files: list[UploadFile] = File(default=[])) -> FileResponse:
    intake = json.loads(intake_json)
    evidence: list[dict[str, str]] = []

    for f in files:
        run_files = RUNS_ROOT / "_uploads"
        run_files.mkdir(parents=True, exist_ok=True)
        target = run_files / f.filename
        target.write_bytes(await f.read())
        evidence.append({"type": "file", "value": str(target)})

    manual_sources = intake.get("manual_sources", [])
    for source in manual_sources:
        evidence.append({"type": source.get("type", "note"), "value": source.get("value", "")})

    run_id, zip_path = generate_run(intake, evidence, RUNS_ROOT)
    return FileResponse(path=zip_path, filename=f"evia_run_{run_id}.zip", media_type="application/zip")
