# Challenge Hub

Welcome to the Challenge Hub - your guide to all 16 core challenges and 5 bonus challenges.

The challenges are the practice path for the course. Each one asks you to do a small piece of real GitHub work, leave evidence of what you did, and then close the issue so the next challenge can open. The goal is not speed. The goal is to build a contributor rhythm you can trust: orient yourself, make the move, verify the result, and ask for help with clear facts when something feels off.

Prefer the exact issue-style flow? Open the consolidated issue walkthrough: [Issue-Style Challenge Walkthrough](../work.html).

## How Challenges Work

Start in your private Learning Room repository, not in the public curriculum repository. Open the **Issues** tab, find the challenge issue assigned to you, and read the issue body before acting. Each issue explains the task, the evidence prompt, and any buddy check or automated check that applies.

When a challenge asks for evidence, post it as a comment on that challenge issue. Evidence can be a link, a short reflection, the name of a branch, a pull request number, or a note about what you tried and what happened. After you post the evidence, close the challenge issue. The Student Progression Bot uses that closed issue as the signal to open the next challenge.

Every challenge below includes a reference solution. Treat those files as worked examples, not answer keys. Your exact branch name, issue number, wording, or file count may differ. What matters is whether you practiced the skill and can explain the result.

## Day 1: You Belong Here (Challenges 1-9)

<details>
<summary>Challenge 1: Find Your Way Around</summary>

**Chapters:** Ch02-04 | **Evidence:** Comment

This first challenge is about orientation. Before you edit anything, you learn how a repository is organized: where the Code tab lives, where Issues live, how the file tree behaves, and how the README gives a project its front door.

**What to do:**

- Find the Code tab and count the files or folders in the repository root
- Open the Issues tab and identify at least one issue or confirm the tab exists
- Navigate to `docs/welcome.md` and read the opening paragraph
- Find the repository description and the rendered README

**Evidence to post:** Describe what you found and name one navigation shortcut or screen reader technique that helped.

Compare your result with the [Challenge 1 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-01-scavenger-hunt.md) when you want a second view of the same exploration path.
</details>

<details>
<summary>Challenge 2: File Your First Issue</summary>

**Chapter:** Ch05 | **Evidence:** Comment

Issues are how maintainers turn observations into trackable work. In this challenge, you find a small TODO in the Learning Room and write an issue that another person could understand without being in the room with you.

**What to do:**

- Open `docs/welcome.md` and search for `TODO`
- Create a new issue with a specific title
- Explain what needs to change, where it is, and why the change would help

**Evidence to post:** Link to the issue you created and include one sentence about why your title is clear.

If you want to compare tone and structure, read the [Challenge 2 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-02-first-issue.md).
</details>

<details>
<summary>Challenge 3: Join the Conversation</summary>

**Chapter:** Ch05 | **Evidence:** Comment

Open source is conversation as much as code. This challenge teaches you how to participate in an issue thread with an @mention, a reaction, and a comment that moves the work forward.

**What to do:**

- Find your buddy's Challenge 2 issue or a facilitator-provided peer simulation issue
- Leave a meaningful comment with an @mention
- Add a reaction to the original issue or a helpful comment

**Evidence to post:** Link to your comment and describe what made it useful, kind, or specific.

The [Challenge 3 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-03-conversation.md) shows one way to make a short comment feel genuinely collaborative.
</details>

<details>
<summary>Challenge 4: Branch Out</summary>

**Chapter:** Ch06 | **Evidence:** Comment

A branch is a safe workspace. It lets you try a change without rewriting the main version of the project. In this challenge, you create your own branch and confirm that you know where your work will happen.

**What to do:**

- Find the branch selector on the Code tab
- Create a branch named `learn/YOUR-USERNAME` from `main`
- Confirm the branch selector now names your branch

**Evidence to post:** Write the branch name you created and how you confirmed you were on it.

Use the [Challenge 4 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-04-branch-out.md) if you want to check your branch mental model.
</details>

<details>
<summary>Challenge 5: Make Your Mark</summary>

**Chapter:** Ch06 | **Evidence:** Comment

This is your first small content change. You edit a file, replace a TODO with real text, and commit the change with a message that explains what happened.

**What to do:**

