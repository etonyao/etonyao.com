import { ImageResponse } from "next/og";

export const alt = "Eton Yao — I build products people actually use";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#fafaf9", color: "#111827" }}>
        <div style={{ fontSize: 30, color: "#6b7280" }}>Eton Yao</div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 24, letterSpacing: -2 }}>
          I build products people actually use.
        </div>
        <div style={{ fontSize: 32, color: "#6b7280", marginTop: 32 }}>Joystick · Potion Problems · USC ’27</div>
      </div>
    ),
    size
  );
}
