// ============================================================
// Bhumisutra — Type Definitions
// Maps 1:1 to PostgreSQL schema. Do not diverge.
// ============================================================

// --- Enums ---

export type OfficeType =
  | "AC_LAND"
  | "UNION_LAND"
  | "SUB_REGISTRY"
  | "DLRS_SURVEY"
  | "BANK"
  | "COURT"
  | "DC_OFFICE"
  | "NID_AUTHORITY";

export type LandType =
  | "AGRICULTURAL"
  | "RESIDENTIAL"
  | "COMMERCIAL"
  | "INDUSTRIAL"
  | "WATER_BODY"
  | "FOREST"
  | "OTHER";

export type LandClass =
  | "PRIVATE"
  | "KHAS_GOVT"
  | "VESTED"
  | "ACQUIRED"
  | "WAQF"
  | "DEBOTTAR"
  | "OTHER";

export type ParcelStatus =
  | "CLEAR"
  | "DISPUTED"
  | "UNDER_ACQUISITION"
  | "MORTGAGED"
  | "COURT_INJUNCTION"
  | "FLAGGED";

export type VerificationStatus =
  | "UNVERIFIED"
  | "PARTIAL"
  | "VERIFIED"
  | "MISMATCH";

export type SurveyType = "CS" | "SA" | "RS" | "BS" | "CITY_JORIP" | "DIARA";

export type DeedType =
  | "SALE"
  | "GIFT_HEBA"
  | "INHERITANCE_WARIS"
  | "EXCHANGE"
  | "PARTITION"
  | "POWER_OF_ATTORNEY"
  | "MORTGAGE"
  | "LEASE";

export type MutationStatus =
  | "APPLIED"
  | "UNDER_REVIEW"
  | "HEARING_SCHEDULED"
  | "OBJECTION_RAISED"
  | "APPROVED"
  | "REJECTED";

export type OwnershipType = "SOLE" | "JOINT" | "INHERITED" | "LEASED";

export type AcquiredVia =
  | "DEED_PURCHASE"
  | "INHERITANCE"
  | "GIFT"
  | "GOVT_ALLOTMENT"
  | "COURT_ORDER"
  | "PARTITION";

export type OwnershipVerificationStatus =
  | "UNVERIFIED"
  | "PARTIAL"
  | "FULLY_VERIFIED"
  | "CONFLICT";

export type EncumbranceType =
  | "MORTGAGE"
  | "COURT_CASE"
  | "INJUNCTION"
  | "ACQUISITION_NOTICE"
  | "LIEN"
  | "TAX_DUE";

export type ListingStatus =
  | "DRAFT"
  | "ACTIVE"
  | "UNDER_NEGOTIATION"
  | "SOLD"
  | "WITHDRAWN"
  | "EXPIRED";

export type ContactRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "EXPIRED";

// --- Database Models ---

export interface DataSource {
  id: string;
  source_name: string;
  ministry: string;
  office_type: OfficeType;
  district?: string;
  upazila?: string;
  is_active: boolean;
  last_sync_at?: string;
}

export interface Citizen {
  id: string;
  nid_number: string;
  name_bn: string;
  name_en?: string;
  father_name?: string;
  mother_name?: string;
  date_of_birth?: string;
  photo_url?: string;
  phone?: string;
  email?: string;
  address_present?: string;
  address_permanent?: string;
  is_verified: boolean;
  verified_at?: string;
}

export interface Mouza {
  id: string;
  mouza_no: string;
  mouza_name_bn: string;
  mouza_name_en?: string;
  union_name?: string;
  upazila: string;
  district: string;
  division: string;
  map_sheet_no?: string;
  map_image_url?: string;
}

export interface LandParcel {
  id: string;
  mouza_id: string;
  dag_no: string;
  area_acres?: number;
  area_decimals?: number;
  area_sqft?: number;
  land_type: LandType;
  land_class: LandClass;
  status: ParcelStatus;
  verification_status: VerificationStatus;
  verification_score: number;
  verified_at?: string;
  latitude?: number;
  longitude?: number;

  // Joined data (populated by API)
  mouza?: Mouza;
}

export interface Khatian {
  id: string;
  parcel_id: string;
  khatian_no: string;
  survey_type: SurveyType;
  owner_names_bn?: string;
  father_names?: string;
  owner_share?: string;
  owner_citizen_id?: string;
  document_url?: string;
  document_hash?: string;
  issue_date?: string;
  recorded_area?: number;
}

