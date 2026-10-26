# PageMate — Website prototype

PageMate is a responsive front-end prototype for a student-to-student marketplace for learning support, peer tutoring, proofreading, document formatting, and handwritten study materials.

## Files

- `index.html` — page structure and dialogs
- `styles.css` — turquoise-and-white responsive styling
- `app.js` — sample service cards, category filters, search, sorting, and demo forms

## Run it on your laptop

### Option 1: Open directly
1. Extract the ZIP.
2. Open the `pagemate` folder.
3. Double-click `index.html` to open it in Chrome or Edge.

### Option 2: Use VS Code
1. Open the `pagemate` folder in VS Code.
2. Install the **Live Server** extension if you have it available.
3. Right-click `index.html` and choose **Open with Live Server**.

The page uses Google Fonts over the internet; the rest of the layout and interactions are local.

## Important prototype limits

This is a **front-end demo**, not a production marketplace. The listings are sample data, distances are illustrative, and forms only save demo entries to the current browser session. No real account, message, payment, location, upload, or delivery system is connected.

Before launching for real users, add:
- A backend/API and database for accounts, requests, offers, and reviews
- Authentication, password security, input validation, and abuse reporting
- Consent-based location handling; do not expose precise home addresses publicly
- Secure image/sample uploads with file limits and moderation
- A safe order and payment workflow, privacy policy, terms, and dispute handling
- Clear rules requiring users to follow their institution's academic-integrity policy

## DigitalOcean deployment (later)

You can deploy this static prototype as a static website on DigitalOcean App Platform or another static host. Add the backend before treating requests or profiles as real. Do not upload API keys or passwords into these front-end files.
