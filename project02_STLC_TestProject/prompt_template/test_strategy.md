ROLE: 
You are a Senior QA Engineer with 8–10 years of experience in enterprise-level applications, test strategy design, and quality engineering best practices.

TASK:
Create a comprehensive Test Strategy document using the RICEPOT framework. The strategy should be production-ready, detailed, and aligned with industry standards (Agile, DevOps, CI/CD).

CONTEXT:
The application under test is: [Provide application details here]
Target users: [e.g., end-users, admins, B2B clients]
Platform: [Web / Mobile / API / Desktop]
Architecture (if known): [Microservices / Monolith / Cloud-based]

---

## 🔷 RICEPOT FRAMEWORK COVERAGE

### 1. R – Risks
- Identify functional and non-functional risks
- Include business risks, technical risks, security risks, and data risks
- Provide mitigation strategies for each risk
- Include risk prioritization (High/Medium/Low)

### 2. I – Issues
- Highlight known limitations, dependencies, and constraints
- Identify potential blockers (environment, test data, third-party systems)
- Mention assumptions clearly

### 3. C – Coverage
- Define complete test coverage strategy:
  - Functional coverage (features, modules, workflows)
  - Non-functional coverage:
    - Performance
    - Security
    - Usability
    - Compatibility
    - Accessibility
    - Reliability
- Include both:
  - BBT (Black Box Testing):
    - UI Testing
    - API Testing
    - Integration Testing
    - System Testing
    - UAT support
  - WBT (White Box Testing):
    - Unit Testing strategy
    - Code coverage expectations
    - Static code analysis
    - Logic/path coverage
- Mention test design techniques:
  - Boundary Value Analysis
  - Equivalence Partitioning
  - Decision Table
  - State Transition

### 4. E – Environment
- Define test environments required:
  - QA, Staging, Production-like
- Environment configuration details:
  - OS, Browser, Devices
  - Database
  - Network setup
- Test data management strategy
- Environment availability risks

### 5. P – Process
- Define QA process in Agile/DevOps:
  - Sprint planning involvement
  - Test case design & review
  - Test execution cycle
  - Defect lifecycle (with severity & priority definitions)
- Entry & Exit criteria
- Regression strategy
- Automation strategy:
  - UI automation (e.g., Selenium, Playwright)
  - API automation (e.g., RestAssured, Postman)
- CI/CD integration:
  - Pipeline testing stages
- Reporting & metrics:
  - Test coverage %
  - Defect density
  - Pass/Fail trends

### 6. O – Organization
- Define team structure:
  - QA roles & responsibilities
- Collaboration model:
  - QA + Dev + Product + DevOps
- Communication plan:
  - Standups, defect triage, reporting cadence

### 7. T – Tools
- Define tools used:
  - Test management (JIRA, TestRail, etc.)
  - Automation tools
  - Performance tools (JMeter, LoadRunner)
  - Security tools (OWASP ZAP, Burp Suite)
  - CI/CD tools (Jenkins, GitHub Actions)
- Version control strategy

---

## 🔷 ADDITIONAL EXPECTATIONS (ADVANCED QA)

- Include Shift-Left and Shift-Right testing approaches
- Define Exploratory Testing strategy
- Include Data Validation and Database testing approach
- API contract testing (if microservices)
- Include Monitoring & Observability validation (logs, alerts)
- Define Backup & Recovery testing (if applicable)
- Include Compliance testing (GDPR, etc. if applicable)
- Include Scalability and Load testing approach
- Include Cross-browser and Cross-device testing strategy
- Include Accessibility standards (WCAG)

---

## 🔷 DELIVERABLE FORMAT

- Structured Test Strategy Document
- Use clear headings and bullet points
- Professional and concise language
- Include tables where needed (e.g., Risk matrix, Tools list)

---

## 🔷 CONSTRAINTS

- Do NOT assume missing business logic; mention assumptions instead
- Ensure completeness (enterprise-level strategy)
- Avoid generic answers — provide actionable, real-world QA practices

---

OUTPUT:
A complete, professional Test Strategy document ready for stakeholder review.