import { DATA_SOURCES } from "@/data/mock";
import { toBanglaDigits } from "@/lib/utils";

export default function AboutPage() {
  return (
    <div className="container container--narrow">
      <section className="section">
        <h1 className="section__title">ভূমিসূত্র সম্পর্কে</h1>
        <p className="section__subtitle mt-2">
          বাংলাদেশের ভূমি ব্যবস্থাপনায় স্বচ্ছতা ও নিরাপত্তা আনতে একটি
          সমন্বিত ডিজিটাল প্ল্যাটফর্ম।
        </p>

        <div className="detail-section">
          <h2 className="detail-section__title">সমস্যা</h2>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--c-text-secondary)", lineHeight: "var(--leading-normal)" }}>
            বাংলাদেশে ভূমি সংক্রান্ত তথ্য বিভিন্ন মন্ত্রণালয় ও বিভাগে
            বিচ্ছিন্নভাবে সংরক্ষিত। একজন নাগরিককে জমি কেনার আগে সাব-রেজিস্ট্রি,
            এসি ল্যান্ড, জরিপ অফিস, ব্যাংক ও আদালতে আলাদাভাবে যাচাই করতে হয়।
            এই জটিলতা জালিয়াতি, দ্বৈত বিক্রয় ও ভুয়া দলিলের সুযোগ তৈরি করে।
          </p>
        </div>

        <div className="detail-section">
          <h2 className="detail-section__title">সমাধান</h2>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--c-text-secondary)", lineHeight: "var(--leading-normal)" }}>
            ভূমিসূত্র সরকারি ৭টি উৎস থেকে তথ্য সংগ্রহ করে একটি সমন্বিত
            ডাটাবেসে সংরক্ষণ করে। খতিয়ান, দলিল ও নামজারি রেকর্ড পরস্পর
            ক্রস-ভেরিফাই করে মালিকানার নির্ভুলতা নিশ্চিত করা হয়। শুধুমাত্র
            সম্পূর্ণ যাচাইকৃত ও দায়মুক্ত জমিই মার্কেটপ্লেসে তালিকাভুক্ত হতে পারে।
          </p>
        </div>

        <div className="detail-section">
          <h2 className="detail-section__title">তথ্যের উৎস</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
            {DATA_SOURCES.map((source) => (
              <div key={source.id} className="data-row">
                <span className="data-row__key">{source.ministry}</span>
                <span className="data-row__value">{source.source_name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h2 className="detail-section__title">যাচাই পদ্ধতি</h2>
          <div className="verification-breakdown">
            <div className="verification-row">
              <span className="verification-row__label">দলিল যাচাই (সাব-রেজিস্ট্রি)</span>
              <span className="verification-row__status verification-row__status--pass">+{toBanglaDigits(34)} পয়েন্ট</span>
            </div>
            <div className="verification-row">
              <span className="verification-row__label">খতিয়ান যাচাই (এসি ল্যান্ড/জরিপ)</span>
              <span className="verification-row__status verification-row__status--pass">+{toBanglaDigits(33)} পয়েন্ট</span>
            </div>
            <div className="verification-row">
              <span className="verification-row__label">নামজারি যাচাই (এসি ল্যান্ড)</span>
              <span className="verification-row__status verification-row__status--pass">+{toBanglaDigits(33)} পয়েন্ট</span>
            </div>
          </div>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--c-text-muted)", marginTop: "var(--s-3)" }}>
            তিনটি উৎসেরই মিল = ১০০/১০০ = সম্পূর্ণ যাচাইকৃত ✓
          </p>
        </div>
      </section>
    </div>
  );
}
