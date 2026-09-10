# CampusConnect API

The CampusConnect backend is an ES-module Express API backed by MongoDB. It supports
student complaint/suggestion workflows, staff assignment and status updates, request
messages, notifications, feedback, and admin reporting.

## Local setup

1. Install Node.js 20+ and MongoDB (local or hosted).
2. From `backend`, run `npm install`.
3. Copy `.env.example` to `.env` and set `MONGODB_URI`, a long random `JWT_SECRET`,
   and `CLIENT_ORIGIN`.
   For a frontend hosted on a different site, use `COOKIE_SECURE=true` and
   `COOKIE_SAME_SITE=none` over HTTPS.
4. Run `npm run dev` (or `npm start`).
5. Run the existing frontend from `lpudesk` with `npm install` and `npm run dev`.

Authentication uses a `campusconnect_token` HTTP-only cookie. The browser must call
the API with credentials enabled; the frontend helper in `lpudesk/src/api.js` does
this without exposing the JWT.

## API areas

- `/api/auth`: register, login with email or student ID, logout, current user,
  forgot/reset password, email verification, and verification resend. Development
  responses expose a short-lived token instead of sending email; production responses
  remain generic and should be connected to an email provider.
- `/api/requests`: create, list, view, staff status updates, request messages
- `/api/messages`: message retrieval and read state
- `/api/notifications`: inbox and read state
- `/api/feedback`: post/view feedback for resolved requests
- `/api/admin`: admin statistics, users, and audit logs

Roles are `student`, `authority`, `library`, and `admin`. Registration always creates
a student; privileged roles should be provisioned by a trusted administrative process.
Request status values are `submitted`, `under_review`, `in_progress`, `resolved`, and
`rejected`; priorities are `low`, `medium`, `high`, and `urgent`. Older clients may
continue using `category`, `submittedBy`, and `resolutionNote`; new responses also
include `ticketNumber`, `type`, `location`, `anonymous`, `student`, `department`, and
`resolution`.
