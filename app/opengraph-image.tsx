import { ImageResponse } from "next/og";

export const alt = "Eton Yao — USC '27, working where product meets marketing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#fafaf9", color: "#111827" }}>
        <div style={{ fontSize: 110, fontWeight: 700, letterSpacing: -3 }}>Eton Yao</div>
        <div style={{ fontSize: 38, color: "#6b7280", marginTop: 24 }}>USC ’27 — working where product meets marketing.</div>
      </div>
    ),
    size
  );
}
