// ============================================================
// Bhumisutra — Mock Data
// Realistic prototype data for hackathon demo.
// Two scenarios: verified (happy path) + conflict (fraud detection)
// ============================================================

import type {
  Citizen,
  DataSource,
  Deed,
  Encumbrance,
  Khatian,
  LandParcel,
  MarketplaceListing,
  Mouza,
  Mutation,
  OwnershipRecord,
} from "@/types";

// --- Data Sources ---

export const DATA_SOURCES: DataSource[] = [
  {
    id: "ds-1",
    source_name: "এসি ল্যান্ড অফিস, রাজশাহী সদর",
    ministry: "ভূমি মন্ত্রণালয়",
    office_type: "AC_LAND",
    district: "রাজশাহী",
    upazila: "রাজশাহী সদর",
    is_active: true,
    last_sync_at: "2026-10-17T10:00:00Z",
  },
  {
    id: "ds-2",
    source_name: "সাব-রেজিস্ট্রি অফিস, রাজশাহী সদর",
    ministry: "আইন মন্ত্রণালয়",
    office_type: "SUB_REGISTRY",
    district: "রাজশাহী",
    upazila: "রাজশাহী সদর",
    is_active: true,
    last_sync_at: "2026-10-17T09:30:00Z",
  },
  {
    id: "ds-3",
    source_name: "ভূমি রেকর্ড ও জরিপ অধিদপ্তর",
    ministry: "ভূমি মন্ত্রণালয়",
    office_type: "DLRS_SURVEY",
    district: "রাজশাহী",
    is_active: true,
    last_sync_at: "2026-10-17T08:00:00Z",
  },
  {
    id: "ds-4",
    source_name: "সোনালী ব্যাংক, রাজশাহী শাখা",
    ministry: "অর্থ মন্ত্রণালয়",
    office_type: "BANK",
    district: "রাজশাহী",
    is_active: true,
  },
  {
    id: "ds-5",
    source_name: "জেলা জজ আদালত, রাজশাহী",
    ministry: "বিচার বিভাগ",
    office_type: "COURT",
    district: "রাজশাহী",
    is_active: true,
  },
  {
    id: "ds-6",
    source_name: "জেলা প্রশাসকের কার্যালয়, রাজশাহী",
    ministry: "জনপ্রশাসন মন্ত্রণালয়",
    office_type: "DC_OFFICE",
    district: "রাজশাহী",
    is_active: true,
  },
  {
    id: "ds-7",
    source_name: "জাতীয় পরিচয়পত্র শাখা",
    ministry: "নির্বাচন কমিশন",
    office_type: "NID_AUTHORITY",
    is_active: true,
  },
  {
    id: "ds-8",
    source_name: "এসি ল্যান্ড অফিস, ঢাকা সদর",
    ministry: "ভূমি মন্ত্রণালয়",
    office_type: "AC_LAND",
    district: "ঢাকা",
    upazila: "ঢাকা সদর",
    is_active: true,
  },
];

// --- Citizens ---

export const CITIZENS: Citizen[] = [
  {
    id: "c-1",
    nid_number: "19901234567",
    name_bn: "রহিম উদ্দিন",
    name_en: "Rahim Uddin",
    father_name: "আব্দুল করিম",
    mother_name: "ফাতেমা বেগম",
    date_of_birth: "1990-05-15",
    phone: "01712345678",
    email: "rahim@example.com",
    address_present: "বোয়ালিয়া, রাজশাহী",
    address_permanent: "বোয়ালিয়া, রাজশাহী",
    is_verified: true,
    verified_at: "2026-01-10T00:00:00Z",
  },
  {
    id: "c-2",
    nid_number: "19851234568",
    name_bn: "করিম হোসেন",
    name_en: "Karim Hossain",
    father_name: "মোহাম্মদ আলী",
    mother_name: "রহিমা খাতুন",
    date_of_birth: "1985-11-20",
    phone: "01898765432",
    email: "karim@example.com",
    address_present: "মিরপুর, ঢাকা",
    address_permanent: "রাজশাহী সদর, রাজশাহী",
    is_verified: true,
    verified_at: "2025-06-01T00:00:00Z",
  },
  {
    id: "c-3",
    nid_number: "19781234569",
    name_bn: "জামাল আহমেদ",
    name_en: "Jamal Ahmed",
    father_name: "সিরাজুল ইসলাম",
    mother_name: "আয়েশা সিদ্দিকা",
    date_of_birth: "1978-03-08",
    phone: "01611122233",
    address_present: "শাহমখদুম, রাজশাহী",
    is_verified: true,
    verified_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "c-4",
    nid_number: "19921234570",
    name_bn: "সুমাইয়া আক্তার",
    name_en: "Sumaiya Akter",
    father_name: "আবুল হাসান",
    mother_name: "নাজমা বেগম",
    date_of_birth: "1992-07-22",
    phone: "01555667788",
    address_present: "ধানমন্ডি, ঢাকা",
    is_verified: true,
    verified_at: "2026-03-15T00:00:00Z",
  },
];

