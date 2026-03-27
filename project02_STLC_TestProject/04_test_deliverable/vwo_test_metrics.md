# Test Metrics Strategy: VWO Login Dashboard

**Role:** Senior QA Engineer (8–10 Years Experience)  
**Date:** March 24, 2026  
**Status:** Approved for Implementation

---

## 🔷 1. METRICS DEFINITIONS & FORMULAS

### 1.1 Test Execution Metrics
| Metric Name | Definition | Formula | Data Source | Frequency | Owner | Target |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Execution Progress** | Percentage of planned tests executed | `(Executed / Planned) * 100` | TestRail / Jira | Daily | QA | 100% at EOC |
| **Test Pass Rate** | Percentage of executed tests that passed | `(Passed / Executed) * 100` | TestRail | Daily | QA | > 95% |
| **Blocked Rate** | Percentage of tests blocked by environment/bugs | `(Blocked / Executed) * 100` | Jira | Daily | QA | < 5% |

### 1.2 Defect Metrics
| Metric Name | Definition | Formula | Data Source | Frequency | Owner | Target |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Defect Density** | Count of defects per feature/module | `(Defects / Feature)` | Jira | Weekly | QA | < 1 (Critical) |
| **Defect Leakage** | Defects found in Prod vs. Testing | `(Prod Defects / Total Defects) * 100` | Logs / Jira | Release | QA/Dev | < 2% |
| **Defect Aging** | Avg time taken to resolve a bug | `(Resolution Date - Logged Date)` | Jira | Weekly | Dev | < 3 days |

### 1.3 Quality & Automation Metrics
| Metric Name | Definition | Formula | Data Source | Frequency | Owner | Target |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Automation Coverage** | % of regression suite automated | `(Automated TCs / Total Regression) * 100` | Playwright | Sprint | QA Auto | > 80% |
| **Script Stability** | Flaky tests vs. Total automated tests | `(Flaky Tests / Total Automated) * 100` | CI/CD Logs | Daily | QA Auto | < 5% |
| **Build Success Rate** | % of successful pipeline runs | `(Success Runs / Total Runs) * 100` | Jenkins | Weekly | DevOps | > 98% |

---

## 🔷 2. ADVANCED QUALITY INDICATORS

- **Defect Removal Efficiency (DRE):**  
  `DRE = (Defects found during Testing / (Defects found during Testing + Defects found in Prod)) * 100`  
  *Benchmark:* > 95%
- **Mean Time to Detect (MTTD):** Average time from bug introduction to detection by QA.
- **Cost of Quality (CoQ):** Total cost of testing activities + cost of fixing escaped defects.

---

## 🔷 3. VISUALIZATION & REPORTING

### Sugested Dashboards:
1. **QA Health Dashboard (Jira/TestRail):** 
   - Real-time pie chart of Pass/Fail/Blocked status.
   - Bar graph of Defect Severity distribution.
2. **Automation Pipeline Dashboard (Jenkins/GitHub Actions):**
   - Trend lines for execution time.
   - Heatmap of flaky components.
3. **Executive Summary Dashboard:**
   - Single "Quality Score" based on Weighted DRE and Pass Rate.

### Reporting Cadence:
- **Daily:** Execution status and blockers shared in Slack/Standup.
- **Weekly:** QA Status Report (QSR) including defect trends and aging.
- **End of Cycle (EOC):** Full Test Summary Report with final RTM and DRE.

---

## 🔷 4. TOOLS & INTEGRATION
- **Test Management:** JIRA (for Defect tracking), TestRail (for Execution).
- **Automation:** Playwright (UI), RestAssured (API).
- **CI/CD:** Jenkins / GitHub Actions.
- **Reporting:** Power BI (Integration with Jira API).

---

## 🔷 5. CONSTRAINTS & BEST PRACTICES
- **Actionability:** Every "Failed" metric must trigger a Root Cause Analysis (RCA).
- **No Inferred Success:** Blocked tests are not considered passed; they remain blockers until resolved.
- **Alignment:** Metrics are aligned with VWO PRD Success Metrics (99.9% uptime, <2s load time).

---

**Approval:**  
*QA Director Sign-off required.*
