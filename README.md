# PartForge - PC Builder for Local LLM Enthusiasts

## Why I built this

I spent weeks going down the rabbit hole of running LLMs locally. The experience was honestly painful. I'd find a model I wanted to try - say, Llama 3.1 8B or DeepSeek R1 - and then have to reverse-engineer whether my hardware could actually handle it. How much VRAM does it need quantized? Will it fit in RAM if I offload? Do I need 24 GB or will 16 GB cut it?

The information was scattered everywhere. Reddit threads, random blog posts, GitHub READMEs with conflicting numbers. I'd open five tabs just to cross-reference one GPU's VRAM against one model's requirements. And if I was shopping for new hardware? Forget it. I had no way to quickly compare "if I get the RTX 4070 Ti instead of the 4060, how many more models can I actually run?"

So I built the tool I wished I had. You pick your parts - GPU, RAM, whatever you're considering - and it immediately tells you which LLMs your build can handle. GPU inference, CPU offload, CPU-only - all ranked and categorized so you can make an informed decision before spending money.

## What it does

**Interactive PC builder** with drag-and-drop part selection across 8 categories (CPU, GPU, motherboard, RAM, storage, PSU, case, cooler). Real specs, real prices.

**LLM compatibility checker** that instantly shows which models your build can run:
- **GPU Inference** (green) - model fits entirely in VRAM, fastest option
- **CPU + GPU Offload** (yellow) - spills into system RAM, GPU still assists
- **CPU Only** (blue) - runs purely on system RAM when no GPU is selected

Pick an RTX 4090 + 32 GB RAM and see dozens of models light up. Swap to a 4060 and watch the list shrink. That immediate feedback is the whole point - it turns a research project into a 2-minute decision.

**Also includes:**
- Compatibility checking (socket mismatches, PSU headroom, form factor conflicts)
- Build tier classification and wattage estimation
- Preset builds to get started quickly
- Part detail dialogs with full specs

## Quick start

```bash
npm install
npm run dev
```

## Built with

React 19, Vite, Tailwind CSS, shadcn/ui, @dnd-kit

---

*Built out of frustration with the local LLM hardware research experience. If you've ever spent an evening cross-referencing VRAM specs across 20 browser tabs, this is for you.*

\- Vinay
