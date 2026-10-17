export function generateStaticParams() { return getListings().map((l) => ({ id: l.id })); }

import { notFound } from "next/navigation";
import Link from "next/link";
import { getListingById, getListings } from "@/data/mock";
import {
  formatTaka,
  formatDate,
  toBanglaDigits,
  timeAgo,
  LAND_TYPE_LABELS,
  DEED_TYPE_LABELS,
  SURVEY_TYPE_LABELS,
  MUTATION_STATUS_LABELS,
} from "@/lib/utils";
import type { OwnershipVerificationStatus } from "@/types";

function VerificationBadge({ status, score }: { status: OwnershipVerificationStatus; score: number }) {
  const config: Record<OwnershipVerificationStatus, { label: string; cls: string; icon: string }> = {
    FULLY_VERIFIED: { label: "সম্পূর্ণ যাচাইকৃত", cls: "badge--verified", icon: "✓" },
    PARTIAL: { label: "আংশিক যাচাইকৃত", cls: "badge--partial", icon: "◐" },
    CONFLICT: { label: "বিরোধপূর্ণ", cls: "badge--conflict", icon: "✕" },
    UNVERIFIED: { label: "অযাচাইকৃত", cls: "badge--neutral", icon: "?" },
  };
  const c = config[status];
  return (
    <span className={`badge ${c.cls}`} style={{ fontSize: "var(--text-sm)", padding: "var(--s-1) var(--s-3)" }}>
      {c.icon} {c.label} — {toBanglaDigits(score)}/১০০
    </span>
  );
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();

  const mouza = listing.parcel?.mouza;
  const parcel = listing.parcel;
  const khatian = listing.khatian;
  const deed = listing.deed;
  const mutation = listing.mutation;
  const ownership = listing.ownership;
  const encumbrances = listing.encumbrances ?? [];
  const activeEncumbrances = encumbrances.filter((e) => e.is_active);

  return (
    <div className="container">
      {/* Breadcrumb */}
      <div className="detail-header">
        <div className="detail-header__breadcrumb">
          <Link href="/marketplace">মার্কেটপ্লেস</Link> / তালিকা
        </div>
        <h1 className="detail-header__title">{listing.title}</h1>
        {mouza && (
          <p className="detail-header__location">
            📍 {mouza.mouza_name_bn}, {mouza.upazila}, {mouza.district}, {mouza.division}
          </p>
        )}
        <div className="mt-4" style={{ display: "flex", gap: "var(--s-2)", flexWrap: "wrap" }}>
          {ownership && (
            <VerificationBadge status={ownership.verification_status} score={ownership.verification_score} />
          )}
          {parcel && (
            <span className="badge badge--neutral" style={{ fontSize: "var(--text-sm)", padding: "var(--s-1) var(--s-3)" }}>
              {LAND_TYPE_LABELS[parcel.land_type]}
            </span>
          )}
          {activeEncumbrances.length === 0 ? (
            <span className="badge badge--verified" style={{ fontSize: "var(--text-sm)", padding: "var(--s-1) var(--s-3)" }}>
              ✓ দায়মুক্ত
            </span>
          ) : (
            <span className="badge badge--conflict" style={{ fontSize: "var(--text-sm)", padding: "var(--s-1) var(--s-3)" }}>
              ✕ দায়বদ্ধ ({toBanglaDigits(activeEncumbrances.length)})
            </span>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="detail-grid">
        {/* Left column */}
        <div>
          {/* Description */}
          {listing.description && (
            <div className="detail-section">
              <h2 className="detail-section__title">বিবরণ</h2>
              <p style={{ color: "var(--c-text-secondary)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)" }}>
                {listing.description}
              </p>
            </div>
          )}

          {/* Land info */}
          <div className="detail-section">
            <h2 className="detail-section__title">জমির তথ্য</h2>
            <div className="data-row">
              <span className="data-row__key">মৌজা</span>
              <span className="data-row__value">{mouza?.mouza_name_bn} (জে.এল. নং {toBanglaDigits(mouza?.mouza_no ?? "")})</span>
            </div>
            <div className="data-row">
              <span className="data-row__key">দাগ নং</span>
              <span className="data-row__value data-row__value--mono">{toBanglaDigits(parcel?.dag_no ?? "")}</span>
            </div>
            <div className="data-row">
              <span className="data-row__key">আয়তন</span>
              <span className="data-row__value">{toBanglaDigits(parcel?.area_decimals ?? 0)} শতাংশ ({toBanglaDigits(parcel?.area_sqft ?? 0)} বর্গফুট)</span>
            </div>
            <div className="data-row">
              <span className="data-row__key">ধরণ</span>
              <span className="data-row__value">{LAND_TYPE_LABELS[parcel?.land_type ?? "OTHER"]}</span>
            </div>
            <div className="data-row">
              <span className="data-row__key">শ্রেণি</span>
              <span className="data-row__value">{parcel?.land_class === "PRIVATE" ? "ব্যক্তিগত" : parcel?.land_class}</span>
            </div>
          </div>

          {/* Khatian */}
          {khatian && (
            <div className="detail-section">
              <h2 className="detail-section__title">খতিয়ান তথ্য</h2>
              <div className="data-row">
                <span className="data-row__key">খতিয়ান নং</span>
                <span className="data-row__value data-row__value--mono">{toBanglaDigits(khatian.khatian_no)}</span>
              </div>
              <div className="data-row">
                <span className="data-row__key">জরিপ</span>
                <span className="data-row__value">{SURVEY_TYPE_LABELS[khatian.survey_type]}</span>
              </div>
              <div className="data-row">
                <span className="data-row__key">মালিকের নাম</span>
                <span className="data-row__value">{khatian.owner_names_bn}</span>
              </div>
              <div className="data-row">
                <span className="data-row__key">অংশ</span>
                <span className="data-row__value">{khatian.owner_share}</span>
              </div>
              {khatian.issue_date && (
                <div className="data-row">
                  <span className="data-row__key">ইস্যুর তারিখ</span>
                  <span className="data-row__value">{formatDate(khatian.issue_date)}</span>
                </div>
              )}
            </div>
          )}

          {/* Deed */}
          {deed && (
            <div className="detail-section">
              <h2 className="detail-section__title">দলিল তথ্য</h2>
              <div className="data-row">
                <span className="data-row__key">দলিল নং</span>
                <span className="data-row__value data-row__value--mono">{toBanglaDigits(deed.deed_no)}</span>
              </div>
              <div className="data-row">
                <span className="data-row__key">ধরণ</span>
                <span className="data-row__value">{DEED_TYPE_LABELS[deed.deed_type]}</span>
              </div>
              <div className="data-row">
                <span className="data-row__key">নিবন্ধন তারিখ</span>
                <span className="data-row__value">{formatDate(deed.registration_date)}</span>
              </div>
              {deed.registration_office && (
                <div className="data-row">
                  <span className="data-row__key">নিবন্ধন অফিস</span>
                  <span className="data-row__value">{deed.registration_office}</span>
                </div>
              )}
              {deed.buyer_name_bn && (
                <div className="data-row">
                  <span className="data-row__key">ক্রেতা</span>
                  <span className="data-row__value">{deed.buyer_name_bn}</span>
                </div>
              )}
              <div className="data-row">
                <span className="data-row__key">ডকুমেন্ট হ্যাশ</span>
                <span className="data-row__value data-row__value--mono" style={{ fontSize: "11px" }}>
                  {deed.document_hash?.slice(0, 16)}…
                </span>
              </div>
            </div>
          )}

          {/* Mutation */}
          <div className="detail-section">
            <h2 className="detail-section__title">নামজারি তথ্য</h2>
            {mutation ? (
              <>
                <div className="data-row">
                  <span className="data-row__key">কেস নং</span>
                  <span className="data-row__value data-row__value--mono">{mutation.mutation_case_no}</span>
                </div>
                <div className="data-row">
                  <span className="data-row__key">অবস্থা</span>
                  <span className="data-row__value">
                    <span className={`badge ${mutation.status === "APPROVED" ? "badge--verified" : "badge--partial"}`}>
                      {MUTATION_STATUS_LABELS[mutation.status]}
                    </span>
                  </span>
                </div>
                {mutation.approved_date && (
                  <div className="data-row">
                    <span className="data-row__key">অনুমোদনের তারিখ</span>
                    <span className="data-row__value">{formatDate(mutation.approved_date)}</span>
                  </div>
                )}
              </>
            ) : (
              <p style={{ color: "var(--c-conflict)", fontSize: "var(--text-sm)" }}>
                ✕ কোনো নামজারি রেকর্ড পাওয়া যায়নি
              </p>
            )}
          </div>

          {/* Verification breakdown */}
          {ownership && (
            <div className="detail-section">
              <h2 className="detail-section__title">যাচাই বিবরণ</h2>
              <div className="verification-breakdown">
                <div className="verification-row">
                  <span className="verification-row__label">দলিল যাচাই</span>
                  <span className={`verification-row__status ${ownership.verified_by_deed ? "verification-row__status--pass" : "verification-row__status--fail"}`}>
                    {ownership.verified_by_deed ? "✓ মিলেছে" : "✕ মেলেনি"}
                  </span>
                </div>
                <div className="verification-row">
                  <span className="verification-row__label">খতিয়ান যাচাই</span>
                  <span className={`verification-row__status ${ownership.verified_by_khatian ? "verification-row__status--pass" : "verification-row__status--fail"}`}>
                    {ownership.verified_by_khatian ? "✓ মিলেছে" : "✕ মেলেনি"}
                  </span>
                </div>
                <div className="verification-row">
                  <span className="verification-row__label">নামজারি যাচাই</span>
                  <span className={`verification-row__status ${ownership.verified_by_mutation ? "verification-row__status--pass" : "verification-row__status--fail"}`}>
                    {ownership.verified_by_mutation ? "✓ মিলেছে" : "✕ মেলেনি"}
                  </span>
                </div>
              </div>
              <div className="mt-4" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "var(--text-sm)", color: "var(--c-text-secondary)" }}>মোট স্কোর</span>
                <span style={{ fontSize: "var(--text-xl)", fontWeight: "var(--weight-bold)", fontFamily: "var(--font-mono)" }}>
                  {toBanglaDigits(ownership.verification_score)}/১০০
                </span>
              </div>
            </div>
          )}

          {/* Encumbrances */}
          {activeEncumbrances.length > 0 && (
            <div className="detail-section">
              <h2 className="detail-section__title">দায়বদ্ধতা</h2>
              {activeEncumbrances.map((e) => (
                <div key={e.id} style={{ padding: "var(--s-3) var(--s-4)", background: "var(--c-conflict-bg)", borderRadius: "var(--radius-sm)", marginBottom: "var(--s-2)" }}>
                  <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--c-conflict)" }}>
                    {e.encumbrance_type === "COURT_CASE" ? "আদালতে মামলা" :
                     e.encumbrance_type === "MORTGAGE" ? "বন্ধক" :
                     e.encumbrance_type}
                  </div>
                  {e.description && (
                    <p style={{ fontSize: "var(--text-xs)", color: "var(--c-text-secondary)", marginTop: "var(--s-1)" }}>
                      {e.description}
                    </p>
                  )}
                  {e.case_no && (
                    <p style={{ fontSize: "var(--text-xs)", color: "var(--c-text-muted)", marginTop: "var(--s-1)", fontFamily: "var(--font-mono)" }}>
                      কেস: {e.case_no}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="detail-sidebar">
          <div className="detail-sidebar__card">
            <div className="detail-sidebar__price">
              {formatTaka(listing.asking_price)}
            </div>
            {listing.price_per_decimal && (
              <div className="detail-sidebar__price-per">
                {formatTaka(listing.price_per_decimal)}/শতাংশ
              </div>
            )}

            <div style={{ margin: "var(--s-6) 0", borderTop: "1px solid var(--c-border-light)" }} />

            {/* Seller info */}
            <div className="data-row">
              <span className="data-row__key">বিক্রেতা</span>
              <span className="data-row__value">{listing.seller?.name_bn}</span>
            </div>
            <div className="data-row">
              <span className="data-row__key">NID যাচাই</span>
              <span className="data-row__value">
                <span className="badge badge--verified">✓ যাচাইকৃত</span>
              </span>
            </div>

            <div style={{ margin: "var(--s-6) 0", borderTop: "1px solid var(--c-border-light)" }} />

            {/* Quick checks */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-sm)" }}>
                <span>মালিকানা যাচাই</span>
                <span style={{ color: listing.ownership_verified ? "var(--c-verified)" : "var(--c-conflict)" }}>
                  {listing.ownership_verified ? "✓" : "✕"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-sm)" }}>
                <span>দায়মুক্ত</span>
                <span style={{ color: listing.no_encumbrance ? "var(--c-verified)" : "var(--c-conflict)" }}>
                  {listing.no_encumbrance ? "✓" : "✕"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-sm)" }}>
                <span>বিরোধমুক্ত</span>
                <span style={{ color: listing.no_dispute ? "var(--c-verified)" : "var(--c-conflict)" }}>
                  {listing.no_dispute ? "✓" : "✕"}
                </span>
              </div>
            </div>

            <button className="btn btn--primary btn--lg mt-6" style={{ width: "100%" }}>
              যোগাযোগের অনুরোধ
            </button>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--c-text-muted)", textAlign: "center", marginTop: "var(--s-2)" }}>
              বিক্রেতার অনুমোদনের পর ফোন নম্বর দেখানো হবে
            </p>
          </div>

          {/* Stats */}
          <div style={{ marginTop: "var(--s-4)", padding: "var(--s-4)", border: "1px solid var(--c-border-light)", borderRadius: "var(--radius-md)" }}>
            <div className="data-row">
              <span className="data-row__key">দেখা হয়েছে</span>
              <span className="data-row__value">{toBanglaDigits(listing.view_count)} বার</span>
            </div>
            <div className="data-row">
              <span className="data-row__key">যোগাযোগ অনুরোধ</span>
              <span className="data-row__value">{toBanglaDigits(listing.contact_request_count)}টি</span>
            </div>
            {listing.published_at && (
              <div className="data-row">
                <span className="data-row__key">তালিকাভুক্ত</span>
                <span className="data-row__value">{timeAgo(listing.published_at)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
