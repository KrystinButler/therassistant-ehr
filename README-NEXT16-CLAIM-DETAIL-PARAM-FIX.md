# Next.js 16 Claim Detail Params Fix

This replaces:

app/claims/[id]/page.tsx

Why:
Next.js 16 passes dynamic route params as a Promise in client components. The old file accessed `params.id` directly, causing:

A param property was accessed directly with `params.id`.

Fix:
The page now uses:

const resolvedParams = React.use(params);
const claimId = resolvedParams.id;

Install:
Expand this zip into your project root with overwrite enabled, then restart dev server.

PowerShell:
Expand-Archive .\therassistant-next16-claim-detail-param-fix.zip -DestinationPath . -Force
npm run dev
