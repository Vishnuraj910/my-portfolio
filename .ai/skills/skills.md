---
name: create-pull-request
description: Create a GitHub pull request following project conventions. Use when the user asks to create a PR, submit changes for review, or open a pull request. Handles commit analysis, branch management, and PR creation using the gh CLI tool.
---

# Create Pull Request

This skill guides you through creating a well-structured GitHub pull request that follows project conventions and best practices.

## Prerequisites Check

Before proceeding, verify the following:

### 1. Check if `gh` CLI is installed

```bash
gh --version
```

If not installed, inform the user:
> The GitHub CLI (`gh`) is required but not installed. Please install it:
> - macOS: `brew install gh`
> - Other: https://cli.github.com/

### 2. Check if authenticated with GitHub

```bash
gh auth status
```

If not authenticated, guide the user to run `gh auth login`.

### 3. Verify clean working directory

```bash
git status
```

If there are uncommitted changes, ask the user whether to:
- Commit them as part of this PR
- Stash them temporarily
- Discard them (with caution)

## Gather Context

### 1. Identify the current branch

```bash
git branch --show-current
```

Ensure you're not on `main` or `master`. If so, ask the user to create or switch to a feature branch.

### 2. Find the base branch

```bash
git remote show origin | grep "HEAD branch"
```

This is typically `main` or `master`.

### 3. Analyze recent commits relevant to this PR

```bash
git log origin/main..HEAD --oneline --no-decorate
```

Review these commits to understand:
- What changes are being introduced
- The scope of the PR (single feature/fix or multiple changes)
- Whether commits should be squashed or reorganized

### 4. Review the diff

```bash
git diff origin/main..HEAD --stat
```

This shows which files changed and helps identify the type of change.

## Information Gathering

Before creating the PR, you need the following information. Check if it can be inferred from:
- Commit messages
- Branch name (e.g., `fix/issue-123`, `feature/new-login`)
- Changed files and their content

If any critical information is missing, use `ask_followup_question` to ask the user:

### Required Information

1. **Related Issue Number**: Look for patterns like `#123`, `fixes #123`, or `closes #123` in commit messages
2. **Description**: What problem does this solve? Why were these changes made?
3. **Type of Change**: Bug fix, new feature, breaking change, refactor, cosmetic, documentation, or workflow
4. **Test Procedure**: How was this tested? What could break?

### Example clarifying question

If the issue number is not found:
> I couldn't find a related issue number in the commit messages or branch name. What GitHub issue does this PR address? (Enter the issue number, e.g., "123" or "N/A" for small fixes)

## Git Best Practices

Before creating the PR, consider these best practices:

### Commit Hygiene

1. **Atomic commits**: Each commit should represent a single logical change
2. **Clear commit messages**: Follow conventional commit format when possible
3. **No merge commits**: Prefer rebasing over merging to keep history clean

### Branch Management

1. **Rebase on latest main** (if needed):
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Squash if appropriate**: If there are many small "WIP" commits, consider interactive rebase:
   ```bash
   git rebase -i origin/main
   ```
   Only suggest this if commits appear messy and the user is comfortable with rebasing.

### Push Changes

Ensure all commits are pushed:
```bash
git push origin HEAD
```

If the branch was rebased, you may need:
```bash
git push origin HEAD --force-with-lease
```

## Create the Pull Request

**IMPORTANT**: Read and use the PR template at `.github/pull_request_template.md`. The PR body format must **strictly match** the template structure. Do not deviate from the template format.

When filling out the template:
- Replace `#XXXX` with the actual issue number, or keep as `#XXXX` if no issue exists (for small fixes)
- Fill in all sections with relevant information gathered from commits and context
- Mark the appropriate "Type of Change" checkbox(es)
- Complete the "Pre-flight Checklist" items that apply

### Create PR with gh CLI

**Use a temporary file for the PR body** to avoid shell escaping issues, newline problems, and other command-line flakiness:

1. Write the PR body to a temporary file:
   ```
   /tmp/pr-body.md
   ```

2. Create the PR using the file:
   ```bash
   gh pr create --title "PR_TITLE" --body-file /tmp/pr-body.md --base main
   ```

3. Clean up the temporary file:
   ```bash
   rm /tmp/pr-body.md
   ```

For draft PRs:
```bash
gh pr create --title "PR_TITLE" --body-file /tmp/pr-body.md --base main --draft
```

**Why use a file?** Passing complex markdown with newlines, special characters, and checkboxes directly via `--body` is error-prone. The `--body-file` flag handles all content reliably.

## Post-Creation

After creating the PR:

1. **Display the PR URL** so the user can review it
2. **Remind about CI checks**: Tests and linting will run automatically
3. **Suggest next steps**:
   - Add reviewers if needed: `gh pr edit --add-reviewer USERNAME`
   - Add labels if needed: `gh pr edit --add-label "bug"`

## Error Handling

### Common Issues

1. **No commits ahead of main**: The branch has no changes to submit
   - Ask if the user meant to work on a different branch

2. **Branch not pushed**: Remote doesn't have the branch
   - Push the branch first: `git push -u origin HEAD`

3. **PR already exists**: A PR for this branch already exists
   - Show the existing PR: `gh pr view`
   - Ask if they want to update it instead

