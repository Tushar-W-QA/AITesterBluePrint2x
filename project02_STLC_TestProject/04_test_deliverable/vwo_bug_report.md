# Bug Report: VWO Login Failure

**Role:** QA Engineer  
**Date:** March 24, 2026

---

Title: Login failed with error message "Your email, password, IP address or location did not match"

Environment: https://app.vwo.com/#/login (Browser: [UNKNOWN], OS: [UNKNOWN])

Severity: High (Prevents user from accessing the dashboard)

Steps to Reproduce:
1. Navigate to the VWO login page: https://app.vwo.com/#/login
2. Enter Email ID [UNKNOWN]
3. Enter Password [UNKNOWN]
4. Click the 'Sign in' button

Expected Result: [UNKNOWN] (Requirements suggest successful authentication for valid credentials; however, the exact expected behavior for this specific failure scenario is not documented in the provided PRD snippets).

Actual Result: An orange alert box appears with the text: "Your email, password, IP address or location did not match". The user is not redirected to the dashboard.

Evidence:
- Attachment: [login_error.png](file:///d:/AITesterBluePrint2x/project02_real_project_PE/input/login_error.png)
- Evidence Description: Screenshot shows the VWO login page with an active error alert box containing the ambiguous message regarding email, password, IP, or location.

---

## 🔷 CONSTRAINTS CHECK
- **Evidence-Only:** All details (URL, error text, visual state) are directly from `login_error.png`.
- **No Assumptions:** The root cause (e.g., wrong password vs IP mismatch) is not stated.
- **Unknowns Marked:** Browser, OS, and specific inputs used are marked as [UNKNOWN].
