// ============================================================
// Bhumisutra — Utility Functions
// ============================================================

import type {
  DeedType,
  LandType,
  MutationStatus,
  OwnershipVerificationStatus,
  ParcelStatus,
  SurveyType,
  VerificationStatus,
} from "@/types";

/**
 * Format number as Bangladeshi Taka.
 * 25,00,000 (BD grouping: last 3, then groups of 2)
 */
export function formatTaka(amount: number): string {
  const str = Math.round(amount).toString();
  if (str.length <= 3) return "৳" + toBanglaDigits(str);

  const last3 = str.slice(-3);
  const rest = str.slice(0, -3);
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return "৳" + toBanglaDigits(grouped + "," + last3);
}

/**
 * Convert English digits to Bangla digits
 */
export function toBanglaDigits(str: string | number): string {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return str
    .toString()
    .replace(/[0-9]/g, (d) => banglaDigits[parseInt(d)]);
}

/**
 * Format date to Bangla-friendly format
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
  ];
  const day = toBanglaDigits(date.getDate());
  const month = months[date.getMonth()];
  const year = toBanglaDigits(date.getFullYear());
  return `${day} ${month}, ${year}`;
}

/**
 * Format relative time
 */
export function timeAgo(dateStr: string): string {
  return formatDate(dateStr);
}

// --- Label maps ---

export const LAND_TYPE_LABELS: Record<LandType, string> = {
  AGRICULTURAL: "কৃষি",
  RESIDENTIAL: "আবাসিক",
  COMMERCIAL: "বাণিজ্যিক",
  INDUSTRIAL: "শিল্প",
  WATER_BODY: "জলাশয়",
  FOREST: "বন",
  OTHER: "অন্যান্য",
};

export const PARCEL_STATUS_LABELS: Record<ParcelStatus, string> = {
  CLEAR: "পরিষ্কার",
  DISPUTED: "বিরোধপূর্ণ",
  UNDER_ACQUISITION: "অধিগ্রহণাধীন",
  MORTGAGED: "বন্ধকী",
  COURT_INJUNCTION: "আদালতের নিষেধাজ্ঞা",
  FLAGGED: "চিহ্নিত",
};

export const VERIFICATION_LABELS: Record<VerificationStatus, string> = {
  UNVERIFIED: "অযাচাইকৃত",
  PARTIAL: "আংশিক যাচাইকৃত",
  VERIFIED: "যাচাইকৃত",
  MISMATCH: "অমিল",
};

export const OWNERSHIP_VERIFICATION_LABELS: Record<OwnershipVerificationStatus, string> = {
  UNVERIFIED: "অযাচাইকৃত",
  PARTIAL: "আংশিক",
  FULLY_VERIFIED: "সম্পূর্ণ যাচাইকৃত",
  CONFLICT: "বিরোধ",
};

export const SURVEY_TYPE_LABELS: Record<SurveyType, string> = {
  CS: "সি.এস. (১৮৮৮-১৯৪০)",
  SA: "এস.এ. (১৯৫৬-১৯৬২)",
  RS: "আর.এস.",
  BS: "বি.এস.",
  CITY_JORIP: "সিটি জরিপ",
  DIARA: "দিয়ারা",
};

export const DEED_TYPE_LABELS: Record<DeedType, string> = {
  SALE: "বিক্রয়",
  GIFT_HEBA: "হেবা/দান",
  INHERITANCE_WARIS: "ওয়ারিশ",
  EXCHANGE: "বিনিময়",
  PARTITION: "বণ্টন",
  POWER_OF_ATTORNEY: "পাওয়ার অব অ্যাটর্নি",
  MORTGAGE: "বন্ধক",
  LEASE: "লিজ",
};

export const MUTATION_STATUS_LABELS: Record<MutationStatus, string> = {
  APPLIED: "আবেদনকৃত",
  UNDER_REVIEW: "পর্যালোচনাধীন",
  HEARING_SCHEDULED: "শুনানি নির্ধারিত",
  OBJECTION_RAISED: "আপত্তি উত্থাপিত",
  APPROVED: "অনুমোদিত",
  REJECTED: "প্রত্যাখ্যাত",
};

/**
 * Truncate text with ellipsis
 */
export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + "…";
}

/**
 * Generate a simple hash display (first 8 + last 8 chars)
 */
export function displayHash(hash: string): string {
  if (hash.length <= 16) return hash;
  return hash.slice(0, 8) + "…" + hash.slice(-8);
}