- Switch to your `learn/YOUR-USERNAME` branch
- Edit `docs/welcome.md` to replace the TODO with useful content
- Write a commit message that explains the change in plain language

**Evidence to post:** Share your commit message and the file you edited.

For a worked example of a focused commit, compare with the [Challenge 5 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-05-make-your-mark.md).
</details>

<details>
<summary>Challenge 6: Open Your First Pull Request</summary>

**Chapter:** Ch06 | **Evidence:** Comment

A pull request is the conversation around a proposed change. It lets others review your branch before it becomes part of `main`. This challenge connects your branch, your issue, and your explanation into one contribution.

**What to do:**

- Go to Pull requests > New pull request
- Set the base branch to `main` and the compare branch to `learn/YOUR-USERNAME`
- Write a clear title and include `Closes #XX` in the description

**Evidence to post:** Link to the pull request and name the issue it closes.

The [Challenge 6 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-06-first-pr.md) shows how the title, body, and closing keyword work together.
</details>

<details>
<summary>Challenge 7: Survive a Merge Conflict</summary>

**Chapter:** Ch07 | **Evidence:** Comment | **Autograded**

Merge conflicts happen when Git cannot safely combine two edits by itself. The point of this challenge is to read the conflict markers calmly, choose the final wording, delete the marker lines, and prove the file is clean.

**What to do:**

- Wait for the facilitator to trigger the conflict
- Find the marker lines: `<<<<<<<`, `=======`, and `>>>>>>>`
- Decide which content to keep, or combine both sides into one clear version
- Delete all marker lines and commit the resolution

**Evidence to post:** Explain which content you kept and why. The autograder checks that no conflict markers remain.

The [Challenge 7 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-07-merge-conflict.md) is useful if the marker structure still feels unfamiliar.
</details>

<details>
<summary>Challenge 8: The Culture Layer</summary>

**Chapter:** Ch08 | **Evidence:** Comment

Technical work lands better when the communication is respectful and specific. This reflection challenge asks you to name the collaboration habits you want to practice before you move deeper into reviews and capstone work.

**What to do:**

- Answer the reflection prompt in your challenge issue
- Add or recommend a label for an open issue, if the issue asks for triage practice
- Leave a comment explaining the reasoning behind your communication or triage choice

**Evidence to post:** Write three concrete collaboration behaviors you will use in the rest of the workshop.

The [Challenge 8 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-08-culture.md) gives examples of specific, actionable reflection language.
</details>

<details>
<summary>Challenge 9: Merge Day</summary>

**Chapter:** Ch10 | **Evidence:** Comment

Merge Day closes the Day 1 loop. You verify that your pull request is ready, merge it when approved, confirm the change landed on `main`, and notice how the linked issue closes.

**What to do:**

- Verify your PR has no conflicts and a meaningful commit message
- Merge your PR, or wait for a facilitator to approve and merge it
- Confirm your changes appear on the `main` branch
- Check that the linked issue closed automatically

**Evidence to post:** Share the merged PR link and the issue number that closed.

Before moving on, scan the [Challenge 9 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-09-merge-day.md) to make sure you caught both the merge and verification steps.
</details>

## Day 2: You Can Build This (Challenges 10-16)

<details>
<summary>Challenge 10: Go Local</summary>

**Chapters:** Ch11-14 | **Evidence:** Comment | **Autograded**

Day 2 moves the same contribution workflow onto your computer. You clone your own Learning Room repository, create a branch locally, edit `README.md`, commit, and push the branch back to GitHub.

**CLI best practices for this challenge:**

- Run `git status` before and after each step.
- Confirm branch context with `git branch --show-current`.
- Verify push destination with `git remote -v`.
- Use `gh pr create` only after confirming the branch and linked issue text.

**What to do:**

- Clone your own Learning Room repository (copy the HTTPS URL from the green **Code** button on its main page) with VS Code, GitHub Desktop, or the command line
- Create a branch named `fix/YOUR-USERNAME`
- Edit `README.md`
- Commit and push the branch to GitHub

**Evidence to post:** Share your branch name and a short note about how you confirmed the push reached GitHub. The autograder verifies a commit on a non-default branch.

The [Challenge 10 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-10-go-local.md) shows the local workflow as one complete loop.
</details>

