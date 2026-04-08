# GEMINI.md — Project Core Instructions

## Project Context
- **Name**: Antigravity Awesome Skills
- **Core Mission**: Curate and distribute 1,300+ agentic skills for AI coding assistants.
- **Stack**: Markdown (skills), Node.js/Vite (web-app), Python/Bash (tools/scripts).
- **Package Manager**: npm

## Protocol 10: Auto Skill Scan (Mandatory)
*This protocol is a non-negotiable requirement for all tasks involving planning, designing, or implementing features.*

### Input Trigger
- Any request to build, design, plan, or deploy an app, tool, or skill.
- Any request for an implementation plan or architecture.

### Execution Steps
1. **Read Index**: Before generating output, read `D:\antigravity-awesome-skills\SKILLS_BASE.md`.
2. **Silent Match**: Cross-reference triggers in the index against the request.
3. **Load Skills**: Read the `SKILL.md` for every matched skill.
4. **Apply Silently**: Incorporate skill guidance into the plan/code without narrating the process.
5. **Append Audit**: At the very end of the response, append the "Skills applied" table.

### Decision Table
| Situation | Action |
|---|---|
| Task trigger matched | Execute Protocol 10 immediately. |
| No skills match | Proceed normally, note "No skills matched" in audit trail. |
| SKILLS_BASE.md missing | Log error in audit trail and proceed from base knowledge. |

---
## Skills applied
| Skill | Reason matched |
|---|---|
| skill-creator | Current task involves modifying the skill-repo framework and agent protocols. |
| doc-coauthoring | Creating core documentation files (GEMINI.md). |
