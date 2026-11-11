# Orbion Technologies — Media Library & Storage Architecture

## 1. Overview

The Orbion Media Library provides centralized digital asset management for website imagery, technical whitepapers, and brand collateral. It is backed directly by Supabase Storage and governed by strict MIME validation and RBAC permissions.

Admin route: `/admin/media`

---

## 2. Storage Buckets & Policies

The storage architecture defines two dedicated buckets:

### 1. `media` (Public Bucket)
- **Purpose**: Public images, logos, product screenshots, diagrams, and blog featured images.
- **Access**:
  - `SELECT`: Publicly readable by all anonymous visitors.
  - `INSERT`: Restricted to authenticated staff with `media:upload` capability (`super_admin`, `admin`, `editor`).
  - `DELETE`: Restricted to `super_admin` and `admin` with `media:delete`.
- **Public URL Format**: `${NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${filePath}`

### 2. `documents` (Private Bucket)
- **Purpose**: Internal enterprise documents, unreleased contracts, sensitive PDFs, and private attachments.
- **Access**:
  - Private. Blocked from anonymous public access.
  - Read access requires authenticated staff sessions or signed time-limited download URLs.
  - Upload/Delete governed by administrative permissions.

---

## 3. Allowed File Types & Size Thresholds

### Permitted MIME Types:
- **Images**: `image/jpeg`, `image/png`, `image/webp`, `image/gif`, `image/svg+xml`
- **Documents**: `application/pdf`

### Explicitly Blocked Extensions & Types:
Executables, scripts, HTML files, and binaries are strictly rejected at the server API layer:
- `application/x-executable` (.exe)
- `application/x-msdownload` (.dll, .bat, .cmd)
- `text/html` (.html, .htm)
- `application/javascript` (.js)
- `application/x-php` (.php)
- `application/x-sh` (.sh)

### Maximum File Size Limits:
- Images: **10 MB**
- Documents / PDFs: **25 MB**

---

## 4. Metadata Registry (`media_assets` table)

To ensure high-performance querying, search, pagination, and deletion tracking, every storage upload registers a corresponding row in the PostgreSQL `media_assets` table:

```sql
CREATE TABLE public.media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    bucket media_bucket NOT NULL DEFAULT 'media',
    mime_type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL,
    public_url TEXT NOT NULL,
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    alt_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
```

---

## 5. Media Library UI Features

Located at `/admin/media`:
1. **Asset Grid & Search**: Filter by bucket (`media` vs `documents`) and search by filename or alt text.
2. **One-Click URL Copying**: Instantly copies the CDN public URL to clipboard for pasting into the Markdown editor or product image fields.
3. **Upload Modal**: Drag-and-drop file upload with client-side and server-side MIME type verification and progress indicator.
4. **Permanent Deletion**: Admins can safely delete assets, simultaneously deleting the storage object from Supabase Storage and purging the metadata entry from `media_assets`.

