# Podcast Regeneration Runbook

This runbook explains how to rebuild the Git Going with GitHub podcast series after curriculum changes. Use it when chapters, appendices, agendas, or challenges change enough that the existing transcripts no longer match the source material.

## Current Strategy

The podcast pipeline has two content layers that are published as one listening path.

1. **Companion episodes for chapters and appendices**
   These are conversational overviews. They help learners preview or review concepts before reading the full material.

2. **Challenge teaching episodes**
   These should teach the challenge in a guided, classroom style. They should explain the skill, model the learner's thinking, describe what success sounds like with a screen reader, and clarify what evidence the learner submits.

The chapter and appendix episodes can stay broader and conceptual. The challenge episodes should be more tactical and should follow the Learning Room progression. The final public order is controlled by `podcasts/config/listening-order.json`, which places each challenge near the chapters that prepare learners for it. The feed builder, inventory checker, metadata tagger, and audio generators all use that same order.

The refreshed companion catalog currently contains 54 episodes. The Challenge Coach layer currently has 21 generated source bundles: 16 core challenges plus 5 bonus challenges.

## Style Standard

Keep the Alex and Jamie format. The banter is part of the accessibility design because it makes dense technical material easier to process.

- **Alex:** Warm expert guide. Explains concepts clearly, corrects misconceptions gently, and connects each task to real open source practice.
- **Jamie:** Curious co-host. Asks the questions a learner may hesitate to ask, restates the mental model, adds gentle humor, and names moments that feel confusing.
- **Tone:** Conversational, kind, practical, and lightly playful.
- **Avoid:** Stage directions, music cues, markdown tables in scripts, visual-only language, and jokes that pull attention away from the task.

Every generated script must use only these markers on their own lines:

```text
[ALEX]
[JAMIE]
[PAUSE]
```

## New Machine Setup

Run these commands from the repository root.

The following commands install the required Node and Python dependencies for bundle generation, site generation, and local Kokoro TTS audio generation.

```powershell
npm install
python -m pip install --upgrade pip
python -m pip install kokoro-onnx soundfile numpy mutagen
python -m podcasts.tts.download_kokoro_samples --english-high-quality-only
```

Confirm the local tools work:

```powershell
npm run validate:podcasts
npm run build:podcast-bundles
npm run build:podcast-challenge-bundles
npm run generate:podcast-transcripts
npm run build:podcast-site
```

Notes for a new machine:

- `podcasts/tts/models/` and `podcasts/tts/samples/` are intentionally ignored by git and must be downloaded locally.
- `podcasts/audio/` is intentionally ignored by git because audio files are published as GitHub Release assets.
- `podcasts/bundles/*.md` is intentionally ignored by git because chapter and appendix bundles are generated working files.
- `podcasts/challenge-bundles/*.md` is intentionally ignored by git because Challenge Coach bundles are generated working files.
- The Piper path remains available for fallback or comparison, but Kokoro is the production audio path.

## Regeneration Workflow

Use this workflow after major content changes.

1. Validate the catalog:

   ```powershell
   npm run validate:podcasts
   ```

   Treat missing source files and missing listening-order entries as blockers. Treat uncovered chapter or appendix warnings as planning work: either add episodes or intentionally leave those files out.

2. Regenerate source bundles:

   ```powershell
   npm run build:podcast-bundles
   npm run build:podcast-challenge-bundles
   ```

   Bundles are local source packets for transcript generation. They combine production prompts, concept checklists, issue templates, solution references, and source content. They should not be committed.

3. Generate fresh draft scripts in `podcasts/scripts/`.

   ```powershell
   npm run generate:podcast-transcripts
   ```

   This removes old `.txt` scripts and old `*-segments.json` transcript files, then creates fresh companion and Challenge Coach draft transcripts from the current catalog metadata, source headings, issue templates, solution references, and challenge mappings.

4. Review scripts manually before audio.

   Use the matching bundle as source context when editing. The output script is the committed transcript source of truth.

   Check for:

   - Current schedule and event model
   - Current challenge names and evidence requirements
   - Alex/Jamie speaker balance
   - No stale repository model language
   - No overpromising live completion
   - No visual-only instructions
   - Pronounceable technical terms

