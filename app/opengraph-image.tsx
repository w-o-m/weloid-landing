import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#17150f",
          padding: "80px 96px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: 6,
            color: "#8a8271",
            marginBottom: 40,
          }}
        >
          <div style={{ width: 60, height: 2, background: "#d94f2b" }} />
          FORENSIC SOFTWARE ENGINEERING
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 500,
            letterSpacing: -4,
            color: "#efe9dd",
          }}
        >
          welo
          <span style={{ position: "relative", display: "flex" }}>
            ı
            <span
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                top: 14,
                width: 22,
                height: 22,
                background: "#d94f2b",
              }}
            />
          </span>
          d
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 34,
            color: "#a49e8e",
            maxWidth: 900,
          }}
        >
          Every broken system has a story. We find it.
        </div>
      </div>
    ),
    { ...size }
  );
}
