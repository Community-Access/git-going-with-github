# Major Platform Upgrade: Hybrid Provisioning & Enhanced Reliability

## What Changed

We've completed a significant upgrade to **Git Going with GitHub**, transitioning from GitHub Classroom to a **GitHub-native Hybrid provisioning system**. This change improves reliability, removes external dependencies, and streamlines the student experience.

### Key Changes

#### 1. **Enrollment Process** (Student-Facing)
- **Before:** GitHub Classroom assignment link → accept → automatic repo creation
- **After:** Enrollment form → issue created → confirm acknowledgment → automated provisioning
- **Why:** Fully GitHub-native, no third-party dependency, more transparent automation

#### 2. **System Architecture** (Behind the Scenes)
- **Removed:** All GitHub Classroom infrastructure, seeding scripts, autograder dependencies
- **Added:** GitHub App-based provisioning with fine-grained permissions
- **Result:** Self-healing, idempotent system that can safely re-run without duplicates

#### 3. **Documentation** (Across All Sites)
- Updated 15+ markdown files across `/docs`, learning-room, and admin guides
- Removed 37+ files and directories (Classroom scripts, guides, integration docs)
- Regenerated HTML on community-access.org/git-going-with-github and lp.csedesigns.com/ggg
- Updated registration page (community-access.org/github) with new enrollment flow

#### 4. **Security & Configuration**
- Created GitHub App with least-privilege permissions:
  - Administration: Read and write (create student repos)
  - Contents: Read and write (seed and heal repo content)
  - Issues: Read and write (manage enrollment issues)
  - Metadata: Read-only (mandatory baseline)
- Secrets securely stored (never in code, only in GitHub Actions secrets)
- Provisioning driven by deterministic GitHub signals (issue closures, PR keywords, labels)

### What This Means for You

#### **If You're a Student:**
1. Enrollment is now **100% GitHub-native**—no third-party account, no extra authorization steps
2. Your Learning Room repo is provisioned **automatically** after you submit the enrollment form
3. All your challenges, issues, and progress tracking happen in your private GitHub repo
4. Facilitators see your work through the same GitHub interface—no separate tools needed

#### **If You're a Facilitator:**
1. **Roster management:** Maintain a simple `roster.json` file in a private admin repo
2. **Provisioning:** Trigger via Actions tab or 30-minute schedule (fully automated)
3. **Progress tracking:** Monitor via GitHub Issues, Pull Requests, and Discussions
4. **No more Classroom setup:** Integration guide simplified to one deployment guide

#### **If You're Running This Locally or on a Server:**
1. Follow [HYBRID_DEPLOYMENT_GUIDE.md](admin/HYBRID_DEPLOYMENT_GUIDE.md) Phases 1–4
2. **Phase 1:** Prepare admin roster repo with `roster.json`
3. **Phase 2:** Create GitHub App (done ✅)
4. **Phase 3:** Configure environment variables and secrets (done ✅)
5. **Phase 4:** Run smoke test with a test learner account
6. **Phase 5 (optional):** Deploy Flask companion for web-based enrollment form

---

## Enhancements & Reliability

### **Why This Is More Reliable**

#### 1. **No External Dependencies**
- **Before:** Depended on GitHub Classroom (could go down, change, or discontinue)
- **After:** 100% GitHub-native—uses only GitHub API and Actions
- **Impact:** Zero risk of third-party service disruption

#### 2. **Idempotent Design**
- **Provisioning is safe to re-run.** Running the workflow twice creates:
  - First run: "created" (student repo provisioned)
  - Second run: "already-exists" (no changes, no duplicates)
- **Impact:** No data loss, no accidental overwrites, safe manual retries

#### 3. **Least-Privilege Security**
- **GitHub App uses fine-grained permissions** (not personal tokens or org-wide keys)
- **Secrets stored in GitHub, never in code** (PEM key only in Actions secrets)
- **Credentials minted on-demand and never persisted**
- **Impact:** Compliance-ready, audit-trail via GitHub, easy key rotation

#### 4. **Deterministic Signals**
- Progress tracked by GitHub actions (issue closed, PR merged, label applied)
- No hidden state in external databases
- All history visible in GitHub commit/issue timeline
- **Impact:** Transparent, debuggable, recoverable from git history

#### 5. **Self-Healing**
- If a student is missed (network hiccup, bot failure), re-running provisions them
- If a repo is accidentally deleted, re-run the same workflow to recreate it
- Roster is the source of truth, provisioning log is the audit trail
- **Impact:** Administrator can fix issues without manual intervention

---

## What Stays the Same

✅ **Your Learning Room repository structure** — Same challenges, same workflow automation
✅ **Challenge progression system** — Challenges unlock in sequence as before
✅ **Gandalf bot feedback** — Still validates PRs and provides educational feedback
✅ **All course content** — Same 16 core + 5 bonus challenges, same podcasts and guides
✅ **Accessibility standards** — Keyboard-only and screen-reader compatible (unchanged)

---

## Removed & Replaced

| What Was | Reason | What's New |
|----------|--------|-----------|
| GitHub Classroom integration | Service going away, external dependency | GitHub App provisioning |
| `scripts/classroom/` | Classroom-specific utilities no longer needed | `scripts/provisioning/` |
| `admin/classroom/` | Classroom admin guides | `admin/HYBRID_DEPLOYMENT_GUIDE.md` |
| Classroom autograder safeguards | GitHub Classroom no longer used | Native GitHub Actions workflows |
| `classroom-enrollment.yml` issue template | Replaced by form-based enrollment | `start-here-roadmap.yml` |

---

## Dates & Availability

- **Documentation Updated:** June 2, 2026
- **Public Sites Deployed:** June 2, 2026
  - community-access.org/git-going-with-github
  - lp.csedesigns.com/ggg
- **Enrollment Form:** Ready now at community-access.org/github
- **GitHub App:** Configured and ready for production use

---

## For Questions or Issues

- **Student Support:** [Community Access Support Hub](https://github.com/Community-Access/support)
- **Facilitator Setup:** See [HYBRID_DEPLOYMENT_GUIDE.md](admin/HYBRID_DEPLOYMENT_GUIDE.md)
- **Technical Details:** [OWNED_PROVISIONING.md](admin/OWNED_PROVISIONING.md), [SPEC.md](admin/SPEC.md)
- **GitHub Repository:** [Community-Access/git-going-with-github](https://github.com/Community-Access/git-going-with-github)

---

## Thank You

This transition strengthens the workshop by removing external dependencies and making the system more transparent, auditable, and resilient. **Your learning experience remains our top priority.**

Welcome to the new Hybrid provisioning system.

---

*Last updated: June 2, 2026*
*Version: 1.0 (Hybrid Provisioning Release)*
