# Orbion Technologies — Newsletter & Unsubscribe API Specification
**Document Version:** 1.0.0  
**Phase:** Phase 2 (Core Functionality & Contact APIs)  
**Endpoints:** `POST /api/newsletter` & `GET|POST /api/newsletter/unsubscribe`  
**Status:** Live & Production Ready  

---

## 1. Overview

The Newsletter API manages opt-in email subscribers for Orbion Technologies engineering updates, technical notes, and product announcements. It complies with international anti-spam standards (CAN-SPAM / GDPR) by requiring explicit affirmative consent and providing cryptographically signed, one-click unsubscribe links.

---

## 2. Subscription Endpoint (`POST /api/newsletter`)

### 2.1 Request Payload
* **Method:** `POST`
* **Content-Type:** `application/json`

```json
{
  "email": "alex@company.com",
  "consent": true,
  "source": "website_footer"
}
```

| Field | Type | Required | Constraints | Description |
|---|---|---|---|---|
| `email` | `string` | **Yes** | Valid RFC email, max 255 chars | Subscriber email address. |
| `consent` | `boolean` | **Yes** | Must be strictly `true` | Explicit opt-in agreement. |
| `source` | `string` | Optional | Max 80 chars, default: `website_footer` | Acquisition source. |
| `_orb_hp` | `string` | Optional | Honeypot field | Hidden bot trap. |

### 2.2 Response Specification
* **Success (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Thank you for subscribing to Orbion Technologies updates."
  }
  ```
* **Missing Consent (`400 Bad Request`):**
  ```json
  {
    "success": false,
    "message": "Please check your subscription information.",
    "errors": {
      "consent": "You must agree to receive updates from Orbion Technologies."
    }
  }
  ```

> [!NOTE]
> **Anti-Enumeration Defense:**  
> If an email address is already subscribed, the API returns a uniform HTTP 200 success response. This prevents malicious actors from probing whether specific email addresses belong to Orbion subscribers.

---

## 3. Unsubscribe Endpoint (`/api/newsletter/unsubscribe`)

The unsubscribe flow uses cryptographic HMAC tokens generated at subscription time (`[base64urlEmail].[timestamp].[hmacSignature]`).

### 3.1 Direct Browser Link (`GET /api/newsletter/unsubscribe?token=...`)
Designed for one-click email client opt-outs:
* **Query Parameter:** `token` (string, required)
* **Success (`200 OK`):** Renders a styled, responsive confirmation page (`Unsubscribed Successfully`) with a link back to the homepage.
* **Failure (`400 Bad Request`):** Renders a notification explaining that the unsubscribe link was invalid or tampered with.

### 3.2 Programmatic JSON (`POST /api/newsletter/unsubscribe`)
```json
{
  "token": "ZXhhbXBsZUBvcmJpb24uaW4.m3f09a.7a8b9c..."
}
```

---

## 4. cURL Examples

### Subscribe:
```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "engineer@startup.io", "consent": true}'
```

### Unsubscribe:
```bash
curl -X POST http://localhost:3000/api/newsletter/unsubscribe \
  -H "Content-Type: application/json" \
  -d '{"token": "your-unsubscribe-token"}'
```

