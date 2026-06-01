import json
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app  # noqa: E402


class CompanionAppTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.roster_path = os.path.join(self.tmp.name, "roster.json")
        self.app = create_app(
            {
                "TESTING": True,
                "SECRET_KEY": "test-secret",
                "ROSTER_PATH": self.roster_path,
                "FACILITATOR_TOKEN": "letmein",
                "SESSION_COOKIE_SECURE": False,
                "RATE_LIMIT_MAX": 100,
            }
        )
        self.client = self.app.test_client()

    def tearDown(self):
        self.tmp.cleanup()

    def _csrf(self, path):
        resp = self.client.get(path)
        html = resp.get_data(as_text=True)
        marker = 'name="csrf_token" value="'
        start = html.index(marker) + len(marker)
        end = html.index('"', start)
        return html[start:end]

    def test_index_redirects_to_register(self):
        resp = self.client.get("/")
        self.assertEqual(resp.status_code, 302)
        self.assertIn("/register", resp.headers["Location"])

    def test_healthz(self):
        resp = self.client.get("/healthz")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.get_json()["status"], "ok")

    def test_register_page_is_accessible_shell(self):
        resp = self.client.get("/register")
        html = resp.get_data(as_text=True)
        self.assertIn('lang="en"', html)
        self.assertIn("Skip to main content", html)
        self.assertIn('<label for="github_handle"', html)

    def test_security_headers_present(self):
        resp = self.client.get("/register")
        self.assertEqual(resp.headers["X-Content-Type-Options"], "nosniff")
        self.assertEqual(resp.headers["X-Frame-Options"], "DENY")
        self.assertIn("default-src 'self'", resp.headers["Content-Security-Policy"])

    def test_register_rejects_missing_csrf(self):
        resp = self.client.post("/register", data={"github_handle": "octocat", "cohort_id": "c1", "path": "day1-day2"})
        self.assertEqual(resp.status_code, 400)

    def test_register_valid_writes_roster(self):
        token = self._csrf("/register")
        resp = self.client.post(
            "/register",
            data={"csrf_token": token, "github_handle": "octocat", "cohort_id": "spring", "path": "day1-day2"},
            follow_redirects=False,
        )
        self.assertEqual(resp.status_code, 302)
        self.assertIn("/register/success", resp.headers["Location"])
        with open(self.roster_path, encoding="utf-8") as handle:
            roster = json.load(handle)
        self.assertEqual(roster["learners"][0]["github_handle"], "octocat")
        self.assertEqual(roster["learners"][0]["provision_state"], "pending")

    def test_register_invalid_handle_shows_error(self):
        token = self._csrf("/register")
        resp = self.client.post(
            "/register",
            data={"csrf_token": token, "github_handle": "-bad", "cohort_id": "c1", "path": "day1-day2"},
        )
        self.assertEqual(resp.status_code, 200)
        self.assertIn("There is a problem", resp.get_data(as_text=True))
        self.assertFalse(os.path.exists(self.roster_path))

    def test_register_strips_leading_at(self):
        token = self._csrf("/register")
        self.client.post(
            "/register",
            data={"csrf_token": token, "github_handle": "@octocat", "cohort_id": "c1", "path": "day1-day2"},
        )
        with open(self.roster_path, encoding="utf-8") as handle:
            roster = json.load(handle)
        self.assertEqual(roster["learners"][0]["github_handle"], "octocat")

    def test_dashboard_requires_login(self):
        resp = self.client.get("/dashboard")
        self.assertEqual(resp.status_code, 302)
        self.assertIn("/login", resp.headers["Location"])

    def test_login_with_token_grants_dashboard(self):
        token = self._csrf("/login")
        resp = self.client.post("/login", data={"csrf_token": token, "token": "letmein"})
        self.assertEqual(resp.status_code, 302)
        dash = self.client.get("/dashboard")
        self.assertEqual(dash.status_code, 200)
        self.assertIn("Cohort dashboard", dash.get_data(as_text=True))

    def test_login_with_bad_token_denied(self):
        token = self._csrf("/login")
        resp = self.client.post("/login", data={"csrf_token": token, "token": "wrong"})
        self.assertEqual(resp.status_code, 200)
        self.assertIn("was not recognized", resp.get_data(as_text=True))

    def test_dashboard_renders_roster(self):
        # Seed a learner via registration.
        token = self._csrf("/register")
        self.client.post(
            "/register",
            data={"csrf_token": token, "github_handle": "ada", "cohort_id": "spring", "path": "day1-day2"},
        )
        ltoken = self._csrf("/login")
        self.client.post("/login", data={"csrf_token": ltoken, "token": "letmein"})
        resp = self.client.get("/dashboard")
        html = resp.get_data(as_text=True)
        self.assertIn("ada", html)
        self.assertIn("<table", html)
        self.assertIn("<caption", html)

    def test_roster_json_requires_login_and_redacts(self):
        self.assertEqual(self.client.get("/roster.json").status_code, 302)
        token = self._csrf("/register")
        self.client.post(
            "/register",
            data={"csrf_token": token, "github_handle": "ada", "cohort_id": "spring", "path": "day1-day2", "notes": "x"},
        )
        ltoken = self._csrf("/login")
        self.client.post("/login", data={"csrf_token": ltoken, "token": "letmein"})
        data = self.client.get("/roster.json").get_json()
        self.assertNotIn("notes", data["learners"][0])

    def test_rate_limit_blocks_floods(self):
        app = create_app(
            {
                "TESTING": True,
                "SECRET_KEY": "k",
                "ROSTER_PATH": self.roster_path,
                "FACILITATOR_TOKEN": "letmein",
                "SESSION_COOKIE_SECURE": False,
                "RATE_LIMIT_MAX": 2,
                "RATE_LIMIT_WINDOW": 300,
            }
        )
        client = app.test_client()

        def csrf():
            html = client.get("/register").get_data(as_text=True)
            marker = 'name="csrf_token" value="'
            start = html.index(marker) + len(marker)
            return html[start:html.index('"', start)]

        statuses = []
        for i in range(4):
            statuses.append(
                client.post(
                    "/register",
                    data={"csrf_token": csrf(), "github_handle": f"user{i}", "cohort_id": "c", "path": "day1-day2"},
                ).status_code
            )
        self.assertIn(429, statuses)

    def test_logout_clears_session(self):
        token = self._csrf("/login")
        self.client.post("/login", data={"csrf_token": token, "token": "letmein"})
        ltoken = self._csrf("/dashboard")
        self.client.post("/logout", data={"csrf_token": ltoken})
        self.assertEqual(self.client.get("/dashboard").status_code, 302)


if __name__ == "__main__":
    unittest.main()
