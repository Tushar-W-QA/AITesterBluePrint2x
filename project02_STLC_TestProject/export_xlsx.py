import pandas as pd
import os

# Data for normal test cases
normal_test_cases = [
    ["TC_001", "Functional", "Verify successful login with valid Email and Password", "User has a registered account", "1. Navigate to login\\n2. Enter valid Email ID\\n3. Enter valid Password\\n4. Click 'Sign in'", "User is successfully authenticated and redirected to the Dashboard.", "Critical"],
    ["TC_002", "Functional", "Verify login with Sign in with Google", "Valid Google account linked", "1. Click 'Sign in with Google'", "Success redirection", "High"],
    ["TC_003", "Functional", "Verify login using Enterprise SSO", "SSO configured", "1. Click 'Sign in using SSO'", "Redirection to Dashboard", "High"],
    ["TC_004", "Negative", "Verify login failure with invalid Email ID", "Account does not exist", "1. Enter invalid email", "Error message (Needs Clarification)", "Critical"],
    ["TC_008", "UI/UX", "Verify Password visibility toggle", "N/A", "1. Click eye icon", "Toggle masked/plain text", "Medium"],
    ["TC_012", "Accessibility", "Verify keyboard navigation (Tab)", "N/A", "1. Tab through elements", "Logical focus sequence", "High"]
]

# Data for negative test cases
negative_test_cases = [
    ["TC_NEG_001", "Incorrect Password", "Valid Email + Wrong Pass", "Your email, password, IP address or location did not match"],
    ["TC_NEG_002", "Unregistered Email", "Unregistered Email + Any Pass", "Your email, password, IP address or location did not match"],
    ["TC_NEG_004", "Empty Email", "[BLANK]", "Needs clarification"],
    ["TC_NEG_007", "Brute Force", "10+ failures", "Needs clarification"]
]

# Create DataFrames
df_normal = pd.DataFrame(normal_test_cases, columns=["TID", "Category", "Description", "Pre-conditions", "Steps", "Expected", "Priority"])
df_negative = pd.DataFrame(negative_test_cases, columns=["Test ID", "Invalid Scenario", "Input", "Expected Error"])

# Save to XLSX with multiple sheets
output_path = r"d:\AITesterBluePrint2x\project02_STLC_TestProject\04_test_deliverable\vwo_test_cases.xlsx"

with pd.ExcelWriter(output_path, engine='openpyxl') as writer:
    df_normal.to_excel(writer, sheet_name='Functional Test Cases', index=False)
    df_negative.to_excel(writer, sheet_name='Negative Test Cases', index=False)

print(f"File created successfully at {output_path}")
