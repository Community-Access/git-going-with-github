You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep22-github-flavored-markdown
Title: Episode 22: GitHub Flavored Markdown
Description: Markdown syntax, GitHub extensions, and writing accessible documentation.

Concept checklist to preserve:
- What Markdown is: lightweight text formatting
- Headings: # H1 through ###### H6 and heading hierarchy
- Paragraphs, line breaks, and emphasis (bold, italic)
- Links: inline links, reference links, autolinks
- Images: alt text syntax and writing descriptive alt text
- Lists: ordered, unordered, and nested
- Code: inline code with backticks and code blocks with triple backticks
- Tables: pipe syntax and alignment
- Task lists: checkbox syntax in issues and PRs
- GitHub-specific: alert blocks (note, tip, important, warning, caution)
- GitHub-specific: Mermaid diagrams (mention but note accessibility concerns)
- GitHub-specific: math equations with LaTeX syntax
- Footnotes and heading anchors
- Writing accessible markdown: descriptive links, alt text, heading structure

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## From First Paragraph to Polished Repository - Everything You Need to Know
- ## Table of Contents
- ### Part 1 - Markdown Foundations
- ### Part 2 - GitHub Flavored Markdown (GFM)
- ### Part 3 - Putting It All Together
- ## Part 1 - Markdown Foundations
- ### Learning Cards: Using This Markdown Reference
- ## 1. What Is Markdown?
- ### A brief history
- ### Markdown versus HTML
- ### What gets rendered and what stays raw
- ## 2. Where You Will Use Markdown in This Workshop
- ### Day 1 - GitHub Foundations (Browser)
- ### Day 2 - VS Code and Accessibility Agents
- ### Learning Room connection
- ## 3. How to Practice as You Read
- ### Option 1 - GitHub Issue (recommended for Day 1)
- ### Option 2 - Any `.md` file in VS Code (recommended for Day 2)
- ### Option 3 - GitHub Gist
- ## 4. Paragraphs and Line Breaks
- ### Paragraphs
- ### Line breaks within a paragraph
- ### Common mistake - no blank line between paragraphs
- ## 5. Headings
- ### Syntax
- ## Heading Level 2
- ### Heading Level 3
- #### Heading Level 4
- ### Rules for accessible headings
- ### Alternative heading syntax (not recommended)
- ## 6. Emphasis - Bold, Italic, and Bold Italic
- ### Bold
- ### Italic
- ### Bold and italic combined
- ### When to use emphasis
- ### Emphasis inside words
- ## 7. Strikethrough
- ## 8. Lists - Ordered and Unordered
- ### Unordered lists (bullet points)
- ### Ordered lists (numbered)
- ### A helpful trick - Markdown renumbers for you
- ### Starting an ordered list at a specific number
- ## 9. Nested Lists and Mixed Lists
- ### Nesting unordered lists
- ### Nesting ordered lists
- ### Mixing ordered and unordered lists
- ### Adding content inside list items
- ## 10. Links
- ### Basic link syntax
- ### Links with title text
- ### Writing accessible link text
- ### Reference-style links
- ### Relative links within a repository
- ### Email links
- ### Autolinked URLs
- ### Learning Cards: Links
- ## 11. Images
- ### Syntax
- ### Writing good alt text
- ### Image with a link

Anti-repetition constraints:
- do not start with "Welcome to..." in most episodes
- do not use "And I am Jamie." as a fixed boilerplate line
- avoid repeating "orient, act, verify"
- avoid repeating "Carry the map"
- vary opening style across episodes; avoid repetitive intros
- avoid repeating long lines verbatim inside this script
- preserve the same overall script flow and marker order as the current transcript

Current transcript to rewrite:
<<<TRANSCRIPT>>>
[ALEX]
This is Git Going with GitHub, episode 22: GitHub Flavored Markdown. I am Alex. By the end of this episode, GitHub Flavored Markdown should feel less like a wall of GitHub words and more like a set of moves with visible momentum.