export interface Deed {
  id: string;
  parcel_id: string;
  deed_no: string;
  deed_type: DeedType;
  seller_citizen_id?: string;
  seller_name_bn?: string;
  buyer_citizen_id?: string;
  buyer_name_bn?: string;
  registration_office?: string;
  registration_date: string;
  book_no?: string;
  volume_no?: string;
  page_no?: string;
  declared_value?: number;
  stamp_duty_paid?: number;
  transferred_area?: number;
  document_url?: string;
  document_hash?: string;
  qr_code_data?: string;
  is_verified: boolean;
}

export interface Mutation {
  id: string;
  parcel_id: string;
  deed_id?: string;
  mutation_case_no: string;
  previous_owner_id?: string;
  new_owner_id?: string;
  previous_khatian_id?: string;
  new_khatian_no?: string;
  status: MutationStatus;
  applied_date?: string;
  approved_date?: string;
  officer_name?: string;
  deed_verified: boolean;
  khatian_matched: boolean;
}

export interface OwnershipRecord {
  id: string;
  parcel_id: string;
  citizen_id: string;
  ownership_type: OwnershipType;
  share_fraction?: string;
  acquired_via: AcquiredVia;
  deed_id?: string;
  khatian_id?: string;
  mutation_id?: string;
  ownership_start?: string;
  ownership_end?: string;
  is_current: boolean;
  verified_by_deed: boolean;
  verified_by_khatian: boolean;
  verified_by_mutation: boolean;
  verification_score: number;
  verification_status: OwnershipVerificationStatus;

  // Joined
  citizen?: Citizen;
  parcel?: LandParcel;
}

export interface Encumbrance {
  id: string;
  parcel_id: string;
  encumbrance_type: EncumbranceType;
  description?: string;
  institution_name?: string;
  case_no?: string;
  amount?: number;
  start_date?: string;
  end_date?: string;
  is_active: boolean;
}

export interface MarketplaceListing {
  id: string;
  parcel_id: string;
  seller_citizen_id: string;
  ownership_record_id: string;
  title: string;
  description?: string;
  asking_price: number;
  price_per_decimal?: number;
  listing_status: ListingStatus;
  ownership_verified: boolean;
  no_encumbrance: boolean;
  no_dispute: boolean;
  listing_approved: boolean;
  photos?: string[];
  show_exact_location: boolean;
  show_seller_name: boolean;
  allow_contact: boolean;
  view_count: number;
  contact_request_count: number;
  published_at?: string;
  expires_at?: string;

  // Joined
  parcel?: LandParcel;
  seller?: Citizen;
  ownership?: OwnershipRecord;
  khatian?: Khatian;
  deed?: Deed;
  mutation?: Mutation;
  encumbrances?: Encumbrance[];
}

export interface ContactRequest {
  id: string;
  listing_id: string;
  buyer_citizen_id: string;
  seller_citizen_id: string;
  message?: string;
  status: ContactRequestStatus;
  seller_phone?: string;
  seller_email?: string;
  responded_at?: string;
  created_at: string;

  // Joined
  listing?: MarketplaceListing;
  buyer?: Citizen;
}

// --- API Response Types ---

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// --- Filter Types ---

export interface MarketplaceFilters {
  district?: string;
  upazila?: string;
  land_type?: LandType;
  min_price?: number;
  max_price?: number;
  min_area?: number;
  max_area?: number;
  verified_only?: boolean;
  sort_by?: "newest" | "price_asc" | "price_desc" | "area_asc" | "area_desc";
  page?: number;
  per_page?: number;
}

export interface VerifyDeedRequest {
  deed_no: string;
}

export interface VerifyDeedResponse {
  found: boolean;
  deed?: Deed;
  hash_match?: boolean;
  parcel?: LandParcel;
  current_owner?: string;
}

// --- Source-level verification report ---

export interface SourceCheckResult {
  source_name: string;
  source_icon: string;
  found: boolean;
  pass: boolean;
  details: Record<string, string>;
  mismatch_field?: string; // key in details that mismatched
  mismatch_reason?: string;
}

export interface VerificationReport {
  found: boolean;
  deed?: Deed;
  parcel?: LandParcel;
  khatian?: Khatian;
  mutation?: Mutation;
  ownership?: OwnershipRecord;
  encumbrances: Encumbrance[];
  buyer?: Citizen;
  seller?: Citizen;
  hash_match: boolean;
  sources: SourceCheckResult[];
  final_score: number;
  final_status: OwnershipVerificationStatus;
}