// --- Mouzas ---

export const MOUZAS: Mouza[] = [
  {
    id: "m-1",
    mouza_no: "45",
    mouza_name_bn: "বোয়ালিয়া",
    mouza_name_en: "Boalia",
    union_name: "রাজশাহী পৌরসভা",
    upazila: "রাজশাহী সদর",
    district: "রাজশাহী",
    division: "রাজশাহী",
    map_sheet_no: "RS-45-A",
  },
  {
    id: "m-2",
    mouza_no: "102",
    mouza_name_bn: "শাহমখদুম",
    mouza_name_en: "Shahmakhdum",
    union_name: "রাজশাহী পৌরসভা",
    upazila: "রাজশাহী সদর",
    district: "রাজশাহী",
    division: "রাজশাহী",
    map_sheet_no: "RS-102-B",
  },
  {
    id: "m-3",
    mouza_no: "78",
    mouza_name_bn: "মিরপুর",
    mouza_name_en: "Mirpur",
    union_name: "ঢাকা উত্তর সিটি",
    upazila: "ঢাকা সদর",
    district: "ঢাকা",
    division: "ঢাকা",
    map_sheet_no: "CS-78-D",
  },
  {
    id: "m-4",
    mouza_no: "33",
    mouza_name_bn: "হাটহাজারী",
    mouza_name_en: "Hathazari",
    union_name: "হাটহাজারী পৌরসভা",
    upazila: "হাটহাজারী",
    district: "চট্টগ্রাম",
    division: "চট্টগ্রাম",
    map_sheet_no: "BS-33-A",
  },
];

// --- Land Parcels ---

export const PARCELS: LandParcel[] = [
  {
    id: "p-1",
    mouza_id: "m-1",
    dag_no: "123",
    area_decimals: 15,
    area_sqft: 6534,
    land_type: "RESIDENTIAL",
    land_class: "PRIVATE",
    status: "CLEAR",
    verification_status: "VERIFIED",
    verification_score: 100,
    verified_at: "2026-09-01T00:00:00Z",
    latitude: 24.3745,
    longitude: 88.6042,
    mouza: undefined, // populated at runtime
  },
  {
    id: "p-2",
    mouza_id: "m-2",
    dag_no: "456",
    area_decimals: 8,
    area_sqft: 3485,
    land_type: "RESIDENTIAL",
    land_class: "PRIVATE",
    status: "DISPUTED",
    verification_status: "MISMATCH",
    verification_score: 34,
    latitude: 24.3632,
    longitude: 88.6155,
    mouza: undefined,
  },
  {
    id: "p-3",
    mouza_id: "m-3",
    dag_no: "789",
    area_decimals: 5,
    area_sqft: 2178,
    land_type: "COMMERCIAL",
    land_class: "PRIVATE",
    status: "CLEAR",
    verification_status: "VERIFIED",
    verification_score: 100,
    verified_at: "2026-08-15T00:00:00Z",
    latitude: 23.8041,
    longitude: 90.3654,
    mouza: undefined,
  },
  {
    id: "p-4",
    mouza_id: "m-1",
    dag_no: "234",
    area_decimals: 22,
    area_sqft: 9583,
    land_type: "AGRICULTURAL",
    land_class: "PRIVATE",
    status: "CLEAR",
    verification_status: "VERIFIED",
    verification_score: 100,
    verified_at: "2026-07-01T00:00:00Z",
    latitude: 24.3801,
    longitude: 88.5923,
    mouza: undefined,
  },
  {
    id: "p-5",
    mouza_id: "m-4",
    dag_no: "567",
    area_decimals: 10,
    area_sqft: 4356,
    land_type: "RESIDENTIAL",
    land_class: "PRIVATE",
    status: "MORTGAGED",
    verification_status: "PARTIAL",
    verification_score: 67,
    latitude: 22.4924,
    longitude: 91.7856,
    mouza: undefined,
  },
];