[JAMIE]
And I am Jamie. I am here for the practical questions: what should I listen for, what can go wrong, and what is the next calm move?

[PAUSE]

[ALEX]
Today we are working on this: Markdown syntax, GitHub extensions, and writing accessible documentation. I want the learner to leave with a mental map, not just a remembered path through buttons.

[JAMIE]
So the goal is understanding first, then action, then confirmation.

[ALEX]
Right. We are building a rhythm: orient yourself, take one intentional action, then verify what changed before moving on. That rhythm is where the magic lives.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
From First Paragraph to Polished Repository - Everything You Need to Know: Whether you have never written a single line of Markdown or you already know the basics and want to master the GitHub-specific extensions, this guide takes you from zero to confident. The next useful detail is concrete: We start with what Markdown is and why it matters, walk through every foundational element with examples, and then cover the GitHub Flavored Markdown (GFM) features you will encounter in real repositories - alert blocks, Mermaid diagrams, math, footnotes, and.

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
Markdown Foundations has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Start here: What Is Markdown? Then: Where You Will Use Markdown in This Workshop. Next: How to Practice as You Read. Last: Paragraphs and Line Breaks. The point is not speed; the point is never losing your place.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
Walk it in order: Headings; Emphasis - Bold, Italic, and Bold Italic; Strikethrough; and Lists - Ordered and Unordered. Each step should leave a trace you can name.

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
GitHub Flavored Markdown (GFM) has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Walk it in order: What Is GitHub Flavored Markdown?; Alert and Callout Blocks; Collapsible Sections with Details and Summary; and Task List Checkboxes. Each step should leave a trace you can name.

[JAMIE]
What is the ordered workflow?

[ALEX]
Think of this as 4 checks: Syntax Highlighting in Fenced Code Blocks; Mermaid Diagrams; Math Expressions with LaTeX; and Footnotes. If one step does not match what you hear, stop there and re-orient.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Putting It All Together has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Think of this as 4 checks: Screen Reader Behavior Summary; Accessible Markdown Authoring Checklist; Common Mistakes and How to Fix Them; and Your First Real Markdown Document - Guided Exercise. If one step does not match what you hear, stop there and re-orient.

[JAMIE]
Let's pause on Part 3 - Putting It All Together. What should a learner take away from it?

[ALEX]
The path is straightforward once it is named. Step one is quick-Reference Card. That is the rhythm: orient, act, verify, continue.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
Learning Cards: Using This Markdown Reference has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The parts worth keeping in working memory are these. Use heading navigation (H key) to jump between numbered sections -- each topic is an h2 heading. Every section shows raw Markdown first, then rendered output, then screen reader behavior notes. The Table of Contents at the top has anchor links -- activate any link to jump directly to that section. Code blocks show the raw Markdown to type -- increase zoom and the monospace font stays readable. Each section follows the same pattern: explanation, raw code, rendered result, and accessibility notes. Use Ctrl+F to search for a specific Markdown element (e.g., search "table" or "heading").

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[ALEX]
That matters because of the next idea. Do not treat 1. What Is Markdown? as decoration. Markdown is a lightweight way to format plain text so it renders as rich, structured content - headings, bold text, links, lists, code blocks, tables, and more. That is not trivia. You write in a plain text file using simple punctuation characters, and a Markdown processor converts those characters into formatted output. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[PAUSE]

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
If the interface shifts, A brief history is still useful because john Gruber created Markdown in 2004 with the goal of making a format that is "as easy to read and write as plain text." Since then, Markdown has become the default writing format.

[ALEX]
Here is what that changes in practice. GitHub (README files, issues, pull requests, comments, wikis, discussions). Stack Overflow and many developer forums. Static site generators (Jekyll, Hugo, Gatsby). Note-taking apps (Obsidian, Notion, Bear). Documentation systems (MkDocs, Docusaurus, Read the Docs). Chat platforms (Slack, Discord, Microsoft Teams).

