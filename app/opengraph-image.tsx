import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "KJR Labs — We build software that actually ships.";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#F2EFE8", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#121212" }}>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 800 }}>KJR LABS<div style={{ width: 14, height: 34, background: "#FF4F1A", marginLeft: 6 }} /></div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 800, lineHeight: 0.92, letterSpacing: -4 }}>
          <span>We build software</span><span>that actually ships.</span>
        </div>
        <div style={{ fontSize: 26 }}>Independent software studio · Vadodara, India</div>
      </div>
    ),
    size,
  );
}
