# Flaw Corpus Census — Batch 001

**Corpus IDs:** FLAW-0001–FLAW-0020  
**Question count:** 20  
**Approved prompt SHA-256:** `549209ee136d7e25845f107842336e7829af2dd5273d6c1c1dffe491b3115a3e`  
**Expected output:** `data/flaw-corpus-census/batches/batch-001.json`

This repository is a prepared Jules bay for Batch 001 of the 752-question Flaw / Parallel Flaw census.

## Before analysis

Read `inputs/SOURCE.lock`. Materialize the pinned `germaine-internal` source into `inputs/germaine-internal` before doing any question analysis. Use the canonical question corpus only. Do not use any previously reviewed flaw taxonomy/corpus as analysis input.

## Run contract

The exact Jules prompt for this batch is frozen in the Google Sheet **Flaw Corpus Census — Exact Jules Prompts**, Batch 001, with the SHA-256 above. Do not substitute a shortened prompt.

Do not begin analysis merely because this bay exists. This repo is staged only; Jules will be dispatched separately.