// --- Khatians ---

export const KHATIANS: Khatian[] = [
  {
    id: "k-1",
    parcel_id: "p-1",
    khatian_no: "456",
    survey_type: "RS",
    owner_names_bn: "রহিম উদ্দিন",
    father_names: "আব্দুল করিম",
    owner_share: "সম্পূর্ণ",
    owner_citizen_id: "c-1",
    document_hash: "a1b2c3d4e5f6789012345678abcdef0123456789abcdef0123456789abcdef01",
    issue_date: "2018-06-15",
    recorded_area: 15,
  },
  {
    id: "k-2",
    parcel_id: "p-2",
    khatian_no: "789",
    survey_type: "RS",
    owner_names_bn: "জামাল আহমেদ",
    father_names: "সিরাজুল ইসলাম",
    owner_share: "সম্পূর্ণ",
    owner_citizen_id: "c-3",
    issue_date: "2015-03-20",
    recorded_area: 8,
  },
  {
    id: "k-3",
    parcel_id: "p-3",
    khatian_no: "1023",
    survey_type: "BS",
    owner_names_bn: "সুমাইয়া আক্তার",
    father_names: "আবুল হাসান",
    owner_share: "সম্পূর্ণ",
    owner_citizen_id: "c-4",
    issue_date: "2022-01-10",
    recorded_area: 5,
  },
  {
    id: "k-4",
    parcel_id: "p-4",
    khatian_no: "567",
    survey_type: "RS",
    owner_names_bn: "রহিম উদ্দিন",
    father_names: "আব্দুল করিম",
    owner_share: "সম্পূর্ণ",
    owner_citizen_id: "c-1",
    issue_date: "2019-09-05",
    recorded_area: 22,
  },
  {
    id: "k-5",
    parcel_id: "p-5",
    khatian_no: "890",
    survey_type: "BS",
    owner_names_bn: "করিম হোসেন",
    father_names: "মোহাম্মদ আলী",
    owner_share: "সম্পূর্ণ",
    owner_citizen_id: "c-2",
    issue_date: "2021-04-12",
    recorded_area: 10,
  },
];

// --- Deeds ---

export const DEEDS: Deed[] = [
  {
    id: "d-1",
    parcel_id: "p-1",
    deed_no: "789",
    deed_type: "SALE",
    seller_citizen_id: "c-3",
    seller_name_bn: "জামাল আহমেদ",
    buyer_citizen_id: "c-1",
    buyer_name_bn: "রহিম উদ্দিন",
    registration_office: "সাব-রেজিস্ট্রি অফিস, রাজশাহী সদর",
    registration_date: "2020-03-15",
    book_no: "12",
    volume_no: "45",
    page_no: "234",
    declared_value: 2500000,
    stamp_duty_paid: 150000,
    transferred_area: 15,
    document_hash: "f1e2d3c4b5a6789012345678abcdef0123456789abcdef0123456789abcdef01",
    qr_code_data: "BHUMISUTRA:DEED:789:VERIFIED:2020-03-15",
    is_verified: true,
  },
  {
    id: "d-2",
    parcel_id: "p-2",
    deed_no: "1456",
    deed_type: "SALE",
    seller_name_bn: "অজ্ঞাত বিক্রেতা",
    buyer_citizen_id: "c-2",
    buyer_name_bn: "করিম হোসেন",
    registration_office: "সাব-রেজিস্ট্রি অফিস, রাজশাহী সদর",
    registration_date: "2023-07-10",
    declared_value: 1800000,
    transferred_area: 8,
    document_hash: "0000000000000000000000000000000000000000000000000000000000000000",
    is_verified: false,
  },
  {
    id: "d-3",
    parcel_id: "p-3",
    deed_no: "2100",
    deed_type: "GIFT_HEBA",
    seller_citizen_id: "c-3",
    seller_name_bn: "জামাল আহমেদ",
    buyer_citizen_id: "c-4",
    buyer_name_bn: "সুমাইয়া আক্তার",
    registration_office: "সাব-রেজিস্ট্রি অফিস, ঢাকা সদর",
    registration_date: "2022-11-20",
    declared_value: 3500000,
    stamp_duty_paid: 50000,
    transferred_area: 5,
    document_hash: "c3d4e5f6a7b8901234567890abcdef0123456789abcdef0123456789abcdef01",
    qr_code_data: "BHUMISUTRA:DEED:2100:VERIFIED:2022-11-20",
    is_verified: true,
  },
  {
    id: "d-4",
    parcel_id: "p-4",
    deed_no: "3200",
    deed_type: "INHERITANCE_WARIS",
    buyer_citizen_id: "c-1",
    buyer_name_bn: "রহিম উদ্দিন",
    registration_office: "সাব-রেজিস্ট্রি অফিস, রাজশাহী সদর",
    registration_date: "2019-01-05",
    transferred_area: 22,
    document_hash: "d4e5f6a7b8c9012345678901abcdef0123456789abcdef0123456789abcdef01",
    is_verified: true,
  },
];

