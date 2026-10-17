"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [nid, setNid] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Prototype: just redirect to dashboard
    if (nid && password) {
      window.location.href = "/dashboard";
    }
  }

  return (
    <div className="container" style={{ maxWidth: "400px", paddingTop: "var(--s-16)" }}>
      <h1 className="section__title text-center">লগইন</h1>
      <p className="section__subtitle text-center mt-2">
        আপনার জাতীয় পরিচয়পত্র নম্বর দিয়ে প্রবেশ করুন
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: "var(--s-8)", display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
        <div>
          <label className="label" htmlFor="nid">জাতীয় পরিচয়পত্র নম্বর</label>
          <input
            id="nid"
            type="text"
            className="input"
            placeholder="১০ বা ১৭ সংখ্যার NID"
            value={nid}
            onChange={(e) => setNid(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="password">পাসওয়ার্ড</label>
          <input
            id="password"
            type="password"
            className="input"
            placeholder="পাসওয়ার্ড"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn--primary btn--lg" style={{ width: "100%" }}>
          প্রবেশ করুন
        </button>
      </form>

      <p style={{ fontSize: "var(--text-sm)", color: "var(--c-text-muted)", textAlign: "center", marginTop: "var(--s-6)" }}>
        ডেমো: যেকোনো NID ও পাসওয়ার্ড দিয়ে প্রবেশ করুন
      </p>

      <p style={{ fontSize: "var(--text-sm)", textAlign: "center", marginTop: "var(--s-4)" }}>
        অ্যাকাউন্ট নেই? <Link href="/register">নিবন্ধন করুন</Link>
      </p>
    </div>
  );
}
