# Registration Automation Quickstart (Facilitator)

Use this when you need to enable registration plus classroom API automation quickly.

For full background and troubleshooting, use [REGISTRATION-ADMIN.md](REGISTRATION-ADMIN.md).

## 5-Minute Setup

1. Create an admin token from a facilitator account with organization invitation permissions.
2. In repository settings, add secret:
   - `CLASSROOM_ORG_ADMIN_TOKEN`
3. In repository settings, add variables:
   - `CLASSROOM_ORG`
   - `CLASSROOM_DAY1_ASSIGNMENT_URL`
   - `CLASSROOM_DAY2_ASSIGNMENT_URL`
4. Save all values.
5. Submit one test registration issue from a non-member test account.

## Copy/Paste Settings Template

Use this checklist while entering repository settings values.

### Repository Secret

| Name | Value to paste |
|---|---|
| CLASSROOM_ORG_ADMIN_TOKEN | PASTE_ADMIN_TOKEN_HERE |

### Repository Variables

| Name | Value to paste |
|---|---|
| CLASSROOM_ORG | Community-Access-Classroom |
| CLASSROOM_DAY1_ASSIGNMENT_URL | https://classroom.github.com/a/REPLACE_DAY1_ID |
| CLASSROOM_DAY2_ASSIGNMENT_URL | https://classroom.github.com/a/REPLACE_DAY2_ID |

### Before You Save

- Confirm there are no extra spaces before or after values.
- Confirm both assignment URLs open correctly in a logged-in browser.
- Confirm the org name matches exactly, including capitalization.

## Expected Result (Happy Path)

After the test issue is opened and capacity is available:

1. Registration confirmation comment is posted.
2. Organization invite is sent (or detected as already pending/member).
3. Day 1 and Day 2 assignment links appear in the confirmation comment.
4. `registration` label is applied.

## Fast Verification Checklist

- [ ] Test user received or already had organization invite
- [ ] Confirmation comment includes assignment links
- [ ] Duplicate submission closes automatically with duplicate message
- [ ] Waitlist behavior still works when capacity is full

## Rollback (Immediate)

If anything behaves unexpectedly, disable classroom API automation without stopping registration:

1. Remove repository secret `CLASSROOM_ORG_ADMIN_TOKEN`, or
2. Clear repository variable `CLASSROOM_ORG`

The registration workflow will continue standard confirmation, capacity checks, and CSV export.

## Day-Of Operations

1. Keep [REGISTRATION-ADMIN.md](REGISTRATION-ADMIN.md) open.
2. Watch Actions runs for `registration.yml` after each new registration.
3. Spot-check one confirmation comment every few runs.
4. If failures appear, use rollback and continue manual classroom invite flow.

## Privacy Reminder

- Registration issues are public in this repository.
- CSV export includes names and email addresses and is stored as a workflow artifact.
- `student-roster.json` sync stores non-PII operational data only.