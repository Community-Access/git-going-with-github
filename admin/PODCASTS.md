# Podcasts

## Git Going with GitHub - Audio Series

> **Architecture update (May 2026):** Some episodes (notably Episode 4: The Learning Room) were recorded under the original "single shared learning-room repository" model. The workshop has since moved to a **GitHub Classroom** model where each participant gets their own private copy of `learning-room-template`. The high-level concepts (PR-driven practice, automated bot feedback, peer review) are still accurate. The bot is now called Aria, and your Learning Room repo is private to you. Refer to the live chapters in `docs/` for the current architecture; the audio remains a useful conceptual overview.

Listen to companion audio episodes for every chapter and appendix in this workshop. Each episode is a conversational overview between hosts Alex and Jamie that previews or reviews the key concepts - perfect for learning on the go or reducing screen reader fatigue. Every episode includes a full transcript below the player.

**Subscribe:** Add the [podcast RSS feed](https://community-access.org/git-going-with-github/podcasts/feed.xml) to your preferred podcast app - Apple Podcasts, Spotify, Overcast, or any RSS reader.

**Transcripts:** Every episode includes a complete, readable transcript. Expand the "Read Transcript" section below any episode to follow along or search the conversation.


## How to Use These Episodes

- **Before a chapter:** Listen to preview the concepts. You will know what to expect before diving into the exercises.
- **After a chapter:** Listen to reinforce what you learned and catch anything you missed.
- **On the go:** Episodes are 8-18 minutes each. Listen during commutes, walks, or breaks.


## Day 1: GitHub Foundations

### Episode 0: Welcome to Git Going with GitHub

A tour of the workshop structure, the two-day arc, and what you will accomplish.

Based on: [Course Guide](docs/course-guide.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep00-welcome.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep00-welcome.mp3">Download Episode 0 (MP3)</a>
</audio>

[Download Episode 0 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep00-welcome.mp3)

<details>
<summary>Read Transcript - Episode 0: Welcome to Git Going with GitHub</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode zero, titled Welcome to Gitt Going with GitHub. I am your host, Alex, and I am thrilled to be starting this journey with you. Whether you are a seasoned programmer who is just now moving over to GitHub, or you are completely new to version control, this audio series is designed to be your companion. We are going to explore open source collaboration using GitHub, Visual Studio Code, and GitHub Copilot, all with a strict focus on screen reader and keyboard-only navigation.

**Jamie:** And I am Jamie! I am so excited to be here. I will be learning right alongside you, asking the questions, and probably sharing a few embarrassing stories from my own learning journey. Because let me tell you, I learned GitHub just two years ago, and I remember exactly how overwhelming it felt. When I first heard people throwing around words like clone, fork, and branch, I thought we were doing some weird mix of agriculture and science fiction.

**Alex:** That is a perfect description of how it sounds at first. And that is exactly why we are doing this. Before we dive into the deep end, we want to give you a map of the territory. This episode is an overview of the entire two-day workshop. We are going to talk about what open source actually means, how this course is structured, the philosophy behind how we teach, and we will preview some of the core vocabulary you will be using every single day.

**Jamie:** But before we get into all of that, a quick public service announcement. If you are listening to this and you have not yet completed Chapter 0, which is the Pre-Workshop Setup, you will want to navigate to that chapter and complete it before Day 1 officially begins. It takes about thirty minutes. It walks you through creating your GitHub account, installing Git, setting up VS Code, and configuring your screen reader specifically for GitHub.

**Alex:** Exactly. Getting your environment set up correctly is half the battle. Once your screen reader is optimized for the web interface, everything else flows much more smoothly. So, let us start with the big picture. The entire goal of this workshop is built around one single idea. By the end of these two days, you will make real contributions to a real open source project. Not a simulated sandbox. Not pretend. Real open source.

**Jamie:** Which brings up a great question. For someone entirely new to this space, what exactly does open source mean, and why does it matter so much?

**Alex:** Open source refers to software where the original source code is made freely available. Anyone can navigate to the code, read it, modify it, and distribute it. But more importantly, open source is a collaborative community. It is a way of building software where thousands of people from all over the world work together to solve problems, rather than one closed-off team in a single company.

**Jamie:** I always like to think of open source as a massive community potluck dinner. Someone brings the main dish, which is the core software. But then someone else says, hey, this needs salt, and they add a new feature. Someone else brings dessert, which might be a documentation update. And someone else fixes the wobbly table, which is a bug fix. Anyone is allowed to walk into the room, taste the food, and contribute their own recipe to make the whole meal better for everyone.

**Alex:** I love that analogy. And what makes GitHub so powerful is that it provides the kitchen, the tables, and the recipe cards for that potluck. GitHub is the platform where millions of these open source projects live. It matters because much of the modern internet, including the tools we use for accessibility, runs on open source software. When you learn how to contribute, you get a voice in how the software you use every day is built.


**Jamie:** Okay, so we are going to be cooking at the open source potluck. How exactly are we going to learn all of this in just two days?

**Alex:** We divide the workshop into two distinct phases. Day 1 is all about GitHub Foundations in the browser. You will learn the GitHub web interface using only your keyboard and your screen reader. We will not touch a command line. We will not open a desktop application. You will learn how to navigate projects, find issues, propose changes, and review other people's work, entirely through the GitHub website.

**Jamie:** And I really appreciate this approach. When I started two years ago, I tried to learn the command line, the website, and the code editor all on the same day. It was a disaster. I did not know which program was throwing an error, or what the error even meant.

**Alex:** That is incredibly common, and it is the reason for our core learning philosophy in this workshop. We believe you must learn the manual skill first, before you introduce automation. If you try to use advanced tools before you understand what they are doing behind the scenes, you will get lost the moment something goes wrong. By spending all of Day 1 in the browser, you build a mental model of how GitHub is structured. You learn the concepts deeply.

**Jamie:** So Day 1 is building the foundation. What happens on Day 2?

**Alex:** Day 2 is when we move to the desktop. We transition into Visual Studio Code, which we often just call VS Code. This is a powerful, accessible code editor. Once we are in VS Code, we introduce GitHub Copilot, which is an artificial intelligence coding assistant, and we activate the Accessibility Agents ecosystem.

**Jamie:** Okay, hold on. Accessibility Agents? That sounds like something out of a spy movie. What are they?

**Alex:** They do sound a bit like secret agents. On Day 2, you will be introduced to a system of fifty-five accessibility agents working across three different teams. These agents are AI assistants configured specifically to help with accessibility tasks. For example, one team of agents acts as your daily briefing and issue tracking squad. They can summarize what happened in a project overnight so your screen reader does not have to read through fifty individual comments. Another team focuses on pull request reviews, helping you spot missing alternative text or improper heading structures in code before you submit it.

**Jamie:** Oh, that is clever! It is like having a team of expert accessibility consultants sitting in the room with you, ready to review your work or summarize long threads.

**Alex:** Exactly. But again, tying back to our philosophy, these agents only make sense if you already know what an issue or a pull request is. If you do not know how to manually review code, the agent's advice will not mean anything to you. That is why Day 2 is all about taking the manual skills you mastered on Day 1 and amplifying them with these fifty-five agents. By the end of Day 2, you will use these tools to ship a real contribution, and your name will be permanently recorded in the commit history of an open source project.


**Jamie:** Alex, you just used a few terms that I want to make sure we define, because I remember being so confused by them. We have an entire glossary in Appendix A, but can we do a high-level preview of the core vocabulary right now? Let us start with Repository.

**Alex:** Absolutely. A repository, or repo for short, is the container for an entire project. It holds all the files, the folders, the documentation, and, most importantly, the complete history of every change ever made.

**Jamie:** I remember someone telling me a repository is just a folder. But it is more than that, right?

**Alex:** It is much more than that. Think of a repository as a project folder that has a time machine built into it. Because it tracks every single modification, you can ask the repository to show you exactly what the project looked like last Tuesday at noon, or who added a specific line of code three years ago. It never forgets.

**Jamie:** Okay, next term. What is an Issue?

**Alex:** An issue is essentially a discussion item within a repository. If you find a bug, you open an issue to report it. If you want to request a new feature, you open an issue.

**Jamie:** So it is like a digital to-do list combined with a discussion forum. When I want to fix something, I navigate to the Issues section, find one that sounds interesting, and announce that I am going to work on it.

**Alex:** That is exactly right. Issues are the starting point for almost all open source work. Now, once you have done the work and fixed the bug, you need a way to give that fix back to the project. That brings us to our third core term, the Pull Request.

**Jamie:** Ah, the famous PR. I used to hear people say, just submit a PR, and I would nod and pretend I knew what they meant.

**Alex:** A pull request, or PR, is a formal proposal to combine your changes into the main project. And I love that name, because you are literally requesting that the maintainer pull your changes into their repository. You are saying, here is the work I did to fix that issue, please review it.

**Jamie:** My favorite analogy for a pull request is publishing a book. Imagine the repository is the official, published book. You cannot just grab a pen and write your own paragraph directly onto the printed pages for everyone in the world to see. Instead, you write your changes on a separate piece of paper, which is your draft. A pull request is you handing that piece of paper to the editor and saying, I think this paragraph makes the book better. What do you think?

**Alex:** That is a brilliant comparison. And the editor, who in our world is called the project maintainer, will read your draft. They might leave comments asking you to change a sentence, or fix a typo. This is the code review process. You update your draft based on their feedback. And finally, when the editor is happy with it, they perform the fourth core concept, the Merge.

**Jamie:** And a merge is when the editor takes your piece of paper, types it into the official manuscript, and publishes it for real.

**Alex:** Exactly. Merging is the act of combining your approved pull request into the main repository. Once it is merged, your code is officially part of the project. So, to recap the lifecycle. You find a problem in a Repository. You discuss it in an Issue. You propose a solution with a Pull Request. And the maintainer accepts it with a Merge.


**Jamie:** Okay, that sounds like a lot of steps. And if I am being honest, thinking about doing all of this, plus moving over to VS Code on Day 2, feels a little intimidating. Especially for folks who might be totally new to the command line, or new to using version control.

**Alex:** It does sound like a lot! But here is the thing. You have already done most of this on Day 1 in the browser. You already know the workflow. When we move to VS Code, it is the exact same workflow, just with VS Code handling the heavy lifting. We are going to take it one step at a time.

**Jamie:** And there is actually a really cool bridge between Day 1 and Day 2, right? The period key trick. I wish I had known that when I started.

**Alex:** It is one of my favorite features on GitHub. When you are on any repository page in your browser, if you simply press the period key on your keyboard, GitHub will instantly open a web-based version of VS Code right there in your browser tab. It is called GitHub dot dev. You do not have to install anything. It uses the exact same screen reader mode and keyboard shortcuts as the desktop version. It is the perfect stepping stone. You get to feel what a code editor is like, but you are still in the safety of your web browser.

**Jamie:** That is amazing. You can literally just press period, and suddenly you are in an accessible editor.

**Alex:** Yes. And we deliberately designed this workshop so that you are never thrown into the deep end without a life vest. Every single chapter builds on the one right before it. If you look at the course guide, you will notice we have structured the materials very specifically. There are chapters, and there are appendices.

**Jamie:** How should we be using those? Should I read the appendices before I start the exercises?

**Alex:** No, please do not try to read the appendices straight through! The chapters, numbered one through sixteen, are your main journey. They are designed to be read and practiced in order. The appendices, labeled with letters like Appendix A for the Glossary, or Appendix B for the Screen Reader Cheat Sheet, are purely reference materials. You keep them open in a separate tab or window. When you encounter a term you do not know, or you forget a screen reader command, you navigate to the appendix, find what you need, and then jump right back into the chapter.

**Jamie:** That takes a lot of pressure off. I do not have to memorize every single command before I start. I can just look them up as I go.

**Alex:** Exactly. Memorization is not the goal. Navigation and confidence are the goals. And to build that confidence, we have included twenty-four structured exercises throughout the curriculum.

**Jamie:** I love the exercises in this course. They are so bite-sized. Can you explain the pattern we use for them?

**Alex:** Every single exercise follows the exact same three-part pattern. First is the Try It section, which gives you clear, step-by-step instructions on what to do. Second is the You Are Done When section. This tells you the specific outcome you are looking for, so there is no guessing about whether you finished it correctly. Finally, there is the What Success Feels Like section. This is incredibly important for screen reader users. We describe exactly what you should hear, or where your focus should land, when the task is completed successfully.

**Jamie:** That is so helpful. I remember reading tutorials that would just say, click the button and you are done. And I would press enter on a button, and my screen reader would say nothing, and I had no idea if it actually worked. Knowing what success feels like is a game changer.

**Alex:** It really is. Let me give you an example. In Chapter One, there is an exercise called the Sixty Second Orientation. The Try It section asks you to navigate to a repository page, and press a sequence of keyboard shortcuts. Press the number 1 key, then the letter D, then the number 2 key, then the letter H. The You Are Done When section says you have successfully navigated between the main content, the repository details, and the file list. And the What Success Feels Like section explains the specific auditory feedback you will get from your screen reader as you jump between those landmarks. Every exercise takes between one and five minutes, and they are designed to be impossible to fail. They are just stepping stones.


**Jamie:** I am feeling so much better about this. But what if I do get stuck? What if my screen reader starts reading a wall of text, or I press the wrong shortcut and suddenly I am in a completely different view?

**Alex:** First, take a breath. Getting lost is a normal part of learning a complex interface. If you get stuck, we have a whole section in the guide called Getting Help. You can reference the Troubleshooting guide, which has step-by-step solutions to common screen reader focus issues. You can check the Quick Reference guide for shortcuts. And if you are truly stuck, you can actually open an issue in the workshop repository itself! You will describe what you tried, what happened, and what you expected to happen. It is a safe environment to practice asking for help the open source way.

**Jamie:** I really appreciate that. It normalizes getting stuck. When I first started, I thought getting an error meant I was bad at programming. Now I know that getting errors just means I am programming.

**Alex:** That is a fantastic way to look at it. Professional developers get errors all day long. The difference is just that they have built up the muscle memory of how to recover from them. And that is exactly the muscle memory we are going to build over these two days.

**Jamie:** So, as we wrap up this introductory episode, what are the biggest takeaways we should keep in mind before we jump into Chapter One?

**Alex:** I would say there are four main takeaways. Number one, remember our philosophy. We learn the manual skill first, then we automate it. Do not rush to the fancy tools until you understand the basic concepts. Number two, lean heavily on your reference materials. Keep the Glossary and the Screen Reader Cheat Sheet open in another tab. Number three, trust the exercise pattern. Focus on what success feels like, and take it one small step at a time.

**Jamie:** And number four, be kind to yourself. You are learning a new language, a new platform, and a new way of collaborating all at once. If it feels like a lot, that is because it is a lot. But you are going to do great.

**Alex:** Well said, Jamie. Up next in episode one, we are going to dive into Chapter One, Understanding GitHub's Web Structure. We will explore how GitHub organizes its pages, how to orient yourself using headings and landmarks, and how to make your screen reader glide through the interface. We will see you there!

</details>


### Episode 1: Pre-Workshop Setup

Creating your GitHub account, installing Git and VS Code, configuring your screen reader.

Based on: [Chapter 0: Pre-Workshop Setup](docs/00-pre-workshop-setup.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep01-pre-workshop-setup.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep01-pre-workshop-setup.mp3">Download Episode 1 (MP3)</a>
</audio>

[Download Episode 1 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep01-pre-workshop-setup.mp3)

<details>
<summary>Read Transcript - Episode 1: Pre-Workshop Setup</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode one, titled Pre-Workshop Setup. I am your host, Alex, and I am here with my co-host, Jamie. In this audio series, we are going to guide you through learning GitHub, version control, and open source collaboration, specifically designed for developers who use screen readers or magnification.

**Jamie:** Hi everyone. I am so excited to be here. I actually took this exact workshop about two years ago. I remember exactly what it feels like to hear all these new terms thrown around and feel completely overwhelmed. So I am here to ask Alex all the questions that are probably running through your head right now.

**Alex:** And those questions are exactly what we want. Today, our goal is to get your computer, your browser, and your screen reader completely set up and verified before day one of the workshop even begins. We will cover creating a GitHub account, understanding the difference between Git and GitHub, installing Visual Studio Code, turning on some essential accessibility settings, and verifying that everything works.

**Jamie:** Okay, that sounds like a lot of steps.

**Alex:** It does! But here is the thing, you have already done most of this on Day One of any new job or project. It is the exact same workflow, just with some new tools. Once we get the foundation set up today, the rest of the workshop is just learning how to use it.


**Alex:** Let us start with the biggest question people usually have. What is the difference between Git and GitHub? They sound like the same thing, but they serve two very completely different purposes.

**Jamie:** This confused me so much when I started. I thought GitHub was just the company that made Git.

**Alex:** That is a very common misconception. Let us break it down. Git is a version control system. Version control is basically a system that records changes to a file or set of files over time so that you can recall specific versions later. Think of Git as a time machine for your code. It runs locally on your computer. When you make a mistake, Git allows you to roll back your files to exactly how they were yesterday, or last week.

**Jamie:** So if Git is the time machine running on my local laptop, what is GitHub?

**Alex:** GitHub is a hosting platform for collaboration. If Git is your personal camera saving photos to your hard drive, GitHub is the social media platform where you upload those albums so your friends can see them, comment on them, and add their own photos. GitHub lives on the web. It takes the code you manage locally with Git and gives you a place to share it, review it, and collaborate with developers all over the world.

**Jamie:** That makes sense. Git is the local engine, and GitHub is the collaborative cloud platform. Which means to participate in the workshop, we need an account on that cloud platform.

**Alex:** Exactly. Step one is creating your GitHub account. You will navigate your browser to github dot com slash signup. The signup process is a single-page form. It will ask for your email address, a password, and a username.

**Jamie:** Let us talk about usernames for a second. Your GitHub username is public. It is going to appear on every piece of code you submit, every comment you make, and every project you contribute to.

**Alex:** Right. Keep it professional. It represents you in the open source community. You can only use lowercase letters, numbers, and hyphens.

**Jamie:** And we should warn people about the human verification step. When I signed up, I got completely stuck here because the default puzzle is highly visual.

**Alex:** I am really glad you brought that up. GitHub uses a visual capture puzzle to verify you are human, which is a known accessibility barrier. When your screen reader reaches that part of the form, you need to navigate to the button labeled Try an audio challenge. Activate that button. You will hear a short audio clip of spoken words or digits, and you will type what you hear into the text field. If that audio challenge does not load or fails, do not panic. Reach out to the workshop organizers and they can manually help verify your account.


**Alex:** Once your account is created, GitHub will send a launch code to your email. You copy that code, paste it into the browser, and you are in. But before we do anything else, we need to talk about security. Specifically, Two-Factor Authentication, or as you will often hear it called, two F A.

**Jamie:** I know a lot of people groan when they hear two F A, but it is actually required by most major open source projects now, right?

**Alex:** It is. Two-factor authentication means that to sign into your account, you need two things. First, something you know, which is your password. Second, something you have, like a code from an app on your phone. Think of it like withdrawing money from an ATM. You need your physical debit card, which is the thing you have, and your PIN, which is the thing you know. If a hacker steals your password, they still cannot get into your GitHub account without that second factor.

**Jamie:** So how do we set this up accessibly?

**Alex:** You will navigate to your account settings, move to the Password and authentication section, and activate the Enable two-factor authentication button. GitHub gives you a few options. The most common is an authenticator app, like Microsoft Authenticator or Google Authenticator.

**Jamie:** For screen reader users, scanning a visual QR code on the screen with a phone camera can be really frustrating.

**Alex:** Yes it can. And that is why you should navigate past the QR code graphic and activate the link that says enter this text code. That will reveal a long text string called a setup key. You just copy that text string and paste it into the manual entry field of your authenticator app.

**Jamie:** Okay, so I have two F A turned on. I am secure. But wait, if I am using Git on my laptop terminal to send code up to GitHub, how does my terminal know my second factor code?

**Alex:** That is a brilliant question. When you have two F A enabled, you can no longer use your standard GitHub password on the command line. Git will reject it. Instead, you need to use either a Personal Access Token, or an S S H key.

**Jamie:** Okay, define those for me.

**Alex:** Let us start with a Personal Access Token, often called a PAT. A PAT is a long, randomly generated string of characters that GitHub creates for you. You use it exactly like a password when Git asks for one. But unlike your main password, a PAT can be scoped.

**Jamie:** Scaped meaning limited?

**Alex:** Exactly. Think of your main GitHub password like the master key to your house. It opens every door. A Personal Access Token is like a valet key you give to a parking attendant. It only starts the ignition, but it will not unlock the glove box or the trunk. You can create a PAT that only has permission to read and write code repositories, but cannot delete your account or change your billing settings. And you can set it to automatically expire after thirty days.

**Jamie:** That is really smart. And what about the other option you mentioned, S S H keys?

**Alex:** S S H stands for Secure Shell. An S S H key is actually a pair of files generated on your computer. One is private, which stays securely on your hard drive, and one is public, which you upload to GitHub. Once they are linked, your computer and GitHub recognize each other automatically. No passwords or tokens to type ever again.

**Jamie:** I use S S H keys now and I love them, but I will say, generating them in the terminal was a bit intimidating on my first day.

**Alex:** Which is exactly why, for this workshop, we recommend starting with a Personal Access Token. It is entirely web-based, highly accessible to set up in the browser, and you just paste it into your credential manager once.


**Alex:** Now that we are authenticated, we need to adjust a few critical settings in the GitHub web interface. There is a dedicated Accessibility Settings page. You can reach it by opening the user navigation menu in the top right corner, selecting Settings, and then navigating to Accessibility in the left sidebar.

**Jamie:** If listeners only take one thing away from this episode, let it be this next setting. Please, for your own sanity, disable Hovercards.

**Alex:** I completely agree. A hovercard is a small pop-up window that appears when you move focus to a user's name or a repository link. It is meant to provide quick context. But for screen reader users, it is incredibly disruptive.

**Jamie:** It is the worst. When I had it turned on, every single time I tabbed past a link, my screen reader would start reading a massive paragraph of metadata, and then announce the keyboard shortcut to open the card. It was like having a tour guide who interrupts you every time you walk past a painting to read you the entire Wikipedia article about the artist, while you are just trying to find the restroom.

**Alex:** That is the perfect analogy. So, on the Accessibility Settings page, navigate to the checkbox labeled Hovercards or Link Previews, and uncheck it. It saves automatically. While you are on that page, we also recommend checking the box for Link underlines. This forces all links on GitHub to have a solid underline, which is incredibly helpful for low-vision users who might struggle to distinguish links by color alone.

**Jamie:** Are there any other settings we need to change?

**Alex:** Yes, we need to check your Feature Previews. GitHub is constantly improving its interface, and they let users opt into new designs before they become the default. Open the user menu again and activate Feature Preview. You are looking for two specific items. The New Issues Experience, and the New Files Changed Experience.

**Jamie:** What do those do?

**Alex:** The New Issues Experience completely rebuilds how issue lists are structured. It adds proper heading levels, accessible list structures, and live regions so your screen reader announces when you apply a filter. The New Files Changed Experience does the same thing for code reviews, adding a navigable file tree and turning visual code comparisons into structured tables.

**Jamie:** So basically, they make everything we are going to do in the workshop actually accessible.

**Alex:** Exactly. If you find them in the Feature Preview list, activate the Enable button for both. If you do not see them in the list at all, do not worry. That just means GitHub has already made them the default for everyone, and you are good to go.


**Alex:** Alright, our GitHub account is ready. Now we need to set up our local computer. That means installing Git, and installing our code editor.

**Jamie:** Let us start with Git. How do we get that time machine onto our laptop?

**Alex:** It depends on your operating system. If you are on Windows, you will navigate to git dash s c m dot com, download the Git for Windows installer, and run it. The default options are perfectly fine. If you are on a Mac, Git is often already there. You can open your Terminal application and type git space dash dash version. If it is not installed, the Mac will automatically pop up a dialog asking if you want to install the command line developer tools. Just agree to that. Linux users can install it using their standard package manager, like apt or dnf.

**Jamie:** Once it is installed, we have to introduce ourselves to Git, right? I remember this step. Configuring our Git identity.

**Alex:** That is right. Git embeds your name and your email address into every single snapshot, or commit, that you make. It needs to know who is making the changes. Think of it like signing the guestbook at an event. If you do not configure this, your commits might show up as authored by Unknown, which looks highly unprofessional, or Git might just refuse to save your changes entirely.

**Jamie:** How do we set that up?

**Alex:** You open your terminal and type two commands. The first is git space config space dash dash global space user dot name, followed by your full name in quotation marks. The second is git space config space dash dash global space user dot email, followed by the email address you used to sign up for GitHub.

**Jamie:** And a quick note here. The terminal is fully accessible. Whether you are using PowerShell on Windows with N V D A or JAWS, or the macOS Terminal with VoiceOver, you can read the output of your commands using your screen reader's review cursor or by simply arrowing up.


**Alex:** Now for the centerpiece of our local setup. Visual Studio Code, commonly called VS Code.

**Jamie:** This is the recommended editor for the workshop, right? Why do we use VS Code instead of something else?

**Alex:** VS Code is a free, open-source code editor built by Microsoft. We recommend it because its accessibility support is phenomenal. It has a dedicated team ensuring that screen readers can navigate complex codebases, interact with source control, and use artificial intelligence tools seamlessly. Think of VS Code as your digital workbench. It is where all your tools, your files, your terminal, and your version control live in one unified, accessible interface.

**Jamie:** You can download it at code dot visual studio dot com. The installer is standard. But once you open it, there is a very specific setting you have to turn on immediately.

**Alex:** Yes. Screen Reader Optimized Mode. This is absolutely critical. By default, VS Code renders text in a highly visual way that screen readers struggle to parse efficiently. When you turn on Screen Reader Optimized Mode, VS Code completely changes how it outputs information. It renders the editor as a plain text region so you can arrow through it linearly. It turns visual side-by-side code comparisons into readable text. And it enables audio cues, which are little sounds that play to indicate errors, folded code, or inline suggestions.

**Jamie:** How do we turn it on?

**Alex:** Often, VS Code will detect your screen reader on startup and present a dialog asking if you want to enable it. If it does, just press Enter to accept. If it does not, you can toggle it instantly by pressing Shift plus Alt plus F1.

**Jamie:** Or you can use the Command Palette, right? The Command Palette is my favorite feature. You press Control plus Shift plus P on Windows, or Command plus Shift plus P on Mac, and it opens a search box where you can type any command. Just type screen reader, and you will find the toggle.

**Alex:** Exactly. Once your screen reader mode is on, we need to install two extensions. Extensions are like adding new power tools to your workbench. They give VS Code new capabilities. You open the Extensions view by pressing Control plus Shift plus X, and search for the ones we need.

**Jamie:** The first one is the GitHub Pull Requests extension. What does that do?

**Alex:** A pull request is a request to merge your code changes into a main project. We will cover them deeply later. This extension allows you to review code, read comments, and manage pull requests entirely inside VS Code, without ever having to switch back to your web browser.

**Jamie:** And the second extension is GitHub Copilot Chat.

**Alex:** Yes. Copilot is an artificial intelligence pair programmer. The Copilot Chat extension gives you a conversational interface right in your editor. You can press Control plus Shift plus I to open the chat, and ask it questions like, how do I undo my last Git commit? Or, can you explain what this Python function does? It will read the code you currently have focused and give you plain text answers. It is fully accessible and incredibly helpful when you are learning.

**Jamie:** And Copilot has a free tier now, right?

**Alex:** It does. Copilot Free is available to all GitHub users. It gives you a limited number of chat messages and code completions per month, which is more than enough for this workshop. You just need to sign into your GitHub account inside VS Code to activate it.


**Jamie:** Alex, before we wrap up, I want to ask about something I heard some developers talking about. What if I am on a computer where I cannot install Git or VS Code? Like a library computer or a strict corporate laptop. Am I just locked out of contributing?

**Alex:** Not at all. This brings us to a fantastic feature called github dot dev. It is a completely browser-based alternative. If you are looking at any repository on GitHub dot com, you can simply press the period key on your keyboard.

**Jamie:** Wait, just the period key?

**Alex:** Just the period key. When you press it, the web page transforms into a lightweight version of VS Code, running entirely inside your browser. It looks and acts exactly like the VS Code you install on your desktop.

**Jamie:** That is amazing.

**Alex:** It really is. Think of it like a pop-up tent version of your digital workbench. You can take it anywhere, it requires absolutely zero installation, and because it is built on the same architecture as desktop VS Code, all the screen reader accessibility features still work. You can edit files, commit changes, and push them back to the repository without ever touching your local hard drive.

**Jamie:** I wish I had known about that trick when I started. Just press the period key. I love that.

**Alex:** It is incredibly handy for quick typo fixes or documentation updates. But for heavy development work, we still recommend the full desktop VS Code installation, because it gives you access to the local terminal and testing tools.


**Alex:** So, let us review our verification checklist before Day One. First, you have created your GitHub account, verified your email, and turned on Two-Factor Authentication.

**Jamie:** Second, you went into GitHub's Accessibility Settings, turned off the extremely noisy Hovercards, and turned on Link underlines.

**Alex:** Third, you installed Git, and configured your user dot name and user dot email in the terminal.

**Jamie:** Fourth, you installed Visual Studio Code, and immediately turned on Screen Reader Optimized Mode using Shift plus Alt plus F1.

**Alex:** And finally, you installed the GitHub Pull Requests and GitHub Copilot Chat extensions, and signed into your GitHub account inside the editor.

**Jamie:** If you can check all those boxes, you are completely ready for the workshop. But Alex, what if someone gets stuck on one of these steps? What if their terminal throws an error they do not understand, or their screen reader stops reading the editor?

**Alex:** Please do not suffer in silence. If you hit a roadblock, reach out to the workshop organizers immediately. You can file an issue on the Community Access repository, or send an email. We want to solve these setup quirks today. Every technical issue we fix before the workshop means more time for actual learning on Day One. You will not be left behind.

**Jamie:** This has been such a great overview. To summarize our key takeaways. Number one, Git is your local version control time machine, while GitHub is the web platform where you share and collaborate. Number two, disable Hovercards in your GitHub settings to keep your screen reader quiet and focused. Number three, always enable Screen Reader Optimized Mode in VS Code so your diffs and editor windows output clean, readable text.

**Alex:** Perfectly summarized. That brings us to the end of Episode One. Now that your tools are installed and configured, you are ready to start navigating. In Episode Two, we are going to dive into Understanding GitHub's Web Structure. We will explore how repository pages are laid out, which heading levels to jump to, and how to find exactly what you need without getting lost in the interface.

**Jamie:** I cannot wait. See you all in the next episode!

**Alex:** Thanks for listening to Gitt Going with GitHub. Keep practicing, and we will see you next time.

</details>


### Episode 2: Understanding GitHub on the Web

How GitHub organizes its web pages, heading structure, landmarks, and keyboard shortcuts.

Based on: [Chapter 1: Understanding GitHub on the Web](docs/02-understanding-github.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep02-github-web-structure.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep02-github-web-structure.mp3">Download Episode 2 (MP3)</a>
</audio>

[Download Episode 2 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep02-github-web-structure.mp3)

<details>
<summary>Read Transcript - Episode 2: Understanding GitHub on the Web</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is Episode 2: Understanding GitHub on the Web. I am your host, Alex, and I am here to guide you through learning GitHub and open source collaboration, specifically designed for screen reader users and developers with low vision.

**Jamie:** And I am Jamie! I am so excited to be here. I learned GitHub about two years ago, and I still remember exactly how overwhelming it felt the first time I landed on a repository page. There is just so much information coming at you all at once.

**Alex:** It is incredibly overwhelming at first. In Episode 1, we made sure you had your GitHub account created and Git installed on your machine. Those were our prerequisites. Today, we are going entirely web-based. We are going to build a mental map of how GitHub organizes its web interface. Once you understand the underlying structure, the HTML headings, the ARIA landmarks, and the URL patterns, you will never feel lost on a GitHub page again.

**Jamie:** I love the idea of a mental map. When I first started, I used to just press the Tab key about fifty times to find what I wanted. I had no map. I just had hope and a lot of patience.

**Alex:** We are definitely going to save your Tab key today. To start, let us talk about the big picture. GitHub is not just one type of page. It is a nested structure. Think of GitHub like a massive office building.

**Jamie:** Okay, an office building. I can picture that.

**Alex:** Right. When you first log in, you land on your dashboard. That is the lobby of the building. It shows you a feed of recent activity from projects you follow. Also in this lobby level, you have your profile page, which is like your employee badge showing your recent work, and your settings page, which is like the administrative office.

**Jamie:** So the dashboard, profile, and settings are all Level 1. The lobby. Where does the actual coding happen?

**Alex:** That happens in a repository. If the dashboard is the lobby, a repository is a dedicated project room on an upper floor. A repository is simply a central place where all the files, code, and history for a specific project live. When developers say, navigate to the repo, they mean navigate to that specific project room.

**Jamie:** And once you are inside that repository room, you have different stations, right? Like issues and pull requests.

**Alex:** Exactly. Let us define those, because they are the most important page types you will interact with. An issue is basically a to-do ticket or a discussion thread. If you find a bug in the code, or you want to suggest a new feature, you open an issue. It has a title, a description, and a comment thread where people can discuss it.

**Jamie:** And what about a pull request?

**Alex:** So a pull request - and I love that name because you are literally requesting that someone pull your changes into their project - is what happens when you have actually written some code to fix that bug. You submit a pull request, often just called a PR, to propose your changes. The PR page is a bit more complex. It has the conversation thread, just like an issue, but it also has tabs to review the specific lines of code that were changed.

**Jamie:** Okay, so to recap our building analogy. The dashboard is the lobby. The repository is the project room. An issue is a to-do ticket sitting on a desk in that room. And a pull request is a formal proposal to change something in that room.

**Alex:** That is a perfect summary. And no matter which of these rooms you are in, there are certain structural elements that are always present. Let us talk about how to navigate them without spamming the Tab key.


**Jamie:** So, if I am not supposed to just Tab through the page, what is the first thing I should do when I land on a GitHub page?

**Alex:** The very first thing you will encounter on every single GitHub page, if you are navigating from the top of the document, is the jump-to-content skip link.

**Jamie:** Oh, the skip link! I actually know this one. It is a hidden link right at the top of the page. If you press Tab exactly once when the page loads, your screen reader will announce, Skip to content. If you press Enter on it, it skips over all the global navigation links and drops your focus directly into the main, unique content of that specific page.

**Alex:** Exactly. It is a massive time saver. But sometimes, you actually do want to access that global navigation. The global navigation bar is present at the top of every single page on GitHub. It contains the GitHub logo, which takes you back to your dashboard lobby. It contains a global search bar. It has links to all your pull requests and issues across all your repositories, your notifications inbox, and your profile menu.

**Jamie:** How do I jump straight to that global navigation if I am deep in the middle of reading an issue?

**Alex:** This is where ARIA landmarks come in. ARIA landmarks are invisible structural signposts in the HTML that screen readers can recognize and jump between. Every screen reader has a shortcut to cycle through landmarks. If you are using NVDA or JAWS on Windows, you press the letter D. If you are using VoiceOver on a Mac, you press Control plus Option plus U to open the rotor, then use the arrow keys to select Landmarks.

**Jamie:** So if I press D, what will I hear?

**Alex:** The global navigation bar is wrapped in a landmark called Navigation Menu. So if you press D, your screen reader will say, Navigation Menu landmark. Once you hear that, you can press the letter K to move through the individual links inside it.

**Jamie:** That is so much faster. And what happens when I navigate into a repository? Do the landmarks change?

**Alex:** The Navigation Menu landmark stays exactly the same, because it is global. But a new landmark appears just below it, called the Repository navigation landmark. This contains the tabs specific to that project room: the Code tab, the Issues tab, the Pull requests tab, and so on.

**Jamie:** Okay, so D for Navigation Menu gets me the global stuff. D again gets me the Repository navigation for the project tabs. What is below that?

**Alex:** Below that is the Main landmark. This is where the actual content of the page lives. If you are on an issue, the Main landmark holds the issue description and comments. If you are on the repository home page, the Main landmark holds the file tree and the project Read Me.

**Jamie:** I remember struggling so much to find the reply box when I wanted to leave a comment on an issue. I would just scroll and scroll. Is there a landmark for that?

**Alex:** There is! This is one of my favorite GitHub accessibility features. On any page where you can leave a comment, like an issue or a pull request, there is a specific landmark called Add a comment. You just press D until you hear Add a comment landmark, and you are right at the text box, ready to type.


**Jamie:** Okay, so landmarks are like the major zones of the page. Global nav, repo nav, main content, and the comment box. What about the actual content itself? If I am in the Main landmark, how do I know what I am looking at?

**Alex:** For that, we use the HTML heading structure. GitHub is very disciplined about how they use headings, and learning their pattern is the key to orienting yourself.

**Jamie:** I use the letter H to jump between headings all the time. But how do you use it for orientation?

**Alex:** Think of the Heading Level 1, or H1, as your You Are Here marker on a shopping mall directory map. It tells you exactly what page you are on. Every time you land on a new GitHub page, I recommend pressing the number 1 on your keyboard to jump straight to the first H1.

**Jamie:** What will I hear when I press 1?

**Alex:** It depends on the page type. If you navigate to a repository home page and press 1, you will hear the owner name slash the repository name. For example, community-access slash accessibility-agents. That confirms you are in the right project room. If you navigate to the issues list and press 1, you will just hear Issues.

**Jamie:** And if I open a specific issue?

**Alex:** If you open an issue and press 1, the H1 is the title of the issue itself. Like, Fix contrast on submit button. Same for a pull request. The H1 is always the title of the PR.

**Jamie:** That is so consistent. I love that. So H1 tells me where I am. What about the rest of the content?

**Alex:** Below the H1, GitHub uses H2s for major sections, and H3s for individual items. For example, on an issue detail page, the H1 is the issue title. Below that, there is an H2 called Description, which is the original bug report. Below that is an H2 called Activity, which contains all the comments.

**Jamie:** Oh, and let me guess, the individual comments are H3s?

**Alex:** You guessed exactly right. Every single comment on an issue or a pull request starts with an H3 heading that contains the author's username and the timestamp. So, if you open an issue with forty comments, you do not have to read them line by line. You just press the number 3 on your keyboard to jump from comment to comment, hearing who wrote it and when.

**Jamie:** That is brilliant. I wish I had known that when I started. I used to read the entire page from top to bottom. Okay, that sounds like a lot of steps to remember, though. Press D for landmarks, press 1 for the title, press 3 for comments.

**Alex:** It does sound like a lot! But here is the thing - you have already done most of this on Day 1 when you were browsing the web. It is the exact same workflow, just applied to a highly structured application. I recommend a ten-second orientation sequence every time you open a GitHub link.

**Jamie:** Walk me through the ten-second sequence.

**Alex:** Step one: press the number 1. Listen to the H1 to confirm what page you are on. Step two: press D a few times to cycle through the landmarks, so you know what regions are available on this page. Step three: pull up your screen reader's Elements List. In NVDA, that is NVDA plus F7. In JAWS, it is Insert plus F6 for the headings list.

**Jamie:** Ah, the Elements List! That brings up a dialog box with a clean list of every heading on the page, right? Like a table of contents.

**Alex:** Exactly. By doing those three things, which takes about ten seconds, you know exactly what page you are on, where the major zones are, and you have scanned the table of contents. You are completely oriented without needing to see the visual layout at all.

**Jamie:** One quick warning for folks - I remember getting really confused once because the landmarks disappeared. It turned out I had my browser window snapped to half the screen. GitHub is responsive, so when the window got narrow, it collapsed the sidebar and hid some of the navigation into a mobile-style menu.

**Alex:** That is a fantastic point, Jamie. To get the most consistent heading and landmark experience, always keep your browser window maximized when working on GitHub.


**Jamie:** So, navigating by headings and landmarks is great. But earlier you mentioned there are ways to jump around without even doing that. You mentioned built-in keyboard shortcuts.

**Alex:** Yes. GitHub has its own complex system of keyboard shortcuts built directly into the web application. They are powered by JavaScript, and they let you do things like jump straight to the pull requests tab, or filter issues by assignee, all with single keystrokes.

**Jamie:** But wait. If I press the letter H to use a GitHub shortcut, my screen reader is just going to intercept it and jump to the next heading, right?

**Alex:** Exactly. And this is the single biggest point of friction for screen reader users learning GitHub. You have to understand the difference between your screen reader's Browse Mode and Focus Mode.

**Jamie:** Can you break that down for us?

**Alex:** Absolutely. Browse Mode, which JAWS calls the Virtual Cursor, is what you use to read pages. In this mode, your screen reader intercepts your keystrokes. Pressing H goes to a heading. Pressing B goes to a button. The web page never hears you press those keys.

**Jamie:** Right, because if the web page heard it, you would just be typing the letter H over and over.

**Alex:** Exactly. Focus Mode, on the other hand, is what you use to type into text boxes. When you enter Focus Mode, the screen reader stops intercepting keys and passes them directly through to the web page. Usually, your screen reader switches to Focus Mode automatically when you land on a text box.

**Jamie:** But to use GitHub's custom keyboard shortcuts, we need to manually switch to Focus Mode even when we are not in a text box, right? So the page can hear the keystroke.

**Alex:** You nailed it. If you want to use a GitHub shortcut, you must manually enter Focus Mode first. In NVDA, you press NVDA plus Space. In JAWS, you press Insert plus Z. You will hear a little click or chime. Now, your keystrokes are going straight to GitHub.

**Jamie:** Okay, so once I am in Focus Mode, what are these magical GitHub shortcuts? How do I learn them?

**Alex:** You do not have to memorize them from a manual. GitHub has a built-in cheat sheet. If you press the Question Mark key - which is Shift plus Slash - GitHub opens a dialog box that lists every single shortcut available for the exact page you are currently on.

**Jamie:** Oh, that is clever! So the list changes depending on whether I am in the lobby dashboard or the project repository?

**Alex:** Yes, it is context-aware. Let us say you are in a repository. You press NVDA plus Space to enter Focus Mode. Then you press Shift plus Slash to open the shortcut menu. You will see shortcuts like pressing the letter G followed by the letter I to jump straight to the Issues tab. Or G followed by P to jump to the Pull Requests tab. Think of them as the secret elevator buttons in our office building.

**Jamie:** So G stands for Go. Go to Issues, Go to Pull Requests. That makes total sense. And once I am done using the shortcut, I need to remember to press NVDA plus Space again to turn Browse Mode back on, so I can read the new page with my normal heading keys.

**Alex:** Exactly. It takes a little practice to toggle between Focus Mode and Browse Mode, but it unlocks incredible speed. And there is one shortcut that is so powerful, you do not even need to toggle modes to use it, because it automatically throws your focus into a text field.

**Jamie:** Ooh, I know this one. The Command Palette!

**Alex:** Yes, the Command Palette. You can reach it from any page on GitHub by pressing the Forward Slash key, or by pressing Control plus K.

**Jamie:** Control plus K is my absolute favorite. What does it actually do?

**Alex:** When you press Control plus K, a search box pops up in the middle of your screen. But it is not just for searching text. It is a command center. You can type the name of a repository, and press Enter to jump straight to it. You can type the name of a file, or type the word settings to jump to your settings page.

**Jamie:** To use our building analogy, the Command Palette is like a magical concierge desk. You just walk up, press Control plus K, tell them where you want to go, and they instantly teleport you there. You do not even need to know which floor it is on.

**Alex:** That is a perfect analogy. The Command Palette is incredibly powerful for accessibility because it completely bypasses the need to navigate through complex menus or nested tabs. You just declare your intent, and GitHub takes you there.


**Jamie:** Alex, there is one more shortcut I have heard people talk about, and it sounds almost like magic. Something about pressing the period key?

**Alex:** Ah, yes. The period key shortcut. This is one of the most remarkable features GitHub has introduced in recent years. It is the bridge between reading code on the web and actually editing it.

**Jamie:** How does it work?

**Alex:** If you are on any repository page or viewing any file on GitHub, and you switch to Focus Mode and press the period key, the entire web page transforms. You leave github dot com, and you are redirected to a URL that says github dot dev.

**Jamie:** Github dot dev. What is the difference?

**Alex:** Github dot com is the standard web interface we have been talking about—the issues, the pull requests, the project rooms. Github dot dev is a fully functioning version of Visual Studio Code, the code editor, running entirely inside your web browser.

**Jamie:** Wait, so I do not have to install anything? I just press the period key, and suddenly I am in a professional code editor with the entire project loaded up?

**Alex:** Exactly. No installation, no cloning the repository to your local computer, no terminal commands. It just opens the project in a web-based editor. And because it is VS Code, it has excellent screen reader support built right in.

**Jamie:** That is wild. Why would I use that instead of just downloading the code to my laptop?

**Alex:** It is perfect for quick changes. Let us say you are reading the project Read Me, and you notice a typo. Instead of opening your terminal, downloading the project, opening your local editor, fixing the typo, and pushing the code back up... you just press the period key. The editor opens in your browser, you fix the typo, you commit the change from the web interface, and you are done.

**Jamie:** I love that. It lowers the barrier to entry so much. If someone finds an accessibility bug in documentation, they can fix it in literally two minutes right from the browser.

**Alex:** Exactly. Now, there is one pro-tip for screen reader users regarding the period key. If you just press period, it transforms your current browser tab into the editor. When you are done, you have to hit the back button to get back to GitHub. A better way is to press Shift plus Period, which types the greater-than symbol.

**Jamie:** What does Shift plus Period do?

**Alex:** It opens github dot dev in a brand new browser tab. That way, you keep your original GitHub page open in your first tab, and you have your code editor in the second tab. It is much easier to keep your mental map intact that way.

**Jamie:** Shift plus Period for a new tab. I am definitely writing that one down.


**Alex:** We have covered a massive amount of ground today, Jamie. Let us wrap up with some concrete takeaways for our listeners to practice.

**Jamie:** I will take the first one! Takeaway number one: Think of GitHub like a building. The dashboard is the lobby, the repository is the project room, issues are to-do tickets, and pull requests are formal proposals to change the code.

**Alex:** Perfect. Takeaway number two: Use the ten-second orientation sequence on every new page. Press the number 1 to hear the H1 heading and know where you are. Press D to scan the ARIA landmarks like Navigation Menu and Main. And use your screen reader's Elements List to read the table of contents.

**Jamie:** Takeaway number three: Comments are always H3 headings. If you want to read a discussion thread quickly, just press the number 3 to jump from author to author without reading every single line in between.

**Alex:** Takeaway number four: Learn to toggle Browse Mode and Focus Mode. Use NVDA plus Space, or Insert plus Z, to enter Focus Mode so you can use GitHub's built-in shortcuts. Press Shift plus Slash to open the cheat sheet for whatever page you are on.

**Jamie:** And takeaway number five: When in doubt, teleport. Press Control plus K to open the Command Palette, type where you want to go, and press Enter. Or press Shift plus Period to instantly open the code in a web-based editor.

**Alex:** Those are excellent takeaways. Now that you have a mental map of the building, and you know how to navigate the hallways, you are ready to start looking at the code itself. In Episode 3, we are going to dive deep into Navigating Repositories. We will cover how to read the file tree, how to switch between different branches of code, and how to read the project documentation.

**Jamie:** I cannot wait. I am ready to get out of the lobby and into the project rooms.

**Alex:** Until then, open up your browser, head to GitHub, and practice your ten-second orientation. Thank you for listening to Gitt Going with GitHub. We will see you in the next episode.

</details>


### Episode 3: Navigating Repositories

Exploring a repository: tabs, files, README, branches, and commit history.

Based on: [Chapter 2: Navigating Repositories](docs/03-navigating-repositories.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep03-navigating-repositories.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep03-navigating-repositories.mp3">Download Episode 3 (MP3)</a>
</audio>

[Download Episode 3 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep03-navigating-repositories.mp3)

<details>
<summary>Read Transcript - Episode 3: Navigating Repositories</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode three, Navigating Repositories. I am Alex, and I am so glad you are joining us today.

**Jamie:** Hello everyone! I am Jamie, and I am incredibly ready for this one.

**Alex:** Today we are diving into the absolute core of GitHub. We are going to explore what a repository actually is, how to read its history, and how to navigate its structure using your screen reader. We will cover branches, cloning, forking, and all those different sections you encounter when you first open a project.

**Jamie:** And just a quick reminder, if you have not listened to episode two, you might want to jump back and check it out. In that episode, we covered the basic structure of a GitHub page. We talked about navigating by headings, using landmarks to find your way around, and using the built in keyboard shortcuts. We will be building directly on those skills today.

**Alex:** Exactly. If you are comfortable moving through landmarks and jumping to headings, everything we talk about today is going to feel very approachable.


**Alex:** Let us start at the very beginning. What is a repository? At its most basic level, a repository is essentially a project folder that is tracked by Git. It holds all the files, all the folders, and the complete documentation for a specific project.

**Jamie:** When I was learning this a couple of years ago, I realized a repository is not just a folder. It is like a magical filing cabinet with a built in time machine. It does not just hold the files as they are right now. It holds every single version of every single file, going all the way back to the very first day the project was created.

**Alex:** That is a perfect way to describe it. It is the entire history of the project. And when you navigate to a repository address, like github dot com slash owner slash repo name, you land on the repository home page.

**Jamie:** Right, and as soon as the page loads, your screen reader will announce the page title, which tells you the owner and the repository name. If you press the number one key, you will jump straight to the main heading one, which is also the repository name.

**Alex:** Once you are on that page, the first major landmark you want to find is the repository navigation landmark. You can reach this by pressing the D key to cycle through your landmarks. This navigation area contains the tab bar, which is how you move between the different sections of the repository.

**Jamie:** I like to think of these tabs as different rooms in an office building. They all belong to the same company, but different types of work happen in each room.

**Alex:** Let us walk through those rooms. The default tab, the one you land on first, is the Code tab. We will spend a lot of time here. Next to it, you will find the Issues tab.

**Jamie:** Issues are your discussion board. This is the room where people report bugs, request new features, or ask questions. If you find a problem with the software, you go to the Issues tab to tell the team about it.

**Alex:** Next is the Pull Requests tab. So a pull request, and I love that name because you are literally requesting that someone pull your changes into their project, is a proposal to merge your code. When you write new code and want to share it with the project, you open a pull request.

**Jamie:** Then we have the Actions tab. Actions are automated scripts. This is the robot room of the office. It is where automated tests run every time someone submits new code, to make sure nothing is broken.

**Alex:** And finally, depending on your permissions, you might find the Settings tab. This is the manager's office. It is usually only visible to the maintainers of the project, and it is where they control permissions and repository features.


**Alex:** Let us focus on that first tab, the Code tab. When you are on the Code tab, the main piece of content is the files table. This table shows every file and folder currently in the project.

**Jamie:** To get to the files table quickly, I press the T key to jump to the next table on the page. My screen reader will announce something like, table with twenty rows and three columns.

**Alex:** Those three columns are very important. The first column is the Name of the file or folder. The second column is the Message, which tells you the most recent change made to that specific file. And the third column is the Age, which tells you how long ago that change happened.

**Jamie:** Navigating this table is a great time to use your screen reader table commands. If I am using N V D A or Jaws, I hold down Control and Alt, and use my arrow keys. Pressing Control plus Alt plus Down Arrow moves me to the next row, which is the next file. Pressing Control plus Alt plus Right Arrow moves me across the columns, from the file name, to the message, and then to the age.

**Alex:** And if you are using VoiceOver on a Mac, you will hold down the V O keys, plus Shift, and use your arrow keys to move through the table cells.

**Jamie:** One thing that confused me at first was telling the difference between a file and a folder in that table. But I learned that if it is a folder, the screen reader will announce a slash at the end of the name. If you press Enter on a folder, the page reloads and shows you the contents of that specific folder.

**Alex:** Exactly. Now, immediately following the files table in the reading order is the read me section. The read me dot m d file is a markdown file that acts as the welcome mat for the project. GitHub automatically renders this file and displays it right below the files table.

**Jamie:** The read me is its own landmark region, so you can press D to jump to it. Because it is rendered markdown, it has a full heading structure. I always press the H key to read through the headings in the read me so I can quickly understand what the project does and how to install it.


**Alex:** Before you reach the files table, there is a very important control called the branch selector. To understand this, we need to define what a branch is, and why repositories have them.

**Jamie:** A branch is a separate line of development inside a repository. If we all edited the exact same files at the exact same time, it would be complete chaos. Branches give us parallel timelines to work in safely.

**Alex:** That is exactly right. A branch lets you isolate your work.

**Jamie:** My favorite analogy for a branch is baking. Imagine you are baking a cake from a cherished family recipe. You want to try adding lemon zest to the batter, but you absolutely do not want to ruin the original recipe card in case your experiment tastes terrible. So, you copy the entire recipe onto a brand new card, write Lemon Experiment at the top, and make your changes there. That new card is a branch. If the cake turns out delicious, you can permanently update the original recipe later.

**Alex:** And that original recipe card has a name. It is called the default branch. On modern GitHub projects, the default branch is almost always named main. The main branch holds the stable, official version of the project. Whenever you navigate to a repository, you are viewing the main branch by default.

**Jamie:** To switch to a different branch, you use the branch selector. You can press the B key to jump to buttons until you hear the current branch name, which usually sounds like main branch button. When you press Enter, it opens a dropdown panel.

**Alex:** This dropdown is a live region. As soon as it opens, your focus is placed in a search field. You can simply start typing the name of the branch you are looking for.

**Jamie:** Then, you press the Tab key to move into the filtered results list, and use your Up and Down arrows to find the exact branch. Once you press Enter, the entire page reloads, and the files table will now show the code exactly as it exists on that specific branch.


**Alex:** Let us talk about the history of those changes. When you are exploring the files table, you hear the message column. Those messages come from commits. A commit is a saved snapshot of your changes at a moment in time.

**Jamie:** I like to think of the commit history as the ultimate project guestbook. If the repository is a magical filing cabinet, the commit history is the unalterable ledger sitting right on top of it. Every single time someone puts a file in or takes one out, they have to sign the ledger, write the exact date and time, and write a little note explaining exactly what they did and why.

**Alex:** That is a great comparison. A commit is not just the code that changed. It is the who, the what, and the when. And you can read this entire ledger. On the Code tab, you can navigate to a link that says something like, one thousand commits.

**Jamie:** When you activate that link, you are taken to the commit history page. The commits are grouped by date, and you can use your heading navigation, pressing the H key or the number three key, to jump through the dates. Then you use the I key to move through the individual list items, which are the commits themselves. It is fascinating to read through the history and see how a project evolved day by day.


**Alex:** So far, we have been browsing code on the GitHub website. But eventually, you will want to work on the code yourself. This brings us to two fundamental concepts, cloning and forking. Let us define cloning first. What does cloning mean?

**Jamie:** Cloning means copying a remote repository from GitHub down to your local computer. You are making a full, working clone of the project on your own hard drive, including its entire history.

**Alex:** Right. If the repository is a massive encyclopedia in the library, cloning is like checking that encyclopedia out and bringing it to your own desk at home. You can flip through all the pages, read the history, and work with the material entirely offline.

**Jamie:** But what if I want to make changes and give them back to the project? I do not have permission to just change their official encyclopedia. This is where forking comes in. A fork is a personal copy of someone else's repository, but it lives in your own GitHub account in the cloud.

**Alex:** Exactly. You fork a project on GitHub to create your own copy where you have full control.

**Jamie:** My analogy for forking is business. Forking is like buying a franchise of a popular restaurant. You are given the exact blueprints, the menu, and the operations manual of the original restaurant. But this new building belongs to you. You can try out new recipes in your kitchen without affecting the original restaurant. But, if you invent a brilliant new dish, you can send a proposal back to headquarters, asking them to add it to the official menu. That proposal is your pull request.

**Alex:** That is brilliant. So, to recap the workflow, you fork the original project to your GitHub account, and then you clone your personal fork down to your computer.

**Jamie:** OK that sounds like a lot of steps. I navigate to the repository, I fork it on the website, then I open my terminal, then I find the web address, and then I clone my fork to my computer?

**Alex:** It does! But here is the thing, you have already done most of this on Day One. Same workflow, just with V S Code handling the heavy lifting. Once you understand the concepts, the actual execution becomes second nature.


**Alex:** Let us talk about the actual mechanics of cloning. When you are on the Code tab, there is a very prominent button labeled simply, Code.

**Jamie:** I usually navigate to the main repository heading by pressing the number one key, and then press the B key to move to the next button, which is the Code button. When you press Enter or Space to activate it, it opens a flyout panel.

**Alex:** This panel has a few different tabs for how you can get the code, specifically H T T P S, S S H, and GitHub C L I.

**Jamie:** If you are using standard Git in your terminal, you would make sure the H T T P S tab is selected, press the Tab key to find the copy url to clipboard button, and press Enter. Then you go to your terminal and type git clone, followed by a space, and paste that long web address.

**Alex:** But there is a faster way if you have the GitHub Command Line Interface installed. We call it the g h tool.

**Jamie:** Oh I love the g h tool. In that same flyout panel, you can choose the GitHub C L I tab. The command it gives you is so much simpler. Instead of a long web address, you just type g h repo clone, followed by a space, and then the owner name, a slash, and the repository name. So to clone the learning room, you just type g h repo clone community dash access slash learning dash room. It is so clean.

**Alex:** It really is. Now, what if someone just wants the files to read, and they do not care about the Git history or making contributions?

**Jamie:** If you keep pressing the Tab key inside that Code flyout panel, you will eventually reach a button called Download zip. This gives you a compressed zip folder of the code exactly as it is right this second.

**Alex:** Right. But remember, a downloaded zip folder is not tracked by Git. It is like printing out a physical photograph of the code instead of downloading the digital file. You can look at it, but you cannot push any changes back to GitHub from a downloaded zip file. You only use Download zip if you are just exploring.


**Alex:** Before we wrap up, we need to talk about one more important region on the repository page. The sidebar.

**Jamie:** Yes! After the read me section in the reading order, you will find the sidebar content. To get there quickly, I press the D key until I reach the Main landmark, and then I press the number two key or the H key to jump to the heading called About.

**Alex:** The About section is critical because it contains the project description, a link to the project website if they have one, and the repository topics.

**Jamie:** Topics are essentially tags. They tell you what the project is built with or what it is for. You might hear topics like python, accessibility, screen reader, or machine learning. It is a great way to quickly understand the context of the code.

**Alex:** And right next to the About section, you will find the license. The license is fundamentally what makes open source work. It is a legal document that tells you exactly what you are allowed to do with this code. If a repository does not have a license, you technically do not have permission to use, modify, or distribute it, even if it is completely public on GitHub. Always check the license.


**Alex:** We have covered a massive amount of ground today. Let us review our main takeaways.

**Jamie:** Takeaway number one. A repository is your main project container. You can navigate its different areas, like Code, Issues, and Pull Requests, by finding the Repository Navigation landmark.

**Alex:** Takeaway number two. The Code tab contains the files table. You can use your screen reader table commands to read across the rows, checking file names, commit messages, and how long ago the file was changed.

**Jamie:** Takeaway number three. Branches let you work on parallel versions of the code safely, just like testing a recipe on a new card. The official, stable version is almost always kept on the default branch, which is called main.

**Alex:** Takeaway number four. Forking creates your own personal copy of a project in the GitHub cloud, like buying a franchise. Cloning downloads a working copy to your local computer, like checking a book out of the library.

**Jamie:** And takeaway number five. The commit history is the unalterable guestbook of the project. It tells you exactly who changed what, and when they did it.

**Alex:** Perfect summary. In our next episode, we are going to put all of this theory into practice. We will be entering The Learning Room, where you will navigate these tabs yourself and make your very first open source contribution.

**Jamie:** I cannot wait for that one. Thank you all for listening, and we will see you in the next episode!

</details>


### Episode 4: The Learning Room

Your shared practice environment: challenges, PR workflow, bot feedback, peer review.

Based on: [Chapter 3: The Learning Room](docs/04-the-learning-room.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep04-the-learning-room.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep04-the-learning-room.mp3">Download Episode 4 (MP3)</a>
</audio>

[Download Episode 4 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep04-the-learning-room.mp3)

<details>
<summary>Read Transcript - Episode 4: The Learning Room</summary>

#### Transcript

**Alex:** Welcome back to Gitt Going with GitHub. This is episode four, titled The Learning Room. I am Alex, and I am here to guide you through the wonderful, sometimes chaotic, but always rewarding world of open source collaboration.

**Jamie:** And I am Jamie. I am relatively new to GitHub, having learned it just about two years ago. I am here to ask all the questions that you might be thinking, and hopefully help us all avoid the mistakes I made when I was first starting out.

**Alex:** We are so glad to have you here. In this episode, we are talking about the Learning Room. This is a very special part of the GitHub workshop experience. But before we dive into that, let us do a quick recap. In episode three, we talked about navigating repositories.

**Jamie:** Right, we talked about how a repository is essentially the master project folder. It holds all the files, the history of changes, and the branches. And we talked about how a branch is like a parallel universe where you can safely make changes without breaking the main project.

**Alex:** Exactly. If you are feeling a little fuzzy on how to move through a repository using your screen reader, or how to explore a file tree, you might want to pause this and go back to episode three. But if you are ready to keep going, let us talk about the Learning Room.


**Alex:** During your first day of learning GitHub, you are actually working on two parallel tracks. Track one is your individual skills track. This happens on your personal GitHub account. You work through modules at your own pace, and a friendly automated bot named Mona guides you step by step.

**Jamie:** I like Mona. Mona is very patient when I forget to commit my changes.

**Alex:** Mona is great. But track one is private. It is just you and the bot. Track two is the Learning Room contribution sprint. And this is completely different. The Learning Room is a single, shared GitHub repository where all the workshop participants collaborate together at the exact same time.

**Jamie:** Wait, all of us? In one repository? At the same time? That sounds like a recipe for overriding each other's work.

**Alex:** It sounds like it, but that is the magic of GitHub. Think of the Learning Room like a large community kitchen. Track one, with Mona, is like practicing chopping vegetables in your own private kitchen at home. You can take your time, and nobody is watching. But the Learning Room is the community kitchen. You are at one prep station, someone else is at the stove, someone else is baking bread. You can all hear and interact with each other, you are all contributing to the same massive meal, but because everyone has their own specific task and their own branch, you do not bump elbows.

**Jamie:** Okay, I love that analogy. But why do we do it this way? Why not just keep practicing in our private kitchens?

**Alex:** Because open source is a community kitchen. Real open source projects are shared spaces. By putting everyone in one repository, we create a realistic environment. You get to see other people's work, you learn from the person sitting next to you, and we can practice peer review.

**Jamie:** That makes sense. It bridges the gap between learning the buttons to press, and actually working with other human beings.

**Alex:** Exactly. Now, to understand how we collaborate in this space, we need to talk about the workflow. Specifically, the fork, edit, and pull request workflow.

**Jamie:** Oh, good. I hear the word fork all the time. I know what a branch is, but what is a fork? Is it just another utensil in our community kitchen?

**Alex:** Great question. Let us define it. A fork is a complete, personal copy of someone else's repository, placed into your own GitHub account. Let us say you find an amazing open source project, but you do not have permission to change their files directly. You would create a fork. That makes a copy in your account where you have full control. You make your edits there.

**Jamie:** Okay, so I fork the project, I make my changes in my copy. But how does the original project get those changes?

**Alex:** That is where the Pull Request comes in. And I love that name because you are literally requesting that the original project owners pull your changes from your fork into their project. In standard open source, this fork, edit, and pull request workflow is how almost everything gets done.

**Jamie:** So in the Learning Room, are we all forking the repository?

**Alex:** In the Learning Room, we actually simplify it just a bit to keep us all in one space. Instead of everyone making their own separate fork, we give everyone permission to create branches directly inside the shared Learning Room repository. You will still create a branch, make your edit, and open a Pull Request. It is the exact same workflow you use with a fork, just contained within one big shared house so we can all see each other's pull requests easily.


**Jamie:** Okay, so we are in this shared community kitchen. What are we actually cooking? What are the tasks?

**Alex:** We call them challenges. Inside the Learning Room repository, there is a folder called docs. Inside that folder, there is a file called CHALLENGES dot M D. M D stands for Markdown. This file is your menu. It lists twelve different challenges organized by skill level, from beginner to expert.

**Jamie:** How do I find my challenge and know what to do?

**Alex:** You will navigate to that challenges file and read through the options. Each challenge tells you exactly which file you need to edit, what skills you will practice, and what the success criteria are. And here is the fun part. The practice files you will be editing have intentional mistakes built into them.

**Jamie:** Intentional mistakes? Like a scavenger hunt?

**Alex:** Exactly like a scavenger hunt. Let me give you an example. There is a file called welcome dot M D. It is supposed to be an introduction to open source for newcomers. But it has three sections marked with the word TODO in capital letters, where the content is just missing.

**Jamie:** Oh, I have seen those in real projects. Someone writes a document, gets tired, types TODO, and leaves it for someone else.

**Alex:** Precisely. One of the beginner challenges is to find those TODO markers, delete them, and write the missing paragraphs. Another file is called keyboard dash shortcuts dot M D. This is a reference guide for screen reader shortcuts. It has tables for N V D A, JAWS, and VoiceOver. But we purposely put incorrect shortcuts in those tables.

**Jamie:** Oh, that is devious. I love it. So we have to find the wrong shortcut and fix it?

**Alex:** Yes, and you have to do it without breaking the structure of the Markdown table. It is fantastic practice. There is also a setup guide file with broken links that point to nowhere. Your job might be to track down the broken links and update them to the correct web address.

**Jamie:** Okay, that sounds like a lot of fun, actually. But how do I know when I am done? Do I just save the file and yell across the room that I finished?

**Alex:** Not quite. You know you are done when your Pull Request is merged into the main project. Merging means your changes are officially accepted and combined with the original file. When that happens, an automated bot will actually post a celebration comment on your pull request and award you a digital badge.


**Jamie:** Alright, let us talk about opening that Pull Request. I remember the first time I had to open a Pull Request. I was terrified. I felt like I was standing on a stage and everyone was about to judge my code.

**Alex:** That is a very common feeling. It can feel incredibly intimidating. You are putting your work out there for public review.

**Jamie:** It really is intimidating! OK, that sounds like a lot of steps. Creating branches, making edits, opening this request for everyone to see.

**Alex:** It does! But here is the thing. You have already done most of this on Day 1 in your private track. It is the exact same workflow. And remember, the Learning Room is a safe environment. Every single person in that repository is learning, just like you. And we have built safety nets into the process.

**Jamie:** Safety nets? Like what?

**Alex:** The first safety net is our automated bot. We call it the Learning Room PR Bot. The moment you open your Pull Request, within about thirty seconds, this bot springs into action.

**Jamie:** What does the bot do? Does it grade my work?

**Alex:** I prefer to think of it as a friendly automated building inspector who walks through the house before the open house begins. The bot checks to make sure you edited the correct file. It checks your Markdown formatting to ensure you used headings correctly. If you added an image, it checks to make sure you included alternative text for screen readers. It even checks to ensure you did not leave any broken links behind.

**Jamie:** Wow, that is really thorough. What happens if I messed something up? Does it reject my Pull Request?

**Alex:** Never. The bot never fails your Pull Request or closes it. Instead, it posts a very detailed, educational comment on your Pull Request. It tells you exactly what it found, explains why it matters for accessibility or formatting, and gives you links to documentation so you can learn how to fix it.

**Jamie:** Oh, I wish I had known that when I started. An automated proofreader that explains things nicely instead of just yelling error messages at me.

**Alex:** Exactly. It gives you instant feedback. And you can push a new commit to your branch to fix the issues, and the bot will run again and update its report. It is a completely low-stakes way to practice getting technical feedback.


**Alex:** But the bot is only the first step. The second step is human peer review. And this is where the real magic of the Learning Room happens.

**Jamie:** Peer review. So, reading and commenting on classmate work. How does that work? Do I just pick someone at random?

**Alex:** We have another automation called the pairing bot. When you open your Pull Request, the pairing bot looks at the roster of students and automatically assigns one of your classmates to be your reviewer. It tries to balance the workload so nobody gets overwhelmed.

**Jamie:** So someone else in the workshop gets a notification saying, Jamie needs you to review their work?

**Alex:** Yes. And the bot even posts a comment giving the reviewer instructions on what to look for. It might say, please check that Jamie completed all three TODO sections, and that the new paragraphs read well.

**Jamie:** Okay, so let us walk through this from the perspective of the reviewer. Let us say I get that notification. I have been assigned to review your Pull Request, Alex. How do I navigate that with my screen reader? Where do I go?

**Alex:** This is a great practical question. First, you will navigate to the Learning Room repository in your browser. From the main repository page, you need to navigate to the Pull Requests tab.

**Jamie:** How do I find that tab efficiently?

**Alex:** If you are using N V D A or JAWS on Windows, you can use GitHub's built-in keyboard shortcuts. Press the letter G, followed by the letter P. That stands for Go to Pull requests.

**Jamie:** Oh, that is clever! G then P. Does that work for VoiceOver on Mac too?

**Alex:** Yes, those are GitHub specific shortcuts, so they work across platforms as long as your screen reader is passing the keystrokes through. Once you are on the Pull Requests page, you will be in a list of all open pull requests. If it is a busy workshop, there might be thirty pull requests in that list.

**Jamie:** That sounds overwhelming. How do I find the one I am supposed to review?

**Alex:** You use the filter. Navigate to the filter text box. By default, it says something like, is open is PR. You can clear that and type a specific filter query. You will type, review dash requested, then a colon, then the at symbol, and the word me. So, review requested colon at me. Press Enter.

**Jamie:** And that filters the list to only show the ones where I am the assigned reviewer?

**Alex:** Exactly. Now you can use your screen reader's heading navigation. Press the letter H to jump from one pull request title to the next. When you hear the title of the one you want, press Enter to open it.

**Jamie:** Okay, I am on the Pull Request page. What am I looking at? Or rather, what am I listening to?

**Alex:** A Pull Request page has a few different tabs, but the two most important ones are the Conversation tab, and the Files Changed tab. You land on the Conversation tab by default.

**Jamie:** The Conversation tab. Is that where the bot leaves its report and where people leave comments?

**Alex:** Yes. You can use heading navigation here as well. Every comment is a heading. You will find the original description of the Pull Request, the automated bot's report, and any discussion that has happened so far. You will also find a section called Reviewers, usually marked as a heading level three, which confirms that you are assigned.

**Jamie:** So I read the conversation to get context. But how do I actually see the changes you made to the code or the text?

**Alex:** For that, you navigate to the Files Changed tab. Once you activate that tab, you are looking at the diff.

**Jamie:** The diff. Let us define that. A diff is short for difference. It is a special view that shows exactly what was added and what was removed from a file.

**Alex:** Right. Navigating a diff with a screen reader takes a little practice. GitHub presents the diff as a table or a structured list of lines. As you arrow down through the content, your screen reader will announce the state of each line.

**Jamie:** What does that sound like?

**Alex:** If a line was added, your screen reader will usually say plus, or inserted, before reading the text. If a line was removed, it will say minus, or deleted. Unchanged lines, which are just there to give you context, are read normally without a prefix.

**Jamie:** So if you were fixing a typo in the word GitHub, I would hear a minus line with the misspelled word, immediately followed by a plus line with the correctly spelled word?

**Alex:** Exactly. You can read through the entire file this way, line by line, to see exactly what the author changed.

**Jamie:** Okay, so I have read your changes. I think they look great, but I want to suggest one small addition. How do I leave my review?

**Alex:** On the Conversation tab, there is a large text area for adding a comment. If you are using N V D A, you might press N V D A plus Space to enter Focus Mode, or Forms Mode for JAWS, so you can type freely. If you are using VoiceOver on a Mac, you would navigate to the text area and press V O plus Shift plus Down Arrow to interact with it.

**Jamie:** I type my feedback. Do I just say, looks good?

**Alex:** You could, but helpful peer review is specific. You might say, I love the paragraph you added about assistive technology. One suggestion, maybe we could add a link to the official documentation here.

**Jamie:** That is a great way to phrase it. It is encouraging but offers a clear improvement. So I type that out. Then what?

**Alex:** Then you navigate to the button called Review Changes. When you activate it, you get to choose the type of review. You can choose Comment, which is just leaving feedback without passing judgment. You can choose Approve, which means you think it is perfect and ready to be merged. Or you can choose Request Changes, which means there is something specific that must be fixed before it can be merged.

**Jamie:** So if you missed one of the TODO markers, I would choose Request Changes and politely let you know.

**Alex:** Exactly. Once you select your option, you navigate to the Submit Review button and press Enter. The author gets a notification, and they can push a new commit to address your feedback.


**Jamie:** I really like this process. But I have to ask, what if I am assigned to review someone's work, and I do not know if their code is right? I am a beginner too. I might approve something that is actually broken.

**Alex:** That is the beauty of the Learning Room. It is completely low stakes. Remember the flight simulator analogy?

**Jamie:** A flight simulator. Where you can crash the plane without actually hurting anyone.

**Alex:** Exactly. We want you to make mistakes here. If you approve a Pull Request that has a formatting error, the automated bot will probably catch it anyway. And even if the bot misses it, and it gets merged into the repository, that is fine! It just becomes a new challenge for the next student to fix.

**Jamie:** Oh, I never thought of it that way. A mistake just creates more open source work for the community.

**Alex:** Right. The goal here is not perfect code. The goal is building confidence. When you practice this fork, edit, and pull request workflow in a safe environment, you are building muscle memory.

**Jamie:** So when I go to contribute to a huge project like N V D A or React, my hands will already know the keyboard shortcuts. I will already know how to filter for my reviews.

**Alex:** Precisely. Because the steps you take in the Learning Room are the exact same steps you take on the biggest open source projects in the world. And I want to emphasize this. When you merge a Pull Request in the Learning Room, it is a real contribution.

**Jamie:** It is not a simulation?

**Alex:** The environment is designed for learning, but the technology is real. You found an issue, you made a meaningful change, you received technical feedback from a bot, you received human feedback from a peer, you incorporated their suggestions, and you merged your work. That is open source contribution in its purest form. You will have a merged commit in your GitHub history to prove it.

**Jamie:** That is incredibly motivating. It takes the fear out of the process and replaces it with a sense of community.


**Alex:** Let us wrap up with a few key takeaways from our discussion today. First, the Learning Room is a shared repository where everyone collaborates together. It is designed to simulate the bustling, collaborative nature of a real open source project.

**Jamie:** Second, the practice challenges are real files with intentional mistakes. You find your challenge in the docs folder, make your fixes on a branch, and open a Pull Request.

**Alex:** Third, you are supported by two types of feedback. The automated bot gives you instant, low-stakes technical feedback on accessibility and formatting. And your peers give you human feedback on your content.

**Jamie:** And finally, leaving a peer review is just as important as writing the code. You use the filter review requested colon at me to find your assignments, read the diff to see what changed, and leave constructive, encouraging comments.

**Alex:** Beautifully summarized. In our next episode, we are going to dive deeper into how projects organize all of this work. We will be talking about Working with Issues. Issues are how we track bugs, plan features, and figure out what to work on next.

**Jamie:** I cannot wait. Tracking tasks is my favorite kind of organizing.

**Alex:** Thank you all for listening to Gitt Going with GitHub. Take a deep breath, go open that first Pull Request in the Learning Room, and we will see you in the next episode.

</details>


### Episode 5: Working with Issues

Filing, searching, filtering, commenting on, and managing GitHub issues.

Based on: [Chapter 4: Working with Issues](docs/05-working-with-issues.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep05-working-with-issues.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep05-working-with-issues.mp3">Download Episode 5 (MP3)</a>
</audio>

[Download Episode 5 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep05-working-with-issues.mp3)

<details>
<summary>Read Transcript - Episode 5: Working with Issues</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode 5, Working with Issues. I am Alex, and I am here to guide you through the accessibility and workflow concepts that will help you thrive in open source.

**Jamie:** And I am Jamie. I am a blind developer who started learning GitHub about two years ago, and I am here to ask all the questions that you are probably thinking right now.

**Alex:** It is great to have you here, Jamie. In episode 3, we covered repository navigation and how to move between the different tabs of a project. Today, we are diving deep into one of those specific tabs, the Issues tab. We will cover what issues are, how to read them, how to file them, and how to manage them.

**Jamie:** I remember when I first heard the word issue in the context of programming. In everyday life, having an issue sounds like a bad thing. Like a problem. I thought it meant I broke something.

**Alex:** That is such a common reaction! But in GitHub, an issue is not necessarily a bad thing at all. Think of an issue simply as a unit of work. It is a dedicated discussion thread attached to a repository. Yes, it can be a bug report, but it can also be a feature request, a question, a task, or an accessibility report.

**Jamie:** So it is basically a digital manila folder for a specific topic.

**Alex:** Exactly. That is a perfect analogy. If you want to add a new button to your application, you open a manila folder, write Add New Button on the tab, and put all your notes, questions, and checklists inside that folder. On GitHub, that folder is an issue. It keeps the conversation focused and gives everyone a place to collaborate before any code is actually written.


**Jamie:** Okay, so how do I actually find these manila folders? Say I am on a repository page right now.

**Alex:** If you are using a screen reader, you can navigate by landmarks to the Repository navigation region, then press your Tab key until you reach the Issues tab. Your screen reader will usually announce the word Issues followed by the number of open issues, like, Issues, 14 open. Then you just press Enter.

**Jamie:** Is there a faster way? You know I love keyboard shortcuts.

**Alex:** There is! If you are in Focus Mode, you can press the letter G, release it, and then press the letter I. G stands for Go, and I stands for Issues. That will jump you straight to the Issues tab from anywhere in the repository.

**Jamie:** Oh, that is clever. Go to Issues. G then I. I will definitely use that. So once I am on the Issues page, what does the structure look like?

**Alex:** The page is built around a search and filter bar at the top, followed by some buttons to switch between Open and Closed issues, and then the main event, which is the issues list itself.

**Jamie:** How should I navigate that list with my screen reader?

**Alex:** The best way is to use your heading navigation. Every issue title in the list is a heading level 3 link. So if you press the number 3 on your keyboard, you will jump from issue to issue. Your screen reader will announce the title, the issue number, any labels attached to it, who opened it, and how many comments it has.

**Jamie:** That sounds like a lot of information. Does it read it all at once?

**Alex:** It usually reads it as a single block of text when you land on the heading. If you want to explore a specific issue in more detail before opening it, you can use your down arrow to read the individual elements like the author and the timestamp.


**Jamie:** Let us talk about that search and filter bar you mentioned. If a project has hundreds of open issues, pressing the number 3 to read all of them is going to take all day.

**Alex:** You are absolutely right. That is where filtering comes in. It is like having an assistant who can instantly pull only the manila folders you care about from a massive filing cabinet. To reach the search bar, you can navigate to it using your form field shortcut, which is usually the letter E or F depending on your screen reader.

**Jamie:** And when I get there, I need to switch to Focus Mode to type, right?

**Alex:** Yes, exactly. Switch to Focus Mode, which is Insert plus Space for NVDA, or Insert plus Z for JAWS. Once you are in the text field, you can type qualifiers to filter the list. For example, if you want to find bugs, you type the word is, followed by a colon, followed by the word open, then a space, then the word label, a colon, and the word bug.

**Jamie:** So, is colon open space label colon bug.

**Alex:** Correct. When you press Enter, the page updates instantly to show only open issues that have the bug label.

**Jamie:** What if I want to find issues that are assigned to me?

**Alex:** You would type assignee colon at me. The at symbol followed by the word me is a special shortcut in GitHub that always refers to your own username. You can also type author colon at me to find issues you originally filed.

**Jamie:** That is really powerful. Are there other ways to filter besides typing these queries out? Sometimes I forget the exact syntax.

**Alex:** Absolutely. Right near the search bar, there is an actions toolbar with dropdown buttons for Labels, Milestones, and Assignees. You can Tab to the Label button, press Enter to open the dropdown, use your up and down arrows to find the label you want, and press Enter to select it. When you press Escape to close the dropdown, the list filters automatically.

**Jamie:** You mentioned milestones. What is a milestone?

**Alex:** A milestone is just a way to group issues together by a target date or a specific release. For example, a project might have a milestone called Version 2 point 0. Filtering by that milestone shows you all the issues that need to be finished before Version 2 point 0 can launch.


**Jamie:** Okay, so I have filtered the list, I found an issue that sounds interesting, and I pressed Enter on the heading to open it. What does the actual issue page look like?

**Alex:** The page has a very specific anatomy. At the very top, you have the issue title as a heading level 1. Right below that, your screen reader will announce a status badge, telling you if the issue is Open or Closed.

**Jamie:** And then comes the description?

**Alex:** Yes. The original post, which we call the issue body or description, comes next. But before you read it, it helps to know about the sidebar. On the right side of the screen visually, there is a sidebar containing metadata. It has sections for Labels, Assignees, and the Milestone. These are marked as heading level 3s.

**Jamie:** So if I want to quickly check who is assigned to an issue, I can just press the number 3 until I hear Assignees?

**Alex:** Exactly. It is a great way to orient yourself. But for reading the main description, you want to stay in Browse Mode. The description is usually formatted using Markdown, which means GitHub turns it into proper HTML. Headings are real headings, bullet points are real lists, and code blocks will actually announce as code.

**Jamie:** I love that. There is nothing worse than reading a wall of unformatted text. So I can just use my normal screen reader commands to read the description line by line.

**Alex:** Yes. And below the description is the timeline. This is the activity stream of the issue. Every comment left by another person is a heading level 3. So to read a conversation, you just press the number 3 to jump from comment to comment.

**Jamie:** Does the timeline only show comments?

**Alex:** Good question. No, it shows events too. If someone adds a label, or assigns someone, or references a pull request, those events appear in the timeline chronologically between the comments. They usually read as simple text paragraphs, like, Jamie added the bug label 2 days ago.


**Jamie:** Let us flip the script. Instead of reading an issue, I want to file a new one. I found a bug where my screen reader is not announcing a button state, and I want to report it.

**Alex:** That is a perfect use case. From the issues list page, you will want to navigate to the New Issue button. You can use the letter K to move through links until you find it, or use your buttons shortcut. Press Enter to activate it.

**Jamie:** Does it just give me a blank text box?

**Alex:** Sometimes. But many open source projects use Issue Templates. If they do, you will land on a page asking you to pick a template. You might hear options like Bug Report, Feature Request, or Accessibility Issue. You just find the one you want and press Enter on its Get Started button.

**Jamie:** Okay, I picked the Bug Report template. Now I am on a form with a title and a body. I remember when I filed my first issue, I just made the title, Screen reader bug. Was that a bad title?

**Alex:** It is not terrible, but it is not very helpful to the maintainers. Think of the title like a news headline. It needs to be specific. A much better title would be, Screen reader does not announce expanded state on the main navigation menu.

**Jamie:** That makes sense. It tells them exactly what is wrong and where. So I type that into the title field using Focus Mode. Then I Tab to the description field.

**Alex:** Right. And this is where you write the body of your issue. If you selected a template, the text area might already have some headings in it, like What Happened, What I Expected, and Steps to Reproduce. You just fill in the details under each heading.

**Jamie:** Can I use formatting here? Like making the steps an actual numbered list?

**Alex:** Absolutely. The text area supports Markdown. Because you are in Focus Mode while typing, you can use keyboard shortcuts. Control plus B makes text bold. Control plus E formats text as a code block. And Control plus Shift plus the number 7 creates a numbered list.

**Jamie:** Oh, I did not know about Control plus Shift plus 7. That is way faster than typing out the numbers manually. What about task lists? I have seen issues that have actual checkboxes in them.

**Alex:** Task lists are incredibly useful! You can create them by typing a hyphen, a space, a left bracket, a space, a right bracket, and another space. It looks a bit like a little text drawing of an empty box. When you submit the issue, GitHub renders that as a real, interactive checkbox.

**Jamie:** That sounds like a lot of steps. Hyphen, space, bracket, space, bracket.

**Alex:** It does! But here is the thing, you have already done most of this on Day 1 of your programming journey. It is just typing characters. And if you use VS Code to write your issue drafts, you can use extensions that handle the heavy lifting for you.

**Jamie:** That is a relief. So I have written my steps to reproduce. Is there anything specific I should include because it is an accessibility bug?

**Alex:** Yes, always include your environment details. Tell them exactly which screen reader and version you are using, like NVDA 2025 point 3. Tell them your browser and your operating system. A bug might happen on Firefox but not on Chrome, so that context is crucial for the maintainer trying to fix it.


**Jamie:** Okay, the issue is filed. What happens when someone replies? How do I comment back?

**Alex:** When you open the issue, you can jump straight to the comment box by navigating to the landmark called Add a comment. Or, if you prefer shortcuts, you can just press the letter R while reading a previous comment to reply and automatically quote their text.

**Jamie:** I love the R shortcut. Once I am in the text area, it is just like writing the issue body, right? Focus mode, type my reply, use markdown if I want to.

**Alex:** Exactly. And when you are ready to post it, you do not even need to Tab to the submit button. You can just press Control plus Enter from right inside the text area to submit your comment.

**Jamie:** What if someone leaves a comment that just says, I will look into this today. I want to acknowledge it, but leaving a comment that just says Thanks feels like it might clutter the timeline.

**Alex:** That is a brilliant observation. Open source maintainers get a lot of notifications, so adding a comment just to say thanks or I agree can sometimes be overwhelming. Instead, you should use Reactions.

**Jamie:** Reactions? Like emojis?

**Alex:** Yes. Reactions are a form of lightweight feedback. Every comment has a button to add a reaction. You can add a thumbs up, a heart, a smile, or even a rocket ship. It communicates your acknowledgement without sending an email notification or cluttering the thread.

**Jamie:** Analogy time! It is like nodding your head in a meeting. You are showing you understand and agree, without actually interrupting the speaker to say the word yes.

**Alex:** That is perfectly stated. Nodding in a meeting. Use reactions to nod.


**Jamie:** Let us talk about connecting things together. I have noticed people typing the number sign, or the hash symbol, followed by a number in their comments. What does that do?

**Alex:** That is how you cross-reference issues. Every issue and pull request has a unique number. If you are typing a comment and you type the number sign followed by 42, GitHub automatically turns that into a link pointing to issue number 42.

**Jamie:** Does it do anything besides make a link?

**Alex:** It does! It creates a two-way connection. If you mention issue 42 in your new issue, a timeline event automatically appears over on issue 42 saying that you referenced it. It is like a digital string tying the two documents together, so anyone reading either issue can find the other.

**Jamie:** That is so helpful for keeping track of related bugs. I also read something about magic closing keywords. What are those?

**Alex:** This is one of the best automations in GitHub. Let us say you open a pull request with code that fixes issue number 42. In the description of your pull request, you type the word Closes, followed by the number sign, and the number 42.

**Jamie:** Closes number 42.

**Alex:** Right. When your pull request is approved and merged into the project, GitHub sees that keyword and automatically closes issue 42 for you. You do not have to go back and do it manually. You can also use words like Fixes or Resolves.


**Jamie:** You mentioned closing an issue. As a beginner, closing an issue sounds scary. Like I am deleting it forever.

**Alex:** I completely understand that fear. But closing an issue does not delete anything. It just changes its state from Open to Closed. It is like crossing a task off your paper to-do list. You did not shred the paper, you just drew a line through the text. The history, the comments, and the decisions are all preserved permanently.

**Jamie:** So if I realize a bug is actually not fixed, can I un-cross it off the list?

**Alex:** Yes, you can. At the bottom of any closed issue, the Close Issue button changes into a Reopen Issue button. You just navigate to it, press Enter, and the issue is back in the Open state.

**Jamie:** Who normally closes issues? Can I close someone else's issue?

**Alex:** Usually, only the repository maintainers, or the person who originally opened the issue, have the permission to close it. This brings us to issue management. If you are a maintainer, or if you have write access to a repository, you can manage issues by assigning them and labeling them.

**Jamie:** How do I assign an issue to myself so people know I am working on it?

**Alex:** You go to the issue sidebar. Remember those heading level 3s? You navigate to the Assignees heading. Right next to it is a button to manage assignees. Press Enter to open it, type your username, and select yourself from the dropdown.

**Jamie:** And applying labels works the same way?

**Alex:** Exactly the same. Navigate to the Labels heading, open the menu, select the labels you want, and press Escape to close. Labels are crucial for organizing work. In fact, there is one specific label every beginner should know about. It is called good first issue.

**Jamie:** Oh, I have seen that one!

**Alex:** Maintainers use the good first issue label to mark bugs or tasks that are perfect for people who are new to the project. The scope is usually small, and the maintainer is willing to mentor whoever picks it up. If you are looking to make your first open source contribution, searching for is colon open label colon quote good first issue unquote is the best way to start.


**Jamie:** Everything we have talked about so far has been in the browser. But in earlier episodes, you showed me how to do things from my computer's terminal. Can I manage issues from the command line too?

**Alex:** You absolutely can, using the GitHub CLI. The command is g h space issue.

**Jamie:** What kind of things can I do with it?

**Alex:** Almost everything. If you open your terminal and type g h space issue space list, it prints out a list of all open issues right in your console. You can even filter it by typing g h issue list dash dash label bug.

**Jamie:** That is so fast. What if I want to read one?

**Alex:** You type g h issue view followed by the issue number. It will print the title, the description, and all the comments into your terminal. Because it is just plain text in your console, your screen reader will read it flawlessly without needing to navigate complex web page structures.

**Jamie:** Can I create an issue from the terminal too?

**Alex:** Yes, by typing g h issue create. It will launch an interactive prompt that asks you for the title, and then opens your default text editor so you can write the body. It is a fantastic alternative if you find web forms tedious.


**Jamie:** This has been incredibly helpful, Alex. I feel like I understand the flow of conversation on GitHub so much better now.

**Alex:** I am glad to hear that, Jamie. Let us recap the key takeaways for today. First, an issue is a dedicated discussion thread for a unit of work, like a bug report or a feature request.

**Jamie:** Second, use the search bar and filters to find what you need. Typing is colon open label colon bug will save you from reading through hundreds of irrelevant headings.

**Alex:** Third, when reading an issue, use your heading navigation. The title is a level 1, sidebar sections and comments are level 3s. Stay in Browse mode to read, and switch to Focus mode when typing your comments.

**Jamie:** Fourth, when filing an issue, be specific! Write a headline, not just a vague category. And remember to use Markdown to format your steps to reproduce clearly.

**Alex:** And finally, use the magic keywords like Closes number 42 in your pull requests to automatically close issues when your work is done. Connecting your work creates a clear history for everyone.

**Jamie:** Speaking of pull requests, I hear that is what we are covering next.

**Alex:** We certainly are. In our next episode, Working with Pull Requests, we will take the code you have written and learn how to propose it to a project. We will cover the review process, leaving inline comments, and finally getting that code merged. You will not want to miss it.

**Jamie:** I am looking forward to it. Thanks for listening, everyone!

**Alex:** See you next time on Gitt Going with GitHub.

</details>


### Episode 6: Working with Pull Requests

Creating, reviewing, commenting on, and merging pull requests.

Based on: [Chapter 6: Working with Pull Requests](docs/06-working-with-pull-requests.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep06-working-with-pull-requests.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep06-working-with-pull-requests.mp3">Download Episode 6 (MP3)</a>
</audio>

[Download Episode 6 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep06-working-with-pull-requests.mp3)

<details>
<summary>Read Transcript - Episode 6: Working with Pull Requests</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode six, Working with Pull Requests. I am Alex, and I am here to guide you through the accessibility of open source collaboration.

**Jamie:** And I am Jamie! I am here to ask the questions, share my own learning curve, and hopefully prevent you from making the same mistakes I did when I first started using GitHub a couple of years ago.

**Alex:** In our previous episodes, we covered a lot of foundational ground. In episode three, we talked about branches, which are safe parallel universes where you can experiment with code. And in episode five, we talked about issues, which are where we track bugs, feature requests, and discussions.

**Jamie:** Right. Issues are the conversation about the work that needs to be done, and branches are where you actually do the work. But that leaves a pretty big gap. How do we get the work from our experimental branch back into the main project?

**Alex:** That is exactly what a pull request is. A pull request, often just called a P R, is a formal proposal to merge the changes from your branch into another branch. I love the name because it is literal. You are requesting that the project maintainers pull your changes into their code.

**Jamie:** When I first started, I was constantly confusing issues and pull requests. They felt like the same thing because they both have titles, descriptions, and comment threads.

**Alex:** That is a very common point of confusion. Think of it like a restaurant. An issue is the order ticket. It says, we need a vegetarian pizza at table four. It describes the problem or the requirement. The pull request is the chef putting the finished pizza on the counter and saying, here is the food, can the manager verify it is vegetarian before we serve it?

**Jamie:** Oh, I like that. The issue is the work order. The pull request is the finished product waiting for inspection.

**Alex:** Exactly. An issue is just text and ideas. A pull request contains actual, modified code.


**Alex:** Before we talk about creating one, let us understand the anatomy of a pull request page on GitHub. When you navigate to a pull request, the page is divided into three main tabs.

**Jamie:** I use the landmarks for this. I press the D key to move through my ARIA landmarks until I hear Pull request navigation tabs.

**Alex:** Perfect. Inside that landmark, you will find three tabs. The first is the Conversation tab. This is where you will find the pull request description, the timeline of all comments, any automated status checks, and the merge button. It is the history of the proposal.

**Jamie:** The second tab is Commits. This is just a chronological list of the individual commits that make up your pull request. It is handy if you want to step through the author's thought process commit by commit.

**Alex:** And the third tab is Files changed. This is the heart of the pull request. It is where you go to read the diff. A diff is the before and after comparison of every single file that was modified. We are going to spend a lot of time talking about how to read a diff with a screen reader later in this episode.

**Jamie:** So, Conversation, Commits, and Files changed. That is the anatomy. How do we actually create one of these?

**Alex:** There are two main scenarios for creating a pull request. You are either creating it from a branch within the same repository, or you are creating it from a fork.

**Jamie:** Let us define those. A branch in the same repository is what we do at my company. We all have write access to the main repository, so I just create a branch called jamie dash new dash feature, do my work, and open a pull request.

**Alex:** Right. The analogy there is that you and your team all live in the same house. You are building a new cabinet in the garage, which is your branch. When it is done, you ask your roommates to help you move it into the living room, which is the main branch.

**Jamie:** But open source does not work like that, right? I cannot just go create a branch on the official Microsoft accessibility repository. They do not know me. They are not going to give me write access to their house.

**Alex:** Exactly. That is where forks come in. A fork is a complete, personal copy of someone else's repository that lives on your own GitHub account. You have full control over your fork. You can create branches there, commit code there, and break things there.

**Jamie:** So if the same repository branch is building a cabinet in the garage, a fork is building the cabinet at my own house across town.

**Alex:** Yes. And when the cabinet is finished, you load it into a truck, drive it over to the open source project's house, and submit a pull request asking if they want it. That is a cross-repository pull request. The beauty of GitHub is that the creation process is almost identical for both.

**Jamie:** When you push a new branch to GitHub, whether it is to your fork or the main repository, GitHub is pretty smart. If you navigate to the repository homepage shortly after pushing, you will usually find a banner with a button that says Compare and pull request. I just press Enter on that button.

**Alex:** That button is a fantastic shortcut. If you do not catch the banner in time, you can always navigate to the Pull requests tab and activate the New pull request button. When you do that, you have to select two things from a set of dropdown menus. The base branch, and the compare branch.

**Jamie:** I always used to mix those up. Base and compare.

**Alex:** It helps to read it as a sentence. You want to merge your compare branch into the base branch. The base is the foundation. It is the destination. Usually, this is the main branch of the project. The compare branch is your new work. You are asking GitHub to compare your work against the base.

**Jamie:** Once you select those, you land on the pull request form, which looks exactly like the form for creating a new issue. You have a title field and a description text area.

**Alex:** Writing a good pull request description is an art form. This is your chance to explain what changed, why it changed, and how the reviewer can test it.

**Jamie:** Please, please do not just name your pull request Fix bugs, and leave the description blank. I have been asked to review pull requests like that, and it is infuriating. I have no idea what I am supposed to be looking at.

**Alex:** A good title should be descriptive. Something like, Add keyboard navigation for the carousel component. For the description, many repositories provide a pull request template. If you tab into the description field and switch to Focus mode, you might find a checklist already waiting for you.

**Jamie:** If there is no template, I always try to include three things. First, a summary of what I did. Second, instructions on how to test my changes. And third, a link to the original issue.

**Alex:** Linking the issue is critical. If your pull request solves issue number forty two, you should type the word Closes, followed by a space, followed by the number sign, and the number forty two. Closes number forty two.

**Jamie:** GitHub has a magic feature where if you use that exact phrasing, the moment your pull request is merged, GitHub will automatically close issue forty two for you. It keeps the project so tidy.


**Jamie:** Okay, so what if I am working on that carousel keyboard navigation, and I have made some good progress, but I am stuck. The escape key is not closing the modal. I want to push my code and get your opinion, but I do not want you or the project maintainers to accidentally merge it, because it is broken.

**Alex:** This is the perfect time to use a draft pull request. A draft pull request is a way of putting a big, virtual Work In Progress sign on your code. It signals to the team that you are actively working on it, it allows you to ask for feedback, but the merge button is completely disabled. No one can merge it, not even the repository owner.

**Jamie:** How do I create a draft?

**Alex:** When you are on the form to create a new pull request, do not just activate the default Create pull request button. Next to it, there is a dropdown arrow button. If you activate that, you can select Create draft pull request instead.

**Jamie:** And when I finally figure out that escape key bug and I am ready for a real review, how do I remove the draft status? Do I have to open a new pull request?

**Alex:** Not at all. You just open your existing draft pull request, navigate to the Conversation tab, and scroll toward the bottom. You will find a button called Ready for review. Activating that button removes the draft status, turns on the merge button, and notifies everyone that you are ready for formal feedback.

**Jamie:** That is a relief. Okay, so my pull request is out of draft mode. It is open. But no one is looking at it. How do I get someone's attention?

**Alex:** You need to request a review. On the pull request page, there is a sidebar region. You can navigate to the Reviewers heading, which is a level three heading. Right below that, there is a button to request reviewers. Activating it opens a search field where you can type a teammate's username and select them.

**Jamie:** Sometimes I will open a pull request and I will notice that two people have already been requested as reviewers, and I did not even do it. It just happened automatically.

**Alex:** That is usually because of a file called CODEOWNERS. Many large repositories use this file to map specific folders to specific people. If you modify a file in the accessibility folder, GitHub automatically requests a review from the accessibility team. You cannot remove them; their approval is required.


**Alex:** So far, we have been the author. Now, let us flip the script. Jamie, I just requested your review on my pull request. You get an email notification, you follow the link, and you are on my pull request page. What is your workflow?

**Jamie:** The first thing I do is read your description on the Conversation tab so I know what you are trying to achieve. But then, I immediately move to the Files changed tab. That is where the truth is. The description is what you think you did. The Files changed tab is what you actually did.

**Alex:** And this is where we need to talk about screen reader navigation, because reading a code diff can be intimidating at first. When you activate the Files changed tab, GitHub presents a file tree on the left, and the actual diffs on the right.

**Jamie:** I love the file tree. I press D to navigate to the File tree region. It is a list of every file you modified. I can use my up and down arrows to hear the file names. It gives me a high level map of the damage you did to the codebase.

**Alex:** Once you are ready to read the code, you can use heading navigation. Every changed file is a level three heading. So you can press the number 3 to jump from file to file.

**Jamie:** When I land on a file heading, how do I actually read the changes?

**Alex:** Each file's diff is structured as an HTML table. So, from the file heading, press T to jump into the diff table. Then, switch your screen reader to Focus mode, or Forms mode. If you are using NVDA, that is Insert plus Space. For JAWS, it is Insert plus Z. For VoiceOver, you interact with the table.

**Jamie:** Once I am in the table in Focus mode, I just use my down arrow to read line by line.

**Alex:** Exactly. And the screen reader will announce the changes. Because we cannot rely on the visual layout, we listen for specific prefixes. If a line was added, your screen reader will announce a plus sign, or the word inserted, followed by the code. If a line was removed, it will announce a minus sign, or the word deleted.

**Jamie:** And if a line has no plus or minus, it is just context. It is unchanged code that GitHub shows you so you know where you are in the file.

**Alex:** So you are arrowing down through the table, and you hear a minus sign followed by an old heading level, and then a plus sign followed by a new heading level. You realize I made a mistake. How do you tell me?

**Jamie:** I leave an inline comment. This is so much better than just leaving a generic comment at the bottom of the page saying, hey Alex, on line forty two of that one file, you messed up. Instead, while my focus is on the specific line in the diff table, I press the Tab key.

**Alex:** When you press Tab from a focused line in the diff table, you will land on a button called Add a comment to this line.

**Jamie:** I press Enter on that button, and a text area opens right there in the middle of the code. I switch back to Focus mode, and type my comment. I will say, Alex, this heading level skips from a level two to a level four. We need a level three here for screen reader users.

**Alex:** Now, this next part is crucial. Once you type your comment, you will see two buttons. One says Add single comment. The other says Start a review. Always, always choose Start a review.

**Jamie:** I learned this the hard way! When I first started, I was using Add single comment for everything. I reviewed a massive pull request and left twenty inline comments.

**Alex:** And because you used Add single comment, GitHub sent the author twenty separate email notifications, one after another. Ding, ding, ding.

**Jamie:** They were not happy with me. When you choose Start a review, GitHub saves your comment as pending. It batches them all together. You can go through the rest of the files, leave five more comments, and the author hears nothing.

**Alex:** Once you have finished reading all the files and leaving your pending comments, you need to submit the review. You navigate to the Review changes button. It is usually at the top of the Files changed tab, or at the bottom of the Conversation tab.

**Jamie:** When you activate the Review changes button, a dialog opens. You can type an overall summary, like, Great work, just a few heading issues to fix. And then you have to choose a verdict using a set of radio buttons.

**Alex:** The three radio buttons are Comment, Approve, and Request changes. Comment means you are just leaving general feedback, but you are not blocking the merge. Approve means the code looks great and you are giving it a green light. Request changes means you found a blocking issue, and the pull request cannot be merged until the author fixes it.

**Jamie:** I select Request changes, tab to the Submit review button, and press Enter. At that exact moment, GitHub bundles all my inline comments and my summary into one single email notification and sends it to you.

**Alex:** It is a much kinder workflow. Now, I want to take a brief detour, because there is an alternative way to review code that is incredibly popular among screen reader users.

**Jamie:** Yes! VS Code!

**Alex:** Right. Reading diffs in a web browser table works, but it can be tedious. If you use Visual Studio Code and install the GitHub Pull Requests extension, you can check out the pull request locally.

**Jamie:** And the best part of doing it in VS Code is the Accessible Diff Viewer. When you have a diff open in VS Code, you just press F 7.

**Alex:** F 7 opens a dedicated panel designed specifically for screen readers. Instead of making you navigate a complex table, it extracts every change into a linear list. You just press F 7 to jump from change to change.

**Jamie:** It is so clean. It literally announces, Change one of three. Removed, heading level two. Added, heading level three. It takes all the mental gymnastics out of reading a diff. You can still leave inline comments right from VS Code, and they sync perfectly back to GitHub.

**Alex:** It is a phenomenal feature. Another alternative, if you are a terminal power user, is the GitHub CLI. You can type g h space p r space list to see all open pull requests. You can type g h space p r space diff to output the code changes straight to your terminal, which is very easy for a screen reader to read sequentially. You can even approve a pull request by typing g h space p r space review dash dash approve.

**Jamie:** I love having options. Browser, VS Code, or Terminal. You use whatever fits your brain best.


**Alex:** Okay, so let us look at the timeline. I opened the pull request. You reviewed it and requested changes. I fixed the heading levels and pushed a new commit. You reviewed it again, and this time, you selected Approve. Are we ready to merge?

**Jamie:** Almost. We have to check the bots first.

**Alex:** Ah yes, the Status Checks. On the Conversation tab, right below the description, there is a section for status checks. These are automated scripts that run every time you push code. They might run accessibility linters, unit tests, or security scanners.

**Jamie:** You can navigate to the Status checks heading to read the results. You want to hear All checks have passed. If you hear Some checks failed, the merge button might be blocked. You have to navigate to the specific failing check, open its logs, and figure out what broke.

**Alex:** Assuming your review is approved and all status checks have passed, it is time to merge. If you are a project maintainer, you will navigate to the bottom of the Conversation tab to the merge controls. But you have a choice to make. There are three different merge strategies.

**Jamie:** This used to terrify me. The dropdown gives you three options: Create a merge commit, Squash and merge, or Rebase and merge. What is the difference?

**Alex:** Let us use an analogy. Imagine your pull request is a business trip, and your commits are the receipts. You have a commit for your flight, a commit for your hotel, a commit for a coffee, and a commit where you bought a pen.

**Jamie:** Okay, I have four commits. Four receipts.

**Alex:** If you choose Create a merge commit, you are taking all four individual receipts, putting them in an envelope, writing Business Trip on the envelope, and handing it to accounting. The main branch keeps every single commit exactly as you wrote it, plus one extra commit, the envelope, that ties them together.

**Jamie:** So the history shows all the messy details. The coffee, the pen, everything.

**Alex:** Right. The second option is Squash and merge. If you choose squash, you take all four receipts, add up the total, throw the individual receipts in the trash, and hand accounting a single piece of paper that says Business Trip Total: eight hundred dollars.

**Jamie:** Oh, I see. It squashes all my messy, incremental commits into one single, polished commit on the main branch. I use this all the time because my commit history is usually terrible. I will have commits named oops, and fixed typo again. Squashing hides my shame.

**Alex:** Exactly. Squash and merge keeps the main project history incredibly clean. One pull request equals one commit.

**Jamie:** What about Rebase and merge?

**Alex:** Rebase is like a time machine. Imagine you started your business trip a month ago, but accounting only wants receipts from this week. Rebase takes your four individual receipts, erases the dates, and stamps today's date on all of them. It replays your commits one by one onto the tip of the main branch, as if you had just written them today.

**Jamie:** No envelope, no squashing. Just taking my work and sticking it perfectly at the end of the line.

**Alex:** Exactly. Which strategy you use depends on the repository. Many open source projects enforce Squash and merge to keep their history readable. Just check the dropdown, select the strategy the project prefers, and activate the button.

**Jamie:** And just like that, the pull request status changes to Merged. The code is officially part of the project.


**Alex:** We have covered the entire lifecycle of a pull request today. Let us recap the key takeaways. First, a pull request is a proposal to merge code, while an issue is a discussion about work to be done.

**Jamie:** Second, use Draft pull requests when your work is not ready for review. It tells the team you are experimenting, and prevents accidental merges.

**Alex:** Third, when reviewing code in the browser, use the T key to jump to the diff table, and use Focus mode to read the changes line by line. Listen for the plus and minus announcements. And remember, always use Start a review to batch your inline comments, rather than sending a notification for each one.

**Jamie:** And finally, do not forget about the F 7 Accessible Diff Viewer in VS Code. If navigating browser tables is giving you a headache, the VS Code extension is an absolute game changer for screen reader users.

**Alex:** In our next episode, we are going to tackle the one topic that strikes fear into the heart of every developer, blind or sighted. We are going to talk about Merge Conflicts. What they are, why they happen, and how to resolve them accessibly without panicking.

**Jamie:** I have panicked many times. I am looking forward to learning how not to.

**Alex:** Until then, keep exploring, keep committing, and we will see you next time on Gitt Going with GitHub.

</details>


### Episode 7: Merge Conflicts Are Not Scary

Why conflicts happen, how to read conflict markers, and resolving them confidently.

Based on: [Chapter 7: Merge Conflicts Are Not Scary](docs/07-merge-conflicts.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep07-merge-conflicts.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep07-merge-conflicts.mp3">Download Episode 7 (MP3)</a>
</audio>

[Download Episode 7 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep07-merge-conflicts.mp3)

<details>
<summary>Read Transcript - Episode 7: Merge Conflicts Are Not Scary</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub, the audio series for blind and low-vision developers learning the ins and outs of open source collaboration. I am Alex, and I am here with Jamie.

**Jamie:** Hi everyone! I am so ready for this one.

**Alex:** Today we are on episode seven, and the title of this episode is Merge Conflicts Are Not Scary.

**Jamie:** I am going to hold you to that title, Alex. Because when I was learning GitHub two years ago, the phrase merge conflict literally made my stomach drop. It sounds like an error. It sounds like I broke the project and now the developers are fighting.

**Alex:** That is exactly why we named the episode this way. A merge conflict is not an error, it is not a failure, and it definitely does not mean anyone is fighting. It is just a normal, everyday part of writing code with other people. Before we dive into what they are, let us quickly recap where we are in the workflow. In episode three, we talked about branches and commits, which is how you save your own independent line of work. Then in episode six, we talked about pull requests and merging, which is how you ask to bring your work into the main project.

**Jamie:** Right. A pull request is you saying, here are my changes, please pull them into the main branch. And usually, you hit the merge button, and GitHub just combines everything perfectly.

**Alex:** Exactly. Git is incredibly smart. If you edit a file at the top, and I edit the same file at the bottom, Git just quietly combines them. No problem. But a merge conflict happens when two people change the exact same lines of the exact same file in different ways. Git is smart, but it is not going to guess which version is the correct one. So it stops and asks a human to decide.

**Jamie:** I always think of it like two people editing the same paragraph of a shared document. Let us say we have a workshop welcome document. I go in and change the opening sentence to say, Welcome to the GitHub Workshop. But before I save and share my version, you go in and change that exact same sentence to say, Welcome Developers. If we try to combine our documents, the system throws its hands up. It cannot keep both sentences without it sounding like nonsense, and it does not want to automatically delete someone's work.

**Alex:** That is a perfect analogy. Git is doing the exact same thing. It is pausing the merge and saying, hey, I have two different versions of line twelve. Which one do you want? Or do you want to combine them yourself? That pause, that request for human intervention, is all a merge conflict is.


**Jamie:** Okay, so it is not an error. It is just Git asking a question. But how does it actually ask? When I am working on a pull request, how do I even know a conflict happened?

**Alex:** If you are on the GitHub website, navigating through your pull request, you will move to the Conversation tab. Usually, at the bottom of that tab, you find the button to merge your pull request. But if there is a conflict, that merge button will be disabled. Instead, your screen reader will announce a section that says, this branch has conflicts that must be resolved.

**Jamie:** I remember hearing that for the first time. It feels like a roadblock. But right next to that message, there is a button called Resolve conflicts.

**Alex:** Yes. And activating that Resolve conflicts button takes you into the GitHub web editor. This is a built in tool that lets you fix the conflict right there in your browser, without needing any terminal commands or local software.

**Jamie:** So what actually happens when I activate that button? I know it opens an editor, but what does the text inside look like? How does Git show me the two different versions?

**Alex:** This is where we need to talk about conflict markers. When Git finds a conflict, it actually edits the file for you to inject both versions of the code, separated by very specific markers. These markers are just plain text characters.

**Jamie:** And they can sound really weird the first time a screen reader reads them out to you.

**Alex:** They really can. There are three markers you need to know. The first marker indicates the start of your version of the code. It is seven less than signs, followed by a space, and the word HEAD. H E A D.

**Jamie:** So your screen reader might literally say, less than less than less than less than less than less than less than HEAD. Or if your punctuation level is set lower, it might just say HEAD. That is why it is good to navigate line by line and examine the characters if something seems strange.

**Alex:** Exactly. The word HEAD in Git just means your current location, the branch you are currently working on. So right below that less than HEAD marker, you will find your code. The code you wrote.

**Jamie:** Okay, so that is my version. What comes next?

**Alex:** Next is the dividing line. It is seven equals signs. Just a row of equals signs. This separates your version from the other person's version.

**Jamie:** Equals equals equals equals equals equals equals. Got it. And below the equals signs?

**Alex:** Below the equals signs is the incoming version. The code coming from the main branch, or from whoever else edited the file. And finally, to mark the end of the conflict area, there is a third marker. It is seven greater than signs, followed by a space, and the name of the branch that the incoming code is coming from.

**Jamie:** So greater than greater than greater than, and then maybe the word main, or the name of my teammate's feature branch.

**Alex:** Exactly. So the structure is always the same. Less than signs for the start of your code. Your code. Equals signs for the divider. Their code. Greater than signs for the end of the conflict.


**Jamie:** So let us make this concrete. Imagine we are editing an HTML file. I am working on a button. Originally, the button just said Submit. On my branch, I changed the button text to say Send message. But someone else on the team added an accessibility label to the original button. They added an aria label that says Submit form.

**Alex:** That is a very realistic scenario. Since you both changed the exact same line of HTML, you get a conflict. When you open the web editor and navigate line by line, here is what you will read. First, the less than signs and the word HEAD. Next line, your code, which is the button with the text Send message. Next line, the seven equals signs. Next line, the incoming code, which is the button with the aria label Submit form. And finally, the greater than signs and the branch name.

**Jamie:** So my job is to just edit this text file, right?

**Alex:** That is the entire job. You are just in a text editor. You need to look at both versions and decide what the final code should be. In this case, you probably want both improvements. You want the new text, and you want the aria label.

**Jamie:** So I would just type out a new line of code that combines them. A button with the aria label Submit form, and the text Send message.

**Alex:** Perfect. And then, this is the most important part, you must delete the conflict markers. You have to delete the line with the less than signs, the line with the equals signs, and the line with the greater than signs. You also delete the old versions of the code that you no longer need. When you are done, the file should just look like normal, working code.

**Jamie:** That is a huge aha moment for a lot of people. The markers are not special protected code. They are literally just text that Git temporarily typed into your document so you could find the conflict. You just delete them when you are done.

**Alex:** Exactly. Once you have deleted the markers and the code looks correct, you navigate to the top of the file in the GitHub web editor and activate the Mark as resolved button. If you have multiple files with conflicts, there is a file navigation panel you can reach with your screen reader commands, like N V D A plus F seven, or VoiceOver plus U, to move to the next file. Once all files are marked as resolved, you activate the Commit merge button. And you are done. The conflict is gone.


**Jamie:** Okay, that is the web editor. But what if I am working locally on my own computer, using the command line? I know a lot of developers prefer to handle things in their terminal.

**Alex:** The concept is exactly the same, but the steps are a bit different. Let us say you are in your terminal and you type git space merge space main, to bring the main branch into your feature branch. Git will try to merge, but then it will output a message that says, Automatic merge failed. Fix conflicts and then commit the result.

**Jamie:** Hearing automatic merge failed definitely sounds scary the first time.

**Alex:** It does! But again, it is just Git saying it needs a human. If you type git space status, it will list your files and tell you which ones are in conflict. It will say, both modified, and then the file name.

**Jamie:** So if I see both modified, I just open that file in my normal code editor, like VS Code or Notepad?

**Alex:** Exactly. You open the file, and you will find those exact same conflict markers. The less than signs, the equals signs, and the greater than signs. You edit the text, combine the changes, and delete the markers, just like we discussed.

**Jamie:** And since I am doing this on the command line, how do I tell Git that I finished fixing it? There is no Mark as resolved button in my terminal.

**Alex:** Great question. On the command line, marking a file as resolved is done by staging it. You just type git space add space, and then the file name. That tells Git, hey, I fixed this file, it is ready to go. Once you have used git add on all the conflicted files, you just type git space commit. Git will automatically create a message saying it is a merge commit, and you just save and close it.

**Jamie:** So the workflow is git merge, which triggers the conflict. Then git status to find the files. Open the files and delete the markers. Then git add to mark them as resolved. And finally git commit to seal the deal.

**Alex:** You got it. And for those of you who will be using VS Code on day two of the workshop, it gets even easier. VS Code has built in tools for this. When you open a conflicted file, it adds invisible action links right above the conflict, which you can reach by pressing Tab. These links are called CodeLens actions.

**Jamie:** Oh, I love CodeLens. It is so much faster.

**Alex:** It really is. Your screen reader will read options like Accept Current Change, which keeps your code. Accept Incoming Change, which keeps their code. Or Accept Both Changes. You just press Enter on the one you want, and VS Code automatically deletes the markers and formats the code for you. You just save with Control plus S, stage the file with Control plus Shift plus G, and commit.

**Jamie:** And if you are using GitHub Copilot, you can press Control plus Shift plus I to open Copilot Chat and ask it to explain the conflict to you. You can say, explain what these two changes are trying to do. But a quick warning here, you should always understand how to read the markers yourself before relying on AI. You need to verify that the final code actually makes sense.


**Alex:** Absolutely. Now, before we move on, I want to mention a couple of really handy commands if you are using the GitHub Command Line Interface, or the G H tool. Sometimes you want to check if a pull request has conflicts before you even try to merge it.

**Jamie:** Right, because maybe I am reviewing someone else's pull request from my terminal.

**Alex:** Exactly. You can type the command G H space P R space checks, followed by the pull request number. This will tell you the status of the pull request. You can also type G H space P R space view, which will output a summary, and it will clearly state if the branch has conflicts that must be resolved. If you want to see the actual changes, G H space P R space diff will show you line by line what was added and removed.

**Jamie:** That is super helpful for staying in the terminal and not having to bounce back and forth to the browser just to check the status.


**Alex:** So we have talked about how to resolve conflicts. But there is a famous saying in software development. Prevention is easier than resolution.

**Jamie:** Yes! Let us talk about how to avoid these in the first place. Because while they are not scary, they do take time to fix. What is the best way to prevent merge conflicts?

**Alex:** The number one rule is to keep your branches short lived. If you create a branch and work on it for three weeks without merging it, the main branch is going to change dramatically in that time. When you finally try to merge, you are going to have a massive conflict.

**Jamie:** So target one to three days. Keep your changes small and focused. If you are building a huge feature, break it down into smaller pull requests. A pull request that changes five files merges easily. A pull request that changes fifty files is almost guaranteed to conflict with something.

**Alex:** Rule number two is to sync with the main branch frequently. If you are working on a branch for a few days, start your morning by pulling the latest changes from main into your branch. You can do this with git space pull space origin space main. This brings in everyone else's approved work. If there is a small conflict, you catch it early and fix it locally, rather than waiting until the very end.

**Jamie:** I also want to add communication to this list. Especially in our workshop environment. If you know you are going to be editing the workshop welcome document, leave a comment on your issue saying, heads up, I am working on the welcome document today. That way, if another student is also assigned a challenge that touches that file, they can coordinate with you.

**Alex:** Communication is huge. Another common trap is mass reformatting. Let us say you open a file and notice the indentation is a bit messy, so you run a tool that reformats all five hundred lines of the file.

**Jamie:** Oh no. I have done this.

**Alex:** We all have! The problem is, Git sees that as you changing all five hundred lines. If anyone else on your team changed even one line of logic in that file, you will create a conflict. If you need to reformat a file, do it in a separate, dedicated pull request, announce it to your team, and get it merged immediately before anyone else does work in that file.

**Jamie:** That makes so much sense. What about fast forward merges? I have heard that term thrown around.

**Alex:** A fast forward merge is the ideal scenario. It happens when your branch is perfectly up to date with main, and you just added new commits on top. Because there are absolutely no diverging changes, Git does not even need to create a merge commit. It just fast forwards the main branch to point to your latest commit. Zero chance of conflicts. You can achieve this by rebasing your branch on main right before you merge, but rebasing is an advanced topic that rewrites history, so we will save the deep dive on that for another time.


**Jamie:** Okay, Alex. I have tried to keep my branches small. I tried to communicate. But I still got a massive conflict, and I am sitting here looking at a file with ten different conflict markers, and I honestly do not understand what the incoming code is trying to do. I am stuck. What do I do?

**Alex:** The first thing you do is take a breath. The second thing you do is ask for help. It is completely normal and expected to ask for help with a merge conflict. You can go to your pull request on GitHub, leave a comment, and tag the author of the incoming changes. You can say, hey, I have a merge conflict in the index file, and I am not sure which version to keep. Could you help me understand the intent of your changes?

**Jamie:** People love when you ask that, by the way. It shows you care about not breaking their code.

**Alex:** Exactly. And if the conflict is just completely overwhelming, maybe your branch is weeks old and everything has changed, there is always the nuclear option.

**Jamie:** The nuclear option?

**Alex:** Abandon the branch and start fresh.

**Jamie:** Oh, wow. Is that allowed?

**Alex:** It is absolutely allowed, and sometimes it is the smartest move. You just close your pull request without merging it. You switch back to the main branch, make sure it is up to date, and create a brand new branch. Then, you just manually apply your specific changes to the new branch. Sometimes copying your logic over to a fresh, up to date branch takes ten minutes, whereas untangling a massive merge conflict could take hours. Starting over is not a failure. It is a legitimate strategy.

**Jamie:** I love that. It takes so much pressure off. If I mess up resolving a conflict, or if it is too confusing, I can just close it and start over. I have not ruined the project.

**Alex:** You definitely have not. Your first conflict resolution is always the hardest. It feels abstract and dangerous. But once you resolve one, once you delete those less than and greater than signs and see your code merge successfully, you will realize it is just a text editing puzzle.


**Jamie:** This has been incredibly helpful. Let us wrap up with some concrete takeaways for everyone listening.

**Alex:** Takeaway number one. A merge conflict simply means two people changed the same lines of the same file, and Git needs a human to pick the correct version. It is normal, healthy collaboration.

**Jamie:** Takeaway number two. Conflict markers are just text injected into your file. Less than signs for your code, equals signs for the divider, and greater than signs for the incoming code. Your only job is to edit the text to look how you want, and delete the marker lines.

**Alex:** Takeaway number three. You can resolve conflicts right in the browser using the GitHub web editor, or locally using git status, git add, and git commit. If you use VS Code, take advantage of the CodeLens features to accept changes with a single keystroke.

**Jamie:** And takeaway number four. Prevention is the best medicine. Keep your pull requests small, sync with the main branch frequently, and communicate with your team about what files you are touching. And if you get stuck, it is always okay to ask for help or just start a fresh branch.

**Alex:** Perfectly summarized. That is all for episode seven. In our next episode, we are shifting gears to talk about Culture and Etiquette. We will cover how to write a great issue, how to review someone else's code kindly, and the unwritten rules of open source communication.

**Jamie:** I cannot wait for that one. See you all next time!

**Alex:** Thanks for listening to Gitt Going with GitHub. Happy coding.

</details>


### Episode 8: Open Source Culture and Etiquette

Communication norms, code review etiquette, inclusive language, and asking questions.

Based on: [Chapter 8: Open Source Culture and Etiquette](docs/08-open-source-culture.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep08-culture-and-etiquette.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep08-culture-and-etiquette.mp3">Download Episode 8 (MP3)</a>
</audio>

[Download Episode 8 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep08-culture-and-etiquette.mp3)

<details>
<summary>Read Transcript - Episode 8: Open Source Culture and Etiquette</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is Episode 8: Open Source Culture and Etiquette. I am Alex, and today we are shifting gears. Over the past few episodes, we have covered the mechanical side of GitHub. We talked about branches, commits, pull requests, and resolving merge conflicts. But today, we are focusing on the human side of open source software.

**Jamie:** Hi everyone, Jamie here. And I have to admit, this is the topic that intimidated me the most when I was learning GitHub two years ago. The terminal commands were tricky, sure, but the idea of talking to strangers on the internet, asking them to accept my code, and worrying I might say the wrong thing or break some unwritten rule? That was terrifying.

**Alex:** That is such a common feeling, Jamie. And it makes perfect sense. Technical skills get your code into a project, but communication skills are what keep you welcomed in the community. When you are contributing to open source, you are stepping into a pre-existing community. It is like walking into a crowded room where everyone already knows each other. You want to be polite, clear, and respectful. So today, we are going to demystify the unwritten rules of open source communication.

**Jamie:** I love that. Where do we start?

**Alex:** Let us start with the nature of the communication itself. Open source collaboration happens primarily in writing, asynchronously, and in public. Understanding those three characteristics shapes everything we do. Because we communicate entirely in writing, we have to think very carefully about how tone comes across in text without vocal cues.

**Jamie:** Right. There is no tone of voice, no body language, no immediate way to see if someone is confused or offended. It is like when you get a text message from a friend that just says, "Fine." with a period at the end. In person, they might say it with a smile, meaning "sounds good." But in text, that period makes it feel incredibly aggressive.

**Alex:** Exactly. A message that sounds perfectly neutral or just a bit brief in your head can read as hostile to the person on the other end. Sarcasm and irony are nearly impossible to convey safely, so it is best to avoid them entirely. The unwritten rule here is to be relentlessly explicit and assume good intent. Instead of saying, "This is problematic," you might write, "I think this approach might cause an issue with keyboard navigation because of the following reasons."

**Jamie:** And because it is asynchronous, you are not having a real-time chat. When I first started, I would leave a comment and just sit there waiting for a reply, getting anxious. But the maintainer might live on the other side of the world and be asleep.

**Alex:** Precisely. Comments are not instant messages. You might be in a rush, but the reader is not receiving that urgency from your message. This means you need to provide all necessary context in every single message. Do not assume continuity. If you solved a problem, do not just write "Fixed it." Explain what you fixed and how, because the person reading it tomorrow will not have the context of what you were doing today. And finally, remember that everything is in public. Write as if your most supportive mentor and your most critical reviewer are both reading your comments, because anyone on the internet can find them.


**Alex:** Now that we understand the environment, let us talk about the two main ways you will communicate: issues and pull requests. Let us start with writing a good issue description. Jamie, how would you define an issue?

**Jamie:** An issue is basically a ticket. It is how you report a bug, request a new feature, or ask a question about the project.

**Alex:** Perfect. And writing a good issue description comes down to three things: context, steps to reproduce, and expected versus actual behavior. Think of it like taking your car to a mechanic. If you just drop the car off and say, "It makes a noise," the mechanic has no idea where to start. But if you say, "When I am driving over forty miles per hour and I press the brake pedal, the front left tire makes a grinding noise," the mechanic can replicate the exact conditions to find the problem.

**Jamie:** That makes so much sense. So for a software bug, context means explaining your environment. Like, "I am using Windows Eleven, with the NVDA screen reader, on the latest version of Firefox."

**Alex:** Exactly. Then you list the exact steps to reproduce the problem. For example, "Step one: Navigate to the login page. Step two: Enter a valid username but leave the password field blank. Step three: Press the Submit button."

**Jamie:** And then the expected versus actual behavior. So I would say, "Expected behavior: The screen reader announces 'Password is required'. Actual behavior: The screen reader announces nothing, and focus is lost."

**Alex:** You nailed it. That level of detail saves the project maintainer hours of debugging time. Even if you do not know how to fix the bug yourself, writing an issue description that clear is a massive contribution to the project.

**Jamie:** Okay, so that is issues. What about writing a good PR description? Remind me, PR stands for pull request, right?

**Alex:** Yes. A pull request, and I love that name because you are literally requesting that someone pull your changes into their project. When you open a PR, you need to provide a description. A good PR description needs to answer three questions: what did you change, why did you change it, and how can the reviewer test it.

**Jamie:** I remember my very first PR. I fixed a typo in a documentation file. My description just said, "Fixed typo." I thought I was being efficient!

**Alex:** It is a common mistake! But remember, the maintainer might be reviewing twenty pull requests that day. A better description would be: "What: Fixed a spelling error in the installation guide. Why: The command to install the package was missing a letter, which caused an error when users copied and pasted it. How to test: Read the installation section and verify the command is now correct."

**Jamie:** That is so much better. It is like handing over your shift at a job. You do not just hand the next person the keys and walk away. You tell them what happened during your shift, why you made certain decisions, and what they need to check on next.

**Alex:** That is a brilliant analogy. And here is a quick tip for our listeners using screen readers. When you are writing these descriptions on GitHub, you are often typing the same phrases over and over. GitHub has a feature called Saved Replies. You can save text snippets and insert them into any comment box. You just navigate to the comment text area, activate the Saved Replies button in the toolbar, or press Control plus period, and you can filter through your saved templates. It is a huge accessibility win to avoid retyping standard issue formats.


**Jamie:** Okay, so we know how to write issues and pull requests. Let us talk about the rules of the community itself. When I look at an open source project, I almost always see a file called Code of Conduct. What exactly is that, and why does it exist?

**Alex:** The Code of Conduct is essentially the social contract of the project. It is the house rules for a community center. It outlines what behavior is expected and what behavior is unacceptable. It exists to protect contributors, especially those from marginalized groups, from harassment, discrimination, or abuse. When you see that file, it signals that the maintainers take community health seriously and that there is a formal process for reporting violations.

**Jamie:** It is reassuring to know it is there. And I imagine a big part of following the Code of Conduct is using inclusive language. Why does inclusive language matter so much in open source?

**Alex:** Open source is global. You are collaborating with people from different cultures, people who speak different languages, and people with different life experiences. Inclusive language ensures we do not accidentally alienate or demean anyone. For example, using words like "crazy" or "insane" to describe a piece of code can be stigmatizing. Instead, we can use precise words like "complex", "unpredictable", or "difficult to maintain."

**Jamie:** Oh, I have another example! When I was starting out, I hated reading documentation that said, "Obviously, you just run this command," or "Simply do this." When it did not work for me, or I did not understand it, the word "obviously" made me feel like I was stupid.

**Alex:** Yes! Words like "obviously", "simply", or "just" are alienating. What is obvious to a senior developer is not obvious to a beginner. The easiest fix is to just omit those words entirely. Instead of "Obviously, this function returns a string," you write, "This function returns a string." It is cleaner and kinder.

**Jamie:** Another thing I learned is to focus on the code, not the person. Instead of saying, "You made a mistake here," you say, "There is an error on line forty." It takes the ego out of it.

**Alex:** Exactly. Preferring the word "we" is also a great strategy. "We need to update this logic," rather than "You need to update this logic." It frames the project as a collaborative effort. And when it comes to inclusive commenting specifically for accessibility issues, precision is key. Do not generalize and say, "This website is completely unusable for blind people." That might not be accurate, and it can sound dismissive. Instead, represent the specific gap. Frame it as, "Because the submit button lacks an accessible name, users relying on screen readers cannot determine its purpose." Quote your exact screen reader output, and specify whether you are using JAWS, NVDA, or VoiceOver, because the experiences can differ.


**Jamie:** Let us move on to the part of open source that used to make me sweat: Code Review. This is when you submit your pull request, and other developers examine your code before it gets merged. How do we handle giving and receiving code review feedback gracefully?

**Alex:** Let us start with giving code review feedback. The golden rule is to be specific, be kind, and focus on the code. Think of yourself as a peer editor in a writing class, not a teacher grading a test. We teach a five-step anatomy for helpful feedback.

**Jamie:** I have my notes ready. What are the five steps?

**Alex:** Step one: Acknowledge what is working. Before identifying problems, name what is good. This is not empty flattery; most contributions have real strengths. Step two: Identify the specific concern. Vague feedback like "This is inaccessible" is useless. Be precise. Step three: Explain why it matters. Context turns a complaint into a lesson.

**Jamie:** Okay, so if I say, "This button has no accessible name," that is step two. Step three would be adding, "Without an accessible name, a screen reader will just announce 'button,' which gives the user no context."

**Alex:** Exactly. Step four is: Suggest a path forward. Offer an idea, like, "Something like an aria-label would work well here." And finally, step five: Signal the weight of the concern. Help the contributor understand if this is a hard blocker that must be fixed before merging, or just a minor preference.

**Jamie:** I see the word "nit" used a lot in reviews. Like N I T. What does that mean?

**Alex:** "Nit" is short for nitpick. It is a way of saying, "This is a very minor, optional suggestion. Feel free to ignore it." Like pointing out a trailing space or a slight formatting preference.

**Jamie:** Let us try an exercise. I am going to give you a harsh comment, and you rewrite it using those steps. Here is the comment: "This alt text is bad. Fix it."

**Alex:** Oh, that is a rough one. Okay, here is how I would rewrite it. First, acknowledge something good. "Nice catch adding this image, it really helps illustrate the step." Then, the concern and the why. "I noticed the alt text just says 'image one dot PNG'. Screen reader users will hear the filename instead of what is actually in the picture." Finally, the suggestion. "Could you describe what the screenshot shows, like 'Settings page with the Accessibility section expanded'? That way everyone gets the same information."

**Jamie:** Wow. If I received the first comment, I would want to quit the project. If I received your rewritten comment, I would feel encouraged and immediately know how to fix it.

**Alex:** That is the power of good communication. Now, let us talk about receiving code review feedback. The most important rule: do not take it personally.

**Jamie:** This was so hard for me! When I got my first PR reviewed, the maintainer left six comments requesting changes. I felt like I had failed. I thought, "Well, they hate my code, I am a terrible developer."

**Alex:** That is imposter syndrome talking. Code review is a normal, healthy part of the software development lifecycle. Even the most senior developers in the world get change requests on their pull requests. It is about making the code robust, not about judging your worth as a developer. When you receive feedback, take a breath. Look for the valid concern underneath the words. And always say thank you. When someone takes the time to review your work, acknowledge it.

**Jamie:** What if I disagree with the feedback? What if they tell me to change something, but I know my way is actually better for accessibility?

**Alex:** That is a great question. You need to know how to disagree respectfully. First, make your case once, clearly, and provide evidence. You might say, "I considered using an aria-label here, but I went with a visually hidden span instead because it allows translators to localize the text more easily. Let me know if you think that tradeoff is wrong." You explain your choice.

**Jamie:** And if they still say no?

**Alex:** Then you have to accept that the maintainer has the final say in their project. It is their house. If you strongly disagree, the beauty of open source is that you can always fork the project and take it in a different direction. But fighting endlessly in a comment thread is not productive.


**Jamie:** Speaking of maintainers, I think it is important to talk about who these people actually are. When I started, I pictured a team of paid professionals sitting in a corporate office, waiting to review my code.

**Alex:** That is a very common misconception. The reality is that the vast majority of open source maintainers are volunteers. They have day jobs, families, and lives outside of GitHub. They are maintaining these projects in their spare time, out of passion or a sense of community. Understanding that maintainers are volunteers with limited time completely changes how you should interact with them.

**Jamie:** Right. It means practicing patience with response times. If you open a pull request on a Friday night, do not leave a comment on Saturday morning asking why no one has reviewed it yet.

**Alex:** Exactly. Think of it like a community garden. The people managing it are doing it because they love gardening, not because it is their full-time job. If you plant some seeds and ask the manager a question, you might have to wait until they come by on the weekend. If you have been waiting a week or two for a review on your PR, it is perfectly fine to leave a polite follow-up. You can simply say, "Hi, just checking in on this PR when you have a moment."

**Jamie:** What about asking questions? If I am trying to fix a bug and I get stuck, when is the right time to ask for help, and how should I frame it clearly?

**Alex:** You should always feel empowered to ask questions. The key is to show what you have already tried. Do not just say, "How do I fix this?" Instead, frame it clearly: "I am trying to fix the broken link on line twenty-four. I searched the repository for the correct URL, but I could not find a file at that path. Can you point me in the right direction?" This shows respect for the maintainer's time because you proved you tried to solve it yourself first.

**Jamie:** I like that. And I want to mention something called the "Good first issue" social contract. Many projects label certain issues as "good first issue" to welcome new contributors.

**Alex:** Yes, and those labels are fantastic. When a maintainer uses that label, they are signaling that they are willing to invest time in mentoring a beginner. But there is a contract there. If you want to work on it, you need to leave a comment claiming it, like, "Hi, I would like to work on this. Can I be assigned?"

**Jamie:** And then you wait for assignment! Do not just start coding. If two people work on it in parallel, someone's time gets wasted. And if you get stuck, or life gets busy and you cannot finish it, just tell them. Say, "Life got busy, you should reassign this." Do not just disappear.

**Alex:** That is professional etiquette at its finest. One final note before we wrap up today. Many of you might be using AI assistive tools, like GitHub Copilot or other agentic workflows, to help draft code or even draft review comments. Remember this: Accessibility Agents' outputs are your responsibility. If an AI drafts a triage reply or a code review for you, your name appears on it in the repository's public history. The agent writes it, but you publish it. Always review an agent-generated comment against the anatomy of helpful feedback we discussed today. Ensure the tone is kind, the language is inclusive, and it does not sound like a cold, automated robot. You are responsible for the culture you help shape.


**Jamie:** This has been such a great conversation, Alex. I feel like we have covered a lot of ground. What are the main takeaways our listeners should walk away with today?

**Alex:** I would boil it down to four concrete takeaways. First, open source communication is public, text-based, and asynchronous. Provide full context in your issue and PR descriptions, and do not rely on tone to convey your meaning. Be explicit. Second, when reviewing code, be kind and focus on the code, not the person. Use the five-step feedback anatomy: acknowledge, identify, explain, suggest, and signal.

**Jamie:** Third, do not take feedback personally. Everyone gets change requests on their pull requests. It is a collaborative process to make the software better. And fourth, remember that maintainers are usually volunteers. Be patient with response times, assume good intent, and respect the project's Code of Conduct.

**Alex:** Beautifully summarized, Jamie. Taking the time to master these communication skills will make you a highly valued contributor in any open source community. That is all for Episode 8. In our next episode, we will dive into project management on GitHub, specifically focusing on Labels, Milestones, and Projects. We will learn how repositories organize thousands of issues so nothing gets lost.

**Jamie:** I am looking forward to it. Until next time, happy collaborating!

**Alex:** Keep building, and we will catch you in the next episode of Gitt Going with GitHub.

</details>


### Episode 9: Labels, Milestones, and Projects

Organizing and tracking work with labels, milestones, and GitHub Projects.

Based on: [Chapter 9: Labels, Milestones, and Projects](docs/09-labels-milestones-projects.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep09-labels-milestones-projects.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep09-labels-milestones-projects.mp3">Download Episode 9 (MP3)</a>
</audio>

[Download Episode 9 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep09-labels-milestones-projects.mp3)

<details>
<summary>Read Transcript - Episode 9: Labels, Milestones, and Projects</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode nine, Labels, Milestones, and Projects. I am Alex, and I am here with Jamie.

**Jamie:** Hello everyone. If you have been following along, you know we have covered a lot of ground. Back in episode five, we talked about how to create and participate in issues. But today, we are tackling the big question. What happens when a repository has hundreds, or even thousands, of open issues? How do you keep track of it all?

**Alex:** That is exactly what we are focusing on today. Labels, milestones, and projects are the organizational layer of GitHub. They take a chaotic list of issues and pull requests and turn them into a structured, prioritized body of work. By the end of this episode, you will understand how to categorize work, group it into goals, and track it across your entire team.

**Jamie:** I remember the first time I landed on a popular open source repository. I opened the issues tab, and there were literally two thousand open issues. It was completely overwhelming. I had no idea what was being worked on, what was abandoned, or where I could even begin to help.

**Alex:** It is a very common experience. And that is why the first tool we are going to discuss is so important. Let us talk about labels. If we need a real world analogy, think of labels like the metadata tags on a blog, or the category tags you might use in your email inbox. They communicate at a glance what category, priority, or status an item belongs to.

**Jamie:** And just to be clear, GitHub provides a standard set of labels by default when you create a repository, right?

**Alex:** Yes, they do. When you start a new project, GitHub gives you a handful of universal labels. You will almost always see a label called bug, which means something is not working as expected. You will see enhancement, which means a new feature request. There is documentation, for changes that only affect the read me or help files.

**Jamie:** My personal favorite when I was starting out was the good first issue label. If you are learning a new codebase, filtering by good first issue is the best way to find a bug that the maintainers have specifically flagged as being suitable for a beginner.

**Alex:** Absolutely. There is also help wanted, which means the maintainers are actively seeking community help to solve a problem. And you will see labels for things that are not going to be fixed, like duplicate, invalid, or wont fix.

**Jamie:** So how does a screen reader actually handle these? Because if you ask a sighted developer, they will tell you that labels are color coded tags. The bug label is usually red, enhancement is blue, and so on. As a screen reader user, do I need to care about the colors?

**Alex:** Not at all. The color is strictly supplementary visual information. When you scan the issue list with your screen reader, the labels are announced right alongside the issue title. You will hear something like, Issue forty two, Add keyboard navigation to carousel, Labels: accessibility, good first issue. The text name of the label is what matters.

**Jamie:** That is a relief. So, if I want to see every label that exists in a repository, where do I go?

**Alex:** You will want to navigate to the Labels page. From the main page of a repository, you first navigate to the Issues tab. Once you are there, the Labels link is located in the filter toolbar, right above the main list of issues. For screen reader users, the quickest way is to press the letter K to navigate through the links on the page until you hear Labels. It is usually right next to the Milestones link. When you activate that link, you land on a page that lists every single label in the project, along with a text description of what it means.

**Jamie:** And if you prefer the command line, you can do this without ever opening your browser. You can open your terminal and type g h space label space list. It will print out every label and its description right there in your console. I use that all the time to quickly check if a repository has an accessibility label before I file a bug.

**Alex:** That is a great tip. Now, let us talk about how you actually apply a label to an issue or a pull request. Let us say you just created an issue about a broken button, and you want to label it as a bug.

**Jamie:** This was tricky for me at first because the label controls are not in the main content area with the issue text. They are tucked away in the right sidebar.

**Alex:** Exactly. When you have an issue open, you need to navigate to the sidebar. The easiest way to do this with a screen reader is to press the letter H, or the number 3, to jump by heading until you hear the heading called Labels. Right after that heading, there is a gear button, which might be announced as an edit button.

**Jamie:** And when you activate that gear button, a dropdown menu opens with a list of all the available labels. You can use your up and down arrow keys to move through them, and press Enter to select or deselect a label.

**Alex:** You can also just start typing when that dropdown opens. If you type the word bug, it filters the list instantly. You press Enter to apply it, and then press Escape to close the dropdown. The label is applied immediately. There is no separate save button you have to hunt for.

**Jamie:** And again, for my fellow terminal fans, the GitHub C L I makes this incredibly fast. If you want to label issue number forty two, you just type g h space issue space edit space forty two space dash dash add dash label, followed by the name of the label in quotes. You can even add multiple labels at once by separating them with a comma.

**Alex:** So now that we have labels on our issues, the real power comes from filtering. Let us go back to Jamie's earlier example of looking at a repository with two thousand open issues. You do not want to read all of them. You only want to read the ones labeled good first issue.

**Jamie:** Right. To do that, you navigate to the filter bar on the Issues page. You can usually jump straight to it by pressing the letter F. The filter bar is just a text input field. By default, it will probably say is colon open, which means it is only showing open issues. All you have to do is add a space, and then type label colon, followed by the label name. So, label colon quote good first issue quote. Press Enter, and suddenly those two thousand issues become a list of maybe ten highly relevant issues.

**Alex:** You can combine these too. You could type label colon accessibility, space, label colon bug. That will show you only the issues that have both of those exact labels applied.

**Jamie:** What if the default labels are not enough? In the hackathon we are running, we want to track issues that are blocked by external dependencies. There is no default label for that. Can we create our own?

**Alex:** Yes, as long as you have write access to the repository, you can create custom labels. You navigate back to that Labels page we discussed earlier. You tab to the New Label button and activate it. This opens a form with three fields. First is the label name, where you would type blocked. Second is the description, where you might type, waiting on external dependency.

**Jamie:** And the third field is the color, right? How does that work for us?

**Alex:** The color field will usually auto populate with a random hex code. You can completely ignore it if you want to, or you can type in a specific hex code if your team has a visual design system. But again, the color is purely visual. The name and the description are what make the label accessible and useful to everyone. Once you fill those out, you tab to the Create label button, press Enter, and your new label is ready to be used by anyone on the project.


**Jamie:** Okay, so labels help us categorize what an issue is. It is a bug, it is documentation, it is blocked. But what if we need to organize things by when they need to be finished? That brings us to our second topic, milestones.

**Alex:** Exactly. If labels answer the question of what, milestones answer the question of when. Milestones group issues and pull requests toward a shared goal or a deadline.

**Jamie:** I like to think of a milestone as a shipping container. You have a bunch of separate boxes, which are your issues. You load them all into the shipping container, which is the milestone. The ship cannot leave the dock until every box inside that container is packed and sealed. In software development, this usually represents a version release, like Version 2 point 0, or a time boxed sprint.

**Alex:** That is a perfect analogy. A milestone has a title, an optional description, an optional due date, and a progress bar. The progress bar tracks the percentage of closed issues versus the total number of issues assigned to that milestone.

**Jamie:** When you are on the issues page, you can press the letter K to find the Milestones link, right next to the Labels link we used earlier. If you activate it, you get a list of all the active milestones. And I love how screen readers announce this. You will hear something like, Hackathon Day 1 Deliverables, 3 of 8 issues closed, due April 20. It gives you the entire context in one sentence.

**Alex:** It is very efficient. If you press Enter on a milestone title, you open its detail page, which simply lists all the issues and pull requests assigned to it. You navigate that list just like any other issue list, pressing the number 3 to jump from issue title to issue title.

**Jamie:** So how do we actually put an issue into that shipping container? How do we assign it to a milestone?

**Alex:** The workflow is almost identical to applying a label. When you are looking at an issue, you navigate to the right sidebar. You press the number 3 or the letter H to jump to the Milestone heading. Right after that heading is the Milestone gear button. You activate it, use your arrow keys to select the correct milestone from the dropdown, and press Escape.

**Jamie:** I am guessing there is a command line equivalent for this too?

**Alex:** There is. You can use g h space issue space edit space forty two space dash dash milestone, followed by the milestone name in quotes. But there is a small catch with milestones and the C L I. While you can easily assign issues to a milestone using the C L I, there is no native command to create a brand new milestone from scratch. For that, you either need to use the web interface, or use the g h api command to make a direct web request, which is a bit more advanced.

**Jamie:** Good to know. So let us talk about creating a new milestone through the web interface. I know this has a specific accessibility quirk we need to discuss.

**Alex:** Yes, it does. To create a milestone, you navigate to the Milestones page, tab to the New Milestone button, and activate it. You fill in the title and the description just like a label. But then you reach the Due Date field.

**Jamie:** And date pickers on the web are notoriously frustrating with screen readers. Half the time, the calendar pop up traps your keyboard focus, or it does not announce the days of the week correctly.

**Alex:** Exactly. GitHub provides a calendar widget, but my strong recommendation is to ignore it completely. The due date field is a standard text input field. The most reliable, accessible way to set the date is to simply type it out in the standard format. Type the four digit year, a dash, the two digit month, a dash, and the two digit day. So, 2024 dash 10 dash 31. It works perfectly every time, and you never have to fight with the calendar widget. Tab to the Create milestone button, press Enter, and you are done.


**Jamie:** Alright, we have covered labels for categorization, and milestones for grouping things by a deadline. But both of those tools still just leave you with lists of issues. What if I want a bird's eye view of everything happening in my organization? What if I want to see who is working on what, what is in progress, and what is finished, all on one screen?

**Alex:** For that, you need GitHub Projects. GitHub Projects is a fully featured, built in project management tool. If you have ever used tools like Jira, or Trello, or Asana, GitHub Projects is built to do exactly that, but it lives right next to your code.

**Jamie:** And it is important to note that we are talking about Projects version 2 here. If you are reading older documentation, you might see references to classic projects. But the current version of Projects is incredibly powerful because a single project board can pull in issues and pull requests from multiple different repositories at the same time.

**Alex:** That cross repository tracking is huge. Imagine you maintain five different open source repositories. Instead of checking five different issue tabs every morning, you can create one organization level Project. You can set it up so that any issue created in any of those five repositories, if it has the bug label, automatically gets added to your central Project. It acts like a giant control tower for your whole ecosystem.

**Jamie:** That sounds amazing. But how do we actually read a project board with a screen reader? Because when I hear the word board, I think of a highly visual layout with cards scattered everywhere.

**Alex:** That is a very valid concern. GitHub Projects supports three different layouts, and you can switch between them depending on what works best for you. The layouts are Table, Board, and Roadmap. Let us break them down one by one, starting with the Table view.

**Jamie:** Table view is my absolute favorite. It basically turns your project into a giant spreadsheet. Each row is an issue or a pull request. And the columns are the data fields, like Title, Status, Assignee, Priority, and so on.

**Alex:** The Table view is highly optimized for keyboard navigation. When you load a project in Table view, you can press the letter T to jump your focus straight into the data grid. From there, you just use your arrow keys. You can press Control plus Alt plus Down Arrow to move down through the rows, hearing each issue. And you press Control plus Alt plus Right Arrow to move across the columns for that issue.

**Jamie:** So as I arrow across a row, my screen reader will say something like, Title: Fix keyboard trap. Column two, Status: In Progress. Column three, Assignee: Jamie. It is completely linear and incredibly fast to read. And if I want to change the status, I just press Space on the status cell, and a dropdown opens right there.

**Alex:** Exactly. It is essentially a fully accessible spreadsheet. Now, the second layout is the Board view. This is what people typically call a Kanban board. It organizes work into columns based on status. Usually, you have a To Do column, an In Progress column, and a Done column.

**Jamie:** This is where sighted users usually drag and drop cards from one column to another using their mouse. Obviously, drag and drop is not a great experience with a screen reader. So how do we move a card from To Do to In Progress?

**Alex:** GitHub has made this very straightforward. You do not need to drag and drop anything. Each column is marked as a region, so you can press the letter D, or use your screen reader's region navigation, to jump between To Do, In Progress, and Done. Once you are in a column, you press the number 3 to read the cards.

**Jamie:** And when I find the card I want to move?

**Alex:** You just press Enter on the card. This opens a detail panel on the right side of your screen. Inside that panel, there is a field called Status. You activate the status field, change it from To Do to In Progress, and press Escape. The card instantly moves to the correct column on the board. You are updating the underlying data, and the visual board simply updates to reflect your change.

**Jamie:** That is so much easier than trying to simulate a mouse drag. Just open the card, change the word, and close it. Okay, what about the third layout, the Roadmap view?

**Alex:** The Roadmap view is a timeline, often called a Gantt chart. It draws horizontal bars across a calendar to show when work starts and ends. It is heavily visual and is mostly used by project managers to plan capacity over months or quarters.

**Jamie:** To be honest, I rarely use the Roadmap view. Because all three views are just different ways of looking at the exact same data, I find it much easier to just switch back to the Table view. If I want to know the start and end dates of an issue, I just read the date columns in the table.

**Alex:** That is exactly the right approach. Treat the Roadmap as a visual summary for stakeholders, but use the Table view to actually read and edit your project data.


**Jamie:** So, how do I actually get my issues into this project? We talked about automation earlier, but what if I just want to add one specific issue manually?

**Alex:** You have two ways to do this. The first is from the issue itself. Just like labels and milestones, there is a Projects heading in the right sidebar of every issue. You press H to find it, activate the gear button, and select your project from the list.

**Jamie:** And the second way?

**Alex:** The second way is from inside the project board itself. At the bottom of the table or column, there is an Add Item button. If you activate it, a text field appears. You just type the pound sign, also known as the hash symbol, followed by a keyword from your issue title, or the issue number. A search dropdown appears, you select your issue, and it drops right into the project.

**Jamie:** I want to pause here and talk about how all three of these things, labels, milestones, and projects, fit together. Because when I first learned this, it felt like redundant work. Why do I need a milestone if I have a project board?

**Alex:** That is a great question, and it is the key to mastering GitHub organization. They are not redundant; they are complementary. Think of it like a sentence. Labels are the adjectives. They describe what the work is. It is an accessibility bug. Milestones are the deadlines. They describe when the work must be finished. It is due by the end of the hackathon. Projects are the map. They describe where the work currently is in the process. It is in progress, and assigned to Jamie.

**Jamie:** Oh, that is a great way to put it. And when you combine them, you can create incredibly powerful views. In my project board, I can create a filter that says, only show me issues where the label is accessibility, and the milestone is Hackathon Day 1. Suddenly, a chaotic repository becomes a highly focused to do list.

**Alex:** Exactly. And this is going to become critically important when we start talking about AI and Accessibility Agents later in the workshop. These labels and milestones are the exact language that automated workflows use to route work. If you do not apply labels properly, the automated agents will not know how to prioritize your issues. Labeling is not just overhead; it is how you program the project management system.


**Jamie:** This has been incredibly helpful. I feel like I finally have a mental model for how large open source projects actually function without collapsing into chaos.

**Alex:** It really is the secret to scaling collaboration. Let us recap the main takeaways from today's episode. First, labels are text based tags that categorize your issues. You apply them from the right sidebar of an issue, and you can use them in the filter bar to instantly narrow down your view.

**Jamie:** Second, milestones group issues together toward a shared deadline. The safest way to set a milestone due date with a screen reader is to ignore the calendar pop up and simply type the date in year, month, day format.

**Alex:** Third, GitHub Projects act as a central hub, pulling issues from multiple repositories into one view. You can navigate them seamlessly using the Table view, jumping to the grid with the letter T and moving through the data with Control plus Alt plus your arrow keys.

**Jamie:** And finally, do not try to drag and drop cards in a board view. Just press Enter to open the issue, change the status field in the sidebar, and let the board update itself.

**Alex:** Perfectly summarized. Now that you know how to organize work, you are going to want to know when people interact with that work. In our next episode, we are tackling one of the most requested topics: GitHub Notifications. We will show you how to tame your inbox, filter the noise, and ensure you never miss a mention.

**Jamie:** I cannot wait for that one. My inbox is currently a disaster zone. Thank you all for listening, and we will catch you in the next episode of Gitt Going with GitHub.

</details>


### Episode 10: Notifications and Mentions

Managing your notification inbox, @mentions, and strategies for avoiding overload.

Based on: [Chapter 10: Notifications and Mentions](docs/10-notifications-and-day-1-close.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep10-notifications.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep10-notifications.mp3">Download Episode 10 (MP3)</a>
</audio>

[Download Episode 10 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep10-notifications.mp3)

<details>
<summary>Read Transcript - Episode 10: Notifications and Mentions</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode ten, Notifications and Mentions. I am Alex, and I am here to help you navigate the social and collaborative side of open source without getting completely overwhelmed by the noise.

**Jamie:** And I am Jamie. I am a blind developer who is still figuring out how to keep my digital life organized. I have to admit, Alex, the title of this episode gives me a little bit of anxiety. Notifications. Just the word makes me think of my phone buzzing non stop and an inbox with ten thousand unread messages.

**Alex:** That is a completely normal reaction, Jamie. In episode five, we talked about working with issues and commenting. Then in episode six, we covered pull requests and reviews. You have been putting your work out there, asking questions, and proposing changes. Now, the community is talking back. And when people talk back, GitHub generates notifications.

**Jamie:** It feels like a big transition. Going from being the person initiating the action, to being the person receiving all these updates. When I first started using GitHub about two years ago, I had this moment where I suddenly started receiving hundreds of emails a day from a repository I had visited only once. I thought I broke something.

**Alex:** You definitely did not break anything, but you did encounter one of the most common right of passage moments for new GitHub users. You probably accidentally subscribed to a very busy project. Today, we are going to make sure that never happens again. We are going to cover how GitHub generates notifications, the difference between participating and watching, how to manage your notification inbox, and how to use mentions to get someone else's attention.


**Alex:** Let us start with the core concept. How does GitHub decide to send you a notification in the first place? It all comes down to two concepts, participating and watching.

**Jamie:** Participating makes sense to me. If I am part of a conversation, I should probably know when someone replies.

**Alex:** Exactly. You are participating in a thread if you opened the issue or pull request, if you commented on it, or if someone explicitly assigned it to you. You are also participating if someone mentions your username directly. When you are participating, GitHub assumes you want to know how the story ends, so it subscribes you to that specific thread.

**Jamie:** So what is an analogy for that? Is participating like being on a group text message?

**Alex:** That is a perfect analogy. If you are on the group text, your phone is going to buzz when someone replies. But watching is completely different. Watching a repository is like installing a baby monitor in every room of a giant office building and piping the audio directly into your headphones.

**Jamie:** Oh wow. That sounds exhausting.

**Alex:** It really is, if you do it to the wrong repository. When you watch a repository, you are telling GitHub that you want to receive a notification for every single thing that happens in that project. Every new issue, every comment, every pull request, every automated test failure. For your own personal projects, watching is great. But for a massive open source project like Microsoft VS Code or the NVDA screen reader, watching means you will get thousands of notifications a week.

**Jamie:** That is exactly what happened to me! I thought I was bookmarking a repository so I could find it later. I navigated to the top of the repository page, found a button, and activated it. The next morning, my email inbox was completely destroyed.

**Alex:** I am so glad you brought that up, because new contributors constantly confuse watching with starring. They are two buttons located right next to each other at the top of every repository page. Let us clear up the difference right now. Starring a repository is what you actually wanted to do. Starring is like a public bookmark or a high five to the maintainers. It adds the project to a list on your profile, and it tells the creators that you like their work. Starring generates zero notifications.

**Jamie:** Zero notifications. That is beautiful. I wish I had known that.

**Alex:** Right. Starring is for bookmarking. Watching is for subscribing. By default, when you interact with a repository, your watch settings are set to participating and mentions. That is the sweet spot. It means you only hear about the things that actually involve you.

**Jamie:** But what if I do want to change my watch settings? Say I join a small team and I actually do need to know everything that happens in our team repository.

**Alex:** You can easily change your watch level. Navigate to the main page of the repository. If you are using NVDA or JAWS on Windows, you can press B to navigate through the buttons until you find the Watch button. Press Enter to open it. It is actually a drop down menu. Then use your up and down arrow keys to navigate the subscription options.

**Jamie:** And if I am using VoiceOver on a Mac?

**Alex:** With VoiceOver, you can use quick nav B to find the Watch button, then press VO plus Space to open the menu, use your arrow keys to find your preferred level, and press VO plus Space again to select it. The options you will hear are Participating and mentions, All Activity, Ignore, and Custom.

**Jamie:** Ignore sounds pretty intense.

**Alex:** Ignore is very useful if you are part of a massive organization and you are automatically subscribed to repositories you have nothing to do with. It completely mutes that repository. Custom is also great because it lets you get granular. You can say, only notify me when a new release is published, but ignore all the day to day issue comments.


**Jamie:** Okay, so we have covered how to control the fire hose of information. Let us talk about how we actually get someone else's attention. You mentioned that being mentioned makes you a participant. How does that work?

**Alex:** Mentions are how you tap someone on the shoulder in a crowded room. Anytime you are typing a comment in an issue, a pull request, or a discussion, you can type the at symbol followed by a person's GitHub username. For example, at Jamie blind dev. When you submit that comment, GitHub immediately sends a notification to that user, and it automatically subscribes them to that thread so they will see future replies.

**Jamie:** I love the shoulder tap analogy. It is literally requesting someone's specific attention. I use this a lot when I am stuck on a problem and I know exactly which developer wrote the code I am struggling with. I will drop a comment and mention them to ask for their input.

**Alex:** That is exactly what it is for. But there is a point of etiquette here. You should only tap someone on the shoulder if you actually need them. Tapping the lead maintainer of a huge project just to say hello or to ask them to look at your unrelated bug is generally frowned upon. Use mentions intentionally.

**Jamie:** That makes sense. What about when I need help from a group, but I do not know exactly who to ask? Like, I know the accessibility team needs to review my pull request, but I do not know the individual names of the people on that team.

**Alex:** That is where team mentions come in. It is a fantastic feature. Instead of mentioning a person, you can mention a whole team. The syntax is the at symbol, followed by the organization name, a forward slash, and the team name. So, at community dash access forward slash accessibility dash agents.

**Jamie:** Oh, that is clever. It is like using the public address system to page a specific department instead of paging one specific doctor.

**Alex:** Exactly. When you mention a team, GitHub sends a notification to everyone who is a member of that team. It is the best way to request a review from a specialized group without having to memorize everyone's individual usernames.


**Jamie:** Alright, so people are mentioning me, they are requesting my review, my automated continuous integration tests are failing and sending me alerts. Where does all this information go? Earlier I mentioned my email inbox getting destroyed. Is email the only way to manage this?

**Alex:** Email is one way, but it is rarely the best way. The problem with email is that GitHub notifications get mixed in with your bank statements, your newsletters, and messages from your family. It is too easy to lose context. The best way to handle this is the dedicated GitHub notification inbox.

**Jamie:** A dedicated inbox just for GitHub? Where do I find that?

**Alex:** You can navigate to github dot com forward slash notifications. But there is a much faster way. GitHub has a global keyboard shortcut for this. From almost anywhere on the GitHub website, you can press G then N.

**Jamie:** Let me clarify that for our screen reader users. When you say G then N, do you mean pressing them at the same time, like a chord?

**Alex:** Great question. No, it is a sequential shortcut. You press the letter G, release it, and then press the letter N. It stands for Go to Notifications. Just make sure you are in browse mode or reading mode, not focus mode, so your screen reader passes the keystrokes through to the browser.

**Jamie:** Okay, so I press G then N, and I arrive at the notification inbox. What is the layout of this page? I always find it helpful to understand the structure before I start arrowing around.

**Alex:** Structurally, the page has three main areas. On the far left, there is a sidebar with filters. In the center, taking up most of the page, is the notification list itself. And on the far right, there is a detail pane that shows a preview of whatever notification you have selected. Though, a quick tip, many screen reader users prefer to disable that right preview pane in their settings because it can make navigation a bit cluttered.

**Jamie:** I definitely turned that preview pane off. I prefer just a clean list. How do you recommend navigating the list itself?

**Alex:** The center list is grouped by date. So you will have a heading for Today, a heading for Yesterday, a heading for This Week, and so on. If you are using NVDA or JAWS, you can press the letter H to jump between these date headings. If you are using VoiceOver, make sure quick nav is on and press H.

**Jamie:** And once I am under a heading, like Today, how do I read the actual notifications?

**Alex:** This is a really important detail. Do not use your standard up and down arrow keys to read the list. The list is actually a complex interactive widget. The most reliable way to navigate it is to press the Tab key to move from one notification row to the next.

**Jamie:** What exactly does the screen reader announce when I tab to a notification row?

**Alex:** GitHub has done a lot of work to make this announcement comprehensive. When your focus lands on a row, you will hear four distinct pieces of information. First, the repository name. Second, the title of the issue or pull request. Third, the event type, which tells you why you received the notification, like review requested or mention. And fourth, the timestamp.

**Jamie:** So it might say something like, microsoft forward slash vscode, Add keyboard shortcut for accessible view, Jamie blind dev mentioned you, two hours ago.

**Alex:** Spot on. That single announcement gives you all the context you need to decide what to do next. And if you want to open that notification to read the full thread, you just press Enter. It will take you directly to the issue or pull request page, and it will automatically scroll your focus down to the exact comment that triggered the notification.


**Jamie:** Okay, so I tab to a notification, I hear what it is. Now I have to make a decision. This is where I struggle. I read it, but then it just sits in my inbox forever. How do I actually clear things out?

**Alex:** This brings us to inbox actions and keyboard shortcuts. The GitHub inbox is designed for rapid triage. You want to process these notifications like you process physical mail at your front door. You either throw it in the recycling, you file it away, or you open it immediately because it is urgent.

**Jamie:** I love that analogy. I am definitely a pile it on the kitchen counter kind of person, which explains my inbox. What are the shortcuts for processing the mail?

**Alex:** Once your focus is on a notification row, you have several single key shortcuts available. The most important one is the letter E. Pressing E marks the notification as done. It archives it and removes it from your inbox view.

**Jamie:** E for done. That is easy to remember. What if I want to keep it in my inbox, but I want to remember that I have already looked at it?

**Alex:** You can mark it as read without opening it by pressing Shift plus I. If you want to mark something as unread so it stays bold and catches your attention later, press Shift plus U.

**Jamie:** What if it is something really important that I need to work on tomorrow? Is there a way to pin it or save it?

**Alex:** Yes. Press the letter S to save it for later. This moves it to a special Saved filter in your sidebar, so it does not clutter your main inbox but it is securely filed away for when you have time.

**Jamie:** Okay, those are great. E for done, Shift plus I for read, S for save. But what about the opposite scenario? What if I am participating in a thread, maybe I left a tiny comment a month ago, and now two other developers are arguing back and forth with fifty comments a day. My inbox is filling up with their argument. How do I escape?

**Alex:** You need to mute the thread. This is a crucial survival skill. If you are focused on a notification row and you realize the conversation is no longer relevant to you, press the letter M. M stands for mute. It is the equivalent of silently leaving the group chat. You will not receive any more notifications for that specific issue or pull request, unless someone mentions your username directly.

**Jamie:** That is a lifesaver. M for mute. I am going to use that constantly. But what if I have already opened the issue? Do I have to go back to the inbox to mute it?

**Alex:** No, you can unsubscribe right from the issue page. Navigate to the right sidebar, find the section called Notifications, and activate the Unsubscribe button. It does the exact same thing as pressing M in the inbox.


**Jamie:** Let us talk about strategy. You mentioned earlier that some people have thousands of notifications. How do you personally manage your inbox without spending your entire day organizing it?

**Alex:** I am a big believer in the mark all as done workflow. When I come back from a long weekend, or if I just let things pile up, I do not process them one by one. I navigate to the top of the inbox, I find the filter field, and I type in the names of the repositories I care about the most.

**Jamie:** Wait, there is a search filter for the inbox?

**Alex:** Yes. At the top of the notification list, there is a text input field. You can navigate to it quickly by pressing the letter F for find, or E for edit, depending on your screen reader. You switch to focus mode, and you just type a repository name or an organization name. The list filters in real time to show only those notifications.

**Jamie:** Oh, that is incredibly powerful. So you filter for the important stuff first.

**Alex:** Exactly. I filter for my primary project. I read those, I reply to those, I press E to mark them done. Once I have handled the high priority items, I clear the filter by pressing Escape. Then, I tab to the button that says Mark all as done, and I press Enter.

**Jamie:** You just wipe out the rest of the inbox? Just like that?

**Alex:** Just like that. It clears everything. If I missed something truly critical, someone will mention me again. But realistically, most notifications are just conversational noise. If you try to read every single one, you will never get any actual coding done.

**Jamie:** That is incredibly liberating to hear from an experienced maintainer. It is okay to just let things go.

**Alex:** It is mandatory to let things go. You have to protect your focus. And speaking of protecting your focus, let us talk about the left sidebar filters. You can press the letter K to navigate through links, or just Tab to the sidebar. You will find filters like Unread, Saved, and Done. But the most powerful filters are Mentioned, Assigned, and Review requested.

**Jamie:** I can see why those are powerful. Those are the items that represent actual work waiting for me.

**Alex:** Exactly. If your inbox is overflowing, just activate the Review requested filter. That instantly narrows your view to only the pull requests where a teammate is literally blocked waiting for your approval. It cuts through all the noise.


**Jamie:** We talked earlier about email notifications. I still get emails along with my web notifications. It feels redundant. Should I turn one of them off?

**Alex:** I strongly recommend turning off email notifications for everything except maybe direct mentions or administrative alerts. Having both is a recipe for anxiety. To fix this, you need to configure your account settings. Navigate to github dot com forward slash settings forward slash notifications.

**Jamie:** What am I looking for on that settings page?

**Alex:** It is a long page, but it is well structured with headings. You can press H to jump from section to section. Look for the section called Email delivery. There, you can uncheck the boxes that send notifications to your email. I prefer to do all my triage in the web inbox because the keyboard shortcuts we just talked about make it so much faster than managing email.

**Jamie:** I am going to make that change as soon as we finish recording. What about the GitHub command line interface? In the last few episodes, we talked about how great the G H CLI is for creating issues and pull requests. Can I manage my notifications from the terminal?

**Alex:** You can, but it serves a slightly different purpose. The web interface is best for rapid triage and achieving inbox zero. The command line is best for targeted queries. For example, you can open your terminal and type g h search p r s dash dash review dash requested at me dash dash state open.

**Jamie:** That is a long command. Let me break that down. G h search p r s, means search pull requests. Dash dash review dash requested at me, filters for ones waiting on me. And dash dash state open, means only show me ones that are not closed yet.

**Alex:** Exactly. That command will output a clean text list in your terminal of exactly what you need to review. You can also run g h issue list dash dash assignee at me, to see all issues assigned to you. So, while the CLI does not have a fully featured inbox management tool for muting and archiving, it is fantastic for quickly finding out what your action items are without ever opening a web browser.

**Jamie:** That is really good to know. I like the idea of starting my morning in the terminal, running those two commands, and knowing exactly what my priorities are for the day, without getting distracted by a hundred other notifications in the web inbox.

**Alex:** That is a very professional workflow. It puts you in control of the information, rather than letting the information control you.


**Jamie:** Alright, we have covered a massive amount of ground today. This feels like the missing manual I needed two years ago. Let us recap the biggest takeaways for everyone listening.

**Alex:** First, understand the difference between watching and starring. Starring is a bookmark. Watching is a subscription. If you are overwhelmed with noise, check to make sure you have not accidentally watched a busy repository. You generally want your watch setting to be participating and mentions.

**Jamie:** Second, use the dedicated web inbox at github dot com forward slash notifications. The sequential keyboard shortcut is G then N. Do not rely on email. The web inbox gives you powerful filtering and triage tools.

**Alex:** Third, navigate the inbox list using the Tab key, not your reading arrows. Listen to the comprehensive announcement for each row, which includes the repository, title, event type, and timestamp.

**Jamie:** Fourth, learn the single key shortcuts. E marks a notification as done and gets it out of your way. M mutes a noisy thread so you stop hearing about it. And S saves it for later.

**Alex:** And finally, do not be afraid to use the mark all as done button. Your attention is your most valuable resource. Protect it ruthlessly. Filter for the things that matter, like review requests and direct mentions, and let the rest go.

**Jamie:** This has been incredibly helpful. I feel like I finally have a strategy to tame the beast. What is next on our journey?

**Alex:** This episode concludes the first major phase of our workshop. You now know how to navigate repositories, work with issues, review pull requests, and manage your communications. Next time, we are moving into the day two agenda, where things get really exciting. We are going to introduce GitHub Copilot, and we will talk about agentic workflows, where artificial intelligence can actually help you summarize those notifications and manage your project.

**Jamie:** Oh, I cannot wait for that. Having an AI assistant read my notifications sounds like a dream come true.

**Alex:** It is a game changer, but it relies entirely on the manual discipline we learned today. An agent can only summarize effectively if you have your watch settings configured correctly. So, practice taming your inbox today, and we will see you in the next episode. Thanks for listening to Gitt Going with GitHub.

</details>


## Day 2: VS Code and Accessibility Agents

### Episode 11: VS Code Setup and Accessibility

Screen reader mode, Command Palette, sidebar navigation, and accessibility settings.

Based on: [Chapter 5: VS Code Setup and Accessibility](docs/11-vscode-interface.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep11-vscode-basics.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep11-vscode-basics.mp3">Download Episode 11 (MP3)</a>
</audio>

[Download Episode 11 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep11-vscode-basics.mp3)

<details>
<summary>Read Transcript - Episode 11: VS Code Setup and Accessibility</summary>

#### Transcript

**Alex:** Welcome to episode eleven of Gitt Going with GitHub. I am Alex, your lead host for this series, and today we are tackling a massive and exciting topic. We are talking about setting up Visual Studio Code for accessibility.

**Jamie:** And I am Jamie. I have to admit, I am really looking forward to this one, but I also remember how overwhelming this exact topic was for me about two years ago. We spent episode one of this series making sure you all had Visual Studio Code and Git installed, which was a great first step. But actually opening the editor and figuring out how to make it talk nicely with a screen reader felt like a whole new mountain to climb.

**Alex:** That is a completely normal feeling. Moving from reading code on a website to actually writing and managing code in a professional editor is a big transition. When something might feel intimidating today, I want you to remember that you have already done most of this on day one of your learning journey. You already understand the workflow. Today, we are just learning how to let Visual Studio Code handle the heavy lifting.

**Jamie:** OK, that sounds like a good mindset to have. So, let us start at the very beginning. What exactly is Visual Studio Code? I hear developers just call it VS Code all the time.

**Alex:** Yes, we will refer to it as VS Code from here on out. VS Code is a free, extensible code editor built by Microsoft.

**Jamie:** Let us break that down. What do you mean by an extensible code editor? How is a code editor different from something like Microsoft Word?

**Alex:** That is a great question. A word processor like Microsoft Word is designed for rich text. It cares about fonts, bold text, page margins, and printing. A code editor is designed purely for plain text, but it is highly optimized for programming. It understands the structure of code, it can catch errors as you type, and it integrates directly with tools like Git.

**Jamie:** And what about that word, extensible?

**Alex:** Extensible means you can add new features to it. I like to think of VS Code as a heavy duty workshop bench. Out of the box, it is just a really solid table. But because it is extensible, you can bring your own tools and bolt them onto the bench. You can install tools for Python, tools for spell checking, or tools for GitHub Copilot. You customize the bench to fit exactly what you need to build.

**Jamie:** I love that analogy. You build your own perfect workspace. But before we talk about the desktop app that everyone installed in episode one, I want to talk about a really cool trick I learned. The browser version.

**Alex:** Ah, yes. The github dot dev experience. This is one of the most powerful features GitHub offers, and it requires zero installation.

**Jamie:** I remember the first time someone told me how to use this. They told me to open any repository on GitHub and just press the period key. I thought they were joking.

**Alex:** It sounds like a magic trick, but it is real. If you are navigating any GitHub repository in your browser, and you press the period key, just the dot on your keyboard, the webpage will instantly transform. The URL changes from github dot com to github dot dev, and suddenly, you are sitting inside a fully functional version of VS Code, running entirely in your browser.

**Jamie:** It is so fast. To use your workshop analogy, if the desktop app is your main heavy duty workbench in your garage, the github dot dev browser experience is like a pop up shop version of your workbench. You can access it from anywhere, on any computer, without installing a single thing.

**Alex:** Exactly. It uses the exact same keyboard shortcuts as the desktop version, and it has the exact same screen reader mode. It is the perfect bridge between browsing GitHub on the web and doing deep development work on your machine.

**Jamie:** Are there things the browser version cannot do? Why even bother with the desktop app if the browser version is so good?

**Alex:** The browser version does have limitations. Because it runs in your web browser, it does not have an integrated terminal. You cannot run command line scripts. It also does not support GitHub Copilot or running local accessibility agents. For those heavy duty tasks, you need the desktop application. But for quick edits, fixing a typo in documentation, or reviewing a pull request, pressing the period key is the fastest way to get to work.


**Alex:** Now, whether you are using the browser version or the desktop app, the very first thing you need to do is turn on screen reader mode. VS Code is built using web technologies, which means it behaves a lot like a complex web application. By default, it presents a lot of visual information that can be incredibly noisy or confusing for a screen reader.

**Jamie:** How do we fix that? How do we make it accessible?

**Alex:** You activate screen reader mode by pressing Shift plus Alt plus F1. If you are on a Mac, you will press Shift plus Option plus F1.

**Jamie:** What actually happens when I press Shift plus Alt plus F1?

**Alex:** It is like turning the lights on for your screen reader. When you enable this mode, VS Code changes how focus moves around the application. It suppresses a lot of the visual decorations that cause extra noise. Most importantly, it enables live regions for code suggestions and errors.

**Jamie:** Can you define live region for anyone who might be new to that term?

**Alex:** Certainly. A live region is an invisible area of the application that can send spoken announcements to your screen reader, even if your keyboard focus is somewhere else. So, if you are typing code, and VS Code finds an error, the live region will announce the error to you immediately, without you having to navigate away from the line you are typing on.

**Jamie:** That is incredibly helpful. OK, that sounds like a lot of steps to remember every time I open the app.

**Alex:** It does! But here is the thing, you really only have to configure this once. To make sure it stays on permanently, you should update a specific setting. You will want to navigate to your settings and search for the phrase editor dot accessibility support. You want to set this to the word on, rather than leaving it on auto.

**Jamie:** Why force it to on? Does the auto setting not work?

**Alex:** Auto usually works if you are on Windows using NVDA or JAWS. VS Code will try to detect your screen reader and turn the mode on automatically. But sometimes, especially if you start your screen reader after opening the editor, it might miss the detection. Forcing editor dot accessibility support to on guarantees that all those screen reader announcements and optimizations are always active.


**Jamie:** OK, so our screen reader is happy and talking to us properly. How do we actually do things in VS Code? There are so many menus and buttons. It can feel like being dropped into the cockpit of an airplane.

**Alex:** The secret to VS Code is that you do not need to memorize the menus. You only need to memorize one keyboard shortcut. Control plus Shift plus P.

**Jamie:** Ah, the Command Palette. I call this the magical concierge.

**Alex:** That is the perfect name for it. When you press Control plus Shift plus P, a text input field opens at the top of the window. This is the Command Palette. Every single action, setting, and feature in VS Code can be triggered by typing its name into this box.

**Jamie:** It is like going to a restaurant where you do not need to read the menu. You just walk up to the chef and say, I would like to format this document, or I would like to open my settings, and the chef just does it for you.

**Alex:** Exactly. If you want to change your color theme, you press Control plus Shift plus P, type the word theme, and press enter. If you want to toggle word wrap, you press Control plus Shift plus P, type word wrap, and press enter. You never have to dig through complex dropdown menus.

**Jamie:** And what if I want to learn the actual keyboard shortcuts for the area of the editor I am currently working in? Is there a quick way to get help without leaving the app?

**Alex:** Yes, and this is an essential tool for screen reader users. It is the accessibility help dialog. You can open it by pressing Control plus Shift plus H.

**Jamie:** What exactly does it tell you?

**Alex:** The accessibility help dialog is context aware. That means if your focus is currently inside the text editor, and you press Control plus Shift plus H, a plain text document pops up. It will read out exactly how to navigate the text editor, which shortcuts move you between errors, and how to trigger suggestions.

**Jamie:** Oh, that is clever! So if I move my focus to the terminal and press Control plus Shift plus H, it gives me different instructions?

**Alex:** Precisely. It will give you the specific accessibility commands for the terminal. It is your built in manual for wherever you happen to be standing at that exact moment. Use it as your first action whenever you land somewhere new in VS Code.


**Alex:** Speaking of landing somewhere new, let us talk about the layout of VS Code and how to navigate between its different areas. The interface is divided into a few main regions. The Sidebar, the Editor, the Terminal, and the Panels.

**Jamie:** I like to think of these as the rooms of a house. You do different tasks in different rooms, and you need to know how to walk between them.

**Alex:** Let us start with the Sidebar. On the far edge of the window is a vertical strip called the Activity Bar. The Activity Bar contains the main views of the application. The most important ones are the Explorer, the Search view, the Source Control view, and the Extensions view.

**Jamie:** Can we talk about the Explorer first? Because I remember being really confused about the difference between opening a file and opening a folder.

**Alex:** That is a very common stumbling block. The Explorer is your file tree. It shows you all the files in your project. But how you open your project matters. If you go to the file menu and select Open File, VS Code will open just that single document. The Explorer will be empty.

**Jamie:** Right, and my analogy for this is a filing cabinet. Opening a file is like taking a single piece of paper out of the filing cabinet and putting it on your desk. You can read it and write on it, but you cannot see any of the other papers that were next to it.

**Alex:** Exactly. But if you choose Open Folder instead, it is like bringing the entire filing cabinet to your desk. The Explorer will populate with every file and subfolder inside that project. This is how you should always work in VS Code. You open the root folder of your repository, so you have access to everything at once.

**Jamie:** So if I want to jump over to the Explorer to find a file, what is the shortcut?

**Alex:** You press Control plus Shift plus E. That moves your focus to the Explorer. You can use your up and down arrows to navigate through your files, and press Enter to open one.

**Jamie:** And when I press Enter, the file opens in the Editor room. How do I move my focus back and forth between the Explorer and the Editor?

**Alex:** To jump into your active Editor, you press Control plus 1. That puts your cursor directly into the text of the file you are working on. To go back to the Explorer, you press Control plus Shift plus E again. You will be doing this dance constantly. Control plus 1 for the editor, Control plus Shift plus E for the Explorer.

**Jamie:** What about the other views in the Activity Bar? You mentioned Search and Source Control.

**Alex:** Search allows you to find text across every file in your entire folder. You can navigate to it by pressing Control plus Shift plus F. Source Control is where you stage and commit your changes to Git. You can reach that by pressing Control plus Shift plus G.


**Jamie:** Earlier, you mentioned the Extensions view. You said VS Code is extensible, like bringing your own tools to a workbench. How do we actually install these tools?

**Alex:** You will open the Extensions view by pressing Control plus Shift plus X. This moves your focus into a search box. You simply type the name of the extension you want, for example, Python, or GitHub Pull Requests. Then you press the Tab key to navigate to the search results, use your arrow keys to find the exact match, and press Enter to install it.

**Jamie:** I wish I had known that when I started. It is so much faster than trying to use a mouse to find the little install buttons. Now, what about the terminal? You mentioned earlier that the browser version does not have one, but the desktop version does.

**Alex:** Yes, the integrated terminal. If the editor is where you write your code, the terminal is the engine room. It is where you type direct text commands to your computer's operating system, completely bypassing the graphical interface. You use it to run Git commands, install software packages, or start local web servers.

**Jamie:** How do we open the engine room?

**Alex:** You press Control plus Backtick.

**Jamie:** OK, let us pause for a second. What is a backtick? I spent an embarrassingly long time looking for this key.

**Alex:** The backtick key is usually located in the top left corner of your keyboard, right above the Tab key, and just to the left of the number one. It shares a key with the tilde symbol. Pressing Control plus Backtick will instantly open the integrated terminal panel at the bottom of your window and move your focus into it. Pressing Control plus Backtick a second time will hide the terminal and return your focus to the editor.


**Jamie:** Let us talk about something really fun. Audio cues. I think this is one of the best accessibility features Microsoft has ever added to an application.

**Alex:** I completely agree. VS Code has a system called accessibility signals. These are distinct audio cues, little chimes and sounds, that communicate the state of the editor without requiring your screen reader to speak a single word.

**Jamie:** It is so much like the dashboard sounds in a car. You do not need to take your eyes off the road to look at the dashboard to know your turn signal is on, because you can hear the rhythmic clicking. Audio cues do the exact same thing for coding.

**Alex:** A perfect example is the error signal. If you have the setting called accessibility dot signals dot line has error turned on, VS Code will play a distinct, slightly lower pitched tone whenever your cursor moves onto a line of code that contains a mistake.

**Jamie:** It is amazing because it does not interrupt your screen reader's speech. You hear your screen reader read the text of the line, and layered right underneath it, you hear the little error tone. You immediately know something is wrong before you even finish reading the line.

**Alex:** There are audio cues for everything. There is a cue for when a terminal command finishes successfully, a cue for when a terminal command fails, and cues for when you are navigating through changes in your code. You can configure all of these by opening your settings and searching for accessibility signals.


**Jamie:** Speaking of navigating through changes, I want to ask about the Accessible Diff Viewer. This is a concept that took me a while to wrap my head around. First, what exactly is a diff?

**Alex:** A diff is short for difference. So a pull request, and I love that name because you are literally requesting that someone pull your changes into their project, a pull request is essentially just a big diff. It is a representation of exactly what lines of code you added, and what lines of code you removed.

**Jamie:** Right. And visually, a diff is usually displayed side by side. You have the old file on the left side of the screen with the removed lines highlighted in red, and the new file on the right side with the added lines highlighted in green.

**Alex:** Which is an absolute nightmare to navigate with a screen reader. A spatial, color coded layout does not translate well to linear speech.

**Jamie:** It really does not. So how do we read a diff effectively?

**Alex:** This is where the Accessible Diff Viewer comes in. When you have a diff open in your editor, instead of trying to read the visual side by side layout, you open the Command Palette with Control plus Shift plus P. Then, you type Open Accessible Diff Viewer and press enter.

**Jamie:** What does that view actually look like to the screen reader?

**Alex:** It completely transforms the presentation. It turns the diff into a single, vertical list. It is like having a redline document read aloud to you line by line. As you use your up and down arrows, it will announce the change type before reading the code. It will say, Line added, followed by the text. Or it will say, Line removed, followed by the text. Or it will say, Unchanged, to give you the surrounding context.

**Jamie:** That is a game changer. You get the complete picture of what changed, in reading order, without having to scan visually.


**Alex:** Before we wrap up, there is one last piece of housekeeping regarding keyboard navigation. Sometimes, a built in VS Code shortcut might conflict with a screen reader command. For instance, NVDA or JAWS might intercept a keystroke before it ever reaches the editor.

**Jamie:** That used to drive me crazy. What is the fix for that? Do you just have to live without that command?

**Alex:** Not at all. VS Code allows for total keyboard shortcut customization. If a shortcut does not work for you, you can change it. You just open the Command Palette with Control plus Shift plus P, type Open Keyboard Shortcuts, and press enter. You can search for the command you want to change, press enter on it, and then simply type your new preferred key combination.

**Jamie:** I love that. The editor really bends to fit your workflow, not the other way around.

**Alex:** Exactly. Let us summarize our key takeaways for today. First, remember the period key trick. Pressing period on any GitHub repository opens the github dot dev browser experience for fast, lightweight editing.

**Jamie:** Second, always turn on screen reader mode by pressing Shift plus Alt plus F1, and make sure your editor dot accessibility support setting is forced to on.

**Alex:** Third, the Command Palette is your best friend. Press Control plus Shift plus P to find any command without digging through menus. And remember Control plus Shift plus H to open the accessibility help dialog for context aware shortcut lists.

**Jamie:** Fourth, always open a folder, not a file, so you have access to your entire project in the Explorer.

**Alex:** And finally, when reviewing changes, use the Command Palette to open the Accessible Diff Viewer for a clean, line by line reading experience.

**Jamie:** This has been incredibly helpful. I feel like my workbench is finally set up and my tools are organized. What are we building next?

**Alex:** In our next episode, we are going to take everything we just learned about the interface and apply it to version control. We will be covering Git and Source Control directly inside VS Code. We will learn how to stage, commit, and push our code without ever leaving the editor. Thank you for listening to Gitt Going with GitHub, and we will catch you in the next episode.

</details>


### Episode 12: Git and Source Control in VS Code

Cloning, branching, staging, committing, pushing, and pulling from VS Code.

Based on: [Chapter 11: Git and Source Control in VS Code](docs/14-git-in-practice.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep12-git-source-control.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep12-git-source-control.mp3">Download Episode 12 (MP3)</a>
</audio>

[Download Episode 12 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep12-git-source-control.mp3)

<details>
<summary>Read Transcript - Episode 12: Git and Source Control in VS Code</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode 12, Git and Source Control in VS Code. I am Alex, and I am here with Jamie.

**Jamie:** Hello everyone! I am really excited for this one. I feel like we have been building up to this moment for the entire series.

**Alex:** We absolutely have. In episode 3, we talked about the big concepts of Git, like repositories, branches, and commits. Then in episode 11, we got our VS Code environment set up, learned how to use the Command Palette, and got comfortable navigating the sidebar. Today, we are bringing those two worlds together. We are going to learn how to actually do Git operations right inside VS Code.

**Jamie:** And I want to say right up front to anyone listening, if this feels like a lot of steps, that is completely normal. I remember learning GitHub about two years ago, and I was terrified I was going to push the wrong button and delete someone else's code. But the beauty of Git is that it is actually really hard to permanently break things. And doing it in VS Code makes the heavy lifting so much easier.

**Alex:** That is a great point, Jamie. We are going to normalize that feeling of intimidation today. Because honestly, the workflow we are going to cover is the exact same workflow you will use whether it is your first day on a project or your tenth year as a senior developer.


**Alex:** Let us start at the very beginning. To work on a project, you need a copy of it on your computer. In Git terminology, this is called cloning a repository.

**Jamie:** I remember when I first started coding, before I knew Git, I would just go to a website, download a ZIP file of the code, and extract it to a folder. How is cloning different from just downloading a ZIP file?

**Alex:** That is the perfect question. When you download a ZIP file, you are just getting the files exactly as they exist at that exact second. It is a snapshot. But when you clone a repository, you are downloading the files plus the entire hidden history of the project. You get every commit, every branch, and most importantly, a permanent connection back to the original repository on GitHub.

**Jamie:** So it is like the difference between taking a photo of a document, versus having a live shared document where you can see all the version history.

**Alex:** Exactly. Now, there are a few different ways to clone a repository. The most accessible way, and the one we recommend for screen reader users, is using the VS Code Command Palette.

**Jamie:** Right, we talked about the Command Palette in the last episode. That is Control plus Shift plus P on Windows, or Command plus Shift plus P on a Mac.

**Alex:** Correct. When you open the Command Palette, you just type the words Git Clone. You will hear your screen reader announce Git: Clone as an option. You press Enter, and VS Code will ask you for the repository URL. You paste in the web address of the GitHub repository, press Enter again, and VS Code will open a standard file dialog asking where you want to save the folder on your computer.

**Jamie:** That sounds pretty straightforward. Navigate to the folder you want, press Enter, and it downloads everything. But I have also heard people talk about doing this in the terminal. Like using the words git clone or gh repo clone. What is the difference there?

**Alex:** Those are the command line alternatives. The standard Git command line interface, or CLI, uses the command git clone followed by the URL. That does the exact same thing as VS Code, it just does it in the terminal. Then there is the GitHub CLI, which is a separate tool you can install. Its command is gh repo clone. The neat thing about the GitHub CLI is that it already knows you are talking to GitHub. So instead of pasting a massive URL, you just type gh repo clone followed by the owner name, a slash, and the repository name. Like gh repo clone community-access slash learning-room.

**Jamie:** Oh, that is clever! It saves you from having to copy and paste full web addresses. But for today, we will stick to the VS Code Command Palette method. So, I have cloned the repository. I have the files on my computer. Before I start typing and changing code, I feel like I need a mental model of how Git tracks these files.


**Alex:** You absolutely do. Understanding the mental model is the secret to never getting lost in Git. There are three main areas you need to understand: the working tree, the staging area, and the repository.

**Jamie:** Okay, hit me with an analogy. I need a way to picture this.

**Alex:** Let us use a mailroom or a shipping department. Imagine you are putting together a care package for a friend.

**Jamie:** I love care packages.

**Alex:** Right. So, the room you are standing in, with tables and shelves and items scattered everywhere, that is your working tree. The working tree is just the actual files on your computer right now. You can pick things up, change them, break them, or create new things.

**Jamie:** So when I open a file in VS Code and type a new paragraph, I am messing around in the working tree.

**Alex:** Exactly. Now, eventually, you want to send some of these items to your friend. But you do not just throw the whole room into a truck. You get a shipping box. You take specific items from your workbench and you place them into the box. That box is the staging area. You are preparing a specific set of changes to be grouped together.

**Jamie:** And I can add things to the box, or take things out of the box, before I tape it shut.

**Alex:** Precisely. The staging area is where you build your next commit. Finally, when the box is perfectly packed, you tape it shut, stick a label on it describing what is inside, and put it on the outbound truck. Taping the box shut is creating a commit, and the truck takes it to the warehouse. That warehouse is the repository. The repository is the permanent, safe archive of all your sealed boxes.

**Jamie:** That makes so much sense. Working tree is the messy room. Staging area is the open box. Repository is the warehouse of sealed boxes. And I assume files can have different states depending on where they are in this process?

**Alex:** Yes. Git tracks files in three distinct states. First is untracked. This is a brand new file you just created. Git says, I have never seen this before, I am not tracking it. It is like a brand new item you just bought that is not on your inventory list yet.

**Jamie:** Okay. Untracked means brand new.

**Alex:** Second is modified. This means Git knows about the file, but you have changed it in your working tree, and you have not put it in the shipping box yet.

**Jamie:** Modified means changed, but still on the workbench.

**Alex:** And third is staged. This means you have moved that modified or untracked file into the staging area. It is in the box, ready to be committed.

**Jamie:** Untracked, modified, staged. I wish I had known that when I started. It makes the error messages make so much more sense when Git complains about modified files. So, how do we actually see these states in VS Code?


**Alex:** This brings us to the most important interface for Git in VS Code, which is the Source Control view. It lives in the Activity Bar on the far left of the screen, but you do not need to hunt for it. You just use the keyboard shortcut Control plus Shift plus G. That is G for Git. If you are on a Mac, it is Command plus Shift plus G.

**Jamie:** Control plus Shift plus G. I am pressing it now. What happens?

**Alex:** A side panel opens up, and your screen reader focus usually lands right in the middle of it. Let us break down the structure of this panel from top to bottom. At the very top is the Source Control title bar. This is actually super helpful because it announces the name of the branch you are currently on, like main or feature slash add-documentation.

**Jamie:** That is a nice quick way to check where you are without having to use the terminal. What is below the title bar?

**Alex:** Below that is a multi-line text input field. Your screen reader will call it Source Control Input. This is where you will eventually type your commit message, which is the label for your shipping box.

**Jamie:** Okay, so the text box is waiting for me. And below the text box?

**Alex:** Below the text box is the really magical part. It is a specialized tree view that lists your files. But it does not list all the files in your project. It only lists the files that have changed. It is divided into two collapsible sections. The bottom section is called Changes. This is your working tree. It shows all your modified and untracked files.

**Jamie:** So if I fix a typo in the readme file, the readme file will show up under Changes.

**Alex:** Exactly. And the section right above Changes is called Staged Changes. This is your shipping box. When you first open the panel, Staged Changes might be completely empty or even hidden, because you have not put anything in the box yet.

**Jamie:** How do I navigate this tree view with a screen reader? Is it just like a normal file explorer?

**Alex:** It is similar, but it has some special behaviors. For NVDA and JAWS users, you use your Up and Down arrow keys to move through the lists. When you land on a section header like Changes, your screen reader will say Changes, expanded, or Changes, collapsed. You can use your Right arrow to expand a section, and your Left arrow to collapse it.

**Jamie:** And when I arrow down onto an actual file, what does it say?

**Alex:** It will read the file name, the folder path, and the state. So it might say, index dot HTML, Modified. Or, styles dot CSS, Untracked.

**Jamie:** Okay, that sounds very efficient. I do not have to guess what I changed today, VS Code just gives me a tidy list of my messy workbench. Before we start moving things into the staging box, though, we should probably talk about branches. Because I know I am not supposed to do my messy work on the main branch.


**Alex:** That is a fantastic point. Whenever you want to make a change, whether it is fixing a bug or writing a new feature, you should create a new branch. A branch is basically an isolated copy of the code where you can experiment safely.

**Jamie:** Creating branches from the terminal always made me nervous. How do we do it in VS Code?

**Alex:** It is incredibly easy. We go back to our trusty Command Palette. Control plus Shift plus P. You type the words Create Branch. You will hear Git: Create Branch. Press Enter.

**Jamie:** And then it asks for a name?

**Alex:** Yes, a text input appears. You type your branch name. A quick tip on naming conventions: use lowercase letters and hyphens instead of spaces. So you might type, feature hyphen update hyphen readme. Then you press Enter.

**Jamie:** And that is it? Does it switch me to that branch automatically?

**Alex:** It does. VS Code creates the branch and immediately checks it out, which is Git terminology for switching to it. Your working files stay exactly as they were, but now Git knows that any new commits you make will be saved to this new branch, leaving the main branch perfectly safe and untouched.

**Jamie:** That takes so much anxiety out of the process. What if I need to switch back to the main branch to check something?

**Alex:** Command Palette again. Control plus Shift plus P. This time, type Checkout. You will select Git: Checkout to. A list of all your branches will appear. You just use your Up and Down arrows to find main, and press Enter.

**Jamie:** So I can bounce back and forth between branches just by searching for them. I love that. Okay, so I am on my new branch. I have made some changes to my files. I press Control plus Shift plus G to open the Source Control panel. I arrow down to the Changes section, and I hear that three of my files are modified. It is time to pack the shipping box. How do I stage a file?


**Alex:** Staging is very satisfying in VS Code. When you are navigating the Source Control panel and your screen reader focus is on a specific file under the Changes list, you have a couple of options. The fastest way is to just press the Spacebar, or press Control plus Enter. For Mac users, that is Command plus Enter.

**Jamie:** Wait, just pressing Spacebar moves it into the box?

**Alex:** Yes. The file immediately disappears from the Changes list and reappears up in the Staged Changes list. Your screen reader might not announce the move automatically, depending on your verbosity settings, but if you arrow up, you will find it sitting safely in the Staged Changes section.

**Jamie:** What if I change my mind? What if I put it in the box and realize I am not ready to ship it?

**Alex:** You do the exact reverse. You arrow up into the Staged Changes list, focus on the file, and press Spacebar or Control plus Enter again. It unstages the file. It takes it out of the box and puts it back on the workbench. The file itself does not lose any of your typed changes, it just changes its Git status.

**Jamie:** That is so forgiving. Now, you mentioned earlier that I had three modified files. What if I want to stage all of them at once? Do I have to press Spacebar on every single one?

**Alex:** You can, but there is a faster way. If you move your focus to the actual section heading that says Changes, expanded, you can open the context menu. For Windows users, you can press Shift plus F10, or the Application key if your keyboard has one. For Mac users, you can use VoiceOver keys plus Shift plus M.

**Jamie:** The context menu is like right-clicking with the mouse, right?

**Alex:** Exactly. When the context menu opens, you just arrow down to the option that says Stage All Changes, and press Enter. Boom. Everything on your workbench is swept into the shipping box.

**Jamie:** Okay, so why wouldn't I just do that every time? Why does Git even have a staging step? Why not just say, hey Git, save everything I just did?

**Alex:** That is the million dollar question. The reason Git has a staging step is to help you create atomic commits. Let us say you are working on a new feature, writing a bunch of new code. While you are doing that, you notice a really embarrassing spelling mistake in a completely unrelated documentation file. So you fix the typo, and you keep writing your feature.

**Jamie:** I do that all the time. I get distracted by typos.

**Alex:** Right! Now, at the end of the day, you have a bunch of changed files. If you just saved everything at once, your project history would have one giant commit that says, Added new feature and also fixed a typo. That makes it really hard for other developers to review your work.

**Jamie:** Oh, I see. With the staging area, I can put just the documentation file into the box, seal it up, and call it Typo fix. And then I can put all the feature files into a second box, and call that New feature.

**Alex:** Exactly. You stage individual files to group related changes together. In fact, VS Code even lets you stage individual lines of code within a single file. If you press Enter on a file in the Source Control panel, it opens a diff view showing exactly what lines changed. You can navigate to a specific line, open the context menu with Shift plus F10, and choose Stage Selected Ranges. It is incredibly powerful.

**Jamie:** Okay, that is a total power user move. Staging just a few lines of a file while leaving the rest unstaged. That is amazing. But let us stick to the basics for now. I have staged my files. They are in the Staged Changes list. The box is packed. How do I tape it shut and write the label?


**Alex:** It is time to commit. In the Source Control panel, you will press Tab or Shift plus Tab until your focus lands in the multi-line text field called Source Control Input. This is where you write your commit message.

**Jamie:** And writing a good commit message is an art form, isn't it? I know when I first started, my commit messages were literally just the word updates, or fixed stuff, over and over again.

**Alex:** We have all been there. But in open source, your commit messages are how you communicate with the maintainers. We use a convention called Conventional Commits. The subject line should be short, fifty characters or less, and it follows a specific format.

**Jamie:** What is the format?

**Alex:** You start with a type, then a colon, then a space, and then a short summary of what you did in lowercase letters. So for example, if you fixed a bug, you type the word fix, f i x, colon, space, and then something like correct heading hierarchy.

**Jamie:** Fix colon correct heading hierarchy. What if I am adding a new feature?

**Alex:** Then you use the word feat, f e a t. Feat colon add search button. If you are just updating documentation, you use docs, d o c s. Docs colon update screen reader instructions.

**Jamie:** That makes reading the project history so much easier. You can just scan down the list and see exactly what kind of work was done. So, I have typed my message into the input box. How do I actually execute the commit? Do I press Enter?

**Alex:** If you just press Enter, you will actually just create a new line in the text box, because it is a multi-line input. To actually execute the commit, you press Control plus Enter. Or Command plus Enter on a Mac.

**Jamie:** Control plus Enter. And what happens when I press it?

**Alex:** The text box clears out. The files disappear from the Staged Changes list. And your screen reader might announce that the commit was successful. You have officially sealed the shipping box.

**Jamie:** Success! My code is safe. But wait, where is it safe? Is it on GitHub yet?


**Alex:** Ah. This is the most common point of confusion for Git beginners. When you commit, you are only saving that snapshot to your local repository. The warehouse on your computer. GitHub has no idea that you just made a commit.

**Jamie:** So if I drop my laptop in a lake right now, that commit is gone forever.

**Alex:** Unfortunately, yes. To send your commits to GitHub, you have to perform an operation called a push. You are literally pushing your commits up to the remote server.

**Jamie:** Okay, how do I push?

**Alex:** The easiest way is back in the Command Palette. Control plus Shift plus P. Type Git Push, and select Git: Push. VS Code will contact GitHub and upload your commits.

**Jamie:** What if I get an error? I remember getting an error about no upstream branch when I tried to push my first branch.

**Alex:** Yes, the dreaded no upstream branch error. This happens because of the relationship between your local branch and the remote tracking branch. Think of your local branch like your personal private journal. You created it on your computer. GitHub does not have a journal with that name yet.

**Jamie:** So when I try to push, Git says, I do not know where to put this on GitHub?

**Alex:** Exactly. When you create a new branch locally and try to push it for the very first time, you have to publish the branch. In the VS Code Command Palette, instead of Git Push, you can select Git: Publish Branch. This tells Git to create a matching branch up on GitHub, and then push your commits to it. From then on, a normal Git Push will work perfectly.

**Jamie:** Git Publish Branch for the first time. Got it. Okay, so pushing is sending my stuff up. What about pulling? I hear people say they need to pull changes.

**Alex:** Pulling is the exact opposite. It is downloading new commits from GitHub into your local repository. Let us say you are collaborating with another developer. They push a new commit to the branch you are both working on. You need to download their work so your local files are up to date. You open the Command Palette, type Git Pull, and select Git: Pull. VS Code downloads their commits and merges them into your working tree.

**Jamie:** That sounds great, until we both edit the exact same line of code. What happens then? Does my computer explode?

**Alex:** No explosions, but you will get what is called a merge conflict. Git is very smart, but it refuses to guess which person's code is the correct one. If you both changed line 42 of the readme file, and you try to pull their changes, Git will stop and say, hey, I have a conflict here. You need to resolve this manually.

**Jamie:** We actually talked about the theory of merge conflicts in episode 6, but in VS Code, how does it handle it?

**Alex:** When a conflict happens during a pull, VS Code will show the conflicted files in your Source Control panel under a new section called Merge Changes. If you open one of those files, Git has literally injected both versions of the code into the file, separated by some markers like less-than and greater-than signs.

**Jamie:** That sounds a bit messy for a screen reader to read through.

**Alex:** It can be. The most accessible way to handle it is to open the file and press F7. F7 jumps you directly to the next conflict in the editor. Then you can press Alt plus F2 to open the Accessible Diff Viewer, which presents both versions very cleanly. You decide which version you want to keep, delete the other version and the markers, save the file, and then stage it just like a normal change.

**Jamie:** So a conflict is just a file that Git forces you to manually edit and stage again. That is not too scary. I also saw something in our notes about git pull dash dash rebase. What is a rebase?

**Alex:** Rebase is a slightly more advanced way to pull changes, but it is incredibly useful. Normally, when you pull someone else's changes while you have your own local commits, Git creates an extra merge commit to tie the two histories together. It can make the project history look like a messy subway map with lines crossing everywhere.

**Jamie:** And rebase prevents that?

**Alex:** Yes. Think of a rebase like stepping out of line at the grocery store. When you run git pull --rebase in the terminal, Git temporarily un-applies your local commits. It sets them aside. Then it downloads the other person's commits and applies them in a straight line. Finally, it takes your commits and replays them on top of the new history.

**Jamie:** Oh, wow. So it is like saying, let me pause my work, let you go first, and then I will do my work after you. It keeps the history as one perfectly straight timeline.

**Alex:** Exactly. It is a very elegant way to keep history clean, and many open source projects prefer you to use rebase when pulling updates from the main branch.


**Jamie:** So we have covered cloning, branching, staging, committing, pushing, and pulling, all using the VS Code interface. Are there other ways to do this? What if I am on a computer that does not have VS Code installed?

**Alex:** There is a fantastic web alternative. You can do almost all of this directly on GitHub dot com. If you navigate to a repository on the GitHub website, you can find any file, open it, and activate the Edit button, which visually looks like a pencil icon.

**Jamie:** And I can just type right there in the browser?

**Alex:** Yes, it opens a web editor. And here is the interesting difference. On the web, there is no staging step. When you finish editing, you just activate the Commit changes button. GitHub creates the commit directly, either on your current branch or it will automatically create a new branch for you.

**Jamie:** That is super fast for small changes, like fixing a single typo. But I imagine if you are changing five different files, navigating through the web interface for each one gets tedious.

**Alex:** Exactly. The web interface is brilliant for quick single-file edits. But when you are building a complex feature across multiple files, you want the control of VS Code, where you can stage specific files and review everything locally.

**Jamie:** And for the folks who love the terminal, they can do all of this using the Git CLI, right?

**Alex:** Absolutely. In VS Code, you can open the integrated terminal by pressing Control plus Backtick. From there, you can type git status to see your modified files, git add dot to stage all changes, git commit dash m to write your message, and git push. Many blind developers actually prefer the terminal because the output is pure plain text, which is very predictable for screen readers.

**Jamie:** That makes sense. It is all about finding the tool that fits your brain. But I have to say, the VS Code Source Control panel with Control plus Shift plus G feels like the perfect middle ground. It organizes the information visually and structurally, but gives you complete keyboard control.


**Alex:** Let us wrap up with some key takeaways from today's episode. Jamie, what is the first one?

**Jamie:** Takeaway number one: Understand the three environments. The working tree is your messy workbench. The staging area is the shipping box where you pack specific changes. And the repository is the permanent warehouse of sealed boxes.

**Alex:** Perfect. Takeaway number two: Use the Source Control panel in VS Code. Press Control plus Shift plus G to open it. It is a dedicated tree view that only shows your modified files, separated into Changes and Staged Changes.

**Jamie:** Takeaway number three: Staging is how you create atomic commits. You do not have to save everything at once. You can focus on a file, press Spacebar to stage it, and commit just that specific fix with a clear message.

**Alex:** And finally, takeaway number four: Committing only saves locally. Do not forget to push! You have to use Git Push to send your sealed boxes up to GitHub so everyone else can see them.

**Jamie:** This has been incredibly clarifying, Alex. I feel like I am ready to actually contribute code now. But once my code is pushed to a branch on GitHub, how do I actually ask the project maintainers to merge it into the main project?

**Alex:** That is the final piece of the puzzle. In our next episode, we are going to dive into the GitHub Pull Requests extension. We will learn how to create, review, and merge pull requests without ever leaving VS Code.

**Jamie:** I cannot wait. Thank you all for listening!

**Alex:** Thank you for joining us. Keep exploring, keep committing, and we will see you next time on Gitt Going with GitHub.

</details>


### Episode 13: The GitHub Pull Requests Extension

Viewing, creating, reviewing, and merging PRs from inside VS Code.

Based on: [Chapter 12: The GitHub Pull Requests Extension](docs/15-code-review.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep13-github-prs-extension.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep13-github-prs-extension.mp3">Download Episode 13 (MP3)</a>
</audio>

[Download Episode 13 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep13-github-prs-extension.mp3)

<details>
<summary>Read Transcript - Episode 13: The GitHub Pull Requests Extension</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode thirteen: The GitHub Pull Requests Extension. I am Alex, and I am here with Jamie.

**Jamie:** Hi everyone! I am so ready for this episode. We are at the point in the workshop where everything starts coming together.

**Alex:** We really are. If you have been following along, in episode six we covered the full pull request lifecycle from the web interface, using GitHub dot com. And in episode twelve, our last episode, we talked about doing local Git operations right inside Visual Studio Code.

**Jamie:** Right, so committing, branching, and pushing without ever leaving the editor. Which was a huge time saver.

**Alex:** Exactly. But what happens when you push that branch and you are ready to open a pull request? Or what if someone asks you to review their code? Up until now, you would have to switch over to your web browser, navigate GitHub dot com, find the pull request, and review it there.

**Jamie:** Which works! We learned how to do that, and it is fully accessible. But switching contexts between your editor and your browser all day can be exhausting.

**Alex:** It can be. And that brings us to the core concept of today's episode: The GitHub Pull Requests and Issues extension for VS Code. This extension essentially brings the GitHub website directly into your editor.

**Jamie:** I like to think of it like this. Imagine you are writing a book. Using the web interface for pull requests is like having to drive down to the post office every time you want to mail a chapter to your editor, and then driving back to the post office to pick up their feedback.

**Alex:** That is a great analogy.

**Jamie:** Right? But installing this extension is like having a direct mail chute installed right at your desk. You write the code, you package it up, and you send it off, all from the exact same chair. You even receive their feedback right on your original manuscript.

**Alex:** Perfectly said. The extension lets you view, create, review, and merge pull requests without ever pressing Alt plus Tab to open a browser. So, let us talk about how to get it.


**Alex:** To start using this, you need to install the extension and sign in.

**Jamie:** Okay, walk me through it. I am in VS Code.

**Alex:** First, open your Extensions sidebar. The keyboard shortcut is Control plus Shift plus X on Windows, or Command plus Shift plus X on Mac.

**Jamie:** Control plus Shift plus X. Got it. And that puts my focus in a search box, right?

**Alex:** Yes. Type in the words GitHub Pull Requests. You will hear your screen reader announce the search results. You want to navigate down to the one called GitHub Pull Requests and Issues, published by GitHub. Press Enter to open its detail page, Tab to the Install button, and press Enter again.

**Jamie:** Nice and easy. And since it is connecting to my GitHub account, I assume I need to log in?

**Alex:** You do. After it installs, VS Code will prompt you with a notification asking to sign in to GitHub. You can navigate to your notifications with Alt plus N on Windows, or Option plus N on Mac. When you activate the Sign In button, it briefly opens your web browser to authorize VS Code, and then sends you right back to the editor.

**Jamie:** And if I miss the notification, can I just use the Command Palette?

**Alex:** Absolutely. Just press Control plus Shift plus P, type GitHub Pull Requests Sign In, and press Enter. It does the exact same thing.


**Jamie:** Okay, I am installed and signed in. Where did my pull requests go? How do I find them?

**Alex:** The extension adds a brand new section to VS Code. If you are navigating the Activity Bar, it is a new icon that just says GitHub. But the most reliable way to jump straight to it with a screen reader is, as always, the Command Palette.

**Jamie:** Control plus Shift plus P.

**Alex:** Exactly. Press Control plus Shift plus P, and type Focus on Pull Requests View. When you press Enter, your focus moves to a new tree view in the sidebar.

**Jamie:** A tree view. So that means I am using my Up and Down Arrow keys to move through items, and Right Arrow to expand them.

**Alex:** Spot on. And this tree is organized brilliantly. It is like an email inbox that has already been sorted into folders for you. At the top, you have a section called My Pull Requests. If you expand that, you will find categories like Assigned to Me, Created by Me, and Waiting for my Review.

**Jamie:** Oh, that is incredibly helpful. So if I just want to see the things I am personally responsible for, I can just expand Assigned to Me.

**Alex:** Right. And as you arrow down through the list, your screen reader will announce the PR number, the title, the author, and the status. Something like: Pull Request number 42, Add Timeline Guide, opened by Jeff, 2 days ago.

**Jamie:** That is so much cleaner than tabbing through all the extra links and badges on the web interface. Though I should mention, if you prefer the web, or if you do not have VS Code open, you can still just navigate to the Pull Requests tab on your repository page on GitHub dot com.

**Alex:** Or use the GitHub Command Line Interface. If you have the gh CLI installed, you can open your terminal and type gh space pr space list. That prints out a beautifully clean text list of all open pull requests right in your console.


**Jamie:** So let us say I find Pull Request number 42 in that tree view, and I want to read it. What happens when I press Enter on it?

**Alex:** When you press Enter on a pull request in the tree, VS Code opens a Pull Request Detail View in your main editor area. This is a fully rendered, highly accessible document.

**Jamie:** What kind of information is in there?

**Alex:** Everything you would find on the Conversation tab on the web. It has the title, the description, the CI status checks telling you if the automated tests passed, a list of reviewers, and a section called Files Changed.

**Jamie:** Files Changed. That is the big one. That is where we see the diff, right? The actual code that was added or removed.

**Alex:** Exactly. A diff, short for difference, is the before-and-after comparison of the code. Now, you can review the diff simply by navigating to the Files Changed list in that detail view and pressing Enter on any file. It opens a split view or an inline view showing the changes.

**Jamie:** Okay, wait. Reading visual diffs with a screen reader used to be a nightmare for me. Hearing the screen reader try to parse out table columns, jumping between the old file and the new file. It was a lot of cognitive load.

**Alex:** It was. But VS Code has completely solved this with a feature called the Accessible Diff Viewer. This is perhaps the most important keyboard shortcut we will share today.

**Jamie:** I have my notepad ready.

**Alex:** When you have a diff open in the editor, press F7. This jumps your cursor directly to the first chunk of changed code, which is called a hunk.

**Jamie:** A hunk. I love programmer terminology.

**Alex:** It gets better. Once your cursor is on that change, press Alt plus F2 on Windows, or Option plus F2 on Mac. This opens the Accessible Diff Viewer.

**Jamie:** And what does that do?

**Alex:** It presents the change in a clean, sequential text format that is perfectly optimized for a screen reader. It announces exactly where you are, like Hunk 1 of 3. Then it reads the unchanged context lines, followed by the removed lines prefixed with the word Removed, and then the added lines prefixed with the word Added.

**Jamie:** Oh, that is brilliant. It is like comparing two drafts of a recipe. Instead of making you scan two pieces of paper side-by-side to figure out what changed, the Accessible Diff Viewer just reads it to you clearly: Removed: one cup of sugar. Added: two cups of sugar.

**Alex:** Exactly. And when you are done reading that hunk, you press Escape to close the viewer, and press F7 again to jump to the next change. It turns a frustrating visual layout into a logical, readable stream.

**Jamie:** And if I want to actually run their code to test it out? Can I do that?

**Alex:** Yes! That is called checking out a pull request. In the PR detail view, there is a Checkout button. When you activate it, VS Code downloads their branch to your local machine and switches your files over to their version. You can run the code, test it with your screen reader, and verify it actually works before you approve it.

**Jamie:** That is a massive advantage over the web interface. On the web, you can read the code, but you cannot easily run it.

**Alex:** Exactly. Though if you are using the terminal, you can achieve the same thing by typing gh space pr space checkout space 42. It pulls down the branch for pull request 42 instantly.


**Jamie:** Okay, so I am reading their code using the Accessible Diff Viewer, and I spot a mistake. They used a heading level two when it should have been a heading level three. How do I tell them?

**Alex:** You leave an inline comment. This is just like sticking a physical sticky note directly onto a specific line of a manuscript.

**Jamie:** How do I place the sticky note?

**Alex:** While you are in the diff view, navigate your cursor to the exact line with the mistake. Then, press Shift plus F10 on Windows, or Control plus Return on Mac, to open the context menu.

**Jamie:** Shift plus F10. Got it.

**Alex:** Navigate to Add Comment and press Enter. A text input box will appear right there in the editor. You type your feedback, like: This heading should be an H3 to maintain the document outline.

**Jamie:** And then I just hit submit?

**Alex:** You have two choices. You can choose Add Single Comment, which posts it to GitHub immediately. Or, you can choose Start Review.

**Jamie:** What is the difference?

**Alex:** Starting a review saves your comment as a draft. It lets you go through the rest of the files, leaving more comments as you go, without spamming the author with an email notification for every single typo you find. Once you are done looking at all the files, you submit the review all at once.

**Jamie:** That is polite. I appreciate that. So how do I submit the batch of comments when I am finished?

**Alex:** Open your Command Palette with Control plus Shift plus P, and type GitHub Pull Requests Finish Review.

**Jamie:** And that is where I give my final verdict, right?

**Alex:** Exactly. A prompt will ask you to choose a review type. You can select Comment, which just leaves your feedback without a formal decision. You can select Request Changes, which means the author must fix the issues before the code can be merged. Or, if everything looks great, you select Approve.

**Jamie:** And once I press Enter, all my draft comments and my final verdict are published to GitHub.

**Alex:** You got it.

**Jamie:** For folks tracking the alternatives, you can do all of this on the web by navigating to the Files Changed tab, finding a line, and activating the Add Comment button. And if you are a terminal fan, you can submit your verdict by typing gh space pr space review, followed by dash dash approve, or dash dash request dash changes.


**Alex:** So, we have covered reviewing other people's work. Let us flip the script. You have been writing code on a feature branch, you have committed your changes, and you have pushed them to GitHub. How do you create your own pull request from VS Code?

**Jamie:** I am going to guess it involves the Command Palette.

**Alex:** You know me so well. Press Control plus Shift plus P, and type GitHub Pull Requests Create. Select Create Pull Request, and a form opens right in your editor.

**Jamie:** What do I need to fill out in this form?

**Alex:** The most important concepts here are the Base branch and the Compare branch.

**Jamie:** Ah, yes. The terminology can be a little confusing at first. Base and Compare.

**Alex:** Let us use a highway analogy. The Base branch is the main highway. It is the destination. Usually, this is your main branch. The Compare branch is your car on the on-ramp. It is the source of the new changes you want to merge into traffic.

**Jamie:** That makes perfect sense. So my feature branch is the Compare branch, and I am requesting to merge it into the Base branch, which is main.

**Alex:** Exactly. VS Code usually selects these for you automatically, but it is good to verify them. After that, you just fill in the Title and the Description.

**Jamie:** On Day 1 of the workshop, when we opened pull requests on the web, we talked about Pull Request Templates. Those checklists that automatically populate the description box so you remember to test your code. Does VS Code support those?

**Alex:** It does! If your repository has a template file hidden in the dot github folder, the extension automatically loads it into your description field. You just use your arrow keys to navigate through the Markdown text, fill in the blanks, and put an X inside the brackets for the checkboxes.

**Jamie:** That is fantastic. It is literally the exact same workflow as the web.

**Alex:** It is. It maps perfectly to what you learned on Day 1. The underlying Git process is identical; you are just interacting with it through VS Code instead of a browser.

**Jamie:** Is there a way to open a Draft PR? Like, if I want to push my code to back it up and get early feedback, but I am not quite ready for a formal review?

**Alex:** Yes, there is a Draft PR checkbox right there in the creation form. If you check that, the PR is marked as a work in progress and cannot be merged until you mark it as ready. Once you have filled everything out, just Tab to the Create button and press Enter.

**Jamie:** And again, just to map this out for everyone: on the web, you would do this by pushing your code and then clicking the yellow Compare and Pull Request banner. In the CLI, you would just type gh space pr space create.


**Alex:** Alright, we have reached the final step of the lifecycle. The PR is open, the reviewers have approved it, and the CI checks are green. It is time to merge.

**Jamie:** The best feeling. How do we merge from VS Code?

**Alex:** Open the pull request in the PR detail view, scroll down to the bottom, and you will find a Merge Pull Request button. When you press Enter on it, you will be asked to choose a merge type.

**Jamie:** Merge types. This is where people get nervous. We have Merge Commit, Squash and Merge, and Rebase and Merge. Can we break those down?

**Alex:** Absolutely. Let us go back to our traffic analogy. You have a bunch of cars, which are your commits, waiting on the on-ramp, which is your feature branch. A Merge Commit is like a zipper merge. All of your individual cars merge onto the highway one by one, keeping their original identities, and a special sign is put up saying where they merged. It preserves your entire detailed history.

**Jamie:** Okay, what about Squash and Merge?

**Alex:** Squash and Merge is like taking everyone out of their individual cars and putting them all onto a single bus before they get on the highway.

**Jamie:** Oh, I love that.

**Alex:** It takes all of your tiny, messy commits, like "fix typo" and "forgot a semicolon", and squashes them into one single, clean commit on the main branch. This is incredibly common for feature branches to keep the project history tidy.

**Jamie:** And Rebase and Merge?

**Alex:** Rebase is like magically teleporting your cars so they were always on the highway to begin with. It replays your commits one by one at the very tip of the main branch, creating a perfectly straight, linear history without any merge signs.

**Jamie:** Which one should I use?

**Alex:** Always check your project's contributing guidelines. But if you are unsure, Merge Commit is the default and the safest option. Choose your strategy, confirm it, and the PR is merged.

**Jamie:** And then I should probably delete my feature branch, right? Keep the garage clean.

**Alex:** Exactly. VS Code will usually prompt you, asking if you want to delete the branch. Say yes. Then, use the Command Palette to check out your main branch and do a Git Pull, so your local machine gets the updated, merged code.

**Jamie:** And to round out our alternatives: on the web, this is the big green Merge button on the conversation tab. In the CLI, it is gh space pr space merge.


**Alex:** That covers the entire pull request lifecycle, entirely within VS Code. Let us recap our key takeaways.

**Jamie:** Takeaway number one: You do not have to leave your editor to collaborate. The GitHub Pull Requests extension lets you view, review, create, and merge PRs right where you write your code.

**Alex:** Takeaway number two: The Accessible Diff Viewer is a game changer for screen reader users. Remember to press F7 to jump to a change, and Alt plus F2, or Option plus F2 on Mac, to read the diff cleanly.

**Jamie:** Takeaway number three: The VS Code workflow maps exactly to the web workflow we learned on Day 1. The concepts of Base and Compare branches, PR templates, and Draft PRs are exactly the same. You are just using a different interface.

**Alex:** Perfectly summarized. Now that you are comfortable navigating code and collaborating in VS Code, you are ready for some artificial intelligence assistance. In our next episode, we are going to explore GitHub Copilot, and how it can help explain code, suggest changes, and write documentation.

**Jamie:** I cannot wait for that one. See you all then!

**Alex:** Thanks for listening to Gitt Going with GitHub.

</details>


### Episode 14: GitHub Copilot

Inline suggestions, Copilot Chat, prompting strategies, and custom instructions.

Based on: [Chapter 13: GitHub Copilot](docs/16-github-copilot.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep14-github-copilot.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep14-github-copilot.mp3">Download Episode 14 (MP3)</a>
</audio>

[Download Episode 14 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep14-github-copilot.mp3)

<details>
<summary>Read Transcript - Episode 14: GitHub Copilot</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub, the audio learning series for blind and low-vision developers who are mastering GitHub and open source collaboration. I am your host, Alex, and I am thrilled to be here with you today for episode fourteen, titled GitHub Copilot. Today, we are diving into the world of AI coding assistants.

**Jamie:** Hi everyone, I am Jamie. I am so excited for this one. I keep hearing developers talk about AI and Copilot, but I have been a little hesitant to jump in. I am really hoping we can break down how this actually works with a screen reader.

**Alex:** We absolutely will. Before we get into the new material, let us do a quick recap. In episode eleven, we covered the basics of Visual Studio Code. We talked about how to navigate the interface using your screen reader, how to open the command palette with Control plus Shift plus P, and how to manage your files. You will want to have those basic navigation skills fresh in your mind because Copilot lives right inside VS Code.

**Jamie:** I definitely recommend going back to episode eleven if you have not listened to it yet. Getting comfortable with the basic keyboard shortcuts in VS Code makes adding Copilot to the mix much easier. So, Alex, let us start at the very beginning. What exactly is GitHub Copilot?

**Alex:** At its core, GitHub Copilot is an AI pair programmer. But I like to think of it as a highly caffeinated, very well-read assistant sitting right next to you at your desk. As you type, it tries to guess what you are going to write next and offers suggestions. You can also talk to it conversationally and ask it questions about your project.

**Jamie:** When you say pair programmer, does that mean I only use this when I am writing code? Because as someone who is still learning, a lot of my open source contributions are actually documentation, writing issue responses, and formatting pull requests.

**Alex:** That is a fantastic question, and it is a huge misconception. Copilot is brilliant at non-code tasks. In fact, for this workshop, we are going to focus heavily on using Copilot to write Markdown documentation, draft commit messages, and review pull request descriptions. It understands human languages just as well as it understands Python or JavaScript.

**Jamie:** Oh, that is a relief. So how does it actually know what I am trying to do? Does it just read the current line I am on?

**Alex:** It reads much more than that. Copilot generates its suggestions based on context. Imagine you are cooking in a kitchen. A good sous-chef does not just look at the knife in your hand. They look at the ingredients you have already chopped on the cutting board, they look at the recipe book you have open on the counter, and they look at the pots on the stove. Based on all of that, they hand you the exact spice you need before you even ask for it.

**Jamie:** I love that analogy. So Copilot is looking at my whole kitchen.

**Alex:** Exactly. It looks at the file you are currently editing, where your cursor is positioned, other files you have open in your editor, and even the structure of your project. It gathers all of this context, sends it to the AI model, and returns a suggestion in milliseconds.


**Alex:** Let us talk about how these suggestions actually appear while you are typing. This is a feature called inline code completions. As you are typing a sentence or a line of code, Copilot will suddenly offer a completion for the rest of the line, or sometimes even an entire paragraph.

**Jamie:** I have heard sighted developers call this ghost text. What does that mean?

**Alex:** Yes, ghost text is the industry term for this. For a sighted user, the suggestion appears on their screen as light gray text just ahead of their cursor. It looks like a ghost because it is not actually part of the document yet. It is just a visual preview. But of course, visual previews are not helpful for us.

**Jamie:** Right. So how does my screen reader know the ghost text is there?

**Alex:** VS Code handles this beautifully by using an ARIA live region. When Copilot generates a suggestion, your screen reader will simply announce, suggestion available, or it will read the suggestion out loud, depending on how you have your verbosity settings configured.

**Jamie:** Okay, so I am typing, I hear suggestion available, and I want to accept it. What do I press?

**Alex:** You simply press the Tab key. Pressing Tab takes that ghost text and permanently inserts it into your document, moving your cursor to the end of the new text.

**Jamie:** And what if the suggestion is completely wrong? Like, it suggests I write about apples when I am writing about oranges.

**Alex:** You just press the Escape key to dismiss it. Or, honestly, you can just keep typing. The moment you type a letter that contradicts the suggestion, Copilot will dismiss it automatically and try to generate a new one based on your new keystrokes.

**Jamie:** That sounds easy enough. Tab to accept, Escape to dismiss. What if it gives me a suggestion, but I wonder if it has any other ideas? Can I ask for a different option?

**Alex:** You can. If you have a suggestion active and you want to see an alternative, you can press Alt plus the right bracket key. That will cycle to the next alternative suggestion. If you want to go back, you press Alt plus the left bracket key.

**Jamie:** Okay, that sounds like a lot of steps. I am imagining myself typing, getting interrupted by the screen reader, trying to cycle through options, and losing my train of thought.

**Alex:** It does sound intimidating! And it is completely normal to feel overwhelmed when your screen reader suddenly starts talking over you while you are trying to think. But here is the thing, you have already done most of this on Day one when we learned basic text editing. This is the exact same workflow, just with VS Code handling the heavy lifting of writing the text. And there are two incredible tricks to make this completely manageable.

**Jamie:** Please share the tricks, because I definitely need them.

**Alex:** The first trick is for when you only want part of the suggestion. Let us say Copilot suggests a whole sentence, but you only agree with the first few words. Instead of pressing Tab to accept the whole thing, you can press Control plus the right arrow key. This accepts the suggestion exactly one word at a time.

**Jamie:** Oh, that is clever! So I can just tap Control plus right arrow three times, take the first three words, and then just resume typing my own thought.

**Alex:** Exactly. It puts you completely in control. The second trick is even more important, and it solves the biggest current limitation with Copilot and accessibility.

**Jamie:** What limitation is that?

**Alex:** When Copilot generates a long suggestion, it streams the text in piece by piece, or token by token. For a sighted user, this looks like the text is being typed out really fast. But for a screen reader, this streaming effect can cause the live region to update repeatedly. It fragments the announcements. You might hear half a sentence, then an interruption, then the end of the sentence. It can be very noisy and hard to understand.

**Jamie:** Yes, I have experienced that with other AI tools. It is like someone trying to read you a letter while it is still coming out of the printer.

**Alex:** That is a perfect description. To solve this, VS Code has a feature called the Accessible View. Whenever you hear that a suggestion is available, do not press Tab yet. Instead, press Alt plus F2.

**Jamie:** Alt plus F2. What does that do?

**Alex:** It pauses the action and opens the complete suggestion in a separate, static text panel called the Accessible View. There is no streaming noise. There are no live region interruptions. It is just plain text. You can use your up and down arrow keys to read the suggestion line by line at your own pace.

**Jamie:** I wish I had known that when I started. So I press Alt plus F2, I read the suggestion in peace, and then what? How do I get it into my document?

**Alex:** While you are still inside the Accessible View, if you decide you like the text, you just press Control plus slash. That immediately inserts the suggestion into your document at your original cursor position and closes the Accessible View. If you do not like the suggestion, you just press Escape to close the view and go back to typing.

**Jamie:** That changes everything. Alt plus F2 to read it, Control plus slash to insert it. That feels so much more controlled.


**Alex:** Now that we have conquered inline suggestions, let us talk about the other half of GitHub Copilot. The Chat interface.

**Jamie:** This is where I can actually talk to it, right? Like a messaging app?

**Alex:** Exactly. You can open the Copilot Chat panel at any time by pressing Control plus Shift plus I. This opens a dedicated view in your sidebar. When you press Control plus Shift plus I, your screen reader will focus an input field. From there, you can ask questions in natural language.

**Jamie:** When you say natural language, do you mean I do not have to write code to talk to it?

**Alex:** Right. You just talk to it like you would talk to a human colleague. You could type, how do I create a pull request using the GitHub command line interface? Or, can you explain what this Markdown file is used for? Then you press Enter to send the message.

**Jamie:** And does the answer stream in and get all fragmented like the inline suggestions?

**Alex:** It does stream in, yes. But you can use the exact same trick. As soon as you press Enter to send your question, immediately press Alt plus F2 to open the Accessible View. The response will stream safely into that static view, and you can just use your arrow keys to read it. The Accessible View even formats code blocks and headings properly so your screen reader announces them correctly.

**Jamie:** That is so consistent. I love that the same shortcut works in both places. So, what if I want to ask a question about a specific file, or a specific part of VS Code? Does it just know what I am thinking about?

**Alex:** It is smart, but it cannot read your mind. To help Copilot understand exactly what you are asking about, we use Chat Participants. You can think of these like directing your question to a specific expert department in a massive company. You invoke them by typing the at symbol, followed by the participant name.

**Jamie:** Like tagging someone on social media?

**Alex:** Exactly like that. The three most common ones you will use are at workspace, at terminal, and at vscode.

**Jamie:** Let us break those down. What does at workspace do?

**Alex:** If you start your chat message with at workspace, Copilot will search across every single file in your current project folder to find the answer. So you could ask, at workspace, where do we document our accessibility guidelines? Copilot will scan the entire repository, find the contributing guide, and summarize the answer for you.

**Jamie:** That is incredible. It saves me from having to open a dozen files and use the find command. What about at terminal?

**Alex:** At terminal is a lifesaver when you get an error message on the command line that you do not understand. If you type at terminal, what does this error mean, Copilot will look at the recent text in your VS Code integrated terminal, read the error output, and explain it to you in plain English.

**Jamie:** Oh, I am definitely going to use that. Command line errors always look like a wall of gibberish to me. And the last one was at vscode?

**Alex:** Yes, at vscode. This participant is the expert on the VS Code editor itself. If you forget a keyboard shortcut, or you do not know how to change a setting, you just ask, at vscode, how do I turn on word wrap? It will give you the exact steps and the keyboard shortcuts.

**Jamie:** So participants tell Copilot where to look. Are there ways to tell Copilot what kind of action I want it to take?

**Alex:** Yes! For that, we use slash commands. If you type a forward slash in the chat input, you invoke a specific command. There are four major ones to memorize: slash explain, slash fix, slash tests, and slash doc.

**Jamie:** Those sound pretty self-explanatory, but let us go through them. Slash explain?

**Alex:** If you select a paragraph of complex text, or a dense block of code, and type slash explain, Copilot will break it down and explain how it works step by step. This is amazing when you are reading someone else's pull request and you cannot figure out what their code is doing.

**Jamie:** And slash fix?

**Alex:** If you select a broken piece of code, or even a Markdown table that is not formatted correctly, you type slash fix. Copilot will analyze the selection, figure out what is wrong, and propose a corrected version that you can accept.

**Jamie:** That is so much faster than hunting for a missing comma. What about slash tests and slash doc?

**Alex:** Slash tests will automatically generate unit tests for a function you have selected. And slash doc will automatically write the formal documentation block above a function or class. They are massive time savers for the repetitive parts of software development.


**Jamie:** Okay, so we have participants like at workspace to set the context, and commands like slash explain to set the action. I feel like I am learning a new syntax. But you said earlier I could just use natural language. Is there a trick to getting good answers when I am just typing regular sentences?

**Alex:** There is absolutely an art to it. We call it effective prompting. The biggest mistake beginners make is being too vague. If you type, write about accessibility, Copilot will give you a very generic, boring encyclopedia entry.

**Jamie:** So what makes a good prompt?

**Alex:** A good prompt is specific, it provides context, and it sets constraints. Think about ordering a sandwich at a deli. You do not just walk up and say, make me food. You say, I would like a turkey sandwich on rye bread, no mayo, add mustard, and please cut it in half.

**Jamie:** I am getting hungry. But I see your point. How does the sandwich order translate to Copilot?

**Alex:** Instead of saying, write about accessibility, you would say, write a three-paragraph section explaining how screen reader users can navigate the VS Code sidebar. Include keyboard shortcuts for NVDA. Assume the reader is a beginner. Use clear headings and bullet points.

**Jamie:** Wow, that is incredibly specific. You gave it the topic, the audience, the length, and the formatting.

**Alex:** Exactly. And the best part of effective prompting is iterating. Copilot remembers the conversation. So if it gives you an answer and it is a little too technical, you do not have to start over. You just reply, make that a little simpler, or, rewrite that in a friendlier tone. It will adjust the text immediately.


**Jamie:** Alex, I noticed in the settings there is a place to choose different AI models. What does that mean? Why are there different models?

**Alex:** That is a great observation. GitHub Copilot does not just rely on one single AI brain. It gives you access to multiple AI models from different companies, like OpenAI, Anthropic, and Google. You can switch between them using the model picker, which is a dropdown menu located at the bottom of the chat panel.

**Jamie:** Why would I want to switch? Are they really that different?

**Alex:** They are! Think of it like hiring different contractors for different jobs. If you select the GPT five mini model, it is incredibly fast and completely free to use. It is great for everyday questions and quick code completions. It is like riding a bicycle for a quick errand.

**Jamie:** But what if I have a really complex problem? Like a bug that spans across five different files?

**Alex:** Then you might want to open the model picker and select something like Claude Sonnet four point six, or GPT five point two. These models have much deeper reasoning capabilities. They are like renting a heavy-duty moving truck. They are slower, and if you are on a paid plan, they consume what are called premium requests, but they can handle incredibly complex logic.

**Jamie:** That makes sense. But honestly, having to choose which model to use every time I ask a question sounds exhausting.

**Alex:** I completely agree. And that is why the default setting in the model picker is simply called Auto mode.

**Jamie:** Auto mode. Let me guess, it chooses the vehicle for me?

**Alex:** Exactly. When you leave the model picker on Auto, Copilot evaluates your prompt behind the scenes. If you ask a simple question, it routes it to a fast, lightweight model. If you ask it to architect a complex new feature, it automatically upgrades to a heavy-duty model like Codex. It manages the cost and the speed for you, so you can just focus on writing.

**Jamie:** I will definitely be leaving that on Auto.


**Jamie:** So, Alex, I have a question about consistency. If I am working on an open source project, and we have very specific rules. For example, let us say our project requires all Markdown headings to use sentence case, and we never use the word click in our documentation. Do I have to type those rules into my prompt every single time I ask Copilot to write something?

**Alex:** That would be incredibly tedious. Thankfully, the answer is no. This brings us to one of the most powerful features for project maintainers: custom instructions files.

**Jamie:** Custom instructions. Is that a setting in VS Code?

**Alex:** It is actually a file you commit directly to your repository. You create a regular text file at the path dot github, slash copilot dash instructions dot m d.

**Jamie:** So it is just a Markdown file living in the dot github folder?

**Alex:** Exactly. And it acts like an employee handbook for Copilot. You can write your project's rules in plain English in that file. You might write, always write for screen reader users first. Never skip heading levels. Use imperative mood for commit messages.

**Jamie:** And Copilot just reads this file automatically?

**Alex:** Yes! Once that file is committed to your repository, Copilot silently reads it in the background every single time you ask a question or generate a completion. You never have to mention it. Copilot simply follows the rules of the house.

**Jamie:** That is brilliant. So if someone clones my repository and uses Copilot, their Copilot will automatically follow my accessibility rules?

**Alex:** Exactly. It is a fantastic way to enforce accessibility standards across an entire team without being a micromanager. Now, there is one more file type I want to mention, which is related to custom instructions, and that is prompt files.

**Jamie:** Prompt files. How are those different from the instructions file?

**Alex:** The instructions file is always on, in the background. Prompt files allow you to create your own custom slash commands that you invoke on demand. They are stored in the dot github, slash prompts folder, and they end with the extension dot prompt dot m d.

**Jamie:** Oh, I see. So earlier we talked about built-in commands like slash explain. I can make my own?

**Alex:** You got it. Let us say you do a lot of accessibility audits. You could create a file called dot github, slash prompts, slash audit dot prompt dot m d. Inside that file, you write a detailed prompt asking the AI to check for missing alt text, skipped headings, and improper link names.

**Jamie:** And then in the chat panel, I just type slash audit?

**Alex:** Exactly. You type slash audit, and Copilot executes that massive, detailed prompt perfectly every single time. It saves you from having to type out complex requests over and over again.


**Jamie:** Alex, this has been an incredibly packed episode. We went from ghost text to custom AI employees.

**Alex:** It is a lot to take in! But remember, you do not have to use all of this on day one. Start by just leaving Copilot turned on while you write, and get used to how it feels. Let us wrap up with our key takeaways for today.

**Jamie:** I will take the first one. When Copilot offers an inline suggestion, your screen reader will announce it. You can press Tab to accept the whole thing, Escape to dismiss it, or my favorite, Control plus the right arrow key to accept it one word at a time.

</details>


### Episode 15: Accessible Code Review

Navigating diffs with a screen reader, reviewing PRs in browser and VS Code.

Based on: [Chapter 14: Accessible Code Review](docs/15-code-review.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep15-accessible-code-review.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep15-accessible-code-review.mp3">Download Episode 15 (MP3)</a>
</audio>

[Download Episode 15 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep15-accessible-code-review.mp3)

<details>
<summary>Read Transcript - Episode 15: Accessible Code Review</summary>

#### Transcript

**Alex:** Welcome back to Gitt Going with GitHub. This is episode fifteen, Accessible Code Review. I am your host, Alex.

**Jamie:** And I am Jamie! I am so ready for this one.

**Alex:** Today is all about the reviewer experience. We are going to cover how to navigate file changes, read code comparisons, leave helpful comments, and submit your final review, entirely using your keyboard and screen reader.

**Jamie:** Before we jump in, let us quickly remind everyone of a couple of prerequisites. We will be building heavily on two previous episodes. First, episode six, where we introduced the concept of pull requests and the general review process. And second, episode eleven, which covered VS Code accessibility features. If you have not listened to those yet, you might want to open them up and give them a quick listen first.

**Alex:** Exactly. Now, in episode six, we talked about how a pull request, or PR, is a way to propose changes to a repository. You are literally requesting that the maintainers pull your code into their project. But before they do that, someone needs to review it.


**Jamie:** So, Alex, let us start with the big picture. Why is code review so important? When I first started learning GitHub about two years ago, I thought code review was just a way for senior developers to catch my typos.

**Alex:** That is a very common misconception. Code review does catch bugs, but it is fundamentally about quality and learning. It is a two-way street. The author gets another set of eyes on their work, and the reviewer gets to learn new techniques or familiarise themselves with a different part of the codebase.

**Jamie:** I love that. It reminds me of a writer's workshop. You do not just hand your manuscript to an editor to fix your grammar. You share it with peers. They might point out that a character's motivation is confusing, or they might learn a new way to write dialogue by reading your work.

**Alex:** That is a brilliant analogy. And just like a writer's workshop, building a habit of reviewing others' work regularly is one of the fastest ways to level up your own skills.

**Jamie:** I will be honest, though. Reviewing code still feels intimidating sometimes. Especially when I am looking at a pull request from someone who has been coding for ten years longer than I have.

**Alex:** It does feel intimidating! But here is the thing, you bring a unique perspective. Even if you do not catch a complex logic bug, you might catch an unclear variable name, or a missing documentation update. What we look for in a review really falls into four categories. Correctness, clarity, style, and accessibility.

**Jamie:** Correctness meaning, does the code actually do what it is supposed to do?

**Alex:** Right. Clarity means, is it easy to understand? Style means, does it follow the project's conventions? And accessibility means, does this change introduce any barriers for users with disabilities? You do not have to be an expert in all four to leave a valuable review.


**Jamie:** Okay, so I am sold on the why. Let us talk about the where. Where do we actually do these reviews?

**Alex:** You have two main environments for code review. The GitHub web interface in your browser, and your local code editor, which for our workshop is VS Code.

**Jamie:** Is one better than the other?

**Alex:** They just have different strengths. Both give you full keyboard and screen reader access. I like to think of the web browser as a quick chat at a coffee shop. It is great for quick reviews, leaving a few comments, and you can do it from any machine without downloading the code.

**Jamie:** And VS Code?

**Alex:** VS Code is like setting up in your home office for deep work. It is best for large reviews where you need to navigate through a lot of files, test the code locally, or use advanced screen reader features.

**Jamie:** I should also mention there is a third path, right? The GitHub CLI, or command line interface.

**Alex:** Yes, absolutely. The GitHub CLI is fantastic. You can open your terminal and type gh pr review to approve or request changes without ever leaving the command line. It is like the drive-through window of code review. Very fast, very efficient, but maybe not where you want to sit down and leave twenty detailed inline comments.


**Jamie:** Let us start with the coffee shop. The web browser. When I open a pull request on GitHub, how do I actually read the changes?

**Alex:** You need to navigate to the Files Changed tab. When you load a pull request page, you are usually on the Conversation tab, which has the description and the comments.

**Jamie:** Right, so how do I get to the files?

**Alex:** The most reliable way with a screen reader is to use your landmark navigation. Press the D key if you are using NVDA or JAWS, or use your VoiceOver landmarks rotor, to navigate to the Pull request navigation tabs landmark. From there, you can press the Right Arrow or Tab key to find the Files changed link, and press Enter.

**Jamie:** And when I open that, what am I actually listening to?

**Alex:** You are listening to a diff. Diff is short for difference. It is a format that shows exactly what changed between the old version of a file and the new version.

**Jamie:** I always explain a diff like a recipe where someone has crossed out a line and written a new one. Imagine a recipe card that says one cup of sugar, but the words one cup have a line through them, and next to it, someone wrote two cups.

**Alex:** That is exactly what a unified diff format looks like. It is called unified because it shows the old and new text combined into a single continuous flow. Every line in a diff is categorized in one of three ways. An addition line, a deletion line, or a context line.

**Jamie:** Let us break those down.

**Alex:** An addition line is new code that the author added. It starts with a plus sign prefix. A deletion line is code the author removed. It starts with a minus sign prefix.

**Jamie:** And context lines?

**Alex:** Context lines are the unchanged lines of code right above and below the changes. They do not have a plus or minus prefix. They are just there to give you context, so you know where the change is happening in the file.

**Jamie:** Okay, so I am on the Files Changed tab. How do I navigate through this diff?

**Alex:** First, orient yourself using the file tree. This is a region on the page that lists every changed file. You can navigate to the File tree region using your landmark shortcut, and just press the Down Arrow to move through the list. It will announce the file name, and how many additions and deletions it has.

**Jamie:** That is so helpful for getting a summary. If I see a file has five hundred additions, I know I need a coffee.

**Alex:** Exactly. Once you know what files you are dealing with, you can move to the actual code. Each changed file is presented under a heading level three containing the file name. So you can just press the number 3 key on your keyboard to jump from file to file.

**Jamie:** And what happens when I reach a file I want to read?

**Alex:** The diff for each file is structured as a table. Every row in the table is one line of code. To read it, you will navigate to the table using the T key. Then, and this is important, you need to turn on Focus Mode if you are using NVDA, or turn off the Virtual PC Cursor if you are using JAWS.

**Jamie:** Ah, right. Because in Browse Mode, pressing the Down Arrow just moves through the page structure. In Focus Mode, your arrow keys let you navigate the table cells directly.

**Alex:** Precisely. Once you are interacting with the table, you can press the Down Arrow to move through the lines of code one at a time. To read across the columns of a specific line, you press Control plus Alt plus the Right Arrow key. It will read the line number, then the change type, meaning whether it was added or deleted, and then the actual code content.


**Jamie:** Okay, so I am reading down the table, line by line. I hear a minus prefix, then a plus prefix, so I know a line was replaced. Let us say I spot a problem. The author changed a heading, but they skipped a heading level. They went from level two to level four. As an accessibility advocate, I know that breaks navigation for screen reader users. How do I tell them?

**Alex:** You need to write an inline review comment. This means you are attaching your comment directly to the specific line of code that has the issue, rather than just leaving a general comment at the bottom of the page.

**Jamie:** Like sticking a post-it note exactly on the sentence in a book that needs a rewrite.

**Alex:** Exactly. To do this, while your focus is on that specific line in the diff table, press the Tab key to look for a comment button. Or you can press the B key to navigate to the next button, which will say Add a comment to this line.

**Jamie:** Okay, that sounds like a lot of steps.

**Alex:** It does! But here is the thing, you have already done most of this on Day One of the workshop. It is the exact same workflow as opening an issue or replying to a discussion, just attached to a line of code. You press Enter on that button, an inline comment box opens, you switch to Focus Mode, and you type your feedback.

**Jamie:** What makes a good review comment? I remember early on, I would just write things like, this is wrong, or please fix. And people would get frustrated because they did not know what I wanted.

**Alex:** A helpful review comment is specific, educational, and graduated.

**Jamie:** Graduated? What does that mean?

**Alex:** It means signalling how important the comment is. Is it a strict requirement that blocks the pull request from merging, or is it just a stylistic preference? Using prefixes at the start of your comment is a great way to set expectations.

**Jamie:** Oh, I love prefixes. I use the word nit, spelled N I T, all the time. Like, nit, the link text says click here, which is not great for screen readers. Consider changing it to read the setup guide.

**Alex:** That is a perfect example. Nit means a non-blocking stylistic preference. Another good prefix is blocking. For your heading example, you could write, blocking, heading hierarchy violation. This skips level three. Please change to a level three heading before this merges.

**Jamie:** That is so clear. It names the issue, explains why it matters, and tells them exactly how to fix it.

**Alex:** Right. And once you type that comment, you tab to the button that says Start a review, and press Enter.

**Jamie:** Wait, why Start a review? Why not just click Add single comment?

**Alex:** If you use Add single comment, it posts immediately and sends an email notification to the author right then and there. If you leave ten comments, they get ten emails. Start a review batches all your comments together into a draft. When you are done looking at all the files, you submit the review all at once, and they get one single notification. It is much kinder to your teammates.


**Jamie:** Let us talk about that final submission. I have gone through all the files, I have left my post-it notes on various lines. How do I wrap this up?

**Alex:** You need to submit your review. You navigate to the top right of the Files Changed page, or the bottom of the Conversation tab, and find the Review changes button. Press Enter on that, and a dialog opens.

**Jamie:** This is where I give it my final grade, right?

**Alex:** Exactly. The dialog has a summary text area where you can write an overall thought, like, great work, just a few accessibility tweaks needed. Below that are three radio buttons for your verdict. Comment, Approve, or Request changes.

**Jamie:** Approve is pretty obvious. It means the code looks good to me, let us merge it. Request changes means I found a blocking issue, and they need to fix it before it can merge. What about Comment?

**Alex:** Comment means you have observations or questions, but you do not have a strong position on whether it should be blocked or approved. You are just leaving notes. Once you select your radio button, tab to Submit review, and press Enter.


**Jamie:** Okay, so that is the coffee shop experience. The web browser. It is incredibly powerful, but navigating those diff tables can get a little tedious if a pull request has hundreds of changes.

**Alex:** And that is exactly why we have the home office. VS Code. When you are dealing with a large review, VS Code offers a feature that completely changes the game for screen reader users. It is called the Accessible Diff Viewer.

**Jamie:** I remember the first time I used this. It was an absolute revelation.

**Alex:** How would you describe the difference between the browser diff and the VS Code Accessible Diff Viewer?

**Jamie:** In the browser, as we discussed, it is a big table. You have to navigate down rows, and across columns to figure out what line you are on, whether it is a plus or minus, and what the text says. The Accessible Diff Viewer is like a guided museum audio tour. It skips all the empty hallways and unchanged context lines, and just takes you straight to the exhibits that actually changed, and tells you exactly what happened to them.

**Alex:** That is a beautiful way to put it. Let us walk through how to use it. First, you open the pull request in VS Code. If you have the GitHub Pull Requests extension installed, you can open the Command Palette with Control plus Shift plus P, and search for GitHub Pull Requests View Pull Request.

**Jamie:** And once the pull request is open, the changed files appear in a tree on the sidebar. You navigate to a file and press Enter to open its diff editor.

**Alex:** Right. Now, when the standard diff editor opens, it is still a side-by-side visual comparison, which can be noisy. But here is the magic trick. Press the F7 key.

**Jamie:** F7. The magic button. What happens?

**Alex:** The Accessible Diff Viewer opens as a dedicated panel. Instead of a table, it presents each change, which programmers sometimes call a hunk, as a structured block of text designed specifically for sequential listening.

**Jamie:** So what does my screen reader actually say when I press F7?

**Alex:** It announces something like this. Changed lines fourteen to fourteen in docs slash keyboard-shortcuts dot markdown. Change one of three. Removed, heading level four, NVDA Single-Key Navigation. Added, heading level three, NVDA Single-Key Navigation.

**Jamie:** It is just so clean. It tells me exactly where I am, how many changes there are in total, and gives me clear Removed and Added labels. I do not have to guess what changed.

**Alex:** Exactly. And the navigation is purpose-built. You just press F7 again to jump to the next change. Or Shift plus F7 to jump to the previous change. You do not have to mess around with table navigation or focus modes. It just works with NVDA, JAWS, and VoiceOver right out of the box.

**Jamie:** And if I want to leave a comment while I am in VS Code?

**Alex:** You close the Accessible Diff Viewer by pressing Escape. That puts your cursor right back on the line you were just reviewing in the main editor. From there, you can open the Command Palette with Control plus Shift plus P, and select GitHub Pull Requests Add Comment. A text area opens, you type your comment, and submit it.

**Jamie:** And those comments sync directly back to GitHub, right? The author sees them on the web exactly as if I had used the browser.

**Alex:** Yes, they sync instantly. The author gets the exact same experience. They do not know or care which tool you used to write the review.


**Jamie:** This is so empowering. Whether I use the browser for a quick check or VS Code for a deep dive, I have complete access to the review process.

**Alex:** You do. And developing this manual review skill is critical. You need to know how to spot a heading hierarchy issue, or a missing alt attribute, or unclear link text yourself.

**Jamie:** Why is that so critical?

**Alex:** Because in our next episode, we are going to introduce Accessibility Agents. These are AI tools that can automatically scan a pull request and draft a review for you.

**Jamie:** Oh, wow. So the AI just does the review for me?

**Alex:** Not quite. The AI generates a draft. It will point out potential issues and suggest comments. But the AI does not have your human judgment. Your job shifts from finding every single issue manually, to reading the AI's draft, verifying if it is correct, and deciding what is actually worth saying to the author.

**Jamie:** I see. So if I do not know what a good review looks like, I will not know if the AI is giving me good advice.

**Alex:** Exactly. The manual skill is the foundation. The AI is just an amplifier.


**Jamie:** Let us wrap this up with a few concrete takeaways from today's episode. Number one, code review is a two-way street for quality and learning. It is not just about finding bugs, it is about improving the whole team.

**Alex:** Number two, you have two great environments. The browser is fantastic for quick, accessible reviews using landmark and table navigation. But for deep, line-by-line reading, press F7 in VS Code to open the Accessible Diff Viewer for a streamlined, sequential experience.

**Jamie:** Number three, when writing comments, be specific, educational, and graduated. Use prefixes like nit or blocking to clearly communicate your expectations to the author.

**Alex:** And number four, always use Start a review to batch your comments, rather than sending a dozen single comment notifications.

**Jamie:** This has been incredibly helpful. I feel like I am ready to go leave some blocking post-it notes on some pull requests.

**Alex:** I am sure your team will appreciate the thorough feedback. Thank you all for listening to Gitt Going with GitHub. In episode sixteen, we will dive into those Accessibility Agents and see how AI can speed up your workflow. Until then, keep practicing those reviews.

**Jamie:** See you next time!

</details>


### Episode 16: Issue Templates

Creating YAML-based issue templates for bug reports, features, and custom forms.

Based on: [Chapter 15: Issue Templates](docs/17-issue-templates.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep16-issue-templates.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep16-issue-templates.mp3">Download Episode 16 (MP3)</a>
</audio>

[Download Episode 16 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep16-issue-templates.mp3)

<details>
<summary>Read Transcript - Episode 16: Issue Templates</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode 16, Issue Templates. I am Alex, and as always, I am joined by Jamie.

**Jamie:** Hello everyone! I am very excited for this one because, if you remember way back in episode 5, we talked about how to file an issue. And I mentioned that staring at a completely blank text box was one of the most intimidating parts of learning GitHub for me. I never knew what information I was supposed to provide.

**Alex:** It is a universal feeling. You find a bug, you navigate to the Issues tab, you activate the New Issue button, and GitHub just hands you a blank page. You are left wondering, what do the maintainers actually need to know? Do they want my operating system? My screen reader version? Steps to reproduce?

**Jamie:** Exactly. And then you write what you think is a helpful description, and a day later a maintainer replies asking for exactly the details you left out. It is frustrating for everyone. It feels like a lot of unnecessary back and forth.

**Alex:** That is exactly the problem issue templates solve. Today, we are going to learn what issue templates are, how to use them, and most importantly, how to create them for your own repositories. We will cover where they live in your project, how to configure them, and the two different types of templates. We have traditional Markdown templates, and we have YAML form templates. We will talk about why YAML forms are a massive upgrade for screen reader accessibility.

**Jamie:** I love anything that makes screen reader navigation smoother. And just to remind our listeners, if you have not listened to episode 5 on working with issues, you might want to brush up on that first. But if you know how to navigate to the Issues tab and activate the New Issue button, you are ready for today.

**Alex:** Perfect. Let us start by defining what an issue template actually is. Think of an issue template like going to a new doctor. When you walk in, the receptionist does not just hand you a blank piece of paper and say, write down why you are here.

**Jamie:** Right, they give you an intake form. It asks for your name, your symptoms, your medical history, your current medications. It guides you to provide exactly what the doctor needs to know before they even see you.

**Alex:** Exactly. An issue template is an intake form for your GitHub repository. It turns that intimidating blank text editor into a structured guide. When contributors use a template, they provide the exact information you need to triage their issue. This drastically improves the quality of the issues you receive and reduces the burden on you as a maintainer. You spend less time asking follow up questions and more time actually fixing bugs.


**Jamie:** So as a user, when I activate that New Issue button on a repository that has templates set up, what actually happens? Because I know I do not just drop straight into a text editor anymore.

**Alex:** Right. When a repository has multiple templates, GitHub places a new step in between. You land on what is called the template chooser page. Your screen reader will announce a list of available templates. Each template appears as a card with a title, a short description, and a button that says Get started.

**Jamie:** So I might hear something like, Bug Report, report a problem with the software, Get started button. And if I press Enter on that button, then I am taken to the actual form.

**Alex:** Exactly. And the beauty of this template chooser page is that you, as the repository owner, can completely customize it using a special file called config dot y m l. That is spelled c o n f i g dot y m l.

**Jamie:** I have heard of YAML files before. Y A M L. It is a text format used for configuration, right?

**Alex:** Yes. YAML is a data serialization language, which is just a fancy way of saying it is a way to write structured data using plain text and indentation. It is very common for configuration files. In your config dot y m l file, you can control a few really important things about the template chooser page.

**Jamie:** What kind of things? Like adding more templates?

**Alex:** Actually, the templates themselves live in their own files. The config file is like the lobby directory of a large office building. It tells people where to go. One of the best features is that you can add external links. Let us say someone wants to ask a general question, not report a bug. You can add a contact link in your config file that points them to a GitHub Discussions board, or a community Slack channel.

**Jamie:** Oh, that is clever! So right on the page where they are about to file an issue, you can intercept them and say, hey, if you just have a question, go over here instead. That must save so much clutter in the issue tracker.

**Alex:** It really does. Another common use case for external links is security vulnerabilities. You never want someone posting a security flaw in a public issue. So you can add a link to the chooser page that directs them to a private security reporting form.

**Jamie:** That makes perfect sense. Now, what if I just want to write a regular issue? Can I bypass the chooser page and just get a blank text box?

**Alex:** By default, yes. At the bottom of the template chooser page, there is a link that says Open a blank issue. However, in your config dot y m l file, you have the power to turn that off. You can set a property called blank issues enabled to false.

**Jamie:** Wow. So you can force people to use your templates. That sounds a little strict, but I can completely see why a maintainer would do that. If you need their screen reader version to fix a bug, and they keep skipping the template, you just disable the blank issue option.

**Alex:** Exactly. For accessibility projects in particular, disabling blank issues is one of the most effective ways to improve the quality of incoming reports. An accessibility bug report without reproduction steps or assistive technology versions is almost impossible to triage.


**Jamie:** Okay, so we have the template chooser page, which is controlled by the config dot y m l file. Where do all these files actually live in my project?

**Alex:** They live in a very specific hidden folder. In the root directory of your repository, you will create a folder called dot github. Inside that dot github folder, you create another folder called ISSUE underscore TEMPLATE. That is all uppercase, issue underscore template.

**Jamie:** Okay, so the path is dot github slash issue underscore template. And inside that folder is where I put my config dot y m l file, and also all my actual template files.

**Alex:** You got it. Now, let us talk about how to build those template files. As I mentioned earlier, there are two ways to do this. The older, traditional way is using Markdown templates. These are files that end in dot m d.

**Jamie:** Markdown is the formatting language we use all over GitHub, right? With the hash symbols for headings and things like that.

**Alex:** Exactly. A Markdown template is essentially a text file that pre fills the issue editor. When a user selects your Markdown template from the chooser page, they are dropped into the standard issue text box, but the box already has text in it.

**Jamie:** Like a Mad Libs page! The headings are already there, and maybe some placeholder text, and I just have to type my answers in between the headings.

**Alex:** That is a perfect analogy. It is exactly like a fill in the blank Mad Libs page. To create one, you just create a Markdown file in your issue template directory. But there is a special section at the very top of the file called YAML front matter.

**Jamie:** Front matter. That sounds like the title pages of a book. What does it do?

**Alex:** Think of YAML front matter like a routing slip attached to the front of a physical file folder. It is a block of YAML code at the very top of your Markdown file, enclosed by three dashes at the top and three dashes at the bottom. This routing slip tells GitHub metadata about your template.

**Jamie:** What kind of metadata?

**Alex:** Five key things. First, the name of the template. This is what appears as the title on the template chooser page. Second, the description, which is the short text that appears under the name. Third, you can specify a title. This is really cool because you can pre fill the title of the issue itself. For example, you could have the title automatically start with a bracketed word like BUG, so every issue filed with this template has a consistent naming convention.

**Jamie:** Oh, I wish I had known that when I started. I always wondered how some projects had such perfectly formatted issue titles. What are the other two things in the front matter?

**Alex:** Labels and assignees. You can provide a comma separated list of labels, like bug or needs triage. When the user submits the issue, GitHub automatically applies those labels. And you can do the same with assignees, automatically assigning a specific maintainer to issues created with this template.

**Jamie:** That routing slip analogy is perfect. The front matter handles all the administrative sorting, labeling, and titling automatically. And then below those three dashes, I just write standard Markdown for the body of my template.

**Alex:** Exactly. You use hash marks for your section headings, like Steps to Reproduce, or Expected Behavior. You can also use HTML comments to leave instructions that the user can read, but that will not show up when the issue is finally published.

**Jamie:** Markdown templates sound really easy to set up. But you mentioned there was a second type. A YAML form template. Why would we use that instead?


**Alex:** Markdown templates are easy, but they have a massive flaw when it comes to accessibility and data consistency. Because a Markdown template just dumps text into a giant open text box, the user can do whatever they want. They can accidentally delete your headings. They can ignore your instructions. And most importantly, for a screen reader user, navigating a pre filled text box full of HTML comments and placeholder text can be incredibly noisy and confusing.

**Jamie:** That is so true. When I open a Markdown template, my screen reader just announces a massive block of text, and I have to use my arrow keys to carefully find the exact spot where I am supposed to start typing, making sure I do not accidentally delete the formatting. It is tedious.

**Alex:** Enter YAML form templates. These are files that end in dot y m l instead of dot m d. When a user selects a YAML form template, GitHub does not give them a single giant text box. Instead, GitHub generates a proper, accessible web form.

**Jamie:** Like a digital tax software wizard! Instead of handing you a blank tax form and saying good luck, the software asks you one question at a time with specific input fields.

**Alex:** Yes! A YAML form template creates distinct form fields. Each field has an explicit, programmatic label that your screen reader will announce. You navigate the template just like any other web form, pressing the Tab key to move from the operating system field, to the browser field, to the description field.

**Jamie:** That sounds so much better. What kinds of fields can we build with these YAML templates?

**Alex:** There are five main types you can define in your YAML file. The first is called markdown. This is not an input field, it is just static text. You use this to display instructions or warnings at the top of the form. Your screen reader will just read it as normal text content.

**Jamie:** Okay, so that is how I give them background information before they start typing. What is the next type?

**Alex:** The second type is input. This is a single line text field. It is perfect for short answers like a version number, or a URL. Your screen reader will announce it as edit text. The third type is textarea. This is a multi line text box. You use this for long form answers, like steps to reproduce, or describing the expected behavior.

**Jamie:** So if I want them to write a paragraph, I use textarea. If I just want a quick string of text, I use input.

**Alex:** Exactly. Now, the fourth type is where things get really powerful. Dropdown. This creates a select menu with predefined options.

**Jamie:** Oh, this is huge. Because if you ask people what operating system they use in a blank text box, one person writes Windows 11, another writes Win 11, another writes W 11. It is impossible to filter or search later. With a dropdown, you force them to pick from your exact list.

**Alex:** Precisely. And dropdowns are highly accessible. Your screen reader will announce it as a combo box. You press Down Arrow or Alt plus Down Arrow to expand it, and you can arrow through the specific choices. The fifth and final type is checkboxes. This creates a group of checkboxes that the user can toggle with the Space bar. This is fantastic for creating a pre submission checklist, like asking them to confirm they have searched for existing issues before filing a new one.

**Jamie:** Okay that sounds like a lot of steps to build all these fields. Do I have to write all of this YAML by hand?

**Alex:** It does sound like a lot! But here is the thing, you have already interacted with these exact types of fields whenever you use the web. You are just defining them in a text file. Each field in your YAML file gets a type, an ID, a label, and optionally a description and placeholder text. But the real magic of YAML form templates is validation.

**Jamie:** Validation? You mean making fields required?

**Alex:** Yes. In a Markdown template, someone can just submit a blank issue. In a YAML form template, you can add a property called required and set it to true for any input, textarea, or dropdown. If a user tries to submit the issue without filling out that field, GitHub stops them and displays an error. And yes, those errors are properly announced to screen readers.

**Jamie:** That is a game changer for maintainers. You can absolutely guarantee that every single bug report includes the screen reader version, because they literally cannot click submit until they provide it.


**Alex:** So, let us put this together and talk about the specific templates you might want to create for your projects. Every repository should generally have at least two templates. A bug report, and a feature request.

**Jamie:** Let us start with the bug report. Especially an accessibility bug report, since that is what our listeners are most likely dealing with. What should go into that template?

**Alex:** If you are building an accessibility bug report as a YAML form, you want to use dropdowns for the bounded information. You want a dropdown for the operating system. A dropdown for the screen reader, with options like NVDA, JAWS, VoiceOver on Mac, VoiceOver on iOS, and TalkBack. You want a dropdown for the browser.

**Jamie:** And I am guessing we want those all set to required equals true.

**Alex:** Absolutely. Then, you want textareas for the narrative information. You need a textarea for Expected Behavior, a textarea for Actual Behavior, and a critical textarea for Steps to Reproduce.

**Jamie:** I always struggle with what to write in Steps to Reproduce. How can we help users fill that out correctly?

**Alex:** That is where the placeholder attribute comes in. In your YAML file, you can define placeholder text that appears inside the empty textarea. Do not just write, enter steps here. Write an actual example. Number 1, navigate to the settings page. Number 2, activate the save button. Number 3, observe that focus is lost. By modeling good behavior in the placeholder, you teach the contributor exactly what you expect.

**Jamie:** That is a great tip. Okay, what about a feature request template? How is that different from a bug report?

**Alex:** A feature request template is about understanding a problem, not a system failure. So instead of asking for operating systems and browser versions, you ask different questions. You might have a textarea labeled Problem or Gap, where they explain what they are trying to achieve but cannot. Then another textarea labeled Proposed Solution, where they describe how they want the new feature to work.

**Jamie:** And maybe a checkbox at the bottom asking them to confirm that this feature has not already been requested by someone else.

**Alex:** Exactly. And the beauty of this system is that you are not limited to just bugs and features. You can create custom templates for literally any purpose. If you run a documentation repository, you can create a template specifically for requesting new tutorials. If you run a design system, you can create a template for proposing a new color token. You just name the YAML file whatever you want, put it in the issue template folder, and it will appear on the chooser page.


**Jamie:** Okay, so I have written my YAML file, I have added my dropdowns and textareas, and I have saved it in the dot github slash issue underscore template folder. How do I actually test it to make sure it works and is accessible?

**Alex:** Testing your templates is a crucial final step. The best way to do this is to commit your new template file to a branch and push it to your repository. You do not even have to merge it to your main branch yet. Once it is pushed, you navigate to the Issues tab on your repository and activate the New Issue button.

**Jamie:** And because I pushed the template, the template chooser page should appear, right?

**Alex:** Yes. You should see your new template listed there. Activate the Get started button for your template. This is where you do your screen reader testing. Do not just look at the code, actually navigate the generated form.

**Jamie:** Right, I would use my Tab key to move through the form. I want to listen carefully. Does the screen reader read the label clearly? Does it announce whether the field is required? When I open a dropdown, does it read all the options correctly?

**Alex:** Exactly. And try to submit the form while leaving a required field blank. Verify that your screen reader announces the validation error and moves focus appropriately. If everything sounds good, and the form guides you smoothly from top to bottom, your template is ready for the world.

**Jamie:** This really reframes how I think about issues. It is not just about complaining that something is broken. It is a structured conversation. And as a maintainer, you get to design exactly how that conversation flows by building a good template.

**Alex:** That is a beautiful way to put it. You are designing the contribution experience. A well designed YAML form template is an act of hospitality. It tells the contributor, we value your time, we want your feedback, and here is exactly how you can help us understand it.


**Alex:** We have covered a lot of ground today. Let us recap with some concrete takeaways. First, issue templates turn a blank text box into a guided intake form, improving the quality of contributions and saving maintainers time.

**Jamie:** Second, templates live in a specific folder in your repository. You navigate to the dot github folder, and inside that, you create an issue underscore template folder. That is where all your template files and your config dot y m l file will live.

**Alex:** Third, while you can use Markdown files for simple templates, YAML form templates are vastly superior for accessibility and data quality. They generate real web forms with explicit labels, structured dropdowns, and required field validation.

**Jamie:** And fourth, always test your templates with your screen reader. Make sure your labels are clear, your placeholder text is helpful, and your required fields are actually catching empty submissions.

**Alex:** If you are following along with the curriculum, your hands on activity for this chapter is to create a comprehensive accessibility bug report template using YAML, and submit it as a pull request to your fork. It is fantastic practice for writing YAML syntax and understanding form validation.

**Jamie:** But wait, earlier I asked if I really have to write all this YAML by hand. And you kind of dodged the question by saying it is just defining fields. Is there an easier way?

**Alex:** I am so glad you remembered that. Writing YAML by hand is a great way to learn the structure, which is why we teach it here. But in our next episode, Episode 17, we are going to introduce you to Accessibility Agents. Specifically, we will look at the Template Builder agent, an AI tool that will ask you conversational questions about what you want in your template, and then automatically generate the flawless YAML code for you.

**Jamie:** Oh, I cannot wait for that. No more worrying about missing colons or incorrect indentation!

**Alex:** Exactly. But understanding the concepts we discussed today is what makes you able to direct that agent effectively. Until next time, keep exploring, keep testing your forms, and we will see you in the next episode.

</details>


### Episode 17: Accessibility Agents

Six agents, 28 slash commands, custom agents, and agentic accessibility workflows.

Based on: [Chapter 16: Accessibility Agents](docs/19-accessibility-agents.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep17-accessibility-agents.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep17-accessibility-agents.mp3">Download Episode 17 (MP3)</a>
</audio>

[Download Episode 17 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep17-accessibility-agents.mp3)

<details>
<summary>Read Transcript - Episode 17: Accessibility Agents</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub, the audio series for blind and low-vision developers learning GitHub and open source. I am Alex, your lead host, and as always, I am joined by my co-host, Jamie.

**Jamie:** Hi everyone. I am Jamie. I am so ready for today. We are on Episode 17, which is called Accessibility Agents. And I have to admit, I peeked at the workshop materials for today and my mind is a little blown by what we are covering.

**Alex:** It is a big one. Today we are talking about specialized AI assistants that live right inside your editor and your repositories, designed specifically to help with accessibility tasks and GitHub workflows.

**Jamie:** Before we get too deep, we should probably remind everyone where we are coming from. If you are listening to this, you should have already completed the prerequisites we covered in a few earlier episodes. Specifically, Episode 11, where we talked about setting up VS Code extensions and settings, and Episode 14, where we covered GitHub Copilot Chat and how to interact with it.

**Alex:** Exactly. You need to know how to open Copilot Chat, which you can do by pressing Control plus Shift plus I on Windows, or Command plus Shift plus I on a Mac. If you are comfortable with that, you are ready for today.


**Alex:** Let us start with the big question. What exactly are accessibility agents?

**Jamie:** I know we have been using GitHub Copilot to help us write code and understand errors. Are agents just a different name for Copilot?

**Alex:** That is a great question. Think of GitHub Copilot as a general practitioner doctor. You can go to them with almost any problem, and they have a broad, baseline understanding of everything. They can help you with a lot of general coding tasks.

**Jamie:** Right, like asking it to explain a block of JavaScript or write a regular expression.

**Alex:** Exactly. But an accessibility agent is like a specialist. It is a cardiologist or a physical therapist. It is a custom AI assistant that extends GitHub Copilot with deep, specialized domain expertise. These agents know specific accessibility standards, they know how to audit document structures, and they know the exact workflows for managing GitHub repositories.

**Jamie:** Oh, I love that analogy. So instead of just asking general Copilot to check my code, I am bringing in an expert who only cares about keyboard navigation, or only cares about color contrast.

**Alex:** You nailed it. And this ecosystem is massive. There are currently fifty five different agents, organized into three distinct teams, and they run across five different platforms.

**Jamie:** Wait, fifty five? Okay, that sounds like a lot of steps. I am feeling a little intimidated just hearing that number. Am I supposed to memorize fifty five different AI assistants?

**Alex:** Not at all. And it is completely normal to feel overwhelmed by that number. But here is the thing, you have already done most of this on Day 1 of the workshop. Every single agent automates a sequence of steps you already know how to do manually. You do not need to use all fifty five. You just pick the ones that match the tasks you do every day.

**Jamie:** Okay, that makes me feel better. So what is the catch?

**Alex:** The catch is what we call the skill first principle. The agents are only useful if you have already done the work manually. An agent that summarizes pull requests is useless to someone who has never read a pull request. An agent that audits a web page for accessibility is useless if you do not understand the Web Content Accessibility Guidelines.

**Jamie:** That makes total sense. It is like power steering in a car. Power steering makes it much easier to turn the wheel, but it does not teach you how to drive. You still need to know the rules of the road and how to navigate. The agent does not teach you the skill, it multiplies a skill you already have.

**Alex:** That is a perfect comparison. So before you run any agent, ask yourself, could I do this task manually right now? If the answer is no, learn the manual skill first. The agents are designed to amplify your abilities, not replace your understanding.


**Alex:** Let us break down this ecosystem. I mentioned there are fifty five agents across three teams. Let us look at Team 1. This is the Accessibility team, and it is the largest, with twenty six agents.

**Jamie:** What kinds of specialists are on this team?

**Alex:** These agents audit, fix, and enforce accessibility across web, document, and mobile platforms. For example, there is an ARIA specialist for checking roles and states. There is a modal specialist that checks dialog focus trapping. There is a contrast master, a keyboard navigator, and agents specifically for auditing Microsoft Word, Excel, PowerPoint, and PDF documents.

**Jamie:** Wow. So if I am working on a complex data table, I can literally just call in the tables specialist agent to check my markup?

**Alex:** Exactly. Team 2 is the GitHub Workflow team, which has twelve agents. These automate GitHub operations. Things like issue triage, pull request reviews, contribution analytics, and repository management.

**Jamie:** Oh, I remember doing all of that manually in Episode 4 and 5. Navigating issues and reviewing pull requests takes a lot of time.

**Alex:** It does, and that is where these agents shine. Team 3 is the Developer Tools team, with six agents. These support accessible application development across desktop and cross platform frameworks. There is a Python specialist, a desktop accessibility specialist, and tools to help you build your own custom accessibility linters.

**Jamie:** You also mentioned they run on five platforms. Does that mean I have to leave VS Code to use them?

**Alex:** No, you can do everything right inside VS Code using GitHub Copilot. But the exact same fifty five agents are also available on Claude Code, Gemini Command Line Interface, Claude Desktop, and the Codex Command Line Interface. They are portable.


**Jamie:** So how do these teams actually work together? If I have a complex problem, do I have to talk to the keyboard navigator, and then separately talk to the contrast master?

**Alex:** You can, but you do not have to. This brings us to orchestrator agents. An orchestrator agent is like a general manager or a wedding planner. You give them the big picture goal, and they go hire the right specialists for the job.

**Jamie:** That sounds incredibly helpful. What are the names of these orchestrators?

**Alex:** There are a few key ones. In the GitHub Workflow team, there is an agent called at nexus. You literally type the at symbol, followed by the word nexus. At nexus handles cross agent orchestration for complex, multi step workflows. In the Accessibility team, there is at accessibility dash lead, which delegates audits to the various specialists. And there is at web dash accessibility dash wizard, which runs a full guided audit, invoking the contrast, keyboard, and forms specialists automatically.

**Jamie:** So if I am reviewing a pull request, how does that multi agent workflow happen in practice?

**Alex:** Let us walk through a real world example. Say you start your morning by asking the daily briefing agent what needs your attention. It flags a new pull request. Then, you ask the PR review agent to generate a structured review of that pull request. The review agent notices some changes to ARIA attributes, so it suggests you talk to the ARIA specialist. You invoke the ARIA specialist, it finds a missing expanded state on a button, and then you fix it. The teams connect naturally. The workflow agent tells you what happened, the accessibility agent evaluates if it is correct, and the developer tools agent helps you implement the fix.


**Jamie:** Okay, I am sold. How do I actually talk to these agents? You mentioned typing the at symbol.

**Alex:** Yes. To invoke an agent in Copilot Chat, you simply type the at symbol, and a list of available agents will pop up. You can use your arrow keys to navigate the list and press Enter to select one, or just type its name. For example, at daily dash briefing, followed by your request, like, morning briefing.

**Jamie:** That is easy enough. But what if I just want to run a quick command without having a whole conversation with an agent persona?

**Alex:** That is where slash commands come in. The ecosystem includes more than fifty four slash commands organized by workflow. You invoke them by typing a forward slash in the chat input.

**Jamie:** Oh, like how we use forward slash explain to ask Copilot to explain code.

**Alex:** Exactly. But these are custom slash commands built for our workflows. Let me give you some high impact starting points. These are the slash commands that save the most time.

**Jamie:** I have my notebook ready.

**Alex:** First is forward slash my dash issues. This gives you an instant dashboard of your open work across all repositories, complete with priority signals.

**Jamie:** That beats manually checking the notifications page and filtering by assigned issues.

**Alex:** It really does. Next is forward slash review dash p r, followed by the pull request number. So, forward slash review dash p r space pound fourteen. This generates a full AI generated review with inline suggestions, evaluating the risk level and summarizing the changes.

**Jamie:** Wait, does it actually post the review to GitHub automatically?

**Alex:** No, and this is a critical limitation we need to discuss. Agents suggest, humans decide and verify. The agent generates a draft review document in your chat window. It is your job to read it, edit it, make sure the tone is right, and verify that it did not miss any important context. Then, you post it under your own name.

**Jamie:** That goes back to the skill first principle. If I do not know how to review a pull request manually, I will not know if the agent gave me a good review or a terrible one.

**Alex:** Exactly right. A few other massive time savers to try first. Forward slash triage, followed by an issue number. This will suggest labels, priorities, and assignments for a new issue. Forward slash daily dash briefing gives you a morning snapshot of repository activity. And forward slash a eleven y dash update gives you the latest accessibility improvements across your repositories, complete with cross references to the Web Content Accessibility Guidelines.


**Jamie:** So how do I actually get all of these agents and slash commands onto my computer? Is it a complex installation?

**Alex:** It is surprisingly simple. There are two ways. For this workshop, the easiest way is to just fork the accessibility agents repository on GitHub, and then clone your fork to your local machine. When you open that folder in VS Code, Copilot automatically discovers the agents.

**Jamie:** Wait, that is it? No API keys or complex settings?

**Alex:** That is it. The agents live inside a folder called dot github, slash agents. Because they are just files in the repository, they travel with the code. If you clone a repository that has these files, you instantly have the agents.

**Jamie:** What if I want to use these agents on my own personal projects, not just the workshop repository?

**Alex:** Then you can use the quick install script. It is a single line you paste into your terminal. It detects what platforms you have installed and configures all fifty five agents globally on your machine. The exact commands are in the chapter text.

**Jamie:** I noticed you mentioned these agents are just files. How does a file tell the AI how to act like a specialist?

**Alex:** That is the magic of agent instruction files. Every agent is defined by a simple text file ending in dot agent dot m d. It is just a markdown file.

**Jamie:** So I can open these files and read them?

**Alex:** Absolutely, and you should. If you open the dot github slash agents folder, you will see files like issue dash tracker dot agent dot m d. If you read it, you will see it has two parts. At the top is some metadata, like the agent's name, a description of what it does, and what tools it is allowed to use.

**Jamie:** What do you mean by tools?

**Alex:** Tools give the agent permission to take actions. For example, an informational agent only needs permission to read files and search GitHub. But a task oriented agent might need permission to edit files, run shell commands, or create a pull request. Restricting tool access is a security best practice.

**Jamie:** That makes sense. What is the second part of the file?

**Alex:** The second part is the system prompt. It is plain English instructions. It is basically like writing a highly specific company employee handbook or a job description. You tell the agent its purpose, its domain knowledge, the step by step behavioral rules it must follow, and exactly how to format its output.


**Jamie:** If they are just markdown files, does that mean I can build my own custom agent?

**Alex:** You absolutely can, and that is one of the core exercises in the workshop. Building your own custom agent with agent dot m d files is how you tailor the AI to your exact workflow.

**Jamie:** How would I start doing that? Let us say I want an agent that specifically checks markdown files for accessibility errors, like making sure my heading levels do not skip from heading level one to heading level three.

**Alex:** You would create a new file in the dot github slash agents folder. Let us call it markdown dash assistant dot agent dot m d. At the top, you give it a name and tell it to use tools that let it read and edit files. Then, in plain English, you write its rules. You literally type, never skip heading levels. You tell it to verify that all images have alt text. You tell it to fix bare URLs.

**Jamie:** And once I save that file and reload the VS Code window, I can just type at markdown dash assistant in the chat?

**Alex:** Yes. And there are already real world examples of agent assisted contributions just like this. The GitHub Accessibility team actually published a complete walkthrough for building exactly the Markdown Accessibility Assistant you just described. It is a task oriented agent that not only reviews the file, but makes direct fixes.

**Jamie:** Oh, I love the idea of it making the fixes for me. But wait, what about things that require human judgment, like writing good alt text? I do not want the AI guessing what an image represents.

**Alex:** That is brilliant, Jamie, and it highlights a key pattern for custom agents called tiered decision making. When you write the agent's instructions, you tell it to fix objective issues automatically. Things like heading hierarchy or list structure. But for subjective issues, like alt text or plain language, you instruct the agent to flag the issue, suggest a fix, and wait for human approval before changing anything.

**Jamie:** That keeps the human in the loop for the important stuff, but automates the boring mechanical fixes.

**Alex:** Exactly. Let me give you another real world example from the workshop materials. There is an agent called at template dash builder. Creating GitHub issue templates manually requires writing YAML syntax, which is error prone and tedious. The template builder agent turns this into an interactive wizard.

**Jamie:** How does it do that?

**Alex:** You invoke it by typing at template dash builder, create accessibility template. Instead of just dumping code, the agent uses VS Code to ask you questions one by one. It asks, what is this template called? You type your answer. It asks, what field do you want to add? You type, screen reader dropdown. It asks what the options should be.

**Jamie:** So it interviews me, and then writes the YAML file perfectly based on my answers?

**Alex:** Yes. And if you want to change it later, you just tell the agent, add a checkbox for version compatibility, and it modifies the file for you. It takes a fifteen minute manual task and turns it into a two minute conversation.


**Jamie:** Everything we have talked about so far happens inside VS Code on my local machine. But what if I want an agent to do something automatically when I am not at my computer? Like, when someone opens an issue in my repository at three in the morning.

**Alex:** That brings us to agentic workflows. This is the bridge between the local agents we use in VS Code and cloud based automation. You can chain multiple agents together and run them on GitHub Actions infrastructure.

**Jamie:** So it works like an assembly line, where each station handles a specific task automatically?

**Alex:** Exactly. You can write a workflow file that says, whenever a new issue is opened with the word accessibility in the title, assign it to the accessibility team, add a needs triage label, and post a comment asking the user what screen reader they are using. The workflow runs serverlessly. No local machine required.

**Jamie:** That is incredibly powerful. But it all comes back to defining the intent in plain language, just like the local agents.

**Alex:** Yes. Understanding how to write local agent instructions in VS Code is the exact conceptual precursor to writing GitHub Agentic Workflows. Once you understand one, the other is immediately readable.


**Jamie:** We have covered so much ground today. The fifty five agents, the three teams, slash commands, building custom agents, and agentic workflows.

**Alex:** It is a massive topic. If you want to go deeper, and I highly recommend you do, check out Appendix V in the workshop materials. It is the complete reference for all fifty five agents, all fifty four plus slash commands, and all the customization formats.

**Jamie:** And there is an audio version for that too, right?

**Alex:** Yes, Episode 39 walks through the entire Appendix V reference step by step. It is a fantastic resource when you are ready to start building your own advanced workflows.

**Jamie:** So, Alex, what are the concrete takeaways for our listeners today?

**Alex:** I have three main takeaways. First, embrace the skill first principle. Agents do not teach you how to use GitHub; they multiply the skills you already have. Always do the task manually at least once before asking an agent to do it.

**Jamie:** Second, do not try to learn all fifty five agents at once. Start with high impact slash commands like forward slash my dash issues, or forward slash review dash p r. Let them save you time on tasks you already do every day.

**Alex:** And third, remember that agents suggest, but humans decide. Whether you are using a pre built agent or building your own custom agent dot m d file, you are responsible for the final output. Use tiered decision making to automate the objective tasks and keep yourself in the loop for the subjective ones.

**Jamie:** This has been such an eye opening episode. I am going to go play with the template builder agent right now. What are we covering in the next episode?

**Alex:** Next time, we are diving into Episode 18, which is all about GitHub Actions. We have touched on it briefly today with agentic workflows, but in the next episode, we are going to break down exactly how to automate your testing, your deployments, and your repository maintenance using continuous integration.

**Jamie:** I cannot wait. Thank you all for listening to Gitt Going with GitHub. We will see you in the next episode.

</details>


## Appendices

### Episode 18: Glossary of Terms

Comprehensive glossary: Git, GitHub, open source, and accessibility terminology.

Based on: [Appendix A: Glossary of Terms](docs/appendix-a-glossary.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep18-glossary.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep18-glossary.mp3">Download Episode 18 (MP3)</a>
</audio>

[Download Episode 18 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep18-glossary.mp3)

<details>
<summary>Read Transcript - Episode 18: Glossary of Terms</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode eighteen, Glossary of Terms. I am Alex, and today we are doing something a little different. Instead of a step by step tutorial, we are taking a step back to build our vocabulary. If you are attending our two day workshop, this episode is your foundational reference guide.

**Jamie:** And I am Jamie. I am so glad we are doing this because when I started learning GitHub about two years ago, the jargon was honestly the biggest barrier. People would say things like, just fork the repo, clone it local, branch off upstream, and push a pull request. And my brain would just shut down. It sounded like a completely different language.

**Alex:** It really is a different language. And that is exactly why we want to normalize this right now. If you are feeling intimidated by the terminology, that is completely normal. You have already done most of the underlying workflows in your day to day life without realizing it. Today, we are just giving you the official names for those concepts so you can communicate effectively with other developers and open source maintainers.

**Jamie:** That is a relief. So, what is the plan for today?

**Alex:** We are going to break our glossary down into five main categories. First, we will cover the core version control terms, the absolute basics of Git. Second, we will move into GitHub specific collaboration terms. Third, we will untangle the web of remotes, things like upstream and origin. Fourth, we will define the accessibility terms we use throughout this workshop when we describe navigating the interface. And finally, we will cover terms related to artificial intelligence agents and GitHub Copilot.

**Jamie:** And just a quick reminder for our listeners, the prerequisite for this episode is simply a basic understanding of web navigation with your screen reader. We covered how GitHub structures its web pages in episode one, so if you need a refresher on that, feel free to navigate back to that episode.

**Alex:** Perfect. Let us dive right into category one, version control terms. And we have to start with the container that holds everything, the repository. You will almost always hear this shortened to repo. A repository is the main folder for an entire project. It holds all the files, all the documentation, and most importantly, the complete history of every change ever made to those files.

**Jamie:** I always like to think of a repository as a project folder that has a time machine built into it. If you have ever worked on a document and saved it as final version, then final final version, then absolute final version use this one, you were trying to do what a repository does automatically. It remembers every past state of your project.

**Alex:** That is a brilliant analogy. And the way it remembers those past states is through our next term, a commit. A commit is a saved snapshot of your changes at a specific moment in time. But it is not just hitting control plus S on your keyboard. When you make a commit, you are required to attach a message explaining what you changed and why you changed it.

**Jamie:** Right, it is like hitting save, but you have to attach a sticky note to the file explaining your thought process. I remember learning that a good commit message should complete the sentence, if applied, this commit will... so, if applied, this commit will fix the broken login button.

**Alex:** Exactly. Now, as your repository grows, you might want to experiment with a new feature without breaking the working version of your project. That is where a branch comes in. A branch is a separate, parallel line of development inside your repository. The default, stable version of your project lives on a branch usually called main. When you want to build something new, you create a new branch.

**Jamie:** This is my favorite concept. A branch is literally a parallel universe or an alternate timeline. You branch off from the main timeline, you make your changes in your own little universe, and the main timeline is completely unaffected. You can switch back and forth between these universes whenever you want.

**Alex:** And when you are happy with the work in your parallel universe, you need a way to bring those changes back into the main timeline. That process is called a merge. To merge is to combine the changes from one branch into another.

**Jamie:** But what happens if two people changed the exact same thing in their own parallel universes, and then they both try to merge back into the main timeline?

**Alex:** That brings us to a term that strikes fear into the hearts of many beginners, the merge conflict. A merge conflict happens when Git cannot automatically figure out which changes to keep. For example, if you changed the background of the website to blue, and I changed it to red on the exact same line of code, Git throws its hands up and says, I need a human to decide this.

**Jamie:** I used to panic when my screen reader announced a merge conflict. It sounds so aggressive. But it is really just Git pausing the process to ask for your help.

**Alex:** Exactly. And the way Git asks for help is by inserting special text markers into your file. When you are reading the file with your screen reader, you will hear a line of less than signs, followed by the word HEAD, which represents your current branch. Then you will read your changes. Then you will hear a line of equals signs, which divides your changes from the incoming changes. Then you read the other person's changes. And finally, a line of greater than signs. To fix it, you just delete the markers, keep the text you want, and save the file.

**Jamie:** That takes so much of the mystery out of it. Okay, so we have our repository, we make commits on branches, and we merge them together. But how do we get our code onto the internet or onto our computer?

**Alex:** That is where push and pull come into play. These are action verbs. When you push, you are uploading your local commits from your computer up to a remote server, like GitHub. When you pull, you are downloading new commits from GitHub down to your computer and merging them into your current branch.

**Jamie:** So push is upload, pull is download. But specifically for commits, not just loose files.

**Alex:** Spot on. Now, to do any pushing or pulling, you need the repository on your computer in the first place. This introduces two terms that confuse almost everyone at first, clone and fork.

**Jamie:** Oh, absolutely. I thought these were interchangeable for the longest time.

**Alex:** They are related, but very different. Let us start with fork. A fork is a personal copy of someone else's repository that lives on your own GitHub account. You do this when you want to contribute to a project where you do not have permission to make changes directly. You fork their project, which gives you a playground copy on your own GitHub account where you have full control.

**Jamie:** So a fork happens entirely in the cloud, on GitHub's servers. My analogy for this is walking into a library, finding a reference book you are not allowed to write in, and making a photocopy of it to put in your own personal locker. You can draw all over your photocopy.

**Alex:** I love that. Now, clone is the next step. Cloning is the act of copying a repository from the internet down to your local computer's hard drive so you can work on it in an editor like Visual Studio Code.

**Jamie:** Keeping with the library analogy, cloning is taking that photocopied book out of your locker and bringing it home to your kitchen table so you can actually work on it.

**Alex:** That is exactly right. You fork a repository to get your own copy on GitHub, and then you clone your fork to get it onto your laptop.


**Alex:** Let us transition into our second category, GitHub specific collaboration terms. Once you have made your changes and you are ready to share them, you will interact with the GitHub website. The absolute core of GitHub collaboration is the pull request, often abbreviated as PR.

**Jamie:** So a pull request, and I love this name because it tells you exactly what it is, is you literally requesting that the maintainers of a project pull your changes into their repository. You are saying, hey, I fixed that bug on my branch, please pull my branch into your main branch.

**Alex:** Precisely. When you open a pull request, GitHub provides a beautiful interface for discussing the proposed changes. Which leads us to a helpful feature, the draft pull request. Sometimes you want to show people what you are working on before it is actually finished. When you open a draft PR, it clearly signals to everyone that this is a work in progress. It prevents maintainers from accidentally merging it before you are ready.

**Jamie:** Draft PRs take so much pressure off. I use them all the time just to get early feedback on my approach. And speaking of feedback, that brings up the term review.

**Alex:** Yes, a code review is the process where other developers read through the changes in your pull request. They can leave comments on specific lines of code, they can approve the changes, or they can request modifications. It is a peer review system to ensure quality.

**Jamie:** And it is not just humans doing the reviewing, right? When I open a pull request, my screen reader always starts announcing things like, some checks haven't completed yet. What is a status check?

**Alex:** A status check is an automated test that runs against your pull request. Think of it like an automated bouncer at a club. Before your code is allowed to merge, the repository might have a robot automatically check if your code compiles, if it follows formatting rules, or if it passes accessibility scans. If the status check fails, you get a red X, and you usually cannot merge until you fix the issue.

**Jamie:** That is actually really reassuring. The robots catch my typos before the human reviewers even have to see them. Now, before you even write code or open a pull request, you usually start with an issue, right?

**Alex:** Correct. An issue is a tracking item in a GitHub repository. Despite the name, an issue does not just mean a problem or a bug. Issues are used to request new features, ask questions, or discuss ideas. Think of the issues tab as a combination of a to do list and a discussion forum for the project. Every issue gets a unique number, like issue number forty two, which makes it very easy to reference later.


**Alex:** Now we are moving into category three. This is where we untangle collaboration network terms. We are talking about local, remote, origin, upstream, and downstream. Jamie, I know this was a sticking point for you early on.

**Jamie:** Oh, it was a nightmare. I would read documentation saying to fetch from upstream and push to origin, and I had no idea where my code was actually going.

**Alex:** Let us break it down simply. Local refers to the files sitting physically on your computer's hard drive. When you are working offline in Visual Studio Code, you are working local. Remote refers to any version of the repository that is hosted on the internet, like on GitHub.

**Jamie:** Okay, so local is my laptop, remote is the cloud. That is easy enough. But what are origin and upstream? Because those are both remotes, right?

**Alex:** Yes, they are both specific names for remote repositories. Let us use the open source contribution workflow to explain them. Imagine you want to contribute to the official Python programming language repository. You do not have permission to change their code, so you fork it. Now you have a copy on your personal GitHub account. Then you clone your personal copy down to your local computer.

**Jamie:** Right, so I have my local copy on my laptop, and my personal fork on GitHub.

**Alex:** Exactly. From the perspective of your local computer, your personal fork on GitHub is called origin. Origin is the default name Git gives to the place you cloned from. It is your home base in the cloud. When you type git push, it sends your code to origin.

**Jamie:** Okay, so origin is my personal fork. Then what is upstream?

**Alex:** Upstream refers to the original repository that you forked from, in this case, the official Python repository. It is called upstream because changes flow down from it to you. If the maintainers of Python update their code, you need to pull those changes down to keep your fork up to date. You are pulling from the upstream source.

**Jamie:** That analogy actually makes perfect sense. Upstream is the original source of the river. Origin is my personal reservoir that I built by piping water from the river. And local is the glass of water sitting on my desk.

**Alex:** That is a fantastic way to visualize it. And just to complete the metaphor, downstream refers to anyone who forks your repository. To them, you are the upstream. It is all relative to where you are standing.


**Alex:** Let us shift gears to category four. Throughout this audio series and the two day workshop, we use specific accessibility terms to describe how to navigate GitHub and Visual Studio Code. We want to define those clearly so everyone is on the same page.

**Jamie:** Yes, and the most fundamental term we use is screen reader. A screen reader is assistive technology that converts digital text and interface elements into synthesized speech or Braille. Common ones are NVDA or JAWS on Windows, and VoiceOver on Mac. When we say, listen to what your screen reader announces, we are referring to the feedback from this software.

**Alex:** Next is a term crucial for efficient navigation, the landmark. A landmark is an invisible, structural tag applied to sections of a web page. Common landmarks include the banner, the main content area, navigation regions, and the footer.

**Jamie:** Landmarks are like teleportation pads. Instead of hitting the tab key a hundred times to get past the top menu, I can use my screen reader's shortcut, usually the letter D or the region navigation key, to jump instantly to the main landmark where the actual content begins.

**Alex:** Exactly. Similar to landmarks are headings. A heading is a structural element that acts like the outline of a document. They range from heading level one, which is usually the page title, down to heading level six for deeply nested subsections. When we tell you to navigate to the heading called Pull Requests, we are instructing you to use your screen reader's heading shortcut, usually the letter H, to jump directly to that section.

**Jamie:** And then there is a term that sounds like a musical concept, but it is actually highly technical. ARIA. Could you explain what ARIA is, and also clarify how to pronounce it? I have heard people say it a few different ways.

**Alex:** I pronounce it are-ee-uh. It stands for Accessible Rich Internet Applications. ARIA is a set of attributes that developers add to code to communicate complex interface behaviors to screen readers. For example, if a menu is collapsed, an ARIA attribute tells the screen reader to announce collapsed. When you press enter, the attribute changes, and the screen reader announces expanded. You do not need to know how to write ARIA to take this workshop, but you will hear us mention it when we explain why GitHub announces certain things.

**Jamie:** That makes sense. Two more accessibility terms we use constantly are focus and tab order. Focus refers to the specific element on the screen that is currently active and ready to receive keyboard input. If you type a letter, it goes into the element that has focus.

**Alex:** And tab order is the sequential path that your focus takes when you press the Tab key to move forward, or Shift plus Tab to move backward. A well designed page has a logical tab order that follows the visual reading order. When we say, move your focus to the commit button, we generally mean to tab through the interface until that button is the active element.


**Alex:** Finally, we arrive at category five. This workshop incorporates modern development tools, specifically artificial intelligence agents. The primary tool we use is GitHub Copilot.

**Jamie:** GitHub Copilot is incredible. It is an AI powered coding assistant built directly into Visual Studio Code and GitHub.com. But it does not just write code, right? We use it to explain error messages, write documentation, and even help us resolve those merge conflicts we talked about earlier.

**Alex:** That is right. And Copilot operates using what we call an agent. An agent is a specialized AI helper designed for a specific context. For example, in Visual Studio Code, there is a workspace agent that knows about all the files in your local repository. There is also a terminal agent that specializes in command line errors.

**Jamie:** And how do we talk to these agents? I know we use something called a slash command.

**Alex:** Yes, a slash command is a shortcut to give the agent a specific task. In the Copilot chat window, you literally type the forward slash character followed by a word. If you type slash explain, the agent knows you want an explanation of the code that currently has focus. If you type slash fix, it will analyze an error and propose a solution.

**Jamie:** After you use a slash command, you usually provide a prompt. A prompt is simply the human language instruction or question you are asking the AI. So you might type, slash explain, and then your prompt could be, what does this regular expression do?

**Alex:** Exactly. And the last term in this category is the instruction file. An instruction file is a plain text file you can add to your repository to give Copilot custom rules for your specific project. You can tell it things like, always write explanations at a beginner level, or, never use certain outdated functions. It is a way to tailor the AI's behavior so it aligns with your project's standards.


**Alex:** We have covered a massive amount of ground today. Let us quickly recap with some concrete takeaways. First, remember the fundamental Git workflow. You make a commit to save a snapshot of your work, you do this on a separate branch to isolate your changes, and then you merge it when you are done.

**Jamie:** Second, keep your remotes straight. Origin is your personal fork on GitHub. Upstream is the original project you want to contribute to. And local is the computer sitting in front of you.

**Alex:** Third, utilize pull requests and issues. Issues are where discussions and bug reports happen. Pull requests are where you actually propose the code changes to solve those issues. And do not be afraid to use a draft pull request to get early feedback.

**Jamie:** And finally, lean on the accessibility structures. Use landmarks and headings to jump around GitHub's interface quickly, rather than tabbing through every single link.

**Alex:** Well said, Jamie. Having this shared vocabulary is going to make the rest of the workshop so much smoother. In our next episode, we are going to dive into the magic of automation with GitHub Actions and Workflows. We will learn how to make the repository do the heavy lifting for us.

**Jamie:** I cannot wait for that one. Thank you all for listening, and we will see you next time on Gitt Going with GitHub.

</details>


### Episode 19: Screen Reader Cheat Sheet

NVDA, JAWS, and VoiceOver commands for GitHub and VS Code.

Based on: [Appendix B: Screen Reader Cheat Sheet](docs/appendix-b-screen-reader-cheatsheet.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep19-screen-reader-cheatsheet.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep19-screen-reader-cheatsheet.mp3">Download Episode 19 (MP3)</a>
</audio>

[Download Episode 19 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep19-screen-reader-cheatsheet.mp3)

<details>
<summary>Read Transcript - Episode 19: Screen Reader Cheat Sheet</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub, the audio learning series for blind and low-vision developers who are mastering GitHub and open source collaboration. This is episode nineteen, titled Screen Reader Cheat Sheet. I am your host, Alex, and as always, I am joined by my fantastic co-host, Jamie.

**Jamie:** Hello everyone! I am so excited for this episode. If you are following along in the two-day workshop, we are looking at Appendix B today. And I have to admit, when I first started learning GitHub about two years ago, I felt like I was drowning in keyboard shortcuts. There are screen reader shortcuts, browser shortcuts, and GitHub shortcuts. It felt like trying to learn to play a piano with three different sets of sheet music at the same time.

**Alex:** That is a perfect analogy, Jamie. It can feel completely overwhelming at first. But the secret is that you do not need to memorize every single command to be successful. You just need to understand the underlying patterns. Once you understand how the piano is tuned, to borrow your analogy, you can play almost any song. Today, we are going to break down the essential keyboard commands for NVDA, JAWS, and VoiceOver, plus GitHub's built-in shortcuts, and even some critical commands for Visual Studio Code.

**Jamie:** And if you are listening to this and thinking, okay, that sounds like a lot of steps, please know that it is completely normal to feel that way. You have actually already done most of this on Day One of the workshop. We are just giving you the official names and the fastest routes for the workflows you already know.

**Alex:** Exactly. Before we dive into the specific keys, we have to talk about the most fundamental concept for screen reader users on the web. We need to talk about the two different modes that your screen reader uses. If you do not understand these two modes, GitHub will feel completely broken to you. These are Browse Mode and Focus Mode.

**Jamie:** Oh, this is the big one. I remember the exact moment this finally clicked for me. I was trying to leave a comment on an issue, and I kept pressing the letter H to type the word Hello, and instead of typing, my screen reader just kept jumping wildly around the page to different headings. I was so frustrated.

**Alex:** We have all been there! Let us define what is happening. Browse Mode, which JAWS calls the Virtual Cursor, is your primary mode for reading and navigating web pages. When you are in Browse Mode, your screen reader intercepts every key you press and uses it as a navigation command. So pressing the letter H tells the screen reader to jump to the next heading, rather than sending the letter H to the website.

**Jamie:** Right. And I like to think of Browse Mode like walking through a museum. You are moving from exhibit to exhibit, reading the plaques, taking in the structure of the room. You are observing, but you are not touching or changing anything.

**Alex:** I love that museum analogy. But eventually, you need to interact. You need to type a comment, or rename a file, or fill out a search box. That is where Focus Mode comes in. Focus Mode, which is sometimes called Forms Mode, tells your screen reader to stop intercepting your keys. It passes your keystrokes directly through to the web page.

**Jamie:** So sticking with the museum, Focus Mode is like stepping up to the guestbook at the end of the tour and picking up a pen. Now you are writing. You are interacting directly with the canvas.

**Alex:** Exactly. Let us talk about how to switch between these modes, starting with NVDA, which is the primary screen reader we use in this workshop. To toggle between Browse Mode and Focus Mode in NVDA, you press NVDA plus Space. You will hear a distinct sound. A higher pitched click means you entered Focus Mode, and a lower pitched clack means you went back to Browse Mode.

**Jamie:** And for JAWS users, the concept is the same, but the keystroke is Insert plus Z to toggle the Virtual PC Cursor on and off. Though JAWS is generally pretty good at switching into forms mode automatically when you navigate to an edit field, it is still crucial to know how to force it manually with Insert plus Z when things get stuck.

**Alex:** Now, VoiceOver on macOS handles this a bit differently. VoiceOver does not have a global Browse or Focus mode in the same way. Instead, you interact with specific elements. To type in a text box, you navigate to it and press VoiceOver keys, which are Control plus Option, plus Shift plus Down Arrow. This tells VoiceOver you are stepping inside that element to interact with it. When you are done typing, you press VoiceOver keys plus Shift plus Up Arrow to stop interacting and step back out.

**Jamie:** VoiceOver interacting always reminds me of opening a Russian nesting doll. You step down into the container to play with the pieces inside, and then you step back up and close the doll when you are finished.


**Alex:** So now that we understand our modes, let us talk about how we actually move around GitHub in Browse Mode. We will start with single-key navigation for NVDA and JAWS. VoiceOver users can also use these if they have Quick Nav turned on. The absolute most important key you will use on GitHub is the letter H, for Headings.

**Jamie:** Headings are the skeleton of any GitHub page. Pressing H jumps you forward to the next heading, and Shift plus H moves you backwards. But you can also be more specific by pressing the numbers one through six.

**Alex:** Yes, and GitHub is very consistent about how they use these heading levels. If you press the number one, you will jump to the main title of the page. On a repository page, the level one heading is the name of the repository itself. Pressing the number two will jump you to major sections, like the repository file tree or the README file.

**Jamie:** And the number three is my favorite shortcut on GitHub. Issue titles and Pull Request titles are always level three headings. So if you are on a page with a list of fifty open issues, you do not have to read through all the dates and labels and author names. You just rapidly press the number three to jump from one issue title to the next. It is incredibly fast.

**Alex:** It is a massive time saver. The next crucial navigation key is the letter D for NVDA users, or the letter R for JAWS users. This jumps you between Landmarks. Landmarks are named regions of the page, like the main content area, the navigation menu, or the sidebar.

**Jamie:** Landmarks are fantastic when you first land on a page and want to skip over the hundreds of navigation links at the top. You just press D until you hear Main Landmark, and you are right where the actual content begins.

**Alex:** Exactly. Next we have the letter K for Links, and the letter B for Buttons. You will use B constantly to find things like the Clone or Download button, or the Submit Comment button. And to find form fields, like the search bar or a comment box, you use the letter F, or the letter E in NVDA.

**Jamie:** We also have to talk about tables. GitHub uses tables to display the list of files in a repository. When you land on a repository page, pressing the letter T will jump you straight to that file table.

**Alex:** And once you are inside the table, you do not want to just use your standard up and down arrows, because that will read every single piece of information out of order. Instead, you hold down Control plus Alt, and then use your arrow keys. Control plus Alt plus Down Arrow moves you down the rows, so you can read the list of file names. Control plus Alt plus Right Arrow moves you across the columns, so you can read when that file was last updated or the commit message associated with it.

**Jamie:** Okay, Alex, those are a lot of single keys to remember. What if I am on a complex Pull Request page, and I cannot remember if the thing I want is a button, or a link, or a heading? I just know the name of it.

**Alex:** That brings us to your navigation superpower. The Elements List. If you only remember one thing from this entire episode, remember the Elements List. In NVDA, you open it by pressing NVDA plus F7. In JAWS, you can press Insert plus F6 for a headings list, or Insert plus F7 for a links list.

**Jamie:** The Elements List is like walking into a massive shopping mall and looking at the electronic directory board. Instead of wandering around hoping you bump into the store you want, you just pull up the master list.

**Alex:** Exactly right. When you press NVDA plus F7, a dialog box opens. It gathers every single link, heading, button, and landmark on the entire page and puts them into clean, alphabetical lists. You can use your Tab key to switch between the types of elements. But the best part is that you can type to filter. If you want to create a new issue, you just open the Elements List, make sure you are on the links or buttons tab, and type the word new. It instantly filters the list down to the New Issue button. You press Enter, and the screen reader activates that button for you.

**Jamie:** It feels like magic. And for our Mac users, VoiceOver has the exact same concept, called the Rotor. You open it by pressing VoiceOver keys plus the letter U. Then you use your left and right arrows to switch between lists of headings, links, form controls, and landmarks. You can type to filter the Rotor exactly the same way.


**Alex:** Let us transition to something unique to GitHub. Everything we just discussed relies on your screen reader doing the heavy lifting. But GitHub actually has its own internal system of keyboard shortcuts built directly into the website. These are JavaScript shortcuts that trigger actions without you needing to navigate to a button at all.

**Jamie:** And this is where the clash happens, right? Because if I press the letter G on GitHub, GitHub wants to use that as a shortcut. But my screen reader intercepts it and says, no, there are no graphics on this page, because G is the screen reader shortcut for graphics.

**Alex:** Precisely. This is why we spent so much time talking about Browse Mode and Focus Mode earlier. To use GitHub's built-in shortcuts, you must force your screen reader into Focus Mode. You press NVDA plus Space, or Insert plus Z for JAWS. Now, your screen reader goes to sleep, and your keystrokes go straight to GitHub.

**Jamie:** So what are these GitHub shortcuts? How do I even know what they are?

**Alex:** The most important shortcut to learn is the Question Mark key, which is Shift plus Forward Slash. If you are not inside a text box, pressing the Question Mark key opens a dialog on the screen that lists every single GitHub shortcut available for the exact page you are currently on.

**Jamie:** And it is context aware! If you press the Question Mark on a repository page, it shows you repository shortcuts. If you press it while looking at a Pull Request, it shows you Pull Request shortcuts. It is essentially a built-in cheat sheet that updates dynamically.

**Alex:** Let us talk about some of the most powerful ones. GitHub uses a lot of sequence shortcuts, where you press one key, let go, and then press a second key. The letter G is used for going places. If you enter Focus Mode and press G, pause for half a second, and then press I, GitHub will instantly teleport you to the Issues tab of the repository.

**Jamie:** I love the teleportation analogy. You do not have to find the navigation landmark, you do not have to tab through menus. You just type G then I, and boom, you are on the Issues page. And if you type G then P, you teleport to the Pull Requests page. It is like knowing the secret knock to get into different rooms.

**Alex:** Another essential one is the Forward Slash key. Pressing Forward Slash from anywhere on the page instantly moves your focus into the primary search bar. And what is great about the Forward Slash is that it often works even if you are still in Browse Mode, because it immediately moves browser focus to an interactive form field, which usually wakes your screen reader up automatically.

**Jamie:** Okay, what about finding a specific file? Because navigating the table with Control plus Alt plus arrows is great, but what if a repository has hundreds of files nested in dozens of folders?

**Alex:** Great question. GitHub has a file finder shortcut, which is the letter T. But we have a major conflict here. In NVDA, the letter T jumps to the next table. So if you are in Browse Mode and press T, you just jump to the file list. You must enter Focus Mode first by pressing NVDA plus Space. Then, when you press T, GitHub opens a search box that lets you type the name of any file in the entire repository and jump straight to it.

**Jamie:** That is a perfect example of why understanding the difference between your screen reader shortcuts and GitHub shortcuts is so critical. If you do not know about Focus Mode, you will press T and wonder why the file finder never opens.

**Alex:** Let us cover two more advanced GitHub shortcuts that are incredibly useful for collaboration. The first is the letter Y. Jamie, do you want to explain what the Y key does?

**Jamie:** Yes! The Y key expands the current web address into its canonical URL. Let me explain what that means. Let us say you are looking at a piece of code, and you want to send a link to your coworker pointing to line forty-two. You copy the link and send it. But tomorrow, someone else adds ten lines of code at the top of that file. Now, your coworker clicks your link, and line forty-two is completely different code. The link broke because the file changed.

**Alex:** Exactly. It is like giving someone directions to a house based on the color of the paint. If the house gets repainted, they are lost.

**Jamie:** Right! So when you are looking at a file, if you press the letter Y, GitHub changes the URL in your browser to a permanent, canonical link tied to the exact commit hash of that exact moment in time. It creates a GPS coordinate that never moves. Even if the file is updated a hundred times, that link will always show the exact version you were looking at.

**Alex:** That is a brilliant explanation. The last GitHub shortcut we will mention here is the letter L. When you are viewing an issue or a Pull Request, pressing L will open the Labels menu. From there, you can easily use your arrow keys to check or uncheck labels to organize the work. Just remember, L is another conflict key. In NVDA, L means next list. So you must be in Focus Mode to use the GitHub shortcut.


**Alex:** Now, the prompt for this episode specifically mentions our Concept Coverage Checklist, and one of the items we absolutely must cover is Visual Studio Code screen reader shortcuts. Even though this cheat sheet focuses primarily on the GitHub website, your workflow heavily involves taking code from GitHub and opening it in VS Code, or opening it directly in the browser using GitHub dot dev.

**Jamie:** And honestly, VS Code can feel even more intimidating than GitHub because it is a full Integrated Development Environment. It has sidebars, panels, terminals, and editor groups. Where do we even start?

**Alex:** The best place to start is with the Accessible Help Menu. VS Code has a dedicated help system designed specifically for screen reader users. You can access it by pressing Alt plus F2. This menu will dynamically explain the accessibility features of whatever part of VS Code you are currently focused on.

**Jamie:** Oh, that is clever! So if I am in the terminal and I press Alt plus F2, it tells me how to navigate the terminal. But if I am in the editor, it gives me editor tips. It is like having a specialized tour guide who taps you on the shoulder and whispers exactly what you need to know in that moment.

**Alex:** Exactly. And the second VS Code feature we must discuss is the Accessible Diff Viewer. A diff, short for difference, is how GitHub and VS Code show you what has changed between two versions of a file. Visually, this is usually shown with red and green highlighting. For screen reader users, reading a standard diff table line by line, trying to figure out what was added and what was removed, is agonizingly slow.

**Jamie:** It really is. You end up listening to the screen reader read twenty lines of code that did not even change, just to find the one word that was deleted.

**Alex:** This is why the Accessible Diff Viewer is a game changer. When you are looking at a file with changes in VS Code, you press F7 to jump to the next change, or Shift plus F7 to jump to the previous change. This opens a special accessible view that presents the changes as a clean, simple list. It will explicitly announce, for example, line thirty-two removed, followed by the old code, and then line thirty-two added, followed by the new code.

**Jamie:** It isolates the signal from the noise. It is like having a highly trained assistant who reads a hundred-page contract, but only reads you the three sentences that were actually modified. You do not have to sift through the entire document yourself.

**Alex:** That is exactly what it does. And you can use this same F7 navigation whether you are in your local desktop VS Code, or if you press the Period key on a GitHub repository to open the web-based VS Code editor in your browser.


**Alex:** Before we wrap up, let us run through a few quick navigation patterns for everyday tasks. We already talked about using H to jump to headings, and D or R to jump to landmarks. But what about when you want to actually leave a comment?

**Jamie:** This is a pattern you will use a dozen times a day. You open an issue. You press the letter D until you hear the Add a Comment landmark. Then you press the letter E to jump into the edit field. You switch to Focus Mode with NVDA plus Space, and you type your message.

**Alex:** And here is the pro-tip. When you are finished typing, you do not need to switch back to Browse Mode, press Tab to find the Submit button, and press Enter. That takes too long. While you are still in Focus Mode inside the text box, just press Control plus Enter. On a Mac, that is Command plus Enter. This is the universal submit shortcut across all of GitHub. It submits your comment instantly and saves you a ton of keystrokes.

**Jamie:** I wish I had known that when I started. Control plus Enter is burned into my muscle memory now. Another quick pattern is dealing with dropdown menus. When you press Enter on a button like Assignees or Reviewers, a popup menu appears. Do not try to use your screen reader's Browse Mode to read it. Just start typing to filter the list, use your up and down arrows to hear the filtered options, press Enter to select one, and then press the Escape key to close the menu.

**Alex:** That Escape key step is vital. GitHub applies your selections as soon as you press Escape to close the menu. If you try to navigate away without pressing Escape, the menu might stay floating open and trap your screen reader focus.

**Jamie:** So, if things ever feel stuck, or if your screen reader starts reading things that do not make sense, what is the best troubleshooting step?

**Alex:** The number one rule of troubleshooting on GitHub is to check your mode. Nine times out of ten, if something is not working, it is because you are in Browse Mode when you need to be in Focus Mode, or vice versa. Press NVDA plus Space or Insert plus Z to toggle your mode and try the action again.

**Jamie:** And if the page layout seems completely different than what we described, make sure your browser window is maximized. GitHub's interface is responsive, meaning it collapses sidebars and moves landmarks around if your window is too small. Maximizing the window ensures you get the consistent desktop layout.

**Alex:** Excellent point. Let us summarize our key takeaways for this episode. First, master the difference between Browse Mode for navigating, and Focus Mode for typing and using GitHub's built-in shortcuts. Second, rely on headings, landmarks, and the Elements List to jump through complex pages quickly.

**Jamie:** Third, remember the Question Mark key to open the context-aware shortcut cheat sheet on any GitHub page. And fourth, when you are in VS Code, use Alt plus F2 for accessibility help, and F7 to navigate diffs clearly.

**Alex:** Perfectly summarized. I highly recommend keeping Appendix B open in a separate window or printing it out to keep near your keyboard as you work through the workshop exercises. It will become your best friend.

**Jamie:** It really will. Muscle memory takes time, so be patient with yourself. You are learning a new language, and soon you will be speaking it fluently.

**Alex:** Thank you all for listening. In our next episode, episode twenty, we are going to dive deep into managing notifications. We will learn how to tame the GitHub inbox so you only see the alerts that actually matter to your work. Until then, keep practicing those shortcuts, and happy collaborating.

</details>


### Episode 20: Accessibility Standards Reference

WCAG 2.2, ARIA roles, and the PR accessibility checklist.

Based on: [Appendix C: Accessibility Standards Reference](docs/appendix-m-accessibility-standards.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep20-accessibility-standards.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep20-accessibility-standards.mp3">Download Episode 20 (MP3)</a>
</audio>

[Download Episode 20 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep20-accessibility-standards.mp3)

<details>
<summary>Read Transcript - Episode 20: Accessibility Standards Reference</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is Episode 20, Accessibility Standards Reference. I am Alex, and today we are going to talk about the rules of the road for making web applications and open source projects usable by everyone.

**Jamie:** And I am Jamie. If you are joining us at the workshop, you have probably heard these acronyms tossed around all week. Things like W C A G, or ARIA, or Level double A. To be honest, when I started learning GitHub two years ago, this alphabet soup was one of the most intimidating parts. I felt like I needed a law degree just to write a simple button.

**Alex:** That is such a common feeling, Jamie. It does sound like a lot of legal jargon. But here is the thing. You do not need to memorize these standards like a textbook. Today, we are going to give you a working understanding of the accessibility standards that govern the web, how they shape GitHub's interface, and most importantly, how they apply to the code you write and review.

**Jamie:** Okay, that sounds much more manageable. Just a reference guide, not a final exam. Where do we start?

**Alex:** We start with the big one. W C A G. You will often hear people pronounce this as wuh-cag. It stands for the Web Content Accessibility Guidelines. Right now, the standard most modern projects use is W C A G 2 point 2.

**Jamie:** Web Content Accessibility Guidelines. Okay. Who actually writes these guidelines? Is it a government?

**Alex:** Good question. No, it is not a government. It is maintained by the World Wide Web Consortium, or the W 3 C. They are the same international community that develops the standards for HTML and CSS. W C A G is essentially the global gold standard for what makes digital content accessible to people with disabilities, including screen reader users like many of our listeners.

**Jamie:** Got it. So if I want to make sure the pull request I am submitting to an open source project is accessible, W C A G is the measuring stick. But W C A G is massive. I have tried reading the official specification and it is incredibly dense. How do we break it down?

**Alex:** We break it down using an acronym. The four principles of W C A G are often abbreviated as POUR. P O U R. Perceivable, Operable, Understandable, and Robust. Every single rule in W C A G belongs to one of these four buckets.

**Jamie:** POUR. Okay, let us go through them. What does Perceivable mean in a coding context?

**Alex:** Perceivable means information and user interface components must be presentable to users in ways they can perceive. An analogy I like to use is going to a restaurant. If the menu is printed on paper, a sighted person can perceive it by reading it. But if you are totally blind, that paper menu is not perceivable to you. The information is there, but it is locked in a format you cannot access.

**Jamie:** Right. So in code, a classic failure of Perceivable would be an image that has no alternative text. If I am navigating a web page and my screen reader just says "image dot J P G", I get absolutely nothing out of it.

**Alex:** Exactly. To fix it, you add an alt attribute with descriptive text. Now the information is perceivable through an audio interface or a braille display. Another big part of Perceivable is contrast. W C A G has strict rules about text contrast against its background, which is crucial for low-vision developers. It also dictates that information cannot be conveyed by color alone.

**Jamie:** Oh, I have run into that one! A form where the instructions just say, "required fields are marked in red." My screen reader does not announce the color of the text by default, so I had no idea which fields were required. It was incredibly frustrating.

**Alex:** That is exactly why the Perceivable principle exists. Okay, let us move to the O in POUR. Operable. This means the user interface components and navigation must be operable by the user. Think of that same restaurant. Even if you can read the menu, can you physically open the door to get inside?

**Jamie:** So in web development, Operable is all about how we interact with the page. Keyboard accessibility has to be the biggest part of this, right?

**Alex:** It is the cornerstone. W C A G requires that all functionality must be available using only a keyboard. No mouse required. That means you should be able to navigate to every button, every link, and every form field using the Tab key, and activate them using the Enter key or the Spacebar.

**Jamie:** And avoid keyboard traps! I have to mention keyboard traps. A few months ago, I was reviewing a pull request for a custom modal dialog. I pressed the Tab key to move inside the modal, but then I could not Tab out of it, and pressing the Escape key did nothing. I was locked inside this pop-up window. I literally had to refresh the whole page to escape.

**Alex:** That is a perfect, and painful, example of a W C A G failure under the Operable principle. A user must always be able to move keyboard focus away from a component. Other Operable criteria include giving users enough time to read content before it times out, and providing ways to skip repeated blocks of content, like those "Skip to main content" links you hear at the top of accessible websites.

**Jamie:** Alright, we have P for Perceivable, O for Operable. Next is U for Understandable.

**Alex:** Understandable means information and the operation of the user interface must be, well, understandable. Going back to the restaurant, you got inside, you can read the menu, but what if the menu is in a language you do not speak, and there are no descriptions of the dishes? You cannot make an informed choice.

**Jamie:** How does that translate to code? Are we talking about plain language guidelines?

**Alex:** Partly, yes. But programmatically, it means things like identifying the default language of the HTML document using the lang attribute, so the screen reader knows which pronunciation engine to load. If the page is in French, but you do not tell the screen reader it is in French, it will try to read French words using English phonetics, which is entirely incomprehensible.

**Jamie:** Oh, I have heard that happen. It sounds like absolute nonsense. What else falls under Understandable?

**Alex:** Predictability. When a user navigates to a component, it should not trigger a massive, unexpected change in context. And error handling is huge here. If a user makes a mistake submitting a form, W C A G requires that the error is identified clearly in text, and suggestions for correction are provided. Just putting a red border around an invalid text input is not enough. You need a text message that says "Password must be at least eight characters."

**Jamie:** That makes sense. It is about not leaving the user guessing. So the last letter in POUR is R. Robust. What does Robust mean in this context?

**Alex:** Robust means content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies. Think of it like building a sturdy foundation for a house. If you use standard, well-supported materials, the house will stand up to bad weather. If you use experimental or broken materials, it might collapse.

**Jamie:** So this is about writing clean, valid HTML.

**Alex:** Exactly. It means your HTML markup does not have major parsing errors, like elements missing their closing tags, or duplicate ID attributes. But the most critical success criterion under Robust is called Name, Role, Value. It states that for every single user interface component, its name, its role, and its current value must be programmatically determinable by assistive technologies.

**Jamie:** Name, Role, Value. We are definitely going to dig into that when we talk about ARIA later, because I know that is where ARIA does a lot of the heavy lifting. But before we move on from W C A G, I want to ask about the grading system. I always hear people say things like, "We are targeting W C A G double A compliance." What are the levels?

**Alex:** W C A G has three conformance levels. Single A, Double A, and Triple A. Think of them like building codes for accessibility.

**Jamie:** Okay, so what is Single A?

**Alex:** Level A is the absolute minimum baseline. It removes the most severe barriers that would make the site completely unusable for people with disabilities. Having some form of alt text, and being able to use a keyboard, are Level A. If you do not meet Level A, your site is broken for a lot of people.

**Jamie:** So Double A is the next step up.

**Alex:** Yes. Level AA includes all the requirements of Level A, plus additional criteria that remove significant barriers. This is the sweet spot. It is the target required by most accessibility laws, government standards, and enterprise policies. GitHub itself is officially committed to W C A G 2 point 2 Level AA compliance. When you are contributing to an open source project and they ask for accessibility, they almost always mean Level AA.

**Jamie:** Got it. So what is Level Triple A? Is that like achieving accessibility enlightenment?

**Alex:** Sort of. Level AAA includes all A and AA criteria, plus the strictest, most comprehensive rules. It removes remaining barriers for very niche cases. But the W 3 C actually states that it is not recommended to require Level AAA across entire sites, because for some complex content, it is practically impossible to achieve. You apply Triple A where it is feasible, but Double A is your mandatory target.

**Jamie:** Okay, so if I am writing code, I am aiming for W C A G 2 point 2 Level AA. And I am keeping POUR in mind. Perceivable, Operable, Understandable, Robust.

**Alex:** Exactly. And there are a few specific success criteria you will run into constantly as a developer. We already mentioned 1 point 1 point 1, which requires alt text for non-text content. And 2 point 1 point 1, which requires keyboard accessibility.

**Jamie:** What about focus indicators? I know that is a big one for sighted keyboard users and low-vision users.

**Alex:** Yes. That is criterion 2 point 4 point 7, Focus Visible. It is a Level AA requirement. It means that when you are navigating with a keyboard, there must be a visible outline or highlight showing you exactly which element currently has focus. And in W C A G 2 point 2, they added a new rule called Focus Appearance, which dictates the minimum size and color contrast of that focus indicator, so it is actually easy to spot.

**Jamie:** That is a great addition. I use screen magnification sometimes, and trying to find a tiny, faint gray dotted line around a button is nearly impossible.


**Alex:** So, we have covered the W C A G guidelines. Now we need to talk about the tools we use to meet those guidelines when standard HTML is not enough. This brings us to ARIA. A R I A.

**Jamie:** Yes, ARIA. I know it stands for Accessible Rich Internet Applications. But for the longest time, I thought ARIA was a totally separate programming language.

**Alex:** That is a very common misconception. ARIA is not a separate language. It is a set of specialized attributes you can add to your existing HTML elements.

**Jamie:** So why do we need it? If I write good HTML, is that not enough?

**Alex:** If you are writing a simple document with headings, paragraphs, standard links, and standard form fields, then yes, native HTML is absolutely enough. In fact, standard HTML is incredibly accessible right out of the box. But the modern web is not just documents anymore. It is full of complex, interactive widgets. Think about a drag-and-drop kanban board, or a multi-select combobox, or an expandable accordion menu.

**Jamie:** Right. HTML does not have a native tag for a kanban board.

**Alex:** Exactly. HTML has gaps. ARIA fills the gap between what native HTML can express and what complex interactive widgets require. Let me give you an analogy. Imagine a play at a theater. HTML is the script. It tells the actors what to say. But sometimes, a lot is happening on stage without any dialogue. Someone enters the room, someone looks angry, the lights go down.

**Jamie:** A sighted audience member can just watch that happen. But a blind audience member needs audio description to know what is going on.

**Alex:** Spot on. ARIA is the audio describer for your web application. It does not change how the application looks visually, and it does not change how the application behaves when you click on things. It only changes what is announced to the accessibility tree, which is what screen readers read from. ARIA whispers in the screen reader's ear, telling it the hidden context.

**Jamie:** That is a great way to think about it. It only affects the accessibility tree. So, if I add ARIA to a completely broken, unclickable div, it does not magically make it a working button.

**Alex:** Correct. Which brings us to the first rule of ARIA. This is so important I want you to remember it above everything else today. The first rule of ARIA is: Do not use ARIA if native HTML suffices.

**Jamie:** Do not use ARIA if native HTML works. Why is that?

**Alex:** Because native HTML elements come with built-in keyboard support and built-in screen reader support. If you use a native button element, the browser automatically knows it is a button, it automatically makes it focusable with the Tab key, and it automatically lets you activate it with the Enter key or the Spacebar.

**Jamie:** But if I use a generic div element, and I just add role equals button to it, what happens?

**Alex:** If you add role equals button to a div, your screen reader will announce it as a button. But that is all it does. It does not make it focusable. You would have to manually add a tabindex equals zero attribute. And it does not add keyboard support. You would have to write custom JavaScript to listen for the Enter key and the Spacebar.

**Jamie:** Okay, that sounds like a massive amount of extra work just to reinvent a button. I see why the first rule is to just use the native HTML tag.

**Alex:** Exactly. You only use ARIA when you are building something custom that HTML cannot handle. Now, ARIA is broken down into three categories. Roles, States, and Properties.

**Jamie:** Let us break those down. What is a Role?

**Alex:** A Role defines what an element actually is. It is the core identity of the component. We mentioned role equals button. There is also role equals dialog, for pop-up modal windows. Role equals navigation, for a block of navigation links. Once you set a role on an element, it does not change.

**Jamie:** Okay, so Role is the identity. What about States?

**Alex:** States describe the current condition of the element, and unlike Roles, States are meant to change as the user interacts with the app. For example, if you have a custom accordion menu, it might have aria dash expanded equals false when it is closed. When the user activates it, your JavaScript needs to update that state to aria dash expanded equals true.

**Jamie:** Ah, got it. Other states would be things like aria dash checked for a custom checkbox, or aria dash disabled if a button cannot be pressed right now. My screen reader reads those out automatically. It will say, "Submit, button, dimmed" or "button, disabled".

**Alex:** Exactly. And the third category is Properties. Properties are stable characteristics that provide extra context, but they do not change like States do. The most common property you will use is aria dash label. You use this to give an accessible name to an element when there is no visible text on the screen.

**Jamie:** Like an icon button! On GitHub, there is a button that just looks like a little gear icon to open the repository settings. There is no text that says "Settings". So they use aria dash label equals "Settings", and my screen reader reads that instead of just saying "unlabeled button".

**Alex:** Perfect example. Another extremely important set of ARIA roles are the Landmark roles. Landmarks let screen reader users jump directly to major sections of a page, bypassing all the clutter.

**Jamie:** Yes! I use landmarks constantly. In NVDA or JAWS, I just press the D key to jump from landmark to landmark. Or if I am on my Mac using VoiceOver, I open the Rotor and navigate by landmarks. It is how I get around complex pages like a GitHub repository.

**Alex:** GitHub uses landmarks beautifully. The main ones you will encounter are the banner role, which is the site-wide header at the top. The navigation role, for menus. The main role, for the primary content of the page. And the contentinfo role, which is usually the footer.

**Jamie:** I have noticed that on GitHub, there are often multiple navigation landmarks on the same page. There is the main site navigation, the repository navigation, the sidebar. How do I know which is which?

**Alex:** That is a great point, and it is a W C A G requirement. When you have multiple landmarks of the same type on a single page, each one must have a unique aria dash label to distinguish them. So GitHub will label one as "Site navigation" and another as "Repository navigation". When you press the D key, your screen reader announces the label along with the landmark role.

**Jamie:** That is incredibly helpful. Before we move on to code reviews, I want to ask about one more ARIA feature. Live regions. I have heard developers talk about aria dash live. What does that do?

**Alex:** Live regions are magic for single-page applications. Imagine you are filling out a form, and you type in a username. A little message pops up on the screen dynamically that says "Username is available." If you are sighted, you see it appear. But if you are using a screen reader, your focus is still inside the text box. You do not know that new text appeared somewhere else on the page.

**Jamie:** Right. Unless I manually navigate around the whole page looking for changes, which is tedious.

**Alex:** So, you wrap that message container in an attribute called aria dash live. When you inject new text into an aria-live region, the browser automatically sends that new text straight to the screen reader to be announced aloud, without moving the user's focus.

**Jamie:** Oh, that is how that works! I love when applications do that. It makes it feel so snappy. I type my name, and I just hear "Username is available" in the background. Are there different types of live regions?

**Alex:** Yes, there are two main settings. Aria dash live equals polite, and aria dash live equals assertive. Polite means the screen reader will wait until it finishes its current sentence before announcing the update. This is what you should use 95 percent of the time. Assertive means the screen reader will immediately interrupt whatever it is currently saying to announce the update. You should only use assertive for critical, urgent errors.


**Jamie:** Okay, so we have covered W C A G and the POUR principles. We have covered ARIA, including Roles, States, Properties, Landmarks, and Live Regions. Now, let us make this practical. I am working on an open source project on GitHub. I get assigned to review a pull request, or PR, from another contributor. How do I review their code for accessibility?

**Alex:** Reviewing a PR for accessibility is just like reviewing it for security or performance. It is a checklist. And it is completely normal to feel a little intimidated when you are checking someone else's code. But you already know the fundamentals.

**Jamie:** So what is on the PR Accessibility Checklist? What are the red flags I should be looking for before I approve and merge someone's code?

**Alex:** First, check the HTML structure. Did they add any new images? If yes, verify that every single image tag has an alt attribute. Even if it is a purely decorative image, it needs an empty alt attribute, literally just alt equals quote quote. That tells the screen reader to safely ignore it.

**Jamie:** Got it. Check for alt text. What next?

**Alex:** Next, look at any new interactive elements. Did they add a new button, a dropdown, or a custom widget? If so, you must verify that it is fully keyboard accessible. Can you reach it with the Tab key? Can you activate it with the Enter key or the Spacebar? And does it have a visible focus indicator when you tab to it?

**Jamie:** Okay, so I am checking for the Operable principle. What about forms?

**Alex:** If the PR adds any new form fields, check that every input has an associated label element. The HTML label tag needs a "for" attribute that exactly matches the "id" attribute of the input field. This is what guarantees that when a screen reader lands on the text box, it reads the correct label aloud.

**Jamie:** I will also check for color reliance. If the PR notes say "Error states are now highlighted in red," I am immediately going to flag that and ask, "Is there also a text explanation or an icon for the error?" Because color cannot be the only indicator.

**Alex:** That is fantastic, Jamie. That is exactly the right mindset. And finally, check for dynamic content. If the PR introduces a feature that updates the page without a full reload, like a search filter or a shopping cart counter, check if they used an aria-live region to announce those updates to screen reader users.

**Jamie:** Okay, let us say I find an issue. The contributor created a custom toggle switch using a div, and there is no keyboard support and no ARIA role. How do I write that feedback in the PR review without sounding like the accessibility police?

**Alex:** The best way to leave feedback is to be specific, objective, and reference the standard. Do not just say, "This toggle is not accessible." Instead, say something like, "This custom toggle switch cannot be operated with a keyboard, which is a barrier for screen reader and keyboard-only users. This fails W C A G 2 point 1 point 1 Keyboard. Could we update this to use a native HTML checkbox, or add role equals switch and keyboard event listeners?"

**Jamie:** I like that. It removes the emotion from it. You are not saying they wrote bad code, you are just pointing out that it misses a specific, documented requirement, and you are offering a path to fix it.

**Alex:** Exactly. And while you can catch a lot of things by reading the code, you should also test it. There are automated tools you can use, like the axe DevTools browser extension, which will scan the rendered page and catch about 30 to 40 percent of W C A G violations automatically.

**Jamie:** Only 30 to 40 percent? That is lower than I expected.

**Alex:** It is. Automated tools are great for catching missing alt text or missing labels, but they cannot tell if the alt text actually makes sense, and they cannot test keyboard flow. That is why manual testing is required. The best way to test a PR is to pull the branch to your local machine, unplug your mouse, turn on your screen reader, and try to use the new feature. If you can complete the task smoothly, it is likely in good shape.


**Jamie:** Wow, we covered a massive amount of ground today. I actually feel like I have a solid grasp on W C A G and ARIA now. It is not just alphabet soup anymore.

**Alex:** You absolutely do. Let us recap the concrete takeaways from today's episode. First, W C A G is the global standard for web accessibility, built on four principles: Perceivable, Operable, Understandable, and Robust. Or POUR.

**Jamie:** Second takeaway: The standard target for GitHub and most open source projects is W C A G 2 point 2 Level AA compliance.

**Alex:** Third, ARIA is a set of attributes that fills the gaps in native HTML by providing Roles, States, and Properties to the accessibility tree. But remember the first rule of ARIA: Do not use ARIA if native HTML suffices.

**Jamie:** And finally, when reviewing a pull request, use your accessibility checklist. Look for alt text, verify keyboard accessibility, ensure forms have labels, and check that dynamic updates use aria-live regions. Unplug your mouse and test it yourself.

**Alex:** Perfect summary. You do not need to be an accessibility expert to make a huge impact on an open source project. Just keeping these fundamentals in mind during your code reviews will make the web better for everyone.

**Jamie:** So what is up next?

**Alex:** In Episode 21, we are moving from theory to practice. We will be diving into the GitHub Interface Deep Dive. We will explore exactly how GitHub's web interface is structured, how to navigate its complex landmark architecture, and the specific keyboard shortcuts that will make you incredibly fast at triaging issues and reviewing code.

**Jamie:** I cannot wait for that one. Thanks for listening to Gitt Going with GitHub. We will see you in the next episode!

</details>


### Episode 21: Git Authentication

Personal access tokens, SSH keys, credential storage, and commit signing.

Based on: [Appendix D: Git Authentication](docs/appendix-d-git-authentication.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep21-git-authentication.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep21-git-authentication.mp3">Download Episode 21 (MP3)</a>
</audio>

[Download Episode 21 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep21-git-authentication.mp3)

<details>
<summary>Read Transcript - Episode 21: Git Authentication</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode twenty-one, Git Authentication. I am Alex, and as always, I am here to help you navigate the world of Git, GitHub, and open source collaboration.

**Jamie:** And I am Jamie! I am here to ask the questions, share my own learning bumps, and hopefully make this journey a little smoother for you. And Alex, today we are talking about a topic that caused me more stress than learning Git itself when I started two years ago. Authentication. Proving to GitHub that I am who I say I am.

**Alex:** You are definitely not alone in that, Jamie. Authentication is a major hurdle for a lot of developers. You spend all this time writing code, you make your commit, you type your push command, and then the terminal just throws up an error and refuses to let your code through. It feels like getting stopped at the door of a party you were invited to.

**Jamie:** Exactly! The bouncer is just standing there shaking their head. So, to set the stage for everyone, why is authentication needed in the first place? We can read repositories and clone open source projects without ever logging in, right?

**Alex:** That is exactly right. If a repository on GitHub is public, you do not need to authenticate to clone it to your machine, or to read the issues and pull requests. Think of a public repository like a public library. Anyone can walk in off the street, pull a book off the shelf, and read it. You do not need a library card just to browse.

**Jamie:** But if I want to write a chapter in that book, or bring a new book to the library, that changes things.

**Alex:** Precisely. When you want to push commits to a repository, clone a private repository, or access an organization's internal code, GitHub needs to know who you are. You need to prove your identity. You need to show your ID badge to get behind the front desk. That is what authentication is: proving you are who you say you are.

**Jamie:** Okay, so I need an ID badge. When I first started, I thought I could just type in my GitHub username and my GitHub account password in the terminal. But that does not work anymore, does it?

**Alex:** No, it does not. A few years ago, GitHub removed the ability to use your account password for command line operations. It was a security risk. If someone stole your password, they had the master key to your entire account. So today, we have two primary ways to authenticate with GitHub from the command line: HTTPS and SSH.

**Jamie:** HTTPS versus SSH. Let us break those down. Which one should we start with?

**Alex:** Let us start with HTTPS, because it is the method we recommend for our two-day workshop. It is generally easier to set up using a screen reader because you do it entirely through the GitHub web interface, without needing to configure complex terminal files. When you use HTTPS, you authenticate using something called a Personal Access Token, or a PAT.

**Jamie:** A Personal Access Token. I love analogies, so tell me if this works. If my GitHub password is the master key to my entire house, a Personal Access Token is like a valet key for my car. I can give it to the valet, and it lets them drive the car to park it, but it will not unlock the glovebox or the trunk. And if the valet loses it, I can just deactivate that specific key without changing the locks on my whole house.

**Alex:** That is a brilliant analogy, Jamie. That is exactly what a Personal Access Token is. It is a password-like string of characters that you generate on GitHub. When Git asks for your password in the terminal, you paste this token instead. And just like the valet key, you can give it specific permissions, which we call scopes, and you can set it to expire automatically.

**Jamie:** So how do we create one of these tokens? What is the workflow like for a screen reader user?

**Alex:** First, you will log into GitHub, open your account menu, and navigate to the Settings page. From there, you move to the section called Developer Settings, and you will find Personal Access Tokens. Now, when you get there, you are going to see two options: Fine-grained tokens, and Tokens classic.

**Jamie:** Oh right, the classic versus fine-grained dilemma. What is the difference?

**Alex:** A classic token is like a hotel keycard that opens your room, the gym, and the pool, regardless of what time it is. It applies to all the repositories you have access to. A fine-grained token is much stricter. It is a keycard that only opens your specific room, and maybe only between two and four in the afternoon. You can restrict fine-grained tokens to single repositories.

**Jamie:** Fine-grained sounds more secure, but classic sounds easier to deal with when you are just starting out.

**Alex:** Exactly. For the workshop, we recommend generating a classic token. It is much faster to set up. So, you select Generate new token classic. First, it asks for a note. Give it a descriptive name, like Workshop Laptop Token. Then, you set an expiration. I highly recommend setting it to thirty or sixty days. Never set a token to no expiration.

**Jamie:** Because if you forget about it and it gets leaked months from now, someone has access to your account. Thirty days is perfect for a workshop. And then we set the scopes, right? The permissions.

**Alex:** Yes. The scopes are presented as a list of checkboxes. For our workshop, you only need to check two boxes. First, check the box labeled repo. This gives the token full control of private and public repositories, which means you can push your code. Second, check the box labeled workflow. You only need this if you are going to be updating GitHub Actions workflows, but we do touch on that, so it is good to have.

**Jamie:** Okay, so I check repo, I check workflow, and I activate the Generate token button. What happens next? This is the part that always catches people off guard.

**Alex:** This is critical. When the page reloads, GitHub displays your new token. It is a long string of random letters and numbers. This is the one and only time GitHub will ever show you this token. If you navigate away from this page, you cannot get it back.

**Jamie:** You have to copy it right then and there. For our screen reader users, how is this token presented on the page?

**Alex:** It appears in a standard read-only text field. You can navigate to it, press Control plus A to select all the text in the field, and press Control plus C to copy it.

**Jamie:** And then where do I put it? I know I should not just leave it on my clipboard.

**Alex:** You need to store it securely. The absolute best option is a password manager, like 1Password, Bitwarden, or your operating system's built-in keychain. Create a new secure note or password entry and paste the token there.

**Jamie:** What should we absolutely avoid doing with this token?

**Alex:** Do not paste it into a plain text document that syncs to your cloud storage. Do not email it to yourself. And please, do not save it in a file inside your Git repository, because you might accidentally commit it and push it to GitHub for the world to see. Treat it exactly like your bank password.

**Jamie:** Okay, token is generated and safely stored in my password manager. Now, how do I actually use it?

**Alex:** The next time you try to push a commit to GitHub, the terminal will pause and prompt you. It will ask for your Username. You type your GitHub username and press Enter. Then it asks for your Password. This is where you paste your Personal Access Token.

**Jamie:** And when you paste it in the terminal, it might not read the characters out loud, or even show asterisks on the screen, right? That is a standard terminal security feature.

**Alex:** Correct. The terminal hides your input so someone looking over your shoulder cannot see the length of your token. Just paste it, press Enter, and if everything is correct, your push will succeed.

**Jamie:** But wait. Do I have to go into my password manager, copy that huge string of text, and paste it into the terminal every single time I want to push a commit? That sounds exhausting.

**Alex:** It would be! But thankfully, you do not have to. This is where credential helpers come in. A credential helper is a piece of software that securely remembers your token for you. Think of it like the bouncer at the club remembering your face. You showed your ID once, and now they just wave you through when you come back.

**Jamie:** Oh, thank goodness. How do we get one of those bouncers?

**Alex:** If you are on Windows and you installed Git for Windows, it comes with something called Git Credential Manager. It is a fantastic, cross-platform credential helper. The first time you push, it will actually pop up a secure window asking you to authenticate, and once you provide your token, it saves it securely in the Windows Credential Manager. You never have to type it again until the token expires. On macOS, it integrates similarly with the macOS Keychain.


**Jamie:** Alright, so that is HTTPS and Personal Access Tokens. Generate the token, save it in a password manager, paste it once, and let Git Credential Manager handle the rest. But you mentioned there is a second method. SSH keys. What are those, and why would someone choose SSH over a Personal Access Token?

**Alex:** SSH stands for Secure Shell. It is a protocol for securely communicating between two computers. While a Personal Access Token is like a password you type in, SSH uses something called public-key cryptography. It relies on a pair of keys: a private key and a public key.

**Jamie:** Okay, time for another analogy. How does public-key cryptography work?

**Alex:** Imagine you buy a very special kind of padlock. This padlock comes with a key, but it works in reverse of a normal lock. You keep the physical key on your keychain. That is your private key. You take the padlock itself, make a hundred copies of it, and hand them out to your friends, or in this case, you give one to GitHub. That padlock is your public key.

**Jamie:** So I give GitHub the open padlock, and I keep the key.

**Alex:** Exactly. When you want to talk to GitHub, GitHub snaps your padlock onto a box of data and sends it to you. Because you are the only person in the world who has the physical key that opens that specific padlock, only you can open the box. That is how the authentication happens. It proves you are you, because only you hold the private key.

**Jamie:** That sounds incredibly secure. And the best part is, there is no password to type at all, right? The terminal just uses the key file sitting on my hard drive.

**Alex:** Right. Once it is set up, it is completely invisible. You just push, and it works. SSH keys are considered more secure than tokens, and they do not expire unless you tell them to. However, the initial setup requires running several commands in the terminal, which can be a bit more tedious with a screen reader.

**Jamie:** Let us walk through that terminal setup. How do I actually make this lock and key?

**Alex:** First, you open your terminal and use a command called ssh dash keygen. The full command we recommend is ssh dash keygen space dash t space ed25519 space dash capital C space followed by your email address in quotes.

**Jamie:** Let me break that down. Ssh dash keygen is the program. Dash t tells it what type of key to make, and we are using e d two five five one nine. I remember that used to be r s a, but e d two five five one nine is the newer, more secure standard. And then dash capital C is just adding a comment, like our email, so we know whose key it is.

**Alex:** Perfect breakdown. When you press Enter, the terminal will ask where you want to save the key. Just press Enter again to accept the default location, which is a hidden folder in your user directory called dot ssh. Then, it will ask if you want to enter a passphrase.

**Jamie:** A passphrase? I thought the whole point was to avoid passwords.

**Alex:** A passphrase adds an extra layer of security. If someone steals your laptop and extracts your private key file, they still cannot use it without the passphrase. It is highly recommended, but optional. If you do not want one, you can just press Enter twice to leave it blank.

**Jamie:** Okay, so the command finishes, and it tells me it saved my keys. What exactly did it create?

**Alex:** It created two files in that dot ssh folder. One is called id underscore ed25519. That is your private key. Never share that with anyone. Ever. The other file is called id underscore ed25519 dot pub. Dot pub stands for public. That is the padlock you are going to give to GitHub.

**Jamie:** So how do we give it to GitHub?

**Alex:** You need to copy the contents of that dot pub file. On Windows, if you are using PowerShell, you can type Get dash Content space tilde slash dot ssh slash id underscore ed25519 dot pub space pipe space Set dash Clipboard. That reads the file and copies it directly to your clipboard.

**Jamie:** Oh, that is a fantastic trick. On macOS, you would use pbcopy. So you type p b copy space less than sign space tilde slash dot ssh slash id underscore ed25519 dot pub. It does the exact same thing. The contents of the public key are now on my clipboard.

**Alex:** Once it is on your clipboard, you navigate to GitHub in your browser. Go to Settings, then select SSH and GPG keys from the sidebar. Activate the button that says New SSH key. Give it a title, like Workshop Laptop SSH Key. Make sure the Key type is set to Authentication Key, and then paste your clipboard into the Key field. It will look like a long string of gibberish starting with ssh dash ed25519. Finally, activate Add SSH key.

**Jamie:** Okay, the padlock is officially registered at GitHub. How do I know if it actually worked? How do I test the connection?

**Alex:** You go back to your terminal and type ssh space dash capital T space git at github dot com. This tells your computer to attempt an SSH connection to GitHub. The first time you do this, your computer might say it does not recognize GitHub's fingerprint and ask if you want to continue connecting. You type yes and press Enter.

**Jamie:** And what is the success message we are listening for?

**Alex:** Your screen reader should read out: Hi followed by your username! You have successfully authenticated, but GitHub does not provide shell access. That means the handshake worked perfectly. You are authenticated.

**Jamie:** That is a great feeling when you hear that message. Now, if I originally cloned my repository using HTTPS, but I just set up SSH, do I need to delete the repository and clone it again?

**Alex:** No, you do not need to start over. You just need to change the remote URL. Remember from our earlier episodes, the remote is just the address book entry for GitHub. You can change it by typing git space remote space set dash url space origin space followed by the new SSH URL. The SSH URL always looks like git at github dot com colon your dash username slash the dash repository dot git.


**Jamie:** Okay, so we have covered authenticating to prove who we are so we can push code. But there is another layer to this that is becoming really important in open source. Commit signing. I have noticed on GitHub, when I review pull requests, some commits have a little green badge next to them that says Verified, and others say Unverified. What is that about?

**Alex:** That is a great observation. This is where people often get confused. Authenticating proves you have the right to push code to a repository. Commit signing proves that a specific commit was actually authored by you, and has not been altered by anyone else.

**Jamie:** Why do we need to prove that? If I pushed it, didn't I author it?

**Alex:** Not necessarily. Remember that in Git, you configure your name and email using git config. I could configure my local Git to say my email is jamie at example dot com. I could write a terrible piece of code, commit it, and if I have push access to a repository, I could push it. The history would say Jamie wrote it, even though Alex actually wrote it. Git does not verify email addresses by default.

**Jamie:** Oh, wow. That is a huge loophole. So someone could spoof my identity in the commit history.

**Alex:** Exactly. Commit signing fixes that. When you sign a commit, you are applying a cryptographic signature to it. It is like a notary public stamping a legal document, or putting a wax seal on an envelope. GitHub checks that signature, verifies it against the keys you have uploaded to your account, and if it matches, it slaps that Verified badge on the commit. Many open source projects now require signed commits to prevent identity spoofing.

**Jamie:** So how do I get that Verified badge? How do I sign my commits?

**Alex:** There are two main methods: GPG signing and SSH signing. GPG stands for GNU Privacy Guard. It is the traditional method. You generate a completely separate set of GPG keys, export them, upload them to GitHub, and configure Git to use them. It is highly secure, but it involves a lot of complex terminal commands and key management.

**Jamie:** I remember trying to set up GPG years ago and getting so lost in the terminal output. You said there are two methods. What is the other one?

**Alex:** The newer, much simpler method is SSH signing. If you already set up an SSH key for authentication, like we just discussed, you can reuse that exact same key to sign your commits.

**Jamie:** Wait, really? I can use the same key for both? That is amazing. How do I turn that on?

**Alex:** It takes three simple terminal commands. First, you tell Git to use SSH for signing by typing git space config space dash dash global space gpg dot format space ssh. Second, you tell Git which key to use. You type git space config space dash dash global space user dot signingkey space followed by the path to your public key, like tilde slash dot ssh slash id underscore ed25519 dot pub.

**Jamie:** And the third command?

**Alex:** You tell Git to automatically sign everything. Type git space config space dash dash global space commit dot gpgsign space true.

**Jamie:** That is it on the terminal side? What about on GitHub?

**Alex:** You just need to upload that same public key to GitHub one more time, but this time, when you add the new SSH key in settings, you change the Key type dropdown from Authentication Key to Signing Key. Once you do that, every commit you make will be signed, and GitHub will display the Verified badge.

**Jamie:** For our screen reader users, how do we check if a commit has that Verified badge on GitHub?

**Alex:** When you navigate to a repository's commit history, each commit is presented in a list or table row. If you are using NVDA or JAWS, you can use your down arrow to read through the commit row, and it will read the badge text, Verified or Unverified, inline with the commit details. With VoiceOver, you use VO plus Right Arrow through the row, and the badge is read as a button with the text Verified. You can even activate that button to see the signature details.

**Jamie:** That is incredibly helpful to know. And there is a setting on GitHub called Vigilant Mode, right? What does that do?

**Alex:** Vigilant Mode is an optional setting in your GitHub account. If you enable it, GitHub will actively mark any unsigned commit associated with your account with a yellow Unverified badge. It is a way of telling the world, Hey, I sign all my work. If you see a commit with my name on it that does not have a Verified badge, it is a fake. Do not trust it.


**Jamie:** This has been so enlightening, Alex. Before we wrap up, let us do a quick troubleshooting round. What happens when things go wrong? Let us say I try to push, and the terminal says Authentication failed. What is the most likely culprit?

**Alex:** If you are using HTTPS, an Authentication failed error almost always means your Personal Access Token has expired. Tokens have a shelf life. When they expire, they stop working silently. The solution is to go back to GitHub, generate a new token, clear your credential manager cache, and try pushing again. Git will prompt you for the new token.

**Jamie:** What if I am using SSH, and the terminal says Permission denied publickey?

**Alex:** That means GitHub received an SSH connection, but it did not recognize the key. First, verify that you actually added the public key to your GitHub settings. Second, make sure your local SSH agent is running and has your key loaded. You can check this by typing ssh dash add space dash l.

**Jamie:** And what if it says Host key verification failed? That sounds scary.

**Alex:** It sounds scary, but it usually just means your computer has never connected to GitHub before, and it wants you to explicitly trust GitHub's server. You can fix it by typing ssh dash keyscan space github dot com space two greater than signs space tilde slash dot ssh slash known underscore hosts. That command grabs GitHub's public fingerprint and adds it to your trusted list.

**Jamie:** Okay, that makes it feel much more manageable. Authentication errors look intimidating, but they usually just boil down to an expired token or a missing key.

**Alex:** Exactly. Do not let the terminal errors panic you. Take a breath, read the error, and remember the core concepts.

**Jamie:** Let us summarize our key takeaways for this episode. First, you need authentication to push code to GitHub. Reading public code is free, but writing requires proving who you are. Second, for this workshop, we recommend using HTTPS with a Personal Access Token. It is easier to set up with a screen reader.

**Alex:** Third, treat your Personal Access Token or your SSH private key like your bank password. Never share them, and store them in a secure password manager. And fourth, if you want that coveted Verified badge on your commits, set up SSH commit signing. It takes five minutes and adds a tremendous layer of trust to your open source contributions.

**Jamie:** I love that. We are all about building trust in open source. So, we are authenticated, our commits are verified, and we are ready to actually start moving code around. What is up next?

**Alex:** In Episode twenty-two, we are diving into Forking and Cloning. We will explain how to make your own personal copy of an open source project, bring it down to your local machine, and get it ready for your first real contribution. You will not want to miss it.

**Jamie:** I cannot wait. Thanks for listening, everyone, and we will catch you in the next episode!

</details>


### Episode 22: GitHub Flavored Markdown

Markdown syntax, GitHub extensions, and writing accessible documentation.

Based on: [Appendix E: GitHub Flavored Markdown](docs/appendix-c-markdown-reference.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep22-github-flavored-markdown.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep22-github-flavored-markdown.mp3">Download Episode 22 (MP3)</a>
</audio>

[Download Episode 22 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep22-github-flavored-markdown.mp3)

<details>
<summary>Read Transcript - Episode 22: GitHub Flavored Markdown</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode 22, GitHub Flavored Markdown.

**Jamie:** We are officially halfway through our two-day workshop material! If you have been following along, you already know how to clone repositories, navigate branches, and make commits. But today, we are talking about how we actually write the text that goes into our documentation, our pull requests, and our issues.

**Alex:** Exactly. Before we dive in, the only prerequisite for this episode is being comfortable opening a file in your editor. If you are using VS Code, that means knowing how to use the command palette with Control plus Shift plus P, or Command plus Shift plus P on a Mac, to navigate to your files.

**Jamie:** So Alex, when I first started learning GitHub about two years ago, I kept hearing the word Markdown. People would say, just write it in Markdown, or check the Markdown file. And I realized that almost every project has a file called read me dot M D. The M D stands for Markdown. But what actually is it?

**Alex:** At its core, Markdown is a lightweight markup language. And to define that, think about how you might write a document in Microsoft Word. In a heavy word processor, the formatting is hidden. You press a button to make text bold, and the software handles the underlying code. A lightweight markup language flips that. You write in plain text, using standard punctuation marks to indicate formatting, and then a program translates those symbols into a beautifully formatted document.

**Jamie:** I love the analogy of writing a plain text email, but you are sprinkling in secret codes that a machine later translates. It is just text. You do not need any special software to read or write it. A screen reader reads it perfectly because it is just letters and punctuation.

**Alex:** Exactly. And today we are specifically talking about GitHub Flavored Markdown, often abbreviated as G F M. Standard Markdown has been around for decades, but GitHub added their own special extensions to make it perfect for software development. Things like task lists, alert callouts, and code blocks.

**Jamie:** Let us start with the absolute basics. How do we give our document structure?

**Alex:** Structure comes from headings. In Markdown, you create a heading by typing a number sign, also known as a hash symbol, followed by a space, and then your text. One hash mark creates a heading level one, or H 1. Two hash marks create a heading level two, or H 2. And this goes all the way down to six hash marks for an H 6.

**Jamie:** This is so important for screen reader users. Think of headings like a nested folder structure on your computer, or an outline for a term paper. When I navigate a long read me file, the very first thing I do is press the letter H in my screen reader to jump from heading to heading.

**Alex:** Which brings up a critical rule for writing accessible Markdown. You must respect the heading hierarchy. Never skip heading levels just because you want the text to render at a certain size. Do not jump from a heading level two straight to a heading level four. If you do, a screen reader user navigating by heading will think they missed an entire section of your document.

**Jamie:** I definitely made that mistake when I started. I thought, oh, heading level three is too big, let me use heading level five. But headings are for structure, not style.

**Alex:** Exactly. Now, what about the regular text under those headings? Paragraphs in Markdown are incredibly simple. You just type your text. When you want a new paragraph, you press the Enter key twice to leave a blank line. If you do not leave a blank line, Markdown will just combine the text into the same paragraph.

**Jamie:** And if I want to emphasize a word? Say I am writing instructions and I really want to stress the word "not".

**Alex:** You have two main types of emphasis: italic and bold. Think of these like vocal inflection. Italic is like leaning in to emphasize a point, while bold is like shouting to ensure it is heard. To make a word italic, you wrap it in single asterisks. Asterisk, the word, asterisk. To make it bold, you use double asterisks. Asterisk, asterisk, the word, asterisk, asterisk.

**Jamie:** Screen readers handle this quite well, depending on your verbosity settings. Some will change their pitch slightly when reading emphasized text.


**Alex:** Let us move on to something that connects our documents together: links. Markdown gives us a few ways to create hyperlinks.

**Jamie:** The standard way is called an inline link. The syntax always tripped me up at first because it uses two different types of brackets.

**Alex:** It takes practice! For an inline link, you wrap the clickable text in square brackets, immediately followed by the U R L in parentheses. No spaces between the closing square bracket and the opening parenthesis.

**Jamie:** So left bracket, the words GitHub Home, right bracket, left parenthesis, H T T P S colon slash slash github dot com, right parenthesis.

**Alex:** Perfect. Think of an inline link like a direct flight. The destination is written right there next to the text. But sometimes, if you have a lot of links in a paragraph, reading the raw Markdown gets very noisy. That is where reference links come in.

**Jamie:** Reference links are brilliant. They are exactly like endnotes in a printed book. Instead of putting the U R L right there in the sentence, you put a number or a label in square brackets. So you write, left bracket, GitHub Home, right bracket, left bracket, the number one, right bracket. Then, anywhere else in the document, usually at the very bottom, you define what number one means.

**Alex:** You define it by typing left bracket, the number one, right bracket, a colon, a space, and then the U R L. When GitHub renders the document, it turns the text into a standard link. This makes the raw plain text much cleaner to read with a screen reader.

**Jamie:** And what about autolinks?

**Alex:** Autolinks are the easiest. If you just paste a full U R L that starts with H T T P or H T T P S, GitHub automatically turns it into a clickable link. It is like the internet recognizing a U R L automatically. But be careful here. For accessibility, pasting raw U R Ls is usually a bad idea.

**Jamie:** Right, because a screen reader will read out every single character of a messy U R L. It is always better to use an inline or reference link to provide descriptive link text. Instead of a link that says "click here" or a raw U R L, your link text should say "Review the setup instructions."

**Alex:** Let us talk about images, because the syntax is almost identical to links, but with one crucial addition.

**Jamie:** The exclamation mark! Or as programmers like to call it, the bang.

**Alex:** Yes. To embed an image, you start with an exclamation mark, then square brackets containing the alt text, then parentheses containing the U R L or file path of the image.

**Jamie:** So, exclamation mark, left bracket, Alt Text goes here, right bracket, left parenthesis, image dot P N G, right parenthesis.

**Alex:** This is where we need to talk about writing descriptive alt text. Alt text is alternative text. If an image cannot load, or if a person is using a screen reader, the alt text is what gets read aloud.

**Jamie:** Think of alt text like an audio description track for a movie. You need to convey the meaning and context of the image, not just a literal description of every pixel. And please, do not start your alt text with the words "Image of" or "Picture of". The screen reader already announces that it is an image.

**Alex:** Exactly. If the image is a screenshot of a command line showing an error message, your alt text should actually include the text of the error message. If the image is a chart showing performance going up, say "Line chart showing a twenty percent increase in performance over three months."


**Jamie:** Okay, so we have headings, paragraphs, links, and images. What about lists? I feel like half of my time on GitHub is spent writing lists.

**Alex:** Lists are incredibly common. You have unordered lists, which are just bullet points, and ordered lists, which are numbered.

**Jamie:** An unordered list is like a grocery list. The order does not strictly matter. To make one, you just start a line with a dash or an asterisk, followed by a space, and then your item.

**Alex:** And an ordered list is like a recipe. The steps must happen in sequence. For these, you start the line with a number, a period, a space, and your text. Like, one dot space preheat the oven.

**Jamie:** One thing I love about Markdown is that for ordered lists, you can actually just use the number one for every single item. One dot space do this. On the next line, one dot space do that. When GitHub renders it, it automatically numbers them one, two, three. That way, if you insert a new step in the middle, you do not have to renumber everything manually.

**Alex:** That is a great tip. And you can nest lists, too. If you are on an item and you want to create a sub-list, you just move to the next line and indent the dash or the number by two spaces. The screen reader will announce the change in list level, telling you that you have entered a nested list.

**Jamie:** Speaking of lists, can we talk about task lists? Because this is a specific GitHub Flavor feature that changed my life.

**Alex:** Task lists are fantastic. They create interactive checkboxes right inside your pull requests and issues.

**Jamie:** Think of a task list like a digital clipboard hanging on a wall. Anyone with permission can walk up and check a box without having to rewrite the whole list.

**Alex:** To create a task list item, you write a regular list item using a dash, then a space, then open and close square brackets with a space between them, then another space, and your text.

**Jamie:** So it is dash, space, left bracket, space, right bracket, space, "Write tests." That creates an unchecked box.

**Alex:** If you want the box to be checked by default, you replace the space inside the brackets with a lowercase letter X. Dash, space, left bracket, X, right bracket, space.

**Jamie:** When you view this in a GitHub issue, it renders as a real HTML checkbox. If you are navigating with N V D A or JAWS, it will read as "checkbox, not checked" or "checkbox, checked". And here is the best part: if you have write access to the repository, you do not have to edit the Markdown file to check the box. You can just navigate to the checkbox in the rendered view, switch to focus mode, and press the Spacebar. It updates the Markdown for you automatically.

**Alex:** And in a pull request, GitHub actually reads those checkboxes to create a progress bar. It will tell reviewers, "two of seven tasks completed." It is a brilliant way to manage a release checklist.


**Jamie:** Let us pivot to writing code in our Markdown. We are developers, after all. We need to document our code.

**Alex:** You have two ways to format code: inline code and code blocks. Inline code is for when you want to format a single word, like a variable name or a keystroke, right in the middle of a sentence.

**Jamie:** To do this, you wrap the word in single backticks. The backtick key is usually located in the top left of your keyboard, right under the Escape key. Think of inline code like quoting a single phrase from a foreign language in the middle of your English sentence. It tells the reader, "this specific word is code."

**Alex:** For larger chunks of code, you use a code block. This is like setting up a dedicated translation booth. You start by putting three backticks on their own line. Then you paste all your code on the following lines. Finally, you close the block by putting three more backticks on their own line at the end.

**Jamie:** And you can enable syntax highlighting by typing the name of the programming language immediately after the first three backticks. So three backticks, the word python, and then press Enter.

**Alex:** Syntax highlighting is mostly a visual feature. It changes the font colors based on whether a word is a variable, a string, or a function. For screen reader users, the code block is announced as a "code region", but the text itself is read normally. This is why writing clean, well-named variables is the true key to accessible code. The syntax highlighting does not convey any structural information to the screen reader that the raw text does not already provide.

**Jamie:** Okay, what if I need to organize data? Can I build a table in Markdown?

**Alex:** You can, using pipes and dashes. The pipe character is usually typed by pressing Shift and the Backslash key.

**Jamie:** I always describe Markdown tables as drawing a spreadsheet with sticks. The vertical pipes act as the walls between the columns, and a row of dashes acts as the floor separating the header row from the data rows.

**Alex:** Exactly. You start a row with a pipe, type your column header, type another pipe, type the next header, and so on. On the second line, you use pipes to separate dashes. This tells Markdown that the first row was a header. Then you fill in your data on the following lines, separated by pipes.

**Jamie:** When GitHub renders this, it builds a proper HTML table. Screen readers like VoiceOver or JAWS will announce it as a table, tell you the number of columns and rows, and let you navigate cell by cell using your standard table commands, reading the column headers as you move.


**Alex:** Now let us get into some of the newer, advanced GitHub extensions. Starting with Alert blocks, which were introduced in 2023.

**Jamie:** I love these. Sometimes you write documentation and there is a critical warning, like "Do not delete this database," but it just gets lost in the paragraphs. Alerts let you pull that text out into a dedicated callout box.

**Alex:** Think of an alert block like an intercom announcement interrupting the regular broadcast. To create one, you use the standard Markdown syntax for a blockquote, which is the greater-than sign followed by a space. But then, you add a special tag in square brackets, starting with an exclamation mark.

**Jamie:** So to make a Note alert, you type greater-than sign, space, left bracket, exclamation mark, the word NOTE in all capital letters, right bracket.

**Alex:** GitHub supports five types of alerts: Note, Tip, Important, Warning, and Caution. You put that tag on the first line, and then on the next line, you type another greater-than sign and write your message.

**Jamie:** From an accessibility perspective, these are handled really well. GitHub renders them as a blockquote, but it adds a strong heading with the alert type. So your screen reader will announce "blockquote," and then read the word "Warning," before reading your message. You get the full semantic meaning without needing to rely on visual styling.

**Alex:** Another advanced feature you will encounter is Mermaid diagrams. Have you worked with these, Jamie?

**Jamie:** I have, and they are a double-edged sword. Mermaid is a tool that lets you generate flowcharts and graphs using plain text. You create a code block, use the word "mermaid" as the language tag, and then write out relationships. Like, A dash dash greater-than B.

**Alex:** It is like a text-based blueprint that automatically draws a house. It is incredibly popular in architecture documentation because developers can version control their diagrams just like code.

**Jamie:** But here is the massive accessibility catch. When GitHub renders a Mermaid diagram, it turns it into an S V G image. And GitHub does not automatically generate alt text for that image. To a screen reader, it is often just a locked door. It might announce a generic container, or it might skip it entirely.

**Alex:** This is a critical point. If you use Mermaid diagrams, you must take responsibility for the accessibility. The rule is simple: always provide a plain text equivalent before or after the diagram.

**Jamie:** Right. If your flowchart shows a five-step pull request workflow, just write out those five steps as an ordered list right before the diagram. The diagram is great for visual learners, but the text list ensures no one is blocked from the information.

**Alex:** While we are talking about specialized code, GitHub also supports LaTeX for math equations.

**Jamie:** LaTeX is like musical notation, but for numbers and complex algorithms. If you are writing documentation for data science or machine learning, you need a way to show formulas.

**Alex:** You use the dollar sign. A single dollar sign on each side of your equation renders it inline, right in the middle of a sentence. Two dollar signs on their own lines create a display block, centering the math and making it larger.

**Jamie:** GitHub uses a tool called MathJax to render this. The good news is that MathJax includes an aria-label with the spoken form of the equation. So if you write E equals M C squared in LaTeX, most screen readers will actually read out "E equals M C squared". But for incredibly complex equations, it is still best practice to explain the formula in plain English right after it.


**Alex:** Let us wrap up with a few features that help with document navigation. Specifically, footnotes and heading anchors.

**Jamie:** Footnotes are brilliant for keeping your main text clean. They work like a two-way portal. You drop a marker in your text, and it creates a link that jumps down to the reference.

**Alex:** To create a footnote reference, you use square brackets, a caret symbol, which is Shift plus the number six, and an identifier. So left bracket, caret, the number one, right bracket.

**Jamie:** Then at the bottom of your document, you type that same marker, a colon, and your footnote text. When GitHub renders it, the marker becomes a clickable superscript number. And down at the footnote, it automatically adds a back-link, which the screen reader reads as "return to footnote reference". It is so seamless.

**Alex:** And finally, heading anchors. Every single heading you create in a GitHub Markdown file automatically gets an anchor I D. This means you can link to any specific section of a document.

**Jamie:** Think of an anchor like dropping a pin on a specific paragraph. If I have a heading that says "Getting Started", GitHub takes that text, converts it to all lowercase, and replaces the spaces with hyphens. So the anchor becomes "getting-dash-started".

**Alex:** You can then create a link anywhere else in the document that points exactly to that heading by using a hash symbol followed by the anchor name. Left bracket, Go to setup, right bracket, left parenthesis, hash getting-dash-started, right parenthesis.

**Jamie:** This is exactly how people build Tables of Contents at the top of really long read me files.

**Alex:** One last quick tip before we summarize. Markdown allows you to use basic H T M L inside your files. The most useful one is the details element.

**Jamie:** Oh, the details element is a lifesaver. If you are filing a bug report and you have a massive stack trace that is five hundred lines long, do not just paste it into the issue. It makes navigating with a screen reader exhausting.

**Alex:** Instead, you write the H T M L tag, less-than sign, the word details, greater-than sign. Inside that, you use a summary tag to write a title, like "Click to expand stack trace". Then you paste your massive code block, and close the details tag.

**Jamie:** A screen reader will announce this as a collapsed button. You just press Enter or Space to expand it, and the content appears immediately without reloading the page. It keeps the issue clean while still providing all the data.


**Alex:** We have covered a massive amount of syntax today. Jamie, what are the top takeaways our listeners should focus on?

**Jamie:** First, Markdown is just plain text with punctuation. Headings use hashes, emphasis uses asterisks, and links use brackets and parentheses. Second, always write accessible Markdown. That means respecting your heading hierarchy, writing descriptive link text instead of pasting raw U R Ls, and always, always providing alt text for your images. And third, when using advanced features like Mermaid diagrams, remember that they render visually. You must include a text equivalent so screen reader users get the same information.

**Alex:** Perfect summary. Take some time to practice these in VS Code. Create a file called practice dot M D and try building a table, adding a task list, and linking to an anchor.

**Jamie:** In our next episode, we are moving away from writing text and getting back to the repository. We will be covering the Pull Request workflow, specifically how to review code and handle merge conflicts.

**Alex:** It is going to be a great one. Until then, keep practicing, and happy coding.

</details>


### Episode 23: GitHub Gists

Lightweight code sharing: creating, editing, forking, and embedding Gists.

Based on: [Appendix F: GitHub Gists](docs/appendix-u-discussions-and-gists.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep23-github-gists.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep23-github-gists.mp3">Download Episode 23 (MP3)</a>
</audio>

[Download Episode 23 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep23-github-gists.mp3)

<details>
<summary>Read Transcript - Episode 23: GitHub Gists</summary>

#### Transcript

**Alex:** Welcome back to Gitt Going with GitHub. I am Alex, and this is episode twenty three of our audio series. Today, we are talking about a feature called GitHub Gists. That is spelled G I S T S. We will cover what they are, how to create them using both the web interface and the command line, the difference between public and secret Gists, and how to embed them.

**Jamie:** Hi everyone, I am Jamie. And I have to say, I see links to Gists all the time when I am searching for coding answers on the web, but for the longest time, I did not really understand what made them different from a regular GitHub repository. Two years ago when I was first starting out, I thought a Gist was just a funny name for a text file.

**Alex:** You were not entirely wrong, Jamie. A Gist at its core is a lightweight way to share code snippets, notes, or small files without going through the trouble of creating a full repository. Think of it as a version controlled digital sticky note.

**Jamie:** A version controlled sticky note. I like that. So a snippet, just to define that for everyone, is exactly what it sounds like. A small piece of code. Maybe it is ten lines of Python, or a quick configuration file, rather than a whole software program.

**Alex:** Exactly. When you are building a full project, you want a standard GitHub repository. A repository is like a heavy duty filing cabinet. It has folders, multiple branches, an issue tracker for bugs, pull requests for code review, and automated testing. It is built for collaboration. But sometimes, you just do not need all of that heavy machinery.

**Jamie:** Right, because creating a whole repository just to share a five line script feels like renting a moving van to transport a single piece of mail. It is way too much overhead.

**Alex:** That is a perfect analogy. You use a Gist when you want to share a single code snippet, post a configuration example, share error logs with a colleague, or just save some quick documentation for yourself. Gists do not have issues, they do not have pull requests, and they do not have project boards. They are streamlined specifically for sharing small bits of information quickly.


**Jamie:** So how do we actually create one? Do I start from my normal GitHub dashboard?

**Alex:** You can, but Gists actually live on their own subdomain. To get started, you will open your browser and navigate to gist dot github dot com.

**Jamie:** Got it. Gist dot github dot com. What does that page look like with a screen reader?

**Alex:** It is a very clean interface. When the page loads, you can press the letter D to cycle through your landmarks until you hear Main landmark. From there, you can press the letter F to navigate through the form fields. The first thing you will land on is the Gist description text box.

**Jamie:** What should I put in the description? Is this like a commit message?

**Alex:** It is more like the title of your sticky note. You want to be brief but descriptive. For example, you might type, NVDA configuration for GitHub web navigation.

**Jamie:** Okay, so I type my description, and then I press Tab to move to the next field?

**Alex:** Yes. The next field is the Filename text box. And this part is actually really important. You do not just want to type a name, you need to include the file extension. So instead of just typing nvda config, you should type nvda config dot txt. Or if it is a Python script, script dot py.

**Jamie:** Why is the extension so important?

**Alex:** Because GitHub uses that extension to determine how to format the text. If you type dot py, GitHub automatically applies Python syntax highlighting. If you type dot md, it knows to treat it as a Markdown file. It makes reading the code much easier for anyone who comes across it.

**Jamie:** Oh, that is incredibly smart. I wish I had known that when I started. I used to just leave the filename blank and wonder why my code looked like a giant wall of plain text.

**Alex:** It is a very common mistake! So, after you enter your filename, you press Tab again to move into the main content text box. This is where you actually paste or type your code.

**Jamie:** And if I am sharing an error log from my terminal, I just copy it from my terminal window and paste it right into that text box.

**Alex:** Exactly. Once your content is in there, you have a choice to make about visibility. If you Tab past the content area, you will reach the visibility options. You can choose either Create secret gist or Create public gist.


**Jamie:** Let us talk about those visibility options, because I remember being very confused by the word secret. Secret means private, right? Only I can see it?

**Alex:** That is a massive misconception, and I am so glad you asked. No. Secret does not mean private.

**Jamie:** Okay, warning bells are going off in my head. Please explain.

**Alex:** A public Gist is completely open. It appears on your public GitHub profile, it shows up in GitHub search results, and it gets indexed by search engines like Google. Anyone can find it, view it, and leave comments on it.

**Jamie:** Like a public post on a message board.

**Alex:** Exactly. A secret Gist, on the other hand, is hidden from search engines. It does not appear on your GitHub profile, and it will not show up if someone searches GitHub for keywords. However, anyone who has the exact URL can view it.

**Jamie:** So it is like having an unlisted phone number. Or an unlisted video on YouTube. You will not find it in the phone book, but if I hand you a slip of paper with the number on it, you can call it. It is not locked behind a password.

**Alex:** That is the perfect way to understand it. Because it is not locked behind a password or tied to user permissions, you must never put sensitive data in a Gist. Not even a secret one.

**Jamie:** So no passwords, no API keys, no personal user data.

**Alex:** Never. If you need to share proprietary code or secure credentials, you should use a private GitHub repository with strict access controls, or a dedicated secure password manager. If you accidentally paste an API key into a Gist, you need to delete that Gist immediately and go revoke that key with whatever service issued it.

**Jamie:** That is really good to know. So if secret Gists are not truly secure, what is the point of them? When would I use one?

**Alex:** They are great for sharing things you just do not want cluttering up your public profile. If you and I are troubleshooting a bug, and I want to send you a massive, messy error log, I will make it a secret Gist. I send you the link in our chat, you read it, we fix the bug. The log does not need to be searchable by the whole internet, but I also do not need military grade security for it.


**Jamie:** Okay, so let us go back to our form. I have my description, my filename, my code, and I choose Create public gist. I activate that button, and then what happens?

**Alex:** GitHub saves the Gist and loads a new page. This page has a unique URL in your browser address bar. It will look something like gist dot github dot com slash your username slash a long string of random letters and numbers. That URL is what you share with people.

**Jamie:** What if I need to share two files? Let us say I have a script, but I also have a small configuration file that goes with it. Do I have to make two separate Gists?

**Alex:** You do not. You can absolutely add multiple files to a single Gist. When you are on the creation page, right after the main content text box, there is a button called Add file. If you activate that button, it generates a new filename field and a new content text box right below your first one.

**Jamie:** Oh, that is clever! So I could share my HTML file, my CSS file, and my JavaScript file all in one single link.

**Alex:** Exactly. It keeps related snippets bundled together perfectly.


**Jamie:** Now, Alex, you know I am a huge fan of the command line. Doing all of this in the browser sounds fine, but switching windows, navigating form fields, pasting things in. Is there a way to create a Gist directly from my terminal?

**Alex:** There is, and it is incredibly fast. If you have the GitHub CLI installed, which is the command line interface we talked about in a previous episode, you can use the command g h space gist space create.

**Jamie:** G h gist create. How does that work in practice?

**Alex:** Let us say you have a file on your computer called notes dot txt. In your terminal, you just type g h space gist space create space notes dot txt. You press Enter, and the CLI uploads the file to GitHub and prints the brand new Gist URL right there in your terminal.

**Jamie:** That is amazing. I do not even have to open my browser. Does it make it public or secret by default?

**Alex:** By default, the CLI creates a secret Gist. If you want to make it public, you just add a flag to your command. You would type g h space gist space create space notes dot txt space dash dash public.

**Jamie:** I love that. That saves so many steps.


**Alex:** So, earlier we called a Gist a version controlled sticky note. Let us talk about what that actually means under the hood.

**Jamie:** Right, because what happens if I create my Gist, share the link, and then realize I made a typo in my code? Can I fix it?

**Alex:** You can. When you navigate to the page for your Gist, there is an Edit button near the top of the main content area. If you activate that, it opens the form fields back up. You can fix your typo, and then activate the Update button.

**Jamie:** Does it change the URL when I update it?

**Alex:** No, the URL stays exactly the same, which is great because any links you have already shared will still work. But here is the really cool part. Every single Gist is actually a tiny, fully functional Git repository behind the scenes.

**Jamie:** Wait, really? I thought we just said it was not a repository.

**Alex:** It is not a full GitHub project repository with issues and actions. But the underlying technology storing your file is Git. That means every time you edit your Gist, Git records a commit. If you navigate to your Gist page, you will find a link called Revisions. If you open that, you can read the entire history of changes made to that file, just like a commit history.

**Jamie:** That blows my mind a little bit. If it is a real Git repository, does that mean I can clone it to my computer?

**Alex:** Yes, you can! Every Gist page has a clone URL. You can open your terminal, type git clone, and paste that URL. It will download the Gist to your local machine as a folder. You can open it in your code editor, make changes, type git commit, and type git push to send the changes back to GitHub.

**Jamie:** That is wild. I had no idea they were that powerful. So if it is a Git repo, can I fork someone else's Gist? Like, if I find a really cool script that someone else wrote, but I want to customize it for my own workflow?

**Alex:** Absolutely. Forking is a fundamental concept in open source. To fork means to create a personal copy of someone else's project under your own account. If you are reading a Gist that belongs to another developer, you can navigate to the Fork button and activate it. GitHub instantly creates a duplicate of that Gist in your account.

**Jamie:** So it is like taking a recipe card from a friend's kitchen, copying it onto a blank card, and putting it in my own recipe box. Now I can cross out ingredients and add my own notes without messing up their original recipe.

**Alex:** That is a wonderful analogy. And because it is connected through Git, your forked copy will always link back to the original author, so they get credit for the initial work.


**Jamie:** What if I do not want to copy it, I just want to bookmark it so I can find it later?

**Alex:** For that, you use the Star feature. Starring a Gist is exactly like bookmarking it. There is a Star button right next to the Fork button. When you activate it, that Gist is added to your starred list.

**Jamie:** How do I find my list of starred Gists, or even just a list of all the Gists I have created myself?

**Alex:** You navigate to gist dot github dot com slash your username. That is your personal Gist dashboard. It lists all of your public Gists, your secret Gists, and there is a navigation tab to view the ones you have starred.

**Jamie:** What is the screen reader experience like on that dashboard? If I have twenty different Gists, how do I find the one I am looking for?

**Alex:** GitHub structures that page very well. Each Gist in your list is marked up as a level two heading, and the heading text is the description you provided when you created it.

**Jamie:** Oh, perfect. So I can just press the number 2, or the letter H, to jump from heading to heading until I hear the description I want.

**Alex:** Exactly. And right below each heading, you will find links to Edit, Delete, or Star that specific Gist.

**Jamie:** You mentioned deleting. If I delete a Gist, is it gone forever?

**Alex:** Yes. Deletion is permanent. To do it, you navigate to the Gist, activate the Edit button, and then look for the Delete button. GitHub will ask you to confirm, and once you do, it is removed entirely. But keep in mind, if someone else has already forked your Gist, their forked copy will not be deleted. They own their copy.


**Jamie:** Let us talk about comments. You mentioned earlier that people can leave comments on public Gists. How does that work?

**Alex:** It works beautifully for collaboration. Let us say you write a script to automate a task, and you publish it as a Gist. I find it, but I notice a small bug. I can scroll to the bottom of your Gist page, press the letter F to find the comment text box, and type out a message. I can even use Markdown to format code blocks in my comment. Then I press Control plus Enter to submit it.

**Jamie:** And I get a notification that you commented?

**Alex:** Yes, you will be notified. It turns the Gist into a mini discussion forum. It is incredibly common to see popular Gists with long comment threads where developers are suggesting improvements or sharing how they adapted the code for different operating systems.

**Jamie:** Speaking of popular Gists, is there a way to browse what other people are sharing? Like a trending page?

**Alex:** There is. You can navigate to gist dot github dot com slash discover. The Discover page shows you a feed of public Gists that are currently popular. It is a fantastic place to find useful utilities, learn new coding techniques, and see how other developers structure their configuration files. You can even filter the Discover page by programming language.


**Jamie:** Okay, there is one more concept from the checklist we need to cover. Embedding a Gist. What does it mean to embed a Gist, and why would I want to do it?

**Alex:** To embed means to place the content of your Gist directly inside another webpage, like your personal blog or a documentation site.

**Jamie:** Why wouldn't I just copy and paste the code straight into my blog post?

**Alex:** You could, but then your code is static. If you find a bug in your code a week later, you have to go log into your blog, find the post, and edit the text. If you embed a Gist instead, you only ever have to update the code on GitHub. The moment you update the Gist, your blog automatically displays the new, corrected code. Plus, GitHub provides all the beautiful syntax highlighting automatically.

**Jamie:** Oh, that makes so much sense. It is like hanging a picture frame on the wall of your blog. The frame stays in the same place, but you can swap out the painting inside it anytime you want, just by updating GitHub.

**Alex:** Exactly. To do this, you navigate to your Gist page. Near the top, there is a section called Embed. It provides a small snippet of HTML code that looks like a script tag. You just copy that script tag and paste it into the HTML of your blog post.

**Jamie:** How does an embedded Gist behave for someone using a screen reader who is reading my blog?

**Alex:** That is a great accessibility question. Technically, the embed script generates an HTML iframe. So when a screen reader user lands on it, they will hear the word frame, followed by the title of the Gist. They can then navigate into the frame to read the code line by line, just like they would on GitHub. It is a very seamless reading experience.


**Jamie:** This has been incredibly helpful. I feel like I finally understand where Gists fit into the ecosystem. They are not just plain text files, and they are not full repositories. They are the perfect middle ground for sharing.

**Alex:** They really are. So, let us recap our main takeaways for today. First, use a Gist when you want to share a lightweight code snippet, a configuration file, or an error log without the overhead of a full repository.

**Jamie:** Second, secret Gists are not strictly private. They are unlisted. Anyone with the link can view them, so never ever put passwords or API keys in a Gist.

**Alex:** Third, every Gist is a Git repository under the hood. That means you get version history, and you can clone, fork, and edit them just like a normal project.

**Jamie:** And fourth, you can create them incredibly fast straight from your terminal using the command g h space gist space create.

**Alex:** Perfect summary. That wraps up episode twenty three. In our next episode, we are going to dive into GitHub Pages, which allows you to host a static website directly from a repository for free. It is one of the most exciting features for showcasing your work. Until then, keep practicing, and happy coding.

</details>


### Episode 24: GitHub Discussions

Forum-style conversations, Q&A, polls, and navigation with screen readers.

Based on: [Appendix G: GitHub Discussions](docs/appendix-u-discussions-and-gists.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep24-github-discussions.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep24-github-discussions.mp3">Download Episode 24 (MP3)</a>
</audio>

[Download Episode 24 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep24-github-discussions.mp3)

<details>
<summary>Read Transcript - Episode 24: GitHub Discussions</summary>

#### Transcript

**Alex:** Welcome to episode twenty four of Gitt Going with GitHub, the audio learning series designed specifically for blind and low vision developers who are navigating the world of open source collaboration. I am your host, Alex.

**Jamie:** And I am your cohost, Jamie! Today, we are diving into a feature that I honestly wish I understood two years ago when I first started my GitHub journey. We are talking all about GitHub Discussions.

**Alex:** It is a fantastic topic, Jamie, and one that can save new open source contributors a lot of frustration. In this episode, we are going to cover what Discussions are, how they differ from Issues, the different categories of conversations you will find, and how to effectively navigate, create, and participate in these discussions using a screen reader. We will also talk about polls, marking answers, and when a discussion should actually become an issue.

**Jamie:** Before we jump into the deep end, let us do a quick refresher on our prerequisites. To get the most out of today's episode, it helps to be familiar with a few core GitHub concepts we covered earlier in the workshop. First is a repository, which is simply the central storage location or folder where a project's code and files live on the internet.

**Alex:** Correct. You also need to know about issues. An issue is essentially a tracking ticket. It is where you report bugs, which are errors in the code, or request specific new features. Issues are highly structured and action oriented.

**Jamie:** Right. And finally, we have talked about pull requests. So a pull request, and I love that name because you are literally requesting that someone pull your changes into their project, is the actual mechanism you use when you have written new code and you want the maintainers to merge it into the main repository.

**Alex:** Perfectly summarized. So, we have repositories for storage, issues for tracking tasks, and pull requests for merging code. But what happens when you just want to ask a question? What happens when you want to brainstorm an idea, or the project maintainer wants to announce a new version? That is where GitHub Discussions comes in.


**Jamie:** So Alex, let us start with the most basic question. What exactly is a GitHub Discussion?

**Alex:** At its core, GitHub Discussions is a built in community forum for a repository or an organization. It is where open ended conversations live. Think of it as a dedicated space for questions, ideas, announcements, and community support. It is completely separate from the action oriented world of issues and pull requests.

**Jamie:** I remember when I first started using GitHub, I did not even know Discussions existed. I ran into a problem where I could not figure out how to configure a project I had downloaded. So, I navigated to the Issues tab, activated the New Issue button, and asked my question there. About ten minutes later, a bot automatically closed my issue and labeled it as invalid. I felt terrible! I thought I had broken some unspoken rule.

**Alex:** That is such a common experience, Jamie. And you did break an unspoken rule, but it is one that nobody explains to beginners! Not every conversation belongs in an issue. Issues are for actionable work. When you open an issue, it signals to the maintainers that there is a task to be done. It might trigger automated testing workflows, send email alerts to dozens of contributors, and inflate the project's to do list.

**Jamie:** Wow, I had no idea I was setting off alarms just by asking for help.

**Alex:** Exactly. Let us use a real world analogy. Think of a restaurant. Issues are the ticket line in the kitchen. When a ticket comes in, the cooks have to take action. They have to chop vegetables, cook the meal, plate it, and send it out. If you walk into the kitchen and hand the chef a ticket that just says, what is your favorite vegetable, you are going to disrupt the entire workflow.

**Jamie:** That makes so much sense. So where do I ask about their favorite vegetable?

**Alex:** You ask in the dining room! And that is what GitHub Discussions is. It is the dining room of the repository. It is a space designed for people to sit down, chat, ask what is on the menu, and share their experiences without interrupting the cooks in the kitchen.

**Jamie:** I love that analogy. So to break it down, we should use issues when we find a bug, when we want to request a specific feature, or when there is actionable work that needs to be tracked, assigned to someone, and eventually closed.

**Alex:** Exactly right. And on the flip side, we use Discussions when we have a question about how something works, when we want to brainstorm ideas before we file a formal feature request, or when we just want community input on a topic that might not have one single right answer.


**Jamie:** Okay, so if I am in a repository and I want to visit the dining room, how do I find these discussions?

**Alex:** Navigating to Discussions is straightforward, but there is a catch. Discussions is an opt in feature. The repository maintainer has to actively enable it in their settings. So, not every repository you visit will have a Discussions tab.

**Jamie:** Good to know. But assuming they do have it enabled, how do we get there with a screen reader?

**Alex:** When you navigate to a repository page, you will find a main navigation tab list near the top. This tab list contains links for Code, Issues, Pull Requests, Actions, Projects, and Discussions. If you are using standard screen reader commands, you can press the letter T to navigate through tab items, or simply press the letter K to navigate through links until you hear Discussions. Then, just press Enter to open it.

**Jamie:** And what about organization level discussions? I have heard that is a thing now too.

**Alex:** Yes, it is! Let us define what an organization is first. On GitHub, an organization is a shared account where businesses or large open source communities can manage multiple repositories at once. Some large organizations enable Discussions at the organization level, completely separate from any specific repository.

**Jamie:** Why would they do that?

**Alex:** Think of the organization level discussion as the town square, while the repository discussion is a specific building. The town square is for organization wide announcements, community introductions, cross project feature brainstorming, and community spotlights. You find them by navigating to the organization's main page and looking for the Discussions tab there.


**Jamie:** Okay, so I have successfully navigated to the Discussions tab on a repository. What am I going to hear as I read down the page? Is it just a giant list of random posts?

**Alex:** Not at all. The Discussions home page is highly organized into categories. When you land on the page, the main content area lists the most recent or popular discussions, but they are grouped by these categories. Each category is a section with its own heading.

**Jamie:** What kind of categories are we talking about?

**Alex:** GitHub provides a few default categories that most repositories use. First is General, which is for exactly what it sounds like, everything that does not fit anywhere else. Second is Q and A, which stands for Questions and Answers. This is for support questions. Third is Ideas, which is for feature brainstorming. Fourth is Show and Tell, where community members can show off projects they built using the repository's code. And finally, Announcements, which is usually restricted so only maintainers can post things like new release details or breaking changes.

**Jamie:** That sounds like the channels in a Slack or Discord server. You have your general chat, your help channel, your announcements channel. It keeps things tidy.

**Alex:** That is a perfect comparison. To navigate these categories with a screen reader, you can rely heavily on your heading navigation. If you press the number 3 on your keyboard, you will jump directly to the category headings. Once you are under a category heading, you can press the letter K to navigate through the discussion titles within that category, because those titles are links. When you find one that sounds interesting, press Enter to open it.

**Jamie:** Is there a way to see all the categories at once?

**Alex:** Yes. There is a side panel, which might be on the left or the right depending on your browser width, that shows a list of all categories along with item counts. It also has a section for pinned announcements at the top. This is a great place to start if you want to filter the view to only show discussions from a specific category.


**Jamie:** Alright, let us say I have searched through the existing discussions, and I cannot find the answer to my question. By the way, how do I search?

**Alex:** Great question. You should always search before posting! You can use the search bar at the top of the Discussions page. Or, if you are using GitHub's global search from anywhere on the site, you can type repo colon owner slash name, space, in colon discussions, followed by your search terms.

**Jamie:** Okay, so I have searched, and nobody has asked my question yet. I need to create a new discussion. How do I do that?

**Alex:** From the main Discussions tab, you want to navigate to the button labeled New discussion and activate it by pressing Enter.

**Jamie:** Okay, that sounds like a lot of steps. I have to find the right tab, search, find a button, pick categories. It feels a bit intimidating for someone just trying to ask a question.

**Alex:** It does! But here is the thing, Jamie. You have already done most of this on day one when we learned about creating issues. It is the exact same workflow, just with a different label at the top. You are going to use the exact same text editor, the exact same markdown formatting, and the exact same keyboard shortcuts.

**Jamie:** Oh, well that is a relief. So what happens after I activate the New discussion button?

**Alex:** The first thing you have to do is select a category.

</details>


### Episode 25: Releases, Tags, and Insights

Semantic versioning, GitHub Releases, and repository analytics.

Based on: [Appendix H: Releases, Tags, and Insights](docs/appendix-s-releases-tags-insights.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep25-releases-tags-insights.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep25-releases-tags-insights.mp3">Download Episode 25 (MP3)</a>
</audio>

[Download Episode 25 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep25-releases-tags-insights.mp3)

<details>
<summary>Read Transcript - Episode 25: Releases, Tags, and Insights</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. I am Alex, and this is episode 25 of our audio series for blind and low-vision developers. Today, we are talking about Releases, Tags, and Repository Insights.

**Jamie:** I am Jamie, and I am so excited for this one. Up until now, we have spent a lot of time talking about how to get your code into a project. We have covered making commits, opening pull requests, and getting those pull requests merged. But today is about what happens next. How does that merged code actually get to the people who use the software?

**Alex:** Exactly. And as a prerequisite, if you are fuzzy on the pull request workflow, you might want to revisit our previous episodes on creating and merging pull requests, because today builds right on top of that foundation. Today, we will explore how maintainers package up a bunch of merged pull requests into an official version, and how you can explore a repository to understand how active and healthy it is before you even decide to contribute.

**Jamie:** I remember when I first started learning GitHub about two years ago. I would get my pull request merged, and I would immediately run over to my terminal, update the software I was using, and my new feature would not be there. I was so confused. I thought merging meant it was instantly available to the world.

**Alex:** That is a very common misconception. When your pull request gets merged, it just becomes part of the code on the default branch. But most people who use the software do not download the raw, bleeding-edge default branch every day. They wait for an official release.

**Jamie:** Right. And that is exactly what we are going to demystify today. We will cover Git tags, semantic versioning, creating GitHub releases, and then we will switch gears to talk about the Insights tab, which is basically the heartbeat of a repository.

**Alex:** Let us dive right in with the fundamental building block of a release. Before we can talk about GitHub releases, we have to talk about Git tags. Jamie, how would you describe a branch compared to a tag?

**Jamie:** Well, a branch is a movable pointer. We have talked about this before. When you add a new commit to a branch, the branch pointer moves forward to include that new commit. It is always pointing to the latest work. But a tag is entirely different. A tag is a fixed pointer to one single, specific commit. It never moves.

**Alex:** That is spot on. I like to use the analogy of a bookmark in a really long, constantly growing book. The author keeps adding new pages to the end of the book. A branch is like a bookmark that you always keep moving to the very last page you read. But a Git tag is a bookmark you glue onto page 100, and you write chapter one on it. No matter how many more pages the author writes, that bookmark will always point exactly to page 100.

**Jamie:** I love that. So when a project reaches a stable point, the maintainer glues a bookmark onto that exact commit and names it something like version 1 point 0. That way, anyone can jump back to that exact state of the code at any time.

**Alex:** Precisely. Now, within Git, there are two types of tags you can create. There are lightweight tags, and there are annotated tags.

**Jamie:** I know the difference here! A lightweight tag is literally just a name attached to a commit. It is like taking a blank sticky note, writing version 1 point 0 on it, and slapping it on the page. It does not store any extra information. But an annotated tag is much richer.

**Alex:** Yes, an annotated tag is stored as a full object in the Git database. Returning to our analogy, an annotated tag is like a formal library index card. It includes the tag name, but it also records the name and email of the person who created the tag, the date it was created, and a tagging message. It can even be cryptographically signed. If you are tagging a public release of software, you almost always want to use an annotated tag.

**Jamie:** So we have this tag, and we are going to name it with a version number. But version numbers can be really confusing when you are new. You see things like version 2 point 1 point 4. What do all those numbers actually mean?

**Alex:** Most open source projects use a system called Semantic Versioning, often shortened to semver. In semantic versioning, the number is broken into three parts separated by periods. Major, minor, and patch. So in version 2 point 1 point 4, the major version is 2, the minor version is 1, and the patch version is 4.

**Jamie:** Okay, so how do I know when to change which number? Let us say I am the maintainer. When do I bump the major, minor, or patch version?

**Alex:** Let us use an analogy of a car model to make this concrete. The last number, the patch version, is for backward-compatible bug fixes. If you fix a typo in the code, or resolve a crash without changing how the software is used, you bump the patch number. In our car analogy, this is like fixing a flat tire or replacing a faulty windshield wiper. The car still drives exactly the same way. The user does not have to learn anything new. You would go from version 2 point 1 point 4 to version 2 point 1 point 5.

**Jamie:** Got it. Patch means bug fix. What about the middle number, the minor version?

**Alex:** You bump the minor version when you add new features, but they are backward-compatible. This means existing users can upgrade without breaking their current setup. In the car analogy, bumping the minor version is like adding a brand new Bluetooth stereo system or heated seats. You added new functionality, but the steering wheel and the gas pedal are exactly where they have always been. The driver can just get in and drive. If you add a new command to your software, you bump the minor version. You would go from version 2 point 1 point 4 to version 2 point 2 point 0. Notice that when you bump the minor version, the patch number resets to zero.

**Jamie:** Okay, that makes sense. So that leaves the first number, the major version. I am guessing this is the big one.

**Alex:** It is. You bump the major version when you make breaking changes. This means you have changed the existing behavior in a way that is incompatible with previous versions. Users might need to rewrite their own code or change their configurations to use the new version. In our car analogy, a major version bump is like replacing the gas engine with a manual transmission electric engine, and moving the steering wheel to the back seat.

**Jamie:** Oh wow, yeah, the driver is going to need a new manual for that.

**Alex:** Exactly. If someone tries to drive it exactly like the old car, they are going to crash. So you signal that danger by bumping the major version. You would go from version 2 point 2 point 0 all the way to version 3 point 0 point 0. The minor and patch numbers reset to zero.

**Jamie:** That is a really helpful way to think about it. Patch is a fix, minor is a safe new feature, and major means read the instructions because things have changed.


**Alex:** So now we understand Git tags and semantic versioning. But a Git tag is just a raw marker in your code history. GitHub takes that concept and builds a whole feature around it called a GitHub Release.

**Jamie:** This is an important distinction. A tag is a Git concept. It exists on your local machine and in the terminal. But a Release is a GitHub concept. It only exists on the GitHub platform.

**Alex:** Exactly. If a tag is the bookmark glued to a specific page, a GitHub Release is the fancy gift box you hand to your users. Every GitHub Release is backed by a Git tag, but the Release adds extra things. It adds formatted release notes explaining what changed, and it can include downloadable release assets.

**Jamie:** Let us talk about those release notes first. When I navigate to a repository on GitHub, how do I actually find the releases with my screen reader?

**Alex:** From any repository home page, you can use your screen reader's heading navigation. Press the letter H, or specifically the number 3, to navigate through the level 3 headings in the right sidebar. You will find a heading called Releases. Right below that heading, there is usually a link to the latest release, like version 2 point 1 point 0. You can activate that link to go straight to it. Or, you can navigate slightly further down to a link that says something like Five Releases, which will take you to a list of all historical releases.

**Jamie:** And when I open that releases page, what is the structure like? How do I read it?

**Alex:** The main releases page lists everything in reverse chronological order. Each release is enclosed in its own section. You can press the number 2 to jump between the major section headings, and the number 3 to jump to individual release titles. Once you are on a release title, you can use your down arrow to read the release notes.

**Jamie:** I love reading good release notes. A well-maintained project will categorize the changes. They will have a heading for Breaking Changes, a heading for New Features, and a heading for Bug Fixes. It makes it so easy to skim. And usually, each bullet point mentions the pull request number and the username of the person who contributed it.

**Alex:** That is one of the best feelings as a new contributor. You open the release notes for a major project, and right there under Bug Fixes, you hear your own username read aloud. It is tangible proof that your code is out in the world.

**Jamie:** At the bottom of the release notes, there is usually a section for downloading release assets. What exactly are release assets?

**Alex:** Assets are the actual files the user needs. GitHub automatically generates two source code archives for every release, a zip file and a tar dot gz file. This is just the raw code at that specific tag. But maintainers can also attach custom assets. If it is a desktop application, the assets might be the compiled executable file for Windows, and the dot app file for Mac. You can use the letter K to navigate through the links in the release section to find the asset downloads.


**Jamie:** Okay, so that is how we consume releases. But what if I am a maintainer, or I am volunteering on an open source project, and they ask me to create the new release? That sounds like a lot of pressure. Do I have to manually write out every single thing that changed?

**Alex:** You used to have to do that, and it was tedious. But GitHub has made this incredibly smooth now. Let us walk through creating a release from the GitHub web interface. First, you navigate to the main releases page, and you activate the link called Draft a new release.

**Jamie:** OK that sounds like a lot of steps, but I am guessing it is mostly a form to fill out?

**Alex:** It is! You are just filling out a web form. The first thing you do is choose a tag. You can type in a brand new version number, like v 2 point 1 point 0. If the tag does not exist yet, GitHub will automatically create it for you when you publish. Next, you choose the target branch, which is usually your main branch. Then you give the release a title, which is often just the version number again.

**Jamie:** And then comes the release notes text area. This is where the magic happens, right?

**Alex:** Exactly. Right above the text area, there is a button called Generate release notes. When you activate this, GitHub automatically looks at every single pull request that has been merged since the previous release. It grabs the titles, the author names, and the links, and it formats them perfectly into markdown inside the text area. It is like having a personal assistant summarize a month's worth of meeting notes in two seconds.

**Jamie:** Oh that is clever! I wish I had known that when I started. I definitely spent hours manually copying and pasting pull request titles into a text document.

**Alex:** We have all been there. Once the notes are generated, you can manually edit them. You might want to group them into headings or add a friendly introductory paragraph. Then, you have the option to attach any binary files if you have them. Finally, you choose whether to publish it, or save it as a draft.

**Jamie:** Let us talk about drafts and pre-releases. There are checkboxes for those on the form. A draft release is just what it sounds like, right? It is saved, but only repository collaborators can see it. It is great for preparing the notes a few days before the actual launch.

**Alex:** Exactly. And a pre-release is slightly different. A pre-release is published and visible to the public, but it is not marked as the Latest release. When users visit the repository, GitHub will not automatically direct them to a pre-release.

**Jamie:** Why would you use a pre-release?

**Alex:** You use a pre-release for early testing versions. In semantic versioning, you might append a suffix, like version 2 point 1 point 0 dash alpha point 1, or dash beta point 2. It signals to users, hey, this is available to test, but it might still have bugs. Only adventurous users should download it.

**Jamie:** Before we move on from creating releases, I want to mention a massive shortcut for screen reader users who use VS Code. If you are using the Accessibility Agents extension we have talked about in previous episodes, you do not even need to navigate the web form to write your notes.

**Alex:** That is right. You can open the GitHub Copilot chat in VS Code, and type the command slash draft dash release, followed by the version number. The agent will analyze your repository, categorize all your merged pull requests into Features, Bug Fixes, and Dependencies, and output perfectly formatted markdown right in your chat window. You can just copy it and paste it wherever you need it.


**Jamie:** Alright, so releases tell us what a project has shipped. But what if I am evaluating a new repository, and I want to know if it is actually healthy? I want to know if the maintainers are active, if people are contributing, and if it is a welcoming place. How do I find that out?

**Alex:** That is where the Insights tab comes in. The Insights tab is a dedicated section of the repository that shows quantitative activity data. To get there, you navigate to the main repository tab bar by pressing the letter T, and then navigate through the tabs until you find the link called Insights.

**Jamie:** Now, I have to be honest here. As a screen reader user, the Insights tab used to be my least favorite place on GitHub. It is heavily visual. It is full of line charts, bar charts, and scatter plots that are rendered in HTML canvas elements. When my screen reader hits those, it just says graphic or image, and I get absolutely zero information.

**Alex:** That is a very fair critique, and it is a common frustration. But here is the secret to navigating the Insights tab with a screen reader. Almost every single visual chart on those pages has a fully accessible HTML data table located directly below it. The strategy is to completely ignore the canvas graphics. When the page loads, just press the letter T to jump straight to the data tables. All the exact same information is right there in text format.

**Jamie:** That is a lifesaver. Okay, so when I open the Insights tab, the left sidebar has a sub-navigation menu with several different views. The first one, which is the default landing page, is called Pulse. What is Pulse?

**Alex:** Pulse is exactly what it sounds like. It is the heartbeat of the project. It gives you a summary of all the activity over a specific time period, usually the last week or the last month. You will find headings for Merged pull requests, Open pull requests, and Closed issues. Under each heading is a plain text list of the actual work that happened, with links to the items.

**Jamie:** This is my go-to page when I am looking for an open source project to contribute to. If I look at the Pulse for the last month, and I find zero merged pull requests, and fifty open issues, that is a zombie project. The maintainer is gone. I am not going to waste my weekend writing a pull request that will never get reviewed.

**Alex:** That is exactly how you should use it. Conversely, if you see that ten pull requests were merged by five different authors, that tells you the project is alive, active, and welcoming to multiple contributors.

**Jamie:** What about the Contributors view? That is another link in the Insights sidebar.

**Alex:** The Contributors view shows who is building the project. Visually, it is a big timeline chart, but again, jump down to the table. The table lists every person who has contributed to the default branch. It shows their username, their total number of commits, and how many lines of code they have added and deleted. You can use your Tab key to navigate the column headers and sort the table.

**Jamie:** I remember the day my name finally appeared in one of those contributor tables. It was such a proud moment. And it is actually really useful because you can link directly to your section of the contributor page to prove your involvement in a project to potential employers.

**Alex:** Absolutely. Next in the sidebar is the Traffic view. Now, you can only access the Traffic view if you are a repository owner or a collaborator with push access. It shows you who is visiting the repository. It tracks total page views, how many times the repository has been cloned, and referring sites, which tells you if people are finding your project from Google, or Twitter, or a specific blog post.

**Jamie:** Why does traffic matter for developers? We are not marketing people.

**Alex:** It matters for documentation and community growth. The Traffic view has a table called Popular Content that shows exactly which files get the most views. If you see that a specific tutorial file in your repository is getting thousands of views a week, you know that file is critical. You should probably spend time making sure that specific tutorial is perfectly accessible and up to date, because it is the front door to your project.


**Jamie:** Let us talk about a view in the Insights tab that has major security implications. The Dependency graph.

**Alex:** The dependency graph is crucial. Modern software is rarely built from scratch. We rely on dozens, sometimes hundreds, of external libraries and packages. The dependency graph reads your configuration files and creates a list of everything your project relies on.

**Jamie:** I like to think of the dependency graph as a recipe's ingredient list. If I am baking a cake, the dependency graph lists the flour, the sugar, and the eggs. But why is it in the Insights tab?

**Alex:** Because it feeds one of GitHub's most important security features, called Dependabot. Let us stick with your recipe analogy. Imagine there is a national recall on the specific brand of flour you use because it is contaminated. Dependabot acts like a grocery store manager who constantly monitors recall lists. Because the manager has your exact ingredient list, your dependency graph, they can immediately tap you on the shoulder and say, hey, your flour is bad. Here is a safe brand to use instead.

**Jamie:** And Dependabot actually does more than just tap you on the shoulder. It will automatically open a pull request in your repository to update the vulnerable dependency to a safe version. All you have to do is review the pull request and merge it. It is incredible.

**Alex:** It really is. There is one more section in the Insights area we need to cover, and that is Community Standards. You can usually find this in the Insights sidebar, or sometimes linked directly from the main repository page in the right sidebar.

**Jamie:** The Community Standards page is essentially a checklist of community health files. It lists things like a README, a Code of Conduct, a Contributing guide, a License, and Issue templates. Next to each item is a simple status of either a checkmark or an X.

**Alex:** A fully green checklist signals a mature, well-maintained project. It means the maintainers have taken the time to set rules and provide instructions for newcomers.

**Jamie:** And here is a pro-tip for our listeners. If you are looking for an easy way to make your first contribution to an open source project, check their Community Standards page. If they are missing a Code of Conduct or a Contributing guide, those are fantastic good first issues. You can draft the text, open a pull request, and help them turn that X into a checkmark. Maintainers love that kind of help.

**Alex:** That is a brilliant suggestion. Now, before we wrap up, I want to offer one more alternative for our screen reader users. If you do not want to navigate the Insights tab in the web browser at all, the Accessibility Agents extension in VS Code has commands for this, too.

**Jamie:** Yes! You can open Copilot chat and type slash my dash stats. It will output a beautifully formatted text summary of your personal contributions across all your tracked repositories. It tells you how many pull requests you opened, how many reviews you completed, and how many commits you pushed.

**Alex:** And if you are working on a team, you can type slash team dash dashboard. It generates a text-based report of team-wide activity, showing who is reviewing code, what issues are open, and overall project health. It gives you the power of the Insights tab without ever leaving your code editor or fighting with a canvas graphic.


**Jamie:** We covered a huge amount of ground today. From gluing bookmarks onto pages, to ingredient lists, to checking the heartbeat of a project.

**Alex:** Let us summarize the key takeaways. First, a Git tag is a fixed, named pointer to a specific commit, while a GitHub Release wraps that tag with release notes and downloadable assets.

**Jamie:** Second, semantic versioning uses three numbers. Major, minor, and patch. Remember the car analogy. Patch is a bug fix like a new tire. Minor is a new feature like a stereo. And Major is a breaking change like an entirely new engine.

**Alex:** Third, when reading the Insights tab with a screen reader, remember to skip past the visual canvas charts by pressing the letter T, and use the accessible data tables located immediately below them to read the exact same information.

**Jamie:** And fourth, use the Pulse view to check a project's heartbeat before you contribute. Look for recently merged pull requests to ensure the maintainers are actually active and reviewing code.

**Alex:** That brings us to the end of episode 25. Now that we understand how releases and insights work, we are ready to take on larger responsibilities. In our next episode, we will be shifting gears to talk about repository management. We will cover protecting your main branch, setting up rulesets, and managing collaborator access.

**Jamie:** I cannot wait. Thanks for listening, everyone. Happy coding!

**Alex:** See you next time on Gitt Going with GitHub.

</details>


### Episode 26: GitHub Projects Deep Dive

Project boards, table and roadmap views, custom fields, cross-repo management.

Based on: [Appendix I: GitHub Projects Deep Dive](docs/appendix-r-projects-deep-dive.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep26-github-projects.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep26-github-projects.mp3">Download Episode 26 (MP3)</a>
</audio>

[Download Episode 26 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep26-github-projects.mp3)

<details>
<summary>Read Transcript - Episode 26: GitHub Projects Deep Dive</summary>

#### Transcript

**Alex:** Welcome back to Gitt Going with GitHub. I am Alex, and today we are diving into Episode 26, which is our GitHub Projects Deep Dive.

**Jamie:** Hello everyone, I am Jamie! I am very excited for this one. I know we touched on the basics of projects back in Episode 8, along with labels and milestones. But today we are going all in, right?

**Alex:** Exactly. Back in Episode 8, we covered the prerequisites. We learned how to attach a project to a single repository and how to find it. Today, we are looking at GitHub Projects version two as a complete project management system. We will cover the different layouts like tables and boards, how to create custom fields, tracking work across multiple repositories at once, and my absolute favorite part, built-in automations.

**Jamie:** Automations! That sounds amazing, but also a little intimidating. I remember when I first started learning GitHub about two years ago, just managing a single repository felt like a lot. Now we are talking about automating work across multiple repositories?

**Alex:** It does sound like a lot! But here is the thing, you have already done most of this on Day 1 of your journey. You already know how to open an issue, how to close a pull request, and how to assign a label. This is the exact same workflow, just with GitHub handling the heavy lifting of organizing it all for you.

**Jamie:** That is a relief. So, before we get into the how-to, you mentioned Projects version two. What happened to version one? And why do I sometimes see older forum posts talking about Projects Beta?

**Alex:** Great question. GitHub has two generations of project tooling. The current generation is officially called Projects version two, but you will just see it labeled as Projects everywhere on the platform today. The older version, Classic Projects, was basically just a simple Kanban board. It was like having a basic corkboard on your wall where you could pin up index cards. It was fine, but very limited.

**Jamie:** And let me guess, version two is the upgrade?

**Alex:** A massive upgrade. If Classic Projects was a simple corkboard, Projects version two is like a smart digital spreadsheet that updates itself. You can add custom fields, switch between different views, and pull in work from anywhere in your organization. When it was first being tested, it was called Projects Beta, but it is fully stable now and it is the default.


**Jamie:** So let us start at the very beginning. How do I actually create a new project?

**Alex:** You can create a project at two different levels. The repository level, which scopes the project to just one repository, or the organization level, which lets you share the project across all repositories in that organization.

**Jamie:** I usually work in an organization with a few different repositories for the frontend, backend, and documentation. So I would probably want an organization-level project, right?

**Alex:** Exactly. To do that, you navigate to your organization page. You will activate the tab called Projects. From there, you just tab to the button called New project and press Enter.

**Jamie:** Does it just give me a blank slate?

**Alex:** It opens a template menu first. You can use your arrow keys to browse through template cards, like a blank table, a blank board, or a feature release template. Once you press Enter on a template, you just type in a name for your project, tab to the Create project button, and you are in.

**Jamie:** Okay, so I have created my project. What does it actually feel like to navigate? You mentioned different layouts earlier.

**Alex:** Yes, there are three main layouts in Projects version two. The Table view, the Board view, and the Roadmap view. Every concept we talk about today revolves around these three views. Let us start with the Table view, because it is the default, and honestly, it is the most robust for screen reader users.

**Jamie:** Table view sounds like a spreadsheet.

**Alex:** That is the perfect analogy. The Table view is a massive spreadsheet-style grid. Each row represents a single item, which could be an issue or a pull request. And we should define a pull request again really quickly. I love that name because you are literally requesting that someone pull your code changes into their project.

**Jamie:** And so the rows are the issues or pull requests. What are the columns?

**Alex:** The columns are fields. Title, Status, Assignee, Labels, Priority, and any custom fields you create. The Table view is best for bulk editing, sorting, and seeing many items at once.

**Jamie:** How do I move around this giant spreadsheet with my screen reader?

**Alex:** You can press the letter T to jump straight to the table data region. From there, you use your Up and Down arrow keys to move between rows, and your Left and Right arrow keys to move between columns in that row.

**Jamie:** What does the screen reader actually announce when I am moving through the rows?

**Alex:** If you are arrowing down through the rows, your screen reader will read a summary of that row. It might say something like, Fix keyboard trap in modal dialog, Status In Progress, Assignee Alice, Priority High.

**Jamie:** That is really efficient. But what if I want to actually edit one of those cells, like change the priority?

**Alex:** If you are using NVDA, you will want to use Browse mode to read the cell content, which you toggle with NVDA plus Space. When you find a cell you want to edit, you press NVDA plus Space again to switch to Application mode, and then press Space or Enter to activate the editor for that cell. If you are using JAWS, you press Enter to switch to application mode in the table.

**Jamie:** Oh, I love a good keyboard shortcut. Are there any others for the Table view?

**Alex:** Yes! If you are focused on the Title cell of an issue, you can press F 2 to edit the title inline, without ever leaving the table. But the most important key is Enter. If you press Enter on any row, it opens the item detail panel in a right sidebar. You can tab through all the fields for that issue in one vertical list, make your changes, and then press Escape to close the panel and pop right back into your table.


**Jamie:** Okay, so Table view is our heavy duty spreadsheet. What is the Board view?

**Alex:** The Board view uses Kanban-style columns. Kanban is a project management framework that focuses on visualizing work. Think of it like having three physical baskets on your desk. One basket is labeled To Do, one is In Progress, and one is Done. Each issue is a piece of mail. As you work on an issue, you move it from one basket to the next.

**Jamie:** That makes sense for visualizing a workflow. But wait, visually moving cards between columns usually means drag-and-drop. Drag-and-drop is notoriously terrible for accessibility. How do we handle that?

**Alex:** You hit the nail on the head. Drag-and-drop is not keyboard accessible in this view. But you do not need to drag anything. Remember that right sidebar detail panel I just mentioned?

**Jamie:** Yes, the one you open by pressing Enter.

**Alex:** Exactly. To move a card to a different column, you just tab to the card, press Enter to open the detail panel, and navigate to the Status field. You activate the Status dropdown, select your new column like In Progress, and press Escape. The card instantly moves to the new column.

**Jamie:** Oh, that is clever! You are just updating the underlying data, and the visual board updates automatically to match it.

**Alex:** Precisely. The columns in Board view are just visual representations of a specific field, usually the Status field. Change the field, change the column.

**Jamie:** That brings us to the third layout, the Roadmap view. What is that?

**Alex:** The Roadmap view is a horizontal timeline. Items appear as blocks spanning across their start and due dates. It is heavily used by product managers for release planning, or communicating timelines to stakeholders. If we stick to our analogies, the Roadmap is like a train schedule. It shows you when things are supposed to depart and arrive.

**Jamie:** How accessible is a visual timeline like that?

**Alex:** To be completely transparent, the Roadmap view is chart-based. While there is some basic navigation, the underlying data is what matters. For screen reader users, I always recommend treating the Roadmap as a visual summary for sighted colleagues, while you use the Table view for all of your actual planning and editing. Any dates you set in the Table view will automatically populate the Roadmap chart.


**Jamie:** Okay, so we have our views. But a project is useless without actual work in it. How do I add my issues and pull requests to this project?

**Alex:** From any project view, you can navigate to the bottom of a table or column and activate the button called Add item. When you do that, a text field appears. If you type the number sign, also known as the hash symbol, it instantly triggers a search of your repository issues and pull requests. You just type a keyword or the issue number, arrow down to the one you want, and press Enter.

**Jamie:** And that pulls the issue out of the repository and into the project?

**Alex:** Not quite! It links the issue to the project. The issue still lives in its home repository. If someone comments on it in the repository, you will see those updates. The project is just a lens for viewing the work.

**Jamie:** What if I have an idea for a feature, but I am not ready to create a formal issue in the repository yet? Sometimes I just want to jot down a quick note during a meeting.

**Alex:** That is the perfect time to use a Draft Issue.

**Jamie:** A draft issue? I have never heard of that.

**Alex:** Draft issues are unique to Projects. They live only inside the project board and do not belong to any repository. It is exactly like scribbling an idea on a napkin before you write the official document. To make one, you activate the Add item button, but instead of typing a hash symbol, you just type your idea in plain text and press Enter.

**Jamie:** So it just creates a text row in my table?

**Alex:** Yes. And later, when you are ready to make it official, you can open that draft row, navigate to the button called Convert to issue, and select which repository it should live in. It instantly transforms into a real GitHub issue.


**Jamie:** I love that napkin analogy. Okay, earlier you mentioned custom fields. You said this is where Projects version two really shines. What kind of fields can we create?

**Alex:** You can add fields far beyond the GitHub defaults. There are five main types of custom fields. Text fields for free-form notes, Number fields for things like story points or estimates, Date fields for deadlines, Single select fields for dropdown menus, and Iteration fields.

**Jamie:** Let us talk about Single select fields. I assume that is for things like priority levels?

**Alex:** Exactly. Let us say you want to categorize bugs. In the Table view, you scroll all the way right to the last column header, which is a Plus button. You activate that, choose Single select, and name the field Priority. Then you type your options, like P 0, P 1, and P 2, pressing Enter after each one. You save it, and now every item in your project has a Priority dropdown.

**Jamie:** That is so much cleaner than creating a dozen different labels for every possible priority. What about that last field type you mentioned, the Iteration field? What is an iteration?

**Alex:** An iteration is a time-boxed cycle of work. Many software teams call these Sprints. You might work in two-week sprints, where the goal is to finish a specific set of tasks before the cycle ends.

**Jamie:** So how does the Iteration field handle that? Do I have to manually type in the dates for every single sprint?

**Alex:** Nope, GitHub handles the math. You create an Iteration field, tell it your sprints are two weeks long, and pick a start date. GitHub automatically generates the current sprint, the next sprint, and the ones after that. Then you just assign your issues to an iteration using that field, just like you would assign a priority.


**Jamie:** Okay, so if I have a massive project board with custom fields, priorities, and sprints, it is going to get really crowded. How do I find exactly what I need without reading through a hundred rows?

**Alex:** That is where Views and Filters come in. A view is a saved configuration of your layout, your filters, and your sorting. You can have many different view tabs at the top of your project.

**Jamie:** Like asking a librarian for exactly the books you need, and having them keep that specific stack on a desk for you?

**Alex:** Perfect analogy. Let us say you only want to see your own work. You can navigate to the filter bar and type a query. The syntax is very similar to standard GitHub search. You would type assignee colon, followed by the at symbol, and the word me. Assignee colon at me.

**Jamie:** Oh, I use that all the time in issue searches. Can I combine them? Like, show me only the bugs assigned to me that are currently in progress?

**Alex:** Absolutely. You would type assignee colon at me, space, status colon quote In Progress quote. You can also filter by custom fields, labels, or item types. For example, typing is colon issue will hide all the pull requests so you can just focus on issues.

**Jamie:** And if I get this filter perfectly tuned, I can save it as a View?

**Alex:** Yes. You navigate to the button called New view in the tab bar, set up your layout and filters, and it saves automatically. You can rename the tab to something like My Active Bugs. Every time you open the project, that tab is waiting for you.


**Jamie:** Alright, Alex, you promised we would talk about tracking work across multiple repositories. How does that work?

**Alex:** This is called a cross-repository project, and it is a game changer for open source maintainers or teams working on complex software. A single project can link to multiple repositories. It is like having a master control room that monitors several different factories at once.

**Jamie:** How do I set that up?

**Alex:** You navigate to the project overflow menu, which is labeled with three dots in the top right. You select Settings, then Manage access, and then Add repository. You can search for and link as many repositories as you need.

**Jamie:** But if I have issues from five different repositories in one table, how do I know where an issue came from?

**Alex:** You use the Repository field! In your Table view, you can make the Repository column visible. Then, you can filter by it or even group by it. You can tell the table to visually group all the rows by repository, so you have a section for the frontend repository, a section for the backend, and so on.


**Jamie:** Okay, we have reached the part I have been waiting for. Automations. You said I could hire a virtual assistant to move my papers around.

**Alex:** I did! Projects version two has native automation rules built right in. You do not need to write any complex scripts. You find them by opening that same project overflow menu and selecting Workflows.

**Jamie:** What kind of workflows are we talking about?

**Alex:** The built-in ones handle the repetitive status updates. For example, there is a workflow called Item closed. If you enable it, anytime you close an issue or merge a pull request in your repository, GitHub automatically finds that item in your project and changes its status field to Done.

**Jamie:** That is amazing. I always forget to update my project boards after I merge code. What else can it do?

**Alex:** The most powerful built-in workflow is called Auto-add to project. This is a lifesaver for cross-repository projects. Let us say you are tracking accessibility bugs across your entire organization.

**Jamie:** Okay, so I have a project board set up.

**Alex:** Right. You go to Workflows, select Auto-add to project, and turn it on. You configure a filter, like label colon accessibility. From that moment on, anytime anyone files a new issue with the label accessibility in any of your linked repositories, GitHub automatically adds it to your project board. No manual triage required.

**Jamie:** Wow. That literally does save hours of work. I wish I had known that when I started managing my first open source repository. Does it integrate with GitHub Actions for even more complex stuff?

**Alex:** It does. Projects version two has a full GraphQL API. Using GitHub Actions, which we cover deeply in the advanced appendices, you can do things like automatically assign issues to specific people based on which repository they came from, or automatically set due dates. The possibilities are endless.


**Jamie:** Before we wrap up, I want to ask about our favorite coding companion. Does GitHub Copilot know anything about our project boards?

**Alex:** It absolutely does, through Accessibility Agents. There is a specific command you can use in VS Code Copilot Chat called slash project dash status.

**Jamie:** Slash project dash status. What happens when I type that?

**Alex:** You type slash project dash status followed by the repository name. Copilot will reach out to GitHub and give you a live text overview of the project board directly in your VS Code editor, without you ever needing to open a browser.

**Jamie:** What kind of information does it give me?

**Alex:** It gives you a breakdown of how many items are in each column, who they are assigned to, and their average age. It is incredibly smart. It will specifically flag attention items, like issues that are blocked, or stale items that have been sitting in the In Progress column for more than seven days with no activity.

**Jamie:** That sounds perfect for checking what I need to work on on a Monday morning, or preparing for a standup meeting.

**Alex:** Exactly. It keeps you in the flow of your coding environment while still staying on top of project management.


**Jamie:** Alex, this has been an incredible deep dive. I feel like I am ready to upgrade my entire workflow from Classic to version two.

**Alex:** I am glad to hear it! Let us summarize with a few concrete takeaways for our listeners. First, remember that the Table view is your best friend. It is a highly accessible, spreadsheet-style interface where you can use keys like T to jump to the table, and Enter to open the item details panel to edit fields quickly.

**Jamie:** Second takeaway: you do not need to use drag-and-drop on a Kanban board! If you are in the Board view, just press Enter on a card and change its Status field in the sidebar to move it to a different column.

**Alex:** Third, take advantage of Custom Fields. Do not limit yourself to standard labels. Use single-select fields for priorities, number fields for estimates, and iteration fields to manage your two-week sprints.

**Jamie:** And fourth, turn on those Workflows! Set up the Auto-add workflow to automatically pull issues into your project based on their labels, and use the Item closed workflow to automatically mark things as Done. Let the robots do the busy work.

**Alex:** Perfectly said. That wraps up Episode 26. In our next episode, we are shifting gears slightly to talk about something crucial for every open source contributor: Code Reviews and Pull Request Etiquette. We will learn how to leave accessible review comments, how to request changes, and how to handle feedback on your own code.

**Jamie:** I definitely need that one. Thanks for listening, everyone! We will catch you in the next episode.

**Alex:** Keep coding, and keep collaborating. See you next time.

</details>


### Episode 27: Advanced Search

GitHub search query language, qualifiers, and filtering for issues, PRs, and code.

Based on: [Appendix J: Advanced Search](docs/appendix-n-advanced-search.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep27-advanced-search.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep27-advanced-search.mp3">Download Episode 27 (MP3)</a>
</audio>

[Download Episode 27 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep27-advanced-search.mp3)

<details>
<summary>Read Transcript - Episode 27: Advanced Search</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode 27, Advanced Search. I am Alex, and I am thrilled to be back with you for another deep dive into making GitHub work for us, rather than the other way around. Today, we are unlocking what I consider to be a developer superpower.

**Jamie:** And I am Jamie. I am so ready for this one. When I started learning GitHub about two years ago, I spent so much time just tabbing through endless lists of issues, trying to find the one bug I was supposed to be working on.

**Alex:** That is a nearly universal experience, Jamie. Most people start by navigating to a repository, moving to the section called Issues, and then tabbing through the pagination links at the bottom of the page. Next page, next page, next page. It is tedious.

**Jamie:** Extremely tedious. Especially when you have your screen reader reading out every single issue title, author, and timestamp along the way.

**Alex:** Exactly. And that brings us to today's topic. We are going to learn how to bypass all of that navigation by using GitHub's advanced search query language. For screen reader users in particular, using the search bar with precise text commands is exponentially faster and more accessible than navigating filter dropdowns, checking boxes, and waiting for the page to dynamically reload.

**Jamie:** I love anything that saves me keystrokes. Before we jump in, let us quickly remind everyone of the prerequisites. You should be familiar with the basic concepts of issues and pull requests, which we covered back in episodes 12 and 15. If you know what an issue is, and you know what a pull request is, you are perfectly positioned for today.


**Alex:** Let us start with the interface. The global search bar is located at the top of nearly every page on GitHub. But you do not need to manually navigate your cursor to it. From almost anywhere on the site, you can simply press the forward slash key.

**Jamie:** Just the forward slash?

**Alex:** Just the forward slash key. When you press it, your focus is instantly moved into the search input field. You can then type your query and press the Enter key. When the results load, they are organized into different categories.

**Jamie:** Right, and those categories are called search scopes, correct?

**Alex:** That is right. GitHub does not just search one bucket of data. It searches across multiple scopes. The main scopes are repositories, code, issues, pull requests, users, and topics. When you run a global search, GitHub searches across everything, but the results page lets you navigate to specific sections to narrow down what you are looking for.

**Jamie:** So how does global search differ from in-repository search? Because I have noticed that if I am already inside a project, the search behaves differently.

**Alex:** That is a great observation. Think of global search like walking into a massive department store and shouting, where are the shoes. You might get directed to men's shoes, women's shoes, athletic shoes, or children's shoes across the entire building. That is global search. But if you are already standing in the athletic department, and you ask the same question, the system assumes you only want athletic shoes.

**Jamie:** So if I navigate to the accessibility-agents repository, and then I press the forward slash key to focus the search bar, it automatically scopes my search to just that repository.

**Alex:** Exactly. GitHub automatically inserts a piece of text into the search bar for you. It will say repo, a colon, and then the name of the repository. This brings us to the core concept of today's episode, which is qualifier syntax.


**Jamie:** Qualifier syntax. That sounds like something out of a grammar textbook.

**Alex:** It sounds a bit dry, but it is actually very simple. A qualifier is just a filter. And the syntax, or the rules for typing it, always follows a specific pattern. It is a key, followed immediately by a colon, followed immediately by a value. No spaces in between.

**Jamie:** Key, colon, value. So if I want to search for a specific language, language is the key, and python is the value. I would type language, colon, python.

**Alex:** Spot on. And that rule about no spaces is the single most common stumbling block. If you type language, colon, space, python, GitHub thinks you are searching for the literal word python in the text, rather than filtering the results by the programming language.

**Jamie:** Oh, I have definitely done that. I would type author, colon, space, Jamie, and wonder why nothing showed up.

**Alex:** We have all been there. So, key, colon, value, no spaces. Let us look at how we apply this to issues. Issues are essentially the to-do list of a GitHub project. When you are participating in a workshop or a hackathon, finding the right issue is step one.

**Jamie:** What are the most common issue qualifiers we should know?

**Alex:** The most fundamental ones define the state of the issue. You will use the key called is. So you type is, colon, open, to find only open issues. Or is, colon, closed, to find issues that have already been resolved.

**Jamie:** That makes sense. What about finding issues that have a specific tag, like the good first issue tag we use in the workshop?

**Alex:** For that, we use the label qualifier. You type label, colon, and then the name of the label. Now, if the label name has spaces in it, like good first issue, you must wrap the value in quotation marks. So you type label, colon, quote, good first issue, quote.

**Jamie:** Okay, let me recap that. If I want to find an open issue that is a good first issue, I type is, colon, open, space, label, colon, quote, good first issue, quote.

**Alex:** Perfect. Notice how you put a space between the two different qualifiers. That is exactly right. You string them together with spaces to combine the filters.

**Jamie:** What if I want to find issues that I created? Or issues that someone else is working on?

**Alex:** You have two great qualifiers for people. The first is author, which filters by who created the issue. The second is assignee, which filters by who is currently assigned to work on it.

**Jamie:** So I could type author, colon, and my username?

**Alex:** You could, but GitHub gives us a brilliant shortcut. Instead of typing your username, you can type the at symbol followed by the word me. So author, colon, at sign, me. This is fantastic because you can share that exact query with anyone, and it will automatically filter for whoever is currently logged in.

**Jamie:** Oh that is clever! I wish I had known that when I started. I used to type my full username out every single time. So if I want to find open issues assigned to me, I type is, colon, open, space, assignee, colon, at sign, me.

**Alex:** Exactly. You can also use the milestone qualifier. A milestone is a way to group issues together for a specific release or a sprint. If you are working on the summer release, you might type milestone, colon, quote, summer release, quote.

**Jamie:** OK that sounds like a lot of steps and a lot of syntax to memorize.

**Alex:** It does! But here is the thing, you do not have to memorize them all at once. You are just learning a new way to ask for what you want. Think of it like ordering at a restaurant. You do not just say food. You say, item, colon, burger. Temperature, colon, medium. Side, colon, fries. You are just giving GitHub your exact order.


**Alex:** Let us move over to pull requests. A pull request, and I love that name because you are literally requesting that someone pull your changes into their project, has its own set of qualifiers.

**Jamie:** Because pull requests are basically issues that contain code, right?

**Alex:** Exactly. In fact, under the hood, GitHub treats a pull request as a type of issue. That means all the issue qualifiers we just talked about, like is, colon, open, and author, colon, at sign, me, work for pull requests too. But to ensure you only get pull requests and not regular issues, you add the qualifier is, colon, pr. P R stands for pull request.

**Jamie:** So if I want to find my open pull requests, I type is, colon, pr, space, is, colon, open, space, author, colon, at sign, me.

**Alex:** You got it. Now, let us look at qualifiers unique to pull requests. Often, you want to know if a pull request is ready to be merged, or if it is still a work in progress. You can use draft, colon, true, to find pull requests that are marked as drafts.

**Jamie:** And if I am a maintainer, and I want to find pull requests that have been reviewed and approved, how do I do that?

**Alex:** You use the review qualifier. You type review, colon, approved. This filters the list to only show pull requests where another developer has formally approved the code.

**Jamie:** That is incredibly useful for clearing out a backlog. What about the branches? I know when I make a pull request, I am asking to merge my feature branch into the main branch. Can I search based on those branch names?

**Alex:** Yes, and this brings us to two important technical terms, head and base. Let us define head and base using an analogy. Think of a pull request like a train arriving at a train station. The head is the moving train. It contains the new passengers, or in our case, the new code commits. The base is the station platform. It is the destination where the train is arriving.

**Jamie:** So the head is my feature branch, and the base is the main branch.

**Alex:** Exactly. If you want to find all pull requests that are targeting the main branch, you type base, colon, main. If you want to find pull requests coming from a specific feature branch, you type head, colon, feature dash accessibility.


**Jamie:** Alright, we have covered issues and pull requests. But what if I am looking for actual code? Like, what if I want to find every time a specific function is used in a project, so I can see an example of how to write it?

**Alex:** Searching code is where this system truly shines. GitHub recently completely overhauled their code search engine, and it is blazingly fast. To search code, you usually want to scope it to a specific repository or organization first, otherwise you will search all the public code in the world.

**Jamie:** Which is a lot of code.

**Alex:** A massive amount. So you start with the repo qualifier. You type repo, colon, followed by the organization name, a forward slash, and the repository name. For example, repo, colon, community dash access, forward slash, accessibility dash agents. Then, you can just type the word or function name you are looking for.

**Jamie:** So if I am looking for the term aria dash hidden, I just type repo, colon, community dash access, forward slash, accessibility dash agents, space, aria dash hidden.

**Alex:** Exactly. But we can get much more precise. We can use the language qualifier to only search inside specific programming languages. Language, colon, javascript, or language, colon, python.

**Jamie:** What if I only want to search inside markdown files, like documentation?

**Alex:** Then you use the extension qualifier. You type extension, colon, m d. M d is the file extension for markdown. You can also use the path qualifier to only search inside a specific folder. For example, path, colon, docs, forward slash. That restricts your search to only files located inside the docs directory.

**Jamie:** Let me put that all together. If I want to find the word keyboard inside any markdown file in the docs folder of my repository, I would type repo, colon, my name, forward slash, my project, space, extension, colon, m d, space, path, colon, docs, forward slash, space, keyboard.

**Alex:** That is a perfect query. You are narrowing the funnel step by step. First the repository, then the file type, then the folder, and finally the keyword. Your screen reader will then announce the number of code results found, and you can navigate through the actual snippets of code directly from the search results page.


**Jamie:** This is making so much sense. We have talked about states, labels, people, and code. What about time? Sometimes I want to find issues that have been sitting around for a long time, or maybe pull requests that were opened just this week.

**Alex:** Date range qualifiers are incredibly powerful, but they do require a specific format. You use the keys created, updated, or closed. And the value must be a date formatted as year, dash, month, dash, day. Four digits for the year, two for the month, two for the day.

**Jamie:** So for January first, twenty twenty five, I would type twenty twenty five, dash, zero one, dash, zero one.

**Alex:** Exactly. But you usually do not want things from exactly one day. You want things before or after a date. To do this, we use the greater than and less than mathematical symbols.

**Jamie:** Oh, this is where the syntax gets really strict.

**Alex:** It does, but once you type it a few times, it becomes muscle memory. If you want to find issues created after January first, twenty twenty five, you type created, colon, the greater than sign, twenty twenty five, dash, zero one, dash, zero one.

**Jamie:** And the greater than sign means after, because the dates are moving forward in time.

**Alex:** Correct. And if you wanted issues updated before January first, twenty twenty six, you would type updated, colon, the less than sign, twenty twenty six, dash, zero one, dash, zero one.

**Jamie:** What if I get hundreds of results? Can I change the order they are displayed in? Because by default, GitHub seems to show the most relevant ones, but sometimes I just want the newest ones at the top.

**Alex:** You absolutely can. And this is another huge time saver for screen reader users, because you do not have to navigate to a sort dropdown menu. You just add a sort qualifier to your text. You type sort, colon, the field you want to sort by, a dash, and then either asc for ascending, or desc for descending.

**Jamie:** Ascending means going up, and descending means going down. So if I want the newest items first, I want the creation dates going down from newest to oldest.

**Alex:** Right. So you type sort, colon, created dash desc. If you wanted the oldest items first, you would type sort, colon, created dash asc.


**Jamie:** Okay, Alex, I have to ask. I know a lot of our listeners, myself included, spend a lot of time in the terminal using the command line interface. Can we do all of this search magic without ever opening a web browser?

**Alex:** I am so glad you asked. Yes. The GitHub command line tool, which you access by typing g h in your terminal, has a dedicated search command. You just type g h, space, search, space, issues, and then you can pass in all the same qualifiers we just discussed.

**Jamie:** Wait, really? So I can type g h, space, search, space, issues, space, assignee, colon, at sign, me, space, is, colon, open?

**Alex:** Yes, exactly like that. And it will print a beautifully formatted list right in your terminal, which your screen reader will read out instantly. For many blind developers, using g h search is the absolute fastest way to find an issue, grab its identification number, and start working on it, entirely bypassing the web interface. You can search issues, pull requests, and repositories right from the command line.

**Jamie:** That is a game changer. But whether I am using the web browser or the terminal, typing out these massive queries every single day seems like it would get tiring. Is there a way to save a search? Like building a personal search library?

**Alex:** This is an area where GitHub's web interface is slightly lacking. They do not have a native, built in button that says save this search to your profile. However, there is a very simple workaround. Every time you run a search on the GitHub website, your entire query is encoded into the web address, the URL, at the top of your browser.

**Jamie:** Oh, so I can just use my web browser's bookmark feature!

**Alex:** Precisely. You construct your perfect, complex query once. Maybe it is finding all open, unassigned accessibility bugs in your organization. You run the search, ensure the results look right, and then you just bookmark that page in your browser. You can name the bookmark Open Accessibility Bugs. The next time you want to run that search, you just open your bookmarks and activate that link. It will run the search live against the current data.

**Jamie:** That is so practical. I am definitely going to create a bookmark folder just for my daily GitHub workflows. I will have one for my open pull requests, one for issues I need to review, and one for good first issues in the workshop repository.


**Alex:** That is a fantastic strategy, Jamie. And that brings us to the end of our deep dive into advanced search. We covered a massive amount of ground today, but remember, you do not need to memorize every single qualifier right now.

**Jamie:** Right, the goal is just to know what is possible, so when you are stuck looking for something, you know there is a better way to find it.

**Alex:** Exactly. Let us summarize our key takeaways for today. First, you can jump directly to the global search bar from almost anywhere on GitHub by simply pressing the forward slash key. Second, all qualifiers use a strict key, colon, value syntax with absolutely no spaces. Third, you can use shortcuts like the at symbol followed by the word me to easily find your own issues and pull requests.

**Jamie:** Fourth, code search lets you find specific functions or keywords across an entire project, and you can narrow it down using the language and path qualifiers. And fifth, you can save your most complex searches by simply bookmarking the results page in your web browser.

**Alex:** Perfectly summarized. I highly encourage everyone to spend ten minutes today just experimenting with the search bar. Try finding an issue you worked on last month. Try finding a piece of code you wrote. The more you use these qualifiers, the more natural they will feel.

**Jamie:** I am going to go set up my bookmarks right now. What are we covering in the next episode?

**Alex:** In episode 28, we are moving from finding things to reviewing things. We will be covering the pull request review interface, including how to navigate inline code comments, how to leave a review, and how to read a diff efficiently with a screen reader. It is a critical skill for open source collaboration.

**Jamie:** I cannot wait. I always find reviewing code a bit intimidating, so I am looking forward to breaking it down.

**Alex:** We will make it approachable, I promise. Thank you all for listening to Gitt Going with GitHub. Keep practicing your queries, and we will see you in the next episode.

</details>


### Episode 28: Branch Protection and Rulesets

Required reviews, status checks, rulesets, and diagnosing blocked merges.

Based on: [Appendix K: Branch Protection and Rulesets](docs/appendix-o-branch-protection.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep28-branch-protection.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep28-branch-protection.mp3">Download Episode 28 (MP3)</a>
</audio>

[Download Episode 28 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep28-branch-protection.mp3)

<details>
<summary>Read Transcript - Episode 28: Branch Protection and Rulesets</summary>

#### Transcript

**Alex:** Welcome back to Gitt Going with GitHub. This is episode 28, Branch Protection and Rulesets. I am Alex, here to guide you through the wonderful, and sometimes slightly rigid, world of repository security.

**Jamie:** And I am Jamie. I am so glad we are talking about this today because I vividly remember the first time I tried to contribute to an open source project. I did all the work, I pushed my branch, I created my pull request, and then I navigated to the bottom of the page to merge it. But I could not. The merge button was just completely unavailable to me. There were all these messages about failing checks and required reviews. I honestly panicked. I thought I had broken their entire repository.

**Alex:** I promise you, you did not break anything. What you ran into is exactly what we are covering today. That was branch protection doing its job. Think of branch protection like the velvet rope at a museum. You are absolutely welcome to come in, look around, and even sketch your own copy of the artwork. But if you want to actually alter the painting on the wall, there is a very strict process you have to follow, and a curator has to approve it. Branch protection exists to prevent accidental changes to the main branch of a repository.

**Jamie:** That makes so much sense. Because the main branch is usually the production code, right? It is the version of the software that people are actually downloading or the website that is live right now. If I could just push my experimental changes straight into main, I could take down the whole project.

**Alex:** Exactly. Before branch protection existed, if you had write access to a repository, you could just push directly to main. And people make mistakes. We type the wrong command, or we push a branch that is not finished yet. Branch protection is a safety net. It is a set of rules, configured by the repository administrators, that dictate exactly what must happen before code is allowed to be merged into a protected branch.


**Jamie:** So let us break down what those rules actually look like. We mentioned the classic approach to branch protection rules. How does that work?

**Alex:** In the classic approach, a repository administrator creates a rule for a specific branch, usually main. You can think of this rule like a pre-flight checklist on a clipboard. The pilot cannot take off until every single item on that clipboard is checked off.

**Jamie:** And the most common item on that checklist is probably a required pull request review, right?

**Alex:** Yes, absolutely. A pull request, as a quick reminder, is when you are literally requesting that the maintainers pull your changes into their project. When a branch has a required review rule, it means another human being has to look at your code and explicitly approve it. The rule might say you need one approving review, or maybe two or three for a really critical project.

**Jamie:** I have definitely seen that. I will navigate to the merge box at the bottom of the pull request page, and my screen reader will read something like, one review required. So I know I have to request a review from someone on the team. But I have a question about this. What happens if I get an approval, but then I realize I made a typo, so I push a new commit to fix it. Does my approval stay?

**Alex:** That depends on how the maintainer configured the rule, but usually, the answer is no. There is a setting called dismiss stale reviews. If that is turned on, the moment you push a new commit, any existing approvals are wiped out, and you have to get a fresh review.

**Jamie:** Oh, that is clever. Frustrating if you are in a hurry, but clever.

**Alex:** It is a great security feature. Think about it like having a co-pilot double-check your flight coordinates. If they approve the coordinates, but then you go in and change the destination by a few degrees, you want them to verify the new coordinates too. Otherwise, someone could get an approval on a perfectly safe piece of code, and then sneak in a malicious change right before merging.

**Jamie:** Okay, so required reviews are one part of the checklist. What else is on there? I know I always run into status checks.

**Alex:** Required status checks are huge. This is where Continuous Integration, or CI, comes in. CI refers to automated scripts that run every time you push code. The branch protection rule can say, these specific automated tests must pass before this pull request can be merged.

**Jamie:** So this is like an automated grammar checker that runs before you are allowed to publish an article. Or an automated car wash that your car has to go through before it goes on the showroom floor.

**Alex:** Perfect analogies. You might have a status check that compiles the code to make sure there are no syntax errors. You might have a check that runs the entire automated test suite. You might even have an accessibility-check that scans your user interface changes for basic accessibility violations. If the rule says those checks are required, the merge button will literally be blocked until every single one of them reports back with a success status. If even one test fails, you cannot merge.


**Jamie:** Okay, what about keeping things up to date? I sometimes get a message that says my branch is out of date with the base branch.

**Alex:** Right. That is another very common branch protection rule. It requires your branch to be entirely up to date with the main branch before you can merge. Let us say you created your branch on Monday. You work on it for a few days. But on Tuesday and Wednesday, other people merged their own changes into main. By Thursday, your branch is missing all the new stuff that was added.

**Jamie:** And if I just merge my code anyway, I might accidentally overwrite their changes, or introduce a bug because my code was not tested alongside their new code.

**Alex:** Precisely. So this rule blocks you from merging until you bring those new changes from main into your branch. You usually do this by activating the Update branch button in the merge box, which brings all the new main commits into your working branch. Then your automated status checks will run one more time to make sure your code still works with the new updates.

**Jamie:** That makes a lot of sense. Now, there is another rule we should talk about, because we covered the prerequisite for it back in our authentication episode. Requiring signed commits.

**Alex:** Yes, requiring signed commits is becoming very common, especially in open source. A signed commit includes cryptographic proof of your identity, usually using an SSH key or a GPG key. It proves that you are actually the person who wrote the code, and not someone impersonating you.

**Jamie:** Like putting a heavy wax seal with your family crest on an envelope, instead of just writing your return address on it.

**Alex:** Exactly. Anyone can write an address, but only you have the stamp for the wax seal. If a repository has a rule requiring signed commits, and you push a commit without a signature, the merge will be blocked. The error will say commits must have verified signatures. You will have to go back to your command line, configure commit signing, and rewrite those commits to include your signature.

**Jamie:** Which, speaking from experience, can be a little tricky if you are new to Git. If you ever run into that, definitely go back and listen to our episode on Git Authentication for a refresher. Okay, is there anything else in the classic branch protection rules?

**Alex:** There is one more major one, which is restricting who can push to the branch. You can set a rule that says, absolutely nobody is allowed to push directly to main, except for the lead maintainer, or maybe a specific release bot.

**Jamie:** Like having keycard access to the server room. Everyone can work in the building, but only the IT administrators have the badge that opens that specific door.

**Alex:** Exactly. For everyone else, they must use a pull request.


**Jamie:** Okay, so that is classic branch protection. But the title of this episode is Branch Protection and Rulesets. What is a ruleset, and how is it different?

**Alex:** Repository Rulesets are the modern, next generation approach to protecting your code. GitHub introduced them recently because classic branch protection, while great, had some limitations as companies and projects grew larger.

**Jamie:** What kind of limitations?

**Alex:** Well, classic branch protection rules are applied on a single repository, to a single branch name. If your company has five hundred repositories, and you want to ensure every single one of them requires two reviews before merging to main, you used to have to go into all five hundred repositories individually and set up that rule.

**Jamie:** Oh wow. That sounds like an absolute nightmare for a system administrator.

**Alex:** It was. And if the company policy changed to require three reviews, you had to do it all over again. Rulesets solve this by operating at the organization level. You can create one organization ruleset that says, require two reviews on the main branch for every repository we own.

**Jamie:** That is so much better. It is like upgrading from having a physical padlock on every single door in an office building, where you have to manually change the lock on every door if someone loses a key. Upgrading to a programmable smart building system where you can just update the access policy from one central computer.

**Alex:** That is a brilliant analogy. Centralized control is a huge benefit of rulesets. Another major difference is how rulesets target branches. With rulesets, you can use tag and branch patterns. Instead of just protecting the branch named exactly main, you can create a pattern using an asterisk as a wildcard.

**Jamie:** So I could write a rule for release dash asterisk, and it would automatically protect branches named release dash version one, release dash version two, and so on?

**Alex:** Exactly. Any branch that starts with the word release and a dash will automatically inherit all the protections in that ruleset. You do not have to create a new rule every time you cut a new release branch.

**Jamie:** That is incredibly powerful. Are there other differences between classic rules and the new rulesets?

**Alex:** Yes, two very important ones. Bypass lists and enforcement modes. Let us talk about bypass lists first. In classic branch protection, a rule is a rule. If you require a status check to pass, it must pass. But sometimes, you have a special automated bot that manages your releases, and you want that bot to be able to bypass the rules and merge directly.

**Jamie:** Like a VIP list at a club. The bouncer makes everyone else wait in line and check their coats, but the VIPs get to walk right past the rope. Or an emergency override key for the fire department.

**Alex:** Exactly. Rulesets allow you to configure a bypass list. You can specify exact users, teams, or automated apps that are allowed to bypass the rules. And when they do bypass a rule, GitHub logs it in an audit trail so you can see exactly who bypassed the system and when.

**Jamie:** And what about enforcement modes? You mentioned that was the other big difference.

**Alex:** Right. With classic rules, the rule is always active. It always blocks you. With rulesets, you have three modes. Active, Evaluate, and Disabled. Active means the rule is fully enforced and will block merges. Disabled means the rule is turned off. But Evaluate mode is the really interesting one.

**Jamie:** Evaluate mode? Does that mean it just watches what happens without actually blocking anything?

**Alex:** Exactly. It is essentially a testing mode. Let us say you want to introduce a new rule requiring all commits to be signed, but you are worried it might disrupt your team's workflow because people do not have their keys set up yet. You can turn the ruleset on in Evaluate mode. It will not block anyone from merging. But it will quietly log every time someone merges a pull request with unsigned commits.

**Jamie:** Oh, I love that. So you can look at the logs after a week and say, okay, fifty percent of our team is still pushing unsigned commits. We need to do a training session before we switch this rule to Active. It gives you data without causing a crisis.

**Alex:** Exactly. It makes rolling out security changes much less stressful for administrators. Now, keep in mind, as a contributor or a workshop participant, you will probably encounter both systems. Many repositories still use classic branch protection rules because they have been around forever. Newer repositories, or large enterprise organizations, are moving toward rulesets. But for you, as the developer trying to merge a pull request, the experience is largely the same. The merge button will be blocked until you meet the requirements.


**Jamie:** Okay, let us talk about that experience. Because that is the most stressful part for a learner. You open your pull request, you think you are done, and then you hit a wall. If my merge is blocked, how do I actually figure out what is wrong, especially using a screen reader?

**Alex:** This is such an important skill. The first thing to know is that GitHub tells you exactly what is wrong. It does not hide it. All the diagnostic information is located in the merge box, which is near the bottom of the pull request page.

**Jamie:** So if I am using my screen reader, how do I get there efficiently? The pull request page can be really long if there is a big conversation happening.

**Alex:** There are a few ways. The quickest way is often to use the H key to jump through the headings on the page until you hear something related to merging. The merge box is contained within a section that usually has a heading like, Merging is blocked, or This branch has no conflicts.

**Jamie:** If I am using NVDA, I will sometimes press NVDA plus F7 to open the elements list, filter by headings, and just type the word merge to jump straight to that section.

**Alex:** That is a fantastic technique. Once your focus is on that heading, you can just use your down arrow key to read the contents of the merge box. GitHub provides a checklist of exactly what is passing and what is failing. As you arrow down, you might hear, Review required. At least one approving review is required. Or you might hear, Some checks were not successful.

**Jamie:** Okay, so let us say I hear that some checks were not successful. How do I find out which test failed? Because just knowing a test failed does not help me fix my code.

**Alex:** Right. You need to read the diagnostic codes, just like a mechanic reading the engine light on a dashboard. In that same merge box area, you can press the Tab key until you reach a button or link that says, Show all checks. Press Enter to activate it. This expands a list of every single status check that ran against your pull request.

**Jamie:** And then I just tab through that list?

**Alex:** Yes. As you tab or arrow through the expanded list, your screen reader will announce the name of each check, and its status. It will say something like, build process, successful. Linting, successful. Unit tests, failing.

**Jamie:** And when I find the failing one, how do I see why it failed? Is there a log file?

**Alex:** Yes. Right next to the status of the failing check, there is a link that says Details. When you press Enter on the Details link, you will navigate away from the pull request page and into the specific log page for that check.

**Jamie:** I have found those log pages can be a bit overwhelming. They are basically just giant text dumps of terminal output.

**Alex:** They can be, but they follow a predictable structure. When the log page loads, press the H key to jump to the Summary heading. Arrow down from there to read a high-level overview of what failed. If you need to read the raw log output, it is usually presented in a pre-formatted text block or a series of expandable accordions. You can tab to the specific step that failed, press Enter to expand it, and then use your down arrow key to read the terminal output line by line. Look for words like error or exception.

**Jamie:** That is super helpful. It sounds like a lot of steps, but it really is just a process of elimination. Jump to the merge box, read the checklist, expand the checks, find the failure, open the details, read the log.

**Alex:** Exactly. And I want to normalize this. Having a blocked pull request does not mean you are a bad developer. It happens to senior engineers every single day. A linting check fails because they forgot a semicolon. A test fails because they missed an edge case. Branch protection is not a punishment. It is an automated assistant helping you catch things before they become real problems in production.

**Jamie:** I love that reframing. It is not a bouncer kicking you out of the club. It is a friendly assistant saying, hey, your tie is crooked, let us fix that before you go on stage.

**Alex:** Exactly! Now, what if you check the merge box, and all the automated checks are passing, but the merge is still blocked. What else could it be?

**Jamie:** Well, based on what we talked about earlier, it could be that I need a review. I would hear, review required. In that case, I need to navigate to the right sidebar, find the Reviewers section, and request a review from a maintainer.

**Alex:** Correct. What else?

**Jamie:** It could be the out of date warning. The screen reader would say, this branch is out of date with the base branch. I would just need to find the Update branch button in that same merge box and activate it.

**Alex:** Spot on. And if you hear, commits must have verified signatures, you know you need to go back to your terminal and sign your work. The merge box is your single source of truth for understanding exactly what the repository rules require from you.


**Jamie:** So, as we wrap up, I am curious about how these rules look in the real world. Do most repositories have all of these rules turned on?

**Alex:** It completely depends on the context. Let us look at a few common configurations. If you are working on a small team, maybe three or four developers building a startup product, the rules are usually pretty light. It is like a local coffee shop. You might have a rule that requires one approving review, and maybe a basic status check to make sure the code compiles. You want to move fast, and you trust your small team.

**Jamie:** That makes sense. You do not need a massive security apparatus for four people sitting in the same room. What about an open source project?

**Alex:** An open source project is more like a busy public library. Anyone in the world can walk in and suggest changes. So the rules are much stricter. You will almost certainly see requirements for multiple reviews from core maintainers. You will see extensive automated testing, because the code has to work on many different operating systems. And you will very often see a requirement for signed commits, to prevent bad actors from submitting malicious code under someone else's name.

**Jamie:** Right, because you do not personally know the people submitting the pull requests. You have to rely on the automated rules to verify their identity and their code quality.

**Alex:** Exactly. And finally, you have the enterprise configuration. Think of a massive banking network. Thousands of developers, strict regulatory compliance, and huge financial risk. In an enterprise, you will see complex organization-level Rulesets. They will enforce multiple reviews, extensive security scanning, accessibility checks, and strict branch naming conventions. They will use bypass lists heavily to allow their automated deployment bots to do their jobs, while strictly locking down human access.

**Jamie:** It is amazing how flexible the system is. It scales from a tiny startup to a massive bank, all using the exact same underlying concepts.

**Alex:** It really is. And as a developer, your job is not necessarily to configure all of these rules, unless you are the repository administrator. Your job is simply to understand that these rules exist, respect the velvet rope, and know how to read the merge box to satisfy the requirements.


**Jamie:** This has been incredibly clarifying. I feel like I understand the why behind all those blocking messages now. Let us summarize the key takeaways for our listeners today. First, branch protection exists to prevent accidental or unverified changes from entering the main branch. It is a safety net, not a punishment.

**Alex:** Second, classic branch protection uses rules tied to a specific branch in a single repository. Common rules include requiring pull request reviews, requiring automated status checks to pass, forcing branches to be up to date, and requiring signed commits.

**Jamie:** Third, Repository Rulesets are the modern upgrade. They allow administrators to apply rules across entire organizations, use wildcards to protect multiple branches at once, set up bypass lists for VIP access, and use Evaluate mode to test rules before enforcing them.

**Alex:** And finally, when your merge is blocked, do not panic. Navigate to the merge heading using your screen reader, read the checklist, expand the status checks, and read the logs. The merge box will always tell you exactly what you need to do to move forward.

**Jamie:** I am definitely going to be less intimidated the next time I see a grayed out merge button. So, what are we covering in the next episode?

**Alex:** Next time, we are going to dive deeper into the actual review process. We have talked about requiring reviews, but how do you actually leave one? We will cover how to navigate a pull request diff, leave inline comments, and officially approve or request changes on someone else's code.

**Jamie:** That is going to be great. I cannot wait to learn how to be a good reviewer. Thanks for listening, everyone, and we will catch you in the next episode of Gitt Going with GitHub.

</details>


### Episode 29: GitHub Security Features

Dependabot, secret scanning, code scanning, and private security advisories.

Based on: [Appendix L: GitHub Security Features](docs/appendix-p-security-features.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep29-security-features.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep29-security-features.mp3">Download Episode 29 (MP3)</a>
</audio>

[Download Episode 29 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep29-security-features.mp3)

<details>
<summary>Read Transcript - Episode 29: GitHub Security Features</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode twenty nine, GitHub Security Features. I am Alex, and today we are talking about how GitHub helps keep your code, your contributors, and your users safe.

**Jamie:** And I am Jamie. I have to be honest, Alex, the word security always makes me a little nervous. It feels like one of those areas where making a mistake has massive consequences. When I first started learning GitHub a couple of years ago, I was terrified I would accidentally break something or leak something important.

**Alex:** That is a completely normal way to feel. Security can be intimidating. It sounds like a lot of high stakes pressure. But here is the thing, GitHub has built a massive safety net directly into the platform. You do not have to be a cryptography expert to write secure code. Today, we are going to learn how GitHub automates most of this heavy lifting for you.

**Jamie:** That is a huge relief. As a reminder for our listeners, we are at the end of day two of our workshop. We already know how to open pull requests, which we call PRs, and we know how GitHub Actions work. So, what is on the agenda for today?

**Alex:** We are going to cover five main areas. First, why security matters so much in open source, specifically supply chain risks. Second, Dependabot, which is your automated dependency assistant. Third, secret scanning, which catches passwords before they leak. Fourth, code scanning using a tool called CodeQL. And finally, private security advisories, which is how you responsibly report a vulnerability if you find one.


**Jamie:** Let us start with that first one. Supply chain risks. When I hear supply chain, I think of cargo ships and grocery stores. What does that mean in software?

**Alex:** It is a great analogy, actually. Think about baking a cake. If you bake a cake, you probably do not mill your own flour, churn your own butter, and extract your own vanilla. You buy those ingredients from different suppliers. If the flour factory has a contamination issue, your cake is contaminated, even if you did everything perfectly in your own kitchen.

**Jamie:** Oh, I see. In software, the ingredients are our dependencies. The libraries and packages we pull into our projects so we do not have to write everything from scratch.

**Alex:** Exactly. Modern software is built on thousands of open source dependencies. If an attacker finds a vulnerability in a popular logging library, and your project uses that library, your project is now vulnerable. This is called a supply chain attack. You are only as secure as your weakest dependency.

**Jamie:** That sounds terrifying. How am I supposed to know if one of the hundred packages I am using has a security flaw? I cannot read all their code every day.

**Alex:** You absolutely cannot, and you should not try. That is exactly where the GitHub Security tab comes in. Every repository has a Security tab. It is your central dashboard for all these features.

**Jamie:** How do we navigate to the Security tab using a screen reader?

**Alex:** If you are on any repository page, you can move to the secondary navigation landmark. From there, you can tab through the links. You will pass Code, Issues, Pull Requests, Actions, Projects, Wiki, and then you will reach the Security link. Press Enter there.

**Jamie:** Is there a keyboard shortcut? I love skipping the tab navigation.

**Alex:** There is. If you turn on your screen reader's focus mode or forms mode, you can press G, and then S. G for go, S for security. That will jump you straight to the Security tab.


**Jamie:** Okay, so I am on the Security tab. What is the first thing I am going to find there to help with those supply chain risks we talked about?

**Alex:** You will find Dependabot. Dependabot is GitHub's automated dependency monitoring system. I like to think of Dependabot as a building inspector who constantly checks the foundation of your house. If it finds a crack, it lets you know. Dependabot does this by issuing what we call Dependabot alerts.

**Jamie:** How does it know there is a crack?

**Alex:** It checks your project's dependencies against a massive database of known vulnerabilities. When a security researcher discovers a flaw in a package, they publish a Common Vulnerability and Exposure report, or CVE. If Dependabot sees that your project uses a version of a package that has a CVE, it creates an alert.

**Jamie:** Are all alerts equally urgent? Because sometimes I feel like I get a lot of them.

**Alex:** They are not. Every alert comes with a severity level based on a CVSS score. That stands for Common Vulnerability Scoring System. It is a scale from zero to ten. Critical alerts are nine to ten. Those mean an exploit is likely and the impact is wide. You need to fix those immediately.

**Jamie:** What about the other levels?

**Alex:** High alerts are seven to eight point nine. You should fix those in your current sprint. Medium alerts are four to six point nine. There is some risk, usually requiring specific conditions to exploit, so you can schedule those fixes. And low alerts are anything under four. The likelihood of an attack is very low, so you can fix them when it is convenient.

**Jamie:** Okay, so Dependabot gives me an alert. Let us say it is a High severity alert for a package called lodash. How do I actually read this alert with my screen reader?

**Alex:** When you navigate to the Dependabot alerts section in the Security tab, the alerts are presented in a table. If you are using NVDA or JAWS, you can press the T key to jump to the table, and then use your up and down arrow keys to navigate the rows. Each row is an alert. When you find the one for lodash, you can tab to the link and press Enter to open the full details.

**Jamie:** What will I find inside the details page?

**Alex:** The page is well structured with headings. You can press the H key to move through the Alert title, the Package details, the Description of the vulnerability, and the References. It will tell you exactly which version of lodash is vulnerable, and more importantly, which version includes the fix.

**Jamie:** So to fix it, I just need to update my package file, commit the change, and open a pull request?

**Alex:** You could do that manually, yes. But Dependabot has a second feature called Dependabot Security Updates. If the repository maintainer has this enabled, Dependabot does not just warn you. It actually opens a pull request for you, automatically updating the dependency to the secure version.

**Jamie:** Wait, so the building inspector does not just point out the crack in the foundation, they actually bring a contractor over with the cement and say, here, just sign this paperwork and we will fix it?

**Alex:** Exactly. Dependabot writes the branch, updates the package file, and opens the PR. All you have to do as a contributor is review the PR, make sure the tests pass, and merge it. Reviewing and merging Dependabot PRs is honestly one of the highest value, lowest risk ways you can contribute to an open source project.

**Jamie:** That is brilliant. Does Dependabot only update packages when there is a security emergency? What if I just want to keep my packages up to date so I do not fall too far behind?

**Alex:** That is the third flavor of Dependabot. It is called Dependabot Version Updates. You can configure Dependabot to routinely check for any new versions of your dependencies, regardless of whether there is a security issue.

**Jamie:** How do I set that up? Do I use the GitHub website interface?

**Alex:** You set it up using a configuration file in your repository. You create a folder called dot github, and inside it, a file called dependabot dot y m l. In that yaml file, you tell Dependabot which package ecosystems to check, like npm for JavaScript or pip for Python, and how often to check, like daily or weekly. Dependabot will then automatically open PRs to keep your project fresh.


**Jamie:** Okay, so Dependabot handles the ingredients we bring into our project. But what about the code we write ourselves? I mentioned earlier that I was terrified of leaking something. When I was first learning to code, I accidentally committed an API key to a public repository. It was a nightmare. I had to scramble to figure out what to do.

**Alex:** You are definitely not the first person to do that, Jamie. We call things like API keys, database passwords, and authentication tokens, secrets. They are the keys to your digital house. If you hardcode a secret into your project and push it to a public GitHub repository, anyone in the world can find it and use it.

**Jamie:** And there are actually bots out there constantly scraping GitHub looking for leaked secrets, right?

**Alex:** Yes. If you push an active Amazon Web Services key to a public repo, attackers can find it and spin up thousands of dollars of servers on your account within minutes. That is why GitHub created Secret Scanning.

**Jamie:** How does Secret Scanning work? Does it read my code after I push it?

**Alex:** It does, but it also does something even better called Push Protection. Push Protection works in real time. When you type git push in your terminal, your code travels to GitHub. Before GitHub accepts the code, it scans it for known patterns of secrets from hundreds of service providers.

**Jamie:** What happens if it finds one?

**Alex:** It literally bounces your push back to you. Your terminal will display an error message saying Push cannot contain secrets. It will tell you the exact commit, the file name, the line number, and what kind of secret it found, like a GitHub Personal Access Token.

**Jamie:** That is like a bouncer at the club checking your pockets, finding your house key, and saying, hey, you cannot bring this inside, you are going to lose it on the dance floor.

**Alex:** That is a perfect analogy. Push Protection stops the leak before it ever happens.

**Jamie:** But what if I am working on an older project, and someone leaked a secret a year ago, before Push Protection was turned on?

**Alex:** That is where Secret Scanning Alerts come in. GitHub continuously scans the entire history of public repositories. If it finds a leaked secret in an old commit, it generates an alert in the Security tab under the Secret scanning section.

**Jamie:** Okay, so let us say I am navigating the Security tab, I open the Secret scanning section, and I find an active alert for a leaked token. What is the proper procedure? Do I just delete the token from the file and make a new commit?

**Alex:** No, and this is a critical point. Deleting the secret from the file is not enough. Remember, Git keeps a history of every change. Even if you remove it from the latest version of the file, the secret still exists in the older commits. Anyone can look at the commit history and find it.

**Jamie:** Oh, right. So the secret is permanently out there. What do I do?

**Alex:** You must revoke and rotate the secret. Revoking means you go to the service provider that issued the secret. Let us say it is a Stripe API key. You log into your Stripe dashboard and you delete or disable that specific key. This makes the leaked key completely useless. Even if an attacker has it, it will not work anymore.

**Jamie:** And rotating?

**Alex:** Rotating just means generating a brand new key to replace the old one, and putting that new key into your secure production environment. Once you have revoked and rotated, you can safely close the alert on GitHub.

**Jamie:** How do I avoid hardcoding secrets in the first place? I need my code to talk to databases and APIs.

**Alex:** The best practice is to use environment variables. Instead of typing the actual password in your code, you write a variable name, like process dot env dot DATABASE PASSWORD. Then, you store the actual password securely on the server where your code runs, completely outside of Git.


**Jamie:** Alright, we have secured our dependencies, and we have made sure we are not leaking passwords. But what if the logic of my code itself has a security flaw? Like, what if I write a function that accidentally allows a hacker to run their own code on my server?

**Alex:** That brings us to our fourth topic, Code Scanning. GitHub uses a technique called static analysis to find vulnerabilities in your code. Static analysis means evaluating the code without actually running it.

**Jamie:** Like a spellchecker, but for security logic?

**Alex:** Exactly. The engine behind GitHub's code scanning is called CodeQL. Q L stands for Query Language. CodeQL essentially treats your codebase like a database. It allows GitHub to write queries that search for common security vulnerabilities, like SQL injection, cross site scripting, or command injection.

**Jamie:** How does it know the difference between a safe piece of code and a dangerous one?

**Alex:** CodeQL is incredibly smart because it understands data flow. It traces how information moves through your program from a source to a sink.

**Jamie:** Source to a sink? Can you explain that?

**Alex:** A source is anywhere your program takes in untrusted data from the outside world. Like a user typing into a search box, or a parameter in a web request. A sink is a dangerous function that executes code or interacts with a database. CodeQL looks for paths where untrusted data travels from a source to a sink without being properly sanitized or checked along the way.

**Jamie:** I love analogies, so let me try one. It is like a water pipe inspector. The source is where the water enters the house. The sink is the drain. The inspector drops green dye into the water at the source, and then walks through the house to see if any green dye leaks out of the pipes before it safely reaches the drain.

**Alex:** That is exactly how data flow analysis works. CodeQL traces the green dye. If the untrusted data hits a dangerous execution function, CodeQL flags it as a vulnerability.

**Jamie:** How are these alerts presented to us? Are they easy to read with a screen reader?

**Alex:** They are excellent for screen reader users. When you navigate to Code scanning in the Security tab, you will find a table of alerts. You can open an alert by pressing Enter. Inside, you can use the H key to jump through the headings. There is a heading called Code flow. Under that, it gives you a step by step list of exactly how the data travels from the source to the sink.

**Jamie:** So it tells me exactly which file and which line number the problem starts on, and where it ends up?

**Alex:** Yes. It will say, step one, user input enters at line twelve. Step two, input is passed to the logger function at line forty seven. It makes fixing the vulnerability much easier because you know exactly where to intercept the bad data. Fixing these alerts is a fantastic way to contribute to open source projects.

**Jamie:** How do we turn CodeQL on? Is it automatic like Dependabot?

**Alex:** You have to set it up, but GitHub makes it very easy. You set it up using a GitHub Action. If you navigate to the Security tab and find the Code scanning section, GitHub will offer to configure CodeQL for you. It will generate a yaml workflow file for GitHub Actions. Once you commit that file, the GitHub Action will automatically run the CodeQL scan every time someone pushes new code or opens a pull request.


**Jamie:** Okay, so we have covered all these automated tools. But what happens if the automated tools miss something, and a human being, like me or one of our listeners, discovers a security vulnerability in an open source project? Do I just go to the Issues tab and open a new issue?

**Alex:** No. Please, never do that. If you find a security vulnerability, never report it as a public issue.

**Jamie:** Why not? I want the maintainers to fix it as fast as possible.

**Alex:** Think about it. A public issue is visible to everyone on the internet immediately. If you write down exactly how to crash a server or bypass a login screen in a public issue, you are handing a recipe to every malicious actor in the world. You are shouting that the back door is unlocked using a megaphone, before the owner has a chance to change the locks.

**Jamie:** Oh. I did not think about that. So how do I tell the maintainer without telling the whole world?

**Alex:** You use a process called responsible disclosure. On GitHub, this is handled through Private Vulnerability Reporting. It allows you to slip a note under the door directly to the security team, without the public ever seeing it.

**Jamie:** How do I find out if a project accepts private reports?

**Alex:** You should always check the project's security policy first. This is a file in the repository called SECURITY dot m d. You can usually find a link to it in the Security tab under the Policies section. The SECURITY dot m d file will tell you exactly how the maintainers want to be contacted. Sometimes they list a specific email address. But increasingly, they use GitHub's private reporting form.

**Jamie:** How do I access the private reporting form?

**Alex:** Navigate to the Security tab. If the maintainers have enabled it, you will find a button that says Report a vulnerability. Press Enter on that button.

**Jamie:** What does the form look like for a screen reader user?

**Alex:** It is a standard web form. You can use your F key or E key to jump between the form fields. First is the Title field, where you provide a short summary. Next is the Description text area. Here you need to be very detailed. Explain exactly how to reproduce the vulnerability, step by step, and what the impact is.

**Jamie:** Are there other fields?

**Alex:** Yes. There is a dropdown menu for Severity, where you can assess if it is low, medium, high, or critical. There is a field to list the affected versions of the software. And there is an optional field to provide a CVSS score if you know how to calculate one. Once you are done, you navigate to the Submit report button and press Enter.

**Jamie:** What happens after I submit it? Do I just wait?

**Alex:** The maintainers will receive a private notification. They will review your report, and they might ask you follow up questions in a private advisory thread. They will develop a fix, test it, and publish a new release of the software. Once the fix is public and users have had time to update, the maintainers will publish a public security advisory, and they will often credit you as the person who discovered it.

**Jamie:** That sounds like a great way to build a reputation in the open source community. But what if the maintainer ignores me? What if I submit a private report and I do not hear back for a month?

**Alex:** The industry standard window for a response is usually thirty to ninety days. If you do not hear back after a reasonable amount of time, you can send a polite follow up in the private thread. If the issue is absolutely critical and the project seems abandoned, you can actually contact GitHub directly, and their security team can assist with coordinated disclosure. But you must give the maintainers a fair chance to fix it first.


**Jamie:** Alex, before we wrap up, I saw a strange acronym in the reading materials for this chapter. S B O M. What is an SBOM?

**Alex:** SBOM stands for Software Bill of Materials. It is a machine readable inventory of every single component, library, and dependency in a software project.

**Jamie:** Like the ingredients list on the side of a cereal box?

**Alex:** Exactly. When enterprise companies or government agencies adopt open source software, they need to know exactly what ingredients are inside to ensure they meet compliance and security standards.

**Jamie:** How do I make an SBOM for my project? Do I have to type out every single dependency manually?

**Alex:** Thankfully, no. GitHub can generate it for you. You navigate to your repository's Insights tab, then move to the Dependency graph section. At the end of the main region, past the graph data, you will find a button called Export SBOM. When you activate that, GitHub generates a standardized JSON file in what is called the SPDX format. It lists all your dependencies, their exact versions, and their open source licenses. It is a very handy feature if you ever work in corporate environments.

**Jamie:** That is so easy. One last question. During this workshop, we are working out of a repository called community-access slash accessibility-agents. Do we have to navigate through the web interface to check its security status?

**Alex:** You do not. As a special feature for our workshop, the Accessibility Agents repository has a custom slash command. You can type slash security-dashboard in any issue or PR comment. A bot will instantly reply with a clean, accessible text summary of the repository's security health. It will list the number of active Dependabot alerts, confirm if there are any secret scanning alerts, tell you when the last CodeQL scan ran, and even list any open Dependabot pull requests that need reviewing.

**Jamie:** Oh, that is clever! I wish I had known that when I started. It puts all the critical information right in front of you without having to dig through multiple tabs and tables. I am definitely going to try running slash security-dashboard on my fork today.


**Alex:** That brings us to the end of our deep dive into GitHub Security Features. Let us summarize the key takeaways. First, security is largely about managing your supply chain. Dependabot is your best friend. It alerts you to vulnerabilities in your dependencies and can even open automated pull requests to fix them.

**Jamie:** Second, never hardcode passwords, API keys, or tokens in your code. Use environment variables. If you do accidentally commit a secret, Push Protection will try to block it. If a secret does leak, remember that deleting it is not enough. You must revoke the key at the source and rotate it to a new one.

**Alex:** Third, use Code scanning with CodeQL to automatically catch logic flaws and vulnerabilities in your own code before they are merged. It traces untrusted data from the source to the sink.

**Jamie:** And finally, if you discover a vulnerability in an open source project, be a good citizen. Never open a public issue. Check the project's SECURITY dot m d file and use the Private Vulnerability Reporting form to disclose it responsibly.

**Alex:** Perfectly summarized. In our next episode, episode thirty, we are going to shift gears and talk about GitHub Pages. We will learn how to take a repository and turn it into a live, accessible website hosted directly on GitHub for free. You will not want to miss it. Until then, keep practicing, and we will talk to you soon.

</details>


### Episode 30: VS Code Accessibility Reference

Complete accessibility settings, audio signals, diff viewer, and screen reader configs.

Based on: [Appendix M: VS Code Accessibility Reference](docs/appendix-g-vscode-reference.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep30-vscode-accessibility-reference.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep30-vscode-accessibility-reference.mp3">Download Episode 30 (MP3)</a>
</audio>

[Download Episode 30 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep30-vscode-accessibility-reference.mp3)

<details>
<summary>Read Transcript - Episode 30: VS Code Accessibility Reference</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub, the podcast where we make version control and open source collaboration accessible to everyone. I am Alex, and I am thrilled to be here with you today.

**Jamie:** And I am Jamie! I am so excited for this one. We are on episode thirty! Episode thirty, Alex. That feels like a massive milestone.

**Alex:** It really is. Today's episode is titled VS Code Accessibility Reference. If you have been following along with our two-day workshop material, you already know the basics of the VS Code interface from our earlier episodes. But today, we are going deep. We are handing you the complete manual.

**Jamie:** I love that. When I was learning GitHub about two years ago, I knew enough to get by. I knew how to open a file and type. But I did not understand how to make the editor actually work for me. I was just fighting the default settings every single day.

**Alex:** Exactly. And you should not have to fight your tools. Today, we are going to cover every accessibility-related setting in VS Code. We will talk about audio cues, the accessible diff viewer, terminal accessibility, and specific configurations for NVDA, JAWS, and VoiceOver. We will even cover troubleshooting when things go wrong.

**Jamie:** Just a quick reminder for our listeners. If you are joining us for the first time, you might want to review our previous episode on VS Code Setup and Accessibility Basics. That will give you the lay of the land. But if you are ready to dive into the deep end of the settings pool, stick right here.

**Alex:** Let us jump right in.


**Alex:** Everything in VS Code accessibility starts with one master switch. It is a setting called editor dot accessibility support.

**Jamie:** The big breaker switch for the house!

**Alex:** That is a perfect analogy. Just like the main breaker controls the power to your entire house, the editor dot accessibility support setting controls whether VS Code optimizes its interface for a screen reader. By default, this is set to auto. That means VS Code tries to detect if NVDA, JAWS, or VoiceOver is running when it starts up.

**Jamie:** But auto can sometimes fail, right? I remember times when my screen reader updated, or I started VS Code before my screen reader was fully running, and VS Code just acted like it had no idea I needed accessibility features.

**Alex:** Exactly. That is why I always recommend changing this setting from auto to on. When you force it to on, VS Code will always provide screen reader optimizations, no matter what.

**Jamie:** What actually happens when that switch is flipped on? What are the screen reader mode behavior changes?

**Alex:** A few critical things happen behind the scenes. First, it disables the visual minimap. The minimap is a zoomed-out visual outline of your code that sighted developers use to scroll quickly. For a screen reader, it is just useless noise that eats up computer memory. So, screen reader mode turns it off. It also changes how word wrap behaves, ensuring that when your screen reader reads a line of code, it reads the whole logical line, not just what visually fits on the screen.

**Jamie:** That is so important. If word wrap is handled visually, your screen reader might pause awkwardly in the middle of a variable name just because the window was resized.

**Alex:** Right. And while we are talking about customizing the interface, I want to mention high contrast themes and zoom levels. Even if you rely entirely on a screen reader, or if you are a low-vision developer who uses a combination of screen reading and visual tracking, these are essential.

**Jamie:** Oh, absolutely. I have low vision, and before I transitioned to using a screen reader full time, I relied heavily on high contrast. VS Code has built-in high contrast themes. You do not have to download anything extra.

**Alex:** Yes, you can open the Command Palette by pressing Control plus Shift plus P on Windows, or Command plus Shift plus P on Mac. Then type Preferences Color Theme. You can navigate through the list, and there are specific themes labeled High Contrast Dark and High Contrast Light. These themes add solid borders around panels and increase text contrast significantly.

**Jamie:** And for zoom, you can just press Control plus the Equals sign to zoom in, and Control plus the Dash key to zoom out. Or Command on a Mac. It scales the entire interface, not just the text in the editor. The sidebar, the terminal, the menus, everything gets bigger.

**Alex:** It is a huge help. Now, let us move from the visual to the audible. I want to talk about how VS Code communicates with you non-verbally.


**Alex:** Let us talk about Audio Cues. VS Code has a brilliant system of sounds that play when certain things happen.

**Jamie:** I am obsessed with the audio cues. They completely changed how fast I can write code. When I first started, I had to arrow through every single character of a line to figure out if I made a typo. Now, VS Code just plays a tiny little error chord when my cursor lands on a broken line.

**Alex:** That is the perfect way to explain it. Think of audio cues like the dashboard warning lights in your car, but for your ears. Instead of your screen reader verbosely announcing Error on line forty two every single time you arrow past it, you just hear a subtle, quick sound.

**Jamie:** What kind of sounds are we talking about?

**Alex:** There are dozens of them. They are controlled by settings that start with accessibility dot signals. For example, accessibility dot signals dot line has error. There is a sound for when a terminal task completes successfully, a different sound for when a task fails, and sounds for when you hit a breakpoint in a debugger.

**Jamie:** My favorite is the sound for folded code. Sometimes I am navigating a huge file, and I do not realize someone collapsed a massive function. The audio cue lets me know there is hidden code under my cursor.

**Alex:** You can configure these cues to be on, off, or auto. Auto means they only play if screen reader mode is active. You can find all of these by opening your Settings with Control plus Comma, or Command plus Comma, and searching for audio cue.

**Jamie:** But what if I want the editor to actually speak to me instead of just playing a chime? Like, a chime is great for an error, but what if I need to know exactly what the error is?

**Alex:** That brings us to Accessibility Announcements. If audio cues are your dashboard warning lights, accessibility announcements are your GPS voice navigation. They give you the specific text details.

**Jamie:** How do we control those? Because sometimes VS Code talks way too much.

**Alex:** It really can. The announcements are controlled by settings that start with accessibility dot verbosity. You can set the verbosity for different parts of the editor. For example, accessibility dot verbosity dot hover controls whether your screen reader automatically reads the pop-up information when your cursor lands on a function.

**Jamie:** Oh, I always turn that off. Or at least to minimal. If I am just arrowing through my code quickly, I do not want the screen reader to suddenly start reading a massive paragraph of documentation just because my cursor paused for half a second.

**Alex:** Exactly. You can set these verbosity settings to verbose, minimal, or off. If you set hover verbosity to off, you can still read that documentation whenever you want. You just press Alt plus F2, or Option plus F2 on Mac. That shortcut opens the Accessible View, which takes whatever visual pop-up is on the screen and puts it into a nice, plain text window that you can navigate at your own pace.

**Jamie:** Alt plus F2 is a lifesaver. I use it for reading long error messages, hover documentation, and even Copilot suggestions.


**Alex:** Speaking of navigating complex information, we need to talk about the Accessible Diff Viewer. This is arguably the most important feature we will cover today.

**Jamie:** Yes! A diff, short for difference, is how Git shows you what changed in a file. It compares the old version to the new version. But visually, diffs are usually displayed side-by-side. The old file is on the left, the new file is on the right, and the changes are highlighted in red and green.

**Alex:** Which is an absolute nightmare for a screen reader. If you try to navigate a visual side-by-side diff with a screen reader, you will just hear a jumbled mess of old code and new code mashed together.

**Jamie:** So how does the Accessible Diff Viewer fix this?

**Alex:** It completely restructures the information. Instead of two columns, it presents the changes as a single, vertical list. To access it, when you are in a diff view, you just press F7.

**Jamie:** F7. Got it. And what exactly does it show me?

**Alex:** It breaks the file down into what are called hunks. A hunk is just a block of related changes. Let us use an analogy. Imagine you are updating a recipe for chocolate chip cookies. You decide to change the amount of sugar, and you also add a step at the very end to sprinkle sea salt on top.

**Jamie:** Sounds delicious.

**Alex:** Right? In a visual diff, you would have to scan the whole recipe to find those two changes. But the Accessible Diff Viewer just gives you the hunks. Hunk one shows the sugar change. Hunk two shows the sea salt addition. It skips all the unchanged steps in the middle.

**Jamie:** That saves so much time. How does it tell me what was added or removed within that hunk?

**Alex:** It prefixes every line. If a line was removed, it announces Removed, or reads a minus sign before the line. If a line was added, it announces Added, or reads a plus sign. It also includes about three lines of unchanged code before and after the change, just to give you context. It will prefix those with Unchanged.

**Jamie:** So if I changed the sugar from one cup to two cups, it would say something like: Unchanged: butter. Removed: one cup sugar. Added: two cups sugar. Unchanged: vanilla extract.

**Alex:** Exactly like that. And you can jump forward to the next hunk by pressing F7 again, or jump backward by pressing Shift plus F7. It is incredibly efficient.


**Alex:** Let us transition to the command line. We need to talk about Terminal accessibility. The integrated terminal in VS Code is where you will run your Git commands, start your servers, and run your tests.

**Jamie:** The terminal used to be a really frustrating place for screen reader users. It is essentially a live feed of text that is constantly updating.

**Alex:** It was. But VS Code has made massive improvements. There is a setting called terminal dot integrated dot screen reader mode. Just like the editor, you should ensure this is turned on. When it is on, VS Code intercepts the raw terminal output and formats it so your screen reader can navigate it line by line using your standard arrow keys.

**Jamie:** One of my favorite settings in the terminal is the terminal bell. It is terminal dot integrated dot enable bell.

**Alex:** Yes, explain how you use that.

**Jamie:** So, if I run a really long command, like installing a bunch of packages for a project, I do not want to just sit there listening to my screen reader read out hundreds of lines of installation logs. I want to go check my email. When you enable the terminal bell, it is like the ding of a microwave. When the command finishes, it plays a sound. You know exactly when to switch back to VS Code.

**Alex:** That is a fantastic productivity tip. And if you ever need to read the output of a command that scrolled way off the screen, you can use that same Alt plus F2 shortcut we mentioned earlier. If your focus is in the terminal, Alt plus F2 opens the Terminal Accessible View, which puts the entire terminal history into a static text editor so you can search it, copy from it, and read it at your own pace.


**Alex:** Now we need to get into the weeds a bit. We are going to cover Screen reader-specific configurations. VS Code behaves slightly differently depending on whether you are using NVDA, JAWS, or VoiceOver. Let us start with NVDA on Windows.

**Jamie:** I use NVDA. When I first started, I had this weird issue where I would be reading a really long line of code, and suddenly NVDA would just stop reading in the middle of it.

**Alex:** That is a very common issue, and it has to do with an NVDA setting, not a VS Code setting. By default, NVDA limits how much text it will read on a single line in Browse Mode. To fix this, you need to open your NVDA Preferences, go to Settings, then Browse Mode. Look for the setting called Maximum length of text on a single line.

**Jamie:** And what should I change it to?

**Alex:** Change it to ten thousand. That ensures NVDA will read the entire line of code, no matter how long the variable names or string text might be. Also in those NVDA settings, you should check the box for Automatic focus mode for focus changes, and uncheck Automatic focus mode for caret movement.

**Jamie:** Why do we do that?

**Alex:** Because VS Code is essentially a complex web application running on your desktop. You want NVDA to automatically switch into focus mode when you open a menu or a dialog box, so you can interact with it. But when you are just moving your text cursor, your caret, around the editor, you do not want it constantly flipping modes.

**Jamie:** That makes perfect sense. What about JAWS?

**Alex:** For JAWS users, the setup is similar. You want to go into the JAWS Settings Center, under HTML, PDF, Accessibility. Make sure Auto Forms Mode is checked.

**Jamie:** Is there anything specific for reading code with JAWS?

**Alex:** Yes. Under Text Processing in JAWS, there is a setting for Blank Line Announcement. By default, JAWS says the word blank every time you arrow over an empty line. In code, there are a lot of blank lines used for formatting. Hearing the word blank fifty times a day gets exhausting. You can change that setting from Speech to Tone. Then, JAWS will just play a tiny click sound when you hit a blank line.

**Jamie:** Oh, I love that. Less talking, more coding. And what about our Mac users on VoiceOver?

**Alex:** VoiceOver requires a very specific tweak. You need to open the VoiceOver Utility, go to Navigation, and pay attention to Quick Nav. Quick Nav is a feature that lets you navigate web pages by pressing single letter keys. For example, pressing H jumps to the next heading.

**Jamie:** But in a code editor, if I press the letter H, I probably just want to type the letter H!

**Alex:** Exactly! If Quick Nav is on while you are in the VS Code editor, you will not be able to type normally. You must ensure Quick Nav is toggled OFF when your focus is in the editor. You can toggle it quickly by pressing the Left and Right arrow keys at the same time.

**Jamie:** And what about punctuation? Code is just a giant pile of punctuation.

**Alex:** Right. In VoiceOver Utility, under Verbosity, then Text, you should set Punctuation to All. You need to hear every bracket, every semicolon, and every parenthesis. If VoiceOver filters them out to make it sound more like natural English, your code will just not make any sense.


**Alex:** Let us talk about moving around. Keyboard-only navigation is the lifeblood of using VS Code with a screen reader.

**Jamie:** There are so many shortcuts, but you really only need a handful to get started, right?

**Alex:** Exactly. You do not need to memorize the entire dictionary. The most important shortcut, the one that rules them all, is the Command Palette. We mentioned it earlier: Control plus Shift plus P, or Command plus Shift plus P.

**Jamie:** If you forget every other shortcut, remember that one. Because you can just type what you want to do. If you want to open a new terminal, just open the Command Palette and type terminal. If you want to format your code, type format.

**Alex:** Beyond the Command Palette, you need to know how to navigate between the different parts of the window. VS Code has the main editor area where you type, but it also has a sidebar on the left and a panel on the bottom.

**Jamie:** The sidebar is where your file explorer is, right? Where you see all the files in your project.

**Alex:** Yes. To jump to the File Explorer in the sidebar, press Control plus Shift plus E. Or Command plus Shift plus E on Mac. To jump to the Source Control view, where you manage your Git commits, press Control plus Shift plus G.

**Jamie:** And the panel on the bottom is where the terminal lives.

**Alex:** Correct. You can toggle that bottom panel open and closed by pressing Control plus the Backtick key. The backtick is that little key usually right above the Tab key on your keyboard.

**Jamie:** What about moving between open files? If I have five files open, how do I switch between them without getting lost?

**Alex:** You use Control plus Tab. It works just like switching tabs in a web browser. If you hold down Control and press Tab repeatedly, it will cycle through all your open files. When you hear the name of the file you want, just let go of the keys, and your focus will be right there.

**Jamie:** One shortcut I use constantly is Control plus G. Go to line. When I run a test and it says there is an error on line one hundred and fifty, I just press Control plus G, type one five zero, hit Enter, and boom. I am exactly where I need to be.


**Alex:** Let us wrap up with a crucial topic: Troubleshooting accessibility issues. Because no matter how perfectly you set things up, eventually, something will get stuck.

**Jamie:** Oh, the dreaded silent editor. When you press an arrow key and your screen reader just says nothing. It is terrifying. You feel like you broke everything.

**Alex:** It happens to everyone. Usually, what has happened is that your system focus has gotten trapped inside a webview or a custom UI element that does not know how to report its state to the screen reader.

**Jamie:** How do we fix it? Do I have to restart my whole computer?

**Alex:** No, thankfully. The first thing to try is simply pressing the Escape key a few times. Sometimes a hidden menu is open and stealing focus. If that does not work, try pressing F6. F6 is the shortcut to cycle focus between the main parts of the VS Code window: the editor, the panel, the sidebar, and the activity bar. Often, pressing F6 forces the focus out of whatever trap it was in.

**Jamie:** And if it is completely frozen?

**Alex:** Then you use the Developer Reload Window command. Open the Command Palette with Control plus Shift plus P, and type Reload Window. Hit Enter. This refreshes the entire VS Code interface without actually closing the application or losing your unsaved work. It takes about two seconds and almost always fixes screen reader sync issues.

**Jamie:** Another issue I have run into is the Tab key getting trapped. I will be in the terminal, and I press Tab to autocomplete a file name, but instead, it moves my focus to a completely different button on the screen.

**Alex:** That is a feature called Tab Trapping. Sometimes it gets toggled on by accident. If your Tab key stops inserting tabs or autocompleting, press Control plus M. That is Command plus M on Mac. That toggles whether the Tab key moves focus between interface elements, or acts like a normal Tab key inside text areas.


**Alex:** We have covered a massive amount of ground today. Jamie, what are your top takeaways for our listeners?

**Jamie:** First, definitely make sure editor dot accessibility support is set to On, not auto. Do not leave it up to chance. Second, configure your screen reader properly! Change that NVDA line length to ten thousand, or turn off Quick Nav in VoiceOver. Your editor can only do so much if your screen reader is fighting it.

**Alex:** Excellent points. I will add a third: Embrace the Accessible Diff Viewer. Press F7 when you are reviewing code changes. Stop trying to read visual side-by-side diffs with a screen reader. And finally, use Alt plus F2 to open the Accessible View anytime you need to read a hover message, an error, or terminal output clearly.

**Jamie:** This really is the ultimate reference guide. I wish I had this episode two years ago.

**Alex:** All of the settings, JSON configurations, and shortcuts we discussed today are available in Appendix M of your workshop materials. You do not have to memorize them from this audio; they are all written down for you to copy and paste.

**Jamie:** What are we covering next time?

**Alex:** In our next episode, we are moving from editor configuration to pure magic. We are going to tackle GitHub Copilot. We will explain how to use artificial intelligence to write code, and most importantly, how to navigate and review AI suggestions accessibly using your screen reader.

**Jamie:** Oh, that is going to be incredible. Copilot is a game changer. I cannot wait.

**Alex:** Until then, keep exploring your settings, customize your audio cues, and we will see you next time on Gitt Going with GitHub.

</details>


### Episode 31: GitHub Codespaces

Cloud dev environments, accessibility setup, and screen reader usage.

Based on: [Appendix N: GitHub Codespaces](docs/appendix-j-cloud-editors.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep31-github-codespaces.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep31-github-codespaces.mp3">Download Episode 31 (MP3)</a>
</audio>

[Download Episode 31 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep31-github-codespaces.mp3)

<details>
<summary>Read Transcript - Episode 31: GitHub Codespaces</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode 31, GitHub Codespaces. I am Alex, and I am so glad you are joining us today as we continue our journey through accessible development and open source collaboration.

**Jamie:** And I am Jamie. I am a developer who learned GitHub about two years ago, and I am here to ask all the questions that you are probably thinking right now. I remember exactly what it felt like to be overwhelmed by all this terminology, so we are going to break it down together.

**Alex:** Today we are diving into a feature that completely changed how I teach development, and honestly, how I write code myself. We are talking about GitHub Codespaces. Before we jump in, let us quickly remind ourselves of our prerequisites. In our previous episodes, we covered the basic layout of Visual Studio Code, or VS Code, and we talked about fundamental Git commands like commit and push. You will be using all of that today.

**Jamie:** Okay, so GitHub Codespaces. I hear this term thrown around a lot in workshops and open source projects. What exactly is a Codespace? Because when I first heard the word, I thought it was some kind of social network for developers.

**Alex:** That would be interesting, but no. A Codespace is a cloud hosted development environment. Let us define that. A development environment is everything you need to write, run, and test your code. It is your code editor, your programming languages, your debugging tools, all of it. Historically, you had to install all of this directly onto your own computer.

**Jamie:** Right, and I have nightmares about that from when I was learning. I remember spending three days just trying to get Python, Node, and Ruby installed on my computer. I kept messing up my system paths, my screen reader was reading me endless error messages in the terminal, and I had not even written a single line of code yet. It was incredibly frustrating.

**Alex:** That is exactly the problem Codespaces solves. When we say it is cloud hosted, we mean GitHub creates a virtual machine, which is basically a computer running in a massive data center somewhere, and they set up all those tools for you. Then, they connect your code editor to that remote computer over the internet.

**Jamie:** So I love a good analogy. Is it kind of like renting a fully furnished workshop?

**Alex:** That is a perfect analogy. Imagine you want to build a table. You could spend weeks buying a saw, a drill, a workbench, and clearing out space in your garage. That is local development. Or, you could just rent a workshop that already has all the tools laid out on the bench, perfectly tuned and ready to go. You just walk in and start building. That is a Codespace.

**Jamie:** That sounds amazing. And because it is in the cloud, does that mean I do not need a super powerful computer to use it?

**Alex:** Exactly. This is one of the biggest benefits, especially for accessibility and inclusion. We call this developing on low end devices. Because the heavy lifting, the compiling, the running of the code, is all happening on GitHub servers, your computer is just acting as the display and keyboard. You could run a massive, complex project on an old, inexpensive laptop. You can even run Codespaces on mobile devices.

**Jamie:** Wait, really? Like an iPad or a smartphone?

**Alex:** Yes. If you pair a Bluetooth keyboard with a tablet, you can open a Codespace in your mobile web browser and have a full desktop class coding environment. The screen reader on your tablet will interact with the web interface. It is incredibly freeing to know you are not chained to a high end machine.


**Jamie:** Okay, I am sold on the concept. How do I actually create one? Let us say I am on a repository page on GitHub.

**Alex:** The process is very straightforward, but it requires navigating a few specific buttons. When you are on the main page of a repository, you want to navigate to the Code button. There is no direct keyboard shortcut to jump exactly to this button, so you will typically use your screen reader to navigate by buttons, or simply press Tab until you reach it.

**Jamie:** Got it. So I press Enter or Space to activate the Code button. What happens next?

**Alex:** A panel opens up. Inside this panel, there are usually two tabs. One is called Local, which is for cloning the code to your own computer. The other is called Codespaces. You want to use your arrow keys to select the Codespaces tab. Once you are in that tab, you will find a button called Create codespace on main. Main being the name of the default branch.

**Jamie:** Okay, I activate that button. What is the startup experience like? Because you said it is setting up a whole computer for me. That cannot be instant, right?

**Alex:** You are correct, it is not instant. When you activate that button, a new browser tab opens. This is where the provisioning happens. Provisioning is just a technical term for allocating the computer and getting it ready.

**Jamie:** What is happening behind the scenes during that time?

**Alex:** A few things. First, GitHub finds an available virtual machine. Next, it clones the repository you were just looking at directly into that machine. Then, it installs any tools that the project specifically requested. Finally, it starts up the VS Code interface. This whole process usually takes between thirty and ninety seconds.

**Jamie:** Ninety seconds to set up a whole environment? I will take that over three days of installing Python any day. While it is loading, does my screen reader tell me what is happening?

**Alex:** It does. The page has live regions that announce the progress, like connecting, or setting up environment. Once it finishes, focus automatically shifts into the VS Code editor.


**Jamie:** You mentioned a moment ago that GitHub installs the tools the project specifically requested. How does GitHub know what tools the project needs?

**Alex:** That is a brilliant question. This brings us to a concept called the dev container. The word dev is short for development. When you start a Codespace, GitHub looks inside your repository for a specific file. It looks in a folder called dot dev container, and inside that folder, it looks for a file called dev container dot json.

**Jamie:** Let me guess, json stands for JavaScript Object Notation, which is just a way of formatting data.

**Alex:** Exactly. The dev container dot json file is essentially the blueprint for your workshop. It is a text file that tells GitHub exactly how to build the environment.

**Jamie:** Can you give me an example of what goes into that blueprint?

**Alex:** Sure. Let us say you are working on a web project that needs a specific version of Node JS, and you want all the developers on your team to use an accessibility linting extension to catch errors. You write those requirements into the dev container dot json file. When anyone on your team creates a Codespace, GitHub reads that file, installs that exact version of Node, and pre installs the accessibility extension.

**Jamie:** Oh, that is clever! So it eliminates that classic developer excuse of, well, it works on my machine.

**Alex:** Precisely. It works exactly the same on everyone's machine, because everyone is using the exact same blueprint. This is especially amazing for workshops. As an instructor, I know that every single student has the exact same setup. Nobody is falling behind because their local environment is broken.


**Jamie:** Okay, so the Codespace has loaded. I am sitting in a browser tab. What does it actually look and feel like to my screen reader? Is it a stripped down version of VS Code?

**Alex:** Not at all. It is the full VS Code interface, running directly in your browser. It works in Chrome, Edge, Firefox, and Safari. For screen reader users, Chrome and Edge tend to offer the most consistent behavior with NVDA and JAWS.

**Jamie:** I remember the first time I used VS Code in the browser, I was worried my screen reader commands would conflict with the browser commands. How does accessibility in Codespaces work?

**Alex:** That is a very common concern. The great news is that VS Code is highly optimized for this. When VS Code in the browser detects a screen reader, it automatically activates a feature called Screen Reader Optimized Mode.

**Jamie:** What does that mode actually do?

**Alex:** It makes several crucial changes under the hood. For example, normally, a code editor might present text in a way that forces your screen reader to read character by character, which is incredibly tedious. Screen Reader Optimized Mode ensures the editor content is presented as a proper text area, allowing you to read line by line seamlessly. It also changes how things like code suggestions and differences between files are announced, making them much more friendly for audio output.

**Jamie:** What if it does not detect my screen reader automatically? Can I turn it on myself?

**Alex:** Yes, absolutely. You can use the Command Palette. We talked about this in a previous episode. You press Control plus Shift plus P. This opens a search field. You just type the word Toggle, and then the words Screen Reader Accessibility Mode. Press Enter, and it will turn on manually.

**Jamie:** Control plus Shift plus P. I use that shortcut probably fifty times a day. Okay, what about audio cues? I rely heavily on those little sounds VS Code makes when I hit an error or a breakpoint. Do those work in the browser?

**Alex:** They do. VS Code in Codespaces supports the exact same audio cues as the desktop version. You will hear a specific tone if your cursor lands on a line with an error, a different tone for a warning, and a little chime when a background task completes. The only catch is that sometimes modern web browsers mute audio for new tabs by default. If you are not hearing the cues, you might need to check your browser permissions and ensure that github dot com is allowed to play sound.


**Jamie:** Let us talk about the terminal. The terminal is where I run my commands, and it can be notoriously tricky with screen readers. How does the integrated terminal work in a Codespace?

**Alex:** It is a standard terminal, but navigating it requires a bit of technique. When you press Control plus grave accent to open the terminal, your focus moves into the terminal input area. The grave accent is the key usually located just above the Tab key on an American keyboard.

**Jamie:** Right. And when I type a command, like running a test script, a bunch of text usually flies up the screen. How do I read that?

**Alex:** This is where you need to understand your screen reader modes. If you are using NVDA or JAWS, your screen reader has two main modes. Focus Mode, which passes your keystrokes directly to the application so you can type, and Browse Mode, or Virtual Cursor in JAWS, which intercepts your keystrokes so you can read the screen like a document.

**Jamie:** So when I am typing the command, I need to be in Focus Mode.

**Alex:** Correct. But once the output arrives, you need to manually switch to Browse Mode. For NVDA, you press Insert plus Space. For JAWS, you press Insert plus Z. Once in Browse Mode, you can use your standard arrow keys to read the terminal output line by line. When you are ready to type your next command, you switch back to Focus Mode.

**Jamie:** I wish I had known that when I started. I used to just arrow up and down in Focus Mode and it would just cycle through my previous commands instead of reading the output.

**Alex:** That is a very common mistake! But VS Code also offers another brilliant feature called Accessible View. If you are in the terminal and you want to review the output without messing with screen reader modes, you can press Alt plus F2.

**Jamie:** Alt plus F2. What does that do?

**Alex:** It takes the entire output of the terminal and opens it in a temporary text editor buffer. You can read it, search through it, and navigate it exactly like you would a normal code file. When you are done reading, you just press Escape, and you are right back in the terminal input.

**Jamie:** Oh, that is huge. Alt plus F2. I am writing that down.


**Alex:** Now, we have been talking about using Codespaces in the web browser. But you do not actually have to use the browser. You can connect to a cloud Codespace using your local installation of VS Code on your computer.

**Jamie:** Wait, really? Why would I do that if the browser version works so well?

**Alex:** A few reasons. First, muscle memory. You might have your local screen reader settings, your keyboard shortcuts, and your operating system commands dialed in perfectly. Second, some VS Code extensions are not compatible with the web browser version. They require a native desktop environment to run.

**Jamie:** Okay, that makes sense. How do I connect my local VS Code to the cloud Codespace?

**Alex:** You need to install an extension in your local VS Code called GitHub Codespaces. Once that is installed, you open your Command Palette with Control plus Shift plus P. You search for the command Codespaces colon Connect to Codespace. It will ask you to sign into GitHub if you haven't already, and then it will show you a list of your running Codespaces. You pick one, and your local VS Code window refreshes.

**Jamie:** And at that point, I am typing in my local app, but the files are in the cloud?

**Alex:** Exactly. Your screen reader is interacting with your local desktop application, which is usually faster and more responsive, but all the heavy lifting, the terminal commands, the file saving, is happening on the GitHub server. It is the best of both worlds.


**Jamie:** Let us shift gears to something that always confused me. When I am developing locally, and I write a simple website, I usually run a command to start a local web server. Then I go to my browser and type local host colon three thousand to preview my site. But if my code is running on a cloud server in a Codespace, how do I preview my website?

**Alex:** That is a fantastic question, and it brings us to a concept called port forwarding.

**Jamie:** Port forwarding. Okay, define that for me.

**Alex:** Let us use an analogy. Imagine your Codespace is a secure vault on an island. Inside the vault, your website is running on a specific port, say, port three thousand. But you are on the mainland. You cannot just walk in. Port forwarding creates a secure, temporary tunnel from the vault on the island directly to your local computer.

**Jamie:** So it forwards the traffic from the cloud to me. How do I set up this tunnel? Does it require complex network configurations?

**Alex:** Thankfully, no. VS Code handles it automatically. When you run your web server command in the Codespace terminal, VS Code detects that a server has started. It automatically creates the secure tunnel. You will usually hear a notification from your screen reader saying a port has been forwarded.

**Jamie:** And how do I actually open the website to test it?

**Alex:** When the notification pops up, it usually includes a button to Open in Browser. If you miss the notification, which is easy to do, you can open the Command Palette with Control plus Shift plus P, and search for the command Ports colon Focus on Ports View. This opens a panel listing all your forwarded ports, and you can simply press Enter on the one you want to open. GitHub assigns it a unique, secure URL that only you can access.


**Jamie:** Okay, this all sounds incredibly powerful, which leads me to my next logical question. How much does this cost? Because renting a cloud computer cannot be free forever.

**Alex:** You are right, but GitHub provides a very generous free tier for personal accounts. Every month, you get a certain allowance of free compute hours and storage. For most workshop participants and open source contributors doing casual development, you will comfortably stay within this free usage limit.

**Jamie:** What happens if I forget to close my Codespace? Will it just run forever and drain my free hours?

**Alex:** No, they have thought of that. By default, if you are inactive for thirty minutes, meaning you have not typed anything or run any commands, the Codespace will automatically stop itself.

**Jamie:** What is the difference between stopping a Codespace and deleting a Codespace?

**Alex:** Think of stopping a Codespace like pressing pause on a movie, or putting your laptop to sleep. The virtual machine shuts down, and you stop using compute hours. However, your files, your uncommitted changes, and your terminal history are all saved on a hard drive. You are still using a tiny amount of your storage allowance, but the computer is off.

**Jamie:** And deleting it?

**Alex:** Deleting it is throwing the computer in the trash. The virtual machine is destroyed, and the storage is wiped clean. If you have uncommitted changes or code you haven't pushed to GitHub, it is gone forever.

**Jamie:** Okay, note to self. Always commit and push my work before deleting a Codespace. How do I manually manage these states? Let us say I am done for the day and I want to stop it manually.

**Alex:** You navigate to github dot com slash codespaces. This is your dashboard. It displays a list of all your active and stopped Codespaces. You can use your screen reader to navigate through the list. Next to each Codespace, there is an options menu, often labeled with an ellipsis, or simply announced as an action menu. If you activate that menu, you will find options to Stop codespace, or Delete.

**Jamie:** And if I want to resume one that is stopped?

**Alex:** From that same dashboard, you just navigate to the stopped Codespace and activate the button that says Open in. It will spin up the machine again, and in a few seconds, you are right back where you left off.


**Jamie:** Before we wrap up, I have seen another feature called GitHub dot dev. You just press the period key on any repository and a browser editor opens. Is that the same thing as a Codespace?

**Alex:** That is a great clarification. No, they are different. GitHub dot dev is a lightweight editor. When you press the period key, it opens VS Code in your browser, but it does not create a virtual machine. There is no compute power behind it.

**Jamie:** So what does that mean in practice?

**Alex:** It means you cannot run code. There is no terminal. You cannot run a local web server, and you cannot run tests. It is entirely powered by your browser.

**Jamie:** When would I use GitHub dot dev instead of a Codespace?

**Alex:** GitHub dot dev is perfect for quick edits. If you spot a typo in a documentation file, or you want to read through the code of a project without waiting ninety seconds for a Codespace to provision, you press the period key. It opens instantly. You make your text edit, commit, and you are done. Plus, GitHub dot dev is completely free and unlimited.

**Jamie:** Got it. So GitHub dot dev is for quick edits and reading, and Codespaces is for serious development where I need a terminal and a running environment.

**Alex:** Exactly.


**Alex:** We have covered a massive amount of ground today. Let us recap our key takeaways. First, a Codespace is a cloud hosted virtual machine running VS Code, giving you a full, pre configured development environment without installing anything locally.

**Jamie:** Second, the environment is defined by a blueprint called dev container dot json, which ensures everyone working on the project has the exact same tools and extensions. No more dependency nightmares!

**Alex:** Third, accessibility is built in. You can use Codespaces in your browser with Screen Reader Optimized Mode, or you can connect your local desktop VS Code directly to the cloud machine for maximum familiarity.

**Jamie:** And finally, port forwarding acts as a secure tunnel, letting you preview web apps running in the cloud right on your local machine. Just remember to commit and push your work before you delete your Codespace from the dashboard.

**Alex:** Perfect summary. In our next episode, we are going to dive into branching strategies. We will talk about how multiple people can work on the exact same files at the exact same time without overwriting each other's work. It is where the true magic of Git collaboration happens.

**Jamie:** I cannot wait for that one. Thank you all for listening, and we will catch you in the next episode!

</details>


### Episode 32: GitHub Mobile

VoiceOver and TalkBack guide for iOS and Android GitHub apps.

Based on: [Appendix O: GitHub Mobile](docs/appendix-v-github-mobile.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep32-github-mobile.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep32-github-mobile.mp3">Download Episode 32 (MP3)</a>
</audio>

[Download Episode 32 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep32-github-mobile.mp3)

<details>
<summary>Read Transcript - Episode 32: GitHub Mobile</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is Episode 32, called GitHub Mobile. I am Alex, and I am so glad you are joining us today.

**Jamie:** And I am Jamie! If you have been following along with our two-day workshop series, you have already learned how to navigate repositories, open issues, and manage pull requests using the desktop website and VS Code. But today, we are taking GitHub on the go.

**Alex:** Exactly. Before we dive in, let us do a quick refresher on our prerequisites. We will be talking a lot about issues and pull requests today. As a reminder, an issue is essentially a tracking ticket for a bug you need to fix or a new feature you want to build. And a pull request, which is my favorite term because you are literally requesting that someone pull your code changes into their project, is how you propose updates to a repository.

**Jamie:** If you are comfortable with those concepts, you are perfectly ready for this episode. And I have to say, Alex, I am really excited about this one. When I first learned GitHub about two years ago, I thought I was chained to my computer. If someone asked me to review their code, I felt like I had to drop everything, run home, and open my laptop.

**Alex:** That is a very common feeling. And that is exactly why GitHub Mobile exists. We are going to cover what the app offers, how to install it on iOS and Android, and how to navigate it using VoiceOver and TalkBack. We will talk through viewing notifications, reading issues, reviewing pull requests, and browsing code. Finally, we will discuss some current accessibility limitations and when it makes sense to use mobile versus your desktop.


**Alex:** Let us start with what GitHub Mobile actually is. It is an official app available for both iOS and Android devices. You can download it by opening the App Store on your iPhone or iPad, or the Google Play Store on your Android device, and searching for GitHub.

**Jamie:** And just to be clear, because this confused me at first, GitHub Mobile is not a code editor. You are not going to be typing out hundreds of lines of Python or JavaScript on your phone screen.

**Alex:** That is a great point. Think of GitHub Mobile like a walkie-talkie and a clipboard for your project, rather than your actual drafting table. It is designed for communication, project management, and review. The core features are triaging notifications, reading and replying to issues, reviewing pull requests, and doing some light code browsing.

**Jamie:** Triaging notifications is my absolute favorite part. Triage just means sorting things by priority, figuring out what needs your attention right now versus what can wait.

**Alex:** Yes, and after you install the app and sign in with your GitHub account, the app will prompt you to enable notifications. I highly recommend allowing this. It is the best way to stay on top of review requests and mentions without constantly refreshing your email or the GitHub website.

**Jamie:** OK, so I have downloaded the app, I have signed in, and I have allowed notifications. What does the app actually consist of?

**Alex:** The app is organized around a main navigation bar containing five tabs. There is the Home tab, which is a personalized feed of activity across all the repositories you watch. A repository, as a quick reminder, is just the project folder where all the files and history live.

**Jamie:** Then there is the Notifications tab, which we will talk a lot about. There is an Explore tab to discover new projects. The Pull Requests tab, which collects all the pull requests assigned to you or created by you. And finally, the Profile tab for your personal settings.

**Alex:** You can move between these tabs by navigating to them and activating them, just like any other standard app on your phone. But before we get into the specific features, we need to talk about how to actually get around the app using screen readers.


**Alex:** Let us talk about iOS and VoiceOver first. If you are using an iPhone or iPad, you likely already know that you can toggle VoiceOver on by triple-clicking the side button on newer phones, or the Home button on older ones. You can also turn it on by navigating to Settings, then Accessibility, then VoiceOver.

**Jamie:** When I open GitHub Mobile with VoiceOver running, how do I move around? Is it any different from Safari or Mail?

**Alex:** It is very similar. The basic gestures apply. You swipe right with one finger to move your focus to the next element, and swipe left to move to the previous element. When you hear the item you want, you double-tap anywhere on the screen to activate it.

**Jamie:** What if I open a really long issue description and I just want VoiceOver to read the whole thing to me while I listen?

**Alex:** Great question. You can use a two-finger swipe up to read from the very first item, or a two-finger swipe down to read continuously from your current focus point. If you need to pause the speech because someone asks you a question, just do a two-finger single tap. Another two-finger tap will resume the speech.

**Jamie:** I use the two-finger tap all the time. It is a lifesaver. But what about navigating complex screens? Like, sometimes an issue has a lot of comments, and swiping through every single timestamp and author name takes forever.

**Alex:** This is where the VoiceOver Rotor becomes your best friend. The Rotor is a feature that lets you change how your up and down swipes behave. Think of it like a physical combination dial on a safe. You place two fingers on the screen and rotate them clockwise or counter-clockwise. As you turn this invisible dial, VoiceOver will announce different settings.

**Jamie:** So I twist my fingers on the screen, and I might hear it say "Characters," "Words," "Headings," "Links."

**Alex:** Exactly. For GitHub Mobile, the most useful Rotor settings are Headings, Links, and Form Controls. If you select Headings on your Rotor, you can then just swipe down with one finger to jump directly from the issue description, to the first comment, to the second comment, completely skipping all the clutter in between.

**Jamie:** Oh, that is clever! I wish I had known that when I started. It is like skipping from chapter title to chapter title in an audiobook instead of fast-forwarding through every word.

**Alex:** That is a perfect analogy. You will also use the Form Controls option on the Rotor quite a bit. When you want to leave a comment on a pull request, selecting Form Controls and swiping down will jump your focus straight to the text input field, so you do not have to hunt for it.


**Jamie:** OK, but what if I am on an Android device? I know we have a lot of Android users in the workshop who use TalkBack.

**Alex:** Absolutely. TalkBack is the built-in screen reader for Android. You can usually turn it on by holding both volume keys for three seconds, or by navigating to Settings, then Accessibility, then TalkBack.

**Jamie:** Are the gestures the same as VoiceOver?

**Alex:** Many of them are! You still swipe right with one finger to move to the next element, swipe left for the previous element, and double-tap to activate whatever is currently in focus.

**Jamie:** What about scrolling? If a screen is really long, how do I move down?

**Alex:** With TalkBack, you can scroll down by using a two-finger swipe up, which pushes the content up so you can access what is below. Or, if you prefer the single-finger gestures, you can swipe up then immediately down in one fluid motion to scroll forward. To go back to the previous screen, you can swipe right then left.

**Jamie:** And does TalkBack have something like the VoiceOver Rotor for jumping around quickly?

**Alex:** It handles this slightly differently, through reading controls and the TalkBack menu. You can swipe up or down with one finger to cycle through your reading granularity, changing it to characters, words, lines, or paragraphs.

**Jamie:** So I can set it to paragraphs and swipe right to jump a whole paragraph at a time?

**Alex:** Exactly. You can also open the global TalkBack menu by tapping the screen with three fingers, or by swiping down then right. This menu lets you activate specific reading controls or even copy text from an issue description, which is incredibly useful if you need to copy an error message someone posted.

**Jamie:** One thing I love doing on Android is Explore by Touch.

**Alex:** Yes, Explore by Touch is fantastic on GitHub Mobile. Instead of swiping sequentially through every item, you just drag one finger slowly across the glass of your screen. TalkBack will announce whatever is underneath your finger. It is exactly like reading a tactile map with your hands. Once you learn the general layout of the app, dragging your finger directly to the tab bar is much faster than swiping fifty times to get there.


**Jamie:** So now that we know how to move around, let us talk about the feature I use the most. The Notifications tab.

**Alex:** I will go a step further, Jamie. I think the Notifications tab on GitHub Mobile is one of the strongest accessibility features GitHub has ever built. For screen reader users, the mobile notification experience is often much better than the desktop web version.

**Jamie:** I completely agree. On the website, notifications can feel overwhelming. They are grouped in these complex tables, and sometimes it is hard to figure out why you are even being notified.

**Alex:** But on mobile, your notifications are presented as a clean, simple, linear list. It is just one item after another. And the true power comes from the swipe actions.

**Jamie:** Right! This is my mail sorting analogy. Imagine you have a massive stack of physical mail. You pick up an envelope, decide what to do with it, and throw it into a bucket. Keep, trash, or read later.

**Alex:** Exactly. When your focus is on a notification in the list, you can use the custom actions in your screen reader. On VoiceOver, you swipe up or down when focused on a notification to hear the available actions. On TalkBack, you can use the action menu.

**Jamie:** You can mark it as read, archive it, or even unsubscribe from the conversation entirely if it is getting too noisy. You never even have to open the issue to clear it from your inbox.

**Alex:** And if you do want to read it, just double-tap the notification. It will open the full issue or pull request right there.

**Jamie:** There is also a really great filter feature, right?

**Alex:** Yes. If you navigate to the filter button on the notifications screen, it opens a panel with accessible form controls. You can filter your notifications by type, so you only hear about Pull Requests, or only hear about Issues. You can also filter by reason. For example, you can choose to only see notifications where someone directly at-mentioned your username, or where someone explicitly requested your review.

**Jamie:** That is a lifesaver when you are working on a massive open-source project and there are hundreds of notifications a day. You just filter by "Review Requested," handle those three items, and get on with your day.


**Alex:** Let us talk about what happens when you actually open an issue. Remember, an issue is where conversations happen about bugs or new ideas.

**Jamie:** Filing an issue on mobile is surprisingly easy. You navigate to the repository you want, activate the Issues tab, and navigate to the New Issue button.

**Alex:** When you activate that, you are presented with a simple form. There is a text field for the title, and a larger text field for the body of the issue. You also have buttons to assign labels, add assignees, or attach it to a milestone.

**Jamie:** OK, that sounds like a lot of steps.

**Alex:** It does! But here is the thing, you have already done most of this on Day 1 of the workshop. It is the exact same workflow as the website, just presented in a single, vertical column. You type your title, type your description, and activate the Submit button.

**Jamie:** Writing comments is where I used to get tripped up, though. I would activate the comment field, the on-screen keyboard would pop up, I would dictate my message, and then I could not find the submit button to actually post it.

**Alex:** That is a very common point of friction, and it has to do with how mobile operating systems handle keyboards. When the keyboard appears, it takes up nearly half of your screen, often covering the buttons underneath it.

**Jamie:** Exactly! I would swipe right, and suddenly I am just tabbing through my keyboard letters. Q, W, E, R, T, Y.

**Alex:** The workaround here is to dismiss the keyboard first, or scroll past it. On iOS, you can sometimes touch an empty area of the screen above the keyboard to dismiss it, or swipe down with two fingers to hide it. Once the keyboard drops out of the way, the Comment button is right there waiting for you.

**Jamie:** On Android, I usually just use the system back gesture, which is swiping right then left. That hides the keyboard, and then I can swipe right to find the Comment button. It feels natural once you do it a few times, but the first time it happens, it is definitely confusing.


**Alex:** Now let us move on to pull requests. This is where GitHub Mobile really shines for developers on the go.

**Jamie:** A pull request, just to recap, is when someone says, "Hey, I wrote some code, and I want to merge it into the main project." And usually, they need someone else to review it and approve it first.

**Alex:** Exactly. Mobile is fantastic for quick pull request reviews. Imagine you are waiting for a bus, or sitting in a coffee shop without your laptop, and a teammate messages you saying they fixed a typo and need a quick approval. You can do that entirely from your phone.

**Jamie:** When I open a pull request on the app, how is it structured?

**Alex:** The screen is divided into clear sections, which your screen reader will announce as headings. There is the Description heading, which contains the summary the author wrote. Then there is a Commits heading, showing the individual history of changes. Then there is Files Changed, which is where you actually look at the code. And finally, a Checks heading, which tells you if the automated tests passed or failed.

**Jamie:** I want to talk about the Files Changed section, because this is my other favorite accessibility feature. On the desktop website, looking at a diff, which is the difference between the old code and the new code, can be a nightmare with a screen reader.

**Alex:** It really can. The web version often uses complex, multi-column tables. One column for the old line number, one for the new line number, one for the old code, one for the new code. It is very difficult to parse by ear.

**Jamie:** But on the mobile app, the diff is simplified! It is just a text list.

**Alex:** Yes, this is a huge advantage. Because phone screens are narrow, GitHub Mobile strips away the complex table layout. Instead, each changed line of code is presented as a single item. Your screen reader simply announces "Added" followed by the new code, or "Removed" followed by the old code.

**Jamie:** It is so much cleaner. If someone changed a color value, my screen reader just says, "Removed: background blue. Added: background black." It is incredibly easy to understand.

**Alex:** Once you have reviewed those changes, you can leave your review. You navigate to the Review Changes button and activate it. This opens a panel where you can choose to Approve the pull request, Request Changes if something is wrong, or just leave a general Comment. You can type an optional message, and then activate the Submit Review button.

**Jamie:** What about just browsing code? Sometimes I want to look up how a specific function was written, but I am not reviewing a pull request. Can I do that?

**Alex:** You can. If you navigate to any repository, there is an option to browse the code. You can move through the folders and open individual files to read them.

**Jamie:** But this goes back to our earlier point. It is like reading the table of contents of a cookbook, and maybe reading a single recipe. You are not going to rewrite the recipe from your phone.

**Alex:** Exactly. You can read the code, but there is no syntax highlighting, and more importantly, you cannot edit the files directly in the app. If you need to write code, you need to use a desktop environment or a cloud tool like GitHub Codespaces.


**Alex:** Before we wrap up, we need to be honest about the current accessibility limitations of GitHub Mobile. While it is a fantastic tool, it is not perfect.

**Jamie:** Yeah, I have definitely run into a few quirks. Sometimes, if a pull request description is really long and has complex formatting, like embedded videos or large markdown tables, VoiceOver just sort of skips over it or reads it in a very confusing order.

**Alex:** That is a known issue. Complex markdown parsing on mobile screen readers can be tricky. The best workaround for this is to open the pull request in your mobile browser instead. You can navigate to the More Options menu, which is usually labeled as a button with three dots, and activate Open in Browser. Safari or Chrome will often read complex web layouts better than the native app view.

**Jamie:** I have also noticed a quirk with TalkBack on Android regarding the notification badges. You know how apps have a little number telling you how many unread items you have?

**Alex:** Yes, the badge count.

**Jamie:** Sometimes TalkBack does not announce when that badge count updates live. I will be on the Home tab, and a new notification will come in, but TalkBack will not say anything about it.

**Alex:** That is true. The visual badge updates, but the accessibility event does not always fire. To get the current, accurate count read aloud, you need to explicitly navigate your focus to the Notifications tab itself.

**Jamie:** And of course, there is the occasional app freeze.

**Alex:** Yes, like any app, GitHub Mobile can occasionally freeze or crash. If your screen reader suddenly stops responding while inside the app, the best step is to force close the application. On iOS, you swipe up from the bottom edge and hold to open the app switcher, then swipe up on GitHub to close it. On Android, you open your recent apps and swipe it away. Then just reopen it. If it keeps happening, you can navigate to your Profile, open Settings, and sign out, then sign back in.


**Jamie:** So, comparing mobile to desktop, what is the final verdict?

**Alex:** It comes down to using the right tool for the job. Think of GitHub Mobile as a Swiss Army knife, and your desktop computer as a full workshop. The mobile app is absolutely excellent for triaging notifications. The linear list and swipe actions are superior to the desktop web experience.

**Jamie:** It is also great for quick pull request approvals, leaving simple comments, or checking if your automated tests passed while you are making lunch.

**Alex:** But for writing long, detailed pull request descriptions, reviewing massive code diffs with hundreds of changed files, or dealing with complex issue templates, you are going to have a much better time on your desktop using your physical keyboard.

**Jamie:** And of course, for actually writing and editing code, desktop is the only way to go.


**Alex:** That brings us to the end of Episode 32. Let us recap our main takeaways.

**Jamie:** First, GitHub Mobile is an incredibly powerful companion app for iOS and Android, designed for project communication, not for writing code.

**Alex:** Second, the app fully supports VoiceOver and TalkBack. Mastering tools like the VoiceOver Rotor or TalkBack reading controls will make navigating complex issues much faster.

**Jamie:** Third, the Notifications tab is a game changer. Use the swipe actions to quickly triage your inbox, just like sorting physical mail.

**Alex:** And finally, the simplified, linear code diffs on mobile are highly accessible. They announce "Added" or "Removed" sequentially, making quick code reviews by ear much easier than wrestling with web-based tables.

**Jamie:** I am definitely going to be doing more PR reviews from my couch now.

**Alex:** That is the spirit. In our next episode, Episode 33, we will be pivoting back to the desktop to explore GitHub Actions. We will learn how to automate our workflows, run tests automatically, and make the robots do the heavy lifting for us.

**Jamie:** I cannot wait to automate everything! Thanks for listening, everyone.

**Alex:** Keep practicing with the mobile app, and we will see you in the next episode. Happy coding!

</details>


### Episode 33: Publishing with GitHub Pages

Free static site hosting, custom domains, HTTPS, and accessibility.

Based on: [Appendix P: Publishing with GitHub Pages](docs/appendix-w-github-pages.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep33-github-pages.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep33-github-pages.mp3">Download Episode 33 (MP3)</a>
</audio>

[Download Episode 33 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep33-github-pages.mp3)

<details>
<summary>Read Transcript - Episode 33: Publishing with GitHub Pages</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub.

**Jamie:** The audio series for blind and low-vision developers learning GitHub and open source collaboration.

**Alex:** I am Alex, and I am thrilled to be here with you today.

**Jamie:** And I am Jamie. I am ready to learn, and I have my usual list of questions.

**Alex:** This is episode 33, Publishing with GitHub Pages. Today, we are taking all that Markdown and code you have been writing and turning it into a live, public website. Free of charge, directly from your repository.

**Jamie:** I remember when I first learned about this. I had been paying ten dollars a month for a basic web host just to put my resume online. When someone told me GitHub would host it for free, I honestly did not believe them.

**Alex:** It is one of the best kept secrets for beginners, though it is incredibly popular once you know about it. Before we dive in, let us do a quick check on prerequisites. For this episode, you will want to be comfortable with basic git concepts like making commits and working with branches, which we covered back in episode 4. You should also be familiar with writing Markdown, from episode 12.

**Jamie:** So, Alex, let us start at the very beginning. What exactly is GitHub Pages?

**Alex:** GitHub Pages is a static site hosting service built directly into GitHub. It takes the files from a specific branch or folder in your repository and serves them to the internet as a website.

**Jamie:** You used the phrase static site. I hear that a lot, usually contrasted with dynamic sites. Can we define what static means in this context?

**Alex:** Absolutely. A static website means that the server is simply handing over files exactly as they exist in your repository. It serves HTML, CSS, JavaScript, images, and documents. But it does not run any server-side logic.

**Jamie:** So no database connections, no PHP, no Python running on the server to generate the page on the fly.

**Alex:** Exactly. Think of a static site like a printed brochure or a bulletin board. What is printed on the paper is exactly what the reader sees. If you want to change the text, you have to print a new brochure. A dynamic site, on the other hand, is like a vending machine. You press a button, machinery whirs into action behind the glass, and it constructs a custom response based on what you asked for.

**Jamie:** That is a great analogy. So GitHub Pages only gives out printed brochures. If I want a vending machine, like a site where users log in and post comments to a database, GitHub Pages is not the right tool.

**Alex:** Spot on. But for many things, a brochure is exactly what you need. GitHub Pages is perfect for documentation sites, project landing pages, personal portfolios, and even simple blogs. In fact, the workshop materials for this very audio series are hosted on GitHub Pages.


**Jamie:** Okay, I am sold. How do I actually turn this on for my repository?

**Alex:** It is all done through the repository settings on the GitHub website. Let me walk you through the navigation path using a screen reader. First, navigate to your repository page. In the top navigation bar, you will find a link called Settings. Activate that link.

**Jamie:** Got it. The main settings page.

**Alex:** Once the Settings page loads, move to the left sidebar. This sidebar has a series of navigation links grouped by category. Navigate down to the group heading called Code and automation. Under that heading, you will find a link simply called Pages. Activate that Pages link.

**Jamie:** Okay, I am on the Pages settings screen. What am I looking for here?

**Alex:** Navigate to the section heading called Build and deployment. Here, you have a choice for your publishing source. You will find a dropdown menu or radio buttons depending on the current interface layout, offering two main choices. One is Deploy from a branch, and the other is GitHub Actions.

**Jamie:** Let us start with Deploy from a branch. That sounds simpler.

**Alex:** It is the simplest option. When you select Deploy from a branch, two new standard select dropdown menus will appear. You can navigate these easily with your arrow keys. The first dropdown asks you to select a branch, like your main branch. The second dropdown asks you to select a folder.

**Jamie:** What are my folder options?

**Alex:** You have two choices. You can select the root folder, which is represented by a forward slash. Or, you can select the docs folder, represented by forward slash docs.

**Jamie:** Why would I choose one over the other?

**Alex:** If your repository is just a website, like a personal portfolio where the HTML files are right there in the main directory, you choose the root folder. But let us say your repository is a complex software project, like a Python library. Your root folder is full of Python code, setup files, and tests. You do not want to publish all of that as a website.

**Jamie:** Oh, I see. So I would create a folder called docs, put my HTML documentation in there, and tell GitHub Pages to only look at that folder.

**Alex:** Exactly. Think of it like pointing a spotlight at a very specific folder on your messy desk. GitHub Pages only illuminates and publishes what is inside the docs folder, ignoring the rest of your source code.

**Jamie:** That is incredibly useful. So I click Save, and then what? Does it go live instantly?

**Alex:** Almost instantly. GitHub will take a minute or two to build and deploy the site. Once the first deployment succeeds, a message will appear at the top of that Pages settings screen with your new live URL.


**Jamie:** Let us talk about that URL. If I do not have my own domain name, what address does GitHub give me?

**Alex:** The default URL structure is your username dot github dot io, followed by a forward slash, and then your repository name. So if your username is Jamie Codes, and your repository is called my dash project, your website will be live at jamie codes dot github dot io slash my dash project.

**Jamie:** That is pretty clean. But what if I just want jamie codes dot github dot io, without the repository name at the end? Like for my main personal website?

**Alex:** GitHub has a special feature just for that. If you create a repository and name it exactly your username dot github dot io, GitHub automatically recognizes this as your user profile repository. When you enable Pages for that specific repository, it serves the site at the root level. No forward slash repository name required.

**Jamie:** I love that. I definitely used that trick for my first portfolio. But let me ask you about something that used to happen to me all the time. I would type the URL wrong, or I would try to visit a page I had not uploaded yet, and I would get this very generic GitHub 404 Page Not Found error. Can I change that?

**Alex:** You absolutely can, and you should! To create a custom error page, all you have to do is create a file named exactly four oh four dot html in the root of your publishing source.

**Jamie:** So just the numbers 4 0 4 dot html?

**Alex:** Yes. When GitHub Pages cannot find a file a visitor is looking for, it automatically serves that specific file. It is a great place to put a friendly message and a link back to your home page. Think of it like hiring a polite receptionist to tell visitors they have the wrong room, rather than just letting them walk face-first into a locked brick wall.


**Jamie:** Okay, so we have talked about hosting plain HTML files. But writing a whole website in raw HTML sounds exhausting. If I have a blog with fifty posts, I do not want to copy and paste my navigation menu fifty times.

**Alex:** And you definitely should not. This is where Static Site Generators come in. Remember our factory assembly line analogy? A static site generator is a factory. You feed it raw materials, usually Markdown files containing your content, and a few HTML templates. The generator runs the assembly line, stitches the templates and Markdown together, and spits out a complete folder of finished HTML pages.

**Jamie:** That sounds exactly like what I need. Does GitHub Pages include a factory like that?

**Alex:** It does. GitHub Pages has native support for a static site generator called Jekyll. Jekyll is built in Ruby, and it is the default engine behind GitHub Pages. If you push a repository full of Markdown files, and you have not told GitHub otherwise, it will quietly run Jekyll behind the scenes to convert those Markdown files into a website.

**Jamie:** That is why my README file automatically showed up as a website when I tested this last year! I was so confused about how my Markdown magically became HTML.

**Alex:** That was Jekyll doing the heavy lifting. But Jekyll is not the only static site generator out there. There is Hugo, which is incredibly fast. There is Eleventy, which is very popular in the accessibility community. There are frameworks like Next dot js that can export static files.

**Jamie:** But if Jekyll is the only one built in, how do I use Eleventy or Hugo with GitHub Pages?

**Alex:** That brings us back to the Build and deployment section in the Pages settings. Remember how the first option was Deploy from a branch? The second option is GitHub Actions.

**Jamie:** Ah! Okay, I have heard of GitHub Actions, but it always sounded a bit intimidating.

**Alex:** It does sound intimidating! But here is the thing, you have already done most of this on Day 1. The workflow is exactly the same, just with a server handling the commands instead of you typing them. GitHub Actions is basically a way to hire a robot assistant to run tasks for you every time you push code.

**Jamie:** So instead of the built-in Jekyll factory, I am telling my robot assistant to bring in the Eleventy factory, build my site, and then hand the finished files to GitHub Pages?

**Alex:** Precisely. You create a configuration file, specifically a yaml file, in a folder called dot github slash workflows. In this file, you write out the instructions for your robot assistant.

**Jamie:** What do those instructions look like?

**Alex:** It is a step by step list. First, you tell the robot to check out your repository code. Second, you tell it to set up the environment, like installing Node dot js if you are using Eleventy. Third, you tell it to run your build command, like npm run build. And finally, you use a pre-built GitHub Action called upload pages artifact to take the folder of finished HTML and hand it to the GitHub Pages service.

**Jamie:** That actually makes a lot of sense. And I assume there are templates for these workflow files so I do not have to write them from scratch?

**Alex:** Tons of them. When you select GitHub Actions as your source in the settings, GitHub will actually suggest pre-written workflow files based on the code in your repository. If it sees a Next dot js project, it will offer you a Next dot js template. You just commit the file, and the robot takes over.


**Jamie:** Alright, let us talk about domains. Because jamie codes dot github dot io is nice, but I really want my site to be at jamie codes dot com. Can I use a custom domain with a free GitHub Pages site?

**Alex:** Yes, you can use a custom domain on the free tier. It is one of the best features. But it does require a little bit of configuration using DNS, which stands for Domain Name System.

**Jamie:** DNS always confuses me. It feels like dark magic.

**Alex:** It can feel that way! But DNS is simply the phonebook of the internet. When someone types jamie codes dot com into their browser, their computer looks up that name in the DNS phonebook to find out the actual IP address of the server hosting your website.

**Jamie:** So how do I tell the phonebook to point to GitHub?

**Alex:** There are two steps. First, you go to your GitHub Pages settings. There is a field labeled Custom domain. You type jamie codes dot com in there and activate the Save button. GitHub will then create a file called CNAME in the root of your repository to remember your domain.

**Jamie:** Okay, step one is telling GitHub to expect visitors looking for my domain. What is step two?

**Alex:** Step two happens over at the company where you bought your domain name, your domain registrar. You need to log into their dashboard and add some records to your DNS settings. The type of record depends on whether you are using a subdomain or an apex domain.

**Jamie:** Can you define apex domain?

**Alex:** An apex domain is the root level of your domain, like jamie codes dot com. A subdomain has an extra prefix, like blog dot jamie codes dot com, or www dot jamie codes dot com.

**Jamie:** Got it. So what is the difference in the setup?

**Alex:** If you are using a subdomain, you create what is called a CNAME record. You tell your registrar that the CNAME for blog dot jamie codes dot com should point directly to your default GitHub address, jamie codes dot github dot io. It is basically a mail forwarding rule.

**Jamie:** And for the apex domain?

**Alex:** For an apex domain, you have to use A records. A stands for Address. You will create four separate A records, and point them to four specific IP addresses owned by GitHub. You can find these four IP addresses in the GitHub documentation.

**Jamie:** Okay, so I update the phonebook. Does it work right away?

**Alex:** Not always. DNS changes can take up to 48 hours to propagate across all the servers in the world, though it usually happens in a few minutes. If you push a change and do not see it, you might need to do a hard refresh of your browser. You can do this by pressing Control plus F5 on Windows, or Command plus Shift plus R on a Mac, to bypass your local cache.

**Jamie:** That is a great tip. Now, what about security? I notice most websites start with HTTPS these days. Does GitHub Pages support that?

**Alex:** It does better than support it, it enforces it. GitHub Pages automatically provisions an SSL certificate for your site using a service called Let's Encrypt. This ensures that all traffic between your visitor and your website is encrypted.

**Jamie:** Like putting the website data in a sealed, tamper-proof envelope before sending it across the internet.

**Alex:** Exactly. For the default github dot io domains, this happens automatically. For custom domains, once your DNS finishes updating, GitHub will request the certificate. You just need to make sure the Enforce HTTPS checkbox is checked in your Pages settings. It will redirect anyone trying to use the old, insecure HTTP protocol directly to the secure version.

**Jamie:** That is amazing that it is all free. Are there any security risks I should worry about?

**Alex:** There is one massive security rule you must remember. Never, ever store secrets, API keys, passwords, or private data in a GitHub Pages repository.

**Jamie:** Because it is a static site, so anyone can just view the source code?

**Alex:** Yes. And more importantly, if you are on a free GitHub account, your repository must be set to Public to use GitHub Pages. That means your entire source code history is visible to the world. Even if you delete a file with a password in it, that file still exists in your git history. So keep your secrets out of your repository.


**Jamie:** Let us pivot to something I care deeply about. Accessibility. If I publish a website using GitHub Pages, is it automatically accessible to screen readers?

**Alex:** I wish I could say yes, but no. Publishing a site just makes it available on the internet. It does not automatically make it accessible. The accessibility of your published site depends entirely on the HTML, CSS, and JavaScript you or your static site generator produce.

**Jamie:** Right, so the factory just builds what you tell it to build. If you feed it inaccessible templates, it will print inaccessible brochures.

**Alex:** Exactly. When you are building your site, you need to ensure you are using semantic HTML. This means using the correct tags for the correct purposes. For example, your primary content should be wrapped in the main landmark tag. You should have a logical heading hierarchy, starting with an H1, followed by H2s, and so on.

**Jamie:** What about navigation? If I have a blog with a big menu on every page, it can be really tedious for a keyboard user or screen reader user to tab through that menu on every single page load.

**Alex:** That is a critical point. For sites with repeated navigation, you should implement a skip link.

**Jamie:** Can you explain how a skip link works?

**Alex:** A skip link is an anchor tag placed at the very top of your HTML body. Its href attribute points directly to the id of your main content area. The text usually says something like Skip to main content. Using CSS, you can hide it visually until it receives keyboard focus. This allows keyboard and screen reader users to press the Tab key once, activate the link, and jump right over the navigation menu to the actual content of the page.

**Jamie:** I love skip links. They save so much time. What about Single Page Applications? I know some static site generators use JavaScript to load new pages without refreshing the browser.

**Alex:** That requires careful focus management. If the browser does not fully refresh, a screen reader user might not even realize the page content has changed. If you are using a framework that does this, you must ensure that when the new content loads, keyboard focus is programmatically moved to the new H1 heading, or to a wrapper element with a tabindex attribute set to negative one.

**Jamie:** Okay, so semantic HTML, skip links, focus management. How do I test all this once it is live?

**Alex:** You should definitely test the live URL. Some issues, like broken relative links or color contrast problems, might only become obvious once the site is fully rendered in a browser. You can use automated tools like WAVE or Axe DevTools.

**Jamie:** Wait, Axe DevTools? Can I use that robot assistant we talked about earlier to run Axe automatically?

**Alex:** You absolutely can! That is one of the most powerful reasons to use GitHub Actions for your deployment. You can add a step in your workflow file to install the Axe core command line interface. Before the robot deploys your site, it runs Axe against your built HTML files.

**Jamie:** And if Axe finds an accessibility violation?

**Alex:** You configure the workflow to fail. The robot stops the assembly line, refuses to deploy the broken site, and sends you an alert. It completely blocks inaccessible code from reaching your live website.

**Jamie:** That is brilliant. I am definitely setting that up for my next project. I wish I had known that when I started.


**Alex:** We have covered a lot of ground today. Let us recap our main takeaways. First, GitHub Pages is a free hosting service that serves static files directly from your repository. It is perfect for documentation, portfolios, and blogs, but it does not run server-side code.

**Jamie:** Second, you can serve files directly from your main branch, or isolate them using a docs folder. And if you want to use a custom static site generator like Eleventy or Next dot js, you can use GitHub Actions to automate the build process.

**Alex:** Third, GitHub Pages supports custom domains through DNS configuration, and it automatically enforces HTTPS using Let's Encrypt to keep your traffic secure. Just remember to never store sensitive secrets in your public repositories.

**Jamie:** And finally, publishing a site does not make it accessible. You still need to use semantic HTML, implement skip links, and manage focus. But you can use GitHub Actions to run automated accessibility tests and block deployments if violations are found.

**Alex:** Perfect summary, Jamie. In our next episode, we are going to explore GitHub Discussions, a feature that allows you to build a community and have open-ended conversations right next to your code.

**Jamie:** I am looking forward to it. Thanks for listening, everyone!

**Alex:** Keep practicing, and we will catch you in the next episode of Gitt Going with GitHub.

</details>


### Episode 34: GitHub Actions and Workflows

Workflow YAML structure, CI/CD, automation, and the Actions marketplace.

Based on: [Appendix Q: GitHub Actions and Workflows](docs/appendix-q-actions-workflows.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep34-github-actions.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep34-github-actions.mp3">Download Episode 34 (MP3)</a>
</audio>

[Download Episode 34 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep34-github-actions.mp3)

<details>
<summary>Read Transcript - Episode 34: GitHub Actions and Workflows</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub, the audio learning series for blind and low-vision developers who are mastering GitHub and open source collaboration. This is episode 34, titled GitHub Actions and Workflows. I am your host, Alex.

**Jamie:** And I am Jamie. I am so excited for this one. We have spent the last thirty-three episodes talking about how to write code, how to commit code, and how to open pull requests. But today, we are talking about what happens after you open that pull request. Because a lot of magic happens, and sometimes it can feel a little bit like a black box.

**Alex:** That is a perfect way to describe it, Jamie. Before we dive into that black box, let us do a quick prerequisite check. To get the most out of this episode, you should already be comfortable with the concepts of commits, pushing branches to a remote repository, and opening a pull request. If you need a refresher on those, head back to episode 28. Assuming you are ready, let us talk about GitHub Actions.

**Jamie:** So, I will admit, when I first started learning GitHub about two years ago, I kept hearing the phrase GitHub Actions. And I thought it just meant the literal actions I was taking on the website, like creating a repository or adding a collaborator. But it is actually a specific feature, right?

**Alex:** Exactly. GitHub Actions is GitHub's built-in automation system. It is a way to define automated tasks that run in response to specific events happening in your repository. The best way to think about it is that GitHub Actions is like having a tireless robot assistant living inside your repository.

**Jamie:** I love a robot assistant. What kind of things is this robot doing for us?

**Alex:** Well, you get to tell the robot exactly what to do. You can say, hey robot, every time someone opens a pull request, I want you to download their code, install all the dependencies, run our automated test suite, and report back on whether the tests passed or failed. Or you could say, hey robot, every time I push code to the main branch, I want you to package up the application and deploy it to our live web server.

**Jamie:** Oh, that is incredibly powerful. Because otherwise, a human maintainer would have to manually pull down my branch, run the tests on their own machine, and then manually reply to my pull request. This robot is saving everyone a massive amount of time.

**Alex:** Precisely. It is event-driven automation. Something happens in the repository, which is the event, and that triggers the automation, which is the action. And as a contributor to open source, you usually do not need to write these automations from scratch. The repository maintainers have already set them up. But you absolutely need to understand how to read them, what they are doing, and what to do when they fail on your pull request.


**Jamie:** Okay, so if the maintainers have set up this robot assistant, where do the instructions for the robot actually live? Is it a setting in the repository dashboard somewhere?

**Alex:** That is a great question. The instructions do not live in a dashboard. They live directly in the repository itself, right alongside the code, as plain text files. They live in a very specific, mandatory folder structure. If you navigate to the root directory of a repository, you will find a folder called dot github.

**Jamie:** And just to clarify for everyone listening, when we say dot github, we mean a folder name that literally starts with a period character, followed by the word github. My screen reader usually reads it out as dot github. When I first saw that, I thought the period was a typo.

**Alex:** It is not a typo, but it is a convention borrowed from Unix-based systems where putting a dot at the start of a file or folder name marks it as hidden. So depending on your editor settings, you might need to enable a setting like show hidden files in your file explorer to navigate to it. Inside that dot github folder, there is another folder called workflows. And inside that workflows folder is where the magic lives.

**Jamie:** Dot github, slash workflows. Got it. And what kind of files are in there? Are they JavaScript files or Python scripts?

**Alex:** They are YAML files. That is spelled Y A M L. And they usually have the file extension dot y m l. YAML stands for YAML Ain't Markup Language, which is a classic nerdy recursive acronym. But really, it is just a plain text format used for configuration files. It uses key and value pairs, separated by colons.

**Jamie:** I have a love-hate relationship with YAML. The syntax is very clean because it does not use a bunch of curly braces or brackets, but it relies heavily on indentation to define structure. And as a screen reader user, indentation can be tricky if you are not prepared for it.

**Alex:** That is a really important point. When you are reading a YAML file, the spacing at the start of the line tells you how things are nested. If you are reading these files, I highly recommend configuring your screen reader to announce indentation. In NVDA, you can do this by pressing NVDA plus Control plus D to open the document formatting settings, and then checking the box to announce line indentation.

**Jamie:** Yes, I do exactly that. Or sometimes I use an extension in Visual Studio Code that plays a little audio tone that goes higher in pitch the more indented a line is. It is super helpful for YAML. So, we have these YAML files in the workflows folder. What is the vocabulary we need to know to actually read them? I know there is a specific hierarchy of terms.

**Alex:** There is. The hierarchy goes like this. Workflow, event, job, step, and action. Let us break those down. A workflow is the entire automated process. Each YAML file in that folder represents one workflow. For example, you might have a file called tests dot y m l. That entire file is your testing workflow.

**Jamie:** Okay, workflow is the whole file. And what triggers the workflow?

**Alex:** That is the event. In the YAML file, you will find a key called on, spelled O N. This defines the trigger event. Common events include push, which triggers when someone pushes a commit to a branch. Another is pull underscore request, which triggers when a pull request is opened or updated.

**Jamie:** So if the file says on colon pull underscore request, that workflow will run every single time I update my pull request.

**Alex:** Exactly. There are other triggers too. You can use schedule to run a workflow on a timer, like every Monday at nine in the morning. Or you can use workflow underscore dispatch, which is a fancy way of saying manual trigger. It adds a button to the GitHub interface so a maintainer can run the workflow whenever they want.

**Jamie:** Alright, so we have the workflow, which is the whole file. We have the event, which wakes the robot up. What comes next?

**Alex:** Next is the job. A workflow can have one or more jobs. A job is a group of steps that run together on the same machine. In the YAML file, you will see a key called jobs. Underneath that, you name your jobs. You might have a job called run dash tests, and another job called build dash documentation.

**Jamie:** You mentioned they run on the same machine. Where is this machine? Is it my computer?

**Alex:** No, it is not your computer. This is one of the coolest parts of GitHub Actions. GitHub provides the computers for you, completely free for public open source repositories. These computers are called runners. They are essentially fresh, clean virtual servers in the cloud. In your YAML file, every job must specify what kind of runner it needs using a key called runs dash on.

**Jamie:** Oh, I have seen this. It usually says something like runs dash on colon ubuntu dash latest.

**Alex:** Exactly. Ubuntu dash latest tells GitHub to spin up a virtual machine running the latest version of the Ubuntu Linux operating system. You can also ask for windows dash latest or macos dash latest if your code needs to be tested on those specific operating systems. So, your job asks for a runner, GitHub provisions that runner, and then the job executes its steps on that machine.

**Jamie:** Which brings us to steps. I am guessing steps are the individual commands we want the runner to execute?

**Alex:** You got it. Steps are executed in order, one by one. A step can just be a simple shell command. For example, you could have a step with the key run, followed by the command npm install. The runner will open its terminal and type npm install. The next step might run npm test.

**Jamie:** This makes so much sense. To use an analogy, the workflow is like a recipe for baking a cake. The event is someone saying they are hungry. The job is the kitchen you are cooking in, like the ubuntu latest kitchen. And the steps are the literal recipe instructions. First, measure the flour. Second, crack the eggs.

**Alex:** That is a brilliant analogy, Jamie. And that analogy leads us perfectly to the final piece of the hierarchy, which is the action. Sometimes, a step is not just a simple shell command. Sometimes, a step uses a pre-built piece of automation called an action.

**Jamie:** Ah, so this is where the name GitHub Actions comes from. What is a pre-built action?

**Alex:** Let us go back to your kitchen analogy. Imagine your recipe requires you to make a complex pastry dough. You could write out fifty steps to make it from scratch. Or, you could just buy pre-made pastry dough from the store and save yourself a ton of time. An action is that pre-made dough. It is a reusable unit of code that someone else wrote, which you can just plug into your workflow.

**Jamie:** Oh, that is clever. How do I use one of these actions in my YAML file?

**Alex:** Instead of using the run key for a shell command, you use the uses key. For example, almost every workflow starts with a step that uses an action called actions slash checkout. You write uses colon actions slash checkout at version four.

**Jamie:** What does the checkout action do?

**Alex:** Remember that the runner is a brand new, empty computer. It does not have your code on it yet. The checkout action is a pre-built script that securely authenticates with GitHub, downloads your repository, and places it into the runner's workspace. Doing that from scratch with shell commands would be tedious and error-prone, but the pre-built action does it perfectly in one line.

**Jamie:** That is amazing. Are there other pre-built actions I can use?

**Alex:** Thousands of them. GitHub hosts a directory called the GitHub Marketplace where anyone can publish an action. There are actions to set up specific versions of Python or Node. There are actions to send a message to a Slack channel when a job finishes. There are even actions that use artificial intelligence to scan your code for accessibility issues. It is basically an app store for automation.


**Jamie:** Okay, so I understand the structure now. Workflows have events. Events trigger jobs. Jobs run on runners. And jobs are made of steps, which can either be shell commands or pre-built actions. That feels very logical. But let us talk about how this actually impacts me as a contributor. When I open a pull request, what are the most common workflows I am going to encounter?

**Alex:** The two most common concepts you will hear about are CI and CD. CI stands for Continuous Integration. CD stands for Continuous Deployment. Let us start with CI. Continuous Integration is the practice of automatically testing every single change made to a codebase.

**Jamie:** So when I open a pull request, the CI workflow is the one that grabs my code and runs the tests.

**Alex:** Exactly. The CI workflow is usually triggered by the pull underscore request event. It spins up a runner, checks out your branch, and runs the project's test suite. It acts like an automated spellchecker for your logic. It ensures that your new code did not accidentally break any existing features.

**Jamie:** And what about CD? Continuous Deployment?

**Alex:** Continuous Deployment usually happens after your pull request is approved and merged. The CD workflow is typically triggered by a push event to the main branch. When the maintainer merges your pull request, the CD workflow wakes up, packages the application, and automatically deploys it to the live production server.

**Jamie:** Wow. So nobody is manually copying files over to a server via FTP anymore. The CD workflow just handles it. It is like an automated printing press that publishes the book as soon as the final edit is approved.

**Alex:** Exactly. Now, there are a few advanced workflow patterns you will see in open source repositories that are worth knowing about. One is called a matrix build.

**Jamie:** A matrix build. That sounds like something out of a science fiction movie. What does it do?

**Alex:** It is actually very practical. Imagine you are writing a JavaScript library that other developers will use. You want to make sure your library works on Node version eighteen, Node version twenty, and Node version twenty-two. Instead of writing three separate jobs, you define a matrix strategy in your YAML file. You provide a list of the Node versions, and GitHub Actions automatically multiplies your job, running three identical runners side-by-side, each testing a different version.

**Jamie:** Oh, I see! Going back to the kitchen analogy, that is like testing a new cookie recipe by baking one batch in a gas oven, one in an electric oven, and one in an air fryer, all at the exact same time, to make sure they all taste good.

**Alex:** That is exactly what it is. And it saves a massive amount of time. Another concept you will encounter is workflow artifacts.

**Jamie:** Artifacts. Like ancient pottery?

**Alex:** Similar concept, actually! When a job runs on a runner, any files it creates are trapped on that virtual machine. When the job finishes, GitHub deletes the runner. It is completely destroyed. So if your job generates a test report, or compiles a binary executable, that file will be destroyed too. Unless you upload it as an artifact.

**Jamie:** Ah, so an artifact is a way to save a file before the virtual machine self-destructs.

**Alex:** Exactly. You use a pre-built action called actions slash upload dash artifact. You tell it which folder to save, and GitHub attaches it to the workflow run as a downloadable zip file. It is like asking the restaurant for a takeaway box for your leftovers before they clean off your table.

**Jamie:** I love that. Takeaway boxes for code. And what about passwords? If a workflow needs to deploy to a live server, it needs the server password. But you said these YAML files are plain text in the repository. We definitely should not put passwords in plain text YAML files, right?

**Alex:** Right. You should never, ever put passwords, API keys, or security tokens in a workflow file. Instead, GitHub has a feature called Secrets. Maintainers can go into the repository settings and save a password as an encrypted secret. Let us say they name it SERVER underscore PASSWORD. In the YAML file, you can reference that secret using a special syntax. GitHub Actions will securely inject the password into the runner when the job starts, and it will even mask the password in the text logs so nobody can read it.

**Jamie:** That makes sense. It is like putting the password in a locked safe, and only the robot assistant has the combination.


**Alex:** So we have covered how workflows are built. But now we need to talk about the most important part for you as a contributor. Status checks. When you open a pull request, how do you know if the CI workflow passed or failed?

**Jamie:** I know this one! If you navigate to the conversation tab of your pull request and scroll down near the bottom, right above the merge button, there is a section called status checks.

**Alex:** Exactly. If you are using a screen reader like NVDA or JAWS in browse mode, you can press the letter H or the number 2 to navigate through the headings until you hear the section for checks. If you are using VoiceOver on a Mac, you can open your rotor with VoiceOver plus U, select headings, and navigate to checks.

**Jamie:** And what does the screen reader actually announce when I get to that section?

**Alex:** It will announce a list of the jobs that ran on your pull request. Each item in the list will announce its name, and its status. If a workflow is currently running, you will hear that it is pending or in progress. If it finishes successfully, you will hear a green checkmark or passed. And if it fails, you will hear a red cross or failed.

**Jamie:** Okay, let us talk about failure. Because the first time I got a red cross on my pull request, I panicked. I thought I broke the entire open source project and that the maintainers were going to be furious with me.

**Alex:** I am so glad you brought that up. We need to normalize failing status checks. A failing check is not a judgment on your worth as a developer. It is not a sign that you did something terrible. It is simply the robot assistant doing its job. It is giving you information. It is saying, hey, this specific test did not pass with your new code.

**Jamie:** That is a very comforting way to look at it. But okay, the robot says I failed. How do I find out why I failed? How do I read the error?

**Alex:** This is where we need to navigate the Actions tab. From that list of status checks on your pull request, every failed check is actually a link. If you press Enter on the failed check, it will take you away from the pull request and into the detailed workflow run page.

**Jamie:** Okay, I am on the workflow run page. There is a lot of information here. How do I find the actual error message efficiently?

**Alex:** The page is organized with a sidebar showing the jobs, and a main content area showing the steps for the selected job. If a job failed, the steps list will show exactly which step caused the failure. Navigate through the list of steps. They are interactive elements. When you find the step that failed, press Enter to expand its log output.

**Jamie:** And the log output is just a big text area showing everything the terminal printed out during that step, right?

**Alex:** Exactly. And these logs can be thousands of lines long. Reading them from top to bottom with a screen reader is completely inefficient. Instead, you should use your screen reader's find command. If you use NVDA, press NVDA plus Control plus F. If you use JAWS, press Insert plus F. If you use VoiceOver, press VoiceOver plus F.

**Jamie:** And what word should I search for?

**Alex:** Search for the word error, or the word failed in all caps. This will usually jump your cursor directly to the line that explains what went wrong. You might find a message saying syntax error on line forty-two, or assertion failed expected true but received false. Once you have that information, you can go back to your code, fix the issue, and commit the change.

**Jamie:** And do I need to manually restart the workflow after I commit the fix?

**Alex:** Usually, no. Because the workflow is listening for the pull underscore request event, pushing a new commit to your pull request branch will automatically trigger the workflow to run again. The yellow pending indicator will appear, and you can wait to see if it turns into a green checkmark.


**Jamie:** Alex, before we wrap up, I want to ask about something specific to our audience. We are a community of blind and low-vision developers. Are there workflows that specifically help with accessibility?

**Alex:** Absolutely. The open source accessibility community relies heavily on GitHub Actions. Many repositories configure automated accessibility scanners to run on every pull request. These workflows use tools like axe-core or pa11y to scan the HTML output of your code and check for WCAG violations.

**Jamie:** Oh, so if I accidentally write an image tag without an alt attribute, the workflow will catch it?

**Alex:** Exactly. The status check will report as failed. And when you read the log, it will tell you that the image is missing an alt attribute. GitHub even has a new AI-powered accessibility scanner action in the marketplace that helps identify and suggest fixes for these issues.

**Jamie:** That is fantastic. But I assume automated tools cannot catch everything, right?

**Alex:** You are entirely correct. Automated accessibility tools catch only about thirty to forty percent of all accessibility issues. They are great for catching structural errors like missing labels or poor color contrast. But they cannot tell you if a complex widget is actually usable with a screen reader. They cannot evaluate the logical flow of a page.

**Jamie:** Which is exactly why manual testing by developers who actually use screen readers every day is so incredibly valuable. The robot assistant can do the basic checks, but it needs us to ensure the experience is actually accessible.

**Alex:** Perfectly said, Jamie. The robot handles the baseline, so we can focus on the human experience. There is one last thing I want to mention about workflows and open source. Sometimes, you will open a pull request on a repository for the very first time, and the workflows will not run at all. Instead, you will see a message saying a maintainer must approve the workflow runs.

**Jamie:** Oh, I have seen that! I thought I did something wrong. Why does it require approval?

**Alex:** It is a security feature. Remember that GitHub provides free cloud computers to run these jobs. In the past, bad actors would open automated pull requests with malicious code designed to mine cryptocurrency on GitHub's free servers. To prevent this, GitHub requires a human maintainer to approve the first-time workflow run from any new contributor.

**Jamie:** So if I see that message, I just need to be patient?

**Alex:** Yes. You can leave a polite comment on your pull request saying, this is ready for review, could a maintainer please approve the workflow runs? Once they approve you that first time, future pull requests from you will trigger the workflows automatically.


**Jamie:** This has been an incredibly enlightening episode. I feel like the black box of GitHub Actions is finally open. I understand what the robot assistant is doing.

**Alex:** I am glad to hear it. Let us recap our concrete takeaways for today. First, GitHub Actions is an automation system defined by YAML files living in the hidden dot github slash workflows directory.

**Jamie:** Second, the hierarchy goes workflow, event, job, step, and action. Events are triggers like a push or a pull request. Jobs run on cloud computers called runners. And steps execute commands or use pre-built actions from the marketplace.

**Alex:** Third, CI workflows test your code on every pull request, acting like an automated spellchecker. CD workflows deploy your code when it merges to the main branch.

**Jamie:** Fourth, failing status checks are normal and helpful. Use your screen reader's find command to search for the word error in the workflow logs so you can quickly fix the issue and push a new commit.

**Alex:** And finally, automated accessibility workflows are great for catching baseline issues, but they do not replace the vital manual testing that developers using assistive technology provide.

**Jamie:** This was fantastic. What are we covering next time?

**Alex:** Next time, in episode 35, we are taking everything we learned today about GitHub Actions and taking it to the next level. We will be discussing GitHub Agentic Workflows. We will learn how to invite a cloud-based AI coding agent to execute tasks inside these workflows, essentially upgrading our robot assistant with artificial intelligence.

**Jamie:** I cannot wait for that.

**Alex:** Until then, keep exploring, keep pushing code, and we will talk to you next time on Gitt Going with GitHub.

</details>


### Episode 35: Profile, Sponsors, and Wikis

Profile README, GitHub Sponsors, and repository Wikis.

Based on: [Appendix R: Profile, Sponsors, and Wikis](docs/appendix-t-community-and-social.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep35-profile-sponsors-wikis.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep35-profile-sponsors-wikis.mp3">Download Episode 35 (MP3)</a>
</audio>

[Download Episode 35 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep35-profile-sponsors-wikis.mp3)

<details>
<summary>Read Transcript - Episode 35: Profile, Sponsors, and Wikis</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub, the audio learning series for blind and low-vision developers who are mastering Git, GitHub, and open-source collaboration. I am Alex, and I am thrilled to be here with you for Episode 35, Profile, Sponsors, and Wikis.

**Jamie:** And I am Jamie. I am so ready for this episode because up until now, we have been very focused on the code. We have talked about repositories, commits, branches, and pull requests. But today feels a little different. Today feels like we are talking about the people behind the code.

**Alex:** That is exactly right, Jamie. GitHub is the largest host of source code in the world, but it is also a massive social network for developers. And just like any community, how you present yourself, how you support others, and how you share knowledge all matter deeply. Today, we are covering three community-facing features. First, your profile page and how to create a custom profile README. Second, GitHub Sponsors, which is a way to financially support open-source maintainers. And third, GitHub Wikis, which is a built-in tool for creating project documentation.

**Jamie:** I remember when I first started learning GitHub about two years ago, I was terrified to look at my own profile page. I felt like it was this giant blank billboard announcing to the world that I was a beginner.

**Alex:** That is such a common feeling! Let us start right there. Your profile page is what visitors encounter when they navigate to github dot com slash your username. Think of it as your digital front porch, or your developer business card. By default, it shows your name, maybe a bio if you filled one out in your account settings, a list of repositories you have contributed to, and a contribution graph. But a few years ago, GitHub added a secret feature, an Easter egg, really, that lets you completely customize this page.

**Jamie:** Oh, I love a good Easter egg. What is the secret?

**Alex:** It is called the profile README. If you create a brand new repository, and you name that repository exactly the same as your GitHub username, something special happens.

**Jamie:** Wait, let me make sure I understand. My username is Jamie Codes. So I would create a repository and literally name it Jamie Codes?

**Alex:** Exactly. It is case-sensitive, so it needs to match perfectly. You create a new public repository named Jamie Codes. You initialize it with a README file. And here is the magic part. Whatever you write inside that specific README file will be automatically displayed right at the top of your main GitHub profile page.

**Jamie:** That is incredibly clever. So instead of just a generic list of my projects, I can actually write an introduction. I can say, Hello, I am Jamie, I am learning Python, and I am passionate about digital accessibility.

**Alex:** Exactly. You have complete control. You write it in Markdown, which, as a reminder, is the lightweight text formatting language we use all over GitHub to create headings, lists, and links. Your profile README is the perfect place to include an introduction, your current focus or what you are learning right now, the skills you bring to the table, and how people can get in touch with you.

**Jamie:** I have to admit, okay, when I finally figured this out, I went a little overboard. I found all these tutorials online about adding dynamic widgets and fifty different skill badges for every piece of software I had ever touched.

**Alex:** And how did that work out for your screen reader?

**Jamie:** It was a nightmare! My screen reader would just announce, graphic, JavaScript logo, graphic, Python logo, graphic, HTML logo. It took forever to read through my own profile. I realized I had made my digital front porch completely inaccessible to other blind developers.

**Alex:** That is a brilliant point, and it brings us to making your profile README accessible. Because visitors are skimming this page, you want to keep it clean and structured. First, always use proper heading levels. Start with a level one heading for your name, and level two headings for sections like Skills or Get in Touch. This allows screen reader users to press the H key and jump straight to the information they want.

**Jamie:** Yes, heading structure is a lifesaver. And what about images? I know some people like to put a banner image at the top.

**Alex:** If you use an image, you must provide alternative text, or alt text. In Markdown, you write an exclamation mark, then square brackets containing your description, followed by the image link in parentheses. But even more important than alt text is what you should avoid. You mentioned those auto-generated statistics widgets, like the ones that say Jamie has made forty commits this week. Those are often rendered as complex scalable vector graphics, or SVGs, without proper text equivalents. They are completely silent or read as a jumble of code to a screen reader.

**Jamie:** And let us talk about ASCII art. You know, when people use hundreds of punctuation marks to draw a picture of a cat or a spaceship?

**Alex:** Please, do not put ASCII art in your profile README. A screen reader will dutifully read every single character. Dash dash dash slash backslash asterisk asterisk. It is incredibly frustrating for someone just trying to find your email address. Keep it human, keep it authentic, and keep it simple. A well-written paragraph about who you are is far more impactful than a wall of noisy widgets.

**Jamie:** I ended up deleting all those badges and just writing a few bullet points about my current projects and my screen reader testing experience. It felt much more authentic. Now, Alex, you mentioned the contribution graph earlier. I have heard my sighted colleagues talk about this a lot. They talk about their green squares and keeping their streak alive. Can you explain what the contribution graph is and what those squares actually represent?

**Alex:** Absolutely. The contribution graph is a visual calendar on your profile page that shows your GitHub activity over the past year. Sighted users see a grid of little squares, where each square represents a day. If you made a contribution on that day, the square is colored green. The more contributions you made, the darker the green.

**Jamie:** And what counts as a contribution?

**Alex:** A contribution is recorded when you commit code to a repository's default branch, when you open an issue, when you propose a pull request, or when you submit a pull request review. So it is essentially a data log of your public activity.

**Jamie:** It sounds like a fitness tracker, but for coding. Like hitting your ten thousand steps, but instead, you are making commits.

**Alex:** That is a perfect analogy. And just like a fitness tracker, it can be motivating, but it can also be a little toxic if you obsess over it. Some developers feel immense pressure to have a contribution every single day, to keep their streak going. But taking a break is healthy. From an accessibility standpoint, GitHub has improved the screen reader experience for this graph. You can navigate through the grid, and your screen reader will announce the date and the number of contributions made on that day. But remember, this graph is just one metric. It does not measure the quality of your code, your mentorship, or the time you spent reading documentation. It just measures activity.


**Jamie:** Okay, so we have talked about how to present ourselves to the community using the profile README. But part of being in a community is supporting others. Let us talk about GitHub Sponsors. What exactly is it?

**Alex:** GitHub Sponsors is a feature that allows you to financially support the developers and projects that you depend on. If you are familiar with platforms like Patreon, where you can subscribe to support an artist or creator, GitHub Sponsors is exactly like that, but built directly into GitHub for open-source maintainers.

**Jamie:** That makes a lot of sense. Because so much of the software we use every day, even the tools that run the internet, are built by volunteers working in their free time.

**Alex:** Exactly. Many open-source maintainers spend twenty, thirty, or even forty hours a week managing pull requests, fixing bugs, and writing documentation, completely unpaid. GitHub Sponsors was created to help make open-source more sustainable. When you sponsor someone, you usually choose a monthly tier, like five dollars, ten dollars, or twenty-five dollars a month. And the best part is that GitHub covers all the payment processing fees, so one hundred percent of your sponsorship goes directly to the developer.

**Jamie:** That is incredible. So if I am using an open-source screen reader add-on, and it saves me hours of work every week, I could set up a five-dollar monthly sponsorship just to say thank you. How do I actually do that?

**Alex:** It is very straightforward. When you navigate to a user's profile page, or to a specific repository, you can explore the page by pressing the B key on your keyboard to jump between buttons. If that developer has opted into the program, you will eventually land on a button called Sponsor. It usually has a little heart icon next to it for sighted users.

**Jamie:** And when I activate that Sponsor button?

**Alex:** It takes you to their Sponsor profile. There, you can read about why they are seeking sponsorship, and you can navigate through the different payment tiers they have set up. You choose a tier, enter your credit card or PayPal information, and you are done. Your sponsorship will then show up on your own profile page under a Sponsors tab, which is a nice way to publicly show your support for the community, though you can also choose to sponsor privately.

**Jamie:** Some developers offer perks too, right? Like early access to new features or a private chat server for sponsors?

**Alex:** Yes, they can! It is entirely up to the maintainer. Some offer priority bug fixes, others offer one-on-one mentoring, and some just offer their deep gratitude.

**Jamie:** So, flipping the script. What if I am the one building something useful? Can I receive sponsorships?

**Alex:** Absolutely. If you maintain an open-source project, or even if you just contribute regularly to other projects, you can set up a sponsor profile. You navigate to github dot com slash sponsors, and you select the button to join the waitlist or set up your profile. You will need to connect a bank account or a Stripe account so GitHub can send you the funds. Then, you create your tiers and write a description of your work.

**Jamie:** I want to highlight this for our listeners because I know several blind developers who use GitHub Sponsors to fund their accessibility advocacy. They spend hours testing open-source software with screen readers, filing detailed bug reports, and submitting pull requests to fix focus management or ARIA labels. That is incredibly valuable work, and setting up a Sponsors page is a great way to let the community compensate you for that labor.

**Alex:** I am so glad you brought that up, Jamie. Accessibility work is highly specialized, and it absolutely deserves financial support. If you are doing that work, do not be shy about setting up a Sponsors profile and sharing the link in your pull requests or on social media.


**Jamie:** All right, we have covered profiles and sponsors. Let us move to the third topic for today, which brings us back to repositories. GitHub Wikis. I know what Wikipedia is, but what is a GitHub Wiki?

**Alex:** Every repository on GitHub has the option to enable a Wiki. A Wiki is a space for documentation that lives alongside your code, but is kept separate from the code itself. It is entirely text-based, written in Markdown, and is designed to be a lightweight, multi-page reference guide for your project.

**Jamie:** Wait, why would I need a Wiki if I already have a README file? I thought the README was the documentation.

**Alex:** That is a great question. Let us use an analogy. Think of your repository as a workshop where you build furniture. The README file is the welcome mat and the directory poster on the front door. It tells people what the workshop is, what tools are inside, and gives them a quick start guide to building their first chair.

**Jamie:** Okay, so the README is the quick summary.

**Alex:** Right. But what if you have a fifty-page manual on the specific types of wood you use, a troubleshooting guide for the table saw, and a frequently asked questions section about varnishes? If you put all of that on the front door, the poster would be a mile long. Nobody would read it. That is where the Wiki comes in. The Wiki is the filing cabinet or the reference library inside the workshop. It is meant for deep, multi-page documentation.

**Jamie:** That makes perfect sense. So the README gets them started, and the Wiki gives them the deep dive. How do I actually access a Wiki?

**Alex:** When you navigate to any repository on GitHub, there is a navigation menu at the top of the page with tabs like Code, Issues, and Pull Requests. If the maintainer has enabled it, one of those tabs will be called Wiki. If you activate that tab, you are taken to the Wiki home page. If no pages exist yet, you will find a button that says Create the first page.

**Jamie:** And creating a page is pretty straightforward?

**Alex:** Very straightforward. When you activate the New Page button, you are given a simple form with two main fields. First, a text input for the page title. Second, a large text area for the page content. You write your content using the exact same Markdown syntax you use for issues and pull requests. Then, you move to the bottom of the page and activate the Save Page button.

**Jamie:** I assume I need to use good heading structure here too, right?

**Alex:** Always. Because Wikis often contain long articles, using clear heading levels is crucial for screen reader users to navigate the content. Another great feature of Wikis is that GitHub automatically generates a sidebar navigation menu with links to all the pages you create, so visitors can easily jump between different topics. And you can link between pages yourself. If you type two opening square brackets, the name of another Wiki page, and two closing square brackets, GitHub automatically creates a link to that page.

**Jamie:** That is really handy. But I have another question. Let us say I have a repository, and inside my code files, I just create a folder called docs, D O C S. And I put a bunch of Markdown files in there. How is a Wiki different from just having a docs folder in my code?

**Alex:** This is where we get into the architecture of GitHub. When you put documentation inside a docs folder in your main repository, it is version-controlled exactly like your code. If someone wants to change a typo in the documentation, they have to create a branch, make a commit, and open a pull request. The maintainer has to review it and merge it.

**Jamie:** Which is great for control, but maybe a bit heavy for a simple typo.

**Alex:** Exactly. A Wiki, on the other hand, is actually an entirely separate Git repository running quietly behind the scenes. By default, Wikis are designed to be community-editable. Depending on how the maintainer configures the settings, any GitHub user might be able to navigate to a Wiki page, activate the Edit button, make a change, and save it instantly, without going through a pull request review process.

**Jamie:** Oh, wow. So no pull requests, no branch protection rules. Just edit and save.

**Alex:** Yes. Which makes Wikis incredibly powerful for community-driven knowledge bases. If you have an active community of users, they can collectively maintain a list of frequently asked questions or community tutorials without bottlenecking the main developers with pull requests.

**Jamie:** But that also sounds a little risky for official documentation.

**Alex:** It is. And that is the primary caveat. Because changes to the Wiki bypass your branch protection rules and pull request reviews, you should not use a Wiki for your primary, critical, version-controlled documentation. If your documentation needs to be tied to specific versions of your software, you should use a docs folder or a tool like GitHub Pages. But if you want a collaborative scratchpad, a community FAQ, or a lightweight reference guide, the Wiki is the perfect tool.


**Jamie:** This has been a really refreshing episode. It is nice to zoom out from the command line and think about the community aspects of open source.

**Alex:** I completely agree. The tools are only as good as the people using them, and these features help us connect as humans. Let us recap our key takeaways for today. First, you can create a custom profile README by creating a public repository with the exact same name as your GitHub username. This acts as your developer business card.

**Jamie:** Second, keep that profile README accessible. Use proper headings, include alt text for images, and please, skip the ASCII art and those noisy SVG stat badges. Keep it authentic and readable.

**Alex:** Third, GitHub Sponsors is a powerful way to financially support the maintainers who build the open-source tools you rely on. It is also a platform you can use to receive funding for your own contributions, including critical accessibility advocacy.

**Jamie:** And finally, GitHub Wikis provide a separate, multi-page reference library attached to your repository. They use Markdown and are great for community-editable guides, but remember they bypass the standard pull request review process.

**Alex:** Perfect summary, Jamie. You now have the tools to build your presence, support your peers, and document your projects. In our next episode, we are going to look at how teams organize themselves on GitHub. We will be covering GitHub Organizations and Repository Templates, which are essential when you start collaborating with larger groups.

**Jamie:** I cannot wait to dive into that. Thank you all for listening, and we will catch you in the next episode!

**Alex:** Happy coding, everyone. Keep building, and keep sharing.

</details>


### Episode 36: Organizations and Templates

GitHub Organizations, repository templates, visibility, and archiving.

Based on: [Appendix S: Organizations and Templates](docs/appendix-t-community-and-social.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep36-organizations-templates.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep36-organizations-templates.mp3">Download Episode 36 (MP3)</a>
</audio>

[Download Episode 36 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep36-organizations-templates.mp3)

<details>
<summary>Read Transcript - Episode 36: Organizations and Templates</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode 36, Organizations and Templates. I am your host, Alex, and as always, I am here to help you navigate the world of version control and open source collaboration.

**Jamie:** And I am Jamie. I am here to ask all the questions that you are probably thinking as you listen. I started learning GitHub about two years ago, and I still remember how wild it felt to move past just hosting my own small projects. Today, we are graduating. We are moving from single player mode into massive multiplayer mode.

**Alex:** That is a perfect way to describe it. In our previous episodes, we have spent a lot of time talking about personal accounts. We covered how to create your own repositories, how to fork someone else's repository, and how to create a pull request, which is when you request that someone pull your changes into their project. But if you look at a massive open source project, or if you get a job working as a developer at a company, they are not just hosting all their code on one person's personal account.

**Jamie:** Right. It would be pretty funny if the entire infrastructure of a massive company was just sitting on an account called cool coder ninety nine.

**Alex:** Exactly. And that brings us to our first major concept for today, which is the GitHub Organization. A GitHub Organization is a shared account designed for groups of people. It is a completely different type of account from your personal user account.

**Jamie:** So, how should I think about the difference between my personal account and an organization account?

**Alex:** I like to use a real estate analogy for this. Think of your personal GitHub account like your personal apartment. You are the only person who holds the master key. You decide what goes on the walls, you decide who is allowed to visit, and everything in it belongs to you. A GitHub Organization is more like an office building. It is a shared space. It has a name on the outside of the building, and inside, there are many different people working together. The assets, which are the repositories, belong to the organization itself, not to any one single person.

**Jamie:** That makes a lot of sense. And I know this changes the web address too. My personal repositories live at github dot com slash my username slash the repository name. But for an organization, it uses the organization's name in that middle spot. For example, the project we use in our workshop lives at github dot com slash community dash access slash accessibility dash agents. In that address, community dash access is the organization.

**Alex:** Spot on. Now, anyone can create an organization, and you might be wondering about the cost. Creating a GitHub Organization can be completely free, or it can be a paid plan.

**Jamie:** I always get a little nervous when I hear the word paid. If I want to start an open source community with a few friends, do I need to pull out my credit card?

**Alex:** Not at all. The free tier for organizations is incredibly generous and is designed specifically to support open source communities. You can have unlimited public and private repositories, and you can invite as many members as you want. The paid plans are really for businesses and enterprises. The paid plans add features like advanced auditing, single sign on integration so employees can log in with their corporate credentials, and highly specific access controls. But for almost any community project, the free tier is exactly what you need.

**Jamie:** Okay, so let us say I create an organization for my friends and me. We have this virtual office building now. How do we manage who gets to do what? Because in my personal apartment, I am the boss. But in an office building, you usually have different people with different jobs.

**Alex:** That is where Organization Roles come into play. When you invite someone to join your organization, you have to assign them a role. The three main roles you need to know about are Owner, Member, and Billing Manager.

**Jamie:** Let me guess. The Owner is the person who holds the keys to the entire building.

**Alex:** Exactly. Owners have complete administrative control over the organization. They can delete the organization, they can remove other members, and they can change any setting. You usually want to keep the number of owners very small. Then you have the Member role. This is the standard role for almost everyone else in the organization. Members can create repositories, they can collaborate on projects, and they can be assigned to specific teams. Finally, there is the Billing Manager. This role is strictly for the person paying the bills. A Billing Manager can update credit card information and view receipts, but they do not get access to the code. Think of them as the accountant for the building. They can access the financial office, but they cannot walk into the engineering labs.

**Jamie:** I love that. The accountant does not need to see my messy code anyway. So, if I am a standard member, how do I actually join? Does someone just add me and suddenly I am in?

**Alex:** An owner has to invite you. When they do, you will receive an email and a notification inside GitHub. You have to explicitly accept the invitation. You can navigate to github dot com slash settings slash organizations to accept it, or just open the link in your email.

**Jamie:** I want to share a quick story about this, because I was so confused by this when I first joined an organization. I got the invite, I accepted it, and I was so proud. I immediately went to my public GitHub profile page to see the organization badge shining on my profile. But it was not there. I thought I did something wrong.

**Alex:** That is a very common experience. By default, when you join an organization, your membership visibility is set to private. That means only you and the owners of the organization can see that you are a member. To the rest of the outside world, you are invisible.

**Jamie:** Which is great for privacy, but terrible for my ego.

**Alex:** Exactly. If you want people to know you are part of that community, you have to navigate to your organization settings and manually change your membership visibility from private to public. Once you do that, the organization's logo will appear on your public profile.


**Jamie:** Okay, so we have our office building, we have our owners, and we have our members. But what happens when the organization gets really big? Like, hundreds of members. How do you keep track of who is working on what?

**Alex:** That is where Teams come in. Teams within organizations allow you to group members together based on their role or their project. Staying with our office analogy, if the organization is the building, teams are the different departments. You might have a design department, a security department, and an accessibility review department.

**Jamie:** And this actually solves a problem I used to run into. Sometimes I would open a pull request, and I needed someone with screen reader expertise to review my code. Before I knew about teams, I had to guess who to ask, or I would just mention the one person I knew. Which meant that one poor person got pinged every single time I needed a review.

**Alex:** Yes, that is a quick way to burn out your volunteers. Teams solve this beautifully. An organization owner can create a team, let us call it accessibility dash reviewers, and add five people to it. Then, when you open your pull request, you do not need to mention a specific person. You just type the at symbol, followed by the organization name, a forward slash, and the team name. So you would type at community dash access slash accessibility dash reviewers. GitHub will automatically notify everyone on that team that a review is requested.

**Jamie:** That is so clever. It distributes the workload. As a contributor, I do not usually have permission to create teams, right?

**Alex:** Usually not. Creating teams is generally reserved for owners or specific team maintainers. But as a contributor, you need to understand what teams are so that you know why you are suddenly getting notifications when a team you belong to is mentioned, and so you know how to request reviews from teams yourself.


**Jamie:** Let us talk about the repositories inside these organizations. In my personal account, a repository is either public, meaning anyone on the internet can see it, or private, meaning only I can see it unless I invite someone. Does an organization have those same options?

**Alex:** Yes, but organizations get one additional option. Repository visibility in organizations can be public, private, or internal.

**Jamie:** Internal? How is that different from private?

**Alex:** Let us go back to our analogies. A public repository is like a public park. Anyone can walk in, sit on a bench, and look around. You do not even need a GitHub account to read the code in a public repository. A private repository is like a locked room inside the office building. Only specific people who are explicitly handed a key to that exact room can get in. Even if you work in the building, if you do not have a key to that room, you cannot see it.

**Jamie:** Okay, so where does internal fit in?

**Alex:** An internal repository is like the company breakroom. It is completely hidden from the outside public, but anyone who is a member of the organization can walk in. You do not need a special invitation to that specific repository. If you are in the organization, you can see all the internal repositories. This is incredibly useful for companies that want to share code freely among their own employees, but do not want that code leaked to the public internet.

**Jamie:** That makes perfect sense. For our listeners using screen readers, how do we actually know what the visibility of a repository is when we land on the page?

**Alex:** When you open a repository page, the visibility badge is displayed very prominently at the top of the page. For screen reader users, the easiest way to find this is to press the number one key to navigate to the main heading level one, which is the repository name. Right next to that heading, your screen reader will announce a label that says Public, Private, or Internal. It is usually the very next element in the reading order.


**Jamie:** Okay, let us shift gears a bit. We have talked about how to organize people and control visibility. But I want to talk about actually creating new projects. In the past, I have always just created a blank repository and started from scratch. But I have been seeing this button lately called Use this template. It sits right next to the Fork button. And honestly, it confuses me. What is a repository template, and how is it different from a fork?

**Alex:** This is a fantastic question, and it is a point of confusion for almost every developer when they first encounter it. Let us break it down. A repository template is a special status that a maintainer can apply to a repository. It turns that repository into a starting point, or a boilerplate, for new projects.

**Jamie:** So how is that different from forking? Because when I fork a repository, I am also getting a copy of someone else's project to use as a starting point.

**Alex:** The difference is all about the history and the future relationship between the projects. Let us use an analogy. Forking a repository is like taking a collaborative document and making a linked copy. You get the entire revision history of every change ever made to that document. And more importantly, a fork maintains a permanent umbilical cord back to the original project. The whole purpose of a fork is that you plan to make changes and send those changes back up to the original owner via a pull request.

**Jamie:** Okay, so a fork is for contributing back. What about a template?

**Alex:** A template is like buying a cookie cutter, or a blank piece of official stationery. When you use a template, you are creating a brand new repository that stamps out a copy of the files, the folders, and the structure. But it strips away all of the commit history. You start completely fresh with a clean slate. And there is no umbilical cord. Your new repository has absolutely no connection to the template it came from. You cannot easily open a pull request back to a template. You use a template when you want to start your own distinct project, but you do not want to spend two hours setting up the basic folder structure and configuration files.

**Jamie:** Oh, that is huge. The commit history part is the real differentiator. With a fork, I get thousands of old commits from the original authors. With a template, commit number one is just me creating the project.

**Alex:** Exactly.

**Jamie:** So, what actually transfers over when I use a template? Is it just the main branch?

**Alex:** By default, yes. When you use a template, GitHub creates a new repository containing all the files and folders from the template's default branch. It does not transfer issues, it does not transfer pull requests, and it does not transfer repository settings or branch protection rules. It just gives you the files so you can get to work. However, there is a checkbox you can select during the creation process that says include all branches. If you check that, it will copy the files from all the branches, but again, without the commit history.

**Jamie:** OK that sounds like a lot of steps to set up. How do I actually use a template if I find one?

**Alex:** It might sound like a lot, but it does! But here is the thing - you have already done most of this on day one of your GitHub journey. It is the exact same workflow as creating a standard repository, just with GitHub handling the heavy lifting of copying the files for you. To use a template, you simply navigate to the template repository. Near the top of the page, right next to the Code button, there is a button labeled Use this template.

**Jamie:** For screen reader users, what is the fastest way to get to that button?

**Alex:** The quickest way is to press the letter B to navigate through the buttons on the page. Once you hear Use this template, press Enter. That will open a dropdown menu. Use your down arrow key to navigate to the option that says Create a new repository, and press Enter again. From there, you will be taken to a page that looks almost identical to the standard new repository page. You give it a name, you choose whether it should be public or private, and you confirm. Within seconds, you have a brand new repository fully populated with the template files.

**Jamie:** That is incredibly smooth. What if I want to be the one providing the cookie cutter? How do I turn one of my own repositories into a template so other people can use it?

**Alex:** It is literally one checkbox. You must have maintainer or owner access to the repository to do this. You navigate to the repository, open the Settings tab, and stay on the General page. If you navigate down through the page, you will find a checkbox labeled Template repository. Just check that box. The moment you do, the Use this template button will appear for anyone who visits your repository.


**Jamie:** Alright, we have covered how to build the office building, how to assign the teams, and how to stamp out new projects using templates. Let us talk about the end of a project's lifecycle. Sometimes projects die. Or they finish, which is a nicer way to think about it. I have noticed sometimes I land on a repository and my screen reader announces a big warning banner that says the repository has been archived. What does archiving a repository mean, and why do maintainers do it?

**Alex:** Archiving a repository is a way of officially retiring a project while preserving its history. Think of it like taking a historical document and placing it inside a glass display case at a museum. People can walk up to the glass, they can read the document, and they can even take a picture of it. But they cannot touch it, and they definitely cannot edit it with a pen.

**Jamie:** So it becomes completely read only?

**Alex:** Exactly. When a repository is archived, no one can open new issues, no one can submit new pull requests, and no one can add new comments to existing discussions. Even the repository owners cannot push new code to it unless they unarchive it first.

**Jamie:** Why not just delete the repository if the project is over? Why leave it up in a glass case?

**Alex:** Because in the open source world, history is incredibly valuable. Even if a piece of software is no longer being updated, thousands of people might still be using it. Or developers might want to look at the code to see how a specific problem was solved. Deleting a repository breaks links, destroys historical context, and frustrates the community. Archiving is the responsible way to say, we are no longer maintaining this, do not expect any bug fixes, but we are leaving the code here for educational purposes.

**Jamie:** That makes a lot of sense. If I am a screen reader user, how do I know if I have stumbled into a museum? Because I do not want to spend an hour reading a codebase only to realize I cannot contribute to it.

**Alex:** GitHub puts a prominent yellow banner at the very top of the page. When you navigate to an archived repository, I highly recommend pressing Control plus Home to jump to the very top of the web page, and then use your down arrow to read the first few lines. Your screen reader will read the banner text, which says, This repository has been archived by the owner on, and then it gives the date. It is usually the very first major piece of text before the repository name. If you hear that, you know you are looking at a retired project.

**Jamie:** If I really love an archived project, can I still fork it?

**Alex:** Yes, you can! You can fork an archived repository and continue the work on your own account. In fact, if you find a repository that you planned to contribute to is archived, the best thing to do is to check the network graph or search GitHub to see if someone else has already forked it and created a successor project.


**Jamie:** We have one last topic to cover today, and this is one that genuinely intimidated me the first time I had to do it. Transferring repository ownership. Sometimes you build a project on your personal account, it gets really popular, and you decide to move it into an organization. How does transferring work, and is it as scary as it feels?

**Alex:** It is totally normal to feel intimidated by this. Transferring a repository is like handing over the deed to a house. You are giving full control of the project to someone else, or to an organization. But GitHub has built in several safety nets to ensure you do not do this by accident.

**Jamie:** What actually happens to the repository when it moves? Do all the links break?

**Alex:** No, and that is the magic of GitHub's transfer system. When you transfer a repository, GitHub automatically sets up a redirect. If someone tries to visit the old web address on your personal account, GitHub smoothly redirects them to the new address in the organization. It also transfers all the issues, the pull requests, the commit history, and the stars. Everything moves over intact.

**Jamie:** That is a relief. So how do I actually execute the transfer?

**Alex:** You navigate to the Settings tab of your repository, scroll all the way to the bottom to the Danger Zone. That section is literally called the Danger Zone, and it is usually marked by a heading level two. In that section, you will find a button to Transfer ownership. When you activate that button, GitHub will ask you to type the name of the new owner or organization.

**Jamie:** And this is where the safety net comes in, right?

**Alex:** Yes. GitHub will force you to manually type out the full name of the repository you are transferring just to confirm. You cannot just accidentally click a button and lose your project. You have to explicitly type out the name to prove you are paying attention. Once you confirm, the new owner receives an email, and they must accept the transfer. The repository does not actually move until they say yes.

**Jamie:** That is really good to know. The typing confirmation definitely makes me feel better. It is like the digital equivalent of being asked, are you sure, are you really sure, okay, sign here.

**Alex:** Exactly. It is designed to make you pause and think.


**Jamie:** Wow. We covered a massive amount of ground today. We moved out of the personal apartment and into the corporate office building.

**Alex:** We did. Let us summarize the key takeaways for today. First, GitHub Organizations are shared accounts designed for communities and companies. They allow you to group people into teams, which makes requesting reviews and managing permissions much easier.

**Jamie:** Second, organization repositories have an extra visibility option called internal. This is like the company breakroom. It is hidden from the public internet, but visible to everyone who is a member of the organization.

**Alex:** Third, repository templates allow you to stamp out new projects with a clean commit history. Remember, a fork keeps the history and the connection to the original project because you want to contribute back. A template gives you a fresh start with no strings attached.

**Jamie:** And finally, archiving a repository puts it in a read only museum display case. It preserves the history without allowing new changes. If you are using a screen reader, press Control plus Home when you load a repository page to check for that archived warning banner at the top of the page.

**Alex:** Perfect summary. You now have the conceptual foundation to navigate massive open source communities and corporate GitHub environments. In our next episode, episode 37, we are going to look at Issue Forms and Community Health Files. We will explore how maintainers use templates to guide contributors on exactly what information to provide when reporting a bug.

**Jamie:** I cannot wait. Those issue forms save so much back and forth communication.

**Alex:** They really do. Until then, keep exploring, keep practicing, and we will see you next time on Gitt Going with GitHub.

</details>


### Episode 37: Contributing to Open Source

Finding issues, scoping contributions, the fork-to-PR workflow, and building habits.

Based on: [Appendix T: Contributing to Open Source](docs/08-open-source-culture.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep37-contributing-to-open-source.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep37-contributing-to-open-source.mp3">Download Episode 37 (MP3)</a>
</audio>

[Download Episode 37 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep37-contributing-to-open-source.mp3)

<details>
<summary>Read Transcript - Episode 37: Contributing to Open Source</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is Episode 37, Contributing to Open Source. I am Alex, and I am here with Jamie.

**Jamie:** Hello everyone! I am so excited for this episode. We are well into Day 2 of our GitHub workshop, and today we are talking about taking everything we have learned so far and actually putting it out into the world.

**Alex:** Exactly. Over the past few episodes, and throughout Day 1 of the workshop, we covered the core mechanics. We talked about branches, commits, and pull requests. We have set up our local environments. Now, we are going to talk about using those skills to collaborate on public open source projects.

**Jamie:** And I have to admit, when I first heard the phrase open source contribution, I was terrified. Before I learned GitHub a couple of years ago, I thought contributing to open source meant you had to be a professional developer with twenty years of experience, writing complex operating system code in C plus plus.

**Alex:** That is such a common misconception, and it keeps so many talented people from getting involved. The truth is, open source software is just software whose source code is publicly available. Anyone can read it, use it, and contribute to it. But the word code in source code makes people think that programming is the only way to contribute.

**Jamie:** Which is completely false!

**Alex:** Completely false. What counts as a contribution is so much broader than that. Writing or improving documentation is a massive contribution. Filing a clear, reproducible bug report is a contribution. Reviewing other people's changes, translating content, adding automated tests. All of these are essential to keeping a project healthy.

**Jamie:** I like to think of an open source project like a community garden. Yes, planting seeds is important, which would be like writing new features. But if nobody waters the plants, or fixes the broken lock on the front gate, or paints the signs so people know what is growing where, the garden falls apart. Writing documentation is painting those signs. Filing bug reports is telling the community that the gate is broken.

**Alex:** I love that analogy. And for our listeners, who are blind and low-vision developers, I want to emphasize something very specific. You possess a superpower in the open source world. Assistive technology users bring a perspective that the vast majority of sighted, mouse-first developers simply do not have.

**Jamie:** Oh, absolutely. When I navigate a webpage, I know immediately if the heading structure is broken. Or if I land on a form and my screen reader just says button, button, button, because there are no accessible names. A sighted developer using a mouse might never notice those missing labels because the buttons have visual icons on them.

**Alex:** Exactly. When you encounter a project with those issues, filing a bug report that explains exactly what your screen reader is announcing, and how it breaks your navigation, is a high-value contribution. Suggesting a fix, like adding an aria-label or fixing the heading levels, improves that project for everyone. You do not need anyone's permission to do this. If a repository's issues are public, you can suggest an improvement today.


**Jamie:** Okay, so let us say I am convinced. I want to help fix the garden. How do I actually find my first issue? Because there are millions of repositories on GitHub. It feels like looking for a needle in a haystack.

**Alex:** It does, but GitHub has specific tools to help you narrow it down. Most welcoming open source projects use labels to categorize their issues. When you are on a repository page, you can navigate to the Issues tab, and filter by these labels.

**Jamie:** And there are specific labels meant just for beginners, right?

**Alex:** Yes. The most common one is the label called good first issue. This label means the project maintainers have explicitly reviewed the task and decided it is a great starting point for someone who has never contributed to their project before. It usually means the problem is well-defined and does not require understanding the entire architecture of the software.

**Jamie:** Another one I always search for is the label help wanted. That usually means the maintainers know this is an issue, but they do not have the time to fix it themselves, and they are actively inviting community members to pick it up.

**Alex:** Right. You might also encounter labels like beginner, or easy, or first-timers-only. And do not forget labels that describe the type of work, like documentation or accessibility. If you want to start without writing code, filtering for the documentation label alongside good first issue is a brilliant strategy.

**Jamie:** What if I do not have a specific project in mind yet? Can I search across all of GitHub?

**Alex:** You can. You can use GitHub's global search. For example, if you type label colon quote good first issue quote, space, is colon open, space, language colon markdown. That search string will return open issues labeled as good first issue, specifically in repositories that use Markdown, which usually means documentation tasks. It is a fantastic way to find small typos or broken links to fix.


**Jamie:** So, I run my search, and I find an issue that sounds interesting. How do I know if the project itself is a good place to contribute? Because some communities are more welcoming than others.

**Alex:** That is a crucial question. Before you invest time in a project, you should evaluate the project and the community. First, check their activity. Navigate to the repository's main page and check when the last few commits were made. If the project has not been updated in four years, your contribution might sit there forever without being reviewed.

**Jamie:** I also like to read through a few recent issues or pull requests to gauge responsiveness. If people are opening issues and the maintainers are replying politely within a few days, that is a great sign. If people are asking for help and getting ignored, or worse, getting rude responses, I usually move on. There are plenty of finding communities that welcome new contributors, so there is no need to waste time on toxic ones.

**Alex:** Absolutely. Another major indicator of a welcoming community is a Code of Conduct. This is usually a file named CODE OF CONDUCT dot md. It outlines the community's standards for behavior and how they handle harassment or unacceptable behavior. A project that takes the time to establish and enforce a Code of Conduct is actively thinking about creating a safe space for contributors.

**Jamie:** And while we are talking about files in the repository, we have to mention the CONTRIBUTING dot md file.

**Alex:** Yes! Every project has different expectations. The contributing file is essentially the rulebook for that specific project. It tells you exactly how the maintainers want you to submit your work.

**Jamie:** Going back to analogies, it is like staying at a guest house. Before you start rearranging the kitchen, you should read the house rules left on the counter. The contributing file might tell you that they want commit messages formatted a specific way, or that you need to run a certain command to test your code before opening a pull request. Reading that file saves everyone a lot of time.


**Alex:** Let us talk about the issue itself. You found a welcoming project, you read the contributing file, and you found an issue labeled good first issue. Before you start typing, you need to read the issue carefully and scope your contribution.

**Jamie:** Scoping is so important. When I first started, I would find an issue about a broken link, and while I was in the file, I would decide to rewrite three paragraphs, fix some formatting, and reorganize the folders. And then my pull request would get rejected because it was too massive and touched too many things.

**Alex:** That is the classic trap! A good first contribution needs to be tightly scoped. Start small. Pick one thing. If the issue is about a broken link, fix only the broken link. One pull request, one problem.

**Jamie:** Exactly. If you are a plumber hired to fix a leaky faucet, you do not decide to spontaneously replumb the entire house without asking. It is too much to review.

**Alex:** A sign that a contribution is too large for a first attempt is if your proposed pull request touches more than three or four files, or if you feel like you need to understand the entire codebase just to make the change. A well-executed small contribution, like fixing a single typo, is infinitely more valuable than a massive contribution that never gets merged because it is too complex for the maintainers to review.

**Jamie:** Also, check the issue comments before you start. Is anyone else already working on it? Look for recent comments from other developers saying, I will take this, or check if there is an open pull request linked to the issue. If someone else is actively working on it, you probably want to find a different issue to avoid duplicating effort.

**Alex:** If the coast is clear, and the issue makes sense, leave a brief, polite comment. Something like, I would like to work on this, I will open a draft pull request shortly. This claims the issue and lets the maintainers know you are on it.


**Jamie:** Alright, we have claimed the issue. Now we have to actually do the work. OK, this part sounds like a lot of steps when you first hear it.

**Alex:** It does! But here is the thing. You have already done most of this on Day 1 of the workshop. It is the exact same workflow, just with one extra step at the beginning because we are working across different accounts. Let us walk through the contribution workflow end to end.

**Jamie:** Step one is the new part. We have to fork the repository.

**Alex:** Right. Because you do not have write access to someone else's public project, you cannot just create a branch directly on their repository. So, you navigate to their repository on GitHub, and activate the Fork button. A fork is simply a complete copy of their repository that lives under your own GitHub account.

**Jamie:** I like to think of a fork like copying a recipe card. The original author has their recipe for chocolate chip cookies in their recipe box. You cannot go into their house and write on their card. But you can make a photocopy, put it in your own recipe box, and then make all the notes and changes you want.

**Alex:** Perfect analogy. So, you fork the repository. Step two is to clone your fork to your computer, or open it in a GitHub Codespace. Cloning is just downloading that recipe from your GitHub account down to your local workspace.

**Jamie:** Step three, we create a branch. We learned this on Day 1. You never work directly on the main branch. You create a new branch with a descriptive name, like fix slash broken dash link. You can do this in the terminal, or by opening the command palette in VS Code by pressing Control plus Shift plus P, and typing Git Create Branch.

**Alex:** Step four, you make your change. You open the file, you edit the broken link, you save the file, and you test it with your screen reader to make sure it reads correctly.

**Jamie:** Step five, we commit the change. Again, Day 1 stuff. We stage the file, and write a clear commit message. Not just fixed stuff, but fixed broken link in setup guide.

**Alex:** Step six, you push the branch. This sends your saved changes from your local computer back up to your fork on GitHub.

**Jamie:** And finally, step seven. The grand finale. You open a pull request. You navigate back to the original repository on GitHub, and GitHub will usually display a banner recognizing your recent push, with a button to Compare and pull request. You activate that, and you are literally requesting that the maintainer pull your changes from your recipe box back into their original recipe box.


**Alex:** When you reach that pull request screen, you need to write a description. Writing a pull request description that maintainers will appreciate is an art form. You are handing them a piece of work to review, and they might have zero context about who you are or what you are doing.

**Jamie:** A good pull request description should answer three questions. What, Why, and How.

**Alex:** Exactly. What did you change? Why was the change needed? And how did you verify it works?

**Jamie:** So instead of just writing, I fixed the link, you would write, Fixed a broken link on line thirty four of setup guide dot md. The link pointed to an old setup page that no longer exists. I updated it to the new pre workshop setup page. I verified the target file exists and the anchor link routes correctly.

**Alex:** If I am a maintainer, and I read that description, I can approve your pull request almost instantly. You have given me all the confidence I need that your change is safe and correct.

**Jamie:** But what if they do not approve it instantly? What if they leave a comment asking me to change something? I remember my first pull request, the maintainer asked me to reword a sentence. I felt like I had failed the test. I thought they were rejecting my work.

**Alex:** That is such a natural reaction, but it is so important to reframe that. Responding to review feedback is not a rejection. It is collaboration. It is totally normal for a maintainer to ask for tweaks. Think of them like an editor at a newspaper. You submitted an article, and they are just doing a quick copy edit before it goes to print.

**Jamie:** So when they ask for a change, do I have to start the whole process over? Do I close the pull request and make a new one?

**Alex:** No, and this is the magic of Git. Your pull request is tied to your branch. If a maintainer asks for a change, all you do is go back to your editor, make the change they requested, save the file, commit the change, and push it to your branch again. The pull request on GitHub automatically updates with your new commit.

**Jamie:** That was a huge aha moment for me when I learned that. You just keep pushing to the same branch, and the conversation continues in the pull request until everyone is happy.

**Alex:** And remember, assume good intent. Maintainers are often volunteers managing these projects in their spare time. If they are brief, or if they take a week to reply, it is usually just because they are busy. If you are waiting for a review, it is completely appropriate to leave one polite follow up comment after a week or two, just saying, Hi, checking in on this when you have a moment.


**Jamie:** So, the maintainer reviews it, they approve it, and they merge it. What happens next?

**Alex:** When your pull request is merged, your name is permanently added to the project's commit history. The issue is closed, and you are officially listed as a contributor to that project. This record is publicly available on your GitHub profile. It demonstrates that you know how to scope a problem, communicate with a team, address feedback, and deliver a solution.

**Jamie:** It feels amazing. But the hardest part is definitely just starting. Getting that first one merged. Once you do it once, you realize the workflow is totally manageable. So how do we build a sustainable contribution habit after this workshop ends?

**Alex:** The best way is to set a low bar. Do not pressure yourself to build major features. Keep a list of open source tools, screen readers, or libraries you use every day. When you find a typo in their documentation, fix it right then. If you run into a bug, take fifteen minutes to write a clear, reproducible bug report. A bug report is a real contribution.

**Jamie:** And another great way to build the habit is by continuing to learn. Which brings us to a fantastic resource that is completely free, highly accessible, and lets you practice all of this in a safe environment. GitHub Skills.

**Alex:** Yes, we need to talk about GitHub Skills. This is GitHub's self-paced interactive learning platform. What makes it unique is that there is no external website, no separate login, and no videos to watch. Every course runs entirely inside GitHub.

**Jamie:** It is so cool. When you start a course, GitHub copies a training repository into your own account. And then, an automated bot named Mona becomes your teacher. Mona will open an issue in your repository with instructions for step one.

**Alex:** And because it all happens through standard GitHub issues and pull requests, the screen reader navigation skills we have practiced apply perfectly. You use your heading navigation to jump through Mona's instructions. You navigate to the code tab to make your changes. When you complete a task, like opening a pull request, Mona automatically detects it, validates your work, and posts the next step as a comment.

**Jamie:** We actually use three of these courses during Day 1 of the workshop. Introduction to GitHub, Communicate Using Markdown, and Review Pull Requests. But there are over thirty courses available in the GitHub Skills catalog, organized into learning paths.

**Alex:** Exactly. If you want to continue structured learning after Day 2, you can choose a path that matches your goals. For example, Path 1 covers Git Fundamentals. It includes a great short course on resolving merge conflicts, which is a skill every developer needs to practice.

**Jamie:** Path 2 focuses on GitHub Collaboration. That is where you learn repository management, setting up branch protection, and using GitHub Pages to host a website. If you want to get deep into open source maintainership, that is the path for you.

**Alex:** There is Path 3 for GitHub Actions and Automation, where you learn to build automated workflows to test your code. And Path 4 is all about GitHub Copilot. It teaches you how to use AI-assisted development, from basic code completion to using Copilot's agent mode and building custom extensions.

**Jamie:** And the best part is, you can take your time. Each course takes maybe thirty to sixty minutes. You can track your progress by keeping a list of the courses you have completed. All the links are available in Appendix Z of the workshop materials.


**Alex:** We have covered a lot of ground today. Let us wrap up with some concrete takeaways for contributing to open source. First, remember that code is only one type of contribution. Documentation, bug reports, and accessibility reviews are incredibly valuable and desperately needed.

**Jamie:** Second, start small. Search for issues labeled good first issue or help wanted, and scope your work tightly. One problem, one pull request. Do not try to replumb the whole house.

**Alex:** Third, respect the project's workflow. Evaluate the community for a Code of Conduct, read the contributing rules, and write clear pull request descriptions explaining what you changed, why, and how you tested it.

**Jamie:** And finally, embrace feedback. When a maintainer asks for changes, they are collaborating with you, not rejecting you. Just make the change, commit, and push back to your branch.

**Alex:** That is exactly right. Build the habit by starting with GitHub Skills, fixing small things, and participating in communities you already use.

**Jamie:** I cannot wait to see what everyone contributes. So, what is coming up in our next episode?

**Alex:** In Episode 38, we are shifting gears. We will be diving deep into GitHub Actions. We are going to demystify continuous integration and continuous deployment, and show you how to automate your testing and workflows so the robots do the heavy lifting for you.

**Jamie:** Oh, I love making the robots do the work. That is going to be a fun one.

**Alex:** It really is. Thank you all for listening to Gitt Going with GitHub. We will see you in the next episode!

</details>


### Episode 38: Resources and Links

Tools, references, communities, and continued learning paths.

Based on: [Appendix U: Resources and Links](docs/appendix-x-resources.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep38-resources.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep38-resources.mp3">Download Episode 38 (MP3)</a>
</audio>

[Download Episode 38 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep38-resources.mp3)

<details>
<summary>Read Transcript - Episode 38: Resources and Links</summary>

#### Transcript

**Alex:** Welcome back to Gitt Going with GitHub. This is episode 38, called Resources and Links. I am Alex, your lead host, and as always, I am joined by Jamie.

**Jamie:** Hello everyone. We are getting toward the end of our two-day workshop material, and I have to admit, my brain is feeling a little bit full. We have covered issues, pull requests, merge conflicts, Copilot, VS Code, and custom agents. It is a massive amount of information.

**Alex:** It really is, Jamie. And if you are listening to this and feeling slightly overwhelmed, I want to completely normalize that. It is a lot of steps. It is a whole new vocabulary. But here is the thing, you have already done the hardest part. You have built the mental model. You understand how these pieces fit together. Now, it is just about having the right references so you do not have to memorize every single command or keyboard shortcut.

**Jamie:** That is a relief. Because I definitely do not have every shortcut memorized yet. When I learned GitHub about two years ago, I spent half my time just trying to figure out where to go when I got stuck. It felt like walking into a massive library without a card catalog.

**Alex:** Exactly. And that is exactly what this episode is for. We are going to build your personalized card catalog. We are covering every tool, link, and community reference mentioned in this workshop, plus where to go for help after the workshop ends. We will talk about official documentation, continued learning paths, and how to find accessibility-focused open source projects to contribute to.

**Jamie:** So, where do we start? Do I need to bookmark fifty different websites right now?

**Alex:** No, actually, you only need one. The central project repository from this workshop. The Accessibility Agents repository that you forked on Day 1. That is your permanent reference.


**Alex:** Let us talk about that fork. When you fork a repository, you are making your own personal copy of the project on GitHub. But the real magic happens when you bring it down to your own computer. We call that cloning. Cloning is creating a local copy of a repository on your own hard drive.

**Jamie:** Right, so if I clone my fork of the Accessibility Agents repository, I have all the code, but I also have all the documentation we have been using.

**Alex:** Precisely. Every guide, every cheat sheet, every appendix from this workshop lives in a folder called docs inside that repository. Once you clone it, that documentation works completely offline. Think of it like downloading a comprehensive survival guide before you go off the grid into the wilderness. Even if you have no internet connection, you can open the folder in VS Code, use your screen reader to navigate the markdown files, and read up on how to resolve a merge conflict or how to write an issue template.

**Jamie:** That is incredibly useful. I fly a lot, and having offline access to reference material when I am stuck on an airplane without Wi-Fi is a lifesaver. So the first resource is literally the project we just built. What is next?

**Alex:** Next, we need to talk about the official GitHub documentation. But not just the general documentation. I want to highlight the screen reader-specific GitHub guides created by the GitHub Accessibility team.

**Jamie:** Oh, I love these. The general GitHub documentation is great, but it is massive. It covers every edge case for enterprise administrators and security teams. But sometimes I just want to know the most efficient way to read a diff with NVDA or JAWS.

**Alex:** Exactly. Reading generic documentation as a screen reader user can sometimes feel like asking for directions and being handed a topographical map of the entire state. What you actually want is a local tour guide who uses a white cane, someone who can tell you exactly how many steps to take and where the curbs are. That is what the GitHub Accessibility guides are.

**Jamie:** What kind of topics do they cover?

**Alex:** They have specific guides for navigating repositories, working with issues, managing pull requests, and using GitHub Copilot in VS Code. And what makes them brilliant is that they do not just tell you what a feature does. They tell you the exact keyboard shortcuts to use. Instead of saying, move your mouse to the top right corner and look for the green button, they will tell you to press the letter G then the letter I to navigate to the Issues tab, or to press the letter C to create a new issue.

**Jamie:** That is so much better. They also explain the heading structure, right? Like, they will tell you that the main content starts at a heading level 1, and the comments are all heading level 3s.

**Alex:** Yes, they map out the digital architecture for you. If you are reviewing a pull request, which, as a quick refresher, is when you are requesting that someone pull your code changes into their project, the screen reader guide will tell you exactly how the code changes are presented. It explains how to use your screen reader's browse mode to jump between the added lines and the removed lines without getting lost in the layout tables.

**Jamie:** I wish I had known about those guides when I started. I spent a lot of time just pressing the Tab key and hoping for the best.


**Alex:** Let us move on to how you can continue practicing these skills. Reading documentation is one thing, but muscle memory comes from doing. That brings us to GitHub Skills.

**Jamie:** GitHub Skills! I am so excited to talk about this. This is completely different from a normal online course, right?

**Alex:** It is entirely different. GitHub Skills is GitHub's free, self-paced interactive learning platform. But here is the brilliant part. There are no videos to watch. There is no separate website to log into. Every course runs entirely inside GitHub itself. It uses something called the template-copy pattern.

**Jamie:** Can you explain the template-copy pattern? Because that sounds like enterprise jargon.

**Alex:** Fair point. Think of it like one of those interactive escape rooms, but for code. When you start a course on GitHub Skills, you press a button to use their template. This copies an entire pre-built repository into your own personal GitHub account. As soon as that repository is created, a bot named Mona automatically wakes up and opens a new Issue in your repository.

**Jamie:** Mona is the GitHub mascot, right? The little octopus with cat ears?

**Alex:** Yes, the octocat. So Mona opens an issue, and inside that issue are your instructions for step one. Let us say the course is about resolving merge conflicts. The issue will say, welcome to the course, your first task is to create a new branch and change a specific file.

**Jamie:** And you actually do that right there in the repository? You do not go to a simulated environment?

**Alex:** Exactly. You do the real task in the real environment. You edit the file, you commit the change. And when you do, GitHub Actions workflows are running in the background. Within about twenty seconds, Mona detects what you did. She checks if you did it correctly. If you did, she closes the issue and opens step two. If you made a mistake, she leaves a comment explaining what went wrong and asks you to try again.

**Jamie:** That is so cool. It is like having a digital mentor sitting over your shoulder, but it is completely asynchronous. And from an accessibility standpoint, it means you are using the exact same interface you will use for real work. You are practicing navigating issues, reading comments, and creating pull requests using your screen reader in the actual GitHub web interface.

**Alex:** Exactly. To navigate a course, you just use the skills we learned in the workshop. You press G then I to navigate to your Issues tab. You press the letter H or the number 3 to find the issue heading, press Enter to open it, and use your down arrow in Browse Mode to read Mona's instructions. When you complete the task, you just wait a moment, and your screen reader will announce when Mona posts a new comment.

**Jamie:** What courses do they have? Where should someone start after this workshop?

**Alex:** If you want to reinforce what we learned here, start with the Introduction to GitHub course. It takes less than an hour and covers branches, commits, and pull requests. Then, take the Review Pull Requests course. It teaches you how to leave comments, suggest changes, and approve code. And finally, I highly recommend the Resolve Merge Conflicts course. Merge conflicts are usually the scariest part for beginners, but practicing them in a safe, automated environment takes all the fear away.


**Jamie:** Okay, so GitHub Skills covers the GitHub side of things. But what about Git itself? Git is the underlying version control system that powers all of this, right? I still get confused sometimes between Git and GitHub.

**Alex:** That is a very common confusion. Here is the analogy I like to use. Git is the engine, and GitHub is the garage. Git is the actual software running on your computer that tracks the history of your files. GitHub is the collaborative platform on the internet where you store that history and work with other people. You can use Git without GitHub, but you cannot use GitHub without Git.

**Jamie:** That makes sense. So if I want to understand the engine better, where do I go?

**Alex:** The gold standard reference is the Pro Git Book. It is completely free and available online. It is the full engineering schematic of how Git works. Now, I will warn you, it is incredibly dense. You do not need to read it cover to cover like a novel. Use it like a dictionary or an encyclopedia. If you want to deeply understand how a specific command works, like git rebase, that is where you look.

**Jamie:** Is there anything more interactive for learning Git?

**Alex:** Yes, there is a fantastic resource called Learn Git Branching. It is an interactive tutorial that walks you through how branches work. As a reminder, branching is when you create a parallel universe of your code so you can experiment safely without breaking the main project.

**Jamie:** Wait, I have seen Learn Git Branching. It is highly visual. It draws little nodes and trees on the screen. Is that accessible for a screen reader user?

**Alex:** It is a mixed bag. They do have a command-line interface that you can interact with, which is readable, but the visual tree diagram is the main selling point, and that part is not conveyed well to screen readers. For our blind and low-vision listeners, I actually recommend leaning heavily on the official GitHub Git Cheat Sheet. It is a text-based PDF that lists every major Git command and explains exactly what it does in plain English. Keep that PDF open in a separate window, and practice the commands in your own VS Code terminal.


**Alex:** Speaking of VS Code, we need to talk about your local development environment. VS Code is like your personal physical workshop. When you walk into a physical workshop, you want your tools arranged exactly how you like them, so you can reach out and grab a screwdriver or a wrench without even looking.

**Jamie:** Right, and in VS Code, arranging your tools means setting up your keyboard shortcuts and configuring the accessibility settings.

**Alex:** Exactly. The first resource you need here is the official VS Code Accessibility documentation. Microsoft has done an incredible job building screen reader mode into VS Code. The documentation explains how to use features like the Accessible View, which lets you inspect hover text and error messages in a clean, screen-reader-friendly buffer.

**Jamie:** Oh, and Audio Cues! We talked about those in a previous episode, but the documentation lists all of them. Audio cues are those little sounds VS Code plays to tell you if a line has an error, or if a line was added or deleted in a diff, without you having to read the text.

**Alex:** Yes, the audio cues are fantastic. The documentation also provides a complete list of keyboard shortcuts for Windows and Mac. The most important shortcut to remember, the one that unlocks everything else, is the Command Palette. You open it by pressing Control plus Shift plus P on Windows, or Command plus Shift plus P on Mac. From there, you can type any command you want, like open accessibility settings, and press Enter.

**Jamie:** So if the GitHub Accessibility guides are the tour guide for the website, the VS Code Accessibility documentation is the blueprint for organizing your digital workshop.


**Jamie:** Alex, what if someone wants to go beyond just learning Git and GitHub? What if they are a screen reader user who wants to learn how to code from scratch, or pick up a new programming language? Where should they go?

**Alex:** That is a great question. There are two incredibly strong, completely free, open-source learning paths that I always recommend. The first is freeCodeCamp, and the second is The Odin Project.

**Jamie:** I have heard of freeCodeCamp. It is massive.

**Alex:** It is. If GitHub Skills is where you learn how to use the kitchen tools, freeCodeCamp and The Odin Project are the culinary schools where you learn how to cook. They teach you HTML, CSS, JavaScript, Python, and more.

**Jamie:** Are they accessible? A lot of coding platforms rely on drag-and-drop exercises or visual puzzles that are completely broken with a screen reader.

**Alex:** Both of these platforms are heavily text-based and very screen-reader friendly. freeCodeCamp has an integrated editor on their website, and they have worked hard on its accessibility. The Odin Project takes a different approach. They do not use an in-browser editor at all. Instead, their curriculum guides you through setting up your own local environment using VS Code and the terminal, and you build real projects on your own computer.

**Jamie:** I actually love that approach. It forces you to learn the real tools from day one, rather than relying on a training wheels environment. And since you are using VS Code, you can use all the accessibility features we just talked about.

**Alex:** Exactly. Both of these platforms are also entirely open source, hosted on GitHub. If you ever find an accessibility bug in their curriculum, you can open an issue or even submit a pull request to fix it.


**Jamie:** That is a perfect transition. Let us talk about contributing. Once someone finishes this workshop, and maybe does a few GitHub Skills courses, how do they find real open source projects to contribute to? It feels like standing at the edge of the ocean. There are millions of repositories. Where do you even start?

**Alex:** You do not start by swimming into the deep end. You start at the bunny hill. Just like a ski resort has a gentle slope for beginners, the open source community has curated lists of beginner-friendly tasks.

**Jamie:** Like the Good First Issue label! We talked about that earlier in the workshop.

**Alex:** Yes. Maintainers use the Good First Issue label to mark tasks that are isolated, well-documented, and perfect for someone new to the project. But searching for them across all of GitHub can be tricky. So, I recommend using a website called goodfirstissue.dev, or another site called Up For Grabs. These websites aggregate issues from across the internet that are specifically tagged for beginners. They expect you to be new, and the maintainers are ready to help you learn.

**Jamie:** That is brilliant. But what if I specifically want to work on accessibility? Like, what if I want to use my lived experience as a screen reader user to make projects better?

**Alex:** Your lived experience is a superpower in open source. Many sighted developers genuinely want to make their projects accessible, but they do not know how to test them properly. You are the domain expert.

**Jamie:** So how do I find those projects?

**Alex:** You use GitHub Advanced Search. You can search for specific topics. Topics are tags that maintainers add to their repositories to describe what the project is about. If you go to the GitHub search bar and type topic colon accessibility, or topic colon assistive dash technology, you will find thousands of public repositories focused exactly on those areas.

**Jamie:** Oh, that is clever. So I could search for topic colon accessibility, and then filter by the label Good First Issue.

**Alex:** Exactly. You can combine search terms. You could search for is colon open, is colon issue, label colon help dash wanted, and topic colon screen dash reader. That query will give you a list of open issues where maintainers are explicitly asking for help with screen reader compatibility. It is a fantastic way to find projects where your specific skills are desperately needed.


**Alex:** Finally, we need to talk about community. Learning all of this can sometimes feel isolating. When you hit a wall, or when a tool updates and suddenly your screen reader is not reading a specific menu correctly, you need a place to ask questions.

**Jamie:** The digital water cooler. Where do we go to swap stories and get unstuck?

**Alex:** There are two main communities you should join. The first is the A11y Slack community. A11y is numeronym for accessibility, spelled A, the number 11, and Y. This Slack workspace is filled with thousands of accessibility professionals, developers, and users. There are specific channels for screen reader questions, web standards, and developer tools. It is incredibly welcoming.

**Jamie:** And the second one?

**Alex:** The second is the GitHub Community Accessibility Discussions. This is an official discussion forum hosted on GitHub itself. It is monitored by the GitHub Accessibility team. If you find a bug on GitHub, or if you have an idea for how to make the platform more accessible, that is where you post it. It is also a great place to connect with other blind and low-vision developers who are using the exact same tools you are.

**Jamie:** That is really comforting to know. It means I am not just shouting into the void when something breaks. There are actual people, and actual teams, listening and ready to help.

**Alex:** You are absolutely not alone. There is a massive, vibrant community of blind and low-vision developers out there writing incredible code and shaping the future of open source. You are just taking your first steps to join them.


**Alex:** Alright, let us wrap up this episode with a few concrete takeaways. Jamie, what should our listeners remember?

**Jamie:** First, your permanent offline reference is the Accessibility Agents repository that you forked. Clone it to your computer, and you will have the entire workshop documentation available even without internet. Second, do not just read generic documentation. Search for the official GitHub Accessibility guides for screen-reader-optimized instructions and exact keyboard shortcuts.

**Alex:** Perfect. Third, when you are ready to practice, use GitHub Skills. It uses the template-copy pattern to give you real, hands-on practice inside the actual GitHub interface, guided by Mona the bot. And finally, remember your superpower. Use GitHub Advanced Search with topic colon accessibility to find projects that desperately need your lived experience.

**Jamie:** This has been incredibly helpful. I feel like I finally have a map to the library. What is next?

**Alex:** In our next episode, we are going to dive deep into the GitHub Concepts Glossary. We will be demystifying all the jargon and technical terms you will encounter in the wild, from upstream to cherry-picking to rebasing. You will not want to miss it. Until then, keep practicing, keep exploring, and keep Gitt Going.

</details>


### Episode 39: Accessibility Agents - Complete Reference

All six agents, all 28 slash commands, customization, and troubleshooting.

Based on: [Appendix V: Accessibility Agents - Complete Reference](docs/appendix-l-agents-reference.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep39-accessibility-agents-reference.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep39-accessibility-agents-reference.mp3">Download Episode 39 (MP3)</a>
</audio>

[Download Episode 39 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep39-accessibility-agents-reference.mp3)

<details>
<summary>Read Transcript - Episode 39: Accessibility Agents - Complete Reference</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub. This is episode 39, Accessibility Agents Complete Reference. I am Alex, and I am thrilled to be here with you as we near the end of our two-day workshop material.

**Jamie:** And I am Jamie! I am so ready for this. We have been hinting at this massive ecosystem of agents for a while. Back in episode 17, we did a high-level overview of what an agent even is. But today, we are opening up the whole reference manual.

**Alex:** Exactly. Today is about scale and customization. We are going to cover the complete documentation for all 55 agents across three specialized teams. We will walk through the 54 plus slash commands and how to use them. We will break down exactly how these agents format their inputs and outputs. And most importantly, we will teach you how to customize them, configure your workspace, build your own domain-specific agents, handle version updates, and troubleshoot when things go wrong.

**Jamie:** Okay, just hearing you list all that out makes my brain feel a little full. Fifty-five agents? Fifty-four slash commands? That sounds like a lot of steps and a lot to memorize.

**Alex:** It does sound intimidating! But here is the thing. You have already done most of this on Day 1 of the workshop. You already know the workflow. The only difference now is that Visual Studio Code and GitHub Copilot are handling the heavy lifting. You do not have to memorize 55 agents. Think of it like walking into a massive digital agency. You do not need to know what every single employee does, you just need to know which department to walk into when you have a specific problem.


**Alex:** Let us start with that digital agency analogy. The accessibility agents ecosystem is divided into three teams, or departments. The first is the Accessibility Team, which is the largest, with 26 agents.

**Jamie:** So if I need help specifically with making my code work for screen readers or keyboard users, this is the department I go to.

**Alex:** Spot on. To talk to an agent, you open Copilot Chat by pressing Control plus Shift plus I. Then you type the at symbol, followed by the agent name. For example, you have task agents like at aria specialist, which helps you build complex widgets like comboboxes or modals. You have at contrast master for visual presentation, and at keyboard navigator for focus management.

**Jamie:** I remember struggling so much with live regions when I first learned accessibility. Is there an agent for that?

**Alex:** There is. It is literally called at live region controller. And what is brilliant about this team is that they have orchestrator agents. An orchestrator is like a project manager. If you call at web accessibility wizard, that agent will actually delegate tasks to the other specialized agents to perform a full, guided audit of your work. It gathers all their findings and gives you a single, prioritized action plan.

**Jamie:** That is incredible. So I do not have to talk to five different agents if I do not want to. I just talk to the wizard, and it talks to the team. What are the other two departments?

**Alex:** The second department is the GitHub Workflow Team. This one has 12 agents, and they automate your repository operations. You have at daily briefing, which gives you a morning situation report of issues and pull requests. You have at issue tracker to find and prioritize tickets. And my personal favorite, at pr review.

**Jamie:** Oh, pull requests! A pull request is when you are asking someone to review your code and pull it into the main project. I used to be terrified of reviewing them because I was worried I would miss something important.

**Alex:** And that is exactly why at pr review is so powerful. You give it a pull request number, and it reads the code, assesses the risk level, and even suggests inline comments. But remember the critical rule of the workflow team. The agent produces a starting point. It drafts the reply. You are the human. You read it, you edit it, and you post it under your own name.

**Jamie:** Got it. The agent is the assistant, not the boss. And what is the third team?

**Alex:** The Developer Tools Team. This has 6 agents focused on specific environments. For example, at python specialist for Python accessibility patterns, or at desktop a 11 y specialist for Windows, Mac, and Linux native app accessibility.


**Alex:** Now, alongside those 55 conversational agents, we have over 54 slash commands.

**Jamie:** Okay, so what is the difference? Why would I use a slash command instead of just talking to an agent with the at symbol?

**Alex:** Great question. Let us use an analogy. Talking to an agent with the at symbol is like hiring a contractor. You sit down, you have a conversation, you discuss the nuance of the project, and you go back and forth. A slash command is like a vending machine button. You press it, and you get exactly the specific snack you wanted, immediately, following a strict, repeatable process.

**Jamie:** Oh, I like that. So a slash command is for a single, focused task. How do I use one?

**Alex:** In that same Copilot Chat window, you just type a forward slash. That opens up a menu of commands. Let us talk about some of the most useful ones for this workshop.

**Jamie:** Hit me. What is on the speed dial?

**Alex:** If you type slash my dash issues, it immediately pulls up all your open issues with priority signals. If you type slash review dash pr followed by a number, like slash review dash pr 14, it generates that AI review with inline suggestions.

**Jamie:** What if I am looking at a brand new bug report and I do not know how to categorize it?

**Alex:** You type slash triage. It will read the issue and suggest labels and priority levels. If you need to respond to an issue, type slash issue dash reply. There is also slash daily dash briefing, which does the same thing as the daily briefing agent but in one quick command. And if you are getting ready to publish a new version of your software, slash draft dash release will automatically read all your merged code and generate the release notes for you.

**Jamie:** That is a massive time saver. I used to spend hours reading old commits just to write a changelog. But wait, how do these commands know what to do? You mentioned input and output formats earlier.

**Alex:** Yes. Let us talk about input formats first. Think of a prompt file like giving a recipe to a chef. When you type a slash command, Visual Studio Code looks at a specific file in your project that defines that command. Inside that file, we use input parameters. The syntax is a dollar sign, followed by an opening curly brace, the word input, a colon, the name of the variable, another colon, and then a helpful hint for the user, closing with a curly brace.

**Jamie:** So if I use slash review dash pr, the input parameter is asking me for the pull request number?

**Alex:** Exactly. The prompt file says, hey Copilot, please review the pull request provided in this input variable.

**Jamie:** And what about the output? When the agent replies, is it just a giant wall of text? Because as a screen reader user, a giant wall of text with no structure is my worst nightmare.

**Alex:** That is where the output format constraints come in. These agents are strictly instructed on how to structure their replies. We use an analogy of a well-organized filing cabinet. The agents are told to always use strict heading levels. They use heading level 2 for major sections, and heading level 3 for sub-sections. They are explicitly told never to skip heading levels, because jumping from an H1 straight to an H3 is a huge accessibility violation and breaks screen reader navigation.

**Jamie:** Oh, I love that. I navigate almost entirely by pressing the letter H to jump between headings. If the structure is predictable, I can skim an agent's response in seconds.

**Alex:** Exactly. Another strict output rule is the empty state rule. If you ask the daily briefing agent for your security alerts, and you have zero security alerts, the agent is not allowed to just skip that section. It must print the heading for Security Alerts, and underneath it, write All Clear.

**Jamie:** Yes! Silent failures are the worst. If a section is just missing, I always wonder if the agent broke, or if my screen reader skipped it, or if there really was nothing there. Explicitly saying All Clear removes so much cognitive load.


**Alex:** So, we know how the agents work out of the box. But every developer, every team, and every project is different. That brings us to customization. How do we teach the agents our specific rules?

**Jamie:** Like an employee handbook! You have to tell the new hire how your company does things.

**Alex:** Exactly. We do this through instruction files and settings. There are two main ways to provide always-on instructions. These are rules that the agent follows for every single request, without you ever having to ask.

**Jamie:** Where do we put this employee handbook?

**Alex:** The recommended approach for most projects is a file called copilot dash instructions dot m d. It lives inside a folder named dot github at the root of your project. It is just a plain text file. You can put your accessibility standards in there, your coding conventions, and even rules about tone. For example, you can write, Write for screen reader users first. Use active voice. Never use color as the only indicator of meaning.

**Jamie:** And if I am working on a massive project with different tools, like maybe I am using Claude Code in the terminal alongside Copilot?

**Alex:** Then you use the alternative option, a file simply called A G E N T S dot m d, right at the root of your workspace. It is an open standard that multiple artificial intelligence tools recognize. You use one or the other, not both.

**Jamie:** Okay, so that covers the project rules. But what about my personal preferences? Like, my team might not care what screen reader I use, but I want the agent to know.

**Alex:** That is where the preferences dot m d file comes in. You create this inside the dot github slash agents folder. This file is ignored by the version control system, meaning it stays completely private on your local machine. It never gets uploaded to the public team repository.

**Jamie:** Oh, that is neat. What kind of things do I put in my private preferences?

**Alex:** You can set your GitHub username, your timezone, and your notification priorities. If you want accessibility issues at the top of your daily briefing, you write that here. You can also define your review comment tone. You might say, Be direct but constructive, and be extra warm to first-time contributors.

**Jamie:** And my screen reader context goes here too?

**Alex:** Yes. You literally just write, I use N V D A with Chrome on Windows 11. The agents read this, and suddenly, they stop giving you instructions for VoiceOver on a Mac. They tailor their output specifically to your technology stack.


**Alex:** Now, Jamie, we just talked about project rules versus personal rules. This is a perfect transition to our next concept, which is workspace configuration and scope.

**Jamie:** Scope always confuses me a little. It sounds like a mouthwash.

**Alex:** Think of scope like a hierarchy of laws. You have city laws, state laws, and federal laws. In Visual Studio Code, we have three levels of scope. User level, Workspace level, and Organization level.

**Jamie:** Okay, break those down for me.

**Alex:** User scope, or personal scope, lives in your Visual Studio Code profile. These rules follow you to any project you open on your computer. Workspace scope lives in the repository folder, like that dot github directory we mentioned. Those rules apply to anyone who downloads that specific project. Organization scope is set by your company administrators on GitHub, and applies to every repository your company owns.

**Jamie:** So what happens when these laws conflict? Let us say my company Organization rules say, always write extremely formal code comments. But my User profile says, write casual, friendly code comments. Who wins?

**Alex:** The most specific, local scope always wins. Your Personal User profile has the highest priority. It overrides the Workspace, and the Workspace overrides the Organization. So your comments will be casual and friendly. Visual Studio Code collects all the instruction files from all three scopes, combines them, and sends them to the agent. Priority only matters when there is a direct contradiction.


**Alex:** So far, we have been consumers. We are using the 55 agents that already exist, and we are tweaking their instructions. But what if you want to build your own custom, domain-specific agent?

**Jamie:** Like writing a job description to hire a brand new specialist for my agency.

**Alex:** Exactly. It is surprisingly easy. An agent is just a file ending in dot agent dot m d. You save it in the dot github slash agents folder. The most important part of this file is at the very top, in a section called the frontmatter.

**Jamie:** Frontmatter. I have heard that term. That is the configuration block at the top of a file, usually surrounded by three dashes, right?

**Alex:** Yes. It uses a format called Y A M L, or YAML. In this frontmatter, you define the name of the agent. This is what you will type after the at symbol. You also write a description.

**Jamie:** Is the description just for me to read?

**Alex:** No, and this is crucial. The description is how the orchestrator agents decide whether to delegate work to your custom agent. If you name an agent at cool helper, and the description is just, A helpful agent, it will never get any delegated work. But if the description says, Use when auditing Markdown files for missing alt text and heading skips, the orchestrator knows exactly when to call it.

**Jamie:** Oh, that is clever! It is like a search engine optimization game, but for artificial intelligence delegation.

**Alex:** Exactly. The other critical thing you put in the frontmatter is the tools array. This dictates what your agent is allowed to do.

**Jamie:** Like giving the new hire a security badge.

**Alex:** Perfect analogy. If you give the agent the read tool, it has a visitor badge. It can look at your files but cannot change them. If you give it the edit tool, it can modify code. If you give it the execute tool, it has the master key. It can run shell commands in your terminal. You should be very careful with the execute tool.

**Jamie:** I can imagine. I do not want an agent deciding to format my hard drive because it misunderstood a prompt. Are there any other settings in that frontmatter?

**Alex:** Yes, you can set a flag called user dash invocable to false. This hides the agent from the chat menu. It becomes a background worker that only other agents can talk to.


**Alex:** Let us talk about version compatibility and update patterns. AI models are changing constantly. What happens if you build a custom agent that relies on a specific model, like Claude Sonnet, but then you share your project with a friend whose company only licenses GPT 4?

**Jamie:** Does the agent just crash?

**Alex:** It would, unless you use a fallback array. In your agent frontmatter, instead of listing one model, you can provide a list in brackets. You can say, try Claude Sonnet first, but if that is not available, fall back to GPT 4. Think of it like carrying a spare tire. If your primary model is unavailable, the agent gracefully switches to the backup without throwing an error.

**Jamie:** That is a great practice. What about when we want to enforce rules, rather than just guide the agent? Earlier you said instructions are just guidance.

**Alex:** Yes. Instructions are like a speed limit sign. You are asking the agent nicely to follow the rules. But sometimes you need a physical speed bump. That is where hooks come in. Hooks are JSON files, which is just another configuration format. They execute real shell commands at specific points in the agent's lifecycle.

**Jamie:** Like a security guard checking your bag before you leave the building.

**Alex:** Exactly. You can set a Pre Tool Use hook. Before the agent is allowed to use a tool to edit a file, the hook can run a script to validate the request. You can set a Post Tool Use hook to automatically run a code formatter every time the agent finishes writing a file. Hooks are deterministic. They run every single time, regardless of what the user typed in the chat.


**Alex:** Alright Jamie, we have covered a massive amount of ground. We are at the final concept. Troubleshooting. What happens when you type at daily briefing, and Visual Studio Code just says, Agent not found?

**Jamie:** I usually panic and restart my computer. Let me guess, there is a better way?

**Alex:** There is a slightly faster way. Visual Studio Code has a built-in Diagnostics view for Copilot Chat. You navigate to the Configure Chat gear icon, and select Diagnostics. This opens a panel that shows you every single instruction file, agent, and prompt that is currently loaded.

**Jamie:** Oh, so I can see if my custom agent file actually got loaded into the system.

**Alex:** Exactly. It will tell you if the file was found, if it loaded successfully, or if there is a syntax error in your YAML frontmatter, like a missing quote. If everything looks correct but the agent is still not showing up, you can reload the window.

**Jamie:** How do I do that without closing the whole program?

**Alex:** Press Control plus Shift plus P to open the Command Palette, type Reload Window, and press Enter. It takes about two seconds, and it completely refreshes the agent's brain, picking up any new files you just created.


**Alex:** And that brings us to the end of our complete reference guide for Accessibility Agents. Jamie, what are your top takeaways from today?

**Jamie:** Okay, first, the ecosystem is huge but manageable. We have 55 agents across three teams, and 54 slash commands. But I do not have to memorize them. I just use the orchestrator agents or the slash menu to find what I need. Second, scope and priority. My personal user settings win over the workspace rules, so I can always customize the tone and screen reader context for my own needs. Third, I can build my own agents using a simple markdown file, and I control exactly what they are allowed to do by giving them specific tools. And fourth, if I need to enforce a hard rule, I use a JSON hook. If I just want to guide the agent, I use an instructions file.

**Alex:** That is a perfect summary. You now have the keys to the entire customization engine. In our next episode, Episode 40, we are shifting gears. We will be looking at GitHub Actions and CI CD pipelines, and how we can integrate accessibility testing directly into the continuous integration process.

**Jamie:** I cannot wait. I am going to go write a custom agent to fetch my coffee. See you all next time!

**Alex:** Thanks for listening to Gitt Going with GitHub. Keep exploring, and keep building accessible software.

</details>


### Episode 40: GitHub Copilot - Complete Reference

All Copilot features, chat participants, slash commands, and MCP servers.

Based on: [Appendix W: GitHub Copilot - Complete Reference](docs/appendix-k-copilot-reference.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep40-copilot-reference.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep40-copilot-reference.mp3">Download Episode 40 (MP3)</a>
</audio>

[Download Episode 40 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep40-copilot-reference.mp3)

<details>
<summary>Read Transcript - Episode 40: GitHub Copilot - Complete Reference</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub, the audio learning series designed for blind and low-vision developers who are mastering GitHub and open source collaboration. I am Alex, and I am thrilled to be here with you.

**Jamie:** And I am Jamie! This is episode 40, which means we are getting close to the end of our journey, but we still have some incredibly powerful tools to cover. Today, we are doing a complete reference guide for GitHub Copilot.

**Alex:** That is right. Back in episode 14, we covered the absolute basics of Copilot. We talked about how it acts as an AI pair programmer, and we touched on inline suggestions. But today, we are zooming out to look at the entire Copilot ecosystem. We are going to cover the complete feature inventory, chat participants, slash commands, custom instructions, prompt files, model selection, the command line interface, and even Model Context Protocol servers.

**Jamie:** Okay, that sounds like a lot of steps. And honestly, a lot of jargon. I remember when I first learned GitHub a couple of years ago, hearing all those terms at once would have made me want to close my laptop and walk away.

**Alex:** It does sound like a lot! But here is the thing, Jamie. You have already done most of this on day one of your programming journey. You already know how to ask questions, how to search your codebase, and how to write terminal commands. This is just the exact same workflow, but with VS Code handling the heavy lifting and fetching the context for you. We are going to break every single piece down and explain not just how it works, but why it matters.

**Jamie:** I love that. So where do we start with the complete feature inventory? When we say GitHub Copilot today, what exactly are we talking about?

**Alex:** Copilot has grown far beyond just auto-completing your code. The complete feature inventory really consists of four main pillars. First, there are inline suggestions, which happen right inside your editor as you type. Second, there is Copilot Chat, which is a dedicated conversational interface inside VS Code. Third, there is Copilot in the command line interface, which brings AI assistance to your terminal. And fourth, there is Copilot for Pull Requests, which integrates directly into GitHub dot com to help you summarize and review code changes.

**Jamie:** Let us start with those inline suggestions, because that is where most people first encounter Copilot. When I am typing, Copilot will suggest code, which we often call ghost text. For a screen reader user, this can be a bit chaotic because the screen reader might try to announce things while you are still thinking.

**Alex:** Exactly. And this is a great time to review the most important accessibility workflow for Copilot. When you are typing and a suggestion appears, your screen reader might announce that an inline suggestion is available, especially if you have your accessibility signals turned on in VS Code settings. The instinct is to just press Tab to accept it, or Escape to reject it. But if the suggestion is multiple lines long, you really need to read it first.

**Jamie:** And reading it word by word using Control plus Right Arrow is one way to do it. On a Mac, that would be Command plus Right Arrow. That lets you accept the suggestion one word at a time, which is great for short completions. But for a whole function, that gets tedious.

**Alex:** Right. Which is why the Accessible View is your best friend. Whenever a suggestion appears, do not press Tab immediately. Instead, press Alt plus F 2. On a Mac, that is Option plus F 2. This opens the Accessible View.

**Jamie:** I wish I had known about Alt plus F 2 when I started. Can you explain exactly what the Accessible View does?

**Alex:** Absolutely. Think of the Accessible View like taking a photograph of a moving object. When Copilot generates text, it streams it in token by token, piece by piece. If your screen reader tries to read that live stream, it sounds broken and fragmented, like someone shouting words at you one by one as they think of them. The Accessible View captures the complete, static response and puts it into a structured, read-only text pane. You can navigate it with your up and down arrow keys at your own pace.

**Jamie:** And the best part is, you do not even have to wait for the response to finish generating anymore. You can press Alt plus F 2 immediately after sending a prompt, and the Accessible View will dynamically update in a screen-reader-friendly way. Once you read the suggestion and decide you want it, you just press Control plus Slash, or Command plus Slash on Mac, and it inserts the code right at your cursor. You do not even have to close the panel first.


**Alex:** Now let us move to the second pillar: Copilot Chat. You open this panel by pressing Control plus Shift plus I, or Command plus Shift plus I on Mac. This is where you can ask open-ended questions. But the real power comes from Chat Participants.

**Jamie:** Chat participants. I use these all the time, but I always explain them to people as inviting experts into a conference room. If I am in an empty room and I ask, why is this broken, nobody knows what I am talking about. But if I invite the database expert and the frontend expert into the room and ask the same question, they can look at my work and give me a specific answer.

**Alex:** That is a perfect analogy. In Copilot Chat, you invite these experts by typing the at symbol, followed by their name. The most common one is at workspace. When you type at workspace before your question, Copilot searches your entire VS Code project for relevant context. It looks at your open files, your file structure, and the code itself.

**Jamie:** So if I want to know where we define our heading hierarchy for accessibility, I would type at workspace, followed by, find all places where heading hierarchy is documented.

**Alex:** Exactly. Another great participant is at terminal. If you run a command and it spits out a huge, confusing error message, you can open Copilot Chat and type at terminal, what did that last command output mean? Copilot will read the buffer from your integrated terminal and explain the error. There is also at github, which lets you search issues, pull requests, and code across all of GitHub dot com right from your editor.

**Jamie:** And alongside those at symbol participants, we have the hash symbol variables, right? Like hash file or hash selection.

**Alex:** Yes. If participants are the experts in the room, the hash variables are the specific documents you slide across the table for them to look at. If you type hash file, a file picker opens, allowing you to attach any specific file to your prompt. If you type hash selection, it attaches whatever text you currently have highlighted in your editor.

**Jamie:** So I could highlight a really messy block of code, open chat, and type, at workspace, please review hash selection for accessibility violations.

**Alex:** You absolutely could. And that actually leads us perfectly into our next topic: Slash Commands.


**Alex:** Slash commands are built-in shortcuts for the most common tasks you might want Copilot to do. Instead of typing out a long prompt, you just type a forward slash and a specific keyword.

**Jamie:** I love slash commands. I think of them like the quick-dial buttons on a microwave. You could type out exactly how many minutes and seconds you want to heat up your popcorn, or you can just press the popcorn button. Slash commands are the popcorn buttons of Copilot.

**Alex:** That is exactly what they are. Let us go through the essential ones. First is slash explain. If you navigate to a complex block of code, select it, and type slash explain in the chat, Copilot will break down exactly what that code does in plain language. This is incredible when you are reading a new codebase.

**Jamie:** Then there is slash fix. If you have code with a bug or a syntax error, you select it, type slash fix, and Copilot will propose a correction.

**Alex:** Next is slash tests. Selecting a function and typing slash tests will generate unit tests for that specific logic. And similarly, slash doc will generate documentation comments, like JS Doc strings, for your selected code.

**Jamie:** There is also slash new, which is fantastic for scaffolding. If I type slash new React component for notifications, Copilot will generate the file structure and the boilerplate code for me. It saves so much repetitive typing.

**Alex:** And if you ever forget these, just type slash help. It will list all the available commands and participants.


**Jamie:** Okay, so built-in slash commands are great. But what if I want my own custom popcorn buttons? What if my team has very specific ways we write tests, or very specific accessibility rules we follow? I do not want to type those rules out every single time I ask Copilot to generate code.

**Alex:** This is where Custom Instructions and Prompt Files come in, and they are total game changers. Let us talk about Custom Instructions first. You can create a file in your repository at the exact path dot github slash copilot dash instructions dot md.

**Jamie:** And just to clarify, that is a folder named dot github, and inside it, a markdown file named copilot dash instructions.

**Alex:** Correct. This file is basically the employee handbook for Copilot. Whatever you write in this plain text markdown file will be quietly attached to every single request you make to Copilot in that workspace. You never have to invoke it manually.

**Jamie:** So what kind of things should go in the employee handbook?

**Alex:** Project-wide conventions. You might write things like: Include semantic HTML elements in generated markup. Never use color as the only indicator of meaning. Write commit messages using the conventional commits format. Always use active voice in documentation. Once you save that file, Copilot just knows to follow those rules.

**Jamie:** That is brilliant. And you can actually have VS Code generate a starting point for this file automatically, right?

**Alex:** Yes! If you open Copilot Chat and type slash init, it will analyze your workspace and create a tailored copilot dash instructions file for you. You can review it, tweak it, and commit it to your repository so everyone on your team gets the same consistent AI behavior.

**Jamie:** Now, what if I have instructions that should only apply to specific files? Like, I only want my testing rules to apply when I am looking at test files.

**Alex:** For that, you use Scoped Instructions. You create files with the extension dot instructions dot md. Inside these files, you can use a bit of configuration at the top called frontmatter to define when the file should activate. For example, you can set an applyTo property that tells Copilot, only use these instructions if the current file ends in dot test dot js.

**Jamie:** That is so smart. It keeps the context window clean. The AI does not need to read the testing rules if I am just asking it to fix a CSS bug. And what about those custom popcorn buttons we mentioned? The reusable prompt files?

**Alex:** Those are called Prompt Files. They live in a folder named dot github slash prompts, and they have the extension dot prompt dot md. If you create a file in there called review dot prompt dot md, you instantly get a new slash command in your chat called slash review.

**Jamie:** So I could write a prompt file that says, check the selected code against the Web Content Accessibility Guidelines level AA, and suggest fixes for any keyboard navigation issues. Then, anytime I want that check, I just type slash review.

**Alex:** Exactly. And there is a priority system here that is important to understand. You can have instructions at the Organization level, the Workspace level, and the User level. The User level refers to files stored in your personal VS Code profile folder. If there is ever a conflict, your personal User instructions always win. They override the Workspace, and the Workspace overrides the Organization. But mostly, they are additive. VS Code combines all the relevant instructions and sends them together.


**Jamie:** Let us talk about Model Selection. I noticed a dropdown menu at the bottom of the Copilot Chat input area. It lets me change the AI model. Why would I want to change it?

**Alex:** Because different models have different strengths. Think of it like hiring different types of contractors. Sometimes you need a very fast junior developer to write a quick script or format some JSON. Other times, you need a deliberate, meticulous senior architect to design a complex system from scratch.

**Jamie:** So if I just need a quick explanation of a terminal command, I might use a smaller, faster model. But if I am asking Copilot to refactor an entire module and ensure it handles edge cases, I want to select the most powerful model available in that dropdown.

**Alex:** Exactly. The interface lets you switch models on the fly depending on the complexity of the task. Keep in mind that as a screen reader user, you can navigate to this dropdown by tabbing through the bottom toolbar of the Chat view. Pressing Space or Enter will open the list of available models.


**Jamie:** Okay, so we have covered the editor extensively. But I spend a lot of time in the command line. Does Copilot exist outside of VS Code?

**Alex:** It absolutely does. If you have the GitHub CLI installed, which is the command line tool you run by typing g h, you can install the Copilot extension for it. Once you do, you get access to a feature that is like having a universal translator for your terminal.

**Jamie:** I definitely need a translator for some of those complex Git commands or obscure shell scripts. How does it work?

**Alex:** There are two main commands. The first is g h copilot suggest. You type that, followed by what you want to do in plain English. For example, g h copilot suggest find all markdown files modified in the last three days. Copilot will generate the exact terminal command you need, and even offer to run it for you.

**Jamie:** That is incredible. No more digging through manual pages to remember which flags to use for the find command.

**Alex:** Exactly. And the second command is the reverse: g h copilot explain. If you come across a command in documentation that looks like alphabet soup, you can copy it, paste it after g h copilot explain, and it will break down exactly what every single flag and argument does.


**Jamie:** Alright, let us tackle the jargon I mentioned earlier. MCP Servers. I see this acronym everywhere now. Model Context Protocol. What is it, and why should I care?

**Alex:** MCP is a breakthrough in how AI agents interact with the world. Think about it this way. By default, Copilot lives in a box. It can read your code, and it can write text. But it cannot directly browse the live internet, or query your company database, or run a Docker container. It does not have hands.

**Jamie:** So an MCP server gives it hands?

**Alex:** Yes. An MCP server is like giving Copilot a secure API badge to access specific external tools. It is an open standard protocol. If your team builds an MCP server that connects to your internal bug tracker, you can plug that server into VS Code. Suddenly, Copilot can actually look up live ticket statuses when you ask it questions.

**Jamie:** That makes so much sense. It is a standardized way to plug tools into the AI. I know GitHub has a community repository called awesome dash copilot, where people share these tools. You can actually install an MCP server from there that gives Copilot even more capabilities.

**Alex:** That is right. Awesome dash copilot is a curated ecosystem of plugins, prompts, and MCP servers. You can explore it right from your chat by typing slash plugin. It acts as a marketplace browser for community-built tools.


**Jamie:** We have one last pillar to cover from our feature inventory: Copilot for Pull Requests. This happens on GitHub dot com, not in VS Code, right?

**Alex:** Mostly, yes. When you are on GitHub dot com and you open a pull request, Copilot can help in two major ways. First, it can generate a PR summary. Instead of manually typing out a description of the twenty files you changed, Copilot reads the differences and generates a structured summary of the feature, the changes, and the impact.

**Jamie:** I think of that like having a proofreader write an executive summary for your report. It saves the reviewer so much time because they get a high-level overview before they dive into the code.

**Alex:** Exactly. And the second feature is PR reviews. Reviewers can ask Copilot to explain specific changes in the pull request, or even ask it to generate review comments checking for common bugs. It is an incredible time saver for maintainers.

**Jamie:** And speaking of automation on GitHub dot com, I read something in the reference material about GitHub Agentic Workflows. What is that?

**Alex:** That is a technical preview feature that takes AI automation to the next level. Instead of interacting with an agent in your editor, you write a markdown file describing a goal, like, create a daily status report of all open issues. You push that file to your repository, and a cloud-based AI agent runs on a schedule, reads your repository, and completes the task automatically. It is like having a tireless project manager running in your GitHub Actions pipeline.


**Jamie:** Wow. We have covered a massive amount of ground today. From ghost text to cloud agents. How do we summarize all of this?

**Alex:** Let us narrow it down to three concrete takeaways for our listeners to practice. First, make Alt plus F 2 your default reflex. Whenever Copilot suggests inline code or responds in chat, open the Accessible View. It removes the streaming noise and gives your screen reader a clean, navigable structure.

**Jamie:** Second, leverage chat participants and slash commands. Do not just ask generic questions. Invite the experts by using at workspace or at terminal, and use slash explain or slash fix to skip the repetitive typing.

**Alex:** And third, start building your project's employee handbook. Create a dot github slash copilot dash instructions dot md file in your workspace. Write down your accessibility standards and coding conventions in plain English. You will be amazed at how much better Copilot's suggestions become when it knows the rules of your specific house.

**Jamie:** I am definitely going to set up an instructions file today. This has been such a helpful reference guide. What are we covering in the next episode?

**Alex:** In episode 41, we are going to dive deep into a specific community toolset: Accessibility Agents. We will look at how to build and use custom agents specifically designed to catch accessibility violations before they ever leave your editor. It is going to be incredibly practical.

**Jamie:** I cannot wait for that one. Thank you all for listening to Gitt Going with GitHub.

**Alex:** Keep exploring, keep coding, and we will see you in the next episode.

</details>


### Episode 41: Copilot AI Models

Model comparison, strengths, plan availability, and selection guidance.

Based on: [Appendix X: Copilot AI Models](docs/appendix-k-copilot-reference.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep41-copilot-models.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep41-copilot-models.mp3">Download Episode 41 (MP3)</a>
</audio>

[Download Episode 41 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep41-copilot-models.mp3)

<details>
<summary>Read Transcript - Episode 41: Copilot AI Models</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub, the audio series where we build your open source skills from the ground up. I am Alex, and today we are diving into Episode 41, titled Copilot AI Models.

**Jamie:** And I am Jamie. I am so excited for this one. We have been using GitHub Copilot in the last few episodes, asking it to explain code and help us write functions. But today we are looking under the hood.

**Alex:** Exactly. If you are just joining us, you might want to review Episode 13 where we installed Copilot in Visual Studio Code, and Episode 40 where we covered the basics of interacting with the chat panel. Today, we are talking about the actual brains powering those interactions. Because Copilot is not just one single artificial intelligence. It is actually a collection of many different AI models that you can choose from.

**Jamie:** That was a huge aha moment for me when I first started learning GitHub a couple of years ago. I thought Copilot was just one big brain sitting on a server somewhere. But it is more like a whole team of developers with different specialties, right?

**Alex:** That is a perfect analogy. And GitHub has built something really unique here. Instead of forcing you to use just one provider, they have partnered with several of the biggest names in artificial intelligence. Inside Copilot, you have access to models from OpenAI, which makes the GPT and Codex models. You also have Anthropic, which makes the Claude models. Google is here with their Gemini models. And xAI is available with their Grok models.

**Jamie:** It is like having a workshop where you can call over a master carpenter, an electrician, or an architect depending on what you need to build. But with so many options, how do you even begin to understand the differences between them?

**Alex:** We can break it down by looking at three main characteristics. Speed, quality, and context window size. Let us define that last term first, because it is crucial. A context window is the amount of text, code, and conversation history that the AI can hold in its short-term memory at one single time.

**Jamie:** I love talking about context windows. The way it finally clicked for me was thinking about my physical physical desk. If I have a tiny desk, I can only have one or two reference books open while I am working. If I need to look at a third book, I have to close one and put it away. That is a small context window. But a massive context window is like having a giant conference table where I can spread out fifty documents, my entire project codebase, and all my error logs, and look at them all at once.

**Alex:** That is exactly right. A larger context window means the AI can understand how a function in your database file connects to a variable in your user interface file, because both files fit on its mental conference table at the same time. But here is the trade-off. Models with giant context windows, or models that are built for extremely high quality and deep reasoning, are usually slower. And they require more computing power.

**Jamie:** Which brings us to the speed versus quality trade-off. It is like choosing between a quick spell-check and a deep structural edit of a novel. If I just want to know the keyboard shortcut to save a file, I want the answer instantly. I do not need the AI to ponder the philosophical implications of saving data. I just want a fast answer.

**Alex:** Precisely. So let us talk about how to match the right model to the right task, starting with general purpose coding and writing. For everyday tasks, like simple code completions, writing documentation, or explaining a standard function, you want a reliable, fast default. Right now, as of February 2026, the standard workhorses are OpenAI models called GPT 4.1 and GPT 5 mini. They are incredibly fast, very accurate, and they handle most everyday tasks effortlessly.

**Jamie:** And they are free to use, right? We will get into the pricing plans in a minute, but I know I use GPT 5 mini for almost everything. It is just so snappy. But what if I have a really repetitive task, like I need to rename twenty variables, or I need boilerplate code for a basic HTML page?

**Alex:** For tasks where speed is your absolute top priority, you can switch to models specifically optimized for fast help. Anthropic has a model called Claude Haiku 4.5. Google has Gemini 3 Flash. And OpenAI has Grok Code Fast 1 and a Codex Mini variant. These models are lightweight. They do not do well if you ask them to architect a complex database, but if you ask them to write a quick regular expression to validate an email address, they will give you the answer before you even finish taking a breath.

**Jamie:** Okay, so we have the everyday models and the super fast models. But what about when things get really complicated? Like last week, I had a bug where my screen reader was not announcing a status update on a web page, and the problem was buried somewhere between three different JavaScript files and an ARIA live region. A fast model would probably just guess and get it wrong.

**Alex:** Exactly. That is when you need to bring in the heavy hitters for deep reasoning and debugging. This is where you want to use Anthropic models like Claude Sonnet 4.6, or Claude Opus 4.6. Or OpenAI models like GPT 5.2. These models are designed to stop, think, and analyze complex multi-file problems.

**Jamie:** Bringing in Claude Opus is like escalating a bug to the senior staff engineer. You know it might take them a few extra seconds to reply, but they are going to give you a deeply considered, architectural answer.

**Alex:** Yes, and they excel at understanding unfamiliar codebases. If you join a new open source project and you need someone to explain how their authentication flow works across ten different files, Claude Opus or Gemini 3 Pro are the models you want reading those files.


**Jamie:** We should also talk about a term that has been popping up a lot lately. Agentic software development. I hear people saying Copilot has an Agent mode now. What does agentic actually mean in this context?

**Alex:** Agentic simply means the AI acts as an autonomous agent. In a standard chat, you ask a question, the AI gives you an answer, and you have to go copy and paste the code yourself. In Agent mode, you give Copilot a goal, like, set up a new testing framework for this project. The AI will then independently write the code, open your terminal, run the installation commands, read the error messages if something fails, fix its own mistakes, and keep iterating without you needing to guide it step by step.

**Jamie:** That sounds slightly terrifying but mostly amazing. Does it use a specific model for that? Because I imagine you need a very smart model to let it run its own terminal commands.

**Alex:** You do. And for agentic tasks, OpenAI has created specialized models under the Codex name. Right now, the recommended model for this is GPT 5.1 Codex Max, or GPT 5.2 Codex. These are explicitly trained for autonomous reasoning and multi-step execution.

**Jamie:** What about visuals? As a totally blind developer, I obviously do not work with visual mockups. But occasionally, a sighted designer will hand me an image file of a user interface and ask me to build it. Can these models help with that?

**Alex:** They absolutely can, and this is a fantastic accessibility use case. Several models support image input, meaning you can paste an image directly into the Copilot chat. GPT 5 mini, Claude Sonnet, and Gemini 3 Pro all understand images. You could paste that design mockup into the chat and type, please describe the structural layout of this image and generate the semantic HTML to build it. The AI will analyze the visual layout and translate it into code for you.

**Jamie:** That is brilliant. I wish I had known that when I started. It completely removes the barrier of needing a sighted colleague to describe a screenshot to me.


**Alex:** Now that we know about all these different models, we need to talk about how you actually get access to them. GitHub Copilot has several different subscription plans. There is Copilot Free, Copilot Pro, Copilot Pro Plus, Business, and Enterprise.

**Jamie:** And this is where the concept of premium requests comes in, right? Because not all models cost the same amount of resources to run.

**Alex:** Exactly. Let us use an arcade token analogy. Imagine your Copilot subscription gives you a certain number of tokens every month. The fast, everyday models like GPT 4.1 and GPT 5 mini have a cost multiplier of zero. They are free games. You can play them all day long and they never use up your premium tokens.

**Jamie:** So if I am on the completely free tier of Copilot, I can still use those zero-multiplier models as much as I want?

**Alex:** Well, on the Free tier, you have a hard limit of 50 total requests per month. But if you are on any paid plan, like Pro or Business, you can use the zero-multiplier models infinitely.

**Jamie:** Got it. But what if I want to play the really fancy arcade game? The deep reasoning models like Claude Opus?

**Alex:** Those models have a higher cost multiplier. For example, Claude Opus 4.6 has a multiplier of three. That means every single message you send to Claude Opus consumes three of your premium requests. The mid-tier models, like Claude Sonnet or GPT 5.2, have a multiplier of one. They consume one premium request per message.

**Jamie:** Okay, so if I am on the standard Copilot Pro plan, which gives me 300 premium requests a month, I need to budget them. I should not use Claude Opus to ask how to center a text element, because that is wasting three tokens on a problem that the free GPT 5 mini model could solve for zero tokens.

**Alex:** Exactly. You want to save those premium requests for the truly demanding tasks. Now, if you are on Copilot Pro Plus or Copilot Enterprise, you have unlimited premium requests, so you do not have to worry about quotas. But for everyone else, managing that multiplier is an important part of your workflow.


**Jamie:** Alright, let us get practical. I am in Visual Studio Code right now. How do I actually switch between these models?

**Alex:** Let us start with the Chat panel. First, you press Control plus Shift plus I to open the chat view. Your focus will naturally land in the text input area where you type your messages.

**Jamie:** Okay, I am there.

**Alex:** Now, the model picker is a button located in the toolbar that sits right below that text input area. If you press the Tab key to navigate through the chat input toolbar, you will move past the attach button, and the next item your screen reader announces should be the name of the currently active model. It might say something like Auto, or Claude Sonnet 4.6, button.

**Jamie:** I just pressed Tab, and my screen reader said, Auto, model picker button.

**Alex:** Perfect. Press Space or Enter to activate that button. It opens a dropdown menu listing all the available models on your plan. You can just use your Up and Down Arrow keys to move through the list. When you hear the one you want, press Enter to select it. Your screen reader will then announce the newly selected model, and your focus returns to the chat input area so you can start typing.

**Jamie:** That is really straightforward. And what about Inline Chat? We talked about that a few episodes ago, where you press Control plus I to open a quick chat directly inside your code editor instead of opening the side panel. Can I switch models there too?

**Alex:** You can. When you press Control plus I to open Inline Chat, a small toolbar appears in your editor. The model picker button is right there in that toolbar. The interaction is exactly the same. You navigate to the button, open the dropdown, and select your model.

**Jamie:** But wait, does changing the model in the chat panel also change the model that gives me those automatic ghost text suggestions while I am typing? You know, the inline completions that just appear as I type?

**Alex:** That is a fantastic question, and the answer is no. This is a really important distinction. Model selection only affects your conversational chats. The automatic inline suggestions that appear as you type are handled completely separately.

**Jamie:** Why is that?

**Alex:** Because inline suggestions have to be instantaneous. If you are typing a function, you cannot wait five seconds for Claude Opus to ponder the meaning of your code. You need a suggestion in milliseconds. So GitHub exclusively uses highly specialized, hyper-fast models for inline completions. Right now, those are fine-tuned OpenAI models called Raptor mini and Goldeneye. You cannot manually switch those. GitHub manages them in the background to guarantee speed. You only choose models for the Chat and Agent interactions.


**Jamie:** Earlier, my screen reader announced that my selected model was Auto. What exactly does Auto do?

**Alex:** Auto mode is the default setting, and honestly, it is what most developers should use most of the time. Think of it like an automatic transmission in a car. You do not have to manually shift gears. Copilot analyzes your prompt and automatically routes it to the best model.

**Jamie:** So if I ask a simple question, it automatically routes to a fast, zero-multiplier model. But if I ask it to debug a massive architectural issue, it automatically shifts into a higher gear and routes to a deep reasoning model?

**Alex:** Exactly. And if you give it an agentic task, it automatically selects a Codex model. It manages your premium requests intelligently. You can always check which model it decided to use by navigating to the response details after it replies.

**Jamie:** If Auto is so smart, why would I ever manually override it and pick a specific model?

**Alex:** A few reasons. Sometimes you might be running low on premium requests for the month, so you manually lock it to GPT 5 mini to ensure you do not spend any more tokens. Or, you might find that for your specific programming language, say you write a lot of obscure Haskell code, you find that Claude Sonnet consistently gives you better answers than the model Auto chooses. Finally, if you want to use the vision capabilities to analyze an image, you might manually select a model that you know supports images, just to be safe.

**Jamie:** That makes sense. If I manually select a model, how do I get back to Auto mode?

**Alex:** You just open the model picker dropdown again using the steps we discussed, arrow to the very top of the list, and select Auto. It is just another option in the menu.


**Jamie:** One thing I have noticed over the last two years is that the models keep changing. I remember when everyone was talking about GPT 4, and now we are talking about GPT 5.2. It feels hard to keep up.

**Alex:** It is a fast-moving landscape. GitHub regularly updates the roster. They bring in newer, smarter models and they retire the older ones. It is just like getting software updates on your phone. Eventually, the old version is no longer supported.

**Jamie:** What happens if my favorite model gets retired? Like, what if I manually set my chat to use Claude Sonnet 3.5, and then GitHub retires it? Will my Copilot just break?

**Alex:** No, Copilot handles it gracefully. When a model is officially retired, Copilot simply stops sending requests to it and automatically falls back to the nearest equivalent newer model. So you would just be upgraded to Claude Sonnet 4.

**Jamie:** That is a relief. Is there a way to know when models are being added or retired so I am not caught off guard?

**Alex:** Yes, the best place to track this is the official GitHub Copilot changelog on the GitHub blog. They announce all model additions and retirements there. It is a great resource to check once a month just to see what new tools have been added to your workshop.


**Jamie:** This has been incredibly enlightening. I feel like I finally understand what is happening behind the scenes. What are our key takeaways for today?

**Alex:** First, remember that Copilot gives you access to multiple AI providers, including OpenAI, Anthropic, Google, and xAI. Second, match the model to the task. Use fast, free models like GPT 5 mini for everyday questions, and save the powerful models like Claude Opus for complex debugging to conserve your premium requests.

**Jamie:** Third, you can easily switch models in Visual Studio Code by pressing Control plus Shift plus I to open the chat panel, and tabbing to the model picker button. And fourth, when in doubt, just leave it on Auto mode and let Copilot do the driving for you.

**Alex:** Perfectly summarized. Now that you know how to choose the right brain for the job, you need to know how to talk to it effectively. In our next episode, Episode 42, we are going to cover Writing Effective Copilot Prompts. We will learn how to structure your questions to get the highest quality code out of whichever model you choose.

**Jamie:** I definitely need that. Half the time I feel like I am arguing with the AI because I did not explain myself clearly. I cannot wait.

**Alex:** It is going to be a great discussion. Until then, keep experimenting with those different models, and happy coding.

</details>


### Episode 42: Accessing Workshop Materials

Downloading the repository, reading offline, keeping updated, audio format.

Based on: [Appendix Y: Accessing Workshop Materials](docs/appendix-y-workshop-materials.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep42-accessing-workshop-materials.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep42-accessing-workshop-materials.mp3">Download Episode 42 (MP3)</a>
</audio>

[Download Episode 42 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep42-accessing-workshop-materials.mp3)

<details>
<summary>Read Transcript - Episode 42: Accessing Workshop Materials</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub, the audio learning series designed specifically for blind and low-vision developers who are navigating the world of open source. I am Alex, and as always, I am thrilled to be here with you.

**Jamie:** And I am Jamie! I am a developer who learned GitHub about two years ago, and I am here to ask all the questions that you are probably thinking as you listen.

**Alex:** Today we are diving into Episode 42, which is all about Accessing Workshop Materials. We have covered so much ground in this series. We have talked about branches, commits, pull requests, and navigating the GitHub interface. But today, we are taking a step back to talk about the materials themselves.

**Jamie:** Yes, and I am so glad we are doing this. When I attended my first developer workshop, I was so overwhelmed. The instructor sent out a link to a GitHub repository, and I navigated to it, and there were just dozens of files. There was a docs folder, an HTML folder, a scripts folder, markdown files everywhere. I spent the first hour just trying to figure out where the actual reading material was, while everyone else was already starting the exercises.

**Alex:** That is incredibly common, and it is exactly why we dedicated an entire appendix in the written guide, and this entire podcast episode, to this topic. A repository for a workshop is essentially a giant filing cabinet. If you do not know how the cabinet is organized, or how to take the files out of it, you are going to feel lost.

**Jamie:** Exactly. So, I know we have a few prerequisites for today. Listeners should already be familiar with what a repository is, and they should know the basic concept of Git, which we covered way back in our first few episodes.

**Alex:** Spot on. If you know what a repository is, you are ready for this episode. Today, we are going to talk about how to get the workshop materials, how to read them offline, how to keep your copy updated when the instructor adds new content, and the different formats we offer, including HTML, Markdown, and the very audio format you are listening to right now.

**Jamie:** I love it. Where should we start?

**Alex:** Let us start by talking about the formats. We provide the workshop materials in multiple ways because different developers have different accessibility needs and learning preferences. The first format is the one we are using right now. The podcast audio series.

**Jamie:** Which is so meta! We are in the podcast, talking about the podcast.

**Alex:** We are! But the audio format serves a very specific purpose. Listening to someone explain a technical concept is completely different from reading a technical document with your screen reader. When you are reading code or step-by-step instructions, your brain is doing a lot of work parsing the syntax, the keystrokes, and the formatting.

**Jamie:** Oh, absolutely. When my screen reader is reading a markdown file, I am listening to every heading level, every list item, every piece of punctuation in a code block. It is a high cognitive load.

**Alex:** Exactly. So the podcast format is designed to be your conceptual introduction. Think of it like having a study buddy sitting in the passenger seat of your car. You can listen to us while you commute, or while you are doing the dishes. We explain the why, the overarching concepts, and the analogies. Then, when you actually sit down at your computer to read the written materials, you already have the mental model. The written materials are for the exact keystrokes and the technical reference.

**Jamie:** That makes so much sense. I wish I had this audio series when I started. Okay, so aside from the podcast, the written materials come in two main formats. Markdown and HTML. Can you break down the difference for someone who might be new to those terms?

**Alex:** I would love to. Markdown is a plain text format. It uses very simple punctuation to indicate formatting. For example, a single number sign before a word makes it a heading. We use Markdown because it is the standard language of GitHub. Every repository has a README file written in Markdown. It is lightweight, and you can write it in any simple text editor.

**Jamie:** And screen readers handle plain text really well.

**Alex:** They do. But plain text does not have the rich navigational structure that a fully built website has. That is where HTML comes in. HTML stands for HyperText Markup Language. It is the code that powers web pages. We have an automated script that takes all our simple Markdown files and transforms them into beautifully structured HTML pages.

**Jamie:** I think an analogy would help here. How should I picture the relationship between Markdown and HTML?

**Alex:** Think of Markdown as the script for a play. It has the raw dialogue and the basic stage directions. It gets the point across perfectly. But HTML is the final stage production. It has the lighting, the sets, the costumes, and the ushers guiding you to your seat. The content is exactly the same, but the presentation and the navigation are much more polished.

**Jamie:** Oh, I love that. The ushers guiding you to your seat is a great way to describe ARIA landmarks and skip links.

**Alex:** Exactly. Our HTML files include breadcrumb navigation, skip-to-content links, and ARIA landmarks. ARIA stands for Accessible Rich Internet Applications, and landmarks are invisible signposts that tell your screen reader where the main content begins, where the navigation menu is, and so on.


**Jamie:** So let us say I am attending the workshop, and I want the fully produced stage play. I want the HTML version with all those navigational signposts. How do I get to it? Do I have to download something?

**Alex:** You do not have to download anything if you do not want to. The absolute easiest way to read the materials during the workshop is by browsing online using GitHub Pages.

**Jamie:** GitHub Pages. We have mentioned that before, but what is it exactly?

**Alex:** GitHub Pages is a free service provided by GitHub that takes the HTML files in your repository and publishes them as a live website. For our workshop, your facilitator will give you a specific web address. Usually, it looks something like community hyphen access dot org slash Learning hyphen Room.

**Jamie:** So it is just a regular website. I open my browser, I navigate to that URL, and I am there.

**Alex:** Exactly. It is like walking into a well-organized public library. Everything is already on the shelves. When you load the page, you will be on the index dot html file, which serves as the homepage. From there, you can use standard screen reader commands to move around.

**Jamie:** Let us talk about those commands, because navigation is everything. When I land on that GitHub Pages site, what is the fastest way to get to the actual reading material?

**Alex:** The fastest way is to use your landmark jump key. In NVDA, you press the D key. In JAWS, you press the R key. That will jump you straight to the main landmark, bypassing all the top-level navigation and the headers.

**Jamie:** That saves so much time. I used to just press the down arrow fifty times until I heard something that sounded like a paragraph.

**Alex:** We have all been there. Once you are in the main landmark, use your heading key, which is the H key, to move through the sections. All the chapters and appendices are linked. If the text references Appendix A, you can just press Enter on that link, and it will take you right to Appendix A. It is a completely seamless online reading experience.

**Jamie:** Okay, so GitHub Pages is the polished library. But what if the facilitator has not set up GitHub Pages, or what if I just want to read the raw Markdown files directly on the GitHub website? Can I do that?

**Alex:** You absolutely can. You can read every single file directly on GitHub dot com without downloading a thing. You just navigate to the repository link that your facilitator shares.

**Jamie:** But this is where I used to get stuck. I would get to the repository page, and my screen reader would just read a massive table of files and folders. How do I actually find chapter one?

**Alex:** Great question. When you load a repository page on GitHub, the main content area contains a grid or a table of all the files. You can press the T key on your keyboard to jump straight to the file table, and then use your arrow keys to move through the rows. You will find a folder called docs. That is where all the written chapters live.

**Jamie:** Wait, did you just say I can press T to jump to the table?

**Alex:** Actually, I should clarify. If you are in browse mode, T jumps to the table. But GitHub has a built-in keyboard shortcut that is even better. If you turn your screen reader's browse mode off, or pass the key through, and you press the letter T anywhere on the repository homepage, it opens the file finder.

**Jamie:** The file finder? I do not think I know what that is.

**Alex:** It is a dynamic search field. When you press T, an edit box pops up. You can just type a word, like pull requests, or chapter five. GitHub instantly filters the entire repository and shows you only the files that match. You arrow down to the one you want, press Enter, and you are inside the file.

**Jamie:** Mind blown. That is so much faster than digging through folders manually. It is like having a digital assistant where you just say the name of the file and it hands it to you.

**Alex:** Exactly. And once you open a Markdown file on GitHub dot com, GitHub automatically renders it. It turns the number signs into actual headings, and it formats the code blocks. So you can still use your H key to navigate by headings, even though it is technically a Markdown file.


**Jamie:** Okay, so reading online is great. But what if I am going to be on a train with no internet, or what if I just want all the files on my own computer so I can open them in my own editor? That sounds like a lot of steps.

**Alex:** It does sound like a lot, but here is the thing. You have already done most of this on Day 1 of the workshop. It is the exact same workflow you use for any code project. To get the files onto your computer, you need to download everything. And you have two options for this. Option A is cloning the repository with Git. Option B is downloading a ZIP file.

**Jamie:** Let us start with Option A, cloning. What does that mean, and how do I do it?

**Alex:** Cloning means using the Git command line tool to create a complete, fully functioning copy of the repository on your local computer. You open your terminal, and you type git, space, clone, space, and then you paste the web address of the repository. So it would be git clone https colon slash slash github dot com slash community hyphen access slash Learning hyphen Room dot git.

**Jamie:** And when I press enter on that command, what happens?

**Alex:** Git reaches out to GitHub, gathers every single folder, every file, every image, and every bit of history, and pulls it down into a new folder on your computer.

**Jamie:** That sounds powerful. But what if I am not comfortable with the command line yet? What is Option B?

**Alex:** Option B is downloading a ZIP file. You do not need Git installed for this. You just go to the repository page on GitHub dot com. You navigate to a button called the Code button. It is a green button near the top of the file listing, right after the branch selector.

**Jamie:** How do I find the Code button with my screen reader?

**Alex:** If you are at the top of the page, you can press the letter B to jump from button to button. You will hear things like Watch, Fork, Star, and eventually, you will hear Code collapsed button. You press Space or Enter to expand it, and a dropdown menu appears. You just arrow down through that menu until you hear Download ZIP, and you activate it.

**Jamie:** And then it just downloads a standard ZIP folder to my downloads directory, and I can extract it like any other file.

**Alex:** Exactly right. You extract it, and you have all the exact same files as if you had cloned it.

**Jamie:** Okay, so I have to ask. If downloading a ZIP is so easy, and I do not have to use the terminal, why do you recommend cloning instead?

**Alex:** That is a brilliant question. I want to use an analogy here. Think about getting your news. Downloading a ZIP file is like walking to the newsstand and buying a printed newspaper. You have all the information that existed at the exact moment you bought it. But tomorrow, when new things happen, your printed newspaper will not update. It is static. A snapshot in time.

**Jamie:** Right. If the workshop facilitator adds a new chapter on day two, my ZIP file from day one will not have it.

**Alex:** Exactly. But cloning with Git is like signing up for a smart digital subscription. You get all the current news today. And tomorrow, you can just ask the service for any updates, and it will only send you the new articles, slotting them perfectly into your existing app. Cloning keeps your local folder connected to the original source on GitHub.


**Jamie:** That makes perfect sense. Okay, so I have used Git clone, and now I have a folder on my computer called Learning hyphen Room. It is full of stuff. I want to read chapter one offline. How do I do that?

**Alex:** The best way to read the materials offline is to open the entire folder in a text editor like Visual Studio Code, which we call VS Code. You open your terminal, you type cd space Learning hyphen Room to move into the folder, and then you type code space dot. That is the word code, a space, and a period.

**Jamie:** I use that command all the time. It opens VS Code and loads the current folder into the workspace.

**Alex:** Yes. And once VS Code is open, you can use the Explorer pane to browse the files. The keyboard shortcut to focus the Explorer is Control plus Shift plus E.

**Jamie:** Let us break down what is actually in this folder, because the structure can be intimidating. When I open the Explorer, what folders am I going to find?

**Alex:** You will see a few main folders. First is the docs folder. This is where all the Markdown files live. Chapters zero through sixteen, and all the appendices. If you want to read the raw text, you open these files.

**Jamie:** And what if I want the pretty, formatted version? The stage play?

**Alex:** Then you navigate to the html folder. This folder contains the exact same content, but pre-built into HTML files. You can actually open the index dot html file directly in your web browser. Just locate it in your computer's file explorer, press Enter, and it will open in Chrome or Edge or Firefox. It works exactly like the online GitHub Pages site, but it is running entirely off your hard drive. No internet required.

**Jamie:** That is so cool. It is like pitching your tent in the woods and having all your supplies with you. You are completely self-sufficient.

**Alex:** Exactly. And there is one more folder you will see, called the learning hyphen room folder. This is where the actual practice exercises live. When the facilitator tells you to complete a challenge, you will find the instructions and the starting code in that folder.

**Jamie:** Okay, so if I decide to read the Markdown files in VS Code, instead of the HTML files in the browser, is there a way to make the Markdown look a bit nicer? Like, instead of my screen reader saying number sign number sign Chapter One, can it just read it as a heading level two?

**Alex:** Yes! VS Code has a fantastic built-in feature called Markdown Preview. If you open a Markdown file in the editor, you can press Control plus Shift plus V. That is V as in Victor.

**Jamie:** What does that shortcut do?

**Alex:** It opens a new pane that renders the Markdown as rich text. Your screen reader will interact with it almost exactly like a web page. You can use your H key to jump by headings, your list commands to read bullet points, and it hides all the raw punctuation. It is a wonderful way to read offline if you prefer to stay inside VS Code rather than opening a browser.


**Jamie:** I am learning so many shortcuts today. Control plus Shift plus E for the Explorer, Control plus Shift plus V for the Markdown preview. This is great. But let us go back to that smart subscription analogy. You said if I clone the repository, I can easily get updates. Let us say it is day two of the workshop. The instructor says, I just fixed a typo in chapter four and added a new cheat sheet. How do I get those updates into my local folder?

**Alex:** This is where the magic of Git comes in. All you have to do is open your terminal, make sure you are inside the Learning hyphen Room folder, and type a two-word command. Git pull. That is G I T, space, P U L L.

**Jamie:** Git pull. I love that name because you are literally pulling the changes down from the internet into your computer.

**Alex:** Exactly. It is like refreshing your podcast app to see if a new episode has dropped. When you run git pull, Git checks the original repository on GitHub, sees what has changed since your last visit, and seamlessly merges those changes into your local files.

**Jamie:** What if I made a change to a file? Like, what if I was taking my own notes inside chapter four, and then I run git pull. Will it overwrite my notes?

**Alex:** Git is very safe. It will not overwrite your local changes without asking. If you modified the exact same line that the instructor modified, Git will pause and say, wait a minute, we have a merge conflict. It will ask you to decide which version to keep. We actually have an entire chapter dedicated to merge conflicts, because they sound scary, but they are just Git's way of being cautious.

**Jamie:** That is reassuring. Now, if I run git pull, does it update both the Markdown files and the HTML files?

**Alex:** Usually, yes, because we commit the updated HTML files to the repository. But if for some reason the HTML files are out of sync, we include a simple script you can run. In your terminal, you just type npm space run space build colon html.

**Jamie:** Wait, spell that out for me.

**Alex:** Sure. N P M, space, run, space, build, colon, html. That command runs a small program on your computer that reads all the Markdown files and generates fresh HTML files. So if you ever edit the materials yourself and want to see the changes in the browser, you just run that command.


**Jamie:** Okay, we have covered reading online, downloading everything, reading offline, and staying updated. I have one last scenario. What if I do not want the whole repository? What if I literally just want the keyboard shortcut cheat sheet so I can print it out or emboss it in Braille? Can I download just one file?

**Alex:** You absolutely can, and I highly recommend doing this for reference sheets. If you are on the GitHub dot com website, and you have navigated to a specific file, let us say the cheat sheet markdown file. You open it, and right above the content of the file, there is a small toolbar of buttons.

**Jamie:** What buttons are in that toolbar?

**Alex:** You will hear things like Preview, Code, Blame, and Raw. You want to navigate to the Raw button and activate it.

</details>


### Episode 43: GitHub Skills - Complete Course Catalog

All 36 GitHub Skills modules organized into six learning paths.

Based on: [Appendix Z: GitHub Skills - Complete Course Catalog](docs/appendix-z-github-skills.md)

<audio controls preload="none">
  <source src="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep43-github-skills-catalog.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep43-github-skills-catalog.mp3">Download Episode 43 (MP3)</a>
</audio>

[Download Episode 43 (MP3)](https://github.com/Community-Access/git-going-with-github/releases/download/podcasts/ep43-github-skills-catalog.mp3)

<details>
<summary>Read Transcript - Episode 43: GitHub Skills - Complete Course Catalog</summary>

#### Transcript

**Alex:** Welcome to Gitt Going with GitHub, the audio learning series for blind and low-vision developers. I am Alex, and today we are diving into Episode 43, GitHub Skills and the Complete Course Catalog.

**Jamie:** And I am Jamie! We are getting so close to the end of our series, which matches up with the end of Day 2 of the workshop. Today is all about what happens next. How do you keep learning once the workshop is over?

**Alex:** Exactly. During the workshop, you have a lot of support. You have facilitators, you have the learning room, you have us in your ears. But when you go back to your desk on Monday, you might feel a little stranded. That is where GitHub Skills comes in.

**Jamie:** I remember when I was learning GitHub about two years ago. I would read these long, static tutorials, and I would try to follow along in my own repository, but I was never quite sure if I did it right. There was no feedback loop. I wished I had someone looking over my shoulder saying, yes, you created that branch correctly.

**Alex:** That is the exact problem GitHub Skills solves. GitHub Skills is a free, interactive, self-paced learning platform. But what makes it truly special for our community is that there is no separate website, no external video portal, and no custom interface to learn. Every single course runs entirely inside GitHub itself.

**Jamie:** Which is huge for accessibility. You do not have to learn a whole new set of keyboard shortcuts or figure out how a completely different website is structured. You just use the heading navigation and landmark jumping skills you have already been practicing.

**Alex:** Right. The way it works is brilliant. It is like an interactive flight simulator. You are not watching someone else fly; you are at the controls. When you start a course, GitHub copies a template repository directly into your own account. It is your repository, completely private to you unless you choose to make it public.

**Jamie:** And then you meet Mona.

**Alex:** Yes, Mona! Mona is GitHub's automated learning bot. Once the repository is copied to your account, Mona uses GitHub Actions in the background to act as your personal instructor. Within about twenty seconds of starting a course, Mona will open an issue in your new repository.

**Jamie:** And just as a quick refresher, an issue is essentially a discussion thread used to track tasks, bugs, or feature requests. So Mona opens this issue, and the first comment will be your instructions for Step 1. It might say something like, welcome to the course, your first task is to create a new branch.

**Alex:** You read the instructions, and then you just do the task right there in your repository. You create the branch, or you edit a file, or you open a pull request. A pull request, of course, being the formal way you ask to merge your code changes into the main project.

**Jamie:** So you do the work, and then what? How does Mona know you did it?

**Alex:** Because Mona is listening for those events. When you open that pull request, the bot detects your action, validates that you did it correctly, and then immediately posts the next step. It might leave a comment on your pull request saying, great job, now let us try leaving a code review comment. You just keep following the prompts until Mona closes the final issue with a congratulatory completion message.

**Jamie:** It is so satisfying to get that final message. OK, that sounds like a lot of automated steps, but I want to normalize this for a second. It might sound intimidating to have a bot watching your repository, but you have already done this. The workflow is exactly what you practiced on Day 1. You are just reading issues, making commits, and managing pull requests.

**Alex:** Absolutely. Now, before we get into the massive catalog of courses, let us talk about how to start a course and track your progress. To start, you simply navigate to the specific course URL, which we list in Appendix Z of the workshop materials, and activate the Start course button.

**Jamie:** But tracking progress is a little quirky, right? Because there is no central dashboard that says, Jamie has completed five out of thirty-six courses.

**Alex:** That is correct. GitHub Skills does not have a central profile dashboard. But there are a few practical ways to track your learning. First, all of these courses create repositories in your account that start with the prefix skills hyphen. So, you can just navigate to your repositories page and filter by the word skills to see everything you have started.

**Jamie:** Oh, that is clever! I also like to bookmark Mona's final completion message in my browser, just as a little digital trophy.

**Alex:** That works too! You can also pin your favorite completed course repositories to your main GitHub profile. And finally, Appendix Z has a personal completion checklist. You can literally just copy that markdown list into a private issue or a local text file and check off the boxes as you go.


**Jamie:** Alright, let us talk about the courses themselves. There are thirty-six modules in total, organized into different learning paths. But before we hit the advanced stuff, there are three courses that are actually woven into Day 1 of the workshop.

**Alex:** Yes, the beginner path, or the workshop courses. These are Introduction to GitHub, Communicate Using Markdown, and Review Pull Requests.

**Jamie:** Introduction to GitHub is the classic starting point. It teaches you the core flow: how to create branches, make commits, open pull requests, and merge them. A commit is basically saving a snapshot of your work, and a branch is a safe parallel universe where you can make those commits without affecting the main project.

**Alex:** Then you have Communicate Using Markdown. Markdown is the lightweight formatting language used everywhere on GitHub. This course teaches you how to format headings, add emphasis, create links, format code blocks, and build task lists and tables, all using plain text characters.

**Jamie:** And the third one is Review Pull Requests. This is where you practice assigning reviewers, leaving comments on specific lines of code, suggesting changes, and finally approving and merging.

**Alex:** If you are listening to this and you did not finish those three modules during Day 1, that is your very first prerequisite. Go finish those before you attempt anything else. They are the foundation of everything we do on GitHub.


**Jamie:** Once those are done, we have six distinct learning paths to choose from. You do not have to do all of them, right? You just pick the path that matches your goals.

**Alex:** Exactly. Let us start with Path 1, Git Fundamentals. This path is for deepening your understanding of the underlying version control system. It includes three courses: Introduction to Git, Resolve Merge Conflicts, and Change Commit History.

**Jamie:** Resolve Merge Conflicts used to terrify me. A merge conflict happens when two people edit the exact same line of code in different ways, and Git essentially throws its hands up and says, I do not know which version to keep, you figure it out.

**Alex:** It is a great analogy. Imagine two authors collaborating on a book. If you both rewrite the exact same paragraph in chapter two, the publisher cannot just mash them together. Someone has to read both versions and write a final, combined paragraph. That is all a merge conflict is. This course teaches you why they happen, how to read the text markers that Git inserts to show you the two versions, and how to resolve them safely using the web editor.

**Jamie:** And what about Change Commit History? That sounds like time travel.

**Alex:** It is time travel! Sometimes you make a typo in a commit message, or you want to combine five messy commits into one clean one before you share your work. This course teaches you how to amend commits, squash them together, and reorder your history using a tool called interactive rebase. It requires the Introduction to Git course as a prerequisite, but it is incredibly powerful once you learn it.


**Jamie:** Path 2 is GitHub Collaboration. This feels like the path for people who want to become open source maintainers or run projects for their team.

**Alex:** Spot on. This path extends the labels and milestones you learned in Day 1 into full repository management. The recommended order starts with Introduction to Repository Management.

**Jamie:** This is where you learn about branch protection, right? Like setting rules that say, nobody is allowed to merge code into the main branch unless it has been reviewed by at least two people.

**Alex:** Exactly. You also learn how to create issue templates, so when someone reports a bug, they get a predefined form asking for reproduction steps and screen reader versions, rather than just a blank text box. It is like running a community center. You need rules, you need clear signs, and you need structure so everyone can collaborate safely.

**Jamie:** The next course in this path is Connect the Dots.

**Alex:** Yes, this teaches you how to cross-reference work. How to mention an issue inside a pull request so that when the pull request merges, the issue automatically closes.

**Jamie:** I love that feature. It feels like magic. Then we have GitHub Pages, which teaches you how to host a website directly from your repository for free. And finally, Release-Based Workflow, where you learn how to tag specific points in your history as official version releases, like version 1 point 0.


**Alex:** Moving on to Path 3, GitHub Actions and Automation. This is for the DevOps folks, or really anyone who is tired of doing repetitive tasks manually.

**Jamie:** Automation is the best. If I have to do something more than twice, I want a robot to do it for me.

**Alex:** That is the spirit of GitHub Actions. Actions are essentially a digital Rube Goldberg machine. You define a trigger, like when someone opens a pull request, and that trigger knocks over a domino that starts a sequence of automated tasks.

**Jamie:** The first course here is Hello GitHub Actions, which is your prerequisite for the rest of the path. It teaches you the vocabulary. What is a workflow file? What is a trigger? What are jobs and steps?

**Alex:** Once you have that vocabulary, the path opens up. You can take Test with Actions, which teaches Continuous Integration. That means automatically running your automated tests every time someone pushes new code, to make sure nothing broke.

**Jamie:** Then there is Reusable Workflows, so you do not have to copy and paste the same automation across fifty different repositories. And Write JavaScript Actions, where you actually build your own custom automation tools from scratch.

**Alex:** The path also covers deployment. There is Publish Docker Images, which teaches you how to build software containers and publish them. And Deploy to Azure, for pushing your web applications to the cloud.

**Jamie:** And they recently added AI to this path too, right?

**Alex:** Yes, the newest courses are AI in Actions and Create AI-Powered Actions. These teach you how to integrate artificial intelligence models directly into your automation pipelines. So your automated workflows can actually summarize pull requests, or categorize issues based on their text content, without human intervention.


**Jamie:** Speaking of AI, that brings us to Path 4, GitHub Copilot. This is the biggest path in the catalog, with ten different courses.

**Alex:** It is massive because Copilot has grown from a simple code completion tool into an entire ecosystem. Copilot is an AI assistant trained on public code. The analogy I use is that it is like pair programming with an incredibly fast typist who has memorized all the documentation on the internet, but who still needs you to be the head chef and tell them what to cook.

**Jamie:** You start with Getting Started with GitHub Copilot. This covers the basics of code completion, using Copilot Chat to ask questions, and getting help with debugging.

**Alex:** From there, you move into Build Applications with Copilot Agent Mode. Agent mode is fascinating. Instead of just suggesting one line of code at a time, you can give Copilot a complex natural language prompt, and it will plan and generate changes across multiple different files at once.

**Jamie:** Then there is Copilot Code Review, where the AI helps you catch quality issues before you merge. And Customize Your GitHub Copilot Experience, which teaches you how to set up custom instructions. So you can tell Copilot, hey, I use a screen reader, always ensure the HTML you generate includes proper ARIA labels.

**Alex:** Exactly. The path gets quite advanced from there. There is Expand Your Team with Copilot, where you learn to assign issues directly to the Copilot agent on the GitHub website, no editor required. And Integrate MCP with Copilot. MCP stands for Model Context Protocol. It is a way to give the AI secure access to external tools and data, so it can read your database schema or check your error logs.

**Jamie:** There is also Scale Institutional Knowledge Using Copilot Spaces, which helps share context across a whole team. And Create Applications with the Copilot CLI. CLI stands for Command Line Interface. I know the terminal can be intimidating, but Copilot can actually explain shell commands to you before you run them, which is a huge confidence booster.

**Alex:** The final two courses in the Copilot path are Your First Extension for GitHub Copilot, where you build custom capabilities for the AI, and Modernize Your Legacy Code. That last one is a two-hour deep dive where you use Copilot to translate an old COBOL accounting system into modern Node dot js.

**Jamie:** Wow. From basic chat all the way to translating COBOL. That is quite a journey.


**Alex:** Let us shift gears to Path 5, Security. Security is everyone's job, but it can feel overwhelming. This path breaks it down perfectly.

**Jamie:** It starts with the Secure Code Game, which sounds fun. It is a gamified course where you hunt for real security vulnerabilities in sample code and learn how to patch them.

**Alex:** Then you have Introduction to Secret Scanning. Secret scanning is like having a bouncer check your pockets before you leave the house to make sure you are not accidentally dropping your house keys on the public sidewalk. It scans your repository to ensure you have not accidentally committed passwords, API keys, or security tokens into your public code.

**Jamie:** And Secure Repository Supply Chain. This is all about dependencies. A dependency is external code written by someone else that your project relies on. This course teaches you how to use Dependabot to find out if those external projects have known vulnerabilities, and how to automatically update them.

**Alex:** Finally, we have Introduction to CodeQL and Configure CodeQL Language Matrix. CodeQL is GitHub's semantic code analysis engine. Think of it as a building inspector. It reads your code, understands the flow of data, and flags structural weaknesses, like a place where a hacker could inject malicious SQL commands into your database. These courses teach you how to enable and configure that inspector.


**Jamie:** Alright, the final path. Path 6, Cloud and Migration.

**Alex:** This path is all about moving your development environment and your existing projects into the modern cloud. It starts with Code with Codespaces.

**Jamie:** We talked about Codespaces in Appendix N. A Codespace is a complete developer environment hosted in the cloud. You do not have to install Node, or Python, or Docker on your local laptop. You just connect to the cloud environment through VS Code or your browser.

**Alex:** The analogy here is renting a fully furnished apartment instead of building a house from scratch. When you start the Code with Codespaces course, you will practice spinning up these environments, configuring them, and accessing them using your local screen reader via the command palette. Just remember to press Control plus Shift plus P to open that command palette.

**Jamie:** The second course is Migrate ADO Repository. ADO stands for Azure DevOps. If your company is moving from Azure DevOps to GitHub, this course gives you a safe sandbox to practice migrating the code and history using the command line.

**Alex:** And the final course in the entire catalog is Idea to App with Spark. GitHub Spark is an AI tool that lets you build small web applications entirely through natural language, without writing the code yourself. It is a fantastic way to rapidly prototype ideas.


**Jamie:** Okay, that is thirty-six courses across six paths. It is a lot to take in. How should someone actually approach this after the workshop?

**Alex:** My biggest piece of advice: do not try to do everything at once. Pick just one path that aligns with your immediate goals. If you want to contribute to open source, start with Path 2, Collaboration. If you want to code faster, start with Path 4, Copilot.

**Jamie:** And work through them one at a time. Each course only takes about thirty to sixty minutes. If you do one a week, you give yourself time to actually absorb the concepts and try them out in your real projects.

**Alex:** Exactly. And keep your workshop materials handy. When a GitHub Skills course asks you to create a branch or resolve a merge conflict, Mona will not give you the specific screen reader keystrokes. You will need to refer back to the chapter guides from this workshop for those specific accessibility instructions.

**Jamie:** So, to summarize our key takeaways. First, GitHub Skills is free, self-paced, and runs entirely in the standard GitHub interface, making it highly accessible. Second, a bot named Mona will guide you through issues and pull requests in your own private template repository.

**Alex:** Third, track your progress by searching your repositories for the prefix skills hyphen, and by using the checklist in Appendix Z. And fourth, always finish the introductory workshop courses before branching out into the specialized paths like Actions, Security, or Copilot.

**Jamie:** This has been such a great roadmap. What is coming up in our next episode, Alex?

**Alex:** In Episode 44, which is our final episode of the series, we are going to talk about community. We will cover how to find accessible open source projects, how to disclose your access needs to maintainers if you choose to, and how to take your very first steps into the wider GitHub community.

**Jamie:** I cannot wait. Thank you so much for listening, everyone. Happy learning, and we will catch you in the final episode!

**Alex:** Take care, and keep Git going.

</details>


## Production

These episodes are generated using [Google NotebookLM](https://notebooklm.google.com/) Audio Overviews. Each episode is produced from the workshop chapter content combined with episode-specific production prompts that ensure concept coverage, accessible language, and screen reader-friendly descriptions.

Source bundles and production documentation are in the [podcasts/](podcasts/) directory.
