import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ size: string }> },
) {
  const { size } = await params;
  if (!["32", "180", "192", "512", "maskable-512"].includes(size))
    return new Response("Not found", { status: 404 });
  const maskable = size === "maskable-512";
  const width = maskable ? 512 : Number(size);
  const symbol = await readFile(
    path.join(process.cwd(), "public/brand/logo/nudge-symbol.png"),
  );
  // A 56% square fits entirely inside the maskable safe circle (radius 40%).
  const artworkSize = Math.round(width * (maskable ? 0.56 : 0.96));
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#7EADDB",
      }}
    >
      {/* ImageResponse renders an image directly; next/image is for browser HTML. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/png;base64,${symbol.toString("base64")}`}
        width={artworkSize}
        height={artworkSize}
        alt=""
      />
    </div>,
    {
      width,
      height: width,
      headers: { "Cache-Control": "public, max-age=3600" },
    },
  );
}
