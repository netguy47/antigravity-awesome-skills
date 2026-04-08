# Antigravity Awesome Skills — Base Index
# Version: 1.0
# Path: D:\antigravity-awesome-skills\SKILLS_BASE.md
# Purpose: Universal skill manifest. All agents read this first before planning any build.

---

## How agents use this file

When a vibe idea or build request is received:
1. Read this file to get the full skill list
2. Match idea keywords against skill triggers (listed under each skill)
3. Apply matched skills silently during plan generation
4. At the END of the plan, output a "Skills applied" section

Do NOT ask the user which skills to apply. Do NOT skip this file.

---

## Skill Registry

### PUBLIC SKILLS (production-ready)

#### docx
- **Path:** `public/docx/SKILL.md`
- **Triggers:** Word doc, .docx, report, memo, letter, template, letterhead, tracked changes
- **Use for:** Creating, reading, editing Word documents with professional formatting

#### file-reading
- **Path:** `public/file-reading/SKILL.md`
- **Triggers:** uploaded file, file_path, read this file, unknown file type
- **Use for:** Routing to correct tool for any uploaded file type

#### frontend-design
- **Path:** `public/frontend-design/SKILL.md`
- **Triggers:** UI, component, landing page, dashboard, web app, React, HTML, CSS, vibe code, artifact, interface, layout, design
- **Use for:** Production-grade frontend interfaces — avoids generic AI aesthetics

#### pdf
- **Path:** `public/pdf/SKILL.md`
- **Triggers:** PDF, .pdf, extract PDF, merge PDFs, split PDF, watermark, OCR, fill form
- **Use for:** All PDF operations — creation, manipulation, extraction, OCR

#### pdf-reading
- **Path:** `public/pdf-reading/SKILL.md`
- **Triggers:** read PDF, inspect PDF, extract text from PDF, scanned PDF
- **Use for:** Reading and extracting content from PDF files on disk

#### pptx
- **Path:** `public/pptx/SKILL.md`
- **Triggers:** slides, presentation, deck, pitch deck, .pptx, PowerPoint
- **Use for:** All PowerPoint operations — create, read, edit, combine

#### product-self-knowledge
- **Path:** `public/product-self-knowledge/SKILL.md`
- **Triggers:** Claude API, Anthropic SDK, Claude Code, pricing, rate limits, models, MCP integration
- **Use for:** Any response requiring accurate Anthropic product facts

#### xlsx
- **Path:** `public/xlsx/SKILL.md`
- **Triggers:** spreadsheet, .xlsx, .csv, Excel, table data, formulas, clean data, export data
- **Use for:** All spreadsheet operations — create, edit, clean, convert

#### liason-agent
- **Path:** `skills/liason-agent/SKILL.md`
- **Triggers:** build, design, plan, deploy, scaffold, launch, vibe, app, tool
- **Use for:** Mandatory operational integrity — automatically scans this file for task-relevant guidance

---

### EXAMPLE SKILLS (reference implementations)

#### algorithmic-art
- **Path:** `examples/algorithmic-art/SKILL.md`
- **Triggers:** generative art, algorithmic art, p5.js, flow field, particle system, code art
- **Use for:** Interactive generative art with seeded randomness

#### brand-guidelines
- **Path:** `examples/brand-guidelines/SKILL.md`
- **Triggers:** brand colors, Anthropic style, company design, brand guidelines, look and feel
- **Use for:** Applying official brand colors and typography to artifacts

#### canvas-design
- **Path:** `examples/canvas-design/SKILL.md`
- **Triggers:** poster, visual design, PNG, artwork, static design, graphic, illustration
- **Use for:** Beautiful static visual designs as .png or .pdf

#### doc-coauthoring
- **Path:** `examples/doc-coauthoring/SKILL.md`
- **Triggers:** write documentation, spec, proposal, technical doc, decision doc
- **Use for:** Structured co-authoring workflow for documentation and proposals

#### internal-comms
- **Path:** `examples/internal-comms/SKILL.md`
- **Triggers:** status report, leadership update, newsletter, incident report, project update
- **Use for:** Internal communications in company-standard formats

#### mcp-builder
- **Path:** `examples/mcp-builder/SKILL.md`
- **Triggers:** MCP server, Model Context Protocol, FastMCP, MCP SDK, integrate API via MCP
- **Use for:** Creating high-quality MCP servers in Python or TypeScript

#### skill-creator
- **Path:** `examples/skill-creator/SKILL.md`
- **Triggers:** create skill, new skill, edit skill, optimize skill, skill eval, benchmark skill
- **Use for:** Creating, modifying, and benchmarking skills in this repo

#### slack-gif-creator
- **Path:** `examples/slack-gif-creator/SKILL.md`
- **Triggers:** animated GIF, Slack GIF, GIF for Slack
- **Use for:** Slack-optimized animated GIFs with correct size/frame constraints

#### theme-factory
- **Path:** `examples/theme-factory/SKILL.md`
- **Triggers:** theme, style artifact, color scheme, font pairing, styled slides, themed doc
- **Use for:** Applying pre-set or custom themes to any artifact

#### web-artifacts-builder
- **Path:** `examples/web-artifacts-builder/SKILL.md`
- **Triggers:** complex artifact, multi-component, shadcn, Tailwind, state management, full app artifact
- **Use for:** Elaborate multi-component HTML artifacts using React + Tailwind + shadcn/ui

---

## Skill audit trail format

At the end of every plan or build output, append:

```
---
## Skills applied
| Skill | Reason |
|---|---|
| frontend-design | User wants a React dashboard UI |
| xlsx | Output includes data export to spreadsheet |
```

If no skills matched: `## Skills applied — none (base knowledge only)`

---

## Adding new skills

1. Create folder: `D:\antigravity-awesome-skills\<category>\<skill-name>\`
2. Add `SKILL.md` with: description, triggers, usage examples
3. Add an entry to this file under the correct section
4. Commit and push to keep all agents in sync

---
*Last updated: 2026-04-03 | Maintained by Don*
