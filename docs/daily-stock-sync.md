# LG Subscribe stock freshness and manual verification (view-only fallback)

## Current situation (15 October 2026)
The sole source is a restricted Office Excel workbook in Google Drive, file ID `1GMPzP8jWTl_hzhY0CLyw-2S1ximTyePj`. The user can view its rendered spreadsheet but cannot download, export, copy, or request permission changes. A Google Drive metadata read works with the user's connected account, but raw file download returned HTTP 403 and native Google Sheets APIs reject the Office workbook. Google Sheets URL and the browser's authenticated view do **not** grant a server-side machine-readable feed. Do not scrape or bypass the file owner's restrictions.

**No reliable unattended full stock synchronization is currently possible with those permissions.** Do not invent stock values or claim that a source metadata read or successful site deployment proves a stock refresh.

## What works today
- Existing scheduled task `LG Stock Source Freshness Monitor`, around 10 AM Asia/Kuala_Lumpur (flexible within an hour), checks only authorized Google Drive metadata and records a truthful `failed` full-sync outcome whenever source content remains inaccessible. It never writes stock. Its start-of-run heartbeat is `unverified` until the final outcome; metadata-only checks never become `success` or `no_change`.
- The Control Center's Dashboard and Update page display `public.stock_sync_runs` read-only history for the last 30 days. Full synchronized stock freshness and an access/freshness monitor are different concepts.
- The Update page provides **Verify one model manually (view-only fallback)**. A signed-in, authorized editor may type individually observed figures only where that use is permitted. No download, export, automatic extraction, screenshot, or copy-restriction workaround is required. A selected model requires an actual report date and all 17 fields from all three regions, including real zeros; blanks are rejected.
- On confirmation, `public.apply_manual_stock_check` securely checks workspace editor membership, exact existing model code, report date not older than stored regional stock, workspace revision, all three regions, every numeric input, and balance arithmetic. The call performs a single PostgreSQL transaction that changes only this model's `workspace_state.state_json.products[code].stock` and the three normalized `product_availability_current` rows. The client re-reads both tables. Neither missing nor unrelated models, prices, images, lifecycle, submission controls, nor global full-report dates are modified.
- The `public.manual_stock_checks` audit table records each explicit manual verification; direct client writes are denied and readers must be authorized editors. Partial manual checks do not insert full-sync `success` entries in `stock_sync_runs`.

## Regional source mapping to check before each permitted manual entry
| Region | Opening | Incoming / in transit | Pending | Backorders | Current orders | Balance |
| --- | --- | --- | --- | --- | --- | --- |
| AL8 | E | F | — | G | H | I |
| Sabah AL2 | O | P | Q | R | S | T |
| Sarawak AL3 | U | V | W | X | Y | Z |

Model code is column D. J:N contain West Malaysia arrival/ETA, **not** Sabah. All three balances are checked as opening + incoming/in-transit + pending - backorders - current orders. Negative balance values are valid. Subtotal and grand-total rows are excluded from any per-model check.

## Historical context and logging
The independently validated manual full import on 14 October at 08:22 MYT had 67 models / 201 regions checked and 61 changed models; it does not establish daily unattended sync. The scheduled 14 and 15 October attempts are unverified. Today's historical entry is not upgraded to success without fresh evidence.

Automated monitor uses the unique daily key `daily-YYYY-MM-DD`, origin `scheduled`, Malaysia time. A source metadata `modifiedTime` is **not** the workbook's own report timestamp. Only a fresh, fully validated complete import from an authorized feed may ever write a full-sync `success` or `no_change` outcome. If a successfully verified daily record exists, reruns must not downgrade it. On tool failure or interruption, preserve prior stock and show `failed` or `unverified` honestly. Do not store credentials or workbook contents in the public log.

## Future fully automatic sync
A 100%-automated stock refresh requires owner-authorized access to a machine-readable source (or another authorized feed the user actually has the right to use). Once that exists, implement scheduled read, source-date validation, complete exact-model and all-region checks, guarded atomic database apply, verification against normalized and public feeds, audit, and alerting. Do not try to replicate hidden Google access tokens, authenticate on the owner's behalf, or circumvent disabled downloads/copying.

## Regression checks
- Parse website inline scripts; no JavaScript syntax errors.
- Confirm anonymous users cannot invoke `public.apply_manual_stock_check`; authenticated users must additionally pass `private.can_edit_workspace`.
- Database before any manual verification: 111 products and 333 regional entries, with no `manual_stock_checks` entries.
- Test the new UI only with numbers personally verified from an authorized displayed report; avoid saving example or old quantities.
- Bump the service worker cache when the website code changes so installed copies refresh.
