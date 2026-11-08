# Orbion Technologies — Demo Request API Specification
**Document Version:** 1.0.0  
**Phase:** Phase 2 (Core Functionality & Contact APIs)  
**Endpoint:** `POST /api/demo-request`  
**Status:** Live & Production Ready  

---

## 1. Overview

The Demo Request API provides evaluation intake for Orbion Technologies' 7 planned software products. It enables prospective enterprise customers to express interest in upcoming product releases.

> [!IMPORTANT]
> **Product Lifecycle Disclosure:**  
> All Orbion software products are actively in planning and development. The API does not book an automated calendar demonstration or claim live software availability; it logs customer evaluation interest for engineering follow-up.

---

## 2. Supported Product Identifiers

The `product_id` parameter is strictly validated against the official suite:

| Product ID | Product Name | Category |
|---|---|---|
| `orbion-crm` | Orbion CRM | Business Management / CRM |
| `orbion-ai-chatbot` | Orbion AI Chatbot | Support Automation & AI Conversations |
| `orbion-bookings` | Orbion Bookings | Scheduling & Appointment Coordination |
| `orbion-fit` | Orbion Fit | Gym & Fitness Studio Operations |
| `orbion-dine` | Orbion Dine | Restaurant Digital Menus & QR Ordering |
| `orbion-docs` | Orbion Docs | AI Document Extraction & Intelligence |
| `orbion-insights` | Orbion Insights | Business Analytics & Data Dashboards |

---

## 3. Request Specification

* **URL:** `/api/demo-request`
* **Method:** `POST`
* **Content-Type:** `application/json`

### Payload Parameters

| Field | Type | Required | Constraints | Description |
|---|---|---|---|---|
| `full_name` / `name` | `string` | **Yes** | 2–120 characters | Requester full name. |
| `email` | `string` | **Yes** | Valid RFC email, max 255 chars | Work email address. |
| `product_id` | `string` | **Yes** | One of the 7 valid IDs above | Software product identifier. |
| `company` | `string` | Optional | Max 120 characters | Business or organization. |
| `phone` | `string` | Optional | Max 30 characters | Direct contact telephone number. |
| `preferred_date` | `string` | Optional | `YYYY-MM-DD` format | Desired evaluation timeframe. |
| `message` | `string` | Optional | Max 3,000 characters | Specific use case or operational goals. |
| `source` | `string` | Optional | Max 80 chars, default: `website_demo_request` | Page or campaign source. |
| `_orb_hp` | `string` | Optional | Hidden honeypot | Bot defense field. |

---

## 4. Response Examples

### 4.1 Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Your demo evaluation request for Orbion CRM has been received. Our team will review your operational requirements and get in touch.",
  "data": {
    "reference": "ORB-DEM-2611-50C45C"
  }
}
```

### 4.2 Invalid Product (`400 Bad Request`)
```json
{
  "success": false,
  "message": "Please check the information you entered.",
  "errors": {
    "product_id": "Please select a valid Orbion product (orbion-crm, orbion-ai-chatbot, orbion-bookings, orbion-fit, orbion-dine, orbion-docs, orbion-insights)."
  }
}
```

---

## 5. cURL Example

```bash
curl -X POST http://localhost:3000/api/demo-request \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Apurv Nimbarge",
    "email": "apurv@orbiontechnologies.in",
    "product_id": "orbion-docs",
    "company": "Orbion Technologies",
    "phone": "+91 98765 43210",
    "preferred_date": "2026-12-15",
    "message": "Interested in evaluating automated invoice parsing capabilities."
  }'
```

