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

/* ── Source card helper ── */

function SourceCard({
  icon,
  name,
  pass,
  children,
  alert,
}: {
  icon: string;
  name: string;
  pass: boolean;
  children: React.ReactNode;
  alert?: string;
}) {
  return (
    <div className={`source-card ${pass ? "source-card--pass" : "source-card--fail"}`}>
      <div className="source-card__header">
        <div className="source-card__title">
          <span className="source-card__icon">{icon}</span>
          <span>{name}</span>
        </div>
        <span className={`badge ${pass ? "badge--verified" : "badge--conflict"}`}>
          {pass ? "✓ পাস" : "✕ অমিল"}
        </span>
      </div>
      <div className="source-card__details">{children}</div>
      {alert && (
        <div className="source-card__alert source-card__alert--error">⚠ {alert}</div>
      )}
    </div>
  );
}

function DataRow({
  label,
  value,
  mono,
  mismatch,
}: {
  label: string;
  value: string;
  mono?: boolean;
  mismatch?: boolean;
}) {
  return (
    <div className={`data-row ${mismatch ? "data-row--mismatch" : ""}`}>
      <span className="data-row__key">{label}</span>
      <span className={`data-row__value ${mono ? "data-row__value--mono" : ""}`}>{value}</span>
    </div>
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

  const khatianOwnerMatch = khatian?.owner_citizen_id === listing.seller_citizen_id;
  const mutationPass = mutation?.status === "APPROVED";
  const hashMatch = deed?.document_hash !== "0000000000000000000000000000000000000000000000000000000000000000";

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

      {/* Description */}
      {listing.description && (
        <div className="detail-section">
          <p style={{ color: "var(--c-text-secondary)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)" }}>
            {listing.description}
          </p>
        </div>
      )}

      {/* Main content */}
      <div className="detail-grid">
        {/* Left column — source-level cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
          <h2 className="detail-section__title" style={{ marginBottom: 0 }}>
            ৭টি সরকারি উৎসের তথ্য
          </h2>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--c-text-muted)", marginTop: 0 }}>
            প্রতিটি তথ্য কোন সরকারি বিভাগ থেকে এসেছে তা দেখানো হয়েছে
          </p>

          {/* 1. Sub-Registry — Deed */}
          {deed ? (
            <SourceCard icon="📜" name="সাব-রেজিস্ট্রি অফিস" pass={!!hashMatch}>
              <DataRow label="দলিল নং" value={toBanglaDigits(deed.deed_no)} mono />
              <DataRow label="ধরণ" value={DEED_TYPE_LABELS[deed.deed_type]} />
              <DataRow label="নিবন্ধন তারিখ" value={formatDate(deed.registration_date)} />
              {deed.registration_office && <DataRow label="অফিস" value={deed.registration_office} />}
              {deed.buyer_name_bn && <DataRow label="ক্রেতা" value={deed.buyer_name_bn} />}
              {deed.seller_name_bn && <DataRow label="বিক্রেতা" value={deed.seller_name_bn} />}
              {deed.declared_value && <DataRow label="ঘোষিত মূল্য" value={formatTaka(deed.declared_value)} />}
              <DataRow label="হ্যাশ" value={deed.document_hash?.slice(0, 16) + "…"} mono mismatch={!hashMatch} />
            </SourceCard>
          ) : (
            <SourceCard icon="📜" name="সাব-রেজিস্ট্রি অফিস" pass={false} alert="কোনো দলিল রেকর্ড পাওয়া যায়নি">
              <div />
            </SourceCard>
          )}

          {/* 2. AC Land — Khatian */}
          {khatian ? (
            <SourceCard
              icon="🏛"
              name="এসি ল্যান্ড অফিস (খতিয়ান)"
              pass={khatianOwnerMatch}
              alert={!khatianOwnerMatch ? `খতিয়ানে "${khatian.owner_names_bn}" — বিক্রেতার সাথে মেলেনি` : undefined}
            >
              <DataRow label="খতিয়ান নং" value={toBanglaDigits(khatian.khatian_no)} mono />
              <DataRow label="জরিপ" value={SURVEY_TYPE_LABELS[khatian.survey_type]} />
              <DataRow label="মালিকের নাম" value={khatian.owner_names_bn ?? "—"} mismatch={!khatianOwnerMatch} />
              <DataRow label="পিতার নাম" value={khatian.father_names ?? "—"} />
              <DataRow label="অংশ" value={khatian.owner_share ?? "—"} />
              {khatian.recorded_area && <DataRow label="আয়তন" value={`${toBanglaDigits(khatian.recorded_area)} শতাংশ`} />}
              {khatian.issue_date && <DataRow label="ইস্যুর তারিখ" value={formatDate(khatian.issue_date)} />}
            </SourceCard>
          ) : (
            <SourceCard icon="🏛" name="এসি ল্যান্ড অফিস (খতিয়ান)" pass={false} alert="কোনো খতিয়ান রেকর্ড পাওয়া যায়নি">
              <div />
            </SourceCard>
          )}

          {/* 3. AC Land — Mutation */}
          {mutation ? (
            <SourceCard
              icon="🏛"
              name="এসি ল্যান্ড অফিস (নামজারি)"
              pass={mutationPass}
              alert={!mutationPass ? `নামজারি ${MUTATION_STATUS_LABELS[mutation.status]} — অনুমোদিত নয়` : undefined}
            >
              <DataRow label="কেস নং" value={mutation.mutation_case_no} mono />
              <DataRow label="অবস্থা" value={MUTATION_STATUS_LABELS[mutation.status]} mismatch={!mutationPass} />
              {mutation.applied_date && <DataRow label="আবেদন তারিখ" value={formatDate(mutation.applied_date)} />}
              {mutation.approved_date && <DataRow label="অনুমোদন তারিখ" value={formatDate(mutation.approved_date)} />}
              {mutation.officer_name && <DataRow label="অফিসার" value={mutation.officer_name} />}
            </SourceCard>
          ) : (
            <SourceCard icon="🏛" name="এসি ল্যান্ড অফিস (নামজারি)" pass={false} alert="কোনো নামজারি রেকর্ড নেই — মালিকানা হস্তান্তর অসম্পূর্ণ">
              <div />
            </SourceCard>
          )}

          {/* 4. DLRS — Parcel */}
          {parcel && mouza && (
            <SourceCard icon="🗺" name="জরিপ অধিদপ্তর (DLRS)" pass={true}>
              <DataRow label="মৌজা" value={`${mouza.mouza_name_bn} (JL-${toBanglaDigits(mouza.mouza_no)})`} />
              <DataRow label="দাগ নং" value={toBanglaDigits(parcel.dag_no)} mono />
              <DataRow label="আয়তন" value={`${toBanglaDigits(parcel.area_decimals ?? 0)} শতাংশ (${toBanglaDigits(parcel.area_sqft ?? 0)} বর্গফুট)`} />
              <DataRow label="ধরণ" value={LAND_TYPE_LABELS[parcel.land_type]} />
              <DataRow label="শ্রেণি" value={parcel.land_class === "PRIVATE" ? "ব্যক্তিগত" : parcel.land_class} />
              <DataRow label="উপজেলা" value={mouza.upazila} />
              <DataRow label="জেলা" value={mouza.district} />
            </SourceCard>
          )}

          {/* 5. Banks */}
          {(() => {
            const bankEnc = activeEncumbrances.filter((e) => e.encumbrance_type === "MORTGAGE" || e.encumbrance_type === "LIEN");
            return (
              <SourceCard
                icon="🏦"
                name="ব্যাংক ও আর্থিক প্রতিষ্ঠান"
                pass={bankEnc.length === 0}
                alert={bankEnc.length > 0 ? "সক্রিয় বন্ধক/দায় পাওয়া গেছে" : undefined}
              >
                {bankEnc.length === 0 ? (
                  <DataRow label="স্ট্যাটাস" value="কোনো বন্ধক বা দায় নেই" />
                ) : (
                  bankEnc.map((e, i) => (
                    <DataRow key={e.id} label={`দায় ${toBanglaDigits(i + 1)}`} value={`${e.description} — ${e.institution_name}`} mismatch />
                  ))
                )}
              </SourceCard>
            );
          })()}

          {/* 6. Courts */}
          {(() => {
            const courtEnc = activeEncumbrances.filter((e) => e.encumbrance_type === "COURT_CASE" || e.encumbrance_type === "INJUNCTION");
            return (
              <SourceCard
                icon="⚖"
                name="জেলা আদালত"
                pass={courtEnc.length === 0}
                alert={courtEnc.length > 0 ? "সক্রিয় আদালত মামলা পাওয়া গেছে" : undefined}
              >
                {courtEnc.length === 0 ? (
                  <DataRow label="স্ট্যাটাস" value="কোনো সক্রিয় মামলা বা নিষেধাজ্ঞা নেই" />
                ) : (
                  courtEnc.map((e, i) => (
                    <DataRow key={e.id} label={`মামলা ${toBanglaDigits(i + 1)}`} value={`${e.case_no} — ${e.description}`} mismatch />
                  ))
                )}
              </SourceCard>
            );
          })()}

          {/* 7. DC Office */}
          {(() => {
            const dcEnc = activeEncumbrances.filter((e) => e.encumbrance_type === "ACQUISITION_NOTICE" || e.encumbrance_type === "TAX_DUE");
            return (
              <SourceCard
                icon="🏢"
                name="ডিসি অফিস"
                pass={dcEnc.length === 0}
                alert={dcEnc.length > 0 ? "অধিগ্রহণ নোটিশ পাওয়া গেছে" : undefined}
              >
                {dcEnc.length === 0 ? (
                  <DataRow label="স্ট্যাটাস" value="কোনো অধিগ্রহণ নোটিশ নেই" />
                ) : (
                  dcEnc.map((e, i) => (
                    <DataRow key={e.id} label={`নোটিশ ${toBanglaDigits(i + 1)}`} value={e.description ?? "—"} mismatch />
                  ))
                )}
              </SourceCard>
            );
          })()}
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
            <DataRow label="বিক্রেতা" value={listing.seller?.name_bn ?? "—"} />
            <div className="data-row">
              <span className="data-row__key">NID যাচাই</span>
              <span className="data-row__value">
                <span className="badge badge--verified">✓ যাচাইকৃত</span>
              </span>
            </div>

            <div style={{ margin: "var(--s-6) 0", borderTop: "1px solid var(--c-border-light)" }} />

            {/* Verification summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
              <div style={{ fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", color: "var(--c-text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                উৎস-ভিত্তিক যাচাই
              </div>
              {[
                { name: "দলিল", pass: !!hashMatch },
                { name: "খতিয়ান", pass: ownership?.verified_by_khatian ?? false },
                { name: "নামজারি", pass: ownership?.verified_by_mutation ?? false },
                { name: "ব্যাংক", pass: activeEncumbrances.filter((e) => e.encumbrance_type === "MORTGAGE").length === 0 },
                { name: "আদালত", pass: activeEncumbrances.filter((e) => e.encumbrance_type === "COURT_CASE").length === 0 },
                { name: "ডিসি অফিস", pass: activeEncumbrances.filter((e) => e.encumbrance_type === "ACQUISITION_NOTICE").length === 0 },
              ].map((check) => (
                <div key={check.name} style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-sm)" }}>
                  <span>{check.name}</span>
                  <span style={{ color: check.pass ? "var(--c-verified)" : "var(--c-conflict)", fontWeight: "var(--weight-bold)" }}>
                    {check.pass ? "✓" : "✕"}
                  </span>
                </div>
              ))}
              {ownership && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--c-border-light)", paddingTop: "var(--s-2)", marginTop: "var(--s-1)" }}>
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--c-text-secondary)" }}>মোট স্কোর</span>
                  <span style={{ fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", fontFamily: "var(--font-mono)" }}>
                    {toBanglaDigits(ownership.verification_score)}/১০০
                  </span>
                </div>
              )}
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
            <DataRow label="দেখা হয়েছে" value={`${toBanglaDigits(listing.view_count)} বার`} />
            <DataRow label="যোগাযোগ অনুরোধ" value={`${toBanglaDigits(listing.contact_request_count)}টি`} />
            {listing.published_at && (
              <DataRow label="তালিকাভুক্ত" value={timeAgo(listing.published_at)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
