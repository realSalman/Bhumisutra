"use client";

import { useState } from "react";
import { verifyDeedFull } from "@/data/mock";
import {
  toBanglaDigits,
  displayHash,
  DEED_TYPE_LABELS,
  LAND_TYPE_LABELS,
  MUTATION_STATUS_LABELS,
} from "@/lib/utils";
import type { VerificationReport, OwnershipVerificationStatus } from "@/types";

/* ------------------------------------------------------------------ */
/*  Architecture data for the visual explainer                        */
/* ------------------------------------------------------------------ */

const GOV_SOURCES = [
  { icon: "🏛", label: "এসি ল্যান্ড অফিস", what: "খতিয়ান, নামজারি" },
  { icon: "📜", label: "সাব-রেজিস্ট্রি", what: "দলিল নিবন্ধন" },
  { icon: "🗺", label: "জরিপ অধিদপ্তর (DLRS)", what: "মৌজা, দাগ ম্যাপ" },
  { icon: "🏦", label: "ব্যাংক", what: "বন্ধক, দায়" },
  { icon: "⚖", label: "জেলা আদালত", what: "মামলা, নিষেধাজ্ঞা" },
  { icon: "🏢", label: "ডিসি অফিস", what: "অধিগ্রহণ, খাস জমি" },
  { icon: "🪪", label: "NID কর্তৃপক্ষ", what: "নাগরিক পরিচয়" },
];

const POSITIVE_CHECKS = [
  { label: "সর্বশেষ খতিয়ানে (RS/BS) নাম আছে", source: "এসি ল্যান্ড / DLRS" },
  { label: "নিবন্ধিত দলিলে তার নাম", source: "সাব-রেজিস্ট্রি" },
  { label: "নামজারি অনুমোদিত", source: "এসি ল্যান্ড" },
];

const NEGATIVE_CHECKS = [
  { label: "কোনো সক্রিয় আদালত মামলা নেই", source: "আদালত" },
  { label: "কোনো বন্ধক বা দায় নেই", source: "ব্যাংক" },
  { label: "কোনো অধিগ্রহণ নোটিশ নেই", source: "ডিসি অফিস" },
  { label: "NID সব ডকুমেন্টে মিলছে", source: "NID কর্তৃপক্ষ" },
];

/* ------------------------------------------------------------------ */
/*  Label helpers                                                     */
/* ------------------------------------------------------------------ */

const STATUS_CONFIG: Record<OwnershipVerificationStatus, { label: string; cls: string; icon: string }> = {
  FULLY_VERIFIED: { label: "সম্পূর্ণ যাচাইকৃত", cls: "badge--verified", icon: "✓" },
  PARTIAL: { label: "আংশিক যাচাইকৃত", cls: "badge--partial", icon: "◐" },
  CONFLICT: { label: "বিরোধপূর্ণ", cls: "badge--conflict", icon: "✕" },
  UNVERIFIED: { label: "অযাচাইকৃত", cls: "badge--neutral", icon: "?" },
};

