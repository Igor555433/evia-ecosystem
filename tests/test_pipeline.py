from pathlib import Path

from app.pipeline import EVIA_COST, MISSING, generate_run


def _base_intake() -> dict:
    return {
        "project_name": "EVIA Pilot",
        "company_name": "ACME",
        "goals": "Сделать MVP",
        "problem_statement": "Нет автоматизации",
        "target_audience": "B2B",
        "timeline": "45 дней",
    }


def test_fixation_gate(tmp_path: Path) -> None:
    _, zip_path = generate_run(_base_intake(), [], tmp_path)
    run_dir = zip_path.parent

    s5 = (run_dir / "S5.json").read_text(encoding="utf-8")
    s6 = (run_dir / "S6.json").read_text(encoding="utf-8")

    import json

    s5_data = json.loads(s5)
    s6_data = json.loads(s6)

    assert s6_data["copied_from_fixation"] == s5_data["(10) БЛОК ФИКСАЦИИ"]


def test_evia_cost_gate(tmp_path: Path) -> None:
    _, zip_path = generate_run(_base_intake(), [], tmp_path)
    run_dir = zip_path.parent
    s6 = (run_dir / "S6.json").read_text(encoding="utf-8")

    assert EVIA_COST == "150 000 ₽"
    assert '"evia_cost_45_days": "150 000 ₽"' in s6


def test_missing_gate(tmp_path: Path) -> None:
    intake = _base_intake()
    intake["goals"] = ""

    _, zip_path = generate_run(intake, [], tmp_path)
    run_dir = zip_path.parent
    s0 = (run_dir / "S0.json").read_text(encoding="utf-8")

    assert MISSING in s0


def test_dry_run_stage_outputs_and_final_text(tmp_path: Path) -> None:
    _, zip_path = generate_run(_base_intake(), [], tmp_path)
    run_dir = zip_path.parent

    s6 = (run_dir / "S6.json").read_text(encoding="utf-8")
    assert "Финальный результат EVIA R&D" in s6
    assert "[DRY_RUN] Stage 6" not in s6

    docx_path = run_dir / "S6.docx"
    fallback_md = run_dir / "S6.md"
    assert docx_path.exists() or fallback_md.exists()

    if fallback_md.exists():
        text = fallback_md.read_text(encoding="utf-8")
        assert "Финальный результат EVIA R&D" in text
        assert "[DRY_RUN] Stage 6" not in text
        assert '"stage": "6"' not in text
