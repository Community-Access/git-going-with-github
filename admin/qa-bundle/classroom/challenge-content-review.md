# Challenge Content Review

This document contains the complete set of instructions for all 9 challenges.
It has been written to prioritize accessibility, inclusive language, and clear progression. Visual dependencies (like "green button"), sensory verbs (like "see" or "look at"), and mouse-specific actions (like "click") have been replaced with inclusive terminology ("activate", "select", "navigate", "verify").

You can review, edit, and refine the content here. Once finalized, Challenge 1 should be pre-created in the template repository, and Challenges 2-9 will be updated in the `student-progression.yml` bot.

---

## Challenge 1: Find Your Way Around (Initial State)

*(Note: This issue will be pre-created in the `learning-room-template` repository so it is waiting for the student when they arrive).*

**Title:** Challenge 1: Find Your Way Around

**Body:**
**Welcome to Git Going with GitHub!**

We are thrilled to have you here. This repository is your safe, private learning environment for Day 1. Let's start by getting comfortable with your surroundings.

**Your Goal:**
Explore the main areas of a GitHub repository and locate where the files live.

**Step-by-Step:**

<details>
<summary><b>Web Browser</b></summary>

1. Navigate to the **Code** tab (usually the first tab near the top of the repository page). This is where all the files for a project live.
2. Review the list of files and folders provided in the repository.
3. Locate the `README.md` file. In most projects, this file automatically displays at the bottom of the Code tab to provide a welcome message and instructions.

</details>

<details>
<summary><b>Visual Studio Code</b></summary>

1. Ensure you have cloned the repository (see [Pre-Workshop Setup](../docs/00-pre-workshop-setup.md)).
2. Open the repository folder in VS Code.
3. Open the **Explorer** view (`Ctrl+Shift+E` or `Cmd+Shift+E` on Mac). This is where all the files for a project live.
4. Review the file list in the sidebar. Use the arrow keys to navigate and expand folders.
5. Select the `README.md` file to open it in the editor.

</details>

<details>
<summary><b>Command Line (GitHub CLI)</b></summary>

1. Ensure you have `gh` installed and authenticated.
2. Clone the repository: `gh repo clone [your-repo-name]`.
3. Navigate into the folder: `cd [your-repo-name]`.
4. List the files in the directory: `ls` (macOS/Linux/PowerShell) or `dir` (Windows).
5. View the contents of the README: `gh repo view --readme` or `cat README.md`.

</details>

**Expected Outcome:**
You have familiarized yourself with the repository layout and understand where to locate project files.

**Troubleshooting (If you get stuck):**

- **Feel lost?** Use your browser's "Go Back" function or select the repository name at the top left to return to the main page.
-**Need more context?** Review [Chapter 2: Understanding GitHub](https://github.com/Community-Access/git-going-with-github/blob/main/docs/02-understanding-github.md).

**To Unlock Challenge 2:**
To complete this step, leave a comment below saying "Hello World!" and then activate the **Close issue** button at the bottom of this page. Our Student Progression Bot will instantly open your next challenge!

---

## Challenge 2: File Your First Issue

**Title:** Challenge 2: File Your First Issue

**Body:**
**Magical! You have completed Challenge 1!**

Welcome to your next step in the journey. Now that you have navigated the repository, it is time to practice communicating with your team using GitHub Issues. Issues are like a shared to-do list where teams discuss ideas, bugs, and tasks.

**Your Goal:**
File a new issue describing something you noticed in the repository. It can be a typo, an idea for improvement, or just a friendly greeting!

**Step-by-Step:**

<details>
<summary><b>Web Browser</b></summary>

1. Navigate to the **Issues** tab near the top of your repository page.
2. Select the **New issue** button.
3. If a template picker appears, choose the matching template by selecting **Get started**, or select **Open a blank issue** if no template fits.
4. Provide a clear and descriptive **Title** for your issue (e.g., "Idea: Add a welcome banner").
5. In the comment body field, write a sentence or two explaining your thought.
6. Create the issue by selecting the **Submit new issue** button.

</details>

<details>
<summary><b>Visual Studio Code</b></summary>

1. Open the **GitHub Pull Requests and Issues** view from the Activity Bar, or open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).
2. Open the issue creation form by selecting the `+` button in the **Issues** view, or run **GitHub Issues: Create Issue** from the Command Palette.
3. Choose the current repository if prompted.
4. Enter a descriptive title in the prompt bar.
5. For the description, a scratchpad file will open. Type your thought there and save it to submit.

</details>

<details>
<summary><b>Command Line (GitHub CLI)</b></summary>

