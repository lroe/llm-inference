#!/usr/bin/env python3
"""Word-level transcription with faster-whisper.

Usage:
  ~/.venvs/whisper/bin/python scripts/transcribe.py audio.wav out.json
Optional environment variables:
  WHISPER_MODEL     model name or local path (default: cached small.en, else small.en)
  WHISPER_DEVICE    cpu | cuda (default: cpu)
  WHISPER_COMPUTE   int8 | float16 | float32 (default: int8 on cpu)
"""
import json
import os
import subprocess
import sys
from pathlib import Path

import numpy as np
from faster_whisper import WhisperModel


def cached_small_en() -> str | None:
    root = Path.home() / ".cache/huggingface/hub/models--Systran--faster-whisper-small.en/snapshots"
    if not root.is_dir():
        return None
    snaps = sorted([p for p in root.iterdir() if p.is_dir()], key=lambda p: p.stat().st_mtime)
    return str(snaps[-1]) if snaps else None


def decode_audio(path: Path) -> np.ndarray:
    """Decode any audio file to 16 kHz mono float32 with ffmpeg.

    This bypasses PyAV entirely so the pipeline works with any installed
    ffmpeg, independent of PyAV/faster-whisper version drift.
    """
    proc = subprocess.run(
        [
            "ffmpeg", "-v", "error", "-i", str(path),
            "-ar", "16000", "-ac", "1", "-f", "f32le", "-acodec", "pcm_f32le", "-",
        ],
        check=True,
        stdout=subprocess.PIPE,
    )
    return np.frombuffer(proc.stdout, dtype=np.float32)


def main() -> None:
    if len(sys.argv) < 3:
        print(__doc__)
        raise SystemExit(2)
    audio_path = Path(sys.argv[1]).expanduser()
    out_path = Path(sys.argv[2]).expanduser()
    model_name = os.environ.get("WHISPER_MODEL", "")
    if not model_name:
        model_name = cached_small_en() or "small.en"
    device = os.environ.get("WHISPER_DEVICE", "cpu")
    compute = os.environ.get("WHISPER_COMPUTE", "int8" if device == "cpu" else "float16")

    print(f"Loading {model_name} on {device}/{compute} ...", flush=True)
    model = WhisperModel(
        model_name,
        device=device,
        compute_type=compute,
        cpu_threads=os.cpu_count() or 4,
        num_workers=1,
    )

    audio = decode_audio(audio_path)
    print(f"Audio: {len(audio) / 16000:.1f}s", flush=True)
    segments_iter, info = model.transcribe(
        audio,
        language="en",
        beam_size=5,
        word_timestamps=True,
        vad_filter=True,
        vad_parameters={"min_silence_duration_ms": 400},
        condition_on_previous_text=True,
        temperature=0.0,
    )
    print(f"Detected language: {info.language} ({info.language_probability:.2f})", flush=True)

    segments = []
    flat_words = []
    for i, seg in enumerate(segments_iter):
        words = [
            {"word": w.word, "start": round(w.start, 3), "end": round(w.end, 3), "probability": round(w.probability, 3)}
            for w in (seg.words or [])
        ]
        segments.append({
            "id": i,
            "start": round(seg.start, 3),
            "end": round(seg.end, 3),
            "text": seg.text.strip(),
            "words": words,
        })
        flat_words.extend(words)
        print(f"[{seg.start:7.2f} - {seg.end:7.2f}] {seg.text.strip()}", flush=True)

    data = {
        "audio": str(audio_path),
        "duration": round(info.duration, 3),
        "language": info.language,
        "model": model_name,
        "segments": segments,
        "words": flat_words,
    }
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(data, indent=2), encoding="utf-8")
    print(f"Wrote {out_path} ({len(segments)} segments, {len(flat_words)} words)", flush=True)


if __name__ == "__main__":
    main()
