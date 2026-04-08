---
name: liason-agent
description: "Ensures operational integrity by automatically scanning SKILLS_BASE.md for task-relevant guidance before every build."
category: General
risk: safe
source: official
date_added: "2026-04-03"
author: Antigravity
tags: [protocol, automation, planning, architecture]
tools: [claude, cursor, gemini, codex]
---

# Liason Agent Skill

## Overview

The Liason Agent skill is a meta-skill designed to ensure that every task an AI assistant performs is informed by the project's collective skill library. It implements **Protocol 10: Auto Skill Scan**, preventing "knowledge drift" and ensuring best practices are applied silently.

## When to Use This Skill

- **ALWAYS**: This skill is a "mandatory background" skill for all builds.
- Use when starting a new feature, app, or tool design.
- Use when planning complex refactors or deployments.

## How It Works

### Step 1: Manifest Retrieval
Before generating any plan or code, the agent reads `D:\antigravity-awesome-skills\SKILLS_BASE.md`.

### Step 2: Silent Keyword Matching
The agent matches the user's request against the `Triggers` listed in the manifest.

### Step 3: Skill Intake
For every matching skill, the agent reads the corresponding `SKILL.md` file to absorb its specific guidance.

### Step 4: Silent Implementation
The matched guidance is applied to the output without narrating the "loading" process.

### Step 5: Audit Trail
The agent appends a "Skills applied" table to the very end of the response.

## Examples

### Example 1: Starting a React Dashboard
If the user says "Make a React dashboard", the Liason Agent matches `frontend-design` and `web-artifacts-builder`, applies their CSS/UI patterns, and appends the audit trail.

### Example 2: Data Export Task
If the user says "Add a CSV export feature", the Liason Agent matches `xlsx`, reads its formatting guidelines, and ensures the implementation follows them.

## Best Practices

- ✅ **Read first, act second**: Always consult the manifest before typing any code.
- ✅ **Stay Silent**: Do not tell the user "I am checking skills..." unless they ask.
- ✅ **Complete Audit**: Always include the audit trail at the end.
- ❌ **Don't Guess**: If a trigger partially matches, read the `SKILL.md` to confirm relevance.

## Related Skills

- `@skill-creator` - For creating new skills to add to the manifest.
- `@architecture` - Complementary skill for system design.
- `@doc-coauthoring` - For formalizing the results of a build.
