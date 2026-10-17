import Link from "next/link";
import { getListings } from "@/data/mock";
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

export default function MarketplacePage() {
  const listings = getListings();

  return (
    <div className="container">
      <div className="section__header" style={{ paddingTop: "var(--s-8)" }}>
        <h1 className="section__title">মার্কেটপ্লেস</h1>
        <p className="section__subtitle">সরকারি তথ্যভিত্তিক যাচাইকৃত জমি</p>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <select className="input select" defaultValue="">
          <option value="">সকল জেলা</option>
          <option value="rajshahi">রাজশাহী</option>
          <option value="dhaka">ঢাকা</option>
          <option value="chittagong">চট্টগ্রাম</option>
        </select>
        <select className="input select" defaultValue="">
          <option value="">সকল ধরণ</option>
          <option value="RESIDENTIAL">আবাসিক</option>
          <option value="AGRICULTURAL">কৃষি</option>
          <option value="COMMERCIAL">বাণিজ্যিক</option>
        </select>
        <select className="input select" defaultValue="">
          <option value="">সাজানো</option>
          <option value="newest">নতুন আগে</option>
          <option value="price_asc">মূল্য: কম → বেশি</option>
          <option value="price_desc">মূল্য: বেশি → কম</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-muted mb-4" style={{ fontSize: "var(--text-sm)" }}>
        {toBanglaDigits(listings.length)}টি তালিকা পাওয়া গেছে
      </p>

      {/* Grid */}
      <div className="grid grid--3">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {listings.length === 0 && (
        <div className="empty-state">
          <div className="empty-state__icon">🔍</div>
          <p className="empty-state__text">কোনো তালিকা পাওয়া যায়নি</p>
        </div>
      )}

      <div style={{ height: "var(--s-16)" }} />
    </div>
  );
}
