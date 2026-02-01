# SoundEffectStudio

A browser-based sound effect designer for creating retro-style game audio. Build layered sound effects using oscillators, noise generators, filters, and audio samples — then export them for use in games.

## Features

- **Multi-layer sound design** — Stack up to 8 layers of oscillators, noise, and samples
- **Waveform types** — Sine, square, sawtooth, triangle, and white/pink/brown noise
- **Frequency envelopes** — Shape pitch over time with start/end frequency and curves
- **Volume envelopes** — ADSR-style attack, sustain, and decay controls
- **Filters** — Low-pass, high-pass, band-pass, and notch with animated cutoff
- **Sample import** — Load audio files or import from URL, with trim and pitch controls
- **Real-time preview** — Hear your effect instantly as you adjust parameters
- **Preset library** — 40+ built-in presets across categories: laser, explosion, powerup, coin, jump, hurt, and more
- **Export formats** — Download as WAV or copy Base64 data for embedding
- **Interactive tutorial** — Step-by-step guide for beginners
- **Keyboard shortcuts** — Space to play, Ctrl+S to save, Ctrl+Z/Y for undo/redo

## Getting Started

Open `index.html` in a modern browser. No build tools or server required.

1. Click a preset from the top bar to start with a template
2. Adjust oscillator, envelope, and filter settings in the left panel
3. Press **Space** or click **Play** to preview
4. Click **Export** to download as WAV

## Architecture

- `index.html` — Full UI with inline CSS and layout
- `js/sound-engine.js` — Web Audio API engine, layer management, WAV export
- `js/ui-controller.js` — UI bindings, parameter controls, waveform visualization
- `js/help-content.js` — Tutorial and help panel content

## License

This project is licensed under the GNU General Public License v3.0 — see [LICENSE](LICENSE) for details.