// --- Mutations ---

export const MUTATIONS: Mutation[] = [
  {
    id: "mu-1",
    parcel_id: "p-1",
    deed_id: "d-1",
    mutation_case_no: "M-2020-789",
    previous_owner_id: "c-3",
    new_owner_id: "c-1",
    previous_khatian_id: "k-1",
    new_khatian_no: "456",
    status: "APPROVED",
    applied_date: "2020-04-01",
    approved_date: "2020-06-15",
    officer_name: "মোঃ আবু সাঈদ",
    deed_verified: true,
    khatian_matched: true,
  },
  {
    id: "mu-3",
    parcel_id: "p-3",
    deed_id: "d-3",
    mutation_case_no: "M-2023-101",
    previous_owner_id: "c-3",
    new_owner_id: "c-4",
    previous_khatian_id: "k-3",
    new_khatian_no: "1023",
    status: "APPROVED",
    applied_date: "2023-01-05",
    approved_date: "2023-03-20",
    officer_name: "ফারুক আহমেদ",
    deed_verified: true,
    khatian_matched: true,
  },
  {
    id: "mu-4",
    parcel_id: "p-4",
    deed_id: "d-4",
    mutation_case_no: "M-2019-456",
    previous_owner_id: undefined,
    new_owner_id: "c-1",
    status: "APPROVED",
    applied_date: "2019-02-10",
    approved_date: "2019-05-01",
    officer_name: "মোঃ আবু সাঈদ",
    deed_verified: true,
    khatian_matched: true,
  },
  // NOTE: No mutation for p-2 (fraud scenario — deed exists but no mutation)
];

// --- Ownership Records ---

export const OWNERSHIP_RECORDS: OwnershipRecord[] = [
  {
    id: "o-1",
    parcel_id: "p-1",
    citizen_id: "c-1",
    ownership_type: "SOLE",
    share_fraction: "1",
    acquired_via: "DEED_PURCHASE",
    deed_id: "d-1",
    khatian_id: "k-1",
    mutation_id: "mu-1",
    ownership_start: "2020-06-15",
    is_current: true,
    verified_by_deed: true,
    verified_by_khatian: true,
    verified_by_mutation: true,
    verification_score: 100,
    verification_status: "FULLY_VERIFIED",
  },
  {
    id: "o-2",
    parcel_id: "p-2",
    citizen_id: "c-2",
    ownership_type: "SOLE",
    share_fraction: "1",
    acquired_via: "DEED_PURCHASE",
    deed_id: "d-2",
    khatian_id: "k-2",
    ownership_start: "2023-07-10",
    is_current: true,
    verified_by_deed: true,
    verified_by_khatian: false, // Khatian shows Jamal, not Karim!
    verified_by_mutation: false, // No mutation!
    verification_score: 34,
    verification_status: "CONFLICT",
  },
  {
    id: "o-3",
    parcel_id: "p-3",
    citizen_id: "c-4",
    ownership_type: "SOLE",
    share_fraction: "1",
    acquired_via: "GIFT",
    deed_id: "d-3",
    khatian_id: "k-3",
    mutation_id: "mu-3",
    ownership_start: "2023-03-20",
    is_current: true,
    verified_by_deed: true,
    verified_by_khatian: true,
    verified_by_mutation: true,
    verification_score: 100,
    verification_status: "FULLY_VERIFIED",
  },
  {
    id: "o-4",
    parcel_id: "p-4",
    citizen_id: "c-1",
    ownership_type: "SOLE",
    share_fraction: "1",
    acquired_via: "INHERITANCE",
    deed_id: "d-4",
    khatian_id: "k-4",
    mutation_id: "mu-4",
    ownership_start: "2019-05-01",
    is_current: true,
    verified_by_deed: true,
    verified_by_khatian: true,
    verified_by_mutation: true,
    verification_score: 100,
    verification_status: "FULLY_VERIFIED",
  },
  {
    id: "o-5",
    parcel_id: "p-5",
    citizen_id: "c-2",
    ownership_type: "SOLE",
    share_fraction: "1",
    acquired_via: "DEED_PURCHASE",
    khatian_id: "k-5",
    ownership_start: "2021-04-12",
    is_current: true,
    verified_by_deed: false,
    verified_by_khatian: true,
    verified_by_mutation: true,
    verification_score: 67,
    verification_status: "PARTIAL",
  },
];

