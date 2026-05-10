# COMMITS.md

## Purpose
Defines the commit proposal format and quality bar for AI-assisted changes in this repository.

## Commit Message Format
Use Conventional Commits:

`type(scope): short summary`

Examples:
- `feat(footer): redesign footer with responsive grid and social links`
- `fix(map): correct Konum embedded Google Maps source`
- `docs(process): move plan to docs and add commit proposal rules`

## Allowed Types
- `feat` for new functionality
- `fix` for bug fixes
- `refactor` for internal code improvements
- `style` for visual/CSS-only changes
- `docs` for documentation changes
- `chore` for maintenance/non-product changes

## Commit Proposal Template
After each completed task, provide:

1. **Proposed commit message**
2. **Files changed**
3. **Why this change**
4. **Validation notes**
5. **Risk / follow-up**

Template:

```md
Proposed commit:
<type(scope): summary>

Files changed:
- path/to/file1
- path/to/file2

Why:
- reason 1
- reason 2

Validation:
- check 1
- check 2

Risk / Follow-up:
- risk or none
- next step (if any)
```

## Scope Rules
1. Keep commits focused and atomic.
2. Do not mix unrelated changes in one commit.
3. Prefer one logical change per commit.
