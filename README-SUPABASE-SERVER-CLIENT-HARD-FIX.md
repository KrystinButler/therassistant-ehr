# TherAssistant Supabase Server Client Hard Fix

This replaces `lib/supabase/server.ts` and guarantees the following exports exist:

- `getSupabaseServerClient`
- `createSupabaseServerClient`
- `getServerSupabaseClient`
- `createServerSupabaseClient`

Install from the project root:

```powershell
Expand-Archive .\therassistant-getSupabaseServerClient-hard-fix.zip -DestinationPath . -Force
rd /s /q .next
npm run dev
```

Codespaces/Linux:

```bash
unzip -o therassistant-getSupabaseServerClient-hard-fix.zip
rm -rf .next
npm run dev
```
