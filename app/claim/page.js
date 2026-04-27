"use client";

import { useState } from "react";

export default function ClaimPage() {
  const [status, setStatus] = useState("ready");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");

  async function claim() {
    setStatus("loading");
    setMessage("");
    setUrl("");
    try {
      const res = await fetch("/api/claim", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.message || "리딤 URL 지급 중 문제가 발생했습니다.");
        return;
      }
      setStatus("success");
      setUrl(data.redeemUrl);
      if (data.redeemUrl) window.location.href = data.redeemUrl;
    } catch (e) {
      setStatus("error");
      setMessage("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  }

  return (
    <main className="wrap">
      <section className="card">
        <h1>{process.env.NEXT_PUBLIC_SITE_NAME || "Redeem Distributor"}</h1>
        <p>아래 버튼을 누르면 아직 지급되지 않은 리딤 URL 1개가 자동으로 배정됩니다.</p>
        <button onClick={claim} disabled={status === "loading"}>{status === "loading" ? "지급 중..." : process.env.NEXT_PUBLIC_CLAIM_BUTTON_TEXT || "리딤 코드 받기"}</button>
        {status === "success" && (<><p className="success">리딤 URL이 지급되었습니다. 자동 이동되지 않으면 아래 링크를 눌러 주세요.</p><div className="urlbox">{url}</div><a className="button" href={url}>리딤 페이지 열기</a></>)}
        {status === "error" && <p className="error">{message}</p>}
        <p className="small">같은 브라우저에서는 이미 지급된 URL이 다시 표시됩니다.</p>
      </section>
    </main>
  );
}
