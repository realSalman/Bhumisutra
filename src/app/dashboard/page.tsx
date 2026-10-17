import Link from "next/link";
import { getParcelsByOwner, getListings } from "@/data/mock";
import { CITIZENS } from "@/data/mock";
import {
  toBanglaDigits,
  LAND_TYPE_LABELS,
  VERIFICATION_LABELS,
  PARCEL_STATUS_LABELS,
  formatTaka,
} from "@/lib/utils";

export default function DashboardPage() {
  // Prototype: hardcoded as citizen c-1 (Rahim Uddin)
  const citizen = CITIZENS[0];
  const parcels = getParcelsByOwner(citizen.id);
  const allListings = getListings();
  const myListings = allListings.filter(
    (l) => l.seller_citizen_id === citizen.id
  );

  return (
    <div className="container" style={{ paddingTop: "var(--s-8)" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "var(--s-6)",
          borderBottom: "1px solid var(--c-border-light)",
        }}
      >
        <div>
          <h1 className="section__title">
            স্বাগতম, {citizen.name_bn}
          </h1>
          <p className="text-muted" style={{ fontSize: "var(--text-sm)" }}>
            NID: {toBanglaDigits(citizen.nid_number)} ·{" "}
            <span className="badge badge--verified">✓ যাচাইকৃত</span>
          </p>
        </div>
        <Link href="/dashboard/create-listing" className="btn btn--primary">
          ➕ জমি তালিকাভুক্ত করুন
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid--3" style={{ paddingTop: "var(--s-6)" }}>
        <div
          className="card"
          style={{ padding: "var(--s-6)", textAlign: "center" }}
        >
          <div
            className="stat-block__value"
            style={{ fontSize: "var(--text-2xl)" }}
          >
            {toBanglaDigits(parcels.length)}
          </div>
          <div className="stat-block__label">আমার জমি</div>
        </div>
        <div
          className="card"
          style={{ padding: "var(--s-6)", textAlign: "center" }}
        >
          <div
            className="stat-block__value"
            style={{ fontSize: "var(--text-2xl)" }}
          >
            {toBanglaDigits(
              myListings.filter((l) => l.listing_status === "ACTIVE").length
            )}
          </div>
          <div className="stat-block__label">সক্রিয় তালিকা</div>
        </div>
        <div
          className="card"
          style={{ padding: "var(--s-6)", textAlign: "center" }}
        >
          <div
            className="stat-block__value"
            style={{ fontSize: "var(--text-2xl)" }}
          >
            {toBanglaDigits(
              myListings.reduce((sum, l) => sum + l.contact_request_count, 0)
            )}
          </div>
          <div className="stat-block__label">যোগাযোগ অনুরোধ</div>
        </div>
      </div>

      {/* My Land */}
      <div style={{ paddingTop: "var(--s-8)" }}>
        <h2
          className="section__title"
          style={{ fontSize: "var(--text-xl)", marginBottom: "var(--s-4)" }}
        >
          আমার জমি
        </h2>

        {parcels.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__text">
              আপনার নামে কোনো জমি পাওয়া যায়নি
            </p>
          </div>
        ) : (
          <div
            style={{
              border: "1px solid var(--c-border-light)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "var(--text-sm)",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "var(--c-bg-subtle)",
                    textAlign: "left",
                  }}
                >
                  <th style={{ padding: "var(--s-3) var(--s-4)", fontWeight: "var(--weight-medium)", color: "var(--c-text-secondary)" }}>
                    অবস্থান
                  </th>
                  <th style={{ padding: "var(--s-3) var(--s-4)", fontWeight: "var(--weight-medium)", color: "var(--c-text-secondary)" }}>
                    দাগ নং
                  </th>
                  <th style={{ padding: "var(--s-3) var(--s-4)", fontWeight: "var(--weight-medium)", color: "var(--c-text-secondary)" }}>
                    আয়তন
                  </th>
                  <th style={{ padding: "var(--s-3) var(--s-4)", fontWeight: "var(--weight-medium)", color: "var(--c-text-secondary)" }}>
                    ধরণ
                  </th>
                  <th style={{ padding: "var(--s-3) var(--s-4)", fontWeight: "var(--weight-medium)", color: "var(--c-text-secondary)" }}>
                    অবস্থা
                  </th>
                  <th style={{ padding: "var(--s-3) var(--s-4)", fontWeight: "var(--weight-medium)", color: "var(--c-text-secondary)" }}>
                    যাচাই
                  </th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((p) => (
                  <tr
                    key={p.id}
                    style={{ borderTop: "1px solid var(--c-border-light)" }}
                  >
                    <td style={{ padding: "var(--s-3) var(--s-4)" }}>
                      {p.mouza?.mouza_name_bn}, {p.mouza?.district}
                    </td>
                    <td
                      style={{
                        padding: "var(--s-3) var(--s-4)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {toBanglaDigits(p.dag_no)}
                    </td>
                    <td style={{ padding: "var(--s-3) var(--s-4)" }}>
                      {toBanglaDigits(p.area_decimals ?? 0)} শতাংশ
                    </td>
                    <td style={{ padding: "var(--s-3) var(--s-4)" }}>
                      {LAND_TYPE_LABELS[p.land_type]}
                    </td>
                    <td style={{ padding: "var(--s-3) var(--s-4)" }}>
                      <span
                        className={`badge ${
                          p.status === "CLEAR"
                            ? "badge--verified"
                            : "badge--conflict"
                        }`}
                      >
                        {PARCEL_STATUS_LABELS[p.status]}
                      </span>
                    </td>
                    <td style={{ padding: "var(--s-3) var(--s-4)" }}>
                      <span
                        className={`badge ${
                          p.verification_status === "VERIFIED"
                            ? "badge--verified"
                            : p.verification_status === "PARTIAL"
                            ? "badge--partial"
                            : "badge--conflict"
                        }`}
                      >
                        {VERIFICATION_LABELS[p.verification_status]}{" "}
                        {toBanglaDigits(p.verification_score)}/১০০
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* My Listings */}
      <div style={{ paddingTop: "var(--s-8)", paddingBottom: "var(--s-16)" }}>
        <h2
          className="section__title"
          style={{ fontSize: "var(--text-xl)", marginBottom: "var(--s-4)" }}
        >
          আমার তালিকা
        </h2>

        {myListings.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__text">
              আপনার কোনো তালিকা নেই
            </p>
          </div>
        ) : (
          <div className="grid grid--2">
            {myListings.map((listing) => (
              <div key={listing.id} className="card" style={{ padding: "var(--s-4)" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--weight-semibold)",
                      }}
                    >
                      {listing.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "var(--text-lg)",
                        fontWeight: "var(--weight-bold)",
                        marginTop: "var(--s-1)",
                      }}
                    >
                      {formatTaka(listing.asking_price)}
                    </p>
                  </div>
                  <span className="badge badge--verified">🟢 সক্রিয়</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "var(--s-4)",
                    marginTop: "var(--s-3)",
                    fontSize: "var(--text-xs)",
                    color: "var(--c-text-muted)",
                  }}
                >
                  <span>👁 {toBanglaDigits(listing.view_count)}</span>
                  <span>📨 {toBanglaDigits(listing.contact_request_count)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