[ALEX]
This is where the talk moves from concept to action. Put Markdown versus HTML into plain language. Markdown converts to HTML behind the scenes. The useful version is: When you write bold, GitHub converts it to bold.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
The teaching point here is not the label; it is the move. When you view a.md file on GitHub, GitHub renders it automatically. That is the difference between guessing and knowing: When you edit that file, you see the raw Markdown.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because markdown is not just one tool in this workshop - it is the thread that connects everything you do. This is where the workflow starts to feel magical, because the result becomes visible and explainable: Here is every place you will write or read Markdown during the two days. That is the difference between following directions and owning the workflow.

[JAMIE]
How should they picture the shape of the workshop?

[ALEX]
Day 1 - GitHub Foundations (Browser): The following table lists every Day 1 activity where Markdown is used.

[ALEX]
Now slow down for the part people usually miss. Here is the learner-facing version. The following table lists every Day 2 activity where Markdown is used.

[PAUSE]

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
This is the move inside Learning Room connection: in the Learning Room repository, every challenge description, every welcome file, and every piece of documentation is Markdown. Put another way, when you fix a broken link in docs/welcome.md for Challenge 1, you are editing Markdown.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
Here is the moment where the page starts to make sense. Anchor this part on 3. How to Practice as You Read. The best way to learn Markdown is to type it yourself. That matters in practice: Here are three ways to practice as you read this guide. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[ALEX]
A solid pull request habit is to separate three questions: what changed, why it changed, and what still needs review. That keeps the conversation useful instead of noisy.

[JAMIE]
Let's pause on Option 1 - GitHub Issue (recommended for Day 1). What should a learner take away from it?

[ALEX]
The reason this matters is simple: the Write and Preview tabs are announced as tab buttons. This is the part to say slowly: Press Enter on "Preview" to switch.

[ALEX]
The path is straightforward once it is named. Step one is go to any repository where you have write access (the Learning Room works). Step two is click New Issue. Step three is type Markdown in the issue body. Step four is click the Preview tab to see the rendered result. The sequence works because every action has a confirmation.

[JAMIE]
Before we leave Option 1 - GitHub Issue (recommended for Day 1), what is the practical point?

[ALEX]
First, switch back to Write to keep editing. Then, you do not need to submit the issue - the Preview tab is your sandbox. Keep it that plain: know where you are, make the move, check the result.

[ALEX]
A solid issue habit is to read the title, the body, and the timeline before acting. You are listening for the requested action, the missing evidence, and the person who needs a response.

[PAUSE]

[JAMIE]
Let's pause on Option 2 - Any.md file in VS Code (recommended for Day 2). What should a learner take away from it?

[ALEX]
Option 2 - Any.md file in VS Code (recommended for Day 2) has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
First, create a new file: Ctrl+N, then save it as practice.md. Then, type your Markdown in the editor. After that, press Ctrl+Shift+V to open the rendered Markdown preview in a new tab. Finally, the preview updates live as you type. Keep it that plain: know where you are, make the move, check the result.

[JAMIE]
Let's pause on Option 3 - GitHub Gist. What should a learner take away from it?

[ALEX]
Option 3 - GitHub Gist has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Start here: Go to gist.github.com. Then: Name your file practice.md. Next: Type Markdown in the content area. Last: Click Create secret gist (only you can see it). Pause after each step and listen for the confirmation before moving on.

[JAMIE]
Before we leave Option 3 - GitHub Gist, what is the practical point?

[ALEX]
Walk it in order: View the rendered result. The point is not speed; the point is never losing your place.

[ALEX]
Hold that next to this. Put 4. Paragraphs and Line Breaks into plain language. This is the most fundamental element in Markdown, and it trips up almost everyone at first. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[JAMIE]
So the learner is not behind if they stop there and check the page.

