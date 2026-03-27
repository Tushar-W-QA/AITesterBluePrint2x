## API Error Handling Test Cases: RESTful Booker API

| Test ID | Error Scenario | Trigger | Expected Code | Expected Response Format |
| :--- | :--- | :--- | :--- | :--- |
| TC_ERR_01 | Missing Mandatory Fields (POST) | POST `/booking` with missing `firstname` or `lastname` | 500 (observed) / 400 (ideal) | Plain text "Internal Server Error" |
| TC_ERR_02 | Malformed JSON Body | POST `/booking` with invalid JSON syntax (e.g., missing comma) | 400 Bad Request | Plain text "Bad Request" |
| TC_ERR_03 | Invalid Authentication Token | PUT `/booking/1` with invalid `Cookie: token=...` header | 403 Forbidden | Plain text "Forbidden" |
| TC_ERR_04 | Update Non-existent Booking | PUT `/booking/999999` with valid token and body | 405 Method Not Allowed / 404 | Plain text or JSON |
| TC_ERR_05 | Delete Non-existent Booking | DELETE `/booking/999999` with valid token | 405 Method Not Allowed / 404 | Plain text |
| TC_ERR_06 | Unsupported Media Type | POST `/booking` with `Content-Type: application/xml` | 415 Unsupported Media Type | Plain text or empty |
| TC_ERR_07 | Method Not Allowed | GET `/booking` where only POST is expected (if applicable) or POST to ID | 405 Method Not Allowed | Plain text |
| TC_ERR_08 | Invalid Date Format | POST `/booking` with `checkin` date as "invalid-date" | 200 (if lenient) / 400 / 500 | Plain text or JSON |
| TC_ERR_09 | Service Unavailable (Simulated) | Request to service during maintenance | 503 Service Unavailable | HTML/Plain text |
| TC_ERR_10 | Gateway Timeout | Server failing to respond within time | 504 Gateway Timeout | HTML/Plain text |

> [!NOTE]
> As per the user's observation, the POST request often returns a **500 Internal Server Error** status code when mandatory fields are missing or data is invalid, rather than the standard **400 Bad Request**. Test cases should reflect this current behavior while highlighting the expected standard.
