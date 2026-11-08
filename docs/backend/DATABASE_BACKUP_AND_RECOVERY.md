# Orbion Technologies — Database Backup & Disaster Recovery Runbook
**Document Version:** 1.0.0  
**Phase:** Phase 1 (Backend Foundation & Database Architecture)  
**Status:** Approved  
**Author:** Backend Architecture & Engineering Team  

---

## 1. Important Operating Principle

> [!CAUTION]
> **Production Safety Rule:**  
> Never perform unannounced, destructive, or untested backup restorations against an active production database. Restorations, schema resets, and database rollbacks must always be tested against a non-production staging instance first.

---

## 2. Supabase Backup Architecture by Plan

Supabase provides multi-tiered backup infrastructure based on project plan:

### 2.1 Free Tier Capabilities
- **Automated Snapshots:** Supabase performs daily physical backups retained for **up to 7 days**.
- **Restoration Method:** In the Free tier, restorations cannot be triggered on a granular timeline via the dashboard; database recovery typically requires restoring the entire project snapshot or using logical dumps via the CLI.
- **Limitation:** Point-in-Time Recovery (PITR) is **not available** on Free tier.

### 2.2 Pro Tier Capabilities (Production Recommended)
- **Daily Physical Backups:** Retained for 7 days (or expandable up to 30 days).
- **Point-in-Time Recovery (PITR):** Continuously captures database Write-Ahead Logs (WAL) via `wal-g`. Allows recovery to **any second** within the retention window (e.g., reverting to 1 minute prior to an accidental data modification).
- **Target SLA:** Maximum Data Loss (RPO) < 5 minutes; Recovery Time Objective (RTO) < 30 minutes.

---

## 3. Recommended Automated & Logical Backup Procedures

In addition to Supabase's managed physical snapshots, Orbion Technologies maintains a **Logical Backup Practice** for full disaster portability.

### 3.1 On-Demand Logical Backup via Supabase CLI
To export the complete PostgreSQL schema, data, and roles into an encrypted offline archive:

```bash
# 1. Authenticate CLI
supabase login

# 2. Link target project (e.g. production)
supabase link --project-ref your-prod-project-ref

# 3. Export full schema and data (excluding sensitive internal secrets)
supabase db dump --data-only -f backups/orbion_backup_$(date +%Y%m%d_%H%M%S)_data.sql
supabase db dump --schema-only -f backups/orbion_backup_$(date +%Y%m%d_%H%M%S)_schema.sql
```

### 3.2 Automated Nightly Logical Backups (CI/CD Worker)
For compliance and long-term retention beyond 30 days, configure a scheduled GitHub Actions cron job running daily at `02:00 UTC`:
1. Uses `pg_dump` over SSL with the pooled database connection string (`DATABASE_URL`).
2. Encrypts the resulting `.sql.gz` dump using GPG (`AES-256`).
3. Dispatches the encrypted archive to a cold-tier, write-once-read-many (WORM) storage bucket (e.g. AWS S3 Glacier or Google Cloud Storage Coldline) in an independent cloud region.
4. Retention policy: 30 daily backups, 12 monthly backups, 7 yearly archives.

---

## 4. Environment Separation (Dev vs. Staging vs. Prod)

To prevent accidental data loss or breaking migrations:

1. **Local Development:**  
   Uses Supabase CLI with local Docker containers (`supabase start`). Developers can safely experiment, reset schemas (`supabase db reset`), and author migration files.
2. **Staging / Preview:**  
   A dedicated cloud Supabase project (`orbion-tech-staging`) deployed via CI/CD for pull requests. Used for functional verification and restoration rehearsals.
3. **Production:**  
   Isolated Supabase Pro project (`orbion-tech-production`) with strict IP whitelisting, PITR enabled, and mandatory two-factor authentication on all admin accounts.

---

## 5. Storage Protection (Supabase Storage Assets)

> [!IMPORTANT]
> **Database backups do NOT include Supabase Storage bucket files.**  
> PostgreSQL backups capture file metadata, paths, and URLs in database tables, but the actual binary files (images, documents, PDFs) reside on Supabase's underlying object storage (S3-compatible).

To ensure complete disaster recovery in later phases:
1. Enable cross-region object replication or run scheduled S3 sync scripts:
   ```bash
   aws s3 sync s3://supabase-prod-bucket s3://orbion-cold-backup-bucket --delete
   ```
2. Retain object versioning on production storage buckets to defend against malicious or accidental mass deletions.

---

## 6. Migration Recovery & Rollback Procedures

When a migration introduces an unexpected defect in production:

### 6.1 Fix-Forward (Preferred Pattern)
In an append-only migration architecture, do not delete or rewrite historical migration files that have already been applied to production. Instead:
1. Create a new migration file:
   ```bash
   supabase migration new fix_lead_status_constraint
   ```
2. Implement the corrective DDL (e.g. `ALTER TABLE ... DROP CONSTRAINT ...; ALTER TABLE ... ADD CONSTRAINT ...;`).
3. Review and apply via `supabase db push`.

### 6.2 Rollback via Point-in-Time Recovery (Emergency Data Corruption)
If a critical production incident causes data corruption:
1. Open **Supabase Dashboard** → **Project Settings** → **Database** → **Backups**.
2. Select **Point in Time**.
3. Choose the exact timestamp **prior** to the incident (e.g., `2026-11-08 14:22:00 UTC`).
4. Click **Restore**. Supabase boots a temporary instance from the WAL archive and transitions traffic safely.

---

## 7. Restoration Testing Rehearsal Protocol

A backup that has never been restored is not a verified backup. Every quarter, the engineering team executes a **Restoration Rehearsal**:

1. Provision a disposable Supabase testing project (`orbion-restore-test`).
2. Download the latest automated or logical backup file.
3. Restore the backup into the test project:
   ```bash
   psql -h aws-0-ap-south-1.pooler.supabase.com -p 6543 -U postgres.orbion-restore-test -d postgres -f backups/latest_dump.sql
   ```
4. Execute automated schema validation:
   - Check all 4 core tables exist (`contact_leads`, `profiles`, `audit_logs`, `site_settings`).
   - Check all constraints and indexes are valid.
   - Check Row Level Security is active and blocking anonymous queries.
   - Verify record count consistency.
5. De-provision the temporary testing project.
6. Document results and sign off in `docs/backend/RESTORATION_LOGS.md`.

