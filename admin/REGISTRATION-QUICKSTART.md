# Registration Automation Quickstart (Facilitator)

Use this when you need to enable registration with assignment-link automation quickly.

For full background and troubleshooting, use [REGISTRATION-ADMIN.md](REGISTRATION-ADMIN.md).

## 5-Minute Setup

1. In repository settings, add variables:
   - `CLASSROOM_DAY1_ASSIGNMENT_URL`
   - `CLASSROOM_DAY2_ASSIGNMENT_URL`
2. Save all values.
3. Submit one test registration issue from a test account.

## Copy/Paste Settings Template

Use this checklist while entering repository settings values.

### Repository Variables

| Name | Value to paste |
|---|---|
| CLASSROOM_DAY1_ASSIGNMENT_URL | https://classroom.github.com/a/REPLACE_DAY1_ID |
| CLASSROOM_DAY2_ASSIGNMENT_URL | https://classroom.github.com/a/REPLACE_DAY2_ID |

### Before You Save

- Confirm there are no extra spaces before or after values.
- Confirm both assignment URLs open correctly in a logged-in browser.

## Expected Result (Happy Path)

After the test issue is opened and capacity is available:

1. Registration confirmation comment is posted.
2. Day 1 and Day 2 assignment links appear in the confirmation comment.
3. `registration` label is applied.

## Fast Verification Checklist

- [ ] Confirmation comment includes assignment links
- [ ] Duplicate submission closes automatically with duplicate message
- [ ] Waitlist behavior still works when capacity is full
- [ ] Student can reply `ack`, then `day1-complete`, and receive Day 2 release comment

## Rollback (Immediate)

If anything behaves unexpectedly, disable assignment-link posting without stopping registration:

1. Clear `CLASSROOM_DAY1_ASSIGNMENT_URL`, or
2. Clear `CLASSROOM_DAY2_ASSIGNMENT_URL`

The registration workflow will continue standard confirmation, capacity checks, and CSV export.

## Full Support Reset (When Needed)

If support environment drift is detected, rebuild support hub baseline:

```powershell
scripts/classroom/Reset-SupportHubEnvironment.ps1
```

## Day-Of Operations

1. Keep [REGISTRATION-ADMIN.md](REGISTRATION-ADMIN.md) open.
2. Watch Actions runs for `registration.yml` after each new registration.
3. Spot-check one confirmation comment every few runs.
4. If failures appear, use rollback and continue manual assignment link sharing.

## Privacy Reminder

- Registration issues are public in this repository.
- CSV export includes names and email addresses and is stored as a workflow artifact.
- `student-roster.json` sync stores non-PII operational data only.