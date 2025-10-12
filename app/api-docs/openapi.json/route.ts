import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "openapi.json");
    const data = await fs.readFile(filePath, "utf-8");
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "OpenAPI introuvable. Lancez `npm run docs:gen`." },
      { status: 404 }
    );
  }
}
