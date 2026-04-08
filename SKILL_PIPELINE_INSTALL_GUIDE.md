# Skill Base Auto-Reference — Installation Guide
# For: Don's AI dev stack (Claude Desktop, Gemini CLI, Antigravity, Claude Code)
# Repo: D:\antigravity-awesome-skills
# Date: 2026-04-03
# ─────────────────────────────────────────────────────────────────────────────

## What this installs

A zero-friction skill pipeline. You describe a vibe idea → every agent automatically
reads the skills repo, picks the right skills, builds a smarter plan, and tells you
which skills it used at the end. No more "I forgot to give it that skill."

## Step 1 — SKILLS_BASE.md (DONE)

Already written to: D:\antigravity-awesome-skills\SKILLS_BASE.md
This is the universal index all agents read. Keep it updated as you add skills.

## Step 2 — Desktop Commander allowedDirectories (DONE)

C:\ and D:\ are already in allowedDirectories — no change needed.
DC can reach D:\antigravity-awesome-skills without any additional config.

Note: If DC is ever reinstalled, run set_config_value:
  key:   allowedDirectories
  value: ["D:\\","C:\\Users\\Donal","D:\\antigravity-awesome-skills"]

## Step 3 — GEMINI.md (DONE)

Protocol 10 appended to: C:\Users\Donal\.gemini\GEMINI.md
Takes effect immediately on next Gemini CLI / Antigravity session.

## Step 4 — Claude Desktop Custom Instructions (DONE)

Paste contents of C:\Users\Donal\Desktop\CLAUDE_DESKTOP_CUSTOM_INSTRUCTIONS.txt
into Claude Desktop → Settings → Custom Instructions → Save.

## Step 5 — Claude Code global CLAUDE.md (DONE)

Written to: C:\Users\Donal\.claude\CLAUDE.md
Applies to all Claude Code sessions across all projects.

## Step 6 — Test the pipeline

In any connected agent, type:
"I want to vibe code a geopolitical dashboard that exports briefings as PDFs"

Expected behavior:
- Agent reads D:\antigravity-awesome-skills\SKILLS_BASE.md silently
- Matches: frontend-design, pdf, pdf-reading (possibly xlsx)
- Builds plan using those skills' guidance
- Ends with a Skills Applied table

## Keeping the index current

When you add a new skill to the repo:
1. Create its folder + SKILL.md as normal
2. Open D:\antigravity-awesome-skills\SKILLS_BASE.md
3. Add an entry under the correct section (PUBLIC or EXAMPLES)
4. Include: path, triggers (comma-separated keywords), one-line description
5. Commit to git — all agents auto-pick up on next read

## File map

  D:\antigravity-awesome-skills\
  ├── SKILLS_BASE.md               ← universal index
  ├── SKILL_PIPELINE_INSTALL_GUIDE.md  ← this file
  ├── public\
  │   ├── docx\SKILL.md
  │   ├── frontend-design\SKILL.md
  │   ├── pdf\SKILL.md
  │   ├── pdf-reading\SKILL.md
  │   ├── pptx\SKILL.md
  │   ├── file-reading\SKILL.md
  │   ├── product-self-knowledge\SKILL.md
  │   └── xlsx\SKILL.md
  └── examples\
      ├── algorithmic-art\SKILL.md
      ├── brand-guidelines\SKILL.md
      ├── canvas-design\SKILL.md
      ├── doc-coauthoring\SKILL.md
      ├── internal-comms\SKILL.md
      ├── mcp-builder\SKILL.md
      ├── skill-creator\SKILL.md
      ├── slack-gif-creator\SKILL.md
      ├── theme-factory\SKILL.md
      └── web-artifacts-builder\SKILL.md

  Config files touched:
  C:\Users\Donal\.gemini\GEMINI.md          ← Protocol 10 appended
  C:\Users\Donal\.claude\CLAUDE.md          ← Claude Code global brain
  Claude Desktop custom instructions         ← skill base prompt (manual paste)

# ─────────────────────────────────────────────────────────────────────────────
# Done. Vibe idea in → smart plan out, every time.
# ─────────────────────────────────────────────────────────────────────────────
