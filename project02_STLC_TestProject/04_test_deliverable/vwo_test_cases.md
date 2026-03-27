# Test Cases: VWO Login Dashboard

**Role:** Senior QA Engineer (10+ Years Experience)  
**Date:** March 24, 2026

---

## 🔷 ANTI-HALLUCINATION VERIFICATION
- **Verified Facts (from PRD & Image):**
  - Fields: `Enter email ID`, `Enter password`.
  - Buttons: `Sign in`, `Sign in with Google`, `Sign in using SSO`, `Sign in with Passkey`, `Start a FREE TRIAL`.
  - Links: `Forgot Password?`, `Privacy policy`, `Terms`.
  - Checkbox: `Remember me`.
  - Accessibility: ARIA labels, Keyboard navigation, High contrast (PRD).
- **Missing / Unknown Information (Needs Clarification):**
  - Specific error message text for incorrect credentials.
  - Character limit and complexity rules for the password field.
  - MFA verification steps (e.g., OTP via Email vs SMS).
  - "Remember me" duration.

---

## Test Cases Suite

| TID | Category | Description | Pre-conditions | Steps | Expected | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC_001** | Functional | Verify successful login with valid Email and Password | User has a registered account | 1. Navigate to https://app.vwo.com/login<br>2. Enter valid Email ID<br>3. Enter valid Password<br>4. Click 'Sign in' | User is successfully authenticated and redirected to the Dashboard. | Critical |
| **TC_002** | Functional | Verify login with Sign in with Google | User has a valid Google account linked to VWO | 1. Navigate to login page<br>2. Click 'Sign in with Google'<br>3. Authenticate via Google | User is successfully authenticated and redirected to the Dashboard. | High |
| **TC_003** | Functional | Verify login using Enterprise SSO | Project configured with SSO | 1. Navigate to login page<br>2. Click 'Sign in using SSO'<br>3. Follow SSO provider steps | User is redirected to Dashboard post-SSO authentication. | High |
| **TC_004** | Negative | Verify login failure with invalid Email ID | Account does not exist | 1. Enter invalid Email ID<br>2. Enter any password<br>3. Click 'Sign in' | System displays error message. **(Needs clarification on specific error text)** | Critical |
| **TC_005** | Negative | Verify login failure with incorrect Password | Correct Email, wrong Password | 1. Enter valid Email ID<br>2. Enter incorrect Password<br>3. Click 'Sign in' | System displays error message. **(Needs clarification on specific error text)** | Critical |
| **TC_006** | Boundary | Verify mandatory field validation for Email ID | N/A | 1. Leave Email ID blank<br>2. Enter valid Password<br>3. Click 'Sign in' | System prevents submission and highlights Email field. **(Needs clarification on error message)** | High |
| **TC_007** | Boundary | Verify mandatory field validation for Password | N/A | 1. Enter valid Email ID<br>2. Leave Password blank<br>3. Click 'Sign in' | System prevents submission and highlights Password field. **(Needs clarification on error message)** | High |
| **TC_008** | UI/UX | Verify Password visibility toggle | N/A | 1. Enter text in Password field<br>2. Click the 'Eye' icon (visibility toggle) | The password text should toggle between masked (dots) and plain text. | Medium |
| **TC_009** | Functional | Verify 'Remember me' checkbox functionality | N/A | 1. Enter valid credentials<br>2. Check 'Remember me'<br>3. Click 'Sign in'<br>4. Close and reopen browser | User should remain logged in. **(Needs clarification on duration)** | Medium |
| **TC_010** | Functional | Verify 'Forgot Password?' link redirection | N/A | 1. Click 'Forgot Password?' | User is redirected to the password reset page. | High |
| **TC_011** | Functional | Verify 'Start a FREE TRIAL' redirection | N/A | 1. Click 'Start a FREE TRIAL' | User is redirected to the registration/onboarding page. | Medium |
| **TC_012** | Accessibility | Verify keyboard navigation (Tab sequence) | N/A | 1. Navigate to page<br>2. Use 'Tab' key to cycle through elements | Focus should move logically: Email -> Password -> Visibility Icon -> Forgot Password -> Remember me -> Sign in -> Social buttons -> Free Trial. | High |
| **TC_013** | Accessibility | Verify ARIA labels for Screen Readers | Screen reader active | 1. Navigate to page<br>2. Focus on input fields and buttons | Screen reader should correctly announce field names and button purposes. | High |
| **TC_014** | Security | Verify rate limiting on brute force attempt | N/A | 1. Enter incorrect password multiple times **(Needs clarification on count)** | System should temporarily lock the account or implement a delay. | Critical |
| **TC_015** | UI/UX | Verify responsive design on mobile viewport | Mobile browser | 1. Access login page on mobile device | UI components should adjust correctly without horizontal scrolling or overlapping. | High |

---

## 🔷 SELF-VALIDATION CHECK
- **Traceability:** Test cases map directly to Features (Authentication, User Support, UX, Accessibility) and Security requirements in `vwo_prd.md`.
- **Constraint Check:** No error messages or codes were invented; gaps are explicitly marked as "Needs clarification".
- **Coverage:** Happy path, negative, boundary, and edge cases (accessibility/security) are included.
