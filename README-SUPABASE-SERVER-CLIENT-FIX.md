# Supabase Server Client Fix

This fixes:

```txt
getSupabaseServerClient is not a function
```

It overwrites:

```txt
lib/supabase/server.ts
```

The file exports both:

```ts
createSupabaseServerClient()
getSupabaseServerClient()
```

So older/newer imports both work.

## Install

From repo root:

```bash
unzip -o therassistant-supabase-server-client-fix.zip
rm -rf .next
npm run dev
```

If using PowerShell:

```powershell
Expand-Archive .\therassistant-supabase-server-client-fix.zip -DestinationPath . -Force
rd /s /q .next
npm run dev
```
