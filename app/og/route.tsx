import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "M.Saad — Blog";
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#0b1220,#0a0a0a)",
          color: "white",
          fontSize: 64,
          fontWeight: 800,
          padding: 80,
        }}
      >
        <div style={{ maxWidth: 1000, lineHeight: 1.1 }}> {title} </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