// --- Encumbrances ---

export const ENCUMBRANCES: Encumbrance[] = [
  {
    id: "e-1",
    parcel_id: "p-2",
    encumbrance_type: "COURT_CASE",
    description: "জমির মালিকানা নিয়ে বিরোধ — জামাল আহমেদ বনাম করিম হোসেন",
    institution_name: "জেলা জজ আদালত, রাজশাহী",
    case_no: "LC-2024-234",
    start_date: "2024-01-15",
    is_active: true,
  },
  {
    id: "e-2",
    parcel_id: "p-5",
    encumbrance_type: "MORTGAGE",
    description: "গৃহঋণের জন্য বন্ধক",
    institution_name: "সোনালী ব্যাংক, চট্টগ্রাম শাখা",
    amount: 800000,
    start_date: "2022-06-01",
    is_active: true,
  },
];

// --- Marketplace Listings ---

export const LISTINGS: MarketplaceListing[] = [
  {
    id: "l-1",
    parcel_id: "p-1",
    seller_citizen_id: "c-1",
    ownership_record_id: "o-1",
    title: "১৫ শতাংশ আবাসিক জমি, বোয়ালিয়া, রাজশাহী",
    description:
      "রাজশাহী সদরের বোয়ালিয়া মৌজায় ১৫ শতাংশ আবাসিক জমি বিক্রয় হবে। সম্পূর্ণ সরকারি যাচাইকৃত। রাস্তার পাশে, বিদ্যুৎ ও পানি সংযোগ আছে। শিক্ষা প্রতিষ্ঠান ও বাজারের কাছাকাছি।",
    asking_price: 2500000,
    price_per_decimal: 166667,
    listing_status: "ACTIVE",
    ownership_verified: true,
    no_encumbrance: true,
    no_dispute: true,
    listing_approved: true,
    photos: ["/images/land-1.jpg"],
    show_exact_location: false,
    show_seller_name: true,
    allow_contact: true,
    view_count: 245,
    contact_request_count: 3,
    published_at: "2026-10-01T00:00:00Z",
  },
  {
    id: "l-2",
    parcel_id: "p-3",
    seller_citizen_id: "c-4",
    ownership_record_id: "o-3",
    title: "৫ শতাংশ বাণিজ্যিক জমি, মিরপুর, ঢাকা",
    description:
      "ঢাকার মিরপুরে ৫ শতাংশ বাণিজ্যিক জমি। সম্পূর্ণ যাচাইকৃত মালিকানা। প্রধান সড়কের ধারে, ব্যবসায়িক এলাকায় অবস্থিত।",
    asking_price: 8000000,
    price_per_decimal: 1600000,
    listing_status: "ACTIVE",
    ownership_verified: true,
    no_encumbrance: true,
    no_dispute: true,
    listing_approved: true,
    photos: ["/images/land-2.jpg"],
    show_exact_location: false,
    show_seller_name: true,
    allow_contact: true,
    view_count: 412,
    contact_request_count: 7,
    published_at: "2026-09-20T00:00:00Z",
  },
  {
    id: "l-3",
    parcel_id: "p-4",
    seller_citizen_id: "c-1",
    ownership_record_id: "o-4",
    title: "২২ শতাংশ কৃষি জমি, বোয়ালিয়া, রাজশাহী",
    description:
      "উর্বর কৃষি জমি। ধান ও সবজি চাষ উপযোগী। সেচ সুবিধা আছে। উত্তরাধিকারসূত্রে প্রাপ্ত, সম্পূর্ণ যাচাইকৃত।",
    asking_price: 1800000,
    price_per_decimal: 81818,
    listing_status: "ACTIVE",
    ownership_verified: true,
    no_encumbrance: true,
    no_dispute: true,
    listing_approved: true,
    photos: ["/images/land-3.jpg"],
    show_exact_location: false,
    show_seller_name: true,
    allow_contact: true,
    view_count: 89,
    contact_request_count: 1,
    published_at: "2026-10-10T00:00:00Z",
  },
];