<details>
<summary>Challenge 11: Open a Day 2 PR</summary>

**Chapters:** Ch14-15 | **Evidence:** Comment

This challenge proves that the pull request pattern is the same whether the edit started in the browser or on your computer. You push a local branch to your Learning Room repository, open a PR, and explain the change for reviewers.

**CLI best practices for this challenge:**

- Build the PR body in clear plain text first, including `Closes #XX`.
- Validate PR metadata after creation with `gh pr view`.
- Check review/check status with `gh pr checks` before requesting review.

**What to do:**

- Open a PR from `fix/YOUR-USERNAME` to `main`
- Write a title and description that describe your `README.md` change clearly
- Notice the familiar shape: branch, compare, title, body, submit

**Evidence to post:** Link to the PR and identify what changed between the branch and `main`.

Use the [Challenge 11 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-11-day2-pr.md) to compare the local-to-GitHub handoff.
</details>

<details>
<summary>Challenge 12: Review Like a Pro</summary>

**Chapter:** Ch15 | **Evidence:** Comment

Review is where a contribution becomes stronger. Your job is to read a classmate's pull request, leave comments that are specific and kind, and submit a review verdict that matches what you found.

**What to do:**

- Open your buddy's PR or a facilitator-provided peer simulation PR
- Go to Files changed and read the diff
- Leave at least two inline comments: one naming something effective and one suggesting an improvement
- Use Suggest changes for at least one comment, if the interface supports it
- Submit your review with Approve, Request changes, or Comment

**Evidence to post:** Link to the review or describe where you left your comments.

The [Challenge 12 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-12-review.md) models feedback that teaches without taking over the author's work.
</details>

<details>
<summary>Challenge 13: AI as Your Copilot</summary>

**Chapter:** Ch16 | **Evidence:** Comment

Copilot can help draft and improve, but you remain responsible for the final result. This challenge asks you to use Copilot as a collaborator, then evaluate what it suggested before accepting anything.

**What to do:**

- Ask Copilot to improve a documentation file
- Apply the trust, verify, reject framework to each suggestion
- Keep notes on what you accepted, modified, and rejected

**Evidence to post:** Share the prompt you used and one example of a suggestion you changed or rejected.

The [Challenge 13 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-13-copilot.md) shows how to document human judgment around AI output.
</details>

<details>
<summary>Challenge 14: Template Remix</summary>

**Chapter:** Ch17 | **Evidence:** Comment | **Autograded**

Issue templates help contributors give maintainers the information they need on the first try. In this challenge, you create a small YAML issue form and verify that it has the required fields.

**What to do:**

- Study `docs/samples/challenge-14-registration-remix-example.yml`
- Create a new YAML template in `.github/ISSUE_TEMPLATE/`
- Include `name`, `description`, `title`, and at least one form field
- Commit and push the template

**Evidence to post:** Link to the template change or PR. The autograder verifies that the YAML template exists and includes required metadata.

The [Challenge 14 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-14-template.md) can help you check both syntax and contributor usefulness.
</details>

<details>
<summary>Challenge 15: Meet the Agents</summary>

**Chapter:** Ch19 | **Evidence:** Comment

Accessibility agents are not magic helpers. They are structured instructions, responsibilities, and guardrails. This challenge asks you to inspect real agents before you build or improve one.

**What to do:**