[ALEX]
Yes. Pausing to verify is not a detour; it is how you keep control of the workflow.

[PAUSE]

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
The teaching point here is not the label; it is the move. A paragraph is one or more lines of text separated by a blank line (an empty line with nothing on it). The useful version is: If you do not leave a blank line between two blocks of text, Markdown treats them as one continuous paragraph.

[ALEX]
That connects to another useful point. This part earns its place because sometimes you want to go to a new line without starting a whole new paragraph - for example, in an address or a poem. That is the difference between guessing and knowing: To create a line break (a in HTML), end a line with two or more spaces and then press Enter.

[JAMIE]
Let's pause on Common mistake - no blank line between paragraphs. What should a learner take away from it?

[ALEX]
Common mistake - no blank line between paragraphs: What renders (wrong): Both lines merge into one paragraph. This is where the workflow starts to feel magical, because the result becomes visible and explainable: Fix: Add a blank line between them.

[PAUSE]

[ALEX]
Here is the practical turn. Here is the learner-facing version. Headings create the structure of your document. That gives the learner a foothold: they are how screen readers navigate, how tables of contents are built,

[...middle omitted for length...]

t changes, then run it only when the repository state matches the lesson.

[PAUSE]

[JAMIE]
Let's pause on Step 7 - Add a collapsible section. What should a learner take away from it?

[ALEX]
Step 7 - Add a collapsible section has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like Additional Notes;; My accessibility testing experience; I have been using a screen reader for three years. I have tested; web applications with NVDA and I am learning how to contribute; accessibility bug reports to open source projects. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[ALEX]
Keep the teaching thread moving. Anchor this part on You are done when. You just wrote a Markdown document that uses headings, paragraphs, emphasis, inline code, links, blockquotes, tables, task lists, and collapsible sections. This is where the workflow starts to feel magical, because the result becomes visible and explainable: Every one of these skills transfers directly to issues, pull requests, and documentation in this workshop.

[ALEX]
Here is the part to remember. Your document renders with a clear heading hierarchy (H1, H2). Bold and italic text render correctly. The numbered list shows sequential numbers. The link is clickable.

[JAMIE]
Let's pause on Learning Cards: Quick-Reference Card. What should a learner take away from it?

[ALEX]
Learning Cards: Quick-Reference Card has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part to remember. This card shows raw Markdown syntax in code blocks -- read each block to hear the exact characters to type. Keep this section bookmarked as a daily reference when writing issues, PRs, and comments. Each code block is labeled by format type (headings, lists, links, etc.) in the heading above it. The card uses large monospace code blocks -- increase zoom and each syntax example stays on one or two lines. Print this section or save it as a separate file for quick side-by-side reference while writing. Syntax characters (,, -, []) are visually distinct in the code font.

[PAUSE]

[ALEX]
Keep the teaching thread moving. Do not treat 32. Quick-Reference Card as decoration. It shows the raw Markdown for every element covered in this guide. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[JAMIE]
Let's pause on HTML in Markdown. What should a learner take away from it?

[ALEX]
HTML in Markdown has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like Press Ctrl + C to copy.; H 2 O; x 2; Line one Line two. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[ALEX]
Keep the teaching thread moving. Put Mermaid diagram (with accessible text) into plain language. Next: Appendix D: Git Authentication Back: Appendix B: Screen Reader Cheat Sheet Teaching chapter: Chapter 06: Working with Pull Requests.

[PAUSE]

[JAMIE]
Let's pause on Section-Level Source Map. What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. Use this map to verify facts for each major section in this file.

[ALEX]
Here is the part to remember. From First Paragraph to Polished Repository - Everything You Need to Know: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide. Part 1 - Markdown Foundations: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide. What Is Markdown?: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide. Where You Will Use Markdown in This Workshop: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide. How to Practice as You Read: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide. Paragraphs and Line Breaks: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 22. Next in the series is episode 23, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
