#!/usr/bin/env python3
"""Tests for check_accessibility.py's table-description detection.

Run with: python learning-room/.github/scripts/__tests__/test_check_accessibility.py
"""

import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from check_accessibility import check_accessibility  # noqa: E402


def write_temp_md(content):
    fd, path = tempfile.mkstemp(suffix='.md')
    with os.fdopen(fd, 'w', encoding='utf-8') as f:
        f.write(content)
    return path


class TableDescriptionDedupTests(unittest.TestCase):
    def test_single_table_produces_one_finding_regardless_of_row_count(self):
        rows = '\n'.join(f'| Row {i} | Value {i} |' for i in range(10))
        content = (
            'Some intro text.\n\n'
            '| Name | Value |\n'
            '|------|-------|\n'
            f'{rows}\n'
        )
        path = write_temp_md(content)
        try:
            issues = check_accessibility(path)
        finally:
            os.remove(path)
        table_findings = [i for i in issues if i.get('title') == 'Table Description']
        self.assertEqual(len(table_findings), 1)

    def test_two_tables_produce_two_findings(self):
        content = (
            'Intro.\n\n'
            '| A | B |\n'
            '|---|---|\n'
            '| 1 | 2 |\n\n'
            'Middle text.\n\n'
            '| C | D |\n'
            '|---|---|\n'
            '| 3 | 4 |\n'
        )
        path = write_temp_md(content)
        try:
            issues = check_accessibility(path)
        finally:
            os.remove(path)
        table_findings = [i for i in issues if i.get('title') == 'Table Description']
        self.assertEqual(len(table_findings), 2)

    def test_inline_pipe_outside_table_is_not_flagged(self):
        content = (
            'Use the command `a | b` to pipe output.\n\n'
            'Just a line with | in it but no real table.\n'
        )
        path = write_temp_md(content)
        try:
            issues = check_accessibility(path)
        finally:
            os.remove(path)
        table_findings = [i for i in issues if i.get('title') == 'Table Description']
        self.assertEqual(len(table_findings), 0)


if __name__ == '__main__':
    unittest.main()
