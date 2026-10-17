"use client";

import { useState } from "react";
import { verifyDeed } from "@/data/mock";
import {
  formatDate,
  toBanglaDigits,
  DEED_TYPE_LABELS,
  LAND_TYPE_LABELS,
  displayHash,
} from "@/lib/utils";

export default function VerifyPage() {
  const [deedNo, setDeedNo] = useState("");
  const [result, setResult] = useState<ReturnType<typeof verifyDeed> | null>(null);
  const [searched, setSearched] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!deedNo.trim()) return;
    const res = verifyDeed(deedNo.trim());
    setResult(res);
    setSearched(true);
  }

  return (
    <div className="container">
      <section className="section">
        <div className="verify-form">
          <h1 className="section__title">দলিল যাচাই করুন</h1>
          <p className="section__subtitle mt-2">
            দলিল নম্বর দিন এবং সরকারি ডাটাবেসে যাচাই করুন
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

          {/* Demo hint */}
          <p style={{ fontSize: "var(--text-xs)", color: "var(--c-text-muted)", marginTop: "var(--s-4)" }}>
            ডেমো: 789 (যাচাইকৃত), 1456 (অযাচাইকৃত), 2100 (হেবা দলিল) চেষ্টা করুন
          </p>
        </div>

        {/* Results */}
        {searched && result && (
          <div className={`verify-result ${result.found ? (result.hash_match ? "verify-result--success" : "verify-result--fail") : "verify-result--fail"}`}>
            {!result.found ? (
              <>
                <div className="verify-result__title" style={{ color: "var(--c-conflict)" }}>
                  ✕ দলিল পাওয়া যায়নি
                </div>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--c-text-secondary)", marginTop: "var(--s-2)" }}>
                  এই নম্বরে কোনো দলিল ডাটাবেসে নেই। নম্বরটি পুনরায় যাচাই করুন।
                </p>
              </>
            ) : (
              <>
                <div className="verify-result__title" style={{ color: result.hash_match ? "var(--c-verified)" : "var(--c-conflict)" }}>
                  {result.hash_match ? "✓ যাচাইকৃত দলিল" : "⚠ সন্দেহজনক দলিল"}
                </div>
                <div className="verify-result__details">
                  <div className="data-row">
                    <span className="data-row__key">দলিল নং</span>
                    <span className="data-row__value data-row__value--mono">{toBanglaDigits(result.deed!.deed_no)}</span>
                  </div>
                  <div className="data-row">
                    <span className="data-row__key">ধরণ</span>
                    <span className="data-row__value">{DEED_TYPE_LABELS[result.deed!.deed_type]}</span>
                  </div>
                  <div className="data-row">
                    <span className="data-row__key">নিবন্ধন তারিখ</span>
                    <span className="data-row__value">{formatDate(result.deed!.registration_date)}</span>
                  </div>
                  {result.deed!.registration_office && (
                    <div className="data-row">
                      <span className="data-row__key">অফিস</span>
                      <span className="data-row__value">{result.deed!.registration_office}</span>
                    </div>
                  )}
                  {result.deed!.buyer_name_bn && (
                    <div className="data-row">
                      <span className="data-row__key">ক্রেতা</span>
                      <span className="data-row__value">{result.deed!.buyer_name_bn}</span>
                    </div>
                  )}
                  {result.current_owner && (
                    <div className="data-row">
                      <span className="data-row__key">বর্তমান মালিক</span>
                      <span className="data-row__value">{result.current_owner}</span>
                    </div>
                  )}
                  {result.parcel && (
                    <>
                      <div className="data-row">
                        <span className="data-row__key">জমির ধরণ</span>
                        <span className="data-row__value">{LAND_TYPE_LABELS[result.parcel.land_type]}</span>
                      </div>
                      <div className="data-row">
                        <span className="data-row__key">আয়তন</span>
                        <span className="data-row__value">{toBanglaDigits(result.parcel.area_decimals ?? 0)} শতাংশ</span>
                      </div>
                    </>
                  )}
                  <div className="data-row">
                    <span className="data-row__key">হ্যাশ ম্যাচ</span>
                    <span className="data-row__value">
                      <span className={`badge ${result.hash_match ? "badge--verified" : "badge--conflict"}`}>
                        {result.hash_match ? "✓ অপরিবর্তিত" : "✕ পরিবর্তিত/সন্দেহজনক"}
                      </span>
                    </span>
                  </div>
                  {result.deed!.document_hash && (
                    <div className="data-row">
                      <span className="data-row__key">ডকুমেন্ট হ্যাশ</span>
                      <span className="data-row__value data-row__value--mono" style={{ fontSize: "11px" }}>
                        {displayHash(result.deed!.document_hash)}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
