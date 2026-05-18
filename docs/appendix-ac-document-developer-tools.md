# Appendix AC: Document & Developer Tool Agents

> **Reference companion to:** [Chapter 19: Accessibility Agents](19-accessibility-agents.md) | [Appendix L: Agents Reference](appendix-l-agents-reference.md) | [Appendix AB: Advanced Patterns](appendix-ab-advanced-agent-patterns.md)
>
> **Authoritative source:** [Accessibility Agents Repository - Document Team](https://github.com/Community-Access/accessibility-agents/tree/main/agents/document-accessibility) | [Developer Tools Team](https://github.com/Community-Access/accessibility-agents/tree/main/agents/developer-tools)

## Specialized Agents for Office Documents, PDFs, and Developer Tools

> This appendix covers the 15 agents dedicated to document accessibility (Word, Excel, PowerPoint, PDF, EPUB) and developer tools (Python, wxPython, NVDA, CI/CD). Learn how to audit and remediate documents, build accessible applications, and integrate accessibility into development workflows.

## Table of Contents

1. [Document Accessibility Team (15 Agents)](#1-document-accessibility-team-15-agents)
2. [Microsoft Office Accessibility](#2-microsoft-office-accessibility)
3. [PDF & EPUB Accessibility](#3-pdf--epub-accessibility)
4. [Developer Tools Team (8 Agents)](#4-developer-tools-team-8-agents)
5. [Python & wxPython Accessibility](#5-python--wxpython-accessibility)
6. [Desktop & NVDA Development](#6-desktop--nvda-development)
7. [CI/CD Integration for Accessibility](#7-cicd-integration-for-accessibility)

## 1. Document Accessibility Team (15 Agents)

### Document Agents Overview

The Document Accessibility Team provides specialized agents for scanning, remediating, and enforcing accessibility standards in business documents.

| Agent | Purpose | Input | Output |
|-------|---------|-------|--------|
| `@word-accessibility` | Audit Microsoft Word documents | .docx file | Findings (headings, alt text, hyperlinks) |
| `@excel-accessibility` | Audit Excel spreadsheets | .xlsx file | Findings (table headers, merged cells, formulas) |
| `@powerpoint-accessibility` | Audit PowerPoint presentations | .pptx file | Findings (slide structure, alt text, animations) |
| `@pdf-accessibility` | Audit tagged PDF documents | .pdf file | Findings (PDF/UA compliance, tagging) |
| `@epub-accessibility` | Audit EPUB digital publications | .epub file | Findings (structure, reading order) |
| `@office-scan-config` | Configure Office scanning rules | JSON config | Updated scan profile |
| `@office-remediator` | Fix Word/Excel/PowerPoint issues | .docx/.xlsx/.pptx | Remediated document with changelog |
| `@pdf-remediator` | Fix PDF accessibility issues | .pdf file | Remediated PDF with tags and bookmarks |
| `@pdf-scan-config` | Configure PDF scanning rules | JSON config | Updated scan profile |
| `@epub-scan-config` | Configure EPUB scanning rules | JSON config | Updated scan profile |
| `@document-accessibility-wizard` | Guided audit for any document type | File upload | Severity report + fix checklist |
| `@cross-document-analyzer` | Compare accessibility across document versions | Multiple files | Trend report + improvement suggestions |
| `@document-inventory` | List all documents in a folder | Folder path | Document manifest with audit status |
| `@document-csv-reporter` | Export document findings to CSV | Audit JSON | CSV report with WCAG mappings |
| `@document-remediation-coach` | Guide users through remediation steps | Document + findings | Step-by-step fix instructions |

## 2. Microsoft Office Accessibility

### Word Document Accessibility

**Common issues in Word documents:**

| Issue | Cause | Fix |
|-------|-------|-----|
| No document title/heading | Missing Heading 1 style | Apply Heading 1 to title; set document properties |
| Broken heading hierarchy | Mixed heading levels (e.g., H1 → H3 → H2) | Restructure to H1, H2, H3... in order |
| Untagged images | No alt text provided | Select image → right-click → Edit Alt Text |
| Hyperlinks "Click here" | Non-descriptive link text | Edit link text to describe destination |
| Merged table cells | Layout cells merged without description | Use rows/columns instead; add scope attributes |
| Color-only formatting | Information conveyed by color alone | Add text label or icon in addition to color |
| Missing language tag | Screen readers don't know language | File → Options → Language |

**Using `@word-accessibility`:**

```
User: @word-accessibility audit my-report.docx

Agent response:
1. Scans document structure
2. Checks heading hierarchy
3. Validates image alt text
4. Checks table tagging
5. Reports:
   - 3 errors: Broken heading hierarchy, 5 images without alt text
   - 2 warnings: Merge cells in table, unclear hyperlinks
   - Severity: 72/100 (C grade)
```

**Using `@office-remediator`:**

```
User: @office-remediator fix-word my-report.docx

Agent response:
1. Auto-fixes:
   - Restructures heading hierarchy
   - Removes merged cells (converts to simple rows)
   - Adds placeholder alt text for images (reviewer must replace)
2. Creates changelog:
   - "Fixed: Heading hierarchy (H1, H2, H3)"
   - "Added: Alt text placeholders (5 images)"
3. Returns: my-report-remediated.docx
```

### Excel Spreadsheet Accessibility

**Common issues in Excel:**

| Issue | Cause | Fix |
|-------|-------|-----|
| No header row designated | First row not marked as table header | Format as Table → options → Table Header Row |
| Merged cells in table | Data layout split across merged areas | Unmerge cells; use sub-headers instead |
| Hidden columns/rows | Columns/rows hidden for layout reasons | Unhide all; use filters instead |
| Color-only data | Information by color (e.g., red = error) | Add conditional formatting with icons/symbols |
| Complex formulas without explanation | Formula logic unclear to screen readers | Add named ranges; document in separate column |
| Multiple tables on one sheet | Screens readers confused about scope | Separate into different sheets; use clear headers |

**Using `@excel-accessibility`:**

```
User: @excel-accessibility audit sales-data.xlsx

Agent response:
1. Analyzes all sheets
2. Checks:
   - Header rows designated
   - Merged cells
   - Named ranges
   - Color usage
3. Reports per sheet:
   - Sheet 1 (Sales): 4 errors (merged cells, no headers)
   - Sheet 2 (Summary): 2 warnings (complex formulas)
   - Severity: 65/100 (D grade)
```

**Using `@office-remediator`:**

```
User: @office-remediator fix-excel sales-data.xlsx

Agent response:
1. Auto-fixes:
   - Unmerges cells in tables
   - Designates header rows
   - Adds conditional formatting with symbols
2. Returns: sales-data-remediated.xlsx
3. Summary: 18 issues fixed, 2 manual reviews needed (complex formulas)
```

### PowerPoint Presentation Accessibility

**Common issues in PowerPoint:**

| Issue | Cause | Fix |
|-------|-------|-----|
| No slide titles | Slides added without titles | Add title to slide layout; use meaningful titles |
| Animations too fast | Transitions and animations not timed | Set animation duration ≥ 3 seconds |
| Missing alt text on images | Images not described for screen readers | Select image → Design → Alt Text |
| Text on image | Important text placed on background image | Move text to text box; increase contrast |
| Poor color contrast | Text hard to read on background | Adjust background; use high-contrast colors |
| Sound without caption | Audio plays without transcript | Add speaker notes; create slide transcript |
| Slide number in content | Slide number in body confuses narration | Use header/footer for slide numbers only |

**Using `@powerpoint-accessibility`:**

```
User: @powerpoint-accessibility audit presentation.pptx

Agent response:
1. Scans all slides
2. Checks:
   - Slide titles present
   - Alt text on images
   - Text contrast ratios
   - Animation speeds
   - Speaker notes
3. Reports:
   - Errors: 12 images without alt text, 3 low-contrast slides
   - Warnings: 5 animations < 2 seconds
   - Severity: 58/100 (D grade)
```

**Using `@office-remediator`:**

```
User: @office-remediator fix-powerpoint presentation.pptx --add-speaker-notes

Agent response:
1. Auto-fixes:
   - Adds placeholder alt text to all images
   - Fixes animation timing (≥ 3 seconds)
   - Adjusts contrast on 3 slides
2. Creates speaker notes:
   - One set of notes per slide (reviewer fills in detail)
3. Returns: presentation-remediated.pptx
```

## 3. PDF & EPUB Accessibility

### PDF Accessibility (PDF/UA Standard)

PDF/UA (Universal Accessibility) is the ISO standard for accessible PDFs.

**PDF accessibility requirements:**

| Requirement | What It Means | How to Fix |
|------------|--------------|-----------|
| Tagged structure | PDF has logical tag tree (headings, paragraphs, tables) | Use tagged PDF template; add tags in Adobe Acrobat |
| Meaningful alt text | Images described for screen readers | Select image → Properties → Description |
| Bookmarks | Navigation outline for jumping to sections | Create bookmarks matching document headings |
| Reading order | Content order matches visual layout | Reorder tags in tag tree if needed |
| Proper language | Document language identified | File → Properties → Language |
| Accessible forms | Form fields have descriptive labels | Select field → Properties → Name/Description |
| No scanned images alone | Document is text-searchable | OCR the PDF; check searchability |

**Using `@pdf-accessibility`:**

```
User: @pdf-accessibility audit report.pdf

Agent response:
1. Analyzes document structure
2. Validates PDF/UA compliance
3. Reports:
   - Structure: Missing alt text on 5 images
   - Navigation: No bookmarks created
   - Content: Language not set (assumed English)
   - Forms: 3 form fields without labels
   - Severity: 48/100 (F grade)
```

**Using `@pdf-remediator`:**

```
User: @pdf-remediator fix-pdf report.pdf --ocr --add-bookmarks

Agent response:
1. Auto-fixes:
   - OCR scans images for text (if present)
   - Creates bookmarks from heading structure
   - Adds placeholder alt text
2. Creates remediation summary:
   - 5 images need alt text (manual review)
   - Form labels added to 3 fields
3. Returns: report-remediated.pdf
```

### EPUB Accessibility

EPUB files are digital publications (e-books, online articles). Accessibility requirements overlap with HTML.

**EPUB accessibility checklist:**

- Table of contents matches document structure
- Heading hierarchy follows H1, H2, H3... order
- Images have alt text
- Links have meaningful text
- Tables have headers and scope
- Reading order is logical (not requiring manual navigation)

**Using `@epub-accessibility`:**

```
User: @epub-accessibility audit ebook.epub

Agent response:
1. Extracts and scans EPUB structure
2. Checks:
   - Table of contents mapping
   - Heading hierarchy
   - Image alt text
   - Link text quality
   - Reading order
3. Reports: 8 issues found (similar to HTML audit)
```

## 4. Developer Tools Team (8 Agents)

### Developer Tools Agents Overview

The Developer Tools Team supports accessible application development across Python, wxPython, CI/CD pipelines, and desktop environments.

| Agent | Purpose | When to Use |
|-------|---------|-----------|
| `@python-specialist` | Python accessibility patterns and best practices | Building accessible Python CLI tools and libraries |
| `@wxpython-specialist` | wxPython GUI accessibility (Windows, Mac, Linux) | Building desktop applications with wxPython |
| `@ci-accessibility` | CI/CD pipeline accessibility integration | Adding accessibility checks to GitHub Actions, Jenkins, etc. |
| `@playwright-scanner` | Automated browser testing with Playwright | Testing interactive web pages for accessibility |
| `@playwright-verifier` | Verify Playwright test coverage | Ensuring accessibility tests have complete coverage |
| `@screen-reader-lab` | Screen reader testing setup and guidance | Manual NVDA, JAWS, VoiceOver testing |
| `@nvda-addon-developer` | Develop NVDA accessibility add-ons | Building extensions for NVDA screen reader |
| `@desktop-a11y-specialist` | Desktop accessibility (Windows, Mac, Linux UIA) | Native desktop app accessibility |

## 5. Python & wxPython Accessibility

### Python Accessibility Best Practices

**Common patterns in accessible Python code:**

| Pattern | Example | Why It Matters |
|---------|---------|---------------|
| **Clear function names** | `check_alt_text()` not `chk_at()` | Screen readers announce the full name |
| **Docstrings for all functions** | Include purpose, args, returns | Documentation tools (and assistants) understand intent |
| **Type hints** | `def scan(url: str) -> Dict[str, Any]:` | Type checkers catch errors early |
| **Logging, not silent failures** | `logger.error("Alt text missing")` | Debuggable by all users |
| **Accessible CLI help** | `--help` output clearly structured | Keyboard and screen reader users can find options |

**Using `@python-specialist`:**

```
User: @python-specialist review my accessibility scanning script

Agent response:
1. Analyzes code for:
   - Clear naming conventions
   - Comprehensive docstrings
   - Type hints present
   - Error handling clear
   - Logging patterns
2. Suggests improvements:
   - Add docstrings to 3 functions
   - Type hint 5 parameters
   - Restructure exception handling
   - Add logging at key checkpoints
```

### wxPython GUI Accessibility

wxPython is a cross-platform GUI toolkit. Accessibility requires following platform conventions.

**wxPython accessibility checklist:**

| Element | Requirement | Implementation |
|---------|-------------|----------------|
| **Windows** | Use Microsoft UI Automation (UIA) | wxPython provides UIA support via wx.adv |
| **Labels** | All controls labeled | Use `SetLabel()` or associate with `wx.StaticText` |
| **Tab order** | Logical keyboard navigation | Use `wx.Window.MoveBeforeInTabOrder()` |
| **Focus indicators** | Visible focus outline | Platform default usually sufficient |
| **Keyboard shortcuts** | Alt+key for menus | Use `&` in menu labels: `"&File"` |
| **Dialogs** | Modal dialogs announce role | `wx.Dialog` automatically marks as modal |

**Using `@wxpython-specialist`:**

```
User: @wxpython-specialist audit my-app.py

Agent response:
1. Analyzes wxPython code:
   - Control labeling
   - Tab order
   - Keyboard support
   - Dialog structure
2. Reports:
   - 2 controls missing labels
   - Tab order needs sorting (currently 5, 3, 1, 2, 4)
   - Missing keyboard shortcuts on File menu
3. Provides template code for fixes
```

**wxPython Accessible Control Example:**

```python
import wx

class AccessibleFrame(wx.Frame):
    def __init__(self):
        super().__init__(None, title="Accessible App")
        
        panel = wx.Panel(self)
        
        # Labeled text input
        label = wx.StaticText(panel, label="Name:")
        text_ctrl = wx.TextCtrl(panel)
        text_ctrl.SetName("Name input field")
        
        # Accessible button with shortcut
        button = wx.Button(panel, label="&Submit")  # Alt+S shortcut
        button.SetName("Submit button")
        
        # Sizer for layout
        sizer = wx.BoxSizer(wx.VERTICAL)
        sizer.Add(label)
        sizer.Add(text_ctrl)
        sizer.Add(button)
        panel.SetSizer(sizer)
```

## 6. Desktop & NVDA Development

### Desktop Application Accessibility

Desktop applications must follow OS conventions:

**Windows (Microsoft UI Automation):**

- All controls must expose their role (button, text, etc.)
- Labels and descriptions required
- Keyboard navigation essential
- Focus must be visible

**macOS (NSAccessibility):**

- Controls expose accessibility attributes
- VoiceOver announces all changes
- Keyboard support required
- Role and subrole must be set

**Linux (AT-SPI2):**

- DBus-based accessibility API
- Screen reader (Orca) discovers objects
- Action model (click, focus, etc.)
- State reporting (enabled, pressed, etc.)

**Using `@desktop-a11y-specialist`:**

```
User: @desktop-a11y-specialist test my-app --platform windows

Agent response:
1. Checks Windows accessibility:
   - UIA object properties
   - Keyboard navigation
   - Focus indicators
   - Screen reader compatibility (NVDA)
2. Runs NVDA simulation:
   - Lists all controls as NVDA sees them
   - Checks announced names and roles
3. Reports:
   - Button not announcing name ("win1234" instead of "Save")
   - Tab order incorrect
   - Status bar text not announced
```

### NVDA Add-on Development

NVDA (free, open-source screen reader) supports add-ons for extended functionality.

**NVDA add-on structure:**

```
my-addon/
├── addon/
│   ├── globalPlugins/
│   │   └── myPlugin.py         # Main plugin code
│   ├── brailleDisplayDrivers/  # Optional: Braille driver
│   ├── synthDrivers/           # Optional: Speech driver
│   └── appModules/             # Optional: App-specific code
├── buildVars.py                # Version, author, description
├── manifest.ini                # Add-on metadata
└── readme.md                   # Documentation
```

**Using `@nvda-addon-developer`:**

```
User: @nvda-addon-developer create an add-on that improves announcement of custom web components

Agent response:
1. Scaffolds project structure
2. Creates sample globalPlugin
3. Provides template for:
   - Event handling (focus, name change)
   - Custom announcements
   - Keyboard shortcuts
4. Includes testing guidance with NVDA emulator
```

**Example NVDA Add-on Snippet:**

```python
# my-addon/addon/globalPlugins/myPlugin.py
import globalPluginHandler
import api
from ui import message

class GlobalPlugin(globalPluginHandler.GlobalPlugin):
    def event_gainFocus(self, obj, nextHandler):
        # Announce when custom component gets focus
        if hasattr(obj, "customRole"):
            message(f"Custom {obj.customRole}: {obj.name}")
        nextHandler()
```

## 7. CI/CD Integration for Accessibility

### Accessibility in GitHub Actions

Add accessibility checks to your CI/CD pipeline:

**Example: Lighthouse Accessibility Check**

```yaml
# .github/workflows/accessibility.yml
name: Accessibility Check

on: [push, pull_request]

jobs:
  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      
      # Run Lighthouse audit
      - uses: actions/upload-artifact@v3
        with:
          name: lighthouse-report
          path: lighthouse-results.json
      
      # Post results as PR comment
      - name: Comment PR with results
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const results = JSON.parse(fs.readFileSync('lighthouse-results.json'));
            const a11yScore = results.categories.accessibility.score * 100;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## Accessibility Score: ${a11yScore}/100`
            });
```

**Using `@ci-accessibility`:**

```
User: @ci-accessibility add-workflow my-repo

Agent response:
1. Analyzes current CI/CD setup
2. Creates workflow file:
   - Lighthouse audit on each PR
   - Fails if score drops below threshold
   - Posts results to PR comments
3. Configures thresholds:
   - Error: < 70 (blocks merge)
   - Warning: 70-79 (notify but allow)
   - Success: ≥ 80 (approve)
```

### Playwright Accessibility Testing

**Example: Keyboard Navigation Test**

```typescript
// tests/keyboard.spec.ts
import { test, expect } from '@playwright/test';

test('form accessible by keyboard only', async ({ page }) => {
  await page.goto('https://example.com/form');
  
  // Tab through form without mouse
  await page.keyboard.press('Tab');
  expect(await page.locator('#name').evaluate(el => el === document.activeElement)).toBeTruthy();
  
  // Type in focused field
  await page.keyboard.type('Jane Doe');
  await page.keyboard.press('Tab');
  
  // Verify focus moved to email field
  expect(await page.locator('#email').evaluate(el => el === document.activeElement)).toBeTruthy();
  
  // Submit via keyboard
  await page.keyboard.press('Tab');  // Navigate to Submit
  await page.keyboard.press('Enter'); // Submit
  
  // Verify submission
  expect(page).toHaveURL('/success');
});
```

**Using `@playwright-scanner`:**

```
User: @playwright-scanner run tests/keyboard.spec.ts

Agent response:
1. Runs Playwright tests
2. Records accessibility state at each step
3. Compares to baseline
4. Reports:
   - Tests passed: 5/5
   - New regressions: 0
   - Performance: 120ms average per step
```

## Learning Cards: Document & Developer Tools

<details>
<summary>Screen reader users</summary>

- Document agents are organized by file type (Word, Excel, PDF, EPUB); use headings to jump to your document type
- Each agent has a clear purpose in the table at the beginning; read the "Purpose" column to find the agent you need
- Code examples (Python, wxPython) are presented in clearly marked code blocks; copy the example that matches your use case
- Troubleshooting steps for each document type are presented in numbered lists; follow them in order

</details>

<details>
<summary>Low vision users</summary>

- The agent overview table can be magnified independently; zoom in on the "Agent", "Purpose", and "When to Use" columns
- Code examples use consistent indentation; magnify the entire code block for clarity
- Document type sections (Word, Excel, PDF, EPUB) are clearly marked with headings; navigate to your section
- Issue/fix tables use high-contrast formatting; the "Issue" column describes the problem, "Fix" describes the solution

</details>

<details>
<summary>Sighted users</summary>

- Skim the Document Agents Overview table to find the agent you need
- For document issues, find your document type heading (Word, Excel, PDF, EPUB) and read the "Common issues" table
- For development, navigate to the Developer Tools section and find your technology (Python, wxPython, CI/CD)
- Code examples are clearly marked and can be copied directly into your project

</details>

### References

- [Document Accessibility Best Practices](https://www.w3.org/TR/WCAG21/)
- [PDF/UA Standard](https://taggedpdf.com/pdfua-the-iso-standard/)
- [EPUB Accessibility](https://www.w3.org/publishing/epub/)
- [wxPython Documentation](https://docs.wxpython.org/)
- [NVDA Add-on Developer Guide](https://www.nvaccess.org/document/220/addonDevelopersGuide.html)
- [Playwright Accessibility Testing](https://playwright.dev/)
- [Microsoft UI Automation](https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-intro)

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)
- [GitHub Copilot docs](https://docs.github.com/en/copilot)
- [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support)
- [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [About auto model selection](https://docs.github.com/en/copilot/concepts/auto-model-selection)
- [Copilot changelog feed](https://github.blog/changelog/label/copilot/)
- [VS Code Copilot chat overview](https://code.visualstudio.com/docs/copilot/chat/copilot-chat)
- [VS Code agent overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Specialized Agents for Office Documents, PDFs, and Developer Tools:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **1. Document Accessibility Team (15 Agents):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **2. Microsoft Office Accessibility:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **3. PDF & EPUB Accessibility:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **4. Developer Tools Team (8 Agents):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **5. Python & wxPython Accessibility:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **6. Desktop & NVDA Development:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **7. CI/CD Integration for Accessibility:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Learning Cards: Document & Developer Tools:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