4. **Merge conflicts**: Branch conflicts with base
   - Guide user through resolving conflicts or rebasing

## Summary Checklist

Before finalizing, ensure:
- [ ] `gh` CLI is installed and authenticated
- [ ] Working directory is clean
- [ ] All commits are pushed
- [ ] Branch is up-to-date with base branch
- [ ] Related issue number is identified, or placeholder is used
- [ ] PR description follows the template exactly
- [ ] Appropriate type of change is selected
- [ ] Pre-flight checklist items are addressed

# AI Skills Matrix

Reusable skill modules for this repository. Select the minimal set required for each task.

---

## Skill Catalogue

### 1. Codebase Analysis

**Trigger:** Scoping new tasks, tracing bugs, understanding architecture, assessing impact.

**Approach:**
1. Start with high-signal entry points: `app/[locale]/page.tsx`, `content/profile.ts`, `components/portfolio-page.tsx`.
2. Trace the dependency chain before editing any file.
3. Identify all files that will be affected by the change.
4. Capture assumptions explicitly; verify them with file reads or commands.

**Output:** A dependency map and a clear statement of scope and risk.

---

### 2. Implementation & Refactoring

**Trigger:** Adding features, fixing bugs, improving code structure.

**Approach:**
1. Produce a minimal, targeted diff — avoid touching unrelated code.
2. Preserve all public behaviour unless the task explicitly changes it.
3. Prefer composition over inheritance; typed interfaces over implicit shapes.
4. Keep Server Components as the default; promote to Client only when required.
5. Update `content/profile.ts` for data changes; `messages/*.json` for copy changes.

**Output:** Changed files with a clear diff rationale and affected locale list.

---

### 3. Validation & QA

**Trigger:** Before handoff on any change.

**Proportional checks:**

| Change Scope | Minimum Validation |
|---|---|
| Copy / translation | `npm run lint` |
| UI component | `npm run lint && npm run build` |
| API route | `npm run lint && npm run build` |
| Config / env | `npm run build` + verify env var docs |
| Docker / infra | `docker build` + `docker-compose up` smoke test |

**Approach:**
- Report exact command output, not a summary.
- For UI changes, verify both LTR (`/en`) and RTL (`/ar`) visually.
- Validate edge cases: empty inputs, long strings, missing env vars.

**Output:** Command outputs and explicit pass/fail statement per check.

---

### 4. Security Review

**Trigger:** Any change touching API routes (`app/api/`), form logic (`lib/contact.ts`), authentication, or user input.

**Checklist:**
- [ ] Input is validated for type, length, and format before use.
- [ ] External data is treated as `unknown` until explicitly narrowed.
- [ ] Error responses are generic; internal details are server-logged only.
- [ ] No credentials or PII appear in code, comments, or logs.
- [ ] Rate limiting is preserved on `POST /api/contact`.
- [ ] ALTCHA verification is not bypassed or weakened.
- [ ] Security headers in `next.config.ts` are intact.

**Output:** Explicit confirmation of each checklist item, or a flagged risk with remediation.

---

### 5. Accessibility & i18n Review

**Trigger:** Any change to UI components, layout, or copy.

**Accessibility checklist:**
- [ ] Interactive elements have accessible labels (`aria-label`, `aria-labelledby`, or visible text).
- [ ] Keyboard navigation is preserved (focus order, visible focus rings).
- [ ] Colour contrast meets WCAG AA (4.5:1 for text).
- [ ] Images have meaningful `alt` text; decorative images have `alt=""`.
- [ ] `prefers-reduced-motion` is respected in animations.

**i18n checklist:**
- [ ] All new UI strings use `useTranslations()` — no hardcoded copy.
- [ ] New translation keys are added to **all 6** locale files: `en`, `ar`, `es`, `fr`, `hi`, `ml`.
- [ ] RTL layout is verified in `/ar` after any spacing or directional change.
- [ ] Logical CSS properties (`start`/`end`, `margin-inline-start`) used for directional spacing.

**Output:** Checklist completion status and any flagged issues.

---

### 6. Documentation Update

**Trigger:** Any change to public API behaviour, environment variables, configuration, or deployment steps.

**Scope:**
- `README.md` — update if API, env vars, scripts, or architecture changes.
- `.ai/instructions.md` — update if coding conventions or workflow changes.
- `public/openapi.yaml` — update if API endpoints or request/response shapes change.
- `public/llm.txt` / `public/llm.json` — update if significant project context changes.

**Output:** List of documentation files updated and a brief summary of what changed.

---

## Skill Selection Heuristic

```
For each task:

1. ALWAYS start with Codebase Analysis (skill 1).
2. Use Implementation (skill 2) for all code changes.
3. ALWAYS end with Validation (skill 3).
4. ADD Security Review (skill 4) if touching APIs, forms, or auth.
5. ADD Accessibility & i18n Review (skill 5) if touching UI or copy.
6. ADD Documentation Update (skill 6) if public behaviour changed.
```

---

## Output Contract

Every task response must include:

| Section | Content |
|---|---|
| **What changed** | Files modified and a brief description of each change |
| **Why this approach** | Rationale for the chosen solution over alternatives |
| **Validation evidence** | Command outputs or explicit justification for skipped checks |
| **Risks & follow-ups** | Any known limitations, deferred work, or recommended next steps |
