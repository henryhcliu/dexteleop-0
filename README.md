# DexTeleop-0 project website

**DexTeleop-0: Force-Aware Bimanual Dexterous Teleoperation with Ego-Centric Perception towards Shared Autonomy**

Buildless HTML/CSS/JavaScript served from the repository root by the existing GitHub Pages setup. `.nojekyll` is preserved. No build step, package installation, external font service, MathJax, or runtime access to another local folder is required.

## Local review

From this repository, run:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open <http://127.0.0.1:8000/>. Stop the server with Ctrl+C. GitHub Pages uses the base path `/dexteleop-0/`; rendered media paths are relative to the page. Canonical and social-image metadata use the corresponding deployed project URL.

## Structure

- `index.html`: current title/authors, top Paper/arXiv/Code controls, overview, method, demonstration tabs, experimental findings, and citation.
- `static/css/index.css`: UniManip-aligned typography, colors, spacing, responsive layouts, and paper-specific figure widths.
- `static/js/index.js`: keyboard-accessible demonstration tabs, citation copying with fallback, and section-navigation state. Research content remains available without JavaScript.
- `static/images/paper/*.webp`: optimized manuscript figures with declared intrinsic sizes and alt text.
- `static/figures/*.pdf`: original full-resolution figure PDFs.
- `static/videos/webpage_v1.1_compressed.mp4`: complete supplied 2:49.51 presentation, 1920 x 1080, 30fps, H.264 High/yuv420p with AAC stereo. Lossless stream-copy remux enables faststart; video and audio stream hashes match the supplied file. Size: 48,920,796 bytes (46.65 MiB).
- `static/images/video-poster-v1.1.webp` and `social-preview-v1.1.jpg`: repository-local poster and 1200 x 630 sharing preview extracted from the current video title frame. Versioned filenames avoid stale cached covers.
- `static/dexteleop-0.bib`: downloadable citation matching the inline BibTeX.
- `.gitattributes`: binary media rules that preserve PDF/image/video bytes despite Windows Git line-ending settings.

The architecture diagram is centered at a maximum width of 720 px. Larger task and result figures are capped at 896 px and shrink with their containers. PDF links retain access to detailed labels on small screens.

## Scientific and bibliographic provenance

The page follows the supplied `main_r1_black.tex` manuscript and its included controller and data tables. It distinguishes independent hand residuals from nominal arm commands, soft contact-moment regularization from equilibrium constraints, direct Sharpa sensing from empirical Wuji normal-force estimation, and final-stage success from whole-task completion.

The seven-author order is corroborated by the manuscript's commented author block and the supplied video's title frame: Haichao Liu, Yuyao Jiang, Hyunsun Park, Yuanjiang Xue, Mingze Sun, Ziwei Liu, Ziwei Wang. The user confirmed that Mingze Sun and Ziwei Liu are at NTU. Institutional affiliations are NTU, Singapore for all except Hyunsun Park (OOJU, USA); Ziwei Wang is the corresponding author.

The [available arXiv record](https://arxiv.org/abs/2606.23431) was checked on 8 November 2026. It confirms the title, identifier, original publication date, subject, and DOI, but currently lists the original five authors. The current seven-author manuscript is not yet online there. Paper/arXiv links point to the available record without an invented v2 URL; the page and citation use the confirmed current author list. No journal acceptance or publication venue is asserted.

Code remains marked coming soon. No public research-implementation URL or timed-caption file was supplied.

## Verification and review limits

- Scientific review checked selected numerical results and denominators against the manuscript's simulation, hardware, and user-study tables, including the novice Peg Insertion exception and final-stage/full-task distinction.
- Checked HTML structure, unique anchors, local references, image dimensions/decoding, CSS syntax, citation consistency, and media size. Original figure PDFs and staged Git blobs match source hashes.
- Exported current working contents from Git-tracked paths into an isolated directory and served `/dexteleop-0/`. The page and all 28 local resources returned HTTP 200 with correct sizes and media types; served HTML/CSS/JS/BibTeX bytes matched the export.
- Complete deployment contents are approximately 70.1 MB. Every file is below 50 MiB; the largest is the 46.65 MiB video. The existing GitHub Pages size constraints are respected without Git LFS or external media hosting.
- The complete repository-local video and audio decode without errors; lossless remux stream hashes match the supplied original, with `moov` before `mdat` for faststart.
- Source-level interaction checks cover tab initialization, click and keyboard selection, focus management, copying, and the clipboard-denial fallback.
- Browser visual QA is blocked: Windows Computer Use could not determine the active browser URL confidently and stopped. Rendered desktop/mobile layout, native controls, seeking, and playback remain unverified in a browser.
- Paper/arXiv targets were checked against the available arXiv record; there is no online v2 to validate. External endpoint availability can be limited by the browsing environment.

Media and citation files are staged in Git for review. The site stays within the existing static deployment conventions. No commit, push, publication, or hosting change is performed by this update.

Original template credit is retained in the footer. Unused vendor scripts/styles are not loaded by the page.