5. Generate audio:

   Preview the queue first. This does not load Kokoro models or create audio:

   ```powershell
   npm run podcast:audio:queue
   ```

   Then synthesize the selected batch:

   ```powershell
   python -m podcasts.tts.generate_audio --start 0 --end 0 --force --audio-format mp3
   python -m podcasts.tts.generate_audio --start 0 --end 10 --audio-format mp3
   ```

6. Update the podcast page and RSS feed:

   ```powershell
   npm run build:podcast-site
   npm run build:html
   ```

7. Upload audio files from `podcasts/audio/` to the GitHub Release tagged `podcasts`.

8. Validate the repository:

   ```powershell
   npm run validate:podcasts
   npm run test:automation
   git diff --check -- . ':(exclude)html/**'
   ```

## Challenge Episode Strategy

Yes, every challenge should have teaching coverage. The challenge episodes should not merely read issue text aloud. They should coach the learner through the skill.

Recommended structure for each challenge episode:

1. **Set the scene:** What skill are we practicing, and where does it fit in the contributor journey?
2. **Name the anxiety:** What usually feels confusing here?
3. **Teach the concept:** Explain the underlying GitHub, Git, or Copilot idea before giving steps.
4. **Walk the task:** Describe the screen reader and keyboard path in plain language.
5. **Evidence and validation:** Explain what the learner must submit and what Gandalf or the autograder checks.
6. **Common mistakes:** Name two or three likely problems and how to recover.
7. **What success sounds like:** Describe screen reader announcements, page locations, and completion signals.
8. **Bridge forward:** Explain how this challenge prepares for the next one.

Recommended challenge series:

The following table groups challenge episodes by teaching arc.

| Episode group | Challenges | Teaching purpose |
|---|---|---|
| Day 1 foundation | 1-3 | Repository orientation, issues, comments, and social confidence |
| Day 1 contribution | 4-6 | Branches, commits, pull requests, and linked issues |
| Day 1 stretch | 7-9 | Merge conflicts, culture, labels, and merge readiness |
| Day 2 local workflow | 10-13 | Local Git, PR review, and Copilot as a reviewed collaborator |
| Day 2 capstone | 14-16 | Issue templates, agent discovery, and building an agent |
| Bonus challenges | A-E | Extension work for fast finishers and async learners |

I recommend 21 short challenge episodes instead of cramming all challenges into the chapter episodes:

- 16 core challenge episodes, one per challenge
- 5 bonus challenge episodes, one per bonus challenge

Target length should be 5-8 minutes each. These can be more practical than the chapter episodes and should be interleaved with the companion lessons on the podcast page and in RSS.

## Transcript Source of Truth

Use this hierarchy:

1. `podcasts/scripts/*.txt` - committed source transcript scripts
2. `podcasts/transcripts/*-segments.json` - derived or archival segment representation
3. `PODCASTS.md` - generated public transcript/player page
4. `podcasts/feed.xml` - generated RSS feed
5. `podcasts/audio/` - local audio output, not committed
6. `podcasts/bundles/*.md` - local generation inputs, not committed

When content changes, regenerate scripts first. Audio should never be treated as the source of truth.

## Voice Deployment Notes

The current local voice setup uses Piper.

The following table lists the default host voice mapping.

| Host | Piper model | Role |
|---|---|---|
| Alex | `en_US-ryan-high.onnx` | Lead host and expert guide |
| Jamie | `en_US-lessac-high.onnx` | Curious co-host and learner advocate |

Change the model paths in `podcasts/tts/generate_episode.py` if you choose different voices. Keep Alex and Jamie distinct enough that listeners can identify the speaker without relying only on the transcript.

If a technical term is pronounced poorly, add it to `podcasts/tts/lexicon.txt`, then regenerate the episode.

## Recommended Next Tooling

The current tooling still needs one more major improvement: a script generator that can turn a bundle into a first-draft Alex/Jamie script using the same production prompt every time.

Recommended command shape:

```powershell
npm run generate:podcast-script -- ep00-welcome
npm run generate:podcast-challenge-script -- challenge-01-find-your-way-around
```

Until that exists, use the bundles as prompt packets and generate scripts manually or with the AI tool of choice, then commit the reviewed `.txt` scripts.
