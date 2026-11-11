import { z } from "zod";

/**
 * ==============================================================================
 * ORBION TECHNOLOGIES — REPORTING & EXPORT VALIDATION SCHEMAS
 * ==============================================================================
 * Validates date ranges, report types, and exports.
 * Includes defensive CSV formula injection sanitization.
 * ==============================================================================
 */

export const dateRangePeriodSchema = z.enum(["7d", "30d", "90d", "custom"]);

export const dateRangeFilterSchema = z.object({
  period: dateRangePeriodSchema.default("30d"),
  startDate: z.string().datetime({ offset: true }).optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()),
  endDate: z.string().datetime({ offset: true }).optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()),
});

export const reportExportSchema = z.object({
  reportType: z.enum([
    "traffic",
    "enquiries",
    "leads_funnel",
    "newsletter",
    "content",
    "email_deliverability",
  ]),
  period: dateRangePeriodSchema.default("30d"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type ReportExportInput = z.infer<typeof reportExportSchema>;

/**
 * ==============================================================================
 * CSV FORMULA INJECTION PREVENTION (CWE-1236)
 * ==============================================================================
 * Sanitizes arbitrary values before inclusion in CSV exports.
 * If a cell begins with characters that can be interpreted as formulas by spreadsheet
 * applications (=, +, -, @, tab, or carriage return), it is prefixed with a single quote (').
 * Embedded double-quotes are escaped according to RFC 4180.
 * ==============================================================================
 */
export function sanitizeCsvCell(value: unknown): string {
  if (value === null || value === undefined) {
    return '""';
  }

  let str = String(value);

  // Strip carriage returns and replace raw newlines with spaces for clean row formatting
  str = str.replace(/\r\n|\r/g, "\n");

  // Defend against formula injection
  const dangerousPrefixes = ["=", "+", "-", "@", "\t", "\r"];
  const trimmed = str.trimStart();
  if (dangerousPrefixes.some((p) => trimmed.startsWith(p))) {
    str = `'${str}`;
  }

  // Escape internal quotes with double-quotes
  const escaped = str.replace(/"/g, '""');

  return `"${escaped}"`;
}

/**
 * Formats an array of row values into an RFC 4180 compliant CSV line.
 */
export function toCsvRow(values: unknown[]): string {
  return values.map(sanitizeCsvCell).join(",") + "\r\n";
}

/**
 * Calculates start and end ISO timestamps for standard periods.
 */
export function calculateDateWindow(
  period: "7d" | "30d" | "90d" | "custom",
  customStart?: string,
  customEnd?: string
): { currentStart: string; currentEnd: string; prevStart: string; prevEnd: string } {
  const now = new Date();
  let days = 30;

  if (period === "7d") days = 7;
  else if (period === "90d") days = 90;

  if (period === "custom" && customStart && customEnd) {
    const start = new Date(customStart);
    const end = new Date(customEnd);
    const diffDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    const prevStart = new Date(start.getTime() - diffDays * 24 * 60 * 60 * 1000);
    const prevEnd = new Date(start.getTime());

    return {
      currentStart: start.toISOString(),
      currentEnd: end.toISOString(),
      prevStart: prevStart.toISOString(),
      prevEnd: prevEnd.toISOString(),
    };
  }

  const currentStart = new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
  const currentEnd = now.toISOString();

  const prevStart = new Date(now.getTime() - days * 2 * 24 * 60 * 60 * 1000).toISOString();
  const prevEnd = currentStart;

  return { currentStart, currentEnd, prevStart, prevEnd };
}

