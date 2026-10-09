# social/: obsah na Instagram a Facebook

Nenasazuje se na web (`.vercelignore`).

| Co | Kde |
|---|---|
| 49 promptů na Reels (16 agentů), pravidla formátu, ověřené statistiky | `reels-prompts.md` |
| Hotový reel Inquiry Agent (10 s): zdroj + MP4 | `reels/inquiry-10s/` |
| GSAP pro offline render | `tools/gsap.min.js` |
| Render HTML → MP4 1080×1920 / 30 fps | `tools/render-reel.js` |

## Jak vyrobit nový reel
1. Zkopírovat `reels/inquiry-10s/` do `reels/<agent>-<varianta>/` a přepsat scény podle promptu v `reels-prompts.md`.
2. Stránka musí mít pausnutou GSAP timeline v `window.TL` a `window.READY = document.fonts.ready`.
3. Z kořene repa:
   ```bash
   python3 -m http.server 8790 &
   NODE_PATH=$(npm root -g) node social/tools/render-reel.js social/reels/<agent>-<varianta>/index.html social/reels/<agent>-<varianta>/reel.mp4
   ```
   4 paralelní okna ≈ 1,5 min na 10 s videa. Google Fonts (Fraunces) musí být dostupné.
