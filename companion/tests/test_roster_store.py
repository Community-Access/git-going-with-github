import json
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from roster_store import (  # noqa: E402
    Roster,
    RosterError,
    is_valid_handle,
    learner_key,
    normalize_handle,
)


class RosterStoreTests(unittest.TestCase):
    def test_parse_empty_returns_empty_roster(self):
        self.assertEqual(Roster.parse("").learners, [])
        self.assertEqual(Roster.parse(None).learners, [])

    def test_parse_rejects_bad_version(self):
        with self.assertRaises(RosterError):
            Roster.parse(json.dumps({"version": 2, "learners": []}))

    def test_parse_rejects_duplicate_keys(self):
        data = {
            "version": 1,
            "learners": [
                {"github_handle": "alice", "cohort_id": "c1", "path": "day1-day2",
                 "provision_state": "pending", "status": "awaiting-ack"},
                {"github_handle": "Alice", "cohort_id": "c1", "path": "day1-day2",
                 "provision_state": "pending", "status": "awaiting-ack"},
            ],
        }
        with self.assertRaises(RosterError):
            Roster.parse(json.dumps(data))

    def test_is_valid_handle(self):
        self.assertTrue(is_valid_handle("octo-cat"))
        self.assertTrue(is_valid_handle("@octocat"))
        self.assertFalse(is_valid_handle("-bad"))
        self.assertFalse(is_valid_handle("bad-"))
        self.assertFalse(is_valid_handle("two--hyphens"))
        self.assertFalse(is_valid_handle(""))

    def test_normalize_and_key(self):
        self.assertEqual(normalize_handle("@OctoCat"), "octocat")
        self.assertEqual(learner_key("Alice", "c1"), learner_key("alice", "c1"))

    def test_upsert_insert_then_update(self):
        roster = Roster.empty()
        roster.upsert({"github_handle": "alice", "cohort_id": "c1"})
        self.assertEqual(len(roster.learners), 1)
        self.assertEqual(roster.learners[0]["provision_state"], "pending")
        roster.upsert({"github_handle": "alice", "cohort_id": "c1", "provision_state": "provisioned"})
        self.assertEqual(len(roster.learners), 1)
        self.assertEqual(roster.learners[0]["provision_state"], "provisioned")

    def test_upsert_rejects_invalid_handle(self):
        with self.assertRaises(RosterError):
            Roster.empty().upsert({"github_handle": "-bad", "cohort_id": "c1"})

    def test_to_json_sorts_and_stamps(self):
        roster = Roster.empty()
        roster.upsert({"github_handle": "zed", "cohort_id": "c1"})
        roster.upsert({"github_handle": "amy", "cohort_id": "c1"})
        out = json.loads(roster.to_json())
        self.assertEqual(out["learners"][0]["github_handle"], "amy")
        self.assertTrue(out["generated_at"].endswith("Z"))

    def test_public_view_omits_notes(self):
        roster = Roster.empty()
        roster.upsert({"github_handle": "a", "cohort_id": "c", "notes": "secret"})
        view = roster.public_view()
        self.assertNotIn("notes", view["learners"][0])

    def test_roundtrip_with_example_shape(self):
        roster = Roster.empty()
        roster.upsert({"github_handle": "ada", "cohort_id": "c1", "path": "day2-only"})
        text = roster.to_json()
        reparsed = Roster.parse(text)
        self.assertEqual(reparsed.learners[0]["github_handle"], "ada")
        self.assertEqual(reparsed.learners[0]["path"], "day2-only")


if __name__ == "__main__":
    unittest.main()
