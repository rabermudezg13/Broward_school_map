# Broward School Map

Adapted from [MiamiSchools](https://github.com/rabermudezg13/MiamiSchools).

Public map: https://subparty-broward-schools.web.app
Firebase project: `subparty`; Hosting site: `subparty-broward-schools`.

Search by name, address, city or ZIP; filter school types; open school details and Google Maps directions. Approved team members can share visits, notes and sublocator contact/rating information. Incident records are restricted to admin, management and IN roles.

## Data

331 public school locations in Broward County (including public charter schools), NCES school year **2024–2025**, retrieved October 28, 2026. See `public/data-source.json` for the source and limitations. This is a dated directory, not a guarantee that every school is currently operating. Confirm status and enrollment boundaries with BCPS. School categories are inferred from names; unknown or combined campuses appear under Other. Seven charter records have Miami postal addresses conflicting with their Broward coordinates; their map popups explicitly flag the source discrepancy. Phone and grades are omitted because the selected source does not provide them.

## Local development

Requires Node 22.13+.

```sh
npm ci
npm run dev
npm test
npm run build
```

## Administrator

`rodrigo.bermudez@kellyeducation.com` is the bootstrapped application administrator, enforced in both UI and Firestore rules. This does not grant Firebase Console/IAM access.

Enable Email/Password in Firebase Authentication. In Authentication → Users → Add user, create that exact email with a password chosen by the account owner. If the account already exists, use its existing password. Sign in on the map to access Manage team roles. Create other team accounts in Authentication, then assign their role from the map.

## Firebase isolation and deployment

This project shares Firebase Authentication with existing subparty apps, but uses separate collections: `browardVisits`, `browardIncidents`, and `browardTeamMembers`. Public directory data is static; operational records require authentication and a role.

`firestore.rules` preserves pre-existing subparty rules and adds Broward rules with schema validation and restricted role assignment. These are prototype rules; review and test them before broad rollout. Review current remote rules before deploying to avoid overwriting later changes from other applications in this shared project.

```sh
npx firebase-tools deploy --only firestore:rules --dry-run --project subparty
npx firebase-tools deploy --only hosting,firestore:rules --project subparty
```

The hosting configuration targets the additional Broward site, preserving the existing `subparty.web.app` application. No Cloud Functions are deployed.

## Verification

TypeScript check and production Vite build; automated CSV count, unique IDs, Florida/Broward coordinate bounds, and known-school check. Browser verification covers directory load, search, school marker details and route link. Authenticated visit/incident writes require a real approved account and are not covered by the public browser check.