- Browse the [Community Access Accessibility Agents repository](https://github.com/Community-Access/accessibility-agents)
- Find and name at least three different agents
- Run or inspect one agent and describe what happened
- Read one `.agent.md` file and identify its purpose and guardrails

**Evidence to post:** Name the agents you found and explain one guardrail that protects learners or users.

The [Challenge 15 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-15-agents.md) shows how to turn exploration into a useful agent note.
</details>

<details>
<summary>Challenge 16: Capstone Project</summary>

**Chapters:** Ch18, Ch20 | **Evidence:** Comment | **Autograded**

The capstone is where you choose a real repository and prepare an impactful agentic contribution. Accessibility Agents is the default path, GLOW is a strong document-accessibility path, and another project is valid when your contribution would genuinely help that repository. The important part is not a flashy idea. The important part is a clear purpose, useful responsibilities, and boundaries that keep the work safe and honest.

**What to do:**

1. Choose your target repository: [Accessibility Agents](https://github.com/Community-Access/accessibility-agents), [GLOW](https://github.com/Community-Access/glow), or another project you can explain.
2. Write a one-sentence mission statement for the contribution.
3. Create or improve an agent, prompt, instruction file, skill, workflow, or documentation page.
4. Include responsibilities and guardrails when the contribution involves an agent or automation.
5. Push and open a pull request, or prepare a review-ready branch, issue, or contribution plan if you do not have access.
6. Review a classmate's capstone PR when one is available.

Use the [agent file template](https://github.com/Community-Access/git-going-with-github/blob/main/learning-room/docs/samples/agent-file-template.md) and [fork workflow checklist](https://github.com/Community-Access/git-going-with-github/blob/main/learning-room/docs/samples/fork-workflow-checklist.md) for structure.

**Evidence to post:** Link to your capstone PR, branch, draft issue, or contribution plan. Include the repository you chose, the mission statement, what you changed or proposed, how you tested it, and the responsibilities and guardrails that make it safe.

The [Challenge 16 solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-16-capstone.md) shows a complete agent example with responsibilities and guardrails.
</details>

## Bonus Challenges

Bonus challenges are optional. They unlock immediately after Challenge 15, at the same time as Challenge 16. Students can choose bonus work, capstone work, or both based on time, interest, and facilitator guidance.

<details>
<summary>Bonus A: Improve an Existing Agent</summary>

Choose an existing agent, identify a focused improvement, and open a PR that explains why the change matters.

Compare your plan with the [Bonus A solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-bonus-a.md).
</details>

<details>
<summary>Bonus B: Document Your Journey</summary>

Write a structured reflection about what you learned, what surprised you, and what you want to keep practicing. Use accessible Markdown so another person can read it comfortably.

The [Bonus B solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-bonus-b.md) offers a reflection structure if you need a starting shape.
</details>

<details>
<summary>Bonus C: Create a Group Challenge</summary>

Design a collaborative challenge for 3-5 students. A good group challenge names the shared goal, the separate roles, the evidence, and how the group knows it is finished.

Review the [Bonus C solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-bonus-c.md) for one way to describe group work clearly.
</details>

<details>
<summary>Bonus D: Notification Mastery</summary>

Configure GitHub notifications so you can find mentions, reviews, and assignments without drowning in every update.

The [Bonus D solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-bonus-d.md) shows how to describe a personal notification strategy.
</details>

<details>
<summary>Bonus E: Explore Git History Visually</summary>

Use GitHub Desktop or GitHub.com to explore repository history. The goal is to explain what changed over time, not merely to find a graph or timeline.

The [Bonus E solution reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/solution-bonus-e.md) walks through one history-reading approach.
</details>

## Skills-Inspired Optional Scenarios

For advanced students who finish early, use the curated optional scenarios in [Learning Room skills bonus scenarios](https://github.com/Community-Access/git-going-with-github/blob/main/learning-room/docs/skills-bonus-scenarios.md).

These scenarios adapt selected GitHub Skills exercises into this workshop environment without changing the official 21-challenge progression.

## If You Get Stuck

Every challenge issue includes an "If you get stuck" section with common problems and recovery paths. Start there, then use these supports:

- Ask your buddy for help
- Ask your facilitator
- Read the relevant chapter in the [Git Going with GitHub curriculum](https://github.com/Community-Access/git-going-with-github/tree/main/docs)
- Check the [solution reference directory](https://github.com/Community-Access/git-going-with-github/tree/main/docs/solutions)
- Use the [Learning Room solutions index](https://github.com/Community-Access/git-going-with-github/blob/main/docs/solutions/) for quick challenge-by-challenge references

When you ask for help, include what you were trying to do, where you were in the repository, what happened, and what you expected. That gives your buddy, facilitator, or bot enough context to help you quickly.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)
- [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
- [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [About issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)
- [Contributing to a project](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **How Challenges Work:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Day 1: You Belong Here (Challenges 1-9):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Day 2: You Can Build This (Challenges 10-16):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Bonus Challenges:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Skills-Inspired Optional Scenarios:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **If You Get Stuck:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
