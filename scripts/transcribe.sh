#!/usr/bin/env bash
# Reusable word-level transcription helper.
# The Python environment lives at ~/.venvs/whisper so future sessions can reuse it.
set -euo pipefail
VENV="${WHISPER_VENV:-$HOME/.venvs/whisper}"
if [ ! -x "$VENV/bin/python" ]; then
  echo "Missing whisper venv at $VENV" >&2
  echo "Create it with: python3 -m venv ~/.venvs/whisper && ~/.venvs/whisper/bin/pip install faster-whisper" >&2
  exit 1
fi
exec "$VENV/bin/python" "$(dirname "$0")/transcribe.py" "$@"
