import Link from "next/link";
import { getListings, getStats } from "@/data/mock";
import {
  formatTaka,
  toBanglaDigits,
  LAND_TYPE_LABELS,
} from "@/lib/utils";
import type { MarketplaceListing, OwnershipVerificationStatus } from "@/types";

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

export default function HomePage() {
  const stats = getStats();
  const listings = getListings();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1 className="hero__title">
            জমির মালিকানা যাচাই করুন
          </h1>
          <p className="hero__subtitle">
            সরকারি ৭টি উৎস থেকে সংগৃহীত তথ্যের ভিত্তিতে জমির মালিকানা যাচাই, দলিল সত্যায়ন এবং নিরাপদ ক্রয়-বিক্রয়।
          </p>
          <div className="hero__actions">
            <Link href="/marketplace" className="btn btn--primary btn--lg">
              মার্কেটপ্লেস দেখুন
            </Link>
            <Link href="/verify" className="btn btn--secondary btn--lg">
              দলিল যাচাই করুন
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section--muted">
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

      {/* How it works */}
      <section className="section">
        <div className="container">
          <div className="section__header text-center">
            <h2 className="section__title">কিভাবে কাজ করে</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step__number">১</div>
              <h3 className="step__title">তথ্য সংগ্রহ</h3>
              <p className="step__desc">
                সাব-রেজিস্ট্রি, এসি ল্যান্ড, জরিপ বিভাগ, ব্যাংক ও আদালত থেকে তথ্য সংগ্রহ করা হয়।
              </p>
            </div>
            <div className="step">
              <div className="step__number">২</div>
              <h3 className="step__title">ক্রস-ভেরিফিকেশন</h3>
              <p className="step__desc">
                খতিয়ান, দলিল ও নামজারি রেকর্ড পরস্পর যাচাই করে মালিকানা স্কোর নির্ধারণ করা হয়।
              </p>
            </div>
            <div className="step">
              <div className="step__number">৩</div>
              <h3 className="step__title">যাচাইকৃত মার্কেটপ্লেস</h3>
              <p className="step__desc">
                শুধুমাত্র সম্পূর্ণ যাচাইকৃত ও দায়মুক্ত জমিই মার্কেটপ্লেসে তালিকাভুক্ত হতে পারে।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data sources */}
      <section className="section section--muted">
        <div className="container">
          <div className="section__header text-center">
            <h2 className="section__title">তথ্যের উৎস</h2>
            <p className="section__subtitle">সরকারি ৭টি বিভাগ থেকে সরাসরি তথ্য সংগৃহীত</p>
          </div>
          <div className="source-list">
            <span className="source-tag">এসি ল্যান্ড অফিস</span>
            <span className="source-tag">সাব-রেজিস্ট্রি অফিস</span>
            <span className="source-tag">ভূমি জরিপ অধিদপ্তর</span>
            <span className="source-tag">ব্যাংক ও আর্থিক প্রতিষ্ঠান</span>
            <span className="source-tag">জেলা জজ আদালত</span>
            <span className="source-tag">জেলা প্রশাসকের কার্যালয়</span>
            <span className="source-tag">জাতীয় পরিচয়পত্র শাখা</span>
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="section">
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