// ============================================================
// Helpers — populate joined fields
// ============================================================

function populateMouza(parcel: LandParcel): LandParcel {
  return { ...parcel, mouza: MOUZAS.find((m) => m.id === parcel.mouza_id) };
}

function populateListing(listing: MarketplaceListing): MarketplaceListing {
  const parcel = PARCELS.find((p) => p.id === listing.parcel_id);
  const seller = CITIZENS.find((c) => c.id === listing.seller_citizen_id);
  const ownership = OWNERSHIP_RECORDS.find(
    (o) => o.id === listing.ownership_record_id
  );
  const khatian = KHATIANS.find((k) => k.parcel_id === listing.parcel_id);
  const deed = DEEDS.find((d) => d.parcel_id === listing.parcel_id);
  const mutation = MUTATIONS.find((m) => m.parcel_id === listing.parcel_id);
  const encumbrances = ENCUMBRANCES.filter(
    (e) => e.parcel_id === listing.parcel_id
  );

  return {
    ...listing,
    parcel: parcel ? populateMouza(parcel) : undefined,
    seller,
    ownership,
    khatian,
    deed,
    mutation,
    encumbrances,
  };
}

// ============================================================
// Exported query functions (mimic API calls)
// ============================================================

export function getListings(): MarketplaceListing[] {
  return LISTINGS.map(populateListing);
}

export function getListingById(id: string): MarketplaceListing | undefined {
  const listing = LISTINGS.find((l) => l.id === id);
  if (!listing) return undefined;
  return populateListing(listing);
}

export function getParcelsByOwner(citizenId: string): LandParcel[] {
  const parcelIds = OWNERSHIP_RECORDS.filter(
    (o) => o.citizen_id === citizenId && o.is_current
  ).map((o) => o.parcel_id);

  return PARCELS.filter((p) => parcelIds.includes(p.id)).map(populateMouza);
}

export function verifyDeed(deedNo: string): {
  found: boolean;
  deed?: Deed;
  hash_match?: boolean;
  parcel?: LandParcel;
  current_owner?: string;
} {
  const deed = DEEDS.find((d) => d.deed_no === deedNo);
  if (!deed) return { found: false };

  const parcel = PARCELS.find((p) => p.id === deed.parcel_id);
  const ownership = OWNERSHIP_RECORDS.find(
    (o) => o.parcel_id === deed.parcel_id && o.is_current
  );
  const owner = ownership
    ? CITIZENS.find((c) => c.id === ownership.citizen_id)
    : undefined;

  return {
    found: true,
    deed,
    hash_match:
      deed.document_hash !==
      "0000000000000000000000000000000000000000000000000000000000000000",
    parcel: parcel ? populateMouza(parcel) : undefined,
    current_owner: owner?.name_bn,
  };
}

export function getCitizenById(id: string): Citizen | undefined {
  return CITIZENS.find((c) => c.id === id);
}

export function getOwnershipByParcel(parcelId: string): OwnershipRecord[] {
  return OWNERSHIP_RECORDS.filter((o) => o.parcel_id === parcelId);
}

export function getEncumbrancesByParcel(parcelId: string): Encumbrance[] {
  return ENCUMBRANCES.filter((e) => e.parcel_id === parcelId && e.is_active);
}

// --- Stats ---
export function getStats() {
  return {
    total_parcels: PARCELS.length,
    verified_parcels: PARCELS.filter(
      (p) => p.verification_status === "VERIFIED"
    ).length,
    active_listings: LISTINGS.filter((l) => l.listing_status === "ACTIVE")
      .length,
    data_sources: DATA_SOURCES.length,
    total_citizens: CITIZENS.length,
  };
}

// --- Full source-level verification report ---