function formatDetailValue(key: string, value: string): string {
  if (key === "ধরণ" && value in DEED_TYPE_LABELS) return DEED_TYPE_LABELS[value as keyof typeof DEED_TYPE_LABELS];
  if (key === "জমির ধরণ" && value in LAND_TYPE_LABELS) return LAND_TYPE_LABELS[value as keyof typeof LAND_TYPE_LABELS];
  if (key === "স্ট্যাটাস" && value in MUTATION_STATUS_LABELS) return MUTATION_STATUS_LABELS[value as keyof typeof MUTATION_STATUS_LABELS];
  if (key === "শ্রেণী") {
    const map: Record<string, string> = { PRIVATE: "ব্যক্তিগত", KHAS_GOVT: "খাস", VESTED: "অর্পিত", ACQUIRED: "অধিগৃহীত" };
    return map[value] ?? value;
  }
  return value;
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function VerifyPage() {
  const [deedNo, setDeedNo] = useState("");
  const [report, setReport] = useState<VerificationReport | null>(null);
  const [searched, setSearched] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!deedNo.trim()) return;
    const res = verifyDeedFull(deedNo.trim());
    setReport(res);
    setSearched(true);
  }

  const sc = report ? STATUS_CONFIG[report.final_status] : null;

  return (
    <div className="container">

      {/* ── Deed verification form ── */}
      <section className="section section--muted" style={{ margin: "0 calc(-1 * var(--s-6))", padding: "var(--s-16) var(--s-6)" }}>
        <div className="verify-form">
          <h2 className="section__title">দলিল নম্বর দিয়ে যাচাই করুন</h2>
          <p className="section__subtitle mt-2">
            দলিল নম্বর দিন — সিস্টেম হ্যাশ ম্যাচ, মালিকানা রেকর্ড ও দায়মুক্তি পরীক্ষা করবে
          </p>

          <form onSubmit={handleSubmit} className="verify-form__input-group">
            <input
              type="text"
              className="input input--lg"
              placeholder="দলিল নম্বর লিখুন (যেমন: 789)"
              value={deedNo}
              onChange={(e) => setDeedNo(e.target.value)}
            />
            <button type="submit" className="btn btn--primary btn--lg">
              যাচাই
            </button>
          </form>

          <p style={{ fontSize: "var(--text-xs)", color: "var(--c-text-muted)", marginTop: "var(--s-4)" }}>
            ডেমো: 789 (যাচাইকৃত), 1456 (বিরোধপূর্ণ — জালিয়াতি), 2100 (হেবা দলিল) চেষ্টা করুন
          </p>
        </div>

        {/* ── Source-level verification results ── */}
        {searched && report && !report.found && (
          <div className="verify-result verify-result--fail" style={{ maxWidth: 700, margin: "var(--s-8) auto 0" }}>
            <div className="verify-result__title" style={{ color: "var(--c-conflict)" }}>
              ✕ দলিল পাওয়া যায়নি
            </div>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--c-text-secondary)", marginTop: "var(--s-2)" }}>
              এই নম্বরে কোনো দলিল ডাটাবেসে নেই। নম্বরটি পুনরায় যাচাই করুন।
            </p>
          </div>
        )}

        {searched && report && report.found && (
          <div className="source-report" style={{ maxWidth: 800, margin: "var(--s-8) auto 0" }}>
            {/* Final verdict */}
            <div className={`source-report__verdict ${report.final_status === "FULLY_VERIFIED" ? "source-report__verdict--pass" : "source-report__verdict--fail"}`}>
              <div className="source-report__verdict-left">
                <span className={`badge ${sc!.cls}`} style={{ fontSize: "var(--text-base)", padding: "var(--s-2) var(--s-4)" }}>
                  {sc!.icon} {sc!.label}
                </span>
                <span className="source-report__score">
                  স্কোর: <strong>{toBanglaDigits(report.final_score)}/১০০</strong>
                </span>
              </div>
              <div className="source-report__verdict-summary">
                {report.sources.filter((s) => s.pass).length}/{report.sources.length} উৎস পাস
              </div>
            </div>

            {/* Source cards */}
            {report.sources.map((src, idx) => (
              <div key={idx} className={`source-card ${src.pass ? "source-card--pass" : "source-card--fail"}`}>
                <div className="source-card__header">
                  <div className="source-card__title">
                    <span className="source-card__icon">{src.source_icon}</span>
                    <span>{src.source_name}</span>
                  </div>
                  <span className={`badge ${src.pass ? "badge--verified" : src.found ? "badge--conflict" : "badge--conflict"}`}>
                    {src.pass ? "✓ পাস" : src.found ? "✕ অমিল" : "✕ পাওয়া যায়নি"}
                  </span>
                </div>

                {!src.found && src.mismatch_reason && (
                  <div className="source-card__alert source-card__alert--error">
                    {src.mismatch_reason}
                  </div>
                )}

                {src.found && Object.keys(src.details).length > 0 && (
                  <div className="source-card__details">
                    {Object.entries(src.details).map(([key, val]) => (
                      <div
                        key={key}
                        className={`data-row ${key === src.mismatch_field ? "data-row--mismatch" : ""}`}
                      >
                        <span className="data-row__key">{key}</span>
                        <span className={`data-row__value ${key === "হ্যাশ" ? "data-row__value--mono" : ""}`}>
                          {formatDetailValue(key, val)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {src.found && src.mismatch_reason && (
                  <div className="source-card__alert source-card__alert--error">
                    ⚠ {src.mismatch_reason}
                  </div>
                )}
              </div>
            ))}

            {/* Hash integrity */}
            <div className={`source-card ${report.hash_match ? "source-card--pass" : "source-card--fail"}`}>
              <div className="source-card__header">
                <div className="source-card__title">
                  <span className="source-card__icon">🔐</span>
                  <span>ডকুমেন্ট ইন্টেগ্রিটি (SHA-256)</span>
                </div>
                <span className={`badge ${report.hash_match ? "badge--verified" : "badge--conflict"}`}>
                  {report.hash_match ? "✓ অপরিবর্তিত" : "✕ সন্দেহজনক"}
                </span>
              </div>
              {report.deed?.document_hash && (
                <div className="source-card__details">
                  <div className="data-row">
                    <span className="data-row__key">হ্যাশ</span>
                    <span className="data-row__value data-row__value--mono" style={{ fontSize: "11px" }}>
                      {displayHash(report.deed.document_hash)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
      {/* ── Visual Architecture Explainer ── */}
      <section className="section">
        <div className="section__header text-center">
          <p className="section__subtitle">
            একটি দলিল নম্বর দিলে ভূমিসূত্র ৭টি সরকারি উৎসের বিপরীতে ক্রস-ভেরিফাই করে ফলাফল দেখায়
          </p>
        </div>

        {/* --- Pipeline overview --- */}
        <div className="verify-pipeline">
          <div className="vp__step">
            <div className="vp__step-header">
              <span className="vp__step-num">১</span>
              <span className="vp__step-title">সরকারি ৭টি উৎস থেকে তথ্য সংগ্রহ</span>
            </div>
            <div className="vp__sources-grid">
              {GOV_SOURCES.map((s) => (
                <div key={s.label} className="vp__source-chip">
                  <span className="vp__source-chip-icon">{s.icon}</span>
                  <div>
                    <div className="vp__source-chip-name">{s.label}</div>
                    <div className="vp__source-chip-what">{s.what}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="vp__connector">
            <div className="vp__connector-line" />
            <span className="vp__connector-text">একীভূত ডাটাবেসে সংরক্ষণ</span>
            <div className="vp__connector-line" />
          </div>

          <div className="vp__step">
            <div className="vp__step-header">
              <span className="vp__step-num">২</span>
              <span className="vp__step-title">ক্রস-ভেরিফিকেশন</span>
            </div>
            <div className="vp__checks-wrap">
              <div className="vp__checks-col">
                <div className="vp__checks-heading">পজিটিভ চেক (৩টি মিলতে হবে)</div>
                {POSITIVE_CHECKS.map((c) => (
                  <div key={c.label} className="vp__check-row">
                    <span className="vp__check-icon vp__check-icon--pass">✓</span>
                    <span className="vp__check-label">{c.label}</span>
                    <span className="vp__check-source">{c.source}</span>
                  </div>
                ))}
              </div>
              <div className="vp__checks-col">
                <div className="vp__checks-heading">নেগেটিভ চেক (৪টি পাস করতে হবে)</div>
                {NEGATIVE_CHECKS.map((c) => (
                  <div key={c.label} className="vp__check-row">
                    <span className="vp__check-icon vp__check-icon--pass">✓</span>
                    <span className="vp__check-label">{c.label}</span>
                    <span className="vp__check-source">{c.source}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="vp__connector">
            <div className="vp__connector-line" />
            <span className="vp__connector-text">ফলাফল</span>
            <div className="vp__connector-line" />
          </div>

          <div className="vp__step">
            <div className="vp__step-header">
              <span className="vp__step-num">৩</span>
              <span className="vp__step-title">ভেরিফিকেশন রেজাল্ট</span>
            </div>
            <div className="vp__outcomes">
              <div className="vp__outcome vp__outcome--pass">
                <div className="vp__outcome-icon">✓</div>
                <div>
                  <div className="vp__outcome-title">সম্পূর্ণ যাচাইকৃত</div>
                  <div className="vp__outcome-desc">সব ৩ পজিটিভ + সব ৪ নেগেটিভ চেক পাস</div>
                </div>
              </div>
              <div className="vp__outcome vp__outcome--fail">
                <div className="vp__outcome-icon">✕</div>
                <div>
                  <div className="vp__outcome-title">বিরোধপূর্ণ / ব্লকড</div>
                  <div className="vp__outcome-desc">যেকোনো অমিল = মার্কেটপ্লেসে ব্লক</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
