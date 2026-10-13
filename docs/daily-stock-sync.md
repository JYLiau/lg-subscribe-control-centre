# Daily stock sync

An enabled ChatGPT automation, **LG Daily Stock Sync**, starts 14 October 2026 and runs around 10:00 Asia/Kuala_Lumpur each day (flexible timing, within an hour). This is an external scheduled browser task; it does not require the Control Center to stay open and is not a GitHub Actions or in-page timer.

Source: https://docs.google.com/spreadsheets/d/1GMPzP8jWTl_hzhY0CLyw-2S1ximTyePj/edit?gid=962201189#gid=962201189

Use the existing view-only browser access. Do not export, download, duplicate or clipboard-copy the source workbook. Do not change access permissions. Read the rendered Available Sum worksheet and its source timestamp afresh on every run. Do not treat the manual Google-link importer as an unattended read path: its export/visualization access is not established for this restricted workbook.

## Data destination

- Public site: https://jyliau.github.io/lg-subscribe-control-centre/
- Supabase project: jmnnesumjpkraugtzdkl
- Workspace: d257117f-df44-4da3-b7cb-7d0b84e6e0e4, LG Subscribe Control Centre
- Canonical state: public.workspace_state.state_json.products, indexed by exact full model code
- Normalized stock: public.product_availability_current, joined through public.products in the same workspace

Successful read-only GitHub and Supabase connector calls were verified during setup. Browser view-only access was verified in the same conversation. No new public write endpoint or credentials were added.

## Verified source layout

| Region | Opening | Incoming / in transit | Pending | Backorders | Current orders | Balance |
| --- | --- | --- | --- | --- | --- | --- |
| AL8 | E | F | n/a | G | H | I |
| Sabah AL2 | O | P | Q | R | S | T |
| Sarawak AL3 | U | V | W | X | Y | Z |

Model is D. J:N contains AL8 arrival/ETA information. Revalidate headings instead of assuming this layout survives report changes. In state JSON preserve `opening`, `incoming` (AL8), `inTransit` and `pending` (regions), `backorder`, `currentOrders`, and signed `balance` individually. Normalized `inbound_stock` is AL8 incoming or regional inTransit + pending.

## Validation gate

Read all model rows, including stopped models. Require readable numeric values, exact model codes, no duplicates, full coverage and a valid source timestamp. Do not assume a missing or unreadable figure is zero. Check row balance arithmetic and visible subtotals/grand totals. Unexplained inconsistencies, unmatched new models, incomplete reads or access failures stop the entire batch and preserve the last stored stock. Absence from the report never authorizes zeroing, deleting, or changing a model's lifecycle or submission status.

The 13 October source currently fails total reconciliation. Its 67 visible model rows summed to AL8 opening 6792 / balance 5155, Sabah opening 486 / balance 524, Sarawak opening 270 / balance 244; the displayed grand totals were 6643 / 4668, 509 / 504, 308 / 297 respectively. This discrepancy is unresolved. No stock data was applied during setup. Re-read the current source and report if the discrepancy persists; do not reuse these quantities as live inputs.

GC-J257 row 80 was visually confirmed as Sabah opening 43 and balance 38, Sarawak opening 11 and balance 4. These are audit examples, not permanent expected quantities.

## Apply validated batches

Use connected authorized Supabase tools. Inspect the current schema and workspace before writing. In one transaction, lock the workspace row and guard against its captured updated_at changing, merge only stock for exactly matched source models, update their three normalized region rows, and preserve all other JSON and absent model values/dates. Retain source/report dates in Asia/Kuala_Lumpur, not the automation run time. Record source URL, validation result, application time and changed-model count using existing history conventions.

Do not modify pricing, promotions, images, descriptions, lifecycle, manual submission controls or source sharing. Do not expose privileged credentials. Do not apply only one of canonical state and normalized stock. Check current database triggers and public RPC definitions before making a batch so downstream data remains consistent.

Re-read all changed rows after commit and verify the public Control Center and customer stock feed, including GC-J257 when present. Report successful changed-model counts or one concise blocked-sync notice. If the source is unchanged and stored data matches a previously validated batch, skip the write and repetitive notification.

## Importer regression check

Run `node tests/stock-mapping.test.cjs`. The manual importer now maps Sabah at Model+11 and Sarawak at Model+17, verifies opening/balance headings, and rejects incomplete regional rows. This fixes parsing code only; it does not bypass Google access restrictions or validate the current source totals.