export function verifyDeedFull(deedNo: string): import("@/types").VerificationReport {
  const deed = DEEDS.find((d) => d.deed_no === deedNo);
  if (!deed) {
    return {
      found: false,
      encumbrances: [],
      hash_match: false,
      sources: [],
      final_score: 0,
      final_status: "UNVERIFIED",
    };
  }

  const parcel = PARCELS.find((p) => p.id === deed.parcel_id);
  const populatedParcel = parcel ? populateMouza(parcel) : undefined;
  const mouza = populatedParcel?.mouza;
  const khatian = KHATIANS.find((k) => k.parcel_id === deed.parcel_id);
  const mutation = MUTATIONS.find((m) => m.parcel_id === deed.parcel_id);
  const ownership = OWNERSHIP_RECORDS.find(
    (o) => o.parcel_id === deed.parcel_id && o.is_current
  );
  const encumbrances = ENCUMBRANCES.filter(
    (e) => e.parcel_id === deed.parcel_id && e.is_active
  );
  const buyer = deed.buyer_citizen_id
    ? CITIZENS.find((c) => c.id === deed.buyer_citizen_id)
    : undefined;
  const seller = deed.seller_citizen_id
    ? CITIZENS.find((c) => c.id === deed.seller_citizen_id)
    : undefined;

  const hashMatch =
    deed.document_hash !==
    "0000000000000000000000000000000000000000000000000000000000000000";

  // Build source-level checks
  const sources: import("@/types").SourceCheckResult[] = [];

  // 1. Sub-Registry (Deed)
  sources.push({
    source_name: "সাব-রেজিস্ট্রি অফিস",
    source_icon: "📜",
    found: true,
    pass: hashMatch,
    details: {
      "দলিল নং": deed.deed_no,
      "ধরণ": deed.deed_type,
      "ক্রেতা": deed.buyer_name_bn ?? "—",
      "বিক্রেতা": deed.seller_name_bn ?? "—",
      "নিবন্ধন তারিখ": deed.registration_date,
      "অফিস": deed.registration_office ?? "—",
      "ঘোষিত মূল্য": deed.declared_value ? `৳${deed.declared_value.toLocaleString()}` : "—",
      "হ্যাশ": deed.document_hash ? `${deed.document_hash.slice(0, 16)}...` : "—",
    },
    ...(!hashMatch
      ? {
          mismatch_field: "হ্যাশ",
          mismatch_reason: "ডকুমেন্ট হ্যাশ সন্দেহজনক — দলিল পরিবর্তিত হয়ে থাকতে পারে",
        }
      : {}),
  });

  // 2. AC Land — Khatian
  const khatianOwnerMatchesBuyer =
    khatian?.owner_citizen_id === deed.buyer_citizen_id;
  if (khatian) {
    sources.push({
      source_name: "এসি ল্যান্ড অফিস (খতিয়ান)",
      source_icon: "🏛",
      found: true,
      pass: khatianOwnerMatchesBuyer,
      details: {
        "খতিয়ান নং": khatian.khatian_no,
        "জরিপ": khatian.survey_type,
        "মালিকের নাম": khatian.owner_names_bn ?? "—",
        "পিতার নাম": khatian.father_names ?? "—",
        "অংশ": khatian.owner_share ?? "—",
        "রেকর্ডকৃত আয়তন": khatian.recorded_area ? `${khatian.recorded_area} শতাংশ` : "—",
      },
      ...(!khatianOwnerMatchesBuyer
        ? {
            mismatch_field: "মালিকের নাম",
            mismatch_reason: `খতিয়ানে "${khatian.owner_names_bn}" কিন্তু দলিলে ক্রেতা "${deed.buyer_name_bn}"`,
          }
        : {}),
    });
  } else {
    sources.push({
      source_name: "এসি ল্যান্ড অফিস (খতিয়ান)",
      source_icon: "🏛",
      found: false,
      pass: false,
      details: {},
      mismatch_reason: "এই দাগের জন্য কোনো খতিয়ান রেকর্ড পাওয়া যায়নি",
    });
  }

  // 3. AC Land — Mutation
  if (mutation) {
    const newOwner = mutation.new_owner_id
      ? CITIZENS.find((c) => c.id === mutation.new_owner_id)
      : undefined;
    const prevOwner = mutation.previous_owner_id
      ? CITIZENS.find((c) => c.id === mutation.previous_owner_id)
      : undefined;
    const mutationPass = mutation.status === "APPROVED";

    sources.push({
      source_name: "এসি ল্যান্ড অফিস (নামজারি)",
      source_icon: "🏛",
      found: true,
      pass: mutationPass,
      details: {
        "কেস নং": mutation.mutation_case_no,
        "স্ট্যাটাস": mutation.status,
        "পূর্ববর্তী মালিক": prevOwner?.name_bn ?? "—",
        "নতুন মালিক": newOwner?.name_bn ?? "—",
        "আবেদন তারিখ": mutation.applied_date ?? "—",
        "অনুমোদন তারিখ": mutation.approved_date ?? "—",
        "অফিসার": mutation.officer_name ?? "—",
      },
      ...(!mutationPass
        ? {
            mismatch_field: "স্ট্যাটাস",
            mismatch_reason: `নামজারি ${mutation.status} — অনুমোদিত নয়`,
          }
        : {}),
    });
  } else {
    sources.push({
      source_name: "এসি ল্যান্ড অফিস (নামজারি)",
      source_icon: "🏛",
      found: false,
      pass: false,
      details: {},
      mismatch_reason: "কোনো নামজারি রেকর্ড পাওয়া যায়নি — মালিকানা হস্তান্তর অসম্পূর্ণ",
    });
  }

  // 4. DLRS — Parcel / Mouza
  if (populatedParcel && mouza) {
    sources.push({
      source_name: "জরিপ অধিদপ্তর (DLRS)",
      source_icon: "🗺",
      found: true,
      pass: true,
      details: {
        "মৌজা": `${mouza.mouza_name_bn} (JL-${mouza.mouza_no})`,
        "দাগ নং": populatedParcel.dag_no,
        "আয়তন": `${populatedParcel.area_decimals} শতাংশ`,
        "জমির ধরণ": populatedParcel.land_type,
        "শ্রেণী": populatedParcel.land_class,
        "উপজেলা": mouza.upazila,
        "জেলা": mouza.district,
      },
    });
  }

  // 5. Banks — Mortgage check
  const bankEncumbrances = encumbrances.filter(
    (e) => e.encumbrance_type === "MORTGAGE" || e.encumbrance_type === "LIEN"
  );
  sources.push({
    source_name: "ব্যাংক ও আর্থিক প্রতিষ্ঠান",
    source_icon: "🏦",
    found: true,
    pass: bankEncumbrances.length === 0,
    details:
      bankEncumbrances.length === 0
        ? { "স্ট্যাটাস": "কোনো বন্ধক বা দায় নেই" }
        : Object.fromEntries(
            bankEncumbrances.map((e, i) => [
              `দায় ${i + 1}`,
              `${e.description} — ${e.institution_name}`,
            ])
          ),
    ...(bankEncumbrances.length > 0
      ? {
          mismatch_field: "দায় ১",
          mismatch_reason: "সক্রিয় বন্ধক/দায় পাওয়া গেছে — জমি দায়মুক্ত নয়",
        }
      : {}),
  });

  // 6. Courts — Dispute check
  const courtEncumbrances = encumbrances.filter(
    (e) =>
      e.encumbrance_type === "COURT_CASE" ||
      e.encumbrance_type === "INJUNCTION"
  );
  sources.push({
    source_name: "জেলা আদালত",
    source_icon: "⚖",
    found: true,
    pass: courtEncumbrances.length === 0,
    details:
      courtEncumbrances.length === 0
        ? { "স্ট্যাটাস": "কোনো সক্রিয় মামলা বা নিষেধাজ্ঞা নেই" }
        : Object.fromEntries(
            courtEncumbrances.map((e, i) => [
              `মামলা ${i + 1}`,
              `${e.case_no} — ${e.description}`,
            ])
          ),
    ...(courtEncumbrances.length > 0
      ? {
          mismatch_field: "মামলা ১",
          mismatch_reason: "সক্রিয় আদালত মামলা পাওয়া গেছে",
        }
      : {}),
  });

  // 7. DC Office — Acquisition check
  const dcEncumbrances = encumbrances.filter(
    (e) =>
      e.encumbrance_type === "ACQUISITION_NOTICE" ||
      e.encumbrance_type === "TAX_DUE"
  );
  sources.push({
    source_name: "ডিসি অফিস",
    source_icon: "🏢",
    found: true,
    pass: dcEncumbrances.length === 0,
    details:
      dcEncumbrances.length === 0
        ? { "স্ট্যাটাস": "কোনো অধিগ্রহণ নোটিশ নেই" }
        : Object.fromEntries(
            dcEncumbrances.map((e, i) => [
              `নোটিশ ${i + 1}`,
              `${e.description}`,
            ])
          ),
    ...(dcEncumbrances.length > 0
      ? {
          mismatch_field: "নোটিশ ১",
          mismatch_reason: "অধিগ্রহণ নোটিশ বা কর বকেয়া পাওয়া গেছে",
        }
      : {}),
  });

  return {
    found: true,
    deed,
    parcel: populatedParcel,
    khatian,
    mutation,
    ownership,
    encumbrances,
    buyer,
    seller,
    hash_match: hashMatch,
    sources,
    final_score: ownership?.verification_score ?? 0,
    final_status: ownership?.verification_status ?? "UNVERIFIED",
  };
}
