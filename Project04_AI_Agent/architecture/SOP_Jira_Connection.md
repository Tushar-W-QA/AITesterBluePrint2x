# SOP: Jira Connection & Ticket Fetching

## Purpose
Establish and validate a connection to Jira Cloud, then fetch ticket details by ID.

## Prerequisites
- Jira Cloud URL (e.g., `https://your-domain.atlassian.net`)
- User email address
- Jira API Token (generated from Atlassian account settings)

## Connection Flow
1. User enters Jira URL, Email, and API Token in the **Jira Config** page.
2. User clicks **Test Connection**.
3. System calls `GET /rest/api/3/myself` with Basic Auth (`email:apiToken` base64-encoded).
4. If 200 OK → Connection valid. Store credentials in localStorage.
5. If error → Display error message.

## Ticket Fetch Flow
1. User enters a Ticket ID (e.g., `PROJ-123`) in the **Jira Ticket** page.
2. System calls `GET /rest/api/3/issue/{ticketId}`.
3. Parse response to extract: `summary`, `description`, `acceptanceCriteria`, `issueType`, `priority`, `status`, `labels`, `components`.
4. Display a **Preview** of the ticket data.
5. User confirms and clicks **Generate Report**.

## Error Handling
- **401 Unauthorized**: Invalid credentials — prompt user to re-enter.
- **404 Not Found**: Ticket ID doesn't exist.
- **Network Error**: Jira URL unreachable.

## Edge Cases
- Acceptance Criteria may be in a custom field (configurable).
- Description may use Atlassian Document Format (ADF) — must be converted to plain text.
