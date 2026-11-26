# CLAUDE.md

@AGENTS.md

## Claude Code Setup

`.claude/skills` is a symlink to `.agents/skills`, so the runbooks there load as Claude skills; edit them in `.agents/skills/`. `.claude/settings.json` pre-allows the pnpm scripts, runs Prettier on every file Claude edits, and in cloud sessions runs `.claude/hooks/session-start.sh` to install dependencies. `.mcp.json` adds the official Astro docs MCP server, and its search tool is pre-allowed; check it before relying on remembered Astro APIs. Cloud environments need `mcp.docs.astro.build` in their allowed domains to reach it
