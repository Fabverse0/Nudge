import { ImageResponse } from "next/og";
export async function GET(_request: Request, { params }: { params: Promise<{ size: string }> }) {
  const { size } = await params;
  if (size !== "192" && size !== "512") return new Response("Not found", { status: 404 });
  const width = Number(size);
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#EAF3EE", color: "#315F5E", fontSize: width * 0.7, fontWeight: 800 }}>n.</div>, { width, height: width });
}