1. Run the interactive issue creator: `gh issue create`.
2. Follow the prompts:
   -**What would you like to do?**: Choose **"Create a new issue"**.
   -**Title**: Enter a clear title (e.g., "Idea: Add a welcome banner").
   -**Body**: Select **"Write with editor"** or **"Input text"** and type your sentence.
   -**What's next?**: Select **"Submit"**.

</details>

**Expected Outcome:**
The page will update to display your newly created issue with a unique number (like `#2`). Take a deep breath - you just started a conversation in open source!

**Troubleshooting (If you get stuck):**

- **Cannot find the New Issue button?** Ensure you are in the "Issues" tab, rather than Pull Requests or Actions.
-**Unsure what to write?** Simply type "Hello World! This is my first issue."
-**Need more context?** Review [Chapter 5: Working with Issues](https://github.com/Community-Access/git-going-with-github/blob/main/docs/05-working-with-issues.md).

**To Unlock Challenge 3:**
When you are finished, return to **this** issue (Challenge 2) and activate the **Close issue** button at the bottom of the page. The bot will automatically unlock your next adventure!

---

## Challenge 3: Join the Conversation

**Title:** Challenge 3: Join the Conversation

**Body:**
**Excellent work! Challenge 2 is complete.**

Communication in open source is all about collaboration. Sometimes you need to draw someone's attention to a specific issue. We accomplish this using `@mentions`.

**Your Goal:**
Mention Gandalf, your Workshop Agent, in a comment to ask for a workspace check.

**Step-by-Step:**

<details>
<summary><b>Web Browser</b></summary>

1. Navigate to the **Issues** tab and select an open issue.
2. Navigate to the "Leave a comment" text area at the bottom of the issue thread.
3. Type the `@` symbol followed by the handle `aria-bot`. A menu should appear to help you select a name.
4. Add a friendly message like, "@gandalf-bot could you please check my work?"
5. Send your comment by selecting the **Comment** button.

</details>

<details>
<summary><b>Visual Studio Code</b></summary>

1. Open the **GitHub Issues** panel.
2. Use the arrow keys to choose your open issue from the list.
3. In the issue's **Comment** text area, type `@gandalf-bot`. VS Code will often provide suggestions for you.
4. Add your message: "@gandalf-bot could you please check my work?"
5. Send your comment by selecting the **Comment** button or using `Ctrl+Enter` (`Cmd+Enter` on Mac).

</details>

<details>
<summary><b>Command Line (GitHub CLI)</b></summary>

1. Identify the issue number you want to comment on: `gh issue list`.
2. Run the command to add a comment: `gh issue comment [issue-number] --body "@gandalf-bot could you please check my work?"`.
3. Verify your comment was posted: `gh issue view [issue-number] --comments`.

</details>

**Expected Outcome:**
Your comment will appear in the issue history, and Gandalf will receive a notification to review your progress.

**Troubleshooting:**

- **The menu did not appear?** Gandalf might be busy! Just type `@gandalf-bot` manually and post the comment.
-**Want more details?** Review [Chapter 5: Working with Issues](https://github.com/Community-Access/git-going-with-github/blob/main/docs/05-working-with-issues.md).

**To Unlock Challenge 4:**
Post a link to your comment (or the issue you commented on) right here, and then activate **Close issue**. Your next task awaits!

---

## Challenge 4: Branch Out

**Title:** Challenge 4: Branch Out

**Body:**
**You are a communication pro! Let us get into the code.**

In Git, a "branch" is a safe space to work on your ideas without affecting the main project. Think of it as a parallel universe where you can experiment! Gandalf is watching for new branches to help you along.

**Your Goal:**
Create a feature branch where you can safely make changes.

**Step-by-Step:**

<details>
<summary><b>Web Browser</b></summary>

1. Navigate to the **Code** tab.
2. Locate the branch selector button (it currently indicates**main**).
3. Access the dropdown and type a new name for your branch in the search box (e.g., `feature/my-first-edit`).
4. Select the option that says **Create branch: [your-branch-name] from 'main'**.

</details>

<details>
<summary><b>Visual Studio Code</b></summary>

1. Open the **Source Control** view (`Ctrl+Shift+G` or `Cmd+Shift+G` on Mac).
2. Use the arrow keys to focus the **Branch Name** indicator in the Status Bar (bottom left) or open the **More Actions (...)** menu.
3. Choose **Branch** ->**Create Branch...**.
4. Type your branch name: `feature/my-first-edit`.

</details>

<details>
<summary><b>Command Line (Git)</b></summary>

1. Create a new branch: `git checkout -b feature/my-first-edit`.
2. Confirm you are on the new branch: `git branch`.
3. Inform GitHub of your choice: `git push -u origin feature/my-first-edit`.

</details>

**Expected Outcome:**
The page will refresh, and the branch selector will now display your new branch name instead of `main`. Gandalf will detect your new branch and is ready for your first commit!

**Troubleshooting:**

- **Forgot the name?** Don't worry, Gandalf can see all your branches.
-**Branch name invalid?** Branch names cannot contain spaces. Use hyphens or underscores instead!
-**Need more guidance?** Review [Chapter 4: The Learning Room](https://github.com/Community-Access/git-going-with-github/blob/main/docs/04-the-learning-room.md).

**To Unlock Challenge 5:**
Reply to this issue with your new branch name, and then activate **Close issue**!

---

## Challenge 5: Make Your Mark

**Title:** Challenge 5: Make Your Mark

**Body:**
**Branch created! You are ready to make your mark.**

Now that you have a safe branch, it is time to edit a file and save your changes. Saving changes in Git is called making a "commit." Gandalf can help review your commit messages for clarity!

**Your Goal:**
Edit a file in your repository and make a commit with a clear message. Ask Gandalf for feedback of your message!

**Step-by-Step:**

<details>
<summary><b>Web Browser</b></summary>

1. Verify you are on the branch you just created (check the branch selector).
2. Select a file you wish to edit (for example, the `README.md` file).
3. Access the **Edit this file** button (pencil icon) to enter the editor.
4. Make a small text change - add your name, fix a typo, or add a greeting.
5. Provide a short, descriptive commit message in the summary box (e.g., "Add my name to the README").
6. Save your changes by selecting the **Commit changes** button.

</details>

<details>
<summary><b>Visual Studio Code</b></summary>

1. Verify you are on the new branch (check the Status Bar).
2. Open the `README.md` file (or another of your choice) from the Explorer.
3. Make a change in the editor and save the file (`Ctrl+S` or `Cmd+S` on Mac).
4. Stage your changes (this prepares them for your commit): Use the **Source Control** view (`Ctrl+Shift+G` or `Cmd+Shift+G` on Mac). Use the arrow keys to focus your file and select the **Stage Changes** icon (plus sign), or use the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and search for **"Git: Stage Changes"**.
5. Type your commit message in the message field (e.g., "Add my name to the README").
6. Finalize your commit: Select the **Commit** button, use `Ctrl+Enter` (`Cmd+Enter` on Mac), or use the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and search for **"Git: Commit"**.
7. Send your work to GitHub: Select the **Sync Changes** or **Publish Branch** button in the Source Control view, or use the Command Palette and search for **"Git: Push"**.

</details>

<details>
<summary><b>Command Line (Git)</b></summary>

1. Open your text editor and make a change to a file.
2. Stage the file for your commit: `git add README.md`.
3. Create your commit: `git commit -m "Add my name to the README"`.
4. Send your changes to GitHub: `git push`.

</details>

**Expected Outcome:**
Your changes are securely saved! If you want feedback on your message, mention `@gandalf-bot` in your next comment.

**Troubleshooting:**

- **Accidentally saved to the wrong branch?** Ask Gandalf or a facilitator for help.
-**Want to read more?** [Chapter 4: The Learning Room](https://github.com/Community-Access/git-going-with-github/blob/main/docs/04-the-learning-room.md).

**To Unlock Challenge 6:**
Leave a comment here saying "Committed!" and then activate **Close issue** to move on!

---

## Challenge 6: Your First Pull Request

**Title:** Challenge 6: Your First Pull Request

**Body:**
**Changes securely committed! Time to share them with the world.**

A Pull Request (PR) is how you ask to merge your work. Gandalf will perform an automated "Gandalf Review" as soon as you open it!

**Your Goal:**
Open a Pull Request and let Gandalf run her first set of automated accessibility checks.

**Step-by-Step:**

<details>
<summary><b>Web Browser</b></summary>

1. Navigate to the **Pull requests** tab and choose **New pull request**.
2. Ensure the *base* branch is `main` and *compare* is your feature branch.
3. Choose **Create pull request** and give it a descriptive title.
4. In the description field, type `Closes #1` (or your issue number).
5. Select **Create pull request** to submit.

</details>

<details>
<summary><b>Visual Studio Code</b></summary>

1. Open the **GitHub Pull Requests and Issues** view from the Activity Bar, or open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).
2. Run **GitHub Pull Requests: Create Pull Request**, or select the **Create Pull Request** button in the Pull Requests view.
3. Choose the **Compare Branch** (e.g., `feature/my-first-edit`) and the **Base Branch** (`main`).
4. Type your PR title (e.g., "Add my name to the README").
5. In the description field, include `Closes #1` to link it to your issue.
6. Select **Create** or use the keyboard shortcut announced by the create view.

</details>

<details>
<summary><b>Command Line (GitHub CLI)</b></summary>

1. Run the interactive PR creator: `gh pr create`.
2. Follow the prompts:
   -**Title**: Enter a clear title (e.g., "Add my name to the README").
   -**Body**: Select **"Write with editor"** and include `Closes #1` in your description.
   -**What's next?**: Select **"Submit"**.

</details>

**Expected Outcome:**
Your PR is live! Within seconds, look for a comment from **Gandalf the Workshop Agent**. Gandalf will provide a "Validation Report" on your changes.

**Troubleshooting:**

- **Gandalf didn't respond?** Check the "Checks" tab at the top of the PR to see if her automation is running.
-**Validation failed?** Read Gandalf's report! She usually provides specific tips on how to fix accessibility issues.
-**Learn more about PRs:** [Chapter 6: Working with Pull Requests](https://github.com/Community-Access/git-going-with-github/blob/main/docs/06-working-with-pull-requests.md).

**To Unlock Challenge 7:**
Post a link to your Pull Request right here, then activate **Close issue**!

---

## Challenge 7: Resolve a Merge Conflict

**Title:** Challenge 7: Resolve a Merge Conflict

**Body:**
**Pull Request successfully opened! You are doing amazing.**

Sometimes, two people edit the same line. This is a "Merge Conflict." Gandalf is an expert at explaining these - just ask her if you get stuck!

**Your Goal:**
Resolve a conflict if one appears, or ask Gandalf to explain how conflicts work.

**Step-by-Step:**

<details>
<summary><b>Web Browser</b></summary>

1. If your PR has a conflict, select the **Resolve conflicts** button.
2. Look for the markers: `<<<<<<<`, `=======`, and `>>>>>>>`.
3. Edit the text to your preferred version and remove the markers.
4. Finalize the resolution by selecting **Mark as resolved** and **Commit merge**.

</details>

<details>
<summary><b>Visual Studio Code</b></summary>

1. Open the **Source Control** view (`Ctrl+Shift+G` or `Cmd+Shift+G` on Mac).
2. If there's a conflict, the file will be listed under **Merge Changes**. Use the arrow keys to focus the file and open it in the editor.
3. Use the visual "Resolve in Merge Editor" or use the code actions (e.g., "Accept Current Change", "Accept Incoming Change") at the top of the conflict block.
4. Save the file and select the **Stage Changes** icon (plus sign) next to it to stage the resolution.
5. Select **Commit** to finish the merge.

</details>

<details>
<summary><b>Command Line (Git)</b></summary>

1. Identify the files with conflicts: `git status`.
2. Open the file in your preferred text editor.
3. Manually remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) and keep the version you want.
4. Save the file.
5. Stage the resolved file: `git add [file-name]`.
6. Finalize the merge: `git commit`.

</details>

**Not sure what to do?** Drop a comment: `@gandalf-bot I have a merge conflict, can you explain this?`

**Expected Outcome:**
The conflict warning will disappear. If you asked Gandalf for help, she'll reply with a step-by-step guide to conflict resolution.

**Troubleshooting:**

- **No conflict?** You're lucky! But still ask Gandalf: `@gandalf-bot explain merge conflict` to learn for next time.
-**Need a deep dive?** Read [Chapter 7: Merge Conflicts](https://github.com/Community-Access/git-going-with-github/blob/main/docs/07-merge-conflicts.md).

**To Unlock Challenge 8:**
Leave a comment here explaining how Gandalf helped you understand conflicts, then activate **Close issue**!

---

## Challenge 8: Open Source Culture

**Title:** Challenge 8: Open Source Culture

**Body:**
**Conflicts handled! You are unstoppable.**

Writing code is only a small part of open source. The rest relies on communication, empathy, and culture. We want to build an environment where everyone feels they belong.

**Your Goal:**
Reflect on community norms, healthy collaboration, and inclusive contribution practices.

**Step-by-Step:**

1. Take a few minutes to review [Chapter 8: Open Source Culture](https://github.com/Community-Access/git-going-with-github/blob/main/docs/08-open-source-culture.md).
2. Consider a time a project or group made you feel welcomed, or what you would do to make others feel welcome.
3. Write a short reflection about how good communication impacts software development teams.

**Expected Outcome:**
A stronger appreciation for the humans behind the screens, and an understanding of how tone in PRs and reviews makes all the difference.

**Troubleshooting:**

- **Unsure what to write?** Just share one sentence about what "assuming best intent" means to you.
-**Feeling stuck?** Discuss it with your buddy!

**To Unlock Challenge 9:**
Record your reflection as a comment right here, and then activate **Close issue**. The final step is next!

---

## Challenge 9: Merge Day

**Title:** Challenge 9: Merge Day

**Body:**
**Thank you for taking the time to reflect! We are in the home stretch.**

You have communicated, branched, committed, and resolved. Now it is the moment of truth. It is time to merge your changes into the main project!

**Your Goal:**
Get your Pull Request reviewed, approved, and merged! Gandalf will be cheering you on at the finish line.

**Step-by-Step:**

<details>
<summary><b>Web Browser</b></summary>

1. Navigate back to your Pull Request.
2. Ask your buddy or a facilitator to review your PR. You can also mention `@gandalf-bot` to let her know you're ready!
3. Once approved, select the **Merge pull request** button.
4. Finalize the merge by selecting **Confirm merge**.
5. Optional but recommended: Select the option to **Delete branch** to keep your repository organized.

</details>

<details>
<summary><b>Visual Studio Code</b></summary>

1. Open the **Pull Requests** view.
2. Use the arrow keys to choose your PR from the list.
3. Open the **More Actions (...)** menu or select the **Merge** button at the top of the PR overview.
4. Choose the merge strategy (e.g.,**Create Merge Commit** or **Squash and Merge**).
5. Finalize the merge by selecting **Confirm Merge**.
6. Select **Delete Branch** if prompted to keep the repository clean.

</details>

<details>
<summary><b>Command Line (GitHub CLI)</b></summary>

1. Identify your PR number or use the current branch: `gh pr list`.
2. Run the merge command: `gh pr merge [pr-number]`.
3. Select your merge strategy when prompted (e.g.,**Merge commit**).
4. Choose **Yes** when asked if you want to delete the local and remote branches.

</details>

**Expected Outcome:**
Your Pull Request will display a "Merged" status indicator. Gandalf might leave a final celebratory comment on your repository!

**Troubleshooting:**

- **The merge button is disabled?** Gandalf or other automated checks might still be running. Wait for the green checkmarks!
-**Want to know more about wrapping up?** Check out [Chapter 10: Notifications and Day 1 Close](https://github.com/Community-Access/git-going-with-github/blob/main/docs/10-notifications-and-day-1-close.md).

**To Finish Day 1:**
Leave a comment here saying "MERGED!" and then activate **Close issue**.

**Congratulations!** Gandalf is proud of you. You have completely finished Day 1. Rest, hydrate, and prepare for a fantastic Day 2!

---

## Day 2: You Can Build This

---

## Challenge 10: Go Local

**Title:** Challenge 10: Go Local

**Body:**
**Welcome Back! Day 2 begins now.**

Day 2 moves from the browser to your local machine. We are introducing real-world development workflows using Git!

**Your Goal:**
Clone your repository to your local machine, create a branch, make a change, and push it back up to GitHub.

**Step-by-Step:**

<details>
<summary><b>Visual Studio Code</b></summary>

1. Copy the repository URL (from the **Code** button on GitHub).
2. Open VS Code and open the **Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).
3. Search for **"Git: Clone"** and choose it.
4. Paste the URL and choose a folder on your computer. Select **Open** in the new window.
5. Create a new branch: Use the arrow keys to focus the branch name in the Status Bar (bottom left) or use the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and search for **"Git: Create Branch..."**.
6. Edit a file, save it (`Ctrl+S` or `Cmd+S` on Mac), and open the **Source Control** view (`Ctrl+Shift+G` or `Cmd+Shift+G` on Mac).
7. Stage your changes: Use the arrow keys to focus your file and select the **Stage Changes** icon (plus sign), type a message, and select **Commit** (`Ctrl+Enter` or `Cmd+Enter` on Mac).
8. Choose **Publish Branch** to send it to GitHub.

</details>

<details>
<summary><b>Command Line (Git & CLI)</b></summary>

1. Clone the repository: `gh repo clone [your-repo-name]`.
2. Navigate into the folder: `cd [your-repo-name]`.
3. Create a new branch: `git checkout -b feature/day2-local-edit`.
4. Edit a file with your favorite terminal editor or VS Code: `code README.md`.
5. Stage and commit your changes: `git add .` then `git commit -m "My first local edit"`.
6. Push the branch to GitHub: `git push -u origin feature/day2-local-edit`.

</details>

<details>
<summary><b>GitHub Desktop</b></summary>

1. Copy the repository URL and select **File** ->**Clone repository...** in GitHub Desktop.
2. Select the **URL** tab, paste the link, and choose your local path. Select **Clone**.
3. Select the **Current Branch** menu and choose **New Branch** -> name it `feature/day2-local-edit`.
4. Open the file in your preferred editor, make a change, and save.
5. Return to GitHub Desktop. Your changes will be listed on the left.
6. Provide a summary in the bottom-left box and select **Commit to [branch-name]**.
7. Select **Publish branch** at the top.

</details>

**Expected Outcome:**
Your changes made on your computer are securely backed up on GitHub. You will be able to see your new branch listed in the repository's branch selector on the website.

**Troubleshooting:**

- **Having trouble cloning?** Ensure you copied the correct HTTPS or SSH URL from the repository.
-**Push rejected?** Make sure you committed your changes first.
-**Need a walkthrough?** Review [Chapter 14: Git in Practice](https://github.com/Community-Access/git-going-with-github/blob/main/docs/14-git-in-practice.md).

**To Unlock Challenge 11:**
Reply to this issue with a joyful message that you pushed your code, and then activate **Close issue**!

---

## Challenge 11: Day 2 Pull Request

**Title:** Challenge 11: Day 2 Pull Request

**Body:**
**Excellent work connecting your local environment!**

Now that your local branch is safely on GitHub, it is time to propose merging those changes into the main project. Gandalf will be waiting to validate your work!

**Your Goal:**
Open a Pull Request from your local branch and wait for Gandalf's automated validation report.

**Step-by-Step:**

<details>
<summary><b>Web Browser</b></summary>

1. Navigate to the **Pull requests** tab and choose **New pull request**.
2. Choose `main` as the base and your new branch as the compare.
3. Choose **Create pull request**, give it a title, and summarize your changes.
4. Submit the Pull Request!

</details>

<details>
<summary><b>Visual Studio Code</b></summary>

1. Open the **GitHub Pull Requests and Issues** view from the Activity Bar, or open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).
2. Run **GitHub Pull Requests: Create Pull Request**, or select the **Create Pull Request** button in the Pull Requests view.
3. Choose the **Compare Branch** (e.g., `feature/day2-local-edit`) and the **Base Branch** (`main`).
4. Type your PR title (e.g., "Day 2 local edit").
5. In the description field, type a sentence or two summarizing your change.
6. Select **Create** or use the keyboard shortcut announced by the create view.

</details>

<details>
<summary><b>Command Line (GitHub CLI)</b></summary>

1. Run the interactive PR creator: `gh pr create`.
2. Follow the prompts:
   -**Title**: Enter a clear title (e.g., "Day 2 local edit").
   -**Body**: Select **"Write with editor"** and summarize your changes.
   -**What's next?**: Select **"Submit"**.

</details>

**Expected Outcome:**
Your Pull Request is live! Gandalf will run the automated checks and post a validation report right in the conversation.

**Troubleshooting:**

- **Cannot find your branch?** Verify that the "push" command completed successfully locally.
-**Gandalf is silent?** Check the "Checks" tab to see if the workflow is running.
Post a link to your new Pull Request right here, then activate **Close issue**!

---

## Challenge 12: Code Review

**Title:** Challenge 12: Code Review

**Body:**
**You are doing fantastic! Let's examine peer feedback.**

Reviewing code is where the most learning happens in open source. It is about asking questions, offering suggestions, and assuming best intent.

**Your Goal:**
Review a classmate's Pull Request and provide specific, constructive feedback. Gandalf will celebrate your collaborative spirit!

**Step-by-Step:**

<details>
<summary><b>Web Browser</b></summary>

1. Find your buddy's repository or use a sample PR provided by your facilitator.
2. Select the Pull Request and navigate to the **Files changed** tab.
3. Access a specific line of code and choose the **Add Comment** button.
4. Write a supportive, constructive comment or ask a question.
5. Create your review by selecting **Start a review** and then submitting it!

</details>

<details>
<summary><b>Visual Studio Code</b></summary>

1. Open the **GitHub Pull Requests and Issues** view and choose the PR you want to review.
2. Choose the file in the PR tree to open a diff view (your changes vs. the teammate's).
3. Select an area near the line number in the diff to open a comment box.
4. Write your constructive comment and select **Add Comment** or use `Ctrl+Enter`.
5. When finished, select the **Finish Review** (check icon) at the top of the PR view.

</details>

<details>
<summary><b>Command Line (GitHub CLI)</b></summary>

1. Identify the PR number: `gh pr list`.
2. View the changes: `gh pr diff [pr-number]`.
3. Provide a review summary: `gh pr review [pr-number] --comment --body "Excellent work! I appreciated the clarity of your code."`.
4. (Advanced) Add inline comments using the `--comment --body` along with specific line numbers in your review.

</details>

**Expected Outcome:**
Your feedback appears on their PR! Gandalf will post a celebration message once your review is approved.

**Troubleshooting:**

- **No classmate PRs to review?** Ask a facilitator for a sample PR to practice on.
-**Want to learn how to frame feedback?** Review [Chapter 15: Code Review](https://github.com/Community-Access/git-going-with-github/blob/main/docs/15-code-review.md).

**To Unlock Challenge 13:**
Leave a comment here confirming you left a review, and then activate **Close issue**!

---

## Challenge 13: Copilot as Collaborator

**Title:** Challenge 13: Copilot as Collaborator

**Body:**
**Time to introduce AI into your workflow!**

GitHub Copilot is your AI pair programmer - much like Gandalf, it’s here to help you build great things. Today, we’ll use it to improve documentation.

**Your Goal:**
Use GitHub Copilot to suggest improvements and have Gandalf review the result!

**Step-by-Step:**

<details>
<summary><b>Visual Studio Code (Primary Method)</b></summary>

1. Open your workspace folder (`Ctrl+Shift+E` or `Cmd+Shift+E` on Mac).
2. Select a file you want to improve (e.g., `README.md` or a sample code file).
3. Type `Ctrl+I` (`Cmd+I` on Mac) to open the **Copilot Inline Chat**.
4. Ask Copilot to improve the clarity or structure: "Rewrite this README section to be more inclusive and descriptive."
5. Accept the suggestion by selecting **Accept** or `Ctrl+Enter` (`Cmd+Enter` on Mac).
6. Mention `@gandalf-bot` in your commit message or a PR comment to have her audit the change!

</details>

<details>
<summary><b>Web Browser (Copilot in the Browser)</b></summary>

1. Navigate to the file you want to edit.
2. Access the **Edit this file** control. In the current GitHub UI, this may be under the edit button or a **More edit options** menu.
3. If a **Copilot** or **Copilot actions** button appears in the editor toolbar, activate it. If it does not appear for your account, use the Visual Studio Code primary method above.
4. Input your prompt: "Suggest improvements to make this file more welcoming for new contributors."
5. Review and **Insert** the suggestion.

</details>

<details>
<summary><b>Command Line (GitHub CLI with Copilot)</b></summary>

1. Ensure you have the Copilot CLI extension installed (`gh extension install github/gh-copilot`).
2. Use Copilot to help with commands: `gh copilot suggest "How do I create an issue with multiple labels?"`.
3. Use Copilot to explain what a command does: `gh copilot explain "git merge --squash"`.

</details>

**Expected Outcome:**
You have successfully utilized AI to enhance your output while staying the "human-in-the-loop."

**Troubleshooting:**

- **Copilot not responding?** Ensure you are signed into GitHub in VS Code.
-**Want prompt ideas?** Review [Chapter 16: GitHub Copilot](https://github.com/Community-Access/git-going-with-github/blob/main/docs/16-github-copilot.md).

**To Unlock Challenge 14:**
Share what prompt you used here, then activate **Close issue**!

---

## Challenge 14: Design an Issue Template

**Title:** Challenge 14: Design an Issue Template

**Body:**
**Templates make everyone's life easier!**

Projects use Issue Templates to ensure contributors provide the right information from the start. Let's build a custom one using YAML.

**Your Goal:**
Create a custom YAML issue template in your repository.

**Step-by-Step:**

<details>
<summary><b>Web Browser</b></summary>

1. In your repository, navigate to the `.github/ISSUE_TEMPLATE` directory. (If it doesn't exist, create it by choosing **Add file** ->**Create new file** and typing the full path).
2. Name your new file `custom-template.yml`.
3. Add the required YAML frontmatter (like `name`, `description`, and `title`).
4. Commit your new file directly to a new branch and open a Pull Request.

</details>

<details>
<summary><b>Visual Studio Code</b></summary>

1. Use the **Explorer** (`Ctrl+Shift+E` or `Cmd+Shift+E` on Mac) to create a new folder named `.github` at the root, then a subfolder named `ISSUE_TEMPLATE`. Use the arrow keys to focus the appropriate folder before creating a sub-item.
2. Create a new file inside: `custom-template.yml`.
3. Add your YAML content.
4. Stage, commit, and push your changes using the **Source Control** view (`Ctrl+Shift+G` or `Cmd+Shift+G` on Mac). Use the arrow keys to focus items in the list.
5. Use the **GitHub Pull Requests** extension to create a new PR.

</details>

<details>
<summary><b>Command Line (Git & CLI)</b></summary>

1. Create the directory structure: `mkdir -p .github/ISSUE_TEMPLATE`.
2. Create the file: `touch .github/ISSUE_TEMPLATE/custom-template.yml`.
3. Open the file in your editor (`code .`) and add your YAML content.
4. Stage and commit: `git add .` then `git commit -m "Add custom issue template"`.
5. Push and create a PR: `git push` then `gh pr create`.

</details>

**Expected Outcome:**
An automated check will verify your template contains the required
ame and description fields. Once merged, future contributors will see this template as an option when creating a new issue!

**Troubleshooting:**

- **Autograder failed?** Double check your YAML spacing and indentation.
-**Need a YAML template example?** Review [Chapter 17: Issue Templates](https://github.com/Community-Access/git-going-with-github/blob/main/docs/17-issue-templates.md).

**To Unlock Challenge 15:**
Post a link to your Issue Template PR here, then activate **Close issue**!

---

## Challenge 15: Discover Accessibility Agents

**Title:** Challenge 15: Discover Accessibility Agents

**Body:**
**We are moving into our capstone project space!**

Accessibility Agents like Gandalf are automated tools that assist visually impaired users or check for compliance. Today, you'll meet more of Gandalf's peers!

**Your Goal:**
Explore the main `accessibility-agents` repository. Ask Gandalf if you have questions about any particular agent!

**Step-by-Step:**

1. Navigate to the [Community-Access/accessibility-agents](https://github.com/Community-Access/accessibility-agents) repository.
2. Read the `README.md` to understand how Gandalf and its colleagues work.
3. Explore an existing agent folder to see its structure.

**Expected Outcome:**
You'll understand the agent architecture. If you're confused, mention `@gandalf-bot` with: "How does the agent schema work?"

**Troubleshooting:**

- **Lost?** Ask Gandalf for help.
-**Want architectural context?** Review [Chapter 19: Accessibility Agents](https://github.com/Community-Access/git-going-with-github/blob/main/docs/19-accessibility-agents.md).

**To Unlock Challenge 16:**
Type the name of the agent you explored right here, then activate **Close issue**!

---

## Challenge 16: Capstone Project

**Title:** Challenge 16: Capstone Project

**Body:**
**Welcome to your Capstone Challenge!**

It is time to put everything you have learned together. You are going to choose a real repository and prepare an agentic contribution that could help real maintainers or users.

**Your Goal:**
Choose Accessibility Agents, GLOW, or another meaningful repository. Create or improve an agent, prompt, custom instruction, skill, workflow, documentation page, or contribution issue. Your evidence should show a clear mission, useful responsibilities, and guardrails.

**Step-by-Step:**

<details>
<summary><b>Web Browser + Codespaces (Quickest)</b></summary>

1. Choose Accessibility Agents, GLOW, or another meaningful repository.
2. Select the **Code** button and choose the **Codespaces** tab.
3. Once the environment loads, create or update one focused contribution file using the Explorer.
4. Add responsibilities and guardrails when your contribution involves an agent or automation.
5. Create a new branch, commit, and submit a pull request when you have access.

</details>

<details>
<summary><b>Visual Studio Code (Local)</b></summary>

1. Fork your chosen repository when a fork-based contribution is possible.
2. Clone your fork locally using `Git: Clone` from the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and open it.
3. Create a new branch for your capstone: `capstone/your-username`.
4. Create or update the agent, prompt, instruction, skill, workflow, documentation, or issue draft file. Use the arrow keys in the Explorer to focus the parent folder.
5. Use the **Source Control** view (`Ctrl+Shift+G` or `Cmd+Shift+G` on Mac) to stage, commit, and publish your branch. Use the arrow keys to focus and select items.
6. Open your PR through the **GitHub Pull Requests** extension.

</details>

<details>
<summary><b>Command Line (Git & CLI)</b></summary>

1. Fork and clone in one step, for example: `gh repo fork Community-Access/accessibility-agents --clone`.
2. Create a new branch: `git checkout -b capstone/your-username`.
3. Create or update one focused contribution file.
4. Edit the file, stage, and commit: `git add .` then `git commit -m "Prepare capstone contribution"`.
5. Push and open your PR: `git push` then `gh pr create`.

</details>

**Expected Outcome:**
You will have a review-ready contribution path: a PR, branch, draft issue, or contribution plan that explains who it helps, what it does, and how it stays safe.

**Troubleshooting:**

- **Workflow issues?** See [Chapter 18: Fork and Contribute](https://github.com/Community-Access/git-going-with-github/blob/main/docs/18-fork-and-contribute.md).
- **Need capstone examples?** See [Chapter 20: Capstone Project](https://github.com/Community-Access/git-going-with-github/blob/main/docs/20-build-your-agent.md).

**To Complete the Workshop:**
Post the link to your capstone PR, branch, draft issue, or contribution plan here, then activate **Close issue**.

**Congratulations.** You have completed the Git Going with GitHub workshop and prepared work that can continue beyond the classroom.

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

- **Challenge 1: Find Your Way Around (Initial State):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Challenge 2: File Your First Issue:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Challenge 3: Join the Conversation:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Challenge 4: Branch Out:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Challenge 5: Make Your Mark:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Challenge 6: Your First Pull Request:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Challenge 7: Resolve a Merge Conflict:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Challenge 8: Open Source Culture:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Challenge 9: Merge Day:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Day 2: You Can Build This:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Challenge 10: Go Local:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Challenge 11: Day 2 Pull Request:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Challenge 12: Code Review:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Challenge 13: Copilot as Collaborator:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Challenge 14: Design an Issue Template:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Challenge 15: Discover Accessibility Agents:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
