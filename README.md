# inference-optimization video

A 18:48 hand-drawn explainer animation about LLM inference optimization, built with Remotion.

## Preview (no render)

```bash
npm install       # already installed
npm run dev -- --port 3200
```

The composition is `InferenceOptimization` (1920×1080, 30 fps, 33,842 frames).
A preview server is currently running at `http://localhost:3200`.

## Project layout

- `audio.wav` — narration master (also available to Remotion via `public/audio.wav`).
- `src/data/transcript.json` — word-level transcription used to time the scenes.
- `src/scenes/` — one component per visual beat.
- `src/components/` — the hand-drawn SVG kit (rough.js), figures, chips, tokens, gauges, etc.
- `src/Film.tsx` — the scene timeline. Every scene is laid end-to-end with no gaps.
- `scripts/transcribe.sh` / `scripts/transcribe.py` — reusable Whisper pipeline.

## Reusable Whisper environment

`faster-whisper` is installed once in a dedicated venv so future sessions can reuse it:

```bash
python3 -m venv ~/.venvs/whisper
~/.venvs/whisper/bin/pip install faster-whisper
./scripts/transcribe.sh audio.wav src/data/transcript.json
```

The script decodes audio through `ffmpeg` into a float32 array before calling
Whisper, which avoids PyAV/faster-whisper version drift. It auto-selects the
cached `small.en` model when available; set `WHISPER_MODEL` to override.

## Design rules

The film follows `skill.md`: Dracula palette, 3–4 px hand-drawn ink, 36 px
minimum type at 1080p, sparse compositions, 4-frame fade-through-background
transitions, and a final 2–3 s hold on each scene’s last reveal.
