import Link from "next/link";
import { getListings, getStats } from "@/data/mock";
import {
  formatTaka,
  toBanglaDigits,
  LAND_TYPE_LABELS,
} from "@/lib/utils";
import type { MarketplaceListing, OwnershipVerificationStatus } from "@/types";

/* ------------------------------------------------------------------ */
/*  Small reusable pieces                                             */
/* ------------------------------------------------------------------ */

function VerificationBadge({ status, score }: { status: OwnershipVerificationStatus; score: number }) {
  const config: Record<OwnershipVerificationStatus, { label: string; cls: string; icon: string }> = {
    FULLY_VERIFIED: { label: "যাচাইকৃত", cls: "badge--verified", icon: "✓" },
    PARTIAL: { label: "আংশিক", cls: "badge--partial", icon: "◐" },
    CONFLICT: { label: "বিরোধ", cls: "badge--conflict", icon: "✕" },
    UNVERIFIED: { label: "অযাচাইকৃত", cls: "badge--neutral", icon: "?" },
  };
  const c = config[status];
  return (
    <span className={`badge ${c.cls}`}>
      {c.icon} {c.label} {toBanglaDigits(score)}/১০০
    </span>
  );
}

function ListingCard({ listing }: { listing: MarketplaceListing }) {
  const mouza = listing.parcel?.mouza;
  const landType = listing.parcel?.land_type;

  return (
    <Link href={`/listing/${listing.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <article className="card listing-card">
        <div className="listing-card__image-wrap">
          <div className="listing-card__image-placeholder">⛶</div>
          <div className="listing-card__badges">
            {listing.ownership && (
              <VerificationBadge
                status={listing.ownership.verification_status}
                score={listing.ownership.verification_score}
              />
            )}
            {landType && (
              <span className="badge badge--neutral">{LAND_TYPE_LABELS[landType]}</span>
            )}
          </div>
        </div>
        <div className="listing-card__body">
          <h3 className="listing-card__title">{listing.title}</h3>
          {mouza && (
            <p className="listing-card__location">
              📍 {mouza.mouza_name_bn}, {mouza.upazila}, {mouza.district}
            </p>
          )}
          <p className="listing-card__price">{formatTaka(listing.asking_price)}</p>
          <div className="listing-card__meta">
            <span>{toBanglaDigits(listing.parcel?.area_decimals ?? 0)} শতাংশ</span>
            <span>{toBanglaDigits(listing.view_count)} বার দেখা হয়েছে</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Architecture diagram data                                         */
/* ------------------------------------------------------------------ */

const GOV_SOURCES = [
  { icon: "🏛", label: "এসি ল্যান্ড অফিস", sub: "খতিয়ান, নামজারি", en: "AC Land" },
  { icon: "📜", label: "সাব-রেজিস্ট্রি", sub: "দলিল নিবন্ধন", en: "Sub-Registry" },
  { icon: "🗺", label: "জরিপ অধিদপ্তর", sub: "মৌজা, দাগ ম্যাপ", en: "DLRS" },
  { icon: "🏦", label: "ব্যাংক", sub: "বন্ধক, দায়", en: "Banks" },
  { icon: "⚖", label: "জেলা আদালত", sub: "মামলা, নিষেধাজ্ঞা", en: "Courts" },
  { icon: "🏢", label: "ডিসি অফিস", sub: "অধিগ্রহণ, খাস জমি", en: "DC Office" },
  { icon: "🪪", label: "NID কর্তৃপক্ষ", sub: "নাগরিক পরিচয়", en: "NID Authority" },
];

const DB_TABLES = [
  "mouzas", "land_parcels", "khatians",
  "deeds", "mutations", "encumbrances",
  "citizens", "ownership_records",
];

const CHECKS = [
  { icon: "✓", label: "খতিয়ান মিল", en: "Khatian match" },
  { icon: "✓", label: "দলিল মিল", en: "Deed match" },
  { icon: "✓", label: "নামজারি মিল", en: "Mutation match" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const stats = getStats();
  const listings = getListings();

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="container">
          <p className="hero__title">
            সরকারি ৭টি উৎস থেকে সংগৃহীত তথ্যের ভিত্তিতে জমির মালিকানা যাচাই এবং নিরাপদ ক্রয়-বিক্রয়।
          </p>
          <div className="hero__actions">
            <Link href="/marketplace" className="btn btn--primary btn--lg">
              মার্কেটপ্লেস দেখুন
            </Link>
            <Link href="/verify" className="btn btn--secondary btn--lg">
              মালিকানা যাচাই করুন
            </Link>
          </div>
        </div>
      </section>

      {/* ── Architecture pipeline — the visual "how it works" ── */}
      <section className="section section--muted">
        <div className="container">
          <div className="section__header text-center">
            <h2 className="section__title">কিভাবে কাজ করে</h2>
            <p className="section__subtitle">
              সরকারি ৭টি বিভাগের তথ্য → এক ডাটাবেসে একত্রিত → ক্রস-ভেরিফিকেশন → যাচাইকৃত মার্কেটপ্লেস
            </p>
          </div>

          <div className="arch">
            {/* ── Layer 1: Government Sources ── */}
            <div className="arch__layer">
              <div className="arch__layer-label">
                <span className="arch__layer-num">১</span>
                সরকারি উৎস
              </div>
              <div className="arch__sources">
                {GOV_SOURCES.map((s) => (
                  <div key={s.en} className="arch__source-node">
                    <span className="arch__source-icon">{s.icon}</span>
                    <span className="arch__source-name">{s.label}</span>
                    <span className="arch__source-sub">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Arrow ── */}
            <div className="arch__arrow">
              <div className="arch__arrow-line" />
              <div className="arch__arrow-label">তথ্য সংগ্রহ</div>
              <div className="arch__arrow-head">▼</div>
            </div>

            {/* ── Layer 2: Unified Database ── */}
            <div className="arch__layer arch__layer--db">
              <div className="arch__layer-label">
                <span className="arch__layer-num">২</span>
                একীভূত ডাটাবেস
              </div>
              <div className="arch__db-tables">
                {DB_TABLES.map((t) => (
                  <code key={t} className="arch__table-tag">{t}</code>
                ))}
              </div>
              <div className="arch__db-golden">
                <span className="arch__golden-icon">★</span>
                <span>ownership_records — গোল্ডেন টেবিল</span>
              </div>
            </div>

            {/* ── Arrow ── */}
            <div className="arch__arrow">
              <div className="arch__arrow-line" />
              <div className="arch__arrow-label">ক্রস-রেফারেন্স</div>
              <div className="arch__arrow-head">▼</div>
            </div>

            {/* ── Layer 3: Verification Engine ── */}
            <div className="arch__layer arch__layer--verify">
              <div className="arch__layer-label">
                <span className="arch__layer-num">৩</span>
                ভেরিফিকেশন ইঞ্জিন
              </div>
              <div className="arch__checks">
                {CHECKS.map((c) => (
                  <div key={c.en} className="arch__check-item">
                    <span className="arch__check-icon">{c.icon}</span>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
              <div className="arch__verify-rule">
                ৩/৩ মিলে গেলে = <strong className="arch__pass">সম্পূর্ণ যাচাইকৃত ✓</strong>
                {" · "}
                কোনো অমিল = <strong className="arch__fail">বিরোধপূর্ণ ✕</strong>
              </div>
            </div>

            {/* ── Arrow ── */}
            <div className="arch__arrow">
              <div className="arch__arrow-line" />
              <div className="arch__arrow-label">অনুমোদিত</div>
              <div className="arch__arrow-head">▼</div>
            </div>

            {/* ── Layer 4: Output ── */}
            <div className="arch__layer arch__layer--output">
              <div className="arch__outputs">
                <div className="arch__output-node arch__output-node--market">
                  <span className="arch__output-icon">🛒</span>
                  <span className="arch__output-name">যাচাইকৃত মার্কেটপ্লেস</span>
                  <span className="arch__output-sub">শুধু verified জমি তালিকাভুক্ত</span>
                </div>
                <div className="arch__output-node arch__output-node--dash">
                  <span className="arch__output-icon">👤</span>
                  <span className="arch__output-name">নাগরিক ড্যাশবোর্ড</span>
                  <span className="arch__output-sub">NID-ভিত্তিক মালিকানা প্রোফাইল</span>
                </div>
                <div className="arch__output-node arch__output-node--verify">
                  <span className="arch__output-icon">🔍</span>
                  <span className="arch__output-name">দলিল যাচাই</span>
                  <span className="arch__output-sub">হ্যাশ ম্যাচ, মালিকানা চেক</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section">
        <div className="container">
          <div className="stat-bar">
            <div className="stat-block">
              <div className="stat-block__value">{toBanglaDigits(stats.total_parcels)}</div>
              <div className="stat-block__label">মোট পার্সেল</div>
            </div>
            <div className="stat-block">
              <div className="stat-block__value">{toBanglaDigits(stats.verified_parcels)}</div>
              <div className="stat-block__label">যাচাইকৃত</div>
            </div>
            <div className="stat-block">
              <div className="stat-block__value">{toBanglaDigits(stats.active_listings)}</div>
              <div className="stat-block__label">সক্রিয় তালিকা</div>
            </div>
            <div className="stat-block">
              <div className="stat-block__value">{toBanglaDigits(stats.data_sources)}</div>
              <div className="stat-block__label">সরকারি উৎস</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured listings ── */}
      <section className="section section--muted">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">সাম্প্রতিক তালিকা</h2>
            <p className="section__subtitle">যাচাইকৃত জমি বিক্রয়ের জন্য উপলব্ধ</p>
          </div>
          <div className="grid grid--3">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/marketplace" className="btn btn--secondary">
              সব তালিকা দেখুন →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
