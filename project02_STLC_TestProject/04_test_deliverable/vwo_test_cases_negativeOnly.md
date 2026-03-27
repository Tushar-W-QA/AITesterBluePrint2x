# Negative Test Cases: VWO Login Dashboard

**Role:** QA Engineer (Negative Testing Specialist)  
**Date:** March 24, 2026

---

## 🔷 ANTI-HALLUCINATION VERIFICATION
- **Verified Facts (from PRD & Image):**
  - Verified Error Message: "**Your email, password, IP address or location did not match**" (from `login_error.png`).
  - Inputs available: Email ID, Password, Sign in button, SSO, Google Login, Passkey.
- **Missing / Unknown Information (Needs Clarification):**
  - Specific error message for **empty** fields (not explicitly shown in error image).
  - Rate limit threshold count for account lockout.
  - Character limit constraints for password field.

---

## Negative Test Cases Suite

| Test ID | Invalid Scenario | Input | Expected Error |
| :--- | :--- | :--- | :--- |
| **TC_NEG_001** | Login with incorrect password | Valid Email + Incorrect Password | Your email, password, IP address or location did not match |
| **TC_NEG_002** | Login with unregistered email ID | Unregistered Email + Any Password | Your email, password, IP address or location did not match |
| **TC_NEG_003** | Login with invalid email format | `admin#vwo.com` + `Password123` | Your email, password, IP address or location did not match (or **Needs clarification** if format validation triggers first) |
| **TC_NEG_004** | Login with empty Email field | `[BLANK]` + `Password123` | **Needs clarification** (System should prevent submission; message not specified in visual) |
| **TC_NEG_005** | Login with empty Password field | `admin@vwo.com` + `[BLANK]` | **Needs clarification** (System should prevent submission; message not specified in visual) |
| **TC_NEG_006** | Unauthorized SSO access attempt | `user@unauthorized_domain.com` | Your email, password, IP address or location did not match |
| **TC_NEG_007** | Brute force attempt (5+ failures) | Multiple incorrect attempts | **Needs clarification** (PRD mentions rate limiting; exact message not specified) |
| **TC_NEG_008** | Login attempt from blocked IP address | Blocked IP + Valid Credentials | Your email, password, IP address or location did not match |
| **TC_NEG_009** | Login with malformed Passkey | Invalid/Corrupt Passkey | **Needs clarification** (System should display a clear error message; not specified) |
| **TC_NEG_010** | Password boundary - exceeding length | String > 256 characters | **Needs clarification** (System should either truncate or error out; not specified) |

---

## 🔷 SELF-VALIDATION CHECK
- **Strictly Negative:** Only failure scenarios and error conditions are included. No "Happy Paths".
- **Verified Facts:** The error message matches the provided `login_error.png` exactly.
- **Traceability:** Aligns with Security requirements (Rate limiting) and UI/UX flows in `vwo_prd.md`.
- **Gap Identification:** Missing error messages for specific field-level validations are marked as "Needs clarification".
